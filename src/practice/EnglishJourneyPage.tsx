import { useState, useEffect, useId, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  englishLevels,
  englishMilestones,
  englishExercises,
  levelDiagnosticEvaluations,
  initialPlacementQuestions,
  calculateSuggestedPlacement,
  careerMilestones,
  officialExamsInfo,
  englishAchievements,
  englishReviewItems,
  englishReferences,
  englishBooks,
  type EnglishExercise,
} from './english-journey';
import {
  usePilot,
  updateEnglishExercise,
  setEnglishExerciseStatus,
  undoEnglishExerciseCompletion,
  updateEnglishPlacement,
  updateEnglishEvaluationDraft,
  toggleEnglishSpacedReviewItem,
  toggleEnglishMilestone,
  toggleEnglishCareerMilestone,
  addEnglishEvaluation,
  updateEnglishBookStatus,
  recordEnglishStudySession,
  toggleEnglishExerciseReview,
  type EnglishLevelId,
  type EnglishSkill,
  type EnglishExerciseAttempt,
} from './progress';
import { BookCover } from './Shared';

type EnglishView =
  | 'trilha'
  | 'exercicios'
  | 'avaliacao'
  | 'diagnostico'
  | 'carreira'
  | 'revisao'
  | 'biblioteca'
  | 'exames'
  | 'conquistas';

const viewLabels: Record<EnglishView, string> = {
  trilha: 'Visão do nível', exercicios: 'Exercícios práticos', avaliacao: 'Avaliação diagnóstica',
  diagnostico: 'Nivelamento inicial', carreira: 'Carreira internacional', revisao: 'Revisão espaçada',
  biblioteca: 'Biblioteca e recursos', exames: 'Exames oficiais', conquistas: 'Conquistas e progresso',
};

const skillLabels: Record<EnglishSkill, { label: string; icon: string }> = {
  listening: { label: 'Listening (Escuta)', icon: '🎧' },
  speaking: { label: 'Speaking (Conversação)', icon: '🎙️' },
  reading: { label: 'Reading (Leitura)', icon: '📖' },
  writing: { label: 'Writing (Escrita)', icon: '✍️' },
  'vocabulary-grammar': { label: 'Vocabulary & Grammar', icon: '🔍' },
};

function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const hasDragged = useRef(false);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDown.current) {
        isDown.current = false;
        setIsDragging(false);
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current || e.button !== 0) return;
    isDown.current = true;
    hasDragged.current = false;
    startX.current = e.pageX;
    scrollLeft.current = ref.current.scrollLeft;
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !ref.current) return;
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 5) {
      hasDragged.current = true;
    }
    ref.current.scrollLeft = scrollLeft.current - dx;
  };

  const onMouseUp = () => {
    isDown.current = false;
    setIsDragging(false);
  };

  const onMouseLeave = () => {
    isDown.current = false;
    setIsDragging(false);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation();
      e.preventDefault();
      hasDragged.current = false;
    }
  };

  return {
    ref,
    props: {
      ref,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onClickCapture,
    },
    isDragging,
  };
}

export function EnglishJourneyPage() {
  const { pilot, change } = usePilot();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabsScroll = useDragScroll<HTMLElement>();
  const trackScroll = useDragScroll<HTMLDivElement>();

  // Navigation params
  const queryView = searchParams.get('view') as EnglishView | null;
  const activeView: EnglishView = queryView && Object.hasOwn(viewLabels, queryView) ? queryView : 'trilha';
  const queryLevel = searchParams.get('nivel') as EnglishLevelId | null;
  const targetExerciseParam = searchParams.get('exercicio');

  const contentRef = useRef<HTMLDivElement>(null);
  const pendingTarget = useRef<string | null>(null);
  const pendingView = useRef<EnglishView | null>(null);
  const [navigationRequest, setNavigationRequest] = useState(0);
  const [feedback, setFeedback] = useState('');
  const requestReveal = (selector?: string) => {
    pendingTarget.current = selector ?? null;
    setNavigationRequest(n => n + 1);
  };

  const engProgress = pilot.english ?? {
    selectedLevel: 'A1',
    studyingLevel: 'A1',
    completedMilestones: [],
    exercises: {},
    evaluations: {},
    evaluationDrafts: {},
    initialPlacement: {
      status: 'nao-iniciado',
      currentQuestionIndex: 0,
      answers: {},
    },
    reviewedItemIds: [],
    books: {},
    studyDays: [],
    xp: 0,
    unlockedAchievements: [],
    careerMilestonesDone: [],
  };

  const selectedLevelId: EnglishLevelId =
    queryLevel && ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(queryLevel)
      ? queryLevel
      : engProgress.selectedLevel || 'A1';

  const [skillFilter, setSkillFilter] = useState<'todos' | EnglishSkill>('todos');
  // A direct exercise destination takes precedence over a filter from an earlier visit.
  const visibleSkillFilter = targetExerciseParam && englishExercises.some(e => e.id === targetExerciseParam && e.level === selectedLevelId)
    ? 'todos' : skillFilter;
  const targetExerciseId = targetExerciseParam;
  const [reviewModeFilter, setReviewModeFilter] = useState<'todos' | 'pendentes' | 'concluidos'>('todos');
  const [revealedReviewId, setRevealedReviewId] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copyFailureId, setCopyFailureId] = useState<string | null>(null);
  const [bookFilter, setBookFilter] = useState<'todos' | 'pretendo-ler' | 'lendo' | 'concluido'>('todos');

  // Accessible IDs for ARIA attributes
  const selectLevelId = useId();
  const skillFilterId = useId();
  const bookStatusFilterId = useId();

  useEffect(() => {
    document.title = 'StackTrail — English Journey (Inglês A1–C2)';
    change(p => ({
      ...p,
      english: recordEnglishStudySession(p.english),
    }));
  }, []);

  // Reveal committed content once, including direct links and browser Back/Forward.
  useEffect(() => {
    if (!queryView && !targetExerciseParam && navigationRequest === 0) return;
    const frame = requestAnimationFrame(() => {
      // Router transitions may commit after local feedback/progress updates.
      if (pendingView.current && pendingView.current !== activeView) return;
      const content = contentRef.current;
      const exercise = activeView === 'exercicios' && targetExerciseParam
        ? document.getElementById(`ex-${targetExerciseParam}`) : null;
      const explicit = pendingTarget.current ? content?.querySelector<HTMLElement>(pendingTarget.current) : null;
      if (pendingTarget.current && !explicit) return;
      const target = explicit ?? exercise ?? content?.querySelector<HTMLElement>('h2');
      pendingTarget.current = null;
      pendingView.current = null;
      if (!target) return;
      target.tabIndex = -1;
      target.focus({preventScroll: true});
      target.scrollIntoView?.({behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
    });
    return () => cancelAnimationFrame(frame);
  }, [activeView, queryView, selectedLevelId, targetExerciseParam, navigationRequest]);

  const currentLevelData = englishLevels.find(l => l.id === selectedLevelId) ?? englishLevels[0];

  // Helper to change view or level
  const setView = (view: EnglishView, levelId?: EnglishLevelId) => {
    setFeedback('');
    pendingView.current = view;
    requestReveal(view === 'diagnostico' && engProgress.initialPlacement?.status === 'em-andamento' ? '.pf-eng-diag-status-bar' : undefined);
    if (levelId) change(p => ({...p, english: {...(p.english ?? engProgress), selectedLevel: levelId}}));
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('view', view);
      if (levelId) next.set('nivel', levelId);
      next.delete('exercicio');
      return next;
    }, {replace: view === activeView && (!levelId || levelId === selectedLevelId) && !targetExerciseParam});
  };

  const setLevel = (levelId: EnglishLevelId) => {
    setFeedback('');
    pendingView.current = null;
    requestReveal();
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('nivel', levelId);
      next.delete('exercicio');
      return next;
    });
    change(p => ({
      ...p,
      english: {
        ...(p.english ?? engProgress),
        selectedLevel: levelId,
      },
    }));
  };

  const setStudyingLevel = (levelId: EnglishLevelId) => {
    setFeedback(`Nível ${levelId} definido como seu nível em estudo. Progresso anterior preservado.`);
    requestReveal('.pf-eng-feedback');
    change(p => ({
      ...p,
      english: {
        ...(p.english ?? engProgress),
        studyingLevel: levelId,
      },
    }));
  };

  const copyToClipboard = async (text: string, id: string) => {
    setCopiedPromptId(null);
    setCopyFailureId(null);
    try {
      if (!navigator.clipboard) throw Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      setCopiedPromptId(id);
    } catch {
      setCopyFailureId(id);
    }
  };
  const copyFeedbackFor = (id: string) => copyFailureId === id
    ? <p role="alert" className="pf-meta">Não foi possível copiar. Verifique a permissão da área de transferência e tente novamente.</p>
    : copiedPromptId === id ? <p role="status" className="pf-meta">Prompt copiado. Nada foi enviado automaticamente.</p> : null;

  // Stat calculations
  const totalExercises = englishExercises.length;
  const completedExercisesCount = Object.values(engProgress.exercises).filter(
    e => e.status === 'concluido'
  ).length;

  const currentLevelMilestones = englishMilestones.filter(m => m.levelId === selectedLevelId);
  const completedCurrentLevelMilestones = currentLevelMilestones.filter(m =>
    engProgress.completedMilestones.includes(m.id)
  ).length;
  const levelPercent =
    currentLevelMilestones.length > 0
      ? Math.round((completedCurrentLevelMilestones / currentLevelMilestones.length) * 100)
      : 0;

  // Level status (Não iniciada, Em andamento, Concluída)
  const getLevelStatus = (lvlId: EnglishLevelId) => {
    const ms = englishMilestones.filter(m => m.levelId === lvlId);
    const doneMs = ms.filter(m => engProgress.completedMilestones.includes(m.id)).length;
    const exs = englishExercises.filter(e => e.level === lvlId);
    const doneExs = exs.filter(e => engProgress.exercises[e.id]?.status === 'concluido').length;
    const hasEval = (engProgress.evaluations[lvlId] ?? []).length > 0;

    if (doneMs === ms.length && doneMs > 0 && (doneExs >= 3 || hasEval)) {
      return { label: 'Concluído por autoavaliação', cls: 'status-concluido' };
    }
    if (doneMs > 0 || doneExs > 0 || hasEval || engProgress.studyingLevel === lvlId) {
      return { label: 'Em andamento', cls: 'status-em-andamento' };
    }
    return { label: 'Não iniciado', cls: 'status-nao-iniciado' };
  };

  // Skill progress breakdown
  const skillsList: EnglishSkill[] = [
    'listening',
    'speaking',
    'reading',
    'writing',
    'vocabulary-grammar',
  ];

  const skillProgress = skillsList.map(skill => {
    const exs = englishExercises.filter(e => e.skill === skill);
    const done = exs.filter(e => engProgress.exercises[e.id]?.status === 'concluido').length;
    const pct = exs.length > 0 ? Math.round((done / exs.length) * 100) : 0;
    return { skill, total: exs.length, done, pct };
  });

  // Next recommended activity
  const nextExercise = englishExercises.find(
    e => e.level === selectedLevelId && engProgress.exercises[e.id]?.status !== 'concluido'
  ) ?? englishExercises[0];

  // ==========================================
  // ACTION HANDLERS: EXERCISES LIFECYCLE
  // ==========================================
  const handleStartExercise = (exerciseId: string) => {
    const ex = englishExercises.find(e => e.id === exerciseId);
    if (!ex) return;

    const currentAttempt = engProgress.exercises[exerciseId];
    if (currentAttempt?.status !== 'concluido') {
      change(p => ({
        ...p,
        english: setEnglishExerciseStatus(p.english, exerciseId, 'em-andamento'),
      }));
    }

    if (ex.level !== selectedLevelId) {
      change(p => ({
        ...p,
        english: {
          ...(p.english ?? engProgress),
          selectedLevel: ex.level,
        },
      }));
    }
    if (skillFilter !== 'todos' && skillFilter !== ex.skill) {
      setSkillFilter('todos');
    }

    setFeedback('');
    pendingView.current = 'exercicios';
    requestReveal();

    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('view', 'exercicios');
      next.set('nivel', ex.level);
      next.set('exercicio', exerciseId);
      return next;
    });

  };

  const handleStopExercise = (exerciseId: string) => {
    change(p => ({
      ...p,
      english: setEnglishExerciseStatus(p.english, exerciseId, 'interrompido'),
    }));
  };

  const handleRedoExercise = (exerciseId: string) => {
    change(p => ({
      ...p,
      english: setEnglishExerciseStatus(p.english, exerciseId, 'em-andamento'),
    }));
  };

  const handleUndoExercise = (exerciseId: string) => {
    change(p => ({
      ...p,
      english: undoEnglishExerciseCompletion(p.english, exerciseId),
    }));
  };

  // ==========================================
  // PLACEMENT / DIAGNOSTIC LOGIC
  // ==========================================
  const placementState = engProgress.initialPlacement ?? {
    status: 'nao-iniciado',
    currentQuestionIndex: 0,
    answers: {},
  };

  const handleStartPlacement = () => {
    change(p => ({
      ...p,
      english: updateEnglishPlacement(p.english, {
        status: 'em-andamento',
        startedAt: new Date().toISOString(),
      }),
    }));
    setView('diagnostico');
    requestReveal('.pf-eng-diag-status-bar');
  };

  const handleStopPlacement = () => {
    requestReveal('.pf-eng-diag-flow');
    change(p => ({
      ...p,
      english: updateEnglishPlacement(p.english, {
        status: 'interrompido',
        pausedAt: new Date().toISOString(),
      }),
    }));
  };

  const handleResumePlacement = () => {
    change(p => ({
      ...p,
      english: updateEnglishPlacement(p.english, {
        status: 'em-andamento',
      }),
    }));
    setView('diagnostico');
    requestReveal('.pf-eng-diag-status-bar');
  };

  const handleAnswerPlacementQuestion = (questionIdx: number, optionIdx: number) => {
    change(p => ({
      ...p,
      english: updateEnglishPlacement(p.english, {
        answers: {
          ...(p.english?.initialPlacement?.answers ?? {}),
          [questionIdx]: optionIdx,
        },
      }),
    }));
  };

  const handlePlacementNextQuestion = () => {
    if (placementState.currentQuestionIndex < initialPlacementQuestions.length - 1) {
      requestReveal('.pf-eng-placement-q-card h3');
      change(p => ({
        ...p,
        english: updateEnglishPlacement(p.english, {
          currentQuestionIndex: (p.english?.initialPlacement?.currentQuestionIndex ?? 0) + 1,
        }),
      }));
    }
  };

  const handlePlacementPrevQuestion = () => {
    if (placementState.currentQuestionIndex > 0) {
      requestReveal('.pf-eng-placement-q-card h3');
      change(p => ({
        ...p,
        english: updateEnglishPlacement(p.english, {
          currentQuestionIndex: (p.english?.initialPlacement?.currentQuestionIndex ?? 0) - 1,
        }),
      }));
    }
  };

  const handleFinalizePlacement = () => {
    requestReveal('.pf-eng-placement-result h3');
    let score = 0;
    initialPlacementQuestions.forEach((q, idx) => {
      if (placementState.answers[idx] === q.correctIndex) {
        score++;
      }
    });
    const suggested = calculateSuggestedPlacement(score);
    change(p => ({
      ...p,
      english: updateEnglishPlacement(p.english, {
        status: 'concluido',
        score,
        suggestedLevel: suggested,
        completedAt: new Date().toISOString(),
      }),
    }));
  };

  const handleRedoPlacement = () => {
    requestReveal('.pf-eng-placement-q-card h3');
    change(p => ({
      ...p,
      english: updateEnglishPlacement(p.english, {
        status: 'em-andamento',
        currentQuestionIndex: 0,
        answers: {},
        score: undefined,
        suggestedLevel: undefined,
      }),
    }));
  };

  const handleUndoPlacement = () => {
    requestReveal('.pf-eng-placement-q-card h3');
    change(p => ({
      ...p,
      english: updateEnglishPlacement(p.english, {
        status: 'em-andamento',
      }),
    }));
  };

  // ==========================================
  // LEVEL EVALUATION LOGIC
  // ==========================================
  const currentEvaluation = levelDiagnosticEvaluations[selectedLevelId];
  const evalDraft = engProgress.evaluationDrafts?.[selectedLevelId] ?? {
    status: 'nao-iniciado',
    answers: {},
  };

  const handleAnswerEvaluation = (questionId: string, optionIdx: number) => {
    change(p => ({
      ...p,
      english: updateEnglishEvaluationDraft(p.english, selectedLevelId, {
        status: 'em-andamento',
        answers: {
          ...(p.english?.evaluationDrafts?.[selectedLevelId]?.answers ?? {}),
          [questionId]: optionIdx,
        },
      }),
    }));
  };

  const handleStopEvaluation = (levelId: EnglishLevelId = selectedLevelId) => {
    change(p => ({
      ...p,
      english: updateEnglishEvaluationDraft(p.english, levelId, {
        status: 'interrompido',
      }),
    }));
  };

  const handleResumeEvaluation = (levelId: EnglishLevelId = selectedLevelId) => {
    change(p => ({
      ...p,
      english: updateEnglishEvaluationDraft(p.english, levelId, {
        status: 'em-andamento',
      }),
    }));
  };

  const handleEvalSubmit = () => {
    requestReveal('.pf-eng-eval-result h3');
    let score = 0;
    const total = currentEvaluation.objectiveQuestions.length;
    const skillScores: Record<EnglishSkill, { score: number; total: number }> = {
      listening: { score: 0, total: 0 },
      speaking: { score: 0, total: 0 },
      reading: { score: 0, total: 0 },
      writing: { score: 0, total: 0 },
      'vocabulary-grammar': { score: 0, total: 0 },
    };
    const wrongTopics: string[] = [];

    currentEvaluation.objectiveQuestions.forEach(q => {
      skillScores[q.skill].total++;
      if (evalDraft.answers[q.id] === q.correctIndex) {
        score++;
        skillScores[q.skill].score++;
      } else {
        wrongTopics.push(q.skill);
      }
    });

    const percentage = Math.round((score / total) * 100);
    const result = {
      completedAt: new Date().toISOString(),
      score,
      total,
      percentage,
      skillScores,
      recommendedReview: Array.from(new Set(wrongTopics)),
    };

    change(p => {
      const updated = addEnglishEvaluation(p.english, selectedLevelId, result);
      return {
        ...p,
        english: updateEnglishEvaluationDraft(updated, selectedLevelId, {
          status: 'concluido',
        }),
      };
    });
  };

  // ==========================================
  // "CONTINUAR ESTUDANDO" ACTIVE ITEMS
  // ==========================================
  const isPlacementActive =
    placementState.status === 'em-andamento' || placementState.status === 'interrompido';

  const activeExercises = englishExercises.filter(e => {
    const st = engProgress.exercises[e.id]?.status;
    return st === 'em-andamento' || st === 'interrompido';
  });

  const activeEvaluationLevels = (['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as EnglishLevelId[]).filter(
    lvl => {
      const st = engProgress.evaluationDrafts?.[lvl]?.status;
      return st === 'em-andamento' || st === 'interrompido';
    }
  );

  const hasActiveActivities =
    isPlacementActive || activeExercises.length > 0 || activeEvaluationLevels.length > 0;

  return (
    <div className="pf-eng-journey">
      {/* HERO SECTION */}
      <header className="pf-hero pf-eng-hero">
        <div className="pf-eng-hero-left">
          <p className="pf-kicker">STACKTRAIL / IDIOMAS & CARREIRA INTERNACIONAL</p>
          <h1>
            English Journey<br />
            <span>Inglês para a vida e carreira</span>
          </h1>
          <p className="pf-lead">
            Roadmap progressivo do nível A1 ao C2 baseado no CEFR. Desenvolva inglês para o dia a dia, viagens,
            comunicação com equipes internacionais e processos seletivos globais, com foco em prática real e
            recursos confiáveis.
          </p>

          <div className="pf-eng-hero-badges">
            <span className="pf-eng-pill">
              ⭐ <strong>{engProgress.xp} XP</strong> acumulados
            </span>
            <span className="pf-eng-pill">
              📅 <strong>{engProgress.studyDays.length} dias</strong> de prática
            </span>
            <span className="pf-eng-pill">
              🎯 Nível em estudo: <strong>{engProgress.studyingLevel}</strong>
            </span>
            <span className="pf-eng-pill">
              ✏️ <strong>{completedExercisesCount} de {totalExercises} práticas</strong> concluídas
            </span>
          </div>

          <div className="pf-actions">
            <button
              type="button"
              className="pf-button primary"
              onClick={() => {
                setView('exercicios', engProgress.studyingLevel);
              }}
            >
              Continuar praticando ({engProgress.studyingLevel}) →
            </button>
            <button
              type="button"
              className="pf-button"
              onClick={() => {
                if (placementState.status === 'nao-iniciado') {
                  handleStartPlacement();
                } else {
                  setView('diagnostico');
                }
              }}
            >
              🧭 Não sei meu nível (Diagnóstico)
            </button>
            <button
              type="button"
              className="pf-button"
              onClick={() => setView('carreira')}
            >
              🌐 Carreira Internacional
            </button>
          </div>
        </div>

        <div className="pf-eng-hero-card pf-panel">
          <h3>Próxima atividade recomendada</h3>
          <p className="pf-meta">
            Nível {selectedLevelId} · {skillLabels[nextExercise.skill].label}
          </p>
          <strong>{nextExercise.title}</strong>
          <p className="pf-meta">{nextExercise.theme}</p>
          <div className="pf-eng-card-action">
            <button
              type="button"
              className="pf-button primary compact"
              onClick={() => handleStartExercise(nextExercise.id)}
            >
              Iniciar exercício ↗
            </button>
          </div>

          <div className="pf-eng-level-quick-progress">
            <div className="pf-eng-progress-label">
              <span>Marcos do nível {selectedLevelId}</span>
              <strong>{levelPercent}%</strong>
            </div>
            <progress
              className="pf-prof-progress-bar"
              max={100}
              value={levelPercent}
              aria-label={`Progresso nos marcos do nível ${selectedLevelId}`}
            />
          </div>
        </div>
      </header>

      {/* CONTINUAR ESTUDANDO (QUANDO HOUVER ATIVIDADES EM ANDAMENTO OU INTERROMPIDAS) */}
      {hasActiveActivities && (
        <section className="pf-panel pf-eng-continue-studying" aria-label="Continuar estudando">
          <div className="pf-prof-section-header">
            <div>
              <span className="pf-kicker">SUAS ATIVIDADES EM ANDAMENTO</span>
              <h2>Continuar estudando</h2>
              <p className="pf-meta">
                Retome exatamente de onde você parou. Suas respostas e progresso estão salvos localmente.
              </p>
            </div>
          </div>

          <div className="pf-cards">
            {/* DIAGNÓSTICO INICIAL */}
            {isPlacementActive && (
              <article className="pf-card pf-eng-continue-card">
                <div className="pf-eng-card-top">
                  <span className="pf-kicker">DIAGNÓSTICO INICIAL</span>
                  <span
                    className={`pf-prof-status-tag ${
                      placementState.status === 'interrompido' ? 'interrompido' : 'em-andamento'
                    }`}
                  >
                    {placementState.status === 'interrompido' ? '⏸️ Interrompido' : '▶️ Em andamento'}
                  </span>
                </div>
                <h3>Diagnóstico: Não sei meu nível</h3>
                <p className="pf-meta">
                  Questão {placementState.currentQuestionIndex + 1} de {initialPlacementQuestions.length} ·{' '}
                  {Object.keys(placementState.answers).length} de {initialPlacementQuestions.length} questões respondidas
                </p>
                <div className="pf-actions">
                  <button
                    type="button"
                    className="pf-button primary compact"
                    onClick={() => {
                      if (placementState.status === 'interrompido') {
                        handleResumePlacement();
                      } else {
                        setView('diagnostico');
                      }
                    }}
                  >
                    Continuar diagnóstico →
                  </button>
                  {placementState.status === 'em-andamento' && (
                    <button
                      type="button"
                      className="pf-button compact"
                      onClick={handleStopPlacement}
                    >
                      Parar
                    </button>
                  )}
                </div>
              </article>
            )}

            {/* EXERCÍCIOS ATIVOS */}
            {activeExercises.map(ex => {
              const att = engProgress.exercises[ex.id];
              const isInterrupted = att?.status === 'interrompido';
              return (
                <article key={ex.id} className="pf-card pf-eng-continue-card">
                  <div className="pf-eng-card-top">
                    <span className="pf-kicker">
                      {skillLabels[ex.skill].icon} {skillLabels[ex.skill].label} · NÍVEL {ex.level}
                    </span>
                    <span
                      className={`pf-prof-status-tag ${
                        isInterrupted ? 'interrompido' : 'em-andamento'
                      }`}
                    >
                      {isInterrupted ? '⏸️ Interrompido' : '▶️ Em andamento'}
                    </span>
                  </div>
                  <h3>{ex.title}</h3>
                  <p className="pf-meta">Tema: {ex.theme}</p>
                  <div className="pf-actions">
                    <button
                      type="button"
                      className="pf-button primary compact"
                      onClick={() => handleStartExercise(ex.id)}
                    >
                      Continuar exercício →
                    </button>
                    {!isInterrupted && (
                      <button
                        type="button"
                        className="pf-button compact"
                        onClick={() => handleStopExercise(ex.id)}
                      >
                        Parar
                      </button>
                    )}
                  </div>
                </article>
              );
            })}

            {/* AVALIAÇÕES ATIVAS */}
            {activeEvaluationLevels.map(lvl => {
              const draft = engProgress.evaluationDrafts?.[lvl];
              const isInterrupted = draft?.status === 'interrompido';
              return (
                <article key={lvl} className="pf-card pf-eng-continue-card">
                  <div className="pf-eng-card-top">
                    <span className="pf-kicker">AVALIAÇÃO DIAGNÓSTICA · NÍVEL {lvl}</span>
                    <span
                      className={`pf-prof-status-tag ${
                        isInterrupted ? 'interrompido' : 'em-andamento'
                      }`}
                    >
                      {isInterrupted ? '⏸️ Interrompido' : '▶️ Em andamento'}
                    </span>
                  </div>
                  <h3>{levelDiagnosticEvaluations[lvl].title}</h3>
                  <p className="pf-meta">
                    {Object.keys(draft?.answers ?? {}).length} de{' '}
                    {levelDiagnosticEvaluations[lvl].objectiveQuestions.length} questões respondidas
                  </p>
                  <div className="pf-actions">
                    <button
                      type="button"
                      className="pf-button primary compact"
                      onClick={() => {
                        setView('avaliacao', lvl);
                        if (isInterrupted) {
                          handleResumeEvaluation(lvl);
                        }
                      }}
                    >
                      Continuar avaliação →
                    </button>
                    {!isInterrupted && (
                      <button
                        type="button"
                        className="pf-button compact"
                        onClick={() => handleStopEvaluation(lvl)}
                      >
                        Parar
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* PROGRESSO GERAL POR HABILIDADE */}
      <section className="pf-panel pf-eng-skills-overview" aria-label="Progresso por habilidade">
        <h3>Progresso Geral por Habilidade</h3>
        <p className="pf-meta">
          Acompanhamento separado das cinco competências fundamentais para a fluência real.
        </p>
        <div className="pf-stat-grid">
          {skillProgress.map(({ skill, total, done, pct }) => (
            <div key={skill} className="pf-card">
              <div className="pf-eng-card-top">
                <strong>
                  {skillLabels[skill].icon} {skillLabels[skill].label}
                </strong>
                <span className="pf-meta">{pct}%</span>
              </div>
              <progress max={100} value={pct} aria-label={`Progresso em ${skillLabels[skill].label}`} />
              <small className="pf-meta">
                {done} de {total} exercícios concluídos
              </small>
            </div>
          ))}
        </div>
      </section>

      {/* ROADMAP TRACK A1-C2 (6 NÍVEIS COMPACTOS) */}
      <section className="pf-panel pf-eng-level-track-section" aria-labelledby="track-heading">
        <div className="pf-prof-section-header pf-eng-track-header">
          <div>
            <div className="pf-eng-header-with-hint">
              <h2 id="track-heading">Trilha de Níveis CEFR (A1 a C2)</h2>
              <span
                className="pf-eng-drag-hint"
                title="Clique e arraste com o mouse para navegar horizontalmente pelos níveis"
              >
                <span className="pf-eng-hand-anim" aria-hidden="true">
                  ✋
                </span>{' '}
                Arraste com o mouse
              </span>
            </div>
            <p className="pf-meta">
              Selecione um nível para explorar exclusivamente seus marcos, atividades e avaliação diagnóstica.
            </p>
          </div>
          <div className="pf-eng-selector-wrapper">
            <label htmlFor={selectLevelId} className="sr-only">
              Nível de inglês selecionado
            </label>
            <select
              id={selectLevelId}
              value={selectedLevelId}
              onChange={e => setLevel(e.target.value as EnglishLevelId)}
              className="pf-button"
            >
              {englishLevels.map(lvl => (
                <option key={lvl.id} value={lvl.id}>
                  {lvl.id} — {lvl.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className={`pf-eng-track-grid pf-eng-drag-scroll ${trackScroll.isDragging ? 'is-dragging' : ''}`}
          {...trackScroll.props}
        >
          {englishLevels.map(lvl => {
            const isSelected = lvl.id === selectedLevelId;
            const isStudying = lvl.id === engProgress.studyingLevel;
            const status = getLevelStatus(lvl.id);
            const ms = englishMilestones.filter(m => m.levelId === lvl.id);
            const doneMs = ms.filter(m => engProgress.completedMilestones.includes(m.id)).length;
            const pct = ms.length > 0 ? Math.round((doneMs / ms.length) * 100) : 0;

            return (
              <button
                type="button"
                key={lvl.id}
                className={`pf-eng-level-node ${isSelected ? 'is-selected' : ''} ${status.cls}`}
                onClick={() => setView('trilha', lvl.id)}
                aria-pressed={isSelected}
              >
                <div className="pf-eng-node-header">
                  <span className="pf-eng-node-badge">{lvl.id}</span>
                  {isStudying && <span className="pf-badge-highlight">EM ESTUDO</span>}
                </div>
                <strong>{lvl.name.split('—')[1]?.trim() ?? lvl.name}</strong>
                <p className="pf-meta">{lvl.cefrTitle.split('·')[1]?.trim() ?? lvl.cefrTitle}</p>
                <div className="pf-eng-node-footer">
                  <span className={`pf-prof-status-tag ${status.cls.replace('status-', '')}`}>
                    {status.label}
                  </span>
                  <small>{pct}% marcos</small>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* TABS DE VISÃO */}
      <div className="pf-eng-tabs-container">
        <div className="pf-eng-tabs-bar-header">
          <span className="pf-kicker">ÁREAS DE ESTUDO & PRÁTICA</span>
          <span className="pf-eng-drag-hint" title="Clique e arraste com o mouse para ver todas as abas">
            <span className="pf-eng-hand-anim" aria-hidden="true">
              ✋
            </span>{' '}
            Arraste as abas com o mouse
          </span>
        </div>
        <nav
          className={`pf-prof-nav-tabs pf-eng-drag-scroll ${tabsScroll.isDragging ? 'is-dragging' : ''}`}
          aria-label="Navegação da área de Inglês"
          {...tabsScroll.props}
        >
          <button
            type="button"
            className={activeView === 'trilha' ? 'is-active' : ''}
            aria-current={activeView === 'trilha' ? 'page' : undefined}
            aria-controls="english-study-content"
            onClick={() => setView('trilha')}
          >
            🗺️ Visão do Nível ({selectedLevelId})
          </button>
          <button
            type="button"
            className={activeView === 'exercicios' ? 'is-active' : ''}
            aria-current={activeView === 'exercicios' ? 'page' : undefined}
            aria-controls="english-study-content"
            onClick={() => setView('exercicios')}
          >
            ✏️ Exercícios Práticos
          </button>
          <button
            type="button"
            className={activeView === 'avaliacao' ? 'is-active' : ''}
            aria-current={activeView === 'avaliacao' ? 'page' : undefined}
            aria-controls="english-study-content"
            onClick={() => setView('avaliacao')}
          >
            🎯 Avaliação Diagnóstica
          </button>
          <button
            type="button"
            className={activeView === 'diagnostico' ? 'is-active' : ''}
            aria-current={activeView === 'diagnostico' ? 'page' : undefined}
            aria-controls="english-study-content"
            onClick={() => setView('diagnostico')}
          >
            🧭 Nivelamento Inicial
          </button>
          <button
            type="button"
            className={activeView === 'carreira' ? 'is-active' : ''}
            aria-current={activeView === 'carreira' ? 'page' : undefined}
            aria-controls="english-study-content"
            onClick={() => setView('carreira')}
          >
            🌐 Carreira Internacional
          </button>
          <button
            type="button"
            className={activeView === 'revisao' ? 'is-active' : ''}
            aria-current={activeView === 'revisao' ? 'page' : undefined}
            aria-controls="english-study-content"
            onClick={() => setView('revisao')}
          >
            🔄 Revisão Espaçada
          </button>
          <button
            type="button"
            className={activeView === 'biblioteca' ? 'is-active' : ''}
            aria-current={activeView === 'biblioteca' ? 'page' : undefined}
            aria-controls="english-study-content"
            onClick={() => setView('biblioteca')}
          >
            📚 Biblioteca & Recursos
          </button>
          <button
            type="button"
            className={activeView === 'exames' ? 'is-active' : ''}
            aria-current={activeView === 'exames' ? 'page' : undefined}
            aria-controls="english-study-content"
            onClick={() => setView('exames')}
          >
            📋 Exames Oficiais (Cambridge/IELTS/TOEFL)
          </button>
          <button
            type="button"
            className={activeView === 'conquistas' ? 'is-active' : ''}
            aria-current={activeView === 'conquistas' ? 'page' : undefined}
            aria-controls="english-study-content"
            onClick={() => setView('conquistas')}
          >
            🏆 Conquistas & Progresso
          </button>
        </nav>
      </div>

      <div ref={contentRef} id="english-study-content" className="pf-eng-content">
      <p className="pf-meta pf-eng-feedback" role="status" aria-live="polite" aria-atomic="true">
        {feedback || `${viewLabels[activeView]} · Nível ${selectedLevelId}`}
      </p>
      {/* VIEW: TRILHA (MARCOS E DETALHES DO NÍVEL ATUAL) */}
      {activeView === 'trilha' && (
        <section className="pf-eng-view-trilha">
          <div className="pf-panel pf-eng-level-summary-card">
            <div className="pf-prof-section-header">
              <div>
                <h2>{currentLevelData.name}</h2>
                <p className="pf-meta">
                  {currentLevelData.cefrTitle} · Carga horária estimada: {currentLevelData.recommendedHours}
                </p>
              </div>
              <div className="pf-actions">
                {engProgress.studyingLevel !== selectedLevelId ? (
                  <button
                    type="button"
                    className="pf-button compact"
                    onClick={() => setStudyingLevel(selectedLevelId)}
                  >
                    Definir como meu nível em estudo
                  </button>
                ) : (
                  <span className="pf-badge-done">✓ Seu nível em estudo atual</span>
                )}
              </div>
            </div>

            <div className="pf-hint">
              <strong>Objetivo comunicativo CEFR:</strong>
              <p>{currentLevelData.officialDescriptor}</p>
            </div>

            <h3>Competências por habilidade neste nível:</h3>
            <div className="pf-stat-grid">
              {skillsList.map(skill => (
                <div key={skill} className="pf-card">
                  <strong>
                    {skillLabels[skill].icon} {skillLabels[skill].label}
                  </strong>
                  <p className="pf-meta">{currentLevelData.skillsDescriptors[skill]}</p>
                </div>
              ))}
            </div>

            <div className="pf-eng-themes-box">
              <strong>Temas centrais de comunicação:</strong>
              <div className="pf-tags">
                {currentLevelData.themes.map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* LISTA DE MARCOS COMUNICATIVOS */}
          <div className="pf-eng-milestones-section">
            <h3>Marcos Comunicativos do Nível {selectedLevelId}</h3>
            <p className="pf-meta">
              Conclua cada marco ao praticar e demonstrar a competência em conversas ou produções reais.
            </p>

            <div className="pf-prof-milestones-track">
              {currentLevelMilestones.map((m, idx) => {
                const isDone = engProgress.completedMilestones.includes(m.id);
                return (
                  <article
                    key={m.id}
                    className={`pf-prof-milestone-card ${isDone ? 'status-concluido' : 'status-em-andamento'}`}
                  >
                    <div className="pf-prof-milestone-header">
                      <div className="pf-prof-milestone-badge-group">
                        <span className="pf-prof-step-number">
                          MARCO {idx + 1} DE {currentLevelMilestones.length}
                        </span>
                        <span className={`pf-prof-status-tag ${isDone ? 'concluido' : 'em-andamento'}`}>
                          {isDone ? '✓ Concluído' : '○ Em andamento'}
                        </span>
                      </div>
                      <h3>{m.title}</h3>
                    </div>

                    <div className="pf-prof-milestone-content">
                      <p className="pf-prof-milestone-goal">
                        <strong>Meta:</strong> {m.goal}
                      </p>
                      <div className="pf-prof-guidance-box">
                        <strong>Orientação de prática:</strong>
                        <p>{m.practicalGuidance}</p>
                      </div>

                      <div className="pf-eng-phrases-box">
                        <strong>Exemplos práticos de uso:</strong>
                        <ul>
                          {m.examplePhrases.map((phrase, pIdx) => (
                            <li key={pIdx}>
                              <code>{phrase}</code>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pf-hint">
                        <strong>Atividade sugerida:</strong> {m.suggestedActivity}
                      </div>

                      <div className="pf-prof-milestone-action-bar">
                        <button
                          type="button"
                          className={`pf-button ${isDone ? '' : 'primary'} compact`}
                          onClick={() => {
                            change(p => ({
                              ...p,
                              english: toggleEnglishMilestone(p.english, m.id),
                            }));
                          }}
                        >
                          {isDone ? 'Reabrir marco' : 'Marcar marco como praticado (+50 XP)'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* VIEW: EXERCÍCIOS PRÁTICOS */}
      {activeView === 'exercicios' && (
        <section className="pf-eng-view-exercises">
          <div className="pf-prof-section-header">
            <div>
              <h2>Exercícios Práticos do Nível {selectedLevelId}</h2>
              <p className="pf-meta">
                Exercícios sem respostas automáticas mágicas em tarefas abertas. Questões objetivas têm correção local
                imediata; práticas de escrita e fala contam com rubrica de autoavaliação e prompts para IA externa.
              </p>
            </div>
            <div className="pf-tools">
              <label htmlFor={skillFilterId} className="pf-field">
                Filtrar por habilidade
                <select
                  id={skillFilterId}
                  value={visibleSkillFilter}
                  onChange={e => {
                    setSkillFilter(e.target.value as 'todos' | EnglishSkill);
                    setSearchParams(prev => {const next = new URLSearchParams(prev);next.delete('exercicio');return next;}, {replace: true});
                  }}
                >
                  <option value="todos">
                    Todas as habilidades ({englishExercises.filter(e => e.level === selectedLevelId).length})
                  </option>
                  {skillsList.map(skill => (
                    <option key={skill} value={skill}>
                      {skillLabels[skill].label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="pf-cards">
            {englishExercises
              .filter(e => e.level === selectedLevelId && (visibleSkillFilter === 'todos' || e.skill === visibleSkillFilter))
              .map(exercise => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  attempt={engProgress.exercises[exercise.id]}
                  isTargeted={targetExerciseId === exercise.id}
                  onStart={() => handleStartExercise(exercise.id)}
                  onStop={() => handleStopExercise(exercise.id)}
                  onResume={() => handleStartExercise(exercise.id)}
                  onRedo={() => handleRedoExercise(exercise.id)}
                  onUndo={() => handleUndoExercise(exercise.id)}
                  onUpdateDraft={patch => {
                    change(p => ({
                      ...p,
                      english: updateEnglishExercise(p.english, exercise.id, patch, 0),
                    }));
                  }}
                  onSubmitObjective={(selectedOption, textAnswer) => {
                    let correct = false;
                    if (exercise.type === 'multiple-choice' || exercise.type === 'reading') {
                      correct = selectedOption === exercise.expectedAnswer;
                    } else if (exercise.type === 'fill-blank') {
                      const cleanInput = (textAnswer ?? '').trim().toLowerCase();
                      const cleanExpected = String(exercise.expectedAnswer).trim().toLowerCase();
                      correct = cleanInput === cleanExpected;
                    }
                    change(p => ({
                      ...p,
                      english: updateEnglishExercise(
                        p.english,
                        exercise.id,
                        {
                          status: 'concluido',
                          selectedOption,
                          textAnswer,
                          isCorrect: correct,
                        },
                        correct ? 15 : 5
                      ),
                    }));
                  }}
                  onSubmitProductive={checks => {
                    const allChecked = checks.length > 0 && checks.every(Boolean);
                    change(p => ({
                      ...p,
                      english: updateEnglishExercise(
                        p.english,
                        exercise.id,
                        {
                          status: allChecked ? 'concluido' : 'em-andamento',
                          selfAssessedChecks: checks,
                        },
                        allChecked ? 25 : 0
                      ),
                    }));
                  }}
                  onToggleReview={() => {
                    change(p => ({
                      ...p,
                      english: toggleEnglishExerciseReview(p.english, exercise.id),
                    }));
                  }}
                  onCopyPrompt={text => copyToClipboard(text, exercise.id)}
                  isCopied={copiedPromptId === exercise.id}
                  copyFeedback={copyFeedbackFor(exercise.id)}
                />
              ))}
          </div>
        </section>
      )}

      {/* VIEW: AVALIAÇÃO DIAGNÓSTICA DO NÍVEL */}
      {activeView === 'avaliacao' && (
        <section className="pf-eng-view-evaluation">
          <div className="pf-panel pf-eng-eval-panel">
            <div className="pf-prof-section-header">
              <div>
                <h2>{currentEvaluation.title}</h2>
                <p className="pf-lead">{currentEvaluation.description}</p>
              </div>
              <div className="pf-actions">
                {evalDraft.status === 'em-andamento' && (
                  <button
                    type="button"
                    className="pf-button compact"
                    onClick={() => handleStopEvaluation()}
                  >
                    ⏸️ Parar avaliação
                  </button>
                )}
                {evalDraft.status === 'interrompido' && (
                  <button
                    type="button"
                    className="pf-button primary compact"
                    onClick={() => handleResumeEvaluation()}
                  >
                    ▶️ Continuar avaliação
                  </button>
                )}
              </div>
            </div>

            <div className="pf-hint">
              <strong>Aviso de transparência:</strong> {currentEvaluation.disclaimer}
            </div>

            {evalDraft.status === 'interrompido' && (
              <div className="pf-hint pf-alert">
                <strong>⏸️ Avaliação pausada:</strong> Suas respostas foram salvas. Clique em &ldquo;Continuar avaliação&rdquo; quando quiser retomar.
              </div>
            )}

            {/* SEÇÃO OBJETIVA */}
            <div className="pf-eng-eval-section">
              <h3>Parte 1: Questões Objetivas</h3>
              <p className="pf-meta">
                Responda às questões conceituais para mensurar sua base de leitura, escuta e gramática em contexto.
              </p>

              <div className="pf-eng-eval-questions">
                {currentEvaluation.objectiveQuestions.map((q, idx) => {
                  const isSubmitted = evalDraft.status === 'concluido';
                  return (
                    <fieldset key={q.id} className="pf-eng-eval-q pf-card">
                      <legend>
                        <strong>
                          Questão {idx + 1} ({skillLabels[q.skill].label}):
                        </strong>
                        <p>{q.question}</p>
                      </legend>

                      <div className="pf-eng-options">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = evalDraft.answers[q.id] === optIdx;
                          const isCorrect = q.correctIndex === optIdx;
                          return (
                            <label
                              key={optIdx}
                              className={`pf-check pf-eng-option-label ${
                                isSubmitted
                                  ? isCorrect
                                    ? 'is-correct'
                                    : isSelected
                                    ? 'is-wrong'
                                    : ''
                                  : isSelected
                                  ? 'is-selected'
                                  : ''
                              }`}
                            >
                              <input
                                type="radio"
                                name={`eval-${q.id}`}
                                checked={isSelected}
                                disabled={isSubmitted || evalDraft.status === 'interrompido'}
                                onChange={() => handleAnswerEvaluation(q.id, optIdx)}
                              />
                              <span>{opt}</span>
                              {isSubmitted && isCorrect && <span className="pf-badge-done">✓ Correta</span>}
                              {isSubmitted && isSelected && !isCorrect && (
                                <span className="pf-alert">✕ Incorreta</span>
                              )}
                            </label>
                          );
                        })}
                      </div>

                      {isSubmitted && (
                        <div className="pf-hint pf-eng-explanation">
                          <strong>Explicação pedagógica:</strong>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </fieldset>
                  );
                })}
              </div>

              {evalDraft.status !== 'concluido' ? (
                <div className="pf-actions">
                  <button
                    type="button"
                    className="pf-button primary"
                    disabled={
                      Object.keys(evalDraft.answers).length < currentEvaluation.objectiveQuestions.length
                    }
                    onClick={handleEvalSubmit}
                  >
                    Submeter avaliação diagnóstica (+100 XP)
                  </button>
                  {evalDraft.status === 'em-andamento' && (
                    <button
                      type="button"
                      className="pf-button"
                      onClick={() => handleStopEvaluation()}
                    >
                      Parar avaliação
                    </button>
                  )}
                </div>
              ) : (
                <div className="pf-eng-eval-result pf-panel">
                  <h3>Resultado da Avaliação do Nível {selectedLevelId}</h3>
                  <p>
                    Você acertou{' '}
                    <strong>
                      {
                        currentEvaluation.objectiveQuestions.filter(
                          q => evalDraft.answers[q.id] === q.correctIndex
                        ).length
                      }{' '}
                      de {currentEvaluation.objectiveQuestions.length} questões
                    </strong>{' '}
                    (
                    {Math.round(
                      (currentEvaluation.objectiveQuestions.filter(
                        q => evalDraft.answers[q.id] === q.correctIndex
                      ).length /
                        currentEvaluation.objectiveQuestions.length) *
                        100
                    )}
                    %).
                  </p>
                  <p className="pf-meta">
                    Tentativa salva localmente no seu navegador. Você pode refazer a avaliação sempre que desejar.
                  </p>
                  <button
                    type="button"
                    className="pf-button"
                    onClick={() => {
                      requestReveal('.pf-eng-eval-questions');
                      change(p => ({
                        ...p,
                        english: updateEnglishEvaluationDraft(p.english, selectedLevelId, {
                          status: 'em-andamento',
                          answers: {},
                        }),
                      }));
                    }}
                  >
                    Tentar novamente
                  </button>
                </div>
              )}
            </div>

            {/* SEÇÃO PRODUTIVA: SPEAKING E WRITING */}
            <div className="pf-eng-eval-section">
              <h3>Parte 2: Tarefas Produtivas (Speaking & Writing)</h3>
              <p className="pf-meta">
                Tarefas abertas com rubricas transparentes de autoavaliação. Use os prompts para obter feedback
                detalhado de um professor ou de uma IA externa sem envio de dados pela plataforma.
              </p>

              <div className="pf-cards">
                <article className="pf-card pf-eng-eval-task">
                  <h4>🎙️ Tarefa Oral: {currentEvaluation.speakingTask.title}</h4>
                  <p>
                    <strong>Cenário:</strong> {currentEvaluation.speakingTask.scenario}
                  </p>
                  <strong>Perguntas norteadoras:</strong>
                  <ul>
                    {currentEvaluation.speakingTask.guidingQuestions.map((gq, i) => (
                      <li key={i}>{gq}</li>
                    ))}
                  </ul>
                  <strong>Critérios de autoavaliação:</strong>
                  <ul>
                    {currentEvaluation.speakingTask.rubric.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                  <div className="pf-actions">
                    <button
                      type="button"
                      className="pf-button compact"
                      onClick={() =>
                        copyToClipboard(currentEvaluation.speakingTask.aiPrompt, `eval-spk-${selectedLevelId}`)
                      }
                    >
                      {copiedPromptId === `eval-spk-${selectedLevelId}`
                        ? '✓ Prompt copiado!'
                        : 'Copiar prompt para revisão externa'}
                    </button>
                    {copyFeedbackFor(`eval-spk-${selectedLevelId}`)}
                  </div>
                </article>

                <article className="pf-card pf-eng-eval-task">
                  <h4>✍️ Tarefa Escrita: {currentEvaluation.writingTask.title}</h4>
                  <p>
                    <strong>Enunciado:</strong> {currentEvaluation.writingTask.prompt}
                  </p>
                  <p className="pf-meta">
                    Extensão mínima recomendada: {currentEvaluation.writingTask.minWords} palavras.
                  </p>
                  <strong>Critérios de autoavaliação:</strong>
                  <ul>
                    {currentEvaluation.writingTask.rubric.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                  <div className="pf-actions">
                    <button
                      type="button"
                      className="pf-button compact"
                      onClick={() =>
                        copyToClipboard(currentEvaluation.writingTask.aiPrompt, `eval-wri-${selectedLevelId}`)
                      }
                    >
                      {copiedPromptId === `eval-wri-${selectedLevelId}`
                        ? '✓ Prompt copiado!'
                        : 'Copiar prompt para revisão externa'}
                    </button>
                    {copyFeedbackFor(`eval-wri-${selectedLevelId}`)}
                  </div>
                </article>
              </div>
            </div>

            {/* HISTÓRICO DE TENTATIVAS */}
            {(engProgress.evaluations[selectedLevelId] ?? []).length > 0 && (
              <div className="pf-eng-eval-history">
                <h3>Histórico de Tentativas no Nível {selectedLevelId}</h3>
                <div className="pf-cards">
                  {(engProgress.evaluations[selectedLevelId] ?? []).map((ev, i) => (
                    <div key={i} className="pf-card">
                      <strong>Tentativa {i + 1}</strong>
                      <p className="pf-meta">Data: {new Date(ev.completedAt).toLocaleDateString('pt-BR')}</p>
                      <p>
                        Pontuação: {ev.score}/{ev.total} ({ev.percentage}%)
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* VIEW: DIAGNÓSTICO INICIAL (NIVELAMENTO) */}
      {activeView === 'diagnostico' && (
        <section className="pf-eng-view-diagnostic">
          <div className="pf-panel pf-eng-diag-panel">
            <span className="pf-kicker">AVALIAÇÃO FORMATIVA INICIAL</span>
            <h2>Diagnóstico de Ponto de Partida: Não sei meu nível</h2>
            <p className="pf-lead">
              Responda ao teste formativo de 8 questões para receber uma recomendação pedagógica de nível inicial na escala CEFR (A1 a C2).
            </p>

            <div className="pf-hint">
              <strong>Aviso de transparência e limites:</strong> Este diagnóstico é um instrumento formativo do StackTrail para orientar seus estudos iniciais. Ele <strong>não</strong> constitui certificação oficial (Cambridge, IELTS ou TOEFL), nem comprova proficiência jurídica ou acadêmica. Você pode ajustar seu nível livremente a qualquer momento.
            </div>

            {/* SE ESTÁ NÃO INICIADO */}
            {placementState.status === 'nao-iniciado' && (
              <div className="pf-eng-diag-start-card pf-card">
                <h3>Como funciona o nivelamento?</h3>
                <p>
                  São 8 questões objetivas abrangendo estruturas básicas e intermediárias de comunicação. Ao final, a plataforma sugere o nível recomendado para começar a praticar.
                </p>
                <div className="pf-actions">
                  <button
                    type="button"
                    className="pf-button primary"
                    onClick={handleStartPlacement}
                  >
                    Iniciar diagnóstico agora →
                  </button>
                  <a
                    href="https://learnenglish.britishcouncil.org/level"
                    target="_blank"
                    rel="noreferrer"
                    className="pf-button"
                  >
                    Fazer teste online do British Council ↗<span className="sr-only"> (nova aba)</span>
                  </a>
                </div>
              </div>
            )}

            {/* SE ESTÁ EM ANDAMENTO OU INTERROMPIDO */}
            {(placementState.status === 'em-andamento' || placementState.status === 'interrompido') && (
              <div className="pf-eng-diag-flow">
                {placementState.status === 'interrompido' && (
                  <div className="pf-hint pf-alert">
                    <strong>⏸️ Diagnóstico pausado:</strong> Suas respostas foram salvas. Clique em &ldquo;Continuar diagnóstico&rdquo; para prosseguir.
                  </div>
                )}

                <div className="pf-eng-diag-status-bar">
                  <div className="pf-eng-diag-step-counter">
                    <strong>
                      Questão {placementState.currentQuestionIndex + 1} de {initialPlacementQuestions.length}
                    </strong>
                    <span className="pf-meta">
                      ({Object.keys(placementState.answers).length} de {initialPlacementQuestions.length} respondidas)
                    </span>
                  </div>
                  <progress
                    className="pf-prof-progress-bar"
                    max={initialPlacementQuestions.length}
                    value={placementState.currentQuestionIndex + 1}
                    aria-label={`Progresso no diagnóstico: questão ${placementState.currentQuestionIndex + 1} de ${initialPlacementQuestions.length}`}
                  />
                </div>

                {(() => {
                  const q = initialPlacementQuestions[placementState.currentQuestionIndex];
                  const currentAnswer = placementState.answers[placementState.currentQuestionIndex];
                  const isLast =
                    placementState.currentQuestionIndex === initialPlacementQuestions.length - 1;

                  return (
                    <fieldset key={q.id} className="pf-card pf-eng-placement-q-card">
                      <legend>
                        <h3>{q.question}</h3>
                      </legend>

                      <div className="pf-eng-options">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = currentAnswer === optIdx;
                          return (
                            <label
                              key={optIdx}
                              className={`pf-check pf-eng-option-label ${
                                isSelected ? 'is-selected' : ''
                              }`}
                            >
                              <input
                                type="radio"
                                name={`diag-q-${q.id}`}
                                checked={isSelected}
                                disabled={placementState.status === 'interrompido'}
                                onChange={() =>
                                  handleAnswerPlacementQuestion(
                                    placementState.currentQuestionIndex,
                                    optIdx
                                  )
                                }
                              />
                              <span>{opt}</span>
                            </label>
                          );
                        })}
                      </div>

                      <div className="pf-eng-diag-nav-actions">
                        <button
                          type="button"
                          className="pf-button compact"
                          disabled={placementState.currentQuestionIndex === 0}
                          onClick={handlePlacementPrevQuestion}
                        >
                          ← Questão anterior
                        </button>

                        {!isLast ? (
                          <button
                            type="button"
                            className="pf-button primary compact"
                            disabled={currentAnswer === undefined}
                            onClick={handlePlacementNextQuestion}
                          >
                            Próxima questão →
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="pf-button primary compact"
                            disabled={
                              Object.keys(placementState.answers).length <
                              initialPlacementQuestions.length
                            }
                            onClick={handleFinalizePlacement}
                          >
                            Finalizar diagnóstico e ver resultado 🎯
                          </button>
                        )}

                        {placementState.status === 'em-andamento' ? (
                          <button
                            type="button"
                            className="pf-button compact"
                            onClick={handleStopPlacement}
                          >
                            ⏸️ Parar diagnóstico
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="pf-button primary compact"
                            onClick={handleResumePlacement}
                          >
                            ▶️ Continuar diagnóstico
                          </button>
                        )}
                      </div>
                    </fieldset>
                  );
                })()}
              </div>
            )}

            {/* SE ESTÁ CONCLUÍDO */}
            {placementState.status === 'concluido' && (
              <div className="pf-panel pf-eng-placement-result">
                <h3>🎉 Diagnóstico Concluído!</h3>
                <p>
                  Você acertou <strong>{placementState.score} de {initialPlacementQuestions.length} questões</strong> (
                  {Math.round(((placementState.score ?? 0) / initialPlacementQuestions.length) * 100)}%).
                </p>

                <div className="pf-hint pf-achieved">
                  <h4>
                    Nível de partida sugerido: <strong>{placementState.suggestedLevel}</strong>
                  </h4>
                  <p>
                    Com base no padrão das suas respostas, sugerimos focar nas competências e marcos do nível{' '}
                    <strong>{placementState.suggestedLevel}</strong>. Você tem total autonomia para estudar qualquer outro nível quando desejar.
                  </p>
                </div>

                <div className="pf-actions">
                  <button
                    type="button"
                    className="pf-button primary"
                    onClick={() => {
                      if (placementState.suggestedLevel) {
                        setStudyingLevel(placementState.suggestedLevel);
                      }
                      setView('exercicios', placementState.suggestedLevel);
                    }}
                  >
                    Começar no nível {placementState.suggestedLevel} →
                  </button>
                  <button
                    type="button"
                    className="pf-button"
                    onClick={handleRedoPlacement}
                  >
                    Refazer diagnóstico
                  </button>
                  <button
                    type="button"
                    className="pf-button"
                    onClick={handleUndoPlacement}
                  >
                    Desfazer conclusão
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* VIEW: CARREIRA INTERNACIONAL */}
      {activeView === 'carreira' && (
        <section className="pf-eng-view-career">
          <div className="pf-panel pf-eng-career-hero">
            <h2>Inglês para Carreira Internacional</h2>
            <p className="pf-lead">
              Trilha complementar recomendada a partir dos níveis B1 e B2, aberta a todos os estudantes.
              Desenvolva comunicação prática para processos seletivos globais, trabalho remoto assíncrono e
              colaboração intercultural em tecnologia e negócios.
            </p>
            <p className="pf-meta">
              8 módulos estratégicos práticos · Progresso atual:{' '}
              {engProgress.careerMilestonesDone.length} de {careerMilestones.length} tópicos concluídos.
            </p>
          </div>

          <div className="pf-cards">
            {careerMilestones.map((milestone, idx) => {
              const isDone = engProgress.careerMilestonesDone.includes(milestone.id);
              return (
                <article
                  key={milestone.id}
                  className={`pf-card pf-eng-career-card ${isDone ? 'pf-complete' : ''}`}
                >
                  <div className="pf-eng-card-top">
                    <span className="pf-kicker">
                      MÓDULO {idx + 1} · {milestone.area}
                    </span>
                    <span className={`pf-prof-status-tag ${isDone ? 'concluido' : 'em-andamento'}`}>
                      {isDone ? '✓ Concluído' : '○ Em estudo'}
                    </span>
                  </div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.summary}</p>

                  <div className="pf-hint">
                    <strong>Estratégias essenciais:</strong>
                    <ul>
                      {milestone.keyStrategies.map((strat, sIdx) => (
                        <li key={sIdx}>{strat}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pf-eng-phrases-box">
                    <strong>Frases e modelos úteis:</strong>
                    <ul>
                      {milestone.usefulPhrases.map((phrase, pIdx) => (
                        <li key={pIdx}>
                          <code>{phrase}</code>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p>
                    <strong>Cenário de prática:</strong> {milestone.scenario}
                  </p>
                  <p className="pf-meta">
                    <strong>Tarefa:</strong> {milestone.practiceTask}
                  </p>

                  <div className="pf-prof-milestone-action-bar">
                    <button
                      type="button"
                      className="pf-button compact"
                      onClick={() => copyToClipboard(milestone.aiPrompt, milestone.id)}
                    >
                      {copiedPromptId === milestone.id ? '✓ Prompt copiado!' : 'Copiar prompt para simulação com IA'}
                    </button>
                    {copyFeedbackFor(milestone.id)}
                    <button
                      type="button"
                      className={`pf-button ${isDone ? '' : 'primary'} compact`}
                      onClick={() => {
                        change(p => ({
                          ...p,
                          english: toggleEnglishCareerMilestone(p.english, milestone.id),
                        }));
                      }}
                    >
                      {isDone ? 'Reabrir módulo' : 'Concluir módulo (+40 XP)'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* VIEW: REVISÃO ESPAÇADA */}
      {activeView === 'revisao' && (
        <section className="pf-eng-view-spaced-review">
          <div className="pf-panel">
            <h2>Revisão Espaçada de Expressões e Estruturas</h2>
            <p className="pf-lead">
              Mecanismo local simples para fixar vocabulário comunicativo, expressões de trabalho e estruturas
              recorrentes. Sem algoritmos complicados ou punições: revise o que marcou e acompanhe o que já praticou.
            </p>

            <div className="pf-tools">
              <button
                type="button"
                className={`pf-button compact ${reviewModeFilter === 'todos' ? 'primary' : ''}`}
                onClick={() => setReviewModeFilter('todos')}
              >
                Todas as expressões ({englishReviewItems.length})
              </button>
              <button
                type="button"
                className={`pf-button compact ${reviewModeFilter === 'pendentes' ? 'primary' : ''}`}
                onClick={() => setReviewModeFilter('pendentes')}
              >
                O que revisar ({englishReviewItems.filter(i => !(engProgress.reviewedItemIds ?? []).includes(i.id)).length})
              </button>
              <button
                type="button"
                className={`pf-button compact ${reviewModeFilter === 'concluidos' ? 'primary' : ''}`}
                onClick={() => setReviewModeFilter('concluidos')}
              >
                O que já revisei ({(engProgress.reviewedItemIds ?? []).length})
              </button>
            </div>
          </div>

          <div className="pf-cards">
            {englishReviewItems
              .filter(item => {
                const isReviewed = (engProgress.reviewedItemIds ?? []).includes(item.id);
                if (reviewModeFilter === 'pendentes') return !isReviewed;
                if (reviewModeFilter === 'concluidos') return isReviewed;
                return true;
              })
              .map(item => {
                const isRevealed = revealedReviewId === item.id;
                const isReviewed = (engProgress.reviewedItemIds ?? []).includes(item.id);

                return (
                  <article key={item.id} className="pf-card pf-eng-review-item">
                    <div className="pf-tags">
                      <span>Nível {item.level}</span>
                      <span>{skillLabels[item.skill].label}</span>
                      <span>{item.category}</span>
                      {isReviewed && <span className="pf-badge-done">✓ Revisado</span>}
                    </div>
                    <h3>&ldquo;{item.phrase}&rdquo;</h3>
                    <p className="pf-meta">
                      <strong>Contexto:</strong> {item.contextEn}
                    </p>

                    {isRevealed ? (
                      <div className="pf-hint">
                        <strong>Significado em Português:</strong>
                        <p>{item.meaningPt}</p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="pf-button compact"
                        onClick={() => setRevealedReviewId(item.id)}
                      >
                        Revelar significado em português
                      </button>
                    )}

                    <div className="pf-actions">
                      <button
                        type="button"
                        className={`pf-button compact ${isReviewed ? '' : 'primary'}`}
                        onClick={() => {
                          change(p => ({
                            ...p,
                            english: toggleEnglishSpacedReviewItem(p.english, item.id),
                          }));
                        }}
                      >
                        {isReviewed ? 'Desmarcar revisão' : 'Marcar como revisado (+10 XP)'}
                      </button>
                    </div>
                  </article>
                );
              })}
          </div>
        </section>
      )}

      {/* VIEW: BIBLIOTECA & RECURSOS */}
      {activeView === 'biblioteca' && (
        <section className="pf-eng-view-library">
          <div className="pf-panel">
            <h2>Biblioteca de Recursos Curados e Livros</h2>
            <p className="pf-lead">
              Materiais recomendados com verificação documental, links oficiais diretos e livros clássicos de apoio.
              Capas reais verificadas servidas localmente com fallback acessível tipográfico.
            </p>
            <div className="pf-tools">
              <label htmlFor={bookStatusFilterId} className="pf-field">
                Filtrar leitura de livros
                <select
                  id={bookStatusFilterId}
                  value={bookFilter}
                  onChange={e =>
                    setBookFilter(e.target.value as 'todos' | 'pretendo-ler' | 'lendo' | 'concluido')
                  }
                >
                  <option value="todos">Todos os livros recomendados ({englishBooks.length})</option>
                  <option value="pretendo-ler">Pretendo ler</option>
                  <option value="lendo">Lendo atualmente</option>
                  <option value="concluido">Concluídos</option>
                </select>
              </label>
            </div>
          </div>

          <h3>Livros de Referência Recomendados</h3>
          <div className="pf-cards">
            {englishBooks
              .filter(b => bookFilter === 'todos' || engProgress.books[b.id] === bookFilter)
              .map(book => {
                const status = engProgress.books[book.id];
                return (
                  <article key={book.id} className="pf-card pf-book">
                    <BookCover b={book} />
                    <h3>{book.title}</h3>
                    <p className="pf-meta">
                      {book.author} · {book.edition} ({book.year})
                    </p>
                    <div className="pf-tags">
                      <span>{book.language}</span>
                      <span>{book.level}</span>
                      <span>Livro de apoio</span>
                    </div>
                    <p>
                      <strong>Por que recomendamos:</strong> {book.reason}
                    </p>
                    <p className="pf-meta">{book.note}</p>

                    <div className="pf-reading-controls">
                      <span className="pf-meta">Meu controle de leitura:</span>
                      <div className="pf-reading-buttons">
                        <button
                          type="button"
                          className={`pf-reading-btn ${status === 'pretendo-ler' ? 'is-active' : ''}`}
                          aria-pressed={status === 'pretendo-ler'}
                          onClick={() => {
                            change(p => ({
                              ...p,
                              english: updateEnglishBookStatus(p.english, book.id, 'pretendo-ler'),
                            }));
                          }}
                        >
                          Pretendo ler
                        </button>
                        <button
                          type="button"
                          className={`pf-reading-btn ${status === 'lendo' ? 'is-active' : ''}`}
                          aria-pressed={status === 'lendo'}
                          onClick={() => {
                            change(p => ({
                              ...p,
                              english: updateEnglishBookStatus(p.english, book.id, 'lendo'),
                            }));
                          }}
                        >
                          Lendo
                        </button>
                        <button
                          type="button"
                          className={`pf-reading-btn ${status === 'concluido' ? 'is-active' : ''}`}
                          aria-pressed={status === 'concluido'}
                          onClick={() => {
                            change(p => ({
                              ...p,
                              english: updateEnglishBookStatus(p.english, book.id, 'concluido'),
                            }));
                          }}
                        >
                          Concluído (+30 XP)
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
          </div>

          <h3 className="pf-eng-mt">Portais Oficiais e Recursos Gratuitos</h3>
          <div className="pf-cards">
            {englishReferences.map(ref => (
              <article key={ref.id} className="pf-card pf-reference">
                <div className="pf-tags">
                  <span>{ref.language}</span>
                  <span>{ref.cost}</span>
                  <span>{ref.type}</span>
                </div>
                <h4>
                  <a href={ref.url} target="_blank" rel="noreferrer">
                    {ref.title} ↗<span className="sr-only"> (nova aba)</span>
                  </a>
                </h4>
                <p>
                  <strong>Recorte:</strong> {ref.section}
                </p>
                {ref.note && <p className="pf-meta">{ref.note}</p>}
                <p className="pf-meta">Acesso verificado em: {ref.checked} · adequação confirmada.</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* VIEW: EXAMES OFICIAIS */}
      {activeView === 'exames' && (
        <section className="pf-eng-view-exams">
          <div className="pf-panel">
            <h2>Guia Informativo de Exames Oficiais</h2>
            <p className="pf-lead">
              Esclarecimentos sobre os principais exames internacionais de proficiência em língua inglesa:
              Cambridge English Qualifications, IELTS e TOEFL iBT.
            </p>
            <div className="pf-hint">
              <strong>Aviso de isenção de vínculo:</strong> O StackTrail não possui qualquer vínculo com a ETS,
              Universidade de Cambridge, British Council ou IDP. Os exames possuem objetivos, formatos, custos e
              políticas próprias. Concluir etapas no StackTrail não equivale a nota ou certificado oficial.
            </div>
          </div>

          <div className="pf-cards">
            {officialExamsInfo.map(exam => (
              <article key={exam.id} className="pf-card pf-eng-exam-card">
                <span className="pf-kicker">{exam.provider}</span>
                <h3>{exam.name}</h3>
                <p>
                  <strong>Público-alvo e finalidade:</strong> {exam.targetAudience}
                </p>
                <p>
                  <strong>Formato do exame:</strong> {exam.formatSummary}
                </p>
                <div className="pf-hint">
                  <strong>Escala de pontuação:</strong>
                  <p>{exam.scaleDescription}</p>
                </div>
                <p className="pf-meta">
                  <strong>Validade formal:</strong> {exam.validity}
                </p>

                <strong>Pontos de atenção essenciais:</strong>
                <ul>
                  {exam.importantNotes.map((note, nIdx) => (
                    <li key={nIdx}>{note}</li>
                  ))}
                </ul>

                <div className="pf-actions">
                  <a
                    href={exam.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pf-button compact"
                  >
                    Portal Oficial de Informações ↗<span className="sr-only"> (nova aba)</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* VIEW: CONQUISTAS */}
      {activeView === 'conquistas' && (
        <section className="pf-eng-view-achievements">
          <div className="pf-panel">
            <h2>Conquistas & Gamificação</h2>
            <p className="pf-lead">
              Acompanhe suas realizações baseadas em ações verificáveis na plataforma. Sem recompensas vazias por
              simples cliques: conquistas refletem práticas reais e marcos atingidos.
            </p>
            <div className="pf-eng-hero-badges">
              <span className="pf-eng-pill">
                ⭐ Total de XP: <strong>{engProgress.xp}</strong>
              </span>
              <span className="pf-eng-pill">
                🏆 Conquistas desbloqueadas:{' '}
                <strong>
                  {englishAchievements.filter(a => a.isUnlocked(engProgress)).length} de{' '}
                  {englishAchievements.length}
                </strong>
              </span>
            </div>
          </div>

          <div className="pf-cards">
            {englishAchievements.map(ach => {
              const isUnlocked = ach.isUnlocked(engProgress);
              return (
                <article
                  key={ach.id}
                  className={`pf-card pf-prof-achievement-card ${isUnlocked ? 'is-unlocked' : 'is-locked'}`}
                >
                  <div className="pf-prof-achievement-top">
                    <span className="pf-prof-ach-icon">{ach.icon}</span>
                    <span className={`pf-tag-badge ${isUnlocked ? 'tag-unlocked' : 'tag-locked'}`}>
                      {isUnlocked ? '✓ Desbloqueada' : 'Bloqueada'}
                    </span>
                  </div>
                  <h3>{ach.title}</h3>
                  <p>{ach.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      )}
      </div>
    </div>
  );
}

// Subcomponente de Card de Exercício
interface ExerciseCardProps {
  exercise: EnglishExercise;
  attempt?: EnglishExerciseAttempt;
  isTargeted?: boolean;
  onStart: () => void;
  onStop: () => void;
  onResume: () => void;
  onRedo: () => void;
  onUndo: () => void;
  onUpdateDraft: (patch: Partial<EnglishExerciseAttempt>) => void;
  onSubmitObjective: (selectedOption?: number, textAnswer?: string) => void;
  onSubmitProductive: (checks: boolean[]) => void;
  onToggleReview: () => void;
  onCopyPrompt: (promptText: string) => void;
  isCopied: boolean;
  copyFeedback: React.ReactNode;
}

function ExerciseCard({
  exercise,
  attempt,
  isTargeted,
  onStart,
  onStop,
  onResume,
  onRedo,
  onUndo,
  onUpdateDraft,
  onSubmitObjective,
  onSubmitProductive,
  onToggleReview,
  onCopyPrompt,
  isCopied,
  copyFeedback,
}: ExerciseCardProps) {
  const status = attempt?.status ?? 'nao-iniciado';
  const isConcluido = status === 'concluido';
  const isInterrompido = status === 'interrompido';
  const isEmAndamento = status === 'em-andamento';

  const selectedRadio =
    typeof attempt?.selectedOption === 'number' ? attempt.selectedOption : undefined;
  const textInput = attempt?.textAnswer ?? '';
  const checks =
    attempt?.selfAssessedChecks ?? (exercise.selfAssessmentChecks?.map(() => false) ?? []);

  const isObjective =
    exercise.type === 'multiple-choice' ||
    exercise.type === 'fill-blank' ||
    exercise.type === 'reading';

  const canSubmitObjective =
    selectedRadio !== undefined || textInput.trim().length > 0;
  const canSubmitProductive =
    checks.length > 0 && checks.every(Boolean);

  return (
    <article
      id={`ex-${exercise.id}`}
      tabIndex={-1}
      className={`pf-card pf-eng-exercise-card ${isConcluido ? 'pf-complete' : ''} ${
        isTargeted ? 'is-targeted' : ''
      }`}
    >
      <div className="pf-eng-card-top">
        <span className="pf-kicker">
          {skillLabels[exercise.skill].icon} {skillLabels[exercise.skill].label} · NÍVEL {exercise.level}
        </span>
        <div className="pf-actions">
          <span
            className={`pf-prof-status-tag ${
              isConcluido
                ? 'concluido'
                : isInterrompido
                ? 'interrompido'
                : isEmAndamento
                ? 'em-andamento'
                : 'nao-iniciado'
            }`}
          >
            {isConcluido
              ? '✓ Concluído'
              : isInterrompido
              ? '⏸️ Interrompido'
              : isEmAndamento
              ? '▶️ Em andamento'
              : '○ Não iniciado'}
          </span>
          <button
            type="button"
            className={`pf-eng-star-btn ${attempt?.markedForReview ? 'is-starred' : ''}`}
            onClick={onToggleReview}
            title={attempt?.markedForReview ? 'Marcado para revisão' : 'Marcar para revisar depois'}
            aria-label={attempt?.markedForReview ? 'Marcado para revisão' : 'Marcar para revisar depois'}
            aria-pressed={!!attempt?.markedForReview}
          >
            {attempt?.markedForReview ? '★ Revisar' : '☆ Marcar'}
          </button>
        </div>
      </div>

      <h3>{exercise.title}</h3>
      <p className="pf-meta">Tema: {exercise.theme}</p>

      {/* ÁUDIO LEGÍTIMO EXTERNO SE FOR LISTENING */}
      {exercise.audioUrl && (
        <div className="pf-hint pf-eng-audio-box">
          <strong>🎧 Recurso de áudio legítimo:</strong>
          <p>{exercise.audioSource}</p>
          <a href={exercise.audioUrl} target="_blank" rel="noreferrer" className="pf-button compact">
            Ouvir áudio no portal oficial ↗<span className="sr-only"> (nova aba)</span>
          </a>
        </div>
      )}

      {/* TEXTO DE LEITURA SE HOUVER */}
      {exercise.passage && (
        <blockquote className="pf-eng-passage">
          <p>{exercise.passage}</p>
        </blockquote>
      )}

      {/* ENUNCIADO */}
      <p className="pf-eng-statement">{exercise.statement}</p>

      {/* CENÁRIO PARA FALA / ROLEPLAY */}
      {exercise.scenario && (
        <div className="pf-hint">
          <strong>Cenário de conversação:</strong>
          <p>{exercise.scenario}</p>
        </div>
      )}

      {/* FRASES ÚTEIS SE HOUVER */}
      {exercise.usefulPhrases && exercise.usefulPhrases.length > 0 && (
        <div className="pf-eng-phrases-box">
          <strong>Expressões recomendadas para usar:</strong>
          <ul>
            {exercise.usefulPhrases.map((phrase, pIdx) => (
              <li key={pIdx}>
                <code>{phrase}</code>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CONTROLE INTERATIVO: MÚLTIPLA ESCOLHA OU LEITURA */}
      {(exercise.type === 'multiple-choice' || exercise.type === 'reading') && exercise.options && (
        <div className="pf-eng-options">
          {exercise.options.map((opt, optIdx) => {
            const isSelected = selectedRadio === optIdx;
            const isCorrect = exercise.expectedAnswer === optIdx;
            return (
              <label
                key={optIdx}
                className={`pf-check pf-eng-option-label ${
                  isConcluido
                    ? isCorrect
                      ? 'is-correct'
                      : isSelected
                      ? 'is-wrong'
                      : ''
                    : isSelected
                    ? 'is-selected'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name={`ex-${exercise.id}`}
                  checked={isSelected}
                  onChange={() => {
                    onUpdateDraft({
                      selectedOption: optIdx,
                      status: status === 'nao-iniciado' ? 'em-andamento' : status,
                    });
                  }}
                  disabled={isConcluido}
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
      )}

      {/* CONTROLE INTERATIVO: PREENCHER LACUNA */}
      {exercise.type === 'fill-blank' && (
        <div className="pf-field">
          <label>
            Sua resposta:
            <input
              type="text"
              value={textInput}
              disabled={isConcluido}
              onChange={e => {
                onUpdateDraft({
                  textAnswer: e.target.value,
                  status: status === 'nao-iniciado' ? 'em-andamento' : status,
                });
              }}
              placeholder="Digite a palavra aqui..."
            />
          </label>
        </div>
      )}

      {/* FEEDBACK EXPLICATIVO IMEDIATO */}
      {isConcluido && isObjective && (
        <div className={`pf-hint ${attempt?.isCorrect ? 'pf-achieved' : 'pf-alert'}`}>
          <strong>{attempt?.isCorrect ? '✓ Resposta correta!' : '✕ Não foi desta vez.'}</strong>
          <p>{exercise.explanation}</p>
        </div>
      )}

      {/* RUBRICA DE AUTOAVALIAÇÃO SE FOR SUBJETIVO (SPEAKING / WRITING) */}
      {exercise.selfAssessmentChecks && exercise.selfAssessmentChecks.length > 0 && (
        <div className="pf-eng-rubric-box">
          <strong>Critérios de autoavaliação (marque após praticar):</strong>
          {exercise.selfAssessmentChecks.map((crit, cIdx) => (
            <label key={cIdx} className="pf-check">
              <input
                type="checkbox"
                checked={checks[cIdx] ?? false}
                disabled={isConcluido}
                onChange={e => {
                  const nextChecks = [...checks];
                  nextChecks[cIdx] = e.target.checked;
                  onUpdateDraft({
                    selfAssessedChecks: nextChecks,
                    status: status === 'nao-iniciado' ? 'em-andamento' : status,
                  });
                }}
              />
              <span>{crit}</span>
            </label>
          ))}
        </div>
      )}

      {/* PROMPT PARA REVISÃO EXTERNA COM IA */}
      {exercise.aiPrompt && (
        <div className="pf-eng-prompt-box">
          <button
            type="button"
            className="pf-button compact"
            onClick={() => onCopyPrompt(exercise.aiPrompt!)}
          >
            {isCopied ? '✓ Prompt copiado!' : 'Copiar prompt para prática com IA'}
          </button>
          {copyFeedback}
        </div>
      )}

      {/* BARRA DE AÇÕES COM CICLO DE VIDA COMPLETO */}
      <div className="pf-eng-exercise-action-bar pf-actions">
        {status === 'nao-iniciado' && (
          <button
            type="button"
            className="pf-button primary compact"
            onClick={onStart}
          >
            Iniciar exercício ▶
          </button>
        )}

        {status === 'em-andamento' && (
          <>
            {isObjective && (
              <button
                type="button"
                className="pf-button primary compact"
                disabled={!canSubmitObjective}
                onClick={() => onSubmitObjective(selectedRadio, textInput)}
              >
                Conferir resposta (+15 XP)
              </button>
            )}

            {!isObjective && (
              <button
                type="button"
                className="pf-button primary compact"
                disabled={!canSubmitProductive}
                onClick={() => onSubmitProductive(checks)}
              >
                Registrar conclusão da prática (+25 XP)
              </button>
            )}

            <button
              type="button"
              className="pf-button compact"
              onClick={onStop}
            >
              ⏸️ Parar
            </button>
          </>
        )}

        {status === 'interrompido' && (
          <>
            <button
              type="button"
              className="pf-button primary compact"
              onClick={onResume}
            >
              ▶️ Continuar exercício
            </button>

            {isObjective && canSubmitObjective && (
              <button
                type="button"
                className="pf-button compact"
                onClick={() => onSubmitObjective(selectedRadio, textInput)}
              >
                Conferir resposta (+15 XP)
              </button>
            )}

            {!isObjective && canSubmitProductive && (
              <button
                type="button"
                className="pf-button compact"
                onClick={() => onSubmitProductive(checks)}
              >
                Registrar conclusão (+25 XP)
              </button>
            )}
          </>
        )}

        {status === 'concluido' && (
          <>
            <button
              type="button"
              className="pf-button compact"
              onClick={onRedo}
            >
              Refazer exercício
            </button>
            <button
              type="button"
              className="pf-button compact"
              onClick={onUndo}
            >
              Desfazer conclusão
            </button>
          </>
        )}
      </div>
    </article>
  );
}
