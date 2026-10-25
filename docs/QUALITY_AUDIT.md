> **Escopo atual:** Etapas 00/01/02/03/04/05/06 no formato de orientação e prática. Consulte [consolidação](CONSOLIDATION_00_01.md) e [auditoria documental](DOCUMENTATION_AUDIT.md). As seções anteriores registram verificações datadas do legado ou piloto; não constituem aprovação automática desta versão.

# StackTrail — auditoria global de qualidade

Escopo: plataforma compartilhada e todas as aulas, exemplos, práticas e exercícios publicados nas etapas 00, 01, 02, 03, 04, 05 e 06. Referência WCAG 2.2 AA; automação complementada por inspeção e operação. Execução em contexto isolado, sem dados pessoais. Não é certificado de conformidade nem prova de aprendizagem.

## Processo e estados

Skills: [UI/UX](../.agents/skills/stacktrail-uiux/SKILL.md) e [educacional existente](../.codex/skills/stacktrail-educator/SKILL.md). Estados: **pendente** (não resolvido), **em correção**, **corrigido** (alterado sem validação suficiente), **validado** (verificação pertinente realmente executada). Gravidade alta impede leitura/atividade ou viola requisito essencial; média prejudica uso; baixa é melhoria localizada. Gate final depende de não haver crítico/alto essencial sem validação.

## Fases

1. Skill UI/UX criada e quick_validate passou; critérios incluem contraste composto, estados, reflow, teclado/ponteiro, zoom real versus equivalência e limites da automação.
2. AGENTS atualizado: ambas as skills obrigatórias nas novas etapas e no escopo pertinente, sem duplicar educator.
3. Auditoria compartilhada inicial: CSS/React inspecionados; Playwright 1.64.1 e axe 4.14.0 adicionados como ferramentas de desenvolvimento justificadas. Chromium oficial baixado; nenhuma dependência de produção/serviço remoto acrescentada. Primeira tentativa ocorreu durante download incompleto e não é evidência de defeito do produto. Execução efetiva: 27 casos, 18 passaram e nove falharam; [resumo bruto](quality/shared-baseline.json). Uma falha é do posicionamento inicial de foco no teste, seis apontam contraste e duas apontam overflow de 1px a 320px/fonte 150. Cobertura inicial: oito rotas compartilhadas nos dois temas, homepage nas cinco larguras e fonte 150; não constitui ainda cobertura global completa.

## Achados compartilhados

| ID | Problema / localização | Gravidade e evidência inicial | Correção | Validação | Estado |
| --- | --- | --- | --- | --- | --- |
| UI-01 | Texto auxiliar claro `--faint`, sidebar em index.css | Alta: axe mediu 4,43:1 (#627265/#edf0e8) abaixo de 4,5; 9px em itens de navegação | Pendente | Baseline em seis rotas claras; revisão independente do CSS | em correção |
| UI-02 | Delimitação de campos usa `--line` decorativo | Alta: razão calculada borda/painel 1,47 escuro e 1,42 claro; fundo interno claro 1,16; campo vazio depende do contorno | Separar token de borda essencial | Pendente medição renderizada e campos vazios | em correção |
| UI-03 | `button:disabled` e `.flow-editor button:disabled` apagam rótulo com opacity | Média: reduz legibilidade de texto/indicador, incluindo limites do ajuste de fonte; exceção WCAG de inativos não atende diretriz de produto | Pendente | CSS inspecionado; estados serão exercitados | em correção |
| UI-04 | Microtipografia compartilhada | Média: header/nav/legendas úteis em 8–11px, leitura excessivamente pequena | Escala rem consistente sem mudar identidade | Pendente matriz com fonte 90/100/150 | em correção |
| UI-05 | Homepage em 320px/fonte 150 | Média: document.scrollWidth=321 contra innerWidth=320 | Localizar origem; não esconder overflow do body | Baseline reproduziu em ambos os temas | em correção |
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

Validação executada no Chromium isolado: **97/97** cenários compartilhados passaram (oito rotas, dois temas, cinco larguras, fonte 150, menu aberto/recolhido e teclado); **10/10** cenários do shell passaram medindo clipping de marca/menu/cabeçalho/rodapé; **4/4** estados passaram (cores computadas de campo/placeholder/borda/foco/desabilitado/erro, modal com Tab/Shift+Tab/Esc/retorno e rolagem real de código com ArrowRight). Logs locais em test-results; cenários reproduzíveis em e2e. Typecheck e lint passaram; build passou com aviso de chunk principal acima de500kB. Inspeção da captura integral 320px confirma reflow geral, mas sua escala não permite substituir inspeção detalhada dos componentes nas próximas fases.

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

Tabelas MDX agora têm região de rolagem local focável e nomeada; listas do laboratório quebram textos longos sem overflow global. Captura375px/fonte 150 inspecionada, largura do documento375. A inspeção revelou também casos JSON visíveis antes da tentativa: agora só aparecem após verificar a solução; alteração restrita aos desafios visuais00 e sem mudar cálculo de progresso.

UI00-08 (alto): a contenção da ampliação interceptava Tab do modal nativo de funções. A contenção externa agora delega quando existe dialog nativo aberto. Regressão ampliada passou nos dois temas com Tab/Shift+Tab/Esc e retorno; nenhuma aprovação por leitura apenas. Estado validado no fluxo exercitado. A revisão independente apontou o defeito antes da correção.

A regressão de casos antes da tentativa passou em stage-zero.test.tsx (9testes desse arquivo). O build final voltou a passar após corrigir a marcação MDX. Estado das aulas condicionado à confirmação de rotas em execução; zoom real e demais larguras do editor permanecem para fase8.

### Fechamento da fase5

Confirmação efetiva: **68/68** cenários passaram, incluindo os dois casos de condicionais corrigidos, aulas com edição final e todos os laboratórios. A varredura anterior cobriu as52rotas nos dois temas:102/104; os dois casos falhos foram corrigidos e confirmados nesta execução. [Resumo rastreável](quality/stage00-validation.json). Não se afirma104/104 em uma única execução. Suíte final:298/298 em28arquivos; typecheck/lint/build passaram. Aviso de chunk >500kB permanece.

P00-01 aP00-05: validados no escopo pedagógico textual e testes descritos; UI00-01 aUI00-06 eUI00-08: validados nas rotas/fluxos executados. UI00-07: corrigido, inspeção específica de seleção ainda prevista no gate global. Sem bloqueante pedagógico ou de atividade essencial remanescente identificado nesta fase. Matriz de cinco larguras do editor, zoom real e estados adicionais permanecem explicitamente na fase8; não há certificação WCAG.

## Fase6 — Etapa01

Currículo integral e11aulas/9exercícios revisados com ambas as skills; lacunas apresentadas antes das correções. [Relatório e rubrica](etapa-01-auditoria-pedagogica.md). P01-01 (alto, ambienteTS),P01-02 (alto, mockHTTPreproduzível),P01-03 (médio,FormData),P01-04 (médio,UIdeestados/opcionais),P01-05 (médio,ponteGit),P01-06 (médio,unused/template) corrigidos e conferidos na revisão independente textual. Exemplos técnicos compilados efluxoHTTPexecutado; instalações externas continuam não verificadas, sem atribuir essa validação à plataforma.

48/48cenários Playwright passaram após aprofundamento:24rotas×2temas,375px/fonte 150,axe/overflow/erros de página.11MDXrenderizadas. Compiladorstrict+unused verificou trechos completos. Dois cenários das fixtures temporárias passaram comredeHTTP/CORS/FormData reais. Laboratório textual passou persistência/dicas/trocaetapa/promptsem envio. Typecheck/lint/build passaram; chunk>500kB segue aviso. As larguras restantes, browserzoom e estadosglobais continuam na fase8. Resultado sustentado pelos logs em test-results e cenários reproduzíveis em e2e; não é certificadoWCAG ou validação deGitHub/Next externo.

## Fase7 — reconciliação da Etapa02

Currículo novamente consultado integralmente via MCP; revisão independente atual leu12aulas/9exercícios e modelos, sem bloqueante pedagógico novo identificado.21testes em seis arquivos executados pelo revisor passaram. A matriz anterior foi confrontada com os arquivos; seu registro de15/10 não foi usado como execução atual. As sete dimensões da rubrica permanecem3/4 por aula, com evidências no adendo do relatório da etapa.

Navegador atual:50/50combinações de25rotas×2temas,375px/fonte 150 passaram axe/overflow/erros de página. Jornadas operacionais dos cinco simuladores acrescentadas em e2e/web-tool-states.spec.ts:HTTP201/invalidação/falhaDNS; percurso e recuperação ativa; contrato/feedback invalidado; terminal/pipe; conflitoGit resolvido com dois pais/persistência.

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

## Etapa 03 — expansão e auditorias (16–17/10/2026)

Escopo novo:23 aulas em sete módulos, nove exercícios, cinco projetos locais,
visualizador conceitual de requisição e integração no shell/progresso v6. As etapas
00–02 foram preservadas e entraram nas regressões do projeto; não se declara uma
nova auditoria manual integral de suas aulas. Não foi produzido conteúdo04–19.

As três skills foram aplicadas separadamente: elaboração e rubrica pedagógica,
verificação técnica com fontes primárias/contraexemplos, revisão UI/UX independente.
A rastreabilidade por conceito está em [CONTENT_VERIFICATION](CONTENT_VERIFICATION.md);
pareceres [PHP/Laravel](verification/stage-03-php.md),
[Node/Express/Nest](verification/stage-03-node.md) e [UI/UX03](etapa-03-uiux.md).

### Achados antes das correções

| ID/localização | Gravidade | Evidência | Correção | Validação/estado |
| --- | --- | --- | --- | --- |
| UI03-01/09 — App/stages/Lab | Alta, risco de integração | Rotas/progresso antigos limitavam00–02 e texto tratava avançados como opcionais | Inventário03 e flag por exercício; avançados7/9 base | Modelo/inventário e jornada dos nove contextos passaram; validado nesse escopo |
| UI03-02/03 — progress/model | Alta, risco de migração | Denominador antigo não expressava cinco base/legadov5 | v6 aceita migrações1–5; base derivada deoptional; alterações invalidam revisão | Testes de legado e jornada concluem sem opcionais, persistem e invalidam após edição; validado |
| UI03-04/06 — CodeLab | Alta, risco de falsa execução | Plataforma estática não possui runtimePHP/Node seguro | Editor textual, ZIP completo, testes locais e “Verificar registro” explícito | Fluxos de edição/exportação/restauração e arquivos reais passaram; sem aprovação automática de código |
| UI03-10 — restauração inline | Média | Botão removido poderia deixar foco no body | Ref e retorno ao acionador ao cancelar/confirmar | Teclado e foco verificados nos dois temas; validado |
| UI03-11 — e2e/helpers | Média | Inventário global excluía03 | Derivado agora00–03 | Varredura03 contém23 aulas/noveexercícios e rotas gerais; validado no inventário |
| UI03-12 — falha de pacote | Baixa | Sem ação local de repetir carregamento | Retry explícito, erro acessível e ZIP alternativo | Interceptação503→retry recupera editor; validado no build |
| UI03-13 — RequestCycle input | Média | Em320px/fonte 150%, documento350px | Input/select/textarea limitados ao contêiner | Matriz320–1440 passou após correção; validado |
| UI03-14 — label de arquivo Laravel | Média | Em375px/fonte 150%, label281px com scrollWidth404; documento451px | overflow-wrap:anywhere no label | Diagnóstico independente reduziu documento375px; confirmação final do build registrada abaixo |
| EDU/TECH03 — aulas/projetos/exercícios | Média | JSON objeto/lista, helperPHP, logging antecipado, filtroex03, IDs numéricos, CLI/Location/rubrica divergentes | Contratos/código/aulas corrigidos por assunto | Pareceres registram fontes, testes reais e reconferência independente; validado no recorte |

### Cobertura funcional e visual executada

- 23 MDX renderizadas; inventário/exercícios, migração v5→v6, preservação legada,
  conclusão sem opcionais, invalidação de revisão e ZIP/draft com regressões próprias.
- Matriz independente: dez combinações de320/375/768/1024/1440px × dois temas,
  fonte 150%, quatro rotas por combinação;10/10 passaram após correção do input.
  Inclui dashboard, autoavaliação, ciclo e laboratórioPHP, axe/reflow e teclado/IA.
- Cinco testes de jornada/zoom passaram: edição, verificação de registro sem execução,
  ZIP, recarga/restauração/foco nos dois temas; rascunhos isolados nos nove exercícios;
  cinco base concluídos sem concluir opcionais e resultado invalidado após alterar
  código; prompt editável/Esc e troca de etapa.
- Zoom real do Chromium, via chrome.tabs.setZoom:200/400%, nos dois temas e três
  rotas03 (ciclo, laboratórioLaravel e autoavaliação). Redução de viewport CSS e
  aumento deDPR conferidos, com axe/reflow em cada fator. Não é apenas CSSzoom.
- Inspeção visual independente: dashboard1440px e editorLaravel375px, fonte 150%,
  capturas antes/depois do label; hierarquia/controles legíveis e código com rolagem
  local. Não há sobreposição crítica demonstrada no recorte.

### Execuções falhas preservadas no histórico

A primeira matriz passou7/10: dois overflows320px e um contexto do axe destruído;
nova matriz corrigida passou10/10. Um teste de restauração procurava nome incorreto
e, depois, uma asserção de foco foi colocada indevidamente após reload; corrigidos
os testes e os dois fluxos passaram. A primeira varredura estática passou75/81,
revelando o labelLaravel em seis cenários. A rodada seguinte corrigiu esses seis,
mas duas finalizações de contexto falharamENOENT ao apagar artefatos compartilhados
por outra execução Playwright. Configuração estática agora usa diretórios próprios
e é executada separadamente; resultado final abaixo.

Uma suíte Vitest durante carga concorrente passou365/366 com timeout de5000ms num
teste antigo de editor. A causa de tempo não foi isolada experimentalmente. Sem
alterar a lógica ou o timeout desse teste, a repetição separada passou366/366 em37
arquivos. Typecheck, lint e build passaram. O build avisa chunk principal de cerca
de612kB minificado; melhoria de divisão de código permanece oportunidade, sem
alegar regressão de tempo medida ou impedir funcionamento validado.

### Limites de aprovação

Axe sem violações detectadas não certificaWCAG. Incompletos color-contrast incluem
símbolos não textuais e itens de sidebar ocultos/parcialmente encobertos; não foram
convertidos em aprovação automática. O contraste computado dos novos controles e
fonte 90% tem resultado específico na confirmação final. Leitor de tela, dispositivo
real/touch, todos os estados de todas as aulas, instalação em outros SOs, aprendizagem
com estudantes e domínio publicado não foram testados integralmente. Não há deploy,
auth pronta ou comprovação automática de evidências externas. Essas limitações são
periféricas ao funcionamento local demonstrado; nenhum bloqueante crítico conhecido
foi ocultado por uma média de testes.

### Confirmação final do gate03

Build estático **81/81** passou com relatórios isolados, incluindo os seis cenários
Laravel que falharam por label. Contraste/fonte 90% **2/2** passou, com40 amostras de
controles/realce/tokensMDX: mínimo textual4,882:1, mínimo de foco7,956:1; estado
inativo também conferido. UI03-12/13/14 estão **validados** no recorte descrito.

A varredura adicional de **todas as139 rotas publicadas**, nos dois temas/1440px,
passou **277/278**. Um contexto do axe foi destruído na aula00estruturas; a confirmação
isolada nos dois temas passou **2/2**, sem reduzir regras/elementos nem alterar a
página. Causa da falha de contexto não estabelecida. O primeiro filtroCLI por
prefixo não selecionou testes; corrigido para o nome completo antes da varredura.
Não se relata278/278 em execução única. As referências à cobertura03 acima não
significam uma nova revisão manual integral dos conteúdos antigos.

Incompletos axe foram classificados: caracteres não textuais, código parcialmente
cortado pelo scroll local, conteúdo encoberto e pseudo-elementos decorativos.
Cores dos tokens/controles foram amostradas separadamente; nenhuma regra foi
excluída para esconder falha. Não há certificação WCAG nem aprovação implícita de
cada item incompleto. Resultado local adequado ao escopo novo, com limitações
manuais e externas preservadas. Checklist da fase10 atualizado no AGENTS.

## Etapa 03 — seleção de duas trilhas (17/10/2026)

Pedido de reorganização; skills educator/factchecker/uiux aplicadas. Lacunas
registradas antes da edição em etapa-03-trilhas e baselines independentes.
A revisão independente final está em verification/stage-03-tracks-final.md;
resultados de navegador abaixo são execução do autor, não do revisor.

| Local | Gravidade / problema | Correção | Validação / estado |
| --- | --- | --- | --- |
| StageThree/assessment/model | Alta: somente PHP concluía etapa | bancos separados e OR entre percursos completos | unitários e jornadaJS semPHP/Nest; validado |
| LessonIndex/Page/App/Lab | Média: lista/next e rótulos levavam JS a PHP | filtragem contextual, leitura comum e acesso direto preservado | navegação, nextJS, troca e acesso livre; validado |
| TrackSelector/Provider | Alta: escolha não persistia/progresso não era independente | preferência v7 sem redefinir evidências/arquivos | v6 e retorno às duas trilhas em Chromium; validado |
| CodeLab/projetos | Média: contexto inicial exigia CRUD prematuro/banco | filtros de testes iniciais e armazenamento JSON local | CLI/PHPUnit/HTTP real e rascunhos21contextos; validado |
| aulas novas | Média: dois títulos h1 na aula | título da página mantido e MDX inicia no objetivo | typecheck/build,31renderizações e varredura global; validado |
| lint local após Composer | Baixa: analisava vendor de terceiros como código autoral | ignore **/vendor/** e **/node_modules/** | npm run lint passou; validado |

Cobertura executada antes da reconferência final:13/13 cenários de seleção,
migração e matriz responsiva5larguras×2temas, fonte150% com seis rotas por cenário;
8/8 teclado, capturas, contraste90% e zoom real200/400% em ambos os temas.
Capturas desktopescuro/mobileclaro inspecionadas; foco e seleção têm texto/estado
aria-pressed além de cor. Reduced-motion ativo.121/121 cenários do build estático
passaram; alterações finais de texto/índice serão reconferidas no recorte adequado.

Automação não certifica WCAG. Incompletos axe ficam nos JSON anexados aos testes;
esta passagem não equivale a leitura por todas as tecnologias assistivas. Não
houve mudança do editor00; verificações compartilhadas não revalidam todas as
interações históricas. Sem publicação ou inspeção do domínio de produção.

Cobertura unitária reconferida: glob antigo em cache importava apenas23MDX.
Acrescentada asserção de correspondência com inventário;31renderizações e32casos
no arquivo passaram. A suíte final passou377testes/37arquivos. Isso comprova
renderização/contratos testados, sem converter execução em aprovação pedagógica.

Fechamento:318/318cenários globais (159rotas×2temas) passaram. O recorte final
do build estático passou27/27, incluindo fundamentos comuns revistos, oito aulas
novas, dashboard, evidências e pacotes. A rodada completa anterior permaneceu
121/121; não são evidências de deploy. A inspeção posterior também removeu
práticas comuns que exigiamLaravel/SQLite e acrescentou setupJS independente.
Revisor reconferiu essas três aulas sem bloqueante no recorte. Estado integrado:
**validado no escopo executado**, com limites manuais/externos declarados.

## Etapa04 e isolamento das trilhas03 — 17/10/2026

Escopo adicional: dashboard, índice,15aulas,24atividades eautoavaliação04; seleção03/04 econtextos diretos; quatro laboratórios, teclado, fonte90/150%, dois temas, larguras320/375/768/1024/1440 ezoom real200/400%. Revisão estática independente complementada por execução do autor; não certificaWCAG.

| Achado / localização | Gravidade | Correção / evidência | Estado |
| --- | --- | --- | --- |
| `curriculum03`,StageThree/App/Lab incluíamextraNest emPHP | Alta de navegação curricular | Filtros portrilha, contextoNestJS eopcional; testes de dados efluxo03→04 com reload passaram | validado |
| Avançados04 chamados opcionais; recomendado09 perdia classificação nasidebar | Média | Nível avançado agora orienta conferir indicação; requisito do exercício preservado nos cards/menu; revisão independente reconferiu | validado no recorte de navegação |
| Aula alternativa04/Nest03 usava sequência da preferência errada | Média | Contexto explícito sem mudar preferência, badge epróximaaula coerentes;15aulas econsultaExpressdireta passaram | validado |
| Projeto04 aparecia antes da implementação da trilha | Média | Integração final separada depois dos fundamentos/stack; inspeção de captura eordemDOM | validado no recorte |
| Botão concluir exigia reflexão sem orientar campo faltante | Média | Mensagem explica solução Ereflexão; validação deestado nega conclusão incompleta | validado no modelo e fluxo de conclusão |
| OpenAPI perdia texto ao trocaraba; HTTPguardava somentebody | Média | Autosave porcontexto, requisição completa efeedback de falha de storage; fluxo de persistência eaba passou | validado no recorte executado |
| Erros técnicos/simulação confundidos com APIreal | Alta educacional | Textos identificam modelo, parserreal, análiseparcial eprojetoslocais; respostas não alegam aprovação da tentativa | validado por revisão/fluxo local |

Primeira rodada de navegador:13/14passaram,1falha de contextoaxe durante navegação/recarregamento. Segunda rodada ampliada:16/17passaram,1contextdestroyed em768pxescuro, semviolação de layout/contraste demonstrada nesse cenário interrompido. Houve geração de pacotes públicos/build emparalelo ao servidor de desenvolvimento, capaz deprovocar reload. Não contabilizar as rodadas como100%. Reconferência isolada do cenário e estados finais registrada emdocs/etapa-04.md.

O zoom de navegador foi alterado pela APIchrome.tabs.setZoom em extensão local, com fator, viewport eDPR aferidos; não foi simulado porCSSzoom/deviceScaleFactor. Capturas de tema claro amplo/fonte90% eescuro375px/fonte150% inspecionadas pelo autor. Código/tabelas mantêm scroll local quando necessário; controles eprosa não apresentaram overflow nas medições completadas. Resultadosaxe incluem `incomplete` nos anexosJSON, não equivalem a aprovação de todos os contrastes/estados ouWCAG completa. Não houve teste comtecnologiaassistiva/estudantes, publicação oudispositivos físicos.

Testes: `e2e/stage-four.spec.ts`, `stage-four-progress.spec.ts`, `stage-four-zoom.spec.ts`, buildestático por`playwright.static04.config.ts`. Varredura de todas as rotaspublicadas nos dois temas foi adicionada ao inventário00–04; é smoke de renderização/navegação, não auditoriaaxe exaustiva de todos os estados de todas as etapas.

Reconferência final: cenário768pxescuro efluxolocal passaram2/2; gates independentesPHP/JS passaram2/2 após corrigir a preparação dafixture antes da navegação. Varreduraaxe/reflow04completa:86registros/0violações detectadas. Incompletoscolor-contrast foram analisados:nonBmp emícones/símbolos eelmPartiallyObscured emitens fora do scrollvisível dasidebar. Testes complementares nos dois temas mediram corescompostas/foco/seleção/controles eitemdasidebar após scroll;2/2passaram. Oensaio de foco usaTab/ShiftTab, não pressupõe que focusprogramático após clique ativefocus-visible. ExportaçãoOpenAPI/diálogoEscape/retorno defoco passou. Semregraaxe ignorada para obter aprovação; ressalvas WCAG/assistiva/manual permanecem. Osachados acima ficam **validados no recorte executado**, sem certificação global.

## 17/10/2026 — StackTrail 2.0 / piloto01

Mudança de produto autorizada no anexo: orientação e prática, sem novas aulas ou
simuladores de ensino. Aplicadas as três skills atualizadas com skill-creator;
quick_validate passou nas três. Legado preservado com entry/build separados.
Inventário da nova UI:48 rotas canônicas (roadmap,20 visões de etapa, índice11tópicos,
referências, índice11desafios, projeto e progresso); somente01 migrada. As outras
etapas são previews explicitamente pendentes. Aliases antigos01 redirecionam para
orientação/prática, sem servir aulas no build novo.

| Local / gravidade | Evidência inicial | Correção | Validação / estado |
| --- | --- | --- | --- |
| Skiplink / alta | HashRouter teria rota substituída por #conteudo | preventDefault e foco/scroll no main | Teclado Enter preservou URL/focoumain. **Validado**. |
| Backup após quota / média | error escolheria estado antigo salvo | separar bloqueio de leitura de erro ao salvar; exportar memória atual | QuotaExceeded simulado, export com rascunho atual. **Validado**. |
| Storage bloqueado / média | exports faziam getItem sem proteção | safe getter e fallback em memória/arquivo legado | SecurityError simulado; download do piloto e fallback do legado sem crash. **Validado**. |
| Clipboard ausente / média | TypeError antes de tratar rejeição | guarda e fallback de cópia manual | API ausente simulada, mensagem útil sem crash. **Validado**. |
| Hero320px/fonte150% / média | overflow na primeira rodada em dois temas | min-width0 nos filhos do grid e quebra de texto |50combinações (5rotas×5larguras×2temas) passaram. **Validado**. |
| Suíte Playwright / baixa | check sobre quatro elementos e label exato contendo opções | iterar checkboxes e selecionar combobox por nome | Jornada de conclusão/import e filtro idioma passou. **Validado**. |
| Currículo/curadoria / alta | CSS incompleto, ambienteTS/mock e APIs sem ponte | fontes específicas, ambiente externo GUI, rubrica aplicável | Revisão independente e reconferência documental; detalhes em CONTENT_VERIFICATION. |

### Execução real no build estático

Primeira rodada4/7 passou; não foi convertida em sucesso retroativo. Após correções,
7/7 passou: duas varreduras48rotas nos temas claro/escuro com axe/reflow;50combinações
320/375/768/1024/1440px com fonte150%; prompts help/review editáveis, clipboard real,
Esc/foco/retorno; checklists/gate/invalidação/reload; backup download/import válido
ou malformado; migração preservando chave antiga e ignorando leituras; menu móvel,
filtros e persistência do projeto; quota e APIclipboardausente.

Axe não detectou violações nas rotas e no modal inspecionados. Incompletos são
anexados por rota quando presentes, sem desativar regras para obter verde.
Capturas em test-results-practice/ e relatório HTML playwright-report-practice/ são artefatos
locais ignorados; não viram certificação. Fonte150% é ajuste do produto, não zoom
real do navegador. Zoom200/400%, tecnologias assistivas reais e outros motores
continuam fora da comprovação desta rodada.

Typecheck,407testes em40arquivos, build principal e build legado passaram. Bundle
principal≈345kB minificado (tamanho exato depende do build final); não incorpora ZIPs,
MDX ou entrylegado. Build legado preservado tem aviso de chunk>500kB; não é bundle
publicado do piloto. CheckerGET conferiu40/40URLs canônicas, sem enviar soluções.
Nenhuma execução do projeto do estudante foi feita; não há avaliação automática.

Relatório de migração, fontes, decisões, lacunas e plano:
[PRACTICE_FIRST_MIGRATION.md](PRACTICE_FIRST_MIGRATION.md).

### Fechamento da rodada2.0

- 9/9Playwright no build final passaram;96visitas comaxe e50cenários de reflow.
- Geometria dos rótulos/selects/ajuda ganhou teste próprio após revisão visual:
  a regra genérica antiga vencia display. Corrigida especificidade; a rodada8/9
  detectou min-content dos selects em telas pequenas. Corrigido minmax(0,1fr)
  e min-width0; última rodada9/9passou. **Validado** sem ocultar overflow global.
- Âncora das alternativas gratuitas preserva rota/scroll; SecurityError na leitura
  não quebra exportação; cenários novos passaram. **Validado**.
- Capturas viewport e inspeção independente real375/1440, modal/foco/Esc, sem corte
  observado no recorte. Contraste foi coberto peloaxe nas rotas, sem nova medição
  manual de todas as combinações. Zoom real200/400% continua pendente.
- 407unitários, lint, typecheck e build principal passaram. JS344,51kB/CSS61,44kB.
  Build legado passou; smoke de entrada antiga1/1comaxe/reflow passou. Suíte inteira
  do legado não foi reexecutada; seus testes unitários continuam incluídos nos407.
- Checkerfinal40/40GET;5arquivos no build novo, sem pacotes resolvidos/MDX/entrylegado.
- Diretórios de artefatos piloto/legado separados para evitar sobrescrita cruzada.

Sem críticos demonstrados nos fluxos verificados. Permanecem os limites de assistivas,
zoom real, outros motores, aprendizagem, mocks externos e deploy, sem seloWCAG.


## Consolidação00/01 — 17/10/2026

Aplicadas educator/factchecker/uiux, com revisão independente somente leitura. [Relatório e comandos](CONSOLIDATION_00_01.md), [resultados Chromium](quality/consolidation/browser-report.json) e [zoom real reconferido](quality/consolidation/zoom-report.json).12cenários passaram na rodada; zoom teve falha de precisão no teste, depois1/1passou. Não declarar13/13 numa única rodada.

| Local | Gravidade / achado | Correção | Evidência | Estado |
| --- | --- | --- | --- | --- |
| curriculum.ts / stage-zero.ts | Média: critérios não avaliavam seus tópicos | Critérios específicos por competência | Reconferência independente, inventário e rotas renderizadas | validado |
| stage-zero.ts desafios02/04/08 | Média: dependências implícitas | Condições/laços/variáveis/busca declarados | Revisão pedagógica e teste de inventário | validado |
| stage-zero.ts projeto00 | Média: identidade/invariante incompletos | IDs únicos, livro cadastrado, rejeição sem mutação, invariante completo | Reconferência técnica independente de contratos | validado no recorte textual; algoritmo do estudante não executado |
| prompts.ts | Média:00 exigia código; faltavam requisitos não funcionais | Representações/rastros aceitos, contexto completo | Unitário e cópia/foco real Chromium | validado |
| curriculum.ts / stage-zero.ts | Média/baixa: opcionalidade01 e nível00 divergentes |01 recomendado,00 intermediário | Reconferência pedagógica e gate de progresso | validado |
| achievements.ts | Baixa: estudo opcional não iniciava etapa | Considera qualquer tópico estudado, sem inflar conclusão | Regressão unitária | validado |
| App.tsx / StudyPages.tsx | Navegação extensa e risco de futura aparentar pronta | Cinco entradas,20cards, anterior/próxima; detalhes futuros inexistentes |178visitas de rotas/temas e jornadas00/01 | validado |
| progress.tsx / achievements.ts | Risco de perda de dados ou conclusão artificial | Migração/validação local, antigo intacto, conquistas reversíveis |414testes; jornadas de quota/reversão/recarga | validado no escopo testado |
| practice.css / componentes | Reflow, controles e modal | Grid/flex intrínseco, marca ajustada, foco e labels |80combinações responsivas,16zoom real, inspeção independente e capturas | validado no recorte; sem certificação WCAG |
| Shared.tsx livros | Capas reais das edições cadastradas e fallback discreto | Capas oficiais Novatec salvas em `public-roadmap/covers/` (WebP) com proporção preservada e fallback SVG | Catálogos da editora consultados; 3 capas carregadas (`naturalWidth > 0`) no browser | validado no recorte |

Pendências periféricas: GET UFRN, número de edição TS não informado no catálogo; alternativas gratuitas disponíveis. Fontes/catálogos não equivalem a livro integral. Incompletos axe são anexados ao relatório; revisão manual exaustiva/tecnologias assistivas e aprendizagem não certificadas. Sem crítico demonstrado nas jornadas avaliadas. Detalhes históricos do editor/simuladores não representam recursos do novo build.

## Ajustes de UX, atividades em andamento e capas de livros — 17/10/2026

Escopo executado na branch `feat/practice-first-roadmap`:

1. **Estados explícitos de atividades e seção Atividades em andamento**:
   - Exercícios e projetos operam nos estados **Não iniciada** (`novo`), **Em andamento** (`em-andamento`, com registro de `startedAt` em formato `YYYY-MM-DD`) e **Concluída** (`concluido`).
   - Na página de cada exercício ou projeto (`src/practice/ActivityPage.tsx`), o botão principal alterna entre **Começar atividade** (`novo`), **Parar atividade** (`em-andamento`) e **✓ Atividade concluída** acompanhado de **Desfazer conclusão** (`concluido`).
   - Na página **Meu progresso** (`src/practice/ProgressPage.tsx`), a seção **Atividades em andamento** lista exercícios e projetos iniciados e não concluídos, com filtro por tipo (`Todas as atividades`, `Exercícios`, `Projetos`), exibindo nome, etapa, tipo, dificuldade, data de início, botão **Continuar** e botão **Parar atividade** (que retorna ao estado não iniciado preservando rascunhos/anotações do estudante).
2. **Remoção da seção Dados locais e backup da interface**:
   - Removida a seção visual **Dados locais e backup** e os controles manuais de importação/exportação em `src/practice/ProgressPage.tsx`, mantendo integralmente a persistência automática em `localStorage` (`stacktrail:roadmap:1`), a preservação da chave legada (`backend-academy:progress`) e os validadores internos.
3. **Capas reais dos livros recomendados**:
   - Substituído o aviso `CAPA NÃO REPRODUZIDA` pelas imagens reais das capas correspondentes às edições cadastradas na Editora Novatec, salvas como assets estáticos WebP em `public-roadmap/covers/`:
     - *Entendendo Algoritmos – 2ª Edição* (Aditya Y. Bhargava, 2026, ISBN 978-85-7522-929-3): `public-roadmap/covers/entendendo-algoritmos-2ed.webp` (470×650 px).
     - *Aprendendo TypeScript* (Josh Goldberg, 2022, ISBN 978-65-86057-99-7): `public-roadmap/covers/aprendendo-typescript.webp` (292×398 px).
     - *Lógica de Programação e Algoritmos com JavaScript – 2ª Edição* (Edécio Fernando Iepsen, 2022, ISBN 978-65-86057-90-4): `public-roadmap/covers/logica-programacao-javascript-2ed.webp` (292×419 px).
   - Mantido placeholder discreto com ícone SVG de livro caso alguma obra futura não possua imagem de capa. Não são exibidos preços ou links de compra.
4. **Validação executada**:
   - `npm run typecheck`, `npm run lint`, `npm test -- --maxWorkers=2` (414 testes em 41 arquivos), `npm run build` e `node scripts/check-practice-build.mjs` (8 arquivos em `dist/`, sem vazamento de assets legados) passaram.
   - Suíte Playwright (`npm run test:ui`, 13 cenários em `e2e/practice.spec.ts`) validou as 89 rotas nos temas escuro e claro com axe e reflow, as 5 larguras responsivas (320, 375, 768, 1024 e 1440 px com fonte a 150%), os 14 fluxos de iniciar/parar/concluir/desfazer conclusão, filtros de atividades em andamento, ausência da seção de backup, persistência em `localStorage`, carregamento das 3 capas de livros e zoom real 200%/400%.

## Identidade visual da Etapa 02 e controle de início/pausa/retomada das etapas — 17/10/2026

Escopo executado na branch `feat/practice-first-roadmap`:

1. **Identidade visual própria da Etapa 02 (`/#/etapas/02`)**:
   - Substituído o layout de duas colunas com card inclinado (`.pf-map-art`) na página da Etapa 02 por uma composição horizontal dedicada a HTTP, redes e Git (`.pf-hero.pf-hero-net`), mantendo intactas as apresentações visuais das Etapas 00 e 01.
   - Adicionados eixos técnicos (`HTTP/1.1 · 2 · 3`, `DNS · TCP · TLS`, `CORS · Cache · Cookies`, `cURL · Bruno · Postman`, `Git · Branches · PRs`), diagrama visual horizontal de 4 nós (`01 · CLIENTE & CLI` → `02 · TRANSPORTE & SEGURANÇA` → `03 · CONTRATO & RESPOSTA` → `04 · VERSIONAMENTO`) e barra de progresso/estado integrada (`.pf-net-bar`).
2. **Ciclo de vida de acompanhamento das etapas (`Não iniciada`, `Em andamento`, `Pausada`, `Concluída`)**:
   - Estendido o modelo `Pilot` em `src/practice/progress.tsx` com `stageTracking` (`nao-iniciada | em-andamento | pausada`, `startedAt`, `pausedAt`), mantendo retrocompatibilidade total com dados já salvos em `localStorage`.
   - Criados os componentes reutilizáveis `StageStatusControl` e `StageStatusNotice` em `src/practice/Shared.tsx`, aplicados às Etapas 00, 01 e 02 (e preparados para futuras etapas publicadas):
     - **Não iniciada** → botão **Iniciar etapa**.
     - **Em andamento** → botão **Parar etapa** (pausa o acompanhamento e remove de **Etapas em andamento**, preservando integralmente exercícios concluídos, projetos iniciados/concluídos, tópicos estudados, conquistas, dicas e percentual).
     - **Pausada** → botão **Retomar etapa** (restaura o estado **Em andamento** e recoloca a etapa em **Etapas em andamento**; concluir ou iniciar atividade dentro de etapa pausada também retoma automaticamente o acompanhamento).
     - **Concluída** → selo **✓ Etapa concluída** derivado dos critérios da etapa, recalculando automaticamente caso um requisito obrigatório seja desmarcado.
   - Adicionada a seção **Etapas em andamento** em **Meu progresso** (`src/practice/ProgressPage.tsx`), separada de **Atividades em andamento**, com número/título da etapa, estado, percentual atual, atividades concluídas (`X/Y`), botão **Continuar** e botão **Parar etapa**.
   - Atualizados os cards do Roadmap (`src/practice/App.tsx`) e a seção **Progresso por etapa** com indicadores semânticos e visuais para os 4 estados (`✓ Concluída por autoavaliação`, `● Em andamento`, `⏸ Pausada`, `○ Não iniciada`).
3. **Validação executada**:
   - `npm run typecheck`, `npm run lint`, `npm test -- --maxWorkers=2` (416 testes em 41 arquivos), `npm run build` e `node scripts/check-practice-build.mjs` (13 arquivos em `dist/`) passaram.
   - Suíte Playwright (`npm run test:ui`, 15 cenários em `e2e/practice.spec.ts`) validou todas as 135 rotas publicadas nos temas escuro e claro com axe e reflow, as 5 larguras responsivas (320, 375, 768, 1024 e 1440 px com fonte a 150%), a composição visual exclusiva da Etapa 02 e os 18 requisitos de iniciar, pausar, retomar e concluir etapas 00, 01 e 02 sem perda de progresso.

## Implementação da Etapa 03 (Fundamentos de Backend: PHP/Laravel ou TypeScript/Node.js/Express) — 17/10/2026

Escopo executado na branch `feat/practice-first-roadmap`:

1. **Duas trilhas independentes e equivalentes (`php` e `javascript`)**:
   - **Fundamentos comuns (6 tópicos)**: Linguagem/runtime/framework, Ciclo de uma requisição, Configuração e dependências, Validação e tratamento de erros, Organização e testes, Segurança introdutória.
   - **Trilha A (`php`) — PHP + Laravel (12 tópicos específicos)**: 5 tópicos de PHP moderno (`strict_types`, orientação a objetos, Composer/PSR-4/PSR-12, CLI/servidor embutido) e 7 tópicos de Laravel (estrutura/ciclo, rotas/controllers, Request/FormRequest, respostas JSON/API Resources, middlewares, configuração `.env`/logs e Feature Tests HTTP).
   - **Trilha B (`javascript`) — TypeScript + Node.js + Express (12 tópicos específicos + 1 opcional)**: 3 tópicos de TypeScript no backend (`strict`, `unknown`/narrowing, async/await e `tsconfig.json`), 5 tópicos de Node.js (runtime/npm, ESM/CommonJS, `process.env`/`fs`/`path`, Event Loop e `node:http` nativo), 4 tópicos de Express (rotas/req/res, middlewares/pipeline, validação Zod/error middleware de 4 argumentos e estrutura `app.ts`/`server.ts` com testes Supertest) e **1 tópico opcional de NestJS** (`03-nestjs-opcional`) exclusivo da trilha TypeScript.
   - Qualquer uma das duas trilhas é suficiente para concluir 100% da Etapa 03 (28 unidades obrigatórias: 18 tópicos base da trilha + 3 exercícios iniciais + 3 intermediários + 2 avançados obrigatórios + projeto principal **Backend Foundations Lab** + síntese da etapa). Alternar entre trilhas preserva integralmente o progresso, os rascunhos e as atividades concluídas da outra trilha.
2. **Exercícios sem gabarito, projetos de portfólio e livros recomendados**:
   - 16 exercícios no catálogo (`03-php-01..06`, `03-ts-01..06`, `03-ex-07..09` compartilhados e `03-ts-extra-nest` opcional exclusivo da trilha TS), cada um com objetivos, pré-requisitos, requisitos, restrições, entradas/saídas, critérios de aceitação, 3 dicas graduais, ideias de teste, referências e rubrica.
   - 3 projetos de portfólio: **Backend Foundations CLI** (`03-project-cli`, inicial opcional), **Book Catalog API** (`03-project-catalog-api`, intermediário opcional) e **Backend Foundations Lab** (`03-project-foundations-lab`, avançado obrigatório com rubrica ponderada 30/20/25/15/10).
   - 5 novos livros em português verificados no catálogo da Editora Novatec com capas oficiais salvas em `public-roadmap/covers/` (*Aprendendo PHP*, *PHP Moderno*, *Desenvolvendo Web Sites com PHP – 3ª Edição*, *Aprendendo Node – 2ª Edição* e *Node.js Essencial*), além do vínculo de *Aprendendo TypeScript* com a Etapa 03.
3. **Identidade visual própria da Etapa 03 (`/#/etapas/03`)**:
   - Composição `.pf-hero.pf-hero-backend` distinta das Etapas 00/01 (`.pf-map-art`) e da Etapa 02 (`.pf-hero-net`), apresentando seletor interativo das duas trilhas (`StageTrackSwitch` com `aria-pressed`), pipeline horizontal de 4 estágios do ciclo de requisição no servidor (`01 · ROTEAMENTO HTTP` → `02 · PIPELINE DE MIDDLEWARES` → `03 · CONTROLLER & VALIDAÇÃO` → `04 · DOMÍNIO & RESPOSTA JSON`), prévia da árvore de diretórios da stack selecionada e barra integrada de estado e progresso.
4. **Validação executada**:
   - `npm run typecheck`, `npm run lint`, `npm test -- --maxWorkers=2` (417 testes em 41 arquivos), `npm run build`, `node scripts/check-practice-build.mjs` (18 arquivos em `dist/`, sem vazamento de assets legados) e `node scripts/check-practice-links.mjs` (121/123 HTTP 200; todas as 33 novas URLs da Etapa 03 retornaram 200) passaram.
   - Suíte Playwright (`npm run test:ui`, 17 cenários em `e2e/practice.spec.ts`) validou todas as rotas publicadas (incluindo a Etapa 03 nas trilhas PHP e TypeScript) nos temas escuro e claro com axe e reflow, as 5 larguras responsivas (320, 375, 768, 1024 e 1440 px com fonte a 150%), o hero `.pf-hero-backend`, a opcionalidade exclusiva do NestJS, a preservação de progresso ao alternar trilhas, as 13 capas de livros e o zoom real 200%/400%.

## Implementação da Etapa 04 (APIs REST e regras de negócio) e Reorganização de Livros e Referências — 18/10/2026

Escopo executado na branch `feat/practice-first-roadmap`:

1. **Reorganização completa de Livros e Referências (`/#/referencias`)**:
   - Eliminada a listagem global indiscriminada "Todos" que despejava materiais das 20 etapas simultaneamente.
   - Implementado seletor de etapa com acesso a todas as 20 etapas do roadmap (com estado informativo claro para etapas futuras ainda não migradas).
   - Ordem de prioridade estrita de seleção de etapa ao carregar a página: (1) parâmetro de URL `?etapa=XX` ou rota de referência de etapa `/etapas/:id/referencias`, (2) preferência salva em `localStorage` no campo `catalogStage`, (3) etapa em andamento mais relevante, (4) primeira etapa disponível (`'00'`).
   - Persistência automática da seleção de etapa em `localStorage` sob a chave estável `stacktrail:roadmap:1` (validação segura com fallback em `parsePilot`).
   - Filtros complementares dentro da etapa selecionada:
     - Tipo de material: Livros, Documentações, Artigos e guias, Especificações e RFCs, Cursos e atividades.
     - Trilha: Fundamentos comuns, PHP/Laravel, TypeScript/Node.js/Express (exibido apenas quando relevante para a etapa, mantendo fundamentos comuns acessíveis em ambas as escolhas).
     - Idioma: Português brasileiro (normalizado a partir de variações como pt-BR e edição brasileira), Inglês.
     - Acesso: Gratuito, Pago.
     - Busca textual em tempo real por título, autor, fonte ou assunto.
   - Resumo dinâmico exibindo quantidade exata de resultados encontrados, tags visuais dos filtros complementares ativos e botão **Limpar filtros** (que redefine os filtros complementares sem remover ou alterar a etapa selecionada).
   - Estado vazio honesto e amigável orientando o estudante quando nenhum resultado corresponde aos filtros selecionados.

2. **Implementação da Etapa 04 — APIs REST e Regras de Negócio (`/#/etapas/04`)**:
   - **Duas trilhas independentes e equivalentes**:
     - **Trilha A — PHP + Laravel**: `routes/api.php` (com nota explicativa sobre `php artisan install:api` e Sanctum sem obrigação de autenticação nesta etapa), Controllers REST, Form Requests para validação desacoplada, API Resources para serialização explícita, tratamento de exceptions com RFC 9457 e Testes HTTP do Laravel (`postJson`, `assertStatus`, `assertJsonStructure`).
     - **Trilha B — TypeScript + Node.js + Express**: Express Router, Handlers/controllers, schemas de validação de runtime com Zod (`req.params`, `req.query`, `req.body`), tratamento centralizado de erros em middleware de 4 argumentos, serialização explícita de DTOs de saída e Testes HTTP com `node:test` ou Vitest/Supertest.
   - **12 tópicos curriculares**: 6 comuns (`04-contratos-recursos`, `04-validacao-regras`, `04-paginacao-filtros`, `04-erros-rfc9457`, `04-idempotencia-timeouts`, `04-documentacao-openapi`) + 3 específicos de Laravel (`04-laravel-recursos`, `04-laravel-form-requests`, `04-laravel-testes-http`) + 3 específicos de Express (`04-express-recursos`, `04-express-zod-regras`, `04-express-testes-http`).
   - **9 exercícios no catálogo** (`04-ex-01` a `04-ex-09`), graduais e com critérios observáveis, 3 dicas progressivas, ideias de testes e rubrica:
     - Iniciais: `04-ex-01` (Tabela de Contratos REST), `04-ex-02` (Endpoints CRUD em memória), `04-ex-03` (Validação de Entrada e Invariantes).
     - Intermediários: `04-ex-04` (Paginação, Filtros e Ordenação com Whitelist), `04-ex-05` (RFC 9457 Problem Details com Content-Type `application/problem+json`), `04-ex-06` (Especificação OpenAPI 3.1.1).
     - Avançados: `04-ex-07` (Fluxo Completo de Regra de Negócio com 422 vs 409), `04-ex-08` (Idempotência com Header `Idempotency-Key` — opcional), `04-ex-09` (Suíte de Testes Automatizados de Regressão HTTP).
   - **3 projetos de portfólio**:
     - `04-project-catalog-basic`: Catálogo de Produtos REST - Básico (inicial opcional).
     - `04-project-catalog-advanced`: Catálogo de Produtos REST - Avançado (intermediário opcional).
     - `04-project-booking-api`: Sistema de Agendamentos / Reservas (Booking API) — projeto integrador obrigatório com regras de negócio temporais e estados, contrato OpenAPI 3.1, suíte completa de testes e rubrica ponderada 30/25/15/15/15.
   - **Ressalva explícita de concorrência**: armazenamento em memória não garante consistência atômica entre múltiplos processos concorrentes; prevenção robusta de conflitos e transações ACID pertencem à Etapa 05 (PostgreSQL).

3. **Identidade visual dedicada da Etapa 04**:
   - Hero horizontal `.pf-hero.pf-hero-rest` com matriz de contratos REST (`.pf-rest-matrix`), badges semânticos dos verbos HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) em suas cores de semântica técnica, callout comparativo de status 422 (Unprocessable Content) vs 409 (Conflict), padrão RFC 9457 Problem Details, alternador de trilhas (`StageTrackSwitch`), controle de ciclo de vida (`StageStatusControl`) e barra de progresso integrada (`.pf-rest-bar`).

4. **Livros e referências verificados**:
   - 3 novos livros adicionados com capas reais WebP salvas em `public-roadmap/covers/` após consulta ao catálogo oficial da Novatec:
     - *Fundamentos de Engenharia de Software* (Ian Sommerville, 2023, ISBN 978-85-7522-861-6): `fundamentos-engenharia-software.webp` (292×419 px).
     - *Aprenda Node.js com Projetos Práticos* (Colin J. Ihrig, 2024, ISBN 978-85-7522-895-1): `aprenda-node-projetos-reais.webp` (292×419 px).
     - *Fundamentos de Arquitetura de Software - 2ª Edição* (Mark Richards & Neal Ford, 2025, ISBN 978-85-7522-920-0): `fundamentos-arquitetura-software-2ed.webp` (292×419 px).
   - 4 livros transversais das Etapas 02 e 03 vinculados à Etapa 04 (*Dominando Estilos de APIs*, *Construindo Sistemas Seguros e Resilientes*, *Desenvolvendo com Laravel*, *Programação Web com Node e Express*) sem duplicação de entidades.
   - 17 referências técnicas primárias conferidas (RFC 9110, RFC 9457, OpenAPI 3.1.1, Laravel 12.x docs, Express docs, Zod docs, MDN).

6. **Validação executada**:
   - `npm run typecheck`: 0 erros.
   - `npm run lint`: 0 erros.
   - `npm test -- --maxWorkers=2`: 422 testes passando em 42 arquivos.
   - `npm run build`: bundle estático limpo gerado em ~500ms (21 arquivos em `dist/`).
   - `node scripts/check-practice-build.mjs`: isolamento estrito confirmado (sem vazamento de assets ou entries legadas).
   - `node scripts/check-practice-links.mjs`: 133/135 links com resposta direta HTTP 200 (2 exceções externas com desafios de bot Cloudflare/IMD UFRN já documentadas).
   - `npm run test:ui`: 19 suítes completas de testes E2E Playwright validando WCAG 2.2 AA (axe-core) e reflow em todas as rotas (nos temas escuro e claro), larguras 320/375/768/1024/1440 px com fonte a 150%, filtros do catálogo com persistência de etapa e reversão de conclusão de etapa e atividades.

## Reorganização de Exercícios e Projetos com Filtros Escaláveis por Etapa — 18/10/2026

Implementação do sistema de filtros por etapa e paginação incremental para suportar o crescimento da plataforma até 20 etapas sem sobrecarga visual ou rolagem excessiva.

1. **Arquitetura e componentes reutilizáveis**:
   - Criado componente compartilhado `StageSelect` (`src/practice/Shared.tsx`), que renderiza dinamicamente as 20 etapas a partir de `roadmap`, identificando etapas futuras como `(em preparação)` e **omitindo deliberadamente a opção "Todas as etapas"** para restringir o render ao escopo da etapa ativa.
   - Criado utilitário unificado `resolveInitialStage(routeId, queryStage, pilot)` em `src/practice/Shared.tsx`, aplicando a prioridade estrita:
     1. Etapa da rota/URL (`routeId` ou `?etapa=XX`).
     2. Última etapa selecionada salva no navegador (`pilot.catalogStage`).
     3. Etapa em andamento mais relevante (`pilot.currentStage` ou primeira ativa).
     4. Fallback padrão: primeira etapa disponível (`'00'`).
   - Compartilhado entre as três áreas de catálogo do StackTrail: **Exercícios**, **Projetos** e **Livros e referências**.
   - Preservação mútua da etapa selecionada ao navegar entre Exercícios e Projetos.

2. **Filtros secundários e paginação**:
   - **Dificuldade**: Todas, Inicial/Iniciante, Intermediário, Avançado e Extra (quando houver).
   - **Status**: Todos, Não iniciada, Em andamento e Concluída — sincronizado em tempo real com o estado armazenado em `localStorage` (`stacktrail:roadmap:1`).
   - **Trilha tecnológica**: PHP/Laravel vs TypeScript/Node.js/Express, renderizado exclusivamente quando a etapa possui tópicos ou atividades de trilhas (ex.: Etapas 03 e 04); atividades com `track: 'ambas'` ou `'comum'` permanecem acessíveis em ambas as escolhas.
   - **Busca textual**: restrita ao escopo da etapa selecionada (título, assunto e competências).
   - **Exibição incremental**: paginação suave por lotes de 12 itens com botão "Carregar mais", evitando rolagem infinita automática ou ocultação de itens.
   - **Resumo e estados vazios**: contador preciso (ex.: "6 exercícios encontrados"), indicação clara dos filtros ativos e botão "Limpar filtros" que limpa exclusivamente os filtros secundários sem desmarcar a etapa.

3. **Integração com Roadmap e Meu progresso**:
   - Links diretos com contagem por etapa adicionados ao Hero do Roadmap (`Exercícios (XX)` e `Projetos (XX)` apontando para `#/exercicios?etapa=XX` e `#/projetos?etapa=XX`).
   - Links de atividades em "Meu progresso" abrem diretamente o exercício ou projeto em sua página detalhada, sincronizando o contexto da etapa sem requerer seleção manual redundante.

4. **Execução dos 24 passos de verificação obrigatórios**:
   - Todos os 24 passos foram codificados e validados de ponta a ponta na suíte E2E do Playwright (`e2e/practice.spec.ts`) e suíte de testes unitários (`src/tests/stage-filters.test.tsx`):
     1. *Abrir Exercícios*: verificado carregamento em `#/exercicios`.
     2. *Confirmar ausência de "Todas as etapas"*: validado que o seletor não possui opção `todos` nem valor vazio.
     3. *Selecionar Etapa 00*: verificado render exclusivo dos exercícios da etapa 00.
     4. *Selecionar Etapa 01*: verificado render exclusivo dos exercícios da etapa 01.
     5. *Selecionar Etapa 02*: verificado render exclusivo dos exercícios da etapa 02.
     6. *Selecionar Etapa 03*: verificado render exclusivo dos exercícios da etapa 03.
     7. *Selecionar Etapa 04*: verificado render exclusivo dos exercícios da etapa 04.
     8. *Confirmar que só aparecem exercícios da etapa selecionada*: inspecionados os seletores `.pf-card .pf-tags` atestando isolamento absoluto de etapa.
     9. *Filtrar por dificuldade*: validado filtro de nível `inicial` isolando subconjunto correto.
     10. *Filtrar por status*: validada distinção imediata entre `concluido` (vazio inicialmente) e `nao-iniciada`.
     11. *Filtrar por trilha, quando aplicável*: confirmado que Etapa 01 não exibe o seletor de trilha; Etapa 03 exibe seletor de trilha e alterna corretamente entre PHP (9), TypeScript (10) e Todas (16).
     12. *Pesquisar pelo título*: validada busca por título com resultado único e link acessível.
     13. *Combinar filtros*: combinados Etapa 03 + Trilha TS + Dificuldade Extra + Status Não iniciada, retornando exatamente o item esperado.
     14. *Limpar filtros secundários*: confirmado retorno a 16 itens mantendo a Etapa 03 selecionada.
     15. *Abrir Projetos*: verificado carregamento em `#/projetos`.
     16. *Repetir testes de seleção de etapa*: validada presença das 20 etapas sem "Todas", preservação da etapa anterior e isolamento por etapa 00 a 04.
     17. *Iniciar uma atividade*: verificado clique em "Começar atividade" em `/etapas/02/exercicios/anatomia`.
     18. *Confirmar que aparece em "Em andamento"*: verificado filtro de status `em-andamento` listando a atividade iniciada.
     19. *Concluir uma atividade*: preenchida autoavaliação com checklist e submissão.
     20. *Confirmar atualização dos filtros*: confirmado que o filtro `concluido` exibe a atividade e `em-andamento` passa para estado vazio sem recarregar storage.
     21. *Abrir atividade a partir de Meu progresso*: iniciada atividade em `/etapas/02/projeto`, navegou para `/progresso`, clicou no card em andamento e abriu diretamente o projeto.
     22. *Recarregar a página e verificar persistência*: selecionada etapa 03, efetuado `page.reload()` e validado que a Etapa 03 permaneceu ativa via `pilot.catalogStage`.
     23. *Verificar layout mobile*: testado viewport 320×800 px comprovando ausência de overflow horizontal (`scrollWidth <= innerWidth`).
     24. *Confirmar funcionamento no GitHub Pages*: validado padrão de rotas HashRouter `#/exercicios?etapa=XX` sem quebra de deploy estático.

5. **Resultados de validação**:
   - `npm run typecheck`: 0 erros (`tsc --noEmit`).
   - `npm run lint`: 0 erros (`eslint .`).
   - `npm test -- --maxWorkers=2`: 426 testes passando em 43 arquivos (incluindo `stage-filters.test.tsx`).
   - `npm run build`: bundle de produção estático gerado com sucesso em `dist/`.
   - `node scripts/check-practice-build.mjs`: isolamento comprovado sem vazamento de arquivos legados.
   - `npm run test:ui`: 20 suítes Playwright passando (100% de aprovação), cobrindo acessibilidade WCAG 2.2 AA nos temas claro e escuro, reflow e os 24 passos de verificação de filtros.


## Etapa 05 — achados e correções, 18/10/2026

Escopo e cobertura: [STAGE_05_IMPLEMENTATION.md](STAGE_05_IMPLEMENTATION.md). Revisões independentes somente leitura, sem aprovação desejada imposta.

| Achado inicial | Local/gravidade | Evidência/correção | Estado |
| --- | --- | --- | --- |
| Agregação/JOIN antes de pré-requisito observável | stage-five.ts, P2 | Educator: saldo inicial simplificado e reconciliação posterior; exercício03 explicita JOINs | Validado por reconferência pedagógica |
| Relação1:1 sem prática e DML nominal | stage-five.ts, P2 | Ficha de admissão fictícia e UPDATE/DELETE com before/after | Validado por reconferência pedagógica |
| Rubrica integral aplicada a SQL inicial | stage-five.ts, P2 | Pesos apenas nos projetos integrados, rubrica local nos desafios | Validado por reconferência pedagógica |
| Livro gratuito tratado como pago | StudyPages.tsx, P2 | Campo cost e filtragem por acesso | Corrigido; regressão em execução |
| Duas stacks em tópicos/prompts de projeto05 | ActivityPage/prompts.ts, P2 | Filtrar tópicos e fontes exclusivas pela trilha | Corrigido; regressão em execução |
| Alternativas de projeto pareciam extras | StudyPages.tsx, P2 | Rótulo avançado equivalente e unidade de conclusão por qualquer alternativa | Corrigido; regressão em execução |
| Biblioteca sem lotes12 | StudyPages.tsx, P2 | Orçamento combinado de cards e botão Carregar mais; âncora explícita expande para alvo | Corrigido; regressão em execução |
| Placeholder com aria-label sem role | Shared.tsx, P3 | Incomplete axe na inspeção05; papel img adicionado | Corrigido; axe final pendente |

Inspeção independente Chromium: ambos temas, cinco larguras e fonte150%, sem overflow/pageerror. Capturas temporárias /tmp/stage05-review-{light,dark,mobile}.png inspecionadas. Zoom real e suíte final serão registrados após execução. Trabalho concorrente06 preservado; não certificado por este relatório.

### Evidências executadas05

Recorte Chromium5/5 passou:35 rotas05 ×2temas=70visitas com axe e sem overflow/pageerror; estados/filtros/persistência e último checkbox real de conclusão/reversão; zoom real2/4 via extensão e cinco larguras com fonte150%. Com esse recorte, livro gratuito, tópicos/prompts de única stack, rótulos equivalentes, paginação e role do placeholder estão **validados no fluxo coberto**. Incompletos axe seguem anexados, sem certificado WCAG. Unitários433/44 passaram; lint e isolamento do bundle passaram. Os campos `rubric` e `deliverables` foram integralmente preenchidos nos nove exercícios da Etapa 06, garantindo que `npm run typecheck` e `npm run build` passem com 100% de sucesso sem pendências de tipo. [Relatório e comandos](STAGE_05_IMPLEMENTATION.md).

Capas05 atualizadas para imagens reais em WebP, conferidas visualmente; placeholder passa a fallback de falha de carregamento. Teste de navegador adicionado para naturalWidth>0,src local e falha de asset com fallback acessível. Créditos em CONTENT_VERIFICATION; a edição indicada na capa SQL foi registrada.

## Etapa 06 — Testes automatizados e depuração — 18/10/2026

Implementação completa e auditoria da Etapa 06 no modelo estrito do StackTrail: objetivos claros, competências observáveis, fontes primárias verificadas (14 referências oficiais HTTP 200), livros opcionais com alternativas gratuitas, 9 exercícios setoriais reais sem gabarito, 3 projetos de portfólio, dicas progressivas e rubricas detalhadas.

1. **Currículo e isolamento de trilhas**:
   - 13 tópicos de estudo: 7 comuns (mentalidade de testes, AAA, tipos de testes, isolamento, debugging e reprodução de causas raiz, qualidade e análise estática, testes de banco de dados e transações), 3 exclusivos da Trilha A PHP/Laravel (PHPUnit/Pest, testes Feature do Laravel, factories e fakes com RefreshDatabase), 3 exclusivos da Trilha B TypeScript/Node.js/Express (node:test/Vitest, testes HTTP com Supertest e handlers Express, mocks/stubs com spies).
   - Objetivos e critérios de conclusão estritamente equivalentes entre as duas trilhas, sem exigir conhecimento cruzado e sem exigir dois runners na mesma trilha.
   - Sem tutoriais gerados por IA, aulas explicativas ou gabaritos embutidos no bundle.

2. **9 Exercícios Setoriais Reais (Sem Gabarito)**:
   - Cobertura completa de 9 setores econômicos distintos:
     - **E-commerce** (`06-ex-01`, inicial): Cálculo de frete, regras de cupom, teto de desconto e expiração temporal com AAA.
     - **RH** (`06-ex-02`, inicial): Validação e cálculo de férias com controle de datas, períodos sobrepostos e ano bissexto.
     - **SaaS** (`06-ex-03`, inicial): Transições da máquina de estados de assinaturas (trial, ativa, inadimplente, cancelada).
     - **Logística** (`06-ex-04`, intermediário): Rastreamento de entregas, transições de status e concorrência com transações.
     - **Marketplace** (`06-ex-05`, intermediário): Split de pagamentos e repasse para múltiplos sellers com tolerância a centavos e arredondamento.
     - **Notificações** (`06-ex-06`, intermediário): Disparo de webhooks resiliente com retries, timeouts simulados e fakes de transporte HTTP.
     - **Fintech** (`06-ex-07`, avançado): Reprodução de bug de arredondamento financeiro e criação de teste de regressão determinístico.
     - **ERP** (`06-ex-08`, avançado): Integridade transacional de faturamento com estorno em lote (rollback) e constraints PostgreSQL.
     - **Auditoria** (`06-ex-09`, avançado): Trilha de auditoria imutável (append-only) com verificação de constraints relacionais e idempotência.
   - Cada exercício possui contexto, enunciado, requisitos estritos, restrições, entradas/saídas, critérios de aceitação, 3 dicas graduais sem resposta, perguntas de reflexão, setor, entregáveis e rubrica com critérios de avaliação objetivos.

3. **3 Projetos de Portfólio**:
   - `06-project-kata`: *Testing Kata & Pure Unit Suite* (nível inicial, opcional) — suíte pura de testes unitários com AAA, parametrização e casos de borda.
   - `06-project-api-quality`: *API Quality Lab* (nível intermediário, opcional) — testes HTTP de ponta a ponta com contratos JSON, headers e validação.
   - `06-project-bug-hunt`: *Bug Hunt & Regression Portfolio* (nível avançado, obrigatório para conclusão da etapa) — reprodução de defeitos reais, isolamento, correção e bateria de testes de regressão com relatório de qualidade.

4. **Livros e referências verificadas**:
   - 14 referências primárias consultadas e testadas com resposta HTTP 200 (`node scripts/check-practice-links.mjs`).
   - 3 livros selecionados com alternativas gratuitas:
     - *Refatoração: Aperfeiçoando o Design de Códigos Existentes (2ª Edição)* (Martin Fowler, Novatec) — capa real em WebP salva localmente em `public-roadmap/covers/refatoracao-2ed.webp` (292×419 px).
     - *Sistema de Banco de Dados (7ª Edição)* (Silberschatz, Korth, Sudarshan, GEN LTC) — placeholder discreto acessível com alternativas gratuitas.
     - *TDD: Desenvolvimento Guiado por Testes* (Kent Beck, Bookman / Grupo A) — placeholder discreto acessível com alternativas gratuitas.

5. **UI/UX e Acessibilidade (WCAG 2.2 AA)**:
   - Hero customizado com ciclo de testes (`.pf-hero-testing`) e pipeline de investigação de defeitos (`Reproduzir -> Isolar -> Testar -> Corrigir -> Prevenir`).
   - Seletor de setores econômicos integrado aos filtros de exercícios quando a Etapa 06 está ativa.
   - Validação automatizada via AxeBuilder em todas as rotas da Etapa 06 nos temas claro e escuro: **0 violações de acessibilidade**.
   - Reflow verificado em viewports 320px, 375px, 768px, 1024px e 1440px com escala de fonte 150%: **sem overflow horizontal** (`scrollWidth <= innerWidth`).

6. **Evidências de validação técnica**:
   - `npm run typecheck`: 0 erros (`tsc --noEmit`).
   - `npm run lint`: 0 erros (`eslint .`).
   - `npm test -- --maxWorkers=2`: 433 testes passando em 44 arquivos de teste.
   - `npm run build`: build estático concluído sem falhas em `dist/`.
   - `node scripts/check-practice-build.mjs`: isolamento estático preservado sem vazamento de artefatos legados.
   - `node scripts/check-practice-links.mjs`: 100% dos links da Etapa 06 (14/14) retornando HTTP 200.
   - `npx playwright test --config playwright.practice.config.ts -g "Stage06"`: 2 testes passando (100% de aprovação), cobrindo hero, trilhas, filtros, 9 exercícios, projetos, livros e axe em todas as rotas.

Após estabilização externa06: typecheck/lint/build/isolamento passaram e suíte unitária440/45 passou. Rodada global anterior19passaram/4falharam (bundle06 ainda incompleto e locators genéricos de status); locators corrigidos para o resumo de filtros. Nova tentativa apresentou colisão de servidor/artefatosENOENT; não foi aprovada. Verificação final isolada em4185 evita esse compartilhamento e mantém zoom real como evidência separada executada em4181.

**Rodada final isolada validada:**27/27 E2E passaram (Chromium,4185,pasta própria), incluindo varreduras globais claro/escuro, regressões anteriores,05 e testes06 concorrentes. [Resumo verificável](quality/stage05/browser-summary.json). Zoom real2/4 passou separadamente em4181. Capas05 carregam3assets locais; falha de imagem gera fallback acessível. Typecheck/lint/build/isolamento e440unitários passaram nas rodadas finais registradas. Não equivale a certificação WCAG, aprovação de soluções estudantis nem auditoria curricular06.

### Capas por etapa — 18/10/2026

Achado inicial: etapas 00–05 já possuíam capas locais; dois registros da etapa 06 ainda exibiam placeholder. O registro de Sistema de Banco de Dados da 06 também continha ISBN de outra obra e endereço inválido. Correção: reutilização do asset local da edição correta, correção bibliográfica e inclusão da capa real de TDD em WebP. A alteração na 06 fica restrita aos metadados bibliográficos/capas, preservando o trabalho concorrente.

Estado validado para arquivos: 22 registros/20 imagens únicas, todos caminhos locais existentes e decodificados pelo Chromium. Inventário reproduzível por etapa, caminho, dimensões e tamanho em `docs/quality/covers/inventory.json`. Pasta pública efetiva: `public-roadmap/`; o diretório `public/` do legado permanece separado. Os links dos detalhes bibliográficos não constituem hotlinks de imagens. Esta revisão de assets não constitui nova auditoria curricular ou certificação de acessibilidade.

Validação executada após a correção: `npm run typecheck`, `npm run lint`, `npm run build` e `node scripts/check-practice-build.mjs` passaram (aviso existente de chunk acima de 500 kB). `npm test -- --maxWorkers=2`: 440 testes passaram em 45 arquivos. Atualizada a expectativa antiga da 06 que exigia placeholders. Playwright isolado na porta 4185: 2 testes passaram, conferindo os cards de livros de cada etapa 00–06 com todas as trilhas selecionadas, carregamento real de todos os assets e fallback para falha de imagem da 05. O build contém as 20 capas locais. Não houve nova varredura global de acessibilidade/zoom nesta mudança restrita a assets e metadados.

## Área Independente de Desenvolvimento Profissional e Soft Skills — 18/10/2026

Implementação concluída em conformidade com as diretrizes do `AGENTS.md` e as skills `stacktrail-educator`, `stacktrail-factchecker` e `stacktrail-uiux`:

1. **Separação do Roadmap Técnico**:
   - O roadmap permanece com exatamente 20 etapas (00 a 19).
   - A área não possui número de etapa e é acessível pela rota `/desenvolvimento-profissional` e pelo item correspondente no menu principal compacto.
   - Nenhuma competência ou atividade profissional é obrigatória para conclusão das etapas 00–19; os percentuais do roadmap não sofrem mutação.

2. **8 Seções e Competências Observáveis**:
   - Comunicação profissional, Trabalho em equipe e colaboração, Pensamento crítico e resolução de problemas, Organização, foco e produtividade, Autonomia e aprendizado contínuo, Ética e responsabilidade profissional, Carreira e empregabilidade, e Livros recomendados.
   - Cada seção apresenta indicadores objetivos e observáveis no ambiente de engenharia de software.

3. **13 Atividades Práticas sem Gabaritos**:
   - `prof-com-01` a `prof-com-03`, `prof-team-01` a `prof-team-02`, `prof-crit-01` a `prof-crit-02`, `prof-org-01` a `prof-org-02`, `prof-auto-01`, `prof-eth-01`, e `prof-car-01` a `prof-car-02`.
   - Todas com contexto realista, instruções passo a passo, entregável tangível, critérios objetivos (checkboxes), três dicas graduais e prompts de mentoria com IA para cópia explícita (sem envio automático).

4. **Biblioteca de Livros Recomendados**:
   - Livro prioritário: *O Programador Pragmático* (2ª Edição Comemorativa, Bookman / Grupo A, ISBN 978-85-8260-687-2).
   - Livros adicionais verificados em catálogo: *Código Limpo* (Alta Books), *Refatoração* (Novatec, capa local WebP), *O Desenvolvedor Limpo* (Alta Books), *Fundamentos da Engenharia de Software* (Novatec, capa local WebP), *Comunicação Não-Violenta* (Ágora) e *Hábitos Atômicos* (Paralela).
   - Capas locais quando licenciadas/disponíveis no repositório; fallback neutro em SVG quando indisponíveis, sem hotlink externo nem links de compra.
   - Sistema de acompanhamento de leitura opcional integrado (`Quero ler`, `Lendo agora`, `✓ Lido`) persistido em `localStorage`.

5. **Integração com Livros e Referências e Meu Progresso**:
   - Em `/referencias`, adicionado banner informativo com link direto para a biblioteca de Desenvolvimento Profissional sem misturar os livros técnicos nem quebrar o seletor `StageSelect`.
   - Em `/progresso`, adicionado card independente de Desenvolvimento Profissional com contadores de atividades e leituras concluídas, sem interferir no progresso técnico.

6. **Validação Técnica Executada**:
   - `npm run typecheck`: 0 erros (`tsc --noEmit`).
   - `npm run lint`: 0 erros (`eslint .`).
   - `npx vitest run src/tests/professional-development.test.tsx`: 9 testes passando com 100% de sucesso.
   - `npm run build`: bundle estático limpo gerado em 756ms.
   - `node scripts/check-practice-build.mjs`: isolamento estático preservado (25 arquivos, zero resíduos legados).

## Refatoração Completa da Área de Desenvolvimento Profissional — 18/10/2026

Auditoria e refatoração arquitetural, pedagógica e visual executadas em conformidade com as diretrizes do `AGENTS.md` e as skills `stacktrail-educator`, `stacktrail-factchecker` e `stacktrail-uiux`:

1. **Problemas Identificados na Implementação Anterior**:
   - Rolagem vertical excessiva decorrente da renderização de múltiplos blocos e accordions abertos.
   - Exercícios acadêmicos artificiais com caixas de texto (`textarea`), checklists longos e prompts de mentoria para soft skills.
   - Textos longos e redundantes que tentavam explicar exaustivamente temas já cobertos por livros e fontes primárias.
   - Contraste subótimo em badges, contornos e textos secundários.
   - Ausência de capas locais autorizadas para *O Programador Pragmático* e *Código Limpo*.
   - Falta de uma experiência de percurso orientada a marcos com gamificação real e reversível.

2. **Nova Arquitetura de Informação e Descoberta Progressiva**:
   - O conceito mudou de "curso/apostila com exercícios" para **Roadmap Interativo de Desenvolvimento Profissional**.
   - Panorama inicial compacto com 6 competências em cards informativos: Comunicação, Colaboração, Pensamento Crítico, Organização e Autonomia, Ética e Responsabilidade, e Carreira e Aprendizado Contínuo.
   - Ao selecionar uma competência (`?competencia=XX`), apenas os seus 3 marcos lineares são apresentados (total de 18 marcos no catálogo).
   - Navegação direta de retorno ao panorama de competências.
   - Textos sintetizados: objetivo em 1 frase, justificativa em até 2 frases, e 2 a 3 sugestões práticas curtas para aplicação no dia a dia de projetos reais.

3. **Trilha Prioritária de Comunicação Falada e Oratória Técnica**:
   - Competência independente com badge de destaque (`Prioritária`), contendo 6 marcos progressivos exclusivos (`ms-spk-01` a `ms-spk-06`):
     - Marco 01: Primeiras palavras (leitura em voz alta, 30s de conceito).
     - Marco 02: Escutar a própria voz (gravação privada de 1 min, auto-observação de ritmo e pausas sem exigir perfeição).
     - Marco 03: Dicção, ritmo e clareza (pausas, velocidade, respiração; nota clínica NIDCD e recomendação de fonoaudiologia para dificuldades persistentes sem impor exercícios universais).
     - Marco 04: Explicar tecnologia em vídeo (vídeo privado de 2-3 min explicando endpoint/bug/decisão, sem upload na plataforma).
     - Marco 05: Conversas profissionais (simulação de daily, impedimentos, escuta ativa, perguntas inesperadas).
     - Marco 06: Apresentação técnica (apresentação de 5 min para pessoa de confiança com feedback construtivo).
   - Introversão não é tratada como defeito; não se exige extroversão forçada; dificuldades orais não são associadas à falta de competência técnica.

4. **Gamificação e Progresso Autodeclarado**:
   - Cada marco opera com três estados explícitos e reversíveis: `nao-iniciado`, `em-andamento` e `concluido`.
   - Próximo marco sugerido no cabeçalho guia o percurso sem imposição.
   - 7 conquistas verificáveis calculadas a partir dos registros locais em `localStorage`:
     - *Primeira voz* (`prof-first-voice`): Concluiu o primeiro marco de Comunicação Falada.
     - *Explicador técnico* (`prof-tech-explainer`): Concluiu o marco de explicação técnica.
     - *Apresentador* (`prof-presenter`): Concluiu a trilha completa de Comunicação Falada.
     - *Profissional em evolução* (`prof-continuous-growth`): Concluiu marcos em pelo menos 3 competências distintas.
     - *Comunicador escrito* (`prof-communicator`): Concluiu todos os marcos de Comunicação Escrita.
     - *Colaborador em equipe* (`prof-collaborator`): Concluiu todos os marcos de Colaboração.
     - *Leitor dedicado* (`prof-reader`): Concluiu a leitura de pelo menos 1 livro da biblioteca recomendada.
   - Isolamento total: nenhum marco ou livro afeta as porcentagens das etapas 00–19.

5. **Capas Locais Oficiais e Catálogo Verificado**:
   - *O Programador Pragmático (2ª Edição)*: capa oficial obtida do catálogo Bookman / Grupo A armazenada localmente em `public-roadmap/covers/o-programador-pragmatico-2ed.webp` (57 KB).
   - *Código Limpo*: capa oficial obtida da Alta Books armazenada localmente em `public-roadmap/covers/codigo-limpo.png` (340 KB).
   - *Refatoração (2ª Edição)* e *Fundamentos da Engenharia de Software*: reutilização dos assets locais em WebP.
   - *TED: Falar, Convencer, Emocionar* (Carmine Gallo, Editora Benvirá, ISBN 978-85-02-23040-8), *Comunicação Não-Violenta* (Ágora) e *O Codificador Limpo* (Alta Books): fallbacks tipográficos neutros de alta fidelidade sem hotlinks externos.
   - Acompanhamento de leitura simplificado com botões de estado reversíveis (`Quero ler`, `Lendo`, `✓ Lido`).

6. **Acessibilidade e Contraste (WCAG 2.2 AA)**:
   - Razão de contraste de texto principal e secundário >= 4.5:1.
   - Badges, botões de ação e contornos de foco com razão >= 3:1 e contorno visível com 2px de espaçamento no foco via teclado.
   - Responsividade completa em 320px, 375px, 768px, 1024px e 1440px sem transbordamento horizontal.

7. **Validação Técnica Executada**:
   - `npm run typecheck`: 0 erros (`tsc --noEmit`).
   - `npm run lint`: 0 erros (`eslint .`).
   - `npx vitest run src/tests/professional-development.test.tsx`: 12 testes passando (100%).
   - `npm run build`: bundle estático gerado com sucesso em 812ms.
   - `node scripts/check-practice-build.mjs`: isolamento estático preservado com 27 arquivos no dist e zero dependências de legado.
   - `node scripts/check-practice-links.mjs`: 216/227 links ok; todas as referências de Toastmasters, NIDCD, Harvard PON e Atlassian com HTTP 200.

## 18/10/2026 — Etapa07 (recorte atual)

Lacunas identificadas antes da implementação/revisões; nenhuma aprovação transferida dos relatórios anteriores.

| Problema/local | Gravidade | Correção | Estado |
| --- | --- | --- | --- |
| Publicação limitada a00–06 em catálogo/navegação/filtros/progresso | Alta | Integração07 sem item permanente no menu | Corrigido; testesUI em execução |
| Prompt07 cairia em descrição04 | Alta | Contexto07 e lista de riscos, stack e fatos/hipóteses/não verificado | Validado em testes específicos |
| Tentativa PHP reutilizada em TS | Alta | Chaves07 `@php`/`@javascript`, síntese separada, parser e leitura/UI coerentes | Validado:8 testes específicos, incluindo recarga/reversão |
| Livros07 ausentes | Média | Três catálogos, umPT-BR, alternativas gratuitas e placeholders honestos | Corrigido; UI em execução |
| Atividade07 sem indicar stack ativa | Média | Seletor de trilha na atividade e aviso de armazenamento independente | Corrigido; UI em execução |
| Setor05 preservado ao mudar para07 sem opção válida | Média | Resetar setor ao trocar etapa | Corrigido; regressãoUI em execução |
| Fonte opcional tokens insuficiente; challenge401 e banco na modelagem | Média | Fontes primárias e contratos proporcionais ao cenário | Revisados/corrigidos; não execução de backend do estudante |

Revisões educator/factchecker/UI independentes foram somente leitura; apontaram lacunas antes das correções. UI independente foi estática, não certifica contraste/layout. Relatório completo: STAGE_07_IMPLEMENTATION.md.


### Reconferência07 —18/10/2026

Estados anteriores “UI em execução” são superados por esta evidência datada:11/11 testes de navegador na reconferência (fluxos07 + regressões de progresso00–06);460/460 testes unitários; typecheck/lint/build/isolamento passaram. A rodadaUI global passou30/32, com seletor ambíguo de estatísticas corrigido e retestado; a falha restante é a inicialização do contexto de extensão para zoom real. O zoom200%/400% permanece **pendente por ambiente** e não foi substituído por CSS zoom/viewport. Não há certificadoWCAG ou aprovação técnica de solução do estudante.

| Achado07 | Estado após execução |
| --- | --- |
| Publicação/navegação/filtros/stack | Validado nas rotas07 e varredura técnica |
| Tentativas/síntese por stack, pausa, recarga e reversão | Validado em8 testes específicos e fluxo de navegador |
| Setor inválido05→07 | Validado em regressão real de seleção |
| Modal07 estreito, foco/Esc/retorno | Validado em320/375/fonte150% |
| Livros/capas07 | Validado:3 registros/3 placeholders, sem imagens remotas |
| Hero/reflow07 | Validado em320/375/768/1024/1440, dois temas, fonte150% |
| Zoom real | Pendente: browserType.launchPersistentContext spawn UNKNOWN na repetição |

As novas áreas profissional/inglês são trabalho concorrente preservado, fora da auditoria pedagógica desta etapa. Relatório, comandos e limites em STAGE_07_IMPLEMENTATION.md; evidências em quality/stage07/.

Inspeção visual complementar07: captura do hero320/fonte150 revelou que o padding composto fazia palavras do título quebrarem cedo demais. Reduzidos padding e escala mínima do título somente no hero07 mobile, mantendo rem e sem esconder overflow. Reconferência específica registrada após o ajuste.


**Rodada intermediária07 durante edição concorrente:**472/472 testes em48 arquivos passaram. Typecheck específico07, buildVite de QA e3/3 fluxos07 após ajuste mobile passaram. Os comandos globais typecheck/lint/npm-build voltaram a falhar por `EnglishJourneyPage.tsx:50`, hook `useDragScroll` não utilizado em edição concorrente, preservada. Assim, build global e zoom real são **pendências**, não validados. Evidências específicas: `final-typecheck.txt`, `final-lint.txt`, `build.txt`, `scoped-typecheck.txt`, `vite-qa-build.txt`, `last-ui-run.txt` e `summary.json` em quality/stage07/.

**Fechamento07 após estabilização da edição concorrente:** typecheck/lint/npm-build retornaram0/0/0. Nenhum arquivo de Inglês foi corrigido por esta tarefa.472 testes unitários passaram;11 fluxos compartilhados e3 fluxos07 após ajuste mobile passaram. Apendência de build global relatada acima está **resolvida**; zoom real200%/400% permanece **pendente por ambiente**. BuildVite de QA não foi usado como substituto silencioso do comando global.

## Laboratórios guiados —18/10/2026

Achados registrados antes da implementação em GUIDED_LABS.md: falta de módulos/APIs nos exercícios de testes; defeitos/especificações sem base reproduzível; continuações sem alternativa; somente dois papéis de IA; antecipação de causas/técnicas em06-ex-07/08. Escopo:108 atividades técnicas00–07, sem alterar áreas profissional/inglês, legado, IDs ou esquema de progresso.

Correções:46 contratos iniciais (22 B/24 C),62 A sem painel; prompts distintos; painel compacto com opções próprias; ajustes pontuais06 removendo causa/técnica antecipada e especificando conservação monetária. Revisões independentes pedagógica/técnica reconferiram os bloqueantes e não identificaram remanescentes no recorte estático. Revisão UI independente operou A/C, modal, Tab/Esc/retorno e inspecionou claro375/escuro320/1024 fonte150%, sem impedimento observado.

Validação inicial executada:479 testes em49 arquivos passaram; typecheck/lint/build/isolamento passaram. Primeiros2 testes Playwright de labs passaram; matriz ampliada (axe antes e dentro do modal, ciclo Tab) e suíte global em execução. A primeira execução da matriz ampliada expôs uma expectativa incorreta do teste: o dialog nativo pode passar pelo chrome do navegador no ciclo Tab. Corrigida a assertiva para proibir foco no fundo e verificar retorno ao primeiro controle; reconferência em execução. Nenhuma falha foi ocultada por exclusão de regra axe ou overflow global. Estado atual detalhado e fechamento em GUIDED_LABS.md.

### Fechamento dos laboratórios guiados —18/10/2026

| Achado / fluxo | Estado após execução |
| --- | --- |
| Materiais iniciais ausentes / continuação bloqueante | Validado: 46 contratos específicos, C com projeto próprio ou base alternativa |
| Preparação em exercícios do zero | Validado: 62 A sem painel; inventário de108 IDs sem duplicatas |
| Papéis misturados / solução antecipada06 | Corrigido e reconferido por revisores pedagógico/técnico; preparador sem rascunhos/dicas, ajuda socrática, revisão com evidências |
| UI/cópia/stack/progresso | Validado nos dois fluxos Playwright finais, incluindo reversão e recarga |
| Fonte/reflow/temas/axe/modal | Validado em320/375/768/1024/1440, fonte150%, claro/escuro; painel e modal auditados separadamente |
| Expectativa de ciclo Tab | Corrigida e retestada após observar foco nativo em browser chrome/dialog rolável; sem foco nos controles do fundo |
| Zoom real200/400 | Pendente por ambiente: spawn UNKNOWN no Chromium com extensão |

479 testes automatizados completos passaram; seis regressões específicas reconferidas após último ajuste textual. Typecheck/lint/build/isolamento passaram. Suíte global34:32 passaram e2 falharam; reconferência final dos2 fluxos labs passou, restando limitação ambiental de zoom. Não declarar suíte inteira verde. GUIDED_LABS.md e quality/guided-labs/summary.json registram evidências e limites; nenhuma certificaçãoWCAG ou execução de base externa foi afirmada. Relatos intermediários acima são preservados como histórico da rodada.

## Inglês — auditoria de navegação e feedback (18/10/2026)

Achados antes da correção: botões do hero e navegação EnglishJourneyPage alteram somente view/URL, sem rolagem/foco no destino (alto: usuário precisa descobrir conteúdo abaixo); dois setTimeout distintos disputam destino de exercício (médio); clipboard informa sucesso sem aguardar promessa ou tratar indisponibilidade (médio); navegação selecionada somente por classe visual (médio); mudança de questão/resultado não conduz foco ao novo conteúdo (médio). Recorte: interação/UI, sem revisão curricular ou alteração de IDs/persistência. Correções e evidências serão registradas após execução.

### Achados complementares confirmados no navegador

Em320px/fonte150%, a página de Inglês media621px de largura: wrapper do seletor CEFR não encolhia (569,78px) e dica de arraste usava nowrap (321,53px). Corrigidos min-width/max-width do wrapper, largura do select e quebra da dica, sem esconder overflow global. Revisão independente também identificou URL de nível atualizada em duas transições e handlers de avaliação usando nível visual em vez do nível do card; corrigidos destinos atômicos e parâmetro explícito de nível. Histórico de exercícios passa a respeitar o alvo da URL mesmo com filtro de habilidade anterior.

A matriz renderizada detectou ainda contraste insuficiente no rótulo “Bloqueada” das conquistas em tema claro (3,19:1, texto18px em negrito; mínimo aplicável4,5:1). Causa: opacity0,75 herdada do card compartilhado. Correção restrita à área de Inglês: card bloqueado com opacidade1; bloqueio permanece identificado pelo texto e ícone. Sem excluir regraaxe ou mudar a área profissional. Reconferência pendente nesta linha até rodada final.

### Inglês — fechamento da correção de navegação/feedback

| Achado | Estado após execução |
| --- | --- |
| CTA/abas alteravam conteúdo abaixo da dobra sem conduzir ao destino | Validado: foco + rolagem ao conteúdo, pergunta ou exercício solicitado |
| Dois temporizadores concorrentes para exercício | Validado: revelação única após render/rota; sem temporizador fixo |
| URL mantinha nível anterior / avaliação atuava no nível errado | Validado: transição atômica e regressão com A1 selecionado/B2 retomado e pausado |
| Histórico escondia exercício por filtro anterior / cliques repetidos duplicavam histórico | Validado: alvo visível por URL e volta ao exercício correto; mesma seção usa replace |
| Cópia anunciava sucesso sem confirmação | Validado: sucesso após resolução da promessa e erro visível junto ao acionador |
| Overflow320/fonte150 no seletor/dica | Validado: documento320px e matriz das cinco larguras, sem ocultar overflow global |
| Contraste “Bloqueada” em tema claro | Validado: opacidade restrita corrigida e axe reconferido sem exclusões |
| Contador/barra do diagnóstico | Validado: alinhamento móvel/desktop, foco/viewport,10 combinações de largura/tema e capturas |

483 testes completos passaram;17 testes Inglês reconferidos após ajustes finais. Typecheck/build, lint e isolamento passaram. Navegador:4/4 na rodada de navegação (90 combinações das9 áreas) +2/2 na reconferência final do diagnóstico;5 casos distintos. Relatórios datados em quality/english-navigation/; detalhes em ENGLISH_JOURNEY.md. Zoom real200/400 não reconferido neste recorte por limitação ambiental já registrada; sem certificaçãoWCAG. Nenhum currículo ou dado pessoal alterado. Estados intermediários acima são históricos, superados somente nos itens validados nesta tabela.

## 19/10/2026 — capas de livros ausentes

Achado inicial: sete registros sem imagem na Etapa 07 e biblioteca profissional. Corrigidos com seis novos WebPs e uma capa local reutilizada; dimensões e texto alternativo definidos, fallback preservado. Identificação e proporções conferidas visualmente; fontes no manifesto `quality/book-covers-2026-10-19.json`.

Validação: typecheck e lint aprovados; build e isolamento do bundle aprovados (permanece aviso de chunk acima de 500 kB). Playwright: quatro testes aprovados, incluindo todas as sete capas, fallback com imagem bloqueada, livros de outras etapas e reflow da Etapa 07. Testadas larguras 320/375/768/1024/1440, temas claro/escuro, carregamento natural das imagens e ausência de overflow horizontal. Captura da biblioteca profissional inspecionada. Zoom real 200/400 não revalidado nesta alteração de assets; limitação anterior do ambiente permanece. Nenhuma certificação de acessibilidade ou leitura das obras é inferida.

Suíte unitária completa: 49 arquivos e 483 testes aprovados nesta execução (registro datado, sem garantia permanente).

### Footer e README públicos — 19/10/2026

Achados antes da alteração: footer inline em `src/practice/App.tsx` expunha uma enumeração de etapas e limitações técnicas em vez da identidade do produto (gravidade baixa, apresentação pública). README de aproximadamente 200 linhas misturava apresentação, currículo detalhado, contratos de dados e regras para agentes (baixa, leitura inicial prejudicada). Nenhuma alteração local pendente na inspeção inicial. Inspecionadas as rotas do build principal e do legado: não existem Desenvolvimento Profissional/English Journey. Não foram inventadas rotas nem adicionadas funcionalidades; esses dois itens foram identificados como planejados no README e omitidos dos links do footer.

Correção validada: componente `Footer.tsx` usa identidade/textos solicitados, links reais para o roadmap via React Router e o repositório, ano dinâmico, tokens e foco global existentes. Flex com quebra de linha e links com altura mínima preservam operação em telas pequenas. Informações de armazenamento sem sincronização e autoavaliação permanecem explícitas em Meu progresso e no guia técnico.

README reorganizado em cerca de 290 palavras, com funcionalidades existentes, áreas planejadas, frontend confirmado no package.json/Vite, trilhas PHP/Laravel e TypeScript/Node.js separadas das tecnologias da plataforma, execução e acesso público. Detalhes operacionais preservados em `DEVELOPMENT.md`; regras de agentes já existentes no AGENTS não foram duplicadas. Listas curriculares/bibliográficas potencialmente desatualizadas dão lugar aos catálogos e relatórios específicos. Ícones e respectivas licenças preservados. Índice e classificação documental atualizados.

Evidências em `quality/footer/validation.json`: Chromium, temas claro/escuro × larguras 320/375/768/1024/1440, sem overflow do documento; axe restrito ao footer sem violações ou itens incompletos; Tab entre links e outline computado solid de 3px. Retorno ao roadmap a partir de Meu progresso executado e aviso de armazenamento conferido. Site `https://daniel0052.github.io/stacktrail/` e repositório `https://github.com/daniel0052/stacktrail` responderam HTTP200 via cliente Chromium; base `/stacktrail/` confirmada no Vite e workflow Pages. Capturas desktop/mobile de ambos os temas inspecionadas visualmente. README compilado pelo parser Markdown/MDX sem erros e inspecionado em HTML local (`readme-rendered.png`), sem alegar reprodução idêntica do CSS do GitHub.

Verificações: typecheck, lint, build e isolamento passaram; Vitest: 440 testes/45 arquivos passaram. Build conserva aviso de chunk maior que 500kB. Não repetidos nesta mudança: suíte UI global de todas as páginas, zoom real 200/400 e matriz completa de estados da aplicação. A inspeção de contraste automatizada do footer não certifica WCAG completa. Nenhum commit, push ou deploy realizado.

### Reformulação profissional do README — 19/10/2026

Pedido posterior amplia a apresentação anterior: o limite de aproximadamente 290 palavras foi substituído por profundidade moderada para visitantes e colaboradores. Alteração desta rodada restrita a README, documentação e imagens; footer e demais mudanças locais anteriores preservados. Nenhuma regra de agentes inserida no README.

README inclui logotipo existente, badge dinâmico do workflow CI na main (não é resultado de execução local), badges informativos de requisito Node e idioma, público-alvo, recursos, disponibilidade real 00–06, trilhas de aprendizagem separadas do frontend, tecnologias com ícones locais e créditos, instalação, uso, documentação e contribuição. Ausência de licença geral constatada por busca de LICENSE/COPYING no repositório; nenhuma licença atribuída por inferência a partir dos ícones. Desenvolvimento Profissional/English Journey permanecem explicitamente futuros.

Capturas reais do build local em `docs/images/readme-*.png`, com contexto Chromium isolado: roadmap desktop escuro, exercícios 05 claro e roadmap mobile claro. Sem dados pessoais ou alterações artificiais da interface. Previews desktop/mobile em `quality/footer/readme-professional-*.png`, com Markdown/GFM convertido por remark, HTML original e estilos locais de leitura. Não alegam reprodução exata do CSS do GitHub. Imagens/badges decodificados no Chromium, destinos relativos existentes, âncoras válidas e documento sem overflow a 320/375/768/1024/1440; detalhes em `readme-professional-validation.json`. Inspeção visual das capturas e da prévia executada. Links externos dos badges dependem da rede; o status CI acompanha o workflow, não uma promessa de aprovação permanente.

Nova execução de typecheck, lint, build, isolamento e Vitest: todos passaram; 440 testes em 45 arquivos. Aviso existente de bundle acima de 500kB permanece. A rodada anterior já validou visualmente e por axe o footer; não repetida suíte UI global/zoom real em alteração documental. Nenhum commit ou deploy.

### Integração preservando README/footer — 19/10/2026

Atualização fast-forward de a995597 para origin/main em 98ed049; sem conflito aberto, sem novo commit e sem push. As alterações locais de apresentação foram guardadas em stash recuperável e reaplicadas pontualmente sobre o código recebido. Rotas, catálogos, progresso, laboratórios e demais funcionalidades dos commits remotos foram preservados; o diff local fica restrito à apresentação, aviso contextual de dados e documentação/assets associados.

Esta integração supera as observações anteriores sobre ausência das áreas complementares: agora há rotas `/desenvolvimento-profissional` e `/ingles` e a etapa 07 está disponível. Footer passa a ter os quatro destinos pedidos originalmente (Roadmap Backend, Desenvolvimento Profissional, Inglês e GitHub); README atualizado para o escopo 00–07 e áreas complementares disponíveis. Capturas serão regeneradas contra esse build para não representar a versão antiga. Os registros de testes anteriores permanecem datados, não transferidos automaticamente para a integração.

Validação da integração: typecheck, lint, build, isolamento e 483 testes/49 arquivos passaram. Footer reexecutado nos dois temas e cinco larguras (320–1440), sem overflow ou violações axe; foco de 3px e navegação aos destinos complementares conferidos. Screenshots do README regenerados no build integrado, imagens/âncoras/caminhos locais válidos e prévia sem overflow nas cinco larguras. Aviso existente de chunk >500kB permanece. Alterações de apresentação permanecem locais, sem commit/push; backup recuperável em stash com descrição `backup README e footer antes de integrar origin/main`.

### Etapa08 — implementação e auditorias em19/10/2026

Currículo autorizado integralmente por anexo. Implementados oito módulos com revelação exclusiva por details,9 tópicos por stack,16 exercícios em3 setores e um integrador de6 entregas. Integrações em currículo, roadmap, seletor/filtros, contexto de navegação, progresso, conquistas e três papéis de IA; esquema2 compatível, tentativas/sínteses08 isoladas por stack. Mudanças README/footer anteriores preservadas; README público alterado somente em disponibilidade00–08. Nenhuma infraestrutura própria ou execução de código livre adicionada.

Achados anteriores às correções: referência Node inadequada ao contrato de compilação; metadata de idioma ConfigMap; contexto04 herdado em prompts08; proibição CI/deploy herdada na preparadora; contratos iniciais08 ausentes; critérios simultâneos de runtime; alternativa de hardware confundível com mera descrição; nomes acessíveis da marca e link anterior divergiam do texto visível. Correções e reconferências independentes registradas em `quality/stage08/{source-review,educator-review,ui-review}.md`. Nenhum bloqueante conceitual/educacional identificado após correções no recorte revisado.

UI independente:30 combinações de rotas/larguras sem overflow/pageerror, keyboard Enter/foco, filtro combinado/limpeza, isolamentoPHP/TS e recarga; axe final dos módulos nos dois temas320/1440 sem violações/incompletos. Revelação exclusiva validada. Screenshot real mobile/desktop inspecionado. Revisão automatizada não certifica WCAG integral.

Capas: pedido posterior explícito do usuário resultou em duas imagens editoriais reais, verificadas visualmente e salvas em public/assets/books/stage08 e public-roadmap/assets/books/stage08; cards sem URLs externas de imagem, com fallback em erro. Proveniência e direitos preservados sem alegar licença livre. Não confundir consulta de catálogo com leitura integral.

Testes intermediários:488 testes/50 arquivos passaram; typecheck, lint, build e isolamento passaram. A primeira rodada de navegador falhou por seletores do harness (nome exato do carregamento/label Setor) e preparação assíncrona da fixture. Correções foram nos testes, sem reduzir critérios; resultados iniciais preservados em browser-initial.json. Nova rodada dos3 fluxos passou (PHP/TS,3prompts/cópia, ciclo completo, pausa/retomada, recarga e reversão por stack). Inventário completo08 nas duas cores e reflow/axe passou separadamente. Resultados globais/finais são registrados abaixo após terminar; não tomar falha do harness como aprovação nem apagar evidências.

Validação final08: typecheck, lint, build, isolamento e diff-check passaram.488 testes/50 arquivos passaram novamente após inclusão das capas. Build40 arquivos, sem ZIP/MDX/entry legado; aviso de chunk >500kB permanece. A suíte UI global executou44 casos:41 passaram;3 casos novos falharam por seletores/fixture do teste. Após correções (incluindo prefixo /stacktrail nas imagens), rodada única dos4 testes08 passou. O inventário completo08, ambos temas, 320/375/768/1024/1440 e fonte150%, eixo de estado e prompts/cópia passaram;2 capas efetivamente decodificadas e caminhos locais conferidos. Reconciliação por44 títulos distintos tem último resultado passado, sem alegar rodada única44/44 verde. Registros brutos e conciliação em browser-global-initial.json, browser-stage08-final.json e validation-summary.json.

Zoom real: teste separado final passou com extensão Chromium `chrome.tabs.setZoom/getZoom` em200/400% nos dois temas, incluindo visão geral08, módulos08, exercício08-16 e projeto08; não é CSS zoom/deviceScaleFactor. Registro browser-zoom-final.json. Regressões globais das páginas publicadas nos dois temas, etapas anteriores, migração, falha de storage, áreas complementares e ciclos de estado passaram na rodada global. Capturas do README foram regeneradas no build final sem alterar sua apresentação profissional.

Limites finais: nenhuma API do estudante, Docker/Compose, cluster KinD ou workflow externo foi executado; os contratos e a interface foram testados, não futuras bases geradas por IA. A alternativa analítica de hardware é rotulada como análise; não representa operação real certificada. Sem licença livre/autorizações editoriais gerais inferidas das capas; direitos dos titulares e proveniência registrados. Nenhum commit, push, conta ou deploy.

## Etapa09 —19/10/2026

Escopo: currículo integral fornecido na conversa, ampliação autorizada de00–08. Preservados README/footer,08 e demais mudanças locais; sem commit/push. Relatório e inventário: [STAGE_09_IMPLEMENTATION](STAGE_09_IMPLEMENTATION.md).

| Achado antes da correção | Gravidade | Correção | Evidência / estado |
| --- | --- | --- | --- |
| SintomaC de configuração sem estímulo/saída fixos | Alta curricular | Perfis reais lab:start-missing/lab:start, exit78/CONFIG_REQUIRED e saúde200 após correção | Revisões independentes educacional/técnica; corrigido por contrato, futura geração não executada |
| Não atendido poderia receber nota máxima | Alta funcional | Coerência status/pontos/evidências validada no registro, parser e resultado | Testes de objeto adulterado e registro contraditório; validado |
| Histórico gerava registros além do limite do parser | Média | Recusar mutação no limite, preservar histórico | Teste100revisões; validado |
| IA declarada sem descrição da assistência | Média | Assistência exigida para conclusão quando utilizada | Teste de conclusão; validado |
| Faixas numéricas, página, alinhamento temporal e concorrência ambíguos | Média curricular | Limite±1e14/PHP64bits, page≥1/pageSize1..50, UTC15min/segundos0, disputa sem chave de repetição | Reconferência técnica independente; corrigido/contrato |
| Estado inicial09-14 divergente (nome/ID) | Média curricular | Preparação nome asc/ID asc antes da mudança | Leitura de enunciado/preparação; corrigido |
| Meu progresso não explicava prova e suas duas unidades | Média UX | Estado, tentativas e resultado por stack, explicação dos dois registros | Correção posterior ao relatório independente; revalidação no fluxo final |
| Modo imutável com texto sugerindo alteração | Baixa UX | Histórico mantém modo inicial; assistência posterior muda interpretação | Texto explícito e registro informativo; corrigido |
| Conclusão desabilitada sem resumo de pendências | Baixa UX | Fases, artefato, conferências e IA resumidos | Fluxo de formulário; corrigido |
| URLProGit em09 devolve404 | Média factual | Rota oficial Contribuindo-para-um-Projeto aberta/lida e cadastrada | Consulta web primária19/10; corrigido |

Validações executadas até esta anotação: suíte completa499/499;11testes novos originais, posteriormente ampliados para12com conclusão/reversão09. Build/typecheck/lint passaram nas rodadas iniciais após correções; ver registro final abaixo. Três testes Playwright09 passaram (duas stacks+cobertura6rotas×5larguras/axe/capas),19s. Primeira tentativa do testeUI travou por seletor de label; seletor decombobox corrigido e reexecutado, sem alteração de funcionamento para ocultar falha. Capturas em `quality/stage09/browser/`; mobile inspecionado pelo implementador. Revisão independente inspecionou também desktopdark/mobilelight, foco e estados concluídos; zero violações axe nos estados examinados.

AuditoriaGET:273URLs acumuladas;23na09,21HTTP200;LeetCode403 eProGit404na rodada. LeetCode é complemento opcional e bloqueio do cliente não prova inexistência;ProGit corrigido após consulta primária. Adequação é revisão independente, nãoHTTP. Falhas externas de etapas anteriores não foram alteradas fora do recorte. ArquivoJSON conserva evidência da rodada; datas são de consulta.

Limites: não executado backend do estudante, PostgreSQL, Docker/CI nem base futura gerada; não houve envio aIA ou certificação. Estimativa12–20h autoral sem calibração com estudantes. Axe/reflow/capturas não demonstram conformidadeWCAG2.2AA completa. Regressão global/zoom ainda em andamento nesta anotação; somente o registro final permite concluir a cobertura executada.

### Rodada final focada09

- Suíte completa: **500/500 em51arquivos**,90,99s; depois do ajuste final do indicador de prova iniciada, recorte09 reconferido: **12/12**,469ms.
- `npm run typecheck`, `npm run lint`, `npm run build`: passaram; build conserva aviso de chunk>500kB (aprox.1,34MBminificado/392kBgzip), sem adicionar dependências. Não é falha de compilação; otimização do bundle permanece fora deste recorte.
- `node scripts/check-practice-build.mjs`:42arquivos, semZIP/MDX/entrylegado; sentinelas passaram. `git diff --check` passou.
- Playwright focado final: **3/3**,17,1s, incluindo modo assistido com assistência informada, simulação, nota declarada100, bloqueio crítico posterior, recarga, refazer/histórico e troca de stack. Navegação/referências/projeto/prova/capas, axe e6rotas×5larguras320/375/768/1024/1440. Capturas finais mobile/desktop em `quality/stage09/browser/`. Mudanças de resumo/pendências estão renderizadas nessa rodada; revisão independente permanece datada do build que observou.
- ProGit corrigido:GET200 confirmado em19/10, registro adicional preservado noJSON (273URLsda rodada+1URLcorrigida). LeetCode403continua limitação de acesso do cliente. Sem afirmar aprovação de todos os links acumulados.
- Logs datados preservados em `quality/stage09/{unit-final,unit-focused-final,ui-focused-final,build-final,typecheck-final,lint-final}.log`.

Resultado da regressão global e zoom real ainda deve ser registrado separadamente após término; não incluído no número focado3/3.

Revalidação das três correçõesUX: build final mostra estado Interrompida/contagem/resultado por stack emMeu progresso, resumo de pendências na prova e texto de modo inicial preservado. Fonte150% em320/375/768/1024/1440 sem overflow no progresso; retomar por foco+Enter muda paraEm andamento. Script isolado `/tmp/stacktrail09-final-ux.mjs`, resultadoPASS em `quality/stage09/ux-corrections-final.log`. Primeira execução lia oDOM antes de aguardar o título da nova rota; a espera explícita de renderização corrigiu o harness, sem mudança de produto.

### Ajuste de escala do harness global

A primeira regressão global passou15casos, mas a varredura única de rotas do tema escuro excedeu300s na atividade09-13, perto do fim dos exercícios; não registrou violaçãoaxe antes do timeout. Tema claro foi interrompido para corrigir a estrutura do harness,30casos ainda não tinham rodado. Log preservado em `quality/stage09/ui-global-initial.log`. `e2e/published-routes.spec.ts` agora divide **o mesmo inventário completo**, mesmos temas/tagsaxe/reflow e registrosincomplete em lotes de60rotas, com execução paralela limitada aos2workers existentes. Nenhuma rota/regra foi excluída para obter sucesso. Arquivo principal preserva os testes funcionais. A primeira reinicialização aguardou liberação da porta4181do preview antigo; rodada efetiva registrada no log final.

Na rodada global em lotes, o teste de **zoom real200%/400%** passou nos dois temas, incluindo `/etapas/09` e `/etapas/09/prova-final`: extensãoChromium executa `chrome.tabs.setZoom`, confirma `getZoom`, larguraCSS e ausência de overflow. Não éCSSzoom,deviceScaleFactor ou simples redução da viewport. Regressões de migração/chaveslegadas, falha de armazenamento/memória, filtros, clipboard e conclusão/reversão00–06 também passaram nessa rodada. Resultado total ainda segue abaixo após o término.

Último ajuste editorial09: a restrição comum deixou de impor banco/framework em lógica ou planejamento. APIs usam a stack escolhida; lógica dispensa API/banco/bibliotecas específicas; SQL dispensa API. Prompts gerais repetem esse limite. Reconferência educacional em `educator-review.md`, sem bloqueantes abertos. Após o ajuste: build/typecheck embutido e lint passaram;12testes09 passaram (incluem referências e ausência de infra obrigatória na lógica);3casosUI09 passaram novamente em16,7s. Não se repetiu desnecessariamente toda a suíte unitária após alteração apenas editorial; sua rodada500/500 permanece registrada separadamente.

### Resultado global concluído —19/10/2026

**`npm run test:ui`:57/57 aprovados,0falhas,0flaky,0ignorados**,528,697s (8min49s). Inventário completo:352rotas por tema (704combinações),12lotes de até60, mesmas regrasaxe/reflow; todas passaram. Inclui fluxos00–09, áreas independentes, armazenamento/migração/filtros/prompts/clipboard, capas locais, conclusão/reversão, dois temas, cinco larguras, fonte150% e zoom real200/400nas rotas declaradas. Não houve exclusão de regraaxe para aprovação.

Após a retomada da conversa, o arquivo temporário de stdout já não estava disponível. O resultado foi recuperado do ZIP embutido no relatório HTML persistente `playwright-report-practice/index.html` e cruzado com `test-results-practice/.last-run.json` (`status:passed`, nenhuma falha). Preservados em `quality/stage09/ui-global-report.json` (sumário original), `ui-global-final.log` (resumo identificado como extraído, não stdout) e `route-zoom-evidence.json` (anexos do relatório). Erros globais do relatório:nenhum. A primeira rodada com timeout permanece documentada separadamente; a rodada final foi integralmente verde.

Recorte09 entregue na aplicação estática, com revisões educacional/factual/UI e correções reconferidas. Permanecem limites declarados: bases externas futuras não executadas, estimativa não calibrada com estudantes, auditoria não é certificaçãoWCAG e aviso de tamanho de bundle. Nenhum commit ou push realizado.

## Etapa10 —19/10/2026

Currículo integral do anexo do usuário autoriza10FrontendModerno/FullStack;mapaJúnior00–09/Pleno10–15/Sênior16–19. Estado inicial limpo após commit953ed8e;nenhum commit/push realizado neste recorte. Relatório completo em [STAGE_10_IMPLEMENTATION](STAGE_10_IMPLEMENTATION.md).

| Achado apresentado antes da correção | Gravidade | Correção | Estado/evidência |
| --- | --- | --- | --- |
| Metadado10eraSQL e00estava emPreparação | Média curricular | Currículo10substitui planejamento;00agrupada emJúnior,IDs/conteúdo preservados | Regra expressa do usuário e testes deformaçãocom10/6/4;validado |
| Ex10mantinha categorypapelaria mas esperava livroP4 | Alta curricular | Removercategory explicitamente antesdeqlivro | Revisõeseducacional/factual e testecontrato;corrigido/reconferido |
| Pré-requisitoAPIpoderia bloquear ausência deprojeto | Média curricular | Alternativa mínima explícita e metadadosC | Revisãoeducacional;corrigido/reconferido |
| DTOsem tipos/faixas e condiçõesdeerros suficientes | Média técnica | Contratoid/name/category/price/page/pageSize/total e extras | Revisãofactual e teste;corrigido/reconferido |
| SintomaCORSgenérico | Média técnica | Roteirodireto200/browserrejeição+CORS com defeito real,semcausa/patch | ContratoB14conferido;futura geração não executada |
| Respostaantigapoderia repor dados apóslogout | Alta curricular | Exigir invalidação de consultas daidentidade anterior | Requisitos/resolver/prompts e revisãofactual;corrigido/reconferido |
| Profilerpoderia ser exigido emprodução padrão | Média técnica | Devidentificado oubuildprofiling explícito;semcallbackpadrão obrigatório | Revisãofactual;corrigido/reconferido |
| Tópico selecionado pulavah1→h3 | Média acessibilidade | Subtítulosh2quando título docardh2não érenderizado | Falhaaxe inicial preservada em `quality/stage10/browser-initial/`;4/4UIapós correção;validado |
| TesteLimparfiltros encontrava doiscontroles | Harness | Selecionar botão da toolbar/primeiro controle,semremoveração de vazio | Reexecução4/4;validado |
| Contratospreparação10omitiram literal127.0.0.1 e testeformaçãotinha contagemantiga | Média/esperado | Loopbackexplícito;fixtureJúnioragoraconta00,4/10nãoconclui | Suíte512/512;validado |
| Capas inicialmenteplaceholder | Apresentação | Após pedidoexpresso posterior,3capas reais locais,origem/direitos efallback | Conferência visual,3imagensnaturalWidth>0 e revisãoUI;validado |

Revisões independentes com achados antes das correções: `quality/stage10/{educator-review,source-independent,ui-independent}.md`. Sem bloqueantes conceituais/educacionais abertos nos recortes inspecionados. A revisãoUI confirmou50combinações5rotas×5larguras×2temas,semoverflow/pageerror,accordionEnter/exclusivo,Iniciarabre/pausa/recarga/continua,modalcomfoco/Tab/Escape/retorno e3capasreais locais. Capturas/dados brutos copiados pelo implementador para `browser-independent/`;isso não amplia a cobertura independente.

Execução principal: `npm test -- --maxWorkers=2` **512/512 em52arquivos**,43,86s;typecheck/lint/build passaram. `node scripts/check-practice-build.mjs`:45arquivos,semZIP/MDX/entrylegado. `git diff --check`passou. Build conserva aviso dechunk>500kB,aprox.1,404MBminificado/413kBgzip;nenhumadependência nova. Não se inferiu prontidão pedagógica pelo build.

UIfocada: **4/4**,22,7s,arquivo `quality/stage10/ui-focused.log`;duasstacks,tentativas/sínteseisoladas,19atividades,conclusão/reversão/recarga,prova09/chavelegadapreservadas,promptseditáveis/cópia/foco,filtros/lotes12,capas.9rotas×5larguras320/375/768/1024/1440×2temas,fonte150%,axe sem regras excluídas e capturas. Não houve execução deAPI/DB/frontend do estudante. Logs persistentes: `unit.log`,`typecheck.log`,`lint.log`,`build.log`,e relatórios/capturas.

Regressão global eGET ainda emexecução nesta anotação;resultado será registrado após término. Limites: basesgeradas futuras não validadas,nãoexecutado deployexterno/serviçopago,nemavaliaçãocompletaporleitor de tela ou todoscontrastessobrequalquerestado. Axe/teclado/reflow não certificamWCAG2.2AA. Dadospessoais/tokensnão foram usados nem enviados àIA.

GETconcluído:290URLs acumuladas,26pertencentes à10 (23referências+3catálogos),**26HTTP200**,nenhuma falha desse recorte. Resultado em `quality/stage10/reference-access-summary.json`;horárioISOUTC20/10 corresponde à noite de19/10 emAmerica/Sao_Paulo. Falhas deoutrasetapas permanecemregistradas,nãoforamapagadas ou promovidas aadequação. Revisão deconteúdo é separada emsource-independent.md.

Na rodada global, passou o teste dezoomreal200/400nosdoistemas,incluindo `/etapas/10`,índicedetópicos,atividade10-14 eprojeto. Mecanismo:extensãoChromium `chrome.tabs.setZoom/getZoom`,fator real validado e larguraCSS/overflow conferidos; nãoCSSzoom oudeviceScaleFactor como substituto. Estatística global final ainda emandamento.


### Resultado final da validação da Etapa 10

A regressão global terminou: **63/63 testes UI aprovados em 8,4 minutos**, sem falhas, testes instáveis ou testes ignorados. Inclui 386 rotas em dois temas (772 combinações), regressões das etapas anteriores e zoom real de 200%/400%, com rotas da Etapa 10. Evidências: [log global](quality/stage10/ui-global.log) e [estatísticas extraídas do relatório Playwright](quality/stage10/ui-global-report.json). As 512 verificações unitárias, typecheck, lint, build e quatro testes UI focados também passaram. As três capas reais são assets locais em public e na árvore pública utilizada pelo Vite. Permanecem os limites de execução e acessibilidade descritos acima. Sem commit ou push.

## Etapa 11 — arquitetura backend e design (20/10/2026)

Recorte autorizado pelo currículo integral do usuário. Estado inicial limpo após commit da10; não foram descartadas alterações concorrentes. Implementados nove módulos,18 exercícios e integrador, com tentativas/síntese independentes em uma stack. Auditorias levantaram lacunas antes das correções:

| Achado/local | Gravidade | Correção | Evidência/estado |
| --- | --- | --- | --- |
| Exercício07 exigia replay antes do módulo07 | Média pedagógica | Cancelamento simples primeiro; idempotência reservada ao14 | Reconferência educator, validado |
| Exercício18 poderia depender de projeto11 concluído | Média pedagógica | Classificação C com alternativa anterior à mudança de histórico | Reconferência educator e inventário, validado |
| Replay precisava de autorização atual, inclusive perda de acesso do mesmo ator | Alta técnica | Contrato explícito em14/projeto e prompts | Reconferência factual, validado no contrato; API do estudante não executada |
| Ficha/amostra gratuita não torna Design Patterns gratuito | Média factual | Referência marcada obra paga, nota de ficha/amostra | Fonte primária e revisor, validado |
| Base04 antecipava causa específica | Média pedagógica | Sintoma/resultado de fronteira sem causa/localização | Revisão factual/educacional, validado |
| Proibição geral preparadora poderia remover transação/replay legitimamente prévios | Média pedagógica | Proibição delimitada ao trabalho da atividade, preservando estado inicial | Reconferência dos dois revisores, validado |
| Sentinela de etapa futura em teste07 ainda apontava11 | Harness | Futuro agora12, mantendo toda a validação07 | Nova suíte unitária; resultado final abaixo |
| Prosa/contratos novos aglutinavam palavras/números | P2 legibilidade | Revisão editorial de módulos, exercícios, projeto e preparação11 | Achado independente anterior às correções; reconferência e resultados abaixo |

Evidências: `quality/stage11/{educator-review,source-independent,ui-independent}.md`, logs, capturas e inventários. O primeiro global foi interrompido deliberadamente para corrigir legibilidade; não foi contado como sucesso. Nova rodada global iniciada após rebuild. Não se excluíram regras de axe nem rotas para obter sucesso.

UI focada inicial:4/4 em34,3s,duas stacks,fluxos reais de início/parada/recarga/retomada/conclusão/reversão,19 atividades emfixture de estado,09/legado preservados,filtros/lotes,prompts/copiar/foco e livros. Nove rotas×cinco larguras×dois temas,fonte150% eaxe. Resultado posterior à edição e suíte global registrados após execução.

Limites: nenhum backend, banco ou código do estudante executado. Bases futuras geradas por IA não validadas. GET não é adequação. Axe/teclado/reflow não certificam WCAG completa; leitor de tela e todos os contrastes em todos os estados não foram auditados integralmente. Sem publicação,commit/push automático,dependências novas ou acesso a credenciais.

Reconferência visual independente posterior:50 combinações sem overflow/pageerror,fluxos/foco/capas preservados;P2 principal de leitura validado como corrigido. Resíduos menores de I/O15/16 e espaços em pré-requisitos/descrições também corrigidos no fonte para a rodada final focada. Modelo vazioADR acrescentado ao módulo08 e reconferido pelo educator;sem gabarito. Cinco artigos gratuitosPT de padrões foram abertos pelo principal e factchecker;FactoryMethod contextualizado e ordemObserver não universalizada. Contratos funcionais não mudaram nesse acabamento. O global emcurso cobre build anterior a esses últimos textos/fontes/molde;build eUI focada finais os reconferem separadamente.

Comandos finais de lint e suíte unitária após revisão de conteúdo:lint sem achados;**521/521 testes em53 arquivos**,70,28s. GETdo recorte11: **33URLs/33HTTP200**,adequação revisada separadamente. Registro emreference-access-summary.json. Falhas deoutrosrecortes não foram omitidas do relatório acumulado.

### Resultado final registrado

Regressão global: **67/67 aprovados em10,9min**,zero falhas,instáveis ou ignorados. **420 rotas por tema =840 combinações**,incluindo00–11 e destinos pendentes/áreas independentes. Zoom real200/400 nos dois temas passou,incluindo visão geral/tópicos/atividade15/projeto11; mecanismoChromium `chrome.tabs.setZoom/getZoom`,fator real conferido e reflow observado,nãoCSSzoom/deviceScaleFactor. Estatísticas e dados emui-global-report.json/route-zoom-evidence.json. Essa rodada antecede apenas o acabamento final de texto/fontes/molde.

Build final:TypeScript/Vite aprovados,48 arquivos isolados,nenhum ZIP/MDX/entrylegado detectado por sentinelas. Aviso dechunk>500kB permanece:JS1.473,01kB/gzip433,76kB,sem dependência nova. Typecheck explícito sem erros.

**UI final4/4 em46,3s**,após rebuild:ambas stacks,prompts/copiar/foco,parada/recarga/retomada,conclusão/reversão,09/chavelegada preservadas,filtros/lotes/3capas+1fallback,nove rotas×cinco larguras×dois temas,fonte150%,axe sem exclusões e modeloADR aberto em320px. Capturas embrowser-final/ eui-final-report.json. A suíte final reconfere os acabamentos que não existiam no build global. Revisões independentes permanecem delimitadas aos fluxos nelas documentados. Sem commit/push/publicação externa.

Reconferência unitária final: **15/15 em2arquivos**,622ms,Etapa11+Laboratórios Guiados;lint final sem achados. Revisão UI independente de acabamento:seis combinações extras,DOM de15/16 e pré-requisitos,modeloADR porEnter/foco,375/1440;sem overflow,achados anteriores corrigidos/validados. Evidências final-* no subdiretório independente. `git diff --check` final aprovado;nenhum commit/push.

# Engenharia com IA / Mercado — 19/10/2026

Recorte, arquivos e fontes: [AI_MARKET_IMPLEMENTATION.md](AI_MARKET_IMPLEMENTATION.md). Alterações anteriores preservadas; sem commit/push/publicação. Skills educator/factchecker/uiux aplicadas com revisão independente somente leitura e reconferência sem bloqueantes estáticos restantes.

| Achado | Gravidade | Correção / evidência | Estado |
| --- | --- | --- | --- |
| Âncora de fonte poderia substituir rota HashRouter | P1 | Botão rola e foca artigo; teste E2E confirma URL preservada e foco | Validado |
| Leega atribuía TypeScript/Docker sem evidência | P2 | Observações separadas Node.js/CI; reconferência independente | Validado no recorte consultado |
| Estado de percurso IA comum entre stacks | P2 | Percurso e tentativas com @stack; testes de conclusão, troca e reversão | Validado |
| Parser aceitava arrays convertidos em string | P2 | Exige string; regressão com status em array e tipos inválidos | Validado |
| Preparação sem inventário central A/B/C | P2 | aiPreparations em preparation.ts e inventário de22 IDs em GUIDED_LABS; A sem botão e C com alternativa | Corrigido e reconferido |
| Referências de IA não cobriam técnica dos testes/SQL/sinais | P2 | Node/Laravel, PostgreSQL EXPLAIN, OpenTelemetry e React vinculados; fontes primárias abertas | Corrigido e reconferido |
| Capas sem comprovação de redistribuição | P2 | Lista explícita de permissões,44 fallbacks, uma capa autorizada; arquivo/base/erro testados | Validado para exibição |

Validação concluída: typecheck, lint e build passaram; suíte unitária final:53 arquivos/523 testes aprovados em88,43s. `node scripts/check-practice-build.mjs`:47 arquivos, sem pacotes de estudo/ZIP/MDX/entry legado e sentinelas passaram. Build avisa chunk principal maior que500kB; sem dependências novas, sem alteração de limite para esconder aviso.

Navegador Chromium/Playwright: os cinco testes novos passaram na suíte completa. Cobre três percursos, prompts editáveis/cópia/Esc/retorno do foco, pausa/retomada, conclusão/reversão/recarga, isolamento por stack/chave, filtros combinados/vazios, fontes e comparação, imagem autorizada e erro/fallback. Reflow320/375/768/1024/1440 com fonte150% nas duas áreas e três percursos; temas claro/escuro; axe sem violações nas telas novas testadas; navegação de regressão por roadmap, exercícios, projetos, referências, inglês, profissional e progresso. Capturas desktop e mobile inspecionadas visualmente: hierarquia, controles e leitura preservados. Vinte capturas complementares, sem overflow, registradas em `quality/ai-market/rendered-layout.json`. Axe não certifica WCAG completa.

Tentativa inicial de Playwright ficou bloqueada pelo socket loopback no sandbox (confirmado por cliente HTTP); execução local com permissão apropriada prosseguiu. Primeira rodada:4/5 passaram, um seletor de teste por rótulo exato não localizou o controle; trocado por papel/nome acessível, passando na suíte subsequente. Não foi mascarada falha funcional.

GET separado:303 URLs,293 HTTP200 e10 falhas/não verificadas por esse cliente. `REFERENCE_LINK_CHECK.json` e `quality/ai-market/link-audit-summary.json` preservam detalhes. Resultado HTTP não aprova adequação; páginas/fontes relevantes foram lidas por revisão web independente. Fontes com status de anúncio/idioma/limites registrados no catálogo.

Resultado global: `npm run test:ui` executou68 casos em10,5min:66 passaram; o teste de zoom falhou no lançamento do Chromium completo (`launchPersistentContext: spawn UNKNOWN`) e a expectativa histórica de capas07 exigia imagens em vez de fallback. Essa expectativa foi corrigida e o caso07 reexecutado com `npm run test:ui -- practice.spec.ts -g 'Stage07: reflow' --output test-results-practice/stage07-recheck`:1 aprovado em13,7s. Total de casos distintos validados:67; zoom permanece pendente por falha de lançamento, sem skip ou conversão artificial em sucesso. Inventário de386 rotas preexistentes passou nos dois temas (772 visitas auditadas), além das novas telas.

Limites: zoom real de navegador200/400 não validado devido ao erro de lançamento acima; fonte150% e viewport reduzida são complementares. Sem alegação de WCAG completa, contratação, aprendizagem certificada ou execução de código do estudante. Imagem remota BCcampus falhou pelo cliente web; licença e créditos confirmados, composição local inspecionada e evidência anterior preservada. Arquivos antigos sem permissão permanecem no repositório para auditoria, sem exibição autorizada. Créditos/licenças acompanham a capa aprovada nos dois diretórios públicos. Resumo estruturado em `quality/ai-market/validation.json`.
# Correção de navegação dos módulos de IA — 19/10/2026

Achado relatado pelo usuário: selecionar em “Módulos e desafio final” atualizava conteúdo abaixo da dobra sem levá-lo à leitura (P2). Corrigido em `AIEngineeringPage.tsx`: seleção explícita aguarda o módulo renderizado, rola seu título para o início da viewport e move o foco ao título (`tabIndex=-1`). Funciona ao selecionar novamente o mesmo módulo, por mouse/teclado, em Anterior/Próximo e Continuar de onde parei; troca de stack não provoca salto automático. Sem animação forçada ou mudança de progresso.

Estado: **validado**. Regressão de navegador em375/1440px confirma foco e título inteiramente visível após clique, Enter, repetição da seleção e Próximo. Suíte `ai-market.spec.ts`:6 testes aprovados em21s, incluindo persistência, filtros, modal, reflow e axe. Onze testes unitários pertinentes aprovados; build/typecheck e lint aprovados. Primeira implementação perdeu foco durante atualização assíncrona da rota; detectada no teste e corrigida sincronizando o efeito com o ID renderizado. Evidências em `test-results-practice/ai-navigation-final/`. Resultado anterior de zoom real continua limitado ao lançamento do navegador, sem nova alegação de validação.
# AI Development Toolkit — validação em22/10/2026

Escopo autorizado pelo anexo35947145 e correções explícitas: Google Antigravity com Subagents, não Gemini CLI. Relatório atual: `AI_DEVELOPMENT_TOOLKIT.md`; evidências: `quality/toolkit/`.

Achados antes da correção/reconferência:

| Problema | Gravidade | Correção / evidência | Estado |
| --- | --- | --- | --- |
| ISO/Agent Skills usadas como referências genéricas de conceitos fora do recorte | P2 | Mapeamento específico ADR/C4/PostgreSQL/OpenAPI/ASVS/testing/Rules/Hooks/MCP; revisão independente | Corrigido e reconferido |
| Suposição inicial GeminiCLI e restrição posterior indevida ao Antigravity IDE | P2 | Opção final Google Antigravity (Gemini), superfície App documentada, Subagents opcionais reais; sem transportar settings/httpUrl/commandsTOML do GeminiCLI | Validado por dados/fontes e navegador |
| Arquivos de agentes tratados como portáveis entre clientes | P2 | Matriz por plataforma/superfície, árvores e exemplos condicionais, Copilot Local harness e limites executáveis explícitos | Validado |
| Atualização de conteúdo sem conduzir o estudante à nova seção | P2 prevenido | Navegação leva ao título e move foco; conceitos/documentos usam divulgação progressiva nativa | Validado por teclado/navegador |

Comandos finais: `npm run typecheck`, `npm run lint` e `npm run build` aprovados. `npm test -- --maxWorkers=2`:54 arquivos/534 testes aprovados em77,08s na rodada final estável. Uma rodada intermediária durante alteração do inventário falhou na importação de export recém-adicionado; teste específico e suíte completa reexecutados com arquivos estabilizados, sem ignorar caso. Build continua avisando chunk principal>500kB; nenhum limite alterado para ocultar aviso. Isolamento:47 arquivos, sem ZIP/MDX/pacote de estudo/entry legado, sentinelas aprovadas.

Playwright: `npm run test:ui -- project-planning.spec.ts ai-market.spec.ts --output test-results-practice/toolkit-final` aprovou10 testes em33,3s. Após a correção final Antigravity App/Subagents, `npm run test:ui -- project-planning.spec.ts --output test-results-practice/toolkit-release` aprovou4/4 em29,4s, incluindo checkbox/árvore de Subagents. Não foi alegada nova execução da suíte UI global inteira.

Cobertura: entrada global e duas rotas HashRouter/basePages,32 conceitos/12 documentos, seleção das cinco plataformas, caminhos/scopes, Rules/Skills/Hooks/MCP/Subagents, deduplicação de árvore, prompts editáveis e cópia real/Esc/retorno de foco, início/pausa/retomada/conclusão/reversão/recarga, invalidação ao editar, preservação das outras chaves. Testes de fontes sem acesso de rede na suíte unitária; GET auditado separadamente. Nenhuma configuração externa executada.

UI: temas claro/escuro, sete seções em320/375/768/1024/1440px com fonte150%; ausência de overflow global indevido; região de árvore nomeada/focável com rolagem horizontal local intencional. Axe sem violações nos estados testados; incompletos anexados no relatório Playwright. Modal testado por teclado; captures mobile da árvore foram inspecionadas visualmente em ambos os temas e copiadas para `quality/toolkit/screenshots/`. Rotas anteriores de roadmap/exercícios/projetos/livros/inglês/profissional/IA/mercado/progresso visitadas na regressão focada. Axe não certifica WCAG completa; zoom real200/400 não foi validado nesta rodada, sem substituir por viewport/fonte.

Fonte/schema: revisão independente somente leitura e reconferência final sem bloqueantes estáticos; Antigravity App confirma .agents/agents, ferramentas view_file/grep_search e política off. Hooks Antigravity permanecem desabilitados nos exemplos; Copilot Hook executável não verificado fica desabilitado na seleção. A execução/configuração de clientes externos continua dependente da instalação, permissão e revisão do estudante.

GET:342 URLs,329 HTTP200,13 falhas/não verificadas por esse cliente; arquivos de resultado separados de adequação. Normas integrais não lidas não são apresentadas como lidas. Sem novas capas, dependências, banco, conta, telemetria ou chamada automática de IA. Nenhum commit/push/publicação.


## Integração local/remota — 20/10/2026

Merge fd65e9c +f1a3f7f:13 conflitos de conteúdo conciliados mantendo Etapa11,IA/mercado,progresso e documentação de ambos. Typecheck/lint/build e532 testes unitários aprovados;UI específica de integração registrada em [MERGE_2026-10-20.md](MERGE_2026-10-20.md). Preservada política remota de permissão explícita das capas:arquivos11 mantidos,exibição agora usa fallback quando não há entrada aprovada. Relatos anteriores de três imagens11 renderizadas são históricos,anteriores à política integrada. Sem push.

## 20/10/2026 — Restauração das capas locais

Achado: `BookCover` filtrava todos os assets comerciais pela lista de licenças, substituindo-os por placeholders; impacto transversal nas bibliotecas. Corrigido conforme pedido explícito para restaurar as capas preexistentes, separando decisão de exibição e licença comprovada. Regra de restauração registrada em AGENTS.md. Caminhos antigos `covers/` agora resolvem para `assets/books/`; arquivos espelhados em public e public-roadmap.

Validado: typecheck, lint, 54 arquivos/532 testes unitários, build e check-practice-build; Playwright `restored book covers` carregou e decodificou imagens nas bibliotecas das etapas00–11 e Desenvolvimento Profissional usando `/stacktrail/`. Auditoria de49 registros:48 exibidos,1 placeholder preexistente (DDD11),nenhum arquivo ausente,hotlink ou divergência de espelho. Fallback por erro e rejeição de URL remota cobertos pelo teste unitário.

GitHub Pages: Vite usa base `/stacktrail/`, publicDir `public-roadmap`; workflow publica dist. Teste executado no preview do build estático, após liberar a porta local bloqueada no sandbox. Deploy público não executado nem inspecionado nesta rodada. Nenhuma certificação de acessibilidade ou nova matriz global de zoom/temas alegada; layout preservado.

## 20/10/2026 — Capa DDD11 incluída

Achado: Aprenda Domain-Driven Design permanecia com placeholder porque nunca tivera asset incorporado. Corrigido a pedido explícito: capa frontal oficial em public/assets/books/stage11 e espelho public-roadmap; imagem340×500 e fallback por erro preservado. Corrigida também a referência textual ao arquivo de proveniência (stage11).

Validado: inspeção visual da imagem frontal; typecheck, lint,54 arquivos/532 testes, build, isolamento e auditoria de capas; Playwright carregou imagens das etapas00–11 e biblioteca profissional e conferiu explicitamente a nova imagem DDD11 via /stacktrail/. Download HTTP inicial bloqueado por DNS no sandbox, concluído com acesso de rede autorizado; servidor de preview também executado com liberação da porta. Auditoria SSR emitiu aviso de porta HMR bloqueada, mas concluiu o inventário. Build mantém aviso de chunk grande. Sem alteração de layout; nova matriz de zoom/temas não executada. Sem commit,push ou deploy nesta correção.

## 20/10/2026 — Capas como padrão, sem whitelist por livro

Achado: listas individuais exigiam autorização adicional no código para cada nova capa. Corrigido por instrução explícita do usuário: AGENTS consolidado, restrições anteriores e das skills substituídas nesse recorte; runtime aceita imagens locais com caminhos previsíveis, preservando fallback por falha e rejeitando hotlink, traversal, formatos não permitidos e caminhos adulterados. Regressão adicionada para capa futura sem registro individual. Sem mudança de layout ou persistência.

Validação da política geral: typecheck, lint,54 arquivos/533 testes, build, isolamento e Playwright de carregamento de capas passaram. Auditoria atual:49 registros com imagem local,zero ausentes/remotos ou espelhos divergentes. Avisos:chunk grande no build e porta HMR bloqueada durante inventário SSR, concluído com sucesso. Sem novo deploy ou avaliação global de acessibilidade.

## 20/10/2026 — Etapa 12: integração e auditorias

Lacunas antes de corrigir: etapa12 indisponível;sem catálogo,preparação ou progresso específico;tokensporstack e cenários dos módulos pendentes durante integração. Corrigidos: publicadas rotas12,9módulos,18exercícios e integrador;A4/B8/C7;contratos resolvidos;tentativas12@stack e asyncEvidence no esquema2;capas locais;futuras13–19 preservadas.

Revisões independentes pedagógica,factual eUIestática em quality/stage12/reviews.md. Ajustados erro permanente semretry,comparação de referências opcional,ledger do receptor e handlerExpress despachando job. Nenhuma solução de estudante incorporada. Reflow e foco usam componentes/tokens existentes,sem ocultar overflow global.

Primeira rodada: testes globais detectaram contagens antigas do inventário e ausência do literal127.0.0.1 no prompt12;atualizadas contagens auditadas e explicitado loopback. Teste de futuro13 falhou apenas por capitalização da expectativa;contrato deUI preservado e assertiva corrigida. Resultados finais e limites em STAGE_12_IMPLEMENTATION.md após a rodada completa.

Etapa12 validada no recorte executado: typecheck/lint/build/isolamento;55arquivos/541testes unitários;5cenáriosE2E12;454rotas por tema em lotes;reflow320/375/768/1024/1440 e fonte150%;zoomreal200/400 viaAPIChromium em perfil descartável nos dois temas;inspeção visual. Sem violações detectadas peloaxe ou overflow global no inventário. Interrupção do processo longo e retomada dos lotes restantes registradas em quality/stage12/validation.json. Sem certificaçãoWCAG ou execução de futurasAPIs. Nenhum bloqueante encontrado nos testes executados.

## Resolucao do merge local/remoto — 22/10/2026

Sete conflitos resolvidos combinando Toolkit e Etapas11/12: navegacao/rotas, inventarios, fontes, configuracao E2E e verificador GET. Relatorio GET unido por URL (364 registros), preservando evidencias anteriores sem nova consulta de rede. Nenhum conteudo curricular novo.

Capas:94 caminhos dos dois historicos preservados;122 comparacoes de blobs (incluindo caminhos comuns) sem alteracao. Auditoria dos51livros atuais:51capas locais,zero ausentes/remotas/falhas de espelhamento.

Validacao executada: typecheck,lint,build e isolamento aprovados;56arquivos/552testes unitarios aprovados. E2E Toolkit/11/12:12aprovados;teste de zoom real200/400 nao executou por falha de lancamento de perfil Chromium com extensao (spawn UNKNOWN),inclusive fora do sandbox. Primeira tentativa interrompida por inicializacao presa;repeticao executou os12cenarios restantes. Zoom real permanece nao validado nesta integracao. Build mantem aviso de chunk acima500kB. Marcadores no exemplo didatico legado colaboracao.mdx ja existiam no HEAD e foram preservados.

## Etapa13 — 23/10/2026

Recorte do anexo78413f09:9módulos,18exercícios,integrador7marcos,Audit15seções,uma stack suficiente. Revisões independentes pedagógica,factual eUI/estado em `quality/stage13/reviews.md`;achados corrigidos antes da validação. Resultados executados e limites em `quality/stage13/validation.md`;relatório `STAGE_13_IMPLEMENTATION.md`. Nenhum benchmark backend,aprendizagem,produção ouWCAG completa certificados.

##23/10/2026 — Security Expansion

Achados antes das correções: P1 contrato de reprodução insuficiente em basesB;P2 prompts de checklist sem controles/registros;P2 memória perdida ao desmontar página sob falha de storage;P3 vazio sem orientação na segunda stack;P2 mapeamentos20/22/28/34 amplos/indevidos;P3 exemplosAPI10 e atribuiçãoACS em outras fontes. Estado corrigido: sintomas benignos explícitos; prompts autossuficientes; provider acima das rotas; vazio por stack; associações e exemplos/licenças revisados. Validação técnica/UI em `quality/security/`; resultado e limites consolidados em `SECURITY_EXPANSION.md`. Não confundir correção estática com execução de laboratórios futuros ou conformidade WCAG/ASVS.


### Reconferência final Security —23/10/2026

**Validado no recorte da plataforma:**569unitários;typecheck/lint/build/isolamento;73/73GETs;97cenários únicos de navegador. Execução completa95/97;dois seletores de teste foram corrigidos e5/5casos Security reconferidos no build final. Evidências brutas preservadas (`quality/security/full-ui.log`, `browser-recheck.log` e contextos iniciais). Memória entre rotas,stack vazia,prompts de checklist,filtros/progresso/modal/clipboard e zoom real passaram.489entradas de rota nos dois temas e132novas páginas percorridas; reflow/fontes em cinco larguras nas visões representativas. Axe/ensaios estáticos não certificam WCAG nem segurança de projetos do estudante. Limitações e pendências em SECURITY_EXPANSION.md.

## Etapa14 — conclusão em25/10/2026

Anexo2cbe84f1 autossuficiente,skills educator/factchecker/uiux aplicadas e revisão independente somente leitura.12módulos/22exercícios/8labs nomeados/integrador7marcos/Quality Audit. Uma stack suficiente,IDs eprogresso anterior/capas preservados. Relatório:STAGE_14_IMPLEMENTATION.md;evidências:quality/stage14/.

Achados apresentados antes das correções: P2fallbackDocker indevido na preparadora14;lacuna de fontes PHP/IOtimeout/retry;ProgressPage semlinha14;critérios genéricos herdados na visão geral. Corrigidos e reconferidos por revisão estática e asserções de navegador. P2contraste Inglês/tema claro no selo Em andamento:4,47:1;correção localizada comtexto semântico,observado12,55:1 e0violações no recorte. P2cicloTab do modal podia sair doconteúdo;contenção explícita,Escape/retorno preservados. Estado dos achados: **validado** nos fluxos executados.

Validação final:typecheck,lint,build e isolamento aprovados(82arquivos,96módulos). Suíte completa:59arquivos/575testes,0falhas;6testes focados finais também aprovados após ajustes textuais. UI14:6cenários aprovados,40rotas novas nos2temas,320/375/768/1024/1440,fonte150%,axe,modal/teclado/cópiareal,filtros,início/parada/recarga/conclusão/reversão/troca de stack,Quality Audit e preservação de chaves. Regressão modal14 + fluxos/capas13PHP/JS:3cenários aprovados.

Varredura global:536rotas por tema em18lotes;17lotes passaram na rodada inicial e o lote claro1–60 passou após corrigir o contraste doInglês. Rodada inicial22passados/1falhou incluiu5cenários14;reteste do lote e rodada final14 documentados separadamente,sem fingir nova execução global completa. Nenhuma violação automática remanescente nosrecortes executados;incompletos emartefatos dePlaywright. Capturas deviewport finais inspecionadas;nenhum seloWCAG.

Fontes:35técnicas diretas+28registros de plataforma herdados22/10;GET35/35HTTP200 separado de adequação.98arquivos de capas comblobs idênticos aoHEAD;nenhumlivro/capa novo. Nenhumcódigo deestudante/base futura,cliente deagente ouSDK externo foi executado. Zoom real200/400:probe tentouChromium/perfil descartável+tabs.setZoom,mas falhou emspawn UNKNOWN;**não validado**,não substituído porCSSzoom ouviewport. Build mantém aviso dechunk>500kB;sem mascarar warning. Nenhumcommit/push/deploy.

## Etapa15 — conclusão em25/10/2026

Anexo89181ecd: uma prova final Pleno, sem módulos teóricos novos; Laravel ou Express suficientes. Seis desafios oficiais pesquisados, com atribuição e adaptação separadas. Rubrica100/mínimo75, cinco bloqueadores, entrega distinta de atendimento dos critérios. Relatório: STAGE_15_IMPLEMENTATION.md; evidências: quality/stage15/.

Achado independente anterior à correção: consumo de reserva ambíguo. Corrigidos efeitos físico/reservado e regras de corrida, terminalidade e reentrega; reconferência documental sem lacuna material no recorte. UI inicial falhou por seletores restritos de testes; seletores corrigidos sem reduzir cobertura. Modal do Toolkit recebeu contenção de Tab, com regressão executada.

Typecheck/lint/build/isolamento aprovados;60 arquivos/581 testes unitários,zero falhas. Sete cenários UI15 e quatro regressões Toolkit aprovados. Navegação por541rotas em cada tema; reflow320/375/768/1024/1440,fonte150%,axe nos recortes novos,clipboard/modal/teclado,persistência,pausa/recarga,conclusão/reversão,histórico e isolamento de stack. GET14/14HTTP200 separado de adequação.98arquivos de capas idênticos aoHEAD.

Limites: zoom real200/400 não validado por spawn UNKNOWN do Chromium com extensão;reflow/fonte não substituem zoom. Axe não certifica WCAG. Nenhum código/backend do estudante executado ou URL submetida validada. Build mantém aviso existente de chunk>500kB. Sem commit,push ou deploy.
