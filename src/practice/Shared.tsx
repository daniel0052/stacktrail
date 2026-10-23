import {useState} from 'react';
import {localCoverSource} from './book-cover-policy';
import {Link,useParams} from 'react-router-dom';
import {books,getStage,matchesTrack,references,topics,type Book,type StageId,type StudyTopic} from './curriculum';
import {roadmap} from '../content/roadmap';
import type {Reference} from './catalog';
import {updateStageStatus,usePilot,type Pilot} from './progress';
import {stageProgress,stageStatusLabel} from './achievements';
export const List=({items}:{items:string[]})=><ul>{items.map(x=><li key={x}>{x}</li>)}</ul>;
export const stageBase=(id:string)=>`/etapas/${id}`;

export function resolveInitialStage(
  routeId: string | undefined,
  queryStage: string | null | undefined,
  pilot: Pilot
): string {
  const validStage = (val: string | null | undefined) =>
    val && roadmap.some(s => s.id === val) ? val : undefined;
  const fromUrl = validStage(routeId) ?? validStage(queryStage);
  if (fromUrl) return fromUrl;
  const saved = validStage(pilot.catalogStage);
  if (saved) return saved;
  const inProgressStages = roadmap.filter(s => stageProgress(pilot, s.id).status === 'em-andamento');
  if (inProgressStages.length > 0) {
    const currentInProg = inProgressStages.find(s => s.id === pilot.currentStage);
    if (currentInProg) return currentInProg.id;
    return inProgressStages[0].id;
  }
  if (pilot.currentStage && validStage(pilot.currentStage)) {
    return pilot.currentStage;
  }
  return roadmap.find(s => s.available)?.id ?? '00';
}

export function StageSelect({
  value,
  onChange,
  label = 'Etapa selecionada',
}: {
  value: string;
  onChange: (stageId: string) => void;
  label?: string;
}) {
  return (
    <label className="pf-field">
      {label}
      <select value={value} onChange={e => onChange(e.target.value)}>
        {roadmap.map(s => {
          const stageData = getStage(s.id);
          return (
            <option key={s.id} value={s.id}>
              Etapa {s.id} — {stageData?.title ?? s.title}{!stageData ? ' (em preparação)' : ''}
            </option>
          );
        })}
      </select>
    </label>
  );
}
export function StageStatusControl({id}:{id:string}){
 const {pilot,change}=usePilot();const p=stageProgress(pilot,id);
 if(!p.available)return null;
 const setStatus=(status:'em-andamento'|'pausada')=>change(cur=>({...cur,stageTracking:{...cur.stageTracking,[id]:updateStageStatus(cur.stageTracking[id],status)}}));
 return <>
  {p.status==='nao-iniciada'&&<button className="pf-button primary" onClick={()=>setStatus('em-andamento')}>Iniciar etapa</button>}
  {p.status==='pausada'&&<button className="pf-button primary" onClick={()=>setStatus('em-andamento')}>Retomar etapa</button>}
  {p.status==='em-andamento'&&<button className="pf-button" onClick={()=>setStatus('pausada')}>Parar etapa</button>}
  {p.status==='concluida'&&<span className="pf-badge-done">✓ Etapa concluída</span>}
 </>;
}
export function StageStatusNotice({id}:{id:string}){
 const {pilot}=usePilot();const p=stageProgress(pilot,id);
 if(!p.available)return null;
 return <p className="pf-meta" role="status">Estado da etapa: {stageStatusLabel[p.status]}{p.startedAt?` · Início: ${p.startedAt}`:''}{p.paused&&p.pausedAt?` · Pausada em: ${p.pausedAt}`:''} · {p.completedActivities}/{p.totalActivities} atividades concluídas ({p.percent}% dos registros previstos).</p>;
}
export function StageTrackSwitch({stageId='03'}:{stageId?:string}){
 const {pilot,change}=usePilot();
 return <div className="pf-track-switch" role="group" aria-label={`Escolher trilha backend da Etapa ${stageId}`}>
  <button type="button" className={'pf-track-btn'+(pilot.track==='php'?' is-active':'')} aria-pressed={pilot.track==='php'} onClick={()=>change(p=>({...p,track:'php'}))}>
   <span className="pf-track-kicker">TRILHA A</span>
   <strong>PHP + Laravel</strong>
   <small>{stageId==='13'?'Profiling · PostgreSQL · Redis · Load Tests':stageId==='12'?'Redis · RabbitMQ · PostgreSQL · Workers':stageId==='11'?'Módulos · Casos de uso · PostgreSQL · Testes · ADRs':stageId==='10'?'React · TypeScript · API escolhida · Sessão · Testes':stageId==='09'?'API · PostgreSQL · Testes · Segurança · Entrega':stageId==='08'?'Docker · Compose · CI · PHP-FPM · KinD':stageId==='07'?'Authentication · Hash · Sessions · Policies · Sanctum SPA':stageId==='06'?'PHPUnit / Pest · Feature Tests · Fakes · Mocking · Pint':stageId==='05'?'PostgreSQL · migrations · Eloquent · DB::transaction':stageId==='04'?'Routes API · FormRequest · API Resources · HTTP Tests':'PHP 8.x · Composer · PSR-12 · Laravel 13'}</small>
  </button>
  <button type="button" className={'pf-track-btn'+(pilot.track==='javascript'?' is-active':'')} aria-pressed={pilot.track==='javascript'} onClick={()=>change(p=>({...p,track:'javascript'}))}>
   <span className="pf-track-kicker">TRILHA B</span>
   <strong>TypeScript + Node.js + Express</strong>
   <small>{stageId==='13'?'Profiling · PostgreSQL · Redis · Load Tests':stageId==='12'?'Redis · RabbitMQ · PostgreSQL · Workers':stageId==='11'?'Módulos · Casos de uso · PostgreSQL · Testes · ADRs':stageId==='10'?'React · TypeScript · API escolhida · Sessão · Testes':stageId==='09'?'API · PostgreSQL · Testes · Segurança · Entrega':stageId==='08'?'Docker · Compose · CI · tsc/Node · KinD':stageId==='07'?'Argon2id · express-session · regras por recurso · CSRF':stageId==='06'?'node:test / Vitest · Supertest · Mocks/Stubs · Node Debugger':stageId==='05'?'PostgreSQL · pg · Knex (query builder) · transações':stageId==='04'?'Express Router · Zod · Output DTOs · Problem Details':'TS strict · Node.js LTS · Express 5 · NestJS opcional'}</small>
  </button>
 </div>;
}
export function StageNav({id}:{id:string}){const n=Number(id);return <><nav className="pf-stage-pagination" aria-label="Percurso entre etapas"><Link to="/">← Roadmap</Link>{n>0&&<Link aria-label={`Etapa ${String(n-1).padStart(2,'0')} — Etapa anterior`} to={stageBase(String(n-1).padStart(2,'0'))}>← Etapa {String(n-1).padStart(2,'0')}</Link>}{n<19&&<Link aria-label={`Etapa ${String(n+1).padStart(2,'0')} — Próxima etapa`} to={stageBase(String(n+1).padStart(2,'0'))}>Etapa {String(n+1).padStart(2,'0')} →</Link>}</nav>{['00','01','02','03','04','05','06','07','08','09','10','11','12','13'].includes(id)&&<nav className="pf-stage-tabs" aria-label={`Seções da Etapa ${id}`}><Link to={stageBase(id)}>Visão geral</Link><Link to={`${stageBase(id)}/topicos`}>Tópicos</Link><Link to={`${stageBase(id)}/referencias`}>Referências</Link><Link to={`${stageBase(id)}/exercicios`}>Exercícios</Link><Link to={`${stageBase(id)}/projeto`}>Projeto principal</Link>{id==='09'&&<Link to="/etapas/09/prova-final">Prova final</Link>}</nav>}</>;}
export function ReferenceCard({r}:{r:Reference}){return <article className="pf-card pf-reference"><div className="pf-tags"><span>{r.language}</span><span>{r.cost}</span><span>{r.type}</span></div><h3><a href={r.url} target="_blank" rel="noreferrer">{r.title} ↗<span className="sr-only"> (nova aba)</span></a></h3><p>Recorte: {r.section}.</p><p className="muted">{r.version}</p>{r.note&&<p>{r.note}</p>}<p className="pf-meta">Acesso conferido: {r.checked} · adequação: {r.adequacy}. Consulta não garante disponibilidade futura nem todos os capítulos relacionados.</p></article>;}
export function RefCards({ids}:{ids:string[]}){return <div className="pf-cards">{ids.map(id=>{const r=references.find(r=>r.id===id);return r?<ReferenceCard key={id} r={r}/>:null;})}</div>;}
export function resolveAssetUrl(src: string): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  return `${cleanBase}${cleanSrc}`;
}

export function BookCover({b}:{b:Book}){const [failed,setFailed]=useState(false);const approved=b.cover.kind==='image'?localCoverSource(b.cover.src):undefined;const src=approved?resolveAssetUrl(approved):undefined;return !failed&&src?<div className="pf-book-cover"><img onError={()=>setFailed(true)} src={src} alt={b.cover.alt??`Capa: ${b.title}`} width={b.cover.width} height={b.cover.height} loading="lazy"/></div>:<div className="pf-book-placeholder" role="img" aria-label={`Capa indisponível: ${b.title}, ${b.author}`}><svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg><strong>{b.title}</strong><span>{b.author}</span></div>;}
export function BookCards({stage,topic,track,items}:{stage?:string;topic?:string;track?:'php'|'javascript'|'comum'|'todos';items?:typeof books}){const {pilot}=usePilot();const hasTracks=stage==='03'||stage==='04'||stage==='05'||stage==='06'||stage==='07'||stage==='08'||stage==='09'||stage==='10'||stage==='11'||stage==='12'||stage==='13';const effectiveTrack=track??(hasTracks?pilot.track:'todos');const visible=items??books.filter(b=>(!stage||b.stages.some(s=>s===stage))&&(!topic||b.topics.includes(topic))&&(!hasTracks||matchesTrack(b.track,effectiveTrack)));return <div className="pf-cards">{visible.map(b=><article className="pf-card pf-book" key={b.id}><BookCover b={b}/><h3>{b.title}</h3><p>{b.author}{b.edition&&!b.edition.includes('não confirmado')?` · ${b.edition}`:''} · {b.year}.</p><div className="pf-tags"><span>{b.language}</span><span>Livro opcional</span><span>{b.cost??'Pago'}</span><span>{b.level}</span>{b.track&&b.track!=='comum'&&<span>{b.track==='php'?'Trilha PHP + Laravel':b.track==='javascript'?'Trilha TS + Node + Express':'Ambas as trilhas'}</span>}</div><p>Etapas: {b.stages.join(', ')}. Assuntos: {b.topics.map(id=>topics.find(t=>t.id===id)?.name??id).join(', ')}.</p><p><strong>Recomendação:</strong> {b.reason}</p><p>{b.note}</p><p className="pf-meta">{b.community}</p>{b.communitySources?.map((url,i)=><p key={url}><a href={url} target="_blank" rel="noreferrer">Discussão individual {i+1} ↗<span className="sr-only"> (nova aba)</span></a></p>)}<details><summary>Fontes bibliográficas e capa</summary><p><a href={b.url} target="_blank" rel="noreferrer">Catálogo consultado ↗<span className="sr-only"> (nova aba)</span></a></p>{b.edition.includes('não confirmado')&&<p>Edição: {b.edition}.</p>}<p>{b.cover.origin} {b.cover.usage}</p>{b.cover.attributionUrl&&<p><a href={b.cover.attributionUrl} target="_blank" rel="noreferrer">Crédito original da fotografia ↗</a></p>}{b.cover.licenseUrl&&<p><a href={b.cover.licenseUrl} target="_blank" rel="noreferrer">Licença da fotografia da capa ↗</a></p>}<p>Consulta: {b.checked??'2026-10-17'}. Não houve leitura integral do livro.</p></details><p>Alternativas gratuitas: {b.alternatives.map((id,i)=><span key={id}>{i?' · ':''}<Link to={`/referencias?etapa=${stage??b.stages[0]}#ref-${id}`}>{references.find(r=>r.id===id)?.title??id}</Link></span>)}</p></article>)}</div>;}
export function TrackSelect(){const {pilot,change}=usePilot();return <label className="pf-field">Minha trilha backend<select value={pilot.track} onChange={e=>change(p=>({...p,track:e.target.value as typeof p.track}))}><option value="php">PHP + Laravel</option><option value="javascript">TypeScript + Node.js + Express</option></select><span className="pf-meta">Base 00/01/02 comum; nas Etapas 03–13 escolha uma trilha suficiente. NestJS é opcional na trilha TypeScript.</span></label>;}
export function Missing(){return <section className="pf-panel"><h1>Página não encontrada</h1><Link to="/">Voltar ao roadmap</Link></section>;}
export function TopicLink({topic}:{topic:StudyTopic}){return <Link to={`${stageBase(topic.stageId)}/topicos/${topic.id}`}>{topic.name}</Link>;}
export function useStageId():StageId|undefined{const {id}=useParams();return id==='00'||id==='01'||id==='02'||id==='03'||id==='04'||id==='05'||id==='06'||id==='07'||id==='08'||id==='09'||id==='10'||id==='11'||id==='12'||id==='13'?id:undefined;}

