import {createContext,useContext,useState,createElement,type ReactNode} from 'react';
import {securityItem,securityCriteria} from './security-registry';
import {securityChecklists} from './security-practice';
import type {SecurityTrack} from './security-types';
export const SECURITY_STORAGE_KEY='stacktrail:security:1';
export type SecurityStatus='not-started'|'in-progress'|'paused'|'completed';
export type AssessmentStatus='not-verified'|'partial'|'not-met'|'met'|'not-applicable';
export type SecurityAssessment={status:AssessmentStatus;notes:string};
export type SecurityAttempt={status:SecurityStatus;evidence:string;review:string;checks:boolean[];hints:number};
export type SecurityProgress={schema:1;track:SecurityTrack;last:string;attempts:Record<string,SecurityAttempt>;assessments:Record<string,Record<string,SecurityAssessment>>};
export const blankSecurity=():SecurityProgress=>({schema:1,track:'php',last:'',attempts:{},assessments:{}});
export const securityKey=(id:string,track:SecurityTrack)=>id+'@'+track;
export const blankSecurityAttempt=(id:string):SecurityAttempt=>({status:'not-started',evidence:'',review:'',checks:securityCriteria(id).map(()=>false),hints:0});
export function securityCanComplete(p:SecurityProgress,id:string,track:SecurityTrack){const a=p.attempts[securityKey(id,track)];if(!a||!a.evidence.trim()||a.checks.length!==securityCriteria(id).length||!a.checks.every(Boolean))return false;const checklist=securityChecklists.find(c=>c.id===id);return !checklist||checklist.items.every(item=>{const m=p.assessments[securityKey(id,track)]?.[item.id];return m&&['met','not-applicable'].includes(m.status)&&!!m.notes.trim();});}
export function updateSecurity(p:SecurityProgress,id:string,track:SecurityTrack,patch:Partial<SecurityAttempt>):SecurityProgress{
 if(!securityItem(id))return p;const key=securityKey(id,track),old=p.attempts[key]??blankSecurityAttempt(id);const a={...old,...patch};
 if(patch.evidence!==undefined&&patch.evidence!==old.evidence){a.checks=old.checks.map(()=>false);a.review='';a.status='in-progress';}
 const next={...p,track,last:id,attempts:{...p.attempts,[key]:a}};if(a.status==='completed'&&!securityCanComplete(next,id,track))a.status='in-progress';return next;
}
export function updateSecurityAssessment(p:SecurityProgress,id:string,track:SecurityTrack,control:string,value:SecurityAssessment):SecurityProgress{
 if(!securityChecklists.find(c=>c.id===id)?.items.some(i=>i.id===control))return p;const key=securityKey(id,track);const old=p.attempts[key]??blankSecurityAttempt(id);return {...updateSecurity(p,id,track,{checks:old.checks.map(()=>false),review:'',status:'in-progress'}),assessments:{...p.assessments,[key]:{...p.assessments[key],[control]:value}}};
}
const record=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const text=(v:unknown,max:number):v is string=>typeof v==='string'&&v.length<=max;
function splitKey(key:string){const match=/^(.+)@(php|javascript)$/.exec(key);if(!match||!securityItem(match[1]))throw Error('ID de segurança inválido.');return {id:match[1],track:match[2] as SecurityTrack};}
export function parseSecurity(raw:string):SecurityProgress{
 const v:unknown=JSON.parse(raw);if(!record(v)||v.schema!==1||typeof v.track!=='string'||!['php','javascript'].includes(String(v.track))||typeof v.last!=='string'||(v.last&&!securityItem(v.last))||!record(v.attempts)||!record(v.assessments))throw Error('Dados de segurança incompatíveis.');
 const p=blankSecurity();p.track=v.track as SecurityTrack;p.last=v.last;
 for(const [key,rawMark] of Object.entries(v.assessments)){const {id}=splitKey(key);const c=securityChecklists.find(c=>c.id===id);if(!c||!record(rawMark))throw Error('Checklist inválido.');p.assessments[key]={};for(const [control,m] of Object.entries(rawMark)){if(!c.items.some(i=>i.id===control)||!record(m)||typeof m.status!=='string'||!['not-verified','partial','not-met','met','not-applicable'].includes(String(m.status))||!text(m.notes,4000))throw Error('Evidência de controle inválida.');p.assessments[key][control]={status:m.status as AssessmentStatus,notes:m.notes};}}
 for(const [key,a] of Object.entries(v.attempts)){const {id}=splitKey(key);if(!record(a)||typeof a.status!=='string'||!['not-started','in-progress','paused','completed'].includes(String(a.status))||!text(a.evidence,30000)||!text(a.review,20000)||!Array.isArray(a.checks)||a.checks.length!==securityCriteria(id).length||!a.checks.every(x=>typeof x==='boolean')||!Number.isInteger(a.hints)||Number(a.hints)<0||Number(a.hints)>3)throw Error('Tentativa de segurança inválida.');p.attempts[key]={status:a.status as SecurityStatus,evidence:a.evidence,review:a.review,checks:a.checks as boolean[],hints:Number(a.hints)};}
 for(const key of Object.keys(p.attempts)){const {id,track}=splitKey(key);if(p.attempts[key].status==='completed'&&!securityCanComplete(p,id,track))p.attempts[key].status='in-progress';}return p;
}
function useSecurityState(){
 const [initial]=useState(()=>{try{const raw=localStorage.getItem(SECURITY_STORAGE_KEY);return {data:raw?parseSecurity(raw):blankSecurity(),protected:false,error:''};}catch{return {data:blankSecurity(),protected:true,error:'Não foi possível ler o progresso de segurança. Dados anteriores preservados; trabalho em memória nesta sessão.'};}});
 const [data,setData]=useState(initial.data),[error,setError]=useState(initial.error);
 function change(fn:(p:SecurityProgress)=>SecurityProgress){const next=fn(data);setData(next);if(initial.protected)return;try{localStorage.setItem(SECURITY_STORAGE_KEY,JSON.stringify(next));setError('');}catch{setError('Não foi possível salvar segurança. Seu trabalho continua em memória nesta sessão; verifique o armazenamento do navegador.');}}
 return {data,change,error};
}

const SecurityContext=createContext<ReturnType<typeof useSecurityState>|null>(null);
export function SecurityProgressProvider({children}:{children:ReactNode}){return createElement(SecurityContext.Provider,{value:useSecurityState()},children);}
export function useSecurityProgress(){const shared=useContext(SecurityContext);const fallback=useSecurityState();return shared??fallback;}
