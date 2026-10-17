import {it,expect} from 'vitest';
import {lessons,selfAssessment} from '../content/stage-03';
import {assessmentJS,exerciseAreas,trackLessons,visibleLessons,contextTrack,type BackendTrack} from '../content/stage-03/curriculum';
import {exercises} from '../content/stage-03/exercises';
import {exercises as legacy} from '../content/stage-01/exercises';
import {newProgress,newExerciseProgress,parseProgress,stageSummary,backendTrackSummary,updateExercise,validPath} from '../features/progress/model';
import {getStageStatus} from '../features/progress/roadmap';
import {reviewPrompt} from '../components/lab/reviewPrompt';
function finish(track:BackendTrack){
 let p=newProgress();p.backendTrack03=track;p.lessons=trackLessons(track).map(l=>`03:${l.id}`);
 if(track==='php'){p.assessment03=selfAssessment.map(()=>true);p.evidence03=selfAssessment.map(()=>'Comando e resultado declarado');}
 else {p.assessment03js=assessmentJS.map(()=>true);p.evidence03js=assessmentJS.map(()=>'Comando e resultado declarado');}
 for(const exercise of exercises.filter(e=>['common',track].includes(exerciseAreas[e.id]))){
  p=updateExercise(p,exercise.id,{solution:'Tentativa',reflection:'Resultado local declarado'});
  p=updateExercise(p,exercise.id,{checks:exercise.acceptanceCriteria.map(()=>true),status:'concluido'});
 }
 return p;
}
it('inventário mantém rotas livres e percursos sem obrigar a outra stack',()=>{
 expect(lessons).toHaveLength(31);expect(exercises).toHaveLength(21);
 for(const lesson of lessons)expect(validPath(`/etapas/03/aulas/${lesson.id}`)).toBe(true);
 for(const exercise of exercises)expect(validPath(`/etapas/03/laboratorio/${exercise.slug}`)).toBe(true);
 expect(visibleLessons('javascript').some(l=>l.id==='php-inicio')).toBe(false);
 expect(contextTrack('aulas','javascript')).toBe('javascript');
 expect(contextTrack('php-inicio','javascript')).toBe('php');
});
it('migra v5 e v6 sem atribuir evidências PHP a JS nem perder rascunhos',()=>{
 const current=newProgress();const old={...current,version:5,assessment03:undefined,evidence03:undefined,lessons:['02:urls'],exercises:{[legacy[0].id]:{...newExerciseProgress(legacy[0].acceptanceCriteria.length),solution:'rascunho preservado'}}};
 const migrated=parseProgress(JSON.stringify(old));expect(migrated.version).toBe(7);expect(migrated.exercises[legacy[0].id].solution).toBe('rascunho preservado');
 const v6={...newProgress(),version:6,assessment03js:assessmentJS.map(()=>true),evidence03js:assessmentJS.map(()=>'campo estranho à versão v6'),lessons:['03:node-runtime'],assessment03:[true,false,false,false,false,false],evidence03:['legado','','','','',''],exercises:{'03-ex02':{...newExerciseProgress(exercises[1].acceptanceCriteria.length),solution:'JSON legado',hints:2}}};
 const next=parseProgress(JSON.stringify(v6));expect(next.backendTrack03).toBe('php');expect(next.evidence03[0]).toBe('legado');expect(next.assessment03js.every(v=>!v)).toBe(true);expect(next.exercises['03-ex02'].solution).toBe('JSON legado');expect(next.lessons).toEqual(v6.lessons);
 expect(()=>parseProgress(JSON.stringify({...v6,lessons:['03:js-valores']}))).toThrow();
});
it.each(['php','javascript'] as const)('conclui %s sem registros da outra trilha e preserva ao trocar preferência',track=>{
 const p=finish(track);expect(backendTrackSummary(p,track).ready).toBe(true);expect(stageSummary(p,'03').ready).toBe(true);
 const other:BackendTrack=track==='php'?'javascript':'php';expect(backendTrackSummary(p,other).ready).toBe(false);
 expect(exercises.filter(e=>exerciseAreas[e.id]===other||exerciseAreas[e.id]==='extra').every(e=>!p.exercises[e.id])).toBe(true);
 const switched={...p,backendTrack03:other};expect(getStageStatus(switched,'03')).toBe('concluido');expect(parseProgress(JSON.stringify(switched))).toEqual(switched);
});
it('fundamentos comuns, evidências e revisão da tentativa atual não podem ser omitidos',()=>{
 const p=finish('javascript');const noRead={...p,lessons:p.lessons.filter(id=>id!=='03:ciclo')};expect(stageSummary(noRead,'03').ready).toBe(false);
 expect(stageSummary({...p,evidence03js:p.evidence03js.map(()=> ' ')},'03').ready).toBe(false);
 const changed=updateExercise(p,'03-ex04',{solution:'Código alterado'});expect(stageSummary(changed,'03').ready).toBe(false);expect(changed.exercises['03-ex04'].checks.every(v=>!v)).toBe(true);
 expect(stageSummary({...p,exercises:{...p.exercises,'03-ex21':newExerciseProgress(3)}},'03').ready).toBe(false);
});
it('v7 recusa preferência/competências adulteradas e revisão não exige PHP para JS',()=>{
 const p=finish('javascript');for(const patch of [{backendTrack03:'nest'},{assessment03js:[true]},{evidence03js:[1,2,3,4,5,6]}])expect(()=>parseProgress(JSON.stringify({...p,...patch}))).toThrow();
 const prompt=reviewPrompt(exercises[3],'código','reflexão');expect(prompt).toContain('Funcionamento: 30%');expect(prompt).toContain('Testes: 15%');expect(prompt).not.toContain('A base é PHP/Laravel');
});
