import { describe, expect, it } from 'vitest';
import { parseExpression, parseAssignment, parseCall } from '../features/flow/syntax';
import { execute, testAlgorithm } from '../features/flow/interpreter';
import { parseAlgorithm, type Operand, type Algorithm } from '../features/flow/model';
import { curriculumTasks } from '../content/stage-00/deep-curriculum';
const task=curriculumTasks.find(t=>t.slug==='expressoes')!;
describe('Sintaxe estruturada, sem JavaScript',()=>{
 it('respeita precedência, parênteses, booleanos e índices',()=>{
  const a=structuredClone(task.solution);a.nodes.find(n=>n.id==='somar')!.expression=parseExpression('(quantidade + 2) * 3');a.nodes.find(n=>n.id==='multiplicar')!.expression=parseExpression('resultado / 3');
  expect(execute(a,task.challenge,{quantidade:4}).output.resultado).toBe(6);
  expect(parseAssignment('minhaSoma = 1 + 2 * 3').target).toBe('minhaSoma');
  expect(()=>parseExpression('dados[i + 1] > 0 and true')).not.toThrow();
  expect(parseCall('r = f((a + 2) / 3, "a,b", dados[0])').arguments).toHaveLength(3);
 });
 it.each(['globalThis.alert(1)','a.constructor','new Date()','1; fetch("x")','(()=>1)()','1 = 2','constructor','"texto sem fim'])('rejeita conteúdo fora da gramática: %s',source=>expect(()=>parseExpression(source)).toThrow());
 it('limita profundidade e tamanho no parser e na importação',()=>{
  expect(()=>parseExpression('('.repeat(30)+'1'+')'.repeat(30))).toThrow();
  expect(()=>parseExpression('1 + '.repeat(600)+'1')).toThrow();
  let expression:unknown={op:'copy',a:{kind:'literal',value:1}};for(let i=0;i<30;i++)expression={op:'copy',a:{kind:'expression',expression}};
  expect(()=>parseAlgorithm({version:1,nodes:[{id:'a',kind:'process',x:0,y:0,target:'r',expression}],edges:[]})).toThrow();
 });
 it('aceita nomes internos e de funções diferentes, além de esboços desconectados',()=>{
  const t=curriculumTasks.find(t=>t.slug==='composicao')!;const a=structuredClone(t.solution);
  const names=new Map(a.functions!.map(f=>[f.id,`minha_${f.id}`]));
  for(const f of a.functions!){f.id=names.get(f.id)!;for(const n of f.algorithm.nodes)if(n.functionId)n.functionId=names.get(n.functionId);}
  for(const n of a.nodes)if(n.functionId)n.functionId=names.get(n.functionId);
  a.functions!.push({id:'rascunho',parameters:[],locals:[],algorithm:{version:1,nodes:[{id:'inicio',kind:'start',x:0,y:0},{id:'fim',kind:'end',x:0,y:150}],edges:[]}});
  a.nodes.push({id:'esboco',kind:'process',x:2400,y:4000,target:'naoConfigurado'});
  expect(testAlgorithm(a,t.challenge).every(r=>r.passed)).toBe(true);
 });
 it('preserva coleções e índices com nomes próprios',async()=>{
  const {sumExample,sumChallenge}=await import('../content/stage-00/flow-examples');const a:Algorithm=structuredClone(sumExample);
  const rename=(name:string)=>name==='i'?'cursor':name==='total'?'acumulado':name==='duracoes'?'minutos':name;
  const visit=(o:Operand):Operand=>o.kind==='literal'?o:o.kind==='expression'?{...o,expression:{...o.expression,a:visit(o.expression.a),...(o.expression.b?{b:visit(o.expression.b)}:{})}}:o.kind==='item'?{...o,name:rename(o.name),index:typeof o.index==='string'?rename(o.index):visit(o.index)}:{...o,name:rename(o.name)};
  a.variables=[{name:'cursor',type:'numero',description:'Índice próprio'},{name:'acumulado',type:'numero',description:'Acumulador próprio'}];
  a.nodes=a.nodes.map(n=>({...n,...(n.target?{target:rename(n.target)}:{}),...(n.kind==='input'?{inputKey:'duracoes',dataType:'numeros' as const}:{}),...(n.kind==='output'?{outputKey:'total'}:{}),...(n.expression?{expression:{...n.expression,a:visit(n.expression.a),...(n.expression.b?{b:visit(n.expression.b)}:{})}}:{})}));
  expect(testAlgorithm(a,sumChallenge).every(r=>r.passed)).toBe(true);
 });

});
