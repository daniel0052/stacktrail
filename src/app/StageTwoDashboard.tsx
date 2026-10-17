import { Link } from 'react-router-dom';
import { StageHero } from '../components/learning/StageHero';
import { lessons } from '../content/stage-02';
import { useProgress } from '../features/progress/ProgressProvider';
import { stageSummary } from '../features/progress/model';
export function StageTwoDashboard() {
  const { progress } = useProgress();
  const summary = stageSummary(progress,'02');
  return <><div className="page-heading"><div><p className="eyebrow">ETAPA 02 / WEB, HTTP, REDES, GIT E FERRAMENTAS</p><h1>Investigue a conversa da web.</h1><p className="muted">Do endereço ao servidor. Da hipótese à evidência. Sem depender de framework.</p></div></div>
    <StageHero stageId="02" category="COMUNICAÇÃO E DIAGNÓSTICO" title={<>Uma requisição.<br/><span>Muitas responsabilidades.</span></>} description="Explore mensagens, percorra a rede, desenhe contratos e pratique terminal e Git em simuladores locais." continueTo="/etapas/02/aulas/urls" labTo="/etapas/02/laboratorio" illustration={<div className="web-hero-visual" role="img" aria-label="Navegador, DNS, conexão TLS, aplicação e resposta"><span>NAVEGADOR</span><b>↓</b><span>DNS · CONEXÃO · TLS</span><b>↓</b><span>HTTP → APLICAÇÃO</span><b>↑</b><span>STATUS · HEADERS · CORPO</span></div>}/>
    <div className="stats-grid"><div className="stat"><strong>5 módulos · 12 aulas</strong></div><div className="stat"><strong>9 desafios · 3 opcionais</strong></div><div className="stat"><strong>{summary.percent}% do percurso declarado</strong></div></div>
    <div className="module-grid">{lessons.map(l=><Link className="module-card" key={l.id} to={`/etapas/02/aulas/${l.id}`}><span className="eyebrow">{l.topic}</span><h2>{l.title}</h2><p>{l.description}</p></Link>)}</div>
    <section className="panel stage-completion-panel"><h2>Simular, reproduzir e documentar</h2><p>Os simuladores não acessam sua rede, terminal ou GitHub. Registre evidências externas no laboratório e revise as seis competências. A rubrica original sugere ≥ 8/10, sem bloqueantes; a plataforma não atribui nota a ações externas.</p><Link className="button secondary" to="/etapas/02/autoavaliacao">Revisar competências →</Link></section></>;
}
