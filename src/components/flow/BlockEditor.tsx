import { useState } from 'react';
import { TestInputField } from './TestInputField';
import { blockText } from './FlowCanvas';
import { expressionLabel, labels, safeIdentifier, valueMatches, type Algorithm, type Block, type FlowChallenge, type ValueType, type Variable, type InputBinding, type Value } from '../../features/flow/model';
import { parseAssignment, parseCall, parseExpression } from '../../features/flow/syntax';
const types:ValueType[]=['numero','texto','booleano','numeros','textos','matriz'];
const typeLabels:Record<ValueType,string>={numero:'Número',texto:'Texto',booleano:'Booleano',numeros:'Array de números',textos:'Array de textos',matriz:'Matriz numérica'};
const initialValue=(type:ValueType):Value=>type==='texto'?'':type==='booleano'?false:type==='numero'?0:[];
type Row=InputBinding&{raw?:string};
type Props={node:Block;graph:Algorithm;challenge:FlowChallenge;onSave:(block:Block,declaration?:Variable)=>void;onClose:()=>void;testInputs?:Record<string,string>;onTestInput?:(key:string,raw:string)=>void};
export function BlockEditor({node,graph,challenge,onSave,onClose,testInputs,onTestInput}:Props){
 const sources=challenge.variables.filter(v=>v.input);
 const [entries,setEntries]=useState<Row[]>(()=>node.inputs??[{name:node.target??sources[0]?.name??'entrada',source:node.inputKey??(sources.some(v=>v.name===node.target)?node.target:sources[0]?.name),type:node.dataType??sources[0]?.type??'numero'}]);
 const setEntry=(i:number,patch:Partial<Row>)=>setEntries(rows=>rows.map((row,j)=>i===j?{...row,...patch}:row));
 const available=sources.filter(v=>!entries.some(row=>row.source===v.name)&&!graph.nodes.some(n=>n.id!==node.id&&n.kind==='input'&&(n.inputs??[{source:n.inputKey??n.target}]).some(row=>row.source===v.name)));
 const [text,setText]=useState(node.kind==='output'?node.expression?expressionLabel(node.expression):node.target??'':node.kind==='return'||node.kind==='decision'?expressionLabel(node.expression):node.kind==='process'||node.kind==='call'?blockText(node):'');
 const [type,setType]=useState<ValueType>(node.dataType??graph.variables?.find(v=>v.name===node.target)?.type??challenge.variables.find(v=>v.name===node.target)?.type??'numero');
 const [key,setKey]=useState(node.outputKey??(challenge.outputs.includes(node.target??'')?node.target:challenge.outputs[0])??'');
 const [error,setError]=useState('');
 const save=()=>{try{
  let n={...node};let declaration:Variable|undefined;
  if(node.kind==='input'){
   const bindings=entries.map((row):InputBinding=>{
    if(!safeIdentifier(row.name))throw new Error('Nome: comece por letra e use letras, números ou sublinhado.');
    if(row.source){if(!sources.some(v=>v.name===row.source))throw new Error('Escolha um dado do enunciado ou uma entrada livre.');return {name:row.name,type:row.type,source:row.source};}
    let value:unknown;try{value=JSON.parse(row.raw??JSON.stringify(row.value??initialValue(row.type)));}catch{throw new Error(`Entrada ${row.name}: informe um valor válido.`);}
    if(!valueMatches(value,row.type))throw new Error(`Entrada ${row.name}: valor incompatível com ${row.type}.`);
    return {name:row.name,type:row.type,value};
   });
   if(new Set(bindings.map(row=>row.name)).size!==bindings.length)throw new Error('Use um nome diferente para cada entrada.');
   n={...n,target:bindings[0].name,inputKey:bindings[0].source,dataType:bindings[0].type,inputs:bindings};
  }
  if(node.kind==='process'){const parsed=parseAssignment(text);n={...n,...parsed,dataType:type};declaration={name:parsed.target,type,description:'Variável criada pelo estudante.'};}
  if(node.kind==='decision')n={...n,expression:parseExpression(text)};
  if(node.kind==='output')n={...n,target:undefined,outputKey:key,expression:parseExpression(text)};
  if(node.kind==='call'){const parsed=parseCall(text);n={...n,...parsed};if(parsed.target)declaration={name:parsed.target,type,description:'Retorno de função.'};}
  if(node.kind==='return')n={...n,expression:text.trim()?parseExpression(text):undefined};
  onSave(n,declaration);onClose();
 }catch(e){setError(e instanceof Error?e.message:'Revise o conteúdo do bloco.');}};
 return <form role="dialog" aria-label={`Editar ${labels[node.kind]}`} onSubmit={e=>{e.preventDefault();save();}} onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();onClose();}}}>
 <div className="flow-popover-heading"><strong>{labels[node.kind]}</strong><button type="button" aria-label="Fechar edição" title="Fechar edição · Esc" onClick={onClose}>×</button></div>
 {node.kind==='input'&&<>{entries.map((row,i)=>{
   const raw=row.source?testInputs?.[row.source]??JSON.stringify(initialValue(row.type)):row.raw??JSON.stringify(row.value??initialValue(row.type));
   return <fieldset className="flow-entry-row" key={i}>
    {entries.length>1&&<legend>Entrada {i+1}</legend>}
    <label>Nome<input aria-label={i?`Nome ${i+1}`:'Nome'} autoFocus={!i} value={row.name} maxLength={40} onChange={e=>{const matching=sources.find(v=>v.name===e.target.value);setEntry(i,{name:e.target.value,...(matching?{source:matching.name,type:matching.type}:{})});}}/></label>
    <TestInputField showType={false} variable={{name:row.name,type:row.type,description:'Entrada do bloco'}} raw={raw} label={i?`Entrada ${i+1}`:'Entrada'} onChange={value=>{if(row.source)onTestInput?.(row.source,value);else setEntry(i,{raw:value});}}/>
    <label>Tipo<select aria-label={i?`Tipo ${i+1}`:'Tipo'} value={row.type} onChange={e=>{const type=e.target.value as ValueType;const raw=JSON.stringify(initialValue(type));setEntry(i,{type,raw,value:initialValue(type)});if(row.source)onTestInput?.(row.source,raw);}}>{types.map(t=><option key={t} value={t}>{typeLabels[t]}</option>)}</select></label>
    {row.source?<p className="small muted">Dado do enunciado: <strong>{row.source}</strong>{row.name!==row.source?` → ${row.name}`:''}.</p>:<p className="small muted">Entrada livre: o valor fica salvo neste bloco.</p>}
    <details><summary>Vínculo com o enunciado</summary><select aria-label={`Dado do enunciado ${i+1}`} value={row.source??''} onChange={e=>{const v=sources.find(v=>v.name===e.target.value);setEntry(i,v?{source:v.name,type:v.type}:{source:undefined});}}><option value="">Valor livre deste bloco</option>{sources.map(v=><option key={v.name}>{v.name}</option>)}</select></details>
    {entries.length>1&&<button type="button" onClick={()=>setEntries(rows=>rows.filter((_,j)=>j!==i))}>Remover entrada {i+1}</button>}
   </fieldset>;
 })}<button type="button" disabled={entries.length>=16} onClick={()=>{const source=available[0];let i=entries.length+1;while(entries.some(row=>row.name===`entrada${i}`))i++;setEntries(rows=>[...rows,source?{name:source.name,source:source.name,type:source.type}:{name:`entrada${i}`,type:'numero',value:0}]);}}>Adicionar entrada</button><p className="small muted">Cada entrada tem nome, valor e tipo próprios. Até 16 por bloco.</p></>}
 {node.kind==='output'&&<label>Saída esperada<select value={key} onChange={e=>setKey(e.target.value)}>{challenge.outputs.map(name=><option key={name}>{name}</option>)}</select></label>}
 {!['start','end','input'].includes(node.kind)&&<label>{node.kind==='decision'?'Condição':node.kind==='output'?'Valor da saída':node.kind==='call'?'Chamada':node.kind==='return'?'Valor de retorno':'Cálculo'}<input autoFocus aria-label="Conteúdo do bloco" value={text} maxLength={2000} placeholder={node.kind==='process'?'minhaMedia = (a + b) / 2':node.kind==='decision'?'pontuacao >= 7':node.kind==='call'?'media = calcularMedia(a, b)':'"Meu texto"'} onChange={e=>setText(e.target.value)}/></label>}
 {['process','call'].includes(node.kind)&&<label>Tipo da variável<select value={type} onChange={e=>setType(e.target.value as ValueType)}>{types.map(t=><option key={t} value={t}>{typeLabels[t]}</option>)}</select></label>}
 {['start','end'].includes(node.kind)&&<p>Este bloco delimita o fluxo e não precisa de configuração.</p>}
 {error&&<p role="alert" className="error-text">{error}</p>}
 <div className="form-actions"><button type="submit" className="button primary">Salvar bloco</button><button type="button" onClick={onClose}>Cancelar</button></div>
 {!['input','start','end'].includes(node.kind)&&<p className="small muted">Expressões seguras: + − * / %, comparações, and/or/not, tamanho(lista), lista[i]. Textos entre aspas duplas. Funções próprias usam o bloco Chamada.</p>}
 </form>;
}
