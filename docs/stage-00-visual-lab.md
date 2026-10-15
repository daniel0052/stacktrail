# Etapa 00: laboratório visual

## Escopo e fontes

Pedido: reformular a Etapa 00 em quatro fases, preservando identidade visual,
arquitetura, nove aulas, nove desafios e avançados opcionais. A execução é uma
interpretação limitada de dados, autorizada especificamente pelo pedido; código
JavaScript/TypeScript colado continua sem execução. A Etapa 01 mantém seu formato.

Páginas consultadas via conector Notion, somente leitura, em 14/10/2026:

- [Roadmap guiado](https://app.notion.com/p/3f53cadfab778127857ef57e2220f721).
- [Pensamento computacional](https://app.notion.com/p/3f53cadfab77814bbaf1de279833217b).

A página da Etapa 00 foi retornada com os detalhes expansíveis incluídos, até o
modelo de anotações final. Não foram indicados blocos desconhecidos ou truncamento.
Ela define quatro pilares, interpretação, entradas/saídas/restrições,
decomposição, pseudocódigo ou fluxograma, teste de mesa, casos-limite,
implementação, custo introdutório, revisão e comunicação. Sugere 2–3 problemas
por semana e um Problem Solving Lab. Não define os nove enunciados: os desafios,
casos, diagramas e rubrica do aplicativo são elaborações didáticas.

## Inventário da reformulação

| Exercício | Formato e foco | Obrigatoriedade |
| --- | --- | --- |
| 01 Rotina | Respostas estruturadas e interpretação da mochila | Obrigatório |
| 02 Aprovação | Condicional e fronteira inclusiva | Obrigatório |
| 03 Compra | Sequência, centavos e desconto; um produto antes dos laços | Obrigatório |
| 04 Estoque | Laço, saldo não negativo, aceitação/rejeição e contadores | Obrigatório |
| 05 Sequência | Acumulador, positivos e comparação entre vizinhos | Obrigatório |
| 06 Agendamento | Busca de conflito; duração fixa explícita de 60 minutos | Obrigatório |
| 07 Busca | Binária, pré-condição de ordem e custo da preparação | Opcional |
| 08 Rotas | Comparar três caminhos possíveis do mapa dirigido fixo | Opcional |
| 09 Oficina | Regras integradas, ordem de chegada e coleção de resultados | Opcional |

Os enunciados foram adaptados ao novo formato, não apenas convertidos em imagens:
classificação de números deu lugar ao protótipo de aprovação; compra usa um
produto; estoque usa movimentos assinados; sequência usa soma/contagem/vizinhos;
reservas têm duração fixa; o integrador combina capacidade e grupos. Frequências,
abstração, busca linear/binária e custo permanecem nas aulas.

## Sequência de implementação e arquitetura

1. Protótipo: modelo, interpretador, aprovação, testes de fronteira e editor.
2. Execução visual: snapshots após cada bloco, caminhos, variáveis e saídas.
3. Laboratório: contratos 02–09, laços, coleções, dicas e progresso v4.
4. Aulas: revisão dos nove MDX com diagramas, comparações e recuperação ativa.

- `src/features/flow/model.ts`: algoritmo independente do SVG, tipos e parser.
- `interpreter.ts`: validação estrutural, tipos, execução e comparação de casos.
- `persistence.ts`: validação da tentativa; reexecução de resultados importados.
- `src/components/flow/`: canvas, edição e rastreamento separados.
- `src/content/stage-00/flow-challenges.ts`: contratos e casos publicados.
- `flow-examples.ts`: demonstrações didáticas completas das aulas.
- `src/tests/flow-fixtures.ts`: soluções de referência dos oito contratos,
  importadas somente pelos testes; não são entregues prontas no laboratório.

SVG evita uma dependência adicional para este editor didático. Conexões usam
seletores e botão, sem exigir arrastar alças. Arrastar blocos tem alternativas
por setas e posições X/Y. A aparência reutiliza cores, fontes e temas do projeto.

## Contrato de execução

- Blocos: início, entrada, processamento, decisão, saída e fim.
- Valores: número finito limitado, texto, booleano, lista numérica ou textual.
- Operações: atribuição, coleção vazia, aritmética, piso da divisão, comparação,
  lógica, presença e acréscimo ao fim de coleção. Sem parser de código livre.
- Índices são variáveis numéricas explícitas e verificados antes de cada acesso.
- Entradas são validadas pelo ambiente: tipos, faixa, integralidade, tamanho
  e ordenação quando exigida. A oficina inclui quantidades inválidas no domínio
  de entrada para que o estudante modele rejeições.
- Até 120 blocos, 240 conexões, 100 elementos e 2000 passos por execução.
- Um início; cada decisão tem Sim e Não; todo bloco precisa ser alcançável do
  início e ter um caminho possível ao fim. A terminação concreta também é
  limitada pelo orçamento de passos, inclusive quando há saída apenas teórica.
- Dados de entrada não podem ser sobrescritos. Variáveis devem ser inicializadas
  antes de ler. Todos os resultados do contrato precisam ser informados.
- Não há `eval`, `new Function`, backend, autenticação ou acesso de rede pelo
  algoritmo. Testes finitos não constituem prova universal de correção.

## Persistência e conclusão

O esquema v4 conserva a chave existente do localStorage e importa v1/v2/v3.
Rascunhos, cadernos e reflexões são mantidos. Nos exercícios convertidos, dicas e
checks reiniciam e a conclusão antiga volta a em andamento, com aviso na página.
O contrato mudou: a autoavaliação antiga não equivale a executar o novo fluxo.

Blocos, conexões, posições, operandos e resultados são salvos no progresso e
exportados pelo JSON existente. Ao importar, os casos são recalculados em vez
de confiar nas flags salvas. Alterar o fluxograma invalida resultados e critérios.
Concluir 02–09 exige casos publicados aprovados e todos os checks; a ação é
explícita. Reflexões e competências continuam sendo declaradas pelo estudante.
O armazenamento permanece local ao navegador/origem/dispositivo.

## Verificação

Suíte inclui soluções de referência de todos os contratos, igualdade na
fronteira, tipos/faixas inválidos, lista vazia, índice inválido, variável não
inicializada, divisão por zero, teto de passos, migração e resultados adulterados,
remontagem após salvar, dicas graduais, teclado, conexão/remoção e restauração.

O build conserva `base: '/stacktrail/'` e HashRouter para GitHub Pages.
Não há publicação automática desta mudança.

Complementos técnicos consultados na documentação oficial:

- [MDN: pointer capture](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture).
- [MDN: structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone).

Limites: edição de conexões por formulário, sem alças de conexão por arrasto;
roteamento ortogonal simples pode se cruzar em desenhos grandes. Não é uma IDE
geral. A validação dos casos observa comportamento; revisão de estratégia e
complexidade continua pedagógica. Não houve auditoria completa com leitores de
tela ou aparelhos móveis físicos.

### Resultado da rodada final (14/10/2026)

- `npm run typecheck`: aprovado.
- `npm run lint`: aprovado.
- `npm test`: 75 testes aprovados em 7 arquivos, incluindo execução das soluções de referência nos 41 casos publicados dos oito desafios.
- `npm run build`: aprovado; assets gerados sob `/stacktrail/assets/`.
- `git diff --check`: sem erros após normalizar as quebras finais de linha.
- Navegador local: inclusão e configuração de bloco, feedback de erro e persistência ao navegar; demonstração com variáveis e avanço do passo 1 ao 2; console sem erros na aula inspecionada.
- Tela padrão e viewport de 390×844: rolagem interna do canvas/tabelas, largura do documento 375 px com viewport de 390 px; sem transbordamento horizontal da página nos cenários inspecionados. O viewport foi restaurado.
- Verificação visual encontrou e corrigiu contraste dos botões secundários nas aulas.

Não houve deploy nem alteração no Notion. Não foram realizados testes em dispositivos físicos ou auditoria completa de leitor de tela.


## Editor livre e entradas tipadas

A interface atual substitui o formulário lateral por paleta com arraste (ou clique),
portas conectáveis por ponteiro ou teclado e edição junto ao bloco. A barra oferece
exclusão, desfazer/refazer, execução, passo a passo, zoom e centralização. A ajuda
fecha pelo botão, Esc e clique no fundo do diálogo.

Cada bloco de entrada aceita até 16 linhas com Nome, Entrada e Tipo independentes.
Os tipos disponíveis são número, texto, booleano, array de números, array de textos
e matriz numérica. Coleções usam JSON, como `[1,2]`, `["Ana","Bia"]` e `[[1,2],[3,4]]`.
Entradas do enunciado podem receber nomes internos próprios; entradas livres guardam
seu valor no bloco. Os valores de teste das entradas do enunciado também são salvos.
O contrato externo de tipos continua sendo validado ao executar.

O avaliador compara comportamento em casos publicados e adicionais, sem comparar
posição, quantidade de blocos ou nomes internos. Restrições de chamadas, composição
e recursão só se aplicam aos exercícios que as exigem. Casos adicionais são omitidos
antes da avaliação, mas estão no código cliente: não constituem testes secretos.
Passar os casos não prova correção universal. Expressões usam parser e AST limitados;
não há eval ou execução de JavaScript do aluno. Rascunhos antigos permanecem legíveis.
