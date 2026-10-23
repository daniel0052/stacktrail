# Revisão factual independente — 23/10/2026

Escopo:9 módulos,18 exercícios, integrador, preparação e2 livros da13. Revisão somente leitura por agente factchecker, usando fontes primárias. Metadados por URL/seção/idioma/custo/versão em inventory.json; respostas GET em reference-get.json não comprovam adequação. Nenhum backend, carga ou código gerado executado.

## Achados e correções

- Streaming PHP inicialmente não tinha fonte suficiente: adicionadas Laravel Streamed Responses e PHP Connection handling; resolutor por stack distingue Generator/buffering/cancelamento de Node pipeline/backpressure.
- Lease Redis precisava fonte explícita de ownership: adicionada Distributed Locks, expiração/token/liberação segura; não ensinar DEL cego.
- HTTP200/304 ambíguo:200 mantém representação;304 sem corpo. Autorização e variantes continuam exigidas.
- Referência node-redis renomeada para corresponder a conexão/configuração.
- PHP memory_get_peak_usage e Node Heap Snapshot acrescentados; heap snapshot pausa e pode duplicar memória. PHP hrtime e memory consultados em PT-BR; tradução Signals PT tinha alerta de desatualização, mantido original EN.

## Verificações de adequação

Google SRE: percentis/população/janela, quatro sinais, correlação não prova causa. PostgreSQL 18: ANALYZE executa/custo não é ms, estatísticas/cardinalidade, multicolumn/skip scan, partial/expression, INCLUDE/MVCC e custos; não garantir plano específico. pg_stat_activity separa state e wait; pool precisa release nos erros e tamanho justificado. Redis tracking não acompanha escrita PostgreSQL; TTL não corrige sozinho leitor atrasado. Laravel remember não é singleflight; Telescope opcional com overhead/dados sensíveis; eagerloading conserva chaves e resultado. perf_hooks exige unidade/contexto; heap não equivale diretamente a leak; streaming não pode materializar antes tudo. k6: open/closed, rate oferecida/atingida, dropped como trabalho não iniciado, errosHTTP separados, não calcular média de p95. OTel: bootstrap Node antes de imports/ESM apropriado; PHP precisa extensão/autoload/SDK/instrumentação conforme mecanismo, extensão sozinha não fornece traces completos; cardinalidade limitada.

37 fontes gratuitas: inglês exceto2 PHP e o guia Express PT-BR. Fontes consultadas suportam o recorte, não afirmam suporte universal de APIs em qualquer LTS. PostgreSQL 18 atual na consulta;19RC não declarado estável. Novatec eBrasport verificam título/edição/ano/ISBN/língua/sumário; autoria coletiva do segundo evita grafia divergente de organizadora. Consulta não equivale à leitura integral nem licença livre das capas.

Reconferência final após correções: nenhum bloqueante factual remanescente identificado no recorte documental. Não valida futuros projetos, carga, profiling, instalação de ferramentas ou capacidade de produção.

Conferência adicional do implementador: guia oficial Express de desempenho disponível e lido em português (Compressão/funções síncronas/cache); preferido no catálogo. Infraestrutura de produção citada pelo guia não vira requisito obrigatório.
