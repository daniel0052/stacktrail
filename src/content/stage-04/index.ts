export const lessons = [
  {
    "id": "recursos",
    "title": "Recursos, representações e REST",
    "topic": "1 · Design REST",
    "area": "common",
    "description": "Desenhe contratos a partir de necessidades do consumidor.",
    "tag": "DESIGN REST",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "metodos",
    "title": "Métodos, segurança e idempotência",
    "topic": "1 · Design REST",
    "area": "common",
    "description": "Compare efeitos de requisições únicas e repetidas.",
    "tag": "DESIGN REST",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "contratos",
    "title": "Headers, JSON, datas e evolução",
    "topic": "1 · Design REST",
    "area": "common",
    "description": "Diferencie ausência, null, tipos e negociação.",
    "tag": "DESIGN REST",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "invariantes",
    "title": "Validação, conflitos e agendamentos",
    "topic": "3 · Validação e negócio",
    "area": "common",
    "description": "Construa e preserve invariantes em operações sequenciais.",
    "tag": "VALIDAÇÃO E NEGÓCIO",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "colecoes",
    "title": "Paginação, filtros, busca e ordenação",
    "topic": "4 · Coleções",
    "area": "common",
    "description": "Defina parâmetros limitados e metadados consistentes.",
    "tag": "COLEÇÕES",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "problemas",
    "title": "Problem Details: compreender e escolher",
    "topic": "5 · Erros",
    "area": "common",
    "description": "Leia a RFC 9457 sem confundir formato e correção.",
    "tag": "ERROS",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "integracoes",
    "title": "Retries, timeouts e idempotência",
    "topic": "6 · Integrações",
    "area": "common",
    "description": "Explique resultados ambíguos e políticas de repetição.",
    "tag": "INTEGRAÇÕES",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "openapi",
    "title": "OpenAPI: contrato executável como evidência",
    "topic": "7 · Documentação",
    "area": "common",
    "description": "Documente entradas, respostas e limites com versão explícita.",
    "tag": "DOCUMENTAÇÃO",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "laravel-api",
    "title": "Laravel: rotas, controllers e Resources",
    "topic": "2 · Implementação",
    "area": "php",
    "description": "Construa uma fronteira HTTP sem expor dados internos.",
    "tag": "IMPLEMENTAÇÃO",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "laravel-regras",
    "title": "Laravel: Form Requests e regras de domínio",
    "topic": "3 · Validação e negócio",
    "area": "php",
    "description": "Separe dados validados, estado e dependências explícitas.",
    "tag": "VALIDAÇÃO E NEGÓCIO",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "laravel-consultas",
    "title": "Laravel: consultas, erros e testes",
    "topic": "4 · Coleções",
    "area": "php",
    "description": "Teste listagens e falhas sem banco obrigatório.",
    "tag": "COLEÇÕES",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "express-api",
    "title": "Express: Router, handlers e serialização",
    "topic": "2 · Implementação",
    "area": "javascript",
    "description": "Organize funcionalidades e respostas com contratos explícitos.",
    "tag": "IMPLEMENTAÇÃO",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "express-regras",
    "title": "Express: Zod, domínio e erros assíncronos",
    "topic": "3 · Validação e negócio",
    "area": "javascript",
    "description": "Valide unknown e mantenha erros centralizados em Express 5.",
    "tag": "VALIDAÇÃO E NEGÓCIO",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "express-consultas",
    "title": "Express: consultas e testes HTTP",
    "topic": "4 · Coleções",
    "area": "javascript",
    "description": "Teste paginação, filtros e ausência de mutação.",
    "tag": "COLEÇÕES",
    "minutes": 40,
    "optional": false
  },
  {
    "id": "projeto",
    "title": "Projeto integrador: API de agendamentos",
    "topic": "7 · Integração",
    "area": "common",
    "description": "Entregue uma API em uma stack com testes e decisões rastreáveis.",
    "tag": "INTEGRAÇÃO",
    "minutes": 40,
    "optional": false
  }
];
export const lessonKey=(id:string)=>`04:${id}`;
export const selfAssessment=["Justifico métodos, status, headers e representações do contrato.", "Demonstrei CRUD e validação sem exposição de campos internos.", "Testei agendamento, conflito sequencial, cancelamento e entrada inválida.", "Demonstrei paginação, filtros, busca e ordenação com limites.", "Documentei erros, OpenAPI, README e limites do armazenamento.", "Executei testes, registrei decisões e revisão sem bloqueantes."];
export const rubric=[["Funcionalidade e regras de negócio",30],["Contrato HTTP e erros",25],["Validação e segurança",15],["Testes",15],["OpenAPI e README",15]] as const;
