export type Scalar = number | string | boolean;
export type Value = Scalar | number[] | string[] | number[][];
export type ValueType = 'numero' | 'texto' | 'booleano' | 'numeros' | 'textos' | 'matriz';
export const valueTypeLabels: Record<ValueType,string> = {numero:'Número',texto:'Texto',booleano:'Booleano',numeros:'Array de números',textos:'Array de textos',matriz:'Matriz numérica'};
export type Variable = { name: string; type: ValueType; input?: boolean; description: string; min?: number; max?: number; integer?: boolean; maxItems?: number };
export type Operand = { kind: 'expression'; expression: Expression } | { kind: 'literal'; value: Scalar } | { kind: 'variable'; name: string } | { kind: 'length'; name: string } | { kind: 'cell'; name: string; row: string | Operand; column: string | Operand } | { kind: 'columns'; name: string } | { kind: 'item'; name: string; index: string | Operand };
export const operators = ['copy', 'empty', '+', '-', '*', '/', '%', 'floor/', '==', '!=', '>', '>=', '<', '<=', 'and', 'or', 'append', 'contains', 'swap', 'number', 'text', 'not'] as const;
export type Operator = typeof operators[number];
export type Expression = { op: Operator; a: Operand; b?: Operand; c?: Operand };
export type BlockKind = 'start' | 'input' | 'process' | 'decision' | 'output' | 'end' | 'call' | 'return';
export type InputBinding = { name: string; type: ValueType; source?: string; value?: Value };
export type Block = { id: string; kind: BlockKind; x: number; y: number; target?: string; expression?: Expression; functionId?: string; arguments?: Operand[]; inputKey?: string; outputKey?: string; dataType?: ValueType; inputs?: InputBinding[] };
export type Branch = 'next' | 'true' | 'false';
export type Connection = { from: string; to: string; branch: Branch };
export type Algorithm = { version: 1; nodes: Block[]; edges: Connection[]; functions?: FunctionDefinition[]; variables?: Variable[] };
export type FunctionDefinition = { id: string; parameters: Variable[]; locals: Variable[]; returnType?: ValueType; algorithm: Algorithm };
export type TestCase = { name: string; input: Record<string, Value>; expected: Record<string, Value>; requiredCalls?: string[]; requiresFunctionCall?: boolean; requiresNestedCall?: boolean; requiresRecursion?: boolean };
export type FlowChallenge = { id: string; variables: Variable[]; outputs: string[]; rules: string[]; tests: TestCase[]; starter: Algorithm; additionalTests?: TestCase[]; sortedInputs?: string[] };
export type Step = { blockId: string; variables: Record<string, Value>; output: Record<string, Value>; branch?: Branch; functionId?: string; stack?: string[]; event?: string; returned?: Value };
export type Run = { steps: Step[]; output: Record<string, Value>; error?: string };
export type TestResult = { name: string; passed: boolean; actual: Record<string, Value>; expected: Record<string, Value>; error?: string };
export type FlowDraft = { algorithm: Algorithm; results: TestResult[]; inputValues?: Record<string,string> };
export const labels: Record<BlockKind, string> = { start: 'Início', input: 'Entrada', process: 'Processamento', decision: 'Decisão', output: 'Saída', end: 'Fim', call: 'Chamada', return: 'Retorno' };
export const blankAlgorithm = (): Algorithm => ({ version: 1, nodes: [{ id: 'inicio', kind: 'start', x: 140, y: 40 }, { id: 'fim', kind: 'end', x: 140, y: 440 }], edges: [] });
export const variable = (name: string): Operand => ({ kind: 'variable', name });
export const literal = (value: Scalar): Operand => ({ kind: 'literal', value });
export const expression = (op: Operator, a: Operand, b?: Operand): Expression => ({ op, a, ...(b ? { b } : {}) });
export function valueMatches(value: unknown, type: ValueType): value is Value {
  if (type === 'matriz') return Array.isArray(value) && value.length <= 20 && value.every(row => Array.isArray(row) && row.length <= 20 && row.length === value[0].length && row.every(v => valueMatches(v, 'numero')));
  if (type === 'numero') return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
  if (type === 'texto') return typeof value === 'string' && value.length <= 2000;
  if (type === 'booleano') return typeof value === 'boolean';
  return Array.isArray(value) && value.length <= 100 && value.every(v => type === 'numeros' ? valueMatches(v, 'numero') : valueMatches(v, 'texto'));
}
const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
export function parseAlgorithm(value: unknown, depth = 0): Algorithm {
  if (depth > 1) throw new Error('Defina funções no programa principal.');
  if (!record(value) || value.version !== 1 || !Array.isArray(value.nodes) || value.nodes.length > 120 || !Array.isArray(value.edges) || value.edges.length > 240) throw new Error('Fluxograma inválido ou grande demais (máximo 120 blocos).');
  const safeName = (v: unknown): v is string => typeof v === 'string' && /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/.test(v) && !['__proto__', 'constructor', 'prototype'].includes(v);
  const operand = (v: unknown, level = 0): Operand => {
    if (level > 24) throw new Error('Expressão muito profunda.');
    if (!record(v)) throw new Error('Operando inválido.');
    if (v.kind === 'expression') return { kind: 'expression', expression: parseExpression(v.expression, level + 1) };
    if (v.kind === 'literal' && (typeof v.value === 'boolean' || valueMatches(v.value, 'numero') || valueMatches(v.value, 'texto'))) return { kind: 'literal', value: v.value as Scalar };
    if ((v.kind === 'variable' || v.kind === 'length' || v.kind === 'columns') && safeName(v.name)) return { kind: v.kind, name: v.name };
    if (v.kind === 'cell' && safeName(v.name) && (safeName(v.row) || record(v.row)) && (safeName(v.column) || record(v.column))) return { kind: 'cell', name: v.name, row: safeName(v.row) ? v.row : operand(v.row,level+1), column: safeName(v.column) ? v.column : operand(v.column,level+1) };
    if (v.kind === 'item' && safeName(v.name) && (safeName(v.index) || record(v.index))) return { kind: 'item', name: v.name, index: safeName(v.index) ? v.index : operand(v.index,level+1) };
    throw new Error('Operando inválido. Declare a variável e use as operações do editor.');
  };
  const parseExpression = (raw: unknown, level = 0): Expression => {
    if (level > 24 || !record(raw) || !operators.includes(raw.op as Operator)) throw new Error('Expressão inválida ou profunda demais.');
    return { op: raw.op as Operator, a: operand(raw.a,level+1), ...(raw.b !== undefined ? { b: operand(raw.b,level+1) } : {}), ...(raw.c !== undefined ? { c: operand(raw.c,level+1) } : {}) };
  };
  const nodes: Block[] = value.nodes.map(n => {
    if (!record(n) || !safeName(n.id) || !Object.hasOwn(labels, String(n.kind)) || typeof n.x !== 'number' || !Number.isFinite(n.x) || n.x < 0 || n.x > 3000 || typeof n.y !== 'number' || !Number.isFinite(n.y) || n.y < 0 || n.y > 5000 || (n.target !== undefined && !safeName(n.target))) throw new Error('Bloco inválido.');
    let expr: Expression | undefined;
    if (n.expression !== undefined) {
      expr = parseExpression(n.expression);
    }
    return { id: n.id, kind: n.kind as BlockKind, x: n.x, y: n.y, ...(n.target ? { target: n.target as string } : {}), ...(expr ? { expression: expr } : {}), ...Object.fromEntries(['inputKey','outputKey'].filter(k => n[k] !== undefined).map(k => { if (!safeName(n[k])) throw new Error('Identificador de entrada/saída inválido.'); return [k,n[k]]; })), ...(n.inputs !== undefined ? { inputs: (() => { if (!Array.isArray(n.inputs) || !n.inputs.length || n.inputs.length > 16) throw new Error('Use de 1 a 16 entradas por bloco.'); const inputs = n.inputs.map(v => { if (!record(v) || !safeName(v.name) || (v.source !== undefined && !safeName(v.source)) || !['numero','texto','booleano','numeros','textos','matriz'].includes(String(v.type))) throw new Error('Declaração de entrada inválida.'); if(v.value !== undefined && !valueMatches(v.value,v.type as ValueType))throw new Error('Valor da entrada incompatível com o tipo.'); return { name:v.name, ...(v.source ? {source:v.source as string} : {}), type:v.type as ValueType, ...(v.value !== undefined ? {value:structuredClone(v.value) as Value} : {}) }; }); if(new Set(inputs.map(v=>v.name)).size!==inputs.length)throw new Error('Nomes de entrada repetidos no mesmo bloco.'); return inputs; })() } : {}), ...(n.dataType !== undefined ? { dataType: ['numero','texto','booleano','numeros','textos','matriz'].includes(String(n.dataType)) ? n.dataType as ValueType : (() => { throw new Error('Tipo inválido.'); })() } : {}), ...(n.functionId !== undefined ? { functionId: safeName(n.functionId) ? n.functionId : (() => { throw new Error('Função inválida.'); })() } : {}), ...(n.arguments !== undefined ? { arguments: Array.isArray(n.arguments) && n.arguments.length <= 16 ? n.arguments.map(operand) : (() => { throw new Error('Argumentos inválidos.'); })() } : {}) };
  });
  if (new Set(nodes.map(n => n.id)).size !== nodes.length) throw new Error('Identificadores de blocos repetidos.');
  const edges: Connection[] = value.edges.map(e => {
    if (!record(e) || !safeName(e.from) || !safeName(e.to) || !['next', 'true', 'false'].includes(String(e.branch))) throw new Error('Conexão inválida.');
    return { from: e.from, to: e.to, branch: e.branch as Branch };
  });
  const parseVariables = (raw: unknown): Variable[] => {
    if (!Array.isArray(raw) || raw.length > 32) throw new Error('Parâmetros ou locais inválidos.');
    const vars = raw.map(v => { if (!record(v) || !safeName(v.name) || !['numero','texto','booleano','numeros','textos','matriz'].includes(String(v.type))) throw new Error('Variável de função inválida.'); return { name: v.name, type: v.type as ValueType, description: typeof v.description === 'string' ? v.description.slice(0,2000) : '' }; });
    if (new Set(vars.map(v => v.name)).size !== vars.length) throw new Error('Variáveis repetidas.');
    return vars;
  };
  const functions: FunctionDefinition[] = value.functions === undefined ? [] : (() => {
    if (!Array.isArray(value.functions) || value.functions.length > 16 || depth) throw new Error('Máximo de 16 funções, definidas no principal.');
    return value.functions.map(f => {
      if (!record(f) || !safeName(f.id) || (f.returnType !== undefined && !['numero','texto','booleano','numeros','textos','matriz'].includes(String(f.returnType)))) throw new Error('Assinatura inválida.');
      const parameters = parseVariables(f.parameters), locals = parseVariables(f.locals);
      if (new Set([...parameters,...locals].map(v => v.name)).size !== parameters.length + locals.length) throw new Error('Parâmetro e local com mesmo nome.');
      return { id: f.id, parameters, locals, ...(f.returnType ? { returnType: f.returnType as ValueType } : {}), algorithm: parseAlgorithm(f.algorithm, depth + 1) };
    });
  })();
  if (new Set(functions.map(f => f.id)).size !== functions.length) throw new Error('Funções repetidas.');
  return { version: 1, nodes, edges, ...(functions.length ? { functions } : {}), ...(value.variables !== undefined ? { variables: parseVariables(value.variables) } : {}) };
}
export function operandLabel(o: Operand): string {
  return o.kind === 'expression' ? `(${expressionLabel(o.expression)})` : o.kind === 'literal' ? JSON.stringify(o.value) : o.kind === 'cell' ? `${o.name}[${typeof o.row === 'string' ? o.row : operandLabel(o.row)}][${typeof o.column === 'string' ? o.column : operandLabel(o.column)}]` : o.kind === 'columns' ? `colunas(${o.name})` : o.kind === 'length' ? `tamanho(${o.name})` : o.kind === 'item' ? `${o.name}[${typeof o.index === 'string' ? o.index : operandLabel(o.index)}]` : o.name;
}
export function expressionLabel(e?: Expression): string {
  if (!e) return '';
  if (e.op === 'copy') return operandLabel(e.a);
  if (['empty','number','text','not','append','contains','swap','floor/'].includes(e.op)) return `${e.op === 'floor/' ? 'pisoDiv' : e.op}(${[e.a,e.b,e.c].filter((o): o is Operand => !!o).map(operandLabel).join(', ')})`;
  return `${operandLabel(e.a)} ${e.op} ${e.b ? operandLabel(e.b) : '?'}`;
}
export const allTestCases = (c: FlowChallenge): TestCase[] => [...c.tests,...c.additionalTests ?? []];
export const safeIdentifier = (value: string): boolean => /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/.test(value) && !['constructor','prototype','__proto__'].includes(value);
export function scopeContract(a: Algorithm, c: FlowChallenge): FlowChallenge {
  const vars = new Map(c.variables.map(v => [v.name,v]));
  for (const v of a.variables ?? []) vars.set(v.name,v);
  for (const n of a.nodes) if (n.kind === 'input') for (const entry of inputBindings(n,c)) vars.set(entry.name,{name:entry.name,type:entry.type,description:'Entrada declarada pelo estudante.'});
  return {...c,variables:[...vars.values()]};
}

export function inputBindings(node: Block, contract: FlowChallenge): InputBinding[] {
  return node.inputs ?? (node.target ? [{ name:node.target, source:node.inputKey??node.target, type:node.dataType??contract.variables.find(v=>v.name===node.target)?.type??'numero' }] : []);
}
