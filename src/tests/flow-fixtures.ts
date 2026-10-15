import { curriculumSolutions } from '../content/stage-00/deep-curriculum';
import { approvalExample } from '../content/stage-00/flow-challenges';
import { diagram } from '../content/stage-00/flow-examples';
import { expression as e, literal as l, variable as v, type Algorithm, type Block, type Branch, type Connection, type Operand, type Operator } from '../features/flow/model';

class Builder {
  nodes: Omit<Block, 'x' | 'y'>[] = [{ id: 'inicio', kind: 'start' }];
  edges: Connection[] = [];
  add(n: Omit<Block, 'x' | 'y'>) { this.nodes.push(n); return this; }
  input(id: string, target = id) { return this.add({ id, kind: 'input', target }); }
  process(id: string, target: string, a: Operand, op: Operator = 'copy', b?: Operand) { return this.add({ id, kind: 'process', target, expression: e(op, a, b) }); }
  decision(id: string, a: Operand, op: Operator, b: Operand) { return this.add({ id, kind: 'decision', expression: e(op, a, b) }); }
  edge(from: string, to: string, branch: Branch = 'next') { this.edges.push({ from, to, branch }); return this; }
  chain(...ids: string[]) { ids.slice(0, -1).forEach((id, i) => this.edge(id, ids[i + 1])); return this; }
  outputs(names: string[]) { names.forEach(name => this.add({ id: `out_${name}`, kind: 'output', target: name })); this.add({ id: 'fim', kind: 'end' }); this.chain(...names.map(n => `out_${n}`), 'fim'); return this; }
  build() { return diagram(this.nodes, this.edges); }
}
const item = (name: string): Operand => ({ kind: 'item', name, index: 'i' });
const len = (name: string): Operand => ({ kind: 'length', name });

function purchase() {
  const b = new Builder().input('preco').input('quantidade').input('cupom')
    .process('sub', 'subtotal', v('preco'), '*', v('quantidade')).process('zero', 'desconto', l(0))
    .decision('cup', v('cupom'), '==', l(true)).decision('limite', v('subtotal'), '>=', l(10000))
    .process('desc', 'desconto', v('subtotal'), 'floor/', l(10)).process('final', 'total', v('subtotal'), '-', v('desconto'))
    .outputs(['subtotal', 'desconto', 'total']);
  b.chain('inicio', 'preco', 'quantidade', 'cupom', 'sub', 'zero', 'cup').edge('cup', 'limite', 'true').edge('cup', 'final', 'false').edge('limite', 'desc', 'true').edge('limite', 'final', 'false').chain('desc', 'final', 'out_subtotal');
  return b.build();
}
function stock() {
  const b = new Builder().input('inicial').input('movimentos').process('saldo0', 'saldo', v('inicial')).process('i0', 'i', l(0)).process('a0', 'aceitos', l(0)).process('r0', 'rejeitados', l(0))
    .decision('loop', v('i'), '<', len('movimentos')).decision('zero', item('movimentos'), '!=', l(0)).process('somar', 'proximo', v('saldo'), '+', item('movimentos')).decision('cabe', v('proximo'), '>=', l(0))
    .process('atualiza', 'saldo', v('proximo')).process('aceitar', 'aceitos', v('aceitos'), '+', l(1)).process('rejeitar', 'rejeitados', v('rejeitados'), '+', l(1)).process('inc', 'i', v('i'), '+', l(1)).outputs(['saldo', 'aceitos', 'rejeitados']);
  b.chain('inicio', 'inicial', 'movimentos', 'saldo0', 'i0', 'a0', 'r0', 'loop').edge('loop', 'zero', 'true').edge('loop', 'out_saldo', 'false').edge('zero', 'somar', 'true').edge('zero', 'rejeitar', 'false').chain('somar', 'cabe').edge('cabe', 'atualiza', 'true').edge('cabe', 'rejeitar', 'false').chain('atualiza', 'aceitar', 'inc', 'loop').chain('rejeitar', 'inc');
  return b.build();
}
function sequence() {
  const b = new Builder().input('valores').process('i0', 'i', l(0)).process('s0', 'soma', l(0)).process('p0', 'positivos', l(0)).process('c0', 'crescente', l(true)).decision('loop', v('i'), '<', len('valores'))
    .process('somar', 'soma', v('soma'), '+', item('valores')).decision('positivo', item('valores'), '>', l(0)).process('contar', 'positivos', v('positivos'), '+', l(1)).decision('temAnterior', v('i'), '>', l(0)).decision('quebra', item('valores'), '<=', v('anterior')).process('naoCresce', 'crescente', l(false)).process('guardar', 'anterior', item('valores')).process('inc', 'i', v('i'), '+', l(1)).outputs(['soma', 'positivos', 'crescente']);
  b.chain('inicio', 'valores', 'i0', 's0', 'p0', 'c0', 'loop').edge('loop', 'somar', 'true').edge('loop', 'out_soma', 'false').chain('somar', 'positivo').edge('positivo', 'contar', 'true').edge('positivo', 'temAnterior', 'false').chain('contar', 'temAnterior').edge('temAnterior', 'quebra', 'true').edge('temAnterior', 'guardar', 'false').edge('quebra', 'naoCresce', 'true').edge('quebra', 'guardar', 'false').chain('naoCresce', 'guardar', 'inc', 'loop');
  return b.build();
}
function scheduling() {
  const b = new Builder().input('inicioReserva', 'inicio').input('reservas').process('final', 'fim', v('inicio'), '+', l(60)).process('i0', 'i', l(0)).process('r0', 'resultado', l('aceita')).decision('loop', v('i'), '<', len('reservas'))
    .process('existente', 'fimExistente', item('reservas'), '+', l(60)).decision('primeiro', v('inicio'), '<', v('fimExistente')).decision('segundo', item('reservas'), '<', v('fim')).process('conflito', 'resultado', l('conflito')).process('inc', 'i', v('i'), '+', l(1)).outputs(['resultado']);
  b.chain('inicio', 'inicioReserva', 'reservas', 'final', 'i0', 'r0', 'loop').edge('loop', 'existente', 'true').edge('loop', 'out_resultado', 'false').chain('existente', 'primeiro').edge('primeiro', 'segundo', 'true').edge('primeiro', 'inc', 'false').edge('segundo', 'conflito', 'true').edge('segundo', 'inc', 'false').chain('conflito', 'inc', 'loop');
  return b.build();
}
function binary() {
  const b = new Builder().input('valores').input('alvo').process('esq', 'esquerda', l(0)).process('dir', 'direita', len('valores'), '-', l(1)).process('indice0', 'indice', l(-1)).decision('loop', v('esquerda'), '<=', v('direita'))
    .process('somar', 'auxiliar', v('esquerda'), '+', v('direita')).process('meio', 'meio', v('auxiliar'), 'floor/', l(2))
    .decision('igual', { kind: 'item', name: 'valores', index: 'meio' }, '==', v('alvo')).process('achou', 'indice', v('meio'))
    .decision('menor', { kind: 'item', name: 'valores', index: 'meio' }, '<', v('alvo')).process('avanca', 'esquerda', v('meio'), '+', l(1)).process('recua', 'direita', v('meio'), '-', l(1)).outputs(['indice']);
  b.chain('inicio', 'valores', 'alvo', 'esq', 'dir', 'indice0', 'loop').edge('loop', 'somar', 'true').edge('loop', 'out_indice', 'false').chain('somar', 'meio', 'igual').edge('igual', 'achou', 'true').edge('igual', 'menor', 'false').chain('achou', 'out_indice').edge('menor', 'avanca', 'true').edge('menor', 'recua', 'false').chain('avanca', 'loop').chain('recua', 'loop');
  return b.build();
}
function routes() {
  const b = new Builder(); ['ab', 'ac', 'cb', 'bd', 'cd'].forEach(n => b.input(n));
  b.process('r0', 'rota', l('sem rota')).process('c0', 'custo', l(-1))
    .process('block1', 'bloqueio', v('ac'), 'or', v('cb')).process('block2', 'bloqueio', v('bloqueio'), 'or', v('bd')).decision('free6', v('bloqueio'), '==', l(false))
    .process('r6', 'rota', l('A-C-B-D')).process('c6', 'custo', l(6))
    .process('block3', 'bloqueio', v('ab'), 'or', v('bd')).decision('free7', v('bloqueio'), '==', l(false)).process('r7', 'rota', l('A-B-D')).process('c7', 'custo', l(7))
    .process('block4', 'bloqueio', v('ac'), 'or', v('cd')).decision('free10', v('bloqueio'), '==', l(false)).process('r10', 'rota', l('A-C-D')).process('c10', 'custo', l(10)).outputs(['rota', 'custo']);
  b.chain('inicio', 'ab', 'ac', 'cb', 'bd', 'cd', 'r0', 'c0', 'block1', 'block2', 'free6').edge('free6', 'r6', 'true').edge('free6', 'block3', 'false').chain('r6', 'c6', 'out_rota').chain('block3', 'free7').edge('free7', 'r7', 'true').edge('free7', 'block4', 'false').chain('r7', 'c7', 'out_rota').chain('block4', 'free10').edge('free10', 'r10', 'true').edge('free10', 'out_rota', 'false').chain('r10', 'c10', 'out_rota');
  return b.build();
}
function integrated() {
  const b = new Builder().input('capacidade').input('pedidos').process('rest', 'restantes', v('capacidade')).process('i0', 'i', l(0)).process('a0', 'aceitos', l(0)).process('o0', 'ocupados', l(0)).process('r0', 'resultados', v('resultados'), 'empty')
    .decision('loop', v('i'), '<', len('pedidos')).decision('valido', item('pedidos'), '>', l(0)).decision('cabe', item('pedidos'), '<=', v('restantes'))
    .process('invalido', 'resultados', v('resultados'), 'append', l('invalido')).process('sem', 'resultados', v('resultados'), 'append', l('sem vagas')).process('sim', 'resultados', v('resultados'), 'append', l('aceito'))
    .process('tirar', 'restantes', v('restantes'), '-', item('pedidos')).process('contar', 'aceitos', v('aceitos'), '+', l(1)).process('ocupar', 'ocupados', v('ocupados'), '+', item('pedidos')).process('inc', 'i', v('i'), '+', l(1)).outputs(['resultados', 'restantes', 'aceitos', 'ocupados']);
  b.chain('inicio', 'capacidade', 'pedidos', 'rest', 'i0', 'a0', 'o0', 'r0', 'loop').edge('loop', 'valido', 'true').edge('loop', 'out_resultados', 'false').edge('valido', 'cabe', 'true').edge('valido', 'invalido', 'false').edge('cabe', 'sim', 'true').edge('cabe', 'sem', 'false').chain('sim', 'tirar', 'contar', 'ocupar', 'inc', 'loop').chain('invalido', 'inc').chain('sem', 'inc');
  return b.build();
}
export const solutions: Record<string, Algorithm> = { ...curriculumSolutions, '00-ex-02': approvalExample, '00-ex-03': purchase(), '00-ex-04': stock(), '00-ex-05': sequence(), '00-ex-06': scheduling(), '00-ex-07': binary(), '00-ex-08': routes(), '00-ex-09': integrated() };
