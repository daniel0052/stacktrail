# Etapa 07 — Segurança, autenticação e autorização

**Estado atual em18/10/2026:** implementação07 integrada; typecheck/lint/build globais passaram na reconferência após concluir a edição concorrente.472 testes unitários passaram;11 fluxos de navegador compartilhados e3 fluxos07 reconferidos passaram. Zoom real200%/400% permanece pendente por falha do contexto Chrome+extensão. Sem commit/push/deploy. As rodadas intermediárias abaixo são histórico, não anulam este estado.

## Fonte curricular e limites

Pedido integral fornecido em anexo pelo usuário em 18/10/2026, intitulado “StackTrail 2.0 — Implementar Etapa 07”. O pedido dispensa Notion; não foi consultado nem editado. Objetivos e rubrica são curriculares fornecidos; enunciados detalhados, critérios de conclusão e organização dos tópicos são elaboração original autorizada. Sem aulas, gabaritos ou execução de código do estudante.

## Lacunas antes da implementação

| Local | Gravidade | Lacuna | Estado inicial |
| --- | --- | --- | --- |
| curriculum/progress/StudyPages/Shared/App | Alta | Publicação, trilhas, navegação e estado limitados a00–06 | Pendente |
| Catálogo07 | Alta | Objetivos, atividades, projetos e fontes ainda ausentes | Pendente |
| Prompts | Alta | Fallback da07 cairia no texto da04 | Pendente |
| Contratos de segurança | Alta | Distinguir web redirect vs JSON401; comprovação de posse pública; CSRF em teste real | Pendente |
| Curadoria | Alta | Bibliotecas/edições precisam de consulta técnica independente | Pendente |
| Progresso/UI | Alta | Conclusão/reversão e filtros07 ainda sem evidência | Pendente |

As etapas anteriores e o legado são preservados. A implementação não instala bibliotecas de backend no StackTrail e não cria autenticação, banco, uploads ou serviços. Sem commit, push ou deploy.


## Implementação e mapa de cobertura

`src/practice/stage-seven.ts` contém16 tópicos,9 exercícios e3 projetos. Cada trilha tem12 tópicos base (9 comuns+3 específicos) e1 aprofundamento opcional comum. Não há aulas, trechos de solução ou API do StackTrail. IDs curriculares07 são novos e estáveis.

| Competência / objetivos fornecidos | Tópicos | Práticas e evidências |
| --- | --- | --- |
| CIA, privilégio mínimo, defesa em profundidade, negar por padrão |07-principios,identidade |01: mapa SaaS, matriz e contrato público/privado |
| Hash/salt/custo, credenciais, enumeração |07-senhas,operacao |02: loja; verificação, persistência e sinais de resposta |
| Sessão/cookies/HTTPS, login/logout, regeneração/invalidação |07-sessoes + tópicos da stack |02/03: ciclo de sessão e rotas de RH |
|401/403/404, ownership, Gates/Policies/middleware, BOLA |07-identidade,recursos + Policies/regras |03/04: convidado, cliente, dono e administrador; sem efeito na negação |
| Validação, SQL parametrizado, mass assignment, dados e LGPD |07-dados |05: clínica sintética; payload restrito e resposta mínima |
| XSS contextual, CSRF e CORS |07-csrf-xss + CSRF da stack |02/05/06: proteção ativa, saída por contexto; não confundir CORS com autenticação |
| Rate limiting, segredos, logs, configuração |07-operacao |02 básico;08 opcional aprofunda limites/proxy/store/eventos |
| Reserva sem conta e prova de posse |07-testes |06/Booking: prova ausente/errada/alheia/expirada/válida, revogação e ausência de vazamento |
| RBAC, auditoria e mitigação |07-recursos,testes,dados |07 ERP e09 auditoria local opcionais |
| OAuth2/JWT/SSO |07-tokens |Recorte conceitual opcional com RFC/OIDC; nenhuma implementação exigida |

Os enunciados incluem contexto/setor, objetivo, stack, pré-requisitos, requisitos/restrições, aceitação, casos sugeridos,3 dicas, fontes e rubrica. Os casos são contratos propostos, não testes executados de uma solução de estudante. O exercício01 pede somente modelagem; banco/código não são pré-requisito dessa atividade.

### Projetos e níveis

- **Inicial — Secure Admin Login** (e-commerce, opcional): login/logout, hash/sessão, rotas privadas, testes, matriz e .env.example.
- **Intermediário — Multi-User Resource API** (SaaS/marketplace, opcional): ownership, BOLA, resposta mínima, matriz e ADR curta.
- **Avançado — Secure Booking Platform** (reservas, integrador): administração privada e reserva pública com posse apropriada, dados mínimos e testes negativos. Aceita continuidade de Booking anterior.

Todos têm contexto/problema, objetivos/competências, requisitos funcionais/não funcionais, marcos, entregáveis, rubrica, fontes e extras proporcionais. Uma stack basta. Nenhum serviço financeiro/clínico real, banco da plataforma ou teste contra terceiros é criado.

### Conclusão e persistência

Critério autoral visível:12 tópicos base da stack,3 iniciais,3 intermediários, projeto Booking e síntese. Os3 avançados e os2 projetos de progressão são opcionais. Rubrica fornecida: autenticação25%, autorização30%, entradas20%, testes15%, configuração10%; sem nota automática.

Tentativas07 guardam IDs curriculares com sufixo `@php`/`@javascript` em `attempts`; `attemptFor`/`withAttempt` concentram leitura/gravação. `securityEvidence` guarda sínteses separadas. Parser aceita esquema2 anterior sem esses campos e associa eventual registro07 sem sufixo somente à stack selecionada no dado migrado, sem duplicar aprovação. Tópicos comuns podem ser compartilhados; tópicos específicos têm IDs próprios. Troca de stack preserva ambos os rascunhos/checklists/revisões; etapa e conquistas são recalculadas pela trilha ativa. Pausa da etapa preserva registros e não vira conclusão. Nenhuma chave de legado é removida/sobrescrita.

### Interface

Hero07 próprio usa identidade/recurso/ação e evidências, sem simulador nem cadeados decorativos. Navegação mantém20 etapas e a área profissional concorrente; não acrescenta item07 ao menu. StageSelect mantém a prioridade URL/preferência/etapa ativa/primeira, filtros combinados e carregamento incremental existentes. Setor é resetado ao mudar etapa para evitar um valor05 inválido em07. Atividades07 exibem stack ativa e aviso de separação. Ajuda/revisão são modais editáveis com cópia explícita e sem envio automático.

### Arquivos principais

- Conteúdo: `src/practice/stage-seven.ts`, agregação em `curriculum.ts`, metadados07 em `src/content/roadmap.ts`.
- UI: `StudyPages.tsx`, `Shared.tsx`, `ActivityPage.tsx`, `ProgressPage.tsx`, `App.tsx`, `practice.css`.
- Estado/prompts: `progress.tsx`, `achievements.ts`, `prompts.ts`.
- Verificação: `src/tests/stage-seven.test.ts`, `e2e/practice.spec.ts`, `scripts/check-practice-links.mjs`.
- Portabilidade de testes legados: normalização CRLF em `factcheck-stage-one.test.ts` e `web-lesson-examples.test.ts`; CRLF e fileURLToPath no compilador virtual de `study-snippets.test.ts`. Conteúdos MDX legados permanecem intactos.
- Documentação: AGENTS, README, índice/auditoria documental, CONTENT_VERIFICATION, QUALITY_AUDIT e evidências07.

## Revisões e limites de curadoria

Revisores independentes somente leitura apontaram: tentativas compartilhadas, livros ausentes, fontes opcionais insuficientes, banco indevido no ex01, challenge401 fictício, link BOLA e contexto de stack/filtro de setor na UI. Correções foram incorporadas e reconferidas estaticamente; execuçãoUI é registrada abaixo quando concluída. Não houve consenso presumido ou aprovação por build.

Fontes: OWASP, Laravel13, Express/session, node-argon2, express-rate-limit, csrf-sync, RFC9110, LGPD, OAuth/JWT/OIDC. Detalhes no CONTENT_VERIFICATION. Foram abertas as páginas e recortes relevantes, separados dos GETs:29/30 URLs07 responderam200; o GET Node da LGPD falhou, enquanto consulta web foi legível. Classificação das bibliotecas: dependente de versão/contexto; releases/documentação consultadas, sem instalar/ensaiar backend de estudante.

Livros opcionais identificados por título/autor/idioma/ano/ISBN nos catálogos: Leandro Silva2026/PT-BR, Malcolm McDonald2020/EN e Neil Madden2020/EN. Não inferir ordinal1ª/2ª ausente no catálogo; os cards usam publicação e ISBN. Nenhuma obra integral lida. Capas07 em placeholders por falta de licença específica demonstrada; alternativas gratuitas permanecem disponíveis.


## Resultados executados em18/10/2026

| Verificação | Resultado observado |
| --- | --- |
| `npm run typecheck` | Passou na rodada final; houve erro transitório de variáveis não usadas em EnglishJourneyPage durante edição concorrente, resolvido pelo trabalho paralelo antes da reconferência. Nenhum conteúdo dessa área foi alterado nesta tarefa. |
| `npm run lint` | Passou na rodada final. |
| `npm test -- --maxWorkers=2` |47 arquivos /460 testes passaram. A primeira rodada teve3 falhas de portabilidade em testes legados; correções somente de CRLF/URL de arquivo; os6 casos desses3 arquivos e depois toda a suíte passaram. |
| `npm run build` | Passou; HashRouter e base /stacktrail/ preservados. Vite avisa chunk acima de500kB; não foi escondido nem tratado como erro. |
| `node scripts/check-practice-build.mjs` | Passou:27 arquivos, sem ZIP/MDX/entry de legado no build principal. Verificação por sentinelas não é auditoria universal de código. |
| `node scripts/check-practice-links.mjs` |233 URLs globais,222 respostas200; recorte07:29/30 respostas200. LGPD: falha do cliente Node e leitura web separada. GET não prova adequação. |
| `npm run test:ui` (rodada global) |30/32 passaram. Duas falhas: seletor de estatísticas ambíguo após nova área profissional (corrigido e retestado) e lançamento do navegador de zoom real (`spawn UNKNOWN`, persistiu na repetição). |
| Reconferência `npm run test:ui -- --grep "Stage07:|progress, in-progress activities|stage 0[0-6] completion"` |11/11 passaram no build final: atividades, prompts/foco, síntese, recarga, conclusão/reversão, menu e regressões00–06. |
| Etapa07 isolada |3/3 fluxos passaram: trilhas/filtros/rascunhos/pausa, conclusão/card100%/reversão, reflow/temas/livros/modal/axe. |
| Larguras/fonte |320/375/768/1024/1440 nos dois temas, fonte150%, sem overflow do documento nas rotas07, integrador, exercícios e referências. Modal07 em320/375 fecha porEsc e devolve foco. |
| Axe e inspeção |Varredura das rotas técnicas publicadas e catálogos nos dois temas sem violações automáticas; inspeção visual do hero e capturas datadas. Não certifica WCAG nem substitui revisão humana de todos os estados. |
| Zoom real200%/400% |**Pendente**: contexto persistente do Chrome for Testing com extensão não iniciou neste Windows (`spawn UNKNOWN`) mesmo após instalação/repetição. Fonte150%, viewport e reflow não foram apresentados como browser zoom. |

A primeira tentativa de instalação `npm ci --ignore-scripts` encontrou um arquivo nativo em uso no Windows; dependências existentes foram restauradas sem modificar package.json/package-lock por `npm install --ignore-scripts --no-save --package-lock=false`. Chromium oficial do Playwright foi instalado para os testes; o headless shell funciona, o contexto de extensão para zoom real não. Nenhum serviço ou proteção do sistema foi alterado.

## Evidências, limites e estado final

`quality/stage07/` contém resumo JSON, relatórios de acesso, logs das rodadas e capturas de temas/larguras/hero. As rotas técnicas00–07 foram varridas; as áreas profissionais e de inglês receberam alterações concorrentes e não são objeto de aprovação pedagógica/técnica nesta migração. O relatório global foi executado no snapshot anterior à última integração dessas áreas; a rodada final reconferiu07 e estados compartilhados essenciais. Preservados esses trabalhos e seus dados.

- Lacunas de publicação, prompt, tentativas por stack, ex01, livros, referênciaBOLA, seletor de stack e filtro de setor: **corrigidas e verificadas no recorte descrito**.
- Sem gabaritos observados nas revisões independentes; sem execução de código do estudante, backend, autenticação da plataforma ou API de IA.
- Curadoria técnica dependente de versão/contexto: não houve instalação/execução de uma aplicaçãoLaravel/Express do estudante. Nenhum teste da plataforma comprova que um projeto do estudante é seguro.
- Capas07 não redistribuídas por ausência de licença específica demonstrada; edições identificadas por ano/ISBN, sem inventar ordinal.
- **Zoom real segue pendente**; não se declara aprovação global irrestrita de acessibilidade.
- Branch permaneceu `main` (estado encontrado); nenhum commit, push, deploy ou edição deNotion.


### Rodada durante edição concorrente (histórico)

O trabalho concorrente de Inglês acrescentou novos testes e uma função de arraste depois das primeiras rodadas. Nessa execução intermediária:

- `npm test -- --maxWorkers=2`: **48 arquivos /472 testes passaram**, incluindo a nova suíte concorrente.
- `npm run typecheck` e `npm run lint`: **falharam somente em `src/practice/EnglishJourneyPage.tsx:50`**, `useDragScroll` definido e ainda não utilizado. Esse arquivo foi preservado, sem correção/remoção de trabalho alheio.
- `npm run build`: a tentativa posterior também encontrou a edição concorrente; não existe aprovação global final desse comando. Relatos de build/typecheck/lint passando acima correspondem a snapshots intermediários e não anulam essa pendência atual.
- Typecheck específico temporário dos arquivos07/integração/estado/testes: passou. `npx vite build` para QA visual passou e `check-practice-build` confirmou isolamento/GitHubPages. O buildVite de QA **não substitui o typecheck global**.
- Após reduzir padding/escala do título do hero07 mobile, **3/3 fluxos07 passaram novamente** no buildVite de QA, com screenshots atualizadas, fontes150%, larguras320–1440 e dois temas.
- A rodada compartilhada11/11 (progresso/menu00–06 e07) permanece evidência do snapshot anterior. A varredura técnica global passou30/32; o seletor de estatísticas foi corrigido/retestado. O zoom real continua não verificado por falha de lançamento do navegador.

Pendências dessa rodada: (1) conclusão da edição concorrente que deixou `useDragScroll` não utilizado e nova rodada dos comandos globais; (2) zoom real200%/400% em ambiente onde Chrome+extensão inicie. Não se declarou aprovação global sem essas evidências. Arquivos alterados desta tarefa e os trabalhos paralelos permanecem sem commit/push/deploy.

### Fechamento após a edição concorrente

O autor da áreaInglês passou a utilizar o hook pendente. Nova execução global retornou **typecheck=0, lint=0, build=0**; registros finais estão em `final-typecheck.txt`, `final-lint.txt` e `build.txt`. O erro concorrente foi resolvido sem editar os arquivos alheios nesta tarefa. `check-practice-build` foi reconferido após o build. A suite unitária mais recente é48 arquivos/472 testes. Permanece somente a lacuna de zoom real, além dos limites de curadoria/runtime já declarados; não há certificação de segurança/WCAG.
