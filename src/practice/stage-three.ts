import type { Activity, Book, StudyTopic, TrackTag } from './curriculum';
import type { Reference } from './catalog';

const checkedOn = '2026-10-17';

const ref = (
  id: string,
  title: string,
  url: string,
  language: 'PT-BR' | 'Inglês',
  section: string,
  note = '',
  version = 'Documentação oficial · consultada em 2026-10-17',
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

export const references03: Reference[] = [
  ref(
    'ref-03-php-manual',
    'PHP Manual · Documentação em Português',
    'https://www.php.net/manual/pt_BR/',
    'PT-BR',
    'Referência da linguagem: tipos, variáveis, operadores, estruturas de controle, funções, classes e exceções',
    'Tradução oficial em português brasileiro; para declarações de tipos recentes do PHP 8.2–8.5, complemente com a seção em inglês.',
    'PHP 8.x · Manual vivo'
  ),
  ref(
    'ref-03-php-types',
    'PHP Manual · Type declarations',
    'https://www.php.net/manual/en/language.types.declarations.php',
    'Inglês',
    'Tipos escalares, retorno, nullable (?T), union types e declare(strict_types=1)',
    'Explica que strict_types vale por arquivo chamador e que declaradores de tipo não validam automaticamente payloads JSON brutos.',
    'PHP 8.2–8.5'
  ),
  ref(
    'ref-03-php-oop',
    'PHP Manual · Classes e Objetos (Básico)',
    'https://www.php.net/manual/pt_BR/language.oop5.basic.php',
    'PT-BR',
    'Classes, propriedades tipadas, métodos, construtores, visibilidade, interfaces, traits e namespaces',
    'Base em português para modelar entidades com invariantes de domínio e encapsulamento.',
    'PHP 8.x'
  ),
  ref(
    'ref-03-php-webserver',
    'PHP Manual · Servidor web embutido (CLI)',
    'https://www.php.net/manual/pt_BR/features.commandline.webserver.php',
    'PT-BR',
    'Execução via php -S localhost:8000 -t public, roteamento local e diferença entre PHP CLI e SAPI web/PHP-FPM',
    'Destaca que o servidor embutido é exclusivo para desenvolvimento local e que a raiz pública deve ser isolada em public/.',
    'PHP CLI / SAPI'
  ),
  ref(
    'ref-03-composer-doc',
    'Composer · Basic Usage & Autoloading',
    'https://getcomposer.org/doc/',
    'Inglês',
    'composer.json, composer.lock, gerenciamento de pacotes e autoloading PSR-4',
    'Diferencia composer install (respeita o lockfile) de composer update e mostra como gerar vendor/autoload.php.',
    'Composer 2.x'
  ),
  ref(
    'ref-03-psr',
    'PHP-FIG · PSR Index (PSR-3, PSR-4, PSR-7, PSR-12)',
    'https://www.php-fig.org/psr/',
    'Inglês',
    'Índice das recomendações PHP-FIG: autoloading (PSR-4), estilo de código (PSR-12), interfaces de log (PSR-3) e mensagens HTTP (PSR-7)',
    'Mostra como o ecossistema PHP padroniza interoperabilidade entre bibliotecas e frameworks.',
    'PHP-FIG oficial'
  ),
  ref(
    'ref-03-psr4',
    'PHP-FIG · PSR-4: Autoloader',
    'https://www.php-fig.org/psr/psr-4/',
    'Inglês',
    'Mapeamento entre prefixo de namespace, diretório base e nome de arquivo com correspondência exata de maiúsculas/minúsculas',
    'Indispensável para evitar erros de carregamento ao migrar de Windows/macOS (case-insensitive) para Linux.',
    'PSR-4 Aceita'
  ),
  ref(
    'ref-03-laravel-structure',
    'Laravel Docs · Directory Structure & Lifecycle',
    'https://laravel.com/docs/13.x/structure',
    'Inglês',
    'Finalidade de app/, bootstrap/app.php, config/, public/index.php, routes/, storage/, tests/, vendor/, .env e artisan',
    'Descreve a organização padrão do Laravel 13 e como a requisição entra por public/index.php até o kernel e roteador.',
    'Laravel 13.x'
  ),
  ref(
    'ref-03-laravel-routing',
    'Laravel Docs · Routing & Controllers',
    'https://laravel.com/docs/13.x/routing',
    'Inglês',
    'Definição de rotas HTTP, parâmetros de rota, grupos, controllers, Request, Response JSON e status HTTP',
    'Referência oficial para construir rotas de API limpas sem lógica acoplada diretamente ao arquivo de rotas.',
    'Laravel 13.x'
  ),
  ref(
    'ref-03-laravel-middleware',
    'Laravel Docs · Middleware',
    'https://laravel.com/docs/13.x/middleware',
    'Inglês',
    'Fluxo de camadas antes/depois do handler, registro em bootstrap/app.php, aplicação a rotas e configuração de CORS',
    'Ilustra como interceptar requisições para correlação, cabeçalhos e políticas transversais.',
    'Laravel 13.x'
  ),
  ref(
    'ref-03-laravel-validation',
    'Laravel Docs · Validation',
    'https://laravel.com/docs/13.x/validation',
    'Inglês',
    'Regras de validação no servidor, Form Requests, mensagens consistentes e respostas 422 Unprocessable Content em JSON',
    'Esclarece que respostas JSON 422 automáticas dependem do cabeçalho Accept: application/json ou rotas de API.',
    'Laravel 13.x'
  ),
  ref(
    'ref-03-laravel-errors',
    'Laravel Docs · Error Handling & Logging',
    'https://laravel.com/docs/13.x/errors',
    'Inglês',
    'Configuração de APP_DEBUG, tratamento centralizado de exceções, renderização JSON de erros e canais de log',
    'Fundamental para garantir que stack traces nunca vazem para o cliente quando APP_DEBUG=false.',
    'Laravel 13.x'
  ),
  ref(
    'ref-03-laravel-container',
    'Laravel Docs · Service Container',
    'https://laravel.com/docs/13.x/container',
    'Inglês',
    'Injeção de dependências automática pelo construtor, bindings de interfaces e organização pragmática por responsabilidade',
    'Orienta a injetar colaboradores concretos ou contratos reais sem criar camadas artificiais de pass-through.',
    'Laravel 13.x'
  ),
  ref(
    'ref-03-laravel-testing',
    'Laravel Docs · HTTP Tests',
    'https://laravel.com/docs/13.x/testing',
    'Inglês',
    'Testes de rotas com getJson, postJson, patchJson, deleteJson, assertStatus e assertJsonStructure',
    'Mostra como exercitar endpoints de sucesso e erro de forma automatizada com PHPUnit ou Pest.',
    'Laravel 13.x'
  ),
  ref(
    'ref-03-ts-handbook',
    'TypeScript · The TypeScript Handbook',
    'https://www.typescriptlang.org/docs/handbook/intro.html',
    'Inglês',
    'Tipos primitivos, interfaces, type aliases, union types, narrowing, generics introdutórios e apagamento de tipos em runtime',
    'Destaca a diferença crítica entre checagem estática em tempo de compilação e validação real de JSON recebido na rede.',
    'TypeScript 5.9+'
  ),
  ref(
    'ref-03-node-learn',
    'Node.js · Learn Node.js',
    'https://nodejs.org/en/learn',
    'Inglês',
    'Runtime Node.js, gerenciamento de pacotes com npm, scripts, event loop, I/O não bloqueante, process.env e fluxo assíncrono',
    'Trilha oficial gratuita sobre como o Node executa JavaScript no servidor e lida com concorrência de I/O.',
    'Node.js 24 LTS',
    'Guia oficial'
  ),
  ref(
    'ref-03-node-esm',
    'Node.js API · Modules: ECMAScript modules',
    'https://nodejs.org/api/esm.html',
    'Inglês',
    'Sistema de módulos ESM vs CommonJS, import/export, package.json "type": "module" e resolução de caminhos',
    'Explica por que imports relativos em ESM no Node exigem atenção à extensão e ao moduleResolution do TypeScript.',
    'Node.js 24.x API'
  ),
  ref(
    'ref-03-node-eventloop',
    'Node.js · The Node.js Event Loop',
    'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick',
    'Inglês',
    'Fases do event loop, delegação de I/O assíncrono ao sistema operacional, timers, Promises e bloqueio da thread principal',
    'Ajuda a compreender por que processamento pesado síncrono trava todas as requisições concorrentes do servidor.',
    'Node.js oficial',
    'Guia oficial'
  ),
  ref(
    'ref-03-node-http',
    'Node.js API · HTTP (node:http)',
    'https://nodejs.org/api/http.html',
    'Inglês',
    'http.createServer, IncomingMessage (stream de leitura), ServerResponse, cabeçalhos, statusCode e encerramento gracioso',
    'Mostra o funcionamento do servidor HTTP nativo antes de introduzir abstrações de frameworks como Express.',
    'Node.js 24.x API'
  ),
  ref(
    'ref-03-node-test',
    'Node.js API · Test runner (node:test)',
    'https://nodejs.org/api/test.html',
    'Inglês',
    'Execução de testes unitários e de endpoints com node --test, describe, it e node:assert/strict sem dependências pesadas',
    'Permite testar regras e servidores HTTP em portas efêmeras (listen(0)) diretamente com o runtime oficial.',
    'Node.js 24.x API'
  ),
  ref(
    'ref-03-express-routing',
    'Express · Routing Guide',
    'https://expressjs.com/en/guide/routing.html',
    'Inglês',
    'Criação da aplicação Express, express.Router, métodos HTTP, req.params, req.query, req.body, res.status() e res.json()',
    'Referência direta para organizar rotas modulares e separar inicialização do servidor (server.ts) da configuração da app (app.ts).',
    'Express 5.x'
  ),
  ref(
    'ref-03-express-middleware',
    'Express · Using middleware',
    'https://expressjs.com/en/guide/using-middleware.html',
    'Inglês',
    'Pipeline de middlewares de aplicação e de roteador, express.json(), ordem de registro, next() e interceptação de requisições',
    'Demonstra como encadear parsing de JSON, logs, CORS e validação antes dos controllers.',
    'Express 5.x'
  ),
  ref(
    'ref-03-express-errors',
    'Express · Error handling',
    'https://expressjs.com/en/guide/error-handling.html',
    'Inglês',
    'Captura automática de Promises rejeitadas no Express 5 e middleware centralizado de erro com quatro parâmetros (err, req, res, next)',
    'Atenção à versão: o Express 5 encaminha rejeições de funções async automaticamente ao error handler, diferente do Express 4.',
    'Express 5.x'
  ),
  ref(
    'ref-03-zod',
    'Zod · Schema Validation API',
    'https://zod.dev/api',
    'Inglês',
    'Esquemas de validação em runtime (safeParse, object, string, number, union) e inferência de tipos estáticos z.infer',
    'Complementa o TypeScript validando payloads reais de req.body, req.query e req.params na fronteira HTTP.',
    'Zod 3.x / 4.x'
  ),
  ref(
    'ref-03-nest-first-steps',
    'NestJS Docs · First steps',
    'https://docs.nestjs.com/first-steps',
    'Inglês',
    'Arquitetura modular sobre Node.js e TypeScript, Nest CLI, bootstrap em main.ts e adaptadores HTTP (Express/Fastify)',
    'Opcional na trilha TypeScript. Deixa explícito que o NestJS é um framework opinativo sobre Node.js, não um substituto do runtime.',
    'NestJS 11/12'
  ),
  ref(
    'ref-03-nest-controllers',
    'NestJS Docs · Controllers',
    'https://docs.nestjs.com/controllers',
    'Inglês',
    'Decorators @Controller, @Get, @Post, @Patch, @Delete, @Param, @Query, @Body e códigos de status HTTP',
    'Opcional na trilha TypeScript. Compare o estilo declarativo por decorators com o roteamento explícito do Express.',
    'NestJS 11/12'
  ),
  ref(
    'ref-03-nest-providers',
    'NestJS Docs · Providers & Dependency Injection',
    'https://docs.nestjs.com/providers',
    'Inglês',
    '@Injectable(), registro em módulos (@Module) e injeção de dependências pelo construtor',
    'Opcional na trilha TypeScript. Mostra como o contêiner de IoC do NestJS gerencia instâncias de serviços.',
    'NestJS 11/12'
  ),
  ref(
    'ref-03-nest-validation',
    'NestJS Docs · Validation (Pipes & DTOs)',
    'https://docs.nestjs.com/techniques/validation',
    'Inglês',
    'ValidationPipe, classes DTO, whitelist, forbidNonWhitelisted, ParseIntPipe e filtros de exceção HTTP',
    'Opcional na trilha TypeScript. Explica por que interfaces TypeScript puras desaparecem na compilação e não acionam decorators de validação em runtime.',
    'NestJS 11/12'
  ),
];

const topic = (
  id: string,
  name: string,
  goal: string,
  before: string[],
  refs: string[],
  exerciseIds: string[],
  competencies: string[],
  practiceCriteria: string[],
  track: TrackTag,
  optional = false
): StudyTopic => ({
  id,
  stageId: '03',
  name,
  goal,
  before,
  optional,
  track,
  refs,
  exerciseIds,
  competencies,
  practiceCriteria,
});

export const topics03: StudyTopic[] = [
  // 4. Fundamentos comuns (6 tópicos compartilhados)
  topic(
    '03-linguagem-runtime-framework',
    'Linguagem, runtime e framework',
    'Diferenciar o papel da linguagem de programação, do ambiente de execução (runtime/SAPI), do servidor HTTP e do framework backend.',
    ['Entender requisições e respostas HTTP, cURL/Bruno e Git da Etapa 02.'],
    ['ref-03-php-webserver', 'ref-03-node-learn', 'ref-03-laravel-structure', 'ref-03-express-routing'],
    ['03-php-02', '03-ts-02', '03-ex-09'],
    [
      'Diferenciar sintaxe e semântica da linguagem (PHP ou TypeScript/JavaScript) do ambiente que executa o processo (PHP CLI/FPM ou Node.js).',
      'Distinguir biblioteca (chamada pelo seu código) de framework (inversão de controle que chama seus handlers).',
      'Identificar o ponto de entrada da aplicação e como o servidor HTTP entrega a requisição ao código.',
    ],
    [
      'Documentar no README da sua stack qual é o runtime utilizado, o ponto de entrada e a fronteira entre servidor HTTP e código de aplicação.',
      'Explicar com evidências a diferença entre executar um script de linha de comando (CLI) e atender requisições HTTP em loop ou por processo.',
    ],
    'comum'
  ),
  topic(
    '03-ciclo-requisicao',
    'Ciclo de uma requisição no backend',
    'Rastrear o caminho Requisição → Roteamento → Middleware → Handler/Controller → Resposta HTTP com parâmetros, query, body JSON, status e headers.',
    ['03-linguagem-runtime-framework'],
    ['ref-03-laravel-routing', 'ref-03-laravel-middleware', 'ref-03-express-routing', 'ref-03-express-middleware'],
    ['03-php-03', '03-ts-03', '03-php-05', '03-ts-04'],
    [
      'Mapear como URL, método HTTP, route params, query parameters, headers e body JSON são extraídos no servidor.',
      'Compreender a ordem de passagem pelos middlewares antes e depois do controller/handler.',
      'Construir respostas JSON consistentes com Content-Type e códigos de status HTTP semânticos (200, 201, 204, 400, 404, 422, 500).',
    ],
    [
      'Demonstrar uma requisição completa atravessando rota, middleware e handler na stack escolhida, inspecionando entrada e saída.',
      'Reproduzir leitura de parâmetros de rota, query string e corpo JSON retornando status HTTP coerentes.',
    ],
    'comum'
  ),
  topic(
    '03-configuracao-dependencias',
    'Configuração por ambiente e dependências',
    'Gerenciar variáveis de ambiente (.env e .env.example), segredos, versionamento semântico, lockfiles e scripts de desenvolvimento/produção.',
    ['03-linguagem-runtime-framework'],
    ['ref-03-composer-doc', 'ref-03-laravel-structure', 'ref-03-node-learn'],
    ['03-php-02', '03-ts-02', '03-ex-07'],
    [
      'Separar configuração variável por ambiente (porta, modo debug, origem CORS) do código-fonte usando variáveis de ambiente.',
      'Versionar um arquivo .env.example limpo e manter .env fora do Git (.gitignore) para proteger segredos.',
      'Diferenciar manifesto de dependências (composer.json ou package.json) de lockfile (composer.lock ou package-lock.json) e usar versionamento semântico.',
    ],
    [
      'Configurar projeto com .env.example documentado, lockfile íntegro e scripts reproduzíveis de execução e teste.',
      'Demonstrar que a aplicação altera comportamento de configuração (como porta ou nível de detalhe de erro) via variável de ambiente sem editar código.',
    ],
    'comum'
  ),
  topic(
    '03-validacao-erros-logs',
    'Validação no servidor, erros e logs',
    'Tratar toda entrada externa como não confiável, validar contratos no servidor, diferenciar erros 4xx de falhas 5xx e registrar logs úteis sem expor stack traces.',
    ['03-ciclo-requisicao'],
    ['ref-03-laravel-validation', 'ref-03-laravel-errors', 'ref-03-express-errors', 'ref-03-zod'],
    ['03-php-04', '03-ts-05', '03-ex-07'],
    [
      'Validar tipos, obrigatoriedade, formato e limites de domínio no servidor antes de executar regras de negócio.',
      'Distinguir JSON malformado (400), recurso inexistente (404), violação de regra/validação (422) e falha inesperada (500).',
      'Registrar logs estruturados ou contextuais de diagnóstico no servidor sem vazar dados sensíveis ou stack traces na resposta HTTP de produção.',
    ],
    [
      'Comprovar que payloads inválidos são rejeitados com resposta padronizada e não mutam o estado em memória ou arquivo.',
      'Demonstrar tratamento centralizado de exceções e registro de log sem exibir trilha interna de pilha ao cliente.',
    ],
    'comum'
  ),
  topic(
    '03-organizacao-testes',
    'Organização de código e testes introdutórios',
    'Separar responsabilidades com simplicidade e escrever testes automatizados introdutórios para regras de domínio e rotas HTTP.',
    ['03-ciclo-requisicao', '03-validacao-erros-logs'],
    ['ref-03-laravel-container', 'ref-03-laravel-testing', 'ref-03-node-test'],
    ['03-php-06', '03-ts-06', '03-ex-07'],
    [
      'Organizar diretórios separando transporte HTTP (rotas/controllers) da lógica de domínio sem criar camadas vazias desnecessárias.',
      'Escrever testes automatizados verificando cenários de sucesso, validação e erro.',
      'Depurar falhas reproduzindo entradas, inspecionando logs e confirmando que o estado permanece íntegro após uma requisição recusada.',
    ],
    [
      'Executar uma suíte automatizada local cobrindo ao menos um fluxo de sucesso e dois cenários de erro (ex.: 404 e 422).',
      'Explicar a responsabilidade de cada pasta do projeto sem recorrer a abstrações especulativas.',
    ],
    'comum'
  ),
  topic(
    '03-seguranca-introdutoria',
    'Segurança introdutória no backend',
    'Aplicar princípios essenciais de defesa no servidor: desconfiar do cliente, proteger segredos, ocultar detalhes internos, restringir CORS e cuidar das dependências.',
    ['03-configuracao-dependencias', '03-validacao-erros-logs'],
    ['ref-03-laravel-errors', 'ref-03-laravel-middleware', 'ref-03-express-middleware'],
    ['03-php-04', '03-ts-05', '03-ex-07', '03-ex-09'],
    [
      'Nunca confiar em validações feitas apenas no frontend ou em campos extras enviados no body JSON (mass assignment / propriedades não autorizadas).',
      'Garantir que chaves, credenciais e stack traces não apareçam em respostas HTTP, logs públicos ou commits Git.',
      'Configurar CORS de forma consciente por ambiente e manter dependências auditáveis com lockfile, sem antecipar auth/RBAC da Etapa 07.',
    ],
    [
      'Demonstrar descarte ou rejeição de propriedades não permitidas no payload e resposta de erro segura sem stack trace.',
      'Verificar que o repositório contém apenas .env.example com valores fictícios e nenhuma credencial real.',
    ],
    'comum'
  ),

  // 5. Trilha A — PHP moderno (5 tópicos) + 6. Laravel (7 tópicos) = 12 tópicos base da Trilha PHP
  topic(
    '03-php-fundamentos',
    'PHP moderno: sintaxe, arrays, funções, datas e JSON',
    'Dominar variáveis, operadores estritos, arrays indexados e associativos, condicionais, repetições, funções, strings, DateTimeImmutable e JSON no PHP 8.',
    ['03-linguagem-runtime-framework'],
    ['ref-03-php-manual', 'ref-03-php-types'],
    ['03-php-01'],
    [
      'Utilizar operadores de comparação estrita (===), manipulação de strings multibyte, DateTimeImmutable e funções puras.',
      'Manipular arrays indexados e associativos compreendendo que arrays em PHP são mapas ordenados.',
      'Codificar e decodificar JSON com json_encode e json_decode(..., JSON_THROW_ON_ERROR), distinguindo lista JSON de objeto JSON.',
    ],
    [
      'Implementar script ou função PHP que processa e filtra uma lista de registros JSON tratando entradas vazias e JSON malformado.',
    ],
    'php'
  ),
  topic(
    '03-php-tipagem',
    'Tipagem no PHP: escalares, nullable, union types e strict_types',
    'Declarar tipos escalares, tipos de parâmetros e retorno, nullable (?T), union types e ativar declare(strict_types=1) com segurança.',
    ['03-php-fundamentos'],
    ['ref-03-php-types', 'ref-03-php-manual'],
    ['03-php-01'],
    [
      'Ativar declare(strict_types=1) compreendendo que a verificação estrita aplica-se às chamadas feitas a partir daquele arquivo.',
      'Definir assinaturas explícitas com tipos escalares (int, string, bool, float), anuláveis (?int) e union types (int|string).',
      'Diferenciar garantia de tipo na assinatura PHP da validação de dados vindos de fontes externas como JSON ou $_GET.',
    ],
    [
      'Demonstrar com código e teste local a diferença de comportamento com declare(strict_types=1) diante de tipos incompatíveis.',
    ],
    'php'
  ),
  topic(
    '03-php-oo',
    'Orientação a objetos em PHP: classes, interfaces, traits e exceções',
    'Modelar classes com propriedades tipadas, construtores, encapsulamento, interfaces, traits, namespaces e tratamento de exceções.',
    ['03-php-tipagem'],
    ['ref-03-php-oop', 'ref-03-php-types'],
    ['03-php-01', '03-php-06'],
    [
      'Construir classes com propriedades tipadas, promoção de propriedades no construtor e validação de invariantes.',
      'Aplicar visibilidade (private, protected, public), contratos via interfaces, reuso horizontal com traits e organização em namespaces.',
      'Lançar e capturar exceções específicas da hierarquia Throwable (como InvalidArgumentException e DomainException).',
    ],
    [
      'Criar a classe Livro com invariantes protegidas no construtor e testes verificando rejeição de dados inválidos por exceção.',
    ],
    'php'
  ),
  topic(
    '03-php-composer-psr',
    'Composer, autoloading PSR-4 e organização de projetos PHP',
    'Configurar composer.json, composer.lock, autoloading PSR-4 e padrões PHP-FIG (PSR-4, PSR-12) em uma estrutura limpa.',
    ['03-php-oo', '03-configuracao-dependencias'],
    ['ref-03-composer-doc', 'ref-03-psr', 'ref-03-psr4'],
    ['03-php-01', '03-php-02'],
    [
      'Configurar o mapeamento PSR-4 em composer.json relacionando namespace (ex.: App\\ ou StackTrail\\) ao diretório src/.',
      'Executar composer install e composer dump-autoload compreendendo o papel de vendor/autoload.php e do composer.lock.',
      'Aplicar boas práticas de estilo e interoperabilidade das PSRs na estrutura de diretórios do projeto.',
    ],
    [
      'Estruturar um projeto PHP carregado integralmente via vendor/autoload.php (PSR-4), sem espalhar require_once manuais.',
    ],
    'php'
  ),
  topic(
    '03-php-execucao',
    'Execução PHP: CLI, servidor embutido e ciclo de vida web',
    'Diferenciar a execução de scripts no PHP CLI do atendimento de requisições web via servidor de desenvolvimento (php -S) e PHP-FPM.',
    ['03-php-composer-psr', '03-ciclo-requisicao'],
    ['ref-03-php-webserver', 'ref-03-php-manual'],
    ['03-php-01', '03-php-02'],
    [
      'Executar programas via PHP CLI lendo argumentos/arquivos e retornando códigos de saída (exit 0 / exit 1) adequados.',
      'Subir o servidor embutido de desenvolvimento apontando para um diretório público isolado (php -S localhost:8000 -t public).',
      'Explicar o isolamento por requisição no modelo tradicional PHP-FPM/SAPI web em contraste com processos de longa duração.',
    ],
    [
      'Executar tanto um comando CLI quanto um ponto de entrada web local, documentando a diferença de ciclo de vida entre ambos.',
    ],
    'php'
  ),
  topic(
    '03-laravel-introducao',
    'Laravel: instalação, Artisan e convenções do framework',
    'Preparar um projeto Laravel, compreender os requisitos do ambiente, utilizar o utilitário CLI Artisan e as convenções do ecossistema.',
    ['03-php-composer-psr', '03-php-execucao'],
    ['ref-03-laravel-structure', 'ref-03-composer-doc'],
    ['03-php-03'],
    [
      'Verificar requisitos do PHP e extensões, instalar ou inspecionar uma aplicação Laravel via Composer e configurar o ambiente inicial.',
      'Utilizar comandos essenciais do Artisan (route:list, test, serve, about) para inspecionar e operar a aplicação.',
      'Compreender o princípio de convenção sobre configuração adotado pelo Laravel.',
    ],
    [
      'Subir a aplicação Laravel localmente, inspecionar rotas registradas com php artisan route:list e documentar os comandos no README.',
    ],
    'php'
  ),
  topic(
    '03-laravel-estrutura',
    'Estrutura de diretórios e inicialização do Laravel',
    'Compreender a finalidade de app/, bootstrap/app.php, config/, public/index.php, routes/, storage/, tests/, vendor/, .env e artisan.',
    ['03-laravel-introducao'],
    ['ref-03-laravel-structure'],
    ['03-php-02', '03-php-03'],
    [
      'Identificar o papel de cada diretório padrão do Laravel (app/, bootstrap/, config/, public/, resources/, routes/, storage/, tests/, vendor/).',
      'Rastrear a inicialização a partir de public/index.php passando por bootstrap/app.php até os arquivos de rotas e controllers.',
      'Localizar onde ficam variáveis de ambiente (.env / .env.example), arquivos de configuração (config/) e o executável artisan.',
    ],
    [
      'Documentar o mapa arquitetural do projeto explicando o caminho da requisição desde public/index.php até o controller e a configuração.',
    ],
    'php'
  ),
  topic(
    '03-laravel-http',
    'HTTP no Laravel: rotas, controllers, Request e Response JSON',
    'Criar rotas HTTP e controllers no Laravel lendo parâmetros de rota, query strings e body JSON, retornando status HTTP e payload estruturado.',
    ['03-laravel-estrutura', '03-ciclo-requisicao'],
    ['ref-03-laravel-routing'],
    ['03-php-03', '03-php-05'],
    [
      'Registrar rotas GET, POST, PATCH e DELETE encaminhando para métodos claros em Controllers.',
      'Extrair parâmetros de rota, query strings ($request->query()) e dados JSON ($request->json() / $request->input()).',
      'Retornar respostas padronizadas com response()->json(..., $status) e cabeçalhos adequados.',
    ],
    [
      'Implementar endpoints GET /health e rotas de catálogo de livros no Laravel retornando JSON e status HTTP 200, 201, 204 e 404.',
    ],
    'php'
  ),
  topic(
    '03-laravel-middleware',
    'Middleware e CORS no Laravel',
    'Compreender o papel dos middlewares no Laravel, sua ordem de execução, aplicação a rotas/grupos e configuração de CORS.',
    ['03-laravel-http'],
    ['ref-03-laravel-middleware'],
    ['03-php-05', '03-ex-07'],
    [
      'Entender como um middleware inspeciona, enriquece ou interrompe a requisição antes de chegar ao controller ou antes de devolver a resposta.',
      'Aplicar middlewares a rotas específicas ou grupos e configurar a ordem de execução em bootstrap/app.php.',
      'Compreender a configuração de CORS no Laravel para permitir consumo seguro por aplicações frontend autorizadas.',
    ],
    [
      'Criar e registrar um middleware (como cabeçalho X-Request-Id ou registro de tempo/log) aplicado às rotas da API.',
    ],
    'php'
  ),
  topic(
    '03-laravel-validacao-erros',
    'Validação, Form Requests, exceções e logs no Laravel',
    'Validar entradas com regras do Laravel e Form Requests, padronizar respostas de erro JSON (400/404/422/500) e registrar logs.',
    ['03-laravel-http', '03-validacao-erros-logs'],
    ['ref-03-laravel-validation', 'ref-03-laravel-errors'],
    ['03-php-04', '03-php-05'],
    [
      'Utilizar regras de validação nativas do Laravel ou classes Form Request dedicadas para isolar a validação do controller.',
      'Garantir retorno HTTP 422 com estrutura de erros clara quando dados obrigatórios ou limites de domínio falham.',
      'Configurar tratamento de exceções e Log::info / Log::warning / Log::error sem vazar stack traces quando APP_DEBUG=false.',
    ],
    [
      'Demonstrar rejeição 422 em payloads inválidos via Form Request ou validador e registro de log estruturado no servidor.',
    ],
    'php'
  ),
  topic(
    '03-laravel-organizacao',
    'Service Container, injeção de dependências e organização no Laravel',
    'Utilizar injeção de dependências pelo construtor e organizar regras em classes coesas (ou Actions simples) sem overengineering.',
    ['03-laravel-validacao-erros', '03-organizacao-testes'],
    ['ref-03-laravel-container'],
    ['03-php-06', '03-ex-07'],
    [
      'Compreender como o Service Container resolve dependências tipadas no construtor de controllers e serviços.',
      'Extrair regras de domínio ou casos de uso para classes focadas (como um serviço de catálogo ou Action simples) quando justificado.',
      'Evitar antipadrões comuns: repositories genéricos artificiais, services que apenas repassam chamadas ou camadas vazias sem regra.',
    ],
    [
      'Refatorar um controller extraindo a regra de catálogo/agendamento para uma classe injetada pelo container, mantendo o código direto e testável.',
    ],
    'php'
  ),
  topic(
    '03-laravel-testes',
    'Testes de rotas e respostas no Laravel',
    'Escrever testes automatizados no Laravel verificando status HTTP, estrutura JSON, validação de erros e integridade dos dados sem exigir SQL.',
    ['03-laravel-organizacao'],
    ['ref-03-laravel-testing'],
    ['03-php-05', '03-php-06', '03-ex-07'],
    [
      'Escrever testes de feature/HTTP exercitando GET, POST, PATCH e DELETE com postJson, patchJson e assertStatus.',
      'Testar cenários negativos (payload inválido 422, recurso ausente 404) e confirmar que a operação inválida não corrompeu os dados.',
      'Compreender onde Eloquent e migrations se encaixam no Laravel conceitualmente, mantendo o armazenamento desta etapa em memória/JSON local (SQL pertence à Etapa 05).',
    ],
    [
      'Executar php artisan test (ou vendor/bin/phpunit) passando testes de sucesso e falha para os endpoints da API.',
    ],
    'php'
  ),

  // 7. Trilha B — TypeScript (3) + 8. Node.js (6) + 9. Express (3 consolidados cobrindo 9.1–9.8) = 12 tópicos base da Trilha TypeScript
  topic(
    '03-ts-fundamentos-backend',
    'TypeScript no Backend: tipos, interfaces, unions, narrowing e generics',
    'Aplicar tipos primitivos, arrays, objetos, interfaces, type aliases, union types, optional properties, narrowing e generics introdutórios no servidor.',
    ['03-linguagem-runtime-framework'],
    ['ref-03-ts-handbook'],
    ['03-ts-01'],
    [
      'Modelar entidades, contratos de entrada/saída e resultados de busca usando interfaces, type aliases, union types e propriedades opcionais.',
      'Refinar valores desconhecidos (unknown) com type guards e narrowing antes de acessar propriedades.',
      'Utilizar generics introdutórios e tipagem explícita de parâmetros e retornos em funções de domínio.',
    ],
    [
      'Implementar módulo de domínio em TypeScript que valida dados unknown com narrowing e filtra registros sem usar any.',
    ],
    'javascript'
  ),
  topic(
    '03-ts-assincrono',
    'Programação assíncrona em TypeScript: Promises e async/await',
    'Coordenar operações assíncronas com Promises e async/await, tratando rejeições, erros e fluxos sequenciais ou concorrentes.',
    ['03-ts-fundamentos-backend'],
    ['ref-03-ts-handbook', 'ref-03-node-learn'],
    ['03-ts-01', '03-ts-03'],
    [
      'Compreender os estados de uma Promise (pending, fulfilled, rejected) e o uso correto de async/await com try/catch.',
      'Propagar e transformar erros assíncronos sem engolir falhas silenciosamente nem deixar unhandled rejections.',
      'Distinguir quando aguardar operações em sequência e quando coordenar leituras independentes com Promise.all.',
    ],
    [
      'Demonstrar leitura e processamento assíncrono de dados com tratamento explícito de falha e código de saída/erro determinístico.',
    ],
    'javascript'
  ),
  topic(
    '03-ts-configuracao',
    'Configuração TypeScript: tsconfig.json, modo strict e runtime vs compilação',
    'Configurar tsconfig.json com strict ativado, compreender compilação/transpilação e a diferença entre tipos estáticos e validação em runtime.',
    ['03-ts-fundamentos-backend', '03-configuracao-dependencias'],
    ['ref-03-ts-handbook', 'ref-03-node-esm'],
    ['03-ts-01', '03-ts-02'],
    [
      'Configurar tsconfig.json para Node.js com strict: true, target, module/moduleResolution compatíveis e diretórios rootDir/outDir.',
      'Compreender que os tipos TypeScript são removidos na compilação/execução (type erasure) e não existem em tempo de execução.',
      'Explicar por que usar as MinhaInterface em JSON.parse() não valida dados reais vindos de arquivos ou requisições HTTP.',
    ],
    [
      'Executar tsc --noEmit sem erros no modo strict e comprovar validação em runtime separada da tipagem estática.',
    ],
    'javascript'
  ),
  topic(
    '03-node-ambiente-npm',
    'Node.js como runtime: versões, npm, package.json, lockfile e scripts',
    'Gerenciar um projeto Node.js com npm, package.json, package-lock.json, scripts de automação e separação entre dependencies e devDependencies.',
    ['03-ts-configuracao', '03-configuracao-dependencias'],
    ['ref-03-node-learn'],
    ['03-ts-01', '03-ts-02'],
    [
      'Compreender o papel do Node.js como runtime JavaScript no servidor e verificar a versão ativa (node -v / engines).',
      'Estruturar package.json com scripts claros (build, start, dev, test, typecheck) e manter package-lock.json versionado.',
      'Diferenciar dependências de produção (dependencies) de ferramentas de desenvolvimento e compilação (devDependencies).',
    ],
    [
      'Configurar projeto Node.js onde npm test e npm run build funcionam de forma limpa e reproduzível a partir do package.json.',
    ],
    'javascript'
  ),
  topic(
    '03-node-modulos',
    'Módulos no Node.js: ESM, CommonJS e resolução de arquivos',
    'Trabalhar com ECMAScript Modules (import/export), diferenciar de CommonJS (require/module.exports) e compreender a resolução de módulos no Node.',
    ['03-node-ambiente-npm'],
    ['ref-03-node-esm', 'ref-03-ts-handbook'],
    ['03-ts-01', '03-ts-02'],
    [
      'Diferenciar módulos ESM ("type": "module", import/export) do sistema legado CommonJS (require/module.exports).',
      'Compreender as regras de resolução de caminhos e extensões de arquivo no Node ESM junto ao TypeScript (NodeNext / bundler).',
      'Organizar exportações nomeadas claras entre módulos de domínio, configuração e entrada da aplicação.',
    ],
    [
      'Importar e exportar módulos próprios em TypeScript/Node sem erros de resolução tanto na checagem de tipos quanto na execução.',
    ],
    'javascript'
  ),
  topic(
    '03-node-funcionamento',
    'Funcionamento do Node.js: event loop, I/O não bloqueante, process.env e sinais',
    'Compreender event loop, I/O não bloqueante, leitura de variáveis via process.env, arquivos/streams básicos e encerramento gracioso por sinais.',
    ['03-node-modulos', '03-ts-assincrono'],
    ['ref-03-node-eventloop', 'ref-03-node-learn'],
    ['03-ts-01', '03-ts-03'],
    [
      'Explicar como o event loop processa callbacks e Promises sem bloquear em operações de I/O delegadas ao sistema operacional.',
      'Ler configurações do processo via process.env com validação de valores padrão seguros e manipular arquivos com node:fs/promises.',
      'Compreender sinais de processo (SIGINT, SIGTERM) e como fechar o servidor HTTP graciosamente aguardando requisições ativas.',
    ],
    [
      'Demonstrar leitura de configuração via process.env com fallback seguro e encerramento controlado do servidor ou script CLI.',
    ],
    'javascript'
  ),
  topic(
    '03-node-http-nativo',
    'Servidor HTTP mínimo com node:http',
    'Construir um servidor HTTP mínimo com node:http inspecionando método, URL, headers, stream de corpo, códigos de status e resposta JSON.',
    ['03-node-funcionamento', '03-ciclo-requisicao'],
    ['ref-03-node-http'],
    ['03-ts-03'],
    [
      'Criar um servidor com http.createServer compreendendo que req (IncomingMessage) é uma stream de leitura e res (ServerResponse) controla a saída.',
      'Definir cabeçalhos (Content-Type: application/json), statusCode e serializar o corpo com JSON.stringify.',
      'Tratar rotas básicas (GET /health e GET /books), recurso inexistente (404) e método não suportado (405) sem depender ainda de framework.',
    ],
    [
      'Implementar e testar um servidor HTTP mínimo respondendo GET /health e GET /books com JSON e status coerentes.',
    ],
    'javascript'
  ),
  topic(
    '03-node-estrutura-testes',
    'Estrutura de projetos Node.js, debugging e testes com node:test',
    'Organizar convenções de diretórios (src/, routes/, controllers/, middlewares/, config/, tests/) e executar testes automatizados com node:test.',
    ['03-node-http-nativo', '03-organizacao-testes'],
    ['ref-03-node-test', 'ref-03-node-learn'],
    ['03-ts-02', '03-ts-03', '03-ts-06'],
    [
      'Organizar src/app.ts, src/server.ts, src/routes/, src/controllers/, src/middlewares/, src/config/ e tests/, compreendendo que são convenções de organização e não imposição do runtime Node.js.',
      'Separar a criação da aplicação HTTP (app.ts) da abertura de porta de rede (server.ts) para facilitar testes automatizados.',
      'Utilizar node:test e node:assert/strict (ou Vitest) junto a logs e inspector para depurar e verificar o comportamento das rotas.',
    ],
    [
      'Documentar a finalidade de cada diretório convencionado no projeto e executar testes automatizados com node --test.',
    ],
    'javascript'
  ),
  topic(
    '03-express-rotas-req-res',
    'Express: aplicação, Router, requisições (params, query, body) e respostas JSON',
    'Construir rotas modulares no Express manipulando req.params, req.query e req.body e respondendo com res.status(), res.json() e headers.',
    ['03-node-http-nativo', '03-node-estrutura-testes'],
    ['ref-03-express-routing'],
    ['03-ts-04'],
    [
      'Configurar uma aplicação Express com express.json() e modularizar grupos de endpoints com express.Router().',
      'Ler parâmetros de rota (req.params), filtros de consulta (req.query) e payloads JSON (req.body) nas rotas GET, POST, PATCH e DELETE.',
      'Responder com códigos de status HTTP corretos via res.status(code).json(payload) ou res.status(204).end().',
    ],
    [
      'Implementar CRUD em memória de livros com Express atendendo GET, POST, PATCH e DELETE com status HTTP e JSON consistentes.',
    ],
    'javascript'
  ),
  topic(
    '03-express-middlewares-validacao',
    'Express: middlewares, validação em runtime (Zod) e tratamento de erros',
    'Encadear middlewares com next(), validar body/query/params em runtime com Zod (ou equivalente) e centralizar erros no Express 5.',
    ['03-express-rotas-req-res', '03-validacao-erros-logs'],
    ['ref-03-express-middleware', 'ref-03-express-errors', 'ref-03-zod'],
    ['03-ts-05', '03-ex-07'],
    [
      'Compreender a ordem de execução dos middlewares no Express, o papel de next() e a diferença para o middleware de erro de quatro parâmetros (err, req, res, next).',
      'Validar req.body, req.query e req.params em runtime com Zod (ou validador equivalente), compreendendo que tipos TypeScript não existem em runtime.',
      'Verificar o comportamento da versão do Express usada (no Express 5, Promises rejeitadas em handlers async são encaminhadas automaticamente ao middleware de erro).',
    ],
    [
      'Adicionar validação de entrada e middleware centralizado de erro que retorna 400 para JSON malformado, 404 para não encontrado e 422 para dados inválidos.',
    ],
    'javascript'
  ),
  topic(
    '03-express-config-organizacao',
    'Express: configuração, segurança, logs e organização sem abstrações artificiais',
    'Configurar variáveis de ambiente, CORS, logs de requisição e organizar routes, controllers/handlers e serviços simples no Express.',
    ['03-express-middlewares-validacao', '03-seguranca-introdutoria'],
    ['ref-03-express-middleware', 'ref-03-express-errors', 'ref-03-node-learn'],
    ['03-ts-05', '03-ex-07'],
    [
      'Carregar e validar variáveis de ambiente na inicialização, aplicando configuração explícita de CORS e cabeçalhos básicos de segurança.',
      'Registrar logs de requisição/erro com método, caminho, status, duração e identificador de correlação sem expor segredos ou stack traces em produção.',
      'Organizar routes, controllers/handlers e regras de domínio com clareza, evitando camadas redundantes que apenas repassam chamadas.',
    ],
    [
      'Demonstrar aplicação Express organizada por responsabilidade com configuração via ambiente, CORS restrito, logs básicos e zero stack trace exposto ao cliente.',
    ],
    'javascript'
  ),
  topic(
    '03-express-testes',
    'Testes de endpoints e contratos HTTP no Express',
    'Escrever testes automatizados de endpoints verificando respostas JSON, status HTTP, validação de entrada e preservação de estado diante de erros.',
    ['03-express-config-organizacao'],
    ['ref-03-node-test', 'ref-03-express-routing'],
    ['03-ts-06', '03-ex-07'],
    [
      'Subir a aplicação Express em porta efêmera de teste (listen(0)) ou usar cliente de teste HTTP para exercitar cada rota.',
      'Aferir status HTTP, cabeçalho Content-Type, corpo JSON e mensagens de validação em cenários de sucesso (200/201/204) e falha (400/404/422).',
      'Confirmar com um GET subsequente que requisições POST ou PATCH inválidas não alteraram os dados existentes em memória.',
    ],
    [
      'Executar suíte automatizada de testes cobrindo todas as rotas, validações e erros da API Express com encerramento limpo do servidor.',
    ],
    'javascript'
  ),

  // 10. NestJS — Opcional (exclusivo da trilha TypeScript)
  topic(
    '03-nestjs-opcional',
    'NestJS (Opcional): módulos, controllers, providers, DTOs e pipes sobre Node.js',
    'Explorar opcionalmente a arquitetura opinativa do NestJS sobre Node.js e TypeScript, comparando seu nível de abstração com o Express.',
    ['03-express-middlewares-validacao', '03-express-testes'],
    ['ref-03-nest-first-steps', 'ref-03-nest-controllers', 'ref-03-nest-providers', 'ref-03-nest-validation'],
    ['03-ts-extra-nest'],
    [
      'Compreender que o NestJS não substitui o Node.js: é um framework estruturado em TypeScript que roda sobre Node.js usando adaptadores HTTP (como Express ou Fastify).',
      'Identificar o papel de Modules (@Module), Controllers (@Controller), Providers (@Injectable) e injeção de dependência via construtor.',
      'Utilizar DTOs baseados em classes concretas, ValidationPipe, Exceptions e compreender o papel introdutório de Guards e Interceptors.',
    ],
    [
      'Construir e testar opcionalmente um módulo de catálogo no NestJS com Controller, Service injetado, DTO validado por Pipe e teste básico.',
    ],
    'javascript',
    true
  ),
];

export const rubric03: string[] = [
  'Funcionamento (30%): os endpoints e fluxos exigidos executam conforme o contrato, mantendo estado consistente em operações de criação, leitura, atualização e remoção.',
  'Linguagem e organização (20%): uso idiomático da tipagem (PHP strict_types ou TypeScript strict), divisão clara de responsabilidades e ausência de abstrações artificiais.',
  'HTTP, validação e erros (25%): validação rigorosa no servidor, status HTTP semânticos (200, 201, 204, 400, 404, 422, 500), respostas JSON padronizadas e logs sem expor stack traces.',
  'Testes (15%): testes automatizados executáveis cobrindo fluxos de sucesso, falhas de validação e verificação de que erros não corrompem o estado.',
  'Documentação e segurança (10%): README profissional com instruções de instalação/execução, .env.example sem segredos, exemplos de requisição/resposta e ADR curta.',
  'Meta sugerida: 8/10 sem falhas bloqueantes. A plataforma não atribui nota automaticamente; registre evidências reais para cada critério.',
];

export const tasks03: Activity[] = [
  // ================= INICIANTE — PHP (3 exercícios) =================
  {
    id: '03-php-01',
    slug: 'php-classe-livro',
    title: 'Exercício PHP-01 — Classe Livro e Catálogo CLI',
    level: 'inicial',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'php',
    topicIds: ['03-php-fundamentos', '03-php-tipagem', '03-php-oo', '03-php-composer-psr', '03-php-execucao'],
    competencies: [
      'Propriedades tipadas, construtor e declare(strict_types=1)',
      'Encapsulamento, validação de invariantes e exceções em PHP',
      'Autoloading PSR-4 com Composer e execução via PHP CLI',
    ],
    objectives: [
      'Criar uma classe Livro com propriedades tipadas, construtor, métodos, validação e exceções, executada por um script CLI organizado com Composer e PSR-4.',
    ],
    prerequisites: [
      'Tópicos de fundamentos PHP, tipagem e orientação a objetos.',
      'PHP CLI e Composer instalados no ambiente local.',
    ],
    statement:
      'Construa uma biblioteca PHP orientada a objetos centrada na classe Livro e um script CLI que leia um arquivo JSON de livros, valide cada item preservando invariantes de domínio e exiba ou exporte o catálogo filtrado.',
    requirements: [
      'Ativar declare(strict_types=1) e configurar autoloading PSR-4 no composer.json mapeando o namespace do projeto para src/.',
      'Implementar a classe Livro com propriedades tipadas (id, titulo, autor, categoria, anoPublicacao opcional/nullable e disponivel), construtor e métodos de leitura/serialização.',
      'Validar invariantes no construtor (título e autor não vazios após trim, ano dentro de faixa plausível quando informado), lançando InvalidArgumentException ou DomainException em caso de violação.',
      'Criar um script CLI (ex.: bin/catalogo.php) que leia um arquivo JSON, diferencie raiz em lista de objeto inválido, trate erros com mensagem clara e código de saída diferente de zero (exit 1).',
    ],
    constraints: [
      'Não espalhar require_once manuais pelas classes; utilizar exclusivamente o vendor/autoload.php gerado pelo Composer.',
      'Não aceitar propriedades vazias ou tipos incorretos silenciosamente.',
    ],
    io: [
      'Entrada: arquivo JSON contendo uma lista de livros e argumento opcional de filtro no terminal (ex.: php bin/catalogo.php dados/livros.json --autor="Machado").',
      'Saída: resumo formatado ou JSON normalizado em stdout com exit 0 em sucesso; mensagem de erro em stderr com exit 1 quando o JSON for malformado ou violar regras da classe Livro.',
    ],
    acceptanceCriteria: [
      'O projeto possui composer.json com PSR-4 válido, declare(strict_types=1) e carrega a classe Livro via vendor/autoload.php.',
      'A classe Livro protege suas invariantes no construtor e lança exceção ao receber título vazio, autor vazio ou ano inválido.',
      'O script CLI processa uma lista JSON válida com exit 0 e falha explicitamente com exit 1 diante de JSON malformado ou objeto inválido.',
      'Há evidências de testes das fronteiras (valores válidos, strings com espaços nas bordas, campos ausentes e tipos incorretos).',
    ],
    hints: [
      'Separe a leitura/decodificação do JSON (json_decode com JSON_THROW_ON_ERROR) da instanciação da classe Livro.',
      'Lembre-se de que json_decode(..., true) converte tanto [] quanto {} em array no PHP; verifique se a raiz é uma lista e se cada item é um objeto/mapa associativo.',
      'Normalizar espaços externos com trim() antes de checar se título ou autor ficaram vazios evita cadastros compostos apenas por espaços.',
    ],
    testIdeas: [
      'Instanciar Livro com título "  Dom Casmurro  " e verificar se foi normalizado para "Dom Casmurro".',
      'Tentar criar Livro com título "" ou ano 1200 e confirmar que InvalidArgumentException é lançada.',
      'Executar o script CLI passando um arquivo JSON contendo {} na raiz ou sintaxe quebrada e conferir exit code 1.',
    ],
    refs: ['ref-03-php-manual', 'ref-03-php-types', 'ref-03-php-oop', 'ref-03-composer-doc', 'ref-03-psr4'],
    rubric: rubric03,
    deliverables: [
      'Código-fonte com composer.json, src/ e script CLI.',
      'Saída real dos testes no terminal demonstrando sucesso e rejeição de entradas inválidas.',
    ],
  },
  {
    id: '03-php-02',
    slug: 'php-estrutura-projeto',
    title: 'Exercício PHP-02 — Estrutura de Projeto PHP e Ciclo Web/CLI',
    level: 'inicial',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'php',
    topicIds: ['03-linguagem-runtime-framework', '03-configuracao-dependencias', '03-php-composer-psr', '03-php-execucao', '03-laravel-estrutura'],
    competencies: [
      'Identificação de ponto de entrada, autoload, dependências e configuração',
      'Isolamento de diretório público (public/index.php) e variáveis de ambiente',
      'Documentação arquitetural de projeto PHP/Laravel',
    ],
    objectives: [
      'Criar e documentar um pequeno projeto PHP/Laravel identificando ponto de entrada, autoload, dependências, configuração por ambiente e organização de classes.',
    ],
    prerequisites: [
      'Exercício PHP-01 ou conhecimento equivalente de Composer e PSR-4.',
    ],
    statement:
      'Estruture e documente um projeto PHP organizando o ponto de entrada web (public/index.php), o carregamento de dependências do Composer, a leitura de variáveis de ambiente (.env / .env.example) e a separação entre configuração, roteamento e classes de domínio.',
    requirements: [
      'Isolar o ponto de entrada HTTP em public/index.php de modo que composer.json, .env e código-fonte nunca fiquem expostos diretamente na raiz pública do servidor.',
      'Criar um arquivo .env.example documentando variáveis como APP_ENV, APP_DEBUG e APP_PORT, mantendo .env listado no .gitignore.',
      'Mapear e documentar no README a finalidade de cada arquivo e diretório do projeto (incluindo o paralelo com a estrutura do Laravel: app/, bootstrap/app.php, config/, public/index.php, routes/, storage/, tests/, vendor/ e artisan).',
      'Demonstrar a execução local com o servidor embutido (php -S localhost:8000 -t public) ou php artisan serve respondendo a uma rota diagnóstica.',
    ],
    constraints: [
      'Não servir a raiz do projeto diretamente no servidor web embutido; usar sempre -t public.',
      'Não versionar a pasta vendor/ nem arquivos .env com segredos.',
    ],
    io: [
      'Entrada: variáveis de ambiente definidas localmente e requisição HTTP GET para o ponto de entrada.',
      'Saída: resposta JSON informando ambiente ativo e confirmação no README do fluxo de inicialização.',
    ],
    acceptanceCriteria: [
      'O ponto de entrada web está isolado em public/index.php e carrega vendor/autoload.php corretamente.',
      'O repositório contém .env.example claro, .gitignore configurado e não expõe segredos nem a pasta vendor/.',
      'O README descreve com precisão o papel do ponto de entrada, autoload, configuração, rotas, controllers e diretórios padrão.',
      'A execução local foi testada via terminal/cURL confirmando que alterações de configuração no ambiente refletem no comportamento.',
    ],
    hints: [
      'Observe na documentação de estrutura do Laravel por que public/ é o único diretório que o servidor web deve enxergar.',
      'Trace passo a passo o que acontece desde o momento em que o PHP recebe a requisição em public/index.php até o retorno da resposta.',
      'Compare composer.json (intenção e faixas de versão) com composer.lock (versões exatas instaladas) na sua documentação.',
    ],
    testIdeas: [
      'Iniciar o servidor com php -S 127.0.0.1:8000 -t public e testar requisição GET via cURL.',
      'Alterar o valor de APP_ENV no ambiente e verificar a mudança controlada na resposta diagnóstica.',
      'Verificar com git status que vendor/ e .env estão ignorados.',
    ],
    refs: ['ref-03-php-webserver', 'ref-03-composer-doc', 'ref-03-psr', 'ref-03-laravel-structure'],
    rubric: rubric03,
    deliverables: [
      'Projeto PHP/Laravel estruturado com public/index.php, composer.json e .env.example.',
      'README documentando a arquitetura de diretórios e o fluxo de inicialização.',
    ],
  },
  {
    id: '03-php-03',
    slug: 'php-rotas-laravel',
    title: 'Exercício PHP-03 — Primeiras Rotas Laravel (GET /health e GET /books)',
    level: 'inicial',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'php',
    topicIds: ['03-ciclo-requisicao', '03-laravel-introducao', '03-laravel-estrutura', '03-laravel-http'],
    competencies: [
      'Criação de rotas HTTP e Controllers no Laravel',
      'Leitura de query parameters e retorno de Response JSON',
      'Uso de códigos de status HTTP coerentes e inspeção com Artisan',
    ],
    objectives: [
      'Implementar os endpoints GET /health e GET /books em uma aplicação Laravel, retornando JSON estruturado, filtro por query string e status HTTP coerentes.',
    ],
    prerequisites: [
      'Exercício PHP-02 e leitura dos tópicos de introdução, estrutura e HTTP no Laravel.',
    ],
    statement:
      'Crie suas primeiras rotas de API no Laravel implementando um endpoint de verificação de saúde (GET /health) e um endpoint de listagem de livros (GET /books) com suporte a filtro opcional por query parameter (ex.: ?q= ou ?author=), retornando JSON e status HTTP semânticos.',
    requirements: [
      'Registrar GET /health retornando status 200 OK e um objeto JSON com status da aplicação (ex.: {"status": "ok"}).',
      'Registrar GET /books encaminhando para um Controller (ex.: BookController@index) que retorne uma coleção de livros em formato JSON com status 200 OK.',
      'Suportar filtro opcional via query string (ex.: GET /books?q=termo) retornando 200 OK com lista vazia [] quando nenhum livro corresponder ao filtro.',
      'Listar as rotas criadas com php artisan route:list e testar as respostas com cURL ou Bruno/Postman.',
    ],
    constraints: [
      'Não retornar HTML nessas rotas; garantir cabeçalho Content-Type: application/json.',
      'Não exigir banco de dados relacional; os livros podem vir de uma coleção em memória ou arquivo JSON de estudo.',
    ],
    io: [
      'Entrada: requisições GET /health, GET /books e GET /books?q=algoritmo.',
      'Saída: respostas HTTP 200 OK com Content-Type: application/json e corpo JSON correspondente.',
    ],
    acceptanceCriteria: [
      'GET /health responde 200 OK com JSON válido indicando saúde do serviço.',
      'GET /books responde 200 OK com a lista de livros serializada em JSON através de um Controller.',
      'GET /books?q=... filtra os itens de forma case-insensitive e retorna 200 OK com [] quando não há correspondência.',
      'Os testes manuais via cURL/Bruno e a saída de php artisan route:list foram registrados como evidência.',
    ],
    hints: [
      'Use response()->json($dados, 200) no Controller para garantir serialização JSON e cabeçalhos corretos.',
      'Extraia o parâmetro de busca com $request->query("q") e normalize espaços antes de filtrar.',
      'Lembre-se de que uma busca válida sem resultados deve responder 200 OK com array vazio, e não 404 Not Found.',
    ],
    testIdeas: [
      'Executar curl -i http://127.0.0.1:8000/api/health (ou /health) e conferir HTTP/1.1 200 OK e Content-Type.',
      'Consultar GET /books sem filtro e depois com ?q=termoInexistente conferindo retorno [].',
      'Inspecionar php artisan route:list confirmando o vínculo entre rota e BookController.',
    ],
    refs: ['ref-03-laravel-structure', 'ref-03-laravel-routing'],
    rubric: rubric03,
    deliverables: [
      'Rotas e BookController implementados no projeto Laravel.',
      'Registro das requisições e respostas observadas via cURL ou Bruno/Postman.',
    ],
  },

  // ================= INICIANTE — TYPESCRIPT (3 exercícios equivalentes) =================
  {
    id: '03-ts-01',
    slug: 'ts-catalogo-cli',
    title: 'Exercício TS-01 — Catálogo CLI em TypeScript Strict',
    level: 'inicial',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'javascript',
    topicIds: ['03-ts-fundamentos-backend', '03-ts-assincrono', '03-ts-configuracao', '03-node-ambiente-npm', '03-node-modulos'],
    competencies: [
      'TypeScript strict, interfaces, union types e narrowing de unknown',
      'Leitura assíncrona de arquivos JSON e validação em runtime',
      'Execução de script CLI no Node.js com códigos de saída adequados',
    ],
    objectives: [
      'Criar um programa CLI em Node.js e TypeScript strict que leia dados JSON, valide a estrutura em runtime, filtre livros e trate erros sem usar any.',
    ],
    prerequisites: [
      'Tópicos de fundamentos TypeScript, programação assíncrona e configuração tsconfig strict.',
      'Node.js e npm instalados no ambiente local.',
    ],
    statement:
      'Desenvolva uma aplicação CLI em TypeScript strict que leia um arquivo JSON de livros do disco, valide em tempo de execução se os dados respeitam o contrato esperado, permita filtrar o acervo por termo ou categoria e trate falhas de leitura ou validação com mensagens claras.',
    requirements: [
      'Configurar tsconfig.json com "strict": true e proibir o uso de any implícito ou explícito.',
      'Definir o tipo/interface Book (id, title, author, category, publishedYear opcional e available) e implementar uma função de validação (type guard ou parser) que receba unknown.',
      'Ler o arquivo JSON de forma assíncrona (node:fs/promises), diferenciando erro de arquivo inexistente, erro de sintaxe JSON e erro de contrato (ex.: raiz que é objeto {} em vez de array, ou livro com título vazio).',
      'Filtrar os livros válidos conforme argumento de linha de comando e encerrar com process.exitCode = 1 quando a entrada for inválida.',
    ],
    constraints: [
      'Não usar JSON.parse(raw) as Book[] sem validar cada item em runtime.',
      'Não sobrescrever o arquivo de entrada durante a execução ou nos testes.',
    ],
    io: [
      'Entrada: caminho do arquivo JSON e filtro opcional no terminal (ex.: npm run cli -- dados/livros.json --query="Redes").',
      'Saída: lista filtrada e contagem total em stdout com exit 0; mensagem diagnóstica em stderr com exit 1 em caso de falha.',
    ],
    acceptanceCriteria: [
      'O código compila com tsc --noEmit em modo strict sem erros e sem usar any.',
      'A validação em runtime rejeita JSON cuja raiz seja {} ou cujos itens tenham título/autor vazios ou tipos trocados.',
      'O filtro retorna os livros correspondentes (ou lista vazia quando não há match) preservando os objetos originais.',
      'Erros de arquivo inexistente ou JSON malformado são tratados sem stack trace bruto descontrolado e definem exit code 1.',
    ],
    hints: [
      'Trate o retorno de JSON.parse como unknown; verifique Array.isArray(data) antes de percorrer os itens.',
      'Crie uma função que valide um único livro (verificando typeof item.title === "string" && item.title.trim().length > 0) antes de adicioná-lo à lista tipada.',
      'Separe o módulo puro de validação/filtragem (src/catalog.ts) do módulo de I/O e CLI (src/cli.ts) para facilitar os testes.',
    ],
    testIdeas: [
      'Passar um arquivo contendo [{"id": 1, "title": "  Clean Code  ", "author": "Martin"}] e verificar normalização e saída.',
      'Passar um arquivo contendo {} ou [{"title": ""}] e confirmar que o programa acusa erro de contrato com exit 1.',
      'Executar o filtro com um termo inexistente e verificar retorno de 0 itens com exit 0.',
    ],
    refs: ['ref-03-ts-handbook', 'ref-03-node-learn', 'ref-03-node-esm'],
    rubric: rubric03,
    deliverables: [
      'Código-fonte TypeScript com package.json, tsconfig.json, módulo de validação e script CLI.',
      'Registro das execuções no terminal demonstrando compilação strict, casos válidos e rejeição de entradas inválidas.',
    ],
  },
  {
    id: '03-ts-02',
    slug: 'ts-estrutura-node',
    title: 'Exercício TS-02 — Estrutura de Projeto Node.js e TypeScript',
    level: 'inicial',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'javascript',
    topicIds: ['03-linguagem-runtime-framework', '03-configuracao-dependencias', '03-ts-configuracao', '03-node-ambiente-npm', '03-node-modulos', '03-node-estrutura-testes'],
    competencies: [
      'Configuração integrada de package.json, lockfile, tsconfig.json e scripts',
      'Organização de módulos ESM e variáveis de ambiente (.env.example)',
      'Separação entre convenções de arquitetura e requisitos do runtime Node.js',
    ],
    objectives: [
      'Criar e documentar um projeto Node.js com npm, package.json, tsconfig.json, scripts, módulos e configuração por ambiente, explicando a finalidade de cada arquivo e pasta.',
    ],
    prerequisites: [
      'Exercício TS-01 e leitura dos tópicos de ambiente Node.js, módulos e estrutura de projeto.',
    ],
    statement:
      'Monte a estrutura base de um projeto backend em Node.js e TypeScript strict com scripts reproduzíveis de compilação, checagem de tipos, execução e testes, carregamento seguro de configuração por variáveis de ambiente e documentação clara da arquitetura de diretórios.',
    requirements: [
      'Configurar package.json (com scripts build, start, typecheck e test), package-lock.json, tsconfig.json (modo strict) e .env.example (ex.: PORT, NODE_ENV, CORS_ORIGIN).',
      'Organizar a estrutura em src/ (src/app.ts, src/server.ts, src/routes/, src/controllers/, src/middlewares/, src/config/) e tests/.',
      'Implementar um módulo src/config/env.ts que leia process.env, aplique valores padrão seguros para desenvolvimento e valide se a porta configurada é um inteiro válido.',
      'Documentar no README a finalidade de cada arquivo e explicar explicitamente que essa divisão de pastas é uma convenção de engenharia para manter responsabilidades claras, e não uma imposição obrigatória do Node.js.',
    ],
    constraints: [
      'Não versionar node_modules/, dist/ ou arquivo .env real no Git.',
      'Garantir que imports entre módulos TypeScript/ESM funcionem tanto no typecheck quanto no código compilado.',
    ],
    io: [
      'Entrada: variáveis de ambiente (ou defaults locais) e execução dos scripts npm run typecheck, npm run build e npm test.',
      'Saída: compilação limpa em dist/, configuração validada e documentação arquitetural completa no README.',
    ],
    acceptanceCriteria: [
      'npm run typecheck e npm run build executam sem erros com strict ativado no tsconfig.json.',
      'O módulo de configuração valida PORT e NODE_ENV, falhando de forma explicativa quando recebe uma porta inválida (ex.: PORT=abc).',
      'A separação entre src/app.ts (configuração da aplicação) e src/server.ts (abertura da porta HTTP) está implementada e explicada.',
      'O README descreve o papel de cada diretório e esclarece a diferença entre convenção de organização e regra do runtime.',
    ],
    hints: [
      'Separar app.ts de server.ts permite que seus testes importem a aplicação sem abrir uma porta fixa na máquina.',
      'Em process.env, todos os valores chegam como string | undefined; converta e valide números explicitamente com Number.isInteger.',
      'Confira se o .gitignore inclui node_modules/, dist/ e .env antes de registrar seus commits.',
    ],
    testIdeas: [
      'Executar npm run build em diretório limpo e verificar os arquivos emitidos em dist/.',
      'Testar o módulo de configuração passando PORT="3000" (válido) e PORT="invalido" ou PORT="99999" (deve rejeitar).',
      'Confirmar que git status não lista node_modules nem .env.',
    ],
    refs: ['ref-03-ts-handbook', 'ref-03-node-learn', 'ref-03-node-esm', 'ref-03-node-test'],
    rubric: rubric03,
    deliverables: [
      'Repositório/projeto Node.js + TypeScript estruturado com package.json, tsconfig.json e .env.example.',
      'README documentando a finalidade dos arquivos e a execução dos scripts.',
    ],
  },
  {
    id: '03-ts-03',
    slug: 'ts-primeiro-servidor-http',
    title: 'Exercício TS-03 — Primeiro Servidor HTTP (GET /health e GET /books)',
    level: 'inicial',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'javascript',
    topicIds: ['03-ciclo-requisicao', '03-node-funcionamento', '03-node-http-nativo', '03-node-estrutura-testes'],
    competencies: [
      'Criação de servidor HTTP em Node.js / TypeScript',
      'Roteamento básico, leitura de query parameters, headers e serialização JSON',
      'Retorno de status HTTP semânticos (200, 404, 405) e encerramento gracioso',
    ],
    objectives: [
      'Implementar um servidor HTTP em TypeScript/Node.js que atenda GET /health e GET /books, retornando JSON estruturado e códigos de status HTTP coerentes.',
    ],
    prerequisites: [
      'Exercício TS-02 e leitura do tópico de servidor HTTP nativo (node:http).',
    ],
    statement:
      'Construa seu primeiro servidor HTTP em Node.js e TypeScript implementando os endpoints GET /health e GET /books (com filtro opcional por query string), definindo cabeçalhos Content-Type: application/json e tratando rotas inexistentes (404) e métodos não permitidos (405).',
    requirements: [
      'Implementar GET /health retornando status 200 OK e payload JSON {"status": "ok"}.',
      'Implementar GET /books retornando status 200 OK com a lista de livros em JSON e suportando filtro opcional por query string (ex.: GET /books?q=termo usando a classe URL).',
      'Retornar 404 Not Found em JSON para caminhos desconhecidos e 405 Method Not Allowed quando o cliente enviar método não suportado nas rotas existentes.',
      'Garantir cabeçalho Content-Type: application/json; charset=utf-8 em todas as respostas e permitir fechar o servidor de forma limpa nos testes.',
    ],
    constraints: [
      'Manter os dados em memória ou arquivo JSON local; não utilizar banco de dados nesta etapa.',
      'Não deixar o servidor pendurado após os testes automatizados.',
    ],
    io: [
      'Entrada: requisições HTTP GET /health, GET /books, GET /books?q=node e GET /rota-inexistente.',
      'Saída: respostas HTTP 200, 404 ou 405 com corpo JSON padronizado.',
    ],
    acceptanceCriteria: [
      'GET /health e GET /books respondem 200 OK com JSON válido e Content-Type adequado.',
      'O filtro por query string (GET /books?q=...) funciona corretamente e devolve [] com status 200 quando não há correspondência.',
      'Caminhos não mapeados respondem 404 em JSON (e não HTML ou conexão abortada).',
      'Há evidências de testes via cURL/Bruno ou node:test comprovando os códigos de status e payloads.',
    ],
    hints: [
      'Use new URL(req.url ?? "/", "http://localhost") para separar pathname de searchParams com segurança.',
      'Centralize uma pequena função auxiliar sendJson(res, status, data) para evitar esquecer o cabeçalho Content-Type.',
      'Para testar com node:test, inicie o servidor em server.listen(0) para usar uma porta efêmera livre e feche-o no bloco after/finally.',
    ],
    testIdeas: [
      'Fazer GET /health e verificar status 200 e {"status": "ok"}.',
      'Fazer GET /books?q=ts e verificar que apenas os livros compatíveis são retornados.',
      'Fazer GET /inexistente e POST /health conferindo respostas JSON 404 e 405.',
    ],
    refs: ['ref-03-node-http', 'ref-03-node-test', 'ref-03-node-eventloop'],
    rubric: rubric03,
    deliverables: [
      'Código do servidor HTTP em TypeScript/Node.js.',
      'Evidências de execução via cURL/Bruno e teste automatizado local.',
    ],
  },

  // ================= INTERMEDIÁRIO — PHP (3 exercícios) =================
  {
    id: '03-php-04',
    slug: 'php-validacao-erros',
    title: 'Exercício PHP-04 — Validação de Entrada, Erros Consistentes e Logs',
    level: 'intermediario',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'php',
    topicIds: ['03-validacao-erros-logs', '03-seguranca-introdutoria', '03-laravel-http', '03-laravel-validacao-erros'],
    competencies: [
      'Validação de payloads JSON no servidor (Laravel Validation / Form Request)',
      'Padronização de erros HTTP 400, 404, 422 e 500 sem expor stack trace',
      'Registro de logs básicos contextualizados',
    ],
    objectives: [
      'Criar endpoints no Laravel que recebam JSON, validem entradas rigorosamente, retornem erros HTTP coerentes e registrem logs básicos sem expor detalhes internos.',
    ],
    prerequisites: [
      'Exercício PHP-03 concluído e leitura do tópico de validação e erros no Laravel.',
    ],
    statement:
      'Adicione recepção de dados JSON à sua API Laravel com validação rigorosa de campos, diferenciando payloads malformados (400), falhas de validação de domínio (422) e recursos ausentes (404), registrando logs de diagnóstico no servidor.',
    requirements: [
      'Validar os campos de criação/atualização de livro (title e author obrigatórios com tamanho entre 2 e 200 caracteres, category permitida, publishedYear inteiro opcional entre 1450 e o ano atual).',
      'Utilizar Form Request ou validador explícito retornando 422 Unprocessable Content em JSON com detalhes dos campos inválidos.',
      'Ignorar ou rejeitar propriedades extras não autorizadas enviadas no corpo JSON (proteção contra mass assignment).',
      'Registrar logs básicos (Log::info ao criar item válido e Log::warning/error em falhas relevantes) sem incluir dados sensíveis e sem exibir stack trace na resposta HTTP quando APP_DEBUG=false.',
    ],
    constraints: [
      'Nunca confiar que o cliente enviou tipos corretos; validar números, strings e limites no servidor.',
      'Não retornar páginas HTML de erro para chamadas da API.',
    ],
    io: [
      'Entrada: requisições POST/PATCH com JSON válido, JSON com campos faltantes/inválidos e JSON sintaticamente quebrado.',
      'Saída: 201/200 com o recurso validado em sucesso; 400 ou 422 em JSON com mensagens de erro claras sem mutar o estado.',
    ],
    acceptanceCriteria: [
      'Payloads com título vazio, tipos trocados ou ano fora da faixa recebem 422 JSON listando os campos inválidos.',
      'Propriedades extras maliciosas (ex.: "isAdmin": true) não são incorporadas ao registro salvo.',
      'Erros inesperados em modo de produção (APP_DEBUG=false) retornam JSON 500 genérico sem vazar stack trace ou caminhos internos.',
      'Os logs registram o evento no servidor com contexto útil (método, rota e motivo).',
    ],
    hints: [
      'Use $request->validated() no Controller para acessar apenas os campos que passaram pelas regras de validação.',
      'Teste enviar llamadas com o cabeçalho Accept: application/json para confirmar que o Laravel responde 422 em JSON.',
      'Configure o tratamento de exceções em bootstrap/app.php para garantir respostas JSON consistentes nas rotas da API.',
    ],
    testIdeas: [
      'Enviar POST /books com {"title": "", "author": "A"} e verificar status 422 e mensagem do campo title.',
      'Enviar POST /books com {"title": "Livro", "author": "Autora", "admin": true} e confirmar que "admin" foi descartado.',
      'Enviar corpo com JSON truncado "{title:" e verificar resposta 400 Bad Request.',
    ],
    refs: ['ref-03-laravel-validation', 'ref-03-laravel-errors', 'ref-03-psr'],
    rubric: rubric03,
    deliverables: [
      'Regras de validação / Form Request, handler de erros e configuração de logs.',
      'Evidências das respostas 400, 422 e 500 seguras e trecho do log gerado.',
    ],
  },
  {
    id: '03-php-05',
    slug: 'php-catalogo-laravel',
    title: 'Exercício PHP-05 — Catálogo Laravel (GET, POST, PATCH, DELETE, Middleware e Testes)',
    level: 'intermediario',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'php',
    topicIds: ['03-ciclo-requisicao', '03-laravel-http', '03-laravel-middleware', '03-laravel-validacao-erros', '03-laravel-testes'],
    competencies: [
      'Implementação completa de endpoints GET, POST, PATCH e DELETE no Laravel',
      'Aplicação de middleware HTTP e preservação de estado em memória/JSON',
      'Testes básicos de rotas confirmando sucesso e ausência de mutação após erro',
    ],
    objectives: [
      'Implementar os endpoints completos de livros (GET, POST, PATCH e DELETE) no Laravel com dados em memória ou arquivo JSON temporário, aplicando validação, middleware e testes básicos.',
    ],
    prerequisites: [
      'Exercício PHP-04 e leitura do tópico de middlewares e testes no Laravel.',
    ],
    statement:
      'Construa uma API completa de catálogo de livros no Laravel suportando listagem, busca por ID, cadastro (POST), atualização parcial (PATCH) e remoção (DELETE), protegida por validação, enriquecida por um middleware HTTP e verificada por testes automatizados.',
    requirements: [
      'Implementar GET /books, GET /books/{id}, POST /books (201 Created), PATCH /books/{id} (200 OK) e DELETE /books/{id} (204 No Content).',
      'Garantir que PATCH /books/{id} atualize apenas os campos enviados e validados, preservando os demais campos existentes do livro, e que um PATCH vazio ou inválido retorne 422 sem alterar o registro.',
      'Adicionar um middleware às rotas da API (por exemplo, gerando/repassando um cabeçalho X-Request-Id e registrando método/status no log).',
      'Escrever testes básicos de feature (PHPUnit/Pest) verificando o ciclo de criação, leitura, atualização parcial, exclusão e erros 404/422.',
    ],
    constraints: [
      'Utilizar armazenamento em memória ou arquivo JSON configurável por ambiente (ex.: config("catalog.path")) para que os testes rodem isolados sem exigir banco SQL.',
      'Não permitir que uma requisição inválida altere parcialmente o livro.',
    ],
    io: [
      'Entrada: sequência de requisições GET, POST, PATCH e DELETE nos endpoints /books e /books/{id}.',
      'Saída: respostas HTTP 200, 201, 204, 404 e 422 com cabeçalho do middleware presente e estado consistente.',
    ],
    acceptanceCriteria: [
      'POST /books cria livro com ID único e retorna 201; GET /books/{id} retorna 200 para existente e 404 para inexistente.',
      'PATCH /books/{id} preserva campos não enviados e, quando recebe dados inválidos (422), um GET posterior confirma que o livro original não foi alterado.',
      'DELETE /books/{id} retorna 204 (ou 200 documentado) e uma segunda tentativa no mesmo ID retorna 404.',
      'O middleware aplica o cabeçalho/log esperado e a suíte php artisan test passa integralmente.',
    ],
    hints: [
      'No PATCH, valide apenas os campos presentes (usando sometimes/filled no Laravel), mas proíba enviar null ou string vazia para campos obrigatórios.',
      'Para isolar testes sem SQL, injete um repositório/serviço em memória ou aponte o caminho do arquivo JSON para um arquivo temporário no setUp() do teste.',
      'Sempre faça um GET /books/{id} logo após um PATCH inválido (422) no seu teste para provar que não houve mutação acidental.',
    ],
    testIdeas: [
      'Criar um livro via POST, atualizar apenas o título via PATCH e verificar que o autor permaneceu intacto.',
      'Enviar PATCH com {"title": ""} (422) e confirmar via GET que o título anterior continua salvo.',
      'Deletar o livro (204) e confirmar que GET /books/{id} passa a responder 404.',
    ],
    refs: ['ref-03-laravel-routing', 'ref-03-laravel-middleware', 'ref-03-laravel-validation', 'ref-03-laravel-testing'],
    rubric: rubric03,
    deliverables: [
      'Controller, validação, middleware e armazenamento em memória/JSON implementados no Laravel.',
      'Testes automatizados executados com php artisan test.',
    ],
  },
  {
    id: '03-php-06',
    slug: 'php-organizacao-testes',
    title: 'Exercício PHP-06 — Organização de Responsabilidades e Testes no Laravel',
    level: 'intermediario',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'php',
    topicIds: ['03-organizacao-testes', '03-php-oo', '03-laravel-organizacao', '03-laravel-testes'],
    competencies: [
      'Refatoração pragmática e uso do Service Container do Laravel',
      'Separação entre transporte HTTP (Controller/FormRequest) e regras de domínio',
      'Testes unitários e de integração cobrindo casos de sucesso e erro',
    ],
    objectives: [
      'Refatorar a aplicação PHP/Laravel para separar responsabilidades usando injeção de dependências sem overengineering, ampliando a suíte de testes de sucesso e erro.',
    ],
    prerequisites: [
      'Exercício PHP-05 concluído e leitura do tópico de organização e Service Container no Laravel.',
    ],
    statement:
      'Refatore sua API Laravel para que o Controller cuide apenas do transporte HTTP, delegando regras de negócio e invariantes do catálogo para classes coesas injetadas pelo Service Container, acompanhadas de testes unitários e de rotas.',
    requirements: [
      'Extrair a lógica de manipulação e regras do catálogo (como normalização, verificação de duplicidade ou disponibilidade de empréstimo) do Controller para um Serviço de domínio ou Action coesa.',
      'Utilizar injeção de dependências pelo construtor no Controller, mantendo a arquitetura simples e sem criar camadas meramente burocráticas.',
      'Escrever testes unitários diretos para a regra de negócio extraída e testes HTTP para as rotas que a consomem.',
      'Documentar brevemente no README por que a separação escolhida melhora a testabilidade sem introduzir complexidade desnecessária.',
    ],
    constraints: [
      'Não criar interfaces vazias ou " Services/Repositories" que apenas repassam chamadas sem nenhuma regra ou contrato útil.',
      'Manter todos os testes anteriores passando após a refatoração.',
    ],
    io: [
      'Entrada: código da API antes da refatoração e casos de teste de regra de negócio (ex.: impedir título duplicado do mesmo autor ou empréstimo de livro indisponível).',
      'Saída: arquitetura refatorada com Controller enxuto, classe de domínio testada isoladamente e suíte HTTP verde.',
    ],
    acceptanceCriteria: [
      'Os Controllers não contêm manipulação manual de estado ou regras extensas, delegando para classes coesas injetadas via construtor.',
      'Não existem classes pass-through inúteis; cada classe criada tem responsabilidade justificável.',
      'Existem testes unitários para a classe de domínio e testes HTTP para os endpoints cobrindo sucesso e erro.',
      'A execução completa da suíte de testes passa sem falhas após a refatoração.',
    ],
    hints: [
      'Pergunte-se: "Eu consigo testar essa regra de negócio instanciando a classe em um teste unitário rápido sem precisar subir uma requisição HTTP?" Se sim, a fronteira ficou boa.',
      'No Laravel, o Service Container resolve automaticamente classes concretas tipadas no construtor do Controller.',
      'Consulte os princípios de refatoração incremental: altere a estrutura mantendo a suíte de testes sempre verde.',
    ],
    testIdeas: [
      'Testar isoladamente a classe de catálogo/domínio tentando cadastrar dois livros idênticos do mesmo autor.',
      'Executar os testes HTTP de ponta a ponta confirmando que a regra retorna o código HTTP adequado (ex.: 409 ou 422).',
      'Verificar se algum erro de validação deixa estado parcial.',
    ],
    refs: ['ref-03-laravel-container', 'ref-03-laravel-testing', 'ref-03-php-oop'],
    rubric: rubric03,
    deliverables: [
      'Código refatorado com injeção de dependências e responsabilidades separadas.',
      'Suíte de testes unitários e de rotas executada com sucesso.',
    ],
  },

  // ================= INTERMEDIÁRIO — TYPESCRIPT (3 exercícios equivalentes) =================
  {
    id: '03-ts-04',
    slug: 'ts-api-express',
    title: 'Exercício TS-04 — API Express em Memória (GET, POST, PATCH, DELETE)',
    level: 'intermediario',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'javascript',
    topicIds: ['03-ciclo-requisicao', '03-express-rotas-req-res'],
    competencies: [
      'Construção de API com Express e express.Router em TypeScript',
      'Manipulação de req.params, req.query e req.body em rotas GET, POST, PATCH e DELETE',
      'Uso correto de res.status(), res.json() e armazenamento em memória',
    ],
    objectives: [
      'Implementar uma API Express em TypeScript com endpoints GET, POST, PATCH e DELETE operando sobre um catálogo de livros em memória.',
    ],
    prerequisites: [
      'Exercício TS-03 e leitura do tópico de rotas, requisições e respostas no Express.',
    ],
    statement:
      'Construa uma API de catálogo de livros utilizando Express e TypeScript em memória, implementando listagem com filtro, busca por ID, criação (POST), atualização parcial (PATCH) e remoção (DELETE) com respostas JSON e códigos HTTP consistentes.',
    requirements: [
      'Configurar a aplicação Express com express.json() e agrupar as rotas de livros em um Router dedicado (/books).',
      'Implementar GET /health (200), GET /books (200, com filtro opcional via req.query.q), GET /books/:id (200 ou 404) e POST /books (201 Created).',
      'Implementar PATCH /books/:id (200 OK atualizando apenas os campos informados ou 404 se não existir) e DELETE /books/:id (204 No Content ou 404).',
      'Validar o parâmetro :id como inteiro positivo válido antes de buscar no array/Map em memória.',
    ],
    constraints: [
      'Utilizar dados em memória (Array ou Map encapsulado); não exigir banco de dados.',
      'Separar src/app.ts (instância do Express) de src/server.ts (app.listen).',
    ],
    io: [
      'Entrada: requisições HTTP GET, POST, PATCH e DELETE com parâmetros de rota, query string e corpo JSON.',
      'Saída: respostas JSON com status 200, 201, 204 e 404 mantendo o acervo em memória consistente.',
    ],
    acceptanceCriteria: [
      'Todas as rotas (GET /health, GET /books, GET /books/:id, POST /books, PATCH /books/:id, DELETE /books/:id) funcionam conforme o contrato.',
      'POST /books atribui um identificador único e retorna 201 Created com o livro criado.',
      'PATCH /books/:id altera apenas os campos enviados sem apagar as demais propriedades do livro.',
      'DELETE /books/:id remove o item e chamadas subsequentes para o mesmo ID retornam 404 Not Found.',
    ],
    hints: [
      'Cuidado com Number(req.params.id): strings como "1e2" ou "abc" exigem checagem explícita (ex.: /^[1-9]\\d*$/.test(rawId)) para garantir um ID inteiro positivo limpo.',
      'Ao usar res.status(204).end() no DELETE, não envie corpo JSON, pois o código 204 indica ausência de conteúdo.',
      'Encapsule o Map ou Array de livros em um módulo de repositório/serviço com método reset/seed para facilitar os testes.',
    ],
    testIdeas: [
      'Cadastrar dois livros via POST, listar com GET /books e filtrar com GET /books?q=termo.',
      'Atualizar apenas o título de um livro via PATCH /books/1 e verificar com GET /books/1 que o autor foi mantido.',
      'Remover o livro com DELETE /books/1 (204) e verificar que GET /books/1 retorna 404.',
    ],
    refs: ['ref-03-express-routing', 'ref-03-ts-handbook'],
    rubric: rubric03,
    deliverables: [
      'Aplicação Express em TypeScript com Router, Controller/Handlers e armazenamento em memória.',
      'Registro de testes das rotas GET, POST, PATCH e DELETE.',
    ],
  },
  {
    id: '03-ts-05',
    slug: 'ts-validacao-middleware',
    title: 'Exercício TS-05 — Validação em Runtime, Middlewares, Erros e Logs no Express',
    level: 'intermediario',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'javascript',
    topicIds: ['03-validacao-erros-logs', '03-seguranca-introdutoria', '03-express-middlewares-validacao', '03-express-config-organizacao'],
    competencies: [
      'Validação de body, query e params em runtime com Zod (ou equivalente)',
      'Middlewares de log/correlação, CORS e tratamento centralizado de erros no Express',
      'Proteção contra exposição de segredos e stack traces',
    ],
    objectives: [
      'Adicionar validação de entradas em runtime, middlewares, tratamento centralizado de erros, logs e configuração por ambiente à API Express.',
    ],
    prerequisites: [
      'Exercício TS-04 concluído e leitura dos tópicos de middlewares, validação e segurança no Express.',
    ],
    statement:
      'Evolua sua API Express adicionando validação real em tempo de execução para body, query e params (usando Zod ou biblioteca equivalente), pipeline de middlewares (logs, ID de requisição e CORS configurável) e um middleware centralizado de tratamento de erros.',
    requirements: [
      'Definir esquemas de validação em runtime para criação de livro (POST), atualização parcial (PATCH, rejeitando objeto vazio {} ou campos nulos inválidos), query string e parâmetros de rota.',
      'Descartar ou rejeitar propriedades extras não previstas no contrato (strip ou strictObject).',
      'Implementar middleware de log/correlação (adicionando cabeçalho X-Request-Id e registrando método, rota, status e duração) e configurar CORS lendo a origem permitida das variáveis de ambiente.',
      'Implementar middleware centralizado de erro (err, req, res, next) distinguindo SyntaxError do parser JSON (400), erro de validação (422), erro de recurso não encontrado (404) e erro interno (500, sem expor stack trace quando NODE_ENV=production).',
    ],
    constraints: [
      'Não confiar apenas em interfaces TypeScript para validar req.body, req.query ou req.params.',
      'Verificar a versão do Express instalada (no Express 5, rejeições async vão direto ao error handler; no Express 4, requer wrapper ou next(err)).',
    ],
    io: [
      'Entrada: requisições com payloads válidos, payloads violando regras (título vazio, PATCH vazio, tipo errado) e JSON malformado.',
      'Saída: respostas padronizadas 400/404/422/500 em JSON com cabeçalho X-Request-Id e logs registrados no servidor.',
    ],
    acceptanceCriteria: [
      'Payloads inválidos em POST e PATCH são barrados pela validação em runtime retornando 422 JSON sem alterar os dados em memória.',
      'JSON sintaticamente inválido retorna 400 Bad Request em JSON, sem derrubar o processo nem expor stack trace.',
      'O middleware adiciona X-Request-Id e registra logs sem vazar dados sensíveis.',
      'A configuração de porta, ambiente e CORS vem de variáveis de ambiente documentadas no .env.example.',
    ],
    hints: [
      'No Express, o middleware de erro precisa declarar exatamente quatro parâmetros: (err: unknown, req: Request, res: Response, next: NextFunction).',
      'Ao validar PATCH com Zod, use .partial() combinado com .refine(obj => Object.keys(obj).length > 0) para impedir que um PATCH {} vazio seja aceito como atualização.',
      'Teste enviar um JSON quebrado (ex.: curl -X POST -H "Content-Type: application/json" -d "{titulo" ...) para capturar o erro do express.json().',
    ],
    testIdeas: [
      'Enviar POST /books com {"title": "   ", "author": "Ana"} e confirmar retorno 422.',
      'Enviar PATCH /books/1 com {} ou {"title": null} e confirmar retorno 422 e preservação do livro 1.',
      'Verificar presença do cabeçalho X-Request-Id na resposta e simular erro 500 com NODE_ENV=production confirmando ausência de stack trace.',
    ],
    refs: ['ref-03-express-middleware', 'ref-03-express-errors', 'ref-03-zod', 'ref-03-ts-handbook'],
    rubric: rubric03,
    deliverables: [
      'Esquemas de validação, middlewares e error handler centralizado implementados na API Express.',
      'Evidências das respostas 400, 404, 422 e 500 seguras e logs gerados.',
    ],
  },
  {
    id: '03-ts-06',
    slug: 'ts-testes-endpoints',
    title: 'Exercício TS-06 — Testes Automatizados de Endpoints e Validação',
    level: 'intermediario',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'javascript',
    topicIds: ['03-organizacao-testes', '03-node-estrutura-testes', '03-express-testes'],
    competencies: [
      'Testes automatizados de endpoints HTTP com node:test (ou Vitest/Supertest)',
      'Verificação de status HTTP, cabeçalhos, payloads JSON e regras de validação',
      'Comprovação de imutabilidade do estado após requisições inválidas',
    ],
    objectives: [
      'Criar uma suíte de testes automatizados para a API Express cobrindo rotas, status HTTP, respostas JSON, validação e cenários de erro.',
    ],
    prerequisites: [
      'Exercício TS-05 concluído e leitura do tópico de testes de endpoints no Express.',
    ],
    statement:
      'Construa uma suíte de testes automatizados reproduzível (usando node:test ou ferramenta equivalente) que exercite todos os endpoints da sua API Express, validando contratos JSON, códigos de status HTTP e garantindo que falhas de validação não corrompam o estado em memória.',
    requirements: [
      'Escrever testes automatizados para GET /health, GET /books (incluindo filtro por query), GET /books/:id, POST /books, PATCH /books/:id e DELETE /books/:id.',
      'Testar explicitamente cenários de erro: JSON malformado (400), ID inexistente ou formato inválido (404/422), POST com campos inválidos (422) e PATCH inválido (422).',
      'Após um teste de PATCH inválido (422), realizar um GET /books/:id dentro do teste para comprovar que o estado anterior permaneceu intacto.',
      'Garantir que a suíte reinicie o estado em memória entre os testes e encerre o servidor HTTP limpa e automaticamente ao finalizar.',
    ],
    constraints: [
      'Os testes devem rodar com um único comando (npm test) sem exigir que o estudante inicie outro terminal manualmente antes.',
      'Não depender de serviços externos na internet durante a execução da suíte.',
    ],
    io: [
      'Entrada: comando npm test executando a suíte contra a aplicação Express.',
      'Saída: relatório do test runner com todos os casos de sucesso e erro aprovados e exit code 0.',
    ],
    acceptanceCriteria: [
      'npm test executa a compilação/checagem e todos os testes de endpoints sem depender de servidor externo pré-iniciado.',
      'Os testes verificam status HTTP, Content-Type: application/json e estrutura do corpo JSON em cada operação CRUD.',
      'Há testes específicos para 400 (JSON quebrado), 404 (ID inexistente) e 422 (validação de POST/PATCH).',
      'A suíte comprova com GET posterior que requisições inválidas não causam mutação parcial nos livros cadastrados.',
    ],
    hints: [
      'Inicie o servidor no hook before/beforeEach com const server = app.listen(0) e descubra a porta atribuída pelo sistema operacional via server.address().',
      'Use o fetch nativo do Node.js 24 para disparar as requisições contra http://127.0.0.1:${port} dentro dos testes.',
      'Chame sempre server.close() no hook after/afterEach para que o processo do node --test termine imediatamente.',
    ],
    testIdeas: [
      'Executar ciclo completo: POST cria livro → PATCH atualiza título → PATCH inválido retorna 422 → GET confirma título anterior → DELETE retorna 204 → GET retorna 404.',
      'Introduzir temporariamente um defeito no código (ex.: trocar status 201 por 200) para confirmar que o teste detecta a regressão e depois restaurar.',
    ],
    refs: ['ref-03-node-test', 'ref-03-express-routing', 'ref-03-express-errors'],
    rubric: rubric03,
    deliverables: [
      'Arquivos de teste em tests/ e configuração do script npm test.',
      'Saída real da execução da suíte de testes passando.',
    ],
  },

  // ================= AVANÇADO — AMBAS AS TRILHAS (3 exercícios compartilhados) =================
  {
    id: '03-ex-07',
    slug: 'api-integradora-stack',
    title: 'Exercício 07 — Construção da API Funcional na Stack Escolhida',
    level: 'avancado',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'ambas',
    topicIds: [
      '03-configuracao-dependencias',
      '03-validacao-erros-logs',
      '03-organizacao-testes',
      '03-seguranca-introdutoria',
      '03-laravel-middleware',
      '03-laravel-organizacao',
      '03-laravel-testes',
      '03-express-middlewares-validacao',
      '03-express-config-organizacao',
      '03-express-testes',
    ],
    competencies: [
      'Arquitetura enxuta e completa de uma API funcional na stack escolhida (PHP/Laravel ou TS/Node/Express)',
      'Regras de domínio além de CRUD passivo (empréstimo/devolução de biblioteca ou conflito de horário em agendamentos)',
      'Configuração por ambiente, logs, tratamento de erros, testes automatizados e README',
    ],
    objectives: [
      'Construir e validar uma API funcional de biblioteca ou agendamentos na stack escolhida, integrando estrutura clara, configuração por ambiente, rotas, validação, erros, logs, testes e README.',
    ],
    prerequisites: [
      'Exercícios iniciais e intermediários da trilha escolhida (PHP-01 a PHP-06 ou TS-01 a TS-06).',
    ],
    statement:
      'Escolha o domínio de Biblioteca (acervo e empréstimos/devoluções) ou Agendamentos (salas/serviços e reservas sem conflito de horário) e construa uma API funcional completa na sua trilha escolhida (PHP/Laravel ou TypeScript/Node.js/Express), sem banco de dados relacional obrigatório.',
    requirements: [
      'Implementar endpoints de saúde (GET /health), gestão do recurso principal (ex.: /books ou /rooms) e operação de regra de negócio (ex.: POST /loans e PATCH /loans/{id}/return para empréstimo/devolução, ou POST /bookings com bloqueio de conflito de horário).',
      'Aplicar validação rigorosa de entrada, impedindo estados inválidos (ex.: emprestar livro indisponível ou reservar horário já ocupado deve retornar 409 Conflict ou 422 Unprocessable Content com explicação clara).',
      'Configurar variáveis de ambiente (.env.example), middleware de correlação/log, tratamento centralizado de erros sem stack trace em produção e suíte de testes automatizados.',
      'Documentar no README os requisitos, instalação, comandos de teste e exemplos reais de requisição e resposta.',
    ],
    constraints: [
      'Implementar apenas na sua stack escolhida; não é necessário duplicar nas duas linguagens.',
      'Armazenamento em memória ou arquivo JSON local configurável; não exigir SQL, ORM, Docker ou autenticação.',
    ],
    io: [
      'Entrada: requisições HTTP cobrindo o fluxo completo do domínio escolhido e casos de colisão/regra de negócio.',
      'Saída: respostas JSON consistentes, logs estruturados e suíte de testes aprovada.',
    ],
    acceptanceCriteria: [
      'A API atende todas as rotas do domínio escolhido e impõe invariantes reais de negócio (ex.: controle de disponibilidade ou detecção de conflito).',
      'Configuração por ambiente, logs, cabeçalho de correlação e tratamento de erros funcionam sem expor segredos ou stack traces.',
      'A suíte de testes automatizados cobre fluxos de sucesso, validação 422, não encontrado 404 e conflito de regra de negócio.',
      'O README permite clonar, configurar .env a partir do .env.example, rodar os testes e testar os endpoints.',
    ],
    hints: [
      'Use este exercício como núcleo técnico do seu projeto integrador Backend Foundations Lab.',
      'Modele a regra de empréstimo ou agendamento em uma classe/serviço de domínio para que ela possa ser testada tanto isoladamente quanto via HTTP.',
      'Certifique-se de que uma tentativa recusada de empréstimo ou agendamento não altere a disponibilidade do recurso.',
    ],
    testIdeas: [
      'Realizar um empréstimo válido, tentar emprestar o mesmo exemplar indisponível (esperando erro 409/422) e depois registrar a devolução.',
      'Executar a suíte completa de testes automatizados em ambiente limpo.',
    ],
    refs: ['ref-03-laravel-routing', 'ref-03-laravel-validation', 'ref-03-laravel-testing', 'ref-03-express-routing', 'ref-03-express-errors', 'ref-03-node-test'],
    rubric: rubric03,
    deliverables: [
      'API funcional na stack escolhida com testes automatizados e .env.example.',
      'README com instruções e exemplos de requisição/resposta.',
    ],
  },
  {
    id: '03-ex-08',
    slug: 'portabilidade-contrato',
    title: 'Exercício 08 — Portabilidade de Contrato entre Stacks (Opcional)',
    level: 'avancado',
    optional: true,
    stageId: '03',
    kind: 'exercise',
    track: 'ambas',
    topicIds: ['03-linguagem-runtime-framework', '03-ciclo-requisicao', '03-validacao-erros-logs', '03-organizacao-testes'],
    competencies: [
      'Preservação de contrato HTTP independente da tecnologia interna do servidor',
      'Comparação prática de organização, configuração, validação e testes entre ecossistemas',
    ],
    objectives: [
      'Reproduzir opcionalmente dois endpoints (GET /health e GET/POST /books) na outra stack ou framework e comparar organização, configuração, validação e testes.',
    ],
    prerequisites: [
      'Ter concluído os exercícios básicos da sua trilha principal.',
    ],
    statement:
      'Exercício opcional de aprofundamento: pegue o contrato HTTP de apenas dois endpoints da sua API (por exemplo, GET /health e GET/POST /books) e reproduza-o de forma mínima na outra stack (ou compare Express vs NestJS / PHP puro vs Laravel), mantendo exatamente os mesmos formatos de requisição, resposta JSON e códigos de status.',
    requirements: [
      'Preservar exatamente o contrato externo (URLs, métodos, payloads JSON e status 200, 201 e 422) para que a mesma coleção Bruno/Postman ou script cURL passe nos dois servidores.',
      'Comparar em uma tabela curta como cada stack resolveu: (a) gerenciamento de pacotes e autoload/módulos, (b) configuração de ambiente, (c) validação de entrada e (d) execução de testes.',
    ],
    constraints: [
      'Atividade 100% opcional: não é exigida para concluir a Etapa 03.',
      'Não reescrever o projeto inteiro na segunda stack; limitar o experimento a 1 ou 2 rotas para comparação arquitetural.',
    ],
    io: [
      'Entrada: mesma bateria de requisições HTTP enviada contra o recorte implementado.',
      'Saída: respostas idênticas no contrato HTTP e notas comparativas entre as duas abordagens.',
    ],
    acceptanceCriteria: [
      'Os endpoints selecionados respondem ao mesmo contrato JSON e status HTTP do servidor principal.',
      'A comparação documenta diferenças concretas de organização, configuração, validação e testes sem tratar uma stack como inferior.',
    ],
    hints: [
      'Reutilize exatamente os mesmos comandos cURL ou requisições do Bruno/Postman mudando apenas a porta local.',
      'Observe como o protocolo HTTP desacopla o cliente da linguagem usada no servidor.',
    ],
    testIdeas: [
      'Disparar o mesmo POST válido e o mesmo POST inválido (422) nos dois servidores e comparar os corpos JSON retornados.',
    ],
    refs: ['ref-03-laravel-routing', 'ref-03-express-routing', 'ref-03-nest-controllers'],
    rubric: rubric03,
    deliverables: [
      'Experimento mínimo de contrato reproduzido e tabela comparativa das duas abordagens.',
    ],
  },
  {
    id: '03-ex-09',
    slug: 'adr-revisao-tecnica',
    title: 'Exercício 09 — Revisão Técnica e ADR da Stack Escolhida',
    level: 'avancado',
    optional: false,
    stageId: '03',
    kind: 'exercise',
    track: 'ambas',
    topicIds: ['03-linguagem-runtime-framework', '03-configuracao-dependencias', '03-organizacao-testes', '03-seguranca-introdutoria'],
    competencies: [
      'Registro de Decisão Arquitetural (ADR) com contexto, alternativas e trade-offs',
      'Análise crítica de vantagens, limitações e próximos passos de engenharia',
    ],
    objectives: [
      'Escrever uma ADR (Architecture Decision Record) curta e objetiva justificando a stack escolhida, vantagens, limitações, trade-offs e próximos passos.',
    ],
    prerequisites: [
      'Ter praticado a construção e os testes da API na trilha escolhida.',
    ],
    statement:
      'Redija uma ADR (Architecture Decision Record) curta (ex.: docs/adr/001-escolha-stack-e-organizacao.md) para o repositório do seu projeto, documentando o contexto do problema, a stack escolhida (PHP/Laravel ou TypeScript/Node.js/Express), as decisões de organização/validação, os trade-offs assumidos nesta etapa e os próximos passos.',
    requirements: [
      'Estruturar o documento com Contexto, Decisão, Justificativa (vantagens observadas na prática), Limitações/Trade-offs e Próximos passos.',
      'Justificar a organização interna adotada (como separou rotas, validação e regras sem criar overengineering).',
      'Explicitar as limitações deliberadas da Etapa 03 (armazenamento em memória/arquivo JSON sem concorrência transacional SQL, ausência de autenticação e de containers Docker, que serão tratados nas Etapas 05, 07 e 08).',
    ],
    constraints: [
      'Basear a ADR nas evidências reais do projeto que você construiu, evitando clichês genéricos ou guerras de linguagem.',
      'Manter o texto conciso, claro e útil para quem visitar seu portfólio no GitHub.',
    ],
    io: [
      'Entrada: decisões tomadas durante os exercícios e projetos da Etapa 03.',
      'Saída: documento ADR em Markdown integrado ao repositório e referenciado no README.',
    ],
    acceptanceCriteria: [
      'A ADR apresenta Contexto, Decisão, Vantagens, Limitações/Trade-offs e Próximos passos de forma clara.',
      'As escolhas de validação, tratamento de erros e organização de pastas estão conectadas ao código real do projeto.',
      'Os limites atuais (ausência de banco SQL, autenticação e deploy containerizado) estão declarados com honestidade técnica.',
    ],
    hints: [
      'Uma boa ADR não finge que a escolha é perfeita: ela explica o que você ganha agora (simplicidade, velocidade de feedback nos testes) e o que precisará evoluir quando o sistema crescer.',
      'Mencione como o isolamento entre controllers e regras de domínio facilitará trocar o armazenamento em memória por PostgreSQL na Etapa 05.',
    ],
    testIdeas: [
      'Revisar se qualquer pessoa que abrir o repositório entende em 2 minutos por que a aplicação foi estruturada dessa maneira.',
    ],
    refs: ['ref-03-laravel-structure', 'ref-03-express-routing', 'ref-03-psr'],
    rubric: rubric03,
    deliverables: [
      'Arquivo Markdown da ADR (ex.: docs/adr/001-stack-backend.md) vinculado ao README do projeto.',
    ],
  },

  // ================= EXTRA OPCIONAL — NESTJS (exclusivo da trilha TypeScript) =================
  {
    id: '03-ts-extra-nest',
    slug: 'ts-extra-nestjs',
    title: 'Exercício Extra (Opcional) — Catálogo Modular com NestJS',
    level: 'extra',
    optional: true,
    stageId: '03',
    kind: 'exercise',
    track: 'javascript',
    topicIds: ['03-nestjs-opcional'],
    competencies: [
      'Uso de Module, Controller, Provider (@Injectable) e injeção de dependência no NestJS',
      'Validação com DTOs, ValidationPipe e ParseIntPipe',
      'Testes básicos de unidade/módulo no NestJS',
    ],
    objectives: [
      'Construir opcionalmente um módulo de livros em NestJS envolvendo Module, Controller, Provider, DTO, validação com Pipes e testes básicos.',
    ],
    prerequisites: [
      'Trilha TypeScript/Node/Express concluída e leitura do tópico opcional de NestJS.',
    ],
    statement:
      'Desafio extra e opcional exclusivo da trilha TypeScript: implemente um módulo BooksModule no NestJS contendo um BooksController, um BooksService injetável (@Injectable), um CreateBookDto validado por ValidationPipe e testes básicos para comparar a abordagem opinativa do NestJS com a do Express.',
    requirements: [
      'Estruturar BooksModule, BooksController (GET /books, GET /books/:id, POST /books) e BooksService com dados em memória.',
      'Definir CreateBookDto como classe concreta validada por ValidationPipe (com whitelist e forbidNonWhitelisted ativados) e validar :id numérico.',
      'Lançar NotFoundException quando o livro solicitado não existir.',
      'Escrever testes básicos verificando o BooksService e as respostas HTTP de sucesso (200/201) e erro (400/404).',
    ],
    constraints: [
      'Totalmente opcional: não bloqueia nem entra no denominador obrigatório de conclusão da Etapa 03.',
      'Exclusivo da trilha TypeScript; lembrar que DTOs no NestJS precisam ser classes concretas (e não apenas interfaces TS) para que metadados e decorators funcionem em runtime.',
    ],
    io: [
      'Entrada: requisições GET /books, GET /books/:id e POST /books na aplicação NestJS.',
      'Saída: respostas JSON padronizadas pelo NestJS e testes automatizados aprovados.',
    ],
    acceptanceCriteria: [
      'BooksModule registra BooksController e BooksService usando injeção de dependência pelo construtor.',
      'ValidationPipe rejeita payloads inválidos ou com propriedades não permitidas retornando 400 Bad Request sem criar o registro.',
      'Os testes básicos do serviço/controller executam e passam.',
    ],
    hints: [
      'Ative app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) na inicialização ou no módulo de teste.',
      'Cuidado ao combinar transform: true global com parâmetros numéricos: verifique se entradas como "1e0" ou "abc" são rejeitadas conforme esperado.',
      'Compare no seu README quanto código de infraestrutura o NestJS padroniza por decorators em relação à montagem manual no Express.',
    ],
    testIdeas: [
      'Enviar POST /books com campo extra não listado no DTO e verificar rejeição 400 por forbidNonWhitelisted.',
      'Consultar GET /books/999 e verificar retorno 404 NotFoundException.',
    ],
    refs: ['ref-03-nest-first-steps', 'ref-03-nest-controllers', 'ref-03-nest-providers', 'ref-03-nest-validation'],
    rubric: rubric03,
    deliverables: [
      'Código do módulo NestJS (Module, Controller, Service, DTO) e testes básicos.',
    ],
  },
];

// ================= 14. PROJETOS DE PORTFÓLIO (Iniciante, Intermediário e Avançado) =================

export const project03FoundationsCli: Activity = {
  id: '03-project-cli',
  slug: 'backend-foundations-cli',
  title: 'Backend Foundations CLI',
  level: 'inicial',
  optional: true,
  stageId: '03',
  kind: 'project',
  track: 'ambas',
  topicIds: [
    '03-linguagem-runtime-framework',
    '03-configuracao-dependencias',
    '03-organizacao-testes',
    '03-php-fundamentos',
    '03-php-tipagem',
    '03-php-oo',
    '03-php-composer-psr',
    '03-php-execucao',
    '03-ts-fundamentos-backend',
    '03-ts-assincrono',
    '03-ts-configuracao',
    '03-node-ambiente-npm',
    '03-node-modulos',
  ],
  competencies: [
    'Modelagem de domínio com tipagem estrita (PHP OO + strict_types ou TypeScript strict)',
    'Gerenciamento de dependências e módulos (Composer/PSR-4 ou npm/ESM)',
    'Validação de arquivos JSON, tratamento de erros e testes automatizados em CLI',
  ],
  context:
    'Antes de expor regras de negócio na rede via HTTP, um desenvolvedor backend precisa garantir que o núcleo do domínio, a validação de dados e o empacotamento do projeto funcionem de maneira limpa e testável via linha de comando.',
  problem:
    'Planilhas e arquivos JSON exportados manualmente para um acervo de livros frequentemente contêm campos vazios, anos inválidos ou estruturas corrompidas que precisam ser validadas, filtradas e sumarizadas com segurança por uma ferramenta CLI.',
  statement:
    'Construa o projeto Backend Foundations CLI na sua trilha escolhida — em PHP (aplicação CLI orientada a objetos com Composer, PSR-4, validação e testes) ou em TypeScript (aplicação CLI com npm, TypeScript strict, leitura/validação de JSON e testes).',
  objectives: [
    'Desenvolver uma aplicação de linha de comando completa, validada e testada na stack escolhida para importar, validar, filtrar e gerar relatórios de um catálogo JSON.',
  ],
  prerequisites: [
    'Exercícios iniciais PHP-01/PHP-02 (na trilha PHP) ou TS-01/TS-02 (na trilha TypeScript).',
  ],
  requirements: [
    'Trilha PHP: organizar com Composer e PSR-4, ativar declare(strict_types=1), modelar classes de domínio com encapsulamento e exceções e disponibilizar executável CLI.',
    'Trilha TypeScript: organizar com npm, package.json e tsconfig.json em modo strict, validar dados unknown em runtime sem usar any e estruturar módulos ESM.',
    'Suportar comandos ou flags de listagem, busca/filtro por autor ou categoria e geração de resumo estatístico (total de obras, disponíveis e agrupamento por categoria).',
    'Rejeitar arquivos JSON malformados ou registros que violem invariantes com mensagens claras em stderr e código de saída diferente de zero (exit 1), sem corromper arquivos existentes.',
    'Incluir testes automatizados cobrindo o parser/validador, os filtros e os casos de erro.',
  ],
  nonfunctional: [
    'Execução determinística via terminal com códigos de saída padronizados (0 para sucesso, 1 para erro).',
    'Separar claramente o núcleo puro de domínio/validação da camada de leitura de arquivos e argumentos do terminal.',
  ],
  constraints: [
    'Implementar apenas na trilha escolhida (PHP ou TypeScript).',
    'Não utilizar banco de dados nem servidor web neste projeto inicial.',
  ],
  io: [
    'Entrada: arquivo JSON de catálogo e argumentos de comando/filtro no terminal.',
    'Saída: tabela/relatório ou JSON validado em stdout (exit 0) ou diagnóstico de erro em stderr (exit 1).',
  ],
  acceptanceCriteria: [
    'O projeto instala dependências e carrega módulos/classes seguindo o padrão oficial da stack (Composer PSR-4 ou npm/TS strict).',
    'Entradas JSON inválidas ou com invariantes quebradas falham de modo seguro com exit 1.',
    'Os filtros e o relatório do catálogo produzem resultados exatos e verificáveis.',
    'A suíte de testes automatizados passa localmente e o README documenta como instalar, executar e testar.',
  ],
  hints: [
    'Comece pelos tipos/classes de domínio e seus testes unitários antes de escrever o parser de argumentos do terminal.',
    'Use arquivos JSON de fixture pequenos nos testes para cobrir lista válida, lista vazia, JSON quebrado e item sem título.',
    'Documente no README exemplos reais dos comandos executados e das saídas obtidas.',
  ],
  testIdeas: [
    'Importar catálogo válido de 5 livros e filtrar por uma categoria específica.',
    'Tentar importar JSON cujo campo publishedYear seja texto ou número negativo e confirmar falha com exit 1.',
    'Verificar que o arquivo de entrada permanece inalterado após qualquer operação.',
  ],
  refs: ['ref-03-php-types', 'ref-03-php-oop', 'ref-03-composer-doc', 'ref-03-psr4', 'ref-03-ts-handbook', 'ref-03-node-learn', 'ref-03-node-esm', 'ref-03-node-test'],
  rubric: rubric03,
  deliverables: [
    'Repositório ou diretório do Backend Foundations CLI com código-fonte, testes e fixtures JSON.',
    'README com instruções de instalação, comandos suportados e resultados dos testes.',
  ],
  milestones: [
    'Configurar manifesto do projeto (composer.json ou package.json + tsconfig.json) e estrutura src/ e tests/.',
    'Implementar entidade/validação do livro e testes unitários de fronteira.',
    'Implementar comandos CLI de filtro e relatório com tratamento de erros e exit codes.',
    'Documentar exemplos de uso e limitações no README.',
  ],
  extras: [
    'Adicionar flag --output=relatorio.json usando escrita exclusiva para não sobrescrever arquivos existentes por engano.',
    'Adicionar ordenação determinística por título ou ano de publicação.',
  ],
};

export const project03BookCatalogApi: Activity = {
  id: '03-project-catalog-api',
  slug: 'book-catalog-api',
  title: 'Book Catalog API',
  level: 'intermediario',
  optional: true,
  stageId: '03',
  kind: 'project',
  track: 'ambas',
  topicIds: [
    '03-ciclo-requisicao',
    '03-validacao-erros-logs',
    '03-organizacao-testes',
    '03-seguranca-introdutoria',
    '03-laravel-http',
    '03-laravel-middleware',
    '03-laravel-validacao-erros',
    '03-laravel-testes',
    '03-express-rotas-req-res',
    '03-express-middlewares-validacao',
    '03-express-testes',
  ],
  competencies: [
    'Construção de API HTTP com rotas GET, POST, PATCH e DELETE em PHP/Laravel ou TypeScript/Express',
    'Validação rigorosa no servidor, tratamento padronizado de erros (400/404/422/500) e logs',
    'Testes automatizados de endpoints com dados em memória',
  ],
  context:
    'O catálogo de livros construído nas etapas anteriores precisa agora de um serviço HTTP próprio capaz de listar, consultar, cadastrar, atualizar e remover obras com validação confiável no servidor.',
  problem:
    'Sem validação no servidor e contratos de erro claros, requisições malformadas corrompem o acervo em memória, retornam códigos HTTP ambíguos e dificultam o consumo pelo frontend.',
  statement:
    'Construa a Book Catalog API utilizando PHP/Laravel ou TypeScript/Express com dados em memória, implementando GET /health, GET /books, GET /books/{id}, POST /books, PATCH /books/{id} e DELETE /books/{id}, com validação de entrada, tratamento centralizado de erros e testes básicos.',
  objectives: [
    'Implementar e testar uma API HTTP de catálogo de livros em memória com operações completas de leitura e escrita, validação e respostas de erro padronizadas.',
  ],
  prerequisites: [
    'Exercícios intermediários PHP-04/PHP-05 (trilha PHP) ou TS-04/TS-05 (trilha TypeScript).',
  ],
  requirements: [
    'Implementar os seis endpoints obrigatórios: GET /health, GET /books (com filtro opcional por query string), GET /books/{id}, POST /books, PATCH /books/{id} e DELETE /books/{id}.',
    'Validar todos os dados recebidos (body, query e params), retornando 400 para JSON malformado, 404 para ID inexistente e 422 para violação de regras de validação.',
    'Garantir que atualizações parciais (PATCH) preservem os campos não enviados e nunca apliquem mutação parcial quando a validação falhar.',
    'Manter os dados em memória (sem SQL, ORM ou autenticação) e fornecer uma suíte de testes básicos que verifique cada endpoint.',
  ],
  nonfunctional: [
    'Respostas exclusivamente em JSON com Content-Type: application/json.',
    'Nenhuma exposição de stack trace em respostas de erro.',
  ],
  constraints: [
    'Escolher uma stack: PHP/Laravel ou TypeScript/Express.',
    'Não exigir SQL, PostgreSQL, ORM, autenticação ou Docker.',
  ],
  io: [
    'Entrada: chamadas HTTP para /health, /books e /books/{id} com diferentes combinações de query e body JSON.',
    'Saída: respostas JSON com status 200, 201, 204, 400, 404 e 422.',
  ],
  acceptanceCriteria: [
    'Os seis endpoints exigidos funcionam com status HTTP e corpos JSON coerentes.',
    'A validação barra entradas inválidas com 422 e preserva o estado em memória inalterado.',
    'O tratamento de erros responde 400 para JSON inválido e 404 para recursos inexistentes.',
    'A suíte de testes básicos executa e passa localmente, documentada no README.',
  ],
  hints: [
    'Implemente primeiro o armazenamento em memória isolado em uma classe/módulo para facilitar o reset entre cada teste.',
    'Verifique todas as respostas de erro com um cliente HTTP (cURL ou Bruno) e também na suíte de testes automatizados.',
    'Documente uma tabela rápida de endpoints e status no README do projeto.',
  ],
  testIdeas: [
    'Testar o fluxo CRUD completo de um livro do POST ao DELETE.',
    'Testar PATCH inválido seguido de GET para comprovar integridade dos dados.',
    'Testar busca GET /books?q=termo com e sem resultados.',
  ],
  refs: ['ref-03-laravel-routing', 'ref-03-laravel-validation', 'ref-03-laravel-testing', 'ref-03-express-routing', 'ref-03-express-errors', 'ref-03-zod', 'ref-03-node-test'],
  rubric: rubric03,
  deliverables: [
    'Código-fonte da Book Catalog API na stack escolhida.',
    'Suíte de testes básicos e README com exemplos de requisição e resposta.',
  ],
  milestones: [
    'Estruturar a aplicação HTTP, configuração de ambiente e rota GET /health.',
    'Implementar GET /books, GET /books/{id} e POST /books com validação.',
    'Implementar PATCH /books/{id}, DELETE /books/{id} e tratamento centralizado de erros.',
    'Escrever testes básicos de sucesso e erro e documentar o README.',
  ],
  extras: [
    'Exportar coleção do Bruno ou Postman junto ao repositório para facilitar inspeção manual.',
  ],
};

export const project03FoundationsLab: Activity = {
  id: '03-project-foundations-lab',
  slug: 'backend-foundations-lab',
  title: 'Backend Foundations Lab',
  level: 'avancado',
  optional: false,
  stageId: '03',
  kind: 'project',
  track: 'ambas',
  topicIds: [
    '03-linguagem-runtime-framework',
    '03-ciclo-requisicao',
    '03-configuracao-dependencias',
    '03-validacao-erros-logs',
    '03-organizacao-testes',
    '03-seguranca-introdutoria',
    '03-php-fundamentos',
    '03-php-tipagem',
    '03-php-oo',
    '03-php-composer-psr',
    '03-php-execucao',
    '03-laravel-introducao',
    '03-laravel-estrutura',
    '03-laravel-http',
    '03-laravel-middleware',
    '03-laravel-validacao-erros',
    '03-laravel-organizacao',
    '03-laravel-testes',
    '03-ts-fundamentos-backend',
    '03-ts-assincrono',
    '03-ts-configuracao',
    '03-node-ambiente-npm',
    '03-node-modulos',
    '03-node-funcionamento',
    '03-node-http-nativo',
    '03-node-estrutura-testes',
    '03-express-rotas-req-res',
    '03-express-middlewares-validacao',
    '03-express-config-organizacao',
    '03-express-testes',
  ],
  competencies: [
    'Construção de API funcional completa em PHP/Laravel ou TypeScript/Node.js/Express',
    'Organização de projeto, configuração por ambiente (.env.example), middlewares, validação, tratamento de erros e logs',
    'Testes automatizados, documentação profissional de portfólio e ADR justificando decisões e trade-offs',
  ],
  context:
    'Para consolidar os fundamentos de backend na Formação Júnior, você precisa construir e publicar um serviço HTTP completo, organizado, testado e bem documentado em uma stack principal escolhida.',
  problem:
    'Uma organização comunitária precisa de uma API confiável para gerenciar sua Biblioteca (catálogo de livros, controle de disponibilidade, empréstimos e devoluções) ou sua Central de Agendamentos (salas/recursos, horários e reservas sem conflito), garantindo validação rigorosa, erros previsíveis, logs diagnósticos e testes automatizados.',
  statement:
    'Escolha um dos dois domínios — Biblioteca ou Agendamentos — e implemente o projeto integrador Backend Foundations Lab na sua stack principal (PHP + Laravel ou TypeScript + Node.js + Express). Entregue um repositório GitHub organizado com README profissional, .env.example sem segredos, endpoints funcionais, validação, logs, tratamento de erros, testes automatizados e uma ADR curta.',
  objectives: [
    'Construir uma API funcional em uma stack escolhida aplicando roteamento, validação, middlewares, tratamento de erros, configuração por ambiente, logs, testes introdutórios e documentação de portfólio.',
  ],
  prerequisites: [
    'Tópicos comuns e tópicos base da trilha escolhida (PHP/Laravel ou TypeScript/Node.js/Express).',
    'Exercícios iniciais e intermediários da trilha escolhida concluídos.',
  ],
  requirements: [
    'Escolher o domínio (Biblioteca ou Agendamentos) e a stack principal (PHP/Laravel ou TypeScript/Node.js/Express).',
    'Implementar GET /health e os endpoints completos do domínio escolhido (criação, listagem com filtros, busca por ID, atualização parcial PATCH, remoção DELETE e operação de negócio como empréstimo/devolução ou reserva com verificação de conflito).',
    'Validar todas as entradas no servidor (body, query, params), descartar propriedades extras não autorizadas e retornar códigos HTTP semânticos (200, 201, 204, 400, 404, 409/422 e 500).',
    'Configurar variáveis de ambiente com .env.example documentado (sem segredos reais), middleware de log/correlação (ex.: X-Request-Id) e CORS ajustável por ambiente.',
    'Implementar tratamento centralizado de exceções que registre logs úteis no servidor sem nunca expor stack traces na resposta HTTP de produção.',
    'Escrever suíte de testes automatizados cobrindo fluxos de sucesso, falhas de validação (422), recurso inexistente (404) e preservação de estado após erro.',
    'Publicar ou estruturar o repositório com commits organizados, README profissional (com instruções de instalação, execução, testes e exemplos de requisição/resposta) e uma ADR curta justificando a stack e as decisões tomadas.',
  ],
  nonfunctional: [
    'Qualquer pessoa desenvolvedora deve conseguir clonar o projeto, copiar o .env.example, instalar as dependências, rodar a suíte de testes e testar os endpoints seguindo apenas o README.',
    'Tipagem rigorosa (declare(strict_types=1) no PHP ou "strict": true no TypeScript) e separação pragmática de responsabilidades sem overengineering.',
  ],
  constraints: [
    'Uma única stack principal basta para concluir o projeto e a Etapa 03.',
    'Armazenamento em memória ou arquivo JSON local configurável; não exigir banco de dados SQL/ORM (Etapa 05), autenticação/RBAC (Etapa 07) nem Docker/CI (Etapa 08).',
    'Nunca publicar segredos reais, tokens ou pastas de dependências (vendor/ ou node_modules/).',
  ],
  io: [
    'Entrada: requisições HTTP JSON para os recursos de Biblioteca ou Agendamentos e execução da suíte de testes.',
    'Saída: API respondendo conforme contrato, logs diagnósticos, testes automatizados verdes e documentação com ADR.',
  ],
  acceptanceCriteria: [
    'A API implementa todos os endpoints e regras do domínio escolhido (Biblioteca ou Agendamentos) na stack selecionada, mantendo integridade dos dados.',
    'Validação no servidor, middlewares, logs e tratamento de erros respondem com status HTTP corretos (200/201/204/400/404/422/500) sem vazar stack trace.',
    'O projeto possui .env.example sem segredos, lockfile versionado e separação clara entre rotas, controllers/handlers e regras de domínio.',
    'A suíte de testes automatizados executa localmente e comprova tanto os cenários de sucesso quanto a rejeição segura de entradas inválidas.',
    'O repositório/projeto inclui README completo (instalação, comandos, exemplos de requisição e resposta) e ADR curta analisando vantagens, limitações e trade-offs.',
  ],
  hints: [
    'Comece definindo o contrato HTTP dos endpoints no README antes de codificar os controllers; isso mantém os status e formatos de erro consistentes.',
    'Mantenha os controllers enxutos: valide a entrada na fronteira HTTP, chame o serviço de domínio e traduza o resultado ou exceção em resposta JSON.',
    'Revise a rubrica (30% funcionamento, 20% linguagem/organização, 25% HTTP/validação/erros, 15% testes, 10% documentação/segurança) antes de declarar a conclusão.',
  ],
  testIdeas: [
    'Clonar ou copiar o projeto para uma pasta limpa, seguir exatamente os comandos do README e rodar os testes.',
    'Testar o fluxo principal completo (ex.: criar livro → emprestar → tentar emprestar novamente e receber erro → devolver → excluir).',
    'Testar payloads malformados, campos extras não permitidos e IDs inválidos conferindo respostas e logs.',
  ],
  refs: [
    'ref-03-php-types',
    'ref-03-composer-doc',
    'ref-03-laravel-structure',
    'ref-03-laravel-routing',
    'ref-03-laravel-middleware',
    'ref-03-laravel-validation',
    'ref-03-laravel-errors',
    'ref-03-laravel-container',
    'ref-03-laravel-testing',
    'ref-03-ts-handbook',
    'ref-03-node-learn',
    'ref-03-node-test',
    'ref-03-express-routing',
    'ref-03-express-middleware',
    'ref-03-express-errors',
    'ref-03-zod',
  ],
  rubric: rubric03,
  deliverables: [
    'Repositório GitHub (ou estrutura pronta para publicação) com código-fonte organizado e commits semânticos.',
    'README profissional com instruções de instalação, configuração (.env.example), exemplos de requisição/resposta e execução dos testes.',
    'Suíte de testes automatizados cobrindo rotas, validações e regras de domínio.',
    'ADR curta documentando escolha da stack, organização, trade-offs e próximos passos.',
  ],
  milestones: [
    'Marco 1 — Setup e Arquitetura: configurar o projeto na stack escolhida, .env.example, middleware básico, GET /health e estrutura de diretórios.',
    'Marco 2 — Domínio e Endpoints: implementar as entidades, regras de negócio (Biblioteca ou Agendamentos) e endpoints GET, POST, PATCH e DELETE.',
    'Marco 3 — Validação, Erros e Logs: blindar entradas com validação no servidor, padronizar respostas 400/404/422/500 e registrar logs sem expor stack traces.',
    'Marco 4 — Testes, README e ADR: criar a suíte automatizada de testes, documentar exemplos reais de requisição/resposta e redigir a ADR.',
  ],
  extras: [
    'Incluir coleção exportada do Bruno ou Postman na pasta docs/ ou collections/ do repositório.',
    'Implementar opcionalmente um endpoint equivalente em NestJS (na trilha TS) ou comparar com a segunda stack conforme o Exercício 08.',
  ],
};

export const projects03: Activity[] = [
  project03FoundationsCli,
  project03BookCatalogApi,
  project03FoundationsLab,
];

export const books03: Book[] = [
  {
    id: 'book-03-php-5ed',
    title: 'PHP para quem conhece PHP — 5ª Edição',
    author: 'Juliano Niederauer',
    edition: '5ª edição',
    year: '2017',
    language: 'PT-BR',
    level: 'Iniciante a Intermediário',
    topics: ['03-php-fundamentos', '03-php-tipagem', '03-php-oo', '03-php-execucao'],
    url: 'https://novatec.com.br/livros/php-para-quem-conhece-php-5ed/',
    stages: ['03'],
    track: 'php',
    reason: 'Apoio em português para revisão da linguagem PHP, manipulação de formulários/filtros, arquivos, orientação a objetos e tratamento de dados no servidor.',
    note: 'Obra escrita na transição do PHP 7; para union types, readonly e novidades do PHP 8.2–8.5, complemente sempre com o Manual Oficial do PHP. Capítulos de banco de dados SQL pertencem à Etapa 05.',
    community: 'Seleção por adequação ao recorte introdutório em português no catálogo da editora; não alegamos consenso comunitário.',
    alternatives: ['ref-03-php-manual', 'ref-03-php-types', 'ref-03-php-oop', 'ref-03-php-webserver'],
    cover: {
      kind: 'image',
      src: 'covers/php-para-quem-conhece-php-5ed.webp',
      alt: 'Capa do livro PHP para quem conhece PHP — 5ª Edição, de Juliano Niederauer (Novatec Editora)',
      width: 292,
      height: 407,
      origin: 'Catálogo oficial da Novatec Editora (ISBN 978-85-7522-590-5, capa ampliada s3.novatec.com.br).',
      usage: 'Asset estático otimizado em WebP para identificação bibliográfica da 5ª edição, sem links de compra ou preços.',
    },
  },
  {
    id: 'book-03-laravel',
    title: 'Desenvolvendo com Laravel',
    author: 'Matt Stauffer',
    edition: '1ª edição brasileira',
    year: '2017',
    language: 'PT-BR',
    level: 'Intermediário',
    topics: ['03-laravel-introducao', '03-laravel-estrutura', '03-laravel-http', '03-laravel-middleware', '03-laravel-validacao-erros', '03-laravel-organizacao', '03-laravel-testes'],
    url: 'https://novatec.com.br/livros/desenvolvendo-com-laravel/',
    stages: ['03'],
    track: 'php',
    reason: 'Referência clássica traduzida para compreender a filosofia do Laravel: roteamento, controllers, validação, Service Container, testes automatizados e construção de APIs JSON.',
    note: 'A edição impressa em português baseia-se no Laravel 5.3; os conceitos de ciclo de requisição, container e testes permanecem sólidos, mas confira a estrutura enxuta do bootstrap/app.php na documentação oficial do Laravel 13.',
    community: 'Obra frequentemente citada na comunidade Laravel; registrada como recomendação opcional sem obrigatoriedade de compra.',
    alternatives: ['ref-03-laravel-structure', 'ref-03-laravel-routing', 'ref-03-laravel-validation', 'ref-03-laravel-container', 'ref-03-laravel-testing'],
    cover: {
      kind: 'image',
      src: 'covers/desenvolvendo-com-laravel.webp',
      alt: 'Capa do livro Desenvolvendo com Laravel, de Matt Stauffer (Novatec Editora)',
      width: 292,
      height: 407,
      origin: 'Catálogo oficial da Novatec Editora (ISBN 978-85-7522-567-7, capa ampliada s3.novatec.com.br).',
      usage: 'Asset estático otimizado em WebP para identificação bibliográfica da edição recomendada, sem links de compra ou preços.',
    },
  },
  {
    id: 'book-03-dominando-nodejs',
    title: 'Dominando o Node.js',
    author: 'Ulises Gascón',
    edition: '1ª edição',
    year: '2025',
    language: 'PT-BR',
    level: 'Iniciante a Intermediário',
    topics: ['03-node-ambiente-npm', '03-node-modulos', '03-node-funcionamento', '03-node-http-nativo', '03-node-estrutura-testes', '03-express-rotas-req-res', '03-express-testes'],
    url: 'https://novatec.com.br/livros/dominando-nodejs/',
    stages: ['03'],
    track: 'javascript',
    reason: 'Obra recente em português cobrindo arquitetura single-thread e event loop do Node.js, I/O não bloqueante, pacotes npm, servidores HTTP, Express, tratamento de erros e estratégias de teste.',
    note: 'Capítulos finais sobre bancos de dados, JWT e Docker antecipam temas das Etapas 05, 07 e 08 e não são exigidos na Etapa 03.',
    community: 'Seleção por atualidade (2025) e aderência direta ao currículo de Node.js e Express; não alegamos consenso comunitário.',
    alternatives: ['ref-03-node-learn', 'ref-03-node-esm', 'ref-03-node-eventloop', 'ref-03-node-http', 'ref-03-node-test'],
    cover: {
      kind: 'image',
      src: 'covers/dominando-nodejs.webp',
      alt: 'Capa do livro Dominando o Node.js, de Ulises Gascón (Novatec Editora)',
      width: 292,
      height: 403,
      origin: 'Catálogo oficial da Novatec Editora (ISBN 978-85-7522-947-7, capa ampliada s3.novatec.com.br).',
      usage: 'Asset estático otimizado em WebP para identificação bibliográfica da edição recomendada, sem links de compra ou preços.',
    },
  },
  {
    id: 'book-03-node-express',
    title: 'Programação web com Node e Express',
    author: 'Ethan Brown',
    edition: '2ª edição',
    year: '2020',
    language: 'PT-BR',
    level: 'Iniciante a Intermediário',
    topics: ['03-ciclo-requisicao', '03-express-rotas-req-res', '03-express-middlewares-validacao', '03-express-config-organizacao', '03-express-testes'],
    url: 'https://novatec.com.br/livros/programacao-web-com-node-express/',
    stages: ['03'],
    track: 'javascript',
    reason: 'Guia focado no pipeline de requisição e resposta do Express, roteamento, criação de middlewares, configuração por ambiente, testes e organização de APIs.',
    note: 'Foque nos capítulos de requisição/resposta, roteamento, middlewares, testes e APIs JSON; seções de templates server-side (Handlebars) e persistência externa não são pré-requisitos.',
    community: 'Seleção por foco específico no framework Express em português; não alegamos consenso comunitário.',
    alternatives: ['ref-03-express-routing', 'ref-03-express-middleware', 'ref-03-express-errors', 'ref-03-zod'],
    cover: {
      kind: 'image',
      src: 'covers/programacao-web-node-express.webp',
      alt: 'Capa do livro Programação web com Node e Express, de Ethan Brown (Novatec Editora)',
      width: 292,
      height: 419,
      origin: 'Catálogo oficial da Novatec Editora (ISBN 978-65-86057-08-9, capa ampliada s3.novatec.com.br).',
      usage: 'Asset estático otimizado em WebP para identificação bibliográfica da edição recomendada, sem links de compra ou preços.',
    },
  },
  {
    id: 'book-03-refatoracao',
    title: 'Refatoração: Aperfeiçoando o Design de Códigos Existentes — 2ª Edição',
    author: 'Martin Fowler',
    edition: '2ª edição',
    year: '2020',
    language: 'PT-BR',
    level: 'Intermediário (Leitura complementar)',
    topics: ['03-linguagem-runtime-framework', '03-validacao-erros-logs', '03-organizacao-testes', '03-laravel-organizacao', '03-express-config-organizacao'],
    url: 'https://novatec.com.br/livros/refatoracao/',
    stages: ['03'],
    track: 'ambas',
    reason: 'Leitura complementar para aprender a organizar responsabilidades, extrair funções/classes coesas, reconhecer maus cheiros de código e refatorar protegido por testes automatizados sem cair em overengineering.',
    note: 'Leitura complementar opcional válida para ambas as trilhas (PHP e TypeScript); os primeiros capítulos já fornecem a base necessária para separar fases e responsabilidades na Etapa 03.',
    community: 'Clássico amplamente reconhecido em engenharia de software; apresentado como leitura complementar opcional, nunca como pré-requisito obrigatório.',
    alternatives: ['ref-03-laravel-container', 'ref-03-node-test', 'ref-03-psr'],
    cover: {
      kind: 'image',
      src: 'covers/refatoracao-2ed.webp',
      alt: 'Capa do livro Refatoração — 2ª Edição, de Martin Fowler (Novatec Editora)',
      width: 292,
      height: 419,
      origin: 'Catálogo oficial da Novatec Editora (ISBN 978-85-7522-724-4, capa ampliada s3.novatec.com.br).',
      usage: 'Asset estático otimizado em WebP para identificação bibliográfica da 2ª edição, sem links de compra ou preços.',
    },
  },
];

