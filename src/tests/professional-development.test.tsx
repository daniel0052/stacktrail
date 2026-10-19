/** @vitest-environment jsdom */
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  professionalCompetencies,
  professionalMilestones,
  professionalAchievements,
  professionalBooks,
  getProfessionalCompetency,
} from '../practice/professional-development';
import { roadmap } from '../content/roadmap';
import {
  blankPilot,
  parsePilot,
  PilotProvider,
  updateProfessionalMilestone,
  updateProfessionalBook,
  type ProfessionalProgress,
} from '../practice/progress';
import { stageProgress } from '../practice/achievements';
import { ProfessionalDevelopmentPage } from '../practice/ProfessionalDevelopmentPage';

describe('Área independente: Desenvolvimento Profissional (Roadmap e Comunicação Falada)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('roadmap preserva rigorosamente 20 etapas técnicas (00 a 19)', () => {
    expect(roadmap.length).toBe(20);
    expect(roadmap[0].id).toBe('00');
    expect(roadmap[19].id).toBe('19');
    expect(roadmap.some(s => s.id === '20')).toBe(false);
    expect(roadmap.some(s => s.id === '21')).toBe(false);
  });

  it('possui trilha própria de Comunicação Falada com 6 marcos progressivos', () => {
    const spoken = getProfessionalCompetency('comunicacao-falada');
    expect(spoken).toBeDefined();
    expect(spoken?.title).toContain('Comunicação Falada');
    expect(spoken?.icon).toBe('🎙️');
    expect(spoken?.milestoneIds.length).toBe(6);

    const spokenMilestones = professionalMilestones.filter(m => m.competencyId === 'comunicacao-falada');
    expect(spokenMilestones.length).toBe(6);

    // Conferir os 6 marcos requeridos na ordem correta
    expect(spokenMilestones[0].title).toBe('Primeiras Palavras');
    expect(spokenMilestones[0].order).toBe(1);
    expect(spokenMilestones[0].practicalSuggestions?.length).toBeGreaterThanOrEqual(2);

    expect(spokenMilestones[1].title).toBe('Escutar a Própria Voz');
    expect(spokenMilestones[1].order).toBe(2);

    expect(spokenMilestones[2].title).toBe('Dicção, Ritmo e Clareza');
    expect(spokenMilestones[2].order).toBe(3);
    expect(spokenMilestones[2].practicalGuidance).toContain('fonoaudiologia');

    expect(spokenMilestones[3].title).toBe('Explicar Tecnologia em Vídeo');
    expect(spokenMilestones[3].order).toBe(4);

    expect(spokenMilestones[4].title).toBe('Conversas Profissionais e Alinhamentos');
    expect(spokenMilestones[4].order).toBe(5);

    expect(spokenMilestones[5].title).toBe('Apresentação Técnica de Projetos');
    expect(spokenMilestones[5].order).toBe(6);
  });

  it('possui as 7 competências obrigatórias com total de 24 marcos lineares', () => {
    expect(professionalCompetencies.length).toBe(7);
    expect(professionalMilestones.length).toBe(24);

    const requiredCompetencyIds = [
      'comunicacao-falada',
      'comunicacao-escrita',
      'colaboracao',
      'pensamento-critico',
      'organizacao',
      'etica',
      'carreira',
    ];

    for (const compId of requiredCompetencyIds) {
      const comp = getProfessionalCompetency(compId);
      expect(comp).toBeDefined();
      expect(comp?.title).toBeTruthy();
      expect(comp?.icon).toBeTruthy();
      expect(comp?.shortSummary).toBeTruthy();

      const count = compId === 'comunicacao-falada' ? 6 : 3;
      expect(comp?.milestoneIds.length).toBe(count);
    }
  });

  it('livro prioritário O Programador Pragmático possui capa local Bookman verificada e ISBN', () => {
    const pragmatic = professionalBooks.find(b => b.id === 'book-prof-programador-pragmatico');
    expect(pragmatic).toBeDefined();
    expect(pragmatic?.author).toContain('Andrew Hunt e David Thomas');
    expect(pragmatic?.edition).toBe('2ª edição');
    expect(pragmatic?.language).toBe('PT-BR');
    expect(pragmatic?.note).toContain('978-85-8260-687-2');
    expect(pragmatic?.stages).toEqual([]);
    expect(pragmatic?.cover.kind).toBe('image');
    expect(pragmatic?.cover.src).toBe('covers/o-programador-pragmatico-2ed.webp');
  });

  it('livros recomendados usam capas locais legítimas e fallback neutro sem hotlinks externos', () => {
    expect(professionalBooks.length).toBeGreaterThanOrEqual(5);

    for (const book of professionalBooks) {
      expect(book.title).toBeTruthy();
      expect(book.author).toBeTruthy();
      expect(book.reason).toBeTruthy();
      expect(book.stages).toEqual([]);

      if (book.cover.kind === 'image') {
        expect(book.cover.src).toMatch(/^covers\/[a-z0-9-]+\.(webp|png)$/);
        expect(book.cover.src?.startsWith('http')).toBe(false);
      } else {
        expect(book.cover.kind).toBe('placeholder');
      }
    }

    const cleanCode = professionalBooks.find(b => b.id === 'book-prof-codigo-limpo');
    expect(cleanCode?.cover.kind).toBe('image');
    expect(cleanCode?.cover.src).toBe('covers/codigo-limpo.png');

    const cleanCoder = professionalBooks.find(b => b.id === 'book-prof-codificador-limpo');
    expect(cleanCoder?.cover.kind).toBe('image');
    expect(cleanCoder?.cover.src).toBe('covers/o-codificador-limpo.webp');

    const tedBook = professionalBooks.find(b => b.id === 'book-prof-ted-carmine');
    expect(tedBook?.cover.kind).toBe('image');
    expect(tedBook?.cover.src).toBe('covers/ted-falar-convencer-emocionar.webp');
    expect(tedBook?.note).toContain('Benvirá');
  });

  it('marcos e livros profissionais não alteram porcentagens técnicas do roadmap', () => {
    const pilot = blankPilot();
    const stage01Prog = stageProgress(pilot, '01');
    const stage05Prog = stageProgress(pilot, '05');

    pilot.professional = {
      books: { 'book-prof-programador-pragmatico': 'concluido' },
      milestones: {
        'ms-spk-01': { status: 'concluido', completedAt: '2026-10-18' },
        'ms-spk-02': { status: 'concluido', completedAt: '2026-10-18' },
        'ms-com-01': { status: 'concluido', completedAt: '2026-10-18' },
      },
    };

    const nextStage01Prog = stageProgress(pilot, '01');
    const nextStage05Prog = stageProgress(pilot, '05');

    expect(nextStage01Prog.percent).toBe(stage01Prog.percent);
    expect(nextStage01Prog.completedActivities).toBe(stage01Prog.completedActivities);
    expect(nextStage05Prog.percent).toBe(stage05Prog.percent);
  });

  it('funções helper de milestone e livros atualizam o estado de forma reversível', () => {
    let prof: ProfessionalProgress = { books: {}, milestones: {} };

    // Iniciar marco
    prof = updateProfessionalMilestone(prof, 'ms-spk-01', 'em-andamento');
    expect(prof.milestones['ms-spk-01'].status).toBe('em-andamento');

    // Concluir marco
    prof = updateProfessionalMilestone(prof, 'ms-spk-01', 'concluido');
    expect(prof.milestones['ms-spk-01'].status).toBe('concluido');
    expect(prof.milestones['ms-spk-01'].completedAt).toBeDefined();

    // Desfazer para não iniciado
    prof = updateProfessionalMilestone(prof, 'ms-spk-01', 'nao-iniciado');
    expect(prof.milestones['ms-spk-01']).toBeUndefined();

    // Livro toggle
    prof = updateProfessionalBook(prof, 'book-prof-codigo-limpo', 'lendo');
    expect(prof.books['book-prof-codigo-limpo']).toBe('lendo');

    prof = updateProfessionalBook(prof, 'book-prof-codigo-limpo', 'lendo');
    expect(prof.books['book-prof-codigo-limpo']).toBeUndefined();
  });

  it('gamificação inclui conquistas de comunicação falada e evolução', () => {
    const firstVoice = professionalAchievements.find(a => a.id === 'prof-first-voice');
    const techExplainer = professionalAchievements.find(a => a.id === 'prof-tech-explainer');
    const presenter = professionalAchievements.find(a => a.id === 'prof-presenter');
    const continuous = professionalAchievements.find(a => a.id === 'prof-continuous-growth');

    expect(firstVoice?.isUnlocked([], [])).toBe(false);
    expect(firstVoice?.isUnlocked(['ms-spk-01'], [])).toBe(true);

    expect(techExplainer?.isUnlocked([], [])).toBe(false);
    expect(techExplainer?.isUnlocked(['ms-spk-04'], [])).toBe(true);

    const allSpoken = ['ms-spk-01', 'ms-spk-02', 'ms-spk-03', 'ms-spk-04', 'ms-spk-05', 'ms-spk-06'];
    expect(presenter?.isUnlocked(['ms-spk-01', 'ms-spk-02', 'ms-spk-03'], [])).toBe(false);
    expect(presenter?.isUnlocked(allSpoken, [])).toBe(true);

    expect(continuous?.isUnlocked(['ms-spk-01', 'ms-com-01'], [])).toBe(false);
    expect(continuous?.isUnlocked(['ms-spk-01', 'ms-com-01', 'ms-col-01'], [])).toBe(true);
  });

  it('parsePilot hidrata e valida milestones de comunicação falada com persistência segura', () => {
    const raw = {
      version: 2,
      stageEvidence: { '00': '', '01': '', '02': '', '03': '', '04': '', '05': '', '06': '', '07': '' },
      stageTracking: {},
      currentStage: '01',
      studied: [],
      attempts: {},
      track: 'php',
      theme: 'dark',
      font: 100,
      legacyArchive: null,
      professional: {
        books: {
          'book-prof-programador-pragmatico': 'lendo',
        },
        milestones: {
          'ms-spk-01': {
            status: 'concluido',
            completedAt: '2026-10-18',
          },
          'ms-spk-02': {
            status: 'em-andamento',
          },
        },
      },
    };

    const parsed = parsePilot(raw);
    expect(parsed.professional?.books['book-prof-programador-pragmatico']).toBe('lendo');
    expect(parsed.professional?.milestones['ms-spk-01'].status).toBe('concluido');
    expect(parsed.professional?.milestones['ms-spk-02'].status).toBe('em-andamento');
  });

  it('renderiza o panorama geral com 7 cards compactos e sem todas as categorias expandidas', () => {
    render(
      <MemoryRouter initialEntries={['/desenvolvimento-profissional']}>
        <PilotProvider>
          <ProfessionalDevelopmentPage />
        </PilotProvider>
      </MemoryRouter>
    );

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toBe('Desenvolvimento Profissional');
    expect(screen.getByText(/SEU PROGRESSO PROFISSIONAL/i)).toBeDefined();

    // 7 cards compactos de competências
    expect(screen.getByRole('button', { name: /Abrir competência Comunicação Falada e Oratória Técnica/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Abrir competência Comunicação Escrita e Assíncrona/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Abrir competência Colaboração, Feedback e Escuta Ativa/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Abrir competência Pensamento Crítico e Tomada de Decisão/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Abrir competência Organização e Autonomia/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Abrir competência Ética e Responsabilidade Técnica/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Abrir competência Carreira e Aprendizado Contínuo/i })).toBeDefined();

    // No modo panorama, os marcos individuais não estão renderizados na tela
    expect(screen.queryByRole('heading', { level: 3, name: 'Escutar a Própria Voz' })).toBeNull();
  });

  it('ao selecionar Comunicação Falada, apresenta seus 6 marcos exclusivos e permite navegar de volta', () => {
    render(
      <MemoryRouter initialEntries={['/desenvolvimento-profissional?competencia=comunicacao-falada']}>
        <PilotProvider>
          <ProfessionalDevelopmentPage />
        </PilotProvider>
      </MemoryRouter>
    );

    // Cabeçalho da competência selecionada
    expect(screen.getByRole('heading', { level: 2, name: 'Comunicação Falada e Oratória Técnica' })).toBeDefined();
    expect(screen.getByRole('button', { name: /Voltar para a visão geral de competências/i })).toBeDefined();

    // Os 6 marcos de comunicação falada estão visíveis
    expect(screen.getByRole('heading', { level: 3, name: 'Primeiras Palavras' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 3, name: 'Escutar a Própria Voz' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 3, name: 'Dicção, Ritmo e Clareza' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 3, name: 'Explicar Tecnologia em Vídeo' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 3, name: 'Conversas Profissionais e Alinhamentos' })).toBeDefined();
    expect(screen.getByRole('heading', { level: 3, name: 'Apresentação Técnica de Projetos' })).toBeDefined();

    // Marcos de outras competências NÃO estão visíveis
    expect(screen.queryByRole('heading', { level: 3, name: 'Separação entre Sintomas e Causas Raiz' })).toBeNull();
  });

  it('permite iniciar, concluir e reverter um marco autodeclarado de comunicação falada', () => {
    render(
      <MemoryRouter initialEntries={['/desenvolvimento-profissional?competencia=comunicacao-falada']}>
        <PilotProvider>
          <ProfessionalDevelopmentPage />
        </PilotProvider>
      </MemoryRouter>
    );

    // Clicar em iniciar marco
    const initButtons = screen.getAllByRole('button', { name: 'Iniciar marco' });
    expect(initButtons.length).toBeGreaterThan(0);
    fireEvent.click(initButtons[0]);

    // O marco agora deve ter botão de concluir
    expect(screen.getByRole('button', { name: /✓ Concluir marco/i })).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: /✓ Concluir marco/i }));

    // Agora o marco exibe botão de desfazer
    expect(screen.getByRole('button', { name: /Desfazer conclusão/i })).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: /Desfazer conclusão/i }));

    // Revertido para em-andamento
    expect(screen.getByRole('button', { name: /✓ Concluir marco/i })).toBeDefined();
  });
});
