import {assessmentJS,exerciseAreas,trackLessons,type BackendTrack} from '../../content/stage-03/curriculum';
import * as three from '../../content/stage-03';
import { allExercises as exercises, stageContent, type StageId } from '../../content/stages';
import * as two from '../../content/stage-02';
import * as zero from '../../content/stage-00';
import { lessons, selfAssessment } from '../../content/stage-01';
import { flowChallenges } from '../../content/stage-00/flow-challenges';
import { parseFlowDraft, passedAll } from '../flow/persistence';
import type { FlowDraft } from '../flow/model';

export const STORAGE_KEY = 'backend-academy:progress';
export const notebookFields = ['inputs', 'outputs', 'constraints', 'decomposition', 'patterns', 'abstractions', 'cases', 'complexity'] as const;
export type TraceRow = { step: string; values: string; decision: string };
export type Notebook = Record<typeof notebookFields[number], string> & { trace: TraceRow[] };
export const newNotebook = (): Notebook => ({ inputs: '', outputs: '', constraints: '', decomposition: '', patterns: '', abstractions: '', cases: '', complexity: '', trace: [] });
export type ExerciseProgress = { status: 'novo' | 'em-andamento' | 'concluido'; solution: string; reflection: string; hints: number; checks: boolean[]; notebook: Notebook; flow?: FlowDraft; migratedVisual?: boolean };
export const fontSizes = [90, 100, 110, 120, 130, 140, 150] as const;
export type FontSize = typeof fontSizes[number];
export type Progress = { version: 7; backendTrack03:BackendTrack; assessment03js:boolean[]; evidence03js:string[]; assessment03:boolean[]; evidence03:string[]; assessment02: boolean[]; evidence02: string[]; assessment00: boolean[]; evidence00: string[]; lessons: string[]; exercises: Record<string, ExerciseProgress>; assessment: boolean[]; lastPath: string; theme: 'dark' | 'light'; fontSize: FontSize };
export const newExerciseProgress = (count: number): ExerciseProgress => ({ status: 'novo', solution: '', reflection: '', hints: 0, checks: Array<boolean>(count).fill(false), notebook: newNotebook() });
export const newProgress = (): Progress => ({ version: 7, backendTrack03:'php', assessment03js:assessmentJS.map(()=>false),evidence03js:assessmentJS.map(()=>''), assessment03:three.selfAssessment.map(()=>false),evidence03:three.selfAssessment.map(()=>''), assessment02: two.selfAssessment.map(()=>false), evidence02: two.selfAssessment.map(()=>''), assessment00: zero.selfAssessment.map(() => false), evidence00: zero.selfAssessment.map(() => ''), lessons: [], exercises: {}, assessment: Array<boolean>(selfAssessment.length).fill(false), lastPath: '/etapas/00/aulas/introducao', theme: 'dark', fontSize: 100 });
const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
export function validPath(value: unknown): value is string {
  return typeof value === 'string' && (['/etapas/03', '/etapas/03/aulas', '/etapas/03/laboratorio', '/etapas/03/autoavaliacao', '/', '/etapas', '/etapas/01', '/etapas/00', '/etapas/00/aulas', '/etapas/00/laboratorio', '/etapas/00/autoavaliacao', '/etapas/02', '/etapas/02/aulas', '/etapas/02/laboratorio', '/etapas/02/autoavaliacao', '/aulas', '/laboratorio', '/autoavaliacao'].includes(value)
    || lessons.some(l => value === `/aulas/${l.id}`)
    || zero.lessons.some(l => value === `/etapas/00/aulas/${l.id}`)
    || three.lessons.some(l=>value===`/etapas/03/aulas/${l.id}`)
    || two.lessons.some(l=>value===`/etapas/02/aulas/${l.id}`)
    || exercises.some(e => value === `${e.stageId === '01' ? '' : '/etapas/'+e.stageId}/laboratorio/${e.slug}`));
}
export function parseProgress(raw: string): Progress {
  const data: unknown = JSON.parse(raw);
  if (!record(data) || ![1, 2, 3, 4, 5, 6, 7].includes(Number(data.version)) || typeof data.version !== 'number') throw new Error('Formato ou versão de progresso incompatível. O arquivo original não foi alterado.');
  if (data.version !== 1 && !fontSizes.includes(data.fontSize as FontSize)) throw new Error('Preferência de tamanho de texto inválida.');
  if (!Array.isArray(data.lessons) || !data.lessons.every(id => lessons.some(l => l.id === id) || (Number(data.version) >= 3 && zero.lessons.some(l => zero.lessonKey(l.id) === id)) || (Number(data.version) >= 5 && two.lessons.some(l=>two.lessonKey(l.id)===id)) || (Number(data.version)>=6&&three.lessons.some(l=>three.lessonKey(l.id)===id)))
    || new Set(data.lessons).size !== data.lessons.length || !record(data.exercises)
    || !Array.isArray(data.assessment) || data.assessment.length !== selfAssessment.length
    || !data.assessment.every(v => typeof v === 'boolean') || !validPath(data.lastPath)
    || !['dark', 'light'].includes(String(data.theme))) throw new Error('Dados de progresso inválidos.');
  if(data.version===6&&(data.lessons.some(id=>typeof id==='string'&&id.startsWith('03:')&&['linguagem-runtime','js-valores','js-funcoes','ts-contratos','ts-narrowing','ts-assincrono','express-validacao','express-testes'].includes(id.slice(3)))||Object.keys(data.exercises).some(id=>id.startsWith('03-ex')&&Number(id.slice(5))>9)))throw new Error('Conteúdo incompatível com progresso v6.');
  const result = newProgress();
  if (data.version >= 3) {
    if (!Array.isArray(data.assessment00) || data.assessment00.length !== zero.selfAssessment.length || !data.assessment00.every(v => typeof v === 'boolean')
      || !Array.isArray(data.evidence00) || data.evidence00.length !== zero.selfAssessment.length || !data.evidence00.every(v => typeof v === 'string')) throw new Error('Dados da Etapa 00 inválidos.');
    result.assessment00 = [...data.assessment00] as boolean[];
    result.evidence00 = [...data.evidence00] as string[];
  }
  if(Number(data.version)>=5){
    if(!Array.isArray(data.assessment02)||data.assessment02.length!==two.selfAssessment.length||!data.assessment02.every(v=>typeof v==='boolean')||!Array.isArray(data.evidence02)||data.evidence02.length!==two.selfAssessment.length||!data.evidence02.every(v=>typeof v==='string')) throw new Error('Dados da Etapa 02 inválidos.');
    result.assessment02=[...data.assessment02] as boolean[]; result.evidence02=[...data.evidence02] as string[];
  }
  if(Number(data.version)>=6){
    if(!Array.isArray(data.assessment03)||data.assessment03.length!==three.selfAssessment.length||!data.assessment03.every(v=>typeof v==='boolean')||!Array.isArray(data.evidence03)||data.evidence03.length!==three.selfAssessment.length||!data.evidence03.every(v=>typeof v==='string'))throw new Error('Dados da Etapa 03 inválidos.');
    result.assessment03=[...data.assessment03] as boolean[];result.evidence03=[...data.evidence03] as string[];
  }
  if(data.version===7){
    if(!['php','javascript'].includes(String(data.backendTrack03))||!Array.isArray(data.assessment03js)||data.assessment03js.length!==assessmentJS.length||!data.assessment03js.every(v=>typeof v==='boolean')||!Array.isArray(data.evidence03js)||data.evidence03js.length!==assessmentJS.length||!data.evidence03js.every(v=>typeof v==='string'))throw new Error('Preferência ou evidências da trilha JS/TS inválidas.');
    result.backendTrack03=data.backendTrack03 as BackendTrack;
    result.assessment03js=[...data.assessment03js] as boolean[];result.evidence03js=[...data.evidence03js] as string[];
  }
  // v1 is migrated without changing drafts, checks, hints, theme or the storage key.
  result.fontSize = data.version === 1 ? 100 : data.fontSize as FontSize;
  result.lessons = data.lessons as string[];
  result.assessment = data.assessment as boolean[];
  result.lastPath = data.lastPath;
  result.theme = data.theme as Progress['theme'];
  for (const [id, state] of Object.entries(data.exercises)) {
    const exercise = exercises.find(e => e.id === id);
    if (!exercise || !record(state) || !['novo', 'em-andamento', 'concluido'].includes(String(state.status))
      || typeof state.solution !== 'string' || typeof state.reflection !== 'string'
      || typeof state.hints !== 'number' || !Number.isInteger(state.hints) || state.hints < 0 || state.hints > exercise.hints.length
      || !Array.isArray(state.checks) || state.checks.length !== exercise.acceptanceCriteria.length
      || !state.checks.every(v => typeof v === 'boolean')
      || (state.status === 'concluido' && !state.checks.every(Boolean))) throw new Error('Estado de exercício inválido.');
    if ((data.version < 3 && exercise.stageId !== '01') || (data.version < 5 && exercise.stageId === '02') || (data.version<6&&exercise.stageId==='03')) throw new Error('Exercício incompatível com versão antiga.');
    const notebook = data.version >= 3 ? parseNotebook(state.notebook) : newNotebook();
    const challenge = flowChallenges[id];
    const migrated = data.version < 4 && !!challenge;
    const flow = state.flow !== undefined && challenge ? parseFlowDraft(state.flow, challenge) : undefined;
    const next: ExerciseProgress = { status: migrated ? 'em-andamento' : state.status as ExerciseProgress['status'], solution: state.solution, reflection: state.reflection, hints: migrated ? 0 : state.hints, checks: migrated ? exercise.acceptanceCriteria.map(() => false) : [...state.checks] as boolean[], notebook, ...(flow ? { flow } : {}), ...(migrated || state.migratedVisual === true ? { migratedVisual: true } : {}) };
    if(['02','03'].includes(exercise.stageId)&&next.status==='concluido'&&(!next.solution.trim()||(exercise.stageId==='03'&&!next.reflection.trim())))next.status='em-andamento';
    if (!migrated && challenge && next.status === 'concluido' && !passedAll(flow, challenge)) next.status = 'em-andamento';
    result.exercises[id] = next;
  }
  return result;
}
export function parseNotebook(value: unknown): Notebook {
  if (!record(value) || !notebookFields.every(k => typeof value[k] === 'string') || !Array.isArray(value.trace) || value.trace.length > 100
    || !value.trace.every(row => record(row) && ['step', 'values', 'decision'].every(k => typeof row[k] === 'string'))) throw new Error('Caderno de resolução inválido.');
  return { ...Object.fromEntries(notebookFields.map(k => [k, value[k]])), trace: value.trace.map(row => ({ step: row.step, values: row.values, decision: row.decision })) } as Notebook;
}
export function updateExercise(progress: Progress, id: string, patch: Partial<ExerciseProgress>): Progress {
  const exercise = exercises.find(e => e.id === id);
  if (!exercise) return progress;
  const next = { ...(progress.exercises[id] ?? newExerciseProgress(exercise.acceptanceCriteria.length)), ...patch };
  next.hints = Math.min(exercise.hints.length, Math.max(0, Math.trunc(next.hints)));
  if(exercise.stageId==='03'&&patch.solution!==undefined&&patch.solution!==progress.exercises[id]?.solution){next.checks=next.checks.map(()=>false);if(next.status==='concluido')next.status='em-andamento';}
  const challenge = flowChallenges[id];
  if (patch.flow && challenge) {
    const changed = JSON.stringify(progress.exercises[id]?.flow?.algorithm) !== JSON.stringify(patch.flow.algorithm);
    next.flow = parseFlowDraft(patch.flow, challenge);
    if(changed){next.checks = next.checks.map(() => false);if (next.status === 'concluido') next.status = 'em-andamento';}
  }
  if (next.status === 'concluido' && ((['02','03'].includes(exercise.stageId)&&!next.solution.trim()) || (exercise.stageId==='03'&&!next.reflection.trim()) || !next.checks.every(Boolean) || (challenge && !passedAll(next.flow, challenge)))) next.status = 'em-andamento';
  return { ...progress, exercises: { ...progress.exercises, [id]: next } };
}
export function stageSummary(progress: Progress, stageId: StageId = '01') {
  const content = stageContent(stageId);
  const stageExercises = content.exercises;
  const requiredLessons = content.lessons.filter(l => !l.optional);
  const read = requiredLessons.filter(l => progress.lessons.includes(content.lessonKey(l.id))).length;
  const completed = (id: string) => progress.exercises[id]?.status === 'concluido';
  const initial = stageExercises.filter(e => e.level === 'inicial' && completed(e.id)).length;
  const intermediate = stageExercises.filter(e => e.level === 'intermediario' && completed(e.id)).length;
  if(stageId==='03'){
    const php=backendTrackSummary(progress,'php'),js=backendTrackSummary(progress,'javascript');
    return {read,initial,intermediate,percent:Math.max(php.percent,js.percent),ready:php.ready||js.ready};
  }
  if(stageId==='02'){
    const demonstrated=progress.assessment02.filter((done,i)=>done&&progress.evidence02[i].trim()).length;
    return {read,initial,intermediate,percent:Math.round((read+initial+intermediate+demonstrated)/(requiredLessons.length+6+two.selfAssessment.length)*100),ready:initial===3&&intermediate===3&&demonstrated===two.selfAssessment.length};
  }
  if (stageId === '00') {
    const demonstrated = progress.assessment00.filter((done, i) => done && progress.evidence00[i].trim().length > 0).length;
    const percent = Math.round((read + initial + intermediate + demonstrated) / (requiredLessons.length + stageExercises.filter(e => !e.optional).length + zero.selfAssessment.length) * 100);
    return { read, initial, intermediate, percent, ready: stageExercises.filter(e => !e.optional).every(e => completed(e.id)) && demonstrated === zero.selfAssessment.length };
  }
  // Practice milestone is 3 initial + 1 integrated, never every intermediate or advanced.
  const percent = Math.round((read + initial + Math.min(1, intermediate)) / (requiredLessons.length + 4) * 100);
  return { read, initial, intermediate, percent, ready: initial === 3 && intermediate >= 1 && progress.assessment.every(Boolean) };
}

/** A preference never changes what is completed; each track has its own evidence bank. */
export function backendTrackSummary(progress:Progress,track:BackendTrack){
 const requiredLessons=trackLessons(track);
 const required=stageContent('03').exercises.filter(e=>['common',track].includes(exerciseAreas[e.id]));
 const read=requiredLessons.filter(l=>progress.lessons.includes(three.lessonKey(l.id))).length;
 const done=required.filter(e=>progress.exercises[e.id]?.status==='concluido').length;
 const checks=track==='php'?progress.assessment03:progress.assessment03js;
 const evidence=track==='php'?progress.evidence03:progress.evidence03js;
 const demonstrated=checks.filter((v,i)=>v&&evidence[i]?.trim()).length;
 return {read,done,demonstrated,totalLessons:requiredLessons.length,totalExercises:required.length,percent:Math.round(100*(read+done+demonstrated)/(requiredLessons.length+required.length+checks.length)),ready:read===requiredLessons.length&&done===required.length&&demonstrated===checks.length};
}
