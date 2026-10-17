// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LabIndex, LabPage } from '../components/lab/Lab';
import { ProgressProvider } from '../features/progress/ProgressProvider';
import { newProgress, parseProgress, STORAGE_KEY, updateExercise } from '../features/progress/model';
import { exercises as zeroExercises } from '../content/stage-00/exercises';
import { exercises as oneExercises } from '../content/stage-01/exercises';
function mount(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><ProgressProvider><Routes>
    <Route path="/etapas/00/laboratorio" element={<LabIndex key="00" stageId="00"/>}/>
    <Route path="/laboratorio" element={<LabIndex key="01"/>}/>
    <Route path="/laboratorio/:slug" element={<LabPage/>}/>
  </Routes></ProgressProvider></MemoryRouter>);
}
beforeEach(()=>localStorage.clear());
afterEach(cleanup);
it('alterna as listagens e limpa filtro de módulo ao voltar para a etapa 00',()=>{
  mount('/etapas/00/laboratorio');
  const filter=screen.getByRole('combobox',{name:'Filtrar por assunto'}) as HTMLSelectElement;
  fireEvent.change(filter,{target:{value:filter.options[1].value}});
  fireEvent.change(screen.getByRole('combobox',{name:'Etapa do laboratório'}),{target:{value:'01'}});
  expect(document.querySelectorAll('.exercise-card')).toHaveLength(oneExercises.length);
  expect(screen.queryByRole('combobox',{name:'Filtrar por assunto'})).toBeNull();
  expect((screen.getByRole('combobox',{name:'Etapa do laboratório'}) as HTMLSelectElement).value).toBe('01');
  fireEvent.change(screen.getByRole('combobox',{name:'Etapa do laboratório'}),{target:{value:'00'}});
  expect(document.querySelectorAll('.exercise-card')).toHaveLength(zeroExercises.length);
  expect((screen.getByRole('combobox',{name:'Filtrar por assunto'}) as HTMLSelectElement).value).toBe('');
});
it('troca de etapa dentro do exercício preserva rascunho, reflexão e dicas',()=>{
  localStorage.setItem(STORAGE_KEY,JSON.stringify(updateExercise(newProgress(),'ex-01',{hints:2,reflection:'minha dúvida'})));
  mount('/laboratorio/contato');
  fireEvent.change(screen.getByLabelText('Código, raciocínio ou anotações da solução'),{target:{value:'rascunho preservado'}});
  fireEvent.change(screen.getByRole('combobox',{name:'Etapa do laboratório'}),{target:{value:'00'}});
  expect(screen.getByRole('heading',{name:'Laboratório de exercícios.'})).toBeTruthy();
  const saved=parseProgress(localStorage.getItem(STORAGE_KEY)!);
  expect(saved.exercises['ex-01']).toMatchObject({solution:'rascunho preservado',reflection:'minha dúvida',hints:2});
});
