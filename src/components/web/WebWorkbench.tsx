import { useState } from 'react';
import {HttpExplorer} from './HttpExplorer';
import {NetworkJourney} from './NetworkJourney';
import {ContractLab} from './ContractLab';
import {TeachingTerminal} from './TeachingTerminal';
import {GitSimulator} from './GitSimulator';
import {WebScope} from './useWebJournal';
const tools={http:{label:'HTTP e sessão',Component:HttpExplorer},network:{label:'Rede e diagnóstico',Component:NetworkJourney},contracts:{label:'Contratos REST',Component:ContractLab},terminal:{label:'Terminal e cURL',Component:TeachingTerminal},git:{label:'Git colaborativo',Component:GitSimulator}};
export type WebTool=keyof typeof tools;
export const exerciseTool:Record<string,WebTool>={'02-ex-01':'http','02-ex-02':'terminal','02-ex-03':'git','02-ex-04':'contracts','02-ex-05':'network','02-ex-06':'http','02-ex-07':'terminal','02-ex-08':'contracts','02-ex-09':'git'};
export function WebWorkbench({exerciseId}:{exerciseId:string}){
 const [active,setActive]=useState<WebTool>(exerciseTool[exerciseId]??'http');
 return <section className="web-workbench" aria-label="Bancada de simulações"><div className="web-toolbar" role="group" aria-label="Escolher ferramenta didática">{(Object.entries(tools) as [WebTool,typeof tools[WebTool]][]).map(([key,tool])=><button className={`button ${key===active?'primary':'secondary'}`} key={key} aria-pressed={key===active} onClick={()=>setActive(key)}>{tool.label}</button>)}</div><WebScope id={`exercise:${exerciseId}`}><div key={active}>{(()=>{const Component=tools[active].Component;return <Component/>;})()}</div></WebScope><p className="small muted">Estado das ferramentas HTTP, contrato, terminal e Git salvo por contexto neste navegador. Rede é um percurso reiniciável. Rascunhos das simulações não entram no JSON global: registre abaixo os resultados relevantes para exportar ou revisar com IA. Evidências externas continuam não verificadas.</p></section>;
}
