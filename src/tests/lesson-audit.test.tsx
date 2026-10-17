// @vitest-environment jsdom
// @ts-expect-error Node builtins run in Vitest; the application uses browser-only TypeScript types.
import { readFileSync } from 'node:fs';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { lessons } from '../content/stage-00';
import { exercises } from '../content/stage-00/exercises';
import { lessonActivities } from '../content/stage-00/lesson-activities';
import { curriculumTasks } from '../content/stage-00/deep-curriculum';
import { testAlgorithm } from '../features/flow/interpreter';
import { LessonVisual } from '../components/learning/LessonVisual';
import { LessonPracticeScope } from '../components/learning/LessonPracticeScope';
import { PracticeEditor } from '../components/learning/FlowPractice';
beforeEach(()=>localStorage.clear());afterEach(cleanup);
describe('Auditoria de conteúdo e isolamento da Etapa 00',()=>{
 it('cobre as 19 aulas com vínculos explícitos, sem fallback de aprovação',()=>{
  for(const lesson of lessons){const source=readFileSync(`src/content/stage-00/lessons/${lesson.id}.mdx`,'utf8') as string;const foundation=[...source.matchAll(/<LessonVisual topic="([^"]+)"/g)];const practices=[...source.matchAll(/<FlowPractice slug="([^"]+)"/g)];expect(foundation.length+practices.length,lesson.id).toBeGreaterThan(0);for(const match of foundation)expect(match[1]).toBe(lesson.id);for(const match of practices)expect(curriculumTasks.some(t=>t.slug===match[1]),`${lesson.id}: ${match[1]}`).toBe(true);}
  expect(new Set(Object.values(lessonActivities).map(a=>JSON.stringify(a.solution))).size).toBe(7);
 });
 it('executa todos os exemplos e confere os destinos do laboratório',()=>{
  for(const [topic,activity] of Object.entries(lessonActivities)){expect(testAlgorithm(activity.solution,activity.challenge).every(r=>r.passed),topic).toBe(true);expect(exercises.some(e=>e.slug===activity.labSlug),topic).toBe(true);}
  for(const task of curriculumTasks)expect(testAlgorithm(task.solution,task.challenge).every(r=>r.passed),task.slug).toBe(true);
 });
 it('recuperação ativa exige tentativa antes de revelar o raciocínio',()=>{
  render(<MemoryRouter><LessonVisual topic="introducao"/></MemoryRouter>);
  expect(screen.queryByText(/o limite pertence ao caminho Sim/i)).toBeNull();
  fireEvent.click(screen.getByRole('radio',{name:'Não: Reprovado'}));
  expect(screen.getByText('Reveja sua hipótese.').closest('p')?.textContent).toContain('Reveja sua hipótese.');
  expect(screen.getByText('Reveja sua hipótese.').closest('p')?.textContent).toContain('o limite pertence ao caminho Sim');
 });
 it('mostra abstração com intervalos, enunciado e rascunho próprio',()=>{
  render(<MemoryRouter><LessonPracticeScope lessonId="00:abstracao"><LessonVisual topic="abstracao"/></LessonPracticeScope></MemoryRouter>);
  expect(screen.getByRole('heading',{name:'Exemplo resolvido: Modelar sobreposição de intervalos'})).toBeTruthy();expect(screen.getByRole('region',{name:'Enunciado da prática'})).toBeTruthy();expect(screen.queryByText(/decidir aprovação/)).toBeNull();
  fireEvent.click(screen.getByRole('button',{name:'+ Entrada'}));expect([...Array(localStorage.length)].map((_,i)=>localStorage.key(i))).toEqual(['stacktrail:practice:1:00:abstracao:aula-abstracao:construir']);
 });
 it('trocar aula e desafio remonta o estado sem carregar o grafo anterior',()=>{
  const first=curriculumTasks.find(t=>t.slug==='expressoes')!,second=curriculumTasks.find(t=>t.slug==='matrizes')!;
  const view=render(<LessonPracticeScope lessonId="00:variaveis"><PracticeEditor challenge={first.challenge} solution={first.solution} mode="completar"/></LessonPracticeScope>);fireEvent.click(screen.getByRole('button',{name:'+ Processamento'}));
  view.rerender(<LessonPracticeScope lessonId="00:matrizes"><PracticeEditor challenge={second.challenge} solution={second.solution} mode="completar"/></LessonPracticeScope>);
  expect(screen.queryByRole('button',{name:/^bloco1:/})).toBeNull();expect(screen.getByRole('button',{name:/^colunas:/})).toBeTruthy();expect(screen.queryByLabelText('Entrada quantidade')).toBeNull();expect(screen.getByLabelText('Entrada tabela')).toBeTruthy();
 });
});
