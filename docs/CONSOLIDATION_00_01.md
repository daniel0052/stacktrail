# Consolidação StackTrail 2.0 — Etapas 00/01

Data: 17/10/2026. Branch `feat/practice-first-roadmap`. Escopo: somente00/01 no novo modelo. Sem commit, push ou publicação nesta tarefa. Alterações anteriores preservadas; snapshot inicial de135 arquivos locais em `/tmp/stacktrail-before-00-consolidation/` (temporário, não backup permanente).

## Fases e estado real

- [x] Inspeção de instruções, anexos, código, alterações, auditoria roadmap.sh e documentação existente; plano apresentado antes das alterações.
- [x] Currículo00/01 lido integralmente pelo MCP do Notion, sem filhos/paginação/truncamento pendentes.
- [x] Modelo e navegação compacta; consolidação01 e migração00, mantendo02–19 pendentes.
- [x] Projetos, livros, referências, prompts e progresso versionado implementados.
- [x] Auditorias pedagógica e técnica independentes, correções e reconferência textual.
- [x] Auditoria documental e atualização das três skills; formato validado por quick_validate.
- [x] Validação final de interface, zoom, comandos e reconciliação dos resultados, com limites abaixo.

## Organização e inventário

`src/practice/curriculum.ts` agrega o catálogo01 preservado e o novo `stage-zero.ts`. UI, progresso e cálculo de conquistas ficam separados. Build principal estático não publica MDX, simuladores, ZIPs resolvidos ou entrada legada. Legado fica isolado e recuperável pelos comandos explícitos; nenhum arquivo curricular legado foi apagado.

| Etapa | Tópicos base/opcionais | Inicial | Intermediário | Avançado | Extra |
| --- | --- | --- | --- | --- | --- |
| 00 | 13/2 | 4 | 4 | 3 | 2 |
| 01 | 11/3 | 3 | 3 | 3 | 2 |

29 tópicos,24 exercícios e três projetos. Os nove exercícios originais01 mantêm IDs/contratos. Os novos00 usam IDs `00-pf-*`, sem equiparação aos29desafios visuais legados. Não existe avaliador de algoritmos no novo cliente; os testes de mesa são do estudante e declarados.

00 cobre decomposição, padrões, abstração, algoritmos, pseudocódigo, fluxogramas, variáveis, condições, laços, sub-rotinas, vetores, busca, ordenação, recursão introdutória e contagem de operações. Ordenação/recursão são aprofundamentos opcionais. Exercícios incluem interpretação, depuração, fronteiras e rastros, não somente produção de representações.

01 acrescenta arquivos, módulos e JSON como tópicos explícitos e fortalece critérios observáveis. HTML/formulários, CSS/reflow, JS dentro de TS, tipos/validação, DOM/eventos, async/HTTP/CORS, storage e opções de framework mantêm seu recorte. Genéricos/utilitários introdutórios são referências de consulta, sem gate avançado.

## Fidelidade, autoria e pré-requisitos

Notion consultado: [00](https://app.notion.com/p/3f53cadfab77814bbaf1de279833217b), [01](https://app.notion.com/p/3f63cadfab77812494d8d5a0312f1a7a). Objetivos e sequência geral derivam do currículo; a organização em tópicos, os novos desafios00, projetos, critérios detalhados e conquistas são elaboração original autorizada. As fontes técnicas não são atribuídas ao Notion. Não se reutilizaram textos/ilustrações/exercícios do roadmap.sh; a auditoria anterior orienta limites e projeto evolutivo, sem antecipar05/08 ou exigir duas stacks.

01 preserva o mínimo curricular de três iniciais e um intermediário, acrescido do registro explícito dos11 tópicos base e síntese. Seu catálogo de livros é recomendado.00 usa critério autoral de13 tópicos base, quatro iniciais, dois intermediários, projeto e síntese: não alegamos que esse número veio do Notion. Critérios são transparentes e reversíveis. Pré-requisitos das tarefas02/04/08 incluem contador/condição/repetição e busca antes implícitos; os tópicos não têm ciclo de dependência.

## Projetos e portfólio

- **Biblioteca — versão algorítmica**, intermediário: cadastro, busca, empréstimo/devolução, parâmetros e invariantes, em diagramas ou pseudocódigo. ID de empréstimo único, livro cadastrado e rejeição sem mutação; disponibilidade=total−empréstimos ativos por livro. Modelo conceitual de sessão, sem concorrência/persistência. Obrigatório no mínimo autoral00.
- **Catálogo de livros responsivo**, intermediário recomendado01: contrato HTTP/JSON validado, busca+filtro, carregamento/erros/retry, favoritos e recuperação local, teclado/reflow e módulos. Primeiro marco local; integração HTTP final requerida no projeto. Sem backend próprio/auth/banco/Docker obrigatório.
- **Central de Reservas Comunitárias**, alternativa avançada: mantém ID `01-project`, slug e rascunhos anteriores. Não foi transformada silenciosamente em outro domínio.

Todos têm contexto/problema, requisitos funcionais/não funcionais, restrições, entregáveis, marcos, aceitação, rubrica, referências e extensões. Guia de portfólio orienta README, estrutura, instruções, capturas, decisões, casos/resultados e limites. Não se criou repositório do estudante. Não foi inventado projeto inicial apenas para preencher nível.

## Livros, referências e direitos

55 referências com recorte/idioma/custo/versão/datas e ressalvas;60 URLs únicas incluindo catálogos e discussões individuais. Consulta de conteúdo é distinta de checagem GET. Novas fontes incluem CSUnplugged, UFRN, UVV, IME-USP, MDN e TypeScript. Materiais IME-USP são edições legadas Runestone2019/2020, com exemplos Python como apoio conceitual, sem impor a linguagem. Widgets não executados. Convenções de fluxogramas são as do guia UVV2021; normas citadas por ele não foram diretamente lidas. Não se afirma uma sintaxe universal de pseudocódigo.

| Livro | Evidência consultada | Uso e limites |
| --- | --- | --- |
| Entendendo Algoritmos — AdityaY.Bhargava | [Novatec,2ª edição brasileira2026](https://novatec.com.br/livros/entendendo-algoritmos-2ed/), catálogo/sumário | Busca/ordenação/recursão/custo00; Python não obrigatório. Recomendações individuais [TabNews](https://www.tabnews.com.br/lucasribeirodev/por-que-entendendo-algoritmos-e-o-livro-que-todo-desenvolvedor-precisa-ler) e [r/brdev](https://www.reddit.com/r/brdev/comments/1awc96t/livro_entendendo_algoritmos/) não provam consenso nem avaliam necessariamente a2ªedição. |
| Aprendendo TypeScript — JoshGoldberg | [Novatec,2022](https://novatec.com.br/livros/aprendendo-typescript/); número da edição não confirmado | Apoio01; conferir configuração atual no Handbook. Sem consenso comunitário alegado. |
| Lógica de Programação e Algoritmos com JavaScript — EdécioFernandoIepsen | [Novatec,2ªedição2022](https://novatec.com.br/livros/logica-programacao-algoritmos-com-javascript-2ed/) | Funções/arrays/DOM/storage01; capítulos de backend/banco não antecipados. |

Os três são pagos opcionais e têm alternativas gratuitas por tópico. Nenhum texto integral foi lido por esta auditoria. Sem permissão específica confirmada para capas: placeholders neutros com título/autor; sem downloads/hotlinks de imagens externas. Não se atribui recomendação coletiva sem evidência.

GET:59/60 HTTP 200. A URL de pseudocódigo da UFRN falhou no cliente Node (`fetch failed`), mas seu conteúdo foi consultado pela ferramenta web: registrar os dois métodos, sem dizer60/60. Relatório bruto: [REFERENCE_LINK_CHECK.json](REFERENCE_LINK_CHECK.json). Mudança futura de fonte/versão permanece possível.

## Auditorias independentes e correções

Antes das correções, apresentados os achados: critérios de prática01/00 herdados arbitrariamente de tarefas; pré-requisitos implícitos; prompt00 exigindo código; requisitos não funcionais ausentes no prompt; projeto01 marcado obrigatório apesar do gate; projeto00 subestimado; contrato de empréstimos incompleto. Corrigidos e reconferidos por revisores somente leitura distintos. Objetivo de complexidade limitado à contagem de operações para corresponder à atividade real, sem alegar avaliação de memória não exigida.

Educator: fidelidade/progressão/desafio/avaliação/autonomia/honestidade3/4 no recorte inspecionado após correções; sem medição de aprendizagem com estudantes. Factchecker: sem bloqueante técnico identificado no recorte; convenções locais e dependência de versões continuam explícitas. UI/UX: inspeção independente320px/fonte150%, foco de modal e retorno porEsc, ausência de overflow/pageerror no recorte. Estudo isolado de tópico opcional agora inicia a etapa sem aumentar o mínimo de conclusão.

## Progresso e gamificação

Esquema2 na chave `stacktrail:roadmap:1`; migra esquema1 preservando rascunhos, preferências e projeto original. Chave legada v1–v8 permanece intacta/exportável. Não converter leitura antiga em estudo nem desafios00 antigos em contratos novos. Importação validada antes de substituir; tentativas sem requisitos são rebaixadas, IDs futuros rejeitados. Falhas de armazenamento têm exportação de memória e aviso. Sem sync; dependência de origem/navegador/dispositivo.

00 tem21 registros no denominador,01 tem 16. Tópicos opcionais e atividades além do mínimo não inflam esses valores. Card100% e conquista de etapa decorrem de registros, não validação técnica. Editar tentativa/desmarcar registro reverte resultado e conquistas. Painel mostra início/conclusão, exercícios/projetos, geral por20etapas e faixas de formação. Júnior continua indisponível para conclusão integral porque02–09 aguardam migração. Evidência externa é declarada, não consultada automaticamente. Não há notas/certificados/recompensa por visitas.

## Documentação e skills

AGENTS reescrito para remover regras ativas de aulas/editor e checklists antigos contraditórios, preservando limites, dados, segurança e fontes. README atualizado com arquitetura, contribuição, comandos e transparência. [Auditoria documental](DOCUMENTATION_AUDIT.md) classifica os 60 arquivos preexistentes; históricos têm aviso/contexto, ativos são distinguidos. Caminhos do README legado corrigidos. Nenhum documento removido/movido. Novos índice/auditoria/relatório complementam os registros acumulados.

Três skills atualizadas: critérios alinhados a competência/portfólio00sem linguagem; invariantes, comunidade e direitos de capa; navegação compacta/conquistas reversíveis/estados futuros. quick_validate passou nas três: formato, não prova comportamental. Comportamento revisado na aplicação descrita acima.

## Validação final e limites

Resultados efetivamente observados:

- `npm run lint`, `npm run typecheck`, `npm run build`: passaram. Build principal:5 arquivos, JS 394,78kB minificado (122,98kB gzip); sem assets resolvidos do legado, conferido por `check-practice-build.mjs`.
- `npm test -- --maxWorkers=2`:414 testes/41 arquivos passaram na execução final; inclui migração esquema1→2, IDs/contratos, invalidação, conclusão/reversão, conquistas e prompts00.
- Chromium, build estático `/stacktrail/`:12 cenários funcionais passaram na rodada final. A mesma rodada tinha13 testes e uma falha de comparação exata do zoom4 com retorno3,9999999999999996; corrigida tolerância numérica no teste. Recorte de zoom repetido:1/1 passou. Não se alega13/13 em uma única rodada. [Resumo bruto da rodada](quality/consolidation/browser-report.json), [zoom reconferido](quality/consolidation/zoom-report.json).
- Varredura das89 rotas em ambos os temas:178 visitas com axe e ausência de overflow/pageerror; sem violações detectadas no recorte. Incompletos axe permanecem nos anexos, não são aprovações. Rotas incluem20visões gerais,29 tópicos,24 exercícios,3projetos e índices.
- Reflow:80 combinações de8 páginas ×5 larguras320/375/768/1024/1440 ×2 temas, fonte150%, sem overflow horizontal. Capturas [1440claro](quality/consolidation/progress-light-1440.png), [320escuro](quality/consolidation/progress-dark-320.png) e [00estreito](quality/consolidation/stage-00-dark-320.png) inspecionadas.
- Zoom real via extensão Chromium `chrome.tabs.setZoom/getZoom`:16 combinações de4 rotas ×2 temas ×200/400%; retorno observado2/≈4, viewport720/360 e DPR2/4, sem overflow. Não foi CSSzoom ou redução isolada de viewport.
- Jornadas: dicas, ajuda/avaliação editáveis e cópia real ao clipboard, foco inicial/retorno porEsc, conclusão/edição invalidando checklist, recarga, importação inválida/válida, migração preservando chave legada, quota/getItem/clipboard indisponíveis, filtros/vazios, portfólio persistente e alternativas gratuitas.00/01card100%, reversão e recarga conferidos; os testes de etapa preparam registros fictícios válidos e operam o último checkbox real, sem alegar avaliação de aprendizagem.
- Navegação interna com contexto offline após carregar passou. Sem service worker e sem teste de recarga offline: não prometer app instalado/offline.
- GET59/60;60 alvos auditados, UFRN inacessível por esse cliente. Verificação de links locais em README/AGENTS/todosMDde docs:nenhum alvo de arquivo inexistente. Não é auditoria de todas as âncoras.
- Formato das três skills validado. Revisões independentes reconferiram achados pedagógicos/técnicos e recorte de UI; sem bloqueante demonstrado nesse escopo.

Limitações restantes: materiais externos podem mudar; edição de AprendendoTypeScript sem número confirmado; capas sem permissão específica; sem leitura integral de livros, aprendizagem real com estudantes, auditoria WCAG completa ou medição exaustiva manual de todos os estados. Testes legados unitários permaneceram na suíte, mas não se repetiu a matriz de navegador do legado. Não se executaram projetos/soluções de estudantes nem integrações reais de backend. Nenhum teste do projeto do estudante foi executado pela plataforma. Sem deploy, autenticação, backend, banco, uploads ou API de IA. Navegação interna depois de carregar não equivale a instalação offline; não há service worker. Revisões não certificam WCAG, correção universal ou aprendizagem.
