import {Link} from 'react-router-dom';
import {modules11,tasks11} from './stage-eleven';
import {attemptFor,usePilot} from './progress';
const adrTemplate11=`# ADR-001 — [Título da decisão]

Status: [proposta / aceita / rejeitada / substituída]
Data: [AAAA-MM-DD]

## Contexto
[Restrições e evidências do seu projeto]

## Problema
[Decisão necessária e resultado esperado]

## Alternativas
[Opção A e opção B, com custos e riscos]

## Decisão
[Escolha e justificativa a preencher pelo estudante]

## Consequências
[Benefícios, custos, limites e condição para revisão]`;
export function StageElevenModules(){const {pilot}=usePilot();return <section className="pf-panel pf-modules11" aria-labelledby="modules11-title"><h2 id="modules11-title">Nove módulos de arquitetura pragmática</h2><p>Escolha Laravel ou Express. As fontes ensinam; estes objetivos orientam comparação, prática e verificação. Pré-requisitos recomendam revisão, sem bloquear acesso. Uma solução pequena pode ser a melhor decisão.</p>{modules11.map(m=><details name="stage11-modules" key={m.id}><summary>{m.name}{pilot.studied.includes(m.id)?' · ✓ Estudo registrado':''}</summary><p>{m.goal}</p><p>{m.scope}</p><p><strong>Antes de começar:</strong> {m.before}</p><p><strong>Abordagens a comparar:</strong> {m.compare}</p><p><strong>Erros a investigar:</strong> {m.pitfall}</p><p><strong>Estratégia de verificação:</strong> {m.verify}</p><p><strong>Evidência esperada:</strong> {m.criterion}</p><Link to={`/etapas/11/topicos/${m.id}`}>Objetivo e fontes</Link><ul>{m.tasks.map(n=>{const t=tasks11.find(t=>t.id==='11-ex-'+n)!;return <li key={n}><Link to={`/etapas/11/exercicios/${t.slug}`}>{t.title}</Link> — {attemptFor(pilot,t.id)?.status==='concluido'?'Concluído por autoavaliação':attemptFor(pilot,t.id)?.status==='em-andamento'?'Em andamento':'A praticar'}</li>;})}</ul>{m.id==='11-evolution'&&<section aria-label="Modelo vazio de registro arquitetural"><h3>Modelo vazio de ADR</h3><p>Preencha com uma decisão do seu projeto. Os campos não contêm uma solução arquitetural predeterminada.</p><pre className="pf-adr-template" role="region" aria-label="Modelo Markdown de ADR para preencher" tabIndex={0}>{adrTemplate11}</pre></section>}{m.id==='11-project'&&<Link className="pf-button primary" to="/etapas/11/projeto">Sistema de Gestão de Reservas e Disponibilidade</Link>}</details>)}<p className="pf-meta">Casos e saídas são contratos de prática. Seu código e os testes são executados no seu ambiente. O StackTrail registra autoavaliação e não certifica arquitetura ou competência profissional.</p></section>;}
