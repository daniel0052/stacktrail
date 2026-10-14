// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CodeBlock, codeText } from '../components/learning/CodeBlock';
import { FontControls } from '../components/learning/FontControls';
import { ProgressProvider } from '../features/progress/ProgressProvider';
import { parseProgress, STORAGE_KEY } from '../features/progress/model';
import { ReviewDialog } from '../components/lab/ReviewDialog';
import { exercises } from '../content/stage-01/exercises';
import { installDialogStub } from './dialogStub';

beforeEach(() => localStorage.clear());
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });
describe('Ferramentas de leitura', () => {
  it('texto de spans destacados preserva indentação e quebras sem markup ou controles', () => {
    expect(codeText(<code><span>const</span>{' valor = 1;\n  ' }<span>console</span>{'.log(valor);\n'}</code>)).toBe('const valor = 1;\n  console.log(valor);\n');
  });
  it('copia somente código e restaura feedback após 2,5 segundos', async () => {
    const copy = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText: copy } });
    vi.useFakeTimers();
    render(<CodeBlock><code>{'const x = 1;\n  x;\n'}</code></CodeBlock>);
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Copiar código do exemplo' })));
    expect(copy).toHaveBeenCalledWith('const x = 1;\n  x;\n');
    expect(screen.getByRole('button', { name: 'Copiar código do exemplo' }).textContent).toBe('Copiado!');
    act(() => vi.advanceTimersByTime(2500));
    expect(screen.getByRole('button', { name: 'Copiar código do exemplo' }).textContent).toBe('Copiar');
    vi.unstubAllGlobals();
  });
  it('avisa falha de clipboard sem retirar o código da tela', async () => {
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockRejectedValue(new Error('Bloqueado')) } });
    render(<CodeBlock><code>{'const x = 1;\n'}</code></CodeBlock>);
    fireEvent.click(screen.getByRole('button', { name: 'Copiar código do exemplo' }));
    await screen.findByText(/Não foi possível copiar/);
    expect(screen.getByText('const x = 1;')).toBeTruthy();
    vi.unstubAllGlobals();
  });
  it('fonte persiste após remontagem, respeita limites e pode ser restaurada', () => {
    const mount = () => render(<ProgressProvider><FontControls/></ProgressProvider>);
    const first = mount();
    for (let i = 0; i < 7; i++) fireEvent.click(screen.getByRole('button', { name: 'Aumentar tamanho do texto' }));
    expect(document.documentElement.style.fontSize).toBe('150%');
    expect((screen.getByRole('button', { name: 'Aumentar tamanho do texto' }) as HTMLButtonElement).disabled).toBe(true);
    expect(parseProgress(localStorage.getItem(STORAGE_KEY)!).fontSize).toBe(150);
    first.unmount(); mount();
    expect(document.documentElement.style.fontSize).toBe('150%');
    fireEvent.click(screen.getByRole('button', { name: 'Restaurar tamanho padrão do texto' }));
    fireEvent.click(screen.getByRole('button', { name: 'Diminuir tamanho do texto' }));
    expect(document.documentElement.style.fontSize).toBe('90%');
    expect((screen.getByRole('button', { name: 'Diminuir tamanho do texto' }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Restaurar tamanho padrão do texto' }));
    expect(document.documentElement.style.fontSize).toBe('100%');
  });
  it('modal copia o prompt editado e expõe a ação de fechar', async () => {
    installDialogStub();
    const copy = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText: copy } });
    const onClose = vi.fn();
    render(<ReviewDialog exercise={exercises[4]} solution="Meu POST" reflection="Minha dúvida" onClose={onClose}/>);
    const field = screen.getByLabelText('Prompt de avaliação (editável)') as HTMLTextAreaElement;
    expect(field.value).toContain('Exercício 5 — Agendamento frontend');
    expect(field.value).toContain('Meu POST');
    fireEvent.change(field, { target: { value: field.value + '\nObservação extra' } });
    fireEvent.click(screen.getByRole('button', { name: 'Copiar prompt' }));
    await waitFor(() => expect(copy).toHaveBeenCalledWith(field.value));
    fireEvent.click(screen.getByRole('button', { name: 'Fechar avaliação com IA' }));
    expect(onClose).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });
});
