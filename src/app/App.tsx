import {StageFourDashboard,StageFourAssessment} from './StageFour';
import {visibleLessons04,visibleExercise04,contextTrack04} from '../content/stage-04/curriculum';
import {visibleLessons,contextTrack,visibleExercise} from '../content/stage-03/curriculum';
import {StageThreeDashboard,StageThreeAssessment} from './StageThree';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { stageContent, lessonPath, labPath, type StageId } from '../content/stages';
import { StageTwoAssessment } from './StageTwoAssessment';
import { StageTwoDashboard } from './StageTwoDashboard';
import { StageZeroDashboard } from './StageZeroDashboard';
import { useProgress } from '../features/progress/ProgressProvider';
import { stageSummary, validPath } from '../features/progress/model';
import { Dashboard } from './Dashboard';
import { LessonPage } from './LessonPage';
import { LabIndex, LabPage } from '../components/lab/Lab';
import { Assessment } from './Assessment';
import { RoadmapPage } from './RoadmapPage';
import { LessonIndex } from './LessonIndex';
import { FontControls } from '../components/learning/FontControls';
import { journeySummary } from '../features/progress/roadmap';

const isContentPage = (path: string) => /^\/(?:etapas\/(?:00|02|03|04)\/)?(?:aulas|laboratorio)\/[^/]+\/?$/.test(path);

export function App() {
  const { progress, error, toggleTheme, setLastPath } = useProgress();
  const location = useLocation();
  const [open, setOpen] = useState(() => !isContentPage(location.pathname));
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(location.pathname);
  const stageId: StageId = location.pathname.startsWith('/etapas/04')?'04': location.pathname.startsWith('/etapas/03') ? '03' : location.pathname.startsWith('/etapas/02') ? '02' : location.pathname.startsWith('/etapas/00') ? '00' : '01';
  const { lessons, exercises, lessonKey, title, base } = stageContent(stageId);
  const summary = stageSummary(progress, stageId);
  const journey = journeySummary(progress);
  const studying = location.pathname.startsWith('/etapas/04') || location.pathname.startsWith('/etapas/03') || location.pathname.startsWith('/etapas/02') || location.pathname.startsWith('/etapas/00') || location.pathname === '/etapas/01' || location.pathname.startsWith('/aulas') || location.pathname.startsWith('/laboratorio') || location.pathname === '/autoavaliacao';
  useEffect(() => {
    setOpen(!isContentPage(location.pathname));
    if (validPath(location.pathname) && studying) setLastPath(location.pathname);
    if (previousPath.current !== location.pathname) { main.current?.focus(); window.scrollTo(0, 0); }
    previousPath.current = location.pathname;
    // Route changes restore reading focus; only the path triggers a navigation update.
  }, [location.pathname]);
  return <div className={`app-shell ${open ? 'navigation-open' : 'navigation-collapsed'}`}>
    <a className="skip-link" href="#conteudo" onClick={e => { e.preventDefault(); main.current?.focus(); main.current?.scrollIntoView(); }}>Pular para o conteúdo</a>
    <aside className="sidebar" aria-label="Menu lateral"><button type="button" className="navigation-toggle" aria-expanded={open} aria-controls="sidebar-content" aria-label={open ? 'Recolher menu' : 'Expandir menu'} title={open ? 'Recolher menu' : 'Expandir menu'} onClick={() => setOpen(v => !v)}><span aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg></span>{open && <span>Menu</span>}</button>{!open && <nav className="navigation-rail" aria-label="Atalhos de navegação">{[{ to: '/', label: 'Visão geral', icon: '◫', end: true }, { to: '/etapas', label: 'Etapas', icon: '◇', end: false }, { to: `${base}/aulas`, label: 'Aulas', icon: '≡', end: false }, { to: labPath(stageId), label: 'Laboratório', icon: '⌘', end: false }, { to: `${base}/autoavaliacao`, label: 'Autoavaliação', icon: '✓', end: false }].map(item => <NavLink key={item.to} to={item.to} end={item.end} aria-label={item.label} title={item.label}><span aria-hidden="true">{item.icon}</span></NavLink>)}</nav>}<div id="sidebar-content" className="sidebar-content" aria-hidden={!open} inert={!open}><div className="sidebar-content-inner">
      <Link to="/" className="brand"><span className="brand-mark" aria-hidden="true">s<span>_</span></span><span>StackTrail<span className="brand-small">BACKEND JOURNEY</span></span></Link>
      <nav className="sidebar-top" aria-label="Navegação principal"><span className="eyebrow">SEU ESPAÇO DE APRENDIZAGEM</span>{[{ to: '/', label: 'Visão geral', icon: '◫', end: true }, { to: '/etapas', label: 'Etapas', icon: '◇', end: false }, { to: `${base}/aulas`, label: 'Aulas', icon: '≡', end: false }, { to: labPath(stageId), label: 'Laboratório', icon: '⌘', end: false }, { to: `${base}/autoavaliacao`, label: 'Autoavaliação', icon: '✓', end: false }].map(item => <NavLink key={item.to} className="nav-top" to={item.to} end={item.end}><span aria-hidden="true">{item.icon}</span><span>{item.label}</span></NavLink>)}</nav>
      {studying && <>
      <nav id="indice" aria-label={`Índice da Etapa ${stageId}`} className={`stage-nav ${open ? 'is-open' : ''}`}>
        <div className="stage-label"><span className="stage-number">{stageId}</span><div><strong>{title}</strong><span>ETAPA ATUAL</span></div></div>
        <p className="eyebrow nav-label">AULAS</p>
        {(stageId==='04'?visibleLessons04(contextTrack04(location.pathname.split('/').at(-1)??'',progress.backendTrack03)):stageId==='03'?visibleLessons(contextTrack(location.pathname.split('/').at(-1)??'',progress.backendTrack03)):lessons).map((lesson, i) => <NavLink className="lesson-nav" key={lesson.id} to={lessonPath(stageId, lesson.id)}><span aria-hidden="true" className={`nav-dot ${progress.lessons.includes(lessonKey(lesson.id)) ? 'done' : ''}`}>{progress.lessons.includes(lessonKey(lesson.id)) ? '✓' : String(i + 1).padStart(2, '0')}</span><span>{lesson.id === 'tailwind' ? 'Tailwind' : lesson.topic === 'Exploração opcional' ? lesson.tag : lesson.title.split(':')[0]}{lesson.optional && <small>Opcional</small>}</span></NavLink>)}
        <p className="eyebrow nav-label">EXERCÍCIOS</p>
        {exercises.filter(exercise=>stageId==='04'?visibleExercise04(exercise.id,progress.backendTrack03):stageId!=='03'||visibleExercise(exercise.id,progress.backendTrack03)).map((exercise) => <NavLink className="lesson-nav" key={exercise.id} to={labPath(stageId, exercise.slug)}><span className="nav-dot" aria-hidden="true">{progress.exercises[exercise.id]?.status === 'concluido' ? '✓' : String(exercises.findIndex(e=>e.id===exercise.id) + 1).padStart(2, '0')}</span><span>{exercise.title}{stageId==='04'?<small>{'requirement'in exercise?String(exercise.requirement):exercise.optional?'Opcional':'Obrigatório'}</small>:exercise.optional&&<small>Opcional</small>}</span></NavLink>)}
      </nav></>}
      {!studying && <div className="sidebar-journey"><p className="eyebrow">DA BASE À ENGENHARIA</p><p>Preparação<br/>Formação Júnior<br/>Formação Pleno<br/>Competências Sênior</p><Link className="text-link" to="/etapas/00">Etapa 00 disponível →</Link><br/><Link className="text-link" to="/etapas/01">Etapa 01 disponível →</Link></div>}
      <div className="stage-switch"><Link to="/etapas/04">04 · APIs REST e regras</Link><Link to="/etapas/03">03 · Duas trilhas backend</Link><Link to="/etapas/02">02 · Web, HTTP, redes e Git</Link><Link to="/etapas/00">00 · Pensamento computacional</Link><Link to="/etapas/01">01 · Frontend para Backend</Link></div>
      <div className="sidebar-bottom"><span>{studying ? `Progresso da Etapa ${stageId}` : 'Progresso geral da jornada'}</span><strong>{studying ? summary.percent : journey.percent}%</strong><progress max="100" value={studying ? summary.percent : journey.percent} aria-label={studying ? 'Progresso da etapa' : 'Progresso geral da jornada'}/><p>Um conceito. Uma tentativa.<br/>Um passo de cada vez.</p></div>
    </div></div></aside>
    <div className="workspace">
      <header className="topbar"><div><span className="muted">Trilha de desenvolvimento</span><span className="breadcrumb-separator">/</span><span>{studying ? `Etapa ${stageId}` : 'Sua jornada'}</span></div><div className="topbar-actions"><FontControls/><span className="local-badge"><span aria-hidden="true">●</span> Progresso local</span><button className="theme-button" onClick={toggleTheme} aria-label={`Ativar tema ${progress.theme === 'dark' ? 'claro' : 'escuro'}`}>{progress.theme === 'dark' ? '☼' : '☾'}</button></div></header>
      <main id="conteudo" tabIndex={-1} ref={main} className="main-content">
        {error && <div role="alert" className="storage-error">{error}</div>}
        <Routes><Route path="/etapas/04" element={<StageFourDashboard/>}/><Route path="/etapas/04/aulas" element={<LessonIndex stageId="04"/>}/><Route path="/etapas/04/aulas/:slug" element={<LessonPage stageId="04"/>}/><Route path="/etapas/04/laboratorio" element={<LabIndex key="04" stageId="04"/>}/><Route path="/etapas/04/laboratorio/:slug" element={<LabPage stageId="04" key={location.pathname}/>}/><Route path="/etapas/04/autoavaliacao" element={<StageFourAssessment/>}/><Route path="/etapas/03" element={<StageThreeDashboard/>}/><Route path="/etapas/03/aulas" element={<LessonIndex stageId="03"/>}/><Route path="/etapas/03/aulas/:slug" element={<LessonPage stageId="03"/>}/><Route path="/etapas/03/laboratorio" element={<LabIndex key="03" stageId="03"/>}/><Route path="/etapas/03/laboratorio/:slug" element={<LabPage stageId="03" key={location.pathname}/>}/><Route path="/etapas/03/autoavaliacao" element={<StageThreeAssessment/>}/><Route path="/etapas/02" element={<StageTwoDashboard/>}/><Route path="/etapas/02/aulas" element={<LessonIndex stageId="02"/>}/><Route path="/etapas/02/aulas/:slug" element={<LessonPage stageId="02"/>}/><Route path="/etapas/02/laboratorio" element={<LabIndex key="02" stageId="02"/>}/><Route path="/etapas/02/laboratorio/:slug" element={<LabPage stageId="02" key={location.pathname}/>}/><Route path="/etapas/02/autoavaliacao" element={<StageTwoAssessment/>}/><Route path="/etapas/00" element={<StageZeroDashboard/>}/><Route path="/etapas/00/aulas" element={<LessonIndex stageId="00"/>}/><Route path="/etapas/00/aulas/:slug" element={<LessonPage stageId="00"/>}/><Route path="/etapas/00/laboratorio" element={<LabIndex key="00" stageId="00"/>}/><Route path="/etapas/00/laboratorio/:slug" element={<LabPage stageId="00" key={location.pathname}/>}/><Route path="/etapas/00/autoavaliacao" element={<Assessment stageId="00"/>}/><Route path="/" element={<RoadmapPage/>}/><Route path="/etapas" element={<RoadmapPage list/>}/><Route path="/etapas/01" element={<Dashboard/>}/><Route path="/aulas" element={<LessonIndex/>}/><Route path="/aulas/:slug" element={<LessonPage/>}/><Route path="/laboratorio" element={<LabIndex key="01"/>}/><Route path="/laboratorio/:slug" element={<LabPage key={location.pathname}/>}/><Route path="/autoavaliacao" element={<Assessment/>}/><Route path="*" element={<div><h1>Página não encontrada</h1><p>Consulte o mapa da jornada para ver o material disponível.</p><Link to="/">Voltar à visão geral</Link></div>}/></Routes>
      </main>
      <footer className="app-footer"><span>StackTrail <span aria-hidden="true">·</span> Aprenda construindo.</span><span>Seu progresso fica neste navegador e dispositivo.</span></footer>
    </div>
  </div>;
}
