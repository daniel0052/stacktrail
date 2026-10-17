import * as two from './stage-02';
import { exercises as twoExercises } from './stage-02/exercises';
import * as zero from './stage-00';
import * as one from './stage-01';
import { exercises as zeroExercises } from './stage-00/exercises';
import { exercises as oneExercises } from './stage-01/exercises';
export type StageId = '00' | '01' | '02';
export function stageContent(id: StageId) {
  return id === '02' ? { ...two, exercises: twoExercises, title: 'Web, HTTP, redes, Git e ferramentas', lessonKey: two.lessonKey, base: '/etapas/02' } : id === '00'
    ? { ...zero, exercises: zeroExercises, title: 'Pensamento computacional', lessonKey: zero.lessonKey, base: '/etapas/00' }
    : { ...one, exercises: oneExercises, title: 'Frontend para Backend', lessonKey: (slug: string) => slug, base: '' };
}
export const allExercises = [...zeroExercises, ...oneExercises, ...twoExercises];
export const lessonPath = (stage: StageId, slug: string) => `${stageContent(stage).base}/aulas/${slug}`;
export const labPath = (stage: StageId, slug?: string) => `${stageContent(stage).base}/laboratorio${slug ? `/${slug}` : ''}`;
