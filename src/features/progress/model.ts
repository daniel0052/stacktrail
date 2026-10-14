import { allExercises as exercises, stageContent, type StageId } from '../../content/stages';
import * as zero from '../../content/stage-00';
import { lessons, selfAssessment } from '../../content/stage-01';

export const STORAGE_KEY = 'backend-academy:progress';
export const notebookFields = ['inputs', 'outputs', 'constraints', 'decomposition', 'patterns', 'abstractions', 'cases', 'complexity'] as const;
export type TraceRow = { step: string; values: string; decision: string };
export type Notebook = Record<typeof notebookFields[number], string> & { trace: TraceRow[] };
export const newNotebook = (): Notebook => ({ inputs: '', outputs: '', constraints: '', decomposition: '', patterns: '', abstractions: '', cases: '', complexity: '', trace: [] });
export type ExerciseProgress = { status: 'novo' | 'em-andamento' | 'concluido'; solution: string; reflection: string; hints: number; checks: boolean[]; notebook: Notebook };
export const fontSizes = [90, 100, 110, 120, 130, 140, 150] as const;
export type FontSize = typeof fontSizes[number];
export type Progress = { version: 3; assessment00: boolean[]; evidence00: string[]; lessons: string[]; exercises: Record<string, ExerciseProgress>; assessment: boolean[]; lastPath: string; theme: 'dark' | 'light'; fontSize: FontSize };
export const newExerciseProgress = (count: number): ExerciseProgress => ({ status: 'novo', solution: '', reflection: '', hints: 0, checks: Array<boolean>(count).fill(false), notebook: newNotebook() });
export const newProgress = (): Progress => ({ version: 3, assessment00: zero.selfAssessment.map(() => false), evidence00: zero.selfAssessment.map(() => ''), lessons: [], exercises: {}, assessment: Array<boolean>(selfAssessment.length).fill(false), lastPath: '/etapas/00/aulas/introducao', theme: 'dark', fontSize: 100 });
const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
export function validPath(value: unknown): value is string {
  return typeof value === 'string' && (['/', '/etapas', '/etapas/01', '/etapas/00', '/etapas/00/aulas', '/etapas/00/laboratorio', '/etapas/00/autoavaliacao', '/aulas', '/laboratorio', '/autoavaliacao'].includes(value)
    || lessons.some(l => value === `/aulas/${l.id}`)
    || zero.lessons.some(l => value === `/etapas/00/aulas/${l.id}`)
    || exercises.some(e => value === `${e.stageId === '00' ? '/etapas/00' : ''}/laboratorio/${e.slug}`));
}
export function parseProgress(raw: string): Progress {
  const data: unknown = JSON.parse(raw);
  if (!record(data) || (data.version !== 1 && data.version !== 2 && data.version !== 3)) throw new Error('Formato ou versão de progresso incompatível. O arquivo original não foi alterado.');
  if (data.version !== 1 && !fontSizes.includes(data.fontSize as FontSize)) throw new Error('Preferência de tamanho de texto inválida.');
  if (!Array.isArray(data.lessons) || !data.lessons.every(id => lessons.some(l => l.id === id) || (data.version === 3 && zero.lessons.some(l => zero.lessonKey(l.id) === id)))
    || new Set(data.lessons).size !== data.lessons.length || !record(data.exercises)
    || !Array.isArray(data.assessment) || data.assessment.length !== selfAssessment.length
    || !data.assessment.every(v => typeof v === 'boolean') || !validPath(data.lastPath)
    || !['dark', 'light'].includes(String(data.theme))) throw new Error('Dados de progresso inválidos.');
  const result = newProgress();
  if (data.version === 3) {
    if (!Array.isArray(data.assessment00) || data.assessment00.length !== zero.selfAssessment.length || !data.assessment00.every(v => typeof v === 'boolean')
      || !Array.isArray(data.evidence00) || data.evidence00.length !== zero.selfAssessment.length || !data.evidence00.every(v => typeof v === 'string')) throw new Error('Dados da Etapa 00 inválidos.');
    result.assessment00 = [...data.assessment00] as boolean[];
    result.evidence00 = [...data.evidence00] as string[];
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
    if (data.version !== 3 && exercise.stageId !== '01') throw new Error('Exercício incompatível com versão antiga.');
    const notebook = data.version === 3 ? parseNotebook(state.notebook) : newNotebook();
    result.exercises[id] = { status: state.status as ExerciseProgress['status'], solution: state.solution, reflection: state.reflection, hints: state.hints, checks: [...state.checks] as boolean[], notebook };
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
  if (next.status === 'concluido' && !next.checks.every(Boolean)) next.status = 'em-andamento';
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
  if (stageId === '00') {
    const demonstrated = progress.assessment00.filter((done, i) => done && progress.evidence00[i].trim().length > 0).length;
    const percent = Math.round((read + initial + intermediate + demonstrated) / (requiredLessons.length + 6 + zero.selfAssessment.length) * 100);
    return { read, initial, intermediate, percent, ready: initial === 3 && intermediate === 3 && demonstrated === zero.selfAssessment.length };
  }
  // Practice milestone is 3 initial + 1 integrated, never every intermediate or advanced.
  const percent = Math.round((read + initial + Math.min(1, intermediate)) / (requiredLessons.length + 4) * 100);
  return { read, initial, intermediate, percent, ready: initial === 3 && intermediate >= 1 && progress.assessment.every(Boolean) };
}
