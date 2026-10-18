import {visibleLessons04,contextTrack04} from '../content/stage-04/curriculum';
import {TrackSelector} from '../components/backend/TrackSelector';
import {visibleLessons,contextTrack,lessonArea,trackTitles} from '../content/stage-03/curriculum';
import { lazy, Suspense, type ComponentType, type ComponentProps } from 'react';
import { Link, useParams } from 'react-router-dom';
import { stageContent, lessonPath, labPath, type StageId } from '../content/stages';
import { useProgress } from '../features/progress/ProgressProvider';
import { LessonPracticeScope } from '../components/learning/LessonPracticeScope';
import { LessonTable } from '../components/learning/LessonTable';
import { CodeBlock } from '../components/learning/CodeBlock';

function LessonListItem({children,className,...props}: ComponentProps<'li'>) {
  return <li {...props} className={className}>{className?.includes('task-list-item') ? <label>{children}</label> : children}</li>;
}

const files = import.meta.glob<{ default: ComponentType<{ components: { pre: typeof CodeBlock; li: typeof LessonListItem; table: typeof LessonTable } }> }>('../content/stage-*/lessons/*.mdx');
const contents = Object.fromEntries((['00', '01', '02', '03', '04'] as const).flatMap(stage => stageContent(stage).lessons.map(l => [stageContent(stage).lessonKey(l.id), lazy(files[`../content/stage-${stage}/lessons/${l.id}.mdx`])])));
export function LessonPage({ stageId = '01' }: { stageId?: StageId }) {
  const { lessons, lessonKey } = stageContent(stageId);
  const { slug } = useParams();
  const lesson = lessons.find(l => l.id === slug);
  const { progress, setLesson } = useProgress();
  if (!lesson) return <><h1>Aula não encontrada</h1><Link to="/">Voltar</Link></>;
  const Content = contents[lessonKey(lesson.id)];
  const sequence=stageId==='04'?visibleLessons04(contextTrack04(lesson.id,progress.backendTrack03)):stageId==='03'?visibleLessons(contextTrack(lesson.id,progress.backendTrack03)):lessons;
  const index = sequence.findIndex(l => l.id === lesson.id);
  const next = sequence[index + 1];
  return <>
    <Link className="back-link" to={`/etapas/${stageId}`}>← Visão geral da etapa</Link>
    <header className="lesson-heading"><p className="eyebrow">ETAPA {stageId} / {lesson.topic.toUpperCase()}</p><h1>{lesson.title}</h1><p>{lesson.description}</p><div className="lesson-meta">{stageId==='04'&&<span className="badge">{contextTrack04(lesson.id,progress.backendTrack03)===progress.backendTrack03?'Conteúdo comum ou da trilha selecionada':'Consulta da outra trilha · preferência preservada'} · {trackTitles[contextTrack04(lesson.id,progress.backendTrack03)]}</span>}{stageId==='03'&&<span className="badge">{lessonArea(lesson.id)==='common'?'Fundamento comum':lessonArea(lesson.id)==='extra'?'Adicional NestJS':trackTitles[contextTrack(lesson.id,progress.backendTrack03)]}</span>}{lesson.optional && <span className="badge">Opcional · não bloqueia avanço</span>}<span>Leitura estimada: {lesson.minutes} min</span>{progress.lessons.includes(lessonKey(lesson.id)) && <span className="accent">✓ Lida por autoavaliação</span>}</div></header>
    {(stageId==='03'||stageId==='04')&&<TrackSelector stageId={stageId}/>}<div className="lesson-layout"><article className="lesson-content"><div className="attribution"><strong>Explicação didática elaborada</strong><p>Objetivos, tópicos e miniatividades seguem o <Link to={`/etapas/${stageId}`}>plano de estudos desta etapa</Link>. Texto e exemplos são próprios. Complementos consultados têm indicação e fonte.</p></div><Suspense key={lessonKey(lesson.id)} fallback={<p role="status">Carregando aula…</p>}><LessonPracticeScope lessonId={lessonKey(lesson.id)}><Content components={{ pre: CodeBlock, li: LessonListItem, table: LessonTable }}/></LessonPracticeScope></Suspense><div className="lesson-completion"><label className="checkbox-row"><input type="checkbox" checked={progress.lessons.includes(lessonKey(lesson.id))} onChange={e => setLesson(lessonKey(lesson.id), e.target.checked)}/><span>Marcar esta aula como lida e revisada</span></label><p>Marcar leitura registra sua autoavaliação; pratique para demonstrar domínio.</p>{next ? <Link className="button primary" to={lessonPath(stageId, next.id)}>Próxima aula: {next.tag} →</Link> : <Link className="button primary" to={labPath(stageId)}>Praticar no laboratório →</Link>}</div></article><aside className="reading-aside"><span className="eyebrow">LEIA COM UMA PERGUNTA</span><h2>{stageId === '00' ? 'Que regra este passo preserva?' : 'Como isso aparece numa API?'}</h2><p>Reproduza o exemplo fora da plataforma. Mude uma entrada, observe o resultado e explique o que mudou.</p><Link className="button secondary" to={labPath(stageId)}>Praticar este fundamento →</Link><hr/><p>{stageId === '00' ? 'As demonstrações executam apenas blocos predefinidos. Código colado continua sendo texto.' : 'Exemplos são material de estudo. O MVP não executa código do aluno.'}</p></aside></div>
  </>;
}
