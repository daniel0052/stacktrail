import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { stageContent, lessonPath, labPath, type StageId } from '../content/stages';
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

export function App() {
  const { progress, error, toggleTheme, setLastPath } = useProgress();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const main = useRef<HTMLElement>(null);
  const first = useRef(true);
  const stageId: StageId = location.pathname.startsWith('/etapas/00') ? '00' : '01';
  const { lessons, exercises, lessonKey, title, base } = stageContent(stageId);
  const summary = stageSummary(progress, stageId);
  const journey = journeySummary(progress);
  const studying = location.pathname.startsWith('/etapas/00') || location.pathname === '/etapas/01' || location.pathname.startsWith('/aulas') || location.pathname.startsWith('/laboratorio') || location.pathname === '/autoavaliacao';
  useEffect(() => {
    setOpen(false);
    if (validPath(location.pathname) && studying) setLastPath(location.pathname);
    if (!first.current) { main.current?.focus(); window.scrollTo(0, 0); }
    first.current = false;
    // Route changes restore reading focus; only the path triggers a navigation update.
  }, [location.pathname]);
  return <div className="app-shell">
    <a className="skip-link" href="#conteudo" onClick={e => { e.preventDefault(); main.current?.focus(); main.current?.scrollIntoView(); }}>Pular para o conteúdo</a>
    <aside className="sidebar">
      <Link to="/" className="brand"><span className="brand-mark" aria-hidden="true">s<span>_</span></span><span>StackTrail<span className="brand-small">BACKEND JOURNEY</span></span></Link>
      <nav className="sidebar-top" aria-label="Navegação principal"><span className="eyebrow">SEU ESPAÇO DE APRENDIZAGEM</span>{[{ to: '/', label: 'Visão geral', icon: '◫', end: true }, { to: '/etapas', label: 'Etapas', icon: '◇', end: false }, { to: `${base}/aulas`, label: 'Aulas', icon: '≡', end: false }, { to: labPath(stageId), label: 'Laboratório', icon: '⌘', end: false }, { to: `${base}/autoavaliacao`, label: 'Autoavaliação', icon: '✓', end: false }].map(item => <NavLink key={item.to} className="nav-top" to={item.to} end={item.end}><span aria-hidden="true">{item.icon}</span><span>{item.label}</span></NavLink>)}</nav>
      {studying && <><button className="mobile-index" aria-expanded={open} aria-controls="indice" onClick={() => setOpen(v => !v)}>Índice da etapa <span aria-hidden="true">{open ? '−' : '+'}</span></button>
      <nav id="indice" aria-label={`Índice da Etapa ${stageId}`} className={`stage-nav ${open ? 'is-open' : ''}`}>
        <div className="stage-label"><span className="stage-number">{stageId}</span><div><strong>{title}</strong><span>ETAPA ATUAL</span></div></div>
        <p className="eyebrow nav-label">AULAS</p>
        {lessons.map((lesson, i) => <NavLink className="lesson-nav" key={lesson.id} to={lessonPath(stageId, lesson.id)}><span aria-hidden="true" className={`nav-dot ${progress.lessons.includes(lessonKey(lesson.id)) ? 'done' : ''}`}>{progress.lessons.includes(lessonKey(lesson.id)) ? '✓' : String(i + 1).padStart(2, '0')}</span><span>{lesson.id === 'tailwind' ? 'Tailwind' : lesson.topic === 'Exploração opcional' ? lesson.tag : lesson.title.split(':')[0]}<small>{lesson.optional ? 'Opcional' : 'Obrigatório'}</small></span></NavLink>)}
        <p className="eyebrow nav-label">EXERCÍCIOS</p>
        {exercises.map((exercise, i) => <NavLink className="lesson-nav" key={exercise.id} to={labPath(stageId, exercise.slug)}><span className="nav-dot" aria-hidden="true">{progress.exercises[exercise.id]?.status === 'concluido' ? '✓' : String(i + 1).padStart(2, '0')}</span><span>{exercise.title}<small>{exercise.optional ? 'Opcional' : exercise.level === 'inicial' || stageId === '00' ? 'Obrigatório' : 'Integrado · escolha pelo menos 1'}</small></span></NavLink>)}
      </nav></>}
      {!studying && <div className="sidebar-journey"><p className="eyebrow">DA BASE À ENGENHARIA</p><p>Preparação<br/>Formação Júnior<br/>Formação Pleno<br/>Competências Sênior</p><Link className="text-link" to="/etapas/00">Etapa 00 disponível →</Link><br/><Link className="text-link" to="/etapas/01">Etapa 01 disponível →</Link></div>}
      <div className="stage-switch"><Link to="/etapas/00">00 · Pensamento computacional</Link><Link to="/etapas/01">01 · Frontend para Backend</Link></div>
      <div className="sidebar-bottom"><span>{studying ? `Base obrigatória da Etapa ${stageId}` : 'Progresso geral da jornada'}</span><strong>{studying ? summary.percent : journey.percent}%</strong><progress max="100" value={studying ? summary.percent : journey.percent} aria-label={studying ? 'Progresso na base obrigatória' : 'Progresso geral da jornada'}/><p>Um conceito. Uma tentativa.<br/>Um passo de cada vez.</p></div>
    </aside>
    <div className="workspace">
      <header className="topbar"><div><span className="muted">Trilha de desenvolvimento</span><span className="breadcrumb-separator">/</span><span>{studying ? `Etapa ${stageId}` : 'Sua jornada'}</span></div><div className="topbar-actions"><FontControls/><span className="local-badge"><span aria-hidden="true">●</span> Progresso local</span><button className="theme-button" onClick={toggleTheme} aria-label={`Ativar tema ${progress.theme === 'dark' ? 'claro' : 'escuro'}`}>{progress.theme === 'dark' ? '☼' : '☾'}</button></div></header>
      <main id="conteudo" tabIndex={-1} ref={main} className="main-content">
        {error && <div role="alert" className="storage-error">{error}</div>}
        <Routes><Route path="/etapas/00" element={<StageZeroDashboard/>}/><Route path="/etapas/00/aulas" element={<LessonIndex stageId="00"/>}/><Route path="/etapas/00/aulas/:slug" element={<LessonPage stageId="00"/>}/><Route path="/etapas/00/laboratorio" element={<LabIndex stageId="00"/>}/><Route path="/etapas/00/laboratorio/:slug" element={<LabPage stageId="00" key={location.pathname}/>}/><Route path="/etapas/00/autoavaliacao" element={<Assessment stageId="00"/>}/><Route path="/" element={<RoadmapPage/>}/><Route path="/etapas" element={<RoadmapPage list/>}/><Route path="/etapas/01" element={<Dashboard/>}/><Route path="/aulas" element={<LessonIndex/>}/><Route path="/aulas/:slug" element={<LessonPage/>}/><Route path="/laboratorio" element={<LabIndex/>}/><Route path="/laboratorio/:slug" element={<LabPage key={location.pathname}/>}/><Route path="/autoavaliacao" element={<Assessment/>}/><Route path="*" element={<div><h1>Página não encontrada</h1><p>Consulte o mapa da jornada para ver o material disponível.</p><Link to="/">Voltar à visão geral</Link></div>}/></Routes>
      </main>
      <footer className="app-footer"><span>StackTrail <span aria-hidden="true">·</span> Aprenda construindo.</span><span>Seu progresso fica neste navegador e dispositivo.</span></footer>
    </div>
  </div>;
}
