import { blankAlgorithm, expression as e, literal as l, variable as v, type Algorithm, type Block, type Connection, type FlowChallenge } from '../../features/flow/model';

export function diagram(nodes: Omit<Block, 'x' | 'y'>[], edges: Connection[]): Algorithm {
  return { version: 1, nodes: nodes.map((n, i) => ({ ...n, x: 240, y: 20 + i * 120 })), edges };
}
export const sumChallenge: FlowChallenge = {
  id: 'demo-soma', variables: [{ name: 'duracoes', type: 'numeros', input: true, min: 1, max: 120, integer: true, description: 'Lista de durações inteiras entre 1 e 120; até 100 itens.' }, { name: 'i', type: 'numero', description: 'Índice.' }, { name: 'total', type: 'numero', description: 'Soma das durações.' }], outputs: ['total'], rules: ['O ambiente valida a lista inteira antes de executar. Some todas as durações. Vazio devolve zero.'],
  tests: [{ name: 'Duas durações', input: { duracoes: [20, 15] }, expected: { total: 35 } }, { name: 'Vazio', input: { duracoes: [] }, expected: { total: 0 } }, { name: 'Limites', input: { duracoes: [1, 120] }, expected: { total: 121 } }], starter: blankAlgorithm(),
};
export const sumExample = diagram([
  { id: 'inicio', kind: 'start' }, { id: 'ler', kind: 'input', target: 'duracoes' },
  { id: 'indice', kind: 'process', target: 'i', expression: e('copy', l(0)) },
  { id: 'zerar', kind: 'process', target: 'total', expression: e('copy', l(0)) },
  { id: 'continuar', kind: 'decision', expression: e('<', v('i'), { kind: 'length', name: 'duracoes' }) },
  { id: 'somar', kind: 'process', target: 'total', expression: e('+', v('total'), { kind: 'item', name: 'duracoes', index: 'i' }) },
  { id: 'avancar', kind: 'process', target: 'i', expression: e('+', v('i'), l(1)) },
  { id: 'informar', kind: 'output', target: 'total' }, { id: 'fim', kind: 'end' },
], [
  { from: 'inicio', to: 'ler', branch: 'next' }, { from: 'ler', to: 'indice', branch: 'next' }, { from: 'indice', to: 'zerar', branch: 'next' }, { from: 'zerar', to: 'continuar', branch: 'next' },
  { from: 'continuar', to: 'somar', branch: 'true' }, { from: 'continuar', to: 'informar', branch: 'false' }, { from: 'somar', to: 'avancar', branch: 'next' }, { from: 'avancar', to: 'continuar', branch: 'next' }, { from: 'informar', to: 'fim', branch: 'next' },
]);
// Position body beside the loop condition so the return edge stays legible.
sumExample.nodes.find(n => n.id === 'somar')!.x = 480;
sumExample.nodes.find(n => n.id === 'avancar')!.x = 480;
sumExample.nodes.find(n => n.id === 'informar')!.y = 650;
sumExample.nodes.find(n => n.id === 'fim')!.y = 790;
