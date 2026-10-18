import type {Activity, Book, StudyTopic} from './curriculum';
import type {Reference} from './catalog';

// Objetivos: Notion 05; setores e equivalência TS ampliados pelo pedido de 18/10/2026.
export const references05: Reference[] = [
  {
    "id": "05-sql",
    "title": "PostgreSQL · SQL básico",
    "url": "https://www.postgresql.org/docs/current/tutorial-sql.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "2.2–2.9: tabelas, inserções, consultas, joins, agregações, atualização e exclusão",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-ddl",
    "title": "PostgreSQL · Definição de dados",
    "url": "https://www.postgresql.org/docs/current/ddl.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Tabelas, schemas, ALTER TABLE e DROP TABLE; operar somente no banco descartável de estudo",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-select",
    "title": "PostgreSQL · Consultas",
    "url": "https://www.postgresql.org/docs/current/queries.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "SELECT, DISTINCT, aliases, filtros, GROUP BY/HAVING, ORDER BY, LIMIT/OFFSET e CTE",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-constraints",
    "title": "PostgreSQL · Constraints",
    "url": "https://www.postgresql.org/docs/current/ddl-constraints.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "5.5: NOT NULL, CHECK, UNIQUE, chaves primárias/estrangeiras e exclusão referencial",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-types",
    "title": "PostgreSQL · Tipos",
    "url": "https://www.postgresql.org/docs/current/datatype.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "integer, numeric, varchar, boolean, date, timestamptz e uuid",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-setup",
    "title": "PostgreSQL · Ambiente local",
    "url": "https://www.postgresql.org/docs/current/tutorial-start.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Instalação, arquitetura, criação e acesso ao banco; registrar sistema e versão local",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-psql",
    "title": "PostgreSQL · psql",
    "url": "https://www.postgresql.org/docs/current/app-psql.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Conexão, arquivos SQL e inspeção do schema; não registrar credenciais",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-joins",
    "title": "PostgreSQL · Expressões de tabela",
    "url": "https://www.postgresql.org/docs/current/queries-table-expressions.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "INNER/LEFT JOIN, filtros e agrupamento; cardinalidade e multiplicação de linhas",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-cte",
    "title": "PostgreSQL · WITH",
    "url": "https://www.postgresql.org/docs/current/queries-with.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "7.8.1: CTE não recursiva; recursão e materialização avançada fora do mínimo",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-exists",
    "title": "PostgreSQL · Subconsultas",
    "url": "https://www.postgresql.org/docs/current/functions-subquery.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "9.24: EXISTS e IN; conferir NULL e multiplicidade",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-indexes",
    "title": "PostgreSQL · Índices",
    "url": "https://www.postgresql.org/docs/current/indexes.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "B-tree e índices parciais/únicos: benefício depende da consulta e dos dados",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-explain",
    "title": "PostgreSQL · EXPLAIN",
    "url": "https://www.postgresql.org/docs/current/using-explain.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "14.1: estimativas versus linhas/tempo observados; ANALYZE executa a consulta",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-transactions",
    "title": "PostgreSQL · Transações",
    "url": "https://www.postgresql.org/docs/current/tutorial-transactions.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "BEGIN, COMMIT e ROLLBACK; operações relacionadas atomicamente",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-isolation",
    "title": "PostgreSQL · Isolamento",
    "url": "https://www.postgresql.org/docs/current/transaction-iso.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "13.2.1: limites do Read Committed e operações simultâneas; aprofundamento posterior",
    "version": "PostgreSQL 18",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-pt",
    "title": "PostgreSQL em português · SQL",
    "url": "https://halleyoliv.gitlab.io/pgdocptbr/tutorial-sql.html",
    "language": "PT-BR",
    "type": "Tradução comunitária",
    "cost": "Gratuito",
    "section": "Capítulo 2: tradução para SQL básico",
    "version": "Tradução comunitária PostgreSQL 14.5",
    "note": "Complemento em português mais antigo; confrontar diferenças com a documentação 18, sem presumir tradução atualizada.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-er",
    "title": "BCcampus · Modelo entidade-relacionamento",
    "url": "https://opentextbc.ca/dbdesign01/chapter/chapter-8-entity-relationship-model/",
    "language": "Inglês",
    "type": "Livro aberto",
    "cost": "Gratuito",
    "section": "Capítulo 8: entidades, atributos, chaves e cardinalidade",
    "version": "Database Design, 2ª edição",
    "note": "Livro aberto; exemplos externos não são soluções dos desafios StackTrail.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-normal",
    "title": "BCcampus · Normalização",
    "url": "https://opentextbc.ca/dbdesign01/chapter/chapter-12-normalization/",
    "language": "Inglês",
    "type": "Livro aberto",
    "cost": "Gratuito",
    "section": "Capítulo 12: anomalias, dependências e 1FN–3FN; introdução BCNF",
    "version": "Database Design, 2ª edição",
    "note": "Limite: a simplificação sobre PK simples e 2FN não cobre outras chaves candidatas; avaliar dependências de todas as candidatas. BCNF requer determinantes superchaves para dependências não triviais.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-laravel-db",
    "title": "Laravel · database",
    "url": "https://laravel.com/docs/13.x/database",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Configuração PostgreSQL, SQL parametrizado e DB::transaction",
    "version": "Laravel 13.x",
    "note": "Usar PostgreSQL no banco de teste para constraints e tipos específicos; não substituir silenciosamente por SQLite.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-laravel-migrations",
    "title": "Laravel · migrations",
    "url": "https://laravel.com/docs/13.x/migrations",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Migrations up/down, índices e constraints; rollback apenas no desenvolvimento",
    "version": "Laravel 13.x",
    "note": "Usar PostgreSQL no banco de teste para constraints e tipos específicos; não substituir silenciosamente por SQLite.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-laravel-relations",
    "title": "Laravel · eloquent-relationships",
    "url": "https://laravel.com/docs/13.x/eloquent-relationships",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "belongsTo, hasMany, belongsToMany e eager loading",
    "version": "Laravel 13.x",
    "note": "Usar PostgreSQL no banco de teste para constraints e tipos específicos; não substituir silenciosamente por SQLite.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-laravel-seeds",
    "title": "Laravel · seeding",
    "url": "https://laravel.com/docs/13.x/seeding",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Seeders e geração controlada de dados sintéticos",
    "version": "Laravel 13.x",
    "note": "Usar PostgreSQL no banco de teste para constraints e tipos específicos; não substituir silenciosamente por SQLite.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-laravel-factories",
    "title": "Laravel · eloquent-factories",
    "url": "https://laravel.com/docs/13.x/eloquent-factories",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Factories e estados de teste",
    "version": "Laravel 13.x",
    "note": "Usar PostgreSQL no banco de teste para constraints e tipos específicos; não substituir silenciosamente por SQLite.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-laravel-query",
    "title": "Laravel · queries",
    "url": "https://laravel.com/docs/13.x/queries",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Query Builder: joins, bindings e consultas",
    "version": "Laravel 13.x",
    "note": "Usar PostgreSQL no banco de teste para constraints e tipos específicos; não substituir silenciosamente por SQLite.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-laravel-tests",
    "title": "Laravel · database-testing",
    "url": "https://laravel.com/docs/13.x/database-testing",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Banco de teste, RefreshDatabase e assertions de persistência",
    "version": "Laravel 13.x",
    "note": "Usar PostgreSQL no banco de teste para constraints e tipos específicos; não substituir silenciosamente por SQLite.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-pg-driver",
    "title": "node-postgres · driver",
    "url": "https://node-postgres.com/features/queries",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Consultas parametrizadas; valores e identificadores exigem tratamentos diferentes",
    "version": "pg 8.23.1 · documentação corrente",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-pg-pool",
    "title": "node-postgres · pool",
    "url": "https://node-postgres.com/features/pooling",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Pool, aquisição/liberação de conexão e encerramento no fim dos testes",
    "version": "pg 8.23.1 · documentação corrente",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-pg-tx",
    "title": "node-postgres · tx",
    "url": "https://node-postgres.com/features/transactions",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "BEGIN/COMMIT/ROLLBACK na mesma conexão; pool.query não representa uma sessão transacional",
    "version": "pg 8.23.1 · documentação corrente",
    "note": "",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-knex",
    "title": "Knex · Instalação",
    "url": "https://knexjs.org/guide/",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Instalação com pg, TypeScript e pool; query builder, não ORM de entidades",
    "version": "Knex 3.3.0 · guia corrente",
    "note": "Escolha da trilha TS: Knex + pg, alternativa de query builder autorizada; não presumir APIs Prisma/Eloquent.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-knex-migrations",
    "title": "Knex · migrations.html",
    "url": "https://knexjs.org/guide/migrations.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Migrations TypeScript, up/down e seeds; fixar versão no lockfile",
    "version": "Knex 3.3.0 · guia corrente",
    "note": "Escolha da trilha TS: Knex + pg, alternativa de query builder autorizada; não presumir APIs Prisma/Eloquent.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-knex-query",
    "title": "Knex · query-builder.html",
    "url": "https://knexjs.org/guide/query-builder.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Joins, consultas, relações explicitadas por chaves e paginação",
    "version": "Knex 3.3.0 · guia corrente",
    "note": "Escolha da trilha TS: Knex + pg, alternativa de query builder autorizada; não presumir APIs Prisma/Eloquent.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-knex-tx",
    "title": "Knex · transactions.html",
    "url": "https://knexjs.org/guide/transactions.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "Handler transacional e propagação de falha; usar trx nas operações relacionadas",
    "version": "Knex 3.3.0 · guia corrente",
    "note": "Escolha da trilha TS: Knex + pg, alternativa de query builder autorizada; não presumir APIs Prisma/Eloquent.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-matching",
    "title": "PostgreSQL · 9.7.1 LIKE e ILIKE",
    "url": "https://www.postgresql.org/docs/18/functions-matching.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "9.7.1 LIKE e ILIKE",
    "version": "PostgreSQL 18",
    "note": "Consulta documental; não é execução dos projetos do estudante.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-comparison",
    "title": "PostgreSQL · 9.2 BETWEEN, igualdade e IS NULL",
    "url": "https://www.postgresql.org/docs/18/functions-comparison.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "9.2 BETWEEN, igualdade e IS NULL",
    "version": "PostgreSQL 18",
    "note": "Consulta documental; não é execução dos projetos do estudante.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  },
  {
    "id": "05-ranges",
    "title": "PostgreSQL · 8.17: intervalos e constraints de exclusão; aprofundamento opcional",
    "url": "https://www.postgresql.org/docs/18/rangetypes.html",
    "language": "Inglês",
    "type": "Documentação oficial",
    "cost": "Gratuito",
    "section": "8.17: intervalos e constraints de exclusão; aprofundamento opcional",
    "version": "PostgreSQL 18",
    "note": "Consulta documental; não é execução dos projetos do estudante.",
    "checked": "2026-10-18",
    "adequacy": "2026-10-18"
  }
];

export const topics05: StudyTopic[] = [
  {
    "id": "05-modelo",
    "stageId": "05",
    "name": "Modelo relacional, chaves e cardinalidades",
    "goal": "Reconhecer SGBD, schema, tabelas, linhas, colunas e domínios; modelar entidades, cardinalidades e chaves candidatas, primárias, compostas e estrangeiras.",
    "before": [
      "Etapas 02–04: contratos HTTP, Git, validação, regras e testes básicos."
    ],
    "optional": false,
    "refs": [
      "05-er",
      "05-sql"
    ],
    "exerciseIds": [
      "05-ex-01",
      "05-ex-02"
    ],
    "competencies": [
      "Reconhecer SGBD, schema, tabelas, linhas, colunas e domínios; modelar entidades, cardinalidades e chaves candidatas, primárias, compostas e estrangeiras."
    ],
    "practiceCriteria": [
      "Apresentar ER com 1:1, 1:N e N:N, opcionalidade e chaves justificadas pelas regras do domínio."
    ],
    "track": "comum"
  },
  {
    "id": "05-normalizacao",
    "stageId": "05",
    "name": "Dependências e normalização até 3FN",
    "goal": "Investigar dependências funcionais e anomalias de inserção, atualização e exclusão; normalizar até 3FN e reconhecer BCNF.",
    "before": [
      "05-modelo"
    ],
    "optional": false,
    "refs": [
      "05-normal"
    ],
    "exerciseIds": [
      "05-ex-02"
    ],
    "competencies": [
      "Investigar dependências funcionais e anomalias de inserção, atualização e exclusão; normalizar até 3FN e reconhecer BCNF."
    ],
    "practiceCriteria": [
      "Justificar decomposições e reconstrução sem perdas a partir das dependências e de todas as chaves candidatas, sem apenas adicionar IDs artificiais."
    ],
    "track": "comum"
  },
  {
    "id": "05-sql",
    "stageId": "05",
    "name": "SQL manual: estrutura, escrita e filtros",
    "goal": "Escrever CREATE/ALTER/DROP TABLE, INSERT/UPDATE/DELETE e SELECT com DISTINCT/AS, WHERE, AND/OR, IN, BETWEEN, LIKE/ILIKE, IS NULL, ORDER BY e LIMIT/OFFSET.",
    "before": [
      "05-normalizacao"
    ],
    "optional": false,
    "refs": [
      "05-sql",
      "05-ddl",
      "05-select",
      "05-pt",
      "05-matching",
      "05-comparison"
    ],
    "exerciseIds": [
      "05-ex-01",
      "05-ex-03"
    ],
    "competencies": [
      "Escrever CREATE/ALTER/DROP TABLE, INSERT/UPDATE/DELETE e SELECT com DISTINCT/AS, WHERE, AND/OR, IN, BETWEEN, LIKE/ILIKE, IS NULL, ORDER BY e LIMIT/OFFSET."
    ],
    "practiceCriteria": [
      "Entregar scripts próprios de DDL/DML e consultas manuais; reproduzir nulos, filtros combinados e paginação com ordem determinística em banco descartável."
    ],
    "track": "comum"
  },
  {
    "id": "05-postgres",
    "stageId": "05",
    "name": "PostgreSQL local, psql e tipos",
    "goal": "Preparar instalação local, conexão e schemas; selecionar integer, numeric, varchar, boolean, date, timestamptz e uuid.",
    "before": [
      "05-sql"
    ],
    "optional": false,
    "refs": [
      "05-setup",
      "05-psql",
      "05-types"
    ],
    "exerciseIds": [
      "05-ex-01",
      "05-ex-03"
    ],
    "competencies": [
      "Preparar instalação local, conexão e schemas; selecionar integer, numeric, varchar, boolean, date, timestamptz e uuid."
    ],
    "practiceCriteria": [
      "Recriar o banco de estudo e documentar versão, conexão sem segredos, tipos e critérios de arredondamento/fuso."
    ],
    "track": "comum"
  },
  {
    "id": "05-agregacoes",
    "stageId": "05",
    "name": "Agregações e relatórios",
    "goal": "Escrever COUNT/SUM/AVG/MIN/MAX, GROUP BY e HAVING com resultados verificáveis.",
    "before": [
      "05-postgres"
    ],
    "optional": false,
    "refs": [
      "05-sql",
      "05-select"
    ],
    "exerciseIds": [
      "05-ex-03"
    ],
    "competencies": [
      "Escrever COUNT/SUM/AVG/MIN/MAX, GROUP BY e HAVING com resultados verificáveis."
    ],
    "practiceCriteria": [
      "Confrontar relatório com totais de uma fixture própria, distinguindo ausência, NULL, zero e pagamentos pendentes."
    ],
    "track": "comum"
  },
  {
    "id": "05-joins",
    "stageId": "05",
    "name": "JOINs, subconsultas, EXISTS e CTE",
    "goal": "Consultar relações com INNER/LEFT JOIN e WITH sem perder registros nem duplicar totais.",
    "before": [
      "05-agregacoes"
    ],
    "optional": false,
    "refs": [
      "05-joins",
      "05-exists",
      "05-cte"
    ],
    "exerciseIds": [
      "05-ex-04"
    ],
    "competencies": [
      "Consultar relações com INNER/LEFT JOIN e WITH sem perder registros nem duplicar totais."
    ],
    "practiceCriteria": [
      "Demonstrar preservação de registros sem correspondência e contagem correta diante de múltiplas entregas por cliente."
    ],
    "track": "comum"
  },
  {
    "id": "05-integridade",
    "stageId": "05",
    "name": "Constraints e regras de exclusão",
    "goal": "Projetar PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK e ON DELETE com CASCADE/RESTRICT.",
    "before": [
      "05-joins"
    ],
    "optional": false,
    "refs": [
      "05-constraints"
    ],
    "exerciseIds": [
      "05-ex-05"
    ],
    "competencies": [
      "Projetar PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK e ON DELETE com CASCADE/RESTRICT."
    ],
    "practiceCriteria": [
      "Testar violações diretamente em SQL e justificar regras da aplicação versus garantias locais do banco, incluindo NULL e exclusão de histórico."
    ],
    "track": "comum"
  },
  {
    "id": "05-indices",
    "stageId": "05",
    "name": "Índices B-tree e planos",
    "goal": "Investigar duas consultas com EXPLAIN e EXPLAIN ANALYZE antes/depois de índices.",
    "before": [
      "05-integridade"
    ],
    "optional": false,
    "refs": [
      "05-indexes",
      "05-explain"
    ],
    "exerciseIds": [
      "05-ex-08"
    ],
    "competencies": [
      "Investigar duas consultas com EXPLAIN e EXPLAIN ANALYZE antes/depois de índices."
    ],
    "practiceCriteria": [
      "Comparar planos com dados seletivos e não seletivos, registrar estatísticas e custo de escrita sem prometer melhoria universal."
    ],
    "track": "comum"
  },
  {
    "id": "05-transacoes",
    "stageId": "05",
    "name": "ACID, transações e limites de concorrência",
    "goal": "Usar BEGIN/COMMIT/ROLLBACK e demonstrar atomicidade de gravações relacionadas.",
    "before": [
      "05-indices"
    ],
    "optional": false,
    "refs": [
      "05-transactions",
      "05-isolation"
    ],
    "exerciseIds": [
      "05-ex-07",
      "05-ex-09"
    ],
    "competencies": [
      "Usar BEGIN/COMMIT/ROLLBACK e demonstrar atomicidade de gravações relacionadas."
    ],
    "practiceCriteria": [
      "Demonstrar sucesso e falha após a primeira escrita sem estado parcial; reconhecer limites da leitura seguida de escrita sob concorrência."
    ],
    "track": "comum"
  },
  {
    "id": "05-seguranca",
    "stageId": "05",
    "name": "SQL parametrizado e configuração segura",
    "goal": "Separar comandos e entradas externas; proteger configuração e o banco de teste.",
    "before": [
      "05-transacoes"
    ],
    "optional": false,
    "refs": [
      "05-pg-driver",
      "05-laravel-db"
    ],
    "exerciseIds": [
      "05-ex-06",
      "05-ex-09"
    ],
    "competencies": [
      "Separar comandos e entradas externas; proteger configuração e o banco de teste."
    ],
    "practiceCriteria": [
      "Rejeitar entrada malformada sem alterar a estrutura SQL e manter valores parametrizados, identificadores por allowlist e segredos fora do repositório."
    ],
    "track": "comum"
  },
  {
    "id": "05-laravel",
    "stageId": "05",
    "name": "Laravel: migrations, dados e relações",
    "goal": "Configurar PostgreSQL, migrations/rollback, seeders/factories, Eloquent e relações belongsTo/hasMany/belongsToMany.",
    "before": [
      "05-seguranca"
    ],
    "optional": false,
    "refs": [
      "05-laravel-db",
      "05-laravel-migrations",
      "05-laravel-seeds",
      "05-laravel-factories",
      "05-laravel-relations"
    ],
    "exerciseIds": [
      "05-ex-06"
    ],
    "competencies": [
      "Configurar PostgreSQL, migrations/rollback, seeders/factories, Eloquent e relações belongsTo/hasMany/belongsToMany."
    ],
    "practiceCriteria": [
      "Recriar e reverter o esquema descartável e persistir relações 1:N/N:N com dados sintéticos em PostgreSQL."
    ],
    "track": "php"
  },
  {
    "id": "05-laravel-api",
    "stageId": "05",
    "name": "Laravel: consultas, transações e testes",
    "goal": "Comparar SQL com Query Builder/Eloquent, investigar N+1/eager loading e integrar API com DB::transaction.",
    "before": [
      "05-laravel"
    ],
    "optional": false,
    "refs": [
      "05-laravel-query",
      "05-laravel-relations",
      "05-laravel-tests",
      "05-laravel-db"
    ],
    "exerciseIds": [
      "05-ex-06",
      "05-ex-09"
    ],
    "competencies": [
      "Comparar SQL com Query Builder/Eloquent, investigar N+1/eager loading e integrar API com DB::transaction."
    ],
    "practiceCriteria": [
      "Comparar resultados e quantidade de consultas, testar rollback e persistência após reiniciar a API em banco PostgreSQL separado."
    ],
    "track": "php"
  },
  {
    "id": "05-typescript",
    "stageId": "05",
    "name": "TypeScript: pg, Knex, migrations e relações",
    "goal": "Configurar driver, pool, ambiente, schema e migrations/rollback com Knex; explicitar relações no query builder.",
    "before": [
      "05-seguranca"
    ],
    "optional": false,
    "refs": [
      "05-pg-driver",
      "05-pg-pool",
      "05-knex",
      "05-knex-migrations"
    ],
    "exerciseIds": [
      "05-ex-06"
    ],
    "competencies": [
      "Configurar driver, pool, ambiente, schema e migrations/rollback com Knex; explicitar relações no query builder."
    ],
    "practiceCriteria": [
      "Recriar esquema em PostgreSQL usando migrations versionadas e seeds sintéticas; encerrar o pool e comparar com SQL manual."
    ],
    "track": "javascript"
  },
  {
    "id": "05-typescript-api",
    "stageId": "05",
    "name": "TypeScript: consultas, transações e testes",
    "goal": "Integrar consultas/joins/paginação e transações Knex à API Express com testes de integração e erros controlados.",
    "before": [
      "05-typescript"
    ],
    "optional": false,
    "refs": [
      "05-knex-query",
      "05-knex-tx",
      "05-pg-tx",
      "05-pg-pool"
    ],
    "exerciseIds": [
      "05-ex-06",
      "05-ex-09"
    ],
    "competencies": [
      "Integrar consultas/joins/paginação e transações Knex à API Express com testes de integração e erros controlados."
    ],
    "practiceCriteria": [
      "Comparar SQL e builder, medir consultas repetidas, comprovar rollback e persistência após reiniciar a API; liberar conexões."
    ],
    "track": "javascript"
  },
  {
    "id": "05-intervalos",
    "stageId": "05",
    "name": "Aprofundamento: slots e intervalos",
    "goal": "Reconhecer limites de UNIQUE para intervalos e investigar índices parciais, ranges e exclusion constraints.",
    "before": [
      "05-integridade"
    ],
    "optional": true,
    "refs": [
      "05-constraints",
      "05-indexes",
      "05-isolation",
      "05-ranges"
    ],
    "exerciseIds": [
      "05-ex-05"
    ],
    "competencies": [
      "Reconhecer limites de UNIQUE para intervalos e investigar índices parciais, ranges e exclusion constraints."
    ],
    "practiceCriteria": [
      "Distinguir slot fixo duplicado de intervalos sobrepostos; registrar o que o esquema garante e o que fica para a Etapa 10."
    ],
    "track": "comum"
  }
];

export const tasks05: Activity[] = [
  {
    "id": "05-ex-01",
    "slug": "05-ex-01",
    "stageId": "05",
    "kind": "exercise",
    "track": "comum",
    "sector": "E-commerce",
    "title": "E-commerce: catálogo e estoque",
    "level": "inicial",
    "optional": false,
    "topicIds": [
      "05-modelo",
      "05-sql",
      "05-postgres"
    ],
    "context": "A loja fictícia Vitrine Sul perde o rastro das entradas e saídas de mercadorias.",
    "problem": "Modele produtos, categorias e movimentações para consultar disponibilidade e origem do saldo, sem confundir estoque com vendas.",
    "statement": "Modele produtos, categorias e movimentações para consultar disponibilidade e origem do saldo, sem confundir estoque com vendas.",
    "objectives": [
      "Modelar produto pertencente a uma categoria e categoria com vários produtos; justificar chaves e opcionalidades."
    ],
    "competencies": [
      "Reconhecer SGBD, schema, tabelas, linhas, colunas e domínios; modelar entidades, cardinalidades e chaves candidatas, primárias, compostas e estrangeiras.",
      "Escrever CREATE/ALTER/DROP TABLE, INSERT/UPDATE/DELETE e SELECT com DISTINCT/AS, WHERE, AND/OR, IN, BETWEEN, LIKE/ILIKE, IS NULL, ORDER BY e LIMIT/OFFSET.",
      "Preparar instalação local, conexão e schemas; selecionar integer, numeric, varchar, boolean, date, timestamptz e uuid."
    ],
    "prerequisites": [
      "Identificar entidades/chaves/cardinalidades no tópico 05-modelo.",
      "Escrever DDL/DML e conectar via psql após os tópicos 05-sql e 05-postgres; reconhecer PK/FK na referência de constraints."
    ],
    "requirements": [
      "Modelar produto pertencente a uma categoria e categoria com vários produtos; justificar chaves e opcionalidades.",
      "Registrar saldo atual inteiro não negativo por produto e movimentações de entrada/saída com quantidade positiva, direção e data; na fixture sequencial, atualizar saldo e registrar movimento manualmente. Atomicidade será aprofundada no exercício 07.",
      "Criar esquema, inserir fixture própria e escrever SQL para produtos por categoria e sem estoque.",
      "Usar ALTER TABLE em evolução controlada e demonstrar DROP TABLE somente em cópia descartável.",
      "Escrever UPDATE para corrigir descrição de um produto e DELETE para remover um rascunho de produto sem movimentações; registrar antes/depois e condição WHERE. Não remover histórico movimentado."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Sem ORM neste desafio; entregar SQL próprio."
    ],
    "io": [
      "Entrada: fixture sintética definida pelo estudante conforme os casos abaixo.",
      "Saída: esquema/consultas e evidências verificáveis para as regras descritas."
    ],
    "acceptanceCriteria": [
      "PK duplicada e movimentação de produto inexistente são rejeitadas.",
      "Consultas simples pelo saldo atual incluem produto sem movimentação com saldo inicial zero; na fixture sequencial, entrada 10 e saída 4 resultam em saldo atual 6, conferido com os movimentos.",
      "Consulta por categoria não mistura produtos homônimos com IDs distintos."
    ],
    "testIdeas": [
      "Produto A: entrada 10 e saída 4; B: sem movimento; C: entrada 3 e saída 3.",
      "Categoria sem produto; nome repetido; quantidade zero e referência inexistente."
    ],
    "refs": [
      "05-er",
      "05-sql",
      "05-ddl",
      "05-types",
      "05-constraints",
      "05-matching",
      "05-comparison"
    ],
    "hints": [
      "Liste quais fatos precisam permanecer rastreáveis quando o saldo muda.",
      "Investigue chaves e filtros simples sobre o saldo atual; deixe reconciliação agregada para o exercício 03.",
      "Rastreie uma entrada seguida de uma saída e confira o estado final com sua fixture."
    ],
    "rubric": [
      "Avaliação consultiva por critério: Atendido / Parcialmente atendido / Não atendido / Não verificado; sem nota automática.",
      "Modelagem e SQL: justificar escolhas aplicáveis e confrontar a fixture com casos negativos.",
      "Integridade e evidência: demonstrar rejeição/rollback quando exigidos, sem inventar execução.",
      "Reprodução e limites: registrar versão, comandos, resultados reais e competências ainda não verificadas. A ponderação 25/25/20/15/15 e meta 8/10 pertencem ao projeto integrado."
    ],
    "deliverables": [
      "Modelo/decisões e scripts SQL próprios, fixture sintética e instruções reproduzíveis.",
      "Registro de casos: esperado, observado, comando, versão e limitações; sem execução inventada."
    ]
  },
  {
    "id": "05-ex-02",
    "slug": "05-ex-02",
    "stageId": "05",
    "kind": "exercise",
    "track": "comum",
    "sector": "RH",
    "title": "RH: normalização de colaboradores",
    "level": "inicial",
    "optional": false,
    "topicIds": [
      "05-modelo",
      "05-normalizacao",
      "05-sql"
    ],
    "context": "A fictícia Equipe Clara repete departamento, gestor e habilidades em cada linha de colaborador.",
    "problem": "Produza uma proposta normalizada a partir de uma planilha ruim e comprove preservação da informação.",
    "statement": "Produza uma proposta normalizada a partir de uma planilha ruim e comprove preservação da informação.",
    "objectives": [
      "Partir dos campos colaborador_id, nome, departamento_id, departamento_nome, gestor_id, gestor_nome e lista de habilidades; criar ao menos quatro registros sintéticos."
    ],
    "competencies": [
      "Reconhecer SGBD, schema, tabelas, linhas, colunas e domínios; modelar entidades, cardinalidades e chaves candidatas, primárias, compostas e estrangeiras.",
      "Investigar dependências funcionais e anomalias de inserção, atualização e exclusão; normalizar até 3FN e reconhecer BCNF.",
      "Escrever CREATE/ALTER/DROP TABLE, INSERT/UPDATE/DELETE e SELECT com DISTINCT/AS, WHERE, AND/OR, IN, BETWEEN, LIKE/ILIKE, IS NULL, ORDER BY e LIMIT/OFFSET."
    ],
    "prerequisites": [
      "Identificar candidatas e cardinalidades e representar ER no tópico 05-modelo.",
      "Rastrear dependências e anomalias no tópico 05-normalizacao; criar tabelas no PostgreSQL."
    ],
    "requirements": [
      "Partir dos campos colaborador_id, nome, departamento_id, departamento_nome, gestor_id, gestor_nome e lista de habilidades; criar ao menos quatro registros sintéticos.",
      "Declarar regras: colaborador pertence a um departamento; departamento possui um gestor; uma pessoa pode gerir vários departamentos; colaboradores têm várias habilidades compartilhadas. Cada colaborador pode ter no máximo uma ficha de admissão interna fictícia e cada ficha pertence a um único colaborador; modelar essa relação 1:1 sem usar dados reais.",
      "Identificar dependências e candidatas, exemplificar anomalias de inserção/atualização/exclusão e propor decomposição até 3FN.",
      "Entregar DDL e justificar como reconstituir a informação sem apresentar o modelo como única solução."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Sem ORM neste desafio; entregar SQL próprio."
    ],
    "io": [
      "Entrada: fixture sintética definida pelo estudante conforme os casos abaixo.",
      "Saída: esquema/consultas e evidências verificáveis para as regras descritas."
    ],
    "acceptanceCriteria": [
      "Habilidades não ficam em lista repetida na célula; dependências são justificadas pelas regras, não só pela amostra.",
      "Alterar nome de um departamento não exige atualizar cópias em colaboradores.",
      "Reconstrução mantém os vínculos originais sem gerar combinações espúrias; a remoção do último colaborador não apaga o departamento.",
      "Introdução à BCNF identifica uma dependência não trivial e verifica se o determinante é superchave."
    ],
    "testIdeas": [
      "Dois colaboradores no mesmo departamento com duas habilidades em comum.",
      "Departamento ainda sem colaborador e gestor responsável por dois departamentos."
    ],
    "refs": [
      "05-er",
      "05-normal",
      "05-ddl",
      "05-constraints"
    ],
    "hints": [
      "Investigue quais fatos mudam independentemente de um colaborador.",
      "Use as dependências funcionais da referência e examine todas as chaves candidatas.",
      "Confronte a proposta com inserir um departamento vazio e remover o último colaborador."
    ],
    "rubric": [
      "Avaliação consultiva por critério: Atendido / Parcialmente atendido / Não atendido / Não verificado; sem nota automática.",
      "Modelagem e SQL: justificar escolhas aplicáveis e confrontar a fixture com casos negativos.",
      "Integridade e evidência: demonstrar rejeição/rollback quando exigidos, sem inventar execução.",
      "Reprodução e limites: registrar versão, comandos, resultados reais e competências ainda não verificadas. A ponderação 25/25/20/15/15 e meta 8/10 pertencem ao projeto integrado."
    ],
    "deliverables": [
      "Modelo/decisões e scripts SQL próprios, fixture sintética e instruções reproduzíveis.",
      "Registro de casos: esperado, observado, comando, versão e limitações; sem execução inventada."
    ]
  },
  {
    "id": "05-ex-03",
    "slug": "05-ex-03",
    "stageId": "05",
    "kind": "exercise",
    "track": "comum",
    "sector": "Educação",
    "title": "Educação: relatórios SQL de matrículas",
    "level": "inicial",
    "optional": false,
    "topicIds": [
      "05-sql",
      "05-postgres",
      "05-agregacoes",
      "05-joins"
    ],
    "context": "A fictícia Trilho Cursos precisa conciliar matrículas e pagamentos sem inflar receitas.",
    "problem": "Crie uma fixture auditável e consultas manuais com resultados que outra pessoa consiga conferir.",
    "statement": "Crie uma fixture auditável e consultas manuais com resultados que outra pessoa consiga conferir.",
    "objectives": [
      "Modelar alunos, cursos, matrículas únicas por aluno/curso e vários pagamentos por matrícula; registrar valor devido e status de pagamento."
    ],
    "competencies": [
      "Escrever CREATE/ALTER/DROP TABLE, INSERT/UPDATE/DELETE e SELECT com DISTINCT/AS, WHERE, AND/OR, IN, BETWEEN, LIKE/ILIKE, IS NULL, ORDER BY e LIMIT/OFFSET.",
      "Preparar instalação local, conexão e schemas; selecionar integer, numeric, varchar, boolean, date, timestamptz e uuid.",
      "Escrever COUNT/SUM/AVG/MIN/MAX, GROUP BY e HAVING com resultados verificáveis."
    ],
    "prerequisites": [
      "Executar SELECT com filtros e DDL/DML manualmente.",
      "Estudar 05-agregacoes e 05-joins antes deste relatório integrado: demonstrar agrupamento e preservação de linha sem correspondência."
    ],
    "requirements": [
      "Modelar alunos, cursos, matrículas únicas por aluno/curso e vários pagamentos por matrícula; registrar valor devido e status de pagamento.",
      "Escrever pelo menos oito consultas de filtros, ordenação, COUNT/SUM/AVG/MIN/MAX, GROUP BY/HAVING; completar um caderno de 15 consultas manuais com os exercícios 01/04.",
      "Listar matrículas no intervalo declarado, popularidade por quantidade de matrículas e receita por soma apenas dos pagamentos confirmados.",
      "Consultar cursos sem matrículas e alunos com valor confirmado menor que o devido; usar DISTINCT/AS, filtros AND/OR/IN/BETWEEN/LIKE/ILIKE/IS NULL e paginação estável em consultas pertinentes.",
      "Incluir no caderno uma consulta de reconciliação entre saldo atual e soma dos movimentos do exercício 01 e investigar uma divergência sintética introduzida manualmente."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Sem ORM neste desafio; entregar SQL próprio."
    ],
    "io": [
      "Entrada: fixture sintética definida pelo estudante conforme os casos abaixo.",
      "Saída: esquema/consultas e evidências verificáveis para as regras descritas."
    ],
    "acceptanceCriteria": [
      "Fixture contém curso A: duas matrículas de 100, pagamentos confirmados de 100 e 40; receita A = 140 e um aluno pendente.",
      "Curso B sem matrículas continua visível no relatório exigido com receita zero.",
      "Pagamentos pendentes/cancelados não entram na receita; vários pagamentos não duplicam contagem de matrículas.",
      "Limites do período, igualdade em HAVING e nulos têm resultado esperado documentado antes da execução."
    ],
    "testIdeas": [
      "Pagamento dividido em 40+60 para a mesma matrícula, comparado ao pagamento único de 100.",
      "Valor devido zero; matrícula na fronteira do período; dois alunos homônimos."
    ],
    "refs": [
      "05-sql",
      "05-select",
      "05-joins",
      "05-pt",
      "05-exists",
      "05-matching",
      "05-comparison"
    ],
    "hints": [
      "Defina a unidade contada e o que receita significa antes de consultar.",
      "Investigue agregações e efeito das relações 1:N no total.",
      "Monte uma conferência manual pequena antes de ampliar a fixture."
    ],
    "rubric": [
      "Avaliação consultiva por critério: Atendido / Parcialmente atendido / Não atendido / Não verificado; sem nota automática.",
      "Modelagem e SQL: justificar escolhas aplicáveis e confrontar a fixture com casos negativos.",
      "Integridade e evidência: demonstrar rejeição/rollback quando exigidos, sem inventar execução.",
      "Reprodução e limites: registrar versão, comandos, resultados reais e competências ainda não verificadas. A ponderação 25/25/20/15/15 e meta 8/10 pertencem ao projeto integrado."
    ],
    "deliverables": [
      "Modelo/decisões e scripts SQL próprios, fixture sintética e instruções reproduzíveis.",
      "Registro de casos: esperado, observado, comando, versão e limitações; sem execução inventada."
    ]
  },
  {
    "id": "05-ex-04",
    "slug": "05-ex-04",
    "stageId": "05",
    "kind": "exercise",
    "track": "comum",
    "sector": "Logística",
    "title": "Logística: entregas e desempenho",
    "level": "intermediario",
    "optional": false,
    "topicIds": [
      "05-joins",
      "05-agregacoes"
    ],
    "context": "A transportadora fictícia Rota Curta não enxerga motoristas ociosos e atrasos por região.",
    "problem": "Relacione entregas, motoristas, veículos, clientes e regiões sem excluir quem não possui entregas.",
    "statement": "Relacione entregas, motoristas, veículos, clientes e regiões sem excluir quem não possui entregas.",
    "objectives": [
      "Definir atraso como entrega concluída após prazo ou entrega aberta cujo prazo é anterior ao instante de corte fixo; canceladas não entram."
    ],
    "competencies": [
      "Escrever COUNT/SUM/AVG/MIN/MAX, GROUP BY e HAVING com resultados verificáveis.",
      "Consultar relações com INNER/LEFT JOIN e WITH sem perder registros nem duplicar totais."
    ],
    "prerequisites": [
      "Conferir os objetivos e critérios dos tópicos relacionados antes de iniciar."
    ],
    "requirements": [
      "Definir atraso como entrega concluída após prazo ou entrega aberta cujo prazo é anterior ao instante de corte fixo; canceladas não entram.",
      "Criar consultas INNER/LEFT JOIN, subconsulta, EXISTS e CTE não recursiva.",
      "Listar atrasos, motoristas sem entregas, totais por região e clientes recorrentes (ao menos duas entregas não canceladas no período).",
      "Registrar corte temporal, fuso, denominador do desempenho e justificativa de multiplicidade."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Sem ORM neste desafio; entregar SQL próprio."
    ],
    "io": [
      "Entrada: fixture sintética definida pelo estudante conforme os casos abaixo.",
      "Saída: esquema/consultas e evidências verificáveis para as regras descritas."
    ],
    "acceptanceCriteria": [
      "Motorista sem entrega e região vazia aparecem nos relatórios de ausência/total pertinentes.",
      "Duas entregas de um cliente não duplicam valores por ligação incorreta com veículo ou região.",
      "Na fixture: prazo igual ao corte não é atraso; entrega aberta com prazo anterior é; entrega cancelada fica fora.",
      "CTE e alternativa sem CTE concordam para a mesma fixture."
    ],
    "testIdeas": [
      "Três motoristas: um com duas entregas, outro com uma cancelada e outro sem nenhuma.",
      "Região sem entrega e cliente com entrega exatamente no prazo."
    ],
    "refs": [
      "05-joins",
      "05-exists",
      "05-cte",
      "05-select",
      "05-types"
    ],
    "hints": [
      "Declare o denominador e o instante de corte de cada relatório.",
      "Investigue onde um filtro em uma relação opcional muda o resultado de LEFT JOIN.",
      "Adicione uma entidade sem correspondência e uma com duas correspondências para confrontar sua consulta."
    ],
    "rubric": [
      "Avaliação consultiva por critério: Atendido / Parcialmente atendido / Não atendido / Não verificado; sem nota automática.",
      "Modelagem e SQL: justificar escolhas aplicáveis e confrontar a fixture com casos negativos.",
      "Integridade e evidência: demonstrar rejeição/rollback quando exigidos, sem inventar execução.",
      "Reprodução e limites: registrar versão, comandos, resultados reais e competências ainda não verificadas. A ponderação 25/25/20/15/15 e meta 8/10 pertencem ao projeto integrado."
    ],
    "deliverables": [
      "Modelo/decisões e scripts SQL próprios, fixture sintética e instruções reproduzíveis.",
      "Registro de casos: esperado, observado, comando, versão e limitações; sem execução inventada."
    ]
  },
  {
    "id": "05-ex-05",
    "slug": "05-ex-05",
    "stageId": "05",
    "kind": "exercise",
    "track": "comum",
    "sector": "SaaS",
    "title": "SaaS: integridade de assinaturas",
    "level": "intermediario",
    "optional": false,
    "topicIds": [
      "05-integridade"
    ],
    "context": "A fictícia Nuvem Equipes registra assinaturas duplicadas e remove faturas ao excluir empresas.",
    "problem": "Modele empresas, planos, assinaturas e faturas com políticas explícitas de integridade e retenção.",
    "statement": "Modele empresas, planos, assinaturas e faturas com políticas explícitas de integridade e retenção.",
    "objectives": [
      "Definir uma única assinatura ativa por empresa como regra do laboratório; histórico cancelado permanece."
    ],
    "competencies": [
      "Projetar PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK e ON DELETE com CASCADE/RESTRICT."
    ],
    "prerequisites": [
      "Conferir os objetivos e critérios dos tópicos relacionados antes de iniciar."
    ],
    "requirements": [
      "Definir uma única assinatura ativa por empresa como regra do laboratório; histórico cancelado permanece.",
      "Aplicar PK/FK/UNIQUE/NOT NULL/CHECK; impedir valores monetários negativos e códigos de fatura duplicados por empresa.",
      "Escolher ON DELETE para impedir perda de faturas e demonstrar CASCADE apenas em relação descartável justificada.",
      "Testar comandos SQL diretos inválidos e explicar NULL, unicidade parcial e limitações de regras temporais."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Sem ORM neste desafio; entregar SQL próprio."
    ],
    "io": [
      "Entrada: fixture sintética definida pelo estudante conforme os casos abaixo.",
      "Saída: esquema/consultas e evidências verificáveis para as regras descritas."
    ],
    "acceptanceCriteria": [
      "Uma segunda assinatura ativa da mesma empresa é rejeitada no banco; duas canceladas históricas não são bloqueadas indevidamente.",
      "NULL em campo obrigatório, plano inexistente e valor negativo são rejeitados sem mutação parcial.",
      "Excluir empresa com fatura é recusado ou preserva o histórico conforme política declarada, sem exclusão silenciosa.",
      "O relatório distingue unicidade do estado ativo de sobreposição de intervalos; UNIQUE simples não é apresentada como solução universal."
    ],
    "testIdeas": [
      "Assinatura cancelada seguida de ativa; duas tentativas de ativa; fatura com empresa inexistente.",
      "Intervalos diferentes mas sobrepostos usados como contraexemplo conceitual, não implementação obrigatória de EXCLUDE."
    ],
    "refs": [
      "05-constraints",
      "05-indexes",
      "05-types"
    ],
    "hints": [
      "Separe regras por linha, por referência e por conjunto de linhas.",
      "Consulte índices únicos parciais e semântica de NULL nas constraints.",
      "Teste SQL fora da aplicação e confronte o estado após uma operação rejeitada."
    ],
    "rubric": [
      "Avaliação consultiva por critério: Atendido / Parcialmente atendido / Não atendido / Não verificado; sem nota automática.",
      "Modelagem e SQL: justificar escolhas aplicáveis e confrontar a fixture com casos negativos.",
      "Integridade e evidência: demonstrar rejeição/rollback quando exigidos, sem inventar execução.",
      "Reprodução e limites: registrar versão, comandos, resultados reais e competências ainda não verificadas. A ponderação 25/25/20/15/15 e meta 8/10 pertencem ao projeto integrado."
    ],
    "deliverables": [
      "Modelo/decisões e scripts SQL próprios, fixture sintética e instruções reproduzíveis.",
      "Registro de casos: esperado, observado, comando, versão e limitações; sem execução inventada."
    ]
  },
  {
    "id": "05-ex-06",
    "slug": "05-ex-06",
    "stageId": "05",
    "kind": "exercise",
    "track": "ambas",
    "sector": "Saúde",
    "title": "Saúde: persistência de atendimentos",
    "level": "intermediario",
    "optional": false,
    "topicIds": [
      "05-integridade",
      "05-seguranca",
      "05-laravel",
      "05-laravel-api",
      "05-typescript",
      "05-typescript-api"
    ],
    "context": "A clínica fictícia Horizonte precisa preservar atendimentos e especialidades após reiniciar a API.",
    "problem": "Implemente migrations e persistência na única stack escolhida com dados totalmente sintéticos.",
    "statement": "Implemente migrations e persistência na única stack escolhida com dados totalmente sintéticos.",
    "objectives": [
      "Modelar pacientes fictícios, profissionais, especialidades e atendimentos; profissional pode ter várias especialidades e especialidade vários profissionais."
    ],
    "competencies": [
      "Projetar PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK e ON DELETE com CASCADE/RESTRICT.",
      "Separar comandos e entradas externas; proteger configuração e o banco de teste.",
      "Configurar PostgreSQL, migrations/rollback, seeders/factories, Eloquent e relações belongsTo/hasMany/belongsToMany.",
      "Comparar SQL com Query Builder/Eloquent, investigar N+1/eager loading e integrar API com DB::transaction.",
      "Configurar driver, pool, ambiente, schema e migrations/rollback com Knex; explicitar relações no query builder.",
      "Integrar consultas/joins/paginação e transações Knex à API Express com testes de integração e erros controlados."
    ],
    "prerequisites": [
      "Conferir os objetivos e critérios dos tópicos relacionados antes de iniciar.",
      "Modelagem, SQL manual, PostgreSQL e constraints praticados antes da integração."
    ],
    "requirements": [
      "Modelar pacientes fictícios, profissionais, especialidades e atendimentos; profissional pode ter várias especialidades e especialidade vários profissionais.",
      "Laravel: PostgreSQL, migrations/rollback, seeders/factories, Eloquent belongsTo/hasMany/belongsToMany e Query Builder; TS: pg/pool, migrations/seeds Knex, schema com FKs e consultas explícitas das relações.",
      "Implementar listagem paginada por profissional com relações e registrar SQL equivalente manual; medir quantidade de consultas antes/depois de eager loading ou consulta em lote.",
      "Testar persistência, exclusão referencial, erro de entrada e rollback de migration em banco descartável; registrar versões e .env.example sem valores reais."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Escolher somente Laravel/Eloquent OU Express/TypeScript com Knex 3.3 + pg 8.23; registrar versões no lockfile e tipos @types/pg. Não usar SQLite para testar recursos PostgreSQL."
    ],
    "io": [
      "Entrada: fixture sintética definida pelo estudante conforme os casos abaixo.",
      "Saída: esquema/consultas e evidências verificáveis para as regras descritas."
    ],
    "acceptanceCriteria": [
      "Atendimento continua consultável após reiniciar a API; relação N:N não duplica vínculo.",
      "Listar 1 e 20 atendimentos não provoca uma consulta extra por item após a correção medida.",
      "Migração cria o esquema em banco vazio e rollback controlado restaura a estrutura anterior; testes usam PostgreSQL separado.",
      "Entrada com aspas e texto semelhante a SQL permanece dado, sem alterar comando; profissional inexistente é recusado."
    ],
    "testIdeas": [
      "Sem atendimentos, profissional com duas especialidades, paciente com dois atendimentos e FK inválida.",
      "Rodada de teste repetida isola/limpa apenas banco sintético; conexões encerram ao terminar."
    ],
    "refs": [
      "05-laravel-migrations",
      "05-laravel-seeds",
      "05-laravel-factories",
      "05-laravel-relations",
      "05-laravel-tests",
      "05-laravel-query",
      "05-pg-driver",
      "05-pg-pool",
      "05-knex",
      "05-knex-migrations",
      "05-knex-query"
    ],
    "hints": [
      "Identifique quais relações precisam existir antes da primeira gravação.",
      "Compare SQL, Eloquent/Query Builder ou Knex e inspecione consultas repetidas.",
      "Reinicie a API e execute o mesmo roteiro contra banco de teste separado para distinguir memória de persistência."
    ],
    "rubric": [
      "Avaliação consultiva por critério: Atendido / Parcialmente atendido / Não atendido / Não verificado; sem nota automática.",
      "Modelagem e SQL: justificar escolhas aplicáveis e confrontar a fixture com casos negativos.",
      "Integridade e evidência: demonstrar rejeição/rollback quando exigidos, sem inventar execução.",
      "Reprodução e limites: registrar versão, comandos, resultados reais e competências ainda não verificadas. A ponderação 25/25/20/15/15 e meta 8/10 pertencem ao projeto integrado."
    ],
    "deliverables": [
      "Modelo/decisões e scripts SQL próprios, fixture sintética e instruções reproduzíveis.",
      "Registro de casos: esperado, observado, comando, versão e limitações; sem execução inventada."
    ]
  },
  {
    "id": "05-ex-07",
    "slug": "05-ex-07",
    "stageId": "05",
    "kind": "exercise",
    "track": "comum",
    "sector": "Financeiro",
    "title": "Fintech: transferência atômica",
    "level": "avancado",
    "optional": false,
    "topicIds": [
      "05-transacoes",
      "05-integridade"
    ],
    "context": "A fintech fictícia Ponte Valores encontrou débitos sem crédito correspondente em uma simulação.",
    "problem": "Produza uma operação SQL transacional de transferência com histórico e falha controlada.",
    "statement": "Produza uma operação SQL transacional de transferência com histórico e falha controlada.",
    "objectives": [
      "Usar contas sintéticas, NUMERIC com escala declarada e histórico de transferência; valor estritamente positivo, contas distintas e saldo suficiente."
    ],
    "competencies": [
      "Projetar PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK e ON DELETE com CASCADE/RESTRICT.",
      "Usar BEGIN/COMMIT/ROLLBACK e demonstrar atomicidade de gravações relacionadas."
    ],
    "prerequisites": [
      "Conferir os objetivos e critérios dos tópicos relacionados antes de iniciar."
    ],
    "requirements": [
      "Usar contas sintéticas, NUMERIC com escala declarada e histórico de transferência; valor estritamente positivo, contas distintas e saldo suficiente.",
      "Registrar débito, crédito e histórico na mesma transação; demonstrar BEGIN/COMMIT/ROLLBACK.",
      "Introduzir falha após débito e antes do crédito, inspecionar o estado e testar saldo insuficiente.",
      "Documentar hipótese de execução sequencial do laboratório e contraexemplo de duas operações que leem o mesmo saldo; controles avançados ficam na Etapa 10."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Sem ORM neste desafio; entregar SQL próprio."
    ],
    "io": [
      "Entrada: fixture sintética definida pelo estudante conforme os casos abaixo.",
      "Saída: esquema/consultas e evidências verificáveis para as regras descritas."
    ],
    "acceptanceCriteria": [
      "Conta A=100 e B=20, transferência de 30 resulta em A=70 e B=50, soma preservada e histórico único.",
      "Falha intermediária ou saldo insuficiente preserva ambos os saldos e não deixa histórico de sucesso.",
      "Zero, valor negativo, conta ausente e mesma conta são recusados sem alteração.",
      "Não afirma que uma transação simples com leitura seguida de escrita elimina corridas concorrentes."
    ],
    "testIdeas": [
      "Falha após primeira escrita; transferência do saldo exato e uma acima do saldo.",
      "Duas solicitações simultâneas descritas como hipótese de risco, separadas de testes realmente executados."
    ],
    "refs": [
      "05-transactions",
      "05-isolation",
      "05-types",
      "05-constraints"
    ],
    "hints": [
      "Liste os fatos que precisam confirmar ou falhar juntos.",
      "Consulte transações e os limites do isolamento padrão; diferencie atomicidade de concorrência.",
      "Compare todos os saldos e históricos antes/depois de uma falha intermediária."
    ],
    "rubric": [
      "Avaliação consultiva por critério: Atendido / Parcialmente atendido / Não atendido / Não verificado; sem nota automática.",
      "Modelagem e SQL: justificar escolhas aplicáveis e confrontar a fixture com casos negativos.",
      "Integridade e evidência: demonstrar rejeição/rollback quando exigidos, sem inventar execução.",
      "Reprodução e limites: registrar versão, comandos, resultados reais e competências ainda não verificadas. A ponderação 25/25/20/15/15 e meta 8/10 pertencem ao projeto integrado."
    ],
    "deliverables": [
      "Modelo/decisões e scripts SQL próprios, fixture sintética e instruções reproduzíveis.",
      "Registro de casos: esperado, observado, comando, versão e limitações; sem execução inventada."
    ]
  },
  {
    "id": "05-ex-08",
    "slug": "05-ex-08",
    "stageId": "05",
    "kind": "exercise",
    "track": "comum",
    "sector": "Marketplace",
    "title": "Marketplace: investigação de consultas lentas",
    "level": "avancado",
    "optional": false,
    "topicIds": [
      "05-indices",
      "05-joins"
    ],
    "context": "A fictícia Praça Digital precisa entender consultas de pedidos antes de adicionar índices indiscriminadamente.",
    "problem": "Compare dois planos de consultas seletivas e abrangentes e defenda uma decisão baseada em medições.",
    "statement": "Compare dois planos de consultas seletivas e abrangentes e defenda uma decisão baseada em medições.",
    "objectives": [
      "Gerar deterministicamente ao menos 100 mil pedidos, 10 mil produtos e distribuição assimétrica de status/datas; registrar semente, volume, versão e hardware."
    ],
    "competencies": [
      "Consultar relações com INNER/LEFT JOIN e WITH sem perder registros nem duplicar totais.",
      "Investigar duas consultas com EXPLAIN e EXPLAIN ANALYZE antes/depois de índices."
    ],
    "prerequisites": [
      "Conferir os objetivos e critérios dos tópicos relacionados antes de iniciar."
    ],
    "requirements": [
      "Gerar deterministicamente ao menos 100 mil pedidos, 10 mil produtos e distribuição assimétrica de status/datas; registrar semente, volume, versão e hardware.",
      "Atualizar estatísticas com ANALYZE e escolher duas consultas: filtro seletivo por status/data e relatório com JOIN/agregação.",
      "Registrar EXPLAIN e EXPLAIN ANALYZE antes/depois de B-tree justificado; repetir medições, preservando resultado e fixture.",
      "Comparar estimativas/linhas observadas, tipo de scan, tempo e efeito de cache; registrar custo de escrita/espaço e situação na qual o índice não ajuda."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Sem ORM neste desafio; entregar SQL próprio."
    ],
    "io": [
      "Entrada: fixture sintética definida pelo estudante conforme os casos abaixo.",
      "Saída: esquema/consultas e evidências verificáveis para as regras descritas."
    ],
    "acceptanceCriteria": [
      "Os resultados das consultas são iguais antes/depois; o relatório inclui planos originais, volumes e repetições, não apenas tempo final.",
      "Compara filtro seletivo e não seletivo e explica eventual escolha de scan sequencial sem rotulá-la erro automático.",
      "ANALYZE é usado em SELECT no banco descartável: execução real e seus riscos estão explícitos.",
      "Nenhum limiar universal de milissegundos nem promessa de ganho por todo índice é imposto."
    ],
    "testIdeas": [
      "Distribuição com 90% em um status e 1% em outro; intervalo sem pedidos.",
      "Três execuções por configuração; registrar aquecimento/cache sem extrapolar para produção."
    ],
    "refs": [
      "05-indexes",
      "05-explain",
      "05-joins"
    ],
    "hints": [
      "Escolha uma pergunta de negócio e uma distribuição que tornem o plano investigável.",
      "Consulte EXPLAIN, estatísticas e tipos de índices; distinga custo estimado de tempo observado.",
      "Mantenha consulta e dados constantes e compare também um filtro pouco seletivo."
    ],
    "rubric": [
      "Avaliação consultiva por critério: Atendido / Parcialmente atendido / Não atendido / Não verificado; sem nota automática.",
      "Modelagem e SQL: justificar escolhas aplicáveis e confrontar a fixture com casos negativos.",
      "Integridade e evidência: demonstrar rejeição/rollback quando exigidos, sem inventar execução.",
      "Reprodução e limites: registrar versão, comandos, resultados reais e competências ainda não verificadas. A ponderação 25/25/20/15/15 e meta 8/10 pertencem ao projeto integrado."
    ],
    "deliverables": [
      "Modelo/decisões e scripts SQL próprios, fixture sintética e instruções reproduzíveis.",
      "Registro de casos: esperado, observado, comando, versão e limitações; sem execução inventada."
    ]
  },
  {
    "id": "05-ex-09",
    "slug": "05-ex-09",
    "stageId": "05",
    "kind": "exercise",
    "track": "ambas",
    "sector": "ERP",
    "title": "ERP: compras, recebimento e estoque",
    "level": "avancado",
    "optional": false,
    "topicIds": [
      "05-transacoes",
      "05-seguranca",
      "05-laravel-api",
      "05-typescript-api"
    ],
    "context": "O ERP fictício Oficina Integrada precisa receber compras sem deixar itens ou estoque parcialmente atualizados.",
    "problem": "Integre fornecedores, compras, itens e movimentos de estoque à API com uma operação de recebimento atômica.",
    "statement": "Integre fornecedores, compras, itens e movimentos de estoque à API com uma operação de recebimento atômica.",
    "objectives": [
      "Usar PostgreSQL, migrations, relações e ORM/query builder da trilha escolhida; comparar uma consulta com SQL manual."
    ],
    "competencies": [
      "Usar BEGIN/COMMIT/ROLLBACK e demonstrar atomicidade de gravações relacionadas.",
      "Separar comandos e entradas externas; proteger configuração e o banco de teste.",
      "Comparar SQL com Query Builder/Eloquent, investigar N+1/eager loading e integrar API com DB::transaction.",
      "Integrar consultas/joins/paginação e transações Knex à API Express com testes de integração e erros controlados."
    ],
    "prerequisites": [
      "Conferir os objetivos e critérios dos tópicos relacionados antes de iniciar.",
      "Modelagem, SQL manual, PostgreSQL e constraints praticados antes da integração."
    ],
    "requirements": [
      "Usar PostgreSQL, migrations, relações e ORM/query builder da trilha escolhida; comparar uma consulta com SQL manual.",
      "Permitir compra com vários itens de quantidade positiva, fornecedor válido e estados aberta/recebida; recebimento integral uma única vez.",
      "Receber compra em uma transação que registra movimentos, aumenta estoque e altera estado; repetir recebimento sequencialmente não duplica estoque.",
      "Expor consulta paginada/filtros parametrizados, tratar violações sem revelar detalhes internos e testar com PostgreSQL isolado.",
      "Documentar modelo, contratos, SQL, logs sintéticos de testes e limites de concorrência; não prometer idempotência concorrente sem controle comprovado."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Escolher somente Laravel/Eloquent OU Express/TypeScript com Knex 3.3 + pg 8.23; registrar versões no lockfile e tipos @types/pg. Não usar SQLite para testar recursos PostgreSQL."
    ],
    "io": [
      "Entrada: fixture sintética definida pelo estudante conforme os casos abaixo.",
      "Saída: esquema/consultas e evidências verificáveis para as regras descritas."
    ],
    "acceptanceCriteria": [
      "Compra com dois itens incrementa cada saldo uma vez e fica recebida.",
      "Falha forçada no segundo item reverte primeiro movimento, estoque e estado da compra.",
      "Fornecedor inexistente, quantidade inválida e repetição de recebimento são recusados sem mutação.",
      "Dados permanecem após reinício e suite de integração recria o schema a partir das migrations."
    ],
    "testIdeas": [
      "Saldo inicial 5, compra de 3: após recebimento 8; segundo pedido de recebimento mantém 8.",
      "Falha após primeiro item e before/after de todas as tabelas envolvidas; tentativa de SQL injection em filtro."
    ],
    "refs": [
      "05-constraints",
      "05-transactions",
      "05-laravel-db",
      "05-laravel-tests",
      "05-laravel-query",
      "05-knex-migrations",
      "05-knex-query",
      "05-knex-tx",
      "05-pg-driver"
    ],
    "hints": [
      "Identifique o limite da operação receber e todos os registros que ela modifica.",
      "Confronte SQL e abstração escolhida; investigue como propagar falha para a transação.",
      "Force falha no meio do fluxo e consulte cada tabela, incluindo histórico e estado."
    ],
    "rubric": [
      "Avaliação consultiva por critério: Atendido / Parcialmente atendido / Não atendido / Não verificado; sem nota automática.",
      "Modelagem e SQL: justificar escolhas aplicáveis e confrontar a fixture com casos negativos.",
      "Integridade e evidência: demonstrar rejeição/rollback quando exigidos, sem inventar execução.",
      "Reprodução e limites: registrar versão, comandos, resultados reais e competências ainda não verificadas. A ponderação 25/25/20/15/15 e meta 8/10 pertencem ao projeto integrado."
    ],
    "deliverables": [
      "Modelo/decisões e scripts SQL próprios, fixture sintética e instruções reproduzíveis.",
      "Registro de casos: esperado, observado, comando, versão e limitações; sem execução inventada."
    ]
  }
];

export const projects05: Activity[] = [
  {
    "id": "05-project-ecommerce",
    "slug": "05-ecommerce",
    "stageId": "05",
    "kind": "project",
    "track": "comum",
    "sector": "E-commerce",
    "title": "E-commerce Database",
    "level": "inicial",
    "optional": true,
    "topicIds": [
      "05-modelo",
      "05-normalizacao",
      "05-sql",
      "05-postgres",
      "05-agregacoes",
      "05-integridade"
    ],
    "context": "A loja fictícia Casa Norte precisa consolidar clientes sintéticos, categorias, produtos, pedidos e itens.",
    "problem": "Construir banco relacional com DDL, relações, constraints e consultas auditáveis.",
    "statement": "A loja fictícia Casa Norte precisa consolidar clientes sintéticos, categorias, produtos, pedidos e itens. Construir banco relacional com DDL, relações, constraints e consultas auditáveis.",
    "objectives": [
      "Construir banco relacional com DDL, relações, constraints e consultas auditáveis."
    ],
    "competencies": [
      "Modelagem e SQL",
      "Integridade e evidências"
    ],
    "prerequisites": [
      "Praticar os tópicos relacionados e demonstrar os casos negativos dos exercícios anteriores."
    ],
    "requirements": [
      "Construir banco relacional com DDL, relações, constraints e consultas auditáveis.",
      "Representar preço do item no momento do pedido sem recalculá-lo pelo preço atual do produto; valores NUMERIC com escala definida.",
      "Entregar ao menos oito consultas manuais de catálogo/estoque/pedidos e agregações com fixture e resultado esperado."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Entregar SQL manual; API e ORM não são necessários neste nível."
    ],
    "nonfunctional": [
      "Reprodução local com fixture determinística e versão registrada.",
      "Consultas parametrizadas e identificadores por allowlist quando houver entrada externa.",
      "Separar banco de teste e dados de trabalho; não usar SQLite para recursos específicos."
    ],
    "io": [
      "Entrada: cenários e fixture sintética descritos no README.",
      "Saída: relatórios ou contratos HTTP com evidências do banco antes/depois."
    ],
    "acceptanceCriteria": [
      "Pedido preserva valor histórico quando preço do catálogo muda.",
      "Item com produto inexistente, preço negativo ou quantidade zero é rejeitado.",
      "Consulta preserva produto sem venda e pedido com vários itens não infla receita."
    ],
    "testIdeas": [
      "Dois pedidos com o mesmo produto e preços diferentes; produto sem venda; item repetido conforme política declarada."
    ],
    "refs": [
      "05-er",
      "05-normal",
      "05-sql",
      "05-constraints",
      "05-types"
    ],
    "hints": [
      "Identifique os fatos e invariantes antes de escolher tabelas e ferramentas.",
      "Confronte as referências com um caso de ausência e um caso de conflito do domínio.",
      "Rastreie um sucesso e uma falha intermediária, comparando o estado inteiro antes/depois."
    ],
    "rubric": [
      "Avaliação consultiva por critério: Atendido / Parcialmente atendido / Não atendido / Não verificado; sem nota automática.",
      "Modelagem e SQL: justificar escolhas aplicáveis e confrontar a fixture com casos negativos.",
      "Integridade e evidência: demonstrar rejeição/rollback quando exigidos, sem inventar execução.",
      "Reprodução e limites: registrar versão, comandos, resultados reais e competências ainda não verificadas. A ponderação 25/25/20/15/15 e meta 8/10 pertencem ao projeto integrado."
    ],
    "deliverables": [
      "Código-fonte e scripts SQL próprios; diagrama ER e dependências/normalização justificadas.",
      "README: problema, requisitos, execução local, versões e dados sintéticos; .env.example sem segredos quando aplicável.",
      "Casos de teste com resultados reais, limitações, exemplos SQL e ADR curta sobre escolhas."
    ],
    "milestones": [
      "Definir regras, modelo ER, dependências e fixture.",
      "Implementar SQL e constraints; testar casos normais e inválidos.",
      "Investigar consultas/planos ou integrar a API conforme o nível.",
      "Reproduzir em ambiente limpo e reunir evidências, ADR e limites."
    ],
    "extras": [
      "Investigar uma melhoria justificada após concluir o contrato obrigatório; não antecipar infraestrutura."
    ]
  },
  {
    "id": "05-project-logistics",
    "slug": "05-logistics",
    "stageId": "05",
    "kind": "project",
    "track": "comum",
    "sector": "Logística",
    "title": "Logistics Analytics",
    "level": "intermediario",
    "optional": true,
    "topicIds": [
      "05-modelo",
      "05-joins",
      "05-agregacoes",
      "05-integridade",
      "05-indices"
    ],
    "context": "A cooperativa fictícia Caminhos Unidos precisa investigar entregas, incidentes e desempenho regional.",
    "problem": "Construir banco e relatórios operacionais que preservem regiões e motoristas sem entregas.",
    "statement": "A cooperativa fictícia Caminhos Unidos precisa investigar entregas, incidentes e desempenho regional. Construir banco e relatórios operacionais que preservem regiões e motoristas sem entregas.",
    "objectives": [
      "Construir banco e relatórios operacionais que preservem regiões e motoristas sem entregas."
    ],
    "competencies": [
      "Modelagem e SQL",
      "Integridade e evidências"
    ],
    "prerequisites": [
      "Praticar os tópicos relacionados e demonstrar os casos negativos dos exercícios anteriores."
    ],
    "requirements": [
      "Construir banco e relatórios operacionais que preservem regiões e motoristas sem entregas.",
      "Definir prazo, instante de corte, status válidos, região e denominadores; entregar INNER/LEFT JOIN, subconsultas/EXISTS e CTEs.",
      "Gerar 100 mil entregas sintéticas reproduzíveis; comparar dois planos antes/depois de índices com estatísticas atualizadas e registrar trade-offs."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Entregar SQL manual; API e ORM não são necessários neste nível."
    ],
    "nonfunctional": [
      "Reprodução local com fixture determinística e versão registrada.",
      "Consultas parametrizadas e identificadores por allowlist quando houver entrada externa.",
      "Separar banco de teste e dados de trabalho; não usar SQLite para recursos específicos."
    ],
    "io": [
      "Entrada: cenários e fixture sintética descritos no README.",
      "Saída: relatórios ou contratos HTTP com evidências do banco antes/depois."
    ],
    "acceptanceCriteria": [
      "Relatórios distinguem atraso e cancelamento e concordam com uma fixture pequena conferida à mão.",
      "Entregas com vários incidentes não multiplicam indevidamente a contagem ou o custo.",
      "Comparação de plano preserva consulta/dados e não promete ganho universal por índice."
    ],
    "testIdeas": [
      "Motorista sem entrega, região vazia e entrega com dois incidentes.",
      "Consulta seletiva versus abrangente e registros no limite temporal."
    ],
    "refs": [
      "05-joins",
      "05-exists",
      "05-cte",
      "05-indexes",
      "05-explain"
    ],
    "hints": [
      "Identifique os fatos e invariantes antes de escolher tabelas e ferramentas.",
      "Confronte as referências com um caso de ausência e um caso de conflito do domínio.",
      "Rastreie um sucesso e uma falha intermediária, comparando o estado inteiro antes/depois."
    ],
    "rubric": [
      "Avaliação consultiva por critério: Atendido / Parcialmente atendido / Não atendido / Não verificado; sem nota automática.",
      "Modelagem e SQL: justificar escolhas aplicáveis e confrontar a fixture com casos negativos.",
      "Integridade e evidência: demonstrar rejeição/rollback quando exigidos, sem inventar execução.",
      "Reprodução e limites: registrar versão, comandos, resultados reais e competências ainda não verificadas. A ponderação 25/25/20/15/15 e meta 8/10 pertencem ao projeto integrado."
    ],
    "deliverables": [
      "Código-fonte e scripts SQL próprios; diagrama ER e dependências/normalização justificadas.",
      "README: problema, requisitos, execução local, versões e dados sintéticos; .env.example sem segredos quando aplicável.",
      "Casos de teste com resultados reais, limitações, exemplos SQL e ADR curta sobre escolhas."
    ],
    "milestones": [
      "Definir regras, modelo ER, dependências e fixture.",
      "Implementar SQL e constraints; testar casos normais e inválidos.",
      "Investigar consultas/planos ou integrar a API conforme o nível.",
      "Reproduzir em ambiente limpo e reunir evidências, ADR e limites."
    ],
    "extras": [
      "Investigar uma melhoria justificada após concluir o contrato obrigatório; não antecipar infraestrutura."
    ]
  },
  {
    "id": "05-project-billing",
    "slug": "05-billing",
    "stageId": "05",
    "kind": "project",
    "track": "ambas",
    "sector": "SaaS",
    "title": "SaaS Billing API",
    "level": "avancado",
    "optional": false,
    "topicIds": [
      "05-modelo",
      "05-normalizacao",
      "05-sql",
      "05-postgres",
      "05-agregacoes",
      "05-joins",
      "05-integridade",
      "05-indices",
      "05-transacoes",
      "05-seguranca",
      "05-laravel",
      "05-laravel-api",
      "05-typescript",
      "05-typescript-api"
    ],
    "context": "O SaaS fictício Conta Clara precisa faturar empresas sem faturas e pagamentos simulados inconsistentes.",
    "problem": "Integrar uma API PostgreSQL na única trilha escolhida com migrations, relações, constraints, transações e testes.",
    "statement": "O SaaS fictício Conta Clara precisa faturar empresas sem faturas e pagamentos simulados inconsistentes. Integrar uma API PostgreSQL na única trilha escolhida com migrations, relações, constraints, transações e testes.",
    "objectives": [
      "Integrar uma API PostgreSQL na única trilha escolhida com migrations, relações, constraints, transações e testes."
    ],
    "competencies": [
      "Modelagem e SQL",
      "Integridade e evidências",
      "Persistência transacional e integração na trilha escolhida"
    ],
    "prerequisites": [
      "Praticar os tópicos relacionados e demonstrar os casos negativos dos exercícios anteriores."
    ],
    "requirements": [
      "Integrar uma API PostgreSQL na única trilha escolhida com migrations, relações, constraints, transações e testes.",
      "Apresentar ao menos 15 consultas SQL manuais entre o caderno de exercícios e o projeto, incluindo JOIN, agregação, EXISTS e CTE; comparar três consultas com ORM/query builder e medir N+1/consultas repetidas.",
      "Entregar listagem paginada com ordenação estável e filtros parametrizados, erros consistentes e contratos HTTP documentados.",
      "Demonstrar migração em banco vazio, rollback controlado em desenvolvimento, dados sintéticos e persistência após reinício da API.",
      "Reunir ER, migrations, SQL, testes reais, README, .env.example e ADR. Registrar sugestão de IA aceita/rejeitada e evidência, se utilizada.",
      "Modelar empresas, planos, assinaturas, faturas, itens e pagamentos simulados; fatura tem moeda única e total calculado por itens NUMERIC, com política de escala/arredondamento registrada.",
      "Registrar pagamento simulado positivo em fatura aberta e atualizar seu estado atomicamente; rejeitar valor acima do saldo, segundo uso do identificador de pagamento e fatura de outra empresa. Não cobrar serviços reais."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Escolher Laravel/Eloquent OU Express/TypeScript com Knex + pg; não integrar meios de pagamento reais nem exigir autenticação."
    ],
    "nonfunctional": [
      "Reprodução local com fixture determinística e versão registrada.",
      "Consultas parametrizadas e identificadores por allowlist quando houver entrada externa.",
      "Separar banco de teste e dados de trabalho; não usar SQLite para recursos específicos."
    ],
    "io": [
      "Entrada: cenários e fixture sintética descritos no README.",
      "Saída: relatórios ou contratos HTTP com evidências do banco antes/depois."
    ],
    "acceptanceCriteria": [
      "Regras e cardinalidades sustentam as consultas; chaves e constraints rejeitam referência inválida, duplicação indevida, NULL obrigatório e valor negativo.",
      "Operação de múltiplas escritas tem sucesso completo ou rollback de todas as tabelas; falha intermediária é demonstrada.",
      "PostgreSQL de teste separado reproduz schema, relações, rejeições e consultas; não há dependência de SQLite para esses recursos.",
      "SQL e abstração selecionada concordam nas três consultas comparadas; quantidades de consultas são medidas antes/depois da mitigação de N+1.",
      "README permite recriar e executar localmente; documentação distingue garantias sequenciais e riscos de concorrência não resolvidos.",
      "Há evidência de plano antes/depois de índice justificado e de que resultados não mudaram.",
      "Fatura de 100 com pagamento 40 fica aberta com saldo 60; pagamento final 60 quita; novo pagamento é recusado sem alterar histórico.",
      "Falha depois do registro de pagamento e antes de atualizar a fatura reverte ambos; empresa não consulta fatura de outra pelo filtro de escopo sintético (sem prometer autenticação)."
    ],
    "testIdeas": [
      "Fatura sem itens, valor negativo, pagamento duplicado, saldo exato, valor superior e fatura de outra empresa.",
      "Requisições concorrentes são risco documentado; não há promessa de cobrança ou segurança de produção."
    ],
    "refs": [
      "05-er",
      "05-normal",
      "05-sql",
      "05-constraints",
      "05-types",
      "05-transactions",
      "05-indexes",
      "05-explain",
      "05-laravel-db",
      "05-laravel-migrations",
      "05-laravel-relations",
      "05-laravel-tests",
      "05-pg-driver",
      "05-knex",
      "05-knex-migrations",
      "05-knex-tx"
    ],
    "hints": [
      "Identifique os fatos e invariantes antes de escolher tabelas e ferramentas.",
      "Confronte as referências com um caso de ausência e um caso de conflito do domínio.",
      "Rastreie um sucesso e uma falha intermediária, comparando o estado inteiro antes/depois."
    ],
    "rubric": [
      "Modelagem: 25% — chaves, cardinalidades e dependências justificadas.",
      "SQL: 25% — consultas próprias, resultado reproduzível e casos negativos.",
      "Integridade e transações: 20% — rejeição e rollback demonstrados, limites de concorrência explícitos.",
      "ORM e integração: 15% — Eloquent ou query builder Knex na única trilha escolhida, comparados com SQL.",
      "Testes e documentação: 15% — evidências reais, ambiente, decisões e limites.",
      "Meta consultiva sugerida: 8/10 sem falhas graves de integridade; sem nota automática. Avaliar apenas dimensões aplicáveis ao desafio."
    ],
    "deliverables": [
      "Código-fonte e scripts SQL próprios; diagrama ER e dependências/normalização justificadas.",
      "README: problema, requisitos, execução local, versões e dados sintéticos; .env.example sem segredos quando aplicável.",
      "Casos de teste com resultados reais, limitações, exemplos SQL e ADR curta sobre escolhas.",
      "Migrations, seeds/factories ou gerador de fixtures, testes PostgreSQL, SQL equivalente e instruções da API."
    ],
    "milestones": [
      "Definir regras, modelo ER, dependências e fixture.",
      "Implementar SQL e constraints; testar casos normais e inválidos.",
      "Investigar consultas/planos ou integrar a API conforme o nível.",
      "Reproduzir em ambiente limpo e reunir evidências, ADR e limites."
    ],
    "extras": [
      "Investigar uma melhoria justificada após concluir o contrato obrigatório; não antecipar infraestrutura."
    ]
  },
  {
    "id": "05-project-booking",
    "slug": "05-booking",
    "stageId": "05",
    "kind": "project",
    "track": "ambas",
    "sector": "Serviços",
    "title": "Booking API com PostgreSQL — continuidade",
    "level": "avancado",
    "optional": true,
    "topicIds": [
      "05-modelo",
      "05-normalizacao",
      "05-sql",
      "05-postgres",
      "05-agregacoes",
      "05-joins",
      "05-integridade",
      "05-indices",
      "05-transacoes",
      "05-seguranca",
      "05-laravel",
      "05-laravel-api",
      "05-typescript",
      "05-typescript-api"
    ],
    "context": "A API de agendamentos da Etapa 04 pode evoluir como alternativa equivalente ao SaaS Billing.",
    "problem": "Integrar uma API PostgreSQL na única trilha escolhida com migrations, relações, constraints, transações e testes.",
    "statement": "A API de agendamentos da Etapa 04 pode evoluir como alternativa equivalente ao SaaS Billing. Integrar uma API PostgreSQL na única trilha escolhida com migrations, relações, constraints, transações e testes.",
    "objectives": [
      "Integrar uma API PostgreSQL na única trilha escolhida com migrations, relações, constraints, transações e testes."
    ],
    "competencies": [
      "Modelagem e SQL",
      "Integridade e evidências",
      "Persistência transacional e integração na trilha escolhida"
    ],
    "prerequisites": [
      "Praticar os tópicos relacionados e demonstrar os casos negativos dos exercícios anteriores."
    ],
    "requirements": [
      "Integrar uma API PostgreSQL na única trilha escolhida com migrations, relações, constraints, transações e testes.",
      "Apresentar ao menos 15 consultas SQL manuais entre o caderno de exercícios e o projeto, incluindo JOIN, agregação, EXISTS e CTE; comparar três consultas com ORM/query builder e medir N+1/consultas repetidas.",
      "Entregar listagem paginada com ordenação estável e filtros parametrizados, erros consistentes e contratos HTTP documentados.",
      "Demonstrar migração em banco vazio, rollback controlado em desenvolvimento, dados sintéticos e persistência após reinício da API.",
      "Reunir ER, migrations, SQL, testes reais, README, .env.example e ADR. Registrar sugestão de IA aceita/rejeitada e evidência, se utilizada.",
      "Migrar clientes, serviços, profissionais e reservas para PostgreSQL preservando contratos HTTP da Etapa 04.",
      "No mínimo obrigatório, definir slots fixos de duração única, alinhados à grade, e política de cancelamento; impedir reserva ativa duplicada por profissional/início no banco.",
      "Gravar reserva e histórico na mesma transação; intervalos variáveis e EXCLUDE/ranges são aprofundamento opcional, com limites explícitos."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Escolher Laravel/Eloquent OU Express/TypeScript com Knex + pg; não integrar meios de pagamento reais nem exigir autenticação."
    ],
    "nonfunctional": [
      "Reprodução local com fixture determinística e versão registrada.",
      "Consultas parametrizadas e identificadores por allowlist quando houver entrada externa.",
      "Separar banco de teste e dados de trabalho; não usar SQLite para recursos específicos."
    ],
    "io": [
      "Entrada: cenários e fixture sintética descritos no README.",
      "Saída: relatórios ou contratos HTTP com evidências do banco antes/depois."
    ],
    "acceptanceCriteria": [
      "Regras e cardinalidades sustentam as consultas; chaves e constraints rejeitam referência inválida, duplicação indevida, NULL obrigatório e valor negativo.",
      "Operação de múltiplas escritas tem sucesso completo ou rollback de todas as tabelas; falha intermediária é demonstrada.",
      "PostgreSQL de teste separado reproduz schema, relações, rejeições e consultas; não há dependência de SQLite para esses recursos.",
      "SQL e abstração selecionada concordam nas três consultas comparadas; quantidades de consultas são medidas antes/depois da mitigação de N+1.",
      "README permite recriar e executar localmente; documentação distingue garantias sequenciais e riscos de concorrência não resolvidos.",
      "Há evidência de plano antes/depois de índice justificado e de que resultados não mudaram.",
      "Duplicar um slot ativo é rejeitado pelo banco; cancelamento permite nova reserva conforme política declarada.",
      "Slot fora da grade é recusado; falha após reserva reverte reserva e histórico.",
      "Não apresenta UNIQUE simples como garantia de ausência de sobreposição de intervalos variáveis."
    ],
    "testIdeas": [
      "Reserva repetida no slot, cancelada seguida de ativa, FK inválida e falha intermediária.",
      "Dois intervalos com início diferente mas sobreposição ilustram limite do modelo, sem solução obrigatória."
    ],
    "refs": [
      "05-er",
      "05-normal",
      "05-sql",
      "05-constraints",
      "05-types",
      "05-transactions",
      "05-indexes",
      "05-explain",
      "05-laravel-db",
      "05-laravel-migrations",
      "05-laravel-relations",
      "05-laravel-tests",
      "05-pg-driver",
      "05-knex",
      "05-knex-migrations",
      "05-knex-tx"
    ],
    "hints": [
      "Identifique os fatos e invariantes antes de escolher tabelas e ferramentas.",
      "Confronte as referências com um caso de ausência e um caso de conflito do domínio.",
      "Rastreie um sucesso e uma falha intermediária, comparando o estado inteiro antes/depois."
    ],
    "rubric": [
      "Modelagem: 25% — chaves, cardinalidades e dependências justificadas.",
      "SQL: 25% — consultas próprias, resultado reproduzível e casos negativos.",
      "Integridade e transações: 20% — rejeição e rollback demonstrados, limites de concorrência explícitos.",
      "ORM e integração: 15% — Eloquent ou query builder Knex na única trilha escolhida, comparados com SQL.",
      "Testes e documentação: 15% — evidências reais, ambiente, decisões e limites.",
      "Meta consultiva sugerida: 8/10 sem falhas graves de integridade; sem nota automática. Avaliar apenas dimensões aplicáveis ao desafio."
    ],
    "deliverables": [
      "Código-fonte e scripts SQL próprios; diagrama ER e dependências/normalização justificadas.",
      "README: problema, requisitos, execução local, versões e dados sintéticos; .env.example sem segredos quando aplicável.",
      "Casos de teste com resultados reais, limitações, exemplos SQL e ADR curta sobre escolhas.",
      "Migrations, seeds/factories ou gerador de fixtures, testes PostgreSQL, SQL equivalente e instruções da API."
    ],
    "milestones": [
      "Definir regras, modelo ER, dependências e fixture.",
      "Implementar SQL e constraints; testar casos normais e inválidos.",
      "Investigar consultas/planos ou integrar a API conforme o nível.",
      "Reproduzir em ambiente limpo e reunir evidências, ADR e limites."
    ],
    "extras": [
      "Investigar uma melhoria justificada após concluir o contrato obrigatório; não antecipar infraestrutura."
    ]
  },
  {
    "id": "05-project-equivalent",
    "slug": "05-equivalent",
    "stageId": "05",
    "kind": "project",
    "track": "ambas",
    "sector": "Autoral",
    "title": "Projeto autoral de persistência — proposta equivalente",
    "level": "avancado",
    "optional": true,
    "topicIds": [
      "05-modelo",
      "05-normalizacao",
      "05-sql",
      "05-postgres",
      "05-agregacoes",
      "05-joins",
      "05-integridade",
      "05-indices",
      "05-transacoes",
      "05-seguranca",
      "05-laravel",
      "05-laravel-api",
      "05-typescript",
      "05-typescript-api"
    ],
    "context": "Escolha outro problema fictício e submeta uma proposta com as mesmas competências; a plataforma não aprova a proposta automaticamente.",
    "problem": "Integrar uma API PostgreSQL na única trilha escolhida com migrations, relações, constraints, transações e testes.",
    "statement": "Escolha outro problema fictício e submeta uma proposta com as mesmas competências; a plataforma não aprova a proposta automaticamente. Integrar uma API PostgreSQL na única trilha escolhida com migrations, relações, constraints, transações e testes.",
    "objectives": [
      "Integrar uma API PostgreSQL na única trilha escolhida com migrations, relações, constraints, transações e testes."
    ],
    "competencies": [
      "Modelagem e SQL",
      "Integridade e evidências",
      "Persistência transacional e integração na trilha escolhida"
    ],
    "prerequisites": [
      "Praticar os tópicos relacionados e demonstrar os casos negativos dos exercícios anteriores."
    ],
    "requirements": [
      "Integrar uma API PostgreSQL na única trilha escolhida com migrations, relações, constraints, transações e testes.",
      "Apresentar ao menos 15 consultas SQL manuais entre o caderno de exercícios e o projeto, incluindo JOIN, agregação, EXISTS e CTE; comparar três consultas com ORM/query builder e medir N+1/consultas repetidas.",
      "Entregar listagem paginada com ordenação estável e filtros parametrizados, erros consistentes e contratos HTTP documentados.",
      "Demonstrar migração em banco vazio, rollback controlado em desenvolvimento, dados sintéticos e persistência após reinício da API.",
      "Reunir ER, migrations, SQL, testes reais, README, .env.example e ADR. Registrar sugestão de IA aceita/rejeitada e evidência, se utilizada.",
      "Definir pelo menos quatro entidades relacionadas, uma relação N:N e uma operação atômica de múltiplas escritas; justificar o problema e os invariantes sem copiar superficialmente outro domínio.",
      "Comparar a proposta com os critérios de SaaS Billing API e registrar revisão humana externa quando disponível; ausência de revisão fica Não verificado."
    ],
    "constraints": [
      "Executar localmente em PostgreSQL e banco descartável dedicado; registrar versões.",
      "Usar apenas dados sintéticos; não publicar credenciais nem dados pessoais.",
      "Não exigir autenticação, Docker, CI/deploy, Redis ou isolamento avançado.",
      "Escrever SQL manual antes da abstração; não executar código no StackTrail.",
      "Escolher Laravel/Eloquent OU Express/TypeScript com Knex + pg; não integrar meios de pagamento reais nem exigir autenticação."
    ],
    "nonfunctional": [
      "Reprodução local com fixture determinística e versão registrada.",
      "Consultas parametrizadas e identificadores por allowlist quando houver entrada externa.",
      "Separar banco de teste e dados de trabalho; não usar SQLite para recursos específicos."
    ],
    "io": [
      "Entrada: cenários e fixture sintética descritos no README.",
      "Saída: relatórios ou contratos HTTP com evidências do banco antes/depois."
    ],
    "acceptanceCriteria": [
      "Regras e cardinalidades sustentam as consultas; chaves e constraints rejeitam referência inválida, duplicação indevida, NULL obrigatório e valor negativo.",
      "Operação de múltiplas escritas tem sucesso completo ou rollback de todas as tabelas; falha intermediária é demonstrada.",
      "PostgreSQL de teste separado reproduz schema, relações, rejeições e consultas; não há dependência de SQLite para esses recursos.",
      "SQL e abstração selecionada concordam nas três consultas comparadas; quantidades de consultas são medidas antes/depois da mitigação de N+1.",
      "README permite recriar e executar localmente; documentação distingue garantias sequenciais e riscos de concorrência não resolvidos.",
      "Há evidência de plano antes/depois de índice justificado e de que resultados não mudaram.",
      "Proposta apresenta contrato específico para sucesso, ausência, conflito, falha intermediária e limites concorrentes; evidências cobrem a mesma competência do projeto principal."
    ],
    "testIdeas": [
      "Caso normal, referência inválida, duplicação, paginação, falha após primeira escrita e reinício da API."
    ],
    "refs": [
      "05-er",
      "05-normal",
      "05-sql",
      "05-constraints",
      "05-types",
      "05-transactions",
      "05-indexes",
      "05-explain",
      "05-laravel-db",
      "05-laravel-migrations",
      "05-laravel-relations",
      "05-laravel-tests",
      "05-pg-driver",
      "05-knex",
      "05-knex-migrations",
      "05-knex-tx"
    ],
    "hints": [
      "Identifique os fatos e invariantes antes de escolher tabelas e ferramentas.",
      "Confronte as referências com um caso de ausência e um caso de conflito do domínio.",
      "Rastreie um sucesso e uma falha intermediária, comparando o estado inteiro antes/depois."
    ],
    "rubric": [
      "Modelagem: 25% — chaves, cardinalidades e dependências justificadas.",
      "SQL: 25% — consultas próprias, resultado reproduzível e casos negativos.",
      "Integridade e transações: 20% — rejeição e rollback demonstrados, limites de concorrência explícitos.",
      "ORM e integração: 15% — Eloquent ou query builder Knex na única trilha escolhida, comparados com SQL.",
      "Testes e documentação: 15% — evidências reais, ambiente, decisões e limites.",
      "Meta consultiva sugerida: 8/10 sem falhas graves de integridade; sem nota automática. Avaliar apenas dimensões aplicáveis ao desafio."
    ],
    "deliverables": [
      "Código-fonte e scripts SQL próprios; diagrama ER e dependências/normalização justificadas.",
      "README: problema, requisitos, execução local, versões e dados sintéticos; .env.example sem segredos quando aplicável.",
      "Casos de teste com resultados reais, limitações, exemplos SQL e ADR curta sobre escolhas.",
      "Migrations, seeds/factories ou gerador de fixtures, testes PostgreSQL, SQL equivalente e instruções da API."
    ],
    "milestones": [
      "Definir regras, modelo ER, dependências e fixture.",
      "Implementar SQL e constraints; testar casos normais e inválidos.",
      "Investigar consultas/planos ou integrar a API conforme o nível.",
      "Reproduzir em ambiente limpo e reunir evidências, ADR e limites."
    ],
    "extras": [
      "Investigar uma melhoria justificada após concluir o contrato obrigatório; não antecipar infraestrutura."
    ]
  }
];

export const books05: Book[] = [
  {
    "id": "book-05-sistema",
    "cost": "Pago",
    "title": "Sistema de Banco de Dados",
    "author": "Abraham Silberschatz, Henry F. Korth e S. Sudarshan",
    "edition": "7ª edição",
    "year": "2020",
    "language": "Português brasileiro",
    "level": "Fundamentos e consulta",
    "topics": [
      "05-modelo",
      "05-normalizacao",
      "05-sql",
      "05-indices",
      "05-transacoes"
    ],
    "stages": [
      "05"
    ],
    "track": "comum",
    "url": "https://www.grupogen.com.br/e-book-sistema-de-banco-de-dados",
    "note": "Pago e opcional. Catálogo/sumário consultados: modelo relacional (cap. 2), SQL (3–5), ER (6), projeto relacional (7), indexação (14) e transações (17). Obra integral não lida.",
    "alternatives": [
      "05-er",
      "05-normal",
      "05-sql",
      "05-indexes",
      "05-transactions"
    ],
    "reason": "Livro-base do currículo original, selecionado por assunto; aquisição não é necessária.",
    "community": "Indicação curricular do Notion, não alegação de consenso comunitário.",
    "checked": "2026-10-18",
    "cover": {
      "kind": "image",
      "src": "covers/sistema-banco-dados-7ed.webp",
      "width": 215,
      "height": 287,
      "alt": "Capa de Sistema de Banco de Dados, 7ª edição, Silberschatz, Korth e Sudarshan — GEN/LTC.",
      "origin": "Capa oficial GEN/LTC, edição7/2020, ISBN9788595157545; asset identificado na galeria do catálogo oficial.",
      "usage": "Asset estático WebP para identificação bibliográfica, sem hotlink, preços ou links de compra. Direitos da editora/autores."
    }
  },
  {
    "id": "book-05-sql",
    "cost": "Pago",
    "title": "SQL Guia Prático",
    "author": "Alice Zhao",
    "edition": "4ª edição (indicada na capa editorial)",
    "year": "2023",
    "language": "Português brasileiro",
    "level": "Iniciante a intermediário",
    "topics": [
      "05-sql",
      "05-agregacoes",
      "05-joins"
    ],
    "stages": [
      "05"
    ],
    "track": "comum",
    "url": "https://novatec.com.br/livros/sql-guia-pratico/",
    "note": "Pago e opcional. Catálogo e sumário em português consultados; compara dialetos, incluindo PostgreSQL. Conferir sintaxe na documentação 18; livro integral não lido.",
    "alternatives": [
      "05-pt",
      "05-sql",
      "05-joins",
      "05-cte"
    ],
    "reason": "Complemento de consultas e relatórios; não substitui modelagem e configuração atual do PostgreSQL.",
    "community": "Seleção editorial por adequação, sem recomendação coletiva alegada.",
    "checked": "2026-10-18",
    "cover": {
      "kind": "image",
      "src": "covers/sql-guia-pratico.webp",
      "width": 292,
      "height": 438,
      "alt": "Capa de SQL Guia Prático, de Alice Zhao — Novatec, 4ª edição indicada na capa.",
      "origin": "Capa ampliada oficial Novatec, ISBN9788575228319; 4ª edição indicada na imagem editorial.",
      "usage": "Asset estático WebP para identificação bibliográfica, sem hotlink, preços ou links de compra. Direitos da editora/autores."
    }
  },
  {
    "id": "book-05-design",
    "cost": "Gratuito",
    "title": "Database Design",
    "author": "Adrienne Watt e Nelson Eng (BCcampus)",
    "edition": "2ª edição",
    "year": "2014",
    "language": "Inglês",
    "level": "Fundamentos",
    "topics": [
      "05-modelo",
      "05-normalizacao"
    ],
    "stages": [
      "05"
    ],
    "track": "comum",
    "url": "https://opentextbc.ca/dbdesign01/",
    "note": "Livro aberto gratuito. Consultados capítulos de ER, dependências e normalização, não a obra integral. A referência 05-normal explicita simplificações sobre 2FN/BCNF que exigem cuidado.",
    "alternatives": [
      "05-er",
      "05-normal",
      "05-sql"
    ],
    "reason": "Alternativa gratuita para modelagem e normalização; complementar com PostgreSQL atual.",
    "community": "Escolha pelo conteúdo e acesso aberto; sem consenso comunitário alegado.",
    "checked": "2026-10-18",
    "cover": {
      "kind": "image",
      "src": "covers/database-design-2ed.webp",
      "width": 540,
      "height": 699,
      "alt": "Capa de Database Design, 2nd Edition, Adrienne Watt e Nelson Eng — BCcampus OpenEd.",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
      "attributionUrl": "https://www.flickr.com/photos/micurs/3498339723/",
      "origin": "Capa da edição BCcampus2; cópia do catálogo BookFusion conferida com a capa e créditos BCcampus. Fotografia Spiral Stairs In Milano old building downtown, de Michele Ursino.",
      "usage": "Obra CC BY 4.0 (Watt/Eng); fotografia da capa de Michele Ursino sob CC BY-SA 2.0. Conversão de formato para WebP, sem alteração da composição. Créditos e links na documentação de fontes."
    }
  }
];
export const project05Billing=projects05[2];
