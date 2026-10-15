import { describe, expect, it } from 'vitest';
import { curriculumTasks } from '../content/stage-00/deep-curriculum';
import { execute, validateAlgorithm, testAlgorithm } from '../features/flow/interpreter';
import { parseAlgorithm, literal, variable, type Algorithm } from '../features/flow/model';
import { parseFlowDraft } from '../features/flow/persistence';
const task = (slug: string) => curriculumTasks.find(t => t.slug === slug)!;
const average = () => structuredClone(task('funcoes').solution);
const call = (a: Algorithm) => a.nodes.find(n => n.kind === 'call')!;

describe('Sub-rotinas: comportamento e diagnóstico', () => {
  it('transmite argumentos em ordem, retorna e continua no principal', () => {
    const t = task('funcoes'); const run = execute(t.solution,t.challenge,{a:3,b:8});
    expect(run.error).toBeUndefined(); expect(run.output).toEqual({resultado:5.5});
    const frame = run.steps.find(s => s.functionId === 'calcularMedia')!;
    expect(frame.variables).toEqual({nota1:3,nota2:8});
    expect(run.steps.find(s => s.event === 'Retorno')?.returned).toBe(5.5);
    expect(run.steps.find(s => s.event?.startsWith('Continuação'))?.variables.resultado).toBe(5.5);
    expect(run.steps.at(-1)?.stack).toEqual(['principal']);
  });
  it('mantém variáveis locais fora do chamador e permite nomes iguais em escopos distintos', () => {
    const t = task('funcoes'), a = average();
    a.functions![0].locals[0].name = 'resultado';
    a.functions![0].algorithm.nodes.find(n => n.kind === 'process')!.target = 'resultado';
    a.functions![0].algorithm.nodes.find(n => n.kind === 'return')!.expression!.a = variable('resultado');
    const run = execute(a,t.challenge,{a:4,b:6});
    expect(run.error).toBeUndefined(); expect(run.output.resultado).toBe(5);
    expect(run.steps.at(-1)?.variables).not.toHaveProperty('nota1');
    expect(run.steps.at(-1)?.variables).not.toHaveProperty('soma');
  });
  it('não aceita saída equivalente que omite a chamada pedagógica exigida', () => {
    const t=task('funcoes'), a=average(); const n=call(a);
    n.kind='process'; n.expression={op:'copy',a:literal(7)};
    const result=testAlgorithm(a,t.challenge)[0];
    expect(result.actual.resultado).toBe(7); expect(result.passed).toBe(false); expect(result.error).toContain('Chamadas exigidas');
  });
  it('impede função de ler variável existente apenas no chamador', () => {
    const a = average(); a.functions![0].algorithm.nodes.find(n=>n.kind==='return')!.expression!.a=variable('a');
    expect(validateAlgorithm(a,task('funcoes').challenge).join()).toContain('Variável inexistente: a');
  });
  it('rastreia procedimento sem destino ou valor de retorno', () => {
    const t=task('procedimentos'); const run=execute(t.solution,t.challenge,{valor:12});
    expect(run.error).toBeUndefined(); expect(run.output).toEqual({resultado:12});
    expect(run.steps.some(s => s.functionId==='preparar' && s.variables.temporario===24)).toBe(true);
    expect(run.steps.at(-1)?.variables).not.toHaveProperty('temporario');
  });
  it('empilha função que chama outra função e desempilha no retorno', () => {
    const t=task('composicao'); const run=execute(t.solution,t.challenge,{a:8,b:6});
    expect(run.output.resultado).toBe(8);
    expect(run.steps.some(s=>s.stack?.join('/')==='principal/mediaAjustada/calcularMedia')).toBe(true);
    expect(run.steps.at(-1)?.stack).toEqual(['principal']);
  });
  it('executa recursão com quadros independentes e caso-base', () => {
    const t=task('recursao'); const run=execute(t.solution,t.challenge,{n:4});
    expect(run.error).toBeUndefined(); expect(run.output.resultado).toBe(24);
    expect(run.steps.filter(s=>s.event==='Retorno').map(s=>s.returned)).toEqual([1,2,6,24]);
    expect(execute(t.solution,t.challenge,{n:0}).output.resultado).toBe(1);
  });
  it('interrompe recursão sem redução antes de estourar a pilha do JavaScript', () => {
    const t=task('recursao'), a=structuredClone(t.solution);
    a.functions![0].algorithm.nodes.find(n=>n.kind==='call')!.arguments=[variable('n')];
    const run=execute(a,t.challenge,{n:4});
    expect(run.error).toContain('profundidade'); expect(run.steps.length).toBeLessThan(2000);
  });
  it.each(['missing','few','many','type','target','return'] as const)('rejeita chamada/retorno inválido: %s', kind => {
    const a=average(); const n=call(a);
    if(kind==='missing') n.functionId='ausente';
    if(kind==='few') n.arguments=[];
    if(kind==='many') n.arguments=[literal(1),literal(2),literal(3)];
    if(kind==='type') n.arguments=[literal('8'),literal(6)];
    if(kind==='target') n.target='naoDeclarada';
    if(kind==='return') a.functions![0].algorithm.nodes.find(n=>n.kind==='return')!.expression!.a=literal('texto');
    expect(execute(a,task('funcoes').challenge,{a:8,b:6}).error).toBeTruthy();
  });
  it('rejeita função com caminho sem retorno e procedimento com destino', () => {
    const a=average(); const ret=a.functions![0].algorithm.nodes.find(n=>n.kind==='return')!;
    ret.kind='end'; expect(validateAlgorithm(a,task('funcoes').challenge).join()).toContain('terminar em Retorno');
    const t=task('procedimentos'), b=structuredClone(t.solution); call(b).target='resultado';
    expect(validateAlgorithm(b,t.challenge).join()).toContain('procedimentos não possuem destino');
  });
  it('limita o total de passos também através de chamadas', () => {
    const t=task('composicao'); const r=execute(t.solution,t.challenge,{a:8,b:6},5);
    expect(r.error).toContain('Limite de passos'); expect(r.steps.length).toBeLessThanOrEqual(5);
  });
  it('preserva função e assinatura após serialização e recalcula resultados importados', () => {
    const t=task('composicao'); const parsed=parseFlowDraft(JSON.parse(JSON.stringify({algorithm:t.solution,results:[{passed:true}]})),t.challenge);
    expect(parsed.algorithm).toEqual(parseAlgorithm(t.solution)); expect(parsed.results.every(r=>r.passed)).toBe(true);
    const a=average(); a.functions![0].algorithm.nodes.find(n=>n.kind==='return')!.expression!.b=literal(1);
    expect(parseFlowDraft({algorithm:a,results:[{passed:true}]},task('funcoes').challenge).results.some(r=>!r.passed)).toBe(true);
  });
  it('mantém grafos antigos sem funções e rejeita payloads e assinaturas perigosos', () => {
    expect(parseAlgorithm({version:1,nodes:[],edges:[]})).toEqual({version:1,nodes:[],edges:[]});
    const a=average(); a.functions![0].parameters[0].name='constructor';
    expect(()=>parseAlgorithm(a)).toThrow();
    const b=average(); b.functions![0].locals[0].name='nota1'; expect(()=>parseAlgorithm(b)).toThrow(/mesmo nome/);
    const c=average(); c.functions=Array(17).fill(c.functions![0]); expect(()=>parseAlgorithm(c)).toThrow(/16/);
  });
});
describe('Coleções e conversões seguras', () => {
  it('valida matriz retangular, índices e limites', () => {
    const t=task('matrizes');
    expect(execute(t.solution,t.challenge,{tabela:[[1,2],[3,4]]}).output.total).toBe(10);
    expect(execute(t.solution,t.challenge,{tabela:[[1],[2,3]]}).error).toContain('tipo inválido');
    expect(execute(t.solution,t.challenge,{tabela:Array(21).fill([1])}).error).toContain('tipo inválido');
    const a=structuredClone(t.solution);a.nodes.find(n=>n.id==='coluna')!.expression!.a=literal(-1);
    expect(execute(a,t.challenge,{tabela:[[1]]}).error).toContain('Índice fora da matriz');
  });
  it('ordena uma cópia, preserva duplicados e não altera entrada', () => {
    const t=task('ordenacao'), input={dados:[3,1,1,-2]}; const r=execute(t.solution,t.challenge,input);
    expect(r.error).toBeUndefined(); expect(r.output.resultado).toEqual([-2,1,1,3]); expect(input.dados).toEqual([3,1,1,-2]);
  });
  it('converte texto numérico e rejeita vazio/expressões JavaScript', () => {
    const t=task('expressoes'), a=structuredClone(t.solution);
    a.nodes.find(n=>n.id==='somar')!.expression={op:'number',a:literal('12.5')};
    expect(execute(a,t.challenge,{quantidade:0}).output.resultado).toBe(37.5);
    for(const value of ['', 'globalThis.alert(1)', '1/0']) { a.nodes.find(n=>n.id==='somar')!.expression!.a=literal(value); expect(execute(a,t.challenge,{quantidade:0}).error).toContain('Conversão'); }
  });
});
