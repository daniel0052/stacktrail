import {describe,it,expect} from 'vitest';
import {modules14,tasks14,projects14,topics14,references14} from '../practice/stage-fourteen';
import {getStage,activityForTrack,references,allActivities} from '../practice/curriculum';
import {blankPilot,blankAttempt,withAttempt,attemptFor,parsePilot,withStageEvidence,stageEvidenceFor} from '../practice/progress';
import {stageProgress} from '../practice/achievements';
import {preparationFor,fromScratchIds} from '../practice/preparation';
import {preparationPrompt} from '../practice/preparation-prompt';
import {promptFor} from '../practice/prompts';
import {roadmap} from '../content/roadmap';
describe('Etapa14 — Observability, Applied AI e Reliability',()=>{
 it('preserva identidade e15futura; mapeia módulos/prática/fontes sem órfãos',()=>{
  expect(getStage('14')!.title).toBe('Observabilidade e IA aplicada');expect(getStage('15')).toBeUndefined();expect(roadmap.find(s=>s.id==='14')).toMatchObject({available:true,phase:'pleno'});expect(roadmap.find(s=>s.id==='15')).toMatchObject({available:false,title:'Projeto final de validação Pleno'});
  expect(modules14).toHaveLength(12);expect(topics14).toHaveLength(12);expect(tasks14).toHaveLength(22);expect(projects14).toHaveLength(1);expect(projects14[0].milestones).toHaveLength(7);
  expect(new Set(allActivities.map(a=>a.id)).size).toBe(allActivities.length);
  for(const m of modules14){expect(m.explanation.length).toBeGreaterThan(100);expect(m.example.length).toBeGreaterThan(90);for(const id of m.refs)expect(references14.some(r=>r.id===id),id).toBe(true);for(const n of m.tasks)expect(tasks14.some(t=>t.id==='14-ex-'+n)).toBe(true);}
 });
 it('inventário A11/B11/C1 preserva o trabalho autoral e oito laboratórios',()=>{
  const counts={a:0,b:0,c:0};for(const a of [...tasks14,...projects14]){const prep=preparationFor(a);expect(Number(fromScratchIds.includes(a.id))+Number(!!prep),a.id).toBe(1);counts[!prep?'a':prep.type==='generated-lab'?'b':'c']++;expect(a.hints).toHaveLength(3);expect(a.testIdeas.length).toBeGreaterThan(1);for(const id of a.refs)expect(references.some(r=>r.id===id),id).toBe(true);}expect(counts).toEqual({a:11,b:11,c:1});
  for(const n of ['05','06','07','09','13','18','20','21'])expect(tasks14.find(t=>t.id==='14-ex-'+n)!.title).toContain('laboratório');
 });
 it.each(['php','javascript'] as const)('resolve stack e três papéis sem marcador ou vazamento %s',track=>{
  expect(getStage('14',track)!.exercises).toHaveLength(22);for(const a of [...tasks14,...projects14]){const resolved=activityForTrack(a,track);expect(JSON.stringify(resolved)).not.toMatch(/\[(otel|testing|database|queue|ci)14\]/);const attempt={...blankAttempt(a.id),solution:'RASCUNHO PRIVADO',hints:1};for(const mode of ['help','review'] as const){const p=promptFor(mode,a,attempt,track);expect(p).not.toMatch(/\[(otel|testing|database|queue|ci)14\]/);expect(p).toContain(mode==='help'?'IA TUTORA':'IA REVISORA');expect(p).toContain('RASCUNHO PRIVADO');}if(preparationFor(a)){const p=preparationPrompt(a,track);expect(p).toContain('Gere SOMENTE o estado inicial');expect(p).toContain('127.0.0.1');expect(p).not.toContain('RASCUNHO PRIVADO');expect(p).not.toContain('Sem Docker antes');expect(p).not.toMatch(/\[(otel|testing|database|queue|ci)14\]/);}}
 });
 it('compatibilidade esquema2 e rejeição de IDs/tipos e flags não sustentadas',()=>{
  const old=blankPilot();delete(old.stageEvidence as Partial<typeof old.stageEvidence>)['14'];expect(parsePilot(old).stageEvidence['14']).toBe('');expect(parsePilot(old).observabilityEvidence).toBeUndefined();for(const observabilityEvidence of [{php:true},{java:'x'}])expect(()=>parsePilot({...blankPilot(),observabilityEvidence})).toThrow();for(const id of ['14-ex-99@php','14-ex-01@java','15-ex-01@php'])expect(()=>parsePilot({...blankPilot(),attempts:{[id]:blankAttempt('14-ex-01')}})).toThrow();expect(parsePilot({...blankPilot(),attempts:{'14-ex-01@php':{...blankAttempt('14-ex-01'),status:'concluido'}}}).attempts['14-ex-01@php'].status).toBe('em-andamento');
 });
 it('conclusão,edição,reversão e síntese isoladas por stack preservam13',()=>{
  let p=withAttempt(blankPilot(),'13-ex-01',{solution:'Preservar13'});p=withStageEvidence(p,'13','Síntese13');p.currentStage='14';p.studied=topics14.map(t=>t.id);for(const a of [...tasks14,...projects14]){p=withAttempt(p,a.id,{solution:'Fixture sem executar backend.',reflection:'Quality Audit autoral'});p=withAttempt(p,a.id,{checks:blankAttempt(a.id).checks.map(()=>true),status:'concluido',evidence:'Revisão antiga'});}p=withStageEvidence(p,'14','Síntese14');p=parsePilot(p);expect(stageProgress(p,'14').percent).toBe(100);p.track='javascript';expect(stageProgress(p,'14').done).toBe(false);expect(stageEvidenceFor(p,'14')).toBe('');expect(attemptFor(p,'14-project-reliable')).toBeUndefined();p.track='php';p=withAttempt(p,'14-project-reliable',{reflection:'Audit revisado'});expect(stageProgress(p,'14').done).toBe(false);expect(attemptFor(p,'14-project-reliable')!.checks.every(x=>!x)).toBe(true);expect(attemptFor(p,'14-project-reliable')!.evidence).toBe('');expect(attemptFor(p,'14-project-reliable')!.solution).toContain('Fixture');expect(stageEvidenceFor(p,'13')).toBe('Síntese13');expect(attemptFor(p,'13-ex-01')!.solution).toBe('Preservar13');
 });
});
