import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  professionalCompetencies,
  professionalMilestones,
  professionalAchievements,
  professionalBooks,
  professionalReferences,
  getProfessionalCompetency,
  type ProfessionalCompetencyId,
  type ProfessionalMilestone,
} from './professional-development';
import {
  usePilot,
  updateProfessionalMilestone,
  updateProfessionalBook,
  type ProfessionalBookStatus,
  type ProfessionalMilestoneStatus,
} from './progress';
import { BookCover } from './Shared';

type ActiveView = 'trilha' | 'conquistas' | 'livros' | 'referencias';

export function ProfessionalDevelopmentPage() {
  const { pilot, change } = usePilot();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeView = (searchParams.get('view') as ActiveView) || 'trilha';
  const selectedCompetencyId = searchParams.get('competencia') as ProfessionalCompetencyId | null;
  const [bookFilter, setBookFilter] = useState<'todos' | 'comunicacao' | 'critico' | 'etica'>('todos');
  const [bookQuery, setBookQuery] = useState('');

  useEffect(() => {
    document.title = 'StackTrail — Desenvolvimento Profissional';
  }, []);

  const prof = pilot.professional ?? { books: {}, milestones: {} };
  const doneMilestoneIds = Object.entries(prof.milestones)
    .filter(([, m]) => m.status === 'concluido')
    .map(([id]) => id);
  const doneBooksIds = Object.entries(prof.books)
    .filter(([, s]) => s === 'concluido')
    .map(([id]) => id);
  const readingBooksCount = Object.values(prof.books).filter(s => s === 'lendo').length;

  // Estatísticas gerais
  const totalMilestones = professionalMilestones.length;
  const completedMilestones = doneMilestoneIds.length;
  const percentComplete = Math.round((completedMilestones / totalMilestones) * 100);

  // Status por competência
  const competencyStats = professionalCompetencies.map(comp => {
    const total = comp.milestoneIds.length;
    const done = comp.milestoneIds.filter(id => doneMilestoneIds.includes(id)).length;
    const inProgress = comp.milestoneIds.filter(
      id => prof.milestones[id]?.status === 'em-andamento'
    ).length;
    const status = done === total ? 'concluida' : done > 0 || inProgress > 0 ? 'em-andamento' : 'nao-iniciada';
    return {
      comp,
      total,
      done,
      inProgress,
      status,
    };
  });

  const startedCompetenciesCount = competencyStats.filter(c => c.status !== 'nao-iniciada').length;
  const completedCompetenciesCount = competencyStats.filter(c => c.status === 'concluida').length;

  // Próximo marco sugerido: prioriza Comunicação Falada se pendente, ou o primeiro incompleto
  const nextMilestone = professionalMilestones.find(
    m => prof.milestones[m.id]?.status !== 'concluido'
  );

  // Navegação
  const handleSelectView = (view: ActiveView) => {
    const params = new URLSearchParams(searchParams);
    if (view === 'trilha') {
      params.delete('view');
    } else {
      params.set('view', view);
    }
    setSearchParams(params);
  };

  const handleSelectCompetency = (id: ProfessionalCompetencyId | null) => {
    const params = new URLSearchParams(searchParams);
    if (!id) {
      params.delete('competencia');
    } else {
      params.set('competencia', id);
      params.delete('view'); // Retorna para a trilha ao selecionar competência
    }
    setSearchParams(params);
  };

  const setMilestoneStatus = (milestoneId: string, status: ProfessionalMilestoneStatus) => {
    change(p => ({
      ...p,
      professional: updateProfessionalMilestone(p.professional, milestoneId, status),
    }));
  };

  const toggleBookStatus = (bookId: string, status: ProfessionalBookStatus) => {
    change(p => ({
      ...p,
      professional: updateProfessionalBook(p.professional, bookId, status),
    }));
  };

  const selectedCompetency = selectedCompetencyId
    ? getProfessionalCompetency(selectedCompetencyId)
    : null;

  const selectedMilestones: ProfessionalMilestone[] = selectedCompetency
    ? selectedCompetency.milestoneIds
        .map(id => professionalMilestones.find(m => m.id === id)!)
        .filter(Boolean)
    : [];

  // Filtragem de livros
  const filteredBooks = professionalBooks.filter(b => {
    if (bookFilter === 'comunicacao') {
      if (!b.topics.includes('comunicacao-falada') && !b.topics.includes('comunicacao-escrita') && !b.topics.includes('colaboracao')) return false;
    } else if (bookFilter === 'critico') {
      if (!b.topics.includes('pensamento-critico')) return false;
    } else if (bookFilter === 'etica') {
      if (!b.topics.includes('etica') && !b.topics.includes('organizacao') && !b.topics.includes('carreira')) return false;
    }

    if (bookQuery.trim()) {
      const q = bookQuery.toLowerCase();
      const matchTitle = b.title.toLowerCase().includes(q);
      const matchAuthor = b.author.toLowerCase().includes(q);
      const matchReason = b.reason.toLowerCase().includes(q);
      if (!matchTitle && !matchAuthor && !matchReason) return false;
    }
    return true;
  });

  return (
    <div className="pf-prof-page">
      {/* Cabeçalho compacto com Progresso Geral */}
      <header className="pf-hero pf-prof-hero">
        <div className="pf-prof-hero-intro">
          <p className="pf-kicker">DESENVOLVIMENTO PROFISSIONAL / SOFT SKILLS, COMUNICAÇÃO &amp; CARREIRA</p>
          <h1>Desenvolvimento Profissional</h1>
          <p className="pf-lead">
            Roadmap prático para desenvolver comunicação falada, expressão verbal, clareza técnica,
            colaboração em equipe, escuta ativa, postura ética e maturidade de carreira — em paralelo ao percurso de engenharia.
          </p>

          {nextMilestone && (
            <div className="pf-prof-next-card" role="region" aria-label="Próximo marco sugerido">
              <span className="pf-kicker">PRÓXIMO MARCO SUGERIDO</span>
              <div className="pf-prof-next-content">
                <strong>{nextMilestone.title}</strong>
                <span className="pf-meta">
                  Competência: {getProfessionalCompetency(nextMilestone.competencyId)?.title}
                </span>
                <p>{nextMilestone.goal}</p>
                <button
                  type="button"
                  className="pf-button primary compact"
                  onClick={() => handleSelectCompetency(nextMilestone.competencyId)}
                >
                  Abrir competência →
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="pf-prof-badge-card" aria-label="Painel de progresso profissional voluntário">
          <span className="pf-kicker">SEU PROGRESSO PROFISSIONAL</span>
          <div className="pf-prof-stats-grid">
            <div className="pf-prof-stat-box">
              <strong className="pf-stat-value">{completedMilestones} / {totalMilestones}</strong>
              <small>Marcos concluídos ({percentComplete}%)</small>
            </div>
            <div className="pf-prof-stat-box">
              <strong className="pf-stat-value">{completedCompetenciesCount} / {professionalCompetencies.length}</strong>
              <small>Competências concluídas ({startedCompetenciesCount} iniciadas)</small>
            </div>
            <div className="pf-prof-stat-box">
              <strong className="pf-stat-value">{doneBooksIds.length} / {professionalBooks.length}</strong>
              <small>Livros lidos ({readingBooksCount} em leitura)</small>
            </div>
            <div className="pf-prof-stat-box">
              <strong className="pf-stat-value">
                {professionalAchievements.filter(a => a.isUnlocked(doneMilestoneIds, doneBooksIds)).length} / {professionalAchievements.length}
              </strong>
              <small>Conquistas desbloqueadas</small>
            </div>
          </div>
          <progress
            aria-label="Progresso geral de marcos de desenvolvimento profissional"
            max={totalMilestones}
            value={completedMilestones}
            className="pf-prof-progress-bar"
          />
          <p className="pf-meta">
            Área independente do roadmap técnico. Não altera a porcentagem de conclusão das etapas 00–19.
          </p>
        </div>
      </header>

      {/* Navegação principal compacta entre visualizações */}
      <nav className="pf-prof-nav-tabs" aria-label="Visualizações de desenvolvimento profissional">
        <button
          type="button"
          className={activeView === 'trilha' ? 'is-active' : ''}
          onClick={() => {
            handleSelectCompetency(null);
            handleSelectView('trilha');
          }}
        >
          Trilha de Competências
        </button>
        <button
          type="button"
          className={activeView === 'conquistas' ? 'is-active' : ''}
          onClick={() => handleSelectView('conquistas')}
        >
          Conquistas ({professionalAchievements.filter(a => a.isUnlocked(doneMilestoneIds, doneBooksIds)).length}/{professionalAchievements.length})
        </button>
        <button
          type="button"
          className={activeView === 'livros' ? 'is-active' : ''}
          onClick={() => handleSelectView('livros')}
        >
          Biblioteca ({professionalBooks.length})
        </button>
        <button
          type="button"
          className={activeView === 'referencias' ? 'is-active' : ''}
          onClick={() => handleSelectView('referencias')}
        >
          Fontes Primárias ({professionalReferences.length})
        </button>
      </nav>

      {/* 1. VISUALIZAÇÃO: TRILHA DE COMPETÊNCIAS */}
      {activeView === 'trilha' && (
        <section className="pf-panel pf-prof-main-panel" aria-label="Trilha de desenvolvimento profissional">
          {/* A. VISÃO GERAL: Panorama de 7 Cards Compactos */}
          {!selectedCompetency ? (
            <>
              <div className="pf-prof-section-header">
                <div>
                  <h2>Competências Profissionais</h2>
                  <p className="pf-meta">
                    Selecione uma competência para explorar sua trilha linear de marcos práticos. A introversão é natural; o objetivo é comunicar com clareza e segurança.
                  </p>
                </div>
              </div>

              <div className="pf-prof-competency-grid">
                {competencyStats.map(({ comp, total, done, status }) => (
                  <article
                    key={comp.id}
                    className={`pf-card pf-prof-competency-card status-${status} ${comp.id === 'comunicacao-falada' ? 'is-featured' : ''}`}
                    onClick={() => handleSelectCompetency(comp.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Abrir competência ${comp.title}. Status: ${
                      status === 'concluida' ? 'Concluída' : status === 'em-andamento' ? 'Em andamento' : 'Não iniciada'
                    }. ${done} de ${total} marcos concluídos.`}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectCompetency(comp.id);
                      }
                    }}
                  >
                    <div className="pf-prof-card-top">
                      <span className="pf-prof-icon" aria-hidden="true">{comp.icon}</span>
                      <div className="pf-prof-tag-group">
                        {comp.id === 'comunicacao-falada' && (
                          <span className="pf-badge-highlight">Prioritária</span>
                        )}
                        <span className={`pf-prof-status-tag ${status}`}>
                          {status === 'concluida'
                            ? '✓ Concluída'
                            : status === 'em-andamento'
                            ? '● Em andamento'
                            : '○ Não iniciada'}
                        </span>
                      </div>
                    </div>

                    <h3>{comp.title}</h3>
                    <p className="pf-prof-card-summary">{comp.shortSummary}</p>

                    <div className="pf-prof-card-footer">
                      <div className="pf-prof-card-progress">
                        <div className="pf-prof-meter">
                          <div
                            className="pf-prof-meter-fill"
                            style={{ width: `${(done / total) * 100}%` }}
                          />
                        </div>
                        <span className="pf-meta">
                          {done}/{total} marcos
                        </span>
                      </div>
                      <span className="pf-prof-card-cta">
                        Abrir trilha →
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            /* B. VISÃO ESPECÍFICA: Apenas os marcos da competência selecionada */
            <div className="pf-prof-detail-view" aria-labelledby="competency-detail-title">
              <div className="pf-prof-detail-header">
                <button
                  type="button"
                  className="pf-button compact"
                  onClick={() => handleSelectCompetency(null)}
                  aria-label="Voltar para a visão geral de competências"
                >
                  ← Voltar ao panorama de competências
                </button>

                <div className="pf-prof-detail-title-row">
                  <span className="pf-prof-icon-lg" aria-hidden="true">{selectedCompetency.icon}</span>
                  <div>
                    <h2 id="competency-detail-title">{selectedCompetency.title}</h2>
                    <p className="pf-lead">{selectedCompetency.shortSummary}</p>
                  </div>
                </div>

                <div className="pf-prof-detail-meta-bar">
                  <span className="pf-meta">
                    Progresso da competência:{' '}
                    <strong>
                      {selectedCompetency.milestoneIds.filter(id => doneMilestoneIds.includes(id)).length} de{' '}
                      {selectedCompetency.milestoneIds.length} marcos concluídos
                    </strong>
                  </span>
                </div>
              </div>

              {/* Trilha linear de marcos */}
              <div className="pf-prof-milestones-track">
                {selectedMilestones.map((milestone) => {
                  const mRecord = prof.milestones[milestone.id];
                  const mStatus = mRecord?.status ?? 'nao-iniciado';
                  const isDone = mStatus === 'concluido';
                  const isInProgress = mStatus === 'em-andamento';
                  const ref = milestone.referenceId
                    ? professionalReferences.find(r => r.id === milestone.referenceId)
                    : null;
                  const book = milestone.bookId
                    ? professionalBooks.find(b => b.id === milestone.bookId)
                    : null;

                  return (
                    <article
                      key={milestone.id}
                      className={`pf-card pf-prof-milestone-card status-${mStatus}`}
                      id={milestone.id}
                    >
                      <div className="pf-prof-milestone-header">
                        <div className="pf-prof-milestone-badge-group">
                          <span className="pf-prof-step-number">Marco {String(milestone.order).padStart(2, '0')}</span>
                          <span className={`pf-prof-status-tag ${mStatus}`}>
                            {isDone ? '✓ Concluído' : isInProgress ? '● Em andamento' : '○ Não iniciado'}
                          </span>
                        </div>
                        <h3>{milestone.title}</h3>
                      </div>

                      <div className="pf-prof-milestone-content">
                        <div className="pf-prof-milestone-goal">
                          <strong>Objetivo:</strong> {milestone.goal}
                        </div>

                        <div className="pf-prof-milestone-why">
                          <strong>Por que importa:</strong> {milestone.whyItMatters}
                        </div>

                        <div className="pf-prof-guidance-box">
                          <span className="pf-kicker">SUGESTÕES PRÁTICAS NO DIA A DIA</span>
                          {milestone.practicalSuggestions && milestone.practicalSuggestions.length > 0 ? (
                            <ul className="pf-prof-suggestions-list">
                              {milestone.practicalSuggestions.map((sug, idx) => (
                                <li key={idx}>{sug}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>{milestone.practicalGuidance}</p>
                          )}
                        </div>

                        {/* Recursos vinculados ao marco */}
                        {(ref || book) && (
                          <div className="pf-prof-milestone-resources">
                            {ref && (
                              <div className="pf-prof-milestone-ref">
                                <span className="pf-meta">Fonte de referência recomendada:</span>
                                <a href={ref.url} target="_blank" rel="noreferrer" className="pf-prof-ref-link">
                                  {ref.title} ↗<span className="sr-only"> (nova aba)</span>
                                </a>
                                <p className="pf-meta">{ref.section} ({ref.language})</p>
                              </div>
                            )}

                            {book && (
                              <div className="pf-prof-milestone-book">
                                <span className="pf-meta">Leitura recomendada relacionada:</span>
                                <button
                                  type="button"
                                  className="pf-prof-book-quick-link"
                                  onClick={() => {
                                    handleSelectView('livros');
                                    setBookQuery(book.title.split(':')[0]);
                                  }}
                                >
                                  📖 {book.title} ({book.author}) →
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Ações e Critério de Conclusão */}
                        <div className="pf-prof-milestone-action-bar">
                          <div className="pf-prof-criteria-text">
                            <span className="pf-kicker">CRITÉRIO AUTODECLARADO</span>
                            <p>
                              Marque como concluído quando tiver exercitado esta prática deliberadamente em seus estudos, projetos ou rotina de trabalho. Não há upload de mídia nem envio automático.
                            </p>
                            {isDone && mRecord?.completedAt && (
                              <span className="pf-prof-done-date">
                                Concluído em {mRecord.completedAt}
                              </span>
                            )}
                          </div>

                          <div className="pf-actions">
                            {mStatus === 'nao-iniciado' && (
                              <>
                                <button
                                  type="button"
                                  className="pf-button compact"
                                  onClick={() => setMilestoneStatus(milestone.id, 'em-andamento')}
                                >
                                  Iniciar marco
                                </button>
                                <button
                                  type="button"
                                  className="pf-button primary compact"
                                  onClick={() => setMilestoneStatus(milestone.id, 'concluido')}
                                >
                                  ✓ Marcar como concluído
                                </button>
                              </>
                            )}

                            {mStatus === 'em-andamento' && (
                              <>
                                <button
                                  type="button"
                                  className="pf-button primary compact"
                                  onClick={() => setMilestoneStatus(milestone.id, 'concluido')}
                                >
                                  ✓ Concluir marco
                                </button>
                                <button
                                  type="button"
                                  className="pf-button compact"
                                  onClick={() => setMilestoneStatus(milestone.id, 'nao-iniciado')}
                                >
                                  Voltar para não iniciado
                                </button>
                              </>
                            )}

                            {mStatus === 'concluido' && (
                              <button
                                type="button"
                                className="pf-button compact"
                                onClick={() => setMilestoneStatus(milestone.id, 'em-andamento')}
                              >
                                Desfazer conclusão
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 2. VISUALIZAÇÃO: PAINEL DE CONQUISTAS */}
      {activeView === 'conquistas' && (
        <section className="pf-panel" aria-label="Conquistas de desenvolvimento profissional">
          <div className="pf-prof-section-header">
            <div>
              <h2>Conquistas Profissionais</h2>
              <p className="pf-meta">
                Derivadas de ações e registros reais autodeclarados (marcos concluídos e livros lidos). Totalmente reversíveis ao alterar seus registros.
              </p>
            </div>
            <div className="pf-tags">
              <span>
                {professionalAchievements.filter(a => a.isUnlocked(doneMilestoneIds, doneBooksIds)).length} de {professionalAchievements.length} desbloqueadas
              </span>
            </div>
          </div>

          <div className="pf-cards">
            {professionalAchievements.map(ach => {
              const unlocked = ach.isUnlocked(doneMilestoneIds, doneBooksIds);
              return (
                <article
                  key={ach.id}
                  className={`pf-card pf-prof-achievement-card ${unlocked ? 'is-unlocked' : 'is-locked'}`}
                >
                  <div className="pf-prof-achievement-top">
                    <span className="pf-prof-ach-icon" aria-hidden="true">{ach.icon}</span>
                    <span className={`pf-tag-badge ${unlocked ? 'tag-unlocked' : 'tag-locked'}`}>
                      {unlocked ? '✓ DESBLOQUEADA' : '○ A CONSTRUIR'}
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

      {/* 3. VISUALIZAÇÃO: BIBLIOTECA DE LIVROS */}
      {activeView === 'livros' && (
        <section className="pf-panel" aria-label="Biblioteca recomendada de desenvolvimento profissional">
          <div className="pf-prof-section-header">
            <div>
              <h2>Biblioteca de Desenvolvimento Profissional</h2>
              <p className="pf-meta">
                Obras clássicas e verificadas no catálogo brasileiro com capas locais ou fallback tipográfico neutro. Opcionais e com alternativas gratuitas documentadas.
              </p>
            </div>
          </div>

          {/* Ferramentas de busca e filtro */}
          <div className="pf-tools">
            <label className="pf-field">
              Filtro por competência
              <select
                value={bookFilter}
                onChange={e => setBookFilter(e.target.value as typeof bookFilter)}
              >
                <option value="todos">Todos os tópicos ({professionalBooks.length})</option>
                <option value="comunicacao">Comunicação Falada &amp; Escrita</option>
                <option value="critico">Pensamento Crítico &amp; Engenharia</option>
                <option value="etica">Ética, Organização e Carreira</option>
              </select>
            </label>

            <label className="pf-field">
              Buscar livro ou autor
              <input
                type="search"
                placeholder="Ex: Pragmático, Carmine, Martin, Fowler..."
                value={bookQuery}
                onChange={e => setBookQuery(e.target.value)}
              />
            </label>
          </div>

          <div className="pf-cards">
            {filteredBooks.map(book => {
              const currentStatus = prof.books[book.id];
              return (
                <article className="pf-card pf-book pf-prof-book-card" key={book.id}>
                  <BookCover b={book} />
                  <h3>{book.title}</h3>
                  <p>
                    {book.author} · {book.edition} · {book.year} ({book.language}).
                  </p>
                  <div className="pf-tags">
                    <span>Livro opcional</span>
                    <span>{book.level}</span>
                    {book.topics.map(t => (
                      <span key={t}>
                        {professionalCompetencies.find(c => c.id === t)?.title ?? t}
                      </span>
                    ))}
                  </div>

                  <p>
                    <strong>Por que ler:</strong> {book.reason}
                  </p>
                  <p className="pf-meta">{book.note}</p>

                  {/* Controle de leitura simplificado */}
                  <div className="pf-reading-controls" aria-label={`Estado de leitura de ${book.title}`}>
                    <span className="pf-meta">Seu acompanhamento de leitura:</span>
                    <div className="pf-reading-buttons">
                      <button
                        type="button"
                        className={`pf-reading-btn ${currentStatus === 'pretendo-ler' ? 'is-active' : ''}`}
                        onClick={() => toggleBookStatus(book.id, 'pretendo-ler')}
                      >
                        Quero ler
                      </button>
                      <button
                        type="button"
                        className={`pf-reading-btn ${currentStatus === 'lendo' ? 'is-active' : ''}`}
                        onClick={() => toggleBookStatus(book.id, 'lendo')}
                      >
                        Lendo
                      </button>
                      <button
                        type="button"
                        className={`pf-reading-btn ${currentStatus === 'concluido' ? 'is-active' : ''}`}
                        onClick={() => toggleBookStatus(book.id, 'concluido')}
                      >
                        ✓ Lido
                      </button>
                    </div>
                  </div>

                  <details className="pf-prof-book-details">
                    <summary>Fonte catalográfica e condições de uso da capa</summary>
                    <p>
                      <a href={book.url} target="_blank" rel="noreferrer">
                        Catálogo consultado ↗<span className="sr-only"> (nova aba)</span>
                      </a>
                    </p>
                    <p>{book.cover.origin}</p>
                    <p>{book.cover.usage}</p>
                  </details>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. VISUALIZAÇÃO: FONTES PRIMÁRIAS E REFERÊNCIAS */}
      {activeView === 'referencias' && (
        <section className="pf-panel" aria-label="Fontes primárias verificadas">
          <div className="pf-prof-section-header">
            <div>
              <h2>Fontes Primárias e Referências Gratuitas</h2>
              <p className="pf-meta">
                Manuais de oratória (Toastmasters International), diretrizes de saúde vocal (NIDCD / NIH), escuta ativa (Harvard Law School PON) e colaboração (Atlassian Playbook).
              </p>
            </div>
          </div>

          <div className="pf-cards">
            {professionalReferences.map(ref => (
              <article className="pf-card pf-reference" key={ref.id}>
                <div className="pf-tags">
                  <span>{ref.language}</span>
                  <span>{ref.cost}</span>
                  <span>{ref.type}</span>
                </div>
                <h3>
                  <a href={ref.url} target="_blank" rel="noreferrer">
                    {ref.title} ↗<span className="sr-only"> (nova aba)</span>
                  </a>
                </h3>
                <p>
                  <strong>Recorte:</strong> {ref.section}.
                </p>
                <p className="pf-meta">{ref.note}</p>
                <p className="pf-meta">
                  Acesso conferido: {ref.checked} · adequação: {ref.adequacy}.
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
