> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](README.md) e o [estado atual](../README.md). Resultados antigos não validam automaticamente a plataforma atual.

# Auditoria pedagógica da Etapa 00 —16/10/2026

Aplicadas stacktrail-educator e stacktrail-uiux. Currículo lido integralmente pelo MCP do Notion, página3f53cadfab77814bbaf1de279833217b, incluindo details; sem truncamento, filhos ou paginação pendentes indicados. Revisão independente inicial e duas conferências posteriores por pedagogical_audit. Não há afirmação de aprendizagem comprovada com estudantes.

## Fidelidade e autoria

| Objetivo conforme currículo | Ensino e evidência local |
| --- | --- |
| Reformular e definir entrada/saída/restrição | Introdução, abstração e método; narrativa rotina e contratos visuais |
| Quatro pilares e decomposição | Introdução, decomposição, padrões, abstração; partes com fronteiras e invariantes |
| Representar solução por pseudocódigo/fluxograma | Algoritmos e fluxogramas; prática própria por aula |
| Mesa e casos-limite | Testes, variantes de depuração e feedback após avaliação |
| Implementação simples | Interpretador permitido, construção independente e comparação de saídas |
| Tempo/memória introdutórios | Estruturas e algoritmos fundamentais; preparação separada de busca, memória e custo do rastreamento |
| Refatorar após validar e comunicar | Integração: experimentoA/B; método: relatório e alternativa rejeitada |
| Problem Solving Lab sugerido | Método: pastas, modelo de evidência, exemploTS e testes; tradução externa pode ficar pendente até ambiente da Etapa01 |

A sequência em oito módulos,19aulas, os contratos e problemas são ampliação didática autoral solicitada pelo usuário. A página é transversal: tópicos Pleno/Sênior não foram convertidos em conteúdo novo obrigatório. Etapas03–19 não foram implementadas.

## Lacunas iniciais e correções

1. Entradas chamadas imutáveis apesar da atribuição local: agora distingue dado original e cópia. Operação por bloco apresentada como limite inexistente: agora distingue estratégia introdutória e AST aninhada.
2. Recuperação ativa com resposta inline: alternativas exigem escolha antes do feedback, sem aprovação automática.
3. Prática completar retirava sempre primeira aresta e corrigir injetava99/self-loop:20variantes explícitas por assunto, incluindo fronteira, acumulador, coluna, retorno, redução recursiva e conversão. Estado anterior não é apagado; reinício é decisão do estudante.
4. Dez aulas ampliadas reconstruíam o mesmo problema como transferência: acrescentados problemas distintos, evidências e conferência recolhida por tema. Vetores/algoritmos orientam sessões separadas.
5. Método usava cartões de notas e instruções antigas: contexto oficina consistente; roteiro local Problem Solving Lab com implementação e testes, publicação não exigida.
6. Roteiro de fluxogramas referia lista/destino/posições inexistentes: atualizado para portas, controles de direção, teclado, seleção e recuperação.

## Rubrica independente após correções

A/P/F/E/V/U/R: alinhamento, progressão, precisão/fontes, exemplos, prática/avaliação, autonomia e reprodutibilidade. Cada aula recebeu3/4 nas sete dimensões na revisão textual final; não é pontuação de estudantes nem certificação universal. Evidência que sustenta a decisão por aula:

| Aula | A/P/F/E/V/U/R | Evidência |
| --- | --- | --- |
| introducao |3/3/3/3/3/3/3| Reformulação e variação por frequência; tentativa antes do feedback |
| decomposicao |3/3/3/3/3/3/3| Validar/calcular/apresentar e transferência para mochila |
| padroes |3/3/3/3/3/3/3| Contador/acumulador, frequência e desempate |
| abstracao |3/3/3/3/3/3/3| Intervalos, duração e prioridade; limites do modelo |
| algoritmos |3/3/3/3/3/3/3| Invariante da soma, término e contador |
| fluxogramas |3/3/3/3/3/3/3| Roteiro atual de portas, edição e recuperação; execução visual verificada separadamente |
| testes |3/3/3/3/3/3/3| Esperado/observado e comparação de fronteiras |
| variaveis |3/3/3/3/3/3/3| Cópia local, árvore e variação de precedência |
| condicionais |3/3/3/3/3/3/3| Defeito de fronteira e novas faixas exclusivas |
| repeticoes |3/3/3/3/3/3/3| Acumulador, meta e dois motivos de parada |
| vetores |3/3/3/3/3/3/3| Temperaturas, vazio, uma passagem e três passagens |
| matrizes |3/3/3/3/3/3/3| Coluna defeituosa e relatório por filial |
| subrotinas |3/3/3/3/3/3/3| Retorno/assinatura e nova oficina |
| composicao |3/3/3/3/3/3/3| Ajuste, bônus/teto e contratos separados |
| recursao |3/3/3/3/3/3/3| Redução defeituosa, soma e elemento neutro |
| algoritmos-fundamentais |3/3/3/3/3/3/3| Contraexemplo de ordenação e custo de preparação |
| integracao |3/3/3/3/3/3/3| RefatoraçãoA/B com mesmos casos e invariante |
| estruturas |3/3/3/3/3/3/3| Busca, preparação, memória e recuperação |
| metodo |3/3/3/3/3/3/3| Oficina e registro reproduzível sem publicação automática |

Os29desafios foram lidos: rotina narrativo; oito visuais originais (numeros,compra,estoque,sequencia,agendamento,busca,rotas,integrador);20ampliados em deep-curriculum. O revisor não identificou erro matemático nos contratos publicados/adicionais. Leitura não substitui execução; testes locais são registrados abaixo.

## Fontes e execução

Fontes consultadas em16/10/2026, por autor e revisor em seções pertinentes:

- [Notion — currículo](https://app.notion.com/p/3f53cadfab77814bbaf1de279833217b): objetivos e sequência transversal.
- [MDN Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions): parâmetros, argumentos, retorno e recursão; diferenças do interpretador são descritas como convenções locais.
- [MDN Loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration): teste inicial/final e laços.
- [VisuAlgo Sorting](https://visualgo.net/en/sorting): comparação de estratégias e custo.
- [TypeScript Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html): anotações, números e arrays.
- [MDN Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger): validação numérica da ponte externa.
- [Node TypeScript](https://nodejs.org/api/typescript.html): remoção de tipos sem checagem; não generalizar para versões arbitrárias.

Executados:20regressões de variantes passaram por autor e revisor independente. Elas executam soluções, detectam defeitos/completar e preservação dos originais. Código autoral TypeScript da oficina extraído da MDX e executado em Node local:4casosconferidos. Cinco regressões de lesson-audit passaram, incluindo ocultação do feedback antes da tentativa e isolamento. Duas jornadas Playwright passaram, temas claro/escuro: criar/editar/mover/conectar/excluir/desfazer/refazer/execução/passos/ampliação/foco/entradas distintas/persistência. Cobertura visual integral e estado final em QUALITY_AUDIT.md; não inferir aprovação visual deste relatório textual.

Limites: não executado GitHub externo nem tradução enviada pelo aluno; aprendizagem com estudantes e correção universal não avaliadas. Rascunhos preexistentes são preservados e podem anteceder a nova variante. Testes adicionais são públicos no cliente. Detalhes editoriais menores não mudam a adequação conceitual, mas continuam sujeitos a revisão.

## Reconferência técnica independente posterior

As notas e conclusões acima registram a revisão pedagógica daquela passagem;
não equivalem à aprovação técnica independente de cada afirmação. A auditoria
posterior com stacktrail-factchecker está em
[CONTENT_VERIFICATION.md](CONTENT_VERIFICATION.md), com fontes diretamente
consultadas, contraexemplos, correções e pendências por conceito. Em caso de
divergência, use a evidência técnica mais recente no escopo e versão registrados,
sem apagar o histórico nem presumir que o build valide o conteúdo.
