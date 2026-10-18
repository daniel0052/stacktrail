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
| Entendendo Algoritmos — Aditya Y. Bhargava | [Novatec, 2ª edição brasileira 2026](https://novatec.com.br/livros/entendendo-algoritmos-2ed/), ISBN 978-85-7522-929-3; capa ampliada oficial salva em `public-roadmap/covers/entendendo-algoritmos-2ed.webp` (470×650 px) | Busca/ordenação/recursão/custo 00; Python não obrigatório. Recomendações individuais [TabNews](https://www.tabnews.com.br/lucasribeirodev/por-que-entendendo-algoritmos-e-o-livro-que-todo-desenvolvedor-precisa-ler) e [r/brdev](https://www.reddit.com/r/brdev/comments/1awc96t/livro_entendendo_algoritmos/) não provam consenso nem avaliam necessariamente a 2ª edição. |
| Aprendendo TypeScript — Josh Goldberg | [Novatec, 2022](https://novatec.com.br/livros/aprendendo-typescript/), ISBN 978-65-86057-99-7 (número da edição não confirmado no catálogo); capa ampliada oficial salva em `public-roadmap/covers/aprendendo-typescript.webp` (292×398 px) | Apoio 01; conferir configuração atual no Handbook. Sem consenso comunitário alegado. |
| Lógica de Programação e Algoritmos com JavaScript — Edécio Fernando Iepsen | [Novatec, 2ª edição 2022](https://novatec.com.br/livros/logica-programacao-algoritmos-com-javascript-2ed/), ISBN 978-65-86057-90-4; capa ampliada oficial salva em `public-roadmap/covers/logica-programacao-javascript-2ed.webp` (292×419 px) | Funções/arrays/DOM/storage 01; capítulos de backend/banco não antecipados. |

Os três são opcionais e têm alternativas gratuitas por tópico; não se exibem preços nem links de compra. Nenhum texto integral foi lido por esta auditoria. As capas correspondem às edições cadastradas na editora Novatec e foram salvas como assets estáticos WebP em `public-roadmap/covers/`, com fallback de placeholder discreto com ícone SVG caso alguma imagem esteja ausente. Não se atribui recomendação coletiva sem evidência.

GET:59/60 HTTP 200. A URL de pseudocódigo da UFRN falhou no cliente Node (`fetch failed`), mas seu conteúdo foi consultado pela ferramenta web: registrar os dois métodos, sem dizer60/60. Relatório bruto: [REFERENCE_LINK_CHECK.json](REFERENCE_LINK_CHECK.json). Mudança futura de fonte/versão permanece possível.

## Auditorias independentes e correções

Antes das correções, apresentados os achados: critérios de prática01/00 herdados arbitrariamente de tarefas; pré-requisitos implícitos; prompt00 exigindo código; requisitos não funcionais ausentes no prompt; projeto01 marcado obrigatório apesar do gate; projeto00 subestimado; contrato de empréstimos incompleto. Corrigidos e reconferidos por revisores somente leitura distintos. Objetivo de complexidade limitado à contagem de operações para corresponder à atividade real, sem alegar avaliação de memória não exigida.

Educator: fidelidade/progressão/desafio/avaliação/autonomia/honestidade3/4 no recorte inspecionado após correções; sem medição de aprendizagem com estudantes. Factchecker: sem bloqueante técnico identificado no recorte; convenções locais e dependência de versões continuam explícitas. UI/UX: inspeção independente320px/fonte150%, foco de modal e retorno porEsc, ausência de overflow/pageerror no recorte. Estudo isolado de tópico opcional agora inicia a etapa sem aumentar o mínimo de conclusão.

## Progresso, atividades em andamento e gamificação

Esquema2 na chave `stacktrail:roadmap:1`; migra esquema1 preservando rascunhos, preferências e projeto original. Chave legada v1–v8 permanece intacta. Não converter leitura antiga em estudo nem desafios00 antigos em contratos novos. A seção visual **Dados locais e backup** (controles manuais de importação/exportação) foi removida da interface conforme solicitado, mantendo o `localStorage` automático e a validação interna (`parseBackup`, `mergeLegacy`) preservados. Sem sync; dependência de origem/navegador/dispositivo.

Cada exercício ou projeto opera em três estados explícitos: **Não iniciada** (`novo`), **Em andamento** (`em-andamento`, com `startedAt` registrado em `YYYY-MM-DD`) e **Concluída** (`concluido`, reversível por **Desfazer conclusão**). Na página **Meu progresso**, a seção **Atividades em andamento** lista imediatamente exercícios e projetos iniciados e ainda não concluídos, com filtro por tipo (`Todas as atividades`, `Exercícios`, `Projetos`), exibindo nome, etapa, tipo, dificuldade, data de início, botão **Continuar** e botão **Parar atividade** (que retorna ao estado não iniciado sem apagar rascunhos/anotações do estudante).

00 tem21 registros no denominador,01 tem 16. Tópicos opcionais e atividades além do mínimo não inflam esses valores. Card100% e conquista de etapa decorrem de registros, não validação técnica. Editar tentativa/desmarcar registro reverte resultado e conquistas. Painel mostra início/conclusão, exercícios/projetos, geral por20etapas e faixas de formação. Júnior continua indisponível para conclusão integral porque02–09 aguardam migração. Evidência externa é declarada, não consultada automaticamente. Não há notas/certificados/recompensa por visitas.

## Documentação e skills

AGENTS reescrito para remover regras ativas de aulas/editor e checklists antigos contraditórios, preservando limites, dados, segurança e fontes. README atualizado com arquitetura, contribuição, comandos e transparência. [Auditoria documental](DOCUMENTATION_AUDIT.md) classifica os 60 arquivos preexistentes; históricos têm aviso/contexto, ativos são distinguidos. Caminhos do README legado corrigidos. Nenhum documento removido/movido. Novos índice/auditoria/relatório complementam os registros acumulados.

Três skills atualizadas: critérios alinhados a competência/portfólio00sem linguagem; invariantes, comunidade e direitos de capa; navegação compacta/conquistas reversíveis/estados futuros. quick_validate passou nas três: formato, não prova comportamental. Comportamento revisado na aplicação descrita acima.

## Validação final e limites

Resultados efetivamente observados:

- `npm run lint`, `npm run typecheck`, `npm run build`: passaram. Build principal: 8 arquivos em `dist/` (`index.html`, bundle JS, bundle CSS, `.nojekyll`, `favicon.svg` e 3 capas WebP em `dist/covers/`); sem assets resolvidos do legado, conferido por `check-practice-build.mjs`.
- `npm test -- --maxWorkers=2`: 414 testes/41 arquivos passaram; inclui migração esquema1→2, estados de início/parada (`startedAt`), IDs/contratos, invalidação, conclusão/reversão, conquistas e prompts00.
- Chromium, build estático `/stacktrail/`: 13 cenários E2E em `e2e/practice.spec.ts` cobrindo varredura das 89 rotas nos dois temas com axe e reflow, matriz responsiva (320/375/768/1024/1440 px com fonte 150%), fluxo de iniciar/parar/concluir/desfazer conclusão de exercício e projeto, filtro de **Atividades em andamento**, ausência de **Dados locais e backup**, carregamento real das 3 capas de livros (`naturalWidth > 0`), migração legada preservando `backend-academy:progress`, falhas de storage/clipboard e zoom real 200%/400% via extensão Chromium.
- GET59/60;60 alvos auditados, UFRN inacessível por esse cliente. Verificação de links locais em README/AGENTS/todosMDde docs:nenhum alvo de arquivo inexistente. Não é auditoria de todas as âncoras.
- Formato das três skills validado. Revisões independentes reconferiram achados pedagógicos/técnicos e recorte de UI; sem bloqueante demonstrado nesse escopo.

Limitações restantes: materiais externos podem mudar; edição de AprendendoTypeScript sem número confirmado no catálogo da editora; sem leitura integral de livros, aprendizagem real com estudantes, auditoria WCAG completa ou medição exaustiva manual de todos os estados. Testes legados unitários permaneceram na suíte, mas não se repetiu a matriz de navegador do legado. Não se executaram projetos/soluções de estudantes nem integrações reais de backend. Nenhum teste do projeto do estudante foi executado pela plataforma. Sem backend, autenticação, banco, uploads ou API de IA. Navegação interna depois de carregar não equivale a instalação offline; não há service worker. Revisões não certificam WCAG, correção universal ou aprendizagem.
