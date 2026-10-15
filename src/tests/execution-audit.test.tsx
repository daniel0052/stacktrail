// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { useState } from 'react';
import { FlowEditor } from '../components/flow/FlowEditor';
import type { FlowDraft } from '../features/flow/model';
import { ExecutionPanel } from '../components/flow/ExecutionPanel';
import { curriculumTasks } from '../content/stage-00/deep-curriculum';
import { approval, approvalExample } from '../content/stage-00/flow-challenges';
afterEach(cleanup);
const outputs=()=>within(screen.getByRole('heading',{name:'Saídas produzidas'}).parentElement!);
describe('Auditoria da execução exibida',()=>{
 it.each(curriculumTasks.map(t=>[t.slug,t] as const))('mostra resultados reais de dois casos distintos: %s',(_slug,task)=>{
  render(<ExecutionPanel algorithm={task.solution} challenge={task.challenge}/>);
  for(const i of [0,task.challenge.tests.length-1]){
   fireEvent.change(screen.getByLabelText('Entrada para rastrear'),{target:{value:String(i)}});
   fireEvent.click(screen.getByRole('button',{name:'Executar até o fim'}));fireEvent.click(screen.getByRole('button',{name:'Ir ao resultado'}));
   expect(outputs().getByText(JSON.stringify(task.challenge.tests[i].expected,null,2),{normalizer:text=>text})).toBeTruthy();
   expect(screen.getByText('Execução encerrada. Compare as saídas com o contrato.')).toBeTruthy();
  }
 });
 it('executar no painel usa as entradas atuais do editor, inclusive depois de alterar valores',()=>{
  function Editor(){const [value,setValue]=useState<FlowDraft>({algorithm:approvalExample,results:[]});return <FlowEditor challenge={approval} value={value} onChange={setValue} storageMessage="Local"/>;}
  render(<Editor/>);expect(screen.queryByLabelText('Entrada para rastrear')).toBeNull();expect(screen.getAllByRole('group',{name:'Blocos e conexões do algoritmo'})).toHaveLength(1);fireEvent.click(screen.getByRole('button',{name:'Executar'}));fireEvent.click(screen.getByRole('button',{name:'Ir ao resultado'}));expect(outputs().getByText(JSON.stringify({resultado:'Aprovado'},null,2),{normalizer:text=>text})).toBeTruthy();
  fireEvent.change(screen.getByLabelText('Entrada nota'),{target:{value:'5'}});expect(screen.queryByRole('heading',{name:'Saídas produzidas'})).toBeNull();
  fireEvent.click(screen.getByRole('button',{name:'Executar'}));fireEvent.click(screen.getByRole('button',{name:'Ir ao resultado'}));expect(outputs().getByText(JSON.stringify({resultado:'Reprovado'},null,2),{normalizer:text=>text})).toBeTruthy();expect(screen.getAllByRole('group',{name:'Blocos e conexões do algoritmo'})).toHaveLength(1);
 });
 it('distingue estado inicial de resultado e chega ao fim pelos passos',()=>{
  render(<ExecutionPanel algorithm={approvalExample} challenge={approval}/>);
  fireEvent.click(screen.getByRole('button',{name:'Executar passo a passo'}));
  expect(screen.getByText(/Bloco Início: avance/)).toBeTruthy();expect(outputs().queryByText('{}')).toBeNull();
  for(let i=0;i<5;i++)fireEvent.click(screen.getByRole('button',{name:'Próximo passo'}));
  expect(outputs().getByText(JSON.stringify({resultado:'Aprovado'},null,2),{normalizer:text=>text})).toBeTruthy();
  expect((screen.getByRole('button',{name:'Próximo passo'}) as HTMLButtonElement).disabled).toBe(true);
 });
 it('invalida execução ao mudar entrada ou contrato e não reapresenta resultado antigo',()=>{
  const view=render(<ExecutionPanel algorithm={approvalExample} challenge={approval} inputOverride={{nota:8}} inputRevision="8" command={{action:'run',serial:1}}/>);fireEvent.click(screen.getByRole('button',{name:'Ir ao resultado'}));
  expect(outputs().getByText(JSON.stringify({resultado:'Aprovado'},null,2),{normalizer:text=>text})).toBeTruthy();
  view.rerender(<ExecutionPanel algorithm={approvalExample} challenge={approval} inputOverride={{nota:5}} inputRevision="5" command={{action:'run',serial:1}}/>);
  expect(screen.queryByRole('heading',{name:'Saídas produzidas'})).toBeNull();expect(screen.getByText(/Execute novamente para atualizar/)).toBeTruthy();
  view.rerender(<ExecutionPanel algorithm={approvalExample} challenge={approval} inputOverride={{nota:5}} inputRevision="5" command={{action:'run',serial:2}}/>);fireEvent.click(screen.getByRole('button',{name:'Ir ao resultado'}));
  expect(outputs().getByText(JSON.stringify({resultado:'Reprovado'},null,2),{normalizer:text=>text})).toBeTruthy();
 });
 it('mantém avanço entre o botão local e a barra e inicia o rastreamento após execução completa',()=>{
  const props={algorithm:approvalExample,challenge:approval,inputOverride:{nota:8}};
  const view=render(<ExecutionPanel {...props} command={{action:'reset',serial:0}}/>);
  fireEvent.click(screen.getByRole('button',{name:'Executar passo a passo'}));
  view.rerender(<ExecutionPanel {...props} command={{action:'step',serial:1}}/>);expect(screen.getByText(/Passo 2\//)).toBeTruthy();
  view.rerender(<ExecutionPanel {...props} command={{action:'run',serial:2}}/>);fireEvent.click(screen.getByRole('button',{name:'Ir ao resultado'}));
  view.rerender(<ExecutionPanel {...props} command={{action:'step',serial:3}}/>);expect(screen.getByText(/Passo 1\/6/)).toBeTruthy();
  view.rerender(<ExecutionPanel {...props} command={{action:'reset',serial:4}}/>);expect(screen.getByText(/Passo 1\/6/)).toBeTruthy();
 });
});
