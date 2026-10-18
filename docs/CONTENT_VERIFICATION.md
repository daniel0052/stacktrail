> **Escopo atual:** Etapas 00/01/02/03/04 no formato de orientação e prática. Consulte [consolidação](CONSOLIDATION_00_01.md) e [auditoria documental](DOCUMENTATION_AUDIT.md). As seções anteriores registram verificações datadas do legado ou piloto; não constituem aprovação automática desta versão.

# Verificação técnica dos conteúdos do StackTrail

> Atualização de 17/10/2026: a seção Etapa 03 ao final incorpora23 aulas e nove
> exercícios, elevando o inventário a65 aulas/56 desafios nas quatro etapas.
> As seções anteriores preservam os resultados históricos da auditoria00–02.

Auditoria de **16/10/2026**. Escopo: **42 aulas e 47 exercícios/desafios** das
Etapas 00, 01 e 02, além dos exemplos e cinco simuladores da Etapa 02.
Na auditoria original, nenhum conteúdo das Etapas 03–19 havia sido produzido.
A expansão autorizada da Etapa 03 e sua verificação de16–17/10 constam ao final;
Etapas 04–19 continuam futuras. Os currículos das três etapas
foram relidos integralmente via MCP Notion pelos revisores, sem paginação,
filhos ou truncamento pendentes indicados.

## Fases e estado real

- [x] Skill stacktrail-factchecker criada com skill-creator e quick_validate.
- [x] AGENTS e skills existentes orientam três responsabilidades distintas.
- [x] Etapa 00: inventário, fontes e revisão independente das 19 aulas/29 desafios.
- [x] Etapa 01: inventário, fontes e revisão independente das 11 aulas/nove exercícios.
- [x] Etapa 02: inventário, fontes e revisão independente das 12 aulas/nove exercícios/cinco modelos.
- [x] Lacunas apresentadas, correções e regressões reconferidas.
- [x] Verificações do projeto e relatório de evidências concluídos.
- [ ] Integrações externas e limitações listadas ao final: não executadas, sem aprovação implícita.

## Responsabilidades e independência

[stacktrail-educator](../.codex/skills/stacktrail-educator/SKILL.md) elabora e avalia
qualidade pedagógica; [stacktrail-factchecker](../.codex/skills/stacktrail-factchecker/SKILL.md)
confronta precisão técnica; [stacktrail-uiux](../.agents/skills/stacktrail-uiux/SKILL.md)
avalia acessibilidade e usabilidade. Três revisores separados (`factcheck_00`,
`factcheck_01`, `factcheck_02`) consultaram fontes por conta própria e buscaram
contraexemplos. O responsável implementou as correções e os revisores as
reconferiram. Nenhuma nota da educator foi usada como prova da própria correção.

Os pareceres independentes completos preservam experimentos, exercícios e
matrizes de fidelidade: [Etapa 00](verification/stage-00.md),
[Etapa 01](verification/stage-01.md), [Etapa 02](verification/stage-02.md).
As matrizes e os catálogos de fonte abaixo consolidam seus resultados atuais.
IDs de fontes têm escopo na respectiva etapa; os documentos foram abertos e
as seções pertinentes lidas, não apenas localizados em buscas.

## Critério e decisão

Classificações: **Verificada**, **Parcialmente correta**, **Incorreta**,
**Não verificada**, **Dependente de contexto ou versão**. Setas indicam resultado
antes/depois de correção, não duas aprovações simultâneas. Gravidade e estado da
correção são separados da classificação. Verificada vale para a afirmação e as
condições registradas, não para toda entrada possível ou qualquer versão futura.

Não foi demonstrado bloqueante conceitual grave remanescente nos conceitos
inventariados após as correções. As 42 aulas têm decisão por conceito nas matrizes;
a verificação técnica local é condicionada às versões, contratos e casos observados.
Isso não aprova operacionalmente entregas externas nem certifica aprendizagem,
segurança geral ou WCAG. Erro grave, exemplo essencial incorreto ou afirmação
crítica sem evidência continua bloqueando a aula, mesmo com build verde.

A seleção inclui regras que mudam decisões, exemplos essenciais, limites dos
modelos e pontos sujeitos a versão. Não é uma prova formal de toda frase ou
solução. Código do modelo comprova seu comportamento autoral, não sua equivalência
a uma ferramenta real; as comparações normativas e execuções reais são separadas.

## Problemas encontrados e correções

| Local / gravidade | Antes e correção | Evidência / impacto / estado |
| --- | --- | --- |
| Etapa 00, variáveis/recursão, baixa | ID Notion com espaço; corrigido nos dois links | ID confrontado com MCP integral; rastreabilidade corrigida e reconferida |
| Etapa 01, DOM, média | HTML sem type=email permitia formato inválido; HTML explícito e explicação de required/type/novalidate | WHATWG/MDN; regressão extrai HTML e handler reais, testa vazio/inválido/válido/foco/recuperação; afeta ex01/ex05; validado |
| Etapa 01, Fundamentos, baixa | “Preserve” idioma/main supunha template inexistente; agora define/acrescenta | Template oficial lido; roteiro corrigido; scaffold latest não executado |
| Etapa 01, CSS/Segurança/Next, baixa | Clarificados @scope, exceção localhost de Secure e prerender/hidratação de Client Components | MDN/Next consultados diretamente; clarificações reconferidas; sem generalizar versões ou prometer segurança |
| Etapa 02, contrato JSON, média | application/jsonp passava por prefixo; comparação do tipo completo e sufixo estruturado | RFC9110§8.3.1/RFC6839§3.1; regressões de falsos prefixos, parâmetros e +json; biblioteca/revisão; validado |
| Etapa 02, Location, média | /books/ passava sem identificar livro; segmento não vazio exigido pelo contrato local | Não inventada restrição de origem HTTP: Location absoluta externa válida continua aceita; validado |
| Etapa 02, HTTP, média | Application/JSON causava415; normalização do tipo/subtipo | RFC9110§8.3.1; POST e preflight com case/parâmetros exercitados; validado |
| Etapa 02, terminal, média | Pipe/redirecionamento citados eram interpretados como sintaxe | Lexer preserva natureza literal/operador; comparação com Bash real e regressões; terminal/cURL; validado |
| Etapa 02, cache, média | If-None-Match escondia parâmetros inválidos com304 | RFC9110§13.2.1; validar page/limit/sort antes de precondição; inválidos400/válido304; validado |

## Revisão das auditorias anteriores

Relatórios pedagógicos e QUALITY_AUDIT foram tratados como objetos de revisão.
Notas3/4 em precisão/fontes e ausência de bloqueante identificado não provaram
que o DOM funcionava nem cobriram os cinco contraexemplos dos modelos da Etapa 02.
Foram acrescentadas pontes nos relatórios antigos para este registro; o histórico
foi preservado. As correções antigas de entradas/AST, restore, método cURL,
exportação, tail e limites foram reconferidas no escopo descrito pelos revisores.

A própria skill foi aplicada a três cenários: fonte acadêmica inacessível não
virou evidência; variante defeituosa não foi aprovada por renderizar; diferenças
entre JS e o interpretador ficaram contextuais. O revisor identificou a necessidade
de justificar o inventário e separar modelo de norma; essas instruções foram
reforçadas na skill. Quick_validate passou nas três skills; isso valida formato,
não certifica decisões futuras.

## Testes e resultados efetivamente observados

Ambiente principal: Node24.21.0, TypeScript5.9.3, Vitest5.0.4; versões específicas
constam dos pareceres. Não foram adicionadas dependências de produção ao projeto
para esta auditoria. A instalação Next ficou em diretório temporário separado.

| Comando / fluxo | Resultado / alcance |
| --- | --- |
| npm run typecheck | passou |
| npm run lint | passou |
| npm test -- --maxWorkers=2 | 336 testes passaram em33 arquivos; inclui novas regressões das três etapas |
| npm run build | passou; aviso de chunk principal560,76kB minificado permanece |
| Recorte independente00, cinco arquivos | 107 testes passaram; inclui 121 vetores,605 consultas lineares,225 pares de intervalos, matrizes e fatorial |
| Recorte independente02, sete arquivos | 32 testes passaram,11 novos; baseline dos primeiros seis teve quatro falhas, depois corrigidas |
| Regressão DOM publicada | HTML/handler reais compilados e executados em módulo temporário com jsdom; formato inválido/vazio rejeitado, válido aceito e foco/aria recuperados |
| Oficina TypeScript00 | Quatro casos publicados e rejeição de capacidade0 executados em Node; não confundir remoção de tipos com typecheck |
| Playwright stage-one + web-tool-states | Primeira rodada47/50; contexto destruído no caso HTML/axe e dois elementos removidos do DOM nas jornadas de ferramentas; causa não estabelecida |
| Playwright confirmação direcionada | 7/7: três alvos anteriores, duas jornadas completas editor e dois exemplos HTTP/FormData; não declarar50/50 em uma única execução |
| Next16.4.2/React19.3.0 temporários | Build real webpack e rota local: filtro hidratado, vazio,500 e recuperação; loading transitório não cronometrado |
| React19.3.0 no Chromium | Consulta publicada: loading/sucesso/filtro/vazio/500/JSON inválido com respostas controladas; não é API pública |
| Tailwind4.3.3/Vite8.3.4 temporários | Config/CSS/HTML publicados compilaram; padding16px, cor e foco observados no Chromium |
| Git2.55.0 e Bash5.3.9 reais | Snapshots/restore/conflito com dois pais; herança de variável/export/operadores literais/permissão640 confrontados em diretórios temporários |
| cURL8.18.0 em loopback controlado | --json/headers, envio de JSON inválido sem validação, HEAD sem corpo e404/exit22/body preservado; não comprova httpbin externo |

Comandos e adaptações dos experimentos externos estão nos pareceres; fixtures
foram fictícias e locais. O ensaio Next usou porta4191 no lugar de4179 e um layout
mínimo; uma tentativa com4190 falhou por porta bloqueada, corrigida na fixture,
sem atribuir esse erro ao material. Erros de seletor/teste e restrições do sandbox
estão registrados em vez de omitidos. Os testes temporários não executam soluções
de estudante, eval ou Function. Rascunhos, IDs e esquema de progresso preservados.

## Etapa 00 — fontes e resultados por aula/conceito

[Experimentos, exercícios e decisão independente completos](verification/stage-00.md).

### Fontes consultadas

Todas as fontes abaixo foram abertas em 16/10/2026. Documentação viva significa versão exibida na consulta, não garantia permanente. Não se atribui ao conteúdo de uma edição não consultada.

| ID | Fonte e seção lida | Edição/condição e uso |
| --- | --- | --- |
| N00 | [Currículo original](https://app.notion.com/p/3f53cadfab77814bbaf1de279833217b), quatro pilares, Etapa 00, método, progressão, Problem Solving Lab e modelo de notas | MCP integral; autoria curricular somente |
| W | [Jeannette Wing, Computational Thinking: What and Why?](https://www.cs.cmu.edu/~CompThink/resources/TheLinkWing.pdf), p. 1, definição e abstração; p. 2, limites e falhas | Trabalho primário da autora, 17/11/2010; não define uma taxonomia normativa única de quatro pilares |
| C3 | [Cornell CS 2110 — Method Specifications and Testing](https://www.cs.cornell.edu/courses/cs2110/2025fa/lectures/lec03/), especificações, pré-condições e testes | Material acadêmico original, Fall 2025; apoia contrato separado de implementação |
| C4 | [Cornell CS 2110 — Loop Invariants](https://www.cs.cornell.edu/courses/cs2110/2025fa/lectures/lec04/), Loop Anatomy, Range Notation, frequência e invariantes | Fall 2025; apoia significado do prefixo processado e análise de fronteiras |
| C5 | [Cornell CS 2110 — Analyzing Complexity](https://www.cs.cornell.edu/courses/cs2110/2025fa/lectures/lec05/), catálogo de complexidades, regras de composição, busca linear/binária e espaço | Fall 2025; custo de operações e preparação precisam ser declarados |
| V | [VisuAlgo/NUS — Sorting](https://visualgo.net/en/sorting), Bubble Sort, Selection Sort e análise assintótica | Documentação dos próprios autores da visualização; modelo abstrato de comparação/troca |
| A | [MDN — Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), Description/Array indices | JS: índices base zero; arrays JS podem ser heterogêneos, ao contrário das coleções tipadas locais |
| L | [MDN — Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration), for, while, do...while e break | JS; diferenças do pseudocódigo `repita até` tratadas explicitamente |
| F | [MDN — Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions), declarações, chamada, parâmetros/argumentos e escopo | JS; passagem de objetos pode compartilhar referências, diferente das cópias locais |
| R | [MDN — Recursion](https://developer.mozilla.org/en-US/docs/Glossary/Recursion), base/recursive cases, stack size e factorial | Conceito e exemplo; limite de 24 é do StackTrail, não de JS |
| I | [MDN — Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger), Description; [ECMA — Number.isSafeInteger](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-number.issafeinteger) | Draft ECMAScript 2027 exibido; definição normativa consultada, não tratado como edição publicada |
| T | [Node.js 24 — TypeScript](https://nodejs.org/docs/latest-v24.x/api/typescript.html), Type stripping | Página exibiu v24.22.0; execução local v24.21.0. Tipos apagáveis, sem type checking/tsconfig |
| D | [MDN — Division](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Division), Number division | JS Number pode produzir Infinity; erro no editor é regra local |
| B | [MDN — Logical AND](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND), short-circuit evaluation | Analogia com curto-circuito local, não equivalência de coerções JS |
| M | [Mermaid — Flowcharts](https://mermaid.js.org/syntax/flowchart.html), Node shapes e Complete List of New Shapes | v12.2.0 exibida; documento dos mantenedores confirma convenções de processo, decisão e I/O. Não é certificação de conformidade ISO dos desenhos do projeto |
| P | `src/features/flow/model.ts`, `syntax.ts`, `interpreter.ts`; `lesson-activities.ts`, `deep-curriculum.ts`, `flow-challenges.ts`, `additional-cases.ts` | Fonte primária da linguagem/modelo autoral efetivamente executado; nunca apresentada como norma geral de programação |

Tentativas de abrir Princeton `https://algs4.cs.princeton.edu/11model/` e `/14analysis/` retornaram erro interno. Essas páginas **não são evidência**; Cornell/NUS foram alternativas efetivamente abertas. `https://nodejs.org/api/typescript.html` exibiu Node 26; buscou-se em seguida a linha 24 adequada. Não foram consultados capítulos do livro pago: a página da editora no conteúdo é indicação de leitura, não prova de seu teor.

### Matriz de verificação

Os arquivos abaixo ficam em `src/content/stage-00/lessons/`. V = conceito verificado nas condições registradas; as classificações são escritas por extenso para evitar aprovação implícita. “P/testes” identifica convenção local verificada no código e por execução, não apenas uma referência externa genérica.

| ID / aula / seção | Afirmação concreta e natureza | Classificação | Confronto, fonte/seção e execução/limite |
| --- | --- | --- | --- |
| 00-01 introducao / Primeiro defina a pergunta | Resolver requer explicitar problema, dados e regras antes do código; quatro pilares como organização curricular | Verificada | W definição/abstração e N00. Quatro pilares pertencem à taxonomia escolhida pelo currículo, não a uma norma universal. Exemplo aprovação usa limite inclusivo 7; P e regressões de aprovação exercitam 7, fora de faixa e tipo errado |
| 00-02 decomposicao / Partes com fronteiras claras | Separar validação, cálculo e apresentação permite verificar responsabilidades; seta de dependência não é execução paralela | Verificada | W abstração/composição, C3 especificações e P soma. Soma de durações executada para vazio e valores-limite; decomposição da compra é decisão de projeto, não uma única arquitetura obrigatória |
| 00-03 padroes / Uma contagem por chave | A,B,A tem contagens 2/1; soma dos contadores acompanha itens; observar 2,4,6 não garante próximo valor sem regra | Verificada | C4 frequência/invariante e verificação aritmética direta da tabela. A atividade local conta positivos; não foi confundida com implementação de Map/Set. Sem alegação de complexidade de Map/Set |
| 00-04 abstracao / Modelo de reserva | Intervalos válidos não vazios [a,b) e [c,d) conflitam se a<d e c<b; adjacência não conflita | Verificada | C4 notação semiaberta; derivação pela interseção e P. Novo teste compara 225 pares de intervalos inteiros válidos com existência de minuto compartilhado. Lab de duração fixa 60 tem pré-condição distinta, lida em flow-challenges |
| 00-04b abstracao / limites | Fórmula requer a<b e c<d, mesma sala/dia; lista local não controla concorrência | Dependente de contexto ou versão | Pré-condições explícitas em lesson-activities e texto; editor não valida relação entre início/fim automaticamente. Intervalos vazios/invertidos ficam fora do domínio, não são “aceitos como corretos”. Não executada concorrência real |
| 00-05 algoritmos / Leia a seta de retorno | total soma prefixo anterior a i; incrementar i e finitude da lista garantem término desta soma; i≤tamanho inclui índice inexistente | Verificada | C4 invariantes/guarda e L while; P. Testes existentes executados detectam laço sem avanço, índice inválido e soma de vazio. 2000 é limite local, não prova de término |
| 00-06 fluxogramas / Formas e conexões | Formas e setas têm convenção semântica; configuração e conexões, não aparência isolada, determinam execução | Verificada | M Node shapes/semantic meanings e P; mesma avaliação não compara coordenadas com gabarito. Fonte consultada apoia convenções, não conformidade ISO. Casos da atividade vinculada executados |
| 00-06b fluxogramas / Construa sem mouse | Portas, edição por Enter, movimentação, exclusão, desfazer e foco são capacidades efetivas de UI | Não verificada | Código inspecionado e relatórios antigos localizados, mas nenhum navegador/teclado foi operado nesta passagem técnica. Evidência deve vir da auditoria UI/UX; baixa gravidade para esta passagem, sem certificar acessibilidade |
| 00-07 testes / alcance da evidência | Casos executados são evidência finita; esperado deve vir do contrato; JavaScript colado não é executado pelo avaliador | Verificada | C3 contrato/testes; P AST permitida e regressões de importação/operador proibido executadas. Um programa pode coincidir nos testes e divergir fora deles; nenhuma prova universal foi alegada |
| 00-08 variaveis / Conceito em ação | Atribuição usa estado anterior; dados originais são copiados; expressão aninhada obedece precedência | Verificada | P calculate/read, structuredClone e syntax precedence; F alerta diferença JS/referências; testes de parser, cópia e expressão executados. (4+2)*3=18 e 3*4+2=14 são resultados do contrato autoral |
| 00-08b variaveis / operações | and/or são booleanos com curto-circuito; divisão por zero é erro e conversão exige texto numérico não vazio | Dependente de contexto ou versão | P implementa essas regras, testes de curto-circuito/divisão/tipos executados; B e D mostram que JS tem coerções/resultados distintos. Não generalizar “dividir por zero produz erro” a JS Number. Conversão usa Number após trim; não avalia o texto |
| 00-09 condicionais / Conceito em ação | Faixas encadeadas negativas/menor/adulto atribuem uma única resposta; tipo válido não implica regra de negócio válida | Verificada | P contratos e validação; C3 pré-condições. Idade negativa é aceita como entrada numérica para ser classificada como inválida. Casos -1,0,17,18 e decimal adicional executados; não inferir integralidade não exigida |
| 00-10 repeticoes / Conceito em ação | Teste inicial admite zero execuções; teste final executa ao menos uma; `repita até` sai em Sim | Verificada | L while/do...while e P condicao-final; P usa saída com condição de término, diferente da condição de continuação do do...while. Casos publicados e variantes executados; n=0 é excluído daquele contrato |
| 00-10b repeticoes / limite | 2000 passos é proteção do modelo, podendo interromper entrada válida grande | Dependente de contexto ou versão | P execute impõe limite global e rastreia chamadas; conteúdo já diferencia limite de prova de término. Nenhuma garantia de que todo grafo correto conclua para todo tamanho de entrada permitido |
| 00-11 vetores / Conceito em ação | Índices são 0..n−1; média vazia exige política; extremos com −101/101 dependem do domínio [−100,100] | Verificada | A Description/indices; P contratos, C4 percurso. Soluções e variantes de contagem/extremos/minimo/media executadas. Retorno zero para média vazia é convenção explicitamente publicada, não média matemática do vazio |
| 00-12 matrizes / Conceito em ação | Matriz local é retangular, linhas vazias têm zero colunas; varredura visita L×C células, reiniciando j | Verificada | P valueMatches/syntax/read e C4 laços/índices. Novo teste executa [], [[],[]], 2×3 com soma 5 e rejeita irregular [[1],[2,3]]. `linhas` é alias de length em syntax.ts; não se deduz essa semântica de arrays JS |
| 00-13 subrotinas / Conceito em ação | Parâmetros recebem argumentos em ordem, locais isolados, retorno entrega ao chamador; procedimento não tem destino | Dependente de contexto ou versão | P validateAlgorithm/visit e F parâmetros/escopo; testes de ordem, fracionário 5,5, locais e retorno/procedimento executados. Distinção função/procedimento e proibição de I/O em funções são regras declaradas deste editor. JS permite outros padrões e objetos compartilhados |
| 00-14 composicao / Conceito em ação | Chamadas aninhadas retornam em ordem inversa; média antes do bônus difere de bônus antes de dividir | Verificada | F chamadas/escopo e P frames; regressões de chamadas aninhadas executadas. Para 3 e8: (3+8)/2+1=6,5; (3+8+1)/2=6; não há teto10 na demonstração, apenas na variação proposta |
| 00-15 recursao / Conceito em ação | Fatorial tem casos 0!/1!=1, redução n−1, retornos por quadro; iteração evita pilha de chamadas | Verificada | R cases/factorial e P; novo teste compara todos n=0..10 com tabela de resultados independente e rejeita −1, 1,5 e 11. Recursão direta é o caso ensinado, não uma afirmação de que só exista recursão direta |
| 00-15b recursao / limite | Limite de profundidade 24 e domínio inteiro0..10 | Dependente de contexto ou versão | P: pilha inclui Principal; limite não é propriedade universal da recursão ou JS. Testes existentes de profundidade executados |
| 00-16 algoritmos-fundamentais / busca | Busca linear retorna primeira ocorrência; busca binária requer ordenação e exclui meio para progredir | Verificada | C5 busca e P contratos; novo teste linear confronta 605 consultas em121 vetores com índice de primeira ocorrência. Busca binária/ordenação estrita e até64 itens têm regressões executadas; duplicatas não são aceitas pelo contrato local |
| 00-16b algoritmos-fundamentais / duplicados e ordenação | Deduplicar preserva primeira ordem; trocas adjacentes preservam repetidos e ordenam | Verificada | V Bubble Sort e P. Novos testes em121 vetores (alfabeto −1/0/1, tamanho0..4) conferem ordem e multiplicidades, entrada intacta e primeira ocorrência. Não apenas compara o próprio gabarito ao próprio teste |
| 00-16c algoritmos-fundamentais / custo | Busca de vistos pode ser quadrática, bubble abstrato quadrático; copiar vetor tem espaço proporcional | Dependente de contexto ou versão | C5 regras de composição e V Bubble; modelo de operações abstratas. `swap`/trace do interpretador copiam estado e têm custos adicionais; não medir tempo da UI como complexidade do algoritmo. Limite de passos restringe demonstração a listas pequenas |
| 00-17 integracao / Conceito em ação | Invariante total=soma dos dobros do prefixo; função não acessa acumulador; refatorar preserva contrato | Verificada | C4 invariantes, C3 contratos e P integrado; casos vazio/sinais e chamada exigida executados. Comparar poucos casos não prova equivalência universal; texto o explicita |
| 00-18 estruturas / Compare estratégias | Linear pior O(n)/espaço auxiliar O(1), binária isolada O(log n), verificar ordem O(n); seleção O(n²) | Verificada | C5 busca/catálogo e V Selection Sort. Modelo abstrato iterativo com acesso indexado; exclui rastreamento e preparação da memória auxiliar da busca. Tabela [2,5,8,11,14] consulta11 examina índices2/3: aritmética conferida |
| 00-18b estruturas / Memória | Copiar lista O(n); frequência ocupa O(k) para k chaves distintas | Dependente de contexto ou versão | C5 espaço e P representação; modelo de chaves/valores de tamanho limitado. Não alegar tempo constante universal de Map ou tamanho constante de chaves arbitrárias |
| 00-19 metodo / Oficina | Ordem de chegada, rejeição não interrompe; restantes+ocupados=capacidade; relatório contém mensagem por pedido | Verificada | P contrato integrador e exemplo TS; C3 contrato. Ponte TS extraída e executada com os quatro testes publicados e guarda adicional capacidade0; saída abaixo |
| 00-19b metodo / custo e execução TS | Implementação TS simples percorre n pedidos e produz n mensagens; Node24 remove tipos apagáveis sem checar | Dependente de contexto ou versão | C5 análise e T Type stripping; Node local24.21.0, não uma garantia para Node arbitrário. Custo O(n) do TS simples não equivale ao custo de rastrear/clonar o fluxograma |

## Etapa 01 — fontes e resultados por aula/conceito

[Experimentos, exercícios e decisão independente completos](verification/stage-01.md).

### Fontes consultadas

Todas consultadas em 16/10/2026. MDN e guias são documentação viva, sem edição
congelada; os URLs indicam os documentos realmente abertos, não referências apenas
copiadas das aulas. As seções a seguir delimitam o que foi conferido.

| ID | Fonte / seção lida | Versão ou condição |
| --- | --- | --- |
| S01 | [WAI Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/), Associating labels explicitly | Tutorial W3C/WAI; associação `for`/`id` |
| S02 | [MDN input email](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/email), Validation / Value | Sintaxe, não existência de caixa postal |
| S03 | [MDN submit event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event), descrição / validação | Validação inválida impede submit; `form.submit()` não dispara o evento |
| S04 | [MDN Cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction), Cascading order | Inclui proximidade de escopo antes de ordem |
| S05 | [MDN box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing), Values / exemplos | Content-box versus border-box |
| S06 | [Vite Features](https://vite.dev/guide/features.html#transpile-only), Transpile Only | Vite transpila TS sem typecheck |
| S07 | [TS strict](https://www.typescriptlang.org/tsconfig/strict.html), descrição da família strict | TypeScript; opção não inclui automaticamente unused |
| S08 | [TS Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), typeof / truthiness / in / instanceof / discriminated unions | Handbook; exemplo local compilado com TS 5.9.3 |
| S09 | [TS Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), Type Assertions / Literal Types | Assertions não têm checagem runtime |
| S10 | [MDN sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), descrição / Return value | Mutação in place; padrão compara strings |
| S11 | [MDN Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), Return value / Description | Rejeição não cancela outras operações |
| S12 | [MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), Checking response status / Reading body / response type | 4xx/5xx resolvem Response; corpo pode falhar depois |
| S13 | [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS), Simple requests / Preflighted requests / credentials | POST JSON não é safelisted; leitura credenciada exige configuração específica |
| S14 | [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), §§6.4.1, 9.3.4–9.3.5, 15.3.1–15.3.5 | HTTP Semantics, junho/2022; estados/intenções de método |
| S15 | [MDN FormData](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects), Creating / Retrieving / Gotchas | Strings/Blob/File, name, disabled e boundary |
| S16 | [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), Description / Exceptions | Strings por origem; indisponibilidade possível |
| S17 | [MDN sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), descrição | Separação por origem e contexto de aba |
| S18 | [MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie), HttpOnly / Secure | Exceção HTTPS em localhost explicitada pela documentação |
| S19 | [Tailwind Vite](https://tailwindcss.com/docs/installation/using-vite), passos 2–4 | Integração Tailwind 4; plugin + import CSS |
| S20 | [React Effects](https://react.dev/learn/you-might-not-need-an-effect), Updating state based on props/state / Filtering a list | Derivar filtro durante renderização |
| S21 | [React Rendering Lists](https://react.dev/learn/rendering-lists), Rules of keys | Keys únicas entre irmãos e estáveis |
| S22 | [React Render and Commit](https://react.dev/learn/render-and-commit), etapas render/commit | Nova renderização não implica recriar todo DOM |
| S23 | [Next Server/Client](https://nextjs.org/docs/app/getting-started/server-and-client-components), On the server / On the client first load / Using Client Components | Página atualizada 05/10/2026; App Router; prerender de Client Components e hidratação |
| S24 | [Next Installation](https://nextjs.org/docs/app/getting-started/installation), System requirements / Automatic installation | Documentação consultada indica Node mínimo 20.9; latest é variável |

### Matriz de verificação

Local: cada nome abaixo é o arquivo `.mdx` de `src/content/stage-01/lessons/`.
“Verificada” vale para a afirmação e condições da linha, não para todo o manual,
segurança geral, aprendizagem ou qualquer solução do estudante.

| ID / aula / seção | Afirmação confrontada e natureza | Fonte / confronto | Classificação / estado |
| --- | --- | --- | --- |
| 01-HTML-1 html §2 | Label explícita relaciona `for` e `id`; `name` identifica o campo | S01, S15: vínculo e participação em FormData conferidos | **Verificada**; evidência documental |
| 01-HTML-2 html §2–3 | Validação cliente pode ser contornada; servidor revalida; submit nativo pode ser bloqueado por inválidos | S02/S03: validação nativa e caminho de submissão; sem promessa de segurança só pelo HTML | **Verificada** nas condições nativas descritas |
| 01-CSS-1 css §1 | Cascata resolve origem/importância/camada/especificidade; ordem desempata equivalentes | S04: equivalência precisa incluir proximidade de @scope. A clarificação atual cita @scope antes da ordem de aparição | **Verificada** após clarificação documental; exemplo sem @scope não era bloqueante |
| 01-CSS-2 css §1 / exemplo | Border-box inclui padding/borda, não margem | S05: cálculo normativo e exemplo coincidem | **Verificada**; sem inferir layout correto de qualquer conteúdo |
| 01-FUND-1 fundamentos / preparação | Vite pode servir TS com erro de tipos; typecheck deve ser separado | S06/S07: transpilar não executa verificação semântica TS | **Verificada**; compilação dos snippets executada |
| 01-FUND-2 fundamentos §2–3 | sort modifica array; cópia spread antes de sort preserva array externo | S10: mutação in place; cópia é superficial como a aula avisa | **Verificada**; ex03 relacionado |
| 01-FUND-3 fundamentos / preparação | “Preserve lang=pt-BR e um main” pressupunha HTML inicial não garantido pelo template | Instrução inspecionada; não se executou novo scaffold. Responsável alterou para definir idioma/acrescentar main, sem depender do template | **Parcialmente correta** inicialmente; **Verificada** como instrução atual de edição; corrigido por inspeção, instalação pendente |
| 01-TIPOS-1 tipos §1–2 | Tipos/assertions somem; unknown exige narrowing; `as` não valida JSON | S08/S09: assertions removidas sem runtime checking | **Verificada**; não se apresenta predicado como proteção automática |
| 01-TIPOS-2 tipos / isUsuario | Guard rejeita null/nome numérico/telefone numérico e aceita contrato pequeno | S08; execução do snippet publicado rejeitou quatro entradas adversas e aceitou `{id:1,nome:'Ana'}` | **Verificada** no contrato explícito, não identidade/autorização |
| 01-TIPOS-3 tipos §3 | Utility types são transformações estáticas, não validação PATCH | S09 e compilação local dos três blocos juntos; comportamento runtime não é atribuído aos aliases | **Verificada** no exemplo; sem alegar cobertura de todos os utility types do TS |
| 01-DOM-1 dom §1 | validade de e-mail pelo handler pressupõe input type=email | S02; HTML originalmente especificado sem tipo aceitou “nao-e-email”. HTML atual explícito reconferido: inválido e vazio rejeitados; endereço sintaticamente válido aceito | **Incorreta** como experiência original incompleta; **Verificada** após correção; gravidade média, validado em DOM simulado |
| 01-DOM-2 dom §1–2 | preventDefault não interrompe propagação; textContent não interpreta HTML; submit pode não chegar à validação personalizada | S03 e comportamento DOM; novalidate agora explícito. Delegação preserva checagem de contêiner | **Verificada** no fluxo descrito; teste assistivo humano não realizado |
| 01-ASYNC-1 assincrono §1 | Promise tem estados; await não paraleliza CPU nem congela página inteira | S11 contextualiza coordenação de promises; mock local é rotulado memória, não HTTP | **Verificada** como modelo de continuação; não se mediu desempenho |
| 01-ASYNC-2 assincrono §3 | Promise.all rejeita sem cancelar operações restantes | S11 e experimento: primeira rejeitou; segundo timer terminou mesmo assim | **Verificada**; não implica cancelamento automático |
| 01-HTTP-1 http §1 | PUT solicita criar/substituir estado; DELETE solicita remoção, sem garantia de implementação/autorização | S14 §§9.3.4–5: contrato e efeitos do servidor importam; texto usa intenção do método | **Verificada** no nível introdutório; não equivale a apagamento físico obrigatório |
| 01-HTTP-2 http §1–2 | 204 sem conteúdo; fetch resolve erro HTTP; json pode falhar depois | S14 §6.4.1/S12: status e leitura são decisões distintas | **Verificada**; exemplo trata 204 antes de JSON |
| 01-HTTP-3 http §4 | POST JSON cross-origin normalmente faz preflight; CORS não autentica; wildcard não basta para leitura credenciada | S13: tipos safelisted excluem JSON; credenciais e origem têm condições específicas | **Verificada** nas condições explícitas; cache de preflight pode evitar novo OPTIONS observado |
| 01-HTTP-4 http / FormData | Campos textuais são strings; Request multipart gera boundary e não envia por construção | S15/S12; Node confirmou string e boundary, sem rede | **Verificada** para objeto Request; browser real não reexecutado por este revisor |
| 01-HTTP-5 http / mock | Servidor de estudo realmente oferece cenários GET/POST/409/500/JSON/CORS no navegador | Código lido; execução anterior não tomada como prova nova. Responsável reexecutou os dois E2E publicados em test-results/factcheck-confirm.log: ambos passaram | **Verificada** no fluxo de estudo testado; execução do responsável identificada, sem atribuí-la a este revisor |
| 01-SEG-1 seguranca §1–2 | Storage strings por origem; sessionStorage separado por aba; leitura inválida tem fallback | S16/S17 e snippet: JSON inválido, versão desconhecida e string deram16; válido20 preservou20 | **Verificada** no pequeno esquema; rascunhos valiosos exigem preservação como a aula alerta |
| 01-SEG-2 seguranca §1 | HttpOnly impede leitura JS, mas scripts ainda fazem requests; Secure restringe HTTPS | S18: HttpOnly correto; falta exceção localhost para Secure | **Parcialmente correta** inicialmente; **Verificada** após clarificação localhost reconferida documentalmente; não é garantia contra XSS/CSRF |
| 01-SEG-3 seguranca §3 | Autorização e preço não podem confiar no frontend; dados/credenciais enviados ao browser são acessíveis | S18/S23: fronteira cliente não protege os dados entregues; a aula não propõe auth pronta | **Verificada** como limite de confiança, sem certificar segurança de app real |
| 01-TAIL-1 tailwind / configuração | Tailwind4/Vite usa pacote, plugin e @import; utilitários continuam CSS | S19 passos2–4 coincidem; dependência dev adequada ao build local | **Dependente de contexto ou versão**: Tailwind4; receita documental e build temporário 4.3.3 conferidos; scaffold latest **Não verificada** |
| 01-REACT-1 react §1–2 | Filtro derivado não precisa efeito; key estável; input controlado por value/onChange | S20/S21: mecanismos coincidem com o snippet | **Verificada** documentalmente e por montagem dos snippets em Vite/Chromium, com filtro sobre duas entradas |
| 01-REACT-2 react / Consulta | Ref bloqueia duplicata e estado governa UI; render não recria todo DOM | S22 e compilação; código usa finally para liberar ref e valida unknown | **Verificada** no fluxo React19.3.0 observado em Chromium: loading, sucesso, filtro, vazio,500 e JSON inválido; respostas controladas, sem alegar API externa |
| 01-NEXT-1 next §1 / Filtro | use client delimita grafo de módulo; dados serializados ao cliente são públicos | S23: imports entram no grafo cliente; Server Components em children não são todos convertidos. Aula não impõe use client à árvore toda | **Verificada**; clarificação de prerender HTML inicial/hidratação adicionada pelo responsável e reconferida; filtro hidratado operou no runtime observado |
| 01-NEXT-2 next / preparação/page/loading | Projeto App Router separado; página busca/valida e entrega somente id/nome | S23/S24 e tsc dos arquivos; versões/lockfile exigidos; no-store explícito | **Dependente de contexto ou versão**; build Next16.4.2 passou; runtime sucesso/vazio/500/recuperação observado; exibição transitória de loading não cronometrada |

## Etapa 02 — fontes e resultados por aula/conceito

[Experimentos, exercícios e decisão independente completos](verification/stage-02.md).

### Fontes consultadas

Todas consultadas em 16/10/2026. As âncoras identificam a seção pertinente; as conclusões não decorrem apenas da existência de uma URL.

| ID | Fonte/versão e seções lidas | Uso |
| --- | --- | --- |
| U | [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986.html#section-3), janeiro/2005, §§3–3.5 | Componentes URI; fragmento separado antes de dereference. |
| H | [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), junho/2022, §§4.2, 8.3.1, 9.2–9.3, 10.2.2, 13.2.1, 15.3–15.6 | Semântica HTTP e contrapontos dos modelos. |
| P | [RFC 5789](https://www.rfc-editor.org/rfc/rfc5789.html#section-2), março/2010, §2 | PATCH e operação especificamente idempotente. |
| C | [RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html#section-5.2.2), junho/2022, §§4.3, 5.2.2 | Cache, no-cache/no-store e revalidação. |
| J | [RFC 8259, texto](https://www.rfc-editor.org/rfc/rfc8259.txt), dezembro/2017, §§2–7, 8.1 | Gramática JSON e UTF-8 entre sistemas abertos. |
| F | [WHATWG Fetch](https://fetch.spec.whatwg.org/#http-cors-protocol), Living Standard recuperado nesta consulta, §§3.3–3.3.6 | CORS, credenciais, exposição e preflight. |
| K | [MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#attributes), documentação viva, Attributes | HttpOnly, Secure, Domain/Path, SameSite, expiração e exceções do browser. |
| D | [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035.html), novembro/1987, §§2.1–2.2, 3.3.1 e 3.4.1; [RFC 3596](https://www.rfc-editor.org/rfc/rfc3596.html#section-2.1), outubro/2003, §§2.1–2.3 | Resolução distribuída, cache, A/CNAME e AAAA. |
| T | [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293.html#section-2.2), agosto/2022, §2.2; [RFC 768](https://www.rfc-editor.org/rfc/rfc768.html), agosto/1980, Introduction | TCP e UDP. |
| S | [RFC 8446](https://www.rfc-editor.org/rfc/rfc8446.html#section-1), agosto/2018, §1; [RFC 9525](https://www.rfc-editor.org/rfc/rfc9525.html#section-6), novembro/2023, §§6.1–6.3 | TLS 1.3 e identidade de serviço. |
| Q | [RFC 9114, texto](https://www.rfc-editor.org/rfc/rfc9114.txt), junho/2022, §§1.2, 2; [RFC 9000](https://www.rfc-editor.org/rfc/rfc9000.html#section-21.1.1), maio/2021, §§1, 21.1.1 | HTTP/3, QUIC, streams e segurança integrada. |
| E | [MDN Evolution of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP), HTTP/2 e HTTP/3 | Contexto de uso pelos navegadores; não medida de latência. |
| R | [Fielding, tese, capítulo 5](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm), 2000, §§5.1.2–5.1.6 | Restrições REST e statelessness. |
| O | [OpenAPI 3.1.1](https://spec.openapis.org/oas/v3.1.1.html), Paths/Operation/Parameter/Responses/Schema Objects, especialmente §4.8.12.2 | Fragmento versionado e parâmetro path obrigatório. |
| M | [RFC 6839](https://www.rfc-editor.org/rfc/rfc6839.html#section-3.1), janeiro/2013, §3.1 | Sufixo estruturado +json; não confundir prefixos parecidos. |
| X | [curl manual](https://curl.se/docs/manpage.html), página declara 8.23.0; seções --json, --head, --request, --fail-with-body, --output, --write-out, --verbose | Opções confrontadas com cURL instalado 8.18.0. Não se supôs igualdade de todas as versões. |
| B | [Bruno Create a Test](https://docs.usebruno.com/get-started/bruno-basics/create-a-test), Testing with JavaScript; [Environment Variables](https://docs.usebruno.com/variables/environment-variables), Creating/Using/Persistence and export | API test/res/expect e interpolação do environment. UI não executada. |
| G1 | [Git restore](https://git-scm.com/docs/git-restore), documentação identificada como atualizada em 2.55.0, DESCRIPTION/OPTIONS | Origem index versus HEAD e destinos. |
| G2 | [Git rebase](https://git-scm.com/docs/git-rebase), DESCRIPTION e sequência de replay | Reaplicar commits e cuidado com histórico compartilhado. |
| G3 | [Git fetch](https://git-scm.com/docs/git-fetch), documentação identificada 2.56.0, DESCRIPTION; [Git pull](https://git-scm.com/docs/git-pull), DESCRIPTION | Referências remotas e integração conforme opção/configuração. |
| G4 | [Git gitignore](https://git-scm.com/docs/gitignore), DESCRIPTION; [GitHub Pull requests](https://docs.github.com/en/pull-requests/reference/pull-requests), documentação viva | Arquivos rastreados não são removidos por ignore; proposta/revisão de PR não equivale a deploy. |
| L | Ajuda primária instalada: `bash -c 'help export; help type; help echo'`, Bash 5.3.9 | Exportação, resolução e saída; confrontada com execução real. |

Falhas de acesso: GNU Bash manual integral e páginas Quoting/Redirections retornaram erro/timeout; Open Group POSIX shell também não foi recuperado. Usada ajuda instalada e comportamento do Bash real para o recorte, sem afirmar consulta às seções inacessíveis. RFC 9114 HTML falhou, mas o texto oficial foi recuperado; RFC 8259 HTML falhou em uma leitura posterior, com texto oficial recuperado. A indisponibilidade não foi convertida em aprovação.

### Matriz de verificação

As localizações abaixo são arquivos em `src/content/stage-02/lessons/`. “Verificada” se aplica à afirmação nas condições da linha, não à correção universal de qualquer ferramenta. Gravidade de pendência aparece nos achados e limitações. T1–T5 remetem às execuções ao final.

| ID/local | Afirmação importante e natureza | Fonte/seção; confronto | Classificação atual / evidência |
| --- | --- | --- | --- |
| 02-U1 `urls.mdx`, Entender | Esquema/host/porta/path/query/fragmento são partes distintas; fragmento não compõe alvo HTTP. Norma. | U §§3–3.5; H §4.2 | **Verificada**; teste publicado separa filtro, página vazia e detalhe ausente (T1). |
| 02-U2 `urls.mdx`, exemplo HTTP/1.1 | Linhas textuais não são o enquadramento de HTTP/2/3. Recorte explícito. | E HTTP/2/3; Q §2 | **Verificada**; modelo legível não é captura de rede. |
| 02-U3 `urls.mdx`, caso biblioteca | Filtro redes/página2 resulta200 vazio; `/books/999` resulta404. Política local. | Contrato/implementação `http.ts`, T1 | **Verificada** no mock; não é regra universal de toda API. |
| 02-M1 `metodos.mdx`, tabela | Segurança refere-se à intenção, não ausência de logs; idempotência não exige status repetido. Norma. | H §§9.2–9.3; T2 | **Verificada** no recorte. |
| 02-M2 `metodos.mdx`, PATCH/PUT | PATCH específico pode ser idempotente; neste mock PUT exige ambos os campos. Norma + contrato. | P §2; `http.ts`; T1 | **Verificada**, mantendo a distinção entre norma e escolha local. |
| 02-M3 `metodos.mdx`, timeout | Repetir criação sem deduplicação pode duplicar efeito. Risco. | H §9.2.2; ausência de garantia no contrato | **Dependente de contexto ou versão**: contrato pode oferecer deduplicação; mock não oferece nem reproduz efeito antes de timeout. |
| 02-H1 `mensagens.mdx`, tabela/status | 401 desafia autenticação, 405 informa Allow; 404 não identifica sozinho causa interna. Norma. | H §§15.5.2/15.5.5/15.5.6 | **Verificada**; não se infere linha do programa pelo status. |
| 02-H2 `mensagens.mdx`, JSON | JSON é dado serializado; string, objeto e ausência diferem; UTF-8 na troca aberta. Norma. | J §§2–8.1 | **Verificada**; parser do mock diferencia sintaxe400 e conteúdo422 (T1). |
| 02-H3 `mensagens.mdx`, headers | Accept não corrige Content-Type incorreto. Norma + contrato. | H §8.3.1; T2 | **Verificada** após F02-01/F02-03; parâmetros/case e sua participação em preflight confrontados. |
| 02-H4 `mensagens.mdx`, 204/HEAD | Não inventar JSON em resposta sem conteúdo. Norma. | H §§9.3.2/15.3.5; T2 | **Verificada**. |
| 02-E1 `estado.mdx`, cookie | HttpOnly restringe acesso JS; não impede envio. Expiração de cookie não prova invalidação da sessão. Norma + modelo. | K Attributes; T1 | **Verificada** no conceito e ciclo fictício; navegador real não exercitado aqui. |
| 02-E2 `estado.mdx`, SameSite | None/Secure, Lax, site/origem e políticas de terceiros dependem do navegador. | K SameSite/Secure | **Dependente de contexto ou versão**; aula explicita condições e que o modelo não impõe atributos. |
| 02-E3 `estado.mdx`, cache | no-cache permite armazenamento com validação; no-store é distinto. | C §5.2.2 | **Verificada**; sem garantia absoluta de privacidade. |
| 02-E4 `estado.mdx`, ETag | Revalidação válida retorna304 sem body; alteração muda revisão. Modelo. | C §4.3; `http.ts`; T1/T2 | **Verificada** após F02-05. Revisão global é delimitação explícita; não certifica todas as precondições RFC. |
| 02-C1 `cors.mdx`, definição | CORS controla compartilhamento, não autenticação; cURL não aplica a política JS. | F §3.3 | **Verificada** documentalmente. |
| 02-C2 `cors.mdx`, duas trocas | JSON/PATCH podem exigir preflight; resposta principal também precisa permitir leitura. | F §§3.3.2–3.3.6 | **Verificada**; trace local não é OPTIONS real. |
| 02-C3 `cors.mdx`, credenciais | Origem explícita e permissão de credenciais; Set-Cookie não é header comum acessível. | F §3.3.5; K | **Verificada** nas condições explicitadas. |
| 02-C4 `cors.mdx`, falhas | Bloqueio de leitura/timeout não prova ausência de efeito;500 é HTTP. | F §3.3.6; H §9.2.2; T1 | **Verificada**; mock não reproduz todas as situações reais. |
| 02-D1 `redes.mdx`, DNS | A/AAAA endereços, CNAME nome canônico; caches/TTL. | D §§2.1,3.3.1,3.4.1; RFC3596§2 | **Verificada** documentalmente; sem consulta DNS real. |
| 02-D2 `redes.mdx`, transporte | TCP fluxo ordenado/confiável; UDP sozinho não garante entrega/ordem. | T RFC9293§2.2/RFC768 Introduction | **Verificada**; nenhum teste de perda real. |
| 02-D3 `redes.mdx`, percurso | DNS resolvido não comprova porta/aplicação; cenários param na camada modelada. | Responsabilidades de D/T; `network.ts`; T1 | **Verificada** como modelo conceitual, sem medição de rede. |
| 02-S1 `tls.mdx`, identidade | Nome/cadeia/validade precisam conferir; HTTPS não comprova autorização do usuário. | S §§1/6 | **Verificada** documentalmente; certificado real não ensaiado. |
| 02-S2 `tls.mdx`, protocolos | HTTP/3 usa QUIC/UDP e segurança TLS1.3; streams não garantem menor latência em todo ambiente. | Q §§1.2/2/21.1.1; E | **Verificada**; animação não mede pacotes ou desempenho. |
| 02-S3 `tls.mdx`, intermediários | CDN pode responder sem aplicação; terminação TLS não comprova proteção de todo salto. | R §5.1.6; H intermediários; S canal entre pares | **Dependente de contexto ou versão**: composição/configuração efetiva da infraestrutura. |
| 02-R1 `rest.mdx`, restrições | REST não é pluralização; sessão conversacional no servidor viola stateless de Fielding. | R §§5.1.3–5.1.6 | **Verificada**; recursos persistidos não são sessão conversacional. |
| 02-R2 `rest.mdx`, biblioteca | Cinco operações, envelopes/IDs alternativos são contrato didático. | T1/T2; `contracts.ts` | **Verificada** no recorte após F02-01/F02-02; sem certificação REST completa. |
| 02-R3 `rest.mdx`, YAML | Path `{id}` declarado como parâmetro obrigatório;3.1.1 é recorte fixado. | O Parameter/Responses/Schema Objects | **Verificada** por inspeção normativa; validador completo OpenAPI **não executado**, pendência baixa para este fragmento introdutório. |
| 02-L1 `shell.mdx`, arquivos | `>` substitui, `>>` acrescenta; pipe transmite stdout a stdin no recorte. | Bash real/T3; exemplo publicado/T1 | **Verificada**; não se promete recuperação de arquivo real. |
| 02-L2 `shell.mdx`, processos | Variável local não é automaticamente ambiente filho; PATH é busca. | L export/type; T3 | **Verificada** em Bash5.3.9; modelo explicita mapa único e ausência de processos. |
| 02-L3 `shell.mdx`, permissões | 640 = dono rw/grupo r/outros nenhum; modelo só registra modo. | chmod640/stat em arquivo temporário; limites declarados | **Verificada** no número e distinção; ACLs/multiusuário não simulados. |
| 02-L4 terminal ligado à aula | Operadores citados devem permanecer texto. Comportamento de aspas. | Bash5.3.9/T3 e T2 | **Incorreta → Verificada** após F02-04. |
| 02-X1 `curl.mdx`, opções | --json configura envio/headers, não valida JSON; -I difere de -X HEAD. | X --json/--request/--head; T4 | **Verificada** em cURL8.18.0 no loopback. |
| 02-X2 `curl.mdx`, falha | --fail-with-body preserva body e devolve22 em404 recebido. | X --fail-with-body; T4 | **Verificada** no ensaio, sem extrapolar a falha sem resposta. |
| 02-X3 `curl.mdx`, Bruno | Collection/environment/test usam {{baseUrl}} e test/res/expect. | B páginas de testes e variables | **Dependente de contexto ou versão**: API documental conferida; UI/versão instalada não executadas. |
| 02-X4 `curl.mdx`, Docker/httpbin | Comando inicia serviço e mapeia127.0.0.1:8080; disponibilidade/imagem não testadas. | Roteiro documental externo | **Não verificada** operacionalmente; baixa, explicitamente não executado na aula e nesta revisão. |
| 02-G1 `git.mdx`, snapshots | add capturaA; editarB não altera staging; commit gravaA. Modelo e Git. | G1; T2/T3 | **Verificada**, com Git2.55.0 real. |
| 02-G2 `git.mdx`, restore | restore padrão index→working; --staged usaHEAD. | G1 DESCRIPTION; T3 | **Verificada**; descarte não é backup. |
| 02-G3 `git.mdx`, ignore | .gitignore não retira rastreados/histórico; segredo comprometido demanda resposta além de apagar texto. | G4 DESCRIPTION | **Verificada** no escopo de Git; nenhum segredo acessado/testado. |
| 02-CO1 `colaboracao.mdx`, integração | Merge divergente pode ter2pais; rebase reaplica com novas identidades. | G2 DESCRIPTION; T1/T3 | **Verificada** nos cenários locais; modelo unitário não implementa merge por linhas. |
| 02-CO2 `colaboracao.mdx`, remoto | fetch não integra; pull integra conforme opções/configuração; push não é deploy. | G3 DESCRIPTION; G4 PR | **Verificada** documentalmente e no modelo, sem remoto externo real. |
| 02-CO3 `colaboracao.mdx`, PR | Rascunho no modelo não significa PR publicado/revisado. | G4 GitHub; componentes/modelo | **Verificada** como limite do produto. GitHub/feedback externo **não verificados** nesta passagem. |

## Pendências e limites preservados

| Ponto | Gravidade / estado | Condição para resolver |
| --- | --- | --- |
| Latest/scaffolding e versões futuras | Baixa, não executado | Criar projeto na versão escolhida, registrar lockfile/ambiente e repetir fluxo; não extrapolar os builds temporários |
| Loading transitório Next e Route Handler opcional | Baixa, não observado/não executado | Introduzir atraso controlado e exercitar endpoint/segmento no projeto de estudo; não alegar verificação desses casos |
| Custo real do simulador versus algoritmo abstrato00 | Baixa, contextual | Interpretador clona dados/rastreio; não converter O(n²) abstrato em benchmark do editor; melhoria editorial específica é opcional |
| OpenAPI completo | Baixa, inspeção do fragmento realizada; validador completo não executado | Validar documento completo versionado com ferramenta apropriada antes de alegar conformidade |
| Bruno/Postman, Docker/httpbin e APIs públicas | Baixa no conhecimento introdutório delimitado; operações não verificadas | Executar versão/ambiente autorizado e confrontar resultados; documentação e mock não provam disponibilidade externa |
| DNS/TLS/CDN reais, cookies e políticas entre browsers | Baixa no recorte conceitual; não testados operacionalmente | Captura/diagnóstico controlado real, condições explícitas; não alegar medição de rede/certificado/privacidade |
| GitHub/PR/publicação/LinkedIn | Não executados; sem aprovação de entregas externas | Evidência real e autorização específica; não substituir por simulação |
| Acessibilidade integral e aprendizagem | Não certificadas | Revisão assistiva/manual e estudo com estudantes apropriados; axe e testes técnicos não substituem essas evidências |

Fontes inacessíveis foram identificadas por etapa, com alternativas primárias
realmente lidas quando disponíveis. Nenhuma pendência acima foi convertida em
“Verificada” por ausência de erro observado. A capacidade de UI não operada pelo
revisor00 é distinta das duas jornadas atuais do editor executadas pelo responsável;
nenhuma delas certifica toda a acessibilidade.

**Decisão de encerramento desta auditoria:** levantamento e correções demonstradas
concluídos, com aprovação local dos conceitos nas condições registradas e pendências
periféricas preservadas. Sem aprovação universal das aulas, sem publicação ou avanço
automático para novas etapas. Uma nova afirmação crítica não verificada reabre o gate.

## Etapa 03 — expansão e verificação independente (16–17/10/2026)

Fonte curricular integral: MCP Notion `3f63cadf-ab77-81ad-9194-c805b33198d8`,
11 seções sem paginação/filhos/truncamento pendentes. A primeira consulta do autor
foi reconferida integralmente por revisor separado. Notion define objetivos,
nove exercícios, opcionalidade e rubrica30/20/25/15/10. As23 aulas, contratos,
exemplos, projetos e decisões de organização são elaboração didática; referências
abaixo verificam conceitos, sem atribuir os exemplos ao currículo.

Pareceres com fontes efetivamente lidas, seções, versões, contraexemplos e comandos:
[PHP/Laravel](verification/stage-03-php.md) e
[Node/Express/Nest](verification/stage-03-node.md). Os revisores examinaram fontes
primárias e executaram projetos/contraensaios por conta própria. Rubrica pedagógica
por aula nesses pareceres não foi usada como prova técnica. Verificação visual em
[UI/UX03](etapa-03-uiux.md); matriz curricular e escopo em [Etapa 03](etapa-03.md).

### Matriz por aula e conceito importante

“Verificada” significa o conceito delimitado, não correção universal da aula ou de
qualquer solução do estudante. Dependências/versões e decisões locais aparecem
explicitamente; testes de exemplos fornecidos não aprovam tentativas externas.

| Aula | Conceitos confrontados | Fonte primária/seção e versão | Resultado e evidência |
| --- | --- | --- | --- |
| ciclo | Request→middleware→rota→validação→controller→response; erros de parsing/domínio | Laravel13 Request Lifecycle, Routing, Validation, Errors; HTTP da etapa02 | **Verificada** no recorte; modelo local testado com201/400/422/404/405/413/500. Não envia HTTP nem executa PHP. |
| configuracao | env/config, debug público, segredo versus log, correlação | Laravel13 Configuration/Environment Configuration/Configuration Caching, Errors/Logging | **Dependente de contexto ou versão**; API com debugfalse, middleware e log reais;500 genérico/correlação testados. Não certifica todos os dados privados de uma aplicação ampliada. |
| dependencias-testes | install/update/lock/autoload; teste finito não prova correção universal | Composer Basic Usage, Installing Dependencies/Lock; Laravel13 HTTP Tests | **Verificada**; instalação dos locks e testes reais. Ambiente/extensões continuam requisito externo. |
| php-inicio | CLI versus HTTP, abertura/echo/const/variáveis, servidor de estudo | PHP Manual CLI/Built-in Web Server/Basic Syntax | **Verificada**; PHP8.5.4 CLI executado. Instalação Windows/macOS **não verificada**. |
| php-tipos | strict por chamador, int→float, nullable/union, comparação e domínio | PHP Type Declarations/Strict Typing, Comparison Operators | **Dependente de contexto ou versão** (PHP8.3–8.5); ensaio runtime strict/comparações e classe executados. Sem equiparar a TypeScript. |
| php-colecoes | mapa ordenado, chave/valor, laços, funções/escopo, strings | PHP Arrays, foreach, Functions, Variable Scope | **Verificada**; exemplos/casos da biblioteca e CLI. Tipos de coleções e referência de foreach têm limites descritos. |
| php-dados | JSON objeto/lista, exceções, datas imutáveis, escape contextual | PHP json_decode/JSON_THROW_ON_ERROR, Throwable, DateTimeImmutable::modify, htmlspecialchars/filter_var | **Verificada**; objetoJSON não vira lista por decodificação associativa. Oito cenáriosCLI incluem erro, forma e não sobrescrever saída inválida. Escape não promete proteção universal deSQL/JS. |
| php-objetos | invariantes, visibilidade/construtor, composição/herança, interfaces/traits | PHP Classes/Interfaces/Traits; Type Declarations | **Dependente de contexto ou versão**; readonly/contratos no recorte8.3–8.5.12 verificações de classe; interface moderna não descrita como “somente métodos”. |
| composer | namespaces versus carregamento, PSR4 e estiloPSR12 | Composer Basic Usage/Autoloading; PHP-FIG PSR4§2 ePSR12 | **Verificada**; autoload instalado e classe carregada nos testes. PSR é convenção, não sintaxe obrigatória de todoPHP. |
| laravel-inicio | requisitos/scaffold, Artisan, diretórios e ponto público | Laravel13 Installation/Deployment/Request Lifecycle | **Dependente de contexto ou versão**; Laravel13.37.0/PHP8.5.4 executados. Composer/runtime diferentes; sem autenticação ou frontend obrigatório. |
| laravel-rotas | prefixo explícito, controller, binding, parâmetros e middleware | Laravel13 Routing/Route Model Binding/Middleware | **Verificada** no bootstrap fornecido; FirstRoutesTest1teste/5asserções e chamadasHTTP. JSON lista vazia200 versus recurso404. |
| laravel-validacao | mídia/sintaxe/domínio, FormRequest, PATCH parcial e campos públicos | Laravel13 Validation/Form Requests/JSON Validation Errors; Errors | **Verificada**;400/413/415/422, corpoobjeto, campos extras e não mutação.422 depende da expectativa/configuraçãoJSON; authorize não é auth pronta. |
| laravel-container | DI versus container, resolução concreta/binding, presenter/Action | Laravel13 Service Container/Automatic Injection/Singletons | **Dependente de contexto ou versão**; organização é recomendação contextual, sem Repository artificial obrigatório. Presenter unitário e aplicação real executados. |
| laravel-testes | SQLite/Eloquent/migrations, fillable versus validação, isolamento | Laravel13 Eloquent/Mass Assignment, Migrations, Database Testing/RefreshDatabase, HTTP Tests | **Verificada** no projeto;6testes/43asserções, banco teste:memory:, catálogo desenvolvimento separado. Rollback/fresh não são backup; mecanismoRefreshDatabase varia com estado. |
| node-runtime | runtime versus linguagem/framework; tipos apagados; ESM e debugging | Node24.21 TypeScript/ESM/Packages, Debugger; TS5.9 Modules/NodeNext/sourceMap | **Dependente de contexto ou versão**; tsc estrito + guard runtime executados. DebuggerGUI e geradorCLI **não executados**. Exemplo labels.ts preserva booksFrom. |
| node-io | fs/promises/await, parsing, limite após leitura, pipeline/backpressure | Node24 FS/Promises, Stream/pipeline; Event Loop/Timers | **Verificada** conceitualmente por fonte e CLI real;3testesNode incluem arquivo/erro. Pipeline é exemplo explicável, não alegado benchmark nem parserJSON em streaming; limite pósreadFile não limita memória de leitura. |
| node-http | createServer/listen/IncomingMessage/ServerResponse, porta efêmera e fechamento | Node24 HTTP/Server, Events, Test Runner, Process/Signals | **Verificada** no servidor local;200/404/405/Allow e limpeza reais. URL é literal; não prometeHEAD/query automaticamente. |
| express-middleware | ordem, parser/router/fallback, erro4args, promises retornadas, CORS/log | Express5 Using Middleware/Error Handling/Migrating5/API | **Dependente de contexto ou versão**; Express5.3.0 executado. RejeiçãoPromise não cobre timer desconectado. CORSheader testado; segurança/auth eCORSnavegadorreal não certificados. |
| express-crud | body/query/params validados, Map isolado, PATCH/DELETE e efeitoapóserro | Express5 Routing/API/Response/Router.param; códigoautoral | **Verificada** no contrato; tsc+testeHTTP e contraensaio independente. SeteIDs inválidos400;422não alteraGET,201Location,204vazio/404. Map não persiste/reparte entreprocessos. |
| nest-modulos | módulos/controller/provider, DI/metadados, adaptador e ESM | Nest12 Migration Guide/Controllers/Providers/Modules; Node24 | **Dependente de contexto ou versão**; Nest12.1.3 eTS5.9.3 compilados. Provider+HTTP reais; IDunknown conserva texto antes do pipe, guarda exige inteiro seguro positivo. |
| nest-validacao | DTOclasse/importvalor, transform/whitelist, IsOptionalnull, pipes/guards/interceptors | Nest12 Validation/Pipes/Guards/Interceptors/Controllers passthrough; class-validator | **Verificada** no recorte;2testes e contraexemplosHTTP;Location real,400/404/201/204 eestado. Guards/interceptors são exemplos conceituais, não autenticação implementada. |
| decisao | PHP-FPM/processos persistentes, eventloop, estado/contrato versus ranking | PHP-FPM Process Management/Pools; Laravel13Octane/Introduction/Dependency Injection; Node EventLoop; fontes das APIs | **Dependente de contexto ou versão**; fontes lidas por revisores separados. Recomendações arquiteturais são contextuais. Benchmark/Octane real **não executados**, sem vantagem quantitativa alegada. |
| projeto | incremento vertical, README, evidências, rubrica/ADR e teste por contexto | Notionrubrica; Laravel13 HTTP Tests/Configuration/Migrations; Composer | **Verificada** para os contratos/artefatos fornecidos; filtroex03 independeCRUD, suítecompleta oexige. InstalaçãoZIP e testes reais; aprendizagem do estudante eexecução externa declaradas, não inferidas. |

### Lacunas encontradas e correções reconferidas

| Achado | Gravidade | Correção e prova | Estado |
| --- | --- | --- | --- |
| PHP-CLI-01: objetoJSON aceito como lista ao usar decode associativo | Média | Decode conserva objeto/lista; verificação explícita; oitoCLIcasos adversos | Validado |
| LAR-TEST-01: helperJSON recebia objeto onde requerarray | Média | CorpoJSONbruto no método apropriado; suíteLaravel real | Validado |
| LAR-LOG-01: retornos antecipados sem ID/log | Média | Finalização comum após rejeição; headers/log e500 controlado | Validado |
| LAR-EX03-01: primeira atividade exigia suíteCRUD | Média | FirstRoutesTest e comando filtrado; mutação temporária comprova recorte, suíteinteira continua detectandoCRUDpendente | Validado |
| Node: exemplo substituiria books.ts; contratoCLI divergia do enunciado | Média | labels.ts separado; termoopcional/items/totalfiltrados, entrada≠saída; tsc/testCLI | Validado |
| Express: Number aceitava notação inesperada noID | Média | router.param valida léxico/inteiroseguropositivo; setecontraexemplos400 | Validado |
| Nest: transform global convertia1e0 antes doParseIntPipe | Média | unknown +pipe +guarda, regressões e ensaio independente | Validado |
| NestLocation ausente versusex06, PATCH exigido foraescopoex08, nomesrubrica divergentes | Média | Headerreal+teste, escopoGET/POSTexplicado, rótulosoriginais; releitura e testes | Validado |
| MDX interpretou chaves de @Res como expressão | Média | Código inline delimitado;23renderizações ebuild posteriores | Validado por23renderizações,366 testes ebuild subsequentes |

### Testes reais e limites

PHP:12verificações de classe +8CLI; Laravel:6testes/43asserções, filtroinicial1/5,
16ensaiosHTTP históricos e nova prova500, instalação/check-platform-reqs/ZIP
extraído. Node:3testes; Express:1testeHTTPabrangente; Nest:2testes; os três com
tsc estrito e reconferência independente. Não somar asserções a testes para
inflar cobertura. Versões/ambientes e ensaios adicionais estão nos pareceres.

Aula pronta neste recorte introdutório exige fontes, rubrica e execução pertinente;
a UI e a suíteglobal têm registros próprios. Não houve deploy, instalação em
outros SOs, teste com estudantes, certificação WCAG, carga/benchmark, autenticação,
segurança deprodução, Octane ou provauniversaldecorreção. Inspector/CLIgerador e
alguns trechos conceituais não foram executados como aplicação completa. Ausência
de evidência não é aprovação desses cenários; não são necessários para atribuir
execução aos projetos essenciais que efetivamente passaram.

### Confirmação integrada de 17/10

- `npm run typecheck`, `npm run lint` e `npm run build`: passaram. Build gera os
  cinco projetos/locks antes da compilação e mantém a base `/stacktrail/`.
- `npm test -- --maxWorkers=4`:366/366 em37 arquivos na repetição separada. Uma
  rodada anterior, com navegadores concorrentes, teve timeout em um teste antigo
  do editor; esse histórico não foi apagado nem resolvido relaxando o teste.
- Build estático:81/81 cenários Chromium passaram, incluindo23 aulas/noveexercícios
  em ambos os temas/375px/fonte 150%, três rotas legadas, cinco pacotes com locks,
  favicon/base, ciclo conceitual e503→retry. Sem erro de página nos cenários.
- UI: matriz de dez combinações/40verificações de rota passou; cinco jornadas
  de laboratório/progresso/zoom real e dois testes de contraste/fonte 90 passaram.
  Cores computadas dos controles/realce e foco foram verificadas; não é WCAG completa.

Os registros de interface e suas limitações pertencem ao QUALITY_AUDIT; nenhuma
aprovação de código do estudante é deduzida destes resultados de referência.

Varredura ampla adicional de todas as139 rotas/dois temas:277/278; erro de contexto do axe
na aula00estruturas, confirmado isoladamente2/2 nos dois temas. Não houve redução
de cobertura para obter aprovação; o histórico e os limites estão no QUALITY_AUDIT.
As três skills e o gate local foram concluídos, sem autorizar novas etapas ou deploy.

## Reorganização da Etapa 03 em duas trilhas — 17/10/2026

Esta seção supera, para o estado atual, as conclusões históricas de que PHP é
obrigatório, JS é somente opcional ou a API Laravel exige SQLite. O currículo
Notion03 foi novamente consultado integralmente via MCP (11 seções). A prioridade
PHP pertence ao original; a alternativa principal JS/TS é ampliação autorizada.
Relatório independente: [revisão final](verification/stage-03-tracks-final.md),
com rubrica por aula, fontes abertas diretamente, contraexemplos e reconferência.
Baselines PHP/JS/UI foram preservadas como histórico, não como aprovação atual.

| Aula/conceito | Fonte primária consultada e seção | Resultado/condição | Verificação prática |
| --- | --- | --- | --- |
| linguagem-runtime, ciclo | Node Introduction / PHP CLI; responsabilidades do runtime | Verificada no recorte; framework não é runtime nem DOM | health Node e Laravel, conexão local e HTTP |
| js-valores | MDN Data structures, Primitive values/Number; filter | Verificada; null/identidade/coerção e inteiro seguro explicitados | trecho MDX executado; transformação preserva origem |
| js-funcoes | MDN Modules, Classes, Closures; Node ESM | Verificada; campos # e receptor this, cópia apenas rasa | dois arquivos MDX executados, closure isolada |
| ts-contratos | TS Everyday Types, Generics, Classes | Verificada com TS5.9.3; interface/generic não validam JSON | blocos MDX compilados strict e executados |
| ts-narrowing | TS Narrowing, typeof/in/unknown | Verificada no parser publicado; não promete validador universal | parser MDX e testes unknown/null/lista/tipo/vazio |
| ts-assincrono | MDN async function/Promise.all; TS NodeNext; Node debugging | Dependente de contexto ou versão: ESM/NodeNext; Promise.all não cancela tarefas | leitura/gravação MDX; rejeições arquivo/JSON em node:test |
| node-runtime/io/http | Node ESM/fs/promises/http/test e lock local | Verificada no projeto Node24.21.0/TS5.9.3; sem garantia em todo SO | cinco testes CLI/linguagem/async/HTTP real passaram |
| express-validacao/crud | Zod4.6.7 API Objects/partial/refine; Express5 Routing | Verificada: extras removidos, PATCH vazio recusado,200codepoints explícitos | schema MDX executado; contraprovas200/201emoji, null e IDléxico |
| express-middleware/testes | Express Error handling, Promises/callbacks; Node test | Dependente de contexto ou versão: Express5 encaminha Promise retornada; timer solto exige captura | duas suítes HTTP reais, efeito após PATCH inválido e exclusão |
| laravel-inicio/rotas/validacao/container | Laravel13 installation/routing/validation/container; fontes locais controller/provider | Verificada no projeto13.37.0: catálogo injetado, sem bindingModel obrigatório | Composer/platform-reqs; PHPUnit e arquivo temporário |
| laravel-testes | PHP flock Description/Notes; Laravel HTTP Tests | Dependente de contexto ou versão: lock cooperante não é transação nem crash recovery | persistência entre instâncias, isolamento, JSON/envelope inválidos |
| laravel-testes, noções Eloquent/migrations | Laravel Eloquent/Migrations, convenções/esquema | Verificada como leitura opcional preservada; profundidade05 | não exigidos nem executados no fluxo principal |
| decisao/projeto | contratos dos projetos e documentos oficiais de ambas stacks | Verificada no escopo: um percurso basta; Map/arquivo não sustentam benchmark de linguagem | regressões de conclusão independente e evidências por trilha |
| exercícios05/08, redação anterior | config/catalog.php, TestCase e curriculum.ts | Incorreta antes: DB_DATABASE para JSON; corrigida e reconferida | instruções catalog.path, arquivo próprio e ex08extra fora da conclusão |
| progresso03 | model.ts/Provider, fonte primária local | Verificada: v6→v7 preserva legado; evidências PHP não aprovam JS | contraprovas de migração, seleção, leituras, edição e ambas conclusões |

### Correções e limites

Corrigidos comandos de banco, custo ORM/Model no caminho principal, rótulos antigos
opcionais, exemplo de módulo com execução comentada, schema manual desatualizado,
exercício de arquivo descrito como :memory: e prompt exigindo PHP para JS.
A revisão independente reconferiu as correções e não encontrou bloqueante no seu
recorte; não executou PHP/navegador em nome do autor.

Execução do autor: PHP8.5.4/Composer2.10.3 (runtime isolado, checksum oficial
conferido); biblioteca12verificações+8CLI+7funções/autoload; Laravel13.37.0,
PHPUnit12.5.40:10testes/57asserções, incluindo500semtrace e arquivo inválido preservado.
Node24.21.0/TS5.9.3:5testes; Express5.3.0/Zod4.6.7:2testes de integração HTTP.
Seis ensaios foram extraídos diretamente das MDX e executados; fragmentos
identificados como parciais não foram declarados executados isoladamente.

Windows/macOS/Herd/Laragon não foram instalados aqui. Sem ensaio de carga, crash
recovery, produção, deploy ou aprendizagem real. O arquivo vazio do catálogo é
considerado inicial: truncamento externo a zero não é detectado. O Express perde
estado ao reiniciar. Casos finitos não provam correção universal; checklists do
estudante continuam declarações. A cobertura UI e os resultados finais de build
estão em QUALITY_AUDIT e etapa-03-trilhas.

Reconferência final de execução:377testes/37arquivos da plataforma passaram,
com31MDX renderizadas e asserção de cobertura do inventário. Quinze verificações
HTTP reais adicionais passaram na API Laravel extraída doZIP, incluindo500sem
stack pública e preservação do arquivo inválido. `pdo_sqlite=no` foi observado
no runtime de teste. Os resultados de produção e outrosSO continuam não verificados.

Revisão final dos fundamentos comuns encontrou e corrigiu três dependências
indevidas: prática do ciclo sóLaravel, configuraçãoDBSQLite e comandos/setup
somenteComposer. Agora execução e preparação são alternativas por trilha;
process.env foi confrontado diretamente com documentaçãoNode24 e código dos
projetos. A revisão independente reconferiu as três aulas. Cliente de testes
Laravel e HTTPloopbackExpress são distinguidos explicitamente.38testes do recorte
passaram após as correções;318cenários globais e27casos do build final passaram.
Não há aprovação baseada somente em links ou compilação: fonte, testes e
limitações estão separados neste registro e no relatório independente.

## Etapa04 e classificação03 — 17/10/2026

Escopo:15aulas04,24atividades, modelosREST/OpenAPI e2projetos locais; correção de filtros03 sem alteração de objetivos00–02. CurrículoNotion03/04 integral consultado viaMCP; expansãoPHP/JS autorizada no pedido atual. Matriz curricular, pendências e validação final em[etapa-04.md](etapa-04.md). Builds/links/revisões anteriores não foram usados como prova desta entrega.

### Fontes primárias lidas nesta implementação

| ID | Fonte e seção | Versão / consulta |
| --- | --- | --- |
| S04-REST | [Fielding, cap5](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm), §§5.1–5.2 | Estilo REST;17/10/2026 |
| S04-HTTP | [RFC9110](https://httpwg.org/specs/rfc9110.html), §§8–9/12/15 |2022; alternativa oficialHTTPWG após erro de tamanho do RFCEditor;17/10/2026 |
| S04-PATCH | [RFC5789](https://httpwg.org/specs/rfc5789.html), §2 |2010;17/10/2026 |
| S04-PROBLEM | [RFC9457](https://www.rfc-editor.org/rfc/rfc9457.html), §§3.1/3.2/4.2.1/5 |2023;17/10/2026 |
| S04-OAS | [OpenAPI3.1.1](https://spec.openapis.org/oas/v3.1.1.html), Parameter/Reference/Response/Schema Objects |3.1.1;17/10/2026 |
| S04-L | [Routing](https://laravel.com/docs/13.x/routing), [Validation](https://laravel.com/docs/13.x/validation), [Resources](https://laravel.com/docs/13.x/eloquent-resources), [Errors](https://laravel.com/docs/13.x/errors), [HTTPTests](https://laravel.com/docs/13.x/http-tests) |Laravel13; runtime13.37.0/PHP8.5.4;17/10/2026 |
| S04-E | [Expressrouting](https://expressjs.com/en/guide/routing.html), [errorhandling](https://expressjs.com/en/guide/error-handling.html), [ZodAPI](https://zod.dev/api) |Express5.3.0/Zod4.6.7/TS5.9.3/Node24.21.0;17/10/2026 |
| S04-V | [SwaggerParserAPI](https://apidevtools.com/swagger-parser/) |Instalado13.1.0;17/10/2026 |

### Afirmações e confronto por aula/conceito

| Local04 | Afirmação/natureza | Evidência/confronto | Classificação / estado |
| --- | --- | --- | --- |
| recursos | APIJSON/verbos não prova todo REST; interface uniforme tem restrições |S04-REST§5.1.5; exemplo local não pretende implementar hipermídia completa |**Verificada**, validado documentalmente |
| metodos | Segurança/idempotência; DELETE repetido pode ter status diferente |S04-HTTP§9.2–9.3; S04-PATCH§2; modelo/API reaisDELETE→404/204conforme contrato |**Verificada**, validado no recorte |
| contratos |Ausência/null/stringvazia eheaders distintos; datas UTC de agenda fechada |S04-HTTP§8.3/12.5; contraprovaPHP revelou conversão vazio→null; middleware removido e teste próprio distingue ambos |**Dependente de contexto ou versão**, política local validada; não parser universalISO8601 |
| invariantes |Validação antecede estado; conflito sequencial não é consistência multiprocesso |Código modelo/FakeStore, fontesHTTPpara422/409; testes duplicação/cancelamento e estado após falha |**Verificada** como regra local; concorrência multiprocesso não verificada nem prometida |
| colecoes |Filtrar→ordenar→paginar; total antes do recorte; allowlist por recurso |Traço concreto e contraprovas; corrigidos status embooks/categoryembookings e/slots/1 |**Verificada** no modelo e casos locais; ranking/colation universal fora do escopo |
| problemas |Membros9457 não todos obrigatórios; status coincideHTTP; extensãoerrors e riscosstack |S04-PROBLEM§3.1/3.2/4.2.1/5; contratos nativos eProblem diferenciados |**Verificada**; implementação completa não obrigatória |
| integracoes |Timeout não prova ausência de efeito; chave/memória não garante deduplicação robusta |S04-HTTP§9.2.2 e sequência de efeitos do fake; pseudocódigo neutro com estados esperados |**Dependente de contexto ou versão**; integração real/retry externo não executados; atividade opcional |
| openapi |Especificação≠SwaggerUI; requiredpath≠requiredschema; validação estrutural≠comportamento |S04-OAS/S04-V; parser realYAML; SwaggerParser aceitou contrato; refparâmetro é nãoverificada no recorte browser |**Verificada** no recorte; refs externos e conformidade da tentativa não verificados |
| laravel-api |RegistroAPI conforme13; Resources projetam saída sem exigirEloquent |S04-LRouting/Resources; projeto com rotas próprias járegistradas; testes criação/Location/GET |**Dependente de contexto ou versão**,13.37.0 validado |
| laravel-regras |FormRequest/validated não substitui regra de disponibilidade nem rejeita todo extra implicitamente |S04-LValidation; allowlist explícita; testes campos extras, conflito e relógio |**Verificada** no projeto local |
| laravel-consultas |Fake compartilhado local conserva sessão entre requisições, não memória decontroller |ImplementaçãoJSONtemporário ePHPUnit; validações/query; comando resetdocumentado |**Verificada** no recorte; sem garantia durabilidade/transação/produção |
| express-api |Router/parser/handlers e separação de listen; saída eLocation explícitos |S04-E; testesHTTPloopback reais e tipagem estrita |**Dependente de contexto ou versão**,Express5.3.0 validado |
| express-regras |Zod runtime; Promise retornada rejeitada encaminhada emExpress5 |S04-EErrorHandling/Zod; esquema e domínio separados; erros e tiposexercitados |**Dependente de contexto ou versão**; callbacks externos não cobertos pela garantia dePromise |
| express-consultas |Query exige validação, parâmetros repetidos eestado após422 |Modelo/projeto e testesHTTP; collationPHP/JS não prometida idêntica |**Verificada** nos casos publicados |
| projeto |Uma stack suficiente; banco/segurança/deploy futuros; nota/evidência declaradas |Pedido atual,modeloprogresso8 e regressões por trilha; código do aluno não executado |**Verificada** como critério local; nota declarada não certifica correção |

### Achados, correções e revisão independente

- Filtroextra03 vazava NestPHP: disponibilidade filtrada em dados/renderização; contexto diretoNest associaJS sem apagar preferência.
- Modelo aceitava filtros de outro recurso e/slots/1; regressões corrigidas. ComprimentoUTF16 divergia deUnicode; passou a contar pontosUnicode, com contraprovasemojis.
- Primeira versãoOpenAPI só tinha typeobject para saída; acrescentadosBook/Booking/Meta/envelopes. Depois, execução revelou mídia de erro nativa não descrita:application/json/NativeError e413 documentados, preservandoRFCcompleta recomendada.
- PHPconvertia notevazia paranull; normalização ajustada e testes reconferidos. READMEExpress corrigido de8000para8001. Seleção de schemaExpress passou a respeitar rota/verbo antes da validação.
- Revisão independente consultou fontes diretamente e executou modelo,SwaggerParser,Express ePHPUnit; após correções não demonstrou bloqueante nos conceitos revisados. Revisão pedagógica separada reconferiu15aulas, exemplos/critérios/pré-requisitos; notas3/4nas dimensões pedagógicas, sem inferir aprendizagem real.
- As duas primeiras rodadas apontaram bloqueantes e **não** foram consideradas aprovação. A reconferência final removeu-os no recorte. Permanecem não verificados: concorrência distribuída, integrações externas, carga, segurança exaustiva, produção e aprendizagem com estudantes.

Resultados finais efetivamente executados, mecanismos e limites são consolidados emdocs/etapa-04.md; números intermediários não devem ser lidos como prova de uma rodada final completa.

## 17/10/2026 — StackTrail 2.0, piloto01 (supera o modelo de aulas no produto novo)

Branch `feat/practice-first-roadmap`. O novo cliente contém orientação, fontes e
prática, sem aulas explicativas, simuladores de ensino ou projetos resolvidos.
As verificações antigas acima descrevem o legado; não aprovam este piloto por
herança. Relatório completo e matriz de fontes:
[PRACTICE_FIRST_MIGRATION.md](PRACTICE_FIRST_MIGRATION.md).

### Evidências de curadoria e revisão independente

Página01 original lida integralmente via MCP do Notion; auditoria do roadmap.sh
consultada como complemento. Currículo define objetivos/progressão, não prova técnica.
Root consultou fontes diretamente e houve revisão independente de curadoria e
pedagogia.38 referências e dois catálogos comerciais, com recorte, idioma, versão,
custo e datas; URLs/finais/status/cabeçalhos em [REFERENCE_LINK_CHECK.json](REFERENCE_LINK_CHECK.json).
40/40 retornaram200 na execução GET. Corpo/recorte foram consultados separadamente;
HTTP200 não valida adequação, idioma nem todos os exemplos.

| Conceito / decisão | Fonte e seção efetivamente consultada | Classificação e limite |
| --- | --- | --- |
| Formulários acessíveis e feedback | W3C WAI Forms: Labeling Controls, Instructions, Validation, Notifications; MDN HTML/forms | Verificada no recorte. Índice PT não garante todos os filhos. |
| CSS além de Flex/Grid | MDN Styling basics, Handling conflicts, Box model, Values and units e Pseudo-classes | Verificada no recorte. Unidades EN e títulos parciais EN identificados. Data inválida da página de pseudo-classes não usada como evidência. |
| Preparação, compilação, módulos e strict TS | TypeScript Download / The Basics / Modules / strict / Everyday Types / Narrowing | Dependente de contexto ou versão. Handbook corrente já inclui6.0; instalado5.9.3. Não há bootstrap resolvido no novo cliente. |
| DOM, formulários e URL | MDN DOM / Using FormData Objects / URLSearchParams / encodeURIComponent | Verificada no recorte. FormData é fonteEN; observar contrato do serviço, não pressupor mesmo formato que JSON. |
| Fetch resolvido não implica sucesso HTTP; credenciais dependem de opções/políticas | MDN EN Using Fetch: Checking response status / Including credentials | Verificada. A traduçãoPT examinada contém generalizações antigas; não foi recomendada integralmente. |
| Promessas e erros | MDN EN Using promises e Promise, estados/encadeamento | Verificada no recorte. TraduçõesPT examinadas têm confusões resolved/settled e ordem; EN selecionada. |
| CORS/preflight | MDN EN CORS: functional overview / preflight | Verificada. TraduçãoPT atribui envio pós-preflight ao servidor; EN selecionada. CORS não substitui autorização. |
| Persistência por origem/aba e restrições de armazenamento | MDN PT Storage + EN localStorage/sessionStorage | Dependente de contexto/política do navegador. Não prometer durabilidade/sincronização. |
| Cookies e segredos | MDN EN Using HTTP cookies, segurança/atributos | Verificada no recorte introdutório. Autenticação/segurança profunda permanecem futuras; nenhum segredo usado. |
| Evidência de requisição | Chrome DevTools Network: status/headers/payload/resposta e falhas | Dependente de versão/contexto. CorpoPT; tradução automática identificada. Captura do estudante é declarada, não conferida pelo site. |
| Commits locais sem exigir colaboração02 | Pro Git2ªedição onlinePT, §2.2 Gravando Alterações | Verificada a ponte. Não exigir Git avançado neste piloto. |
| Mock por GUI sem construir backend | Mockoon HTTP routes / Multiple responses / CRUD routes | Verificada capacidade documental; não executada a ferramenta. HTTP routes simples são stateless; coleção alterável usa CRUD.409 pode ser alternado para observar cliente, não comprova regra de concorrência. |
| Frameworks opcionais | Tailwind4.3 Vite; ReactPT quickstart19.2; Next AppRouter Server/Client | Dependente de versão. Next número exato não confirmado; comparação com versão local necessária. Nenhum deles bloqueia base. |
| Livros e autoria | Novatec Aprendendo TypeScript (Josh Goldberg,2022) e LógicaJS2ªed (Edécio F. Iepsen,2022), catálogos/sumários | Verificados dados bibliográficos indicados; qualidade integral/texto não lidos. Não inventada edição do primeiro, ISBN ou preço. Compra opcional; capítulos backend do segundo fora01. |
| Candidata de cursoPT redirecionada para homepage | Microsoft Learn path antigo → typescriptlang.org | Incorreta a indicação como cursoPT; rejeitada. CandidatasPT inacessíveis ficam não verificadas, sem inferir inexistência. |

### Correções e testes executados

Revisão pedagógica independente apresentou lacunas antes das correções: fontes CSS,
bootstrapTS, APIs de formulário/URLs, DevTools/cookies, ambiente de mock, ponteGit e
rubrica/aplicabilidade. Fontes consultadas acrescentadas, requisitos de ambiente
esclarecidos sem tutorial/gabarito, objetivos observáveis e entregáveis apresentados.
Contratos e IDs dos nove originais preservados; extras e integrador são elaboração
original autorizada. Não há solução completa nos arquivos do novo piloto; fontes e
projetos resolvidos anteriores permanecem separados no legado.

Executados: typecheck; testes globais407/407 em40arquivos com dois workers;
build principal e legado; sete novos testes unitários significativos de correspondência,
DAG de pré-requisitos, gates, invalidação de revisão, imports malformados, arquivo
legado e prompts; sete jornadas Playwright no build estático passaram após correções;
checkerGET40/40 e checker do build com cinco arquivos sem ZIP/MDX/study/entrylegado.
Lint teve inicialmente no-undef no novo checker Node; globals explícitos corrigidos
e reconferência final registrada no relatório de qualidade. Não se validou atividade
do estudante por build nem se executou código dele.

Pendências: textos integrais dos livros, todos os exemplos externos/artigos filhos,
Mockoon/serviços reais do estudante, revisões por IA externas, aprendizagem real,
assistivas reais e novas versões futuras. Esses limites não viram aprovação tácita.
Não houve commit, push, deploy ou modificação no Notion; outras19 etapas não migradas.

Compatibilidade conservadora: checklists/conclusões só são transportados para o piloto
no snapshot legado v8 inventariado. Versões1–7 preservam rascunhos e reflexão, mas
requerem reconferir os critérios atuais; registros originais ficam intactos no arquivo legado.

Reconferência técnica final: a revisão independente apontou ambiguidade no cenário
Mockoon409 e preparação Git insuficiente. Consultadas diretamente as seções CRUD
route differences / Overriding a CRUD route e Pro Git1.5/1.6/2.1. Enunciados agora
separam respostaHTTP configurável/sobrescrita de coleçãoCRUD, cujo status é automático;
Git inclui instalação, identidade e inicialização, sem exigir colaboração02.
O catálogo final tem38recursos e dois catálogos de livros; checker final40/40.
Não foi executado Mockoon: verificação é documental, não ensaio do serviço do aluno.

Suspeita de escapes no prompt foi investigada: teste executado confirmou mais de30
linhas reais e ausência de barra+n literal, além da captura real do modal. Achado
não confirmado; não se alterou um gerador correto só para concordar com o relatório.

**Fechamento executado:** rodada final do piloto9/9Playwright passou, além de
96visitas de rotas/temas comaxe e50combinações de reflow. Um smoke do legado passou
separadamente. Lint/typecheck/407testes globais/build/isolamento de assets passaram;
GETfinal40/40. Falhas intermediárias e limites estão no relatório. As verificações
não executam nem certificam os projetos do estudante.


## Consolidação00/01 — 17/10/2026

Leitura integral do Notion00/01 e fontes novas diretamente consultadas; fontes01 preservadas da curadoria piloto, sem presumir que GET revalide conteúdo. [Relatório](CONSOLIDATION_00_01.md) registra achados, correções, versões, autoria e limitações. A classificação vale para adequação da orientação ao recorte, não aprovação automática de toda afirmação dos materiais externos. Fontes legadas e documentação viva exigem contexto/versão; uma linguagem usada na referência00 não é requisito do estudante.

| Etapa / conceito | Fonte e seção consultada | Resultado | Evidência / limite |
| --- | --- | --- | --- |
| 00 · Decomposição | [CS Unplugged · Computational thinking](https://www.csunplugged.org/en/computational-thinking/) · Decomposição, padrões, abstração, algoritmos e avaliação | Verificada no recorte de orientação | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Reconhecimento de padrões | [CS Unplugged · Computational thinking](https://www.csunplugged.org/en/computational-thinking/) · Decomposição, padrões, abstração, algoritmos e avaliação | Verificada no recorte de orientação | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Abstração | [CS Unplugged · Computational thinking](https://www.csunplugged.org/en/computational-thinking/) · Decomposição, padrões, abstração, algoritmos e avaliação | Verificada no recorte de orientação | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Algoritmos | [CS Unplugged · Computational thinking](https://www.csunplugged.org/en/computational-thinking/) · Decomposição, padrões, abstração, algoritmos e avaliação<br>[IMD/UFRN · Pseudocódigo](https://materialpublic.imd.ufrn.br/curso/disciplina/4/70/4/4) · Representação de algoritmos em pseudocódigo | Verificada no recorte de orientação | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Pseudocódigo | [IMD/UFRN · Pseudocódigo](https://materialpublic.imd.ufrn.br/curso/disciplina/4/70/4/4) · Representação de algoritmos em pseudocódigo | Verificada no recorte de orientação | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Fluxogramas | [UVV · Símbolos em fluxogramas](https://disciplinas.uvv.br/assets/disciplinas/fundcomp/guia_rapido_fluxograma.pdf) · Guia de convenções; p.3 processamento/sub-rotina e p.4 decisões/fluxos<br>[IMD/UFRN · Pseudocódigo](https://materialpublic.imd.ufrn.br/curso/disciplina/4/70/4/4) · Representação de algoritmos em pseudocódigo | Verificada no recorte de orientação | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Variáveis | [IME-USP · Pense Python: conceitos](https://panda.ime.usp.br/pensepy/static/pensepy/02-Conceitos/conceitos.html) · Variáveis, expressões e atribuição | Dependente de contexto/edição | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Condicionais | [IME-USP · Seleção](https://panda.ime.usp.br/pensepy/static/pensepy/06-Selecao/selecao.html) · Expressões booleanas e seleção | Dependente de contexto/edição | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Repetições | [IME-USP · Iteração](https://panda.ime.usp.br/pensepy/static/pensepy/07-Iteracao/maisiteracao.html) · Repetições, estado e término | Dependente de contexto/edição | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Funções e sub-rotinas | [IME-USP · Funções](https://panda.ime.usp.br/pensepy/static/pensepy/05-Funcoes/funcoes.html) · Parâmetros, composição e funções<br>[IMD/UFRN · Pseudocódigo](https://materialpublic.imd.ufrn.br/curso/disciplina/4/70/4/4) · Representação de algoritmos em pseudocódigo | Dependente de contexto/edição | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Vetores | [IME-USP · Listas](https://panda.ime.usp.br/pensepy/static/pensepy/09-Listas/listas.html) · Coleções, índices e percurso | Dependente de contexto/edição | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Busca | [IME-USP · Busca sequencial](https://panda.ime.usp.br/pythonds/static/pythonds_pt/05-OrdenacaoBusca/BuscaSequencial.html) · Busca e ausência de elemento<br>[IME-USP · Busca binária](https://panda.ime.usp.br/pythonds/static/pythonds_pt/05-OrdenacaoBusca/BuscaBinaria.html) · Ordenação prévia e redução do intervalo | Dependente de contexto/edição | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Ordenação | [IME-USP · Ordenação por seleção](https://panda.ime.usp.br/pythonds/static/pythonds_pt/05-OrdenacaoBusca/AOrdenacaoPorSelecao.html) · Ordenação e custo | Dependente de contexto/edição | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Recursão introdutória | [IME-USP · Três leis da recursão](https://panda.ime.usp.br/pythonds/static/pythonds_pt/04-Recursao/03-tresLeis.html) · Caso-base, progresso e chamadas | Dependente de contexto/edição | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 00 · Complexidade básica | [IME-USP · Notação Big O](https://panda.ime.usp.br/pythonds/static/pythonds_pt/02-AnaliseDeAlgoritmos/BigONotation.html) · Crescimento, operação dominante e limites assintóticos<br>[IME-USP · Busca sequencial](https://panda.ime.usp.br/pythonds/static/pythonds_pt/05-OrdenacaoBusca/BuscaSequencial.html) · Busca e ausência de elemento<br>[IME-USP · Busca binária](https://panda.ime.usp.br/pythonds/static/pythonds_pt/05-OrdenacaoBusca/BuscaBinaria.html) · Ordenação prévia e redução do intervalo | Dependente de contexto/edição | Objetivo e critério em src/practice/stage-zero.ts; sem execução de tentativa do estudante. |
| 01 · Arquivos e organização frontend | [MDN · Lidando com arquivos](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files) · Estrutura e caminhos relativos<br>[TypeScript · Preparar ambiente](https://www.typescriptlang.org/download/) · Instalação por projeto e compilador<br>[TypeScript · The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) · tsc, emissão e strict<br>[Pro Git · Preparar o primeiro repositório](https://git-scm.com/book/pt-br/v2) · Seções 1.5 (instalação), 1.6 (identidade) e 2.1 (repositório) | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 01 · HTML e formulários acessíveis | [MDN · HTML básico](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax) · Estrutura e sintaxe HTML<br>[MDN · Formulários web](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Forms) · Índice de estrutura, controles e validação<br>[W3C WAI · Formulários acessíveis](https://www.w3.org/WAI/tutorials/forms/) · Rótulos, instruções, validação e notificações | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 01 · CSS e layout responsivo | [MDN · Primeiros passos com CSS](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics) · Sintaxe e seletores; índice de estudo<br>[MDN · Cascata, especificidade e herança](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts) · Prioridade e herança das regras<br>[MDN · Modelo de caixas](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Box_model) · Dimensões, padding, borda e margem<br>[MDN · CSS values and units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units) · Unidades e valores CSS<br>[MDN · Pseudo-classes](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Reference/Selectors/Pseudo-classes) · Estados de interação: foco, hover e checked<br>[MDN · Conceitos de Flexbox](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts) · Eixos, quebra e alinhamento<br>[MDN · Conceitos de Grid](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Guides/Grid_layout/Basic_concepts) · Trilhas, linhas, células e áreas | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 01 · Base JavaScript em TypeScript | [TypeScript · Preparar ambiente](https://www.typescriptlang.org/download/) · Instalação por projeto e compilador<br>[TypeScript · The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) · tsc, emissão e strict<br>[MDN · Funções](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Functions) · Declaração, parâmetros e retorno<br>[MDN · Controle de fluxo e erros](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) · Condicionais e tratamento de exceções<br>[TypeScript · Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) · Arrays, objetos, funções, uniões e anotações<br>[TypeScript · strict](https://www.typescriptlang.org/tsconfig/strict.html) · Opção strict e condições de versão<br>[TypeScript · Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html) · import/export e configuração do ambiente<br>[Pro Git · Preparar o primeiro repositório](https://git-scm.com/book/pt-br/v2) · Seções 1.5 (instalação), 1.6 (identidade) e 2.1 (repositório)<br>[Pro Git · Gravando alterações](https://git-scm.com/book/pt-br/v2/Fundamentos-do-Git-Gravando-Altera%C3%A7%C3%B5es-no-Reposit%C3%B3rio) · status, staging e commit local | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 01 · Tipos e validação de dados | [TypeScript · Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) · Arrays, objetos, funções, uniões e anotações<br>[TypeScript · Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) · Guardas e refinamento de tipos<br>[TypeScript · strict](https://www.typescriptlang.org/tsconfig/strict.html) · Opção strict e condições de versão<br>[TypeScript · Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) · Funções e restrições genéricas básicas<br>[TypeScript · Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) · Partial, Pick, Omit e Record | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 01 · Módulos e organização | [TypeScript · Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html) · import/export e configuração do ambiente<br>[MDN · Lidando com arquivos](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files) · Estrutura e caminhos relativos | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 01 · JSON e contratos de dados | [MDN · Working with JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) · Dados JSON, parsing e serialização<br>[TypeScript · Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) · Guardas e refinamento de tipos<br>[MDN · Using FormData Objects](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects) · Construção e envio de FormData | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 01 · DOM e eventos | [MDN · DOM](https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model) · Introdução e interfaces de documentos<br>[MDN · Using FormData Objects](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects) · Construção e envio de FormData<br>[W3C WAI · Formulários acessíveis](https://www.w3.org/WAI/tutorials/forms/) · Rótulos, instruções, validação e notificações | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 01 · Assincronismo | [MDN · Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) · Encadeamento e propagação de erros<br>[MDN · Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) · Resposta, status, JSON, erros e credenciais | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 01 · Navegador e API | [MDN · Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) · Resposta, status, JSON, erros e credenciais<br>[MDN · URLSearchParams](https://developer.mozilla.org/pt-BR/docs/Web/API/URLSearchParams) · Métodos, parâmetros repetidos e serialização<br>[MDN · encodeURIComponent](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) · Codificação de componente de URI<br>[Chrome DevTools · Inspecionar rede](https://developer.chrome.com/docs/devtools/network?hl=pt-br) · Headers, status, payload, respostas e falhas<br>[MDN · CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) · Preflight e requisições com credenciais<br>[Mockoon · Rotas HTTP](https://mockoon.com/docs/latest/api-endpoints/http-routes/) · Configuração de método, caminho, status e resposta<br>[Mockoon · Múltiplas respostas](https://mockoon.com/docs/latest/route-responses/multiple-responses/) · Alternar sucesso, conflito e falha<br>[Mockoon · Rotas CRUD](https://mockoon.com/docs/latest/api-endpoints/crud-routes/) · Coleção de estudo para GET, POST, PATCH e DELETE | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 01 · Armazenamento e limites do cliente | [MDN · Web Storage](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API) · APIs de armazenamento por chave<br>[MDN · localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) · Persistência, origem e exceções<br>[MDN · sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) · Origem, aba, recarga e restauração<br>[MDN · Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies) · Atributos e restrições de segurança<br>[MDN · CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) · Preflight e requisições com credenciais<br>[MDN · Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) · Resposta, status, JSON, erros e credenciais | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 01 · Tailwind após CSS | [Tailwind · Instalação com Vite](https://tailwindcss.com/docs/installation/using-vite) · Integração com Vite | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 01 · React | [React · Início rápido](https://pt-br.react.dev/learn) · Componentes, eventos e estado | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 01 · Next.js | [Next.js · Server e Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) · Fronteira servidor/cliente no App Router | Verificada no recorte de orientação | Objetivo e critério em src/practice/curriculum.ts; sem execução de tentativa do estudante. |
| 00 · Livro opcional: Entendendo Algoritmos (2ª ed.) | [Editora Novatec — Entendendo Algoritmos, 2ª edição brasileira (2026)](https://novatec.com.br/livros/entendendo-algoritmos-2ed/), ISBN 978-85-7522-929-3; capa ampliada oficial (`capa-ampliada-9788575229293.webp`) | Verificada no catálogo da editora | Capa salva em `public-roadmap/covers/entendendo-algoritmos-2ed.webp` (470×650 px); obra integral não lida; sem preço ou link de compra. |
| 01 · Livro opcional: Aprendendo TypeScript | [Editora Novatec — Aprendendo TypeScript (2022)](https://novatec.com.br/livros/aprendendo-typescript/), ISBN 978-65-86057-99-7; capa ampliada oficial (`capa-ampliada-9786586057997.webp`) | Verificada no catálogo da editora | Capa salva em `public-roadmap/covers/aprendendo-typescript.webp` (292×398 px); número da edição não informado na página da editora; obra integral não lida; sem preço ou link de compra. |
| 01 · Livro opcional: Lógica de Programação e Algoritmos com JavaScript (2ª ed.) | [Editora Novatec — Lógica de Programação e Algoritmos com JavaScript, 2ª edição (2022)](https://novatec.com.br/livros/logica-programacao-algoritmos-com-javascript-2ed/), ISBN 978-65-86057-90-4; capa ampliada oficial (`capa-ampliada-9786586057904.webp`) | Verificada no catálogo da editora | Capa salva em `public-roadmap/covers/logica-programacao-javascript-2ed.webp` (292×419 px); obra integral não lida; sem preço ou link de compra. |
| 02 · HTTP, redes, terminal e Git | [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) · Métodos, status, headers e cache<br>[MDN — HTTP Overview, Status, Headers, Caching, CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview)<br>[Pro Git PT-BR](https://git-scm.com/book/pt-br/v2) · Branches, merge e conflitos<br>[Everything curl](https://everything.curl.dev/http/requests.html) e [Bruno Docs](https://docs.usebruno.com/) | Verificada no recorte de orientação | Objetivos, critérios, 9 exercícios e 3 projetos em `src/practice/stage-two.ts`; 5 capas Novatec salvas em `public-roadmap/covers/`. |
| 03 · Fundamentos comuns de backend | [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html) · Semântica HTTP<br>[MDN — HTTP Messages, Status, Headers, CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Messages)<br>[Semantic Versioning 2.0.0](https://semver.org/lang/pt-BR/) · Versionamento semântico | Verificada no recorte de orientação | 6 tópicos comuns (`03-linguagem-runtime-framework`, `03-ciclo-requisicao`, `03-configuracao-dependencias`, `03-validacao-erros`, `03-organizacao-testes`, `03-seguranca-introdutoria`) em `src/practice/stage-three.ts`. |
| 03 · Trilha A: PHP moderno (PHP 8.x, Composer, PSR-4, PSR-12) | [Manual do PHP PT-BR — Tipos, strict_types, OO, Exceções e Servidor Embutido](https://www.php.net/manual/pt_BR/language.types.declarations.php)<br>[Composer Docs — Basic Usage](https://getcomposer.org/doc/01-basic-usage.md)<br>[PHP-FIG — PSR-4 Autoloader](https://www.php-fig.org/psr/psr-4/) e [PSR-12 Coding Style](https://www.php-fig.org/psr/psr-12/) | Verificada no recorte de orientação | 5 tópicos de PHP moderno e 3 exercícios iniciais (`03-php-01..03`) em `src/practice/stage-three.ts`; `strict_types=1` exigido por arquivo. |
| 03 · Trilha A: Laravel 12.x | [Laravel 12.x Docs — Structure, Lifecycle, Routing, Controllers, Requests, Validation, Eloquent Resources, Middleware, Configuration, Errors, Logging, HTTP Tests](https://laravel.com/docs/12.x/lifecycle) | Verificada no recorte de orientação | 7 tópicos de Laravel e 3 exercícios intermediários (`03-php-04..06`) em `src/practice/stage-three.ts`; ressalva explícita para enviar header `Accept: application/json` em rotas de API. |
| 03 · Trilha B: TypeScript e Node.js no backend | [TypeScript Handbook — Everyday Types, Narrowing, Modules, tsconfig](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)<br>[Node.js Docs — Introduction, Event Loop, Env, FS, HTTP, ESM](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)<br>[npm Docs — package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) | Verificada no recorte de orientação | 3 tópicos de TypeScript, 5 de Node.js e 3 exercícios iniciais (`03-ts-01..03`) em `src/practice/stage-three.ts`. |
| 03 · Trilha B: Express, Zod e NestJS (Opcional) | [Express Guide — Routing, Writing Middleware, Using Middleware, Error Handling](https://expressjs.com/en/guide/error-handling.html)<br>[Zod Docs](https://zod.dev/)<br>[NestJS Docs — First Steps, Controllers, Providers, Validation](https://docs.nestjs.com/first-steps) | Verificada no recorte de orientação | 4 tópicos de Express, 1 tópico opcional de NestJS (`03-nestjs-opcional`), 3 exercícios intermediários (`03-ts-04..06`) e 1 extra opcional de NestJS (`03-ts-extra-nest`) em `src/practice/stage-three.ts`; assinatura de 4 parâmetros `(err, req, res, next)` explicitada no Express. |
| 03 · Livros opcionais da Etapa 03 (Trilhas PHP e TypeScript) | [Novatec — Aprendendo PHP (2016)](https://novatec.com.br/livros/aprendendo-php/) (ISBN 978-85-7522-527-1)<br>[Novatec — PHP Moderno (2015)](https://novatec.com.br/livros/php-moderno/) (ISBN 978-85-7522-450-2)<br>[Novatec — Desenvolvendo Web Sites com PHP, 3ª ed. (2017)](https://novatec.com.br/livros/desenvolvendo-websites-com-php-3ed/) (ISBN 978-85-7522-531-8)<br>[Novatec — Aprendendo Node, 2ª ed. (2017)](https://novatec.com.br/livros/aprendendo-node-2ed/) (ISBN 978-85-7522-542-4)<br>[Novatec — Node.js Essencial (2016)](https://novatec.com.br/livros/nodejs-essencial/) (ISBN 978-85-7522-476-2) | Verificada no catálogo da editora | 5 capas oficiais WebP salvas em `public-roadmap/covers/`; obras integrais não lidas; sem preços ou links de compra. |
| 04 · Fundamentos comuns de APIs REST e semântica HTTP | [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) · Métodos seguros e idempotentes, status codes (200, 201, 204, 400, 404, 409, 422, 429, 500, 502, 503, 504), headers (Content-Type, Accept, Location)<br>[MDN — HTTP Status Codes](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status) · Semântica de erros de validação (422) vs conflito de estado de negócio (409) | Verificada no recorte de orientação | 6 tópicos comuns (`04-contratos-recursos`, `04-validacao-regras`, `04-paginacao-filtros`, `04-erros-rfc9457`, `04-idempotencia-timeouts`, `04-documentacao-openapi`) em `src/practice/stage-four.ts`. |
| 04 · Erros padronizados (RFC 9457 Problem Details) | [RFC 9457 — Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html) · type, title, status, detail, instance; cabeçalho `application/problem+json`; extensões não-normativas como `errors` | Verificada no recorte de orientação | Coberto no tópico `04-erros-rfc9457` e exercitado em `04-ex-05` com testes de contrato HTTP. |
| 04 · Documentação OpenAPI 3.1 | [OpenAPI Specification v3.1.1](https://spec.openapis.org/oas/v3.1.1.html) · paths, operations, parameters, requestBody, responses, schemas (JSON Schema 2020-12 alignment) | Verificada no recorte de orientação | Coberto no tópico `04-documentacao-openapi`, exercitado em `04-ex-06` e entregável formal do projeto `04-project-booking-api`. |
| 04 · Trilha A: Laravel 12.x APIs e validação | [Laravel 12.x Docs — Routing & API](https://laravel.com/docs/12.x/routing)<br>[Laravel 12.x Docs — Validation (Form Requests)](https://laravel.com/docs/12.x/validation)<br>[Laravel 12.x Docs — Eloquent: API Resources](https://laravel.com/docs/12.x/eloquent-resources)<br>[Laravel 12.x Docs — Error Handling](https://laravel.com/docs/12.x/errors)<br>[Laravel 12.x Docs — HTTP Tests](https://laravel.com/docs/12.x/http-tests) | Verificada no recorte de orientação | 3 tópicos específicos de Laravel (`04-laravel-recursos`, `04-laravel-form-requests`, `04-laravel-testes-http`) e 3 exercícios intermediários (`04-ex-04`, `04-ex-05`, `04-ex-06`) em `src/practice/stage-four.ts`. |
| 04 · Trilha B: Express, Zod e Testes HTTP | [Express Docs — Routing](https://expressjs.com/en/guide/routing.html)<br>[Express Docs — Error Handling](https://expressjs.com/en/guide/error-handling.html)<br>[Zod Docs — Schema Validation](https://zod.dev/)<br>[Node.js Test Runner / Supertest](https://nodejs.org/api/test.html) | Verificada no recorte de orientação | 3 tópicos específicos de Express (`04-express-recursos`, `04-express-zod-regras`, `04-express-testes-http`) e 3 exercícios intermediários correspondentes em `src/practice/stage-four.ts`. |
| 04 · Livros opcionais e transversais | [Novatec — Fundamentos de Engenharia de Software (2023)](https://novatec.com.br/livros/fundamentos-engenharia-software/) (ISBN 978-85-7522-861-6)<br>[Novatec — Aprenda Node.js com Projetos Práticos (2024)](https://novatec.com.br/livros/aprenda-node-js-projetos-praticos/) (ISBN 978-85-7522-895-1)<br>[Novatec — Fundamentos de Arquitetura de Software, 2ª ed. (2025)](https://novatec.com.br/livros/fundamentos-de-arquitetura-de-software-2ed/) (ISBN 978-85-7522-920-0)<br>Livros transversais reaproveitados: *Dominando Estilos de APIs*, *Construindo Sistemas Seguros e Resilientes*, *Desenvolvendo com Laravel* e *Programação Web com Node e Express* | Verificada no catálogo da editora | 3 capas oficiais WebP adicionadas em `public-roadmap/covers/`; 4 livros transversais reutilizados via `stageIds: ['02', '03', '04']` sem duplicação de entidades. |
| Reorganização do Catálogo de Livros e Referências | Isolamento por etapa selecionada (sem opção global 'Todos' despejando as 20 etapas simultaneamente); recuperação por link/parâmetro URL `?etapa=XX`, preferência salva em `localStorage` (`catalogStage`), etapa ativa em andamento ou fallback '00'; filtros complementares (tipo, trilha, idioma, acesso, busca textual) com botão de limpeza que preserva a etapa selecionada. | Verificada e coberta por testes automatizados | Implementado em `src/practice/StudyPages.tsx` e `src/practice/progress.tsx`; validado em `src/tests/stage-four.test.ts` e `e2e/practice.spec.ts`. |

