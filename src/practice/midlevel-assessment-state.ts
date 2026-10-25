import {exam15,type ExamPhase,type RubricId,type BlockerId} from './stage-fifteen';
export type ExamTrack='php'|'javascript';
export type ExamMode='assisted';
export type ExamStatus='nao-iniciada'|'em-andamento'|'interrompida'|'concluida';
export type Assessment={points:number|null;status:'NOT_VERIFIED'|'VERIFIED'|'PARTIALLY_VERIFIED'|'FAILED';evidence:string;origin:'declared'|'external-declared';notes:string};
export type CriticalAssessment={status:'NOT_VERIFIED'|'not-found'|'confirmed';evidence:string};
export type ExamEvaluation={reviewer:string;strengths:string;recommendations:string;limits:string;grades:Record<RubricId,Assessment>;blockers:Record<BlockerId,CriticalAssessment>;registeredAt?:string};
export type ExamAttempt={id:string;status:ExamStatus;mode:ExamMode;startedAt:string;stoppedAt?:string;completedAt?:string;solution:string;phases:Record<ExamPhase,string>;checks:boolean[];aiUsed:boolean|null;assistance:string;evaluation:ExamEvaluation;previousEvaluations:ExamEvaluation[]};
export type MidlevelExamState=Partial<Record<ExamTrack,{attempts:ExamAttempt[]}>>;
export const blankEvaluation=():ExamEvaluation=>({reviewer:'',strengths:'',recommendations:'',limits:'',grades:Object.fromEntries(exam15.rubric.map(r=>[r.id,{points:null,status:'NOT_VERIFIED',evidence:'',origin:'declared',notes:''}])) as ExamEvaluation['grades'],blockers:Object.fromEntries(exam15.blockers.map(b=>[b.id,{status:'NOT_VERIFIED',evidence:''}])) as ExamEvaluation['blockers']});
const today=()=>new Date().toISOString();
export function startExam(state:MidlevelExamState|undefined,track:ExamTrack,mode:ExamMode):MidlevelExamState{
 const attempts=state?.[track]?.attempts??[];if(attempts.length>=100)throw Error('Limite local de100 tentativas por trilha; histórico preservado.');
 const latest=attempts.at(-1);if(latest&&latest.status!=='concluida')throw Error('Retome a tentativa atual antes de refazer; nenhum histórico foi apagado.');
 const next:ExamAttempt={id:`15-${track}-${attempts.length+1}`,status:'em-andamento',mode,startedAt:today(),solution:'',phases:Object.fromEntries(exam15.phases.map(p=>[p.id,''])) as Record<ExamPhase,string>,checks:exam15.checks.map(()=>false),aiUsed:null,assistance:'',evaluation:blankEvaluation(),previousEvaluations:[]};
 return {...state,[track]:{attempts:[...attempts,next]}};
}
export const canFinishExam=(a:ExamAttempt)=>!!a.solution.trim()&&exam15.phases.every(p=>!!a.phases[p.id].trim())&&a.checks.length===exam15.checks.length&&a.checks.every(Boolean)&&a.aiUsed!==null&&(!a.aiUsed||!!a.assistance.trim());
export function updateExam(state:MidlevelExamState,track:ExamTrack,patch:Partial<Pick<ExamAttempt,'solution'|'phases'|'checks'|'aiUsed'|'assistance'|'evaluation'>>):MidlevelExamState{
 const attempts=state[track]?.attempts??[];const a=attempts.at(-1);if(!a)return state;
 const content=patch.solution!==undefined||patch.phases!==undefined||patch.aiUsed!==undefined||patch.assistance!==undefined;
 if(a.status==='concluida'&&(content||patch.checks!==undefined||patch.aiUsed!==undefined||patch.assistance!==undefined))return state;
 if((content||patch.evaluation)&&a.evaluation.registeredAt&&a.previousEvaluations.length>=100)throw Error('Limite local de 100 avaliações por tentativa; histórico preservado.');
 let next={...a,...patch};
 if(content){next={...next,checks:a.checks.map(()=>false),evaluation:blankEvaluation()};}
 if((content||patch.evaluation)&&a.evaluation.registeredAt){next.previousEvaluations=[...a.previousEvaluations,a.evaluation];if(patch.evaluation)next.evaluation={...patch.evaluation,registeredAt:undefined};}
 return {...state,[track]:{attempts:[...attempts.slice(0,-1),next]}};
}
export function transitionExam(state:MidlevelExamState,track:ExamTrack,action:'stop'|'continue'|'finish'|'reopen'):MidlevelExamState{
 const attempts=state[track]?.attempts??[];const a=attempts.at(-1);if(!a)return state;
 if(action==='reopen'){
 if(a.status!=='concluida')return state;
 if(a.evaluation.registeredAt&&a.previousEvaluations.length>=100)throw Error('Limite de avaliações; histórico preservado.');
 const next={...a,status:'em-andamento' as const,completedAt:undefined,evaluation:blankEvaluation(),previousEvaluations:a.evaluation.registeredAt?[...a.previousEvaluations,a.evaluation]:a.previousEvaluations};
 return {...state,[track]:{attempts:[...attempts.slice(0,-1),next]}};
 }
 if(action==='finish'&&(a.status!=='em-andamento'||!canFinishExam(a)))return state;
 if(action==='stop'&&a.status!=='em-andamento'||action==='continue'&&a.status!=='interrompida')return state;
 const next:ExamAttempt=action==='finish'?{...a,status:'concluida',completedAt:today()}:action==='stop'?{...a,status:'interrompida',stoppedAt:today()}:{...a,status:'em-andamento'};
 return {...state,[track]:{attempts:[...attempts.slice(0,-1),next]}};
}
export function registerEvaluation(state:MidlevelExamState,track:ExamTrack):MidlevelExamState{
 const attempts=state[track]?.attempts??[];const a=attempts.at(-1);if(!a||a.status!=='concluida'||!a.evaluation.reviewer.trim()||!a.evaluation.limits.trim())return state;
 if(!evaluationConsistent(a.evaluation))return state;
 const next={...a,evaluation:{...a.evaluation,registeredAt:today()}};
 return {...state,[track]:{attempts:[...attempts.slice(0,-1),next]}};
}
export function evaluationConsistent(e:ExamEvaluation){
 return exam15.rubric.every(r=>{const g=e.grades[r.id];return g.status==='NOT_VERIFIED'?g.points===null:g.points!==null&&!!g.evidence.trim()&&(g.status==='VERIFIED'?g.points===r.max:g.status==='FAILED'?g.points===0:g.points>0&&g.points<r.max);})&&exam15.blockers.every(b=>e.blockers[b.id].status==='NOT_VERIFIED'||!!e.blockers[b.id].evidence.trim());
}
export function examResult(a:ExamAttempt|undefined){
 if(!a?.evaluation.registeredAt)return {state:'NOT_VERIFIED' as const,total:null,assessed:0};
 const e=a.evaluation;const assessed=exam15.rubric.filter(r=>e.grades[r.id].status!=='NOT_VERIFIED'&&e.grades[r.id].points!==null&&!!e.grades[r.id].evidence.trim()).length;
 const total=exam15.rubric.reduce((sum,r)=>sum+(e.grades[r.id].points??0),0);
 if(exam15.blockers.some(b=>e.blockers[b.id].status==='confirmed'))return {state:'blocked' as const,total,assessed};
 if(!evaluationConsistent(e)||assessed!==exam15.rubric.length||exam15.blockers.some(b=>e.blockers[b.id].status!=='not-found'||!e.blockers[b.id].evidence.trim()))return {state:'inconclusive' as const,total,assessed};
 return {state:a.status==='concluida'&&canFinishExam(a)&&total>=exam15.minimum?'meets' as const:'below' as const,total,assessed};
}
const record=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const text=(v:unknown,max=50000):v is string=>typeof v==='string'&&v.length<=max;
const timestamp=(v:unknown)=>typeof v==='string'&&/^\d{4}-\d\d-\d\dT/.test(v)&&Number.isFinite(Date.parse(v));
function parseEvaluation(v:unknown):ExamEvaluation{
 if(!record(v)||!['reviewer','strengths','recommendations','limits'].every(k=>text(v[k]))||!record(v.grades)||!record(v.blockers)||Object.keys(v.grades).length!==7||Object.keys(v.blockers).length!==5||v.registeredAt!==undefined&&!timestamp(v.registeredAt))throw Error('Avaliação Pleno inválida.');
 for(const r of exam15.rubric){const g=v.grades[r.id];if(!record(g)||!['NOT_VERIFIED','VERIFIED','PARTIALLY_VERIFIED','FAILED'].includes(String(g.status))||!['declared','external-declared'].includes(String(g.origin))||!text(g.evidence)||!text(g.notes)||(g.points!==null&&(typeof g.points!=='number'||!Number.isFinite(g.points)||g.points<0||g.points>r.max)))throw Error('Pontuação/critério Pleno inválido.');}
 for(const b of exam15.blockers){const c=v.blockers[b.id];if(!record(c)||!['NOT_VERIFIED','not-found','confirmed'].includes(String(c.status))||!text(c.evidence))throw Error('Bloqueador Pleno inválido.');}
 if(v.registeredAt&&(!(v.reviewer as string).trim()||!(v.limits as string).trim()))throw Error('Origem da avaliação ausente.');
 const parsed=structuredClone(v) as unknown as ExamEvaluation;
 if(parsed.registeredAt&&!evaluationConsistent(parsed))throw Error('Avaliação registrada contraditória ou sem evidências.');
 return parsed;
}
export function parseMidlevelExam(value:unknown):MidlevelExamState{
 if(!record(value)||Object.keys(value).some(k=>!['php','javascript'].includes(k)))throw Error('Histórico de prova inválido.');const out:MidlevelExamState={};
 for(const track of ['php','javascript'] as const){if(value[track]===undefined)continue;const branch=value[track];if(!record(branch)||!Array.isArray(branch.attempts)||branch.attempts.length>100)throw Error('Tentativas de prova inválidas.');
  const attempts:ExamAttempt[]=branch.attempts.map((v:unknown,index:number)=>{
   if(!record(v)||v.id!==`15-${track}-${index+1}`||!['nao-iniciada','em-andamento','interrompida','concluida'].includes(String(v.status))||!['assisted'].includes(String(v.mode))||!timestamp(v.startedAt)||v.stoppedAt!==undefined&&!timestamp(v.stoppedAt)||v.completedAt!==undefined&&!timestamp(v.completedAt)||!text(v.solution,200000)||!text(v.assistance)||![null,true,false].includes(v.aiUsed as null|boolean)||!record(v.phases)||Object.keys(v.phases).length!==5||!exam15.phases.every(p=>text((v.phases as Record<string,unknown>)[p.id]))||!Array.isArray(v.checks)||v.checks.length!==exam15.checks.length||!v.checks.every(c=>typeof c==='boolean')||!Array.isArray(v.previousEvaluations)||v.previousEvaluations.length>100)throw Error('Registro de prova inválido.');
   const a={...structuredClone(v),evaluation:parseEvaluation(v.evaluation),previousEvaluations:v.previousEvaluations.map(parseEvaluation)} as unknown as ExamAttempt;
   if(a.status==='concluida'&&(!a.completedAt||!canFinishExam(a)))throw Error('Conclusão de prova sem evidências.');
   if(index<(branch.attempts as unknown[]).length-1&&a.status!=='concluida')throw Error('Histórico anterior não concluído.');return a;
  });out[track]={attempts};
 }return out;
}
