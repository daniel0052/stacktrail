import { describe, expect, it } from 'vitest';
import { exercises } from '../content/stage-01/exercises';
import { lessons, selfAssessment } from '../content/stage-01';
import { validateExercises } from '../content/stage-01/types';
import { newExerciseProgress, newProgress, parseProgress, stageSummary, updateExercise, validPath } from '../features/progress/model';
import { reviewPrompt } from '../components/lab/reviewPrompt';

describe('Inventário e contratos do laboratório', () => {
  it('preserva nove desafios, três por nível e três dicas por desafio', () => {
    expect(validateExercises(exercises)).toBe(true);
    for (const level of ['inicial', 'intermediario', 'avancado']) {
      expect(exercises.filter(e => e.level === level)).toHaveLength(3);
    }
    expect(exercises.filter(e => e.optional).map(e => e.id)).toEqual(['ex-07', 'ex-08', 'ex-09']);
    expect(exercises.every(e => e.hints.length === 3)).toBe(true);
    expect(validateExercises([...exercises, exercises[0]])).toBe(false);
    expect(validateExercises(exercises.map(e => ({ ...e, hints: ['uma'] })))).toBe(false);
    expect(validateExercises(exercises.map(e => ({ ...e, id: 'repetido' })))).toBe(false);
  });
  it('o prompt inclui critérios, solução e instrução de exigir evidências sem entregar a resposta', () => {
    const prompt = reviewPrompt(exercises[0], 'Minha tentativa', 'Minha dúvida');
    expect(prompt).toContain(exercises[0].statement);
    expect(prompt).toContain(exercises[0].acceptanceCriteria[0]);
    expect(prompt).toContain('Minha tentativa');
    expect(prompt).toContain('Minha dúvida');
    expect(prompt).toContain('Não entregue solução pronta');
    expect(prompt).toContain('não verificado');
  });
});
describe('Progresso versionado e avanço', () => {
  it('recupera rascunho, reflexão, dicas e critérios sem perder texto', () => {
    const progress = updateExercise(newProgress(), 'ex-01', { solution: '<script>texto literal</script>', reflection: 'Preciso conferir o teclado', hints: 2, checks: [true, false, true, false], status: 'em-andamento' });
    expect(parseProgress(JSON.stringify(progress))).toEqual(progress);
  });
  it('rejeita JSON corrompido e versões incompatíveis', () => {
    expect(() => parseProgress('{')).toThrow();
    expect(() => parseProgress(JSON.stringify({ ...newProgress(), version: 99 }))).toThrow(/versão/);
    expect(() => parseProgress('null')).toThrow();
  });
  it('rejeita formatos e estados impossíveis', () => {
    for (const patch of [{ hints: 4 }, { hints: 1.5 }, { solution: 3 }, { checks: [true] }, { status: 'concluido', checks: [false, true, true, true] }]) {
      const progress = newProgress();
      progress.exercises['ex-01'] = { ...newExerciseProgress(4), ...patch } as never;
      expect(() => parseProgress(JSON.stringify(progress))).toThrow();
    }
    expect(() => parseProgress(JSON.stringify({ ...newProgress(), lastPath: 'https://externo.example' }))).toThrow();
    expect(() => parseProgress(JSON.stringify({ ...newProgress(), lessons: ['inexistente'] }))).toThrow();
    expect(() => parseProgress(JSON.stringify({ ...newProgress(), assessment: ['sim'] }))).toThrow();
  });
  it('conclusão exige checklist e retorna a andamento se um critério for desmarcado', () => {
    let progress = updateExercise(newProgress(), 'ex-01', { status: 'concluido' });
    expect(progress.exercises['ex-01'].status).toBe('em-andamento');
    progress = updateExercise(progress, 'ex-01', { status: 'concluido', checks: [true, true, true, true] });
    expect(progress.exercises['ex-01'].status).toBe('concluido');
    progress = updateExercise(progress, 'ex-01', { checks: [false, true, true, true] });
    expect(progress.exercises['ex-01'].status).toBe('em-andamento');
  });
  it('limita dicas e ignora exercícios desconhecidos', () => {
    const original = newProgress();
    expect(updateExercise(original, 'desconhecido', {})).toBe(original);
    expect(updateExercise(original, 'ex-01', { hints: 99 }).exercises['ex-01'].hints).toBe(3);
    expect(updateExercise(original, 'ex-01', { hints: -1 }).exercises['ex-01'].hints).toBe(0);
  });
  it('avança com os 3 iniciais e qualquer 1 intermediário, sem opcionais', () => {
    let progress = newProgress();
    for (const e of exercises.filter(e => e.level === 'inicial' || e.id === 'ex-06')) {
      progress = updateExercise(progress, e.id, { checks: e.acceptanceCriteria.map(() => true), status: 'concluido' });
    }
    progress.assessment = selfAssessment.map(() => true);
    expect(stageSummary(progress).ready).toBe(true);
    expect(stageSummary(progress).intermediate).toBe(1);
    progress.lessons = lessons.filter(l => !l.optional).map(l => l.id);
    expect(stageSummary(progress).percent).toBe(100);
    expect(progress.exercises['ex-07']).toBeUndefined();
  });
  it('não transforma leitura ou desafios opcionais em evidência dos iniciais/integrado', () => {
    let progress = newProgress();
    for (const e of exercises.filter(e => e.optional)) {
      progress = updateExercise(progress, e.id, { checks: e.acceptanceCriteria.map(() => true), status: 'concluido' });
    }
    progress.assessment = selfAssessment.map(() => true);
    progress.lessons = lessons.map(l => l.id);
    expect(stageSummary(progress).ready).toBe(false);
    expect(stageSummary(progress).percent).toBe(67);
  });
  it('permite somente rotas locais existentes para continuar estudando', () => {
    expect(validPath('/aulas/html')).toBe(true);
    expect(validPath('/laboratorio/contato')).toBe(true);
    expect(validPath('/aulas/outra-etapa')).toBe(false);
    expect(validPath('//externo.example')).toBe(false);
  });
});
