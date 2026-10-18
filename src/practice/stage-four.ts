import type { Activity, Book, StudyTopic, TrackTag } from './curriculum';
import type { Reference } from './catalog';

type RawRef = { id: string; title: string; source: string; url: string; type: string; language: string; versionOrDate: string; cost: Reference['cost']; section: string; why: string; limits: string };
type RawTopic = { id: string; stageId: '04'; section: string; track: TrackTag; title: string; summary: string; WhyItMatters: string; prerequisites: string[]; competencies: string[]; practice: string[]; doneCriteria: string; refs: string[] };
const checkedOn = '2026-10-17';

const rawRefs04: RawRef[] = [
  {
    id: 'ref-04-rfc-9110',
    title: 'RFC 9110 — HTTP Semantics (Methods, Status Codes, Content Negotiation)',
    source: 'IETF / RFC Editor',
    url: 'https://www.rfc-editor.org/rfc/rfc9110.html',
    type: 'Norma técnica',
    language: 'Inglês',
    versionOrDate: 'Junho/2022 — Internet Standard STD 97',
    cost: 'Gratuito',
    section: 'Sections 9 (Methods: GET, POST, PUT, PATCH, DELETE, Safe/Idempotent), 10.2.2 (Location), 12 (Content Negotiation) & 15 (Status Codes 2xx, 4xx, 5xx)',
    why: 'Especificação normativa oficial do protocolo HTTP para semântica de recursos, propriedades safe/idempotente de métodos, negociação de conteúdo e códigos de status.',
    limits: 'Em inglês e densa; consulte diretamente as seções de métodos (Seção 9) e códigos de status (Seção 15).',
  },
  {
    id: 'ref-04-rfc-9457',
    title: 'RFC 9457 — Problem Details for HTTP APIs (application/problem+json)',
    source: 'IETF / RFC Editor',
    url: 'https://www.rfc-editor.org/rfc/rfc9457.html',
    type: 'Norma técnica',
    language: 'Inglês',
    versionOrDate: 'Julho/2023 (substitui a RFC 7807)',
    cost: 'Gratuito',
    section: 'Section 3 (The Problem Details JSON Object: type, title, status, detail, instance & extension members) & Section 4 (Defining New Problem Types)',
    why: 'Padrão oficial da IETF para respostas de erro legíveis por máquina em APIs HTTP usando o media type application/problem+json e membros de extensão (como errors por campo).',
    limits: 'Em inglês; não impõe um único formato para o membro de extensão de validação, cabendo ao contrato da API documentá-lo no OpenAPI.',
  },
  {
    id: 'ref-04-openapi-spec',
    title: 'OpenAPI Specification v3.1.1 — Padrão de Contrato de APIs HTTP',
    source: 'OpenAPI Initiative / Linux Foundation',
    url: 'https://spec.openapis.org/oas/latest.html',
    type: 'Especificação oficial',
    language: 'Inglês',
    versionOrDate: 'OpenAPI 3.1.1 (2024–2026)',
    cost: 'Gratuito',
    section: 'Paths Object, Operation Object, Parameter Object, Request Body Object, Responses Object, Components & Schema Object (JSON Schema)',
    why: 'Referência primária para descrever recursos, parâmetros de rota/query, payloads de entrada, respostas de sucesso/Problem Details e exemplos em openapi.yaml ou openapi.json.',
    limits: 'Em inglês; diferencie a especificação formal do contrato (OpenAPI) de ferramentas visuais como Swagger UI ou Redoc.',
  },
  {
    id: 'ref-04-mdn-rest-status',
    title: 'MDN Web Docs — HTTP Response Status Codes & Idempotent Methods',
    source: 'Mozilla Developer Network (MDN)',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status',
    type: 'Documentação oficial',
    language: 'Inglês',
    versionOrDate: 'Referência viva (verificada em 2026)',
    cost: 'Gratuito',
    section: '200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 409 Conflict, 422 Unprocessable Content, 429 Too Many Requests, 500, 502, 503, 504',
    why: 'Guia objetivo para escolher o status HTTP exato entre falha de sintaxe (400), ausência de recurso (404), conflito de estado/regra de negócio (409), erro de validação (422) e indisponibilidade externa (502/503/504).',
    limits: 'Focado no protocolo HTTP; regras específicas de domínio e invariantes devem ser modeladas na aplicação.',
  },
  {
    id: 'ref-04-mdn-abort-timeout',
    title: 'MDN Web Docs — AbortSignal.timeout() e Controle de Timeouts em Requisições',
    source: 'Mozilla Developer Network (MDN)',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static',
    type: 'Documentação oficial',
    language: 'Inglês',
    versionOrDate: 'Web APIs / Node.js Standard (verificada em 2026)',
    cost: 'Gratuito',
    section: 'AbortSignal.timeout() & Handling TimeoutError / AbortError in fetch()',
    why: 'Mostra como impor limite explícito de tempo ao chamar serviços externos para evitar que lentidão de terceiros esgote os recursos da sua API.',
    limits: 'Em inglês; na trilha PHP/Laravel o controle equivalente de timeout é configurado no HTTP Client (Http::timeout()) ou Guzzle.',
  },
  {
    id: 'ref-04-laravel-routing-api',
    title: 'Laravel Documentation — API Routing & Resource Controllers (routes/api.php)',
    source: 'Laravel Official Documentation',
    url: 'https://laravel.com/docs/12.x/routing',
    type: 'Documentação oficial',
    language: 'Inglês',
    versionOrDate: 'Laravel 12.x / 13.x (verificada em 2026)',
    cost: 'Gratuito',
    section: 'API Routes (php artisan install:api), Route Prefixes (/api/v1) & Rate Limiting',
    why: 'Explica como habilitar routes/api.php com php artisan install:api no Laravel moderno, organizar prefixos de versão e mapear rotas RESTful para Controllers.',
    limits: 'Em inglês; php artisan install:api instala Laravel Sanctum por padrão, mas autenticação não é exigida nesta Etapa 04 (tema da Etapa 07).',
  },
  {
    id: 'ref-04-laravel-validation',
    title: 'Laravel Documentation — Form Request Validation & Custom Error Responses',
    source: 'Laravel Official Documentation',
    url: 'https://laravel.com/docs/12.x/validation',
    type: 'Documentação oficial',
    language: 'Inglês',
    versionOrDate: 'Laravel 12.x / 13.x (verificada em 2026)',
    cost: 'Gratuito',
    section: 'Form Request Validation, Authorizing/Validating Input, Working With Validated Input ($request->safe() / validated())',
    why: 'Documenta o uso de classes FormRequest para isolar regras de validação de entrada do Controller e proteger contra mass assignment.',
    limits: 'Em inglês; diferencie validação estrutural no FormRequest de invariantes e conflitos de negócio (409) no domínio.',
  },
  {
    id: 'ref-04-laravel-resources',
    title: 'Laravel Documentation — Eloquent: API Resources (JsonResource & ResourceCollection)',
    source: 'Laravel Official Documentation',
    url: 'https://laravel.com/docs/12.x/eloquent-resources',
    type: 'Documentação oficial',
    language: 'Inglês',
    versionOrDate: 'Laravel 12.x / 13.x (verificada em 2026)',
    cost: 'Gratuito',
    section: 'Generating Resources, Concept Overview, Resource Collections, Data Wrapping & Pagination',
    why: 'Ensina a transformar entidades internas em contratos JSON explícitos e seguros com JsonResource, evitando exposição excessiva de dados (data over-exposure) e padronizando metadados de paginação.',
    limits: 'Em inglês; embora o nome mencione Eloquent, JsonResource funciona perfeitamente com objetos/DTOs em memória sem exigir banco SQL na Etapa 04.',
  },
  {
    id: 'ref-04-laravel-errors-http-tests',
    title: 'Laravel Documentation — HTTP Tests & Exception Rendering for APIs',
    source: 'Laravel Official Documentation',
    url: 'https://laravel.com/docs/12.x/http-tests',
    type: 'Documentação oficial',
    language: 'Inglês',
    versionOrDate: 'Laravel 12.x / 13.x (verificada em 2026)',
    cost: 'Gratuito',
    section: 'Testing JSON APIs (getJson, postJson, patchJson, deleteJson, assertStatus, assertHeader, assertJsonStructure)',
    why: 'Guia oficial para testar contratos REST, cabeçalhos, paginação, filtros, validação 422, conflitos 409 e respostas Problem Details no Laravel.',
    limits: 'Em inglês; complemente com a seção de Error Handling (shouldRenderJsonWhen e renderable exceptions) para formatar RFC 9457.',
  },
  {
    id: 'ref-04-express-routing-middleware',
    title: 'Express Documentation — Routing & Using Middleware in REST APIs',
    source: 'Express.js / OpenJS Foundation',
    url: 'https://expressjs.com/en/guide/routing.html',
    type: 'Documentação oficial',
    language: 'Inglês',
    versionOrDate: 'Express 4.x / 5.x (verificada em 2026)',
    cost: 'Gratuito',
    section: 'express.Router, Route Parameters, Route Handlers & Middleware Pipeline',
    why: 'Referência oficial para modularizar recursos REST com express.Router, separar handlers por responsabilidade e encadear middlewares de validação e idempotência.',
    limits: 'Em inglês; não impõe camada de serialização ou schema, exigindo DTOs explícitos e validação em runtime.',
  },
  {
    id: 'ref-04-express-error-handling',
    title: 'Express Documentation — Centralized Error Handling',
    source: 'Express.js / OpenJS Foundation',
    url: 'https://expressjs.com/en/guide/error-handling.html',
    type: 'Documentação oficial',
    language: 'Inglês',
    versionOrDate: 'Express 4.x / 5.x (verificada em 2026)',
    cost: 'Gratuito',
    section: 'Writing Error Handlers (err, req, res, next) & Async Error Propagation',
    why: 'Explica como centralizar a conversão de exceções de validação, não encontrado (404), conflito de negócio (409) e falhas de integração (502/503/504) em respostas RFC 9457.',
    limits: 'Em inglês; lembre-se de definir Content-Type: application/problem+json nas respostas padronizadas de erro.',
  },
  {
    id: 'ref-04-zod-docs',
    title: 'Zod Documentation — TypeScript-First Schema Validation with Static Type Inference',
    source: 'Zod Official Docs',
    url: 'https://zod.dev/',
    type: 'Documentação oficial',
    language: 'Inglês',
    versionOrDate: 'Zod 3.x / 4.x (verificada em 2026)',
    cost: 'Gratuito',
    section: 'Objects (strip/strict), Coercion for Query Params, Refinements (.refine / .superRefine), safeParse & Error Formatting',
    why: 'Documentação oficial para validar body, query params (paginação, filtros, ordenação) e route params em runtime no Express, além de produzir DTOs de saída seguros.',
    limits: 'Em inglês; use safeParse para mapear violações de schema diretamente para membros de extensão em Problem Details (422).',
  },
];

const rawTopics04: RawTopic[] = [
  // ================= FUNDAMENTOS COMUNS DA ETAPA 04 =================
  {
    id: '04-contratos-http-recursos',
    stageId: '04',
    section: 'Contratos REST, Regras de Negócio e Qualidade (Comum)',
    track: 'comum',
    title: 'Tópico 01 — Contratos HTTP, modelagem de recursos, URIs e status semânticos',
    summary:
      'Modelagem de recursos e sub-recursos em substantivos no plural, versionamento (/api/v1), semântica rigorosa de GET/POST/PUT/PATCH/DELETE, cabeçalhos (Content-Type, Accept, Location), datas ISO 8601 e códigos de status 2xx/4xx/5xx.',
    WhyItMatters:
      'Um contrato REST previsível desacopla clientes e servidores: quando URIs, métodos, payloads e códigos de status respeitam a RFC 9110, consumidores sabem exatamente o que esperar sem adivinhar convenções ad hoc.',
    prerequisites: [
      'Etapa 02 concluída: mensagens HTTP, métodos, status e anatomia de URLs.',
      'Etapa 03 concluída: construção de servidor HTTP e rotas básicas na trilha escolhida.',
    ],
    competencies: [
      'Modelar recursos principais e sub-recursos usando substantivos no plural e versionamento explícito (ex.: /api/v1/books, /api/v1/rooms/{id}/bookings).',
      'Aplicar corretamente GET, POST, PUT, PATCH e DELETE respeitando segurança (safe) e idempotência.',
      'Separar o papel de route params (identificação de recurso), query string (paginação, filtro, ordenação) e request body (payload de criação/atualização).',
      'Utilizar cabeçalhos Content-Type, Accept e Location (em 201 Created), datas em ISO 8601 e distinção clara entre campos opcionais e nulos.',
      'Selecionar com precisão entre 200, 201, 204, 400, 404, 409, 422, 429, 500, 502, 503 e 504.',
    ],
    practice: [
      'Projetar a tabela completa de recursos e endpoints para um catálogo de livros e um sistema de reservas de salas sob o prefixo /api/v1.',
      'Comparar o contrato de PUT (substituição integral idempotente) versus PATCH (atualização parcial) para um mesmo recurso.',
      'Definir exemplos de cabeçalhos e corpos JSON para 201 Created (incluindo Location: /api/v1/books/{id}) e 204 No Content (sem corpo).',
    ],
    doneCriteria:
      'Especificou e testou rotas REST com substantivos no plural, prefixo de versão, separação correta entre params/query/body, cabeçalho Location no 201, ausência de corpo no 204 e códigos de status semânticos.',
    refs: ['ref-04-rfc-9110', 'ref-04-mdn-rest-status', 'ref-04-openapi-spec'],
  },
  {
    id: '04-validacao-regras-negocio',
    stageId: '04',
    section: 'Contratos REST, Regras de Negócio e Qualidade (Comum)',
    track: 'comum',
    title: 'Tópico 02 — Validação de entrada versus regras de negócio, invariantes e segurança de dados',
    summary:
      'Diferença entre validação estrutural/sintática e regras de negócio de domínio, proteção de invariantes, distinção entre 422 e 409, prevenção de mass assignment e exposição excessiva de dados, e limites do armazenamento em memória.',
    WhyItMatters:
      'Misturar formato de payload com invariantes de domínio espalha regras nos controllers e produz códigos HTTP confusos. Além disso, aceitar campos extras (mass assignment) ou devolver objetos internos crus vaza dados e compromete a segurança.',
    prerequisites: [
      'Tópico 01 (Contratos HTTP e recursos).',
      'Validação básica de entrada vista na Etapa 03.',
    ],
    competencies: [
      'Diferenciar validação de entrada (tipos, tamanhos, formato de data, campos obrigatórios → 400/422) de regras de negócio dependentes do estado atual do domínio (conflito de agenda, item indisponível, transição proibida → 409 Conflict).',
      'Proteger invariantes do domínio (ex.: startAt < endAt, duração mínima/máxima, proibição de sobreposição de reservas ativas para a mesma sala).',
      'Prevenir mass assignment (rejeitando ou ignorando campos como id, status interno, role ou createdAt enviados pelo cliente) e data over-exposure (filtrando campos internos na saída).',
      'Reconhecer o limite arquitetural desta etapa: validação sequencial em memória comprova a regra de negócio, mas não garante isolamento sob concorrência real entre múltiplos processos — transações, locks e constraints SQL pertencem à Etapa 05.',
    ],
    practice: [
      'Classificar 10 cenários de falha de uma API de reservas entre 400 Bad Request, 404 Not Found, 409 Conflict e 422 Unprocessable Content.',
      'Escrever a função pura de detecção de sobreposição de intervalo de horários (startAt < existing.endAt && endAt > existing.startAt) e testar casos de borda (horários adjacentes vs sobrepostos).',
      'Auditar payloads de entrada e saída garantindo que campos internos nunca sejam sobrescritos pelo cliente nem expostos na resposta.',
    ],
    doneCriteria:
      'Implementou validação de entrada separada das regras de negócio, diferenciou 422 de 409 em reservas/catálogo, bloqueou mass assignment e exposição excessiva de dados e sabe explicar por que concorrência multi-processo exigirá constraints/transações SQL na Etapa 05.',
    refs: ['ref-04-rfc-9110', 'ref-04-mdn-rest-status', 'ref-04-laravel-validation', 'ref-04-zod-docs'],
  },
  {
    id: '04-paginacao-filtros-ordenacao',
    stageId: '04',
    section: 'Contratos REST, Regras de Negócio e Qualidade (Comum)',
    track: 'comum',
    title: 'Tópico 03 — Paginação, busca textual, filtros e ordenação segura em coleções',
    summary:
      'Contratos de listagem com page, per_page, total, valores padrão e limite máximo por página, busca textual (search), filtros permitidos, whitelist de ordenação, tratamento de coleções vazias (200 OK) e noção conceitual de cursor pagination.',
    WhyItMatters:
      'Retornar milhares de registros sem paginação derruba a performance da API e do cliente, enquanto aceitar parâmetros de ordenação ou paginação sem validação abre brechas para negação de serviço ou erros internos.',
    prerequisites: [
      'Tópico 01 (Contratos HTTP e query strings).',
    ],
    competencies: [
      'Implementar paginação offset/page com valores padrão seguros (ex.: page=1, per_page=10), teto máximo obrigatório (ex.: per_page <= 50) e metadados consistentes (data + meta com page, per_page, total, total_pages).',
      'Combinar busca textual (search), filtros por atributos permitidos (ex.: category, available, roomId, status) e ordenação restrita a uma lista branca (whitelist) de campos e direções (asc/desc).',
      'Retornar 200 OK com array data: [] e metadados coerentes quando nenhuma entidade corresponder aos filtros, diferenciando de 404 Not Found em rota de item individual.',
      'Rejeitar com 422 Unprocessable Content parâmetros de query inválidos (ex.: page=0, per_page=-5, per_page=1000, sort=campo_inexistente).',
      'Compreender conceitualmente a diferença entre paginação por página/offset e paginação por cursor (cursor pagination).',
    ],
    practice: [
      'Implementar o pipeline de listagem GET /api/v1/books (ou /bookings) aplicando filtro → busca → ordenação por whitelist → fatiamento de página → montagem do envelope { data, meta }.',
      'Testar chamadas com coleção vazia (200 OK com data: []), página além do total e parâmetros fora do limite (422).',
    ],
    doneCriteria:
      'Implementou e testou listagem paginada com defaults, limite máximo de per_page, busca, filtros combinados, ordenação por whitelist, retorno 200 com lista vazia e erro 422 para parâmetros inválidos.',
    refs: ['ref-04-rfc-9110', 'ref-04-laravel-resources', 'ref-04-zod-docs', 'ref-04-openapi-spec'],
  },
  {
    id: '04-erros-problem-details',
    stageId: '04',
    section: 'Contratos REST, Regras de Negócio e Qualidade (Comum)',
    track: 'comum',
    title: 'Tópico 04 — Erros padronizados com RFC 9457 (Problem Details for HTTP APIs)',
    summary:
      'Estrutura padronizada de erros segundo a RFC 9457 (type, title, status, detail, instance), media type application/problem+json, membros de extensão para erros por campo e ocultação de stack traces em produção.',
    WhyItMatters:
      'Quando cada rota inventa um formato de erro diferente ({ error }, { msg }, { message, code }), o cliente não consegue tratar falhas de forma confiável. A RFC 9457 padroniza respostas de erro em toda a indústria.',
    prerequisites: [
      'Tópicos 01 e 02 da Etapa 04.',
    ],
    competencies: [
      'Estruturar todas as respostas de erro 4xx e 5xx com os campos canônicos da RFC 9457: type (URI identificadora do problema), title (resumo curto), status (código HTTP numérico), detail (explicação específica da ocorrência) e instance (caminho/URI da requisição).',
      'Retornar o cabeçalho Content-Type: application/problem+json nas respostas de erro padronizadas.',
      'Utilizar membros de extensão da RFC 9457 (como errors para mapear violações de validação por campo no 422 ou requestId para rastreabilidade).',
      'Garantir que erros internos (500) ou falhas de integração (502/503/504) nunca exponham stack traces, caminhos de arquivos do servidor ou segredos.',
    ],
    practice: [
      'Criar um formatador/fábrica centralizada de Problem Details na trilha escolhida que produza payloads RFC 9457 consistentes para 400, 404, 409, 422, 500, 502, 503 e 504.',
      'Inspecionar com cURL (-i) ou testes automatizados se o cabeçalho Content-Type retorna application/problem+json e se todos os 5 campos padrão estão presentes.',
    ],
    doneCriteria:
      'Padronizou os erros da API segundo a RFC 9457 com Content-Type: application/problem+json, campos type/title/status/detail/instance, extensão errors para validação 422 e supressão total de stack traces em produção.',
    refs: ['ref-04-rfc-9457', 'ref-04-mdn-rest-status', 'ref-04-laravel-errors-http-tests', 'ref-04-express-error-handling'],
  },
  {
    id: '04-idempotencia-timeouts-integracoes',
    stageId: '04',
    section: 'Contratos REST, Regras de Negócio e Qualidade (Comum)',
    track: 'comum',
    title: 'Tópico 05 — Idempotência em operações de escrita, timeouts, retries e integrações externas',
    summary:
      'Operações idempotentes vs não idempotentes, risco de duplicidade em retries de POST, chave de idempotência (Idempotency-Key), configuração de timeouts e tratamento de falhas transitórias (502, 503, 504) em integrações simuladas.',
    WhyItMatters:
      'Redes falham e clientes repetem requisições após timeouts. Sem idempotência e sem limite de tempo em chamadas externas, um único clique pode duplicar reservas ou travar todo o servidor esperando um serviço terceiro lento.',
    prerequisites: [
      'Tópicos 01, 02 e 04 da Etapa 04.',
    ],
    competencies: [
      'Explicar por que GET, PUT e DELETE são idempotentes por definição na RFC 9110, enquanto POST não é naturalmente idempotente.',
      'Prevenir criação duplicada em retentativas de POST implementando suporte a cabeçalho Idempotency-Key (ou detecção determinística de repetição) em memória.',
      'Configurar timeout explícito ao consultar ou notificar um serviço externo simulado (como um gateway de notificação ou calendário externo).',
      'Traduzir falhas do serviço externo (timeout, indisponibilidade temporária ou resposta inválida de upstream) em respostas Problem Details controladas (504 Gateway Timeout, 503 Service Unavailable ou 502 Bad Gateway) ou degradação graciosa documentada.',
    ],
    practice: [
      'Implementar suporte a Idempotency-Key no endpoint POST /api/v1/bookings para que duas chamadas idênticas com a mesma chave retornem a mesma reserva sem duplicar o registro.',
      'Simular um cliente de notificação externa com modos configuráveis (sucesso, lentidão/timeout e falha 503) e verificar o comportamento da API.',
    ],
    doneCriteria:
      'Demonstrou na prática a proteção contra duplicidade em retentativas de POST e o tratamento seguro de timeout e indisponibilidade de serviço externo simulado com códigos HTTP e Problem Details adequados.',
    refs: ['ref-04-rfc-9110', 'ref-04-rfc-9457', 'ref-04-mdn-abort-timeout', 'ref-04-mdn-rest-status'],
  },
  {
    id: '04-openapi-documentacao',
    stageId: '04',
    section: 'Contratos REST, Regras de Negócio e Qualidade (Comum)',
    track: 'comum',
    title: 'Tópico 06 — Especificação OpenAPI 3.1, schemas, exemplos e documentação verificável',
    summary:
      'Estrutura de um documento OpenAPI (openapi.yaml ou openapi.json), definição reutilizável de schemas, parameters, requestBody, responses, exemplos reais, documentação de paginação/filtros/Problem Details e diferença entre OpenAPI e Swagger UI.',
    WhyItMatters:
      'Uma API cuja documentação diverge do código quebra integrações. O arquivo OpenAPI formaliza o contrato em formato legível por humanos e ferramentas (como Bruno, Postman, geradores de clientes e validadores).',
    prerequisites: [
      'Tópicos 01 a 05 da Etapa 04.',
    ],
    competencies: [
      'Diferenciar a especificação OpenAPI (o contrato declarativo YAML/JSON) de ferramentas de visualização e teste (Swagger UI, Scalar, Redoc, Bruno, Postman).',
      'Estruturar openapi.yaml ou openapi.json com info, servers, paths, operations, parameters (path, query, header), requestBody e responses.',
      'Reutilizar schemas em components/schemas para recursos de saída, payloads de entrada, envelope paginado e objeto ProblemDetails (RFC 9457).',
      'Manter paridade estrita entre o que está descrito no arquivo OpenAPI e o que os testes automatizados verificam na API real.',
    ],
    practice: [
      'Escrever o arquivo openapi.yaml (ou openapi.json) cobrindo os endpoints da API, incluindo exemplos de sucesso (200, 201, 204) e de erro em application/problem+json (400, 404, 409, 422).',
      'Importar ou validar o contrato OpenAPI junto a uma coleção Bruno/Postman e conferir se todos os campos batem com as respostas reais da suíte de testes.',
    ],
    doneCriteria:
      'Criou um arquivo openapi.yaml ou openapi.json válido documentando rotas, query params de paginação/filtros, schemas de entrada/saída e respostas Problem Details em total sincronia com a API implementada.',
    refs: ['ref-04-openapi-spec', 'ref-04-rfc-9457', 'ref-04-rfc-9110'],
  },

  // ================= TRILHA A — PHP + LARAVEL =================
  {
    id: '04-laravel-recursos-crud',
    stageId: '04',
    section: 'Trilha A — PHP + Laravel (APIs REST e Regras de Negócio)',
    track: 'php',
    title: 'Tópico 07-A — Rotas de API, Controllers REST e organização de regras no Laravel',
    summary:
      'Configuração de routes/api.php (php artisan install:api sem exigir autenticação), prefixo /api/v1, Resource Controllers enxutos, implementação de CRUD completo e extração de regras de negócio para Services ou Actions.',
    WhyItMatters:
      'No Laravel moderno, separar o transporte HTTP (routes/api.php e Controllers) das invariantes de negócio (Services/Actions) permite evoluir contratos REST complexos mantendo cada classe simples de testar.',
    prerequisites: [
      'Etapa 03 concluída na Trilha PHP + Laravel.',
      'Tópicos comuns 01 e 02 da Etapa 04.',
    ],
    competencies: [
      'Configurar rotas de API no Laravel (routes/api.php via php artisan install:api nas versões recentes, mantendo rotas públicas sem autenticação nesta etapa) sob o prefixo /api/v1.',
      'Implementar endpoints REST completos (GET coleção, GET item, POST criação com 201 + header Location, PATCH atualização parcial com 200 e DELETE remoção com 204).',
      'Manter Controllers enxutos, extraindo regras de negócio (como verificação de conflito de agenda ou cálculo de disponibilidade) para classes de domínio ou Actions injetadas pelo Service Container.',
      'Operar com armazenamento em memória ou repositório em arquivo JSON temporário isolado por teste, sem antecipar Eloquent/SQL da Etapa 05.',
    ],
    practice: [
      'Implementar em routes/api.php os recursos /api/v1/books e /api/v1/bookings (ou /api/v1/rooms) conectados a Controllers REST e classes de serviço/repositório em memória.',
      'Garantir que POST retorne 201 Created com cabeçalho Location e que DELETE retorne 204 No Content sem corpo.',
    ],
    doneCriteria:
      'Implementou rotas REST versionadas (/api/v1) no Laravel com Controller enxuto, Service/Action para regras de negócio e status/headers semânticos (200, 201 + Location, 204, 404, 409).',
    refs: ['ref-04-laravel-routing-api', 'ref-04-rfc-9110'],
  },
  {
    id: '04-laravel-formrequest-resources',
    stageId: '04',
    section: 'Trilha A — PHP + Laravel (APIs REST e Regras de Negócio)',
    track: 'php',
    title: 'Tópico 08-A — Form Requests, API Resources (JsonResource) e listagens paginadas no Laravel',
    summary:
      'Validação dedicada de body e query params com FormRequest, acesso seguro via $request->validated(), serialização explícita de saída com JsonResource/ResourceCollection e paginação/filtros/ordenação.',
    WhyItMatters:
      'Usar FormRequest impede que dados não validados cheguem ao domínio (prevenindo mass assignment), enquanto API Resources garantem um contrato JSON de saída estável que nunca vaza propriedades internas.',
    prerequisites: [
      'Tópico 07-A e Tópicos comuns 02 e 03.',
    ],
    competencies: [
      'Criar classes FormRequest dedicadas para POST (criação), PATCH (atualização parcial com sometimes/filled) e GET de listagem (validação de page, per_page, search, filtros e sort).',
      'Utilizar exclusivamente $request->validated() ou $request->safe() para construir DTOs/comandos de entrada sem risco de mass assignment.',
      'Transformar entidades de domínio em payloads JSON padronizados por meio de JsonResource e ResourceCollection, controlando formatos de data ISO 8601 e ocultando atributos internos.',
      'Retornar coleções paginadas com envelope consistente ({ data, meta }) e validar limites máximos de per_page.',
    ],
    practice: [
      'Criar StoreBookRequest, UpdateBookRequest e ListBooksRequest (ou equivalentes para Bookings) validando entradas e query strings.',
      'Criar BookResource e BookingResource garantindo que campos internos de controle não apareçam no JSON de resposta.',
    ],
    doneCriteria:
      'Implementou validação de entrada e query params via FormRequest e serialização de saída via JsonResource/ResourceCollection com paginação, filtros e ordenação segura.',
    refs: ['ref-04-laravel-validation', 'ref-04-laravel-resources'],
  },
  {
    id: '04-laravel-erros-testes-http',
    stageId: '04',
    section: 'Trilha A — PHP + Laravel (APIs REST e Regras de Negócio)',
    track: 'php',
    title: 'Tópico 09-A — Renderização de Problem Details (RFC 9457) e testes HTTP de contrato no Laravel',
    summary:
      'Configuração de exceções em bootstrap/app.php para responder em application/problem+json (RFC 9457) e escrita de suíte completa de HTTP Tests (PHPUnit/Pest) cobrindo CRUD, regras de negócio, paginação e falhas.',
    WhyItMatters:
      'Centralizar a renderização de exceções no Laravel garante que qualquer ValidationException, NotFoundHttpException ou DomainConflictException vire automaticamente um Problem Details RFC 9457 testável.',
    prerequisites: [
      'Tópicos 07-A, 08-A e Tópicos comuns 04, 05 e 06.',
    ],
    competencies: [
      'Configurar o tratamento de exceções no Laravel (bootstrap/app.php com withExceptions) para converter falhas de validação (422), recurso não encontrado (404), conflito de negócio (409), falha de integração (502/503/504) e erro inesperado (500) em respostas RFC 9457 com Content-Type: application/problem+json.',
      'Escrever testes HTTP automatizados (getJson, postJson, patchJson, deleteJson) verificando códigos de status, cabeçalhos (Location, Content-Type: application/problem+json), estrutura JSON e invariantes de domínio.',
      'Testar cenários de fronteira: sobreposição de reservas (409), paginação fora dos limites (422), idempotência com Idempotency-Key e falha de serviço externo simulado.',
    ],
    practice: [
      'Configurar o renderizador RFC 9457 no Laravel e verificar que um erro 422 inclui type, title, status, detail, instance e o mapa errors por campo.',
      'Executar php artisan test cobrindo todos os fluxos de sucesso e erro da API.',
    ],
    doneCriteria:
      'Configurou respostas application/problem+json (RFC 9457) para todas as categorias de erro no Laravel e aprovou suíte de testes HTTP cobrindo contrato, paginação, conflitos 409 e falhas externas.',
    refs: ['ref-04-laravel-errors-http-tests', 'ref-04-rfc-9457'],
  },

  // ================= TRILHA B — TYPESCRIPT + NODE.JS + EXPRESS =================
  {
    id: '04-express-recursos-crud',
    stageId: '04',
    section: 'Trilha B — TypeScript + Node.js + Express (APIs REST e Regras de Negócio)',
    track: 'javascript',
    title: 'Tópico 07-B — Routers REST versionados, Controllers/Handlers e serviços de domínio no Express',
    summary:
      'Organização de rotas REST sob /api/v1 com express.Router, separação entre handlers HTTP e serviços de domínio em TypeScript strict, e implementação de CRUD completo com status e cabeçalhos semânticos.',
    WhyItMatters:
      'Em aplicações Express, colocar validação, regras de negócio e manipulação de estado direto dentro de callbacks de rota rapidamente gera código difícil de manter. Separar Router, Handler e Domain Service mantém o contrato limpo e testável.',
    prerequisites: [
      'Etapa 03 concluída na Trilha TypeScript + Node.js + Express.',
      'Tópicos comuns 01 e 02 da Etapa 04.',
    ],
    competencies: [
      'Estruturar módulos de rotas versionadas (/api/v1/books, /api/v1/rooms, /api/v1/bookings) usando express.Router e TypeScript strict.',
      'Implementar handlers REST para GET (coleção e item), POST (201 Created com cabeçalho Location), PATCH (200 OK com atualização parcial segura) e DELETE (204 No Content sem corpo).',
      'Isolar invariantes e regras de negócio (como verificação de conflito de horário, limites de reserva e transições de status) em serviços de domínio puros ou repositórios em memória desacoplados do objeto req/res.',
    ],
    practice: [
      'Implementar os routers /api/v1/books e /api/v1/bookings delegando regras para classes/funções de serviço em TypeScript strict.',
      'Garantir que POST defina res.location(`/api/v1/bookings/${created.id}`).status(201).json(...) e que DELETE responda res.status(204).end().',
    ],
    doneCriteria:
      'Implementou rotas REST /api/v1 no Express com separação entre handlers HTTP e serviços de domínio em TypeScript strict, respeitando semântica de métodos, cabeçalho Location e status 200/201/204/404/409.',
    refs: ['ref-04-express-routing-middleware', 'ref-04-rfc-9110'],
  },
  {
    id: '04-express-zod-serializacao',
    stageId: '04',
    section: 'Trilha B — TypeScript + Node.js + Express (APIs REST e Regras de Negócio)',
    track: 'javascript',
    title: 'Tópico 08-B — Validação runtime com Zod, DTOs de saída e listagens paginadas no Express',
    summary:
      'Schemas Zod para body, route params e query params (coerção e validação de page, per_page, search, filtros e sort), prevenção de mass assignment e serializadores/DTOs explícitos de saída.',
    WhyItMatters:
      'Tipos do TypeScript desaparecem em runtime. Usar schemas Zod garante que entradas e query strings sejam validadas de verdade, enquanto funções mapeadoras de saída (Output DTOs) impedem o vazamento acidental de campos internos.',
    prerequisites: [
      'Tópico 07-B e Tópicos comuns 02 e 03.',
    ],
    competencies: [
      'Definir schemas Zod separados para criação (POST), atualização parcial (PATCH não vazio), parâmetros de rota e query string de listagem (page, per_page com limite máximo, search, filtros e whitelist de sort).',
      'Bloquear mass assignment removendo ou rejeitando propriedades não autorizadas antes de chamar a camada de serviço.',
      'Criar funções serializadoras explícitas (ex.: toBookResponse, toBookingResponse, toPaginatedResponse) para controlar exatamente os campos expostos e formatar datas em ISO 8601.',
    ],
    practice: [
      'Implementar middleware ou helper de validação com Zod que barre payloads e query params inválidos antes da lógica de negócio.',
      'Implementar serializadores de saída e envelope paginado { data, meta } garantindo que atributos internos do repositório em memória não vazem no JSON.',
    ],
    doneCriteria:
      'Implementou validação runtime completa com Zod (body, params e query de paginação/filtros/sort) e serialização explícita de saída (DTOs) sem mass assignment nem exposição excessiva de dados.',
    refs: ['ref-04-zod-docs', 'ref-04-express-routing-middleware'],
  },
  {
    id: '04-express-erros-testes-http',
    stageId: '04',
    section: 'Trilha B — TypeScript + Node.js + Express (APIs REST e Regras de Negócio)',
    track: 'javascript',
    title: 'Tópico 09-B — Middleware Problem Details (RFC 9457) e testes HTTP de contrato no Express',
    summary:
      'Hierarquia de erros de aplicação e middleware centralizado no Express emitindo application/problem+json (RFC 9457), mais suíte de testes HTTP automatizados (node:test / Vitest / Supertest).',
    WhyItMatters:
      'Um error handler centralizado no Express evita try/catch repetitivos em cada rota e garante que qualquer erro (Zod, JSON inválido, 404, 409 de negócio ou 503/504 de integração) respeite o contrato RFC 9457.',
    prerequisites: [
      'Tópicos 07-B, 08-B e Tópicos comuns 04, 05 e 06.',
    ],
    competencies: [
      'Implementar classes de erro semânticas (ex.: ProblemError, DomainConflictError, ResourceNotFoundError, UpstreamServiceError) e um middleware global de erro no Express que responda com Content-Type: application/problem+json.',
      'Converter falhas do Zod (422 com extensão errors), SyntaxError do express.json() (400), rotas/recursos inexistentes (404), conflitos de negócio (409) e timeouts/falhas externas (502/503/504) em objetos Problem Details RFC 9457 sem vazar stack trace.',
      'Escrever testes automatizados de contrato HTTP verificando status, cabeçalhos (Location, Content-Type), paginação, conflitos de reserva, idempotência e falhas externas.',
    ],
    practice: [
      'Implementar o middleware problemDetailsErrorHandler no Express e testar todas as categorias de erro.',
      'Executar npm test validando o contrato completo da API sem depender de servidor externo manual.',
    ],
    doneCriteria:
      'Implementou o middleware RFC 9457 (application/problem+json) no Express e aprovou suíte de testes automatizados cobrindo CRUD, paginação, regras de negócio (409), validação (422), idempotência e falhas externas.',
    refs: ['ref-04-express-error-handling', 'ref-04-rfc-9457', 'ref-04-zod-docs'],
  },
];

export const references04: Reference[] = rawRefs04.map((r) => ({
  id: r.id,
  title: r.title,
  url: r.url,
  language: r.language,
  type: r.type,
  cost: r.cost,
  section: r.section,
  version: `${r.source} · ${r.versionOrDate}`,
  note: `${r.why} Limites: ${r.limits}`,
  checked: checkedOn,
  adequacy: checkedOn,
}));

const rubricObjs = [
  {
    criterion: 'Funcionalidade e regras de negócio (30%)',
    good: 'Recursos implementados na trilha escolhida com invariantes de negócio reais (como bloqueio de sobreposição de reservas, limites de duração, transições válidas de estado e idempotência), mantendo consistência total dos dados em memória.',
    improve: 'A API realiza apenas CRUD passivo sem validar conflitos de estado, permite reservas sobrepostas na mesma sala ou altera parcialmente os dados quando uma operação falha.',
  },
  {
    criterion: 'Contrato HTTP e erros padronizados RFC 9457 (25%)',
    good: 'URIs versionadas (/api/v1) com substantivos no plural, uso correto de GET/POST/PATCH/DELETE, status semânticos (200, 201 com Location, 204 sem corpo, 400, 404, 409, 422, 502/503/504) e todas as falhas formatadas em application/problem+json (RFC 9457).',
    improve: 'Usa verbos de RPC nas URLs, confunde 422 com 409, retorna 200 para erros ou devolve formatos de erro heterogêneos sem seguir a RFC 9457.',
  },
  {
    criterion: 'Validação, serialização segura e listagens (15%)',
    good: 'Valida body, params e query string (page, per_page com teto máximo, search, filtros e whitelist de sort), previne mass assignment e serializa a saída com API Resources ou DTOs sem expor dados internos nem stack traces.',
    improve: 'Aceita qualquer campo enviado pelo cliente no body (mass assignment), não impõe limite máximo em per_page ou retorna objetos internos crus.',
  },
  {
    criterion: 'Testes automatizados de contrato e domínio (15%)',
    good: 'Suíte reproduzível (php artisan test ou npm test) cobrindo casos de sucesso, paginação/filtros, validação 422, recurso ausente 404, conflito de negócio 409, idempotência e falha/timeout de serviço externo simulado.',
    improve: 'Testa apenas o caminho feliz básico ou exige passos manuais ocultos para executar a suíte.',
  },
  {
    criterion: 'OpenAPI 3.1, coleção e README de portfólio (15%)',
    good: 'Inclui arquivo openapi.yaml/json fiel à implementação (com schemas de sucesso e Problem Details), coleção Bruno/Postman funcional e README claro explicando regras de negócio, comandos e limites do armazenamento em memória.',
    improve: 'Não inclui especificação OpenAPI ou apresenta documentação divergente dos endpoints e códigos de status reais da aplicação.',
  },
];
const rubric04: string[] = rubricObjs.map((x) => `${x.criterion}: Adequado — ${x.good} Precisa melhorar — ${x.improve}`);

export const tasks04: Activity[] = [
  // ================= INICIANTE (3 exercícios) =================
  {
    id: '04-ex-01',
    slug: 'contrato-primeiro',
    title: 'Exercício 01 — Contrato primeiro (Design de Recursos e Status HTTP)',
    level: 'inicial',
    optional: false,
    stageId: '04',
    kind: 'exercise',
    track: 'ambas',
    topicIds: ['04-contratos-http-recursos', '04-validacao-regras-negocio'],
    competencies: [
      'Modelagem de recursos e sub-recursos REST sob /api/v1',
      'Semântica de métodos HTTP, cabeçalhos e códigos de status 2xx/4xx/5xx',
      'Distinção contratual entre 400, 404, 409 e 422',
    ],
    objectives: [
      'Projetar o contrato HTTP completo de uma API de catálogo e reservas antes de codificar os handlers, especificando URIs, métodos, payloads, cabeçalhos e códigos de status.',
    ],
    prerequisites: [
      'Leitura dos Tópicos 01 e 02 da Etapa 04.',
    ],
    statement:
      'Antes de escrever o código dos endpoints na sua stack, especifique o contrato HTTP completo para os recursos de Salas (/api/v1/rooms) e Reservas (/api/v1/bookings), definindo rotas, métodos, parâmetros, formatos JSON de entrada/saída, datas ISO 8601 e a matriz de códigos de status.',
    requirements: [
      'Definir ao menos 7 operações cobrindo: listagem e detalhe de salas, criação/atualização parcial de sala, listagem paginada de reservas, criação de reserva (POST) e cancelamento de reserva (PATCH ou DELETE fundamentado).',
      'Especificar para cada operação: método HTTP, URI versionada (/api/v1/...), se o método é safe e/ou idempotente, route params, query params permitidos e estrutura do request body (quando aplicável).',
      'Incluir exemplos completos de resposta para 200 OK, 201 Created (com cabeçalho Location) e 204 No Content (explicitando ausência de corpo).',
      'Documentar a diferença prática no seu contrato entre 400 (JSON malformado), 404 (sala ou reserva inexistente), 422 (campos inválidos, como endAt anterior a startAt) e 409 (horário já reservado para a mesma sala).',
    ],
    constraints: [
      'Usar substantivos no plural nas URIs e não criar rotas de RPC como /api/v1/createBooking ou /api/v1/cancelRoom.',
      'Padronizar todas as datas e horários em formato ISO 8601 com fuso ou UTC explícito (ex.: 2026-10-20T14:00:00Z).',
    ],
    io: [
      'Entrada: requisitos do domínio de salas e reservas.',
      'Saída: documento de especificação de contrato HTTP (Markdown ou rascunho OpenAPI) com matriz de rotas, exemplos JSON e regras de status.',
    ],
    acceptanceCriteria: [
      'Todas as rotas usam substantivos no plural sob /api/v1 e classificam corretamente segurança e idempotência.',
      'O contrato de 201 Created inclui o cabeçalho Location apontando para a URI do novo recurso e o de 204 No Content não declara corpo.',
      'Os cenários de 400, 404, 409 e 422 estão claramente separados com exemplos concretos do domínio.',
      'Campos opcionais e campos que aceitam null estão explicitamente diferenciados na especificação.',
    ],
    hints: [
      'Para o cancelamento de uma reserva que precisa manter histórico (status: "cancelled" e cancelledAt), um PATCH /api/v1/bookings/{id} (ou sub-recurso de estado) costuma ser mais expressivo do que apagar o registro sem rastro.',
      'Se startAt >= endAt, o payload em si é incoerente independentemente do banco (422); se o intervalo é válido mas colide com outra reserva existente naquela sala, trata-se de conflito com o estado atual do recurso (409).',
      'Mantenha uma convenção única de nomenclatura JSON (camelCase ou snake_case) em todos os exemplos do contrato.',
    ],
    testIdeas: [
      'Revisar cada rota perguntando: "O que acontece se o cliente enviar a mesma requisição duas vezes seguidas?"',
      'Conferir se nenhum filtro ou parâmetro de paginação foi colocado no corpo de um GET.',
    ],
    refs: ['ref-04-rfc-9110', 'ref-04-mdn-rest-status', 'ref-04-openapi-spec'],
    rubric: rubric04,
    deliverables: [
      'Documento de contrato HTTP com tabela de endpoints, payloads de entrada/saída e matriz de status 2xx/4xx/5xx.',
    ],
  },
  {
    id: '04-ex-02',
    slug: 'crud-basico-rest',
    title: 'Exercício 02 — CRUD básico REST na trilha escolhida',
    level: 'inicial',
    optional: false,
    stageId: '04',
    kind: 'exercise',
    track: 'ambas',
    topicIds: ['04-contratos-http-recursos', '04-laravel-recursos-crud', '04-express-recursos-crud'],
    competencies: [
      'Implementação de endpoints GET, POST, PATCH e DELETE sob /api/v1',
      'Emissão de 201 Created com cabeçalho Location e 204 No Content sem corpo',
      'Separação entre camada HTTP e repositório/serviço em memória',
    ],
    objectives: [
      'Implementar na sua trilha escolhida (PHP/Laravel ou TypeScript/Node.js/Express) o CRUD completo de um recurso REST (/api/v1/books ou /api/v1/rooms) em memória com semântica HTTP rigorosa.',
    ],
    prerequisites: [
      'Exercício 01 concluído e leitura do Tópico 07 da sua trilha (07-A Laravel ou 07-B Express).',
    ],
    statement:
      'Implemente na sua stack escolhida os cinco endpoints fundamentais de um recurso REST (GET /api/v1/books, GET /api/v1/books/{id}, POST /api/v1/books, PATCH /api/v1/books/{id} e DELETE /api/v1/books/{id}) usando armazenamento determinístico em memória.',
    requirements: [
      'Na Trilha PHP/Laravel: registrar as rotas em routes/api.php sob prefixo v1 e implementar BookController delegando para um serviço/repositório em memória ou arquivo JSON temporário de teste.',
      'Na Trilha TypeScript/Express: criar um Router dedicado montado em /api/v1/books e delegar as operações para um serviço/repositório tipado em memória.',
      'POST /api/v1/books deve gerar identificador único, preencher timestamps ISO 8601 e responder 201 Created com o cabeçalho Location: /api/v1/books/{id}.',
      'PATCH /api/v1/books/{id} deve atualizar apenas os campos enviados preservando os demais; DELETE /api/v1/books/{id} deve remover o recurso e responder 204 No Content sem corpo.',
      'GET, PATCH e DELETE para um ID inexistente devem retornar 404 Not Found em JSON.',
    ],
    constraints: [
      'Implementar apenas na sua trilha escolhida (PHP/Laravel ou TS/Express).',
      'Não utilizar banco de dados SQL nesta etapa; o estado deve poder ser reiniciado facilmente a cada teste.',
    ],
    io: [
      'Entrada: chamadas HTTP GET, POST, PATCH e DELETE para /api/v1/books e /api/v1/books/{id}.',
      'Saída: respostas 200, 201 (com Location), 204 (sem corpo) e 404 em JSON.',
    ],
    acceptanceCriteria: [
      'Os 5 endpoints respondem nos caminhos /api/v1/books e /api/v1/books/{id} com os códigos HTTP corretos.',
      'A resposta do POST 201 inclui o cabeçalho Location válido e o recurso recém-criado pode ser consultado imediatamente via GET.',
      'O PATCH atualiza parcialmente o registro sem apagar campos omitidos na requisição.',
      'O DELETE retorna 204 sem payload e uma consulta GET subsequente ao mesmo ID retorna 404.',
    ],
    hints: [
      'No Laravel, você pode usar response()->json($data, 201)->header("Location", "/api/v1/books/{$book[\'id\']}") e response()->noContent() para 204.',
      'No Express, use res.location(`/api/v1/books/${book.id}`).status(201).json(book) e res.status(204).end().',
      'Crie um método reset() ou seed() no seu armazenamento em memória para que os testes automatizados comecem sempre de um estado conhecido.',
    ],
    testIdeas: [
      'Executar o ciclo POST (201 + Location) → GET por ID (200) → PATCH parcial (200) → DELETE (204) → GET por ID (404).',
      'Tentar fazer PATCH e DELETE em um ID inexistente e confirmar retorno 404.',
    ],
    refs: ['ref-04-laravel-routing-api', 'ref-04-express-routing-middleware', 'ref-04-rfc-9110'],
    rubric: rubric04,
    deliverables: [
      'Código das rotas, controller/handlers e repositório em memória na trilha escolhida.',
      'Evidências de execução via testes HTTP ou cURL confirmando status e cabeçalho Location.',
    ],
  },
  {
    id: '04-ex-03',
    slug: 'validacao-entrada',
    title: 'Exercício 03 — Validação de entrada e proteção contra mass assignment',
    level: 'inicial',
    optional: false,
    stageId: '04',
    kind: 'exercise',
    track: 'ambas',
    topicIds: ['04-validacao-regras-negocio', '04-laravel-formrequest-resources', '04-express-zod-serializacao'],
    competencies: [
      'Validação de entrada no servidor (FormRequest no Laravel ou Zod no Express)',
      'Diferenciação entre 400 Bad Request (JSON inválido) e 422 Unprocessable Content (violação de regras de campos)',
      'Prevenção de mass assignment em POST e PATCH',
    ],
    objectives: [
      'Blindar os endpoints de escrita (POST e PATCH) com validação rigorosa por campo e bloqueio de propriedades não autorizadas (mass assignment).',
    ],
    prerequisites: [
      'Exercício 02 concluído e leitura do Tópico 02 e do Tópico 08 da sua trilha.',
    ],
    statement:
      'Adicione validação de entrada dedicada aos endpoints POST e PATCH do seu recurso usando as ferramentas idiomáticas da sua trilha (FormRequest no Laravel ou schemas Zod no Express), garantindo que dados inválidos recebam 422 com detalhes por campo e que propriedades extras maliciosas sejam descartadas ou rejeitadas.',
    requirements: [
      'Na Trilha PHP/Laravel: criar StoreBookRequest e UpdateBookRequest (ou equivalentes para Room/Booking) e consumir apenas $request->validated() no Controller.',
      'Na Trilha TypeScript/Express: criar schemas Zod para criação e atualização parcial (rejeitando PATCH com objeto vazio {}) e validar req.body antes de chamar o serviço.',
      'Validar tipos primitivos, obrigatoriedade, tamanho mínimo/máximo de strings, valores numéricos positivos e formato de datas ISO 8601.',
      'Garantir que enviar campos internos como id, createdAt, isAdmin ou internalNotes no corpo do POST/PATCH não sobrescreva valores controlados pelo servidor (proteção contra mass assignment).',
      'Garantir que um PATCH inválido retorne 422 sem provocar mutação parcial no recurso armazenado.',
    ],
    constraints: [
      'Não realizar validação apenas no cliente ou apenas por tipagem estática do TypeScript.',
      'Diferenciar JSON sintaticamente quebrado (400) de JSON bem formado com campos inválidos (422).',
    ],
    io: [
      'Entrada: requisições POST/PATCH com campos faltantes, tipos errados, strings vazias, objeto PATCH vazio {} e campos extras não permitidos.',
      'Saída: 422 Unprocessable Content com mapa de erros por campo; em caso de sucesso, recurso salvo apenas com os campos permitidos.',
    ],
    acceptanceCriteria: [
      'Payloads inválidos em POST e PATCH retornam 422 em JSON identificando exatamente os campos que falharam.',
      'Tentar sobrescrever id ou createdAt via body em POST/PATCH não surte efeito no recurso salvo.',
      'Após uma tentativa de PATCH inválido (422), uma consulta GET comprova que o recurso manteve seus valores originais intactos.',
    ],
    hints: [
      'No Laravel, nas regras de PATCH use ["sometimes", "required", "string", "min:2"] para que o campo seja opcional na requisição, mas não possa ser enviado vazio ou nulo.',
      'No Zod, use .partial().refine((data) => Object.keys(data).length > 0, { message: "Envie ao menos um campo para atualização" }) no schema de PATCH.',
      'Por padrão, o Zod remove chaves desconhecidas (strip) e o $request->validated() do Laravel retorna apenas os campos presentes nas rules().',
    ],
    testIdeas: [
      'Enviar POST com {"title": "", "price": -10} e verificar se ambos os campos aparecem detalhados no erro 422.',
      'Enviar POST válido incluindo {"id": "hack-999", "internalRole": "admin"} e verificar que o servidor gerou seu próprio ID e ignorou internalRole.',
      'Enviar PATCH com {} (objeto vazio) e verificar retorno 422.',
    ],
    refs: ['ref-04-laravel-validation', 'ref-04-zod-docs', 'ref-04-mdn-rest-status'],
    rubric: rubric04,
    deliverables: [
      'Classes FormRequest (Laravel) ou schemas/middlewares Zod (Express) integrados às rotas POST e PATCH.',
      'Testes comprovando rejeição 422 por campo e proteção contra mass assignment.',
    ],
  },

  // ================= INTERMEDIÁRIO (3 exercícios) =================
  {
    id: '04-ex-04',
    slug: 'serializacao-segura',
    title: 'Exercício 04 — Serialização segura e contratos de saída (API Resources / Output DTOs)',
    level: 'intermediario',
    optional: false,
    stageId: '04',
    kind: 'exercise',
    track: 'ambas',
    topicIds: ['04-contratos-http-recursos', '04-validacao-regras-negocio', '04-laravel-formrequest-resources', '04-express-zod-serializacao'],
    competencies: [
      'Transformação explícita da entidade interna para o contrato público JSON',
      'Prevenção de exposição excessiva de dados (data over-exposure)',
      'Padronização de datas ISO 8601 e campos nulos/opcionais na saída',
    ],
    objectives: [
      'Desacoplar o modelo interno de armazenamento do payload JSON público usando API Resources no Laravel ou Output DTOs/Serializers no Express.',
    ],
    prerequisites: [
      'Exercício 03 concluído e leitura do Tópico 08 da sua trilha.',
    ],
    statement:
      'Adicione atributos internos ao seu modelo em memória (como internalNotes, costPriceCents, createdByIp ou auditToken) e implemente uma camada explícita de serialização de saída (JsonResource no Laravel ou funções DTO/Serializer no Express) para garantir que apenas os campos do contrato público sejam expostos.',
    requirements: [
      'Manter na entidade interna ao menos 2 campos privados/administrativos que jamais devem aparecer nas respostas públicas da API.',
      'Na Trilha PHP/Laravel: implementar classes JsonResource (ex.: BookResource, BookingResource) mapeando explicitamente cada propriedade pública e formatando datas em ISO 8601.',
      'Na Trilha TypeScript/Express: implementar funções serializadoras tipadas (ex.: toBookPublicDto(entity): BookPublicDto) usadas em todos os endpoints GET, POST e PATCH.',
      'Garantir consistência absoluta do formato do recurso retornado entre GET /api/v1/books/{id}, POST /api/v1/books, PATCH /api/v1/books/{id} e cada item de GET /api/v1/books.',
    ],
    constraints: [
      'Nunca dar return direto no objeto bruto do repositório sem passar pelo Resource ou DTO de saída.',
    ],
    io: [
      'Entrada: entidade armazenada em memória contendo campos públicos + campos internos sensíveis.',
      'Saída: resposta JSON contendo exclusivamente os campos públicos documentados e datas em ISO 8601.',
    ],
    acceptanceCriteria: [
      'Nenhum endpoint (GET lista, GET detalhe, POST ou PATCH) vaza campos internos como internalNotes ou auditToken.',
      'As datas de criação/atualização ou agendamento são sempre serializadas em string ISO 8601 válida.',
      'O contrato JSON do item é idêntico nas rotas de detalhe, criação, atualização e coleção.',
    ],
    hints: [
      'No Laravel, em vez de retornar parent::toArray($request) no JsonResource, retorne um array explícito listando chave por chave do contrato público.',
      'No TypeScript, evite usar o operador spread (...entity) no serializador de saída; construa o objeto de retorno listando explicitamente as propriedades públicas.',
      'Escreva uma asserção nos seus testes verificando explicitamente que a chave interna (assertJsonMissing no Laravel ou !("internalNotes" in body) no Node) não existe no payload.',
    ],
    testIdeas: [
      'Criar um registro cujo modelo interno possua internalNotes="segredo" e verificar no JSON de resposta do POST, GET por ID e GET lista que a propriedade não está presente.',
      'Verificar com Date.parse() ou regex ISO 8601 o formato dos campos de data retornados.',
    ],
    refs: ['ref-04-laravel-resources', 'ref-04-zod-docs', 'ref-04-openapi-spec'],
    rubric: rubric04,
    deliverables: [
      'Camada de serialização de saída (API Resources ou Output DTOs) aplicada em todas as rotas.',
      'Teste automatizado comprovando ausência de vazamento de campos internos.',
    ],
  },
  {
    id: '04-ex-05',
    slug: 'listagens-paginacao-filtros',
    title: 'Exercício 05 — Listagens com paginação, busca, filtros e ordenação segura',
    level: 'intermediario',
    optional: false,
    stageId: '04',
    kind: 'exercise',
    track: 'ambas',
    topicIds: ['04-paginacao-filtros-ordenacao', '04-laravel-formrequest-resources', '04-express-zod-serializacao'],
    competencies: [
      'Paginação com page, per_page, defaults, limite máximo e metadados (total, total_pages)',
      'Busca textual (search), filtros combinados e whitelist de ordenação (sort/order)',
      'Distinção entre coleção vazia (200 OK) e parâmetros de query inválidos (422)',
    ],
    objectives: [
      'Implementar paginação controlada, busca textual, filtros por atributos e ordenação segura por whitelist no endpoint de listagem de coleção.',
    ],
    prerequisites: [
      'Exercício 04 concluído e leitura do Tópico 03 da Etapa 04.',
    ],
    statement:
      'Evolua o endpoint de listagem (GET /api/v1/books ou GET /api/v1/bookings) para suportar paginação (page, per_page), busca textual (search), filtros de domínio e ordenação segura restrita a campos permitidos, retornando um envelope padronizado { data, meta }.',
    requirements: [
      'Aceitar os query params opcionais page (default 1, inteiro >= 1) e per_page (default 10, inteiro entre 1 e 50). Se o cliente pedir per_page > 50, page < 1 ou valores não numéricos, rejeitar com 422 Unprocessable Content.',
      'Suportar busca textual case-insensitive via search (ex.: título/autor ou título da reserva/sala) e ao menos 2 filtros específicos (ex.: category e available, ou roomId e status).',
      'Suportar ordenação controlada por lista branca (ex.: sort=title|createdAt|startAt e order=asc|desc), rejeitando com 422 qualquer campo fora da whitelist.',
      'Retornar sempre o envelope { "data": [...], "meta": { "page": 1, "per_page": 10, "total": 25, "total_pages": 3 } }, onde total reflete a quantidade de itens após aplicar os filtros/busca (antes do fatiamento da página).',
      'Quando nenhum item corresponder à busca ou filtro, retornar 200 OK com "data": [] e "total": 0 (nunca 404).',
    ],
    constraints: [
      'Aplicar a ordem correta do pipeline: filtrar/buscar primeiro → calcular total → ordenar pelos campos permitidos → fatiar a página solicitada → serializar cada item.',
    ],
    io: [
      'Entrada: requisições GET /api/v1/books?search=api&category=backend&sort=title&order=asc&page=1&per_page=5.',
      'Saída: 200 OK com { data, meta } paginado e serializado, ou 422 se query params violarem o contrato.',
    ],
    acceptanceCriteria: [
      'Sem query params, a rota aplica os defaults (page=1, per_page=10) e retorna o envelope { data, meta } correto.',
      'A combinação de search + filtro + sort retorna apenas os registros esperados na ordem correta e com meta.total preciso.',
      'Filtros sem correspondência retornam 200 OK com data: [] e meta.total: 0.',
      'Valores inválidos como per_page=500, page=0 ou sort=internalSecret retornam 422.',
    ],
    hints: [
      'Lembre-se de que na query string todos os parâmetros chegam como string: faça coerção segura de page e per_page para inteiro antes de validar os limites.',
      'Calcule meta.total logo após aplicar search e filtros, mas antes de executar o slice/offset da página.',
      'Para manter a ordenação determinística em empates, use o id como critério secundário de desempate.',
    ],
    testIdeas: [
      'Popular 15 itens no teste, requisitar page=2&per_page=10 e verificar que data tem 5 itens, meta.total é 15 e meta.total_pages é 2.',
      'Requisitar per_page=100 e sort=senha e confirmar retorno 422 em ambos os casos.',
      'Requisitar search=termo_que_nao_existe e confirmar retorno 200 OK com data: [].',
    ],
    refs: ['ref-04-laravel-resources', 'ref-04-zod-docs', 'ref-04-openapi-spec'],
    rubric: rubric04,
    deliverables: [
      ' Validação de query params e pipeline de paginação, busca, filtros e ordenação implementado.',
      'Testes cobrindo paginação, filtros combinados, lista vazia (200) e parâmetros inválidos (422).',
    ],
  },
  {
    id: '04-ex-06',
    slug: 'regras-agendamentos',
    title: 'Exercício 06 — Regras de negócio e conflitos de estado em Agendamentos (422 vs 409)',
    level: 'intermediario',
    optional: false,
    stageId: '04',
    kind: 'exercise',
    track: 'ambas',
    topicIds: ['04-validacao-regras-negocio', '04-laravel-recursos-crud', '04-express-recursos-crud'],
    competencies: [
      'Implementação de invariantes de domínio em reservas/agendamentos',
      'Detecção determinística de conflito de horário (sobreposição de intervalos)',
      'Uso semântico de 409 Conflict vs 422 Unprocessable Content vs 404 Not Found',
    ],
    objectives: [
      'Implementar o domínio de reservas de salas (/api/v1/bookings) impondo invariantes de negócio reais, bloqueio de sobreposição de horários e regras de transição de estado.',
    ],
    prerequisites: [
      'Exercícios 03 a 05 concluídos e leitura detalhada do Tópico 02 da Etapa 04.',
    ],
    statement:
      'Implemente o módulo de reservas de salas (/api/v1/rooms e /api/v1/bookings) com regras de negócio reais: validação de janela de horário, limite de duração, verificação de capacidade mínima da sala, detecção de conflito de horário entre reservas ativas e regra de cancelamento.',
    requirements: [
      'Validar as invariantes temporais do pedido (422 Unprocessable Content): startAt e endAt devem ser timestamps ISO 8601 válidos, startAt deve ser estritamente anterior a endAt, e a duração da reserva deve respeitar um mínimo e máximo (ex.: entre 30 minutos e 4 horas).',
      'Verificar a existência da sala (404 Not Found se roomId não existir) e a capacidade (422 ou 409 documentado se attendees exceder a capacidade máxima da sala).',
      'Impedir sobreposição de horário (409 Conflict): duas reservas ativas (status: "confirmed") para a mesma sala conflitam quando newStart < existingEnd e newEnd > existingStart. Reservas adjacentes (onde newStart === existingEnd) são permitidas.',
      'Permitir cancelar uma reserva ativa (alterando seu status para "cancelled"): uma vez cancelada, ela libera o horário para novas reservas na mesma sala e não pode ser cancelada novamentenem reativada indevidamente (retornando 409 Conflict se já estiver cancelada).',
    ],
    constraints: [
      'Isolar a lógica de verificação de invariantes e conflito em uma classe/serviço de domínio testável sem depender de objetos HTTP.',
      'Registrar no README que a checagem em memória resolve requisições sequenciais, enquanto o bloqueio concorrente multi-processo com banco de dados será tratado na Etapa 05.',
    ],
    io: [
      'Entrada: tentativas de criação e cancelamento de reservas com intervalos válidos, adjacentes, sobrepostos e inválidos.',
      'Saída: 201 Created para reservas válidas; 422 para janela inválida; 404 para sala/reserva inexistente; 409 para colisão de horário ou transição de estado inválida.',
    ],
    acceptanceCriteria: [
      'Reservas com startAt >= endAt ou duração fora do limite recebem 422.',
      'Tentar reservar uma sala já ocupada em qualquer interseção do intervalo retorna 409 Conflict sem salvar a reserva conflitante.',
      'Reservas em horários exatamente adjacentes (ex.: 10:00–11:00 e 11:00–12:00) na mesma sala ou no mesmo horário em salas diferentes são aceitas com 201.',
      'Cancelar uma reserva ativa libera o intervalo para uma nova reserva na mesma sala; tentar cancelar uma reserva já cancelada retorna 409.',
    ],
    hints: [
      'A fórmula matemática universal para interseção de dois intervalos semiabertos [A_start, A_end) e [B_start, B_end) é: A_start < B_end && A_end > B_start.',
      'Ignore reservas com status === "cancelled" ao verificar conflitos de horário para novas reservas.',
      'Converta as strings ISO 8601 para epoch em milissegundos (Date.parse / Carbon::parse) apenas após validar que a string é uma data ISO válida.',
    ],
    testIdeas: [
      'Criar reserva das 14:00 às 15:00 e testar: (a) 14:30–15:30 -> 409, (b) 13:30–14:30 -> 409, (c) 14:15–14:45 -> 409, (d) 15:00–16:00 -> 201 (adjacente).',
      'Cancelar a reserva das 14:00 às 15:00 e repetir a tentativa das 14:30 às 15:30 confirmando que agora retorna 201.',
      'Tentar cancelar novamente a mesma reserva já cancelada e confirmar retorno 409.',
    ],
    refs: ['ref-04-rfc-9110', 'ref-04-mdn-rest-status', 'ref-04-laravel-validation', 'ref-04-zod-docs'],
    rubric: rubric04,
    deliverables: [
      'Serviço de domínio e endpoints de reservas implementados com regras de conflito e transição de status.',
      'Suíte de testes unitários e HTTP cobrindo intervalos sobrepostos, adjacentes e cancelamento.',
    ],
  },

  // ================= AVANÇADO (3 exercícios: 07 obrigatório, 08 opcional, 09 obrigatório) =================
  {
    id: '04-ex-07',
    slug: 'problem-details-rfc9457',
    title: 'Exercício 07 — Padronização de erros com RFC 9457 (Problem Details)',
    level: 'avancado',
    optional: false,
    stageId: '04',
    kind: 'exercise',
    track: 'ambas',
    topicIds: ['04-erros-problem-details', '04-laravel-erros-testes-http', '04-express-erros-testes-http'],
    competencies: [
      'Implementação integral da RFC 9457 (type, title, status, detail, instance)',
      'Emissão do cabeçalho Content-Type: application/problem+json',
      'Extensões estruturadas para erros de validação (422) e conflito de negócio (409) sem vazar stack trace',
    ],
    objectives: [
      'Unificar todas as respostas de erro 4xx e 5xx da API no padrão RFC 9457 (Problem Details for HTTP APIs) com media type application/problem+json.',
    ],
    prerequisites: [
      'Exercício 06 concluído e leitura do Tópico 04 e do Tópico 09 da sua trilha.',
    ],
    statement:
      'Refatore o tratamento de erros da sua API para que qualquer falha (400 JSON inválido, 404 recurso/rota inexistente, 409 conflito de negócio, 422 erro de validação e 500 erro interno) retorne um objeto Problem Details em conformidade com a RFC 9457 e cabeçalho Content-Type: application/problem+json.',
    requirements: [
      'Garantir que todo payload de erro contenha os 5 membros da RFC 9457: type (URI estável por categoria de erro, ex.: https://stacktrail.dev/problems/booking-conflict), title, status, detail e instance (URI da requisição que falhou).',
      'Definir o cabeçalho de resposta Content-Type: application/problem+json em todas as respostas de erro.',
      'Nos erros 422 de validação (body ou query params), incluir o membro de extensão errors contendo a lista/mapa de problemas por campo.',
      'Nos erros 409 de conflito de reserva, incluir detalhes claros no detail (e opcionalmente membros de extensão como conflictingBookingId ou reason) sem expor dados sensíveis.',
      'Garantir que exceções inesperadas (500) retornem um Problem Details genérico e seguro quando em modo de produção, sem vazar stack trace.',
    ],
    constraints: [
      'Centralizar a formatação no handler global de exceções (bootstrap/app.php no Laravel ou error middleware no Express), evitando montar JSON de erro manualmente dentro de cada método de Controller.',
    ],
    io: [
      'Entrada: requisições que disparam erros 400, 404, 409, 422 e 500.',
      'Saída: respostas HTTP com status correspondente, Content-Type: application/problem+json e corpo RFC 9457.',
    ],
    acceptanceCriteria: [
      '100% das respostas 4xx e 5xx da API retornam Content-Type contendo application/problem+json.',
      'Todos os erros incluem type, title, status (idêntico ao status HTTP), detail e instance.',
      'Erros 422 trazem a extensão errors detalhando os campos inválidos; erros 409 trazem type e title específicos de conflito de estado.',
      'Em produção (APP_DEBUG=false ou NODE_ENV=production), um erro 500 não contém stack trace nem caminhos internos de arquivo.',
    ],
    hints: [
      'No Laravel, use response()->json($problem, $status, ["Content-Type" => "application/problem+json"]) dentro do withExceptions() em bootstrap/app.php.',
      'No Express, use res.status(problem.status).type("application/problem+json").json(problem) no middleware de erro de 4 argumentos.',
      'Use req.originalUrl (Express) ou $request->getRequestUri() (Laravel) para preencher automaticamente o campo instance.',
    ],
    testIdeas: [
      'Escrever um helper nos testes automatizados assertProblemDetails(response, expectedStatus, expectedType) e aplicá-lo nos testes de 400, 404, 409, 422 e 500.',
      'Verificar especificamente o cabeçalho Content-Type das respostas de erro.',
    ],
    refs: ['ref-04-rfc-9457', 'ref-04-laravel-errors-http-tests', 'ref-04-express-error-handling'],
    rubric: rubric04,
    deliverables: [
      'Handler centralizado RFC 9457 implementado na trilha escolhida.',
      'Testes automatizados verificando Content-Type: application/problem+json e estrutura RFC 9457 para 400, 404, 409, 422 e 500.',
    ],
  },
  {
    id: '04-ex-08',
    slug: 'idempotencia-falhas-externas',
    title: 'Exercício 08 — Idempotência (Idempotency-Key), timeouts e falhas externas (Opcional)',
    level: 'avancado',
    optional: true,
    stageId: '04',
    kind: 'exercise',
    track: 'ambas',
    topicIds: ['04-idempotencia-timeouts-integracoes', '04-erros-problem-details'],
    competencies: [
      'Prevenção de duplicidade em retries de POST com Idempotency-Key',
      'Configuração de timeout em cliente de integração externa',
      'Tradução de falhas transitórias de upstream em 502, 503 ou 504 com Problem Details',
    ],
    objectives: [
      'Proteger a criação de reservas contra retentativas duplicadas usando Idempotency-Key e tratar timeouts/indisponibilidade de um serviço externo simulado de notificação.',
    ],
    prerequisites: [
      'Exercício 07 concluído e leitura do Tópico 05 da Etapa 04.',
    ],
    statement:
      'Exercício avançado opcional: adicione suporte ao cabeçalho Idempotency-Key no endpoint POST /api/v1/bookings e integre um serviço externo simulado (como envio de confirmação de reserva) com controle de timeout e tradução de falhas externas para Problem Details (502/503/504).',
    requirements: [
      'Quando o cliente enviar o cabeçalho Idempotency-Key em POST /api/v1/bookings: se a chave for nova, processar a reserva e armazenar o resultado associado à chave e ao hash do payload; se a mesma chave for reenviada com o mesmo payload, retornar a mesma resposta sem criar uma segunda reserva.',
      'Se o cliente reutilizar a mesma Idempotency-Key com um payload diferente, retornar 409 Conflict ou 422 Unprocessable Content em application/problem+json explicando o uso indevido da chave.',
      'Implementar uma interface/adaptador de serviço externo simulado (NotificationGateway) que possa operar em três modos nos testes: ok, timeout e unavailable.',
      'Impor timeout explícito na chamada externa e mapear timeout para 504 Gateway Timeout e indisponibilidade para 503 Service Unavailable (ou 502 Bad Gateway) em formato Problem Details (RFC 9457).',
    ],
    constraints: [
      'Atividade opcional de aprofundamento em resiliência: altamente recomendada para o projeto principal, mas não bloqueia sozinha a conclusão da etapa.',
      'O serviço externo deve ser simulado localmente (in-process ou servidor mock de teste) para que a suíte rode offline e rápido.',
    ],
    io: [
      'Entrada: requisições POST repetidas com cabeçalho Idempotency-Key e chamadas sob simulação de falha/timeout do gateway externo.',
      'Saída: resposta idempotente sem duplicação de reserva e erros 503/504 formatados segundo a RFC 9457.',
    ],
    acceptanceCriteria: [
      'Enviar duas vezes o mesmo POST /api/v1/bookings com a mesma Idempotency-Key cria apenas uma reserva e retorna o mesmo ID nas duas respostas.',
      'Enviar a mesma Idempotency-Key com corpo diferente é rejeitado com Problem Details (409/422).',
      'Quando o gateway externo simulado excede o timeout ou falha, a API responde com 504 ou 503 em application/problem+json em tempo previsível.',
    ],
    hints: [
      'Guarde no mapa de idempotência em memória: { key, payloadHash, statusCode, responseBody, locationHeader }.',
      'No Node.js/Express, você pode simular um timeout real usando AbortSignal.timeout(ms) ou um adaptador injetável no serviço.',
      'No Laravel, injete uma interface NotificationGateway no Service Container e troque a implementação nos testes com $this->app->bind(...).',
    ],
    testIdeas: [
      'Disparar dois POSTs idênticos com Idempotency-Key: "req-123" e depois listar GET /api/v1/bookings confirmando que meta.total é 1.',
      'Configurar o NotificationGateway simulado no modo timeout e verificar retorno 504 com Content-Type: application/problem+json.',
    ],
    refs: ['ref-04-rfc-9110', 'ref-04-rfc-9457', 'ref-04-mdn-abort-timeout'],
    rubric: rubric04,
    deliverables: [
      'Suporte a Idempotency-Key e adaptador de integração externa com timeout implementados.',
      'Testes automatizados comprovando idempotência e respostas 503/504 Problem Details.',
    ],
  },
  {
    id: '04-ex-09',
    slug: 'openapi-documentacao-revisao',
    title: 'Exercício 09 — Especificação OpenAPI 3.1, coleção e revisão técnica de contrato',
    level: 'avancado',
    optional: false,
    stageId: '04',
    kind: 'exercise',
    track: 'ambas',
    topicIds: ['04-openapi-documentacao', '04-erros-problem-details', '04-laravel-erros-testes-http', '04-express-erros-testes-http'],
    competencies: [
      'Escrita de especificação OpenAPI 3.1 (openapi.yaml ou openapi.json) fiel ao código',
      'Documentação de schemas reutilizáveis, paginação, filtros e Problem Details (RFC 9457)',
      'Auditoria de paridade entre OpenAPI, coleção Bruno/Postman, README e suíte de testes',
    ],
    objectives: [
      'Documentar formalmente a API com OpenAPI 3.1, exportar uma coleção reproduzível no Bruno ou Postman e realizar uma revisão técnica garantindo paridade total entre documentação e implementação.',
    ],
    prerequisites: [
      'Exercícios 01 a 07 concluídos e leitura do Tópico 06 da Etapa 04.',
    ],
    statement:
      'Escreva o arquivo openapi.yaml (ou openapi.json) completo da sua API, monte a coleção Bruno ou Postman correspondente e execute uma revisão técnica cruzando o contrato OpenAPI com as asserções da sua suíte de testes automatizados.',
    requirements: [
      'Criar openapi.yaml (ou openapi.json) na versão 3.1.x descrevendo todas as rotas /api/v1 implementadas, parâmetros de rota, query params de paginação/busca/filtros/ordenação, corpos de requisição e respostas.',
      'Definir em components/schemas os modelos de saída, envelopes de paginação ({ data, meta }) e o schema ProblemDetails (RFC 9457) associado ao media type application/problem+json.',
      'Incluir exemplos realistas de sucesso (200, 201, 204) e de erro (400, 404, 409, 422, 500) dentro da especificação OpenAPI.',
      'Disponibilizar coleção Bruno ou Postman cobrindo os cenários principais de sucesso e falha e documentar no README como executar a API, os testes e a coleção.',
    ],
    constraints: [
      'A especificação OpenAPI não pode conter endpoints fictícios que não existam no código nem omitir códigos de status que a API realmente retorna.',
    ],
    io: [
      'Entrada: API implementada e testada nos exercícios anteriores.',
      'Saída: arquivo openapi.yaml/json validado, coleção Bruno/Postman e checklist de revisão no README.',
    ],
    acceptanceCriteria: [
      'O arquivo openapi.yaml/json é sintaticamente válido e descreve com exatidão os caminhos, métodos, query params, schemas e status da API.',
      'As respostas 4xx e 5xx no OpenAPI declaram o content type application/problem+json referenciando o schema ProblemDetails.',
      'A coleção Bruno/Postman e as instruções do README funcionam contra a aplicação local sem ajustes manuais ocultos.',
    ],
    hints: [
      'Reutilize parâmetros comuns de paginação (page, per_page, search, sort, order) e respostas comuns de erro (NotFoundProblem, ValidationProblem, ConflictProblem) na seção components do OpenAPI para evitar repetição.',
      'Importe o seu openapi.yaml no Bruno ou Postman para verificar se todas as rotas e exemplos são lidos sem erros de sintaxe.',
      'Inclua um teste automatizado simples que valide se o arquivo openapi.yaml/json existe no repositório e contém os caminhos essenciais da API.',
    ],
    testIdeas: [
      'Comparar cada rota registrada no Laravel/Express com as chaves de paths no arquivo OpenAPI.',
      'Executar todas as requisições da coleção Bruno/Postman contra o servidor local recém-iniciado.',
    ],
    refs: ['ref-04-openapi-spec', 'ref-04-rfc-9457', 'ref-04-rfc-9110'],
    rubric: rubric04,
    deliverables: [
      'Arquivo openapi.yaml ou openapi.json na raiz ou pasta docs/ do repositório.',
      'Coleção Bruno ou Postman exportada e README revisado.',
    ],
  },
];

export const topics04: StudyTopic[] = rawTopics04.map((t) => ({
  id: t.id,
  name: t.title,
  goal: `${t.summary} ${t.WhyItMatters}`,
  before: t.prerequisites,
  optional: false,
  refs: t.refs,
  exerciseIds: tasks04.filter((ex) => ex.topicIds.includes(t.id)).map((ex) => ex.id),
  stageId: t.stageId,
  track: t.track,
  competencies: t.competencies,
  practiceCriteria: [t.doneCriteria, ...t.practice],
}));

export const project04CatalogBasic: Activity = {
  id: '04-project-catalog-basic',
  slug: 'api-catalogo-rest',
  title: 'Projeto 1 (Iniciante) — API de Catálogo REST',
  stageId: '04',
  kind: 'project',
  level: 'inicial',
  optional: true,
  track: 'ambas',
  topicIds: [
    '04-contratos-http-recursos',
    '04-validacao-regras-negocio',
    '04-laravel-recursos-crud',
    '04-laravel-formrequest-resources',
    '04-express-recursos-crud',
    '04-express-zod-serializacao',
  ],
  competencies: [
    'Modelagem e implementação de CRUD REST sob /api/v1',
    'Validação de entrada por campo e prevenção de mass assignment',
    'Serialização explícita de saída (API Resources ou Output DTOs)',
    'Testes HTTP básicos de sucesso e erro (200, 201, 204, 400, 404, 422)',
  ],
  context:
    'Toda aplicação backend profissional começa por recursos REST bem desenhados, onde entradas são validadas com rigor e respostas públicas seguem um contrato estável.',
  problem:
    'Construir uma API REST de catálogo (livros, produtos ou salas) na sua trilha escolhida que implemente o ciclo completo de criação, leitura, atualização parcial e remoção sem expor campos internos e sem aceitar mutações inválidas.',
  statement:
    'Desenvolva uma API REST de catálogo sob o prefixo /api/v1 na sua trilha escolhida (PHP/Laravel ou TypeScript/Node.js/Express) com endpoints GET, POST, PATCH e DELETE, validação de entrada, proteção contra mass assignment, serialização segura de saída e testes automatizados.',
  objectives: [
    'Consolidar a construção de endpoints REST, validação e serialização de saída antes de avançar para paginação complexa e conflitos de agendamento.',
  ],
  prerequisites: [
    'Tópicos 01, 02, 07 e 08 da Etapa 04 e Exercícios 01 a 04.',
  ],
  requirements: [
    'Implementar GET /api/v1/books, GET /api/v1/books/{id}, POST /api/v1/books (201 + header Location), PATCH /api/v1/books/{id} (200) e DELETE /api/v1/books/{id} (204).',
    'Validar entradas com FormRequest (Laravel) ou Zod (Express), rejeitando payloads inválidos com 422 e prevenindo mass assignment.',
    'Serializar todas as respostas com JsonResource (Laravel) ou Output DTO (Express), ocultando propriedades internas do modelo.',
    'Incluir suíte de testes automatizados e README com exemplos de requisição e resposta.',
  ],
  nonfunctional: [
    'Determinismo: armazenamento em memória ou arquivo JSON temporário isolado nos testes.',
    'Segurança de contrato: nenhuma propriedade interna ou stack trace exposta nas respostas.',
  ],
  constraints: [
    'Projeto inicial opcional de aquecimento: não substitui o projeto avançado obrigatório Booking API para conclusão da Etapa 04.',
    'Implementar apenas na sua stack escolhida (PHP/Laravel ou TS/Express).',
  ],
  io: [
    'Entrada: requisições HTTP CRUD para /api/v1/books.',
    'Saída: respostas JSON padronizadas com status 200, 201, 204, 400, 404 e 422.',
  ],
  acceptanceCriteria: [
    'Todos os 5 endpoints funcionam conforme a semântica HTTP da RFC 9110.',
    'Tentativas de mass assignment ou PATCH inválido não corrompem o recurso armazenado.',
    'Campos internos de controle não vazam no JSON público e os testes automatizados passam.',
  ],
  hints: [
    'Você pode evoluir diretamente o código deste projeto para o Projeto 2 (Catálogo Avançado) e reutilizar sua estrutura base no Projeto 3 (Booking API).',
    'Confira sempre se o cabeçalho Location retornado no POST 201 aponta para a URI exata do item criado.',
    'Garanta que o DELETE retorne 204 sem corpo e que um GET subsequente retorne 404.',
  ],
  testIdeas: [
    'Testar o fluxo completo de criação, leitura, atualização parcial, erro de validação 422 e exclusão.',
  ],
  refs: ['ref-04-rfc-9110', 'ref-04-laravel-routing-api', 'ref-04-laravel-resources', 'ref-04-express-routing-middleware', 'ref-04-zod-docs'],
  rubric: rubric04,
  deliverables: [
    'Repositório com código-fonte da API de catálogo, testes automatizados e README.',
  ],
  milestones: [
    'Definir o contrato e montar as rotas /api/v1/books.',
    'Adicionar validação de entrada e serialização explícita de saída.',
    'Escrever os testes HTTP e documentar no README.',
  ],
};

export const project04CatalogAdvanced: Activity = {
  id: '04-project-catalog-advanced',
  slug: 'api-catalogo-avancada',
  title: 'Projeto 2 (Intermediário) — API de Catálogo Avançada (Paginação, Problem Details e OpenAPI)',
  stageId: '04',
  kind: 'project',
  level: 'intermediario',
  optional: true,
  track: 'ambas',
  topicIds: [
    '04-contratos-http-recursos',
    '04-validacao-regras-negocio',
    '04-paginacao-filtros-ordenacao',
    '04-erros-problem-details',
    '04-openapi-documentacao',
    '04-laravel-formrequest-resources',
    '04-laravel-erros-testes-http',
    '04-express-zod-serializacao',
    '04-express-erros-testes-http',
  ],
  competencies: [
    'Paginação controlada, busca textual, filtros combinados e whitelist de ordenação',
    'Padronização de erros com RFC 9457 (application/problem+json)',
    'Regras de negócio de acervo (ex.: unicidade de ISBN/código e controle de estoque/disponibilidade)',
    'Documentação formal com OpenAPI 3.1 e coleção Bruno/Postman',
  ],
  context:
    'APIs reais de catálogo precisam lidar com listagens volumosas, buscas combinadas, conflitos de unicidade e respostas de erro padronizadas para múltiplos clientes.',
  problem:
    'Evoluir uma API REST de catálogo para suportar paginação com metadados, filtros e ordenação seguros, invariantes de unicidade (409 Conflict), erros no padrão RFC 9457 e contrato OpenAPI 3.1.',
  statement:
    'Construa uma API de Catálogo Avançada na sua trilha escolhida (PHP/Laravel ou TypeScript/Node.js/Express) integrando CRUD completo, regras de unicidade e disponibilidade (409 vs 422), listagem paginada com busca/filtros/ordenação por whitelist, respostas de erro RFC 9457 (application/problem+json) e especificação OpenAPI 3.1.',
  objectives: [
    'Dominar paginação, filtros, Problem Details (RFC 9457) e OpenAPI 3.1 em um domínio de catálogo antes ou como complemento ao projeto principal de agendamentos.',
  ],
  prerequisites: [
    'Tópicos 01 a 04 e 06 a 09 da Etapa 04 e Exercícios 01 a 07.',
  ],
  requirements: [
    'Implementar CRUD completo de catálogo sob /api/v1 com regra de negócio que impeça cadastro de código/ISBN duplicado (retornando 409 Conflict) e bloqueie exclusão de item com operação ativa (409 Conflict).',
    'Implementar paginação (page, per_page com limite máximo de 50), busca textual (search), filtros e ordenação por whitelist retornando { data, meta }.',
    'Formatar todos os erros 400, 404, 409, 422 e 500 segundo a RFC 9457 com cabeçalho Content-Type: application/problem+json.',
    'Incluir arquivo openapi.yaml/json válido, coleção Bruno/Postman e suíte de testes automatizados.',
  ],
  nonfunctional: [
    'Consistência contratual: paridade entre OpenAPI, respostas reais e testes automatizados.',
    'Proteção contra paginação abusiva e ordenação por campos arbitrários.',
  ],
  constraints: [
    'Projeto intermediário opcional: excelente preparação prática, mas a conclusão da Etapa 04 requer o projeto avançado Booking API.',
    'Armazenamento em memória ou JSON temporário sem exigir banco SQL.',
  ],
  io: [
    'Entrada: chamadas HTTP de catálogo com filtros/paginação e cenários de conflito/validação.',
    'Saída: respostas paginadas { data, meta }, erros application/problem+json e especificação OpenAPI.',
  ],
  acceptanceCriteria: [
    'A listagem aplica paginação, busca, filtros e ordenação por whitelist com retorno 200 para lista vazia e 422 para query params inválidos.',
    'Duplicidade de código/ISBN retorna 409 Conflict em formato Problem Details (RFC 9457).',
    'O arquivo OpenAPI 3.1 e a suíte de testes cobrem todos os endpoints e códigos de status.',
  ],
  hints: [
    'Teste cuidadosamente a interação entre filtros e paginação para garantir que meta.total reflita o total filtrado.',
    'Reutilize o formatador RFC 9457 e os componentes OpenAPI que você construiu nos Exercícios 07 e 09.',
  ],
  testIdeas: [
    'Cadastrar um item, tentar cadastrar outro com o mesmo ISBN/código (esperando 409 application/problem+json) e testar a listagem paginada.',
  ],
  refs: ['ref-04-rfc-9457', 'ref-04-openapi-spec', 'ref-04-laravel-resources', 'ref-04-laravel-errors-http-tests', 'ref-04-express-error-handling', 'ref-04-zod-docs'],
  rubric: rubric04,
  deliverables: [
    'Repositório com código-fonte, openapi.yaml/json, coleção Bruno/Postman, testes automatizados e README.',
  ],
  milestones: [
    'Implementar CRUD, serialização segura e regras de conflito (409) do catálogo.',
    'Adicionar paginação, busca, filtros e ordenação segura.',
    'Padronizar erros com RFC 9457 e documentar com OpenAPI 3.1.',
  ],
};

export const project04BookingApi: Activity = {
  id: '04-project-booking-api',
  slug: 'booking-api-rest-business-rules',
  title: 'Projeto 3 (Avançado — Principal) — Booking API: REST & Business Rules',
  stageId: '04',
  kind: 'project',
  level: 'avancado',
  optional: false,
  track: 'ambas',
  topicIds: topics04.map((t) => t.id),
  competencies: [
    'Design e implementação de API RESTful versionada (/api/v1) com recursos de Salas e Reservas',
    'Separação rigorosa entre validação de entrada (422) e invariantes/conflitos de regras de negócio (409)',
    'Paginação controlada, busca textual, filtros combinados e ordenação por whitelist',
    'Padronização de erros com RFC 9457 (application/problem+json), idempotência e resiliência a falhas externas (502/503/504)',
    'Especificação OpenAPI 3.1, coleção Bruno/Postman, suíte de testes automatizados e documentação de portfólio',
  ],
  context:
    'No mercado de trabalho, uma API backend raramente é apenas um CRUD passivo: ela precisa proteger invariantes de negócio (como impedir reservas conflitantes na mesma sala), expor contratos claros com paginação e filtros, padronizar erros segundo normas da indústria (RFC 9457) e manter documentação OpenAPI sincronizada com testes automatizados.',
  problem:
    'Construir na sua trilha escolhida (PHP + Laravel ou TypeScript + Node.js + Express) uma API completa de agendamento de salas/recursos (Booking API) que garanta integridade das regras de negócio, contratos HTTP semânticos, erros Problem Details (RFC 9457), idempotência/tratamento de falhas externas e especificação OpenAPI 3.1 verificável.',
  statement:
    'Desenvolva e documente para portfólio a **Booking API — REST & Business Rules** na sua stack escolhida (PHP/Laravel ou TypeScript/Node.js/Express). O sistema deve gerenciar Salas (/api/v1/rooms) e Reservas (/api/v1/bookings), impondo regras de capacidade, janela de horário, detecção de conflito de agenda (409), ciclo de cancelamento, paginação/filtros/ordenação segura, erros padronizados em application/problem+json (RFC 9457), proteção de idempotência/timeout externo, especificação OpenAPI 3.1 e suíte completa de testes automatizados.',
  objectives: [
    'Demonstrar domínio prático de contratos REST, regras de negócio, validação, serialização segura, paginação, RFC 9457 Problem Details, testes HTTP e OpenAPI 3.1 na trilha escolhida.',
  ],
  prerequisites: [
    'Todos os tópicos da Etapa 04 (Fundamentos Comuns + sua trilha escolhida).',
    'Exercícios obrigatórios da Etapa 04 (04-ex-01 a 04-ex-07 e 04-ex-09) concluídos.',
  ],
  requirements: [
    'Módulo 1 · Recursos e Contratos HTTP (/api/v1): implementar GET /api/v1/health (200), CRUD de salas em /api/v1/rooms (GET lista, GET por ID, POST 201 com Location, PATCH 200, DELETE 204) e operações de reservas em /api/v1/bookings (GET paginado, GET por ID, POST 201 com Location e cancelamento via PATCH ou DELETE documentado).',
    'Módulo 2 · Validação vs Regras de Negócio e Serialização Segura: validar entradas com FormRequest (Laravel) ou Zod (Express) prevenindo mass assignment; serializar saídas com API Resources ou Output DTOs ocultando campos internos; impor invariantes de negócio diferenciando 422 (ex.: startAt >= endAt, duração inválida, capacidade insuficiente se tratada como validação) de 409 Conflict (ex.: sobreposição de horário com reserva ativa na mesma sala, sala inativa/em manutenção, tentativa de cancelar reserva já cancelada ou excluir sala que possui reservas ativas).',
    'Módulo 3 · Paginação, Busca, Filtros e Ordenação: suportar em GET /api/v1/bookings e/ou GET /api/v1/rooms os parâmetros page (default 1), per_page (default 10, máx 50), search, filtros de domínio (ex.: roomId, status, dateFrom/dateTo, minCapacity) e sort/order restritos por whitelist, retornando { data, meta } com 200 OK para listas vazias e 422 para query params inválidos.',
    'Módulo 4 · Erros RFC 9457, Idempotência e Integração Externa: retornar todas as falhas 400, 404, 409, 422, 500 e 502/503/504 no padrão RFC 9457 (type, title, status, detail, instance + extensão errors no 422) com cabeçalho Content-Type: application/problem+json; suportar Idempotency-Key no POST /api/v1/bookings para evitar duplicidade em retries e simular integração com serviço externo de notificação com timeout e tradução de falha (503/504).',
    'Módulo 5 · OpenAPI 3.1, Coleção, Testes e README: entregar arquivo openapi.yaml ou openapi.json completo, coleção Bruno ou Postman, suíte de testes automatizados (php artisan test ou npm test) cobrindo todos os módulos e README detalhando arquitetura, regras de negócio, exemplos e a limitação explícita do armazenamento em memória quanto à concorrência multi-processo (que será resolvida com SQL na Etapa 05).',
  ],
  nonfunctional: [
    'Rubrica ponderada da etapa: 30% Funcionalidade e regras de negócio, 25% Contrato HTTP e erros RFC 9457, 15% Validação e segurança de serialização, 15% Testes automatizados, 15% OpenAPI e README.',
    'Segurança: zero exposição de stack traces, caminhos internos ou segredos; .env.example versionado e .env ignorado.',
    'Execução offline e determinística: todos os testes automatizados devem rodar com um único comando sem depender de banco externo ou serviços reais na internet.',
  ],
  constraints: [
    'Implementar apenas na sua trilha escolhida (PHP + Laravel OU TypeScript + Node.js + Express).',
    'Não exigir PostgreSQL/MySQL, ORM em banco real, autenticação JWT/Sanctum, filas ou Docker (temas das Etapas 05 a 08).',
  ],
  io: [
    'Entrada: requisições HTTP para /api/v1/rooms e /api/v1/bookings cobrindo fluxos de sucesso, paginação, conflitos 409, validações 422, retries idempotentes e falhas externas.',
    'Saída: repositório de portfólio completo com API funcional, respostas JSON / application/problem+json, especificação OpenAPI 3.1, coleção Bruno/Postman e suíte de testes verde.',
  ],
  acceptanceCriteria: [
    'Todos os endpoints de /api/v1/rooms e /api/v1/bookings respeitam a semântica HTTP (200, 201 com Location, 204 sem corpo, 400, 404, 409, 422, 503/504).',
    'A regra de colisão de horário bloqueia com 409 qualquer interseção com reserva ativa da mesma sala, permite horários adjacentes e libera o horário após cancelamento.',
    'A listagem implementa paginação com limite máximo, busca, filtros e ordenação por whitelist com envelope { data, meta }.',
    'Todas as respostas de erro seguem a RFC 9457 com Content-Type: application/problem+json e sem vazamento de stack trace.',
    'A suíte automatizada de testes, o arquivo openapi.yaml/json, a coleção Bruno/Postman e o README estão completos e sincronizados.',
  ],
  hints: [
    'Construa o projeto incrementalmente seguindo os Exercícios 01 a 09: cada exercício já resolve uma fatia direta da Booking API.',
    'Mantenha a regra de verificação de conflito de agenda e transições de status em um serviço de domínio desacoplado do framework para testar casos de borda rapidamente.',
    'No README, inclua uma tabela clara listando cada código de status retornado pela API e o type URI correspondente do Problem Details (RFC 9457).',
  ],
  testIdeas: [
    'Rodar a suíte completa de testes automatizados em ambiente limpo verificando CRUD de salas, criação de reserva, colisão de horário (409), reserva adjacente (201), cancelamento, nova reserva no horário liberado (201), paginação/filtros, Idempotency-Key e timeout externo (504).',
    'Importar o arquivo openapi.yaml/json e a coleção no Bruno ou Postman e testar manualmente os endpoints.',
  ],
  refs: [
    'ref-04-rfc-9110',
    'ref-04-rfc-9457',
    'ref-04-openapi-spec',
    'ref-04-mdn-rest-status',
    'ref-04-mdn-abort-timeout',
    'ref-04-laravel-routing-api',
    'ref-04-laravel-validation',
    'ref-04-laravel-resources',
    'ref-04-laravel-errors-http-tests',
    'ref-04-express-routing-middleware',
    'ref-04-express-error-handling',
    'ref-04-zod-docs',
  ],
  rubric: rubric04,
  deliverables: [
    'Repositório Git com código-fonte organizado na trilha escolhida (PHP/Laravel ou TS/Node/Express), .gitignore e .env.example.',
    'Especificação OpenAPI 3.1 (openapi.yaml ou openapi.json) e coleção Bruno/Postman exportada.',
    'Suíte de testes automatizados cobrindo contratos HTTP, regras de negócio, paginação, RFC 9457, idempotência e falhas externas.',
    'README profissional documentando regras de negócio, endpoints, execução, exemplos e limites arquiteturais da etapa.',
  ],
  milestones: [
    'Marco 1 — Contrato e CRUD de Salas: estruturar /api/v1/rooms com validação, serialização segura e status 200/201/204/404/422.',
    'Marco 2 — Domínio de Reservas e Regras de Conflito: implementar /api/v1/bookings com checagem de janela temporal (422), conflito de horário (409) e cancelamento.',
    'Marco 3 — Paginação, RFC 9457 e Resiliência: adicionar paginação/filtros/sort por whitelist, padronizar erros em application/problem+json, suportar Idempotency-Key e simular timeout/falha externa.',
    'Marco 4 — OpenAPI 3.1, Testes e Portfólio: consolidar openapi.yaml, coleção Bruno/Postman, suíte de testes e README final.',
  ],
  extras: [
    'Adicionar endpoint GET /api/v1/rooms/{id}/availability?date=YYYY-MM-DD retornando os intervalos livres e ocupados da sala no dia.',
    'Servir uma página estática de documentação interativa (Swagger UI ou Scalar) lendo diretamente o arquivo openapi.yaml da aplicação.',
  ],
};

export const projects04: Activity[] = [
  project04CatalogBasic,
  project04CatalogAdvanced,
  project04BookingApi,
];

export const books04: Book[] = [
  {
    id: 'book-04-engenharia-software',
    title: 'Fundamentos da Engenharia de Software',
    author: 'Nathaniel Schutta e Dan Vega',
    edition: '1ª edição',
    year: '2026',
    language: 'PT-BR',
    level: 'Iniciante a Intermediário',
    topics: ['04-contratos-http-recursos', '04-validacao-regras-negocio', '04-openapi-documentacao'],
    stages: ['04'],
    track: 'ambas',
    url: 'https://novatec.com.br/livros/fundamentos-engenharia-de-software/',
    reason: 'Conecta implementação de contratos de API, testes automatizados, refatoração, documentação técnica e decisões pragmáticas de engenharia no dia a dia.',
    note: 'Metadados e sumário verificados no catálogo oficial da Novatec (ISBN 978-85-7522-982-8). Leitura opcional complementar válida para ambas as trilhas.',
    community: 'Tradução brasileira da edição O’Reilly publicada pela Novatec Editora.',
    alternatives: ['ref-04-rfc-9110', 'ref-04-openapi-spec', 'ref-04-mdn-rest-status'],
    cover: {
      kind: 'image',
      src: 'covers/fundamentos-engenharia-software.webp',
      alt: 'Capa do livro Fundamentos da Engenharia de Software, de Nathaniel Schutta e Dan Vega (Novatec Editora / O’Reilly)',
      width: 292,
      height: 403,
      origin: 'Catálogo oficial da Novatec Editora (ISBN 978-85-7522-982-8, capa ampliada s3.novatec.com.br).',
      usage: 'Asset estático otimizado em WebP para identificação bibliográfica da edição recomendada, sem links de compra ou preços.',
    },
  },
  {
    id: 'book-04-node-projetos-reais',
    title: 'Aprenda Node.js com Projetos Reais',
    author: 'Jonathan Wexler',
    edition: '1ª edição',
    year: '2025',
    language: 'PT-BR',
    level: 'Iniciante a Intermediário',
    topics: ['04-express-recursos-crud', '04-express-zod-serializacao', '04-express-erros-testes-http'],
    stages: ['04'],
    track: 'javascript',
    url: 'https://novatec.com.br/livros/aprenda-node-com-projetos-reais/',
    reason: 'Explora construção prática de rotas, controllers, APIs REST e testes de aplicações web com Node.js e Express em projetos progressivos.',
    note: 'Metadados verificados no catálogo oficial da Novatec (ISBN 978-85-7522-970-5). Na Etapa 04, foque nos capítulos de roteamento Express, construção de APIs REST e testes; persistência em banco de dados e autenticação pertencem às Etapas 05 e 07.',
    community: 'Tradução brasileira publicada pela Novatec Editora; leitura opcional para a trilha TypeScript/Node.js/Express.',
    alternatives: ['ref-04-express-routing-middleware', 'ref-04-express-error-handling', 'ref-04-zod-docs'],
    cover: {
      kind: 'image',
      src: 'covers/aprenda-node-projetos-reais.webp',
      alt: 'Capa do livro Aprenda Node.js com Projetos Reais, de Jonathan Wexler (Novatec Editora)',
      width: 292,
      height: 403,
      origin: 'Catálogo oficial da Novatec Editora (ISBN 978-85-7522-970-5, capa ampliada s3.novatec.com.br).',
      usage: 'Asset estático otimizado em WebP para identificação bibliográfica da edição recomendada, sem links de compra ou preços.',
    },
  },
  {
    id: 'book-04-arquitetura-software-2ed',
    title: 'Fundamentos da Arquitetura de Software — 2ª Edição',
    author: 'Mark Richards e Neal Ford',
    edition: '2ª edição',
    year: '2025',
    language: 'PT-BR',
    level: 'Intermediário a Avançado (Leitura complementar)',
    topics: ['04-validacao-regras-negocio', '04-erros-problem-details', '04-idempotencia-timeouts-integracoes'],
    stages: ['04'],
    track: 'ambas',
    url: 'https://novatec.com.br/livros/fundamentos-arquitetura-software-2ed/',
    reason: 'Aprofunda análise de trade-offs, contratos entre componentes, separação de responsabilidades, tratamento de falhas de integração e pensamento arquitetural.',
    note: 'Metadados verificados no catálogo oficial da Novatec (ISBN 978-85-7522-968-2). Na Etapa 04, utilize apenas os capítulos iniciais sobre pensamento arquitetural, modularidade e contratos; estilos distribuídos avançados pertencem às etapas de nível Pleno/Sênior.',
    community: 'Obra de referência da O’Reilly / Novatec Editora apresentada como leitura opcional complementar.',
    alternatives: ['ref-04-rfc-9457', 'ref-04-mdn-abort-timeout', 'ref-04-openapi-spec'],
    cover: {
      kind: 'image',
      src: 'covers/fundamentos-arquitetura-software-2ed.webp',
      alt: 'Capa do livro Fundamentos da Arquitetura de Software — 2ª Edição, de Mark Richards e Neal Ford (Novatec Editora / O’Reilly)',
      width: 292,
      height: 403,
      origin: 'Catálogo oficial da Novatec Editora (ISBN 978-85-7522-968-2, capa ampliada s3.novatec.com.br).',
      usage: 'Asset estático otimizado em WebP para identificação bibliográfica da 2ª edição, sem links de compra ou preços.',
    },
  },
];
