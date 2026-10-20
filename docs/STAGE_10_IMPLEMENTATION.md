# Etapa 10 — Frontend Moderno e Integração Full Stack

Data:19/10/2026. Currículo integral fornecido pelo usuário no anexo `13b4f4d3-16a6-476e-8fe1-19223902d8b3/Pasted text.txt`; fonte da sequência/objetivos, não prova técnica. Pedido autoriza a migração10 e preserva11–19 pendentes. Não houve commit, push, deploy externo ou mudança na arquitetura estática da plataforma.

## Organização e continuidade

Júnior00–09, Pleno10–15, Sênior16–19, como solicitado. A Etapa00 saiu do agrupamento separado Preparação e passou a integrar Júnior, mantendo IDs, conteúdo e registros; contagem da formação muda de nove para dez etapas. Nenhuma conclusão foi transferida entre atividades. A antiga descrição planejada10 era “SQL avançado, concorrência e cache” (EXPLAIN ANALYZE, índices, isolamento, locks, transações concorrentes, keyset pagination eRedis); ela foi substituída pelo currículo atual autorizado, sem deslocar automaticamente esse plano para outra etapa.

Etapa01 conserva HTML/CSS/TypeScript e React opcional; a10 parte de componentes funcionais e torna React/TS obrigatório. HTTP, SQL, testes, segurança e entrega00–09 são reutilizados por contratos aplicados, sem repetir aulas. A plataforma continua React/TypeScript/Vite/HashRouter, base `/stacktrail/`, `public-roadmap/`, sem backend, banco, autenticação real ou executor de código. O frontend/backend do estudante é desenvolvido fora do StackTrail.

## Nove módulos

| Módulo | Prática relacionada | Evidência esperada |
| --- | --- | --- |
|01Fundamentos Full Stack |01 | Responsabilidades, origens, fluxo e escolha de organização. |
|02React com TypeScript |02–03 | Props/eventos/listas tipados, composição e estados coerentes. |
|03Estado, hooks e organização |04–06 | Dados derivados, seleção compartilhada e proteção a resposta obsoleta. |
|04Formulários e navegação |07–08 | Erros/rascunho/foco e carga direta/refresh coerentes com host. |
|05Integração REST |09–12 | DTO runtime, consulta/filtros/paginação, mutação e recuperação. |
|06Autenticação e segurança |13–14 | Sessão/CSRF, autorização real no servidor, expiração eCORS. |
|07Next.js aplicado |15–16 | AppRouter/layout/metadados, fronteiras e host compatíveis. |
|08Testes, acessibilidade e desempenho |17–18 | Interação/mock versus APIreal, teclado/reflow e medição. |
|09Integrador Full Stack | Projeto | Painel de pedidos integrado à única API escolhida. |

Nove tópicos comuns e uma integração específica por stack totalizam dez tópicos base. As competências React são comuns; Laravel e Express são alternativas, não tarefas cumulativas nem uma nova trilha backendReact.

## Exercícios originais e laboratórios

18exercícios: quatro iniciais, seis intermediários e oito avançados. Cada um tem contexto, pré-requisito observável, requisitos, I/O/casos, restrições, três dicas sem solução, rubrica consultiva, referências e entregáveis. IDs `10-ex-01` a `10-ex-18`, slugs `10-01` a `10-18`; não reutilizam IDs legados.

Pontos de partida explicitamente auditados:

- **A/do zero:**01,02,03,04,07,15. Análise não exige código; React/Next usam fontes externas para começar.
- **B/material inicial:**06(corrida de busca),08(rotas/formulário),12(erros HTTP/DTO),14(integração CORS/sessão),16(fronteira/hostNext),17(testes/a11y),18(desempenho).
- **C/projeto próprio ou base alternativa:**05,09,10,11,13 e integrador. Não há bloqueio por ausência de projeto anterior.

AmbientesReact,Next eFullStack distintos. FixturesHTTP mínimas não exigem recriar PostgreSQL; a alternativa do integrador inclui uma API/PostgreSQL anterior à UI. A base fornece somente o estado inicial; defeitos comportamentais têm estímulos/resultados públicos, sem causa, localização, patch ou suíte-alvo. Smoke básico não substitui a regressão que o estudante deve escrever.

## Projeto integrador

**Painel de Gestão de Pedidos**: React/TypeScript, roteamento, login/logout, listagem, busca/filtros/paginação/sort no servidor, formulários, estados de rede, criação de pedido e conflitos de estoque. Reutiliza API09 ou uma base mínima equivalente: Laravel **ou** Express com PostgreSQL, autenticação, autorização, validação, regras de negócio e testes.

Oito marcos: contrato/origens; estrutura/components/rotas; consulta/rede; sessão/CSRF/permissões; formulários/mutação; testes; acessibilidade/desempenho; build/deploy/documentação. Testes de componentes/interação, mock pertinente e ensaio contra APIreal são evidências diferentes. Deploy local controlado com build/runtime/origens documentados é alternativa sem conta/cartão; publicação externa é decisão do estudante. Não exigir design complexo, duasAPIs, Next no integrador ou bibliotecas de estado/formulário. Next permanece alternativa justificada, sem migrar o projetoReact inteiro.

## React, Next e segurança

React: componentes funcionaisTSX,props/eventos,estado local/compartilhado,Context introdutório,useRef quando necessário e hooks. Efeitos sincronizam sistemas externos, não substituem toda transformação de lista. Fetch exige status/corpo/DTO validados e invalidação de respostas antigas; abort não reverte mutação já recebida pelo servidor.

Next: experiência aplicada separada de AppRouter,rotas/layouts,Server/Client,dados,metadados e renderizaçãoCSR/SSR/SSG. Versão/configuração/cache observados, sem default universal. ClientComponent pode ser pré-renderizado. Export estático não executa cookies/SSR por requisição ouServerActions; GitHubPages não é runtime deAPI/NextSSR. Profiler deve usar ambiente de desenvolvimento identificado ou build especial de profiling; callback não é exigido na produção padrão.

Laravel: sessão first-party; SanctumSPA apenas quando o domínio raiz e cenário são compatíveis, com stateful domains/origens/credenciais eCSRF. Fetch não injeta automaticamente o cabeçalho XSRF como configurações deAxios. Express: cookie deID,store adequado ao ambiente,CSRF e origem explícita;MemoryStore sódesenvolvimento. UI não substitui autorização do servidor. Logout/401 invalidam respostas pendentes da identidade anterior; sem credencial em bundle ou token sensível no localStorage.

## Progresso e interface

Esquema2 e chave `stacktrail:roadmap:1` preservados; novos campos opcionais, IDs antigos estáveis, chavelegada intocada. Tentativas10 usam `@php`/`@javascript`; síntese usa `fullstackEvidence`. Trocar de API mantém rascunhos/checks/dicas/resultados independentes. Conteúdo comum estudado continua comum; tópico de integração é filtrado por stack.

Regra de conclusão **autoral**, não atribuída ao currículo original: dez tópicos base,18exercícios,integrador e síntese na única stack. Editar solução/reabrir atividade recalcula percentual/conquistas. Não há conclusão por visita/cópia nem certificado. Prova09 e sua avaliação/histórico permanecem independentes.

Visão geral e índice de tópicos10 usam nove módulos inicialmente fechados,um aberto por vez. Hero identifica inícioPleno e preserva tokens/temas. Catálogo mantém20etapas,filtroscombinados e lotes12; botãoIniciar10 salva estado e abre atividade. Parar preserva rascunho;Continuar reabre. Preparadora,tutora e revisora usam prompts editáveis,cópia explícita e nenhum envio automático.

## Referências e livros

23referências técnicas específicas foram consultadas por revisão independente, com seções, idioma real, versão/configuração, custo e limites em [source-independent](quality/stage10/source-independent.md). ReactPT-BR é parcialmente traduzido; FetchEN foi escolhido após identificar trechos históricos problemáticos emPT. Fontes oficiaisReact/TS/Vite/Router/Next/MDN/TestingLibrary/MSW/WAI/WCAG/Laravel/Express/OWASP sustentam os recortes; acessoGET é verificação separada da adequação.

Livros pagos,opcionais,com alternativas gratuitas; consulta de catálogo/sumário não é leitura integral:

| Livro | Metadados confirmados |
| --- | --- |
|Aprendendo TypeScript |JoshGoldberg,Novatec,2022,português,ISBN9786586057997. |
|React Fluente |TejasKumar,Novatec,2024,português,ISBN9788575229095. |
|Inclusive Components |HeydonPickering,Smashing,2019,inglês,ISBN9783945749821. |

Números de edição não foram inferidos. Disponibilidade/estoque são datados,não garantidos. A primeira proposta usava fallback por não haver licença livre demonstrada; posteriormente o usuário **pediu expressamente capas reais salvas na public**. Foram obtidas nos editores e inspecionadas visualmente: título/autor correspondentes,sem geração artificial. TypeScript reutiliza asset existente; ReactFluenteJPEGprogressivo40.565bytes eInclusivePNG11.123bytes. Arquivos em `public/assets/books/stage10/` e `public-roadmap/assets/books/stage10/`,servidos localmente com dimensões/alt e fallback emfalha. Origem em [covers-origin.json](quality/stage10/covers-origin.json);direitos editoriais preservados,sem alegar licença livre ou leitura integral,semhotlink.

## Arquivos do recorte

Novos: `src/practice/stage-ten.ts`, `StageTenModules.tsx`, `src/tests/stage-ten.test.ts`, `e2e/stage-ten.spec.ts`, capas nas duas árvores públicas, este relatório e `docs/quality/stage10/`.

Integração: curriculum,progress,achievements,App,Shared,StudyPages,ActivityPage,ProgressPage,PreparationPanel,preparation/preparation-prompt,prompts,practice.css e metadadosroadmap. Testes de formação/etapa futura/inventário atualizados para a nova organização; sentinela futura agora11. Inventário de rotas e zoom incluem10; configuração inclui suíte10; scriptGETinclui stage-ten. README mantém apresentação pública e só atualiza disponibilidade. AGENTS e índices/auditorias registram o novo recorte.

## Auditorias, testes e pendências

- [Educacional independente](quality/stage10/educator-review.md): achados apresentados antes das correções e reconferência; sem bloqueante aberto no conteúdo.
- [Factual independente](quality/stage10/source-independent.md):23fontes,livros e contratos,antes/depois; sem bloqueante conceitual aberto.
- [UI independente](quality/stage10/ui-independent.md):50combinações de rota/tema/largura,modal,foco,início/retomada,capas;limites identificados.
- Execução principal até esta anotação:512/512testes unitários,52arquivos;typecheck/lint/build passaram;4/4testesUI10,22,7s,com duasstacks,conclusão/reversão/persistência,prompts/filtros,9rotas×5larguras×2temas,fonte150% eaxe;buildisolado45arquivos.
- A primeira rodadaUI identificou hierarquiah1→h3no tópico selecionado (corrigida comh2quando não há cardh2) e seletor ambíguoLimparfiltros (harness passou a escolher o controle da toolbar). Evidências iniciais preservadas; regrasaxe não foram desabilitadas.
- Regressão global/zoom eGET ainda em andamento nesta anotação; resultado final será registrado abaixo e emQUALITY_AUDIT após execução.

Limites: não executamos aplicações do estudante,API/DB,deployexterno ou futuras bases geradas porIA. Contratos/fixtures não provam execução. Sem certificaçãoWCAG2.2AA por testes automáticos; avaliação completa por tecnologias assistivas/manual não realizada. Build mantém aviso de chunk>500kB,sem dependência nova. Nenhum commit/push automático.

GETdo recorte10concluído:26URLs (23fontes+3catálogos),26HTTP200;adequação consultada separadamente. Zoomreal200/400já passou na rodada global,emdoistemas,nasrotas10devisãogeral,tópicos,10-14eprojeto;resultado global total segue pendente até registro final. HoráriosISOdoslogs podem ser20/10UTC,correspondentes a19/10emAmerica/Sao_Paulo.


### Resultado final da validação da Etapa 10

A regressão global terminou: **63/63 testes UI aprovados em 8,4 minutos**, sem falhas, testes instáveis ou testes ignorados. Inclui 386 rotas em dois temas (772 combinações), regressões das etapas anteriores e zoom real de 200%/400%, com rotas da Etapa 10. Evidências: [log global](quality/stage10/ui-global.log) e [estatísticas extraídas do relatório Playwright](quality/stage10/ui-global-report.json). As 512 verificações unitárias, typecheck, lint, build e quatro testes UI focados também passaram. As três capas reais são assets locais em public e na árvore pública utilizada pelo Vite. Permanecem os limites de execução e acessibilidade descritos acima. Sem commit ou push.
