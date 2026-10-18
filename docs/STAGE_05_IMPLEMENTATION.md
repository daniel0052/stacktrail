# Etapa 05 — SQL, PostgreSQL e persistência

Relatório de implementação em 18/10/2026. Estado dos testes ao final desta tarefa nas seções abaixo; não é certificação pedagógica/WCAG.

## Proveniência e recorte

Roadmap e [página 05 do Notion](https://app.notion.com/p/3f93cadfab778181b817fb8d5a8d342a) lidos integralmente via MCP em 18/10/2026, sem filhos ou continuação indicados. O Notion exige modelagem, SQL antes de Eloquent, PostgreSQL, migrations, constraints, relações, transações, índices e API persistida. O pedido anexado autoriza ampliar para TypeScript, setores diversos e alternativas ao agendamento. Enunciados e mínimos locais são autorais, rastreáveis ao pedido; Notion não prova precisão técnica. Nenhuma página Notion alterada.

## Cobertura

15 tópicos no catálogo: 10 comuns obrigatórios (modelo/chaves/cardinalidades; dependências/normalização; SQL DDL/DML/filtros; PostgreSQL/psql/tipos; agregações; JOIN/subconsulta/EXISTS/CTE; constraints; índices/planos; ACID/transações; parametrização/configuração), dois Laravel e dois TypeScript, mais intervalos opcional. Cada stack tem 12 tópicos obrigatórios. SQL é praticado manualmente antes da abstração. São exigidas 15 consultas próprias no caderno combinado, sem consultas resolvidas distribuídas.

| ID | Nível | Setor/problema | Evidência discriminante |
| --- | --- | --- | --- |
| 05-ex-01 | Inicial | E-commerce: catálogo, saldo e movimentos | PK/FK, saldo zero e UPDATE/DELETE com before/after; execução sequencial inicial |
| 05-ex-02 | Inicial | RH: colaboradores e departamentos | Dependências, anomalias, 3FN, reconstrução e ficha fictícia 1:1 |
| 05-ex-03 | Inicial | Educação: matrículas/pagamentos | Receita sem multiplicação, pendência, curso sem matrícula e limites temporais |
| 05-ex-04 | Intermediário | Logística: atrasos/desempenho | Ausências preservadas, JOIN, EXISTS/subconsulta/CTE e instante de corte |
| 05-ex-05 | Intermediário | SaaS: assinaturas/faturas | Violações diretamente no banco, ativo único e retenção de histórico |
| 05-ex-06 | Intermediário | Saúde sintética: atendimentos | Migrations/relações, SQL equivalente, medição de consultas repetidas e persistência |
| 05-ex-07 | Avançado | Fintech fictícia: transferência | NUMERIC, conservação de saldo e rollback após débito; concorrência limitada |
| 05-ex-08 | Avançado | Marketplace: planos | Dados assimétricos, estatísticas, dois planos antes/depois, sem garantia universal de ganho |
| 05-ex-09 | Avançado | ERP: recebimento/estoque | Recebimento multientidade atômico, repetição sequencial e falha no segundo item |

Projetos: **E-commerce Database** inicial e **Logistics Analytics** intermediário são opcionais. **SaaS Billing API** é o avançado principal; **Booking API com PostgreSQL — continuidade** e **Projeto autoral de persistência — proposta equivalente** são alternativas avançadas. Um dos três avançados satisfaz a unidade de projeto da conclusão, por autoavaliação; proposta autoral não recebe aprovação automática da plataforma. Os três avançados cobrem modelo/SQL, migrations, relações, constraints, transação/rollback, planos, API, testes PostgreSQL, README, .env.example, ADR e limites. Não há pagamentos reais, autenticação, Docker ou infraestrutura da plataforma.

## Trilhas e decisões técnicas

Laravel13/Eloquent: migrations, seeders, factories, belongsTo/hasMany/belongsToMany, Query Builder, eager loading, DB::transaction e testes com banco PostgreSQL separado. TypeScript/Express: **Knex 3.3.0 + pg 8.23.1**, query builder autorizado em alternativa a ORM, com migrations/seeds, driver/pool, joins, paginação, transações e testes. Documentação Knex consultada inclui bindings TypeScript best-effort: compilação não comprova SQL. Releases/package.json oficiais consultados: Node >=16 nas duas bibliotecas, bindings incluídos no Knex; pg usa tipos separados (@types/pg). A plataforma já usa Node24.15+; a aplicação local deve registrar seu ambiente. Registrar versões no README/lockfile; nenhuma dependência nova foi adicionada à plataforma. Prisma não foi selecionado: a revisão encontrou versões7/8 com APIs divergentes em URLs sem versão.

Rubrica do projeto integrado preserva 25% modelagem,25% SQL,20% integridade/transações,15% abstração/integração,15% testes/documentação. Meta8/10 é consultiva, sem nota automática. Exercícios e projetos SQL têm rubrica proporcional sem exigir ORM ou rollback quando não aplicável.

## Interface e progresso

Hero próprio com sequência Modelar → SQL/PostgreSQL → integração da API, sem editor/execução simulada. Mesmo menu, roadmap e filtros por etapa/dificuldade/status/trilha/busca, mais setor somente nos exercícios05. Livros/referências têm filtros de tipo/idioma/acesso e lotes12; link explícito para âncora pode expandir o catálogo para mostrar a referência solicitada.

Conclusão local: 12 tópicos+3 iniciais+3 intermediários+3 avançados+1 projeto avançado equivalente+síntese =23 unidades. Intervalos e projetos SQL opcionais não bloqueiam. Pausa preserva registros; edição de tentativa invalida critérios; reabertura recalcula conquista e card. Schema2 lê registros anteriores sem campo05 como evidência vazia. IDs antigos e chave legada preservados. Troca de stack mantém dados e filtra tópicos relacionados/prompts. Nenhum código estudantil executado.

## Revisões independentes e correções

Educator, somente leitura: progressão inicialmente2/4 por agregação precoce e pré-requisitos implícitos; corrigidos saldo inicial simples, prática posterior de reconciliação, JOIN explicitado no exercício03, relação1:1 contextualizada no RH e DML explícito. Rubrica local separada da ponderação do projeto. Reconferência: fidelidade/progressão/desafios/avaliação/fontes3/4, honestidade4/4 no escopo; sem medição com estudantes.

Factchecker, somente leitura: Knex identificado como query builder; documentação PostgreSQL18/Laravel13, pg e Knex consultada. Corrigidas referências específicas de operadores/ranges. UNIQUE parcial não garante qualquer intervalo; transação simples não garante ausência de corridas; EXPLAIN ANALYZE executa consulta. Tradução PT14.5 e simplificações BCcampus sobre2FN/BCNF têm ressalvas explícitas.

UI/UX, somente leitura e Chromium sintético: hero nos dois temas ×320/375/768/1024/1440 e fonte150% sem overflow ou pageerror; inspeção de capturas. Troca de stack por teclado e pausa/recarga/retomada executadas. Achados: livro gratuito tratado como pago; tópicos de duas stacks em integração; alternativas parecendo extras; biblioteca sem paginação; placeholder com nome sem papel. Correções implementadas e regressões adicionadas; validação final registrada abaixo.

## Fontes e livros

34 referências técnicas, com seção, idioma, versão, custo e data no catálogo e em CONTENT_VERIFICATION. Inglês quando não há tradução corrente confirmada; SQL em PT-BR é complemento comunitário14.5, não versão atual. HTTP GET separado de adequação documental.

Livros: Sistema de Banco de Dados, Silberschatz/Korth/Sudarshan,7ª edição2020, GEN/LTC, português, pago/opcional; SQL Guia Prático, Alice Zhao,2023, Novatec, português,4ª edição indicada na capa editorial; Database Design2ed, Watt/Eng, BCcampus2014, inglês, gratuito. Catálogo/sumário/recortes apenas, não obras integrais. Capas reais locais das três obras, após solicitação expressa do usuário; origem e créditos em CONTENT_VERIFICATION. Não alegamos licença aberta para as imagens comerciais. Não alegamos consenso comunitário nem exibimos preços/lojas.

## Validação e limitações

Resultados datados nas rodadas descritas abaixo; uma rodada parcial/interrompida não é promovida a aprovação global. Um processo externo Antigravity implementa06 simultaneamente em arquivos compartilhados, confirmado pelo usuário. Falhas de compilação transitórias da06 e contagens afetadas devem ser distinguidas da05. Não reverter esse trabalho nem promover06 a validada por esta auditoria.

Não houve execução de soluções SQL, Laravel ou Express dos estudantes, banco para StackTrail, sincronização, commit, push ou deploy. Teste local sob base /stacktrail/ comprova navegação estática, não publicação remota. Axe não certifica WCAG; aprendizagem real não medida.

### Resultados executados (recorte05)

- `npm test -- --maxWorkers=2`: rodada final após ajuste de expectativas de catálogo em evolução, **433 testes/44 arquivos passaram**. Rodadas anteriores falharam em expectativas estáticas de disponibilidade (05 recém-publicada e06 concorrente), não foram apresentadas como aprovação. Fixtures de testes preservam campos adicionais de schema2 sem importar conclusões futuras.
- `npm run lint`: passou. `git diff --check`: passou.
- `npm run typecheck` e `npm run build`: a rodada intermediária foi bloqueada por nove exercícios de `stage-six.ts` sem `rubric`/`deliverables` em construção. Não foram enfraquecidos tipos nem alterado o conteúdo06 para mascarar esse erro.
- `npm exec vite build`: bundle estático gerado para inspeção apesar da análise TypeScript bloqueada; **não equivale a `npm run build` aprovado**. Aviso de chunk acima500kB permanece.
- `node scripts/check-practice-build.mjs`: passou sobre esse bundle,21 arquivos, sem pacote de estudo/ZIP/MDX/entry legado.
- `npm run test:ui -- --grep 'Stage05|stage 05 completion|responsive screens|real browser zoom'`: **5/5 passaram**. Inclui70 visitas (35 rotas05 ×2 temas) com axe/reflow/ausência de pageerror, filtros de setor/stack/dificuldade/status, biblioteca gratuita/paga e lotes12, começar/parar/continuar projeto/exercício, pausa/retomada/recarga, checklist real final de etapa e reversão do card100%. Estado fictício usado só para preparar pré-condições; não se alegou aprendizagem.
- Matriz responsiva inclui320/375/768/1024/1440 e fonte150%. Zoom de navegador real com extensão Chromium `chrome.tabs.setZoom/getZoom`, fatores2/≈4, nos dois temas, incluindo05; não apenas viewport/CSSzoom. Axe sem violações no recorte; incompletos anexados pelo runner não são certificação.
- GET de172 URLs:168HTTP200; UFRN `fetch failed`; Cloudflare403; BCcampus ER/normalização403 no clienteNode. BCcampus foi efetivamente lido pelo cliente web: falhaGET não foi confundida com adequação. [Dados brutos](REFERENCE_LINK_CHECK.json).
- Uma primeira execução global de navegador foi interrompida ao detectar que usava build anterior às correções; **não é uma rodada aprovada**. Suíte global foi relançada depois para registrar regressões separadamente do recorte05.

A edição concorrente06 foi confirmada pelo usuário e preservada. Sua presença no catálogo não significa validação por esta tarefa. A rodada final após estabilização da06 é registrada separadamente; nenhum commit/push/deploy foi realizado.

### Arquivos do recorte05

- Conteúdo: `src/practice/stage-five.ts`; agregação em `curriculum.ts` e metadados do roadmap.
- Interface: `StudyPages.tsx`, `Shared.tsx`, `ActivityPage.tsx`, `App.tsx`, `ProgressPage.tsx` e `practice.css`.
- Estado/ajuda: `progress.tsx`, `achievements.ts` e `prompts.ts`.
- Regressões: `src/tests/stage-five.test.ts`, expectativas de roadmap/migração/filtros e `e2e/practice.spec.ts`; scanner de links inclui05.
- Documentação: AGENTS, README, índice/auditoria de documentos, QUALITY_AUDIT, CONTENT_VERIFICATION e este relatório. Os arquivos compartilhados também recebem edição externa06, cuja autoria/cobertura não é atribuída a esta tarefa.

Capturas definitivas do hero, revalidadas por inspeção independente após ajuste de tipografia: [claro](quality/stage05/hero-light.png), [escuro](quality/stage05/hero-dark.png), [mobile320/fonte150](quality/stage05/hero-mobile.png). No recorte independente final, axe em ambos temas sem violações nem incompletos; filtros de acesso, tópicos por stack, alternativas e paginação reconferidos.

### Capas reais — ajuste solicitado

Incluídas `public-roadmap/covers/sistema-banco-dados-7ed.webp` (215×287), `sql-guia-pratico.webp` (292×438) e `database-design-2ed.webp` (540×699), aproximadamente99kB no total. Conferidas visualmente título/edição/autoria. As duas primeiras vieram dos catálogos GEN/Novatec; a terceira é cópia da capa BCcampus disponibilizada no catálogo BookFusion após403 do servidor original. A imagem SQL indica4ª edição, metadado atualizado com essa proveniência. Sem capas geradas, hotlink, preços ou link de compra nos cards. `BookCover` mantém fallback com ícone caso o asset não carregue.

### Rodada após estabilização compartilhada e inclusão das capas

- `npm run typecheck`, `npm run lint`, `npm run build` e `node scripts/check-practice-build.mjs`: **passaram**. O bloqueio transitório06 foi resolvido pelo trabalho concorrente, preservado. Bundle24 arquivos, aviso de chunk>500kB mantido.
- `npm test -- --maxWorkers=2`: **440 testes/45 arquivos passaram** nesta rodada, incluindo testes adicionados pelo processo paralelo; não se atribui a esta tarefa a autoria ou auditoria pedagógica da06.
- Capas reais:3decodificadas, sem distorção nos dois temas/mobile320 fonte150; abortar assets gerou3fallbacks e nenhuma imagem quebrada. Revisão independente com capturas [biblioteca](quality/stage05/books-real.png), [claro](quality/stage05/books-real-light.png), [mobile](quality/stage05/books-real-mobile.png).
- A rodada global anterior apresentou19passagens/4falhas: duas varreduras atingiram dados06 ainda incompletos no bundle então servido; dois testes usavam locator genérico de status após inclusão da paginação (mais de um status legítimo). Os dois locators foram especificados para `.pf-filter-summary`; não se removeu o feedback acessível. Outra tentativa global sofreu encerramento do servidor e colisão de artefatos (`ENOENT`), sendo interrompida sem aprovação.
- Rodada final usa porta4185 e pasta `/tmp/stacktrail-05-test-results` isoladas para não disputar servidor/artefatos com o Antigravity. Zoom real é mantido como resultado da configuração original4181 já executado; o recorte isolado não o simula nem apresenta viewport como zoom. Resultado final da rodada isolada será registrado ao terminar.

GET final após créditos: **170/174HTTP200**, mesmas quatro falhas do clienteNode. [Snapshot da rodada05](quality/stage05/reference-access.json), distinto de adequação documental e da verificação de imagens no navegador. Nenhum SQL ou projeto estudantil foi executado.

### Resultado final isolado

**27/27 testes de navegador passaram**,8,3minutos, Chromium1worker, porta4185 e saída isolada. Inclui as varreduras globais de todas as rotas publicadas geradas pelo catálogo nos dois temas, regressões00–04, recorte05, estados/conquistas/status e capas reais/fallback. Também executou os testes06 adicionados pelo processo concorrente: isso atesta somente seus cenários automatizados de UI, sem auditoria pedagógica/técnica da06 por esta tarefa. [Resumo com títulos, estados, tempos e hash do conteúdo05](quality/stage05/browser-summary.json).

Zoom real200/400 foi executado e passou separadamente na configuração original4181 (a rodada isolada o exclui por usar outra porta); não se somam tentativas interrompidas como aprovação. Não restou falha funcional demonstrada da05 no escopo coberto. Limites permanentes: materiais externos podem mudar;4falhas do clienteGET, com métodos alternativos documentados; BCcampus normalização tem ressalvas; chunk>500kB; sem execução SQL/projetos de estudantes, testes de aprendizagem, auditoria WCAG integral ou deploy remoto. Nenhum commit/push efetuado.
