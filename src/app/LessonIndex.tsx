import { Link } from 'react-router-dom';
import { stageContent, lessonPath, type StageId } from '../content/stages';
import { useProgress } from '../features/progress/ProgressProvider';
export function LessonIndex({ stageId = '01' }: { stageId?: StageId }) {
  const { lessons, title, lessonKey } = stageContent(stageId);
  const { progress } = useProgress();
  return <><div className="page-heading"><div><p className="eyebrow">AULAS / ETAPA {stageId} SELECIONADA</p><h1>{title}<span className="accent">.</span></h1><p className="muted">Escolha uma aula, pratique e explique o que aprendeu.</p></div><Link className="button secondary" to="/etapas">Ver outras etapas →</Link></div><div className="exercise-grid">{lessons.map((lesson, i) => <Link key={lesson.id} className="module-card" to={lessonPath(stageId, lesson.id)}><div className="module-top"><span className="eyebrow">AULA {String(i + 1).padStart(2, '0')} / {lesson.tag}</span><span aria-hidden="true">↗</span></div><h2>{lesson.title}</h2><p>{lesson.description}</p><span className="status-tag">{lesson.optional ? 'Opcional' : 'Obrigatória'} · {progress.lessons.includes(lessonKey(lesson.id)) ? 'Lida por autoavaliação' : `${lesson.minutes} min`}</span></Link>)}</div></>;
}
