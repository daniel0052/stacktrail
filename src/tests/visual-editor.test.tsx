// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { FlowEditor } from '../components/flow/FlowEditor';
import { curriculumTasks } from '../content/stage-00/deep-curriculum';
import { approval, approvalExample } from '../content/stage-00/flow-challenges';
import { execute, testAlgorithm } from '../features/flow/interpreter';
import { blankAlgorithm, allTestCases, type FlowDraft } from '../features/flow/model';
import { parseFlowDraft } from '../features/flow/persistence';
import { installDialogStub } from './dialogStub';
let draft:FlowDraft;
function Editor(){const [value,setValue]=useState<FlowDraft>({algorithm:blankAlgorithm(),results:[]});draft=value;return <FlowEditor challenge={approval} value={value} onChange={next=>{draft=next;setValue(next);}} storageMessage="Local"/>;}
const save=(text:string)=>{fireEvent.change(screen.queryByLabelText('Nome')??screen.getByLabelText('Conteúdo do bloco'),{target:{value:text}});fireEvent.click(screen.getByRole('button',{name:'Salvar bloco'}));};
const connect=(from:string,to:string,branch='Próximo')=>{fireEvent.click(screen.getByRole('button',{name:`Saída ${branch} de ${from}`}));fireEvent.click(screen.getByRole('button',{name:`Entrada de ${to}`}));};
beforeEach(()=>installDialogStub());afterEach(cleanup);
describe('Piloto visual completo: aprovação',()=>{
 it('edita tipos em propriedades HTML fora do SVG e preserva edição na ampliação',()=>{
  render(<Editor/>);fireEvent.click(screen.getByRole('button',{name:'Ampliar fluxograma'}));fireEvent.click(screen.getByRole('button',{name:'+ Entrada'}));
  const dialog=screen.getByRole('dialog',{name:'Editar Entrada'});expect(dialog.closest('svg')).toBeNull();expect(['left','right']).toContain(dialog.closest('[data-placement]')?.getAttribute('data-placement'));
  expect(Array.from((screen.getByLabelText('Tipo') as HTMLSelectElement).options).map(o=>o.value)).toEqual(['numero','texto','booleano','numeros','textos','matriz']);
  fireEvent.change(screen.getByLabelText('Dado do enunciado 1'),{target:{value:''}});
  fireEvent.change(screen.getByLabelText('Tipo'),{target:{value:'textos'}});fireEvent.change(screen.getByLabelText('Entrada'),{target:{value:'"Ana", "Bia"'}});save('nomes');
  expect(draft.algorithm.nodes.find(n=>n.kind==='input')?.inputs?.[0]).toEqual({name:'nomes',type:'textos',value:['Ana','Bia']});
 });
 it('mantém a paleta no canvas ampliado e permite construir a partir do vazio',()=>{
  render(<Editor/>);fireEvent.click(screen.getByRole('button',{name:'Ampliar fluxograma'}));
  expect(screen.getByRole('group',{name:'Adicionar blocos'}).closest('.flow-canvas-expanded')).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'+ Entrada'}));save('pontuacao');
  fireEvent.click(screen.getByRole('button',{name:'+ Processamento'}));save('total = pontuacao + 1');
  fireEvent.click(screen.getByRole('button',{name:'+ Decisão'}));save('total > 7');
  connect('inicio','bloco1');connect('bloco1','bloco2');connect('bloco2','bloco3');
  expect(draft.algorithm.nodes).toHaveLength(5);expect(draft.algorithm.edges).toHaveLength(3);
  expect(screen.getAllByRole('group',{name:'Adicionar blocos'})).toHaveLength(1);
  fireEvent.click(screen.getByRole('button',{name:'Restaurar tamanho'}));
  expect(screen.getAllByRole('group',{name:'Adicionar blocos'})).toHaveLength(1);
  expect(screen.getByRole('button',{name:/^bloco3: Decisão/})).toBeTruthy();
 });

 it('cria, edita junto ao bloco, conecta e aceita variáveis e estrutura próprias',()=>{
  render(<Editor/>);
  fireEvent.click(screen.getByRole('button',{name:'+ Entrada'}));save('pontuacao');
  fireEvent.click(screen.getByRole('button',{name:'+ Processamento'}));save('dobro = pontuacao * 2');
  fireEvent.click(screen.getByRole('button',{name:'+ Decisão'}));save('dobro >= 14');
  fireEvent.click(screen.getByRole('button',{name:'+ Saída'}));save('"Aprovado"');
  fireEvent.click(screen.getByRole('button',{name:'+ Saída'}));save('"Reprovado"');
  connect('inicio','bloco1');connect('bloco1','bloco2');connect('bloco2','bloco3');connect('bloco3','bloco4','Sim');connect('bloco3','bloco5','Não');connect('bloco4','fim');connect('bloco5','fim');
  fireEvent.click(screen.getByRole('button',{name:'Verificar solução'}));
  expect(screen.getByText('Sua solução produziu os resultados esperados nos testes realizados.')).toBeTruthy();
  expect(draft.algorithm.variables?.find(v=>v.name==='dobro')?.type).toBe('numero');
  expect(draft.algorithm.nodes.some(n=>n.kind==='process'&&n.target==='resultado')).toBe(false);
  expect(parseFlowDraft(JSON.parse(JSON.stringify(draft)),approval).results.every(r=>r.passed)).toBe(true);
  fireEvent.change(screen.getByLabelText('Entrada nota'),{target:{value:'6'}});fireEvent.click(screen.getByRole('button',{name:'Executar'}));fireEvent.click(screen.getByRole('button',{name:'Ir ao resultado'}));
  expect(screen.getByRole('heading',{name:'Saídas produzidas'}).parentElement?.textContent).toContain('Reprovado');
  fireEvent.change(screen.getByLabelText('Entrada nota'),{target:{value:'9'}});fireEvent.click(screen.getByRole('button',{name:'Executar'}));fireEvent.click(screen.getByRole('button',{name:'Ir ao resultado'}));
  expect(screen.getByRole('heading',{name:'Saídas produzidas'}).parentElement?.textContent).toContain('Aprovado');
  fireEvent.click(screen.getByRole('button',{name:'Passo a passo'}));expect(screen.getByText(/Passo 1\//)).toBeTruthy();
  const block=screen.getByRole('button',{name:/^bloco2: Processamento/});fireEvent.click(block);const oldX=draft.algorithm.nodes.find(n=>n.id==='bloco2')!.x;fireEvent.keyDown(block,{key:'ArrowRight'});expect(draft.algorithm.nodes.find(n=>n.id==='bloco2')!.x).toBe(oldX+20);
  fireEvent.keyDown(block,{key:'Delete'});expect(draft.algorithm.nodes.some(n=>n.id==='bloco2')).toBe(false);expect(draft.algorithm.edges.some(e=>e.from==='bloco2'||e.to==='bloco2')).toBe(false);
  fireEvent.click(screen.getByRole('button',{name:'Desfazer'}));expect(draft.algorithm.nodes.some(n=>n.id==='bloco2')).toBe(true);
  fireEvent.click(screen.getByRole('button',{name:'Refazer'}));expect(draft.algorithm.nodes.some(n=>n.id==='bloco2')).toBe(false);
 });
 it('descobre um erro de fronteira nos casos adicionais e mantém o gabarito antigo compatível',()=>{
  const wrong=structuredClone(approvalExample);wrong.nodes.find(n=>n.kind==='decision')!.expression!.b={kind:'literal',value:6.95};
  const results=testAlgorithm(wrong,approval);expect(results.slice(0,approval.tests.length).every(r=>r.passed)).toBe(true);expect(results.slice(approval.tests.length).some(r=>!r.passed)).toBe(true);
  expect(testAlgorithm(approvalExample,approval).every(r=>r.passed)).toBe(true);expect(allTestCases(approval)).toHaveLength(9);
 });
 it('adiciona por soltar a paleta no canvas e apaga a conexão pelo desenho',()=>{
  render(<Editor/>);const transfer={getData:()=> 'process',dropEffect:'copy'};
  fireEvent(screen.getByRole('region',{name:'Canvas do fluxograma; role para explorar'}),Object.assign(new MouseEvent('drop',{bubbles:true,clientX:500,clientY:300}),{dataTransfer:transfer}));
  expect(draft.algorithm.nodes.at(-1)).toMatchObject({kind:'process',x:405,y:260});
  fireEvent.click(screen.getByRole('button',{name:'Fechar edição'}));connect('inicio','fim');
  fireEvent.click(screen.getByRole('button',{name:'Conexão inicio next fim'}));fireEvent.click(screen.getByRole('button',{name:'Excluir seleção'}));expect(draft.algorithm.edges).toHaveLength(0);
 });
 it('fecha a ajuda pelo botão, Esc e clique fora',()=>{
  render(<Editor/>);const open=()=>fireEvent.click(screen.getByRole('button',{name:'Como funciona'}));
  open();fireEvent.click(screen.getByRole('button',{name:'Fechar ajuda'}));expect(screen.queryByRole('dialog',{name:'Como funciona'})).toBeNull();
  open();fireEvent.keyDown(screen.getByRole('dialog',{name:'Como funciona'}),{key:'Escape'});expect(screen.queryByRole('dialog',{name:'Como funciona'})).toBeNull();
  open();fireEvent.click(screen.getByRole('dialog',{name:'Como funciona'}),{clientX:-1,clientY:-1});expect(screen.queryByRole('dialog',{name:'Como funciona'})).toBeNull();
 });
 it('valida nomes, tipo e entrada inválida sem executar JavaScript',()=>{
  render(<Editor/>);fireEvent.click(screen.getByRole('button',{name:'+ Entrada'}));save('constructor');expect(screen.getByRole('alert')).toBeTruthy();
  fireEvent.change(screen.getByLabelText('Nome'),{target:{value:'pontuacao'}});fireEvent.change(screen.getByLabelText('Tipo'),{target:{value:'texto'}});fireEvent.click(screen.getByRole('button',{name:'Salvar bloco'}));expect(draft.algorithm.nodes.find(n=>n.kind==='input')?.inputs?.[0].type).toBe('texto');connect('inicio','bloco1');connect('bloco1','fim');expect(execute(draft.algorithm,approval,{nota:8}).error).toContain('enunciado exige numero');
  expect(execute(approvalExample,approval,{nota:'8'}).error).toContain('tipo inválido');
 });
 it('adiciona arrays e matriz junto de outras entradas e preserva seus valores',()=>{
    render(<Editor/>);fireEvent.click(screen.getByRole('button',{name:'+ Entrada'}));
    expect(screen.getByRole('option',{name:'Array de números'})).toBeTruthy();
    for(const [index,type,raw] of [[2,'numeros','[1,2,3]'],[3,'textos','["Ana","Bia"]'],[4,'matriz','[[1,2],[3,4]]']] as const){
      fireEvent.click(screen.getByRole('button',{name:'Adicionar entrada'}));
      fireEvent.change(screen.getByLabelText(`Tipo ${index}`),{target:{value:type}});
      fireEvent.change(screen.getByLabelText(`Entrada ${index}`),{target:{value:raw}});
    }
    fireEvent.click(screen.getByRole('button',{name:'Salvar bloco'}));
    const restored=parseFlowDraft(JSON.parse(JSON.stringify(draft)),approval);
    expect(restored.algorithm.nodes.find(n=>n.kind==='input')?.inputs?.slice(1).map(row=>row.value)).toEqual([[1,2,3],['Ana','Bia'],[[1,2],[3,4]]]);
    expect(restored.inputValues).toEqual(draft.inputValues);
   });
   it('edita o valor numérico no próprio bloco de Entrada sem JSON',()=>{
  render(<Editor/>);fireEvent.click(screen.getByRole('button',{name:'+ Entrada'}));
  const field=screen.getByLabelText('Entrada') as HTMLInputElement;
  expect(field.type).toBe('number');fireEvent.change(field,{target:{value:'6'}});
  expect((screen.getByLabelText('Entrada nota') as HTMLInputElement).value).toBe('6');
  save('pontuacao');expect(screen.getByText('pontuacao: Número;')).toBeTruthy();expect(screen.queryByText('Teste: 6')).toBeNull();
  fireEvent.click(screen.getByRole('button',{name:/^bloco1: Entrada/}));expect((screen.getByLabelText('Entrada') as HTMLInputElement).value).toBe('6');
 });

 it('lê duas entradas no mesmo bloco com nomes, valores e tipos independentes',()=>{
  const task=curriculumTasks.find(t=>t.slug==='funcoes')!;
  function Multi(){const [value,setValue]=useState<FlowDraft>({algorithm:blankAlgorithm(),results:[]});draft=value;return <FlowEditor challenge={task.challenge} value={value} onChange={setValue} storageMessage="Local"/>;}
  render(<Multi/>);fireEvent.click(screen.getByRole('button',{name:'+ Entrada'}));
  fireEvent.change(screen.getByLabelText('Nome'),{target:{value:'primeiraNota'}});
  fireEvent.change(screen.getByLabelText('Entrada'),{target:{value:'3'}});
  fireEvent.click(screen.getByRole('button',{name:'Adicionar entrada'}));
  fireEvent.change(screen.getByLabelText('Nome 2'),{target:{value:'segundaNota'}});
  fireEvent.change(screen.getByLabelText('Entrada 2'),{target:{value:'9'}});
  fireEvent.click(screen.getByRole('button',{name:'Salvar bloco'}));
  expect(screen.getByText('primeiraNota: Número;')).toBeTruthy();expect(screen.getByText('segundaNota: Número;')).toBeTruthy();
    expect(draft.algorithm.nodes.find(n=>n.kind==='input')?.inputs).toEqual([{name:'primeiraNota',source:'a',type:'numero'},{name:'segundaNota',source:'b',type:'numero'}]);
  expect((screen.getByLabelText('Entrada a') as HTMLInputElement).value).toBe('3');expect((screen.getByLabelText('Entrada b') as HTMLInputElement).value).toBe('9');
  fireEvent.click(screen.getByRole('button',{name:'+ Saída'}));save('(primeiraNota + segundaNota) / 2');
  connect('inicio','bloco1');connect('bloco1','bloco2');connect('bloco2','fim');
  expect(execute(draft.algorithm,task.challenge,{a:3,b:9}).output).toEqual({resultado:6});
  const restored=parseFlowDraft(JSON.parse(JSON.stringify(draft)),task.challenge);expect(execute(restored.algorithm,task.challenge,{a:2,b:8}).output).toEqual({resultado:5});
 });
 it('preenche automaticamente o próximo dado ao adicionar blocos de entrada separados',()=>{
  const task=curriculumTasks.find(t=>t.slug==='funcoes')!;
  function Multi(){const [value,setValue]=useState<FlowDraft>({algorithm:blankAlgorithm(),results:[]});draft=value;return <FlowEditor challenge={task.challenge} value={value} onChange={setValue} storageMessage="Local"/>;}
  render(<Multi/>);fireEvent.click(screen.getByRole('button',{name:'+ Entrada'}));save('primeira');fireEvent.click(screen.getByRole('button',{name:'+ Entrada'}));save('segunda');
  expect(draft.algorithm.nodes.filter(n=>n.kind==='input').map(n=>n.inputs![0].source)).toEqual(['a','b']);
 });

});
