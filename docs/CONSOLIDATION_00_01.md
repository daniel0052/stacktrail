# Consolidação StackTrail 2.0 — Etapas 00/01/02

Data: 17/10/2026. Branch `feat/practice-first-roadmap`. Escopo: somente 00/01/02 no novo modelo. Sem commit, push ou publicação nesta tarefa. Alterações anteriores preservadas; snapshot inicial de 135 arquivos locais em `/tmp/stacktrail-before-00-consolidation/` (temporário, não backup permanente).

## Fases e estado real

- [x] Inspeção de instruções, anexos, código, alterações, auditoria roadmap.sh e documentação existente; plano apresentado antes das alterações.
- [x] Currículo 00/01/02 lido integralmente pelo MCP do Notion, sem filhos/paginação/truncamento pendentes.
- [x] Modelo e navegação compacta; consolidação 01 e migração 00 e 02, mantendo 03–19 pendentes.
- [x] Projetos, livros, referências, prompts e progresso versionado implementados.
- [x] Auditorias pedagógica e técnica independentes, correções e reconferência textual.
- [x] Auditoria documental e atualização das três skills; formato validado por quick_validate.
- [x] Validação final de interface, zoom, comandos e reconciliação dos resultados, com limites abaixo.

## Organização e inventário

`src/practice/curriculum.ts` agrega o catálogo 01 preservado, `stage-zero.ts` (00) e `stage-two.ts` (02). UI, progresso e cálculo de conquistas ficam separados. Build principal estático não publica MDX, simuladores, ZIPs resolvidos ou entrada legada. Legado fica isolado e recuperável pelos comandos explícitos; nenhum arquivo curricular legado foi apagado.

| Etapa | Tópicos base/opcionais | Inicial | Intermediário | Avançado | Extra |
| --- | --- | --- | --- | --- | --- |
| 00 | 13/2 | 4 | 4 | 3 | 2 |
| 01 | 11/3 | 3 | 3 | 3 | 2 |
| 02 | 9/0 | 3 | 3 | 3 | 0 |

38 tópicos, 33 exercícios e seis projetos. Os nove exercícios originais 01 mantêm IDs/contratos. Os novos 00 usam IDs `00-pf-*`, sem equiparação aos 29 desafios visuais legados. Os exercícios da 02 usam IDs `02-ex-01` a `02-ex-09`. Não existe avaliador de algoritmos ou de rede no novo cliente; os testes de mesa, comandos e capturas HTTP são do estudante e declarados.

00 cobre decomposição, padrões, abstração, algoritmos, pseudocódigo, fluxogramas, variáveis, condições, laços, sub-rotinas, vetores, busca, ordenação, recursão introdutória e contagem de operações. Ordenação/recursão são aprofundamentos opcionais. Exercícios incluem interpretação, depuração, fronteiras e rastros, não somente produção de representações.

01 acrescenta arquivos, módulos e JSON como tópicos explícitos e fortalece critérios observáveis. HTML/formulários, CSS/reflow, JS dentro de TS, tipos/validação, DOM/eventos, async/HTTP/CORS, storage e opções de framework mantêm seu recorte. Genéricos/utilitários introdutórios são referências de consulta, sem gate avançado.

02 cobre anatomia de URL, requisições e respostas HTTP, status HTTP, headers/cookies/cache, CORS e falhas HTTP, redes essenciais (DNS, TCP, TLS, HTTPS, HTTP/1.1/2/3), contratos HTTP e introdução a REST, terminal e ferramentas HTTP (cURL, Bruno/Postman) e Git/GitHub colaborativo (branches, PRs e resolução de conflitos), de forma independente de framework backend.

## Fidelidade, autoria e pré-requisitos

Notion consultado: [00](https://app.notion.com/p/3f53cadfab77814bbaf1de279833217b), [01](https://app.notion.com/p/3f63cadfab77812494d8d5a0312f1a7a), [02](https://app.notion.com/p/3f63cadfab7781398a71cedc5c4a3994). Objetivos e sequência geral derivam do currículo; a organização em tópicos, os novos desafios 00 e 02, projetos, critérios detalhados e conquistas são elaboração original autorizada. As fontes técnicas não são atribuídas ao Notion. Não se reutilizaram textos/ilustrações/exercícios do roadmap.sh; a auditoria anterior orienta limites e projeto evolutivo, sem antecipar 05/08 ou exigir duas stacks.

01 preserva o mínimo curricular de três iniciais e um intermediário, acrescido do registro explícito dos 11 tópicos base e síntese. Seu catálogo de livros é recomendado. 00 usa critério autoral de 13 tópicos base, quatro iniciais, dois intermediários, projeto e síntese. 02 exige os 9 tópicos base, três exercícios iniciais, três intermediários, o projeto integrador **HTTP Diagnostic Lab** e síntese. Critérios são transparentes e reversíveis. Pré-requisitos das tarefas 02/04/08 incluem contador/condição/repetição e busca antes implícitos; os tópicos não têm ciclo de dependência.

## Projetos e portfólio

- **Biblioteca — versão algorítmica**, intermediário: cadastro, busca, empréstimo/devolução, parâmetros e invariantes, em diagramas ou pseudocódigo. ID de empréstimo único, livro cadastrado e rejeição sem mutação; disponibilidade=total−empréstimos ativos por livro. Modelo conceitual de sessão, sem concorrência/persistência. Obrigatório no mínimo autoral 00.
- **Catálogo de livros responsivo**, intermediário recomendado 01: contrato HTTP/JSON validado, busca+filtro, carregamento/erros/retry, favoritos e recuperação local, teclado/reflow e módulos. Primeiro marco local; integração HTTP final requerida no projeto. Sem backend próprio/auth/banco/Docker obrigatório.
- **Central de Reservas Comunitárias**, alternativa avançada: mantém ID `01-project`, slug e rascunhos anteriores. Não foi transformada silenciosamente em outro domínio.
- **Investigador HTTP** (`02-project-investigador`), inicial opcional 02: relatório de 5 requisições reais em DevTools, cURL e Bruno/Postman.
- **Contrato de API de biblioteca** (`02-project-contrato-biblioteca`), intermediário opcional 02: especificação de recursos `/livros` e `/emprestimos`, payloads JSON, status HTTP, paginação/filtros e coleção executável.
- **HTTP Diagnostic Lab** (`02-project-diagnostic-lab`), avançado obrigatório 02: dossiê completo de investigação HTTP, rede (DNS/TCP/TLS), cache condicional, CORS/preflight, contrato de API, coleção Bruno/Postman e fluxo Git com branches, PR e resolução de conflito documentados, com rubrica ponderada (35% investigação HTTP, 20% contrato de API, 25% Git e fluxo de trabalho, 20% documentação).

Todos têm contexto/problema, requisitos funcionais/não funcionais, restrições, entregáveis, marcos, aceitação, rubrica, referências e extensões. Guia de portfólio orienta README, estrutura, instruções, capturas, decisões, casos/resultados e limites. Não se criou repositório do estudante.

## Livros, referências e direitos

77 referências com recorte/idioma/custo/versão/datas e ressalvas; 90 URLs únicas incluindo catálogos e discussões individuais. Consulta de conteúdo é distinta de checagem GET. Novas fontes incluem CSUnplugged, UFRN, UVV, IME-USP, MDN, TypeScript, RFC 9110, Cloudflare Learning, OpenAPI Initiative, LinuxCommand, cURL Book, Bruno Docs, Postman Learning Center, Pro Git PT-BR, Git Reference e GitHub Docs. Materiais IME-USP são edições legadas Runestone 2019/2020, com exemplos Python como apoio conceitual, sem impor a linguagem. Widgets não executados. Convenções de fluxogramas são as do guia UVV 2021; normas citadas por ele não foram diretamente lidas. Não se afirma uma sintaxe universal de pseudocódigo.

| Livro | Evidência consultada | Uso e limites |
| --- | --- | --- |
| Entendendo Algoritmos — Aditya Y. Bhargava | [Novatec, 2ª edição brasileira 2026](https://novatec.com.br/livros/entendendo-algoritmos-2ed/), ISBN 978-85-7522-929-3; capa ampliada oficial salva em `public-roadmap/covers/entendendo-algoritmos-2ed.webp` (470×650 px) | Busca/ordenação/recursão/custo 00; Python não obrigatório. Recomendações individuais [TabNews](https://www.tabnews.com.br/lucasribeirodev/por-que-entendendo-algoritmos-e-o-livro-que-todo-desenvolvedor-precisa-ler) e [r/brdev](https://www.reddit.com/r/brdev/comments/1awc96t/livro_entendendo_algoritmos/) não provam consenso nem avaliam necessariamente a 2ª edição. |
| Aprendendo TypeScript — Josh Goldberg | [Novatec, 2022](https://novatec.com.br/livros/aprendendo-typescript/), ISBN 978-65-86057-99-7 (número da edição não confirmado no catálogo); capa ampliada oficial salva em `public-roadmap/covers/aprendendo-typescript.webp` (292×398 px) | Apoio 01; conferir configuração atual no Handbook. Sem consenso comunitário alegado. |
| Lógica de Programação e Algoritmos com JavaScript — Edécio Fernando Iepsen | [Novatec, 2ª edição 2022](https://novatec.com.br/livros/logica-programacao-algoritmos-com-javascript-2ed/), ISBN 978-65-86057-90-4; capa ampliada oficial salva em `public-roadmap/covers/logica-programacao-javascript-2ed.webp` (292×419 px) | Funções/arrays/DOM/storage 01; capítulos de backend/banco não antecipados. |
| Análise de Tráfego em Redes TCP/IP — João Eriberto Mota Filho | [Novatec, 1ª edição 2013](https://novatec.com.br/livros/analise-trafego-tcp-ip/), ISBN 978-85-7522-375-8; capa oficial salva em `public-roadmap/covers/analise-trafego-tcp-ip.webp` (292×403 px) | Apoio 02 para DNS, TCP/IP e diagnóstico de rede. |
| Dominando Estilos de APIs — Lukasz Dynowski e Marcin Dulak | [Novatec, 1ª edição 2026](https://novatec.com.br/livros/dominando-estilos-apis/), ISBN 978-85-7522-980-4; capa oficial salva em `public-roadmap/covers/dominando-estilos-apis.webp` (292×403 px) | Apoio 02 para semântica HTTP, status, headers, cache e contratos REST. |
| Aprendendo Git — Anna Skoulikari | [Novatec, 1ª edição 2024](https://novatec.com.br/livros/aprendendo-git/), ISBN 978-85-7522-882-1; capa oficial salva em `public-roadmap/covers/aprendendo-git.webp` (292×403 px) | Apoio 02 para modelo mental de commits, branches, merge e conflitos. |
| Linux Guia Prático — Daniel J. Barrett | [Novatec, 4ª edição 2024](https://novatec.com.br/livros/linux-guia-pratico-4ed/), ISBN 978-85-7522-911-8; capa oficial salva em `public-roadmap/covers/linux-guia-pratico-4ed.webp` (292×403 px) | Apoio 02 para navegação no terminal, redirecionamentos, pipes e cURL. |
| Construindo Sistemas Seguros e Resilientes — Leandro Silva | [Novatec, 1ª edição 2026](https://novatec.com.br/livros/construindo-sistemas-seguros-resilientes/), ISBN 978-85-7522-988-0; capa oficial salva em `public-roadmap/covers/construindo-sistemas-seguros-resilientes.webp` (292×403 px) | Apoio 02 para TLS, HTTPS, CORS e diagnóstico de falhas de transporte. |

Os oito livros são opcionais e têm alternativas gratuitas por tópico; não se exibem preços nem links de compra. Nenhum texto integral foi lido por esta auditoria. As capas correspondem às edições cadastradas na editora Novatec e foram salvas como assets estáticos WebP em `public-roadmap/covers/`, com fallback de placeholder discreto com ícone SVG caso alguma imagem esteja ausente. Não se atribui recomendação coletiva sem evidência.

GET: 88/90 HTTP 200. A URL de pseudocódigo da UFRN falhou no cliente Node (`fetch failed`) e a URL da Cloudflare sobre DNS retornou HTTP 403 por desafio anti-bot ao cliente automatizado Node, embora ambas tenham sido consultadas diretamente; registrar os dois métodos, sem dizer 90/90. Relatório bruto: [REFERENCE_LINK_CHECK.json](REFERENCE_LINK_CHECK.json). Mudança futura de fonte/versão permanece possível.

## Auditorias independentes e correções

Antes das correções, apresentados os achados: critérios de prática 01/00 herdados arbitrariamente de tarefas; pré-requisitos implícitos; prompt 00 exigindo código; requisitos não funcionais ausentes no prompt; projeto 01 marcado obrigatório apesar do gate; projeto 00 subestimado; contrato de empréstimos incompleto. Corrigidos e reconferidos por revisores somente leitura distintos. Objetivo de complexidade limitado à contagem de operações para corresponder à atividade real, sem alegar avaliação de memória não exigida.

Educator: fidelidade/progressão/desafio/avaliação/autonomia/honestidade 3/4 no recorte inspecionado após correções; sem medição de aprendizagem com estudantes. Factchecker: sem bloqueante técnico identificado no recorte; convenções locais e dependência de versões continuam explícitas. UI/UX: inspeção independente 320px/fonte 150%, foco de modal e retorno por Esc, ausência de overflow/pageerror no recorte. Estudo isolado de tópico opcional agora inicia a etapa sem aumentar o mínimo de conclusão.

## Progresso, atividades em andamento e gamificação

Esquema 2 na chave `stacktrail:roadmap:1`; migra esquema 1 preservando rascunhos, preferências e projeto original, mantendo retrocompatibilidade com backups esquema 2 que ainda não possuíam `stageEvidence['02']` ou `stageTracking`. Chave legada v1–v8 permanece intacta. Não converter leitura antiga em estudo nem desafios 00 antigos em contratos novos. A seção visual **Dados locais e backup** (controles manuais de importação/exportação) foi removida da interface conforme solicitado, mantendo o `localStorage` automático e a validação interna (`parseBackup`, `mergeLegacy`) preservados. Sem sync; dependência de origem/navegador/dispositivo.

As etapas publicadas (`00`, `01` e `02`, extensível às futuras etapas) operam em quatro estados explícitos: **Não iniciada** (`nao-iniciada`), **Em andamento** (`em-andamento`, com `startedAt` registrado em `YYYY-MM-DD`), **Pausada** (`pausada`, com `pausedAt` registrado preservando todos os exercícios concluídos, projetos iniciados/concluídos, tópicos estudados, conquistas, dicas e percentual) e **Concluída** (`concluida`, derivada dos critérios da etapa e reversível ao desmarcar item obrigatório). O componente reutilizável `StageStatusControl` oferece os botões **Iniciar etapa**, **Parar etapa**, **Retomar etapa** e **✓ Etapa concluída**. A Etapa 02 possui composição visual própria (`.pf-hero-net`) com diagrama horizontal de comunicação em 4 nós (`01 · CLIENTE & CLI` → `02 · TRANSPORTE & SEGURANÇA` → `03 · CONTRATO & RESPOSTA` → `04 · VERSIONAMENTO`), indicadores de HTTP/redes/Git e barra de status e progresso integrada (`.pf-net-bar`), sem repetir o painel inclinado das Etapas 00 e 01.

Cada exercício ou projeto opera em três estados explícitos: **Não iniciada** (`novo`), **Em andamento** (`em-andamento`, com `startedAt` registrado em `YYYY-MM-DD`) e **Concluída** (`concluido`, reversível por **Desfazer conclusão**). Na página **Meu progresso**, a seção **Etapas em andamento** lista as etapas ativas com estado, percentual atual, atividades concluídas (`X/Y`), botão **Continuar** e botão **Parar etapa**; separadamente, a seção **Atividades em andamento** lista exercícios e projetos iniciados e ainda não concluídos, com filtro por tipo (`Todas as atividades`, `Exercícios`, `Projetos`), exibindo nome, etapa, tipo, dificuldade, data de início, botão **Continuar** e botão **Parar atividade** (que retorna ao estado não iniciado sem apagar rascunhos/anotações do estudante).

00 tem 21 registros no denominador, 01 tem 16 e 02 tem 17 (9 tópicos base + 3 iniciais + 3 intermediários + projeto integrador + síntese). Tópicos opcionais e atividades além do mínimo não inflam esses valores. Card 100% e conquista de etapa decorrem de registros, não validação técnica. Editar tentativa/desmarcar registro reverte resultado e conquistas. Painel mostra início/conclusão, exercícios/projetos, geral por 20 etapas e faixas de formação. Júnior tem 2/9 etapas migradas (01 e 02) e continua indisponível para conclusão integral porque 03–09 aguardam migração. Evidência externa é declarada, não consultada automaticamente. Não há notas/certificados/recompensa por visitas.

## Documentação e skills

AGENTS reescrito para remover regras ativas de aulas/editor e checklists antigos contraditórios, preservando limites, dados, segurança e fontes. README atualizado com arquitetura, contribuição, comandos e transparência. [Auditoria documental](DOCUMENTATION_AUDIT.md) classifica os 60 arquivos preexistentes; históricos têm aviso/contexto, ativos são distinguidos. Caminhos do README legado corrigidos. Nenhum documento removido/movido. Novos índice/auditoria/relatório complementam os registros acumulados.

Três skills atualizadas: critérios alinhados a competência/portfólio 00 sem linguagem; invariantes, comunidade e direitos de capa; navegação compacta/conquistas reversíveis/estados futuros. quick_validate passou nas três: formato, não prova comportamental. Comportamento revisado na aplicação descrita acima.

## Validação final e limites

Resultados efetivamente observados:

- `npm run lint`, `npm run typecheck`, `npm run build`: passaram. Build principal: 13 arquivos em `dist/` (`index.html`, bundle JS, bundle CSS, `.nojekyll`, `favicon.svg` e 8 capas WebP em `dist/covers/`); sem assets resolvidos do legado, conferido por `check-practice-build.mjs`.
- `npm test -- --maxWorkers=2`: 416 testes / 41 arquivos passaram; inclui migração esquema 1→2, estados de início/parada/retomada de etapas (`stageTracking`) e de atividades (`startedAt`), IDs/contratos, invalidação, conclusão/reversão das Etapas 00/01/02, conquistas e prompts 00/01/02.
- Chromium, build estático `/stacktrail/`: 15 cenários E2E em `e2e/practice.spec.ts` cobrindo varredura de todas as rotas publicadas (incluindo Etapa 02, seus 9 tópicos, 9 exercícios e 3 projetos) nos dois temas com axe e reflow, matriz responsiva (320/375/768/1024/1440 px com fonte 150%), composição visual própria da Etapa 02 (`.pf-hero-net`), fluxo de iniciar/pausar/retomar/concluir etapas 00, 01 e 02 com preservação integral de progresso, fluxo de iniciar/parar/concluir/desfazer conclusão de exercício e projeto, seções **Etapas em andamento** e **Atividades em andamento**, ausência de **Dados locais e backup**, carregamento real das 8 capas de livros (`naturalWidth > 0`), conclusão e reversão das Etapas 00, 01 e 02, migração legada preservando `backend-academy:progress`, falhas de storage/clipboard e zoom real 200%/400% via extensão Chromium.
- GET 88/90; 90 alvos auditados (UFRN inacessível por fetch Node e Cloudflare DNS retornando 403 anti-bot ao script automatizado). Verificação de links locais em README/AGENTS/todos MD de docs: nenhum alvo de arquivo inexistente. Não é auditoria de todas as âncoras.
- Formato das três skills validado. Revisões independentes reconferiram achados pedagógicos/técnicos e recorte de UI; sem bloqueante demonstrado nesse escopo.

Limitações restantes: materiais externos podem mudar; edição de Aprendendo TypeScript sem número confirmado no catálogo da editora; sem leitura integral de livros, aprendizagem real com estudantes, auditoria WCAG completa ou medição exaustiva manual de todos os estados. Testes legados unitários permaneceram na suíte, mas não se repetiu a matriz de navegador do legado. Não se executaram projetos/soluções de estudantes nem integrações reais de backend. Nenhum teste do projeto do estudante foi executado pela plataforma. Sem backend, autenticação, banco, uploads ou API de IA. Navegação interna depois de carregar não equivale a instalação offline; não há service worker. Revisões não certificam WCAG, correção universal ou aprendizagem.
