import {describe,it,expect} from 'vitest';
import {topics,tasks,project,references,books} from '../practice/catalog';
import {blankAttempt,blankPilot,updateAttempt,migrateLegacy,parsePilot,backup,importBackup,completion} from '../practice/progress';
import {promptFor} from '../practice/prompts';
import {exercises} from '../content/stage-01/exercises';
describe('practice-first contracts',()=>{
 it('retains the original nine IDs and acceptance contracts without importing model answers',()=>{
  for(const old of exercises){const task=tasks.find(t=>t.id===old.id)!;expect(task.acceptanceCriteria).toEqual(old.acceptanceCriteria);expect(task.hints).toHaveLength(3);expect(task.io.length).toBeGreaterThan(0);expect(task.constraints.length).toBeGreaterThan(0);}
  expect(new Set(tasks.map(t=>t.id)).size).toBe(tasks.length);
 });
 it('has a non-circular topic graph with sources and reachable practice',()=>{
  for(const t of topics){for(const prerequisite of t.before.filter(id=>topics.some(t=>t.id===id)))expect(topics.findIndex(t=>t.id===prerequisite)).toBeLessThan(topics.indexOf(t));for(const ref of t.refs)expect(references.some(r=>r.id===ref)).toBe(true);for(const task of t.exerciseIds)expect(tasks.some(t=>t.id===task)).toBe(true);}
  for(const t of [...tasks,project])for(const id of t.refs)expect(references.some(r=>r.id===id)).toBe(true);
  for(const b of books)expect(b.alternatives.every(id=>references.some(r=>r.id===id))).toBe(true);
 });
 it('cannot complete an empty attempt, records start date, stops to novo, and clears review after changing solution',()=>{
  const fresh=blankAttempt('ex-01');
  const started=updateAttempt(fresh,{status:'em-andamento'});expect(started.status).toBe('em-andamento');expect(started.startedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  const stopped=updateAttempt(started,{status:'novo'});expect(stopped.status).toBe('novo');expect(stopped.startedAt).toBeUndefined();
  expect(updateAttempt(fresh,{status:'concluido'}).status).toBe('em-andamento');
  const done=updateAttempt({...started,solution:'repo',checks:fresh.checks.map(()=>true),evidence:'review'},{status:'concluido'});expect(done.status).toBe('concluido');
  const changed=updateAttempt(done,{solution:'new repo'});expect(changed.status).toBe('em-andamento');expect(changed.checks.every(c=>!c)).toBe(true);expect(changed.evidence).toBe('');
  expect(updateAttempt(done,{checks:done.checks.map(()=>false)}).status).toBe('em-andamento');
 });
 it('migrates only trustworthy matching exercise records, never lesson reads',()=>{
  const raw=JSON.stringify({version:8,lessons:['html','css'],theme:'light',fontSize:150,backendTrack03:'javascript',exercises:{'ex-01':{...blankAttempt('ex-01'),solution:'my attempt',status:'concluido',checks:[true,true,true,true]},'ex-02':{solution:'invalid shape'},'04-ex-01':{solution:'unrelated'}}});
  const {pilot}=migrateLegacy(raw);expect(pilot.studied).toEqual([]);expect(pilot.attempts['ex-01'].status).toBe('concluido');expect(pilot.attempts['ex-02']).toBeUndefined();expect(pilot.track).toBe('javascript');expect(pilot.legacyArchive).toBe(raw);expect(completion(pilot).initial).toBe(1);
  const older=migrateLegacy(JSON.stringify({...JSON.parse(raw),version:7})).pilot;expect(older.attempts['ex-01'].solution).toBe('my attempt');expect(older.attempts['ex-01'].status).toBe('em-andamento');expect(older.attempts['ex-01'].checks.every(v=>!v)).toBe(true);
 });
 it('downgrades unsupported completion flags and archives unrecognized legacy data',()=>{
  const raw='malformed';expect(migrateLegacy(raw).pilot.legacyArchive).toBe(raw);
  const pilot=blankPilot();pilot.attempts['ex-01']={...blankAttempt('ex-01'),status:'concluido'};expect(parsePilot(pilot).attempts['ex-01'].status).toBe('em-andamento');
 });
 it('roundtrips drafts and archive while rejecting invalid imports atomically',()=>{
  const p=blankPilot();p.studied=['html'];p.legacyArchive='original';p.attempts['01-project']={...blankAttempt('01-project'),solution:'draft',hints:2,evidence:'declared'};
  expect(importBackup(backup(p))).toEqual(p);
  for(const invalid of [{...p,studied:['fake']},{...p,attempts:{unknown:blankAttempt('ex-01')}},{...p,font:'100'},{...p,attempts:{'ex-01':{...blankAttempt('ex-01'),hints:4}}}])expect(()=>importBackup(JSON.stringify({schema:'stacktrail-roadmap-backup',version:2,pilot:invalid}))).toThrow();
  expect(p.attempts['01-project'].solution).toBe('draft');
 });
 it('generates separate help and evidence-based assessment prompts in either backend track',()=>{
  const a={...blankAttempt('ex-04'),solution:'attempt without secrets',reflection:'HTTP error'};
  const help=promptFor('help',tasks[3],a,'php');expect(help.split('\n').length).toBeGreaterThan(30);expect(help).not.toContain('\\n');expect(help).toContain('Solicite minha tentativa');expect(help).toContain('próxima pista');expect(help).toContain('PHP + Laravel');expect(help).not.toContain('AVALIAÇÃO CONSULTIVA');
  const review=promptFor('review',project,blankAttempt(project.id),'javascript');for(const value of ['Atendido / Parcialmente atendido / Não atendido / Não verificado','Não invente execução','código ou repositório','Rubrica','Entregáveis','TypeScript + Node.js + Express'])expect(review).toContain(value);
 });
});
