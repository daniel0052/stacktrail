import * as zero from './stage-00';
import * as one from './stage-01';
import { exercises as zeroExercises } from './stage-00/exercises';
import { exercises as oneExercises } from './stage-01/exercises';
export type StageId = '00' | '01';
export function stageContent(id: StageId) {
  return id === '00'
    ? { ...zero, exercises: zeroExercises, title: 'Pensamento computacional', lessonKey: zero.lessonKey, base: '/etapas/00' }
    : { ...one, exercises: oneExercises, title: 'Frontend para Backend', lessonKey: (slug: string) => slug, base: '' };
}
export const allExercises = [...zeroExercises, ...oneExercises];
export const lessonPath = (stage: StageId, slug: string) => `${stageContent(stage).base}/aulas/${slug}`;
export const labPath = (stage: StageId, slug?: string) => `${stageContent(stage).base}/laboratorio${slug ? `/${slug}` : ''}`;
