// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProgressProvider } from '../features/progress/ProgressProvider';
import { LabPage } from '../components/lab/Lab';
import { exercises } from '../content/stage-01/exercises';
import { newProgress, parseProgress, STORAGE_KEY } from '../features/progress/model';
import { installDialogStub } from './dialogStub';

function mount(slug = 'contato') {
  return render(<MemoryRouter initialEntries={[`/laboratorio/${slug}`]}><ProgressProvider><Routes><Route path="/laboratorio/:slug" element={<LabPage/>}/></Routes></ProgressProvider></MemoryRouter>);
}
beforeEach(() => {
  localStorage.clear();
  installDialogStub();
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe('Interação do laboratório', () => {
  it('mostra enunciado e critérios antes das dicas e revela uma por vez', () => {
    mount();
    expect(screen.getByRole('heading', { name: 'Enunciado' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Critérios de aceitação' })).toBeTruthy();
    expect(screen.queryByText(exercises[0].hints[0])).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar dica 1' }));
    expect(screen.getByText(exercises[0].hints[0])).toBeTruthy();
    expect(screen.queryByText(exercises[0].hints[1])).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar dica 2' }));
    expect(screen.getByText(exercises[0].hints[1])).toBeTruthy();
    expect(screen.queryByText(exercises[0].hints[2])).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar dica 3' }));
    expect(screen.getByText(exercises[0].hints[2])).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Mostrar dica/ })).toBeNull();
  });
  it('mantém solução, reflexão e dicas após remontar a página', () => {
    const view = mount();
    fireEvent.change(screen.getByLabelText('Código, raciocínio ou anotações da solução'), { target: { value: '<script>não executar</script>' } });
    fireEvent.change(screen.getByLabelText('O que aprendi / onde travei'), { target: { value: 'Entendi o submit' } });
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar dica 1' }));
    view.unmount(); mount();
    expect((screen.getByLabelText('Código, raciocínio ou anotações da solução') as HTMLTextAreaElement).value).toBe('<script>não executar</script>');
    expect((screen.getByLabelText('O que aprendi / onde travei') as HTMLTextAreaElement).value).toBe('Entendi o submit');
    expect(screen.getByRole('button', { name: 'Mostrar dica 2' })).toBeTruthy();
    expect(document.querySelector('script')).toBeNull();
  });
  it('exige critérios para concluir e preserva status por exercício', () => {
    mount();
    const button = screen.getByRole('button', { name: 'Marcar como concluído' }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Marcar como em andamento' }));
    for (const criterion of exercises[0].acceptanceCriteria) fireEvent.click(screen.getByRole('checkbox', { name: criterion }));
    expect(button.disabled).toBe(false);
    fireEvent.click(button);
    expect(parseProgress(localStorage.getItem(STORAGE_KEY)!).exercises['ex-01'].status).toBe('concluido');
    fireEvent.click(screen.getByRole('checkbox', { name: exercises[0].acceptanceCriteria[0] }));
    expect(parseProgress(localStorage.getItem(STORAGE_KEY)!).exercises['ex-01'].status).toBe('em-andamento');
    expect(parseProgress(localStorage.getItem(STORAGE_KEY)!).exercises['ex-02']).toBeUndefined();
  });
  it('não sobrescreve o armazenamento corrompido ao carregar', () => {
    localStorage.setItem(STORAGE_KEY, '{corrompido');
    mount();
    fireEvent.change(screen.getByLabelText('Código, raciocínio ou anotações da solução'), { target: { value: 'Tentativa da sessão' } });
    expect(localStorage.getItem(STORAGE_KEY)).toBe('{corrompido');
    expect(screen.getByText(/Não foi possível carregar o progresso/)).toBeTruthy();
  });
  it('mostra falha de escrita sem descartar a tentativa em memória', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Quota'); });
    mount();
    fireEvent.change(screen.getByLabelText('Código, raciocínio ou anotações da solução'), { target: { value: 'Meu rascunho' } });
    expect((screen.getByLabelText('Código, raciocínio ou anotações da solução') as HTMLTextAreaElement).value).toBe('Meu rascunho');
    expect(screen.getByText(/Não foi possível salvar no dispositivo/)).toBeTruthy();
  });
  it('oferece texto selecionável quando clipboard não está disponível', async () => {
    mount();
    fireEvent.click(screen.getByRole('button', { name: 'Avaliar com IA' }));
    fireEvent.click(screen.getByRole('button', { name: 'Copiar prompt' }));
    const prompt = await screen.findByLabelText('Prompt de avaliação (editável)');
    expect((prompt as HTMLTextAreaElement).value).toContain(exercises[0].statement);
  });
  it('progresso de tema e aulas sobrevivem ao parse', () => {
    const progress = { ...newProgress(), theme: 'light', lessons: ['html'] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    mount();
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(parseProgress(localStorage.getItem(STORAGE_KEY)!).lessons).toEqual(['html']);
  });
});
