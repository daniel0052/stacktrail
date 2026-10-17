import {describe,it,expect} from 'vitest';
import {curriculumTasks} from '../content/stage-00/deep-curriculum';
import {lessonActivities} from '../content/stage-00/lesson-activities';
import {execute, testAlgorithm} from '../features/flow/interpreter';
const task=(slug:string)=>curriculumTasks.find(t=>t.slug===slug)!;
function vectors(max:number):number[][] {const result:number[][]=[[]];let layer:number[][]=[[]];for(let n=1;n<=max;n++){layer=layer.flatMap(a=>[-1,0,1].map(x=>[...a,x]));result.push(...layer);}return result;}
describe('Factcheck independente Etapa 00',()=>{
 for(const [topic,t] of Object.entries(lessonActivities))it(`atividade ${topic}: execução dos casos publicados`,()=>{expect(testAlgorithm(t.solution,t.challenge).filter(r=>!r.passed)).toEqual([]);});
 it('ordenação preserva multiplicidades e produz ordem em todos os 121 vetores pequenos',()=>{
  const t=task('ordenacao');for(const dados of vectors(4)){const original=[...dados];const run=execute(t.solution,t.challenge,{dados});expect(run.error).toBeUndefined();const result=run.output.resultado as number[];expect(result).toHaveLength(dados.length);expect(result.every((x,i)=>i===0||result[i-1]<=x)).toBe(true);for(const x of [-1,0,1])expect(result.filter(v=>v===x)).toHaveLength(dados.filter(v=>v===x).length);expect(dados).toEqual(original);}
 });
 it('duplicados conserva primeira ordem e linear devolve primeira ocorrência, em 121 vetores',()=>{
  for(const dados of vectors(4)){const d=task('duplicados'),l=task('linear');const run=execute(d.solution,d.challenge,{dados});expect(run.error).toBeUndefined();const result=run.output.resultado as number[];expect(result).toEqual(dados.filter((x,i)=>dados.indexOf(x)===i));for(const alvo of [-2,-1,0,1,2]){const found=execute(l.solution,l.challenge,{dados,alvo});expect(found.error).toBeUndefined();expect(found.output.resultado).toBe(dados.indexOf(alvo));}}
 });
 it('matriz vazia, linhas vazias e retangular; irregular rejeitada',()=>{
  const t=task('matrizes');for(const [tabela,total] of [[[],0],[[[],[]],0],[[[1,-2,3],[4,5,-6]],5]] as const){const run=execute(t.solution,t.challenge,{tabela:tabela.map(row=>[...row])});expect(run.error).toBeUndefined();expect(run.output.total).toBe(total);}expect(execute(t.solution,t.challenge,{tabela:[[1],[2,3]]}).error).toBeDefined();
 });
 it('fatorial inteiro de 0 a 10 confrontado com valores de referência',()=>{
  const t=task('recursao');for(const [n,resultado] of [1,1,2,6,24,120,720,5040,40320,362880,3628800].entries()){const run=execute(t.solution,t.challenge,{n});expect(run.error).toBeUndefined();expect(run.output.resultado).toBe(resultado);}for(const n of [-1,1.5,11])expect(execute(t.solution,t.challenge,{n}).error).toBeDefined();
 });
 it('sobreposição confrontada com interseção de minutos, para todos os intervalos válidos entre 0 e 5',()=>{
  const t=lessonActivities.abstracao;for(let a=0;a<5;a++)for(let b=a+1;b<=5;b++)for(let c=0;c<5;c++)for(let d=c+1;d<=5;d++){const run=execute(t.solution,t.challenge,{inicioA:a,fimA:b,inicioB:c,fimB:d});const shared=Array.from({length:5},(_,i)=>i).some(i=>i>=a&&i<b&&i>=c&&i<d);expect(run.error).toBeUndefined();expect(run.output.conflito).toBe(shared);}
 });
});
