> **Escopo atual:** Etapas 00/01/02/03/04 no formato de orientação e prática. Consulte [consolidação](CONSOLIDATION_00_01.md) e [auditoria documental](DOCUMENTATION_AUDIT.md). As seções anteriores registram verificações datadas do legado ou piloto; não constituem aprovação automática desta versão.

# StackTrail — auditoria global de qualidade

Escopo: plataforma compartilhada e todas as aulas, exemplos, práticas e exercícios publicados nas etapas 00, 01, 02, 03 e 04. Referência WCAG 2.2 AA; automação complementada por inspeção e operação. Execução em contexto isolado, sem dados pessoais. Não é certificado de conformidade nem prova de aprendizagem.

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

5. **Validação executada**:
   - `npm run typecheck`: 0 erros.
   - `npm run lint`: 0 erros.
   - `npm test -- --maxWorkers=2`: 422 testes passando em 42 arquivos.
   - `npm run build`: bundle estático limpo gerado em ~500ms (21 arquivos em `dist/`).
   - `node scripts/check-practice-build.mjs`: isolamento estrito confirmado (sem vazamento de assets ou entries legadas).
   - `node scripts/check-practice-links.mjs`: 133/135 links com resposta direta HTTP 200 (2 exceções externas com desafios de bot Cloudflare/IMD UFRN já documentadas).
   - `npm run test:ui`: 19 suítes completas de testes E2E Playwright validando WCAG 2.2 AA (axe-core) e reflow em todas as rotas (nos temas escuro e claro), larguras 320/375/768/1024/1440 px com fonte a 150%, filtros do catálogo com persistência de etapa e reversão de conclusão de etapa e atividades.
