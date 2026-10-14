import { type Notebook, type TraceRow } from '../../features/progress/model';
export function notebookText(notebook: Notebook) {
  const labels = { inputs: 'Entradas', outputs: 'Saídas', constraints: 'Restrições', decomposition: 'Decomposição', patterns: 'Padrões', abstractions: 'Abstrações', cases: 'Casos de teste (esperado e observado)', complexity: 'Tempo, memória e justificativa' };
  return Object.entries(labels).map(([key, label]) => `${label}:\n${notebook[key as keyof typeof labels]}`).join('\n\n') + '\n\nTeste de mesa (manual):\n' + notebook.trace.map(row => `${row.step} | ${row.values} | ${row.decision}`).join('\n');
}
export function ProblemNotebook({ value, onChange }: { value: Notebook; onChange: (value: Notebook) => void }) {
  const fields = { inputs: 'Entradas da minha modelagem', outputs: 'Saídas da minha modelagem', constraints: 'Restrições e hipóteses', decomposition: 'Decomposição em subproblemas', patterns: 'Padrões identificados', abstractions: 'Abstrações e limites do modelo', cases: 'Casos de teste: entrada, esperado, observado e método', complexity: 'Tempo, memória e justificativa' };
  function patchRow(index: number, field: keyof TraceRow, text: string) {
    onChange({ ...value, trace: value.trace.map((row, i) => i === index ? { ...row, [field]: text } : row) });
  }
  return <section className="panel lab-section" aria-labelledby="caderno"><h2 id="caderno">Caderno de resolução</h2><p>Registre o raciocínio antes de implementar. Os campos e a tabela armazenam texto; não executam nem validam algoritmos.</p>
    {Object.entries(fields).map(([key, label]) => <div key={key}><label htmlFor={`notebook-${key}`}>{label}</label><textarea id={`notebook-${key}`} rows={3} value={value[key as keyof typeof fields]} onChange={e => onChange({ ...value, [key]: e.target.value })}/></div>)}
    <h3>Teste de mesa manual</h3><p>Uma linha por passo. Compare o observado com o esperado nas suas anotações. Até 100 linhas por exercício.</p>
    <div className="trace-scroll" tabIndex={0} role="region" aria-label="Tabela de teste de mesa rolável"><table><caption>Rastreamento preenchido pelo estudante</caption><thead><tr><th scope="col">Passo</th><th scope="col">Valores das variáveis</th><th scope="col">Decisão / saída</th><th scope="col">Ação</th></tr></thead><tbody>{value.trace.map((row, i) => <tr key={i}>{(['step', 'values', 'decision'] as const).map((field, column) => <td key={field}><textarea rows={2} aria-label={`${['Passo', 'Valores', 'Decisão'][column]} da linha ${i + 1}`} value={row[field]} onChange={e => patchRow(i, field, e.target.value)}/></td>)}<td><button className="button secondary" aria-label={`Remover linha ${i + 1}`} onClick={() => onChange({ ...value, trace: value.trace.filter((_, index) => index !== i) })}>Remover</button></td></tr>)}</tbody></table></div>
    <button className="button secondary" disabled={value.trace.length >= 100} onClick={() => onChange({ ...value, trace: [...value.trace, { step: '', values: '', decision: '' }] })}>Adicionar passo ao teste de mesa</button><p role="status" className="small muted">{value.trace.length} linhas registradas manualmente.</p>
  </section>;
}
