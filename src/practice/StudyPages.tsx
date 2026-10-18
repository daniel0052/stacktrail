import {useEffect,useState} from 'react';
import {Link,useLocation,useNavigate,useParams} from 'react-router-dom';
import {activities,books,projects,topics,references,getStage,matchesTrack,type StageId} from './curriculum';
import {roadmap} from '../content/roadmap';
import {resumeStageIfPaused,usePilot} from './progress';
import {stageProgress,stageStatusLabel} from './achievements';
import {BookCards,List,Missing,RefCards,ReferenceCard,StageNav,StageSelect,StageStatusControl,StageStatusNotice,StageTrackSwitch,TopicLink,TrackSelect,resolveInitialStage,stageBase} from './Shared';

export function StagePage(){
 const {id='00'}=useParams();const {pilot,change}=usePilot();const hasTracks=id==='03'||id==='04';const s=getStage(id,hasTracks?pilot.track:undefined);const p=stageProgress(pilot,id);const meta=roadmap.find(s=>s.id===id);
 if(!meta)return <Missing/>;
 if(!s)return <><StageNav id={id}/><section className="pf-panel"><p className="pf-kicker">ETAPA {id} / EM PREPARAÇÃO</p><h1>{meta.title}</h1><p>{meta.description}</p><p>O currículo detalhado, fontes e projetos aguardam migração. Nenhum requisito futuro é contado como concluído.</p>{meta.completionCriterion&&<p>Objetivo planejado: {meta.completionCriterion}</p>}</section></>;
 const kicker=`ETAPA ${id} / ${p.done?'✓ CONCLUÍDA POR AUTOAVALIAÇÃO':p.paused?'PAUSADA':p.started?'EM ANDAMENTO':'ESTUDO E PRÁTICA'}`;
 const trackLabel=pilot.track==='php'?'PHP + Laravel':'TypeScript + Node.js + Express';
 return <><StageNav id={id}/>{id==='04'?(
  <header className="pf-hero pf-hero-rest">
   <div className="pf-hero-rest-top">
    <div>
     <p className="pf-kicker">{kicker} · TRILHA {pilot.track==='php'?'A (PHP + LARAVEL)':'B (TYPESCRIPT + NODE + EXPRESS)'}</p>
     <h1>{s.title}</h1>
     <p>{s.goal}</p>
     <StageTrackSwitch stageId="04"/>
    </div>
    <div className="pf-actions">
     <StageStatusControl id={id}/>
     <Link className="pf-button" to={`${stageBase(id)}/topicos`}>Tópicos da trilha →</Link>
     <Link className="pf-button" to={`${stageBase(id)}/exercicios`}>Exercícios REST</Link>
     <Link className="pf-button" to={`${stageBase(id)}/projeto`}>Booking API →</Link>
    </div>
   </div>
   <div className="pf-rest-matrix" role="group" aria-label={`Contrato REST e Regras de Negócio (${trackLabel})`}>
    <div className="pf-rest-endpoints">
     <span className="pf-net-step">CONTRATO DE RECURSOS · /API/V1</span>
     <ul className="pf-endpoint-list">
      <li><span className="pf-verb pf-verb-get">GET</span><code>/api/v1/rooms?page=1&amp;per_page=10</code><small>200 OK · {`{ data, meta }`}</small></li>
      <li><span className="pf-verb pf-verb-post">POST</span><code>/api/v1/bookings</code><small>201 Created + Location / 409 Conflict</small></li>
      <li><span className="pf-verb pf-verb-patch">PATCH</span><code>/api/v1/bookings/&#123;id&#125;</code><small>200 OK (parcial) / 422 Validation</small></li>
      <li><span className="pf-verb pf-verb-delete">DELETE</span><code>/api/v1/rooms/&#123;id&#125;</code><small>204 No Content (idempotente)</small></li>
     </ul>
    </div>
    <div className="pf-rest-pillars">
     <div className="pf-rest-pillar">
      <span className="pf-net-step">VALIDAÇÃO VS REGRA DE NEGÓCIO</span>
      <strong>422 Unprocessable vs 409 Conflict</strong>
      <p>{pilot.track==='php'?'FormRequest valida formato/tipos (422) e protege contra mass assignment; Service/Action valida colisão de agenda (409).':'Schemas Zod validam payload/query (422) sem mass assignment; Domain Service impede sobreposição de horários (409).'}</p>
     </div>
     <div className="pf-rest-pillar">
      <span className="pf-net-step">RFC 9457 · PROBLEM DETAILS &amp; OPENAPI 3.1</span>
      <strong>application/problem+json</strong>
      <code>type · title · status · detail · instance</code>
      <small>{pilot.track==='php'?'JsonResource na saída · Idempotency-Key · openapi.yaml':'Output DTOs seguros · Idempotency-Key · openapi.yaml'}</small>
     </div>
    </div>
   </div>
   <div className="pf-net-bar" role="status">
    <div>
     <strong>Estado da etapa ({trackLabel}): {stageStatusLabel[p.status]}</strong>
     <span>{p.startedAt?` · Início: ${p.startedAt}`:''}{p.paused&&p.pausedAt?` · Pausada em: ${p.pausedAt}`:''} · {p.percent}% dos registros previstos na trilha ({p.units}/{p.total} unidades · {p.completedActivities}/{p.totalActivities} atividades concluídas)</span>
    </div>
    <progress aria-label={`Progresso da Etapa ${id}`} max={100} value={p.percent}/>
   </div>
  </header>
 ):id==='03'?(
  <header className="pf-hero pf-hero-backend">
   <div className="pf-hero-backend-top">
    <div>
     <p className="pf-kicker">{kicker} · TRILHA {pilot.track==='php'?'A (PHP + LARAVEL)':'B (TYPESCRIPT + NODE + EXPRESS)'}</p>
     <h1>{s.title}</h1>
     <p>{s.goal}</p>
     <StageTrackSwitch stageId="03"/>
    </div>
    <div className="pf-actions">
     <StageStatusControl id={id}/>
     <Link className="pf-button" to={`${stageBase(id)}/topicos`}>Tópicos da trilha →</Link>
     <Link className="pf-button" to={`${stageBase(id)}/exercicios`}>Exercícios da trilha</Link>
     <Link className="pf-button" to={`${stageBase(id)}/projeto`}>Backend Foundations Lab →</Link>
    </div>
   </div>
   <div className="pf-backend-grid" role="group" aria-label={`Arquitetura de requisição e estrutura de diretórios da trilha ${trackLabel}`}>
    <div className="pf-backend-pipeline">
     <span className="pf-net-step">CICLO DE REQUISIÇÃO BACKEND · {trackLabel.toUpperCase()}</span>
     <div className="pf-pipeline-steps">
      <div className="pf-pipeline-item">
       <strong>1. Entrada HTTP</strong>
       <code>{pilot.track==='php'?'public/index.php':'src/server.ts → app.ts'}</code>
       <small>Método, URI, headers e JSON body</small>
      </div>
      <div className="pf-pipeline-item">
       <strong>2. Roteamento &amp; Middleware</strong>
       <code>{pilot.track==='php'?'routes/api.php + Middleware':'Router() + app.use(mw)'}</code>
       <small>Log, CORS, parsing e contexto</small>
      </div>
      <div className="pf-pipeline-item">
       <strong>3. Validação &amp; Regra</strong>
       <code>{pilot.track==='php'?'FormRequest → Controller → Service':'Schema/Validator → Controller → Service'}</code>
       <small>Regras de negócio e exceções de domínio</small>
      </div>
      <div className="pf-pipeline-item">
       <strong>4. Resposta &amp; Testes</strong>
       <code>{pilot.track==='php'?'JsonResponse (201/422) · PHPUnit':'res.status(201).json() · node:test'}</code>
       <small>Contrato consistente sem expor stack trace</small>
      </div>
     </div>
    </div>
    <div className="pf-arch-tree">
     <span className="pf-net-step">ESTRUTURA DE REFERÊNCIA ({pilot.track==='php'?'COMPOSER / LARAVEL':'PACKAGE.JSON / TS STRICT'})</span>
     <pre aria-label={`Estrutura de diretórios ${trackLabel}`}>{pilot.track==='php'?`app/
├── Http/Controllers/
├── Http/Requests/
└── Services/
routes/api.php
config/ & .env.example
tests/Feature/`:`src/
├── routes/
├── middlewares/
├── controllers/
└── services/
.env.example & tsconfig.json
tests/ (node:test / Vitest)`}</pre>
    </div>
   </div>
   <div className="pf-net-bar" role="status">
    <div>
     <strong>Estado da etapa ({trackLabel}): {stageStatusLabel[p.status]}</strong>
     <span>{p.startedAt?` · Início: ${p.startedAt}`:''}{p.paused&&p.pausedAt?` · Pausada em: ${p.pausedAt}`:''} · {p.percent}% dos registros previstos na trilha ({p.units}/{p.total} unidades · {p.completedActivities}/{p.totalActivities} atividades concluídas)</span>
    </div>
    <progress aria-label={`Progresso da Etapa ${id}`} max={100} value={p.percent}/>
   </div>
  </header>
 ):id==='02'?(
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
 <div className="pf-cards"><section className="pf-card"><h2>Pré-requisitos</h2><List items={s.prerequisites}/>{id==='01'&&<p><Link to="/etapas/00">Retomar pensamento computacional →</Link></p>}{id==='02'&&<p><Link to="/etapas/01">Retomar fundamentos de frontend →</Link></p>}{id==='03'&&<p><Link to="/etapas/02">Retomar HTTP, redes e Git →</Link></p>}{id==='04'&&<p><Link to="/etapas/03">Retomar fundamentos de backend →</Link></p>}<p>Se já domina um objetivo, registre evidências próprias sem repetir leitura.</p></section><section className="pf-card"><h2>Competências e ordem recomendada{hasTracks?` (${trackLabel})`:''}</h2><ol>{s.topics.filter(t=>!t.optional).map(t=><li key={t.id}><TopicLink topic={t}/></li>)}</ol>{s.topics.some(t=>t.optional)?<p>Opcionais: {s.topics.filter(t=>t.optional).map(t=>t.name).join(', ')}.</p>:<p className="pf-meta">Todos os {s.topics.length} tópicos desta seleção compõem a base obrigatória.</p>}</section></div>
 {id==='01'&&<section className="pf-panel"><h2>Uma base, duas escolhas backend</h2><TrackSelect/></section>}
 <section className="pf-panel"><h2>Critérios para concluir a etapa</h2><List items={id==='00'?['Registrar os 13 tópicos base estudados.','Concluir os quatro iniciais e ao menos dois intermediários por autoavaliação.','Concluir o projeto Biblioteca algorítmica e registrar a síntese das competências.']:id==='02'?['Registrar os 9 tópicos base estudados.','Concluir os três exercícios iniciais e os três intermediários por autoavaliação.','Concluir o projeto integrador HTTP Diagnostic Lab e registrar a síntese das competências.']:id==='03'?[`Registrar os 18 tópicos base da trilha ativa (${trackLabel}): 6 fundamentos comuns + 12 da stack escolhida.`,`Concluir os 3 exercícios iniciantes e os 3 intermediários da trilha ${trackLabel}, além dos 2 avançados obrigatórios (API funcional e ADR curta).`,'Concluir o projeto integrador Backend Foundations Lab na trilha escolhida e registrar a síntese das competências. Não é exigido concluir as duas trilhas nem o módulo opcional de NestJS.']:id==='04'?[`Registrar os 9 tópicos base da trilha ativa (${trackLabel}): 6 fundamentos comuns de REST/regras de negócio + 3 tópicos específicos da stack escolhida.`,`Concluir os 3 exercícios iniciantes, os 3 intermediários e os 2 avançados obrigatórios (Problem Details RFC 9457 e OpenAPI 3.1/revisão) na trilha ${trackLabel}.`,'Concluir o projeto principal Booking API: REST & Business Rules na trilha escolhida e registrar a síntese das competências.']:['Registrar os 11 tópicos base estudados; Tailwind/React/Next são opcionais.','Concluir os três iniciais e ao menos um intermediário integrado por autoavaliação.','Registrar síntese das competências com evidências de interface, API, testes e limites. O projeto principal é recomendado, não obrigação retroativa.']}/><p>Declarado: {p.topics}/{p.coreTopics} tópicos · {p.initial} iniciais · {p.intermediate} intermediários{hasTracks?` · ${p.advanced} avançados`:''} · projeto {p.project?'concluído por autoavaliação':'não concluído'}.</p><label className="pf-field">Síntese das competências — Etapa {id}<textarea rows={4} maxLength={50000} placeholder="Que competências demonstrei? Quais evidências/testes executei e o que ainda não conferi?" value={pilot.stageEvidence[id as StageId]} onChange={e=>change(p=>({...p,stageTracking:resumeStageIfPaused(p.stageTracking,id),stageEvidence:{...p.stageEvidence,[id]:e.target.value}}))}/></label><p className="pf-meta">Declaração sua. A etapa e as conquistas são recalculadas se você reabrir uma atividade ou desmarcar um registro; isso não é certificação.</p><div className="pf-actions"><Link className="pf-button primary" to={`${stageBase(id)}/projeto`}>Conhecer o projeto principal →</Link>{(id==='02'||id==='03'||id==='04')&&<Link className="pf-button" to={`/projetos?etapa=${id}`}>Ver os 3 projetos da etapa →</Link>}</div></section><section><h2>Livros relacionados</h2><BookCards stage={id}/></section></>;
}

export function TopicPage(){const {id,topic}=useParams();const {pilot,change}=usePilot();const hasTracks=id==='03'||id==='04';const fullStage=getStage(id??'');const s=getStage(id??'',hasTracks?pilot.track:undefined);if(!fullStage||!s)return <Missing/>;const selected=fullStage.topics.find(t=>t.id===topic);if(topic&&!selected)return <Missing/>;
 return <><StageNav id={s.id}/><p className="pf-kicker">ETAPA {id} / TÓPICOS</p><h1>{selected?.name??'O que estudar'}</h1><p>Objetivos curtos para orientar o estudo nas fontes. Estudo registrado e prática demonstrada são coisas diferentes.</p>{hasTracks&&!selected&&<div className="pf-panel"><StageTrackSwitch stageId={s.id}/><p className="pf-meta">Exibindo os 6 tópicos comuns e os tópicos da trilha selecionada ({pilot.track==='php'?'PHP + Laravel':'TypeScript + Node.js + Express'}). Trocar de trilha preserva seu progresso anterior.</p></div>}<div className="pf-cards">{(selected?[selected]:s.topics).map(t=>{const idx=s.topics.indexOf(t);const num=idx>=0?idx+1:fullStage.topics.indexOf(t)+1;const relatedExercises=t.exerciseIds.map(eid=>activities.find(a=>a.id===eid)).filter((a):a is NonNullable<typeof a>=>!!a&&(!hasTracks||matchesTrack(a.track,pilot.track)));return <article className="pf-card" key={t.id}><p className="pf-kicker">{String(num).padStart(2,'0')} / {t.optional?'OPCIONAL':'BASE'}{t.track&&t.track!=='comum'?` · ${t.track==='php'?'PHP + LARAVEL':'TS + NODE + EXPRESS'}`:t.track==='comum'?' · COMUM':''}</p>{!selected&&<h2><TopicLink topic={t}/></h2>}<p>{t.goal}</p><h3>Pré-requisitos</h3><ul>{t.before.map(bid=><li key={bid}>{topics.find(x=>x.id===bid)?<><TopicLink topic={topics.find(x=>x.id===bid)!}/> — {topics.find(x=>x.id===bid)!.goal}</>:bid}</li>)}</ul><h3>Competências</h3><List items={t.competencies}/><h3>Quando considerar praticado</h3><List items={t.practiceCriteria}/><label className="pf-check"><input type="checkbox" checked={pilot.studied.includes(t.id)} onChange={e=>change(p=>({...p,stageTracking:resumeStageIfPaused(p.stageTracking,s.id),studied:e.target.checked?[...new Set([...p.studied,t.id])]:p.studied.filter(x=>x!==t.id)}))}/>Estudei este tópico {pilot.studied.includes(t.id)?'✓':''}</label><p className="pf-meta">Registro pessoal; não é teste técnico nem prova de domínio.</p><Link className="pf-button" to={`${stageBase(s.id)}/referencias?topico=${t.id}`}>Consultar referências ({t.refs.length})</Link><h3>Prática relacionada</h3>{relatedExercises.map(a=><p key={a.id}><Link to={`${stageBase(s.id)}/exercicios/${a.slug}`}>{a.title} →</Link></p>)}</article>;})}</div>{selected&&<><section><h2>Referências do tópico</h2><RefCards ids={selected.refs}/></section><section><h2>Livros relacionados</h2><BookCards topic={selected.id}/>{!selected.optional&&<p className="pf-meta">Comprar livros não é necessário; as fontes gratuitas permanecem disponíveis.</p>}</section></>}</>;
}

const isPortuguese=(lang:string)=>{const l=lang.toLowerCase();return l.includes('pt')||l.includes('portugu');};
const normalizeLanguage=(lang:string)=>isPortuguese(lang)?'Português brasileiro':lang==='Inglês'?'Inglês':lang;
const classifyRefCategory=(type:string)=>{
 const t=type.toLowerCase();
 if(t.includes('norma')||t.includes('especifica')||t.includes('rfc'))return 'Especificações e RFCs';
 if(t.includes('documenta')||t.includes('referência'))return 'Documentações';
 if(t.includes('atividade')||t.includes('curso'))return 'Cursos e atividades';
 return 'Artigos e guias';
};

export function ReferencesPage(){
 const {id}=useParams();
 const {pilot,change}=usePilot();
 const location=useLocation();
 const searchParams=new URLSearchParams(location.search);
 const queryStage=searchParams.get('etapa');
 const [stage,setStage]=useState<string>(()=>resolveInitialStage(id,queryStage,pilot));
 const [materialType,setMaterialType]=useState<string>('todos');
 const [topic,setTopic]=useState<string>(searchParams.get('topico')??'todos');
 const [language,setLanguage]=useState<string>('todos');
 const [accessFilter,setAccessFilter]=useState<string>('todos');
 const [searchQuery,setSearchQuery]=useState<string>('');
 const hasTracks=stage==='03'||stage==='04';
 const [trackFilter,setTrackFilter]=useState<'todos'|'comum'|'php'|'javascript'>(hasTracks?pilot.track:'todos');

 useEffect(()=>{
  if(pilot.catalogStage!==stage){
   change(p=>({...p,catalogStage:stage}));
  }
 },[stage,pilot.catalogStage]);

 useEffect(()=>{
  if(id==='03'||id==='04')setTrackFilter(pilot.track);
 },[id,pilot.track]);

 useEffect(()=>{
  if(location.hash)requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView());
 },[location.hash]);

 if(id&&!getStage(id))return <Missing/>;

 const stageMeta=roadmap.find(s=>s.id===stage);
 const stageData=getStage(stage);
 const stageTopics=topics.filter(t=>t.stageId===stage&&(!hasTracks||matchesTrack(t.track,trackFilter)));
 const selectedTopic=stageTopics.find(t=>t.id===topic);
 const stageRefIds=selectedTopic?selectedTopic.refs:[...new Set(stageTopics.flatMap(t=>t.refs))];
 const stageRefsAll=references.filter(r=>stageRefIds.includes(r.id));
 const stageBooksAll=books.filter(b=>b.stages.some(s=>s===stage)&&(!selectedTopic||b.topics.includes(selectedTopic.id))&&(!hasTracks||matchesTrack(b.track,trackFilter)));

 const q=searchQuery.trim().toLowerCase();
 const matchesSearchRef=(r:typeof references[number])=>{
  if(!q)return true;
  const relTopics=stageTopics.filter(t=>t.refs.includes(r.id)).map(t=>t.name).join(' ');
  const hay=`${r.title} ${r.section} ${r.type} ${r.note??''} ${relTopics}`.toLowerCase();
  return hay.includes(q);
 };
 const matchesSearchBook=(b:typeof books[number])=>{
  if(!q)return true;
  const relTopics=b.topics.map(tid=>topics.find(t=>t.id===tid)?.name??tid).join(' ');
  const hay=`${b.title} ${b.author} ${b.reason} ${b.note} ${relTopics}`.toLowerCase();
  return hay.includes(q);
 };
 const matchesLang=(itemLang:string)=>language==='todos'||normalizeLanguage(itemLang)===language;
 const matchesAccessRef=(cost:string)=>{
  if(accessFilter==='todos')return true;
  const c=(cost??'').toLowerCase();
  if(accessFilter==='Gratuito')return c.includes('gratuito');
  if(accessFilter==='Pago')return c.includes('pago')||c.includes('comercial');
  return !c.includes('gratuito')&&!c.includes('pago')&&!c.includes('comercial');
 };
 const matchesAccessBook=()=>{
  if(accessFilter==='todos')return true;
  return accessFilter==='Pago';
 };
 const showRefs=materialType==='todos'||materialType!=='Livros';
 const showBooks=materialType==='todos'||materialType==='Livros';

 const visibleRefs=showRefs?stageRefsAll.filter(r=>{
  if(materialType!=='todos'&&classifyRefCategory(r.type)!==materialType&&r.type!==materialType)return false;
  return matchesLang(r.language)&&matchesAccessRef(r.cost)&&matchesSearchRef(r);
 }):[];

 const visibleBooks=showBooks?stageBooksAll.filter(b=>matchesLang(b.language)&&matchesAccessBook()&&matchesSearchBook(b)):[];
 const totalCount=visibleRefs.length+visibleBooks.length;

 const activeFilters:string[]=[];
 if(materialType!=='todos')activeFilters.push(`Tipo: ${materialType}`);
 if(hasTracks&&trackFilter!=='todos')activeFilters.push(`Trilha: ${trackFilter==='comum'?'Fundamentos comuns':trackFilter==='php'?'PHP/Laravel':'TypeScript/Node.js/Express'}`);
 if(topic!=='todos'&&selectedTopic)activeFilters.push(`Tópico: ${selectedTopic.name}`);
 if(language!=='todos')activeFilters.push(`Idioma: ${language}`);
 if(accessFilter!=='todos')activeFilters.push(`Acesso: ${accessFilter}`);
 if(q)activeFilters.push(`Busca: "${searchQuery.trim()}"`);

 const clearComplementaryFilters=()=>{
  setMaterialType('todos');
  setTopic('todos');
  setLanguage('todos');
  setAccessFilter('todos');
  setSearchQuery('');
  if(hasTracks)setTrackFilter('todos');
 };

 return <>
  {id&&<StageNav id={id}/>}
  <p className="pf-kicker">CURADORIA E BIBLIOTECA POR ETAPA</p>
  <h1>Livros e referências</h1>
  <p>Consulte os livros opcionais e as referências técnicas verificadas da etapa selecionada. Português é priorizado quando adequado; idioma real, recorte, acesso e limites estão explícitos.</p>
  {(id==='03'||id==='04')&&<div className="pf-panel"><StageTrackSwitch stageId={id}/></div>}
  <div className="pf-tools" role="region" aria-label="Filtros de livros e referências">
   <StageSelect value={stage} onChange={nextStage=>{setStage(nextStage);setTopic('todos');if(nextStage==='03'||nextStage==='04')setTrackFilter(pilot.track);else setTrackFilter('todos');if(pilot.catalogStage!==nextStage)change(p=>({...p,catalogStage:nextStage}));}}/>
   <label className="pf-field">Tipo de material
    <select value={materialType} onChange={e=>setMaterialType(e.target.value)}>
     <option value="todos">Todos os tipos</option>
     <option value="Livros">Livros</option>
     <option value="Documentações">Documentações</option>
     <option value="Artigos e guias">Artigos e guias</option>
     <option value="Especificações e RFCs">Especificações e RFCs</option>
     <option value="Cursos e atividades">Cursos e atividades</option>
    </select>
   </label>
   {hasTracks&&<label className="pf-field">Trilha
    <select value={trackFilter} onChange={e=>{setTrackFilter(e.target.value as 'todos'|'comum'|'php'|'javascript');setTopic('todos');}}>
     <option value="todos">Todas da etapa</option>
     <option value="comum">Fundamentos comuns</option>
     <option value="php">PHP/Laravel</option>
     <option value="javascript">TypeScript/Node.js/Express</option>
    </select>
   </label>}
   <label className="pf-field">Tópico
    <select value={topic} onChange={e=>setTopic(e.target.value)}>
     <option value="todos">Todos os tópicos da etapa</option>
     {stageTopics.map(t=><option value={t.id} key={t.id}>{t.name}</option>)}
    </select>
   </label>
   <label className="pf-field">Idioma
    <select value={language} onChange={e=>setLanguage(e.target.value)}>
     <option value="todos">Todos os idiomas</option>
     <option value="Português brasileiro">Português brasileiro</option>
     <option value="Inglês">Inglês</option>
    </select>
   </label>
   <label className="pf-field">Acesso
    <select value={accessFilter} onChange={e=>setAccessFilter(e.target.value)}>
     <option value="todos">Todos os acessos</option>
     <option value="Gratuito">Gratuito</option>
     <option value="Pago">Pago (livros opcionais)</option>
     <option value="Não informado">Não informado</option>
    </select>
   </label>
   <label className="pf-field">Buscar na etapa
    <input type="search" placeholder="Título, autor, fonte, RFC ou assunto..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}/>
   </label>
   <button type="button" className="pf-button" onClick={clearComplementaryFilters}>Limpar filtros</button>
  </div>
  <div className="pf-filter-summary" role="status">
   <p><strong>Etapa {stage} — {stageData?.title??stageMeta?.title}:</strong> {totalCount} {totalCount===1?'material encontrado':'materiais encontrados'} ({visibleRefs.length} {visibleRefs.length===1?'referência':'referências'} e {visibleBooks.length} {visibleBooks.length===1?'livro':'livros'}).</p>
   {activeFilters.length>0&&<div className="pf-tags" aria-label="Filtros complementares ativos">{activeFilters.map(f=><span key={f}>{f}</span>)}</div>}
  </div>
  {!stageData?(
   <section className="pf-panel">
    <h2>Etapa {stage} em preparação</h2>
    <p>Os livros e referências verificadas da Etapa {stage} ({stageMeta?.title}) serão publicados na migração desta etapa. Selecione uma das etapas já publicadas (00 a 04) para explorar o catálogo.</p>
   </section>
  ):totalCount===0?(
   <section className="pf-panel">
    <p>Nenhum material encontrado na Etapa {stage} com os filtros atuais. Limpe os filtros complementares para visualizar todos os livros e referências da etapa.</p>
   </section>
  ):(
   <>
    {showRefs&&<section>
     <h2>Referências técnicas da Etapa {stage} ({visibleRefs.length})</h2>
     {visibleRefs.length===0?<p className="pf-meta">Nenhuma referência técnica corresponde aos filtros selecionados.</p>:<div className="pf-cards">{visibleRefs.map(r=><div key={r.id} id={'ref-'+r.id}><ReferenceCard r={r}/></div>)}</div>}
    </section>}
    {showBooks&&<section>
     <h2>Livros recomendados na Etapa {stage} ({visibleBooks.length})</h2>
     <p>Leitura 100% opcional: todo tópico possui alternativas gratuitas. Capas correspondentes às edições verificadas no catálogo da editora.</p>
     {visibleBooks.length===0?<p className="pf-meta">Nenhum livro corresponde aos filtros selecionados nesta etapa.</p>:<BookCards stage={stage} items={visibleBooks}/>}
    </section>}
   </>
  )}
 </>;
}

export const labels:Record<string,string>={inicial:'Iniciante',intermediario:'Intermediário',avancado:'Avançado',extra:'Desafio extra'};
export function ActivitiesPage({portfolio=false}:{portfolio?:boolean}){
 const {id}=useParams();
 const location=useLocation();
 const navigate=useNavigate();
 const {pilot,change}=usePilot();
 const searchParams=new URLSearchParams(location.search);
 const queryStage=searchParams.get('etapa');
 const [stage,setStage]=useState<string>(()=>resolveInitialStage(id,queryStage,pilot));
 const [level,setLevel]=useState<string>('todos');
 const [statusFilter,setStatusFilter]=useState<'todos'|'nao-iniciada'|'em-andamento'|'concluido'>('todos');
 const hasTracks=stage==='03'||stage==='04';
 const [track,setTrack]=useState<'todos'|'php'|'javascript'>(hasTracks?pilot.track:'todos');
 const [searchQuery,setSearchQuery]=useState<string>('');
 const [visibleCount,setVisibleCount]=useState<number>(12);

 useEffect(()=>{
  if(pilot.catalogStage!==stage&&roadmap.some(s=>s.id===stage)){
   change(p=>({...p,catalogStage:stage}));
  }
 },[stage,pilot.catalogStage]);

 useEffect(()=>{
  if(hasTracks){
   setTrack(pilot.track);
  }
 },[hasTracks,pilot.track]);

 useEffect(()=>{
  const currentNavStage=id??new URLSearchParams(location.search).get('etapa');
  if(currentNavStage&&roadmap.some(s=>s.id===currentNavStage)&&currentNavStage!==stage){
   setStage(currentNavStage);
   if(currentNavStage==='03'||currentNavStage==='04'){
    setTrack(pilot.track);
   }else{
    setTrack('todos');
   }
   setVisibleCount(12);
  }
 },[id,location.search]);

 if(id&&!getStage(id))return <Missing/>;

 const stageData=getStage(stage);
 const stageMeta=roadmap.find(s=>s.id===stage);
 const rawActivities=portfolio?projects:activities;
 const stageActivities=rawActivities.filter(a=>a.stageId===stage);

 const q=searchQuery.trim().toLowerCase();
 const shown=stageActivities.filter(a=>{
  if(level!=='todos'&&a.level!==level)return false;
  if(statusFilter!=='todos'){
   const status=pilot.attempts[a.id]?.status??'novo';
   if(statusFilter==='nao-iniciada'&&status!=='novo')return false;
   if(statusFilter==='em-andamento'&&status!=='em-andamento')return false;
   if(statusFilter==='concluido'&&status!=='concluido')return false;
  }
  if(hasTracks&&!matchesTrack(a.track,track))return false;
  if(q){
   const relTopics=a.topicIds.map(tid=>topics.find(t=>t.id===tid)?.name??tid).join(' ');
   const hay=`${a.title} ${a.statement} ${a.context??''} ${a.problem??''} ${a.objectives.join(' ')} ${a.competencies.join(' ')} ${relTopics}`.toLowerCase();
   if(!hay.includes(q))return false;
  }
  return true;
 });

 const handleStageChange=(nextStage:string)=>{
  setStage(nextStage);
  if(nextStage==='03'||nextStage==='04'){
   setTrack(pilot.track);
  }else{
   setTrack('todos');
  }
  setVisibleCount(12);
  if(pilot.catalogStage!==nextStage){
   change(p=>({...p,catalogStage:nextStage}));
  }
  const basePath=portfolio?'/projetos':'/exercicios';
  navigate(`${basePath}?etapa=${nextStage}`,{replace:true});
 };

 const clearSecondaryFilters=()=>{
  setLevel('todos');
  setStatusFilter('todos');
  if(hasTracks)setTrack('todos');
  setSearchQuery('');
  setVisibleCount(12);
 };

 const activeFilters:string[]=[];
 if(level!=='todos')activeFilters.push(`Dificuldade: ${labels[level]??level}`);
 if(statusFilter!=='todos'){
  const statusLabels:Record<string,string>={
   'nao-iniciada':'Não iniciados',
   'em-andamento':'Em andamento',
   'concluido':'Concluídos'
  };
  activeFilters.push(`Status: ${statusLabels[statusFilter]??statusFilter}`);
 }
 if(hasTracks&&track!=='todos'){
  activeFilters.push(`Trilha: ${track==='php'?'PHP/Laravel':'TypeScript/Node.js/Express'}`);
 }
 if(q){
  activeFilters.push(`Busca: "${searchQuery.trim()}"`);
 }

 return (
  <>
   {id&&<StageNav id={id}/>}
   <p className="pf-kicker">{portfolio?'PORTFÓLIO':'PRÁTICA'}</p>
   <h1>{portfolio?'Projetos de portfólio':'Exercícios sem respostas prontas'}</h1>
   <p>{portfolio?'Projetos pequenos e completos que podem evoluir entre etapas. Uma stack suficiente, sem repositório criado automaticamente.':'Desafios progressivos, dicas sob seu controle e evidências registradas localmente. Nenhum gabarito completo.'}</p>

   {hasTracks&&stageData&&(
    <div className="pf-panel">
     <StageTrackSwitch stageId={stage}/>
    </div>
   )}

   <div className="pf-tools" role="region" aria-label={`Filtros de ${portfolio?'projetos':'exercícios'}`}>
    <StageSelect value={stage} onChange={handleStageChange}/>

    <label className="pf-field">
     Dificuldade
     <select value={level} onChange={e=>{setLevel(e.target.value);setVisibleCount(12);}}>
      <option value="todos">Todas</option>
      <option value="inicial">Iniciante</option>
      <option value="intermediario">Intermediário</option>
      <option value="avancado">Avançado</option>
      {!portfolio&&<option value="extra">Desafio extra</option>}
     </select>
    </label>

    <label className="pf-field">
     Status
     <select value={statusFilter} onChange={e=>{setStatusFilter(e.target.value as 'todos'|'nao-iniciada'|'em-andamento'|'concluido');setVisibleCount(12);}}>
      <option value="todos">Todos</option>
      <option value="nao-iniciada">Não iniciados</option>
      <option value="em-andamento">Em andamento</option>
      <option value="concluido">Concluídos</option>
     </select>
    </label>

    {hasTracks&&(
     <label className="pf-field">
      {portfolio?'Trilha dos projetos':'Trilha dos exercícios'}
      <select value={track} onChange={e=>{
       const next=e.target.value as 'todos'|'php'|'javascript';
       setTrack(next);
       setVisibleCount(12);
       if(next==='php'||next==='javascript'){
        change(p=>({...p,track:next}));
       }
      }}>
       <option value="todos">Todas</option>
       <option value="php">PHP/Laravel</option>
       <option value="javascript">TypeScript/Node.js/Express</option>
      </select>
     </label>
    )}

    <label className="pf-field">
     Buscar na etapa
     <input
      type="search"
      placeholder="Título, assunto ou competência..."
      value={searchQuery}
      onChange={e=>{setSearchQuery(e.target.value);setVisibleCount(12);}}
     />
    </label>

    <button type="button" className="pf-button" onClick={clearSecondaryFilters}>Limpar filtros</button>
   </div>

   <div className="pf-filter-summary" role="status">
    <p>
     <strong>Etapa {stage} — {stageData?.title??stageMeta?.title}:</strong>{' '}
     {!stageData?(
      'Em preparação (aguardando migração).'
     ):shown.length===0?(
      portfolio?'Nenhum projeto encontrado com esses filtros.':'Nenhum exercício encontrado com esses filtros.'
     ):(
      `${shown.length} ${portfolio?(shown.length===1?'projeto encontrado':'projetos encontrados'):(shown.length===1?'exercício encontrado':'exercícios encontrados')}.`
     )}
    </p>
    {activeFilters.length>0&&(
     <div className="pf-tags" aria-label="Filtros complementares ativos">
      {activeFilters.map(f=><span key={f}>{f}</span>)}
     </div>
    )}
   </div>

   {!stageData?(
    <section className="pf-panel">
     <h2>Etapa {stage} em preparação</h2>
     <p>Os {portfolio?'projetos':'exercícios'} da Etapa {stage} ({stageMeta?.title}) serão publicados na migração desta etapa. Selecione uma das etapas já publicadas (00 a 04) para praticar.</p>
    </section>
   ):shown.length===0?(
    <section className="pf-panel">
     <p>{portfolio?'Nenhum projeto encontrado com esses filtros.':'Nenhum exercício encontrado com esses filtros.'}</p>
     <button type="button" className="pf-button" onClick={clearSecondaryFilters}>Limpar filtros</button>
    </section>
   ):(
    <>
     <div className="pf-cards">
      {shown.slice(0,visibleCount).map(t=>(
       <article className="pf-card" key={t.id}>
        <div className="pf-tags">
         <span>Etapa {t.stageId}</span>
         <span>{labels[t.level]??t.level}</span>
         <span>{t.optional?'Opcional':t.level==='inicial'?'Base':'Integrar competências'}</span>
         {t.track&&(
          <span>{t.track==='php'?'PHP + Laravel':t.track==='javascript'?'TS + Node + Express':'Ambas as trilhas'}</span>
         )}
        </div>
        <h2>
         <Link to={portfolio?`/projetos/${t.slug}`:`${stageBase(t.stageId)}/exercicios/${t.slug}`}>
          {t.title} →
         </Link>
        </h2>
        <p>{t.objectives[0]}</p>
        <p className="pf-meta">
         {pilot.attempts[t.id]?.status==='concluido'
          ?'✓ Concluída (por autoavaliação)'
          :pilot.attempts[t.id]?.status==='em-andamento'
          ?'Em andamento'
          :'Não iniciada'}
        </p>
       </article>
      ))}
     </div>
     {shown.length>visibleCount&&(
      <div className="pf-actions" style={{justifyContent:'center',marginTop:'1.5rem'}}>
       <button
        type="button"
        className="pf-button"
        onClick={()=>setVisibleCount(c=>c+12)}
       >
        Carregar mais {portfolio?'projetos':'exercícios'} ({shown.length-visibleCount} restantes)
       </button>
      </div>
     )}
    </>
   )}
  </>
 );
}
