export const lessons = [
  { id: 'urls', title: 'Da URL à mensagem HTTP', topic: '1 · Fundamentos HTTP', description: 'Separe endereço, requisição e resposta usando um explorador local.', tag: 'URL' },
  { id: 'metodos', title: 'Métodos, segurança e idempotência', topic: '1 · Fundamentos HTTP', description: 'Escolha operações pela semântica, não pelo nome da função.', tag: 'HTTP' },
  { id: 'mensagens', title: 'Status, headers e representações', topic: '1 · Fundamentos HTTP', description: 'Investigue JSON, MIME, negociação e respostas sem corpo.', tag: 'HEADERS' },
  { id: 'estado', title: 'Cookies, sessão e cache', topic: '1 · Fundamentos HTTP', description: 'Diferencie identidade de sessão, armazenamento e revalidação.', tag: 'ESTADO' },
  { id: 'cors', title: 'CORS, preflight e falhas', topic: '1 · Fundamentos HTTP', description: 'Separe bloqueio do navegador, timeout e erro HTTP.', tag: 'CORS' },
  { id: 'redes', title: 'DNS, IP, portas e conexão', topic: '2 · Como a web funciona', description: 'Percorra a rede e encontre onde a comunicação parou.', tag: 'REDE' },
  { id: 'tls', title: 'TLS, protocolos e infraestrutura', topic: '2 · Como a web funciona', description: 'Identidade, criptografia, proxy, balanceador e CDN.', tag: 'TLS' },
  { id: 'rest', title: 'Recursos e contratos de API', topic: '3 · REST e contratos', description: 'Modele uma biblioteca e verifique contratos por comportamento.', tag: 'REST' },
  { id: 'shell', title: 'Terminal: arquivos e processos', topic: '4 · Terminal e ferramentas', description: 'Pratique comandos selecionados em um sistema de arquivos virtual.', tag: 'SHELL' },
  { id: 'curl', title: 'cURL, Bruno e Postman', topic: '4 · Terminal e ferramentas', description: 'Reproduza requisições e documente os resultados observados.', tag: 'CURL' },
  { id: 'git', title: 'Git: trabalho, stage e histórico', topic: '5 · Git e GitHub', description: 'Construa commits e branches em um grafo visual.', tag: 'GIT' },
  { id: 'colaboracao', title: 'Colaboração, conflitos e Pull Requests', topic: '5 · Git e GitHub', description: 'Compare merge e rebase, resolva conflitos e prepare uma entrega.', tag: 'PR' },
].map(lesson => ({ ...lesson, minutes: 20, optional: false }));
export const lessonKey = (id: string) => `02:${id}`;
export const selfAssessment = [
  'Explico o percurso da requisição, incluindo DNS, TLS e HTTP.',
  'Diferencio métodos, status, headers, cookies e CORS.',
  'Testei endpoints com cURL e Bruno/Postman, inclusive erros, e registrei evidências externas.',
  'Especifico uma API HTTP simples e coerente, com exemplos e casos de falha.',
  'Abri um PR real e resolvi um conflito com segurança; registrei os comandos e resultados.',
  'Publiquei meu laboratório e recebi feedback sobre as evidências.',
];
export const rubric = [['HTTP e REST',35],['Redes e diagnóstico',20],['Ferramentas e testes',25],['Git e documentação',20]] as const;
