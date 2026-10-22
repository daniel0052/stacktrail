import {useState} from 'react';
import {agentPlatforms,platformById,type AgentMechanism,type AgentPlatformId} from './agent-platforms';
export const TOOLKIT_STORAGE_KEY='stacktrail:ai-development-toolkit:1';
export const planningCheckIds=['problem-mvp','verifiable-requirements','business-rules-roles','justified-stack','data-api','compatible-configuration','open-decisions','review-explanation'] as const;
export type PlanningCheckId=typeof planningCheckIds[number];
export type PlanningStatus='not-started'|'in-progress'|'paused'|'completed';
export type PlanningAttempt={status:PlanningStatus;evidence:string;checks:Partial<Record<PlanningCheckId,boolean>>;mechanisms:AgentMechanism[]};
export type ToolkitProgress={schema:1;selectedPlatform:AgentPlatformId;plans:Partial<Record<AgentPlatformId,PlanningAttempt>>};
export const blankPlanningAttempt=():PlanningAttempt=>({status:'not-started',evidence:'',checks:{},mechanisms:['rules']});
export const blankToolkitProgress=():ToolkitProgress=>({schema:1,selectedPlatform:'codex',plans:{}});
const isRecord=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
export const canCompletePlanning=(a:PlanningAttempt)=>!!a.evidence.trim()&&planningCheckIds.every(id=>a.checks[id]===true);
export function parseToolkitProgress(raw:string):ToolkitProgress{
 const input:unknown=JSON.parse(raw);if(!isRecord(input)||input.schema!==1||!isRecord(input.plans))throw Error('Unsupported toolkit schema');
 const result=blankToolkitProgress();result.selectedPlatform=platformById(typeof input.selectedPlatform==='string'?input.selectedPlatform:null).id;
 for(const platform of agentPlatforms){const a=input.plans[platform.id];if(!isRecord(a)||typeof a.status!=='string'||!['not-started','in-progress','paused','completed'].includes(a.status)||typeof a.evidence!=='string'||a.evidence.length>12000||!isRecord(a.checks)||!Array.isArray(a.mechanisms))continue;
  const checks:PlanningAttempt['checks']={};for(const id of planningCheckIds)if(typeof a.checks[id]==='boolean')checks[id]=a.checks[id];
  const valid=platform.capabilities.filter(c=>c.example).map(c=>c.mechanism);const mechanisms:AgentMechanism[]=['rules',...valid.filter(id=>id!=='rules'&&(a.mechanisms as unknown[]).includes(id))];
  const attempt:PlanningAttempt={status:a.status as PlanningStatus,evidence:a.evidence,checks,mechanisms};if(attempt.status==='completed'&&!canCompletePlanning(attempt))attempt.status='in-progress';result.plans[platform.id]=attempt;
 }
 return result;
}
export function updatePlanningAttempt(p:ToolkitProgress,platform:AgentPlatformId,patch:Partial<PlanningAttempt>):ToolkitProgress{
 if(!agentPlatforms.some(a=>a.id===platform))return p;
 const old=p.plans[platform]??blankPlanningAttempt();const a={...old,...patch};
 if(patch.evidence!==undefined&&patch.evidence!==old.evidence){a.checks={};a.status='in-progress';}
 if(patch.mechanisms!==undefined&&patch.mechanisms.join()!==old.mechanisms.join()){a.checks={};a.status=old.status==='not-started'?'not-started':'in-progress';}
 if(a.status==='completed'&&!canCompletePlanning(a))a.status='in-progress';
 if(a.status==='completed'&&patch.checks&&!canCompletePlanning(a))a.status='in-progress';
 return {...p,selectedPlatform:platform,plans:{...p.plans,[platform]:a}};
}
export function useToolkitProgress(){
 const [initial]=useState(()=>{try{const raw=localStorage.getItem(TOOLKIT_STORAGE_KEY);return {data:raw?parseToolkitProgress(raw):blankToolkitProgress(),protected:false,error:''};}catch{return {data:blankToolkitProgress(),protected:true,error:'Não foi possível ler o progresso das ferramentas. Dados anteriores preservados; trabalho em memória nesta sessão.'};}});
 const [data,setData]=useState(initial.data),[error,setError]=useState(initial.error);
 function change(fn:(data:ToolkitProgress)=>ToolkitProgress){const next=fn(data);setData(next);if(initial.protected)return;try{localStorage.setItem(TOOLKIT_STORAGE_KEY,JSON.stringify(next));setError('');}catch{setError('Não foi possível salvar. Seu progresso continua em memória nesta sessão; verifique o armazenamento do navegador.');}}
 return {data,change,error};
}
