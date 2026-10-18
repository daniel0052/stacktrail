import {describe,it,expect} from 'vitest';
import {getStage,activities,projects,books} from '../practice/curriculum';
import {blankPilot,blankAttempt,parsePilot,updateAttempt,updateStageStatus,type Pilot} from '../practice/progress';
import {stageProgress,dashboard} from '../practice/achievements';
import {promptFor} from '../practice/prompts';
const finish=(p:Pilot,id:string)=>{const a=blankAttempt(id);p.attempts[id]={...a,status:'concluido',solution:'Evidência sintética de teste da plataforma',checks:a.checks.map(()=>true)};};
function prepared(track:Pilot['track']){const p=blankPilot();p.track=track;const s=getStage('05',track)!;p.studied=s.topics.filter(t=>!t.optional).map(t=>t.id);for(const a of s.exercises)finish(p,a.id);p.stageEvidence['05']='Síntese declarada para testar registros';return p;}
describe('Etapa05: integração e invariantes de progresso',()=>{
 it('mantém SQL comum, setores diversos e apenas a integração da stack selecionada',()=>{
  for(const track of ['php','javascript'] as const){const s=getStage('05',track)!;expect(s.topics.filter(t=>!t.optional)).toHaveLength(12);expect(s.exercises).toHaveLength(9);expect(s.topics.filter(t=>t.track===track)).toHaveLength(2);expect(s.topics.some(t=>t.track===(track==='php'?'javascript':'php'))).toBe(false);}
  const list=activities.filter(a=>a.stageId==='05');expect(new Set(list.map(a=>a.sector)).size).toBe(9);for(const level of ['inicial','intermediario','avancado'])expect(list.filter(a=>a.level===level)).toHaveLength(3);
  expect(projects.filter(a=>a.stageId==='05')).toHaveLength(5);
 });
 it.each(['php','javascript'] as const)('aceita cada projeto avançado equivalente e reverte ao editar (%s)',track=>{
  for(const project of projects.filter(a=>a.stageId==='05'&&a.level==='avancado')){
   const p=prepared(track);expect(stageProgress(p,'05').done).toBe(false);finish(p,project.id);
   expect(stageProgress(p,'05')).toMatchObject({done:true,percent:100,total:23});
   const loaded=parsePilot(JSON.parse(JSON.stringify(p)));expect(stageProgress(loaded,'05').done).toBe(true);
   loaded.attempts[project.id]=updateAttempt(loaded.attempts[project.id],{solution:'versão alterada'});expect(stageProgress(loaded,'05').done).toBe(false);
   expect(dashboard(loaded).achievements.find(a=>a.id==='first-stage')?.earned).toBe(false);
  }
 });
 it('projetos SQL opcionais não substituem API; pausar e trocar trilha não apagam registros',()=>{
  const p=prepared('php');finish(p,'05-project-ecommerce');finish(p,'05-project-logistics');expect(stageProgress(p,'05').done).toBe(false);
  p.stageTracking['05']=updateStageStatus(undefined,'em-andamento');p.stageTracking['05']=updateStageStatus(p.stageTracking['05'],'pausada');
  const serialized=JSON.stringify(p.attempts);expect(stageProgress(p,'05').paused).toBe(true);
  p.track='javascript';expect(JSON.stringify(p.attempts)).toBe(serialized);expect(stageProgress(p,'05').coreTopics).toBe(12);expect(stageProgress(p,'05').topics).toBe(10);
  p.track='php';p.stageTracking['05']=updateStageStatus(p.stageTracking['05'],'em-andamento');expect(stageProgress(p,'05').topics).toBe(12);
 });
 it('migra schema2 sem 05, mantém rascunhos e rejeita novas flags futuras',()=>{
  const old=blankPilot();const raw=JSON.parse(JSON.stringify(old));delete raw.stageEvidence['05'];raw.attempts['01-project']={...blankAttempt('01-project'),solution:'rascunho anterior'};
  const parsed=parsePilot(raw);expect(parsed.stageEvidence['05']).toBe('');expect(parsed.attempts['01-project'].solution).toBe('rascunho anterior');
  expect(()=>parsePilot({...parsed,stageEvidence:{...parsed.stageEvidence,'05':true}})).toThrow();expect(()=>parsePilot({...parsed,currentStage:'19'})).toThrow();expect(stageProgress(parsed,'19').available).toBe(false);
 });
 it('prompts incluem SQL, setor, limites e só as dicas reveladas na trilha escolhida',()=>{
  const task=activities.find(a=>a.id==='05-ex-06')!;for(const track of ['php','javascript'] as const){const a={...blankAttempt(task.id),hints:1};const help=promptFor('help',task,a,track);expect(help).toContain('Etapa: 05');expect(help).toContain('Setor: Saúde');expect(help).toContain(task.hints[0]);expect(help).not.toContain(task.hints[1]);expect(help).toContain(track==='php'?'Laravel/Eloquent':'Knex como query builder');const review=promptFor('review',task,a,track);expect(review).toContain('prova de rollback');expect(review).toContain('Não invente execução');expect(review).toContain('Não verificado');}
 });
 it('livros são opcionais com alternativas gratuitas rastreáveis e capas honestas',()=>{
  const list=books.filter(b=>b.stages.includes('05'));expect(list).toHaveLength(3);expect(list.every(b=>b.alternatives.length>0&&b.cover.kind==='image'&&b.cover.src?.startsWith('covers/'))).toBe(true);
 });
});
