import { describe,it,expect } from 'vitest';
import { lessons,selfAssessment } from '../content/stage-02';
import { exercises } from '../content/stage-02/exercises';
import { newProgress,parseProgress,updateExercise,stageSummary,validPath } from '../features/progress/model';
describe('Etapa 02: inventário e compatibilidade',()=>{
 it('tem cinco módulos, nove desafios e opcionais sem bloquear avanço',()=>{
  expect(new Set(lessons.map(l=>l.topic)).size).toBe(5);expect(exercises).toHaveLength(9);expect(exercises.filter(e=>e.optional)).toHaveLength(3);expect(exercises.every(e=>e.hints.length===3)).toBe(true);
  let p=newProgress();for(const e of exercises.filter(e=>!e.optional))p=updateExercise(p,e.id,{checks:e.acceptanceCriteria.map(()=>true),status:'concluido',solution:'Evidência declarada de execução externa'});
  p.assessment02=selfAssessment.map(()=>true);expect(stageSummary(p,'02').ready).toBe(false);p.evidence02=selfAssessment.map(()=> 'Comandos e registros revisáveis, ainda não verificados pela plataforma');expect(stageSummary(p,'02').ready).toBe(true);expect(stageSummary(p,'01').ready).toBe(false);
 });
 it('migra v4 mantendo rascunhos, IDs, tema e preferências das etapas anteriores',()=>{
  const p=updateExercise(newProgress(),'ex-01',{solution:'antigo\n  indentado',hints:2,reflection:'dúvida'});const legacy={...p,version:4,assessment02:undefined,evidence02:undefined};const next=parseProgress(JSON.stringify(legacy));
  expect(next.version).toBe(5);expect(next.exercises).toEqual(p.exercises);expect(next.lastPath).toBe(p.lastPath);expect(next.assessment00).toEqual(p.assessment00);expect(next.evidence02).toEqual(selfAssessment.map(()=>''));expect(parseProgress(JSON.stringify(next))).toEqual(next);
 });
 it('rejeita dados e rotas inválidas, abrir aula não conclui a etapa',()=>{
  expect(()=>parseProgress(JSON.stringify({...newProgress(),assessment02:[true]}))).toThrow();expect(validPath('/etapas/02/aulas/urls')).toBe(true);expect(validPath('/etapas/02/aulas/desconhecida')).toBe(false);expect(stageSummary({...newProgress(),lastPath:'/etapas/02/laboratorio'},'02').ready).toBe(false);
 });
});
