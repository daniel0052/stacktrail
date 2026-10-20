import {describe,it,expect} from 'vitest';
import {allActivities,activityById} from '../practice/curriculum';
import {fromScratchIds,starters,starterEnvironment} from '../practice/preparation';
import {preparationPrompt} from '../practice/preparation-prompt';
import {promptFor} from '../practice/prompts';
import {blankAttempt,blankPilot,parsePilot,withAttempt,attemptFor} from '../practice/progress';
import {dashboard} from '../practice/achievements';

describe('Laboratórios guiados — catálogo e separação de papéis',()=>{
 it('audita cada ID publicado exatamente uma vez e mantém A sem preparação',()=>{
  const audited=[...fromScratchIds,...Object.keys(starters)];
  expect(new Set(audited).size).toBe(audited.length);
  expect([...audited].sort()).toEqual(allActivities.map(a=>a.id).sort());
  expect(fromScratchIds).toHaveLength(74);
  expect(Object.values(starters).filter(s=>s.type==='generated-lab')).toHaveLength(43);
  expect(Object.values(starters).filter(s=>s.type==='previous-project')).toHaveLength(44);
  for(const id of fromScratchIds)expect(starters[id]).toBeUndefined();
  expect(()=>preparationPrompt(activityById('ex-01')!,'php')).toThrow();
 });
 it.each(['php','javascript'] as const)('gera contratos autocontidos e sem rascunhos para%s',track=>{
  for(const [id,s] of Object.entries(starters)){
   const a=activityById(id)!;const p=preparationPrompt(a,track);
   expect(p).toContain(id);expect(p).toContain(s.material);expect(p).toContain(s.initial);expect(p).toContain(s.studentWork);
   expect(p).toContain(a.io[0]);expect(p).toContain(a.constraints[0]);expect(p).toContain('Ambiente não executado e não validado');
   expect(p).toContain('127.0.0.1');expect(p).toContain('Não corrigir o defeito');expect(p).toContain('testes de regressão que EU criarei');
   expect(p).not.toContain('TENTATIVA DO ESTUDANTE');
   if(s.reproduction)expect(p).toContain(s.reproduction);
  }
 });
 it('respeita stack específica, módulos mínimos, SQL sem Node e mock sem backend',()=>{
  expect(preparationPrompt(activityById('03-php-06')!,'javascript')).toContain('Stack do material: PHP + Laravel');
  const a=activityById('06-ex-03')!;
  expect(preparationPrompt(a,'php')).toContain('Stack do material: PHP + Laravel');
  expect(preparationPrompt(a,'javascript')).toContain('Stack do material: TypeScript + Node.js + Express');
  const sql=activityById('05-ex-08')!;expect(starterEnvironment(sql,starters[sql.id],'php').local).toContain('Não requer Node.js');
  expect(preparationPrompt(activityById('ex-05')!,'php')).toContain('sem exigir que eu programe servidor');
  expect(starterEnvironment(activityById('06-ex-01')!,starters['06-ex-01'],'php').stack).toContain('sem framework');
  expect(starterEnvironment(activityById('06-ex-06')!,starters['06-ex-06'],'php').stack).toContain('Laravel');
 });
 it('mantém papéis distintos e exige evidências em vez de presumir bases iguais',()=>{
  const a=activityById('06-ex-07')!,attempt={...blankAttempt(a.id),solution:'RASCUNHO PRIVADO',hints:1};
  const prepare=preparationPrompt(a,'php'),help=promptFor('help',a,attempt,'php'),review=promptFor('review',a,attempt,'php');
  expect(prepare).not.toContain('RASCUNHO PRIVADO');expect(prepare).not.toContain(a.hints[0]);
  expect(help).toContain('hipótese inicial');expect(help).toContain('próxima pista');expect(help).toContain('RASCUNHO PRIVADO');
  expect(review).toContain('código ou diff');expect(review).toContain('regressões');expect(review).toContain('Não verificado');
  for(const id of ['06-ex-07','06-ex-08']){
   const t=activityById(id)!;
   expect([t.statement,...t.requirements,...t.hints,...t.acceptanceCriteria].join(' ')).not.toMatch(/FOR UPDATE|lockForUpdate|N-1|ajuste do último centavo|race condition por falta/);
  }
 });
 it('gerar prompts não muda estado, conquistas, rascunhos ou migração',()=>{
  let p=withAttempt(blankPilot(),'06-ex-07',{solution:'Tentativa existente',status:'em-andamento'});
  p=withAttempt(p,'06-ex-07',{checks:blankAttempt('06-ex-07').checks.map(()=>true),status:'concluido'});
  const before=JSON.stringify(p),achievements=dashboard(p).achievements;
  for(const id of Object.keys(starters))preparationPrompt(activityById(id)!,p.track);
  expect(JSON.stringify(p)).toBe(before);expect(dashboard(p).achievements).toEqual(achievements);
  const loaded=parsePilot(JSON.parse(before));expect(attemptFor(loaded,'06-ex-07')?.status).toBe('concluido');
  expect(attemptFor(withAttempt(loaded,'06-ex-07',{solution:'Nova tentativa'}),'06-ex-07')?.checks.every(v=>!v)).toBe(true);
 });
});
