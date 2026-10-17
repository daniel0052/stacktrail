import {initialHttpState,initialRequest,simulateHttp,methods,scenarios,type HttpRequest,type HttpResult} from './http';
import {newContract,validateContract,operations,type Contract,type ContractReport} from './contracts';
import {newTerminal,runTerminal} from './terminal';
import {actGit,newGit} from './git';
import {isRecord,isText} from './journal';
export type HttpAction={type:'patch';field:keyof HttpRequest;value:string}|{type:'send'};
export const seedHttp=()=>({state:initialHttpState(),request:initialRequest(),result:null as HttpResult|null});
export function reduceHttp(v:ReturnType<typeof seedHttp>,a:HttpAction){if(a.type==='patch')return {...v,request:{...v.request,[a.field]:a.value},result:null};const next=simulateHttp(v.state,v.request);return {...v,...next};}
export const isHttpAction=(a:unknown):a is HttpAction=>isRecord(a)&&(a.type==='send'||a.type==='patch'&&['method','endpoint','headers','body','scenario'].includes(String(a.field))&&isText(a.value)&&(a.field!=='method'||methods.includes(a.value as HttpRequest['method']))&&(a.field!=='scenario'||scenarios.includes(a.value as HttpRequest['scenario'])));
export type ContractAction={type:'patch';field:keyof Contract;value:string|number}|{type:'verify'};
export const seedContract=()=>({contract:newContract(),report:null as ContractReport|null});
export function reduceContract(v:ReturnType<typeof seedContract>,a:ContractAction){if(a.type==='patch')return {contract:{...v.contract,[a.field]:a.value},report:null};return {...v,report:validateContract(v.contract)};}
export const isContractAction=(a:unknown):a is ContractAction=>isRecord(a)&&(a.type==='verify'||a.type==='patch'&&['operation','method','path','status','headers','response','scenario'].includes(String(a.field))&&(a.field==='status'?typeof a.value==='number'&&Number.isFinite(a.value):isText(a.value))&&(a.field!=='operation'||operations.includes(a.value as Contract['operation']))&&(a.field!=='method'||methods.includes(a.value as Contract['method']))&&(a.field!=='scenario'||['success','missing','invalid'].includes(String(a.value))));
export type TerminalAction={command:string};
export const seedTerminal=()=>({state:newTerminal(),history:[] as {command:string;output:string;explanation:string;exit:number}[]});
export function reduceTerminal(v:ReturnType<typeof seedTerminal>,a:TerminalAction){const next=runTerminal(v.state,a.command);return {state:next.state,history:[...v.history.slice(-19),{command:a.command,output:next.output,explanation:next.explanation,exit:next.state.lastExit}]};}
export const isTerminalAction=(a:unknown):a is TerminalAction=>isRecord(a)&&isText(a.command);
export type GitAction={action:string;argument:string};
export const seedGit=()=>({state:newGit(),message:'Comece editando o arquivo e consultando status.'});
export const reduceGit=(v:ReturnType<typeof seedGit>,a:GitAction)=>actGit(v.state,a.action,a.argument);
export const isGitAction=(a:unknown):a is GitAction=>isRecord(a)&&['edit','status','diff','add','commit','branch','switch','restore','merge','pull','rebase','continue-rebase','remote-change','fetch','push','pr'].includes(String(a.action))&&isText(a.argument);
