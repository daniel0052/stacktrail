import {describe,it,expect} from 'vitest';
import {curriculumTasks} from '../content/stage-00/deep-curriculum';
import {practiceSeed} from '../content/stage-00/practice-seeds';
import {testAlgorithm as evaluate} from '../features/flow/interpreter';

describe('Variantes pedagógicas por conceito',()=>{
 for(const task of curriculumTasks){
  it(`${task.slug}: defeito demonstrável, solução intacta e conexão relevante`,()=>{
   const original=JSON.stringify(task.solution);
   expect(evaluate(task.solution,task.challenge).every(result=>result.passed)).toBe(true);
   const broken=practiceSeed(task.solution,task.challenge.id,'corrigir');
   expect(evaluate(broken.algorithm,task.challenge).some(result=>!result.passed)).toBe(true);
   const incomplete=practiceSeed(task.solution,task.challenge.id,'completar');
   expect(incomplete.algorithm.edges.find(edge=>edge.from==='inicio')).toEqual(task.solution.edges.find(edge=>edge.from==='inicio'));
   expect(evaluate(incomplete.algorithm,task.challenge).some(result=>!result.passed)).toBe(true);
   expect(JSON.stringify(task.solution)).toBe(original);
  });
 }
});
