import { describe, it, expect } from 'vitest';
import { phases, roadmap } from '../content/roadmap';
import { exercises } from '../content/stage-01/exercises';
import { newProgress, parseProgress, updateExercise } from '../features/progress/model';
import { getStageStatus, journeySummary } from '../features/progress/roadmap';
import { reviewPrompt } from '../components/lab/reviewPrompt';

describe('Jornada e migração', () => {
  it('representa exatamente 00–19, sem material fictício', () => {
    expect(roadmap.map(s => s.id)).toEqual(Array.from({ length: 20 }, (_, i) => String(i).padStart(2, '0')));
    expect(roadmap.filter(s => s.available).map(s => s.id)).toEqual(['00', '01', '02', '03']);
    expect(phases.map(p => roadmap.filter(s => s.phase === p.id).length)).toEqual([1, 9, 6, 4]);
    expect(roadmap.every(s => s.description && s.title)).toBe(true);
  });
  it('abrir uma página não inicia nem conclui uma etapa', () => {
    const progress = { ...newProgress(), lastPath: '/aulas/html' };
    expect(getStageStatus(progress, '01')).toBe('novo');
    expect(journeySummary(progress).completed).toBe(0);
    const started = updateExercise(progress, 'ex-01', { solution: 'Minha tentativa' });
    expect(getStageStatus(started, '01')).toBe('em-andamento');
    expect(getStageStatus(started, '00')).toBe('novo');
  });
  it('etapa concluída depende dos critérios reais e retorna a andamento quando um deixa de ser atendido', () => {
    let progress = newProgress();
    for (const e of exercises.filter(e => e.level === 'inicial' || e.id === 'ex-04')) {
      progress = updateExercise(progress, e.id, { status: 'concluido', checks: e.acceptanceCriteria.map(() => true) });
    }
    expect(getStageStatus(progress, '01')).toBe('em-andamento');
    progress.assessment.fill(true);
    expect(getStageStatus(progress, '01')).toBe('concluido');
    expect(journeySummary(progress)).toEqual({ completed: 1, total: 20, percent: 5, currentId: '00' });
    progress = updateExercise(progress, 'ex-01', { checks: [false, true, true, true] });
    expect(getStageStatus(progress, '01')).toBe('em-andamento');
  });
  it('migra v1 preservando rascunhos, dicas, checks, tema e rota', () => {
    const current = updateExercise(newProgress(), 'ex-01', { solution: 'Código antigo\n  com espaços', hints: 2, reflection: 'Minha dúvida', checks: [true, false, true, false] });
    const legacy = { ...current, version: 1, fontSize: undefined, theme: 'light' };
    const migrated = parseProgress(JSON.stringify(legacy));
    expect(migrated.version).toBe(7);
    expect(migrated.fontSize).toBe(100);
    expect(migrated.exercises).toEqual(current.exercises);
    expect(migrated.theme).toBe('light');
    expect(migrated.lastPath).toBe(current.lastPath);
  });
  it('rejeita preferência fora dos limites ao importar v2', () => {
    expect(() => parseProgress(JSON.stringify({ ...newProgress(), fontSize: 200 }))).toThrow();
    expect(parseProgress(JSON.stringify({ ...newProgress(), fontSize: 150 })).fontSize).toBe(150);
  });
});
describe('Prompt contextualizado', () => {
  it.each(exercises)('inclui etapa, número, nível e rubrica de $title', exercise => {
    const prompt = reviewPrompt(exercise, '', '');
    expect(prompt).toContain('Etapa 01 — Revisão completa de Frontend para Backend');
    expect(prompt).toContain(`Exercício ${Number(exercise.id.slice(-2))} — ${exercise.title}`);
    expect(prompt).toContain(exercise.statement);
    for (const criterion of exercise.acceptanceCriteria) expect(prompt).toContain(criterion);
    expect(prompt).toContain('30%');
    expect(prompt).toContain('Não invente resultados de testes');
    expect(prompt).toContain('não há evidências suficientes');
    for (const other of exercises.filter(e => e.id !== exercise.id)) expect(prompt).not.toContain(`Exercício ${Number(other.id.slice(-2))} — ${other.title}`);
  });
});
