import {SecurityProgressProvider} from './security/security-progress';
import {SecurityKnowledgeBasePage} from './SecurityKnowledgeBasePage';
import {AgentSecurityGuidePage} from './AgentSecurityGuidePage';
import {PerformanceAuditPage} from './PerformanceAuditPage';
import {FinalExamPage} from './FinalExamPage';
import {Footer} from './Footer';
import {useEffect,useRef,useState} from 'react';
import {Link,NavLink,Navigate,Route,Routes,useLocation,useParams} from 'react-router-dom';
import {roadmap,phases} from '../content/roadmap';
import {getStage} from './curriculum';
import {usePilot} from './progress';
import {stageProgress} from './achievements';
import {ActivityPage} from './ActivityPage';
import {StagePage,TopicPage,ReferencesPage,ActivitiesPage} from './StudyPages';
import {ProgressPage} from './ProgressPage';
import {ProfessionalDevelopmentPage} from './ProfessionalDevelopmentPage';
import {EnglishJourneyPage} from './EnglishJourneyPage';
import {AIEngineeringPage} from './AIEngineeringPage';
import {MarketSkillsPage} from './MarketSkillsPage';
import {AIDevelopmentToolkitPage} from './AIDevelopmentToolkitPage';
import {ProjectPlanningPage} from './ProjectPlanningPage';
import {Missing,TrackSelect} from './Shared';
function RoadmapPage(){const [level,setLevel]=useState('todos');const {pilot}=usePilot();return <><header className="pf-hero"><div><p className="pf-kicker">STACKTRAIL / SEU PERCURSO</p><h1>Estude nas fontes.<br/><span>Construa com prática.</span></h1><p>Objetivos claros, referências selecionadas e desafios sem respostas prontas. Reúna suas próprias evidências e prepare um portfólio.</p><div className="pf-actions"><Link className="pf-button primary" to={'/etapas/'+pilot.currentStage}>Retomar Etapa {pilot.currentStage} →</Link><Link className="pf-button" to={`/exercicios?etapa=${pilot.currentStage}`}>Exercícios ({pilot.currentStage})</Link><Link className="pf-button" to={`/projetos?etapa=${pilot.currentStage}`}>Projetos ({pilot.currentStage})</Link></div></div><div className="pf-map-art"><span>ESTUDAR NAS FONTES</span><strong>Planejar → construir</strong><span>CONFERIR AS EVIDÊNCIAS</span><strong>Testar → revisar</strong></div></header><section className="pf-panel"><h2>Seu mapa de desenvolvimento</h2><p>20 etapas, de 00 a 19. Pensamento computacional 00, Frontend 01, Web/HTTP/Git 02, Fundamentos de Backend 03, APIs REST e Regras de Negócio 04, SQL/PostgreSQL 05, Testes automatizados e depuração 06 e Segurança/autenticação/autorização 07 e Docker/CI/CD/Kubernetes08 e Consolidação profissional09 disponíveis. A Etapa10 inaugura Pleno com Frontend Moderno e Integração Full Stack. A Etapa 11 aborda Arquitetura Backend e Design de Software; A Etapa12 aborda processamento assíncrono, Redis, filas e RabbitMQ;A Etapa13 desenvolve Performance, Caching e Otimização de Backend;14–19 aguardam migração.</p><div className="pf-tools"><label className="pf-field">Filtrar nível<select value={level} onChange={e=>setLevel(e.target.value)}><option value="todos">Todos os níveis</option>{phases.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></label><TrackSelect/></div><p className="pf-meta">Etapa atual: {pilot.currentStage}. Identifica sua navegação recente, sem conceder conquistas por visita.</p></section>{phases.filter(p=>level==='todos'||p.id===level).map(phase=><section aria-labelledby={'phase-'+phase.id} key={phase.id}><h2 id={'phase-'+phase.id}>{phase.title} <span className="muted">/ {phase.range}</span></h2><div className="pf-cards pf-stage-cards">{roadmap.filter(s=>s.phase===phase.id).map(s=>{const p=stageProgress(pilot,s.id);const cls=['pf-card pf-stage',p.done?'pf-complete':p.started?'pf-active':p.paused?'pf-paused':'',!p.done&&pilot.currentStage===s.id?'pf-current':''].filter(Boolean).join(' ');return <Link className={cls} key={s.id} to={'/etapas/'+s.id}><span className="pf-kicker">ETAPA {s.id}{pilot.currentStage===s.id?' / SUA ETAPA ATUAL':''}</span><h3>{getStage(s.id)?.title??s.title}</h3><p>{s.description}</p><p className="pf-stage-state">{p.done?'✓ Concluída por autoavaliação':p.available?p.started?'● Em andamento':p.paused?'⏸ Pausada':'○ Não iniciada':'Aguardando migração'}</p>{p.available&&<><progress aria-label={`Progresso da Etapa ${s.id}`} max={100} value={p.percent}/><span>{p.percent}% dos registros previstos · {p.completedActivities}/{p.totalActivities} atividades concluídas</span></>}</Link>;})}</div></section>)}</>;}
function LegacyExercise(){const {slug}=useParams();return <Navigate replace to={'/etapas/01/exercicios/'+(slug??'')}/>;}
function PracticeAppContent(){const {pilot,change,error}=usePilot();const [menu,setMenu]=useState(false);const location=useLocation();const main=useRef<HTMLElement>(null);
 useEffect(()=>{setMenu(false);document.title='StackTrail — Roadmap e prática';if(!location.hash)window.scrollTo(0,0);main.current?.focus({preventScroll:true});const stage=location.pathname.match(/^\/etapas\/(00|01|02|03|04|05|06|07|08|09|10|11|12|13)(?:\/|$)/)?.[1];if((stage==='00'||stage==='01'||stage==='02'||stage==='03'||stage==='04'||stage==='05'||stage==='06'||stage==='07'||stage==='08'||stage==='09'||stage==='10'||stage==='11'||stage==='12'||stage==='13')&&pilot.currentStage!==stage)change(p=>({...p,currentStage:stage}));},[location.pathname,location.hash]);
 const nav=[['/','Roadmap'],['/exercicios','Exercícios'],['/projetos','Projetos'],['/referencias','Livros e referências'],['/security','Segurança'],['/desenvolvimento-profissional','Desenvolvimento Profissional'],['/ingles','Inglês'],['/engenharia-com-ia','Engenharia com IA'],['/competencias-do-mercado','Competências do Mercado'],['/ai-development-toolkit','Ferramentas com IA'],['/progresso','Meu progresso']];
 return <div className="pf-shell"><a className="pf-skip" href="#conteudo" onClick={e=>{e.preventDefault();main.current?.focus();main.current?.scrollIntoView();}}>Pular para o conteúdo</a><header className="pf-header"><Link className="pf-brand" to="/"><span aria-hidden="true">{'{ }'}</span>StackTrail<small>ROADMAP & PRÁTICA</small></Link><div className="pf-controls"><button className="pf-button" aria-expanded={menu} aria-controls="pf-nav" onClick={()=>setMenu(v=>!v)}>☰ Menu</button><button className="pf-button" onClick={()=>change(p=>({...p,theme:p.theme==='dark'?'light':'dark'}))}>Tema {pilot.theme==='dark'?'claro':'escuro'}</button><label>Fonte<select aria-label="Tamanho da fonte" value={pilot.font} onChange={e=>change(p=>({...p,font:Number(e.target.value)}))}>{[90,100,110,120,130,140,150].map(n=><option key={n} value={n}>{n}%</option>)}</select></label></div></header><nav id="pf-nav" className={'pf-nav '+(menu?'is-open':'')} aria-label="Navegação principal">{nav.map(([path,label])=><NavLink to={path} end key={path}>{label}</NavLink>)}</nav>{error&&<p className="pf-alert" role="alert">{error} <Link to="/progresso">Ver Meu progresso</Link></p>}<main id="conteudo" ref={main} className="pf-main" tabIndex={-1}><Routes>
 <Route path="/" element={<RoadmapPage/>}/><Route path="/etapas" element={<Navigate to="/" replace/>}/><Route path="/etapas/:id" element={<StagePage/>}/>
 <Route path="/etapas/13/performance-audit" element={<PerformanceAuditPage/>}/>
 <Route path="/etapas/09/prova-final" element={<FinalExamPage/>}/><Route path="/etapas/:id/topicos" element={<TopicPage/>}/><Route path="/etapas/:id/topicos/:topic" element={<TopicPage/>}/>
 <Route path="/etapas/:id/referencias" element={<ReferencesPage key={location.pathname+location.search}/>}/><Route path="/referencias" element={<ReferencesPage key={location.search}/>}/>
 <Route path="/exercicios" element={<ActivitiesPage key={'exercises'+location.pathname+location.search}/>}/><Route path="/etapas/:id/exercicios" element={<ActivitiesPage key={location.pathname+location.search}/>}/><Route path="/etapas/:id/exercicios/:slug" element={<ActivityPage key={location.pathname}/>}/>
 <Route path="/projetos" element={<ActivitiesPage portfolio key={'projects'+location.pathname+location.search}/>}/><Route path="/etapas/:id/projetos" element={<ActivitiesPage portfolio key={location.pathname+location.search}/>}/><Route path="/projetos/:slug" element={<ActivityPage project key={location.pathname}/>}/><Route path="/etapas/:id/projeto" element={<ActivityPage project key={location.pathname}/>}/>
 <Route path="/desenvolvimento-profissional" element={<ProfessionalDevelopmentPage/>}/>
 <Route path="/ingles/*" element={<EnglishJourneyPage/>}/>
 <Route path="/engenharia-com-ia" element={<AIEngineeringPage/>}/>
 <Route path="/competencias-do-mercado" element={<MarketSkillsPage/>}/>
 <Route path="/ai-development-toolkit" element={<AIDevelopmentToolkitPage/>}/>
 <Route path="/ai-development-toolkit/project-planning" element={<ProjectPlanningPage/>}/>
 <Route path="/security/*" element={<SecurityKnowledgeBasePage/>}/>
 <Route path="/ai-development-toolkit/agent-security" element={<AgentSecurityGuidePage/>}/>
 <Route path="/progresso" element={<ProgressPage/>}/>
 <Route path="/laboratorio" element={<Navigate to="/etapas/01/exercicios" replace/>}/><Route path="/laboratorio/:slug" element={<LegacyExercise/>}/><Route path="/aulas/*" element={<Navigate to="/etapas/01/topicos" replace/>}/><Route path="*" element={<Missing/>}/>
 </Routes></main><Footer/></div>;
}


export function PracticeApp(){return <SecurityProgressProvider><PracticeAppContent/></SecurityProgressProvider>;}
