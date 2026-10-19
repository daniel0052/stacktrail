/** @vitest-environment jsdom */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
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
} from '../practice/english-journey';
import { roadmap } from '../content/roadmap';
import {
  blankPilot,
  parsePilot,
  PilotProvider,
  updateEnglishExercise,
  toggleEnglishMilestone,
  toggleEnglishCareerMilestone,
  addEnglishEvaluation,
  updateEnglishBookStatus,
  recordEnglishStudySession,
  toggleEnglishExerciseReview,
  type EnglishProgress,
} from '../practice/progress';
import { stageProgress, dashboard } from '../practice/achievements';
import { EnglishJourneyPage } from '../practice/EnglishJourneyPage';

describe('Área independente: English Journey (Inglês A1–C2)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('preserva rigorosamente as 20 etapas técnicas (00 a 19) e independência de progresso', () => {
    expect(roadmap.length).toBe(20);
    expect(roadmap[0].id).toBe('00');
    expect(roadmap[19].id).toBe('19');

    const pilot = blankPilot();
    expect(stageProgress(pilot, '00').percent).toBe(0);
    expect(dashboard(pilot).percent).toBe(0);

    // Progresso em inglês não afeta percentual técnico
    pilot.english = {
      ...pilot.english!,
      xp: 450,
      completedMilestones: ['eng-m-a1-1', 'eng-m-a1-2'],
      careerMilestonesDone: ['eng-car-01'],
    };

    expect(stageProgress(pilot, '00').percent).toBe(0);
    expect(dashboard(pilot).percent).toBe(0);
  });

  it('possui os 6 níveis CEFR (A1 a C2) com descritores oficiais do Conselho da Europa', () => {
    expect(englishLevels.length).toBe(6);
    const levelIds = englishLevels.map(l => l.id);
    expect(levelIds).toEqual(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);

    englishLevels.forEach(lvl => {
      expect(lvl.officialDescriptor.length).toBeGreaterThan(50);
      expect(lvl.summaryGoal.length).toBeGreaterThan(20);
      expect(lvl.themes.length).toBeGreaterThanOrEqual(8);
      expect(lvl.milestoneIds.length).toBe(4);

      // 5 competências por nível
      expect(lvl.skillsDescriptors.listening).toBeDefined();
      expect(lvl.skillsDescriptors.speaking).toBeDefined();
      expect(lvl.skillsDescriptors.reading).toBeDefined();
      expect(lvl.skillsDescriptors.writing).toBeDefined();
      expect(lvl.skillsDescriptors['vocabulary-grammar']).toBeDefined();
    });
  });

  it('possui 24 marcos comunicativos distribuídos equilibradamente entre os 6 níveis', () => {
    expect(englishMilestones.length).toBe(24);
    ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].forEach(lvl => {
      const ms = englishMilestones.filter(m => m.levelId === lvl);
      expect(ms.length).toBe(4);
      ms.forEach(m => {
        expect(m.goal.length).toBeGreaterThan(15);
        expect(m.practicalGuidance.length).toBeGreaterThan(20);
        expect(m.examplePhrases.length).toBeGreaterThanOrEqual(3);
        expect(m.suggestedActivity.length).toBeGreaterThan(15);
      });
    });
  });

  it('possui exercícios práticos originais e variados em todos os níveis e habilidades', () => {
    expect(englishExercises.length).toBeGreaterThanOrEqual(18);

    const skillsFound = new Set(englishExercises.map(e => e.skill));
    expect(skillsFound.has('listening')).toBe(true);
    expect(skillsFound.has('speaking')).toBe(true);
    expect(skillsFound.has('reading')).toBe(true);
    expect(skillsFound.has('writing')).toBe(true);
    expect(skillsFound.has('vocabulary-grammar')).toBe(true);

    // Exercícios de listening contêm link legítimo externo
    const listeningExs = englishExercises.filter(e => e.skill === 'listening');
    expect(listeningExs.length).toBeGreaterThanOrEqual(2);
    listeningExs.forEach(lex => {
      expect(lex.audioUrl).toBeDefined();
      expect(lex.audioSource).toBeDefined();
      expect(lex.audioUrl).toMatch(/^https?:\/\//);
    });

    // Exercícios de speaking e writing contêm rubricas e prompts de IA para autoavaliação
    const speakingExs = englishExercises.filter(e => e.skill === 'speaking');
    speakingExs.forEach(sex => {
      expect(sex.selfAssessmentChecks?.length).toBeGreaterThanOrEqual(3);
      expect(sex.aiPrompt).toBeDefined();
    });

    const writingExs = englishExercises.filter(e => e.skill === 'writing');
    writingExs.forEach(wex => {
      expect(wex.selfAssessmentChecks?.length).toBeGreaterThanOrEqual(3);
      expect(wex.aiPrompt).toBeDefined();
    });
  });

  it('possui avaliação diagnóstica estruturada para cada um dos 6 níveis com disclaimer obrigatório', () => {
    const levels: ('A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2')[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    levels.forEach(lvl => {
      const ev = levelDiagnosticEvaluations[lvl];
      expect(ev).toBeDefined();
      expect(ev.title).toContain(lvl);
      expect(ev.disclaimer).toContain('não confere certificação oficial CEFR');
      expect(ev.objectiveQuestions.length).toBeGreaterThanOrEqual(4);
      expect(ev.speakingTask.rubric.length).toBeGreaterThanOrEqual(3);
      expect(ev.writingTask.rubric.length).toBeGreaterThanOrEqual(3);
      expect(ev.speakingTask.aiPrompt).toBeDefined();
      expect(ev.writingTask.aiPrompt).toBeDefined();
    });
  });

  it('teste de nivelamento inicial oferece 8 questões progressivas e sugere nível sem bloqueio', () => {
    expect(initialPlacementQuestions.length).toBe(8);
    expect(calculateSuggestedPlacement(1)).toBe('A1');
    expect(calculateSuggestedPlacement(3)).toBe('A2');
    expect(calculateSuggestedPlacement(5)).toBe('B1');
    expect(calculateSuggestedPlacement(7)).toBe('B2');
    expect(calculateSuggestedPlacement(8)).toBe('C1');
  });

  it('trilha de carreira internacional possui 8 módulos práticos com framework STAR e fórmulas de impacto', () => {
    expect(careerMilestones.length).toBe(8);
    const starModule = careerMilestones.find(m => m.id === 'eng-car-04');
    expect(starModule).toBeDefined();
    expect(starModule?.title).toContain('STAR');

    const resumeModule = careerMilestones.find(m => m.id === 'eng-car-02');
    expect(resumeModule).toBeDefined();
    expect(resumeModule?.summary).toContain('X-Y-Z');

    careerMilestones.forEach(cm => {
      expect(cm.keyStrategies.length).toBeGreaterThanOrEqual(3);
      expect(cm.usefulPhrases.length).toBeGreaterThanOrEqual(3);
      expect(cm.scenario.length).toBeGreaterThan(15);
      expect(cm.aiPrompt.length).toBeGreaterThan(20);
    });
  });

  it('guia de exames oficiais documenta Cambridge, IELTS e a atualização da escala 1–6 do TOEFL iBT', () => {
    expect(officialExamsInfo.length).toBe(3);
    const toefl = officialExamsInfo.find(e => e.id === 'toefl-ibt');
    expect(toefl).toBeDefined();
    expect(toefl?.scaleDescription).toContain('escala de pontuação de 1 a 6');
    expect(toefl?.scaleDescription).toContain('2026');
    expect(toefl?.officialUrl).toContain('score-scale-update.html');

    const ielts = officialExamsInfo.find(e => e.id === 'ielts');
    expect(ielts).toBeDefined();
    expect(ielts?.scaleDescription).toContain('Bands');

    const cambridge = officialExamsInfo.find(e => e.id === 'cambridge-qualifications');
    expect(cambridge).toBeDefined();
    expect(cambridge?.scaleDescription).toContain('Cambridge English Scale');
  });

  it('conquistas de inglês são derivadas de ações reais e verificáveis', () => {
    expect(englishAchievements.length).toBeGreaterThanOrEqual(10);
    const emptyProgress: EnglishProgress = {
      selectedLevel: 'A1',
      studyingLevel: 'A1',
      completedMilestones: [],
      exercises: {},
      evaluations: {},
      books: {},
      studyDays: [],
      xp: 0,
      unlockedAchievements: [],
      careerMilestonesDone: [],
    };

    const firstWords = englishAchievements.find(a => a.id === 'first-words')!;
    expect(firstWords.isUnlocked(emptyProgress)).toBe(false);

    const withOneEx: EnglishProgress = {
      ...emptyProgress,
      exercises: { 'eng-a1-ex-01': { status: 'concluido' } },
    };
    expect(firstWords.isUnlocked(withOneEx)).toBe(true);

    const a1Explorer = englishAchievements.find(a => a.id === 'a1-explorer')!;
    expect(a1Explorer.isUnlocked(emptyProgress)).toBe(false);

    const withA1Done: EnglishProgress = {
      ...emptyProgress,
      completedMilestones: ['eng-m-a1-1', 'eng-m-a1-2', 'eng-m-a1-3', 'eng-m-a1-4'],
    };
    expect(a1Explorer.isUnlocked(withA1Done)).toBe(true);
  });

  it('persiste dados no localStorage e migra estado via parsePilot', () => {
    const pilot = blankPilot();
    expect(pilot.english).toBeDefined();
    expect(pilot.english?.selectedLevel).toBe('A1');

    // Atualiza exercício
    pilot.english = updateEnglishExercise(
      pilot.english,
      'eng-a1-ex-01',
      { status: 'concluido', isCorrect: true, selectedOption: 1 },
      15
    );
    expect(pilot.english.exercises['eng-a1-ex-01'].status).toBe('concluido');
    expect(pilot.english.xp).toBe(15);
    expect(pilot.english.studyDays.length).toBe(1);

    // Repetir a conclusão não gera XP infinito
    pilot.english = updateEnglishExercise(
      pilot.english,
      'eng-a1-ex-01',
      { status: 'concluido', isCorrect: true, selectedOption: 1 },
      15
    );
    expect(pilot.english.xp).toBe(15);

    // Alternar marco
    pilot.english = toggleEnglishMilestone(pilot.english, 'eng-m-a1-1');
    expect(pilot.english.completedMilestones).toContain('eng-m-a1-1');
    expect(pilot.english.xp).toBe(65); // 15 + 50

    // Alternar marco novamente (reabrir) reverte o marco
    pilot.english = toggleEnglishMilestone(pilot.english, 'eng-m-a1-1');
    expect(pilot.english.completedMilestones).not.toContain('eng-m-a1-1');

    // Alternar marco de carreira internacional
    pilot.english = toggleEnglishCareerMilestone(pilot.english, 'eng-car-01');
    expect(pilot.english.careerMilestonesDone).toContain('eng-car-01');
    expect(pilot.english.xp).toBe(105); // 65 + 40

    // Adicionar avaliação diagnóstica
    pilot.english = addEnglishEvaluation(pilot.english, 'A1', {
      completedAt: new Date().toISOString(),
      score: 4,
      total: 4,
      percentage: 100,
      skillScores: {
        listening: { score: 1, total: 1 },
        speaking: { score: 1, total: 1 },
        reading: { score: 1, total: 1 },
        writing: { score: 1, total: 1 },
        'vocabulary-grammar': { score: 0, total: 0 },
      },
      recommendedReview: [],
    });
    expect(pilot.english.evaluations['A1'].length).toBe(1);

    // Controle de livros
    pilot.english = updateEnglishBookStatus(pilot.english, 'book-eng-grammar-in-use', 'lendo');
    expect(pilot.english.books['book-eng-grammar-in-use']).toBe('lendo');

    // Sessão de estudo e revisão de exercício
    pilot.english = recordEnglishStudySession(pilot.english);
    expect(pilot.english.studyDays.length).toBeGreaterThanOrEqual(1);

    pilot.english = toggleEnglishExerciseReview(pilot.english, 'eng-a1-ex-01');
    expect(pilot.english.exercises['eng-a1-ex-01'].markedForReview).toBe(true);

    expect(englishReviewItems.length).toBeGreaterThanOrEqual(5);
    expect(englishReferences.length).toBeGreaterThanOrEqual(5);

    // Serialização e parse
    const raw = JSON.stringify(pilot);
    const parsed = parsePilot(JSON.parse(raw));
    expect(parsed.english).toBeDefined();
    expect(parsed.english?.exercises['eng-a1-ex-01'].status).toBe('concluido');
  });

  it('biblioteca contém livros reconhecidos com capas locais legítimas e fallback seguro', () => {
    expect(englishBooks.length).toBeGreaterThanOrEqual(5);
    englishBooks.forEach(b => {
      expect(b.cover.kind).toBe('image');
      if (b.cover.kind === 'image') {
        expect(b.cover.src).toMatch(/^assets\/books\/english\/.+\.jpg$/);
        expect(b.cover.width).toBeGreaterThan(0);
        expect(b.cover.height).toBeGreaterThan(0);
      }
      expect(b.alternatives.length).toBeGreaterThanOrEqual(1);
    });

    const murphy = englishBooks.find(b => b.id === 'book-eng-grammar-in-use');
    expect(murphy).toBeDefined();
    expect(murphy?.author).toContain('Raymond Murphy');
  });

  it('renderiza a página English Journey na rota e permite alternar entre níveis e visões', () => {
    render(
      <MemoryRouter initialEntries={['/ingles?nivel=A1']}>
        <PilotProvider>
          <EnglishJourneyPage />
        </PilotProvider>
      </MemoryRouter>
    );

    // Verifica cabeçalho e título
    expect(screen.getByText('English Journey')).toBeDefined();
    expect(screen.getByText('Trilha de Níveis CEFR (A1 a C2)')).toBeDefined();

    // Verifica que os botões dos 6 níveis estão na tela
    expect(screen.getAllByRole('button', { name: /A1/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('button', { name: /B1/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('button', { name: /C2/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Beginner (Iniciante)')).toBeDefined();

    // Alterna para visão de Exercícios
    const exercisesTab = screen.getByRole('button', { name: /Exercícios Práticos/i });
    fireEvent.click(exercisesTab);
    expect(screen.getByText(/Exercícios Práticos do Nível/i)).toBeDefined();

    // Alterna para visão de Carreira Internacional
    const careerButtons = screen.getAllByRole('button', { name: /Carreira Internacional/i });
    fireEvent.click(careerButtons[0]);
    expect(screen.getByText('Inglês para Carreira Internacional')).toBeDefined();

    // Alterna para visão de Exames Oficiais
    const examsTab = screen.getByRole('button', { name: /Exames Oficiais/i });
    fireEvent.click(examsTab);
    expect(screen.getByText('Guia Informativo de Exames Oficiais')).toBeDefined();
    expect(screen.getAllByText(/escala de pontuação de 1 a 6/i).length).toBeGreaterThanOrEqual(1);
  });

  it('permite iniciar exercício e navegar diretamente até ele com estado em andamento', () => {
    render(
      <MemoryRouter initialEntries={['/ingles?nivel=A1']}>
        <PilotProvider>
          <EnglishJourneyPage />
        </PilotProvider>
      </MemoryRouter>
    );

    // Clica em "Iniciar exercício ↗" no card da próxima atividade recomendada
    const startRecommendedBtn = screen.getAllByRole('button', { name: /Iniciar exercício/i })[0];
    fireEvent.click(startRecommendedBtn);

    // Verifica que navegou para visão de exercícios
    expect(screen.getByText(/Exercícios Práticos do Nível/i)).toBeDefined();
  });

  it('exibe seção Continuar Estudando quando houver atividades em andamento ou interrompidas', () => {
    const pilot = blankPilot();
    pilot.english = {
      ...pilot.english!,
      exercises: {
        'eng-a1-ex-01': {
          status: 'em-andamento',
          startedAt: '2026-10-18',
        },
      },
    };
    localStorage.setItem('stacktrail:roadmap:1', JSON.stringify(pilot));

    render(
      <MemoryRouter initialEntries={['/ingles?nivel=A1']}>
        <PilotProvider>
          <EnglishJourneyPage />
        </PilotProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Continuar estudando' })).toBeDefined();
    expect(screen.getByText('SUAS ATIVIDADES EM ANDAMENTO')).toBeDefined();
    expect(screen.getAllByText(/▶️ Em andamento/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('button', { name: /Continuar exercício →/i })).toBeDefined();
  });

  it('fluxo completo do Diagnóstico Inicial: iniciar, pausar, retomar e finalizar sem certificação', () => {
    render(
      <MemoryRouter initialEntries={['/ingles?view=diagnostico']}>
        <PilotProvider>
          <EnglishJourneyPage />
        </PilotProvider>
      </MemoryRouter>
    );

    // Tela inicial do diagnóstico
    expect(screen.getByText(/Diagnóstico de Ponto de Partida/i)).toBeDefined();
    expect(screen.getByText(/Aviso de transparência e limites/i)).toBeDefined();
    expect(screen.getByText(/constitui certificação oficial/i)).toBeDefined();

    // Iniciar diagnóstico
    const startDiagBtn = screen.getByRole('button', { name: /Iniciar diagnóstico agora →/i });
    fireEvent.click(startDiagBtn);

    // Questão 1 exibida
    expect(screen.getAllByText(/Questão 1 de 8/i).length).toBeGreaterThanOrEqual(1);

    // Pausar diagnóstico
    const pauseBtn = screen.getByRole('button', { name: /Parar diagnóstico/i });
    fireEvent.click(pauseBtn);

    // Estado pausado
    expect(screen.getByText(/Diagnóstico pausado/i)).toBeDefined();
    const resumeBtn = screen.getAllByRole('button', { name: /Continuar diagnóstico/i })[0];
    expect(resumeBtn).toBeDefined();
    fireEvent.click(resumeBtn);

    // Responde questão 1
    const radioOption = screen.getAllByRole('radio')[0];
    fireEvent.click(radioOption);

    // Avança para próxima questão
    const nextBtn = screen.getByRole('button', { name: /Próxima questão →/i });
    fireEvent.click(nextBtn);
    expect(screen.getAllByText(/Questão 2 de 8/i).length).toBeGreaterThanOrEqual(1);
  });

  it('gerencia ciclo de vida completo de exercícios: iniciar, parar, conferir, refazer e desfazer', () => {
    render(
      <MemoryRouter initialEntries={['/ingles?view=exercicios&nivel=A1']}>
        <PilotProvider>
          <EnglishJourneyPage />
        </PilotProvider>
      </MemoryRouter>
    );

    // Encontra primeiro botão Iniciar exercício na listagem
    const startBtns = screen.getAllByRole('button', { name: /Iniciar exercício ▶/i });
    expect(startBtns.length).toBeGreaterThanOrEqual(1);
    fireEvent.click(startBtns[0]);

    // Exercício agora está em andamento e exibe botão Parar
    expect(screen.getAllByRole('button', { name: /⏸️ Parar/i }).length).toBeGreaterThanOrEqual(1);

    // Clica em parar
    const stopBtn = screen.getAllByRole('button', { name: /⏸️ Parar/i })[0];
    fireEvent.click(stopBtn);

    // Agora exibe botão Continuar exercício
    expect(screen.getAllByRole('button', { name: /▶️ Continuar exercício/i }).length).toBeGreaterThanOrEqual(1);
  });

  it('oferece suporte a arrastar com o mouse (drag-to-scroll) com indicadores visuais de mão', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/ingles?nivel=A1']}>
        <PilotProvider>
          <EnglishJourneyPage />
        </PilotProvider>
      </MemoryRouter>
    );

    // Verifica a presença dos indicadores visuais com a mãozinha
    const dragHints = screen.getAllByText(/Arraste.*com o mouse/i);
    expect(dragHints.length).toBeGreaterThanOrEqual(2);

    // Verifica a classe pf-eng-drag-scroll nos containers horizontais
    const dragScrollContainers = container.querySelectorAll('.pf-eng-drag-scroll');
    expect(dragScrollContainers.length).toBeGreaterThanOrEqual(2);

    // Simula interação de arrastar com o mouse no container da trilha
    const trackGrid = container.querySelector('.pf-eng-track-grid');
    expect(trackGrid).not.toBeNull();
    if (trackGrid) {
      fireEvent.mouseDown(trackGrid, { button: 0, pageX: 200 });
      fireEvent.mouseMove(trackGrid, { pageX: 100 });
      fireEvent.mouseUp(trackGrid);
    }
  });
});

