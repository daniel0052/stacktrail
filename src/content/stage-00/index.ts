export const lessons = [
  { id: 'introducao', title: 'Introdução ao pensamento computacional', description: 'Transforme situações do cotidiano em problemas verificáveis.', tag: 'PENSAR' },
  { id: 'decomposicao', title: 'Decomposição de problemas', description: 'Separe responsabilidades, entradas, saídas e restrições.', tag: 'DIVIDIR' },
  { id: 'padroes', title: 'Reconhecimento de padrões', description: 'Encontre estruturas recorrentes sem presumir regras.', tag: 'CONECTAR' },
  { id: 'abstracao', title: 'Abstração', description: 'Modele o essencial e explicite o que ficou de fora.', tag: 'MODELAR' },
  { id: 'algoritmos', title: 'Algoritmos e pseudocódigo', description: 'Organize sequências, decisões e repetições finitas.', tag: 'DESCREVER' },
  { id: 'fluxogramas', title: 'Fluxogramas', description: 'Leia decisões, entradas, saídas e caminhos de repetição.', tag: 'VISUALIZAR' },
  { id: 'testes', title: 'Testes de mesa e casos-limite', description: 'Rastreie valores e confronte resultados com as regras.', tag: 'TESTAR' },
  { id: 'estruturas', title: 'Estruturas de dados e algoritmos introdutórios', description: 'Coleções, busca, contagem, ordenação, tempo e memória.', tag: 'ORGANIZAR' },
  { id: 'metodo', title: 'Método completo de resolução de problemas', description: 'Da interpretação à implementação e à comunicação.', tag: 'CONSTRUIR' },
].map(l => ({ ...l, topic: 'Pensamento computacional', minutes: 20, optional: false }));
export const lessonKey = (id: string) => `00:${id}`;
export const selfAssessment = [
  'Explico os quatro pilares com exemplos próprios.',
  'Reformulo o enunciado sem alterar suas regras.',
  'Identifico entradas, saídas e restrições.',
  'Decomponho o problema em responsabilidades testáveis.',
  'Construo pseudocódigo finito e sem ambiguidades.',
  'Interpreto um fluxograma e seus caminhos.',
  'Executo um teste de mesa acompanhando variáveis.',
  'Identifico e testo casos-limite.',
  'Justifico minha solução e seu custo introdutório, incluindo uma implementação simples e testes realmente executados fora da plataforma.',
];
// Rubrica didática elaborada: o currículo define competências, não pesos para esta etapa.
export const rubric = [
  ['Compreensão, entradas, saídas e restrições', 20],
  ['Decomposição, padrões e abstração', 25],
  ['Algoritmo e clareza do pseudocódigo', 25],
  ['Testes de mesa, casos-limite e evidências', 20],
  ['Justificativa, tempo e memória', 10],
] as const;
