import { parseAlgorithm, valueMatches, scopeContract, allTestCases, inputBindings, type Algorithm, type Block, type Branch, type Expression, type FlowChallenge, type Operand, type Run, type TestResult, type Value, type ValueType } from './model';

const arrayType = (type: ValueType): ValueType | undefined => type === 'numeros' ? 'numero' : type === 'textos' ? 'texto' : undefined;
function operandType(o: Operand, c: FlowChallenge): ValueType {
  if (o.kind === 'expression') return expressionType(o.expression,c);
  if (o.kind === 'literal') return typeof o.value === 'number' ? 'numero' : typeof o.value === 'boolean' ? 'booleano' : 'texto';
  const v = c.variables.find(v => v.name === o.name);
  if (!v) throw new Error(`Variável inexistente: ${o.name}.`);
  if (o.kind === 'variable') return v.type;
  if (v.type === 'matriz') {
    if (o.kind === 'length' || o.kind === 'columns') return 'numero';
    if (o.kind !== 'cell' || [o.row,o.column].some(n => (typeof n === 'string' ? c.variables.find(v => v.name === n)?.type : operandType(n,c)) !== 'numero')) throw new Error('Matriz exige índices numéricos de linha e coluna.');
    return 'numero';
  }
  if (o.kind === 'cell' || o.kind === 'columns') throw new Error('Acesso exige matriz.');
  const itemType = arrayType(v.type);
  if (!itemType) throw new Error(`${o.name} não é uma coleção.`);
  if (o.kind === 'length') return 'numero';
  if ((typeof o.index === 'string' ? c.variables.find(v => v.name === o.index)?.type : operandType(o.index,c)) !== 'numero') throw new Error('O índice deve ser uma variável numérica do contrato.');
  return itemType;
}
function expressionType(e: Expression, c: FlowChallenge): ValueType {
  const a = operandType(e.a, c);
  if (e.op === 'copy') return a;
  if (e.op === 'not' && a === 'booleano') return 'booleano';
  if (e.op === 'number' && a === 'texto') return 'numero';
  if (e.op === 'text' && ['numero','booleano'].includes(a)) return 'texto';
  if (e.op === 'empty' && arrayType(a)) return a;
  if (!e.b) throw new Error('Escolha o segundo valor da operação.');
  const b = operandType(e.b, c);
  if (e.op === 'swap' && arrayType(a) && b === 'numero' && e.c && operandType(e.c,c) === 'numero') return a;
  if (['+', '-', '*', '/', '%', 'floor/'].includes(e.op) && a === 'numero' && b === 'numero') return 'numero';
  if (['>', '>=', '<', '<='].includes(e.op) && a === 'numero' && b === 'numero') return 'booleano';
  if (['==', '!='].includes(e.op) && a === b && !arrayType(a) && a !== 'matriz') return 'booleano';
  if (['and', 'or'].includes(e.op) && a === 'booleano' && b === a) return 'booleano';
  if (e.op === 'append' && arrayType(a) === b) return a;
  if (e.op === 'contains' && arrayType(a) === b) return 'booleano';
  throw new Error(`Operação ${e.op} incompatível com ${a} e ${b}.`);
}
export function validateAlgorithm(raw: Algorithm, c: FlowChallenge, definitions = raw.functions ?? [], returnType?: ValueType, inside = false): string[] {
  let a: Algorithm;
  try { a = parseAlgorithm(raw); } catch (e) { return [e instanceof Error ? e.message : 'Fluxograma inválido.']; }
  const externalContract = c;
  c = scopeContract(a,c);
  const errors: string[] = [];
  const starts = a.nodes.filter(n => n.kind === 'start');
  if (starts.length !== 1) errors.push('Use exatamente um bloco Início.');
  if (!a.nodes.some(n => n.kind === 'end' || n.kind === 'return')) errors.push('Adicione um bloco Fim.');
  for (const edge of a.edges) if (!a.nodes.some(n => n.id === edge.from) || !a.nodes.some(n => n.id === edge.to)) errors.push('Uma conexão aponta para um bloco inexistente.');
  const reachableNodes = new Set<string>();
  const follow = (id: string) => { if (reachableNodes.has(id)) return; reachableNodes.add(id); a.edges.filter(e=>e.from===id).forEach(e=>follow(e.to)); };
  if (starts.length === 1) follow(starts[0].id);
  for (const n of a.nodes.filter(n=>reachableNodes.has(n.id))) {
    const outgoing = a.edges.filter(e => e.from === n.id);
    const required: Branch[] = n.kind === 'end' || n.kind === 'return' ? [] : n.kind === 'decision' ? ['true', 'false'] : ['next'];
    if (outgoing.length !== required.length || required.some(b => outgoing.filter(e => e.branch === b).length !== 1)) errors.push(`${n.id}: conecte ${required.length ? required.map(b => b === 'true' ? 'Sim' : b === 'false' ? 'Não' : 'Próximo').join(' e ') : 'nenhuma saída após Fim'}.`);
    try {
      const target = c.variables.find(v => v.name === n.target);
      if (inside && ['input','output'].includes(n.kind)) throw new Error('Use parâmetros e retorno em funções; entrada/saída pertencem ao principal.');
      if (n.kind === 'call') {
        const f = definitions.find(f => f.id === n.functionId);
        if (!f) throw new Error('Chamada de função inexistente.');
        if ((n.arguments?.length ?? 0) !== f.parameters.length) throw new Error('Quantidade de argumentos incompatível.');
        f.parameters.forEach((p,i) => { if (operandType(n.arguments![i],c) !== p.type) throw new Error('Tipo de argumento incompatível.'); });
        if (f.returnType ? !target || target.type !== f.returnType : n.target !== undefined) throw new Error('Destino de retorno incompatível; procedimentos não possuem destino.');
      }
      if (n.kind === 'return') {
        if (!inside) throw new Error('Retorno só pode ser usado em função.');
        if (returnType ? !n.expression || expressionType(n.expression,c) !== returnType : n.expression !== undefined) throw new Error('Tipo de retorno incompatível.');
      }
      if (inside && returnType && n.kind === 'end') throw new Error('Função com valor deve terminar em Retorno.');
      if ((['process'].includes(n.kind) || (n.kind === 'output' && !n.expression)) && !target) throw new Error('Escolha uma variável existente.');
      if (n.kind === 'input') { const entries=inputBindings(n,externalContract); if(!entries.length) throw new Error('Configure pelo menos uma entrada.'); for(const entry of entries){if(entry.source){const input=externalContract.variables.find(v=>v.input&&v.name===entry.source);if(!input||input.type!==entry.type)throw new Error(`Entrada ${entry.name}: o enunciado exige ${input?.type??'um dado conhecido'} para ${entry.source}; o bloco declarou ${entry.type}.`);}else if(!valueMatches(entry.value,entry.type))throw new Error(`Entrada livre ${entry.name}: configure um valor do tipo ${entry.type}.`);} }
      if (n.kind === 'output') { const key = n.outputKey ?? n.target; const output = externalContract.variables.find(v => v.name === key); if (!externalContract.outputs.includes(key!)) throw new Error('Escolha uma saída prevista no contrato.'); const type = n.expression ? expressionType(n.expression,c) : target?.type; if (output && output.type !== type) throw new Error('Tipo da saída incompatível com o contrato.'); }
      if (n.kind === 'process' || n.kind === 'decision') {
        if (!n.expression) throw new Error('Configure a operação.');
        const type = expressionType(n.expression, c);
        if (n.kind === 'decision' && type !== 'booleano') throw new Error('A decisão precisa produzir verdadeiro ou falso.');
        if (n.kind === 'process' && (target?.type !== type)) throw new Error('O resultado deve ter o tipo da variável de destino.');
      }
    } catch (e) { errors.push(`${n.id}: ${e instanceof Error ? e.message : 'Configuração inválida.'}`); }
  }
  if (starts.length === 1) {
    const reachable = new Set<string>();
    const visit = (id: string) => { if (reachable.has(id)) return; reachable.add(id); a.edges.filter(e => e.from === id).forEach(e => visit(e.to)); };
    visit(starts[0].id);

    const reachesEnd = new Set(a.nodes.filter(n => (n.kind === 'end' || n.kind === 'return')).map(n => n.id));
    let changed = true;
    while (changed) { changed = false; for (const e of a.edges) if (reachesEnd.has(e.to) && !reachesEnd.has(e.from)) { reachesEnd.add(e.from); changed = true; } }
    if (a.nodes.some(n => reachable.has(n.id) && !reachesEnd.has(n.id))) errors.push('Todo bloco precisa ter um caminho possível até Fim.');
  }
  if (!inside) {
    const seen = new Set<string>();
    const queue = a.nodes.filter(n=>reachableNodes.has(n.id)&&n.kind==='call').map(n=>n.functionId);
    while(queue.length){const id=queue.shift();if(!id||seen.has(id))continue;seen.add(id);const f=definitions.find(f=>f.id===id);if(!f)continue;
      errors.push(...validateAlgorithm(f.algorithm,{...c,variables:[...f.parameters,...f.locals],outputs:[]},definitions,f.returnType,true).map(e=>`${f.id}: ${e}`));
      const reachable=new Set<string>();const visit=(id:string)=>{if(reachable.has(id))return;reachable.add(id);f.algorithm.edges.filter(e=>e.from===id).forEach(e=>visit(e.to));};const start=f.algorithm.nodes.find(n=>n.kind==='start');if(start)visit(start.id);
      queue.push(...f.algorithm.nodes.filter(n=>reachable.has(n.id)&&n.kind==='call').map(n=>n.functionId));
    }
  }
  return [...new Set(errors)];
}
function read(o: Operand, vars: Record<string, Value>): Value {
  if (o.kind === 'expression') { const value = calculate(o.expression,vars); if (typeof value === 'number' && !valueMatches(value,'numero')) throw new Error('Resultado numérico fora dos limites.'); return value; }
  if (o.kind === 'literal') return o.value;
  if (!Object.hasOwn(vars, o.name)) throw new Error(`Leia ou inicialize ${o.name} antes de usar.`);
  const v = vars[o.name];
  if (o.kind === 'variable') return v;
  if (!Array.isArray(v)) throw new Error(`${o.name} não é coleção.`);
  if (o.kind === 'length') return v.length;
  if (o.kind === 'columns') return (v as number[][])[0]?.length ?? 0;
  if (o.kind === 'cell') { const row = typeof o.row === 'string' ? vars[o.row] : read(o.row,vars), column = typeof o.column === 'string' ? vars[o.column] : read(o.column,vars); if (typeof row !== 'number' || typeof column !== 'number' || !Number.isInteger(row) || !Number.isInteger(column) || row < 0 || column < 0 || row >= v.length || !Array.isArray(v[row]) || column >= (v[row] as number[]).length) throw new Error('Índice fora da matriz.'); return (v as number[][])[row][column]; }
  const index = typeof o.index === 'string' ? vars[o.index] : read(o.index,vars);
  if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index >= v.length) throw new Error(`Índice fora da coleção ${o.name}. Verifique o limite antes de acessar.`);
  return v[index];
}
function calculate(e: Expression, vars: Record<string, Value>): Value {
  if (e.op === 'empty') return [];
  const a = read(e.a, vars);
  if (e.op === 'copy') return structuredClone(a);
  if (e.op === 'not') return !a;
  if (e.op === 'number') { if (typeof a !== 'string' || !a.trim() || !Number.isFinite(Number(a))) throw new Error('Conversão numérica inválida.'); return Number(a); }
  if (e.op === 'text') return String(a);
  // Boolean operators short-circuit: guard an index before accessing its item.
  if (e.op === 'and' && a === false) return false;
  if (e.op === 'or' && a === true) return true;
  const b = read(e.b!, vars);
  if (e.op === '==') return a === b;
  if (e.op === '!=') return a !== b;
  if (e.op === 'and') return a === true && b === true;
  if (e.op === 'or') return a === true || b === true;
  if (e.op === 'append') { if (!Array.isArray(a) || a.length >= 100) throw new Error('Coleção cheia (máximo 100 itens).'); return [...a, b] as Value; }
  if (e.op === 'swap') { const j = read(e.c!,vars); if (!Array.isArray(a) || typeof b !== 'number' || typeof j !== 'number' || !Number.isInteger(b) || !Number.isInteger(j) || b < 0 || j < 0 || b >= a.length || j >= a.length) throw new Error('Índice fora da coleção na troca.'); const copy = structuredClone(a); [copy[b],copy[j]] = [copy[j],copy[b]]; return copy; }
  if (e.op === 'contains') return (a as (number | string)[]).includes(b as number | string);
  const x = a as number, y = b as number;
  if (['/', '%', 'floor/'].includes(e.op) && y === 0) throw new Error('Divisão por zero.');
  switch (e.op) {
    case '+': return x + y;
    case '-': return x - y;
    case '*': return x * y;
    case '/': return x / y;
    case 'floor/': return Math.floor(x / y);
    case '%': return x % y;
    case '>': return x > y;
    case '>=': return x >= y;
    case '<': return x < y;
    case '<=': return x <= y;
    default: throw new Error('Operação não suportada.');
  }
}
export function execute(a: Algorithm, c: FlowChallenge, input: Record<string, Value>, limit = 2000): Run {
  const run: Run = { steps: [], output: {} };
  const vars: Record<string, Value> = Object.create(null) as Record<string, Value>;
  try {
    const errors = validateAlgorithm(a, c);
    if (errors.length) throw new Error(errors.join(' '));
    for (const v of c.variables.filter(v => v.input)) {
      const value = input[v.name];
      if (!valueMatches(value, v.type)) throw new Error(`Entrada ${v.name}: tipo inválido, tamanho ou valor fora dos limites.`);
      if (Array.isArray(value) && value.length > (v.maxItems ?? 100)) throw new Error(`Entrada ${v.name}: coleção acima do limite de itens.`);
      const values = Array.isArray(value) ? value : [value];
      if (values.some(n => typeof n === 'number' && ((v.integer && !Number.isInteger(n)) || (v.min !== undefined && n < v.min) || (v.max !== undefined && n > v.max)))) throw new Error(`Entrada ${v.name}: respeite a faixa e integralidade do contrato.`);
    }
    for (const name of c.sortedInputs ?? []) {
      const list = input[name] as number[];
      if (list.some((n, i) => i > 0 && n <= list[i - 1])) throw new Error(`Entrada ${name}: a busca exige ordem estritamente crescente, sem repetição.`);
    }
    const definitions = a.functions ?? [];
    let iterations = 0;
    const visit = (graph: Algorithm, contract: FlowChallenge, local: Record<string, Value>, stack: string[], functionId?: string): Value | undefined => {
      if (stack.length > 24) throw new Error('Limite de profundidade de chamadas (24). Verifique o caso-base.');
      contract = scopeContract(graph,contract);
      let node: Block | undefined = graph.nodes.find(n => n.kind === 'start');
      while (node) {
        if (run.steps.length >= Math.min(2000, Math.max(1, limit))) throw new Error('Limite de passos atingido. Verifique o avanço do contador e a condição do laço.');
        if (++iterations > 2000) throw new Error('Limite de iterações atingido.');
        const trace = (event?: string, returned?: Value) => { if (run.steps.length >= Math.min(2000, Math.max(1,limit))) throw new Error('Limite de passos atingido.'); run.steps.push({ blockId: node!.id, variables: structuredClone(local), output: structuredClone(run.output), functionId, stack: [...stack], ...(event ? { event } : {}), ...(returned !== undefined ? { returned } : {}) }); };
        if (node.kind === 'input') for(const entry of inputBindings(node,contract)) local[entry.name]=structuredClone(entry.source ? input[entry.source] : entry.value!);
        if (node.kind === 'process') {
          const result = calculate(node.expression!, local);
          if (!valueMatches(result, contract.variables.find(v => v.name === node!.target)!.type)) throw new Error('Resultado fora dos limites ou tipo incompatível.');
          local[node.target!] = result;
        }
        if (node.kind === 'call') {
          const f = definitions.find(f => f.id === node!.functionId)!;
          const values = (node.arguments ?? []).map(o => structuredClone(read(o,local)));
          const frame: Record<string, Value> = Object.create(null) as Record<string, Value>;
          f.parameters.forEach((p,i) => { if (!valueMatches(values[i],p.type)) throw new Error('Tipo de argumento inválido.'); frame[p.name] = values[i]; });
          trace(`Chamada ${f.id}(${values.map(v => JSON.stringify(v)).join(', ')})`);
          const result = visit(f.algorithm, { ...contract, variables: [...f.parameters,...f.locals], outputs: [] }, frame, [...stack,f.id],f.id);
          if (f.returnType) { if (!valueMatches(result,f.returnType)) throw new Error('Retorno inválido ou ausente.'); local[node.target!] = structuredClone(result); }
          trace(`Continuação após ${f.id}`,result);
        }
        if (node.kind === 'return') {
          const result = node.expression ? calculate(node.expression,local) : undefined;
          const f = definitions.find(f => f.id === functionId)!;
          if (f.returnType && !valueMatches(result,f.returnType)) throw new Error('Tipo de retorno inválido.');
          trace('Retorno', result); return result;
        }
        if (node.kind === 'output') {
          if (!node.expression && !Object.hasOwn(local,node.target!)) throw new Error(`Inicialize ${node.target} antes de informar a saída.`);
          const result = node.expression ? calculate(node.expression,local) : local[node.target!];
          const outputKey = node.outputKey ?? node.target!;
          const expectedType = c.variables.find(v=>v.name===outputKey)?.type;
          if (expectedType && !valueMatches(result,expectedType)) throw new Error('Saída fora dos limites ou com tipo inválido.');
          run.output[outputKey] = structuredClone(result);
        }
        const branch: Branch = node.kind === 'decision' ? calculate(node.expression!,local) === true ? 'true' : 'false' : 'next';
        if (node.kind !== 'call') { trace(); if (node.kind === 'decision') run.steps[run.steps.length - 1].branch = branch; }
        if (node.kind === 'end') return undefined;
        const nextId = graph.edges.find(e => e.from === node!.id && e.branch === branch)!.to;
        node = graph.nodes.find(n => n.id === nextId);
      }
    };
    visit(a,c,vars,['principal']);
    if (c.outputs.some(name => !Object.hasOwn(run.output, name))) throw new Error('O algoritmo terminou sem informar todas as saídas do contrato.');
  } catch (e) { run.error = e instanceof Error ? e.message : 'Não foi possível executar.'; }
  return run;
}
export function testAlgorithm(a: Algorithm, c: FlowChallenge): TestResult[] {
  return allTestCases(c).map(t => {
    const run = execute(a, c, t.input);
    const missing = t.requiredCalls?.filter(id => !run.steps.some(step => step.event?.startsWith(`Chamada ${id}(`)));
    if (!run.error && missing?.length) run.error = `Chamadas exigidas pelo contrato não executadas: ${missing.join(', ')}.`;
    if (!run.error && t.requiresFunctionCall && !run.steps.some(s=>s.event?.startsWith('Chamada '))) run.error='Chamadas exigidas: este exercício solicita uma sub-rotina; use uma função ou procedimento com o nome que preferir.';
    if (!run.error && t.requiresNestedCall && !run.steps.some(s=>(s.stack?.length??0)>=3)) run.error='Este exercício solicita uma função que chama outra função.';
    if (!run.error && t.requiresRecursion && !run.steps.some(s=>s.stack && new Set(s.stack).size<s.stack.length)) run.error='Este exercício solicita uma chamada recursiva para entradas além do caso-base.';
    return { name: t.name, passed: !run.error && c.outputs.every(key => JSON.stringify(run.output[key]) === JSON.stringify(t.expected[key])), actual: run.output, expected: structuredClone(t.expected), ...(run.error ? { error: run.error } : {}) };
  });
}
