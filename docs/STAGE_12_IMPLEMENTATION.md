# Etapa 12 — Processamento Assíncrono, Filas e Mensageria

Implementação de 20/10/2026, baseada no anexo autossuficiente `251af660`. Etapas 00–12 disponíveis; 13–19 permanecem em preparação. Preservadas as formações Júnior 00–09, Pleno 10–15 e Sênior 16–19.

## Conteúdo implementado

| Módulo | Prática e evidência principal |
| --- | --- |
| 01 — Fundamentos | Decisões síncronas/assíncronas, falhas parciais e contrato de documento em segundo plano. |
| 02 — Redis | Estruturas, contador com TTL, cache/invalidação, memória e persistência. |
| 03 — Filas, jobs e workers | Processos separados, indisponibilidade, reserva/locks, interrupção e recuperação. |
| 04 — Retentativas e falhas | Backoff/jitter, deadline, erro permanente, quarentena, duplicatas e replay. |
| 05 — Eventos | Eventos internos versus integração, handlers e evolução de contratos. |
| 06 — RabbitMQ | Exchanges/bindings, confirms/return/ack, prefetch, durabilidade, DLX/DLQ. |
| 07 — Outbox e Inbox | Atomicidade, dispatcher, deduplicação concorrente e efeito remoto cooperante. |
| 08 — Operação | Backlog, concorrência, métricas, correlação, saúde, shutdown e runbook. |
| 09 — Integrador | Plataforma de Processamento Assíncrono de Pedidos, em sete marcos. |

São **18 exercícios: 4 iniciais, 7 intermediários e 7 avançados**, em e-commerce, logística, agendamentos e serviços. Cada contrato inclui objetivo, contexto, pré-requisitos, requisitos, entradas/saídas, casos adversos, três dicas graduais, rubrica, entregáveis e evidências. O catálogo preserva filtros combinados e carregamento incremental em lotes de 12.

As orientações são curtas e acompanhadas de fontes externas. Não foram publicadas aulas, tutoriais, gabaritos ou código de solução no cliente.

## Trilhas e integrador

Uma única stack basta:

- Laravel: Jobs/dispatch, `queue:work` e Redis; Events/Listeners; php-amqplib em comandos Artisan separados. Horizon opcional.
- Express/TypeScript: BullMQ Queue/Worker e Redis; eventos internos Node; amqplib em processos separados. Handler interno pode despachar job para trabalho posterior.

Nenhuma dependência foi adicionada à plataforma. PostgreSQL, Redis, RabbitMQ, Docker Compose e os workers pertencem ao ambiente do estudante. Não há backend, fila ou execução de soluções no site. Java, NestJS, frontend, microsserviços e cluster de produção não são requisitos.

O integrador exige API de pedidos/estoque, transações, jobs, eventos, contratos, Outbox/Inbox, retries, DLQ/replay, histórico, observabilidade e testes de recuperação. Sete marcos conduzem de contratos e API até falhas, operação, README, diagrama e decisões. A rubrica consultiva não calcula nota automaticamente.

Publisher confirm, retorno não roteável e ack do consumidor são contratos distintos. Outbox admite republicação; Inbox e efeito SQL precisam ser atômicos por consumidor. Efeito HTTP externo usa receptor sintético cooperante com chave/ledger e limites de retenção. Não se promete exactly-once end-to-end. Failed jobs de Redis não são DLQ AMQP.

## Progresso e laboratórios

Regra autoral de conclusão declarada: 10 tópicos da stack escolhida (nove comuns e um específico), 18 exercícios, integrador e síntese. Tentativas usam `12-ex-XX@php`/`@javascript`; a síntese usa `asyncEvidence`, opcional no esquema 2. Dados antigos continuam válidos; outras etapas e áreas independentes mantêm seus registros. Edição invalida critérios, parada preserva rascunhos e conclusão/conquistas são reversíveis.

Inventário **A4/B8/C7** em [inventory.json](quality/stage12/inventory.json) e [GUIDED_LABS.md](GUIDED_LABS.md). Bases C admitem alternativa mínima sem projeto anterior. A preparadora fornece apenas estado inicial, instalação/smoke e reprodução, sem diagnóstico, patch ou suíte-alvo. Tutora oferece pistas; revisora solicita evidências e distingue fatos, hipóteses e não verificado. Prompts são editáveis e copiados explicitamente, sem envio automático.

## Fontes, livros e revisões

São 26 referências técnicas primárias, gratuitas e em inglês, com seções, versões e limitações registradas em [sources.json](quality/stage12/sources.json). GET separado: 28/28 HTTP 200 nesta rodada, incluindo dois catálogos; acesso não equivale à adequação. Consultadas documentação Laravel 13, RabbitMQ 4.4 e PostgreSQL current 18. Compatibilidade dos ambientes futuros deve ser verificada com as versões instaladas.

Livros pagos e opcionais em português brasileiro: **Projetando Sistemas Distribuídos**, Brendan Burns, 2ª edição, 2025; **Criando Microsserviços**, Sam Newman, 2ª edição, 2022. Catálogos e sumários consultados; obras integrais não lidas. Capas frontais reais verificadas visualmente, convertidas em WebP e espelhadas em `public`/`public-roadmap`; sem hotlink. Proveniência e direitos conhecidos em [covers-origin.json](quality/stage12/covers-origin.json), sem presumir licença livre. Kubernetes/microsserviços são aprofundamento dos livros, sem requisito adicional no integrador.

Revisões pedagógica, factual e UI/UX estática independentes identificaram lacunas antes das correções. Resultados e reconferência em [reviews.md](quality/stage12/reviews.md) e [source-independent.md](quality/stage12/source-independent.md). Não restou bloqueante documental identificado. Essas revisões não comprovam instalação ou execução de código gerado futuramente.

## Arquivos principais

- Novos: `src/practice/stage-twelve.ts`, `StageTwelveModules.tsx`, testes unitários e de navegador da Etapa 12, capas e evidências em `quality/stage12/`.
- Integrações: curriculum, progress, achievements, preparation, preparation-prompt, prompts, StudyPages, Shared, App, ActivityPage, ProgressPage e roadmap. Estilos de módulos reutilizam tokens existentes.
- Documentação/verificação: README, AGENTS, índices/auditorias, inventário de laboratórios, script GET com recorte opcional e configuração/inventário Playwright.
- As alterações anteriores das capas foram preservadas. Sem commit, push ou deploy automático.

## Validação e limites

Os testes verificam o site e seus contratos; não executam futuras APIs do estudante nem comprovam desempenho ou durabilidade de brokers externos. Axe não certifica conformidade WCAG completa. O build conserva aviso de chunk grande. A geração de inventário via SSR emitiu aviso de porta HMR bloqueada no sandbox, mas concluiu os arquivos de evidência.

### Resultados executados

- Typecheck e lint passaram; suíte unitária: **55 arquivos / 541 testes aprovados**.
- Build e isolamento passaram: 80 arquivos, sem pacotes de estudo, ZIPs, MDX ou entry legado.
- GET das fontes: 28/28 HTTP 200, separado de adequação. Auditoria global de capas: 51 registros com imagem local, sem ausentes, hotlinks ou espelhos divergentes.
- Os cinco testes de navegador da Etapa12 passaram: duas stacks, filtros/vazios, três papéis de prompt com edição/cópia/foco, rascunho/parada/retomada, conclusão/recarga/edição/reversão, síntese por stack e preservação de dados11/legado. Quatro testes de regressão da11 passaram na rodada anterior.
- Reflow da12 verificado em 320/375/768/1024/1440 px, fonte150%, dois temas; inspeção visual de visão geral, Outbox e livros. Capturas em browser/.
- Varredura de **454 rotas por tema**, claro e escuro, completada em lotes, sem violações detectadas pelo axe nem overflow global nos recortes executados. A execução longa foi interrompida pelo runner após os12primeiros lotes; o preview deixado por ela foi encerrado e os quatro lotes restantes passaram na retomada. Ajustes editoriais finais da12 foram conferidos na rodada focada final.
- **Zoom real200%/400%** aprovado nos dois temas em visão geral, exercício e integrador, com modal aberto/focado/fechado. Usada extensão Chromium isolada com chrome.tabs.setZoom/getZoom; assertivas de viewportCSS e devicePixelRatio confirmam zoom de navegador, sem CSSzoom ou deviceScaleFactor simulado.

Limitação das capturas: o screenshot full-page do Chromium sob zoom 400% foi produzido com recorte de rasterização; a confirmação do zoom/reflow usa as assertivas de zoom, viewport, DPR e largura do documento. As capturas sem zoom foram inspecionadas visualmente.

Evidências e limites em [validation.json](quality/stage12/validation.json). Nenhuma pendência funcional/documental bloqueante identificada nos testes executados. Não houve execução dos projetos do estudante, publicação, commit ou push.
