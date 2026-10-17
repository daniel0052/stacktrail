export type PhaseId = 'preparacao' | 'junior' | 'pleno' | 'senior';
export type RoadmapStage = { id: string; title: string; description: string; phase: PhaseId; available: boolean; completionCriterion?: string };
export const phases: { id: PhaseId; title: string; range: string; description: string }[] = [
  { id: 'preparacao', title: 'Preparação', range: 'ETAPA 00', description: 'Aprender a pensar antes de codificar.' },
  { id: 'junior', title: 'Formação Júnior', range: 'ETAPAS 01–09', description: 'Construir corretamente: uma API completa.' },
  { id: 'pleno', title: 'Formação Pleno', range: 'ETAPAS 10–15', description: 'Projetar e operar sistemas com evidências.' },
  { id: 'senior', title: 'Competências Sênior', range: 'ETAPAS 16–19', description: 'Decisões, confiabilidade e impacto.' },
];
// Metadados curriculares versionados; proveniência mantida nos registros internos.
// Estas descrições não são aulas das etapas futuras.
export const roadmap: RoadmapStage[] = [
  {
    "id": "00",
    "title": "Pensamento computacional e resolução de problemas",
    "description": "Decomposição, reconhecimento de padrões, abstração e algoritmos; pseudocódigo, teste de mesa e casos-limite.",
    "phase": "preparacao",
    "available": true
  },
  {
    "id": "01",
    "title": "Revisão completa de Frontend para Backend",
    "description": "HTML, CSS, TypeScript e comunicação navegador ↔ API; React, Next.js e Tailwind opcionais.",
    "completionCriterion": "Criar uma página simples com formulário que consome uma API, trata loading, sucesso e erros.",
    "phase": "junior",
    "available": true
  },
  {
    "id": "02",
    "title": "Web, HTTP, redes, Git e ferramentas",
    "description": "HTTP (métodos, status, headers, cookies), DNS/TCP/TLS, REST, Git colaborativo, terminal Linux, cURL e Bruno/Postman.",
    "completionCriterion": "Explicar uma requisição ponta a ponta, testar endpoints por CLI e abrir PR com Git.",
    "phase": "junior",
    "available": true
  },
  {
    "id": "03",
    "title": "PHP, Laravel, Node.js, Express e NestJS",
    "description": "Escolher uma stack principal; tipos, funções, módulos, estruturas, exceções, assincronismo, pacotes, organização e clean code pragmático.",
    "completionCriterion": "Construir um servidor com rotas, configuração por ambiente e tratamento consistente de erros.",
    "phase": "junior",
    "available": true
  },
  {
    "id": "04",
    "title": "APIs REST e regras de negócio",
    "description": "CRUD, rotas, controllers/actions, validação, serialização, paginação, filtros, ordenação, RFC 9457, timeouts e idempotência básica.",
    "completionCriterion": "Implementar API REST documentada em OpenAPI e lidar com dados inválidos e falhas externas.",
    "phase": "junior",
    "available": false
  },
  {
    "id": "05",
    "title": "Banco de dados SQL, PostgreSQL e Laravel",
    "description": "Modelagem, SQL, chaves, relacionamentos, constraints, joins, migrations, transações e índices básicos.",
    "completionCriterion": "Persistir a API em PostgreSQL com migrations, transações e consultas verificáveis.",
    "phase": "junior",
    "available": false
  },
  {
    "id": "06",
    "title": "Testes automatizados e depuração",
    "description": "Testes unitários e de integração, fixtures, mocks quando necessários, debugging, cobertura como indicador.",
    "completionCriterion": "Testar rotas, regras de negócio, banco e erros; executar a suíte localmente.",
    "phase": "junior",
    "available": false
  },
  {
    "id": "07",
    "title": "Segurança, autenticação e autorização",
    "description": "Hash seguro, sessões/JWT quando aplicável, autenticação versus autorização, RBAC, SQL injection, CORS e cookies seguros.",
    "completionCriterion": "Criar autenticação administrativa e demonstrar autorização e validação em testes.",
    "phase": "junior",
    "available": false
  },
  {
    "id": "08",
    "title": "Docker, CI e deploy inicial",
    "description": "Dockerfile, Compose, variáveis e secrets, logs estruturados, correlation IDs, pipeline com lint/build/testes, deploy básico.",
    "completionCriterion": "Publicar a API reproduzível com README; CI verde e logs úteis.",
    "phase": "junior",
    "available": false
  },
  {
    "id": "09",
    "title": "Projeto final de validação Júnior",
    "description": "Consolidar as etapas 01–08 em uma API de agendamentos ou catálogo.",
    "completionCriterion": "Outra pessoa consegue clonar, subir, testar e utilizar a aplicação somente com README.",
    "phase": "junior",
    "available": false
  },
  {
    "id": "10",
    "title": "SQL avançado, concorrência e cache",
    "description": "EXPLAIN ANALYZE, índices, isolamento, locks, transações concorrentes, keyset pagination e Redis.",
    "completionCriterion": "Medir gargalos e demonstrar correção diante de acessos simultâneos e cache inválido.",
    "phase": "pleno",
    "available": false
  },
  {
    "id": "11",
    "title": "Arquitetura pragmática e integrações",
    "description": "Monólito modular, vertical slice, trade-offs de camadas, contratos, BFF, gRPC quando necessário.",
    "completionCriterion": "Registrar ADR justificando arquitetura e fronteiras de módulos.",
    "phase": "pleno",
    "available": false
  },
  {
    "id": "12",
    "title": "Mensageria, filas e resiliência",
    "description": "Filas, Outbox, retries, exponential backoff, jitter, DLQ, at-least-once, idempotência e timeouts.",
    "completionCriterion": "Processar mensagens com falhas e duplicações sem produzir efeitos indevidos.",
    "phase": "pleno",
    "available": false
  },
  {
    "id": "13",
    "title": "Qualidade, segurança e entrega contínua",
    "description": "Testcontainers, E2E, carga com k6, OWASP API Top 10, OAuth2/PKCE, SAST/SCA, staging, rollback e migrations seguras.",
    "completionCriterion": "Executar testes integrados e de carga, com deploy e rollback documentados.",
    "phase": "pleno",
    "available": false
  },
  {
    "id": "14",
    "title": "Observabilidade e IA aplicada",
    "description": "OpenTelemetry, métricas, tracing, dashboards, engenharia de contexto, MCP, sandbox, hooks, skills e avaliações.",
    "completionCriterion": "Diagnosticar falha via traces e demonstrar fluxo de IA com permissões e validação.",
    "phase": "pleno",
    "available": false
  },
  {
    "id": "15",
    "title": "Projeto final de validação Pleno",
    "description": "Evoluir o projeto Júnior com Redis, filas, Outbox, testes de carga, tracing e deploy.",
    "completionCriterion": "Demonstrar resiliência, métricas, trade-offs e plano de recuperação.",
    "phase": "pleno",
    "available": false
  },
  {
    "id": "16",
    "title": "Escala, desempenho e sistemas distribuídos",
    "description": "Profiling, capacity planning, réplicas, particionamento, CAP/PACELC, circuit breaker, bulkhead e degradação controlada.",
    "completionCriterion": "Produzir modelo de capacidade e decisões justificadas com medições.",
    "phase": "senior",
    "available": false
  },
  {
    "id": "17",
    "title": "SRE, segurança e governança",
    "description": "SLI/SLO, error budgets, incidentes, post-mortems, STRIDE, recuperação, IaC, custos e supply chain.",
    "completionCriterion": "Definir metas operacionais, riscos e resposta a incidentes com evidências.",
    "phase": "senior",
    "available": false
  },
  {
    "id": "18",
    "title": "Liderança técnica e IA responsável",
    "description": "Design docs, mentoria, decisões entre equipes, auditoria de IA, avaliação, aprovação humana e custos; RAG/multiagentes como especialização.",
    "completionCriterion": "Conduzir revisão de arquitetura com alternativas, riscos e plano de adoção.",
    "phase": "senior",
    "available": false
  },
  {
    "id": "19",
    "title": "Projeto final de validação Sênior",
    "description": "Evolução operacional de serviço crítico com SLOs, capacidade, ameaças, releases, custos e teste controlado de falha.",
    "completionCriterion": "Equipe consegue operar o sistema com indicadores e documentação sem depender de uma pessoa.",
    "phase": "senior",
    "available": false
  }
];
