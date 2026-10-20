import {useState} from 'react';
import {aiModules,aiPaths,type AIPathId} from './ai-engineering';
export const AI_STORAGE_KEY='stacktrail:ai-engineering:1';
export type AIStatus='new'|'active'|'paused'|'done';
export type AIAttempt={status:AIStatus;evidence:string;checks:boolean[]};
export type AIProgress={schema:1;paths:Partial<Record<string,AIStatus>>;attempts:Record<string,AIAttempt>;last:string};
export const emptyAIProgress=():AIProgress=>({schema:1,paths:{},attempts:{},last:'ai-j1@php'});
const record=(v:unknown):v is Record<string,unknown>=>typeof v==='object'&&v!==null&&!Array.isArray(v);
const status=(v:unknown):v is AIStatus=>typeof v==='string'&&['new','active','paused','done'].includes(v);
export function aiAttemptKey(id:string,stack:string){return `${id}@${stack}`;}
export function blankAIAttempt(id:string):AIAttempt{return {status:'new',evidence:'',checks:Array(aiModules.find(m=>m.id===id)?.criteria.length??0).fill(false)};}
export function aiCanComplete(a:AIAttempt){return a.evidence.trim().length>0&&a.checks.length>0&&a.checks.every(Boolean);}
export function aiPathStats(p:AIProgress,id:AIPathId,stack:string){const modules=aiModules.filter(m=>m.path===id);const done=modules.filter(m=>{const a=p.attempts[aiAttemptKey(m.id,stack)];return a?.status==='done'&&aiCanComplete(a);}).length;return {done,total:modules.length,percent:Math.round(done/modules.length*100)};}
export function parseAIProgress(raw:string):AIProgress{
 const v:unknown=JSON.parse(raw);if(!record(v)||v.schema!==1||!record(v.paths)||!record(v.attempts))throw Error('Formato incompatível');
 const p=emptyAIProgress();
 for(const path of aiPaths)for(const stack of ['php','javascript']){const key=aiAttemptKey(path.id,stack);const value=v.paths[key];if(status(value))p.paths[key]=value;}
 for(const m of aiModules)for(const stack of ['php','javascript']){
  const key=aiAttemptKey(m.id,stack),a=v.attempts[key];
  if(!record(a)||!status(a.status)||typeof a.evidence!=='string'||a.evidence.length>20000||!Array.isArray(a.checks)||a.checks.length!==m.criteria.length||!a.checks.every(x=>typeof x==='boolean'))continue;
  const clean:AIAttempt={status:a.status,evidence:a.evidence,checks:a.checks};if(clean.status==='done'&&!aiCanComplete(clean))clean.status='active';p.attempts[key]=clean;
 }
 if(typeof v.last==='string'&&aiModules.some(m=>['php','javascript'].some(s=>aiAttemptKey(m.id,s)===v.last)))p.last=v.last;
 for(const path of aiPaths)for(const stack of ['php','javascript']){const key=aiAttemptKey(path.id,stack);if(p.paths[key]==='done'&&aiPathStats(p,path.id,stack).percent!==100)p.paths[key]='active';}
 return p;
}
export function updateAIAttempt(p:AIProgress,id:string,stack:string,patch:Partial<AIAttempt>):AIProgress{
 const m=aiModules.find(m=>m.id===id);if(!m||!['php','javascript'].includes(stack))return p;
 const key=aiAttemptKey(id,stack);const old=p.attempts[key]??blankAIAttempt(id);
 const next={...old,...patch};
 if(patch.evidence!==undefined&&patch.evidence!==old.evidence){next.checks=old.checks.map(()=>false);next.status='active';}
 if(next.status==='done'&&!aiCanComplete(next))next.status='active';
 const paths={...p.paths};const pathKey=aiAttemptKey(m.path,stack);if(paths[pathKey]==='done'&&next.status!=='done')paths[pathKey]='active';
 return {...p,paths,attempts:{...p.attempts,[key]:next},last:key};
}
export function useAIProgress(){
 const [loaded]=useState(()=>{try{const raw=localStorage.getItem(AI_STORAGE_KEY);return {data:raw?parseAIProgress(raw):emptyAIProgress(),error:'',protected:false};}catch{return {data:emptyAIProgress(),error:'Não foi possível ler o progresso de IA. Dados existentes foram preservados; alterações ficam em memória nesta sessão.',protected:true};}});
 const [data,setData]=useState(loaded.data),[error,setError]=useState(loaded.error);
 function change(fn:(p:AIProgress)=>AIProgress){const next=fn(data);setData(next);if(loaded.protected)return;try{localStorage.setItem(AI_STORAGE_KEY,JSON.stringify(next));setError('');}catch{setError('Falha ao salvar progresso de IA. Seus registros continuam em memória nesta sessão. Verifique o armazenamento do navegador.');}}
 return {data,change,error};
}
