export const lessons = [
  { id: 'introducao', title: 'Introdução ao pensamento computacional', description: 'Transforme situações do cotidiano em problemas verificáveis.', tag: 'PENSAR' },
  { id: 'decomposicao', title: 'Decomposição de problemas', description: 'Separe responsabilidades, entradas, saídas e restrições.', tag: 'DIVIDIR' },
  { id: 'padroes', title: 'Reconhecimento de padrões', description: 'Encontre estruturas recorrentes sem presumir regras.', tag: 'CONECTAR' },
  { id: 'abstracao', title: 'Abstração', description: 'Modele o essencial e explicite o que ficou de fora.', tag: 'MODELAR' },
  { id: 'algoritmos', title: 'Algoritmos e pseudocódigo', description: 'Organize sequências, decisões e repetições finitas.', tag: 'DESCREVER' },
  { id: 'fluxogramas', title: 'Fluxogramas', description: 'Leia decisões, entradas, saídas e caminhos de repetição.', tag: 'VISUALIZAR' },
  { id: 'testes', title: 'Testes de mesa e casos-limite', description: 'Rastreie valores e confronte resultados com as regras.', tag: 'TESTAR' },
  { id: 'variaveis', title: 'Variáveis, constantes e expressões', description: 'Estado, tipos, atribuição e precedência.', tag: 'MÓDULO 2', optional: false },
  { id: 'condicionais', title: 'Condicionais e validação de entradas', description: 'Caminhos simples, compostos, encadeados e aninhados.', tag: 'MÓDULO 3', optional: false },
  { id: 'repeticoes', title: 'Repetições, contadores e acumuladores', description: 'Condição inicial/final, contador, parada e laços aninhados.', tag: 'MÓDULO 4', optional: false },
  { id: 'vetores', title: 'Vetores: percorrer, contar e encontrar extremos', description: 'Índices, busca, soma, média, maior e menor.', tag: 'MÓDULO 5', optional: false },
  { id: 'matrizes', title: 'Matrizes e laços aninhados', description: 'Linhas, colunas, índices e varredura de tabelas.', tag: 'MÓDULO 5', optional: false },
  { id: 'subrotinas', title: 'Sub-rotinas, procedimentos e funções', description: 'Declaração, assinatura, argumentos, retorno e escopo.', tag: 'MÓDULO 6', optional: false },
  { id: 'composicao', title: 'Composição de funções e pilha de chamadas', description: 'Reutilização, escopo e funções que delegam tarefas.', tag: 'MÓDULO 6', optional: false },
  { id: 'recursao', title: 'Introdução à recursão', description: 'Caso-base, redução, retornos e limites de profundidade.', tag: 'MÓDULO 6', optional: true },
  { id: 'algoritmos-fundamentais', title: 'Busca, frequência, duplicados e ordenação', description: 'Comparar estratégias e custo introdutório.', tag: 'MÓDULO 7', optional: false },
  { id: 'integracao', title: 'Resolução integrada, depuração e refatoração', description: 'Planejar, executar, testar limites e comunicar evidências.', tag: 'MÓDULO 8', optional: false },
  { id: 'estruturas', title: 'Estruturas de dados e algoritmos introdutórios', description: 'Coleções, busca, contagem, ordenação, tempo e memória.', tag: 'ORGANIZAR' },
  { id: 'metodo', title: 'Método completo de resolução de problemas', description: 'Da interpretação à implementação e à comunicação.', tag: 'CONSTRUIR' },
].map(l => ({ ...l, topic: l.id === 'metodo' ? 'Módulo 8 · Resolução integrada' : l.id === 'estruturas' ? 'Módulo 7 · Algoritmos' : l.tag.startsWith('MÓDULO') ? l.tag : 'Módulo 1 · Fundamentos', minutes: 20, optional: 'optional' in l ? l.optional : false })).sort((a,b) => Number(a.topic.match(/\d/)?.[0] ?? 1) - Number(b.topic.match(/\d/)?.[0] ?? 1));
export const lessonKey = (id: string) => `00:${id}`;
export const selfAssessment = [
  'Explico os quatro pilares com exemplos próprios.',
  'Reformulo o enunciado sem alterar suas regras.',
  'Identifico entradas, saídas e restrições.',
  'Decomponho o problema em responsabilidades testáveis.',
  'Construo um algoritmo finito e sem ambiguidades em fluxograma ou pseudocódigo.',
  'Interpreto um fluxograma e seus caminhos.',
  'Executo um teste de mesa acompanhando variáveis.',
  'Identifico e testo casos-limite.',
  'Justifico minha solução e seu custo introdutório, indicando os testes realmente executados no interpretador ou numa implementação externa.',
];
// Rubrica didática elaborada: o currículo define competências, não pesos para esta etapa.
export const rubric = [
  ['Compreensão, entradas, saídas e restrições', 20],
  ['Decomposição, padrões e abstração', 25],
  ['Algoritmo e clareza do fluxograma ou pseudocódigo', 25],
  ['Testes de mesa, casos-limite e evidências', 20],
  ['Justificativa, tempo e memória', 10],
] as const;
