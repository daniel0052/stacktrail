import {Link} from 'react-router-dom';
import {modules14,tasks14,resolveReliabilityText,reliabilityReferenceIds,references14} from './stage-fourteen';
import {agentPlatforms} from './agent-platforms';
import {attemptFor,usePilot} from './progress';
const instrumentationExample={
 javascript:`// Exemplo referencial isolado, não é implementação de laboratório.
// O SDK compatível já deve ter sido inicializado ANTES da aplicação.
// tracer é obtido da API OpenTelemetry configurada no seu runtime.
tracer.startActiveSpan('demo.greeting', span => {
  try {
    span.setAttribute('demo.channel', 'console');
    span.addEvent('demo.ready');
    console.log('Olá, ambiente sintético');
  } finally {
    span.end();
  }
});`,
 php:`// Exemplo referencial isolado; SDK/provider/exporter configurados antes.
// $tracer pertence ao provider compatível instalado por Composer.
$span = $tracer->spanBuilder('demo.greeting')->startSpan();
$scope = $span->activate();
try {
    $span->setAttribute('demo.channel', 'console');
    $span->addEvent('demo.ready');
    echo "Olá, ambiente sintético";
} finally {
    $scope->detach();
    $span->end();
}`,
};
export function StageFourteenModules(){const {pilot}=usePilot();return <section className="pf-panel" aria-labelledby="modules14-title">
 <h2 id="modules14-title">12 módulos de Observabilidade e IA aplicada</h2>
 <p>Observability e Applied AI são os eixos principais; Advanced Testing &amp; Reliability os complementa. Explicações e exemplos referenciais desta etapa apoiam a leitura das fontes; as soluções dos desafios permanecem com você.</p>
 <p>Uma stack basta. Os pré-requisitos orientam a preparação e não bloqueiam o acesso. Nenhum código, agente ou backend do estudante é executado nesta plataforma.</p>
 {modules14.map(m=><details name="stage14-modules" key={m.id}><summary>{m.name}{pilot.studied.includes(m.id)?' · ✓ Estudo registrado':''}</summary>
  <p className="pf-kicker">{m.axis}</p><p><strong>Objetivo:</strong> {m.goal}</p><p><strong>Antes de começar:</strong> {m.before}</p><p><strong>Recorte:</strong> {m.scope}</p>
  <p>{m.explanation}</p><p><strong>Exemplo referencial:</strong> {m.example}</p><p><strong>Critério de prática:</strong> {m.criterion}</p>
  {m.id==='14-instrumentation'&&<><h3>Um span isolado na sua stack</h3><p>{resolveReliabilityText('[otel14]',pilot.track)}. No Node, confira bootstrap e flags ESM na documentação; em PHP, confira SDK, runtime e integração. O fragmento abaixo pressupõe tracer configurado, não inclui endpoint, propagação ou solução do laboratório. Ele não foi executado pelo StackTrail.</p><pre className="pf-reference-code" tabIndex={0} role="region" aria-label="Exemplo referencial de Manual Span" style={{overflowX:'auto',maxWidth:'100%',whiteSpace:'pre',padding:'1rem',border:'1px solid var(--control-border)'}}><code>{instrumentationExample[pilot.track]}</code></pre><p>Observe a finalização mesmo no erro; registrar exceção/status e flush/shutdown dependem da API/versão e são parte da investigação orientada pelas fontes.</p></>}
  {m.id==='14-agent-configuration'&&<><h3>Superfícies diferentes</h3><ul>{agentPlatforms.map(p=><li key={p.id}><strong>{p.name}</strong> — {p.surface}. Rules: <code>{p.capabilities.find(c=>c.mechanism==='rules')?.path}</code>. {p.capabilities.find(c=>c.mechanism==='skills')?.purpose}</li>)}</ul><Link to="/ai-development-toolkit/project-planning">Escolher plataforma e conferir árvore/exemplos no Toolkit (opcional)</Link><p>Antigravity usa o App e Subagents; não é Gemini CLI. Catálogo consultado em22/10/2026: reveja a documentação do cliente instalado antes de ativar mecanismos.</p></>}
  {m.id==='14-agent-evaluation'&&<p><Link to="/security">Fontes e controles na referência de segurança</Link> · <Link to="/ai-development-toolkit/agent-security">AI Agent Security</Link>. Esses progressos são independentes da etapa.</p>}
  <h3>Práticas e evidências</h3><ul>{m.tasks.map(n=>{const t=tasks14.find(t=>t.id==='14-ex-'+n)!;return <li key={t.id}><Link to={'/etapas/14/exercicios/'+t.slug}>{t.title}</Link> — {attemptFor(pilot,t.id)?.status==='concluido'?'Concluído por autoavaliação':attemptFor(pilot,t.id)?.status==='em-andamento'?'Em andamento':'A praticar'}</li>;})}</ul>
  {m.id==='14-integrated-project'&&<Link className="pf-button primary" to="/etapas/14/projeto">Backend Observável e Confiável com IA aplicada</Link>}
  <Link to={'/etapas/14/topicos/'+m.id}>Objetivo, fontes e registro de estudo</Link>
  <ul>{reliabilityReferenceIds(m.refs,pilot.track).map(id=>{const r=references14.find(r=>r.id===id);return r?<li key={id}><a href={r.url} target="_blank" rel="noreferrer">{r.title} ↗</a> — {r.section}. {r.version}; {r.language}; {r.cost}. Consulta:{r.checked}.</li>:null;})}</ul>
 </details>)}
 <p className="pf-meta">Dificuldade de hardware permite analisar fixtures explicitamente sintéticas; análise não equivale a telemetria/dashboard/worker executados. Registre o que falta validar. A Etapa15 permanece em preparação e mantém seu projeto final Pleno.</p>
 </section>;}
