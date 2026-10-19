import {examResult} from './exam-state';
import {activities,allActivities,getStage,matchesTrack,projects} from './curriculum';
import {roadmap,phases} from '../content/roadmap';
import {attemptFor,stageEvidenceFor,canComplete,type Pilot} from './progress';
const done=(p:Pilot,id:string)=>{const attempt=attemptFor(p,id);return !!attempt&&attempt.status==='concluido'&&canComplete(attempt);};
export type StageStatus = 'nao-iniciada' | 'em-andamento' | 'pausada' | 'concluida';
export const stageStatusLabel: Record<StageStatus, string> = {
 'nao-iniciada': 'Não iniciada',
 'em-andamento': 'Em andamento',
 'pausada': 'Pausada',
 'concluida': 'Concluída',
};
export function stageProgress(p:Pilot,id:string){
 const stage=getStage(id,p.track);if(!stage)return {available:false,status:'nao-iniciada' as StageStatus,done:false,started:false,paused:false,hasProgress:false,percent:0,units:0,total:0,topics:0,coreTopics:0,initial:0,intermediate:0,advanced:0,evidence:false,project:false,completedActivities:0,totalActivities:0,startedAt:undefined as string|undefined,pausedAt:undefined as string|undefined};
 const core=stage.topics.filter(t=>!t.optional);const studied=core.filter(t=>p.studied.includes(t.id)).length;
 const initial=stage.exercises.filter(a=>a.level==='inicial'&&done(p,a.id)).length;
 const intermediate=stage.exercises.filter(a=>a.level==='intermediario'&&done(p,a.id)).length;
 const advanced=stage.exercises.filter(a=>a.level==='avancado'&&!a.optional&&done(p,a.id)).length;
 const initialTarget=(id==='08'||id==='09')?stage.exercises.filter(a=>a.level==='inicial'&&!a.optional).length:id==='00'?4:3;const intermediateTarget=(id==='08'||id==='09')?stage.exercises.filter(a=>a.level==='intermediario'&&!a.optional).length:id==='00'?2:(id==='02'||id==='03'||id==='04'||id==='05'||id==='06'||id==='07')?3:1;const advancedTarget=(id==='08'||id==='09')?stage.exercises.filter(a=>a.level==='avancado'&&!a.optional).length:id==='05'?3:(id==='03'||id==='04'||id==='06')?2:0;const projectRequired=id==='00'||id==='02'||id==='03'||id==='04'||id==='05'||id==='06'||id==='07'||id==='08'||id==='09';const projectDone=id==='05'?projects.some(a=>a.stageId==='05'&&a.level==='avancado'&&done(p,a.id)):done(p,stage.project.id);const evidence=!!stageEvidenceFor(p,id).trim();
 const exam=p.juniorExam?.[p.track]?.attempts.at(-1);
 const examUnits=id==='09'?Number(exam?.status==='concluida')+Number(examResult(exam).state==='meets'):0;
 const total=core.length+initialTarget+intermediateTarget+advancedTarget+1+(projectRequired?1:0)+(id==='09'?2:0);
 const units=studied+Math.min(initial,initialTarget)+Math.min(intermediate,intermediateTarget)+Math.min(advanced,advancedTarget)+Number(evidence)+(projectRequired?Number(projectDone):0)+examUnits;
 const stageActivities=allActivities.filter(a=>a.stageId===id&&matchesTrack(a.track,p.track));
 const completedActivities=stageActivities.filter(a=>done(p,a.id)).length;
 const hasProgress=(id==='09'&&!!exam)||units>0||stage.topics.some(t=>p.studied.includes(t.id))||stageActivities.some(a=>attemptFor(p,a.id)?.status!=='novo'&&!!attemptFor(p,a.id));
 const isDone=units===total;
 const tracking=p.stageTracking?.[id];
 const status:StageStatus=isDone?'concluida':tracking?.status==='pausada'?'pausada':(tracking?.status==='em-andamento'||hasProgress)?'em-andamento':'nao-iniciada';
 return {available:true,status,done:isDone,started:status==='em-andamento',paused:status==='pausada',hasProgress,percent:Math.floor(units/total*100),units,total,topics:studied,coreTopics:core.length,initial,intermediate,advanced,evidence,project:projectDone,completedActivities,totalActivities:stageActivities.length,startedAt:tracking?.startedAt,pausedAt:tracking?.pausedAt};
}
export function dashboard(p:Pilot){
 const completed=roadmap.filter(s=>stageProgress(p,s.id).done);const started=roadmap.filter(s=>stageProgress(p,s.id).status==='em-andamento');
 const exercises=activities.filter(a=>done(p,a.id)).length;const portfolio=projects.filter(a=>done(p,a.id)).length;
 const formations=phases.map(phase=>{const list=roadmap.filter(s=>s.phase===phase.id);const n=list.filter(s=>stageProgress(p,s.id).done).length;return {...phase,done:n,total:list.length,percent:Math.floor(n/list.length*100),available:list.filter(s=>getStage(s.id)).length};});
 const achievements=[
 {id:'first-exercise',title:'Primeira prática concluída',earned:exercises>=1,rule:'Um exercício concluído por autoavaliação.'},
 {id:'five-exercises',title:'Cinco práticas concluídas',earned:exercises>=5,rule:'Cinco exercícios concluídos por autoavaliação.'},
 {id:'first-project',title:'Primeiro projeto de portfólio',earned:portfolio>=1,rule:'Um projeto concluído por autoavaliação.'},
 {id:'first-stage',title:'Primeira etapa concluída',earned:completed.length>=1,rule:'Uma etapa atingiu os critérios locais publicados.'},
 {id:'junior',title:'Formação Júnior registrada',earned:stageProgress(p,'00').done&&formations.some(f=>f.id==='junior'&&f.done===f.total),rule:'Competências00–09 registradas com os critérios publicados, incluindo avaliação educacional declarada; sem certificação profissional.'},
 ];
 const next=roadmap.find(s=>!stageProgress(p,s.id).done);
 return {completed:completed.length,started:started.length,exercises,projects:portfolio,percent:completed.length/roadmap.length*100,formations,achievements,next};
}

