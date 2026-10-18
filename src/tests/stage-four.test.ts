import {describe,it,expect} from 'vitest';
import {getStage,topics,activities,projects,books,matchesTrack} from '../practice/curriculum';
import {blankPilot,blankAttempt,parsePilot} from '../practice/progress';
import {stageProgress} from '../practice/achievements';
import {promptFor} from '../practice/prompts';
function finish(p:ReturnType<typeof blankPilot>,id:string){const a=blankAttempt(id);p.attempts[id]={...a,solution:'tentativa declarada',checks:a.checks.map(()=>true),status:'concluido'};}
describe('Etapa 04',()=>{
 it('tem 9 tópicos por trilha, 9 exercícios e 3 projetos',()=>{
  for(const t of ['php','javascript'] as const)expect(getStage('04',t)!.topics.filter(x=>!x.optional)).toHaveLength(9);
  expect(activities.filter(a=>a.stageId==='04')).toHaveLength(9);
  expect(projects.filter(a=>a.stageId==='04')).toHaveLength(3);
  expect(activities.find(a=>a.id==='04-ex-08')!.optional).toBe(true);
  expect(topics.some(t=>t.stageId==='04'&&t.track==='php'&&matchesTrack(t.track,'javascript'))).toBe(false);
 });
 it('livros exclusivos de trilha não vazam e NestJS não é exigido',()=>{
  expect(books.filter(b=>b.stages.includes('04')&&b.track==='javascript'&&matchesTrack(b.track,'php'))).toHaveLength(0);
  expect(JSON.stringify(getStage('04','php'))).not.toMatch(/NestJS/);
 });
 it('conclusão depende dos critérios e etapa futura continua indisponível',()=>{
  const p=blankPilot();
  expect(stageProgress(p,'04')).toMatchObject({available:true,done:false});
  const s=getStage('04','php')!;
  p.studied=s.topics.map(t=>t.id);
  for(const a of s.exercises.filter(a=>!a.optional))finish(p,a.id);
  finish(p,s.project.id);
  expect(stageProgress(p,'04').done).toBe(false);
  p.stageEvidence['04']='Síntese';
  expect(stageProgress(p,'04').done).toBe(true);
  delete p.attempts[s.project.id];
  expect(stageProgress(p,'04').done).toBe(false);
 });
 it('persistência aceita catalogStage válido e rejeita inválido',()=>{
  const p={...blankPilot(),catalogStage:'04'};
  expect(parsePilot(JSON.parse(JSON.stringify(p))).catalogStage).toBe('04');
  expect(()=>parsePilot({...p,catalogStage:'99'})).toThrow();
  expect(parsePilot(JSON.parse(JSON.stringify(blankPilot()))).catalogStage).toBeUndefined();
 });
 it('prompt inclui contexto da etapa sem gabarito',()=>{
  const t=activities.find(a=>a.id==='04-ex-07')!;
  const s=promptFor('review',t,{...blankAttempt(t.id)},'php');
  expect(s).toMatch(/RFC 9457/);expect(s).toMatch(/Etapa: 04/);
 });
});
