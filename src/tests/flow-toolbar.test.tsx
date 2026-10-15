// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { FlowEditor } from '../components/flow/FlowEditor';
import { curriculumTasks } from '../content/stage-00/deep-curriculum';
import { installDialogStub } from './dialogStub';
import { type FlowDraft } from '../features/flow/model';
const task=curriculumTasks.find(t=>t.slug==='funcoes')!;
function Editor() { const [d,setD]=useState<FlowDraft>({algorithm:structuredClone(task.solution),results:[]}); return <FlowEditor challenge={task.challenge} value={d} onChange={setD} storageMessage="Local"/>; }
afterEach(cleanup);
describe('Ferramentas contextuais', () => {
  it('exclui bloco com conexões e desfaz/refaz sem confirmação', () => {
    render(<Editor/>);
    fireEvent.click(screen.getByRole('button',{name:/^chamar: Chamada/}));
    fireEvent.click(screen.getByRole('button',{name:'Excluir seleção'}));
    expect(screen.queryByRole('button',{name:/^chamar: Chamada/})).toBeNull();
    expect((screen.getByRole('button',{name:'Excluir seleção'}) as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getAllByRole('button',{name:/^Conexão /})).toHaveLength(3);
    fireEvent.click(screen.getByRole('button',{name:'Desfazer'}));
    expect(screen.getByRole('button',{name:/^chamar: Chamada/})).toBeTruthy();
    expect(screen.getAllByRole('button',{name:/^Conexão /})).toHaveLength(5);
    fireEvent.click(screen.getByRole('button',{name:'Refazer'}));
    expect(screen.queryByRole('button',{name:/^chamar: Chamada/})).toBeNull();
  });
  it('exclui conexão selecionada e recupera via histórico', () => {
    render(<Editor/>);fireEvent.click(screen.getAllByRole('button',{name:/^Conexão /})[0]);
    fireEvent.click(screen.getByRole('button',{name:'Excluir seleção'}));
    expect(screen.getAllByRole('button',{name:/^Conexão /})).toHaveLength(4);
    fireEvent.click(screen.getByRole('button',{name:'Desfazer'}));
    expect(screen.getAllByRole('button',{name:/^Conexão /})).toHaveLength(5);
  });
  it('Delete não interfere em digitação e remove bloco focado com recuperação', () => {
    render(<Editor/>);fireEvent.click(screen.getByRole('button',{name:/^inicio: Início/}));fireEvent.click(screen.getByRole('button',{name:'Funções'}));const field=screen.getByLabelText('Identificador da nova função');
    fireEvent.keyDown(field,{key:'Backspace'});fireEvent.click(screen.getByRole('button',{name:'Fechar funções'}));expect(screen.getByRole('button',{name:/^inicio: Início/})).toBeTruthy();
    fireEvent.keyDown(screen.getByRole('button',{name:/^inicio: Início/}),{key:'Delete'});
    expect(screen.queryByRole('button',{name:/^inicio: Início/})).toBeNull();
    fireEvent.click(screen.getByRole('button',{name:'Desfazer'}));expect(screen.getByRole('button',{name:/^inicio: Início/})).toBeTruthy();
  });
  it('edita grafo próprio e mostra ajuda e execução a partir da barra', () => {
    installDialogStub();render(<Editor/>);fireEvent.click(screen.getByRole('button',{name:'Como funciona'}));
    expect(screen.getByRole('dialog',{name:'Como funciona'})).toBeTruthy();
    fireEvent.click(screen.getByRole('button',{name:'Fechar ajuda'}));
    fireEvent.click(screen.getByRole('button',{name:'Funções'}));
    fireEvent.change(screen.getByLabelText('Fluxograma em edição'),{target:{value:'calcularMedia'}});fireEvent.click(screen.getByRole('button',{name:'Fechar funções'}));
    expect(screen.getByRole('button',{name:/^retornar: Retorno/})).toBeTruthy();
    fireEvent.click(screen.getByRole('button',{name:'Passo a passo'}));expect(screen.getByText(/Passo 1\//)).toBeTruthy();
    fireEvent.click(screen.getByRole('button',{name:'Passo a passo'}));expect(screen.getByText(/Passo 2\//)).toBeTruthy();
    fireEvent.click(screen.getByRole('button',{name:'Reiniciar'}));expect(screen.getByText(/Passo 1\//)).toBeTruthy();
  });
});
