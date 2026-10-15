import { describe, expect, it } from 'vitest';
import { approval, approvalExample, flowChallenges } from '../content/stage-00/flow-challenges';
import { sumChallenge, sumExample } from '../content/stage-00/flow-examples';
import { solutions } from './flow-fixtures';
import { newProgress, parseProgress, updateExercise } from '../features/progress/model';
import { execute, testAlgorithm, validateAlgorithm } from '../features/flow/interpreter';
import { parseAlgorithm } from '../features/flow/model';

describe('Protótipo do interpretador limitado', () => {
  it('aceita ambos os caminhos e o limite inclusivo', () => {
    expect(validateAlgorithm(approvalExample, approval)).toEqual([]);
    expect(testAlgorithm(approvalExample, approval).every(r => r.passed)).toBe(true);
    const run = execute(approvalExample, approval, { nota: 7 });
    expect(run.steps.find(s => s.blockId === 'decidir')?.branch).toBe('true');
    expect(run.steps.at(-1)?.variables.resultado).toBe('Aprovado');
  });
  it('diagnostica conexões, variáveis e tipos antes de executar', () => {
    const a = structuredClone(approvalExample);
    a.edges.pop(); expect(validateAlgorithm(a, approval).join()).toContain('conecte');
    a.nodes[2].expression!.a = { kind: 'variable', name: 'desconhecida' };
    expect(validateAlgorithm(a, approval).join()).toContain('inexistente');
    a.nodes[2].expression!.a = { kind: 'literal', value: 'texto' };
    expect(validateAlgorithm(a, approval).join()).toContain('incompatível');
  });
  it('rejeita entradas inválidas e payloads arbitrários', () => {
    for (const nota of [-1, 11, NaN, Infinity, '8']) expect(execute(approvalExample, approval, { nota }).error).toBeTruthy();
    expect(() => parseAlgorithm({ ...approvalExample, nodes: [{ id: 'constructor', kind: 'start', x: 0, y: 0 }] })).toThrow();
    expect(() => parseAlgorithm({ ...approvalExample, nodes: [{ ...approvalExample.nodes[2], expression: { op: 'eval', a: {} } }] })).toThrow();
  });
  it('não trata testes finitos como prova universal e identifica alteração na fronteira', () => {
    const a = structuredClone(approvalExample); a.nodes[2].expression!.op = '>';
    expect(testAlgorithm(a, approval).find(r => r.name === 'No limite')?.passed).toBe(false);
  });
});

describe('Todos os contratos visuais e limites', () => {
  it.each(Object.values(flowChallenges))('$id: solução de referência satisfaz os casos publicados', c => {
    expect(validateAlgorithm(solutions[c.id], c)).toEqual([]);
    expect(testAlgorithm(solutions[c.id], c).filter(r => !r.passed)).toEqual([]);
    expect(c.tests.length).toBeGreaterThanOrEqual(4);
  });
  it('executa o exemplo de laço das aulas inclusive no vazio', () => {
    expect(testAlgorithm(sumExample, sumChallenge).every(r => r.passed)).toBe(true);
    expect(execute(sumExample, sumChallenge, { duracoes: [0] }).error).toContain('faixa');
    expect(execute(sumExample, sumChallenge, { duracoes: [1.5] }).error).toContain('integralidade');
  });
  it('impede laço infinito, acesso fora de faixa e leitura antes da inicialização', () => {
    const stuck = structuredClone(sumExample);
    stuck.nodes.find(n => n.id === 'avancar')!.expression!.b = { kind: 'literal', value: 0 };
    expect(execute(stuck, sumChallenge, { duracoes: [20] }, 30).error).toContain('Limite de passos');
    const boundary = structuredClone(sumExample);
    boundary.nodes.find(n => n.id === 'continuar')!.expression!.op = '<=';
    expect(execute(boundary, sumChallenge, { duracoes: [] }).error).toContain('Índice fora');
    const uninitialized = structuredClone(sumExample);
    uninitialized.nodes.find(n => n.id === 'zerar')!.target = 'i';
    expect(execute(uninitialized, sumChallenge, { duracoes: [20] }).error).toContain('inicialize total');
  });
  it('rejeita saída ausente, divisão por zero e estruturas malformadas', () => {
    const a = structuredClone(approvalExample); a.nodes.find(n => n.id === 'informar')!.kind = 'start';
    expect(validateAlgorithm(a, approval).join()).toContain('exatamente um');
    const b = structuredClone(sumExample); b.nodes.find(n => n.id === 'somar')!.expression = { op: '/', a: { kind: 'literal', value: 1 }, b: { kind: 'literal', value: 0 } };
    expect(execute(b, sumChallenge, { duracoes: [1] }).error).toContain('zero');
    const c = structuredClone(sumExample); c.nodes.find(n => n.id === 'informar')!.kind = 'process'; c.nodes.find(n => n.id === 'informar')!.expression = { op: 'copy', a: { kind: 'literal', value: 0 } };
    expect(execute(c, sumChallenge, { duracoes: [1] }).error).toContain('sem informar');
    for (const nodes of [Array(121).fill(approvalExample.nodes[0]), [{ ...approvalExample.nodes[0], x: -1 }], [{ ...approvalExample.nodes[0], y: Infinity }]]) expect(() => parseAlgorithm({ ...approvalExample, nodes })).toThrow();
  });
  it('rejeita coleção inválida, fora da ordem e acima do contrato', () => {
    const c = flowChallenges['00-ex-07'];
    for (const valores of [[3, 2], [2, 2], Array(65).fill(0), ['a']]) expect(execute(solutions[c.id], c, { valores: valores as number[], alvo: 2 }).error).toBeTruthy();
  });
  it('aceita desenho e identificadores diferentes sem comparar posição', () => {
    const a = structuredClone(approvalExample);
    a.nodes = a.nodes.map(n => ({ ...n, id: `outro_${n.id}`, x: 10, y: 20 }));
    a.edges = a.edges.map(e => ({ ...e, from: `outro_${e.from}`, to: `outro_${e.to}` }));
    expect(testAlgorithm(a, approval).every(r => r.passed)).toBe(true);
    const reversed = structuredClone(approvalExample);
    reversed.nodes.find(n => n.id === 'decidir')!.expression!.op = '<';
    reversed.edges = reversed.edges.map(edge => edge.from === 'decidir' ? { ...edge, branch: edge.branch === 'true' ? 'false' : 'true' } : edge);
    expect(testAlgorithm(reversed, approval).every(r => r.passed)).toBe(true);
  });
});

describe('Persistência v4 e conclusão visual', () => {
  it('migra v3 sem perder rascunhos nem confundir autoavaliação antiga com testes', () => {
    const p = newProgress();
    p.exercises['00-ex-02'] = { status: 'concluido', solution: 'rascunho antigo', reflection: 'minha dúvida', hints: 3, checks: [true, true, true, true], notebook: { inputs: 'entrada antiga', outputs: '', constraints: '', decomposition: '', patterns: '', abstractions: '', cases: '', complexity: '', trace: [] } };
    const migrated = parseProgress(JSON.stringify({ ...p, version: 3 }));
    expect(migrated.exercises['00-ex-02']).toMatchObject({ status: 'em-andamento', solution: 'rascunho antigo', reflection: 'minha dúvida', hints: 0, migratedVisual: true });
    expect(migrated.exercises['00-ex-02'].notebook.inputs).toBe('entrada antiga');
    expect(migrated.exercises['00-ex-02'].checks.some(Boolean)).toBe(false);
  });
  it('não conclui só com checklist; preserva grafo e resultados após serializar', () => {
    let p = updateExercise(newProgress(), approval.id, { status: 'concluido', checks: [true, true, true, true] });
    expect(p.exercises[approval.id].status).toBe('em-andamento');
    p = updateExercise(p, approval.id, { flow: { algorithm: approvalExample, results: testAlgorithm(approvalExample, approval) } });
    p = updateExercise(p, approval.id, { checks: [true, true, true, true], status: 'concluido' });
    expect(parseProgress(JSON.stringify(p))).toEqual(p);
    p = updateExercise(p, approval.id, { flow: { algorithm: approvalExample, results: [] } });
    expect(p.exercises[approval.id].status).toBe('em-andamento');
    expect(p.exercises[approval.id].checks.every(Boolean)).toBe(true);
    p = updateExercise(p, approval.id, { flow: { algorithm: { ...approvalExample, nodes: approvalExample.nodes.map(n=>({...n,x:n.x+20})) }, results: [] } });
    expect(p.exercises[approval.id].checks.some(Boolean)).toBe(false);
  });
  it('reavalia testes importados e rejeita dados que tentam executar JavaScript', () => {
    let p = updateExercise(newProgress(), approval.id, { flow: { algorithm: approvalExample, results: testAlgorithm(approvalExample, approval) } });
    p = updateExercise(p, approval.id, { status: 'concluido', checks: [true, true, true, true] });
    const corrupt = structuredClone(p); corrupt.exercises[approval.id].flow!.algorithm.nodes.find(n => n.id === 'decidir')!.expression!.op = '>';
    const imported = parseProgress(JSON.stringify(corrupt));
    expect(imported.exercises[approval.id].status).toBe('em-andamento');
    expect(imported.exercises[approval.id].flow!.results.some(r => !r.passed)).toBe(true);
    const raw = JSON.stringify(corrupt).replace('"op":">"', '"op":"eval"');
    expect(() => parseProgress(raw)).toThrow();
  });
});
