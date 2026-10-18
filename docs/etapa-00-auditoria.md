> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](README.md) e o [estado atual](../README.md). Resultados antigos não validam automaticamente a plataforma atual.

# Auditoria da experiência da Etapa 00

## Causas encontradas

- LessonVisual reduzia nove tópicos a uma escolha binária entre aprovação e soma.
  Abstração e método, por exemplo, exibiam aprovação apesar de abordarem reservas e oficina.
- Práticas compartilhavam chaves de armazenamento por desafio/modo, sem aula.
- O estado React da prática não era reinicializado quando mudava seu contrato.
- Demonstrações das aulas posteriores só mostravam o grafo depois de iniciar a execução.
- A prática tinha critérios genéricos, mas não exibia seu contrato de entradas, saídas e testes antes do editor.
- No campo de array, a grade colocava colchetes e ajuda em colunas concorrentes.
  O campo estreitava, quebrava números verticalmente e mostrava barras de rolagem.

## Correções

O registro lesson-activities.ts vincula explicitamente os nove tópicos iniciais a
exemplos adequados. Aprovação fica na introdução; padrões usa contagem; abstração
compara intervalos; fluxogramas classifica idade; estruturas faz busca linear;
método isola a decisão de um pedido da oficina. Decomposição, algoritmos e testes
retomam conscientemente a soma de durações, com objetivos diferentes explicados.
As outras dez aulas usam os contratos específicos dos respectivos FlowPractice.

As aulas têm exemplo resolvido, rastreamento e enunciado com tipos, regras e casos
publicados antes da prática. O laboratório mantém sua própria lista por níveis.
Rascunhos das aulas são identificados por aula, desafio e modo; não alteram progresso
do laboratório. Chaves antigas permanecem no dispositivo e não são apagadas nem
copiadas silenciosamente para aulas novas. O editor do laboratório remonta ao trocar
de desafio, evitando carregar valores da atividade anterior.

Coleções ocupam a largura disponível. Colchetes permanecem fixos; conteúdos curtos
ficam em linha e conteúdos longos quebram naturalmente, aumentando a altura sem
rolagem interna. O canvas continua explorável por zoom e rolagem para grafos grandes.

## Verificação

Os testes de auditoria percorrem as 19 aulas, validam referências de atividade e
links do laboratório, executam os exemplos e verificam isolamento ao trocar aula.
A conferência visual usa navegador em origem de teste distinta do progresso do usuário.
Não houve consulta nova ao Notion, alteração da Etapa 01 ou publicação.


## Auditoria do painel de execução

O estado vazio no passo Início era exibido como `{}`, sem distinguir rastreamento
de resultado final. O painel ganhou Executar até o fim e orientação explícita para
avanço; antes de um bloco de saída há uma mensagem de ausência de saída no passo.

Foram corrigidas a captura da entrada atual nos controles locais e a invalidação
do resultado ao alterar entradas, contrato ou algoritmo. Antes, o painel podia usar
os dados da última execução pela barra. A inicialização pelo botão local também
passou a registrar a mesma assinatura usada pela barra, preservando avanço entre
controles. Ao pedir passos depois da execução completa, começa um novo rastreamento.

A regressão percorre dois casos publicados de cada uma das 20 tarefas curriculares,
confere os resultados exibidos, testa o estado inicial, o avanço, a troca de entrada
e a integração entre o editor e seu painel. A suíte existente cobre ainda os
contratos do laboratório e os seis tipos de valor. No navegador foi observada a
mudança 0 → 6 e 10 → 36 na tarefa de expressões, além da leitura de variável após
Início e do resultado final. Esses testes são evidências finitas, não prova universal.


## Execução integrada e navegação do canvas

A execução do aluno usa os valores atuais do editor, sem outro seletor de casos.
O mesmo canvas recebe o destaque do bloco e acompanha sua posição; o grafo da
função chamada aparece nesse mesmo espaço. Os valores e as saídas ficam junto dele.
As demonstrações também mantêm apenas um canvas, visível antes e durante a execução.

É possível arrastar o fundo com ponteiro/toque, ampliar a área e restaurar por botão
ou Esc. Ao ampliar, controles e valores continuam no espaço ampliado. Barras de
rolagem ficam ocultas; zoom, centralização, arraste e teclado permitem explorar.
No celular em pé há uma orientação dispensável para girar a tela.

Executar inicia reprodução com intervalos de 1,5 s, 0,8 s ou 0,4 s por passo.
Pausar, continuar, avançar manualmente, voltar e ir direto ao resultado usam o mesmo
rastreamento. Alterar o algoritmo ou os dados interrompe a reprodução obsoleta.
A validação no navegador incluiu arraste, ampliação, retrato/horizontal, pausa e
conclusão automática; os testes cobrem também temporização e restauração por Esc.


A paleta de blocos pertence ao canvas e permanece visível ao ampliar, com as mesmas
ações por clique, teclado e arraste. Há uma única instância da paleta. O destino
do arraste é calculado no canvas da própria paleta, inclusive quando o canvas é
transportado para a camada ampliada. Criar e salvar um bloco mantém a seleção
visível; restaurar o tamanho preserva os blocos e conexões criados.


## Propriedades adaptativas e seletor de tipos

O formulário saiu do foreignObject SVG e passou a uma camada HTML ancorada no
bloco. Abre à direita quando cabe, à esquerda se necessário e fica limitado à
janela. Em telas estreitas usa um painel inferior. A posição acompanha rolagem,
zoom e redimensionamento; abrir propriedades não aumenta as dimensões do grafo.
O seletor e suas opções usam cores explícitas do tema, inclusive o color-scheme
correto, evitando texto claro sobre o fundo branco de menus nativos.
A regressão cobre edição de tipos na ampliação, posicionamento lateral e móvel.
