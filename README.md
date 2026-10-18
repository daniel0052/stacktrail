<p align="center"><img src="public-roadmap/favicon.svg" width="72" height="72" alt="Marca StackTrail"></p>
<h1 align="center">StackTrail</h1>
<p align="center"><strong>Roadmap, referências e prática.</strong><br>Estude nas fontes. Construa com evidências.</p>

## O que está disponível

Plataforma estática em português brasileiro para orientar estudos de backend.
As **Etapas 00, 01, 02, 03 e 04** estão no formato 2.0: objetivos, pré-requisitos, competências,
fontes externas, livros opcionais, desafios e projetos sem respostas prontas.
As outras **15 etapas** estão acessíveis no mapa como planejamento, com migração
pendente. Não há aulas explicativas por IA nem simuladores no build principal.

| Etapa | Orientação | Exercícios: inicial / intermediário / avançado / extra | Projeto principal |
| --- | --- | --- | --- |
| 00 — Pensamento computacional | 15 tópicos; 13 base e dois opcionais | 4 / 4 / 3 / 2 | Biblioteca — versão algorítmica |
| 01 — Fundamentos de Frontend | 14 tópicos; 11 base e três opcionais | 3 / 3 / 3 / 2 | Catálogo de livros responsivo |
| 02 — Web, HTTP, redes, Git e ferramentas | 9 tópicos base | 3 / 3 / 3 / 0 | HTTP Diagnostic Lab |
| 03 — Fundamentos de Backend (PHP/Laravel ou TS/Node/Express) | 31 tópicos (18 base por trilha + 1 opcional NestJS na trilha TS) | 3 / 3 / 3 / 0–1 (por trilha; 16 no catálogo) | Backend Foundations Lab |
| 04 — APIs REST e regras de negócio (PHP/Laravel ou TS/Node/Express) | 12 tópicos (6 comuns + 3 PHP/Laravel + 3 TS/Express) | 3 / 3 / 2 / 1 (04-ex-08 opcional; 9 no catálogo) | Sistema de Agendamentos / Reservas (Booking API) |

São 58 exercícios no catálogo (incluindo os nove originais da 01, as duas trilhas da 03 e os nove da 04) e 12 projetos de portfólio:
os cinco principais acima, a Central de Reservas Comunitárias (`01-project`, alternativa avançada da 01),
dois projetos opcionais da 02 (**Investigador HTTP** e **Contrato de API de biblioteca**), dois projetos
opcionais da 03 (**Backend Foundations CLI** e **Book Catalog API**) e dois projetos opcionais da 04 (**Catálogo de Produtos REST - Básico** e **Catálogo de Produtos REST - Avançado**).
00 aceita diagramas, pseudocódigo e testes de mesa sem linguagem obrigatória.
01 usa HTML, CSS e TypeScript strict; Tailwind, React e Next.js são opcionais.
02 é independente de framework backend, focando HTTP, redes, terminal, clientes HTTP e Git colaborativo.
03 oferece duas trilhas independentes e equivalentes (**Trilha A: PHP + Laravel** ou **Trilha B: TypeScript + Node.js + Express**);
**NestJS** aparece exclusivamente como aprofundamento opcional da trilha TypeScript.
04 aprofunda contratos REST, semântica HTTP (verbos, status, idempotência, 422 vs 409, RFC 9457 Problem Details) e documentação OpenAPI 3.1 com regras de negócio nas duas trilhas.

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

Menu compacto: Roadmap, Exercícios, Projetos, Livros e referências, Meu progresso.
As 20 etapas estão no mapa; etapas têm navegação anterior/próxima e retorno.
As páginas de **Exercícios** e **Projetos** organizam as atividades com seletor escalável de etapa (sem a opção massiva "Todas as etapas"), exibindo exclusivamente o conteúdo da etapa ativa. A seleção de etapa respeita parâmetros de navegação (`?etapa=XX`), preferências salvas no navegador, etapa em andamento ou primeira etapa disponível. Filtros secundários integrados (Dificuldade, Status sincronizado com o progresso local, Trilha tecnológica quando houver e Busca textual por título e assunto) operam em conjunto, e o botão "Limpar filtros" preserva a etapa selecionada. O carregamento incremental por lotes de 12 itens com botão "Carregar mais" evita rolagem vertical excessiva sem criar rolagem infinita involuntária.
Projetos incluem contexto, requisitos, marcos, critérios, rubrica, referências,
extras e preparação de README, decisões e testes para GitHub. Publicar é opcional;
a plataforma não cria repositórios nem recebe projetos.

Dicas são graduais. “Pedir ajuda à IA” e “Avaliar com IA” abrem prompts editáveis
para copiar, incluindo requisitos, trilha escolhida e dicas reveladas, sem API ou envio automático.
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
