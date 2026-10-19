<p align="center"><img src="public-roadmap/favicon.svg" width="72" height="72" alt="Marca StackTrail"></p>
<h1 align="center">StackTrail</h1>
<p align="center"><strong>Roadmap, referências e prática.</strong><br>Estude nas fontes. Construa com evidências.</p>

## O que está disponível

Plataforma estática em português brasileiro para orientar estudos de backend.
As **Etapas 00, 01, 02, 03, 04, 05, 06 e 07** estão no formato 2.0: objetivos, pré-requisitos, competências,
fontes externas, livros opcionais, desafios e projetos sem respostas prontas.
As outras **12 etapas** estão acessíveis no mapa como planejamento, com migração
pendente. Não há aulas explicativas por IA nem simuladores no build principal.

| Etapa | Orientação | Exercícios: inicial / intermediário / avançado / extra | Projeto principal |
| --- | --- | --- | --- |
| 00 — Pensamento computacional | 15 tópicos; 13 base e dois opcionais | 4 / 4 / 3 / 2 | Biblioteca — versão algorítmica |
| 01 — Fundamentos de Frontend | 14 tópicos; 11 base e três opcionais | 3 / 3 / 3 / 2 | Catálogo de livros responsivo |
| 02 — Web, HTTP, redes, Git e ferramentas | 9 tópicos base | 3 / 3 / 3 / 0 | HTTP Diagnostic Lab |
| 03 — Fundamentos de Backend (PHP/Laravel ou TS/Node/Express) | 31 tópicos (18 base por trilha + 1 opcional NestJS na trilha TS) | 3 / 3 / 3 / 0–1 (por trilha; 16 no catálogo) | Backend Foundations Lab |
| 04 — APIs REST e regras de negócio (PHP/Laravel ou TS/Node/Express) | 12 tópicos (6 comuns + 3 PHP/Laravel + 3 TS/Express) | 3 / 3 / 2 / 1 (04-ex-08 opcional; 9 no catálogo) | Sistema de Agendamentos / Reservas (Booking API) |
| 05 — SQL, PostgreSQL e persistência | 10 tópicos comuns + 2 por trilha; intervalos opcional | 3 / 3 / 3 / 0 | SaaS Billing API ou alternativa equivalente |
| 06 — Testes automatizados e depuração (PHP/Laravel ou TS/Node/Express) | 13 tópicos (7 comuns + 3 PHP/Laravel + 3 TS/Node) | 3 / 3 / 3 / 0 (06-ex-08 opcional com aprofundamento; 9 no catálogo) | Bug Hunt & Regression Portfolio (Testing Kata e API Quality Lab opcionais) |
| 07 — Segurança, autenticação e autorização | 16 tópicos: 9 comuns base + 3 por stack + 1 opcional | 3 / 3 / 3 / 0 (avançados opcionais) | Secure Booking Platform |


Os exercícios e projetos são organizados por etapa e trilha, com contratos verificáveis e sem respostas prontas. A Central de Reservas Comunitárias mantém seu ID e rascunhos como alternativa da 01.
00 aceita diagramas, pseudocódigo e testes de mesa sem linguagem obrigatória.
01 usa HTML, CSS e TypeScript strict; Tailwind, React e Next.js são opcionais.
02 é independente de framework backend, focando HTTP, redes, terminal, clientes HTTP e Git colaborativo.
03 oferece duas trilhas independentes e equivalentes (**Trilha A: PHP + Laravel** ou **Trilha B: TypeScript + Node.js + Express**);
**NestJS** aparece exclusivamente como aprofundamento opcional da trilha TypeScript.
04 aprofunda contratos REST, semântica HTTP (verbos, status, idempotência, 422 vs 409, RFC 9457 Problem Details) e documentação OpenAPI 3.1 com regras de negócio nas duas trilhas.
05 começa com modelagem e SQL manual e segue para PostgreSQL, constraints, índices/transações e persistência na stack escolhida. São nove contextos fictícios: e-commerce, RH, educação, logística, SaaS, saúde, financeiro, marketplace e ERP. Knex + pg é a alternativa de query builder na trilha TypeScript; Laravel usa Eloquent. Banco e aplicações são executados localmente pelo estudante, nunca no StackTrail.

06 consolida testes automatizados e depuração técnica com pirâmide de testes (unitários puros no padrão AAA, testes de endpoints HTTP, integração com PostgreSQL real isolado e transações/rollback, e dublês/fakes para falhas externas). Aborda investigação metódica de stack traces/logs e criação de testes de regressão (Red -> Green). Trilha A utiliza PHPUnit/Pest, testes de Feature do Laravel e Laravel Pint; Trilha B utiliza node:test/Vitest, Supertest e ESLint. São nove contextos de mercado (E-commerce, RH, SaaS, Logística, Marketplace, Notificações, Fintech, ERP e Auditoria).

## Executar e verificar

Node.js **24.15 ou superior** e npm, conforme `package.json`.

```bash
npm ci
npm run dev
```

Abra a URL do Vite, normalmente `http://127.0.0.1:5173/stacktrail/`.
`npm run build` gera a versão estática; `npm run preview` abre a prévia.
HashRouter e base `/stacktrail/` preservam GitHub Pages. Não houve deploy nesta tarefa.

```bash
npm run typecheck
npm run lint
npm test -- --maxWorkers=2
npm run build
npm run test:ui
node scripts/check-practice-build.mjs
node scripts/check-practice-links.mjs
```

Playwright usa o build estático e requer Chromium instalado. A verificação GET
registra acesso e falhas do cliente; não prova adequação da referência. Evidências,
fontes, resultados datados e limites estão no [relatório de consolidação](docs/CONSOLIDATION_00_01.md).
Automação não certifica WCAG nem aprendizagem.

## Praticar, preparar portfólio e acompanhar

Menu principal compacto: **Roadmap**, **Exercícios**, **Projetos**, **Livros e referências**, **Desenvolvimento Profissional**, **Inglês** e **Meu progresso**.
As 20 etapas continuam estritamente no mapa (00 a 19); etapas têm navegação anterior/próxima e retorno.
A área independente de **Desenvolvimento Profissional** funciona como um roadmap interativo de competências profissionais complementares (com trilha prioritária de Comunicação Falada e Oratória Técnica, além de Comunicação Escrita, Colaboração, Pensamento Crítico, Organização e Autonomia, Ética e Responsabilidade, e Carreira e Aprendizado Contínuo). Ela organiza 24 marcos práticos lineares (6 de comunicação oral e 3 nas demais), orientações do dia a dia sem exercícios acadêmicos artificiais, gamificação leve com 7 conquistas verificáveis e biblioteca com livros verificados no catálogo brasileiro e capas locais (destaque para *O Programador Pragmático* — Bookman, *TED: Falar, Convencer, Emocionar* — Benvirá e *Código Limpo* — Alta Books). Ela não possui número de etapa, não integra os requisitos obrigatórios das etapas técnicas e possui progresso autodeclarado local que não altera as porcentagens das etapas 00–19.
A área independente **English Journey (Inglês)** organiza o desenvolvimento prático da língua inglesa do nível A1 ao C2 com base no Common European Framework of Reference for Languages (CEFR) do Conselho da Europa, voltada para a vida cotidiana, viagens, trabalho remoto e carreira internacional. Oferece 6 níveis com descritores oficiais, 24 marcos comunicativos lineares, exercícios práticos originais nas 5 competências (Listening com áudios de fontes confiáveis, Speaking com cenários reais, Reading, Writing e Vocabulary & Grammar contextualizado), teste de nivelamento inicial, avaliações diagnósticas com rubricas e prompts auditados para IA externa, trilha de carreira internacional com fórmulas de impacto (STAR, Google X-Y-Z), guia de exames oficiais (Cambridge, IELTS e TOEFL iBT atualizado na escala de pontuação de 1 a 6 de 2026), revisão espaçada e biblioteca de obras de referência com capas de placeholder neutro. A interface suporta navegação por arrastar com o mouse (drag-to-scroll) com cursor grab/grabbing e indicador visual de mão (✋), sem barras de rolagem intrusivas. Não exige backend, contas ou APIs pagas e não altera percentuais das etapas técnicas.
As páginas de **Exercícios** e **Projetos** organizam as atividades com seletor escalável de etapa (sem a opção massiva "Todas as etapas"), exibindo exclusivamente o conteúdo da etapa ativa. A seleção de etapa respeita parâmetros de navegação (`?etapa=XX`), preferências salvas no navegador, etapa em andamento ou primeira etapa disponível. Filtros secundários integrados (Dificuldade, Status sincronizado com o progresso local, Trilha tecnológica quando houver e Busca textual por título e assunto) operam em conjunto, e o botão "Limpar filtros" preserva a etapa selecionada. O carregamento incremental por lotes de 12 itens com botão "Carregar mais" evita rolagem vertical excessiva sem criar rolagem infinita involuntária.
Projetos incluem contexto, requisitos, marcos, critérios, rubrica, referências,
extras e preparação de README, decisões e testes para GitHub. Publicar é opcional;
a plataforma não cria repositórios nem recebe projetos.

Dicas são graduais. “Pedir ajuda à IA” e “Avaliar com IA” abrem prompts editáveis
para copiar, incluindo requisitos, trilha escolhida e dicas reveladas, sem API ou envio automático.
Atividades que precisam de material anterior oferecem **Preparar ambiente de prática**:
laboratório guiado (B) ou continuação com **Usar meu projeto** e base alternativa (C).
Atividades do zero (A) não recebem essa seção. A IA preparadora gera somente o ponto
de partida; investigar, implementar e testar continuam sendo tarefas do estudante.
Preparar/copiar não inicia nem conclui atividades. Os prompts são revisáveis, adaptados
à stack e separados dos papéis de tutoria e revisão. Não há geração ou execução no site.
Veja o [inventário e os contratos dos laboratórios](docs/GUIDED_LABS.md).
Revisão consultiva distingue fatos de hipóteses e itens não verificados; não dá
nota automática. A plataforma não executa código ou algoritmos do estudante.

Estudo, etapa em acompanhamento, atividade iniciada e conclusão por autoavaliação são registros distintos.
As etapas publicadas operam em quatro estados (**Não iniciada**, **Em andamento**, **Pausada** e **Concluída**):
o estudante pode **Iniciar etapa**, **Parar etapa** (pausando o acompanhamento sem perder exercícios concluídos,
projetos, conquistas ou percentual) e **Retomar etapa**.
Em **Meu progresso**, a seção **Etapas em andamento** exibe as etapas ativas com percentual, atividades concluídas,
link para continuar e botão para parar; a seção **Atividades em andamento** lista exercícios e projetos
iniciados e permite filtrar por tipo, continuar ou parar uma atividade.
00 exige 13 tópicos base, quatro iniciais, dois intermediários, projeto e síntese.
01 exige 11 tópicos base, três iniciais, um intermediário e síntese; seu projeto é
recomendado.
02 exige os 9 tópicos base, três iniciais, três intermediários, o projeto integrador
**HTTP Diagnostic Lab** e síntese.
03 exige, na trilha ativa escolhida (PHP + Laravel ou TypeScript + Node.js + Express), os 18 tópicos base da trilha,
três exercícios iniciais, três intermediários, dois avançados obrigatórios (`03-ex-07` e `03-ex-09`), o projeto principal
**Backend Foundations Lab** e síntese; alternar entre trilhas preserva integralmente o progresso já conquistado na outra trilha.
04 exige, na trilha ativa escolhida (PHP + Laravel ou TypeScript + Node.js + Express), os 9 tópicos base da trilha (6 comuns + 3 específicos),
três exercícios iniciais, três intermediários, dois avançados obrigatórios (`04-ex-07` e `04-ex-09`), com `04-ex-08` opcional, o projeto principal obrigatório
**Sistema de Agendamentos / Reservas (Booking API)** e síntese.
05 exige 12 tópicos base da trilha, nove exercícios, síntese e um projeto avançado: **SaaS Billing API**, **Booking API com PostgreSQL** ou **proposta autoral equivalente**. E-commerce Database e Logistics Analytics são projetos opcionais de progressão. Uma stack é suficiente; intervalos/ranges são aprofundamento opcional. [Relatório da Etapa 05](docs/STAGE_05_IMPLEMENTATION.md).
Critérios autorais são identificados no relatório. Conquistas e card
100% derivam desses registros e revertem ao desmarcar ou reabrir. Percentuais não
medem domínio; não há certificação, revisão externa automática ou recompensa por visita.

## Fontes e livros

Referências indicam idioma real, custo, recorte, versão/data e ressalvas.
Livros opcionais: **Entendendo Algoritmos**, **Aprendendo TypeScript**,
**Lógica de Programação e Algoritmos com JavaScript**, **Análise de Tráfego em Redes TCP/IP**,
**Dominando Estilos de APIs**, **Aprendendo Git**, **Linux Guia Prático (4ª Edição)**,
**Construindo Sistemas Seguros e Resilientes**, **Aprendendo PHP**, **PHP Moderno**,
**Desenvolvendo Web Sites com PHP (3ª Edição)**, **Aprendendo Node (2ª Edição)**,
**Node.js Essencial**, **Fundamentos de Engenharia de Software**,
**Aprenda Node.js com Projetos Práticos** e **Fundamentos de Arquitetura de Software (2ª Edição)**, escolhidos por adequação ao
currículo e catálogos consultados, com alternativas gratuitas. Recomendações
comunitárias individuais têm atribuição; não são consenso. Catálogo não significa
leitura integral. As capas correspondem às edições verificadas no catálogo da
editora Novatec, salvas como assets estáticos otimizados em WebP, sem links de compra
ou preços; quando uma capa não está disponível, usa-se placeholder discreto com ícone.

Na Etapa 05, os livros **Sistema de Banco de Dados** (7ª edição), **SQL Guia Prático** e o aberto **Database Design** (2ª edição, inglês) são opcionais e possuem alternativas gratuitas. Catálogos e recortes foram conferidos; não houve leitura integral. Os três usam capas reais verificadas, salvas em WebP local, com créditos na documentação e fallback discreto somente se a imagem não carregar. O filtro de acesso distingue livros gratuitos dos pagos.

## Dados locais e compatibilidade

Sem backend, banco, autenticação, upload ou sincronização. Dados dependem de
origem/navegador/dispositivo e são persistidos automaticamente no `localStorage`.
Não confie em navegação privada para preservar dados e prefira registrar links e
sínteses, sem colar o projeto inteiro ou segredos.

`stacktrail:roadmap:1` usa esquema 2 e migra o piloto esquema 1 preservando rascunhos,
preferências e projeto anterior.
Editar uma solução invalida seu checklist e revisão. A chave legada
`backend-academy:progress` não é sobrescrita;
aulas antigas não viram tópicos estudados, e desafios 00 antigos não são equiparados
aos novos contratos. Falha de gravação mantém o estado em memória na sessão.

Navegação interna após carregar o app pode funcionar sem rede; não há service
worker, instalação offline ou garantia de recarga sem conexão. Fontes externas
continuam exigindo rede.

## Arquitetura e contribuição

`src/practice/` separa catálogo/conteúdo, interface, progresso e conquistas.
`public-roadmap/` contém os assets do build principal, sem aulas ou pacotes resolvidos.
A versão anterior permanece isolada em código e documentação histórica:
`npm run dev:legacy` / `npm run build:legacy`, com entrada/build separados.
Esses comandos geram explicitamente os antigos pacotes de estudo; não integram o build atual.

Antes de contribuir, leia [AGENTS.md](AGENTS.md) e aplique as três skills locais:
[educator](.codex/skills/stacktrail-educator/SKILL.md),
[factchecker](.codex/skills/stacktrail-factchecker/SKILL.md) e
[uiux](.agents/skills/stacktrail-uiux/SKILL.md). Consulte o currículo relevante,
verifique fontes e contratos, preserve IDs/dados e teste a interface real.
Não avance etapas sem pedido nem publique soluções. Registre evidências e limites.

O [índice documental](docs/README.md) separa estado atual e histórico; a
[auditoria documental](docs/DOCUMENTATION_AUDIT.md) classifica cada arquivo.
Nenhuma evidência histórica foi apagada. Veja também [segurança](SECURITY.md).

## Ferramentas

<p>
<img src="docs/icons/react.svg" width="28" height="28" alt="React"> React ·
<img src="docs/icons/typescript.svg" width="28" height="28" alt="TypeScript"> TypeScript ·
<img src="docs/icons/vite.svg" width="28" height="28" alt="Vite"> Vite ·
<img src="docs/icons/reactrouter.svg" width="28" height="28" alt="React Router"> Router ·
<img src="docs/icons/tailwindcss.svg" width="28" height="28" alt="Tailwind CSS"> Tailwind ·
<img src="docs/icons/vitest.svg" width="28" height="28" alt="Vitest"> Vitest ·
<img src="docs/icons/eslint.svg" width="28" height="28" alt="ESLint"> ESLint ·
<img src="docs/icons/githubactions.svg" width="28" height="28" alt="GitHub Actions"> Actions
</p>

Ícones locais e atribuição em [docs/icons/LICENSE.md](docs/icons/LICENSE.md).
MDX e recursos de aula permanecem no legado, sem publicação no build principal.


## Etapa07: segurança aplicada e evidências

Laravel ou TypeScript/Express, sem exigir ambas as stacks. Nove exercícios em SaaS, e-commerce, RH, marketplace, saúde, reservas, ERP, fintech e auditoria local. Três projetos: Secure Admin Login, Multi-User Resource API e Secure Booking Platform (integrador; pode continuar Booking anterior). Sessões/cookies, hash, autorização por recurso/BOLA, CSRF/XSS, campos/dados, limites e logs são estudados nas fontes e demonstrados no ambiente local do estudante.

Critério de conclusão autoral:12 tópicos base da trilha,3 iniciais,3 intermediários, integrador e síntese. Os3 avançados e projetos iniciante/intermediário são opcionais. A rubrica fornecida mantém25/30/20/15/10, sem gerar nota. Tentativas e síntese07 são independentes por stack e preservadas ao alternar; nenhum backend/autenticação foi criado no StackTrail.

Livros opcionais: Construindo Sistemas Seguros e Resilientes (Leandro Silva,PT-BR), Web Security for Developers (Malcolm McDonald,EN) e API Security in Action (Neil Madden,EN). Catálogos/sumários consultados, sem leitura integral; alternativas gratuitas OWASP/documentação oficial. Capas destas recomendações usam placeholders porque não foi localizada licença de redistribuição específica. Relatório e limites: [Etapa07](docs/STAGE_07_IMPLEMENTATION.md).
