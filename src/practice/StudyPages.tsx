import {useEffect,useState} from 'react';
import {Link,useLocation,useParams} from 'react-router-dom';
import {activities,projects,topics,references,getStage,type StageId} from './curriculum';
import {roadmap} from '../content/roadmap';
import {resumeStageIfPaused,usePilot} from './progress';
import {stageProgress,stageStatusLabel} from './achievements';
import {BookCards,List,Missing,RefCards,ReferenceCard,StageNav,StageStatusControl,StageStatusNotice,TopicLink,TrackSelect,stageBase} from './Shared';
export function StagePage(){
 const {id='00'}=useParams();const s=getStage(id);const {pilot,change}=usePilot();const p=stageProgress(pilot,id);const meta=roadmap.find(s=>s.id===id);
 if(!meta)return <Missing/>;
 if(!s)return <><StageNav id={id}/><section className="pf-panel"><p className="pf-kicker">ETAPA {id} / EM PREPARAÇÃO</p><h1>{id==='03'?'Backend: PHP ou JS/TS':meta.title}</h1><p>{meta.description}</p><p>O currículo detalhado, fontes e projetos aguardam migração. Nenhum requisito futuro é contado como concluído.</p>{meta.completionCriterion&&<p>Objetivo planejado: {meta.completionCriterion}</p>}</section></>;
 const kicker=`ETAPA ${id} / ${p.done?'✓ CONCLUÍDA POR AUTOAVALIAÇÃO':p.paused?'PAUSADA':p.started?'EM ANDAMENTO':'ESTUDO E PRÁTICA'}`;
 return <><StageNav id={id}/>{id==='02'?(
  <header className="pf-hero pf-hero-net">
   <div className="pf-hero-net-top">
    <div>
     <p className="pf-kicker">{kicker}</p>
     <h1>{s.title}</h1>
     <p>{s.goal}</p>
     <div className="pf-tags" aria-label="Eixos técnicos da Etapa 02">
      <span>HTTP/1.1 · 2 · 3</span>
      <span>DNS · TCP · TLS</span>
      <span>CORS · Cache · Cookies</span>
      <span>cURL · Bruno · Postman</span>
      <span>Git · Branches · PRs</span>
     </div>
    </div>
    <div className="pf-actions">
     <StageStatusControl id={id}/>
     <Link className="pf-button" to={`${stageBase(id)}/topicos`}>Escolher tópico →</Link>
     <Link className="pf-button" to={`${stageBase(id)}/exercicios`}>Praticar</Link>
     <Link className="pf-button" to={`${stageBase(id)}/projeto`}>HTTP Diagnostic Lab →</Link>
    </div>
   </div>
   <div className="pf-net-flow" role="group" aria-label="Diagrama do percurso Cliente, Rede, Servidor e Git">
    <div className="pf-net-node">
     <span className="pf-net-step">01 · CLIENTE &amp; CLI</span>
     <strong>Navegador · cURL · Bruno</strong>
     <code>GET /livros?autor=machado HTTP/1.1</code>
     <small>Origin, Accept, If-None-Match</small>
    </div>
    <div className="pf-net-arrow" aria-hidden="true">⇄</div>
    <div className="pf-net-node">
     <span className="pf-net-step">02 · TRANSPORTE &amp; SEGURANÇA</span>
     <strong>DNS → TCP → TLS 1.3</strong>
     <code>Host → IP:443 · Handshake HTTPS</code>
     <small>Mesma origem, preflight OPTIONS</small>
    </div>
    <div className="pf-net-arrow" aria-hidden="true">⇄</div>
    <div className="pf-net-node">
     <span className="pf-net-step">03 · CONTRATO &amp; RESPOSTA</span>
     <strong>API HTTP / REST</strong>
     <code>200 OK · 304 · 422 · ETag · JSON</code>
     <small>Cache-Control, Set-Cookie, Location</small>
    </div>
    <div className="pf-net-arrow" aria-hidden="true">→</div>
    <div className="pf-net-node">
     <span className="pf-net-step">04 · VERSIONAMENTO</span>
     <strong>Git &amp; Pull Request</strong>
     <code>branch → commit → merge → PR</code>
     <small>Evidências e conflitos resolvidos</small>
    </div>
   </div>
   <div className="pf-net-bar" role="status">
    <div>
     <strong>Estado da etapa: {stageStatusLabel[p.status]}</strong>
     <span>{p.startedAt?` · Início: ${p.startedAt}`:''}{p.paused&&p.pausedAt?` · Pausada em: ${p.pausedAt}`:''} · {p.percent}% dos registros previstos ({p.units}/{p.total} unidades · {p.completedActivities}/{p.totalActivities} atividades concluídas)</span>
    </div>
    <progress aria-label={`Progresso da Etapa ${id}`} max={100} value={p.percent}/>
   </div>
  </header>
 ):(
  <header className="pf-hero">
   <div>
    <p className="pf-kicker">{kicker}</p>
    <h1>{s.title}</h1>
    <p>{s.goal}</p>
    <div className="pf-actions">
     <StageStatusControl id={id}/>
     <Link className="pf-button" to={`${stageBase(id)}/topicos`}>Escolher tópico →</Link>
     <Link className="pf-button" to={`${stageBase(id)}/exercicios`}>Praticar</Link>
    </div>
    <StageStatusNotice id={id}/>
   </div>
   <div className="pf-map-art">
    <span>{id==='00'?'PLANEJAR → REPRESENTAR':'HTML + CSS + TYPESCRIPT'}</span>
    <strong>{id==='00'?'Testar o raciocínio':'Navegador ↔ API'}</strong>
    <span>{p.percent}% dos registros previstos</span>
    <progress aria-label={`Progresso da Etapa ${id}`} max={100} value={p.percent}/>
    <span>{p.units}/{p.total} registros · autoavaliação</span>
   </div>
  </header>
 )}
 <div className="pf-cards"><section className="pf-card"><h2>Pré-requisitos</h2><List items={s.prerequisites}/>{id==='01'&&<p><Link to="/etapas/00">Retomar pensamento computacional →</Link></p>}{id==='02'&&<p><Link to="/etapas/01">Retomar fundamentos de frontend →</Link></p>}<p>Se já domina um objetivo, registre evidências próprias sem repetir leitura.</p></section><section className="pf-card"><h2>Competências e ordem recomendada</h2><ol>{s.topics.filter(t=>!t.optional).map(t=><li key={t.id}><TopicLink topic={t}/></li>)}</ol>{s.topics.some(t=>t.optional)?<p>Opcionais: {s.topics.filter(t=>t.optional).map(t=>t.name).join(', ')}.</p>:<p className="pf-meta">Todos os 9 tópicos desta etapa compõem a base obrigatória.</p>}</section></div>
 {id==='01'&&<section className="pf-panel"><h2>Uma base, duas escolhas backend</h2><TrackSelect/></section>}
 <section className="pf-panel"><h2>Critérios para concluir a etapa</h2><List items={id==='00'?['Registrar os 13 tópicos base estudados.','Concluir os quatro iniciais e ao menos dois intermediários por autoavaliação.','Concluir o projeto Biblioteca algorítmica e registrar a síntese das competências.']:id==='02'?['Registrar os 9 tópicos base estudados.','Concluir os três exercícios iniciais e os três intermediários por autoavaliação.','Concluir o projeto integrador HTTP Diagnostic Lab e registrar a síntese das competências.']:['Registrar os 11 tópicos base estudados; Tailwind/React/Next são opcionais.','Concluir os três iniciais e ao menos um intermediário integrado por autoavaliação.','Registrar síntese das competências com evidências de interface, API, testes e limites. O projeto principal é recomendado, não obrigação retroativa.']}/><p>Declarado: {p.topics}/{p.coreTopics} tópicos · {p.initial} iniciais · {p.intermediate} intermediários · projeto {p.project?'concluído por autoavaliação':'não concluído'}.</p><label className="pf-field">Síntese das competências — Etapa {id}<textarea rows={4} maxLength={50000} placeholder="Que competências demonstrei? Quais evidências/testes executei e o que ainda não conferi?" value={pilot.stageEvidence[id as StageId]} onChange={e=>change(p=>({...p,stageTracking:resumeStageIfPaused(p.stageTracking,id),stageEvidence:{...p.stageEvidence,[id]:e.target.value}}))}/></label><p className="pf-meta">Declaração sua. A etapa e as conquistas são recalculadas se você reabrir uma atividade ou desmarcar um registro; isso não é certificação.</p><div className="pf-actions"><Link className="pf-button primary" to={`${stageBase(id)}/projeto`}>Conhecer o projeto principal →</Link>{id==='02'&&<Link className="pf-button" to="/projetos">Ver os 3 projetos da etapa →</Link>}</div></section><section><h2>Livros relacionados</h2><BookCards stage={id}/></section></>;
}
export function TopicPage(){const {id,topic}=useParams();const {pilot,change}=usePilot();const s=getStage(id??'');if(!s)return <Missing/>;const selected=s.topics.find(t=>t.id===topic);if(topic&&!selected)return <Missing/>;
 return <><StageNav id={s.id}/><p className="pf-kicker">ETAPA {id} / TÓPICOS</p><h1>{selected?.name??'O que estudar'}</h1><p>Objetivos curtos para orientar o estudo nas fontes. Estudo registrado e prática demonstrada são coisas diferentes.</p><div className="pf-cards">{(selected?[selected]:s.topics).map(t=><article className="pf-card" key={t.id}><p className="pf-kicker">{String(s.topics.indexOf(t)+1).padStart(2,'0')} / {t.optional?'OPCIONAL':'BASE'}</p>{!selected&&<h2><TopicLink topic={t}/></h2>}<p>{t.goal}</p><h3>Pré-requisitos</h3><ul>{t.before.map(id=><li key={id}>{topics.find(t=>t.id===id)?<><TopicLink topic={topics.find(t=>t.id===id)!}/> — {topics.find(t=>t.id===id)!.goal}</>:id}</li>)}</ul><h3>Competências</h3><List items={t.competencies}/><h3>Quando considerar praticado</h3><List items={t.practiceCriteria}/><label className="pf-check"><input type="checkbox" checked={pilot.studied.includes(t.id)} onChange={e=>change(p=>({...p,stageTracking:resumeStageIfPaused(p.stageTracking,s.id),studied:e.target.checked?[...new Set([...p.studied,t.id])]:p.studied.filter(id=>id!==t.id)}))}/>Estudei este tópico {pilot.studied.includes(t.id)?'✓':''}</label><p className="pf-meta">Registro pessoal; não é teste técnico nem prova de domínio.</p><Link className="pf-button" to={`${stageBase(s.id)}/referencias?topico=${t.id}`}>Consultar referências ({t.refs.length})</Link><h3>Prática relacionada</h3>{t.exerciseIds.map(id=>{const a=activities.find(a=>a.id===id)!;return <p key={id}><Link to={`${stageBase(s.id)}/exercicios/${a.slug}`}>{a.title} →</Link></p>;})}</article>)}</div>{selected&&<><section><h2>Referências do tópico</h2><RefCards ids={selected.refs}/></section><section><h2>Livros relacionados</h2><BookCards topic={selected.id}/>{!selected.optional&&<p className="pf-meta">Comprar livros não é necessário; as fontes gratuitas permanecem disponíveis.</p>}</section></>}</>;
}
export function ReferencesPage(){const {id}=useParams();const location=useLocation();const [stage,setStage]=useState(id??'todos');const [topic,setTopic]=useState(new URLSearchParams(location.search).get('topico')??'todos');const [language,setLanguage]=useState('todos');const stageTopics=topics.filter(t=>stage==='todos'||t.stageId===stage);const selected=topics.find(t=>t.id===topic);const ids=selected?.refs??[...new Set(stageTopics.flatMap(t=>t.refs))];const visible=references.filter(r=>ids.includes(r.id)&&(language==='todos'||r.language===language));
 useEffect(()=>{if(location.hash)requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView());},[location.hash]);
 if(id&&!getStage(id))return <Missing/>;
 return <>{id&&<StageNav id={id}/>}<p className="pf-kicker">CURADORIA E BIBLIOTECA</p><h1>Livros e referências</h1><p>Português é priorizado quando adequado. Idioma real, recorte, versões e limites estão explícitos. Referências externas ensinam; o StackTrail orienta a escolha.</p><div className="pf-tools"><label className="pf-field">Etapa das referências<select value={stage} onChange={e=>{setStage(e.target.value);setTopic('todos');}}><option value="todos">Todas as publicadas</option><option value="00">00 — Pensamento computacional</option><option value="01">01 — Frontend</option><option value="02">02 — Web, HTTP, redes e Git</option></select></label><label className="pf-field">Tópico<select value={topic} onChange={e=>setTopic(e.target.value)}><option value="todos">Todos</option>{stageTopics.map(t=><option value={t.id} key={t.id}>{t.name}</option>)}</select></label><label className="pf-field">Idioma<select value={language} onChange={e=>setLanguage(e.target.value)}><option value="todos">Todos os idiomas</option><option>PT-BR</option><option>Inglês</option></select></label><button className="pf-button" onClick={()=>{setStage('todos');setTopic('todos');setLanguage('todos');}}>Limpar filtros</button></div><p role="status">{visible.length} referências encontradas.</p>{!visible.length&&<p>Nenhuma fonte deste recorte neste idioma. Tente todos os idiomas.</p>}<div className="pf-cards">{visible.map(r=><div key={r.id} id={'ref-'+r.id}><ReferenceCard r={r}/></div>)}</div><section><h2>Livros selecionados</h2><p>Seleção por currículo, adequação e evidências identificadas. Recomendações individuais não são consenso. Capas correspondentes às edições verificadas no catálogo da editora.</p><BookCards stage={stage==='todos'?undefined:stage} topic={selected?.id}/></section></>;
}
export const labels:Record<string,string>={inicial:'Iniciante',intermediario:'Intermediário',avancado:'Avançado',extra:'Desafio extra'};
export function ActivitiesPage({portfolio=false}:{portfolio?:boolean}){const {id}=useParams();const {pilot}=usePilot();const [stage,setStage]=useState(id??'todos');const [level,setLevel]=useState('todos');const [track,setTrack]=useState('todos');const shown=(portfolio?projects:activities).filter(a=>(stage==='todos'||a.stageId===stage)&&(level==='todos'||a.level===level));
 if(id&&!getStage(id))return <Missing/>;
 return <>{id&&<StageNav id={id}/>}<p className="pf-kicker">{portfolio?'PORTFÓLIO':'PRÁTICA'}</p><h1>{portfolio?'Projetos de portfólio':'Exercícios sem respostas prontas'}</h1><p>{portfolio?'Projetos pequenos e completos que podem evoluir entre etapas. Uma stack suficiente, sem repositório criado automaticamente.':'Desafios progressivos, dicas sob seu controle e evidências registradas localmente. Nenhum gabarito completo.'}</p><div className="pf-tools"><label className="pf-field">Etapa dos desafios<select value={stage} onChange={e=>setStage(e.target.value)}><option value="todos">Todas as publicadas</option><option value="00">00 — Pensamento computacional</option><option value="01">01 — Frontend</option><option value="02">02 — Web, HTTP, redes e Git</option></select></label><label className="pf-field">Dificuldade<select value={level} onChange={e=>setLevel(e.target.value)}><option value="todos">Todas</option>{Object.entries(labels).filter(([id])=>!portfolio||id!=='extra').map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label><label className="pf-field">Trilha dos exercícios<select value={track} onChange={e=>setTrack(e.target.value)}><option value="todos">Todas</option><option value="php">PHP + Laravel</option><option value="javascript">TS + Node.js + Express</option></select></label><button className="pf-button" onClick={()=>{setStage('todos');setLevel('todos');setTrack('todos');}}>Limpar filtros</button></div><p role="status">{shown.length} {portfolio?'projetos':'exercícios'}. Base comum às duas trilhas backend; a 00 não exige linguagem, a 01 usa HTML/CSS/TypeScript e a 02 foca HTTP, redes, terminal e Git.</p>{!shown.length&&<p>Nenhum desafio neste recorte. Limpe os filtros para ver os disponíveis.</p>}<div className="pf-cards">{shown.map(t=><article className="pf-card" key={t.id}><div className="pf-tags"><span>Etapa {t.stageId}</span><span>{labels[t.level]}</span><span>{t.optional?'Opcional':t.level==='inicial'?'Base':'Integrar competências'}</span></div><h2><Link to={portfolio?`/projetos/${t.slug}`:`${stageBase(t.stageId)}/exercicios/${t.slug}`}>{t.title} →</Link></h2><p>{t.objectives[0]}</p><p className="pf-meta">{pilot.attempts[t.id]?.status==='concluido'?'✓ Concluída (por autoavaliação)':pilot.attempts[t.id]?.status==='em-andamento'?'Em andamento':'Não iniciada'}</p></article>)}</div></>;
}
