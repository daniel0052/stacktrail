import { Link } from 'react-router-dom';
import { phases, roadmap, type RoadmapStage } from '../content/roadmap';
import { getStageStatus, journeySummary, stageStatusLabels } from '../features/progress/roadmap';
import { useProgress } from '../features/progress/ProgressProvider';

function StageCard({ stage, current }: { stage: RoadmapStage; current: boolean }) {
  const { progress } = useProgress();
  const status = getStageStatus(progress, stage.id);
  const phase = phases.find(p => p.id === stage.phase)!;
  return <article className={`roadmap-card ${current ? 'is-current' : ''} ${status === 'concluido' ? 'is-complete' : ''}`} aria-labelledby={`stage-${stage.id}`}>
    <div className="roadmap-card-top"><span className="eyebrow">ETAPA {stage.id} / {phase.title.toUpperCase()}</span>{current && <span className="badge">{stage.available ? 'Etapa atual' : 'Próxima etapa'}</span>}</div>
    <h3 id={`stage-${stage.id}`}>{stage.title}</h3><p>{stage.description}</p>
    <div className="roadmap-card-bottom"><span className={`status-tag ${status === 'concluido' ? 'status-done' : ''}`}>{stageStatusLabels[status]}</span><span className={stage.available ? 'available-tag' : 'muted'}>{stage.available ? 'Aulas disponíveis' : 'Em preparação'}</span></div>
    {stage.available && <div className="roadmap-card-actions"><Link className="button primary" to={`/etapas/${stage.id}`}>Acessar Etapa {stage.id} <span aria-hidden="true">→</span></Link></div>}
  </article>;
}
export function RoadmapPage({ list = false }: { list?: boolean }) {
  const { progress } = useProgress();
  const journey = journeySummary(progress);
  return <>
    <div className="page-heading"><div><p className="eyebrow">STACKTRAIL / SUA JORNADA DE FORMAÇÃO</p><h1>{list ? 'Todas as etapas' : 'Uma trilha. Novas possibilidades.'}<span className="accent">{list ? '.' : ''}</span></h1><p className="muted">Da resolução de problemas à engenharia de sistemas. Avance com prática, raciocínio e evidências.</p></div><span className="release-tag">ETAPAS 00–19</span></div>
    {!list && <section className="journey-intro" aria-labelledby="journey-title"><div><span className="eyebrow">FUNDAMENTOS → JÚNIOR → PLENO → SÊNIOR</span><h2 id="journey-title">Seu caminho em desenvolvimento backend.</h2><p>Aprenda a construir, projetar e operar. Cada etapa conecta conceitos a uma entrega que você consegue explicar.</p><div className="hero-actions"><Link className="button primary" to={progress.lastPath}>Continuar estudando ↗</Link><Link className="text-link" to="/etapas">Explorar todas as etapas →</Link></div></div><div className="journey-progress"><strong>{journey.percent}%</strong><span>da jornada declarada concluída</span><progress max="100" value={journey.percent} aria-label="Progresso geral da jornada"/><p>{journey.completed} de {journey.total} etapas concluídas por autoavaliação.</p><p>2 etapas com material disponível. As demais estão em preparação.</p></div></section>}
    <nav aria-label="Fases do roadmap" className="phase-shortcuts">{phases.map(p => <button key={p.id} onClick={() => { const section = document.getElementById(`phase-${p.id}`); section?.scrollIntoView({ block: 'start' }); section?.focus(); }}><span>{p.range}</span><strong>{p.title}</strong></button>)}</nav>
    <p className="source-note roadmap-attribution">Títulos e resumos conforme o plano de formação. Etapas futuras são referências curriculares, sem aulas prontas. Abrir uma página não marca conclusão.</p>
    <div className={list ? 'stage-list' : 'roadmap-road'}>{phases.map(phase => <section key={phase.id} id={`phase-${phase.id}`} tabIndex={-1} className="roadmap-phase" aria-labelledby={`phase-title-${phase.id}`}><header className="roadmap-phase-heading"><span className="eyebrow">{phase.range}</span><h2 id={`phase-title-${phase.id}`}>{phase.title}</h2><p>{phase.description}</p></header><ol className="roadmap-stages">{roadmap.filter(s => s.phase === phase.id).map(stage => { const status = getStageStatus(progress, stage.id); return <li className={`roadmap-stop ${stage.id === journey.currentId ? 'current-stop' : ''} ${status === 'concluido' ? 'complete-stop' : ''}`} key={stage.id}><svg className="road-connector" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M50 0 C50 25 20 25 20 50 S50 75 50 100"/></svg><span className="roadmap-pin" aria-hidden="true">{status === 'concluido' ? '✓' : stage.id}</span><StageCard stage={stage} current={stage.id === journey.currentId}/></li>; })}</ol></section>)}</div>
    <div className="callout"><strong>Progresso registra aprendizagem declarada.</strong><p>A Etapa 00 exige seis desafios obrigatórios e competências com evidências declaradas. A Etapa 01 só aparece concluída quando os três iniciais, pelo menos um intermediário e os critérios de autoavaliação estiverem atendidos. A avaliação técnica exige evidências. As fases representam competências de estudo, sem garantir senioridade profissional.</p></div>
  </>;
}
