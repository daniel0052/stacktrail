# Etapa14 — Observabilidade e IA aplicada

Recorte autossuficiente do anexo2cbe84f1, lido integralmente em23/10/2026. Technical Title: **Observability, Applied AI & Backend Reliability**. Formação Pleno, preparando o projeto final15 sem implementá-lo. Título e IDs13/15 preservados;00–14 disponíveis,15–19 pendentes. Nenhum commit/push/publicação automática.

## Resultado e arquitetura

`src/practice/stage-fourteen.ts` separa catálogo, contratos, fontes e resolução por stack. `StageFourteenModules.tsx` apresenta12módulos progressivos com objetivo, pré-requisito, recorte, explicação, exemplo referencial original, fonte e evidência discriminante. Conteúdo explicativo foi expressamente autorizado apenas nesta etapa; exemplos de domínio distinto não resolvem os laboratórios. Fragmentos de Manual Span pressupõem SDK/tracer inicializado e não são apresentados como instalação executada.

Integrações: `curriculum.ts`, `StudyPages.tsx`, `Shared.tsx`, `ActivityPage.tsx`, `App.tsx`, `preparation.ts`, `preparation-prompt.ts`, `prompts.ts`, `progress.tsx`, `ProgressPage.tsx`, `achievements.ts` e metadados de roadmap. Sem dependência,backend,banco ouAPI deIA para plataforma. HashRouter e base`/stacktrail/` preservados.

## Mapa curricular

| Módulo | Práticas | Evidência principal |
| --- | --- | --- |
|01 Observability Fundamentals|01–02|Diagnosis Report,Observability Checklist,Monitoring Plan,SLI/SLO/budget com população/janela|
|02 OpenTelemetry & Instrumentation|03–04|SDK compatível,bootstrap,span/atributos/eventos,exportação e erro|
|03 Distributed Tracing|05–06|ContextoHTTP/Queue,critical path,logs correlacionados,RCA com hipótese testada|
|04 Metrics,Dashboards & Alerting|07–08|Dashboard/queries,labels/buckets limitados,alerta acionável/recuperação/no-data|
|05 Context Engineering|09–10|Contexto autossuficiente,contratos,limites e comparação sem aceitar dados como instrução|
|06 Agent Configuration|11–12|Rules,Skill útil,Workflow e árvore compatível;Hook só suportado/justificado|
|07 MCP & Agent Execution|13–14|Matriz capacidade→risco→limite→evidência,menor privilégio e decisãoMCP|
|08 Agent Evaluation & Security|15–16|Dataset/casos/denominadores,revisão humana e controles com ediçãoOWASP|
|09 Advanced Testing Strategy|17–18|Risk-Based Strategy,boundary/property/mutation e investigação de flake|
|10 Contract,Database & Async Testing|19–20|Consumer/provider,rollback/constraints/concorrência,reentrega/idempotência real|
|11 Reliability & CI Quality Gates|21–22|Deadline/IO/retry/recuperação,gates que detectam regressão e retêm artefato|
|12 Integrated Project|Integrador|Sete marcos,Quality Audit,README e evidências dos três eixos|

22exercícios originais:3iniciais,11intermediários,8avançados. São requisitos autorais de conclusão:12tópicos,22exercícios,integrador e síntese; não representam mínimo universal de competência. Uma stack basta e pré-requisitos não bloqueiam acesso. Progresso é declarado,sem certificação.

## Guided Labs

Inventário completo por ID e contrato em`quality/stage14/inventory.json`: **A11/B11/C1**. A começa com fixture/documento/ideia e não mostra botão de base; B gera somente estado inicial; C admite projeto próprio ou alternativa independente. As preparadoras não geram diagnóstico,localização da causa,patch,suíte-alvo ou relatório final. Dados sintéticos,loopback,seed/reset/estímulos limitados; smoke inicial não prova solução.

Oito labs pedidos:Missing Trace Context05,Slow Request Investigation06,Dashboard and Alerting07,Context Engineering09,Unsafe Agent Configuration13,Flaky Test Investigation18,Duplicate Event Delivery20 eDependency Failure21.09/13 são documentais(A),sem runtime ou credenciais; os demais têm baseB. Há ainda bases para03/04/17/19/22. IntegradorC não exige etapa13 concluída.

## Integrador

**Backend Observável e Confiável com IA aplicada**:Users,Products,Inventory,Orders,Payments simulados,Events/Jobs eHTTP cooperante local. Sete marcos:contratos/risco/base;instrumentação;dashboard/alerta/RCA;agente/contexto/permissões/avaliação;testes de fronteiras;falhas/recuperação/CI;Regression/Quality Audit/README/passagem para15.

Entregas:código,Compose,OpenTelemetry,Dashboard,Structured Logs,Trace Examples,Test Suite/Strategy/Reports,CI Workflow,Agent Configuration/Evaluation Report,Reliability Report,Quality Audit eREADME. Hooks/MCP não obrigatórios:suporte,necessidade e segurança precisam justificativa. A execução de avaliação de agente no integrador requer evidência externa real; sem acesso,esse marco fica não verificado. Workflow pode ser sequência documental se o cliente não tiver arquivo nativo.

Quality Audit é rascunho editável na reflexão do integrador,com estrutura vazia opcional. Inserção não substitui rascunho existente. Edição invalida checklist/revisão/conclusão anterior,sem apagar solução. Template com12seções organiza evidências e limites,sem preencher resultado pelo estudante.

## Duas trilhas e autonomia

- PHP/Laravel:SDKOpenTelemetry manual compatível ouextensão+Composer+SDK+instrumentation; suporte oficialLaravel não presumido. PHPUnit/Pest,DB::transaction/RefreshDatabase comPostgreSQL real;Pint/PHPStan/Composer audit conforme compatibilidade;JobsRedis/queue:work.
- TypeScript/Node/Express:NodeSDK antes dosimports,hookESM conforme runtime;Vitest/Jest,pg/Knex na mesma conexão/trx;BullMQRedis e cancelamentoIO real. Express não fornece transações/filas automaticamente.

Fakes não comprovam worker/IO,banco ou concorrência reais. Duas conexões independentes/barreiras verificam interleavings. Timeout não prova ausência de efeito externo;retries exigem limites/idempotência. Fixtures não são traces oubenchmarks medidos. Falta de hardware admite análise explicitamente não executada,sem declarar ambiente validado.

Toolkit eSecurity são links opcionais comprogressos independentes. Cinco plataformas reutilizadas por superfície:Codex,ClaudeCode,Cursor,CopilotVSCodeLocal eAntigravityApp comSubagents. Paths/configurações doToolkit são evidência datada22/10,rever cliente instalado antes de ativar. NenhumHook/MCP/ACS instalado nesta mudança.

## Fontes e auditorias

63registros commetadados/seções/idioma/custo/versões em`quality/stage14/sources.json`;35fontes técnicas diretas e28entradas deplataforma herdadas. Leitura primária web e revisão independente datadas;GET separado35/35HTTP200 fora da restrição de rede,sandbox inicialmente não conseguiu consultar. HTTP200 não prova adequação. Fontes eminglês,leitura gratuita;clientes externos podem exigir plano próprio. Sem novoslivros/capas;arquivos/rotas das capas anteriores preservados.

Correções após revisão independente:sobreposição deproibiçãoDocker nofallback da preparadora;lacuna defontes PHP/timeout/retry;ediçãoLLM2026 distinta de2025;AISVSartefato1.01 versus landing1.0;AST1.0-2026Incubator;pending/firingPrometheus distintos de cenário semdados. Revisão estática não comprova execução deSDK,cliente deagente,banco oubase futura.

## Validação e limites

Resultados finais ficam em`quality/stage14/validation.json`,logs/tests correspondentes e`QUALITY_AUDIT.md`. Primeiras rodadas identificaram assertivas históricas que ainda tratavam14comofutura e erro noteste que interpretava atributoHTML`open=""` como falso;corrigidos preservando15futura e cobrindo a interação real.

Nenhum exemplo oufuturo projeto deestudante foi executado. Não há alegação de certificaçãoWCAG,segurança universal oucapacidade deprodução. Build pode manter aviso já existente dechunkgrande;nenhum limite foi ocultado.

## Correção de acessibilidade encontrada na varredura global

A inclusão das áreas independentes no inventário detectou no Inglês/tema claro contraste4,47:1 no selo Em andamento sobre ocard selecionado. Corrigido deforma localizada empractice.css,usando texto semântico e preservando bordaaccent. Nenhum conteúdo ouprogresso doInglês foi alterado. Evidência/recálculo eretestes emquality/stage14.

## Arquivos da mudança

- `AGENTS.md`
- `README.md`
- `docs/CONTENT_VERIFICATION.md`
- `docs/DOCUMENTATION_AUDIT.md`
- `docs/GUIDED_LABS.md`
- `docs/README.md`
- `docs/QUALITY_AUDIT.md`
- `e2e/published-routes.spec.ts`
- `e2e/stage-thirteen.spec.ts`
- `playwright.practice.config.ts`
- `scripts/check-practice-links.mjs`
- `src/content/roadmap.ts`
- `src/practice/ActivityPage.tsx`
- `src/practice/App.tsx`
- `src/practice/ProgressPage.tsx`
- `src/practice/Shared.tsx`
- `src/practice/StudyPages.tsx`
- `src/practice/achievements.ts`
- `src/practice/curriculum.ts`
- `src/practice/practice.css`
- `src/practice/preparation-prompt.ts`
- `src/practice/preparation.ts`
- `src/practice/progress.tsx`
- `src/practice/prompts.ts`
- `src/tests/guided-labs.test.ts`
- `src/tests/stage-eight.test.ts`
- `src/tests/stage-eleven.test.ts`
- `src/tests/stage-seven.test.ts`
- `src/tests/stage-ten.test.ts`
- `src/tests/stage-thirteen.test.ts`
- `src/tests/stage-twelve.test.ts`
- `docs/STAGE_14_IMPLEMENTATION.md`
- `e2e/stage-fourteen.spec.ts`
- `src/practice/StageFourteenModules.tsx`
- `src/practice/stage-fourteen.ts`
- `src/tests/stage-fourteen.test.ts`

Evidências datadas e capturas adicionais ficam em`docs/quality/stage14/`.

## Correção do modal compartilhado

O teste deTab repetido no diálogo encontrou saída do foco do conteúdo. ActivityPage.tsx agora mantém cicloTab/Shift+Tab entre controles do diálogo;Escape e retorno ao acionador permanecem. Regressão real do modal14 e fluxos de prompts/copiar/persistência/capas nas duas stacks13 passaram (3testes,13,2s). A mudança é de interação,sem execução/envio de prompts.

## Resultado final —25/10/2026

Typecheck,lint,build e isolamento aprovados.59arquivos/575testes unitários aprovados;6testes focados finais aprovados. Seis cenáriosUI14 aprovados,40rotas novas nos dois temas,cinco larguras efonte150%,modal/axe/teclado,cópia,persistência/conclusão/reversão. Varredura global536rotas/tema:18lotes cobertos após reteste localizado do contraste doInglês;regressão compartilhada de modal14/fluxos13:3cenários aprovados. Qualidade/fontes/inventário/arquivos descritos acima;dados detalhados emquality/stage14/validation.json.

Pendências/limites:zoom real200/400 bloqueado pelo lançamentoChromium spawn UNKNOWN;snippets e futuros projetos externos não executados;aviso dechunkgrande preservado. Nenhumoutro bloqueante identificado no recorte executado. Semcommit,push oupublicação.
