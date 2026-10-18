import {activities,allActivities,getStage,projects,type StageId} from './curriculum';
import {roadmap,phases} from '../content/roadmap';
import {canComplete,type Pilot} from './progress';
const done=(p:Pilot,id:string)=>{const attempt=p.attempts[id];return !!attempt&&attempt.status==='concluido'&&canComplete(attempt);};
export function stageProgress(p:Pilot,id:string){
 const stage=getStage(id);if(!stage)return {available:false,done:false,started:false,percent:0,units:0,total:0,topics:0,coreTopics:0,initial:0,intermediate:0,evidence:false,project:false};
 const core=stage.topics.filter(t=>!t.optional);const studied=core.filter(t=>p.studied.includes(t.id)).length;
 const initial=stage.exercises.filter(a=>a.level==='inicial'&&done(p,a.id)).length;
 const intermediate=stage.exercises.filter(a=>a.level==='intermediario'&&done(p,a.id)).length;
 const initialTarget=id==='00'?4:3;const intermediateTarget=id==='00'?2:1;const projectDone=done(p,stage.project.id);const evidence=!!p.stageEvidence[id as StageId].trim();
 const total=core.length+initialTarget+intermediateTarget+1+(id==='00'?1:0);
 const units=studied+Math.min(initial,initialTarget)+Math.min(intermediate,intermediateTarget)+Number(evidence)+(id==='00'?Number(projectDone):0);
 return {available:true,done:units===total,started:units>0||stage.topics.some(t=>p.studied.includes(t.id))||allActivities.some(a=>a.stageId===id&&p.attempts[a.id]?.status!=='novo'&&!!p.attempts[a.id]),percent:Math.floor(units/total*100),units,total,topics:studied,coreTopics:core.length,initial,intermediate,evidence,project:projectDone};
}
export function dashboard(p:Pilot){
 const completed=roadmap.filter(s=>stageProgress(p,s.id).done);const started=roadmap.filter(s=>{const x=stageProgress(p,s.id);return x.started&&!x.done;});
 const exercises=activities.filter(a=>done(p,a.id)).length;const portfolio=projects.filter(a=>done(p,a.id)).length;
 const formations=phases.map(phase=>{const list=roadmap.filter(s=>s.phase===phase.id);const n=list.filter(s=>stageProgress(p,s.id).done).length;return {...phase,done:n,total:list.length,percent:Math.floor(n/list.length*100),available:list.filter(s=>getStage(s.id)).length};});
 const achievements=[
 {id:'first-exercise',title:'Primeira prática concluída',earned:exercises>=1,rule:'Um exercício concluído por autoavaliação.'},
 {id:'five-exercises',title:'Cinco práticas concluídas',earned:exercises>=5,rule:'Cinco exercícios concluídos por autoavaliação.'},
 {id:'first-project',title:'Primeiro projeto de portfólio',earned:portfolio>=1,rule:'Um projeto concluído por autoavaliação.'},
 {id:'first-stage',title:'Primeira etapa concluída',earned:completed.length>=1,rule:'Uma etapa atingiu os critérios locais publicados.'},
 {id:'junior',title:'Formação Júnior registrada',earned:formations.some(f=>f.id==='junior'&&f.done===f.total),rule:'Todas as nove etapas Júnior concluídas. Ainda indisponível:02–09 aguardam migração.'},
 ];
 const next=roadmap.find(s=>!stageProgress(p,s.id).done);
 return {completed:completed.length,started:started.length,exercises,projects:portfolio,percent:completed.length/roadmap.length*100,formations,achievements,next};
}
