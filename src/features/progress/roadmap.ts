import { roadmap } from '../../content/roadmap';
import { stageContent } from '../../content/stages';
import { stageSummary, type Progress } from './model';
export type StageStatus = 'novo' | 'em-andamento' | 'concluido';
export const stageStatusLabels: Record<StageStatus, string> = { novo: 'Não iniciada', 'em-andamento': 'Em andamento', concluido: 'Concluída por autoavaliação' };
export function getStageStatus(progress: Progress, stageId: string): StageStatus {
  if (stageId !== '01' && stageId !== '00') return 'novo';
  if (stageSummary(progress, stageId).ready) return 'concluido';
  const content = stageContent(stageId);
  const started = content.lessons.some(l => progress.lessons.includes(content.lessonKey(l.id))) || (stageId === '00' ? progress.assessment00.some(Boolean) || progress.evidence00.some(s => s.trim()) : progress.assessment.some(Boolean))
    || content.exercises.some(item => { const e = progress.exercises[item.id]; return e && (e.status !== 'novo' || e.solution.trim() || e.reflection.trim() || e.hints > 0 || e.checks.some(Boolean) || Object.values(e.notebook).some(v => typeof v === 'string' ? v.trim() : v.length > 0)); });
  return started ? 'em-andamento' : 'novo';
}
export function journeySummary(progress: Progress) {
  const completed = roadmap.filter(s => getStageStatus(progress, s.id) === 'concluido').length;
  return { completed, total: roadmap.length, percent: Math.round(completed / roadmap.length * 100), currentId: getStageStatus(progress, '00') !== 'concluido' ? '00' : getStageStatus(progress, '01') !== 'concluido' ? '01' : '02' };
}
