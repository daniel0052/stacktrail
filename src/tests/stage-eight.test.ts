import {describe,it,expect} from 'vitest';
import {activities,books,getStage,projects,references,topicIdsForTrack,activityForTrack} from '../practice/curriculum';
import {modules08} from '../practice/stage-eight';
import {attemptFor,blankAttempt,blankPilot,parsePilot,stageEvidenceFor,withAttempt,withStageEvidence,type Pilot} from '../practice/progress';
import {stageProgress} from '../practice/achievements';
import {promptFor} from '../practice/prompts';
import {preparationFor} from '../practice/preparation';
import {preparationPrompt} from '../practice/preparation-prompt';
const finish=(p:Pilot,id:string)=>withAttempt(withAttempt(p,id,{solution:'Evidência sintética de teste; não é execução do estudante.'}),id,{checks:blankAttempt(id).checks.map(()=>true),status:'concluido'});
describe('Etapa08 — entrega, autonomia e compatibilidade',()=>{
 it('mantém oito módulos, práticas específicas e fontes resolvíveis sem soluções',()=>{
  expect(modules08).toHaveLength(8);
  for(const track of ['php','javascript'] as const){const stage=getStage('08',track)!;expect(stage.topics).toHaveLength(9);expect(stage.exercises).toHaveLength(16);expect(stage.topics.filter(t=>t.track===track)).toHaveLength(1);expect(stage.project.id).toBe('08-project-delivery');}
  expect(projects.filter(a=>a.stageId==='08')).toHaveLength(1);
  for(const a of [...activities,...projects].filter(a=>a.stageId==='08')){expect(a.hints).toHaveLength(3);expect(preparationFor(a),a.id).toBeDefined();for(const id of a.refs)expect(references.some(r=>r.id===id),id).toBe(true);for(const id of a.topicIds)expect(getStage('08')!.topics.some(t=>t.id===id),id).toBe(true);}
  for(const t of getStage('08')!.topics){for(const id of t.refs)expect(references.some(r=>r.id===id),id).toBe(true);for(const id of t.exerciseIds)expect(activities.some(a=>a.id===id),id).toBe(true);expect(t.practiceCriteria.length).toBeGreaterThan(0);}
 });
 it('exige todas as competências, separa stacks e reverte conclusão',()=>{
  let p=blankPilot();p.currentStage='08';p.studied=getStage('08','php')!.topics.map(t=>t.id);
  for(const a of getStage('08','php')!.exercises)p=finish(p,a.id);
  p=withStageEvidence(p,'08','Síntese por stack');expect(stageProgress(p,'08').done).toBe(false);
  p=finish(p,'08-project-delivery');expect(stageProgress(p,'08').percent).toBe(100);expect(stageProgress(parsePilot(p),'08').done).toBe(true);
  const other={...p,track:'javascript' as const};expect(attemptFor(other,'08-project-delivery')).toBeUndefined();expect(stageEvidenceFor(other,'08')).toBe('');expect(stageProgress(other,'08').done).toBe(false);
  p=withAttempt(p,'08-ex-14',{solution:'Texto editado invalida critérios.'});expect(stageProgress(p,'08').done).toBe(false);expect(stageProgress(p,'08').advanced).toBe(4);
 });
 it('preserva esquema2 antigo, rejeita flags/IDs e síntese inválidos sem conclusão futura',()=>{
  const old=blankPilot();delete (old.stageEvidence as Partial<typeof old.stageEvidence>)['08'];expect(parsePilot(old).currentStage).toBe('00');
  expect(()=>parsePilot({...blankPilot(),deliveryEvidence:{php:42}})).toThrow();
  expect(()=>parsePilot({...blankPilot(),attempts:{'08-ex-99@php':blankAttempt('08-ex-01')}})).toThrow();
  expect(()=>parsePilot({...blankPilot(),attempts:{'08-ex-01@unknown':blankAttempt('08-ex-01')}})).toThrow();
  expect(stageProgress(blankPilot(),'15').available).toBe(false);
 });
 it('preparadora não entrega o alvo e tutora/revisora usam08 e runtime escolhido',()=>{
  for(const track of ['php','javascript'] as const)for(const a of [...activities,...projects].filter(t=>t.stageId==='08')){
   const prepare=preparationPrompt(a,track);expect(prepare).toContain('Trabalho reservado ao estudante, NÃO implementar');expect(prepare).toContain('Ambiente não executado e não validado');expect(prepare).toContain('Portas publicadas no host/port-forward');expect(prepare).not.toContain('Sem Docker antes da Etapa08, CI/deploy');
   const task=activityForTrack(a,track);expect(task.requirements.join(' ')).not.toContain('[runtime08]');expect(topicIdsForTrack(a,track).every(id=>!id.endsWith(track==='php'?'javascript':'php'))).toBe(true);
   const help=promptFor('help',a,{...blankAttempt(a.id),hints:1},track);const review=promptFor('review',a,blankAttempt(a.id),track);
   expect(help).toContain('Etapa08: Docker');expect(help).toContain(a.hints[0]);expect(help).not.toContain(a.hints[1]);expect(review).toContain('Não verificado');expect(review).toContain('manifests');expect(review).not.toContain('[runtime08]');expect(help).not.toContain('Etapa 04: APIs REST');
  }
 });
 it('livros são opcionais com alternativa gratuita e ausência de licença de capa explícita',()=>{
  const list=books.filter(b=>b.stages.includes('08'));expect(list).toHaveLength(2);for(const b of list){expect(b.cover.kind).toBe('image');expect(b.cover.src).toMatch(/^assets\/books\/stage08\/.+\.webp$/);for(const id of b.alternatives)expect(references.find(r=>r.id===id)?.cost).toBe('Gratuito');}
 });
});
