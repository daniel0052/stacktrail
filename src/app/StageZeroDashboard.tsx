import { StageHero } from '../components/learning/StageHero';
import { ThinkingIllustration } from '../components/learning/ThinkingIllustration';
import { Link } from 'react-router-dom';
import { exercises } from '../content/stage-00/exercises';
import { lessons } from '../content/stage-00';
import { useProgress } from '../features/progress/ProgressProvider';
import { stageSummary } from '../features/progress/model';
export function StageZeroDashboard() {
  const { progress } = useProgress();
  const summary = stageSummary(progress, '00');
  return <><div className="page-heading"><div><p className="eyebrow">ETAPA 00 / FUNDAMENTO TRANSVERSAL</p><h1>Aprender a pensar antes de codificar<span className="accent">.</span></h1><p className="muted">Entenda, modele, teste e explique. Volte a este método durante toda a formação Júnior, Pleno e Sênior.</p></div><span className="release-tag">PREPARAÇÃO</span></div>
    <StageHero stageId="00" category="PENSAMENTO COMPUTACIONAL" title={<>Antes de codificar,<br/><span>aprenda a resolver.</span></>} description="Decomponha problemas, reconheça padrões e transforme ideias em passos verificáveis. Construa uma solução que você consegue testar e explicar." continueTo={progress.lastPath.startsWith('/etapas/00/') ? progress.lastPath : '/etapas/00/aulas/introducao'} continueLabel="Estudar Etapa 00" labTo="/etapas/00/laboratorio" illustration={<ThinkingIllustration/>}/>

    <div className="stats-grid"><div className="stat"><strong>{lessons.length} aulas · 8 módulos</strong></div><div className="stat"><strong>{exercises.length} desafios · {exercises.filter(e => e.optional).length} opcionais</strong></div><div className="stat progress-stat"><div><strong>{summary.percent}% <small>do percurso declarado</small></strong><span>{summary.read}/{lessons.filter(l => !l.optional).length} aulas · {summary.initial + summary.intermediate}/{exercises.filter(e => !e.optional).length} desafios da base</span></div><progress max="100" value={summary.percent} aria-label="Progresso da Etapa 00"/></div></div>
    <section aria-labelledby="zero-lessons"><div className="section-heading"><h2 id="zero-lessons">Do cotidiano ao algoritmo</h2><span className="muted">Siga a sequência ou revise um fundamento</span></div><div className="module-grid">{lessons.map((lesson, i) => <Link className="module-card" key={lesson.id} to={`/etapas/00/aulas/${lesson.id}`}><span className="eyebrow">AULA {String(i + 1).padStart(2, '0')} / {lesson.tag}</span><h3>{lesson.title}</h3><p>{lesson.description}</p><span className="status-tag">{progress.lessons.includes(`00:${lesson.id}`) ? 'Lida por autoavaliação' : lesson.optional ? 'Opcional' : 'Não iniciada'}</span></Link>)}</div></section>
    <section className="panel stage-completion-panel"><h2>Concluir com evidências</h2><p>Conclua os desafios de base, incluindo funções e matrizes. Explique as nove competências com evidências declaradas, incluindo fluxogramas e testes realmente executados. Leitura e checklists não comprovam correção técnica; os testes publicados verificam casos finitos; reflexões e competências continuam declaradas por você.</p><div className="hero-actions"><Link className="button secondary" to="/etapas/00/autoavaliacao">Revisar competências →</Link><Link className="text-link" to="/etapas/01">Consultar Etapa 01 →</Link></div><p className="small muted">As outras etapas podem ser consultadas independentemente do progresso. Os desafios avançados e a aula de recursão são aprofundamentos opcionais.</p></section>
  </>;
}
