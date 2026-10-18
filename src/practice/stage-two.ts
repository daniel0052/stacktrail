import type { Activity, Book, StudyTopic } from './curriculum';
import type { Reference } from './catalog';

const checkedOn = '2026-10-17';

const ref = (
  id: string,
  title: string,
  url: string,
  language: 'PT-BR' | 'Inglês',
  section: string,
  note = '',
  version = 'Documentação viva · consultada em 2026-10-17',
  type = 'Documentação oficial',
  cost: Reference['cost'] = 'Gratuito'
): Reference => ({
  id,
  title,
  url,
  language,
  type,
  cost,
  section,
  version,
  note,
  checked: checkedOn,
  adequacy: checkedOn,
});

export const references02: Reference[] = [
  ref(
    'ref-02-mdn-url',
    'MDN · What is a URL?',
    'https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL',
    'Inglês',
    'Howto / Web mechanics / What is a URL? (esquema, autoridade, porta, caminho, query e fragmento)',
    'A rota equivalente em pt-BR retorna 404 na MDN atual; combine com a Visão geral do HTTP em português.',
    'MDN viva',
    'Guia oficial'
  ),
  ref(
    'ref-02-mdn-http',
    'MDN · HTTP (HyperText Transfer Protocol)',
    'https://developer.mozilla.org/pt-BR/docs/Web/HTTP',
    'PT-BR',
    'Portal Web / HTTP: arquitetura, mensagens, status, headers, cache, cookies e segurança',
    'Portal central em português; alguns subguias específicos apontam para artigos em inglês quando a tradução inexiste.'
  ),
  ref(
    'ref-02-mdn-http-overview',
    'MDN · Uma visão geral do HTTP',
    'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview',
    'PT-BR',
    'Componentes de sistemas baseados em HTTP, cliente, servidor, proxies e fluxo de transação',
    'Explica por que o HTTP é sem estado (stateless), mas não sem sessão quando combinado a cookies.'
  ),
  ref(
    'ref-02-mdn-http-messages',
    'MDN · Mensagens HTTP',
    'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Messages',
    'PT-BR',
    'Anatomia de requisições (start-line, headers, body) e respostas HTTP (status line, headers, body)',
    'Ilustra o formato textual HTTP/1.1 e o enquadramento em quadros binários no HTTP/2.'
  ),
  ref(
    'ref-02-mdn-client-server',
    'MDN · Visão geral do modelo cliente-servidor',
    'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview',
    'PT-BR',
    'Interação navegador-servidor, recursos estáticos e respostas dinâmicas via HTTP',
    'Leitura introdutória conceitual; a implementação de código no servidor pertence somente à Etapa 03.'
  ),
  ref(
    'ref-02-mdn-methods',
    'MDN · HTTP request methods',
    'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods',
    'Inglês',
    'Métodos GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE e PATCH (safe, idempotent, cacheable)',
    'Consulte as páginas individuais dos métodos para verificar presença de corpo e propriedades de idempotência.'
  ),
  ref(
    'ref-02-mdn-status',
    'MDN · Códigos de status de respostas HTTP',
    'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status',
    'PT-BR',
    'Famílias 1xx, 2xx, 3xx, 4xx e 5xx (200, 201, 204, 301, 302, 304, 400, 401, 403, 404, 405, 409, 422, 429, 500, 502, 503)',
    'Referência primária em português para distinguir 401 vs 403 e 400 vs 409 vs 422.'
  ),
  ref(
    'ref-02-mdn-headers',
    'MDN · Cabeçalhos HTTP (Headers)',
    'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Headers',
    'PT-BR',
    'Cabeçalhos Accept, Content-Type, Authorization, Cache-Control, Location, Origin, Cookie e Set-Cookie',
    'Índice em português dos cabeçalhos de requisição, resposta e representação.'
  ),
  ref(
    'ref-02-mdn-cookies',
    'MDN · Usando cookies HTTP',
    'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Cookies',
    'PT-BR',
    'Ciclo Set-Cookie e Cookie, sessões e atributos HttpOnly, Secure, SameSite (Strict, Lax, None) e Max-Age/Expires',
    'Foco na inspeção e semântica de segurança dos atributos; autenticação no servidor será construída em etapas futuras.'
  ),
  ref(
    'ref-02-mdn-caching',
    'MDN · Cache HTTP',
    'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Caching',
    'PT-BR',
    'Diretivas Cache-Control (no-store, no-cache, max-age), validação condicional com ETag/If-None-Match e 304 Not Modified',
    'Essencial para diferenciar não armazenar (no-store) de revalidar antes de usar (no-cache).'
  ),
  ref(
    'ref-02-mdn-cors',
    'MDN · Cross-Origin Resource Sharing (CORS)',
    'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/CORS',
    'PT-BR',
    'Same-Origin Policy, Origin, Access-Control-Allow-*, requisições simples e preflight OPTIONS',
    'Compare com a versão em inglês (referência cors da Etapa 01) ao revisar detalhes do envio após o preflight.'
  ),
  ref(
    'ref-02-rfc-9110',
    'IETF RFC 9110 · HTTP Semantics',
    'https://www.rfc-editor.org/rfc/rfc9110',
    'Inglês',
    'Seção 9 (Methods, Safe, Idempotent) e Seção 15 (Status Codes)',
    'Norma oficial da IETF para dirimir ambiguidades semânticas de métodos, cabeçalhos e códigos de status.',
    'STD 97 / RFC 9110 (Junho 2022)',
    'Especificação oficial'
  ),
  ref(
    'ref-02-cloudflare-dns',
    'Cloudflare · What is DNS?',
    'https://www.cloudflare.com/learning/dns/what-is-dns/',
    'Inglês',
    'Resolução de nomes DNS, registros A, AAAA e CNAME e papel do cache DNS',
    'Acessível no navegador; coletores automatizados sem cookies JS podem receber bloqueio anti-bot (HTTP 403) da Cloudflare.',
    'Cloudflare Learning Center',
    'Guia técnico'
  ),
  ref(
    'ref-02-mdn-dns-tcp-tls',
    'MDN · Transport Layer Security (TLS)',
    'https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security',
    'Inglês',
    'Criptografia, integridade, certificados digitais e handshake TLS sobre TCP no HTTPS',
    'Relacione às fases Connect e SSL/TLS observadas na aba Timing do DevTools e na saída de curl -v.'
  ),
  ref(
    'ref-02-mdn-tcp',
    'MDN · TCP (Transmission Control Protocol)',
    'https://developer.mozilla.org/pt-BR/docs/Glossary/TCP',
    'PT-BR',
    'Transporte confiável orientado a conexão, portas e comparação com UDP',
    'Glossário introdutório em português para situar a camada de transporte sob o HTTP.'
  ),
  ref(
    'ref-02-mdn-http-evolution',
    'MDN · Evolution of HTTP (HTTP/1.1, HTTP/2 e HTTP/3)',
    'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP',
    'Inglês',
    'Evolução do protocolo desde HTTP/1.1 até multiplexação em HTTP/2 e transporte sobre QUIC (UDP) no HTTP/3',
    'Mostra como a semântica HTTP permanece estável enquanto o transporte evolui.'
  ),
  ref(
    'ref-02-mdn-rest',
    'MDN · REST (Representational State Transfer)',
    'https://developer.mozilla.org/pt-BR/docs/Glossary/REST',
    'PT-BR',
    'Restrições arquiteturais REST: interface uniforme, cliente-servidor, statelessness, cache e camadas',
    'Base em português para diferenciar contratos REST orientados a recursos de chamadas estilo RPC.'
  ),
  ref(
    'ref-02-openapi',
    'OpenAPI Initiative · OpenAPI Specification (OAS)',
    'https://spec.openapis.org/oas/latest.html',
    'Inglês',
    'Estrutura de especificação de contratos HTTP (Paths, Operations, Parameters, RequestBody, Responses e Schemas)',
    'Consulte os exemplos básicos para documentar contratos sem depender de linguagem de programação.',
    'OpenAPI 3.1.1',
    'Especificação oficial'
  ),
  ref(
    'ref-02-linuxcommand',
    'LinuxCommand.org · Learning the Shell',
    'https://linuxcommand.org/lc3_learning_the_shell.php',
    'Inglês',
    'Capítulos 1 a 9: navegação (pwd, ls, cd), arquivos (mkdir, cp, mv, rm), redirecionamento, pipes e permissões',
    'Guia gratuito e direto por William Shotts para praticar comandos POSIX no terminal.',
    'Edição web corrente',
    'Guia técnico'
  ),
  ref(
    'ref-02-curl-docs',
    'cURL · Documentation Overview & Manual',
    'https://curl.se/docs/',
    'Inglês',
    'The Art Of Scripting HTTP Requests Using Curl e manual das flags -i, -I, -X, -H, -d, --json, -v, --fail-with-body, -o e -w',
    'Documentação primária oficial do projeto cURL.'
  ),
  ref(
    'ref-02-bruno-docs',
    'Bruno Docs · Introduction & Getting Started',
    'https://docs.usebruno.com/',
    'Inglês',
    'Criação de collections, environments, headers, bodies JSON e testes básicos versionáveis em Git',
    'Alternativa open-source gratuita ao Postman que salva coleções em arquivos de texto no repositório.'
  ),
  ref(
    'ref-02-postman-docs',
    'Postman Learning Center · Getting Started Overview',
    'https://learning.postman.com/docs/getting-started/overview/',
    'Inglês',
    'Envio de requisições, organização de collections, variáveis de ambiente e exportação JSON',
    'Ao exportar coleções ou environments para o GitHub, remova sempre tokens ou segredos reais.'
  ),
  ref(
    'ref-02-git-docs',
    'Git · Reference Manual (git-scm.com/docs)',
    'https://git-scm.com/docs',
    'Inglês',
    'Referência oficial dos comandos status, add, commit, log, diff, restore, switch, branch, merge, rebase, fetch, pull, push e gitignore',
    'Manual normativo do Git com páginas traduzidas para português nos comandos mais usados.',
    'Git 2.x'
  ),
  ref(
    'ref-02-pro-git-branching',
    'Pro Git · Ramificação (Branching) e Mesclagem (Merging) Básicas',
    'https://git-scm.com/book/pt-br/v2/Ramifica%C3%A7%C3%A3o-Branching-no-Git-Ramifica%C3%A7%C3%A3o-Branching-e-Mesclagem-Merging-B%C3%A1sicas',
    'PT-BR',
    'Capítulo 3.2: criação de branches, fast-forward vs 3-way merge e resolução de conflitos de merge',
    'Scott Chacon e Ben Straub. Capítulo gratuito em português sob licença aberta.',
    '2ª edição online',
    'Livro online oficial'
  ),
  ref(
    'ref-02-github-prs',
    'GitHub Docs · Documentação do Pull Request',
    'https://docs.github.com/pt/pull-requests',
    'PT-BR',
    'Colaborar com pull requests: criação de branches, proposta de alterações, revisão de código e resolução de conflitos',
    'Documentação oficial em português do GitHub para entregas e code review.'
  ),
];

export const topics02: StudyTopic[] = [
  {
    id: '02-url',
    stageId: '02',
    name: 'Anatomia de uma URL',
    goal: 'Identificar esquema, host, porta, caminho, query string e fragmento em URLs absolutas e relativas e prever o que é enviado na requisição HTTP.',
    before: ['html', 'arquivos'],
    refs: ['ref-02-mdn-url', 'ref-02-mdn-http-overview', 'query', 'encode'],
    exerciseIds: ['02-ex-01'],
    optional: false,
    competencies: [
      'Decompor qualquer URL em esquema (http/https), host/domínio, porta explícita ou implícita (80/443), caminho, query string e fragmento.',
      'Diferenciar URL absoluta de URL relativa e explicar como o navegador resolve caminhos relativos a partir do documento atual.',
      'Explicar por que o fragmento (#secao) é processado localmente no cliente e nunca é enviado na request-line ao servidor.',
    ],
    practiceCriteria: [
      'Decompor ao menos cinco URLs completas e relativas em todos os seus componentes, indicando a porta padrão implícita e o request-target exato enviado ao servidor.',
    ],
  },
  {
    id: '02-http-mensagens',
    stageId: '02',
    name: 'Requisições e respostas HTTP',
    goal: 'Interpretar a estrutura de requests e responses no modelo cliente-servidor, aplicando métodos HTTP conforme segurança e idempotência e serialização JSON.',
    before: ['02-url', 'json'],
    refs: ['ref-02-mdn-http-messages', 'ref-02-mdn-client-server', 'ref-02-mdn-methods', 'ref-02-rfc-9110'],
    exerciseIds: ['02-ex-01', '02-ex-02', '02-ex-04'],
    optional: false,
    competencies: [
      'Identificar start-line (método, alvo e versão), headers, linha em branco e body em requisições e respostas HTTP.',
      'Selecionar entre GET, POST, PUT, PATCH, DELETE, HEAD e OPTIONS, classificando cada método quanto a ser seguro (safe) e/ou idempotente.',
      'Relacionar serialização de payloads JSON ao tipo MIME application/json em Content-Type e Accept.',
    ],
    practiceCriteria: [
      'Escrever e interpretar mensagens brutas de request e response para leitura, criação, atualização parcial/total e remoção, justificando a segurança e a idempotência de cada método.',
    ],
  },
  {
    id: '02-status',
    stageId: '02',
    name: 'Status HTTP',
    goal: 'Aplicar e diagnosticar com precisão as famílias 2xx, 3xx, 4xx e 5xx e os códigos de status HTTP essenciais em contratos e investigações.',
    before: ['02-http-mensagens'],
    refs: ['ref-02-mdn-status', 'ref-02-rfc-9110', 'ref-02-mdn-http'],
    exerciseIds: ['02-ex-01', '02-ex-04', '02-ex-05', '02-ex-08'],
    optional: false,
    competencies: [
      'Distinguir os códigos de sucesso 200 OK, 201 Created (com Location) e 204 No Content (sem corpo de resposta).',
      'Interpretar redirecionamentos e cache com 301 Moved Permanently, 302 Found e 304 Not Modified.',
      'Diferenciar erros do cliente (400, 401, 403, 404, 405, 409, 422, 429) de falhas do servidor e infraestrutura (500, 502, 503).',
    ],
    practiceCriteria: [
      'Associar os 17 códigos estudados (200, 201, 204, 301, 302, 304, 400, 401, 403, 404, 405, 409, 422, 429, 500, 502 e 503) a cenários concretos, explicando pares críticos como 401 vs 403 e 400 vs 409 vs 422.',
    ],
  },
  {
    id: '02-headers-cookies-cache',
    stageId: '02',
    name: 'Headers, cookies e cache',
    goal: 'Inspecionar cabeçalhos de negociação e controle, auditar atributos de segurança de cookies de sessão e validar cache HTTP condicional.',
    before: ['02-http-mensagens', '02-status'],
    refs: ['ref-02-mdn-headers', 'ref-02-mdn-cookies', 'ref-02-mdn-caching', 'cookies'],
    exerciseIds: ['02-ex-02', '02-ex-06', '02-ex-07'],
    optional: false,
    competencies: [
      'Operar os cabeçalhos Accept, Content-Type, Authorization, Cache-Control, Location, Origin, Cookie e Set-Cookie.',
      'Auditar cookies de sessão verificando HttpOnly, Secure, SameSite (Strict, Lax, None) e expiração (Max-Age/Expires).',
      'Explicar o funcionamento de Cache-Control, ETag, requisições condicionais (If-None-Match → 304) e noções de compressão HTTP.',
    ],
    practiceCriteria: [
      'Demonstrar o ciclo Set-Cookie → Cookie e a revalidação condicional com ETag/304 em requisições reais, justificando o papel de HttpOnly, Secure e SameSite.',
    ],
  },
  {
    id: '02-cors-falhas',
    stageId: '02',
    name: 'CORS e falhas HTTP',
    goal: 'Diagnosticar bloqueios de Same-Origin Policy/CORS, preflight OPTIONS, timeouts, retries e falhas de conexão, separando erro de rede de status HTTP.',
    before: ['02-status', '02-headers-cookies-cache'],
    refs: ['ref-02-mdn-cors', 'cors', 'ref-02-mdn-http', 'ref-02-rfc-9110'],
    exerciseIds: ['02-ex-05', '02-ex-07'],
    optional: false,
    competencies: [
      'Explicar a Same-Origin Policy, os cabeçalhos CORS e quando o navegador envia uma requisição preflight OPTIONS.',
      'Distinguir bloqueio de CORS no navegador de falha de autenticação/autorização (401/403).',
      'Diferenciar falha de rede (DNS, conexão recusada, timeout sem resposta) de resposta HTTP 4xx/5xx e avaliar o risco de retry em operações não idempotentes.',
    ],
    practiceCriteria: [
      'Diagnosticar com evidências de DevTools e cURL a diferença entre um bloqueio de CORS no navegador, um timeout de rede e um erro HTTP retornado pelo servidor.',
    ],
  },
  {
    id: '02-redes',
    stageId: '02',
    name: 'Redes essenciais',
    goal: 'Explicar o percurso completo DNS → conexão TCP/QUIC → handshake TLS → HTTP → proxy/balanceador/CDN → aplicação → resposta.',
    before: ['02-url', '02-cors-falhas'],
    refs: ['ref-02-cloudflare-dns', 'ref-02-mdn-dns-tcp-tls', 'ref-02-mdn-tcp', 'ref-02-mdn-http-evolution', 'ref-02-mdn-http-overview'],
    exerciseIds: ['02-ex-05', '02-ex-07'],
    optional: false,
    competencies: [
      'Explicar resolução DNS (registros A, AAAA e CNAME e cache DNS), endereço IP, portas, TCP, UDP e impacto da latência.',
      'Descrever o papel do TLS/HTTPS e dos certificados digitais, bem como a evolução para HTTP/2 e noções de HTTP/3 sobre QUIC.',
      'Identificar a função de proxy reverso, balanceador de carga e CDN no caminho entre cliente e servidor de aplicação.',
    ],
    practiceCriteria: [
      'Documentar o percurso ponta a ponta (DNS → conexão → TLS → HTTP → aplicação → resposta) de uma chamada HTTPS real, correlacionando cada fase aos tempos medidos no DevTools ou no cURL.',
    ],
  },
  {
    id: '02-contratos-rest',
    stageId: '02',
    name: 'Contratos HTTP e introdução a REST',
    goal: 'Modelar e revisar contratos HTTP/REST orientados a recursos com métodos e status coerentes, filtros, paginação, tratamento de erros e introdução ao OpenAPI.',
    before: ['02-http-mensagens', '02-status', '02-headers-cookies-cache'],
    refs: ['ref-02-mdn-rest', 'ref-02-openapi', 'ref-02-rfc-9110', 'ref-02-mdn-status'],
    exerciseIds: ['02-ex-04', '02-ex-08'],
    optional: false,
    competencies: [
      'Projetar endpoints REST baseados em recursos com métodos adequados, status coerentes, statelessness e idempotência.',
      'Padronizar estruturas JSON de resposta, parâmetros de filtro, ordenação, paginação e envelopes de erro.',
      'Diferenciar API HTTP genérica, estilo REST e estilo RPC e ler/estruturar uma especificação básica em OpenAPI.',
    ],
    practiceCriteria: [
      'Especificar e revisar um contrato de API para múltiplos recursos com paginação, filtros e catálogo padronizado de erros JSON sem recorrer a verbos de RPC na URL.',
    ],
  },
  {
    id: '02-terminal-ferramentas',
    stageId: '02',
    name: 'Terminal e ferramentas HTTP',
    goal: 'Operar comandos essenciais de terminal POSIX e investigar requisições HTTP com cURL, Bruno ou Postman e DevTools.',
    before: ['02-http-mensagens', '02-headers-cookies-cache'],
    refs: ['ref-02-linuxcommand', 'ref-02-curl-docs', 'ref-02-bruno-docs', 'ref-02-postman-docs', 'network'],
    exerciseIds: ['02-ex-02', '02-ex-05', '02-ex-06', '02-ex-07'],
    optional: false,
    competencies: [
      'Utilizar pwd, ls, cd, mkdir, cp, mv, rm, cat, less, grep, find, head, tail, pipes (|), redirecionamento (> e >>), variáveis de ambiente, PATH e permissões básicas.',
      'Executar testes HTTP no terminal com cURL usando -i, -I, -X, -H, -d, --json, -v, --fail-with-body, -o e -w.',
      'Organizar collections, environments, headers, bodies e testes básicos no Bruno ou Postman e inspecionar Network, Headers, Payload, Response, Timing, Status e Erros no DevTools.',
    ],
    practiceCriteria: [
      'Executar uma bateria reproduzível de requisições via cURL e Bruno/Postman salvando e filtrando evidências pelo terminal e comparando com a aba Network do DevTools.',
    ],
  },
  {
    id: '02-git-github',
    stageId: '02',
    name: 'Git e GitHub colaborativo',
    goal: 'Trabalhar com branches por funcionalidade, commits atômicos, merge/rebase, resolução de conflitos, Pull Requests, code review e proteção de segredos.',
    before: ['02-terminal-ferramentas'],
    refs: ['ref-02-pro-git-branching', 'ref-02-git-docs', 'ref-02-github-prs', 'git-setup', 'git'],
    exerciseIds: ['02-ex-03', '02-ex-09'],
    optional: false,
    competencies: [
      'Operar git status, add, commit, log, diff, restore, switch, branch, fetch, pull e push em branches por funcionalidade.',
      'Comparar merge e rebase, provocar e resolver conflitos de merge manualmente removendo marcadores e validando o resultado.',
      'Configurar .gitignore e .env.example para proteger segredos e conduzir Pull Requests com descrição técnica e code review (inclusive em fluxo colaborativo simulado).',
    ],
    practiceCriteria: [
      'Demonstrar em repositório Git a criação de branches, a resolução real de um conflito de merge, a proteção de variáveis com .gitignore/.env.example e um Pull Request revisado.',
    ],
  },
];

const rubric02 = [
  'HTTP e REST (35%): decomposição correta de URLs e mensagens HTTP, escolha semântica de métodos (safe/idempotente), códigos de status precisos e payloads JSON consistentes.',
  'Redes e diagnóstico (20%): distinção baseada em evidências entre resolução DNS, conexão TCP, handshake TLS, bloqueio de CORS no navegador e resposta HTTP do servidor.',
  'Ferramentas e testes (25%): uso reprodutível de comandos de terminal, flags do cURL (-i, -I, -X, -H, -d, --json, -v, --fail-with-body, -o, -w), coleção Bruno/Postman e DevTools Network.',
  'Git e documentação (20%): histórico de commits limpo, uso de branches, resolução de conflitos sem marcadores residuais, proteção de segredos (.gitignore/.env.example) e README/PR claros.',
];

export const tasks02: Activity[] = [
  {
    id: '02-ex-01',
    slug: 'anatomia',
    stageId: '02',
    kind: 'exercise',
    title: 'Anatomia de 10 requisições',
    level: 'inicial',
    topicIds: ['02-url', '02-http-mensagens', '02-status'],
    optional: false,
    statement:
      'Decomponha 10 cenários de requisições HTTP em esquema, host, porta, caminho, query string e fragmento, especificando o método HTTP (com classificação safe/idempotente), os cabeçalhos essenciais, a presença de corpo JSON e o código de status esperado.',
    objectives: [
      'Decompor URLs completas e relativas e relacionar método, cabeçalhos, corpo e status HTTP em 10 cenários distintos.',
    ],
    prerequisites: [
      'Tópicos 1, 2 e 3 da Etapa 02 (Anatomia de uma URL, Requisições e respostas HTTP e Status HTTP).',
    ],
    requirements: [
      'Cobrir nos 10 cenários: listagem com filtro e paginação, busca por ID existente, busca por ID inexistente, criação válida, criação inválida, substituição completa, atualização parcial, exclusão, consulta apenas de cabeçalhos e acesso sem credencial.',
      'Decompor a URL de cada cenário em esquema, host, porta (explícita ou implícita 80/443), caminho, query string e fragmento.',
      'Indicar para cada requisição: método HTTP (GET, POST, PUT, PATCH, DELETE, HEAD), se é seguro (safe) e/ou idempotente, se envia corpo, cabeçalhos principais e código de status esperado.',
      'Conferir ao menos 3 requisições reais na aba Network do DevTools para comparar com a sua tabela.',
    ],
    constraints: [
      'Não exige programar servidor próprio nem instalar frameworks backend.',
      'Não usar status 200 OK genérico para representar criação de recurso ou respostas de erro.',
    ],
    io: [
      'Entrada: 10 cenários de interação cliente-servidor definidos pelo estudante.',
      'Saída: tabela ou documento Markdown com a anatomia completa de cada requisição/resposta e justificativa de 3 decisões.',
    ],
    acceptanceCriteria: [
      'As 10 URLs estão decompostas em esquema, host, porta, caminho, query string e fragmento, indicando o que vai na request-line.',
      'Os métodos GET, POST, PUT, PATCH, DELETE e HEAD foram aplicados e classificados corretamente quanto a segurança e idempotência.',
      'Cada cenário especifica cabeçalhos coerentes (Accept, Content-Type, Authorization, Location) e código de status HTTP exato.',
    ],
    hints: [
      'O fragmento (#secao) é resolvido localmente pelo navegador e nunca é transmitido ao servidor na linha da requisição HTTP.',
      'Consulte a RFC 9110 (Seção 9.2) ou a MDN: GET e HEAD são seguros e idempotentes; PUT e DELETE são idempotentes mas não seguros; POST e PATCH não são idempotentes por padrão.',
      'Diferencie 200 OK (sucesso com corpo), 201 Created (recurso criado, acompanhado de Location) e 204 No Content (sucesso sem corpo na resposta).',
    ],
    testIdeas: [
      'URL com query string composta (?categoria=redes&pagina=2#topo) para verificar o que chega ao servidor.',
      'Comparação entre atualizar apenas o email de um cadastro (PATCH) e substituir o cadastro inteiro (PUT).',
      'Tentativa de cadastrar JSON malformado (400) versus JSON bem formado com regra de domínio inválida (422).',
    ],
    refs: ['ref-02-mdn-url', 'ref-02-mdn-http-messages', 'ref-02-mdn-methods', 'ref-02-mdn-status'],
    rubric: rubric02,
    deliverables: [
      'Documento Markdown com a decomposição das 10 requisições, classificação de métodos e justificativas.',
    ],
    competencies: [
      'Decompor URLs e prever o request-target HTTP.',
      'Classificar métodos HTTP quanto a segurança e idempotência.',
      'Selecionar códigos de status HTTP semânticos.',
    ],
  },
  {
    id: '02-ex-02',
    slug: 'terminal-curl',
    stageId: '02',
    kind: 'exercise',
    title: 'Terminal e cURL',
    level: 'inicial',
    topicIds: ['02-terminal-ferramentas', '02-http-mensagens', '02-headers-cookies-cache'],
    optional: false,
    statement:
      'Crie uma estrutura de diretórios de laboratório usando comandos de terminal e execute uma bateria de requisições HTTP reais com cURL explorando métodos, cabeçalhos, payloads JSON, salvamento em arquivo e métricas de tempo.',
    objectives: [
      'Operar comandos essenciais de shell POSIX e inspecionar requisições HTTP reais com as principais flags do cURL.',
    ],
    prerequisites: [
      'Tópicos 2, 4 e 8 da Etapa 02 (Mensagens HTTP, Headers e Terminal e ferramentas HTTP).',
    ],
    requirements: [
      'Criar a estrutura de pastas do laboratório pelo terminal usando pwd, mkdir, cd, ls, cp/mv e redirecionamentos (> e >>).',
      'Executar e registrar chamadas cURL reais (ex.: contra https://httpbin.org) utilizando as flags -i, -I, -X, -H, -d, --json, -v, --fail-with-body, -o e -w.',
      'Filtrar cabeçalhos específicos nos arquivos de resposta salvos utilizando pipes (|), grep, head e tail.',
      'Explicar a diferença entre as saídas produzidas por curl -i, curl -I e curl -v.',
    ],
    constraints: [
      'Executar os comandos em um terminal real (Linux, macOS, WSL ou Git Bash); não usar simuladores fictícios.',
      'Não incluir tokens privados nos comandos salvos.',
    ],
    io: [
      'Entrada: comandos de shell e chamadas cURL contra endpoints públicos de teste.',
      'Saída: script/registro de comandos, arquivos de resposta filtrados e análise comparativa das flags.',
    ],
    acceptanceCriteria: [
      'A organização de diretórios e a filtragem de respostas foram realizadas com comandos de terminal (mkdir, ls, cat/head/tail, grep e pipes).',
      'A bateria de testes exercita comprovadamente as flags -i, -I, -X, -H, -d, --json, -v, --fail-with-body, -o e -w.',
      'A documentação explica o significado dos prefixos *, > e < na saída detalhada do curl -v.',
    ],
    hints: [
      'No curl -v, linhas iniciadas por * mostram diagnóstico de conexão e TLS, linhas com > mostram o que foi enviado na requisição e linhas com < mostram os cabeçalhos da resposta.',
      'A flag --json envia automaticamente POST com Content-Type: application/json e Accept: application/json.',
      'Use curl -w "dns=%{time_namelookup}s connect=%{time_connect}s tls=%{time_appconnect}s ttfb=%{time_starttransfer}s total=%{time_total}s\\n" para medir cada etapa da chamada.',
    ],
    testIdeas: [
      'Comparar o código de saída ($?) do comando curl normal vs curl --fail-with-body ao requisitar uma URL que retorna status 404.',
      'Enviar um payload JSON com -d sem definir Content-Type e comparar com o envio usando -H "Content-Type: application/json" ou --json.',
      'Usar grep -i para extrair apenas as linhas de status e content-type de múltiplos arquivos de log.',
    ],
    refs: ['ref-02-linuxcommand', 'ref-02-curl-docs', 'ref-02-mdn-headers'],
    rubric: rubric02,
    deliverables: [
      'Registro em Markdown ou script .sh com os comandos de terminal, chamadas cURL e saídas comentadas.',
    ],
    competencies: [
      'Manipular arquivos, pipes e redirecionamentos no terminal.',
      'Executar e depurar chamadas HTTP com cURL.',
    ],
  },
  {
    id: '02-ex-03',
    slug: 'git-equipe',
    stageId: '02',
    kind: 'exercise',
    title: 'Git colaborativo simulado',
    level: 'inicial',
    topicIds: ['02-git-github'],
    optional: false,
    statement:
      'Simule um fluxo colaborativo em um repositório Git utilizando branches por funcionalidade, proteção de variáveis com .gitignore e .env.example e resolução manual de um conflito real de merge.',
    objectives: [
      'Praticar criação e alternância de branches, prevenção de vazamento de segredos e resolução segura de conflitos de merge.',
    ],
    prerequisites: [
      'Tópico 9 da Etapa 02 (Git e GitHub colaborativo).',
    ],
    requirements: [
      'Configurar .gitignore (ignorando .env e arquivos temporários) e versionar um .env.example com variáveis fictícias.',
      'Criar ao menos duas branches a partir de um mesmo commit base e alterar as mesmas linhas de um arquivo de especificação em ambas.',
      'Executar o merge, inspecionar o conflito com git status e git diff, editar o arquivo removendo os marcadores (<<<<<<<, =======, >>>>>>>) e concluir o commit de merge.',
      'Registrar o histórico final com git log --oneline --graph --all.',
    ],
    constraints: [
      'Pode ser realizado individualmente simulando duas frentes de trabalho em branches distintas.',
      'Nenhum arquivo .env real ou marcador residual de conflito deve permanecer no commit final.',
    ],
    io: [
      'Entrada: repositório Git inicializado com um documento base e duas branches concorrentes.',
      'Saída: histórico com merge concluído, captura dos marcadores antes da resolução e saída de git log --oneline --graph --all.',
    ],
    acceptanceCriteria: [
      'O repositório possui .gitignore e .env.example e ignora comprovadamente arquivos .env locais.',
      'O conflito de merge foi provocado entre branches reais, documentado e resolvido sem deixar marcadores residuais.',
      'A saída de git log --oneline --graph --all evidencia a bifurcação e a convergência das branches.',
    ],
    hints: [
      'Para provocar um conflito real, crie as duas branches a partir do mesmo commit antes de fazer o merge da primeira na main.',
      'O trecho entre <<<<<<< HEAD e ======= mostra o estado atual da sua branch; o trecho até >>>>>>> mostra o que veio da outra branch.',
      'Após editar o arquivo e remover os marcadores, use git diff para revisar a conciliação antes de rodar git add e git commit.',
    ],
    testIdeas: [
      'Criar um arquivo .env com um valor de teste e confirmar no git status que ele não aparece como untracked.',
      'Executar grep -n "<<<<<<<" no repositório após o merge para garantir que nenhum marcador esquecido foi commitado.',
      'Testar git restore em uma alteração descartável na árvore de trabalho antes de fazer commit.',
    ],
    refs: ['ref-02-pro-git-branching', 'ref-02-git-docs', 'ref-02-github-prs'],
    rubric: rubric02,
    deliverables: [
      'Log gráfico do repositório (git log --oneline --graph --all) e registro do conflito antes e depois da resolução.',
    ],
    competencies: [
      'Operar branches e histórico no Git.',
      'Resolver conflitos de merge preservando regras de negócio.',
      'Proteger segredos com .gitignore e .env.example.',
    ],
  },
  {
    id: '02-ex-04',
    slug: 'biblioteca',
    stageId: '02',
    kind: 'exercise',
    title: 'Contrato de API de biblioteca',
    level: 'intermediario',
    topicIds: ['02-contratos-rest', '02-http-mensagens', '02-status'],
    optional: false,
    statement:
      'Especifique o contrato HTTP/REST para o gerenciamento de livros e empréstimos de uma biblioteca — definindo recursos, URLs, métodos, query strings de filtro/ordenação/paginação, payloads JSON e catálogo de erros — sem implementar código de servidor.',
    objectives: [
      'Modelar um contrato HTTP/REST completo, consistente e independente de linguagem antes da construção do servidor.',
    ],
    prerequisites: [
      'Tópicos 2, 3 e 7 da Etapa 02 e Exercício 02-ex-01.',
    ],
    requirements: [
      'Modelar endpoints RESTful para livros e empréstimos (listagem, consulta por ID, cadastro, atualização parcial, exclusão, criação de empréstimo e devolução) sem usar verbos de RPC nas URLs.',
      'Especificar parâmetros de query string para filtros, ordenação e paginação na listagem de livros.',
      'Apresentar exemplos de request e response JSON para sucesso (200 OK, 201 Created com header Location, 204 No Content).',
      'Padronizar um formato único de erro JSON e exemplificar respostas 400, 401, 403, 404, 409 (ex.: exemplar já emprestado) e 422 (ex.: prazo inválido).',
    ],
    constraints: [
      'Não exige implementação de backend em Node.js, PHP ou banco de dados; o foco é exclusivamente o design do contrato HTTP.',
      'Manter consistência estrita de nomenclatura JSON (camelCase ou snake_case) em todos os exemplos.',
    ],
    io: [
      'Entrada: regras de negócio de acervo e empréstimos de uma biblioteca.',
      'Saída: especificação de contrato HTTP em Markdown ou OpenAPI com tabelas de rotas e exemplos de payloads JSON.',
    ],
    acceptanceCriteria: [
      'Todos os endpoints usam substantivos de recursos e métodos HTTP coerentes com a operação e sua idempotência.',
      'A paginação e os filtros estão especificados e diferenciam lista vazia (200 OK com []) de recurso inexistente (404 Not Found).',
      'Os códigos 200, 201, 204, 400, 401, 403, 404, 409 e 422 possuem exemplos claros e envelope de erro padronizado.',
    ],
    hints: [
      'Uma busca com filtro que retorna zero livros não é erro: a coleção existe, portanto responda 200 OK com array vazio e metadados de paginação.',
      'Ao criar um livro ou empréstimo com POST, retorne 201 Created e inclua o cabeçalho Location com a URL do recurso recém-criado.',
      'Compare 409 Conflict (estado atual do recurso impede a operação, como livro já emprestado) com 422 Unprocessable Content (dados enviados violam regra semântica).',
    ],
    testIdeas: [
      'Tentar emprestar o mesmo exemplar duas vezes seguidas e verificar se o contrato prevê 409 Conflict.',
      'Repetir a chamada de devolução de um empréstimo e verificar se o efeito no contrato é idempotente.',
      'Consultar uma página além do total existente na paginação e verificar a resposta padronizada.',
    ],
    refs: ['ref-02-mdn-rest', 'ref-02-openapi', 'ref-02-mdn-status', 'ref-02-rfc-9110'],
    rubric: rubric02,
    deliverables: [
      'Especificação completa do contrato da API de biblioteca com endpoints, paginação, exemplos JSON e catálogo de erros.',
    ],
    competencies: [
      'Projetar contratos REST orientados a recursos.',
      'Padronizar paginação, filtros e respostas de erro em JSON.',
    ],
  },
  {
    id: '02-ex-05',
    slug: 'diagnostico',
    stageId: '02',
    kind: 'exercise',
    title: 'Diagnóstico de falhas',
    level: 'intermediario',
    topicIds: ['02-cors-falhas', '02-redes', '02-status', '02-terminal-ferramentas'],
    optional: false,
    statement:
      'Investigue 6 cenários de falha (DNS, timeout/conexão recusada, certificado TLS, bloqueio de CORS no navegador, HTTP 429 e HTTP 502/503) usando DevTools e cURL, distinguindo fatos observados de hipóteses e avaliando a segurança de fazer retry.',
    objectives: [
      'Isolar a camada exata de uma falha de comunicação web e diferenciar erro de rede/CORS de status HTTP do servidor.',
    ],
    prerequisites: [
      'Tópicos 3, 5, 6 e 8 da Etapa 02.',
    ],
    requirements: [
      'Produzir diagnóstico estruturado para os 6 cenários: (1) falha de DNS, (2) timeout ou porta recusada, (3) erro de certificado TLS, (4) bloqueio de CORS após preflight OPTIONS, (5) 429 Too Many Requests e (6) 502 Bad Gateway / 503 Service Unavailable.',
      'Para cada cenário, indicar: camada da falha, se houve resposta HTTP, evidência observável no DevTools ou no curl -v, e recomendação técnica.',
      'Explicar por que o bloqueio de CORS ocorre no navegador mas não impede a mesma requisição via cURL.',
      'Avaliar em quais cenários e para quais métodos HTTP (ex.: GET vs POST) é seguro realizar retry automático.',
    ],
    constraints: [
      'Separar explicitamente fato observado (log, header, status) de hipótese sobre a causa interna.',
      'Não confundir configuração de CORS com autenticação (Authorization).',
    ],
    io: [
      'Entrada: 6 cenários de falha reproduzidos ou analisados com cURL e DevTools.',
      'Saída: laudo técnico de diagnóstico comparando evidências, camadas de rede e política de retry.',
    ],
    acceptanceCriteria: [
      'Os 6 cenários separam corretamente falhas sem resposta HTTP (DNS, TCP/timeout, TLS) de respostas HTTP (429, 502/503) e bloqueio CORS no cliente.',
      'A análise de CORS identifica o papel do cabeçalho Origin, do preflight OPTIONS e de Access-Control-Allow-Origin.',
      'As recomendações de retry levam em conta a idempotência do método e o cabeçalho Retry-After.',
    ],
    hints: [
      'Quando o DNS falha ou o TCP sofre timeout antes do servidor responder, não existe código de status HTTP (nem 4xx nem 5xx).',
      'Em um bloqueio de CORS, a aba Network costuma mostrar que o servidor respondeu (ex.: 200 ou 204 no OPTIONS), mas o navegador vetou a leitura pelo JavaScript por ausência de Access-Control-Allow-Origin.',
      'Fazer retry automático de um POST após timeout sem chave de idempotência pode duplicar efeitos colaterais no servidor.',
    ],
    testIdeas: [
      'Executar curl -v contra um host inexistente e contra uma porta local fechada para comparar as mensagens de erro.',
      'Testar https://httpbin.org/status/429 e https://httpbin.org/status/503 com curl -i.',
      'Inspecionar no DevTools uma chamada fetch() cross-origin com cabeçalho customizado para observar o preflight OPTIONS.',
    ],
    refs: ['ref-02-mdn-cors', 'ref-02-cloudflare-dns', 'ref-02-mdn-dns-tcp-tls', 'ref-02-mdn-status', 'ref-02-curl-docs'],
    rubric: rubric02,
    deliverables: [
      'Laudo técnico dos 6 cenários com comandos/capturas de evidência, separação fato vs hipótese e análise de retry.',
    ],
    competencies: [
      'Diferenciar erros de rede/transporte de respostas HTTP.',
      'Diagnosticar preflight OPTIONS e bloqueios de CORS.',
      'Avaliar timeouts, rate limiting e segurança de retries.',
    ],
  },
  {
    id: '02-ex-06',
    slug: 'sessao',
    stageId: '02',
    kind: 'exercise',
    title: 'Cookies e sessão',
    level: 'intermediario',
    topicIds: ['02-headers-cookies-cache', '02-http-mensagens', '02-terminal-ferramentas'],
    optional: false,
    statement:
      'Rastreie o ciclo de vida de um cookie de sessão (Set-Cookie na resposta e Cookie nas requisições seguintes) usando cURL e DevTools, e audite o impacto de segurança dos atributos HttpOnly, Secure, SameSite e expiração.',
    objectives: [
      'Compreender na prática como sessões são mantidas sobre o protocolo HTTP stateless e auditar atributos de segurança de cookies.',
    ],
    prerequisites: [
      'Tópicos 2, 4 e 8 da Etapa 02.',
    ],
    requirements: [
      'Demonstrar com cURL (-c e -b) ou DevTools o recebimento de Set-Cookie e o reenvio automático no cabeçalho Cookie.',
      'Explicar a finalidade de cada atributo em Set-Cookie: HttpOnly, Secure, SameSite (Strict, Lax, None) e Max-Age/Expires.',
      'Analisar 3 exemplos de configuração de cookie (inseguro, intermediário e endurecido) apontando riscos de XSS, interceptação em rede não criptografada e CSRF.',
      'Comparar o envio automático do cabeçalho Cookie pelo navegador com o envio explícito do cabeçalho Authorization.',
    ],
    constraints: [
      'Utilizar endpoints públicos de teste (como httpbin.org/cookies) ou cookies fictícios locais; nunca expor cookies de sessões pessoais reais.',
    ],
    io: [
      'Entrada: chamadas HTTP de definição e leitura de cookies e 3 exemplos de cabeçalhos Set-Cookie.',
      'Saída: logs comentados do ciclo Set-Cookie/Cookie e tabela de auditoria de segurança.',
    ],
    acceptanceCriteria: [
      'O registro comprova o recebimento de Set-Cookie na resposta e o envio de Cookie na requisição subsequente.',
      'A auditoria explica com precisão técnica o papel de HttpOnly, Secure, SameSite=Strict/Lax/None e expiração.',
      'A diferença entre sessão por Cookie e cabeçalho Authorization está documentada sem erros conceituais.',
    ],
    hints: [
      'No cURL, use -c jar.txt para salvar cookies recebidos em Set-Cookie e -b jar.txt para enviá-los na chamada seguinte.',
      'HttpOnly impede que scripts leiam o cookie via document.cookie, enquanto Secure exige que a requisição ocorra sobre HTTPS.',
      'Navegadores modernos exigem que cookies com SameSite=None também declarem obrigatoriamente o atributo Secure.',
    ],
    testIdeas: [
      'Definir um cookie via curl -i -c jar.txt "https://httpbin.org/cookies/set?sessao=teste123" e depois ler com curl -i -b jar.txt "https://httpbin.org/cookies".',
      'Comparar o que acontece com um cookie sem Max-Age/Expires (cookie de sessão) versus um cookie com Max-Age=3600.',
      'Verificar no DevTools (Application → Cookies) as colunas HttpOnly, Secure e SameSite.',
    ],
    refs: ['ref-02-mdn-cookies', 'ref-02-mdn-headers', 'ref-02-curl-docs', 'cookies'],
    rubric: rubric02,
    deliverables: [
      'Demonstração prática do fluxo Set-Cookie → Cookie e tabela de auditoria de atributos de segurança.',
    ],
    competencies: [
      'Rastrear cabeçalhos Set-Cookie e Cookie.',
      'Auditar atributos HttpOnly, Secure, SameSite e expiração.',
    ],
  },
  {
    id: '02-ex-07',
    slug: 'ponta-a-ponta',
    stageId: '02',
    kind: 'exercise',
    title: 'Laboratório HTTP ponta a ponta',
    level: 'avancado',
    topicIds: ['02-redes', '02-headers-cookies-cache', '02-cors-falhas', '02-terminal-ferramentas'],
    optional: true,
    statement:
      'Conduza uma investigação ponta a ponta de chamadas HTTPS reais cruzando evidências do DevTools, do cURL detalhado (-v e -w) e de uma coleção parametrizada no Bruno ou Postman, incluindo revalidação condicional de cache (ETag → 304).',
    objectives: [
      'Correlacionar todas as camadas de uma requisição (DNS, TCP, TLS, HTTP/2, cache/CDN e payload) em múltiplas ferramentas de diagnóstico.',
    ],
    prerequisites: [
      'Tópicos 1 a 8 da Etapa 02 e exercícios iniciais/intermediários.',
    ],
    requirements: [
      'Rastrear 3 chamadas HTTPS reais documentando IP resolvido, porta, versão do TLS, protocolo HTTP negociado, cabeçalhos e tempos de cada fase (DNS, Connect, TLS, TTFB, Total).',
      'Capturar um cabeçalho ETag de uma resposta 200 OK e executar uma requisição condicional com If-None-Match comprovando o retorno 304 Not Modified sem corpo.',
      'Identificar nos cabeçalhos de resposta evidências de infraestrutura intermediária (proxy reverso, balanceador ou CDN).',
      'Organizar e exportar as requisições em uma coleção do Bruno ou Postman com variáveis de ambiente.',
    ],
    constraints: [
      'Evidências devem ser reais e obtidas pelo estudante no terminal, no navegador e no Bruno/Postman.',
    ],
    io: [
      'Entrada: 3 endpoints HTTPS públicos investigados nas três ferramentas.',
      'Saída: relatório ponta a ponta com métricas de tempo, prova de cache condicional 304 e coleção exportada.',
    ],
    acceptanceCriteria: [
      'O percurso DNS → conexão → TLS → HTTP → resposta está documentado linha por linha com métricas reais de tempo.',
      'A revalidação condicional com ETag e If-None-Match retornando 304 Not Modified foi comprovada na prática.',
      'A coleção Bruno/Postman usa variáveis de ambiente e reproduz os cenários analisados.',
    ],
    hints: [
      'Na saída do curl -v, procure por "Trying <IP>:443...", "Connected to...", "SSL connection using TLS..." e "ALPN: server accepted h2" para mapear cada camada.',
      'Ao enviar If-None-Match no cURL, mantenha as aspas exatas do valor do ETag retornado pelo servidor.',
      'Cabeçalhos como Server, Via, Age, X-Cache ou CF-Cache-Status revelam a atuação de proxies reversos e CDNs.',
    ],
    testIdeas: [
      'Comparar os tempos de DNS, TCP e TLS da primeira chamada com uma segunda chamada em conexão persistente (keep-alive).',
      'Enviar If-None-Match com o valor correto do ETag (esperando 304) e depois com um valor alterado (esperando 200).',
      'Comparar a mesma chamada forçando --http1.1 e --http2 no cURL.',
    ],
    refs: ['ref-02-mdn-caching', 'ref-02-mdn-dns-tcp-tls', 'ref-02-mdn-http-evolution', 'ref-02-curl-docs', 'ref-02-bruno-docs'],
    rubric: rubric02,
    deliverables: [
      'Relatório técnico ponta a ponta, logs comentados do cURL/DevTools e coleção Bruno/Postman exportada.',
    ],
    competencies: [
      'Rastrear o percurso completo DNS → TCP → TLS → HTTP → CDN → resposta.',
      'Validar cache condicional com ETag e status 304.',
      'Integrar cURL, DevTools e Bruno/Postman em uma investigação.',
    ],
  },
  {
    id: '02-ex-08',
    slug: 'revisao',
    stageId: '02',
    kind: 'exercise',
    title: 'Revisão de contrato HTTP',
    level: 'avancado',
    topicIds: ['02-contratos-rest', '02-http-mensagens', '02-status'],
    optional: true,
    statement:
      'Audite uma especificação de API defeituosa repleta de antipadrões HTTP/REST (GET destrutivo, 200 OK para erro, verbos de RPC na URL, ausência de paginação e credenciais na query string) e reescreva o contrato corrigido.',
    objectives: [
      'Identificar violações semânticas e riscos operacionais em contratos HTTP e propor correções fundamentadas na RFC 9110 e em REST.',
    ],
    prerequisites: [
      'Tópicos 2, 3, 4 e 7 da Etapa 02 e Exercício 02-ex-04.',
    ],
    requirements: [
      'Auditar ao menos 8 falhas contratuais: (1) GET que cria/altera estado, (2) GET que exclui recurso, (3) POST usado para simples listagem sem cache, (4) status 200 OK retornando erro no corpo, (5) PUT não idempotente, (6) coleção sem paginação, (7) Content-Type incorreto e JSON inconsistente e (8) credencial sensível na query string.',
      'Explicar para cada falha qual problema real ela causa em produção (segurança, crawlers, cache, retries ou clientes HTTP).',
      'Reescrever o contrato completo em Markdown estruturado ou OpenAPI 3.1 corrigindo rotas, métodos, status, headers, paginação e erros.',
    ],
    constraints: [
      'Justificar cada correção com base nas propriedades do protocolo HTTP, e não apenas por preferência estética.',
    ],
    io: [
      'Entrada: especificação de API defeituosa com 8 antipadrões.',
      'Saída: parecer técnico de auditoria + novo contrato HTTP/REST corrigido.',
    ],
    acceptanceCriteria: [
      'As 8 violações foram diagnosticadas com explicação clara do impacto técnico em segurança, idempotência ou cache.',
      'O contrato reescrito elimina verbos das URLs, usa métodos seguros/idempotentes adequados e aplica códigos 2xx/4xx/5xx reais.',
      'Credenciais foram movidas para cabeçalhos apropriados (Authorization) e coleções ganharam paginação explícita.',
    ],
    hints: [
      'Métodos seguros (GET, HEAD) jamais devem apagar ou criar registros: navegadores, extensões e robôs podem pré-carregar links GET automaticamente.',
      'Retornar 200 OK quando ocorre erro obriga todo cliente a inspecionar o corpo manualmente e faz proxies/monitoramentos tratarem falhas como sucesso.',
      'Dados na query string vazam em logs de servidores, proxies, histórico do navegador e cabeçalhos Referer.',
    ],
    testIdeas: [
      'Simular o que acontece quando um cliente sofre timeout ao chamar o endpoint de atualização e repete a requisição.',
      'Verificar se todos os endpoints da versão corrigida retornam o mesmo formato de objeto de erro JSON para 400, 401, 403, 404, 409 e 422.',
    ],
    refs: ['ref-02-rfc-9110', 'ref-02-mdn-rest', 'ref-02-mdn-methods', 'ref-02-openapi'],
    rubric: rubric02,
    deliverables: [
      'Parecer de auditoria com 8 diagnósticos e especificação do contrato HTTP revisado (antes vs depois).',
    ],
    competencies: [
      'Auditar antipadrões em contratos HTTP/REST.',
      'Corrigir problemas de idempotência, semântica de status e exposição de dados.',
    ],
  },
  {
    id: '02-ex-09',
    slug: 'pr-profissional',
    stageId: '02',
    kind: 'exercise',
    title: 'Entrega profissional com Pull Request',
    level: 'avancado',
    topicIds: ['02-git-github'],
    optional: true,
    statement:
      'Conduza uma entrega técnica completa em branch dedicada com commits atômicos, abertura de Pull Request documentado e auto-revisão (code review) do diff antes do merge.',
    objectives: [
      'Praticar o padrão profissional de abertura, documentação e revisão de Pull Requests em repositórios Git/GitHub.',
    ],
    prerequisites: [
      'Tópico 9 da Etapa 02 e Exercício 02-ex-03.',
    ],
    requirements: [
      'Criar uma branch dedicada para a funcionalidade/documentação e organizar o trabalho em ao menos 4 commits atômicos e semânticos.',
      'Revisar o estado e as diferenças antes de cada commit com git status e git diff --staged.',
      'Abrir um Pull Request (ou redigir o documento completo de PR junto ao diff local) contendo: Contexto, Mudanças realizadas, Como reproduzir/testar, Limitações e Checklist.',
      'Executar code review do próprio diff apontando ao menos 2 melhorias e aplicar um commit adicional atendendo à revisão.',
    ],
    constraints: [
      'Não realizar commits monolíticos com mensagens vagas nem incluir arquivos temporários ou variáveis sensíveis.',
    ],
    io: [
      'Entrada: alterações de contrato/diagnóstico divididas em etapas lógicas.',
      'Saída: branch com histórico atômico, descrição estruturada de Pull Request e registro de code review.',
    ],
    acceptanceCriteria: [
      'O histórico da branch possui ao menos 4 commits coesos e compreensíveis.',
      'O Pull Request documenta contexto, alterações, comandos exatos de verificação e limites.',
      'Há evidência de revisão do diff (comentários de code review) seguida de um commit de refinamento.',
    ],
    hints: [
      'Cada commit deve responder a uma única intenção lógica; se você alterou tópicos distintos no mesmo arquivo, use git add -p.',
      'Inclua na seção "Como testar" do PR os comandos exatos de cURL ou verificação que qualquer revisor possa copiar e rodar.',
      'Ler o diff completo na aba "Files changed" como se você fosse outra pessoa da equipe é a forma mais eficaz de encontrar falhas antes do merge.',
    ],
    testIdeas: [
      'Seguir as instruções do próprio Pull Request em uma pasta limpa para confirmar se os comandos funcionam sem passos ocultos.',
      'Verificar com git log --stat se nenhum arquivo indesejado entrou nos commits da branch.',
    ],
    refs: ['ref-02-github-prs', 'ref-02-pro-git-branching', 'ref-02-git-docs'],
    rubric: rubric02,
    deliverables: [
      'Link ou registro completo do Pull Request com histórico de commits, descrição técnica e comentários de code review.',
    ],
    competencies: [
      'Estruturar commits atômicos em branches por funcionalidade.',
      'Documentar e revisar Pull Requests com rigor técnico.',
    ],
  },
];

export const project02Investigador: Activity = {
  id: '02-project-investigador',
  slug: 'investigador-http',
  title: 'Investigador HTTP',
  stageId: '02',
  kind: 'project',
  level: 'inicial',
  optional: true,
  topicIds: ['02-url', '02-http-mensagens', '02-status', '02-headers-cookies-cache', '02-redes', '02-terminal-ferramentas'],
  competencies: [
    'Decomposição completa de URLs e leitura de mensagens HTTP brutas',
    'Inspeção de métodos, códigos de status e cabeçalhos HTTP',
    'Execução de testes reproduzíveis com cURL e Bruno ou Postman',
    'Análise de tráfego e tempos na aba Network do DevTools',
    'Documentação técnica em repositório Git',
  ],
  context:
    'Antes de programar servidores, uma pessoa desenvolvedora backend precisa saber investigar como clientes e APIs reais se comunicam pela rede.',
  problem:
    'Falta um dossiê prático e reproduzível que comprove, com dados reais do DevTools, cURL e Bruno/Postman, o comportamento de diferentes métodos, cabeçalhos, redirecionamentos e status HTTP.',
  statement:
    'Construa um repositório de portfólio que investigue 8 requisições HTTP reais contra APIs públicas ou endpoints de eco (como HTTPBin, BrasilAPI ou GitHub API), documentando a anatomia das URLs, os comandos cURL, uma coleção Bruno/Postman e a comparação com a aba Network do DevTools.',
  objectives: [
    'Demonstrar domínio prático de inspeção HTTP, cURL, Bruno/Postman e DevTools em um repositório público bem documentado.',
  ],
  prerequisites: [
    'Tópicos 1, 2, 3, 4 e 8 da Etapa 02.',
    'Exercícios 02-ex-01 e 02-ex-02 concluídos ou experiência equivalente.',
  ],
  requirements: [
    'Documentar 8 requisições HTTP reais cobrindo listagem com query string, busca por item, envio de JSON (POST/PUT/PATCH), verificação de cabeçalhos (HEAD), redirecionamento (3xx) e ao menos dois erros 4xx.',
    'Decompor a URL de cada requisição em esquema, host, porta, caminho, query string e fragmento e classificar o método quanto a safe e idempotente.',
    'Fornecer os comandos cURL exatos (-i, -I, -H, -X, -d/--json, -v, -w) e trechos higienizados das respostas reais obtidas.',
    'Incluir no repositório uma coleção exportada do Bruno ou Postman parametrizada com variáveis de ambiente.',
    'Comparar para ao menos 2 chamadas os dados da aba Network do DevTools (Headers, Payload, Response e Timing) com a saída do curl -v.',
  ],
  nonfunctional: [
    'Reprodutibilidade: qualquer pessoa deve conseguir executar os comandos cURL documentados no README.',
    'Segurança: zero tokens privados, cookies pessoais ou arquivos .env versionados.',
    'Clareza documental: tabelas e blocos de código legíveis em Markdown.',
  ],
  constraints: [
    'Independente de framework: não requer criar servidor próprio em Node.js, PHP ou outra linguagem.',
    'Usar ferramentas externas reais (cURL, DevTools, Bruno/Postman) contra APIs públicas ou mocks.',
  ],
  io: [
    'Entrada: 8 cenários de chamadas HTTP executados contra endpoints públicos ou de eco.',
    'Saída: repositório Git com dossiê em Markdown, scripts cURL e coleção Bruno/Postman.',
  ],
  acceptanceCriteria: [
    'As 8 requisições cobrem múltiplos métodos HTTP e incluem cenários 2xx, 3xx e 4xx com respostas reais registradas.',
    'Todas as URLs estão decompostas e os métodos classificados quanto a segurança e idempotência.',
    'Os comandos cURL e a coleção Bruno/Postman funcionam e não expõem segredos.',
    'A comparação entre DevTools Network (incluindo Timing) e curl -v está documentada para ao menos 2 requisições.',
  ],
  hints: [
    'Combine endpoints de uma API pública de leitura (como BrasilAPI ou GitHub) com endpoints de eco (como httpbin.org) para testar POST, PUT, PATCH, DELETE e status específicos.',
    'Use variáveis como {{baseUrl}} na coleção do Bruno/Postman para facilitar a execução por quem avaliar seu repositório.',
    'Revise todos os logs capturados com curl -v para remover qualquer cabeçalho ou cookie pessoal antes de fazer commit.',
  ],
  testIdeas: [
    'Executar cada comando listado no README em um terminal novo para confirmar que não faltam aspas ou flags.',
    'Importar a coleção exportada em uma instância limpa do Bruno ou Postman.',
    'Conferir com git status se arquivos .env locais estão devidamente ignorados.',
  ],
  refs: ['ref-02-mdn-url', 'ref-02-mdn-http-messages', 'ref-02-mdn-status', 'ref-02-curl-docs', 'ref-02-bruno-docs', 'network'],
  rubric: rubric02,
  deliverables: [
    'Repositório Git com README.md, .gitignore e .env.example.',
    'Dossiê docs/investigacao-http.md com a análise das 8 requisições e comparativo DevTools vs cURL.',
    'Scripts/comandos cURL na pasta curl/ e coleção Bruno/Postman na pasta collection/.',
  ],
  milestones: [
    'Selecionar os 8 cenários e estruturar o repositório Git com .gitignore e .env.example.',
    'Executar as chamadas com cURL (-i, -v, -w) e capturar os dados correspondentes no DevTools.',
    'Montar e exportar a coleção parametrizada no Bruno ou Postman.',
    'Consolidar a documentação em Markdown e revisar o README para portfólio.',
  ],
  extras: [
    'Comparar uma requisição em HTTP/1.1 (--http1.1) e HTTP/2 (--http2) no cURL.',
    'Adicionar asserções básicas de status e Content-Type na coleção do Bruno/Postman.',
  ],
};

export const project02Biblioteca: Activity = {
  id: '02-project-contrato-biblioteca',
  slug: 'contrato-api-biblioteca',
  title: 'Contrato de API de biblioteca',
  stageId: '02',
  kind: 'project',
  level: 'intermediario',
  optional: true,
  topicIds: ['02-http-mensagens', '02-status', '02-headers-cookies-cache', '02-contratos-rest', '02-terminal-ferramentas', '02-git-github'],
  competencies: [
    'Modelagem de recursos e endpoints RESTful sem verbos de RPC',
    'Semântica de métodos HTTP, idempotência e códigos de status (2xx, 3xx, 4xx, 5xx)',
    'Especificação de filtros, ordenação, paginação e erros padronizados em JSON',
    'Planejamento de cache condicional (Cache-Control, ETag e 304 Not Modified)',
    'Documentação de contrato com OpenAPI e coleção Bruno/Postman',
  ],
  context:
    'Equipes de engenharia especificam e validam o contrato HTTP/REST antes de codificar o servidor, permitindo que frontend, backend e testes trabalhem alinhados.',
  problem:
    'Projetar o contrato completo de uma API de biblioteca (acervo de livros, leitores, empréstimos e reservas) que previna ambiguidades de status, inconsistências de JSON e duplicidade em retentativas.',
  statement:
    'Especifique e documente em Markdown e OpenAPI 3.1 o contrato HTTP/REST completo de um sistema de biblioteca com ao menos 10 endpoints, incluindo regras de filtro, ordenação e paginação, catálogo padronizado de erros, estratégia de cache condicional (ETag/304) e coleção executável de exemplos no Bruno ou Postman.',
  objectives: [
    'Entregar uma especificação de contrato HTTP/REST profissional e pronta para servir de base à implementação nas etapas seguintes.',
  ],
  prerequisites: [
    'Tópicos 1 a 8 da Etapa 02 e Exercício 02-ex-04.',
  ],
  requirements: [
    'Especificar ao menos 10 endpoints cobrindo os recursos de livros, leitores e empréstimos/reservas com métodos HTTP adequados.',
    'Definir parâmetros de query string para filtragem, ordenação e paginação na listagem do acervo, diferenciando lista vazia (200 OK) de ID inexistente (404 Not Found).',
    'Incluir exemplos completos de request e response (headers + body JSON) para 200, 201 (com Location), 204, 304, 400, 401, 403, 404, 405, 409, 422, 429 e 503.',
    'Especificar um arquivo openapi.yaml (ou .json) válido descrevendo os endpoints e schemas principais.',
    'Disponibilizar uma coleção no Bruno ou Postman com exemplos de requisições e respostas esperadas.',
  ],
  nonfunctional: [
    'Consistência contratual: convenção única de nomes no JSON e datas em padrão ISO 8601.',
    'Independência tecnológica: o contrato não exige nem pressupõe framework ou banco de dados específico.',
    'Versionamento em Git com commits organizados por recurso ou etapa da especificação.',
  ],
  constraints: [
    'Não implementar servidor backend próprio em Node.js, PHP ou banco de dados SQL nesta etapa.',
    'Para testar chamadas da coleção ou cURL, utilizar exemplos salvos, mocks locais (Mockoon/Bruno/Postman) ou endpoints de eco.',
  ],
  io: [
    'Entrada: requisitos de domínio da biblioteca (livros, leitores, empréstimos e reservas).',
    'Saída: repositório Git contendo documentação do contrato, arquivo OpenAPI e coleção Bruno/Postman.',
  ],
  acceptanceCriteria: [
    'Todos os 10+ endpoints seguem modelagem REST orientada a recursos, sem verbos na URL e sem status 200 para erros.',
    'Os casos de conflito de estado (409, como exemplar já emprestado) e erro de validação semântica (422) estão claramente diferenciados.',
    'A revalidação de cache com ETag / If-None-Match e status 304 está especificada para a consulta de catálogo.',
    'O arquivo OpenAPI e a coleção Bruno/Postman estão sincronizados com a documentação principal no README.',
  ],
  hints: [
    'Comece desenhando a tabela de recursos, caminhos, métodos e status antes de detalhar os corpos JSON de cada rota.',
    'Defina um único schema de erro (ex.: code, message, fieldErrors, timestamp) e reutilize-o em todas as respostas 4xx e 5xx.',
    'Documente como o cliente deve agir se receber timeout ao criar um empréstimo (por exemplo, consultando os empréstimos ativos ou enviando um cabeçalho Idempotency-Key).',
  ],
  testIdeas: [
    'Validar a sintaxe do arquivo openapi.yaml em um validador OpenAPI ou importando-o no Bruno/Postman.',
    'Conferir se todas as respostas 204 No Content e 304 Not Modified estão documentadas sem corpo de mensagem.',
    'Revisar o contrato contra os 8 antipadrões estudados no exercício Revisão de contrato HTTP.',
  ],
  refs: ['ref-02-mdn-rest', 'ref-02-openapi', 'ref-02-rfc-9110', 'ref-02-mdn-status', 'ref-02-mdn-caching', 'mock'],
  rubric: rubric02,
  deliverables: [
    'README.md com visão geral da arquitetura do contrato, regras de paginação e catálogo de erros.',
    'Especificação detalhada em docs/contrato-biblioteca.md e arquivo openapi.yaml.',
    'Coleção Bruno ou Postman na pasta collection/ com exemplos de requisições.',
  ],
  milestones: [
    'Modelar recursos, rotas, métodos e matriz de status HTTP.',
    'Definir payloads JSON de sucesso, paginação e envelope padronizado de erros.',
    'Escrever a especificação OpenAPI e documentar a política de cache condicional (ETag/304).',
    'Montar a coleção no Bruno/Postman e publicar no repositório com histórico Git limpo.',
  ],
  extras: [
    'Configurar um ambiente Mockoon versionado no repositório para responder aos exemplos do contrato.',
    'Especificar cabeçalhos de rate limiting (Retry-After) e chave de idempotência para criação de empréstimos.',
  ],
};

export const project02DiagnosticLab: Activity = {
  id: '02-project-diagnostic-lab',
  slug: 'http-diagnostic-lab',
  title: 'HTTP Diagnostic Lab',
  stageId: '02',
  kind: 'project',
  level: 'avancado',
  optional: false,
  topicIds: topics02.map((t) => t.id),
  competencies: [
    'Rastreamento completo do percurso DNS → TCP/QUIC → TLS/HTTPS → HTTP → proxy/CDN → aplicação → resposta',
    'Interpretação e uso rigoroso de URLs, métodos, status (2xx, 3xx, 4xx, 5xx), headers, cookies e cache condicional',
    'Diagnóstico técnico diferenciando falhas de rede/DNS/timeout, bloqueios de CORS no navegador e erros HTTP',
    'Especificação e auditoria crítica de contratos HTTP/REST e OpenAPI',
    'Domínio integrado de terminal, cURL, Bruno/Postman, DevTools e fluxo Git/GitHub com branches, resolução de conflito e Pull Request',
  ],
  context:
    'Em times de engenharia backend, diagnosticar problemas de rede e protocolo com evidências reais, especificar contratos HTTP sem ambiguidade e entregar alterações via Pull Request revisado formam a base indispensável antes de escrever o código do servidor.',
  problem:
    'Reunir em um único repositório auditável de portfólio a investigação ponta a ponta de requisições reais, o diagnóstico de falhas de rede/CORS/sessão/cache, a especificação revisada de um contrato REST e a comprovação prática de fluxo Git colaborativo com resolução de conflito e Pull Request.',
  statement:
    'Construa o repositório público http-diagnostic-lab integrando cinco módulos práticos: (1) rastreamento de rede e anatomia de 10 requisições HTTP, (2) bateria reproduzível de cURL e coleção Bruno/Postman, (3) diagnóstico experimental de falhas de rede, CORS, cookies de sessão e cache condicional 304, (4) especificação e revisão de contrato REST e (5) entrega via branches Git com resolução documentada de conflito de merge e Pull Request revisado.',
  objectives: [
    'Consolidar todas as competências da Etapa 02 em um projeto integrador de portfólio avaliado por rubrica técnica ponderada.',
  ],
  prerequisites: [
    'Todos os 9 tópicos da Etapa 02 estudados.',
    'Exercícios iniciais (02-ex-01 a 02-ex-03) e intermediários (02-ex-04 a 02-ex-06) concluídos.',
  ],
  requirements: [
    'Módulo 1 · Anatomia e Percurso de Rede: decompor 10 requisições HTTP completas e documentar o percurso DNS → conexão TCP → handshake TLS → HTTP → resposta de chamadas HTTPS reais com métricas de tempo coletadas no DevTools (Timing) e no cURL (-v e -w).',
    'Módulo 2 · Terminal, cURL e Coleção Bruno/Postman: disponibilizar scripts/comandos cURL exercitando as flags -i, -I, -X, -H, -d, --json, -v, --fail-with-body, -o e -w, além de uma coleção exportada do Bruno ou Postman com variáveis de ambiente e testes básicos.',
    'Módulo 3 · Diagnóstico de Falhas, CORS, Cookies e Cache: documentar com evidências reais (a) a diferença entre falha de DNS/timeout e status HTTP 4xx/5xx, (b) preflight OPTIONS e bloqueio de CORS no navegador vs cURL, (c) ciclo Set-Cookie/Cookie com auditoria de HttpOnly, Secure e SameSite, e (d) revalidação condicional com ETag/If-None-Match retornando 304 Not Modified.',
    'Módulo 4 · Contrato REST e Revisão: especificar um contrato de API REST (com filtros, ordenação, paginação e catálogo de erros padronizados para 400, 401, 403, 404, 409, 422, 429, 500, 503) e incluir o registro antes/depois de uma revisão de antipadrões.',
    'Módulo 5 · Fluxo Git e Pull Request: configurar .gitignore e .env.example, desenvolver em branches por funcionalidade, provocar e resolver manualmente ao menos um conflito de merge (documentando o git log --graph e os marcadores resolvidos) e conduzir a entrega via Pull Request com checklist e code review.',
  ],
  nonfunctional: [
    'Rastreabilidade: toda conclusão diagnóstica deve separar fato observado (log, status, header) de hipótese.',
    'Segurança: nenhum segredo, token real ou arquivo .env deve ser versionado no repositório.',
    'Qualidade de portfólio: atingir na autoavaliação o patamar sugerido de referência (equivalente a ≥ 8/10 nos 4 eixos da rubrica: 35% HTTP e REST, 20% Redes e diagnóstico, 25% Ferramentas e testes, 20% Git e documentação) sem nenhuma falha eliminatória.',
  ],
  constraints: [
    'Respeitar os limites curriculares da Etapa 02: não exigir nem depender de implementação de backend próprio em PHP, Laravel, Node.js, Express, NestJS, banco de dados, ORM ou Docker.',
    'Executar todas as verificações em ferramentas reais (terminal, cURL, Bruno/Postman, navegador com DevTools e Git/GitHub).',
  ],
  io: [
    'Entrada: endpoints públicos/mocks analisados, experimentos de falha e requisitos do contrato REST.',
    'Saída: repositório público http-diagnostic-lab com documentação técnica, scripts cURL, coleção Bruno/Postman e histórico Git/PR.',
  ],
  acceptanceCriteria: [
    'Os 5 módulos obrigatórios estão completos e documentados com evidências reais de terminal, cURL, Bruno/Postman, DevTools e Git.',
    'Ausência total de falhas eliminatórias: métodos e status HTTP básicos estão corretos; erro de rede/CORS não é confundido com status HTTP; há comandos reais de cURL e coleção Bruno/Postman; o Git possui branches, resolução de conflito e zero vazamento de segredos.',
    'O percurso DNS → TCP → TLS → HTTP → resposta e o cache condicional (ETag → 304) estão comprovados com saídas reais.',
    'A especificação do contrato REST inclui paginação, filtros, idempotência e erros padronizados (400, 401, 403, 404, 409, 422, 429, 500, 503).',
    'O histórico do repositório demonstra branches, resolução limpa de conflito de merge e Pull Request documentado e revisado.',
  ],
  hints: [
    'Organize o repositório em pastas claras (docs/, curl/, collection/) e use uma branch separada para cada módulo antes de mesclar via Pull Request.',
    'Para o módulo de diagnóstico, use endpoints públicos previsíveis (como httpbin.org/status/..., /cookies, /etag/..., /delay/...) combinados com o DevTools.',
    'Antes de declarar o projeto concluído, revise os 4 eixos da rubrica ponderada (35% HTTP/REST, 20% Redes/diagnóstico, 25% Ferramentas/testes, 20% Git/documentação) e confirme que não há nenhuma falha eliminatória.',
  ],
  testIdeas: [
    'Clonar o repositório em um diretório limpo e rodar os comandos do README para validar a reprodutibilidade.',
    'Verificar com git log --oneline --graph --all e grep se o conflito de merge foi resolvido sem deixar marcadores <<<<<<<.',
    'Importar a coleção exportada no Bruno ou Postman e testar a substituição da variável {{baseUrl}}.',
  ],
  refs: [
    'ref-02-mdn-http',
    'ref-02-rfc-9110',
    'ref-02-mdn-status',
    'ref-02-mdn-headers',
    'ref-02-mdn-cookies',
    'ref-02-mdn-caching',
    'ref-02-mdn-cors',
    'ref-02-cloudflare-dns',
    'ref-02-mdn-dns-tcp-tls',
    'ref-02-mdn-rest',
    'ref-02-openapi',
    'ref-02-linuxcommand',
    'ref-02-curl-docs',
    'ref-02-bruno-docs',
    'ref-02-pro-git-branching',
    'ref-02-github-prs',
  ],
  rubric: rubric02,
  deliverables: [
    'Repositório público http-diagnostic-lab com README.md, .gitignore e .env.example.',
    'Documentos em docs/: anatomia-e-redes.md, diagnostico-falhas-cors-cookies-cache.md, contrato-rest.md e evidencias-git-pr.md.',
    'Bateria de scripts/comandos cURL na pasta curl/ e coleção exportada do Bruno ou Postman na pasta collection/.',
    'Pull Request documentado com checklist de verificação e comentários de auto-revisão (code review).',
  ],
  milestones: [
    'Inicializar o repositório Git, configurar proteção de segredos (.gitignore/.env.example) e planejar as branches.',
    'Executar e documentar a anatomia das 10 requisições, o rastreamento DNS/TCP/TLS/HTTP e a coleção Bruno/Postman.',
    'Realizar os experimentos de diagnóstico de falhas, CORS, cookies de sessão e cache condicional 304.',
    'Especificar e revisar o contrato REST, simular e resolver o conflito de merge e concluir a entrega via Pull Request.',
  ],
  extras: [
    'Incluir especificação OpenAPI 3.1 completa importável diretamente no Bruno ou Postman.',
    'Criar um script shell que executa automaticamente os testes cURL e gera uma tabela Markdown com status e tempos.',
  ],
};

export const projects02: Activity[] = [
  project02Investigador,
  project02Biblioteca,
  project02DiagnosticLab,
];

export const books02: Book[] = [
  {
    id: 'book-02-redes-tcpip',
    title: 'Análise de Tráfego em Redes TCP/IP',
    author: 'João Eriberto Mota Filho',
    edition: '1ª edição',
    year: '2013',
    language: 'Português (pt-BR)',
    level: 'Iniciante a Intermediário',
    topics: ['02-redes', '02-cors-falhas', '02-terminal-ferramentas'],
    stages: ['02'],
    url: 'https://novatec.com.br/livros/analise-trafego-tcp-ip/',
    note: 'Metadados e sumário verificados no catálogo oficial da Novatec (ISBN 978-85-7522-375-8). Leitura opcional para aprofundar TCP, UDP, IP, DNS e análise de tráfego.',
    alternatives: ['ref-02-cloudflare-dns', 'ref-02-mdn-dns-tcp-tls', 'ref-02-mdn-tcp'],
    reason: 'Fundamenta em português o funcionamento prático de IP, portas, TCP, UDP e resolução DNS com foco em diagnóstico de rede.',
    community: 'Obra nacional de referência em análise de redes TCP/IP publicada pela Novatec Editora.',
    cover: {
      kind: 'image',
      src: 'covers/analise-trafego-tcp-ip.webp',
      alt: 'Capa do livro Análise de Tráfego em Redes TCP/IP, de João Eriberto Mota Filho (Novatec Editora)',
      width: 292,
      height: 403,
      origin: 'Catálogo oficial da Novatec Editora (ISBN 978-85-7522-375-8, capa ampliada s3.novatec.com.br).',
      usage: 'Asset estático otimizado em WebP para identificação bibliográfica da edição recomendada, sem links de compra.',
    },
  },
  {
    id: 'book-02-estilos-apis',
    title: 'Dominando Estilos de APIs',
    author: 'Lukasz Dynowski e Marcin Dulak',
    edition: '1ª edição',
    year: '2025',
    language: 'Português (edição brasileira)',
    level: 'Intermediário',
    topics: ['02-http-mensagens', '02-status', '02-headers-cookies-cache', '02-redes', '02-contratos-rest'],
    stages: ['02'],
    url: 'https://novatec.com.br/livros/dominando-estilos-de-apis/',
    note: 'Metadados e sumário verificados no catálogo oficial da Novatec (ISBN 978-85-7522-980-4). Cobre protocolos de rede (TCP, TLS, HTTP/1.1, HTTP/2, HTTP/3), REST, RPC e OpenAPI.',
    alternatives: ['ref-02-mdn-http', 'ref-02-rfc-9110', 'ref-02-mdn-rest', 'ref-02-openapi'],
    reason: 'Conecta protocolos de rede e semântica HTTP ao design e comparação de contratos de APIs REST e RPC.',
    community: 'Tradução brasileira da edição O’Reilly publicada pela Novatec Editora.',
    cover: {
      kind: 'image',
      src: 'covers/dominando-estilos-apis.webp',
      alt: 'Capa do livro Dominando Estilos de APIs, de Lukasz Dynowski e Marcin Dulak (Novatec Editora / O’Reilly)',
      width: 292,
      height: 403,
      origin: 'Catálogo oficial da Novatec Editora (ISBN 978-85-7522-980-4, capa ampliada s3.novatec.com.br).',
      usage: 'Asset estático otimizado em WebP para identificação bibliográfica da edição recomendada, sem links de compra.',
    },
  },
  {
    id: 'book-02-aprendendo-git',
    title: 'Aprendendo Git',
    author: 'Anna Skoulikari',
    edition: '1ª edição',
    year: '2024',
    language: 'Português (edição brasileira)',
    level: 'Iniciante',
    topics: ['02-git-github'],
    stages: ['02'],
    url: 'https://novatec.com.br/livros/aprendendo-git/',
    note: 'Metadados e sumário verificados no catálogo oficial da Novatec (ISBN 978-85-7522-882-1). Aborda staging area, commits, branches, merge, rebase, conflitos e pull requests.',
    alternatives: ['ref-02-pro-git-branching', 'ref-02-git-docs', 'ref-02-github-prs'],
    reason: 'Guia prático e visual para construir um modelo mental sólido de branches, merges, rebases e colaboração com Git e GitHub.',
    community: 'Tradução brasileira da edição O’Reilly publicada pela Novatec Editora.',
    cover: {
      kind: 'image',
      src: 'covers/aprendendo-git.webp',
      alt: 'Capa do livro Aprendendo Git, de Anna Skoulikari (Novatec Editora / O’Reilly)',
      width: 292,
      height: 403,
      origin: 'Catálogo oficial da Novatec Editora (ISBN 978-85-7522-882-1, capa ampliada s3.novatec.com.br).',
      usage: 'Asset estático otimizado em WebP para identificação bibliográfica da edição recomendada, sem links de compra.',
    },
  },
  {
    id: 'book-02-linux-guia-pratico',
    title: 'Linux Guia Prático — Comandos Essenciais',
    author: 'Daniel J. Barrett',
    edition: '4ª edição',
    year: '2024',
    language: 'Português (edição brasileira)',
    level: 'Iniciante a Intermediário',
    topics: ['02-terminal-ferramentas'],
    stages: ['02'],
    url: 'https://novatec.com.br/livros/linux-guia-pratico-4ed/',
    note: 'Metadados e sumário verificados no catálogo oficial da Novatec (ISBN 978-85-7522-911-8).',
    alternatives: ['ref-02-linuxcommand', 'ref-02-curl-docs'],
    reason: 'Referência concisa para navegação no shell, manipulação de arquivos, pipes, redirecionamento, permissões e comandos de rede.',
    community: 'Edição comemorativa de 20 anos (O’Reilly / Novatec Editora).',
    cover: {
      kind: 'image',
      src: 'covers/linux-guia-pratico-4ed.webp',
      alt: 'Capa do livro Linux Guia Prático — 4ª Edição, de Daniel J. Barrett (Novatec Editora / O’Reilly)',
      width: 292,
      height: 403,
      origin: 'Catálogo oficial da Novatec Editora (ISBN 978-85-7522-911-8, capa ampliada s3.novatec.com.br).',
      usage: 'Asset estático otimizado em WebP para identificação bibliográfica da 4ª edição, sem links de compra.',
    },
  },
  {
    id: 'book-02-sistemas-seguros-resilientes',
    title: 'Construindo Sistemas Seguros e Resilientes',
    author: 'Leandro Silva',
    edition: '1ª edição',
    year: '2026',
    language: 'Português (pt-BR)',
    level: 'Intermediário a Avançado',
    topics: ['02-headers-cookies-cache', '02-cors-falhas', '02-redes', '02-contratos-rest'],
    stages: ['02'],
    url: 'https://novatec.com.br/livros/construindo-sistemas-seguros-resilientes/',
    note: 'Metadados e sumário verificados no catálogo oficial da Novatec (ISBN 978-85-7522-988-0). Leitura complementar sobre transporte seguro, sessões e resiliência a falhas.',
    alternatives: ['ref-02-mdn-cors', 'ref-02-mdn-cookies', 'ref-02-mdn-dns-tcp-tls'],
    reason: 'Aprofunda a relação entre TLS, cabeçalhos de segurança, timeouts, retries e resiliência em arquiteturas web modernas.',
    community: 'Obra brasileira publicada pela Novatec Editora.',
    cover: {
      kind: 'image',
      src: 'covers/construindo-sistemas-seguros-resilientes.webp',
      alt: 'Capa do livro Construindo Sistemas Seguros e Resilientes, de Leandro Silva (Novatec Editora)',
      width: 292,
      height: 403,
      origin: 'Catálogo oficial da Novatec Editora (ISBN 978-85-7522-988-0, capa ampliada s3.novatec.com.br).',
      usage: 'Asset estático otimizado em WebP para identificação bibliográfica da edição recomendada, sem links de compra.',
    },
  },
];
