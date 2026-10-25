import {describe,it,expect} from 'vitest';
import {activities,books,getStage,projects,references,topicIdsForTrack} from '../practice/curriculum';
import {attemptFor,blankAttempt,blankPilot,parsePilot,stageEvidenceFor,updateStageStatus,withAttempt,withStageEvidence,type Pilot} from '../practice/progress';
import {dashboard,stageProgress} from '../practice/achievements';
import {promptFor} from '../practice/prompts';

function finish(p:Pilot,id:string){const a=blankAttempt(id);return withAttempt(withAttempt(p,id,{solution:'Evidência sintética de teste local'}),id,{checks:a.checks.map(()=>true),status:'concluido'});}
function prepared(track:Pilot['track']){let p=blankPilot();p.track=track;p.currentStage='07';p.studied=getStage('07',track)!.topics.filter(t=>!t.optional).map(t=>t.id);for(const a of getStage('07',track)!.exercises.filter(a=>!a.optional))p=finish(p,a.id);return withStageEvidence(p,'07','Síntese sintética sanitizada');}
describe('Etapa07 — segurança, autonomia e progresso por trilha',()=>{
 it('oferece9 problemas,3por nível, avançados opcionais e3projetos sem duplicar stacks',()=>{
  const list=activities.filter(a=>a.stageId==='07');expect(list).toHaveLength(9);expect(new Set(list.map(a=>a.sector)).size).toBe(9);
  for(const level of ['inicial','intermediario','avancado'])expect(list.filter(a=>a.level===level)).toHaveLength(3);
  expect(list.filter(a=>a.optional).map(a=>a.id)).toEqual(['07-ex-07','07-ex-08','07-ex-09']);
  expect(projects.filter(a=>a.stageId==='07')).toHaveLength(3);
  for(const track of ['php','javascript'] as const){const s=getStage('07',track)!;expect(s.topics.filter(t=>!t.optional)).toHaveLength(12);expect(s.topics.filter(t=>t.track===track)).toHaveLength(3);expect(s.exercises).toHaveLength(9);expect(s.topics.some(t=>t.track===(track==='php'?'javascript':'php'))).toBe(false);}
 });
 it('mantém referências e pré-requisitos resolvíveis e critérios próprios sem gabaritos',()=>{
  const s=getStage('07')!;
  for(const a of [...s.exercises,...projects.filter(a=>a.stageId==='07')]){expect(a.hints).toHaveLength(3);expect(a.acceptanceCriteria.length).toBeGreaterThan(1);for(const id of a.refs)expect(references.some(r=>r.id===id),id).toBe(true);}
  for(const t of s.topics){expect(t.practiceCriteria.length).toBeGreaterThan(0);for(const id of t.refs)expect(references.some(r=>r.id===id),id).toBe(true);for(const id of t.exerciseIds)expect(activities.some(a=>a.id===id),id).toBe(true);}
  expect(books.filter(b=>b.stages.includes('07'))).toHaveLength(3);
  expect(books.filter(b=>b.stages.includes('07')).some(b=>b.language==='Português brasileiro')).toBe(true);
 });
 it.each(['php','javascript'] as const)('conclui só com núcleo e integrador na stack%s; opcionais não bloqueiam',track=>{
  let p=prepared(track);p=finish(p,'07-project-admin');p=finish(p,'07-project-resources');expect(stageProgress(p,'07').done).toBe(false);
  p=finish(p,'07-project-booking');expect(stageProgress(p,'07')).toMatchObject({done:true,percent:100,total:20});
  const reloaded=parsePilot(JSON.parse(JSON.stringify(p)));expect(stageProgress(reloaded,'07').done).toBe(true);expect(dashboard(reloaded).achievements.find(a=>a.id==='first-stage')?.earned).toBe(true);
  const edited=withAttempt(reloaded,'07-project-booking',{solution:'Tentativa alterada'});expect(stageProgress(edited,'07').done).toBe(false);expect(attemptFor(edited,'07-project-booking')?.checks.every(v=>!v)).toBe(true);expect(dashboard(edited).achievements.find(a=>a.id==='first-stage')?.earned).toBe(false);
 });
 it('preserva rascunhos/conclusão separados, pausa, recarga e retorno à trilha',()=>{
  let php=finish(prepared('php'),'07-project-booking');php.stageTracking['07']=updateStageStatus(undefined,'pausada');
  let js:Pilot={...php,track:'javascript'};expect(attemptFor(js,'07-ex-02')).toBeUndefined();expect(stageEvidenceFor(js,'07')).toBe('');expect(stageProgress(js,'07').done).toBe(false);
  js=withAttempt(js,'07-ex-02',{solution:'Tentativa Express',status:'em-andamento'});js=withStageEvidence(js,'07','Síntese Express');
  const loaded=parsePilot(JSON.parse(JSON.stringify(js)));expect(attemptFor(loaded,'07-ex-02')?.solution).toBe('Tentativa Express');
  php={...loaded,track:'php'};expect(attemptFor(php,'07-ex-02')?.status).toBe('concluido');expect(stageEvidenceFor(php,'07')).toBe('Síntese sintética sanitizada');expect(stageProgress(php,'07').done).toBe(true);
  const stopped=withAttempt(loaded,'07-ex-02',{status:'novo'});expect(attemptFor(stopped,'07-ex-02')?.solution).toBe('Tentativa Express');expect(stageProgress(stopped,'07').paused).toBe(true);
 });
 it('migra esquema2 anterior conservadoramente e rejeita namespaces/tipos/IDs desconhecidos',()=>{
  const old=blankPilot();delete (old.stageEvidence as Partial<Pilot['stageEvidence']>)['07'];expect(parsePilot(old).stageEvidence['07']).toBe('');
  const raw=blankPilot();raw.currentStage='07';raw.attempts['07-ex-02']={...blankAttempt('07-ex-02'),solution:'Rascunho anterior'};const migrated=parsePilot(raw);expect(attemptFor(migrated,'07-ex-02')?.solution).toBe('Rascunho anterior');expect(migrated.attempts['07-ex-02']).toBeUndefined();
  expect(()=>parsePilot({...raw,attempts:{'07-ex-99@php':blankAttempt('07-ex-02')}})).toThrow();
  expect(()=>parsePilot({...raw,attempts:{'07-ex-02@admin':blankAttempt('07-ex-02')}})).toThrow();
  expect(()=>parsePilot({...raw,securityEvidence:{php:true}})).toThrow();expect(stageProgress(raw,'16').available).toBe(false);
 });
 it.each(['php','javascript'] as const)('prompts%s trazem riscos/limites e só referências da stack; dicas só reveladas',track=>{
  const a=activities.find(a=>a.id==='07-ex-02')!;const attempt={...blankAttempt(a.id),solution:'Minha tentativa',hints:1};
  const help=promptFor('help',a,attempt,track),review=promptFor('review',a,attempt,track);
  expect(help).toContain(a.hints[0]);expect(help).not.toContain(a.hints[1]);expect(help).toContain('próxima pista');expect(review).toContain('BOLA/IDOR');expect(review).toContain('vulnerabilidades comprovadas');expect(review).toContain('evidências insuficientes');expect(review).toContain('Não afirmar teste de segurança');expect(review).toContain('Minha tentativa');
  expect(review).not.toContain(track==='php'?'https://github.com/ranisalt/node-argon2':'https://laravel.com/docs/13.x/authentication');
  expect(topicIdsForTrack(a,track).some(id=>id.startsWith(track==='php'?'07-express-':'07-laravel-'))).toBe(false);
 });
});
