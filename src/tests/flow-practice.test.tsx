// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { PracticeEditor } from '../components/learning/FlowPractice';
import { curriculumTasks } from '../content/stage-00/deep-curriculum';
import { parseFlowDraft } from '../features/flow/persistence';
const task=curriculumTasks.find(t=>t.slug==='funcoes')!;
beforeEach(()=>localStorage.clear());afterEach(cleanup);
describe('Práticas dentro das aulas',()=>{
 it('preserva rascunho validado após remontar e isola cada formato',()=>{
   let view=render(<PracticeEditor challenge={task.challenge} solution={task.solution} mode="completar"/>);
   fireEvent.click(screen.getByRole('button',{name:'+ Processamento'}));
   expect(screen.getByRole('button',{name:/^bloco1:/})).toBeTruthy();view.unmount();
   view=render(<PracticeEditor challenge={task.challenge} solution={task.solution} mode="completar"/>);
   expect(screen.getByRole('button',{name:/^bloco1:/})).toBeTruthy();
   const saved=JSON.parse(localStorage.getItem('stacktrail:practice:1:00-funcoes:completar')!);
   expect(parseFlowDraft(saved,task.challenge).algorithm.nodes.some(n=>n.id==='bloco1')).toBe(true);view.unmount();
   render(<PracticeEditor challenge={task.challenge} solution={task.solution} mode="construir"/>);
   expect(screen.queryByRole('button',{name:/^bloco1:/})).toBeNull();
   expect(screen.queryByRole('button',{name:/^chamar:/})).toBeNull();
 });
 it('rejeita rascunho arbitrário sem executar nem sobrescrever ao abrir',()=>{
   const key='stacktrail:practice:1:00-funcoes:completar';localStorage.setItem(key,'{"algorithm":{"version":900}}');
   render(<PracticeEditor challenge={task.challenge} solution={task.solution} mode="completar"/>);
   expect(screen.getByRole('button',{name:/^inicio:/})).toBeTruthy();
   expect(localStorage.getItem(key)).toBe('{"algorithm":{"version":900}}');
 });
});
