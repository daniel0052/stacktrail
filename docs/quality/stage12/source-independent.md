# Verificação independente — Etapa12

Consulta em20/10/2026 por subagente somente leitura, com reconferência dos contratos após implementação. Fontes técnicas gratuitas/inglês; catálogosPTBR com livros pagos/opcionais. Nenhum ambiente Laravel/Node/Redis/RabbitMQ externo executado. Registro por ID, seção, idioma, acesso e versão em sources.json; GET separado em reference-get.json.

- Laravel13 Queues/Events/Horizon: driversRedis, jobs/transações, limites worker e failed jobs; timeout menor que retry_after, block_for=0 pode retardar SIGTERM; dispatch pós-commit não fornece Outbox durável. Horizon opcional, exigeRedis e não suportaRedisCluster.
- BullMQ Connections/Retrying/Going to production/Timeout: diferenciar producer HTTP com falha rápida e worker com conexão/retries próprios; ioredis manual de Worker exige maxRetriesPerRequest:null. noeviction e capacidade monitorada; não há opção genérica de timeout que cancele I/O automaticamente.
- RabbitMQ4.4 docs Confirms/DLX/Reliability: confirm não prova consumo nem roteamento; mandatory/return devem ser tratados. Durable queue e mensagem persistente não provam tolerância irrestrita a perdas. DLX é exchange, DLQ é destino; republicação padrão admite perda com alvo indisponível.
- Chris Richardson Outbox/Idempotent Consumer: mudança/outbox no mesmo commit; dispatcher pode republicar. Inbox por consumidor/evento e efeitoSQL atomicamente, com unicidade concorrente; efeitoHTTP externo tem fronteira própria.
- PostgreSQL current abriu documentação18;19RC não é base exigida. Transações/constraints e concorrência devem ser testadas pelo estudante. SKIP LOCKED não é garantia de ordem global.
- NodeEvents é interno/síncrono. php-amqplib é clienteAMQP explícito, não driver oficialLaravel; requisitos Composer/runtime precisam ser compatíveis com a release escolhida, sem recomendar PHP obsoleto. amqplib>=0.10.7 paraRabbitMQ>=4.1; boolean de publish é backpressure, confirmações usam mecanismo próprio.

Livros: Projetando Sistemas Distribuídos(BrendanBurns,2ªedição,2025,ISBN9788575229545) e Criando Microsserviços(SamNewman,2ªedição,2022,ISBN9786586057881), Novatec. Catálogo/sumário consultados; não obras integrais. Kubernetes/microsserviços são aprofundamento, não requisito adicional.

Reconferência de stage-twelve.ts, activityForTrack12, preparaçãoA4/B8/C7 e prompt: nenhum bloqueante factual novo identificado. Incorporados limites de confirms/return/ack, efeito externo cooperante, DLX, timeout real, tentativas totais, Horizon e clientesAMQP. Sugestão de clareza incorporada: no Express, handler despacha jobBullMQ; EventEmitter sozinho não enfileira.
