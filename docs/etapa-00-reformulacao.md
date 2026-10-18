> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](README.md) e o [estado atual](../README.md). Resultados antigos não validam automaticamente a plataforma atual.

# Etapa 00 — reformulação aprofundada

## Fontes consultadas e escopo

Em 14/10/2026, o conector Notion foi descoberto pela lista real de ferramentas e usado somente para leitura:

- Principal: https://app.notion.com/p/3f53cadfab778127857ef57e2220f721
- Etapa 00: https://app.notion.com/p/3f53cadfab77814bbaf1de279833217b

A Etapa 00 foi recebida integralmente, incluindo detalhes, sem indicação de truncamento ou blocos desconhecidos. Inventário: quatro pilares; reformular o enunciado; entradas, saídas, restrições e exemplos; decomposição; fluxograma/pseudocódigo; teste de mesa e limites; implementação simples; custo introdutório; refatoração; método de resolução; condicionais/laços, coleções, busca, ordenação, frequência, duplicados e recursão; evidências e comunicação. Os problemas de engenharia Pleno/Sênior continuam contexto futuro, sem implementação nesta entrega. Fontes indicadas: VisuAlgo e Entendendo Algoritmos (editora Novatec).

A fonte não determina oito módulos, pesos de rubrica ou este banco de desafios. Essa organização e seu aprofundamento seguem o pedido atual do usuário; textos, exemplos e contratos são elaboração didática. As regras do interpretador são especificação própria, coberta pelos testes locais. Não se afirma que os links de apoio foram auditados nem que todas as explicações foram verificadas externamente.

## Plano executado e arquitetura

1. Preservar alterações locais, componentes, SVG e identidade visual.
2. Acrescentar barra contextual, exclusão consistente, teclado e histórico limitado a 50 estados.
3. Estender model.ts, interpreter.ts e parseAlgorithm com assinaturas, chamadas, retorno, quadros locais e limites globais.
4. Isolar assinaturas em FunctionControls; permitir alternar entre principal e corpos de funções.
5. Criar conteúdo versionado em deep-curriculum.ts e dez novas aulas MDX. Reutilizar FlowEditor e ExecutionPanel em FlowPractice.
6. Ampliar laboratório e filtragem por módulo; preservar IDs e critérios antigos, calcular progresso com denominadores atuais.
7. Verificar comportamento, persistência, build, lint e apresentação no navegador.

Rotas mantêm HashRouter e base /stacktrail/ para GitHub Pages. Nenhuma dependência foi instalada; não há backend ou deploy.

## Inventário atual

| Módulo | Aulas / aplicações |
| --- | --- |
| 1 — Fundamentos | Sete aulas originais: pilares, modelos, fluxogramas e testes de mesa |
| 2 — Estado e expressões | Variáveis, constantes, tipos, precedência, lógica booleana e conversão |
| 3 — Condicionais | Validação, encadeamento, aninhamento e caminhos completos |
| 4 — Repetições | Condição inicial/final, contadores, acumuladores e parada |
| 5 — Coleções | Vetores, extremos, soma/média, ocorrências, matrizes e laços aninhados |
| 6 — Sub-rotinas | Função, procedimento, assinatura, argumentos, retorno, locais, composição e recursão opcional |
| 7 — Algoritmos | Linear/binária, frequência, duplicados, ordenação e custo introdutório |
| 8 — Integração | Decomposição em funções, testes, depuração, refatoração e comunicação |

19 aulas, 18 obrigatórias; 29 desafios de laboratório, 23 de base e seis opcionais. Um desafio narrativo e 28 visuais: 96,6% do laboratório usa fluxogramas. Nas aulas há 87 atividades visuais: 27 nos nove componentes de aulas anteriores e 60 nos vinte contratos novos, sempre completar/corrigir/construir. Mesmo contando conservadoramente nove perguntas finais como práticas textuais, 115 de 125 atividades (92%) são visuais. Demonstrações não entram nessa conta.

Os nove exercícios e IDs anteriores permanecem. Novos assuntos: expressões, validação, acumuladores, contagem, extremos, frequência, duplicados, matriz, função calcularMedia, procedimento, composição, recursão, busca linear, ordenação, integração, lógica, conversão, condição final, mínimo e média de vetor. Cada contrato publica tipos, entradas, saídas, restrições, assinaturas quando existem, casos e três dicas graduais.

## Semântica e segurança

- Grafos versão 1 antigos continuam válidos; functions é opcional. Não há conversão destrutiva dos grafos existentes.
- Cada definição possui id, parameters, locals, returnType opcional e algorithm próprio. Definições pertencem ao principal.
- Argumentos são avaliados no chamador e copiados; uma chamada cria novo quadro. Não há leitura implícita de variáveis do principal nem variáveis globais compartilhadas.
- Função com valor exige retorno em todos os caminhos terminais; procedimento encerra sem valor. Entrada/saída externa pertence ao principal.
- Tipos e aridade são verificados antes da execução. Retornos e limites numéricos/coleções também são verificados em runtime.
- Rastreamento inclui argumento na chamada, corpo, variáveis, pilha, retorno e continuação.
- Limites: 120 blocos/240 conexões por grafo, 16 funções, até 16 argumentos de chamada, 2000 passos e iterações globais, pilha de até 24 níveis incluindo principal, vetores até 100 itens e matrizes retangulares até 20 × 20.
- Sem eval, Function, execução de JavaScript colado ou chamadas remotas.
- Os casos de funções publicam chamadas exigidas; o avaliador confere no rastreamento se elas ocorreram, inclusive em procedimentos sem efeito visível na saída. Passar nos casos publicados é evidência finita, não prova universal. Checklist/reflexão continuam autoavaliações.

## Persistência e compatibilidade

A chave global e o esquema v4 permanecem, com leitura/migração das versões anteriores já existentes. IDs, rascunhos, competências e anotações anteriores não foram removidos. A expansão aumenta o denominador e acrescenta desafios obrigatórios; portanto uma porcentagem antiga pode diminuir sem perda dos dados. Resultados importados são recalculados, não aceitos por flags salvas.

Práticas em aulas usam stacktrail:practice:1:<contrato>:<modo>. Cada modo possui rascunho independente validado. Elas sobrevivem à recarga, mas ainda não participam da exportação/importação global. Histórico de desfazer/refazer dura a sessão do componente, não é exportado. Navegar entre exercícios recria o editor para evitar histórico de outro contrato.

## Verificação e limites

Comandos: npm run typecheck, npm run lint, npm test -- --reporter=dot e npm run build. Resultado final: typecheck, lint e build aprovados; 142 testes aprovados em dez arquivos. git diff --check sem erros de whitespace (somente avisos de normalização LF/CRLF do Git).

Navegador: prévia local acessível na porta 5180 após iniciar fora das restrições de rede do processo inicial. Conferidos dashboard, navegação, ajuda, exclusão/desfazer, grafo de função, aula MDX, passo a passo entrando em calcularMedia, rascunho preservado após recarga e layout em desktop/390 × 844. Em 390 px, largura do documento foi 375 px, sem transbordamento horizontal. A barra se reorganiza em linhas; canvas mantém rolagem própria. A viewport temporária foi restaurada. Houve erro transitório de contexto React durante hot reload ao editar módulos compartilhados; a recarga recuperou a aula.

Não é auditoria completa WCAG/leitor de tela. Ainda cabe validar com estudantes a carga e sequência pedagógica, enriquecer exemplos contextualizados, ampliar casos além dos publicados e integrar os rascunhos das aulas à exportação global. O modelo usa operações estruturadas, não aceita expressões livres, objetos/mapas ou efeitos externos de procedimentos. Não há promessa de equivalência a uma disciplina universitária completa nem certificação de domínio.
