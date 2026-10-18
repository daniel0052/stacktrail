import {describe,it,expect} from 'vitest';
import {getStage,activities,projects,topics,references,books,allActivities,activityById} from '../practice/curriculum';
import {blankPilot,blankAttempt,parsePilot,backup,importBackup,updateAttempt,updateStageStatus,type Pilot} from '../practice/progress';
import {stageProgress,dashboard} from '../practice/achievements';
import {promptFor} from '../practice/prompts';
function finish(p:Pilot,id:string){const a=blankAttempt(id);p.attempts[id]={...a,solution:'Link e evidências declaradas da minha tentativa',checks:a.checks.map(()=>true),status:'concluido'};}
function stageDone(id:'00'|'01'|'02'|'03',track:'php'|'javascript'='php'){const p=blankPilot();p.track=track;const s=getStage(id,track)!;p.studied=s.topics.filter(t=>!t.optional).map(t=>t.id);for(const a of s.exercises.filter(t=>t.level==='inicial'||t.level==='intermediario'||(id==='03'&&t.level==='avancado'&&!t.optional)))finish(p,a.id);if(id==='00'||id==='02'||id==='03')finish(p,s.project.id);p.stageEvidence[id]='Demonstrei as competências no meu roteiro de testes.';return p;}
describe('consolidated roadmap 00/01/02/03',()=>{
 it('has no dependency cycles, missing sources, disconnected exercises or namespace collisions',()=>{
 expect(new Set(allActivities.map(a=>a.id)).size).toBe(allActivities.length);expect(new Set(topics.map(t=>t.id)).size).toBe(topics.length);expect(new Set(references.map(r=>r.id)).size).toBe(references.length);
 for(const t of topics){for(const id of t.before.filter(id=>topics.some(t=>t.id===id)))expect(topics.findIndex(t=>t.id===id)).toBeLessThan(topics.indexOf(t));expect(t.competencies.length).toBeGreaterThan(0);expect(t.practiceCriteria.length).toBeGreaterThan(0);for(const id of t.refs)expect(references.some(r=>r.id===id)).toBe(true);for(const id of t.exerciseIds)expect(activities.some(a=>a.id===id&&a.stageId===t.stageId)).toBe(true);}
 for(const t of allActivities){for(const id of t.refs)expect(references.some(r=>r.id===id)).toBe(true);expect(t.hints.length).toBeLessThanOrEqual(3);expect(t.acceptanceCriteria.length).toBeGreaterThanOrEqual(2);}
 for(const b of books){for(const id of b.topics)expect(topics.some(t=>t.id===id)).toBe(true);for(const id of b.alternatives)expect(references.some(r=>r.id===id)).toBe(true);}
 });
 it('migrates v1 pilot drafts, preferences and archive without inventing Stage00 progress',()=>{
 const old={version:1,studied:['html','css'],attempts:{'01-project':{...blankAttempt('01-project'),solution:'original reservation project'}},theme:'light',font:150,track:'javascript',legacyArchive:'old global file'};
 const next=importBackup(JSON.stringify({schema:'stacktrail-roadmap-backup',version:1,pilot:old}));expect(next.version).toBe(2);expect(next.currentStage).toBe('01');expect(next.studied).toEqual(old.studied);expect(next.attempts['01-project'].solution).toBe('original reservation project');expect(next.legacyArchive).toBe(old.legacyArchive);expect(stageProgress(next,'00').percent).toBe(0);expect(importBackup(backup(next))).toEqual(next);
 });
 it('rejects malformed schema2 stage state and forged future activities instead of trusting flags',()=>{
 const p=blankPilot();for(const patch of [{stageEvidence:{'00':2,'01':'','02':'','03':''}},{currentStage:'19'},{stageTracking:{'02':{status:'concluida'}}},{attempts:{'19-fake':blankAttempt('ex-01')}},{version:'2'}])expect(()=>parsePilot({...p,...patch})).toThrow();
 expect(stageProgress(p,'19')).toMatchObject({available:false,done:false,percent:0});
 });
 it('completes and reverses Stage00, derives achievements without page-visit rewards',()=>{
 const empty=blankPilot();empty.currentStage='01';empty.studied=['react'];expect(stageProgress(empty,'01').started).toBe(true);expect(dashboard(empty).achievements.some(a=>a.earned)).toBe(false);
 const p=stageDone('00');expect(stageProgress(p,'00')).toMatchObject({done:true,percent:100});expect(dashboard(p).completed).toBe(1);expect(dashboard(p).achievements.find(a=>a.id==='first-stage')?.earned).toBe(true);
 p.studied=p.studied.filter(id=>id!=='00-variaveis');expect(stageProgress(p,'00').done).toBe(false);expect(dashboard(p).achievements.find(a=>a.id==='first-stage')?.earned).toBe(false);
 });
 it('keeps framework extras optional and reverses Stage01 when required work changes',()=>{
 const p=stageDone('01');expect(stageProgress(p,'01').done).toBe(true);expect(projects.filter(t=>p.attempts[t.id]?.status==='concluido')).toHaveLength(0);
 p.attempts['ex-01']=updateAttempt(p.attempts['ex-01'],{solution:'nova tentativa'});expect(stageProgress(p,'01').done).toBe(false);
 });
 it('completes Stage02 with 9 topics, 3 initial + 3 intermediate exercises and HTTP Diagnostic Lab project',()=>{
 const p=stageDone('02');expect(stageProgress(p,'02')).toMatchObject({available:true,status:'concluida',done:true,percent:100,topics:9,coreTopics:9,initial:3,intermediate:3,project:true});
 p.attempts['02-project-diagnostic-lab']=updateAttempt(p.attempts['02-project-diagnostic-lab'],{status:'em-andamento'});expect(stageProgress(p,'02').done).toBe(false);expect(stageProgress(p,'02').status).toBe('em-andamento');
 });
 it('completes Stage03 independently in PHP or TypeScript track, keeps NestJS optional in TS only, and preserves progress across track switches',()=>{
 const phpStage=getStage('03','php')!;
 const tsStage=getStage('03','javascript')!;
 expect(phpStage.topics.some(t=>t.id==='03-nestjs-opcional')).toBe(false);
 expect(phpStage.exercises.some(a=>a.id==='03-ts-extra-nest')).toBe(false);
 expect(tsStage.topics.some(t=>t.id==='03-nestjs-opcional'&&t.optional)).toBe(true);
 expect(tsStage.exercises.some(a=>a.id==='03-ts-extra-nest'&&a.optional)).toBe(true);
 // Complete Stage 03 in PHP track
 const pPhp=stageDone('03','php');
 expect(stageProgress(pPhp,'03')).toMatchObject({available:true,status:'concluida',done:true,percent:100,topics:18,coreTopics:18,initial:3,intermediate:3,advanced:2,project:true});
 // Switching to TypeScript does not convert PHP completion into TS completion, nor erase PHP records
 pPhp.track='javascript';
 expect(stageProgress(pPhp,'03').done).toBe(false);
 expect(stageProgress(pPhp,'03').topics).toBe(6); // 6 common topics remain studied
 expect(pPhp.attempts['03-php-01'].status).toBe('concluido');
 // Switching back to PHP restores 100% completion immediately
 pPhp.track='php';
 expect(stageProgress(pPhp,'03')).toMatchObject({status:'concluida',done:true,percent:100});
 // Complete Stage 03 in TypeScript track without optional NestJS topic or exercise
 const pTs=stageDone('03','javascript');
 expect(pTs.studied.includes('03-nestjs-opcional')).toBe(false);
 expect(pTs.attempts['03-ts-extra-nest']).toBeUndefined();
 expect(stageProgress(pTs,'03')).toMatchObject({available:true,status:'concluida',done:true,percent:100,topics:18,coreTopics:18,initial:3,intermediate:3,advanced:2,project:true});
 });
 it('starts, pauses and resumes stages 00, 01, 02 and 03 while preserving completed exercises, started projects and percentage',()=>{
 const p=blankPilot();
 for(const id of ['00','01','02','03'] as const){
  expect(stageProgress(p,id).status).toBe('nao-iniciada');
  p.stageTracking[id]=updateStageStatus(p.stageTracking[id],'em-andamento');
  expect(stageProgress(p,id)).toMatchObject({status:'em-andamento',started:true,paused:false});
  p.stageTracking[id]=updateStageStatus(p.stageTracking[id],'pausada');
  expect(stageProgress(p,id)).toMatchObject({status:'pausada',started:false,paused:true});
  p.stageTracking[id]=updateStageStatus(p.stageTracking[id],'em-andamento');
  expect(stageProgress(p,id)).toMatchObject({status:'em-andamento',started:true,paused:false});
 }
 for(const exId of ['02-ex-01','02-ex-02','02-ex-03','02-ex-04','02-ex-05'])finish(p,exId);
 p.attempts['02-project-diagnostic-lab']=updateAttempt(blankAttempt('02-project-diagnostic-lab'),{status:'em-andamento',solution:'em progresso'});
 const beforePause=stageProgress(p,'02');
 expect(beforePause).toMatchObject({status:'em-andamento',completedActivities:5,percent:29});
 p.stageTracking['02']=updateStageStatus(p.stageTracking['02'],'pausada');
 const paused=stageProgress(p,'02');
 expect(paused).toMatchObject({status:'pausada',started:false,paused:true,completedActivities:5,percent:29});
 expect(p.attempts['02-ex-05'].status).toBe('concluido');
 expect(p.attempts['02-project-diagnostic-lab'].status).toBe('em-andamento');
 expect(dashboard(p).exercises).toBe(5);
 expect(dashboard(p).achievements.find(a=>a.id==='five-exercises')?.earned).toBe(true);
 p.stageTracking['02']=updateStageStatus(p.stageTracking['02'],'em-andamento');
 expect(stageProgress(p,'02')).toMatchObject({status:'em-andamento',started:true,paused:false,completedActivities:5,percent:29});
 expect(parsePilot(JSON.parse(JSON.stringify(p)))).toEqual(p);
 });
 it('does not award a complete formation while future stages are unavailable',()=>{
 const zero=stageDone('00'),one=stageDone('01'),two=stageDone('02'),three=stageDone('03','php');const p={...zero,studied:[...new Set([...zero.studied,...one.studied,...two.studied,...three.studied])],attempts:{...zero.attempts,...one.attempts,...two.attempts,...three.attempts},stageEvidence:{...zero.stageEvidence,'00':zero.stageEvidence['00'],'01':one.stageEvidence['01'],'02':two.stageEvidence['02'],'03':three.stageEvidence['03'],'04':'','05':''}};
 const d=dashboard(p);expect(d.completed).toBe(4);expect(d.percent).toBe(20);expect(d.next?.id).toBe('04');expect(d.achievements.find(a=>a.id==='junior')?.earned).toBe(false);expect(d.formations.find(f=>f.id==='junior')).toMatchObject({done:3,total:9});expect(d.formations.find(f=>f.id==='junior')!.available).toBeGreaterThanOrEqual(5);
 });
 it('builds Stage00, Stage02 and Stage03 prompts with appropriate representation, active track, actual hints and evidence',()=>{
 const t=activityById('00-pf-05')!;const a={...blankAttempt(t.id),hints:1};const help=promptFor('help',t,a,'php');expect(help).toContain('Etapa: 00');expect(help).toContain(t.hints[0]);expect(help).not.toContain(t.hints[2]);expect(help).toContain('sem linguagem obrigatória');expect(help).not.toContain('base comum HTML');const review=promptFor('review',getStage('00')!.project,a,'javascript');expect(review).toContain('código executável ou repositório não são obrigatórios');expect(review).toContain(getStage('00')!.project.nonfunctional![0]);expect(review).toContain('Não invente execução');expect(review).toContain('Atendido / Parcialmente atendido / Não atendido / Não verificado');
 const t2=activityById('02-ex-05')!;const a2={...blankAttempt(t2.id),hints:2};const help2=promptFor('help',t2,a2,'javascript');expect(help2).toContain('Etapa: 02');expect(help2).toContain('independente de framework backend');expect(help2).toContain(t2.hints[1]);expect(help2).not.toContain(t2.hints[2]);
 const t3=activityById('03-php-05')!;const a3={...blankAttempt(t3.id),hints:1};const help3=promptFor('help',t3,a3,'php');expect(help3).toContain('Etapa: 03');expect(help3).toContain('Trilha selecionada: PHP + Laravel');expect(help3).toContain(t3.hints[0]);expect(help3).not.toContain(t3.hints[1]);
 const review3=promptFor('review',getStage('03','javascript')!.project,blankAttempt('03-project-foundations-lab'),'javascript');expect(review3).toContain('Trilha selecionada: TypeScript + Node.js + Express');expect(review3).toContain('NestJS é apenas opcional na trilha TypeScript');
 });
});

