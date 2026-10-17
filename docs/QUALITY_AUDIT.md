# StackTrail — auditoria global de qualidade

Escopo: plataforma compartilhada e todas as aulas, exemplos, práticas e exercícios publicados nas etapas 00, 01 e 02. Referência WCAG 2.2 AA; automação complementada por inspeção e operação. Execução em contexto isolado, sem dados pessoais. Não é certificado de conformidade nem prova de aprendizagem.

## Processo e estados

Skills: [UI/UX](../.agents/skills/stacktrail-uiux/SKILL.md) e [educacional existente](../.codex/skills/stacktrail-educator/SKILL.md). Estados: **pendente** (não resolvido), **em correção**, **corrigido** (alterado sem validação suficiente), **validado** (verificação pertinente realmente executada). Gravidade alta impede leitura/atividade ou viola requisito essencial; média prejudica uso; baixa é melhoria localizada. Gate final depende de não haver crítico/alto essencial sem validação.

## Fases

1. Skill UI/UX criada e quick_validate passou; critérios incluem contraste composto, estados, reflow, teclado/ponteiro, zoom real versus equivalência e limites da automação.
2. AGENTS atualizado: ambas as skills obrigatórias nas novas etapas e no escopo pertinente, sem duplicar educator.
3. Auditoria compartilhada inicial: CSS/React inspecionados; Playwright 1.64.1 e axe 4.14.0 adicionados como ferramentas de desenvolvimento justificadas. Chromium oficial baixado; nenhuma dependência de produção/serviço remoto acrescentada. Primeira tentativa ocorreu durante download incompleto e não é evidência de defeito do produto. Execução efetiva: 27 casos, 18 passaram e nove falharam; [resumo bruto](quality/shared-baseline.json). Uma falha é do posicionamento inicial de foco no teste, seis apontam contraste e duas apontam overflow de 1px a 320px/fonte150. Cobertura inicial: oito rotas compartilhadas nos dois temas, homepage nas cinco larguras e fonte150; não constitui ainda cobertura global completa.

## Achados compartilhados

| ID | Problema / localização | Gravidade e evidência inicial | Correção | Validação | Estado |
| --- | --- | --- | --- | --- | --- |
| UI-01 | Texto auxiliar claro `--faint`, sidebar em index.css | Alta: axe mediu 4,43:1 (#627265/#edf0e8) abaixo de 4,5; 9px em itens de navegação | Pendente | Baseline em seis rotas claras; revisão independente do CSS | em correção |
| UI-02 | Delimitação de campos usa `--line` decorativo | Alta: razão calculada borda/painel 1,47 escuro e 1,42 claro; fundo interno claro 1,16; campo vazio depende do contorno | Separar token de borda essencial | Pendente medição renderizada e campos vazios | em correção |
| UI-03 | `button:disabled` e `.flow-editor button:disabled` apagam rótulo com opacity | Média: reduz legibilidade de texto/indicador, incluindo limites do ajuste de fonte; exceção WCAG de inativos não atende diretriz de produto | Pendente | CSS inspecionado; estados serão exercitados | em correção |
| UI-04 | Microtipografia compartilhada | Média: header/nav/legendas úteis em 8–11px, leitura excessivamente pequena | Escala rem consistente sem mudar identidade | Pendente matriz com fonte 90/100/150 | em correção |
| UI-05 | Homepage em 320px/fonte150 | Média: document.scrollWidth=321 contra innerWidth=320 | Localizar origem; não esconder overflow do body | Baseline reproduziu em ambos os temas | em correção |
| UI-06 | Código rolável sem foco/nome explícitos, CodeBlock | Média: acesso ao scroll depende do browser; contexto de leitura ausente | Pendente | Revisão independente; testar linha longa por teclado | em correção |
| UI-07 | `.lesson-content .button` sobrescreve cor de secondary | Alta potencial: aplica accent-ink ao fundo transparente; confirmar em aula nos dois temas | Restaurar par semântico do secondary | Pendente navegador/axe na aula | em correção |
| QA-01 | Diagnóstico de overflow ignora ancestors hidden/clip | Alta para cobertura: pode mascarar conteúdo cortado | Distinguir scroll intencional de clipping, verificar controles | Revisão independente dos helpers | em correção |
| QA-02 | Matriz inicial não cobre ainda inventário de aulas/exercícios, zoom/modal/estados | Alta para gate: inventário declarado não equivale a execução | Expandir nas fases por etapa e fase8 | Nenhuma cobertura futura é declarada como executada | pendente |

## Revisão independente inicial

Subagente uiux_independent leu skill, AGENTS, CSS/React compartilhados e automação, sem editar. Confirmou os riscos de borda, opacity, código rolável e as lacunas de cobertura. Não executou navegador: a tentativa local por shell no sandbox foi bloqueada. Suas razões de contraste são cálculos de estilos, separados das medições axe renderizadas do autor. Fontes oficiais: W3C [1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), [1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), [2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) e documentação Playwright accessibility testing, consultadas nesta sessão.

## Cobertura pedagógica e etapas

Etapas 00 e 01: auditoria integral e consulta curricular nas fases 5/6, ainda pendentes. Etapa 02: relatório anterior será confrontado com arquivos atuais na fase 7; não basta possuir um relatório para declarar a auditoria global concluída.

## Pendências atuais

Fases 4–9 em execução. Não declarar conclusão enquanto houver problema essencial pendente, corrigido sem verificar, ou cobertura crítica não executada. Relatórios axe `incomplete` exigem análise específica, sobretudo gradientes/ilustrações. Browser zoom 200/400 ainda não exercitado; reduzir viewport não será chamado de zoom real.

## Fase 4 — correções compartilhadas (16/10/2026)

Correções: tokens de borda/foco/desabilitado e texto auxiliar claro; tipografia em rem; wrapping de títulos, estatísticas e cards; grids com minmax(0,1fr); menu com marca refluindo; modais limitados à viewport; código focável com nome; foco inicial preservado no StrictMode e restauração apenas após mudança de rota. Nenhum overflow global foi ocultado para produzir aprovação.

Validação executada no Chromium isolado: **97/97** cenários compartilhados passaram (oito rotas, dois temas, cinco larguras, fonte150, menu aberto/recolhido e teclado); **10/10** cenários do shell passaram medindo clipping de marca/menu/cabeçalho/rodapé; **4/4** estados passaram (cores computadas de campo/placeholder/borda/foco/desabilitado/erro, modal com Tab/Shift+Tab/Esc/retorno e rolagem real de código com ArrowRight). Logs locais em test-results; cenários reproduzíveis em e2e. Typecheck e lint passaram; build passou com aviso de chunk principal acima de500kB. Inspeção da captura integral 320px confirma reflow geral, mas sua escala não permite substituir inspeção detalhada dos componentes nas próximas fases.

Revisão independente identificou cobertura insuficiente do shell e teste de código sem rolagem; ambos receberam verificações adicionais. A matriz anterior teve13 falhas reais de wrapping/foco, corrigidas antes da repetição97/97. A tentativa inicial de Vitest foi interrompida porque descobriu também e2e; vitest.config.ts agora limita a suíte a src/tests, mantendo Playwright separado.

| Achado | Correção e evidência atual | Estado |
| --- | --- | --- |
| UI-01 | Token claro ajustado; axe nas16 combinações padrão e80 responsivas sem violação de contraste | validado |
| UI-02 | Borda semântica; amostras renderizadas de campos em ambos os temas ≥3:1, placeholder/texto ≥4,5:1 | validado |
| UI-03 | Rótulos inativos sem opacity; limites90/150 exercitados e contraste ≥4,5:1 | validado |
| UI-04 | Escala rem; controle90/100/150 e matriz150 executados; componentes específicos seguem nas fases seguintes | validado |
| UI-05 | Wrapping/grid/menu corrigidos;97 cenários e10 do shell passaram sem overflow diagnosticado | validado |
| UI-06 | Código nomeado/focável, linha longa rolada por seta nos dois temas | validado |
| UI-07 | Secondary restaura var(--text); aula HTML e modal analisados nos dois temas | validado |
| QA-01 | Helper não ignora clipping hidden/clip; teste específico mede scrollWidth do shell | validado |
| QA-02 | Inventário global, zoom real e estados dos editores ainda não executados nesta fase | pendente |

Os estados desta seção substituem a coluna histórica da baseline. A fase4 valida componentes compartilhados no escopo descrito; não conclui as auditorias curriculares nem WCAG global.

## Fase 5 — Etapa 00 em execução

Currículo relido integralmente via MCP em16/10/2026: página3f53cadfab77814bbaf1de279833217b, conteúdo fechado incluindo details, sem filhos/paginação/truncamento indicados. Objetivos do recorte: quatro pilares, reformulação, contrato, decomposição, representação, mesa/fronteiras, implementação simples, custo introdutório e refatoração após validar. Conteúdos transversais avançados não foram convertidos em novos requisitos desta etapa.

Auditoria independente leu19MDX,29desafios,20contratos ampliados e8visuais originais, vínculos e interpretador. Lacunas apresentadas antes das correções: entradas equivocadamente chamadas imutáveis; alegação falsa de uma única operação por bloco; recuperação ativa com resposta antecipada; cartões de método referentes a outro problema; práticas com defeito genérico; transferência repetindo demonstração; excesso de editores sem percurso; ponte Problem Solving Lab nominal.

| ID | Local / problema | Gravidade | Correção preparada | Verificação / estado |
| --- | --- | --- | --- | --- |
| P00-01 | variaveis.mdx e deep-curriculum: cópia local/expressões aninhadas | alta | Distinguir entrada original da variável local; estratégia inicial de dividir operações sem negar AST aninhada | Typecheck; revisão independente final pendente — corrigido |
| P00-02 | FlowPractice: defeitos genéricos no início | alta |20variantes por conceito em practice-seeds.ts; novas conexões relevantes; rascunhos existentes preservados |20regressões passaram: solução passa, defeito falha, início preservado, original intacto — corrigido; revisão didática pendente |
| P00-03 | LessonVisual: resposta antes da tentativa | média | Radio com feedback somente após escolha; sem nota/progresso automático | Navegador inicial renderizou; regressão de interação pendente — corrigido |
| P00-04 | metodo: cartões/pré-requisitos antigos e ponte externa nominal | média | Oficina consistente; roteiro local problems/tests/notes/README;TS e4casos | Código próprio extraído e executado com Node:4casosconferidos; integrações externas pendentes — corrigido |
| P00-05 |10aulas: transferência/progressão genéricas | média | Problemas novos e critérios por assunto; conferência após tentativa; percurso em sessões nas aulas densas | Revisão final independente e renderização integral pendentes — corrigido |
| UI00-01 | FlowCanvas:g somente leitura com aria-label sem role | alta, axe serious | Papel img para conexão sem ação; botão preservado na edição |4cenários de duas aulas passaram axe — validado nesse recorte |
| UI00-02 | Tasklists GFM:input desabilitado sem nome | alta, axe critical | LessonListItem envolve texto e checkbox em label | Mesmos4cenários passaram axe — validado nesse recorte |

Fontes técnicas lidas nesta fase: MDN Functions (parâmetro/argumento/retorno/recursão), Loops and iteration (laços), Number.isSafeInteger (validação numérica); TypeScript Everyday Types (anotações/arrays); VisuAlgo sorting (estratégias/custo); Node Modules:TypeScript (remoção de tipos sem typecheck). Sem atribuir convenções do interpretador a essas fontes; comportamento local verificado no código e nos testes. Exemplos de transferência são autorais, objetivos conforme Notion. Referências da editora não significam leitura integral do livro.

### Complementos da fase5

Revisão independente final pedagógica:19aulas com3/4 em cada uma das sete dimensões, sem bloqueante conceitual remanescente identificado; matriz/evidências em [relatório](etapa-00-auditoria-pedagogica.md). Isso não valida layout nem aprendizagem real.

Novos achados UI00-03 (alto): seletores base/seleção/execução das formas SVG não correspondiam ao g intermediário. Corrigidos em flow.css; jornada Playwright mediu fill aplicado e stroke-dasharray do bloco ativo. UI00-04 (alto): ampliação sem contenção/retorno de foco. Agora dialog/aria-modal, fundo inerte, Tab contido e retorno ao acionador; Esc exercitado nos dois temas. UI00-05 (médio): movimento dependia de arraste/setas; adicionados controles de direção por clique, exercitados. UI00-06 (médio): propriedades não restauravam foco; fechamento agora devolve ao bloco se outro controle não recebeu foco. UI00-07 (médio): seleção da conexão só por cor; aria-pressed e tracejado acrescentados, ainda requer inspeção específica no gate final.

Dois cenários completos do editor passaram: criação, edição e foco, movimento por clique, excluir/desfazer/refazer, conectar portas, passo/destaque, ampliação/Tab/Esc/retorno, execução com entradas0 e2 (resultados6 e12), invalidação e recuperação após reload. Quatro cenários iniciais das aulas introdução/variáveis passaram.19MDX renderizaram em regressão própria. A suíte completa passou com297testes/28arquivos antes da regressão adicional de revelação dos casos; essa nova regressão está em verificação.

Varredura104: baseline84pass/20falhas, com layout e interferências de edição/MDX separados em quality/stage00-baseline.json. Após correções,102pass/2falhas referentes à nova expressão `idade <12` interpretada como MDX. Expressão corrigida com código inline; build passou e19renderizações passaram. Confirmação dos alvos e laboratórios em andamento; não apresentar104/104 como uma execução única.

Tabelas MDX agora têm região de rolagem local focável e nomeada; listas do laboratório quebram textos longos sem overflow global. Captura375px/fonte150 inspecionada, largura do documento375. A inspeção revelou também casos JSON visíveis antes da tentativa: agora só aparecem após verificar a solução; alteração restrita aos desafios visuais00 e sem mudar cálculo de progresso.

UI00-08 (alto): a contenção da ampliação interceptava Tab do modal nativo de funções. A contenção externa agora delega quando existe dialog nativo aberto. Regressão ampliada passou nos dois temas com Tab/Shift+Tab/Esc e retorno; nenhuma aprovação por leitura apenas. Estado validado no fluxo exercitado. A revisão independente apontou o defeito antes da correção.

A regressão de casos antes da tentativa passou em stage-zero.test.tsx (9testes desse arquivo). O build final voltou a passar após corrigir a marcação MDX. Estado das aulas condicionado à confirmação de rotas em execução; zoom real e demais larguras do editor permanecem para fase8.

### Fechamento da fase5

Confirmação efetiva: **68/68** cenários passaram, incluindo os dois casos de condicionais corrigidos, aulas com edição final e todos os laboratórios. A varredura anterior cobriu as52rotas nos dois temas:102/104; os dois casos falhos foram corrigidos e confirmados nesta execução. [Resumo rastreável](quality/stage00-validation.json). Não se afirma104/104 em uma única execução. Suíte final:298/298 em28arquivos; typecheck/lint/build passaram. Aviso de chunk >500kB permanece.

P00-01 aP00-05: validados no escopo pedagógico textual e testes descritos; UI00-01 aUI00-06 eUI00-08: validados nas rotas/fluxos executados. UI00-07: corrigido, inspeção específica de seleção ainda prevista no gate global. Sem bloqueante pedagógico ou de atividade essencial remanescente identificado nesta fase. Matriz de cinco larguras do editor, zoom real e estados adicionais permanecem explicitamente na fase8; não há certificação WCAG.

## Fase6 — Etapa01

Currículo integral e11aulas/9exercícios revisados com ambas as skills; lacunas apresentadas antes das correções. [Relatório e rubrica](etapa-01-auditoria-pedagogica.md). P01-01 (alto, ambienteTS),P01-02 (alto, mockHTTPreproduzível),P01-03 (médio,FormData),P01-04 (médio,UIdeestados/opcionais),P01-05 (médio,ponteGit),P01-06 (médio,unused/template) corrigidos e conferidos na revisão independente textual. Exemplos técnicos compilados efluxoHTTPexecutado; instalações externas continuam não verificadas, sem atribuir essa validação à plataforma.

48/48cenários Playwright passaram após aprofundamento:24rotas×2temas,375px/fonte150,axe/overflow/erros de página.11MDXrenderizadas. Compiladorstrict+unused verificou trechos completos. Dois cenários das fixtures temporárias passaram comredeHTTP/CORS/FormData reais. Laboratório textual passou persistência/dicas/trocaetapa/promptsem envio. Typecheck/lint/build passaram; chunk>500kB segue aviso. As larguras restantes, browserzoom e estadosglobais continuam na fase8. Resultado sustentado pelos logs em test-results e cenários reproduzíveis em e2e; não é certificadoWCAG ou validação deGitHub/Next externo.

## Fase7 — reconciliação da Etapa02

Currículo novamente consultado integralmente via MCP; revisão independente atual leu12aulas/9exercícios e modelos, sem bloqueante pedagógico novo identificado.21testes em seis arquivos executados pelo revisor passaram. A matriz anterior foi confrontada com os arquivos; seu registro de15/10 não foi usado como execução atual. As sete dimensões da rubrica permanecem3/4 por aula, com evidências no adendo do relatório da etapa.

Navegador atual:50/50combinações de25rotas×2temas,375px/fonte150 passaram axe/overflow/erros de página. Jornadas operacionais dos cinco simuladores acrescentadas em e2e/web-tool-states.spec.ts:HTTP201/invalidação/falhaDNS; percurso e recuperação ativa; contrato/feedback invalidado; terminal/pipe; conflitoGit resolvido com dois pais/persistência.

UI02-01, alta: histórico rolável do terminal sem foco; axe sinalizou scrollable-region-focusable nos dois temas após help. Corrigido com tabindex0 na região nomeada; regressão agora exige foco e ArrowDown com scrollTop crescente. Validação da correção em execução. As duas tentativas iniciais falharam por seletores getByLabel exatos da automação; foram corrigidos para papéis/nomes acessíveis e não constituem defeitos da aplicação.

Fechamento da fase7: dois cenários operacionais completos passaram nos dois temas após correção do terminal, incluindo foco/rolagem por seta e axe após os estados. UI02-01 validado no fluxo descrito. Typecheck/lint/build passaram. Sem alteração curricular adicional necessária nesta fase. Integrações externas e certificação WCAG permanecem fora dos resultados. A tentativa de nova revisão independente específica de UI02 não completou por indisponibilidade do subagente; as revisões independentes globais de componentes/editor e a revisão pedagógica atual foram concluídas, com a cobertura explicitada neste relatório.

## Fase 8 — verificação global complementar (16/10/2026)

Aplicadas novamente stacktrail-uiux e stacktrail-educator conforme o escopo. A
matriz global percorreu 103 rotas nos dois temas em 1440 px e 12 contextos
representativos em 320/768/1024/1440 px com fonte 150%: 302 cenários, 298 passaram
e quatro encontraram overflow em 320 px. A cobertura anterior por etapa acrescenta
375 px. Não apresentar essa execução como 302/302. Evidência resumida em
[global-baseline.json](quality/global-baseline.json); cenários reproduzíveis em e2e/.

| ID | Local e evidência | Gravidade | Correção e validação | Estado |
| --- | --- | --- | --- | --- |
| UI08-01 | flow-rotate-notice: botão extrapolava 320 px | alta | Flex com quebra e texto flexível; confirmação direcionada nos dois temas | corrigido |
| UI08-02 | checklist do laboratório biblioteca: palavra longa alargava página | alta | min-width e overflow-wrap no texto da checkbox | corrigido |
| UI08-03 | canvas normal: altura fixa podia encobrir controles com fonte 150% | alta | Altura natural do conjunto e região do grafo delimitada; regressão de dimensões | corrigido |
| UI08-04 | disabled e bordas das propriedades sobrescritos pelo CSS do editor | média | Tokens aplicados na folha específica; medições de contraste nos dois temas | validado |
| UI08-05 | ampliação em browser zoom 400%: foco fora da área visível | alta | Rolagem do diálogo acompanha foco; testes reais 200/400% passaram nos dois temas, incluindo editar e salvar bloco | validado no fluxo testado |
| UI08-06 | propriedades portadas fora da árvore aria-modal | alta | Portal fica no shell do próprio canvas | corrigido |
| UI08-07 | div com aria-label sem papel nos heróis 01/02 | média | role img nas ilustrações | corrigido |
| UI08-08 | tabela vazia do caderno sem células de dados | média | Mensagem inicial; tabela aparece ao acrescentar uma linha | corrigido |

Contraste adicional: testes dos estados normal/hover/foco por teclado, selecionado,
desabilitado e fill real de texto SVG passaram nos dois temas. O hover usa token
sem filtro brightness, permitindo medir a cor efetiva. Texto fora de formas também
foi medido contra o fundo e a grade. Reduced motion foi conferido. O teste inicial
de foco programático após mouse não ativava focus-visible; corrigido para navegação
por Shift+Tab/Tab, sem alterar a regra para encobrir falha.

Zoom real usa chrome.tabs.setZoom em perfil descartável, confirmado por getZoom,
innerWidth e devicePixelRatio: viewport base 1440, 720 a 200%, 360 a 400%.
A verificação mede retângulos e opera controles; não usa CSS zoom nem emulação de
DPR como substituto. A captura headless desse perfil produziu imagem vazia e não
é evidência visual utilizável; a inspeção visual é complementar nas capturas
375/1440 px. A limitação de captura em zoom deve permanecer explícita.

Os incompletos do axe não foram suprimidos nem classificados como aprovação.
A baseline contém 13.350 ocorrências repetidas de color-contrast entre cenários:
ícones Unicode decorativos, texto fora do recorte de regiões roláveis, pseudo
conteúdo/gradientes e SVG sobre formas. Medições adicionais cobrem controles e SVG
representativos; não substituem verificação manual de cada ocorrência. As regiões
locais de código/tabela/canvas mantêm rolagem intencional, nome e foco; não são
exceção para permitir overflow de botões ou texto comum. Revisão manual exaustiva,
leitores de tela e contraste de cada ilustração permanecem pendentes. Ausência de
violação automática não certifica conformidade WCAG.

Verificações estáticas atuais: typecheck, lint e build passaram. Build emitiu aviso
de chunk principal de 560,68 kB minificado. Suíte unitária: 310/310 em 30 arquivos
com maxWorkers=2. A execução anterior com quatro workers teve timeout de 5 s em
um fluxo antigo do editor (309 passaram); a repetição com dois workers passou sem
alterar o timeout nem remover o teste. Não executados deploy, serviços pessoais,
GitHub externo, instalação/build de projeto Next e estudo com estudantes.

Confirmação direcionada de reflow: 28 cenários da matriz passaram (incluindo os
quatro alvos anteriormente falhos em 320 px e os heróis/caderno corrigidos).
UI08-01, UI08-02, UI08-07 e UI08-08: validados nesse recorte. A execução conjunta
teve 30 passagens e duas falhas de uma asserção visual que exigia todos os botões
simultaneamente na viewport de 375 px; a captura mostrou diálogo rolado com foco
no canvas. O critério correto exige acesso individual por foco e rolagem, sem
corte horizontal. A regressão foi ajustada para operar cada botão habilitado,
sem excluir elementos ou regras axe.

Nova confirmação do zoom passou nos dois temas e acrescentou elementFromPoint
no centro de cada controle focado: o alvo recebe interação na posição visível.
A captura vazia do Chromium em zoom segue limitação da evidência raster, não é
usada como inspeção visual. Os testes operaram Funções, Centralizar e ajustar,
Processamento, edição, salvamento e Escape.

Fechamento da fase 8: seis cenários finais passaram — duas jornadas completas do
editor e quatro inspeções 375/1440 px × claro/escuro. Acesso por foco a todos os
botões habilitados, ausência de corte horizontal, altura natural do editor,
contraste de desabilitados e bordas, portal dentro do diálogo, edição e Escape
foram conferidos. Captura de 375 px/fonte 150% inspecionada: controles legíveis e
região de grafo local rolável; toolbar e paleta acessíveis por rolagem do diálogo.
UI08-03 e UI08-06: validados. UI00-07 mantém aria-pressed e tracejado no código;
a jornada conecta portas, mas a inspeção específica da conexão selecionada
continua pendente e não é declarada validada. Não foi
identificado bloqueante nos fluxos exercitados; pendências manuais seguem abaixo.

## Fase 9 — entrega, cobertura e pendências

README atualizado com comandos, portas, fixture de estudo e links dos relatórios.
AGENTS preserva as regras do projeto e registra o fechamento desta execução.
Nenhuma etapa 03–19 foi produzida, nenhum deploy/push/commit foi realizado.

| Verificação atual | Resultado efetivamente observado |
| --- | --- |
| TypeScript, ESLint, build | passaram; aviso de chunk >500 kB |
| Unitários com dois workers | 310 passaram em 30 arquivos |
| Matriz global baseline | 298 passaram / 4 falharam; quatro falhas de overflow corrigidas e confirmadas |
| Confirmação direcionada da matriz | 28 passaram; não substitui por alegação de 302/302 |
| Zoom real + contraste de estados/SVG | quatro passaram; nova confirmação de zoom/hit-test: dois passaram |
| Jornadas editor + inspeção final | seis passaram em dois temas, larguras 375/1440 |
| Etapas e exemplos | resultados específicos das fases 5–7 e relatórios pedagógicos; sem inflar contagem por duplicações |

Pendências sem certificação: leitura com leitores de tela, inspeção manual
exaustiva de todos os incompletos do axe, plataformas de navegador além do Chromium,
captura raster utilizável do zoom real, estudo de aprendizagem com estudantes e
integrações/publicação externas. Mantê-las como pendentes; não confundir gate local
de defeitos conhecidos com conformidade integral WCAG. O aviso de tamanho do bundle
é uma melhoria de desempenho futura. Relatórios temporários não são garantia
permanente: execute novamente os cenários após alterações relevantes.

## Verificação técnica independente posterior — 16/10/2026

A auditoria global de interface acima não é aprovação técnica de cada afirmação.
A nova skill stacktrail-factchecker separa essa responsabilidade da educator e da
uiux. O registro principal é [CONTENT_VERIFICATION.md](CONTENT_VERIFICATION.md),
com matrizes das três etapas e pareceres independentes em verification/.

Foram encontrados contraexemplos que o build e os testes anteriores não cobriam:
HTML incompleto para validar e-mail, JSON por prefixo falso no contrato, Location
sem identificador, case de media type, operadores de shell citados e precedência
de erro sobre cache condicional. Os comportamentos foram corrigidos sem substituir
componentes ou alterar critérios globais de progresso. Evidência atual do navegador:
primeira rodada 47/50 passou; HTML/axe teve contexto destruído e duas jornadas de
ferramentas tiveram elemento destacado por remount/navegação. A causa desses
incidentes não foi estabelecida. A confirmação separada passou os três alvos e
mais quatro jornadas de editor e exemplos HTTP/FormData: 7/7. Não se declara
50/50 em uma única execução nem se oculta a rodada falha.

As aulas alteradas da Etapa 01 foram conferidas em 375 px/fonte 150%, ambos os
temas, com axe e reflow. Isso não acrescenta certificação WCAG ou revisão integral
por leitor de tela. Resultados técnicos finais e limitações ficam no relatório de
conteúdo para evitar confundir estado da interface com precisão técnica.
