// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { TestInputField } from '../components/flow/TestInputField';
import { ExecutionPanel } from '../components/flow/ExecutionPanel';
import { execute, testAlgorithm } from '../features/flow/interpreter';
import { type FlowChallenge, type Value, type ValueType } from '../features/flow/model';
afterEach(cleanup);
const examples:[ValueType,Value][]=[['numero',12.5],['texto','Olá'],['booleano',false],['numeros',[1,2]],['textos',['Ana','Bia']],['matriz',[[1,2],[3,4]]]];
function task(type:ValueType,value:Value):FlowChallenge{return {id:'typed',variables:[{name:'dado',type,input:true,description:''},{name:'resultado',type,description:''}],outputs:['resultado'],rules:[],tests:[{name:'Tipo preservado',input:{dado:value},expected:{resultado:value}}],starter:{version:1,nodes:[{id:'inicio',kind:'start',x:0,y:0},{id:'ler',kind:'input',target:'dado',inputKey:'dado',dataType:type,x:0,y:120},{id:'saida',kind:'output',outputKey:'resultado',expression:{op:'copy',a:{kind:'variable',name:'dado'}},x:0,y:240},{id:'fim',kind:'end',x:0,y:360}],edges:[{from:'inicio',to:'ler',branch:'next'},{from:'ler',to:'saida',branch:'next'},{from:'saida',to:'fim',branch:'next'}]}};}
describe('Entrada e saída tipadas',()=>{
 it.each(examples)('preserva %s na execução, na avaliação e na saída exibida',(type,value)=>{
  const challenge=task(type,value);const run=execute(challenge.starter,challenge,{dado:value});expect(run.error).toBeUndefined();expect(run.output).toEqual({resultado:value});expect(testAlgorithm(challenge.starter,challenge)[0].passed).toBe(true);
  render(<ExecutionPanel algorithm={challenge.starter} challenge={challenge}/>);fireEvent.click(screen.getByRole('button',{name:'Executar passo a passo'}));for(let i=0;i<3;i++)fireEvent.click(screen.getByRole('button',{name:'Próximo passo'}));expect(screen.getByRole('heading',{name:'Saídas produzidas'}).parentElement?.textContent).toContain(JSON.stringify({resultado:value},null,2));
  const mismatch=structuredClone(challenge);mismatch.tests[0].expected.resultado=type==='texto'?12:'12';expect(testAlgorithm(challenge.starter,mismatch)[0].passed).toBe(false);
 });
 it.each(['numeros','textos','matriz'] as const)('mantém colchetes fixos e aceita conteúdo e colagem completa: %s',type=>{
  let stored='[]';function Field(){const [raw,setRaw]=useState('[]');return <TestInputField variable={{name:'lista',type,description:''}} raw={raw} onChange={value=>{stored=value;setRaw(value);}}/>;}
  render(<Field/>);const input=screen.getByLabelText('Entrada lista');const inner=type==='numeros'?'1,2':type==='textos'?'"Ana","Bia"':'[1,2],[3,4]';fireEvent.change(input,{target:{value:inner}});expect(stored).toBe(`[${inner}]`);expect(input.getAttribute('aria-invalid')).toBe('false');
  fireEvent.paste(input,{clipboardData:{getData:()=>`[${inner}]`}});expect(stored).toBe(`[${inner}]`);
  fireEvent.change(input,{target:{value:''}});expect(stored).toBe('[]');
  fireEvent.change(input,{target:{value:'fora'}});expect(stored).toBe('[fora]');expect(input.getAttribute('aria-invalid')).toBe('true');
 });
});
