<p align="center"><img src="public-roadmap/favicon.svg" width="72" height="72" alt="Marca StackTrail"></p>
<h1 align="center">StackTrail</h1>
<p align="center"><strong>Roadmap, referências e prática.</strong><br>Estude nas fontes. Construa com evidências.</p>

## O que está disponível

Plataforma estática em português brasileiro para orientar estudos de backend.
As **Etapas 00 e 01** estão no formato 2.0: objetivos, pré-requisitos, competências,
fontes externas, livros opcionais, desafios e projetos sem respostas prontas.
As outras **18 etapas** estão acessíveis no mapa como planejamento, com migração
pendente. Não há aulas explicativas por IA nem simuladores no build principal.

| Etapa | Orientação | Exercícios: inicial / intermediário / avançado / extra | Projeto principal |
| --- | --- | --- | --- |
| 00 — Pensamento computacional | 15 tópicos; 13 base e dois opcionais | 4 / 4 / 3 / 2 | Biblioteca — versão algorítmica |
| 01 — Fundamentos de Frontend | 14 tópicos; 11 base e três opcionais | 3 / 3 / 3 / 2 | Catálogo de livros responsivo |

São 24 exercícios, incluindo os nove originais da 01. A Central de Reservas
Comunitárias permanece como projeto alternativo avançado, com seu ID e rascunhos.
00 aceita diagramas, pseudocódigo e testes de mesa sem linguagem obrigatória.
01 usa HTML, CSS e TypeScript strict; Tailwind, React e Next.js são opcionais.
A futura escolha PHP/Laravel ou TS/Node/Express é suficiente; NestJS é opcional.

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
Projetos incluem contexto, requisitos, marcos, critérios, rubrica, referências,
extras e preparação de README, decisões e testes para GitHub. Publicar é opcional;
a plataforma não cria repositórios nem recebe projetos.

Dicas são graduais. “Pedir ajuda à IA” e “Avaliar com IA” abrem prompts editáveis
para copiar, incluindo requisitos e dicas reveladas, sem API ou envio automático.
Revisão consultiva distingue fatos de hipóteses e itens não verificados; não dá
nota automática. A plataforma não executa código ou algoritmos do estudante.

Estudo, atividade iniciada e conclusão por autoavaliação são registros distintos.
00 exige 13 tópicos base, quatro iniciais, dois intermediários, projeto e síntese.
01 exige 11 tópicos base, três iniciais, um intermediário e síntese; seu projeto é
recomendado. Critérios autorais são identificados no relatório. Conquistas e card
100% derivam desses registros e revertem ao desmarcar ou reabrir. Percentuais não
medem domínio; não há certificação, revisão externa automática ou recompensa por visita.

## Fontes e livros

Referências indicam idioma real, custo, recorte, versão/data e ressalvas.
Livros opcionais: **Entendendo Algoritmos**, **Aprendendo TypeScript** e
**Lógica de Programação e Algoritmos com JavaScript**, escolhidos por adequação ao
currículo e catálogos consultados, com alternativas gratuitas. Recomendações
comunitárias individuais têm atribuição; não são consenso. Catálogo não significa
leitura integral. Capas usam placeholders neutros: autorização para imagens não
confirmada, sem download ou hotlink de capas de terceiros.

## Dados locais e compatibilidade

Sem backend, banco, autenticação, upload ou sincronização. Dados dependem de
origem/navegador/dispositivo. Use exportação/importação de backup em Meu progresso.
Não confie em navegação privada para preservar dados e prefira registrar links e
sínteses, sem colar o projeto inteiro ou segredos.

`stacktrail:roadmap:1` usa esquema 2 e migra o piloto esquema 1 preservando rascunhos,
preferências e projeto anterior. O backup é validado antes da substituição.
Editar uma solução invalida seu checklist e revisão. A chave legada
`backend-academy:progress` não é sobrescrita, e seu original é exportável;
aulas antigas não viram tópicos estudados, e desafios 00 antigos não são equiparados
aos novos contratos. Falha de gravação permite exportar o estado em memória.

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
