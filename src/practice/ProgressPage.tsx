import {examResult} from './exam-state';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {allActivities,getStage} from './curriculum';
import {roadmap} from '../content/roadmap';
import {attemptFor,withAttempt,updateStageStatus,usePilot} from './progress';
import {dashboard,stageProgress,stageStatusLabel} from './achievements';
import {labels} from './StudyPages';
import {professionalMilestones,professionalBooks,professionalAchievements} from './professional-development';
export function ProgressPage(){
 const {pilot,change}=usePilot();const [kindFilter,setKindFilter]=useState<'todos'|'exercise'|'project'>('todos');const stats=dashboard(pilot);
 const stagesInProgress=roadmap.filter(s=>stageProgress(pilot,s.id).status==='em-andamento');
 const inProgress=allActivities.filter(t=>attemptFor(pilot,t.id)?.status==='em-andamento'&&(kindFilter==='todos'||t.kind===kindFilter));
 const stopStage=(id:string)=>change(p=>({...p,stageTracking:{...p.stageTracking,[id]:updateStageStatus(p.stageTracking[id],'pausada')}}));
 const stopActivity=(id:string)=>change(p=>withAttempt(p,id,{status:'novo'}));
 const profMilestonesDone = Object.entries(pilot.professional?.milestones ?? {}).filter(([, m]) => m.status === 'concluido').map(([id]) => id);
 const profBooksDone = Object.entries(pilot.professional?.books ?? {}).filter(([, s]) => s === 'concluido').map(([id]) => id);
 const profBooksReading = Object.values(pilot.professional?.books ?? {}).filter(s => s === 'lendo').length;
 const profAchievementsUnlocked = professionalAchievements.filter(a => a.isUnlocked(profMilestonesDone, profBooksDone)).length;
 return <><p className="pf-kicker">SEU PERCURSO / REGISTROS LOCAIS</p><h1>Meu progresso</h1><p><Link to="/security?view=progress">Retomar segurança — progresso independente</Link>. Os registros de segurança não alteram percentuais do roadmap.</p><p>Estudo e conclusões são declarados por você. Evidência externa registrada não é revisão verificada automaticamente.</p><p className="pf-meta">Seus registros são salvos neste navegador, sem sincronização entre dispositivos. O acompanhamento é por autoavaliação e não emite certificação.</p><div className="pf-stat-grid">{[[stats.completed,'Etapas concluídas'],[stats.started,'Etapas em andamento'],[stats.exercises,'Exercícios concluídos'],[stats.projects,'Projetos concluídos']].map(([n,label])=><div className="pf-card" key={label}><strong className="pf-stat-value">{n}</strong><span>{label}</span></div>)}</div>
 <section className="pf-panel"><h2>Etapas em andamento</h2><p>Etapas do roadmap iniciadas e acompanhadas ativamente. Parar uma etapa pausa seu acompanhamento sem apagar tópicos, exercícios ou projetos concluídos.</p><p role="status">{stagesInProgress.length} {stagesInProgress.length===1?'etapa em andamento':'etapas em andamento'}.</p>{!stagesInProgress.length&&<p className="pf-meta">Nenhuma etapa em andamento no momento.</p>}{stagesInProgress.length>0&&<div className="pf-cards">{stagesInProgress.map(s=>{const p=stageProgress(pilot,s.id);const title=getStage(s.id)?.title??s.title;const url=`/etapas/${s.id}`;return <article className="pf-card" key={s.id}><div className="pf-tags"><span>Etapa {s.id}</span><span>{stageStatusLabel[p.status]}</span></div><h3><Link to={url}>Etapa {s.id} — {title}</Link></h3><p>Progresso atual: {p.percent}% ({p.units}/{p.total} registros previstos).</p><progress aria-label={`Progresso da Etapa ${s.id}`} max={100} value={p.percent}/><p className="pf-meta">Atividades concluídas: {p.completedActivities}/{p.totalActivities}{p.startedAt?` · Início: ${p.startedAt}`:''}</p><div className="pf-actions"><Link className="pf-button primary" to={url}>Continuar</Link><button className="pf-button" onClick={()=>stopStage(s.id)}>Parar etapa</button></div></article>;})}</div>}</section>
 <section className="pf-panel"><h2>Atividades em andamento</h2><p>Exercícios e projetos iniciados que ainda não foram concluídos. Na Etapa07, são exibidos os registros da trilha selecionada.</p><div className="pf-tools"><label className="pf-field">Tipo de atividade<select value={kindFilter} onChange={e=>setKindFilter(e.target.value as 'todos'|'exercise'|'project')}><option value="todos">Todas as atividades</option><option value="exercise">Exercícios</option><option value="project">Projetos</option></select></label></div><p role="status">{inProgress.length} {inProgress.length===1?'atividade em andamento':'atividades em andamento'}.</p>{!inProgress.length&&<p className="pf-meta">Nenhuma atividade em andamento neste filtro.</p>}{inProgress.length>0&&<div className="pf-cards">{inProgress.map(t=>{const a=attemptFor(pilot,t.id);const url=t.kind==='project'?`/projetos/${t.slug}`:`/etapas/${t.stageId}/exercicios/${t.slug}`;return <article className="pf-card" key={t.id}><div className="pf-tags"><span>Etapa {t.stageId}</span><span>{t.kind==='project'?'Projeto':'Exercício'}</span><span>{labels[t.level]??t.level}</span></div><h3><Link to={url}>{t.title}</Link></h3><p className="pf-meta">Estado: Em andamento{a?.startedAt?` · Início: ${a.startedAt}`:''}</p><div className="pf-actions"><Link className="pf-button primary" to={url}>Continuar</Link><button className="pf-button" onClick={()=>stopActivity(t.id)}>Parar atividade</button></div></article>;})}</div>}</section>
  <section className="pf-panel"><h2>Progresso geral do roadmap</h2><p>Prova final Júnior ({pilot.track==='php'?'Laravel':'Express'}): {({'nao-iniciada':'Não iniciada','em-andamento':'Em andamento',interrompida:'Interrompida',concluida:'Concluída'})[pilot.juniorExam?.[pilot.track]?.attempts.at(-1)?.status??'nao-iniciada']} · {pilot.juniorExam?.[pilot.track]?.attempts.length??0} tentativas preservadas. Avaliação: {({meets:'critérios declarados atendidos',below:'critérios pendentes',blocked:'falha crítica confirmada',inconclusive:'inconclusiva','not-assessed':'não registrada'})[examResult(pilot.juniorExam?.[pilot.track]?.attempts.at(-1)).state]}. A etapa09 inclui dois registros próprios: conclusão da prova e avaliação educacional declarada atendida.</p><p><Link to="/etapas/09/prova-final">Retomar prova final Júnior e consultar histórico</Link></p><p>{stats.completed}/20 etapas concluídas por autoavaliação · {stats.percent}%.</p><progress aria-label="Progresso geral" max={100} value={stats.percent}/><p className="pf-meta">Percentual por quantidade de etapas, sem estimar tempo ou domínio. Somente 00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12 e 13 publicadas no novo formato; etapas futuras não podem ser concluídas.</p>{stats.next&&<p>Próxima etapa recomendada: <Link to={'/etapas/'+stats.next.id}>Etapa {stats.next.id} — {stats.next.title}</Link>{!getStage(stats.next.id)&&' (em preparação; nenhum exercício disponível ainda)'}.</p>}<div className="pf-cards">{stats.formations.map(f=><article className="pf-card" key={f.id}><h3>{f.title}</h3><p>{f.done}/{f.total} etapas · {f.percent}%.</p><progress aria-label={`Progresso ${f.title}`} max={100} value={f.percent}/><p className="pf-meta">{f.available}/{f.total} etapas migradas.</p></article>)}</div></section><section><h2>Conquistas</h2><p>Derivadas de atividades concluídas, sem recompensa por abrir páginas. Recalculadas ao revisar os registros; não são certificados.</p><div className="pf-cards">{stats.achievements.map(a=><article className={'pf-card '+(a.earned?'pf-achieved':'')} key={a.id}><p className="pf-kicker">{a.earned?'✓ DESBLOQUEADA':'○ A CONSTRUIR'}</p><h3>{a.title}</h3><p>{a.rule}</p></article>)}</div></section><section className="pf-panel"><h2>Progresso por etapa</h2>{(['00','01','02','03','04','05','06','07','08','09','10','11','12','13'] as const).map(id=>{const x=stageProgress(pilot,id);return <div key={id}><h3><Link to={'/etapas/'+id}>Etapa {id}</Link> — {x.percent}% {x.done?'✓ Concluída por autoavaliação':x.paused?'⏸ Pausada':x.started?'● Em andamento':'○ Não iniciada'}</h3><p>{x.topics}/{x.coreTopics} tópicos base estudados · {x.initial} iniciais · {x.intermediate} intermediários{(id==='03'||id==='04'||id==='05'||id==='06'||id==='07'||id==='08'||id==='09'||id==='10'||id==='11'||id==='12'||id==='13')?` · ${x.advanced} avançados (${pilot.track==='php'?'PHP + Laravel':'TS + Node + Express'})`:''} · {x.completedActivities}/{x.totalActivities} atividades concluídas · síntese {x.evidence?'registrada':'pendente'}.</p></div>;})}<details><summary>Ver registros das atividades</summary>{allActivities.map(t=><p key={t.id}><Link to={t.kind==='project'?`/projetos/${t.slug}`:`/etapas/${t.stageId}/exercicios/${t.slug}`}>{t.title}</Link> — {attemptFor(pilot,t.id)?.status==='concluido'?'Concluída (por autoavaliação)':attemptFor(pilot,t.id)?.status==='em-andamento'?'Em andamento':'Não iniciada'}{attemptFor(pilot,t.id)?.evidence?' · Evidência externa registrada (declarada)':''}</p>)}</details></section>
  <section className="pf-panel pf-prof-progress-panel">
    <h2>Desenvolvimento Profissional</h2>
    <p>Acompanhamento voluntário e complementar às etapas técnicas do roadmap (não interfere no progresso do roadmap 00–19).</p>
    <div className="pf-stat-grid">
      <div className="pf-card">
        <strong className="pf-stat-value">{profMilestonesDone.length} / {professionalMilestones.length}</strong>
        <span>Marcos profissionais concluídos</span>
      </div>
      <div className="pf-card">
        <strong className="pf-stat-value">{profBooksDone.length} / {professionalBooks.length}</strong>
        <span>Livros lidos ({profBooksReading} em leitura)</span>
      </div>
      <div className="pf-card">
        <strong className="pf-stat-value">{profAchievementsUnlocked} / {professionalAchievements.length}</strong>
        <span>Conquistas profissionais</span>
      </div>
    </div>
    <div className="pf-actions">
      <Link className="pf-button primary" to="/desenvolvimento-profissional">
        Acessar Desenvolvimento Profissional →
      </Link>
      <Link className="pf-button" to="/desenvolvimento-profissional?view=livros">
        Ver biblioteca recomendada
      </Link>
    </div>
  </section></>;
}

