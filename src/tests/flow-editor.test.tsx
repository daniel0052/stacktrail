// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LabPage } from '../components/lab/Lab';
import { ProgressProvider } from '../features/progress/ProgressProvider';
import { newProgress, updateExercise, parseProgress, STORAGE_KEY } from '../features/progress/model';
import { approvalExample } from '../content/stage-00/flow-challenges';
import { exercises } from '../content/stage-00/exercises';
import { solutions } from './flow-fixtures';

function mount(slug: string) {
  return render(<MemoryRouter initialEntries={[`/etapas/00/laboratorio/${slug}`]}><ProgressProvider><Routes><Route path="/etapas/00/laboratorio/:slug" element={<LabPage stageId="00"/>}/></Routes></ProgressProvider></MemoryRouter>);
}
beforeEach(() => localStorage.clear());
afterEach(cleanup);
describe('Laboratório visual integrado', () => {
  it.each(exercises.slice(1))('$title: testa, persiste, exige critérios e mantém três dicas graduais', e => {
    const p = updateExercise(newProgress(), e.id, { flow: { algorithm: solutions[e.id], results: [] } });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    let view = mount(e.slug);
    const complete = screen.getByRole('button', { name: 'Marcar como concluído' }) as HTMLButtonElement;
    expect(complete.disabled).toBe(true);
    expect(screen.queryByLabelText('Pseudocódigo e raciocínio da solução')).toBeNull();
    for (let i = 0; i < 3; i++) {
      expect(screen.queryByText(e.hints[i])).toBeNull();
      fireEvent.click(screen.getByRole('button', { name: `Mostrar dica ${i + 1}` }));
      expect(screen.getByText(e.hints[i])).toBeTruthy();
    }
    fireEvent.click(screen.getByRole('button', { name: 'Verificar solução' }));
    expect(screen.getByText('Sua solução produziu os resultados esperados nos testes realizados.')).toBeTruthy();
    expect(complete.disabled).toBe(true);
    for (const criterion of e.acceptanceCriteria) fireEvent.click(screen.getByRole('checkbox', { name: criterion }));
    fireEvent.click(complete);
    const saved = parseProgress(localStorage.getItem(STORAGE_KEY)!);
    expect(saved.exercises[e.id].status).toBe('concluido');
    expect(saved.exercises[e.id].flow!.results.every(r => r.passed)).toBe(true);
    view.unmount(); view = mount(e.slug);
    expect(screen.getByText('Sua solução produziu os resultados esperados nos testes realizados.')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Passo a passo' }));
    expect(screen.getByText(/Passo 1\//)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Passo a passo' }));
    expect(screen.getByText(/Passo 2\//)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar' }));
    expect(screen.getByText(/Passo 1\//)).toBeTruthy();
    view.unmount();
  });
  it('adiciona, configura, move, conecta e remove pelo teclado/controles sem drag', () => {
    mount('numeros');
    fireEvent.click(screen.getByRole('button', { name: '+ Entrada' }));
    const added = 'bloco1';
    fireEvent.change(screen.getByLabelText('Nome'),{target:{value:'minhaNota'}});
    fireEvent.click(screen.getByRole('button',{name:'Salvar bloco'}));
    fireEvent.click(screen.getByRole('button',{name:`Saída Próximo de ${added}`}));
    fireEvent.click(screen.getByRole('button',{name:'Entrada de fim'}));
    let saved = parseProgress(localStorage.getItem(STORAGE_KEY)!);
    expect(saved.exercises['00-ex-02'].flow!.algorithm.edges).toContainEqual({ from: added, to: 'fim', branch: 'next' });
    const block=screen.getByRole('button',{name:new RegExp(`^${added}: Entrada`)});
    const before=saved.exercises['00-ex-02'].flow!.algorithm.nodes.find(n=>n.id===added)!.x;
    fireEvent.keyDown(block,{key:'ArrowRight'});
    saved=parseProgress(localStorage.getItem(STORAGE_KEY)!);
    expect(saved.exercises['00-ex-02'].flow!.algorithm.nodes.find(n=>n.id===added)!.x).toBe(before+20);
    fireEvent.click(screen.getByRole('button',{name:`Conexão ${added} next fim`}));
    fireEvent.click(screen.getByRole('button',{name:'Excluir seleção'}));
    fireEvent.click(screen.getByRole('button',{name:new RegExp(`^${added}: Entrada`)}));
    fireEvent.click(screen.getByRole('button',{name:'Excluir seleção'}));
    saved = parseProgress(localStorage.getItem(STORAGE_KEY)!);
    expect(saved.exercises['00-ex-02'].flow!.algorithm.nodes.some(n => n.id === added)).toBe(false);
    expect(saved.exercises['00-ex-02'].flow!.algorithm.edges).toHaveLength(0);
  });
  it('invalida resultados ao editar e restaura somente após confirmação', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updateExercise(newProgress(), '00-ex-02', { flow: { algorithm: approvalExample, results: [] } })));
    mount('numeros');
    fireEvent.click(screen.getByRole('button', { name: 'Verificar solução' }));
    fireEvent.keyDown(screen.getByRole('button',{name:/^decidir: Decisão/}),{key:'Enter'});
    fireEvent.change(screen.getByLabelText('Conteúdo do bloco'), { target: { value: 'nota > 7' } });
    fireEvent.click(screen.getByRole('button',{name:'Salvar bloco'}));
    expect(screen.queryByText('Sua solução produziu os resultados esperados nos testes realizados.')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Verificar solução' }));
    expect(screen.getByText('8 de 9 verificações produziram o resultado esperado.')).toBeTruthy();
    fireEvent.click(screen.getByText('Restaurar exercício',{selector:'summary'}));
    fireEvent.click(screen.getByRole('button', { name: 'Restaurar exercício' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(screen.getByText('8 de 9 verificações produziram o resultado esperado.')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Restaurar exercício' }));
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar restauração' }));
    expect(parseProgress(localStorage.getItem(STORAGE_KEY)!).exercises['00-ex-02'].flow!.algorithm.nodes).toHaveLength(2);
  });
  it('mostra erro acessível para algoritmo incompleto e salva reflexão', () => {
    mount('numeros');
    fireEvent.click(screen.getByRole('button', { name: 'Verificar solução' }));
    expect(screen.getByText('0 de 9 verificações produziram o resultado esperado.')).toBeTruthy();
    expect(screen.getAllByText(/conecte Próximo/).length).toBeGreaterThan(0);
    fireEvent.change(screen.getByLabelText('O que aprendi / onde travei'), { target: { value: 'Faltou conectar o início' } });
    expect(parseProgress(localStorage.getItem(STORAGE_KEY)!).exercises['00-ex-02'].reflection).toBe('Faltou conectar o início');
  });
});
