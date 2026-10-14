export const lessons = [
  { id: 'html', title: 'HTML: estrutura que faz sentido', topic: 'HTML & acessibilidade', description: 'Semântica, formulários e uma interface que funciona pelo teclado.', minutes: 20, optional: false, tag: 'HTML' },
  { id: 'css', title: 'CSS: do fluxo ao layout responsivo', topic: 'CSS & responsividade', description: 'Cascata, box model, Flexbox, Grid e diagnóstico com DevTools.', minutes: 25, optional: false, tag: 'CSS' },
  { id: 'fundamentos', title: 'Pensar em JavaScript, escrever em TypeScript', topic: 'TypeScript', description: 'Valores, funções e coleções para transformar dados com clareza.', minutes: 25, optional: false, tag: 'TS' },
  { id: 'tipos', title: 'Tipos que descrevem; validação que protege', topic: 'TypeScript', description: 'strict, unions, narrowing, generics e a fronteira do runtime.', minutes: 25, optional: false, tag: 'TS' },
  { id: 'dom', title: 'DOM e eventos: dados viram interface', topic: 'TypeScript no navegador', description: 'Formulários, eventos e renderização segura sem framework.', minutes: 20, optional: false, tag: 'DOM' },
  { id: 'assincrono', title: 'Promises e async/await sem mistério', topic: 'TypeScript no navegador', description: 'Coordenar operações, tratar falhas e devolver controle à interface.', minutes: 20, optional: false, tag: 'TS' },
  { id: 'http', title: 'Navegador ↔ API: entenda a conversa', topic: 'HTTP & APIs', description: 'Métodos, status, fetch, JSON, CORS e estados de interface.', minutes: 30, optional: false, tag: 'HTTP' },
  { id: 'seguranca', title: 'Storage, cookies e limites de confiança', topic: 'HTTP & APIs', description: 'Persistência, XSS e responsabilidades reais do servidor.', minutes: 15, optional: false, tag: 'WEB' },
  { id: 'tailwind', title: 'Tailwind depois do CSS puro', topic: 'Exploração opcional', description: 'Traduzir estilos em utilitários e comparar manutenção.', minutes: 15, optional: true, tag: 'CSS' },
  { id: 'react', title: 'React: entender quem consome a API', topic: 'Exploração opcional', description: 'Componentes, props, estado, efeitos e formulários tipados.', minutes: 20, optional: true, tag: 'REACT' },
  { id: 'next', title: 'Next.js: onde o código executa?', topic: 'Exploração opcional', description: 'App Router, fronteira cliente/servidor e BFF.', minutes: 20, optional: true, tag: 'NEXT' },
] as const;
export const selfAssessment = [
  'Consigo criar formulário semântico e acessível sem copiar código.',
  'Consigo montar layout responsivo com Flexbox e Grid.',
  'Consigo manipular DOM e eventos com TypeScript, sem framework.',
  'Consigo explicar Promise, async/await, JSON, interfaces, unions e narrowing.',
  'Consigo usar fetch e distinguir erro de rede de status HTTP com erro.',
  'Consigo explicar CORS e por que não substitui autenticação.',
  'Consigo demonstrar um exercício integrado em TypeScript com strict, testes e README.',
  'Registrei código, dúvidas e evidências e publiquei pelo menos um projeto integrado no GitHub.',
];
export const rubric = [
  ['Funcionalidade e requisitos', 30], ['HTML semântico e acessibilidade', 15],
  ['CSS e responsividade', 15], ['TypeScript, tipagem, legibilidade e organização', 20],
  ['HTTP, erros e segurança (quando aplicável)', 15], ['Testes e documentação', 5],
] as const;
