> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](README.md) e o [estado atual](../README.md). Resultados antigos não validam automaticamente a plataforma atual.

# Auditoria curricular — StackTrail × roadmap.sh/backend

**Data:** 17/10/2026. **Base local:** commit `3dea779`. **Natureza:** comparação documental e proposta para aprovação; nenhuma mudança curricular ou de código autorizada por este relatório.

## 1. Conclusão e escopo

O StackTrail já possui uma progressão sólida para HTTP, linguagem, programação, segurança básica e testes. O roadmap.sh ajuda a identificar escolhas e extensões; não justifica transformar todas as tecnologias de sua árvore em requisitos. A prioridade real é assegurar a continuidade das duas trilhas depois da03 e tornar critérios/projetos futuros coerentes.

**Implementado no site:**00–03,73 aulas e68 desafios (19/29,11/9,12/9,31/21). **Planejado:**04–19 têm metadados locais e páginas detalhadas no Notion, mas não aulas/rotas de conteúdo implementadas: `src/content/stages.ts` aceita somente00–03; `src/content/roadmap.ts` marca as demais indisponíveis. Projeto, CI ou skill usados para desenvolver a plataforma não são evidência de ensino ao estudante.

Lidos: AGENTS, três skills/referências, inventários, critérios de progresso, aulas/exercícios/modelos representativos e busca transversal nas73 MDX; Notion pai/guia e20 páginas de etapas por divisão de revisão; grafo público e página de projetos; fontes primárias técnicas para recomendações. **Não** é auditoria técnica de toda afirmação das73 aulas, leitura de todo artigo de cada nó, auditoria WCAG ou teste com estudantes.

O Notion03 original prioriza PHP; AGENTS§16 e o pedido posterior autorizam duas trilhas equivalentes. Vale a decisão atual do projeto. Os planos04–19 ainda precisam dessa adaptação; não alteramos o Notion.

## 2. Método e significado dos estados

A matriz tem duas dimensões que não devem ser confundidas:

- **Estado publicado:** `Coberto`, `Parcialmente coberto`, `Ausente` ou `Não verificado`, sempre relativo ao ensino disponível e ao recorte indicado. `Coberto` introdutório não promete domínio avançado.
- **Currículo planejado:** registra o que o Notion original já prevê. `Ausente` no site com plano detalhado **não é lacuna de planejamento** nem razão para antecipar assunto. Recomendações descrevem se há implementação futura normal, aprofundamento contextual ou ausência curricular confirmada.

Profundidade: **D1** menção/noção; **D2** mecanismo + exemplo/atividade; **D3** projeto local executável com testes fornecidos; **plano** objetivos/atividades documentados, sem aula publicada. D3 não significa que os testes foram reexecutados nesta auditoria ou que a tentativa do estudante foi validada. Nível profissional é julgamento pedagógico desta análise, não norma ou garantia de emprego.

Marcas alternativas foram agrupadas por competência, em vez de reproduzir a árvore ou exigir um produto por nó. Sem percentuais de “completude”:225 nós do payload incluem geometria, rótulos, navegação, alternativas e sobreposições.

### Evidências locais usadas na matriz

| ID | Arquivos/escopo diretamente inspecionados |
| --- | --- |
| E00 | [estruturas](../src/content/stage-00/lessons/estruturas.mdx), [algoritmos-fundamentais](../src/content/stage-00/lessons/algoritmos-fundamentais.mdx), [recursao](../src/content/stage-00/lessons/recursao.mdx), lesson-activities/flow-challenges e exercícios00 |
| E01 | [http](../src/content/stage-01/lessons/http.mdx), [seguranca](../src/content/stage-01/lessons/seguranca.mdx), HTML/CSS/DOM/tipos/async, index/exercícios01 |
| E02-H | [estado](../src/content/stage-02/lessons/estado.mdx), urls/metodos/mensagens/cors/[rest](../src/content/stage-02/lessons/rest.mdx), features/web/http e contracts |
| E02-N | [redes](../src/content/stage-02/lessons/redes.mdx), [tls](../src/content/stage-02/lessons/tls.mdx), features/web/network |
| E02-G | [shell](../src/content/stage-02/lessons/shell.mdx), curl/git/colaboracao, modelos shell/git e exercícios02 |
| E03-P | PHP/Composer/Laravel, especialmente [laravel-testes](../src/content/stage-03/lessons/laravel-testes.mdx), exemplos php-basics/laravel-api |
| E03-JS | JS/TS/Node/Express, especialmente [express-validacao](../src/content/stage-03/lessons/express-validacao.mdx), [node-io](../src/content/stage-03/lessons/node-io.mdx), exemplos node-http/express-api; Nest opcional |
| E03-T | [dependencias-testes](../src/content/stage-03/lessons/dependencias-testes.mdx), laravel-testes/express-testes, testes dos projetos e exercícios03 |
| E03 | [curriculum.ts](../src/content/stage-03/curriculum.ts), [model.ts](../src/features/progress/model.ts), [plano das duas trilhas](etapa-03-trilhas.md), ciclo/configuracao/decisao/projeto |

Referências N00–N19 são as páginas originais integralmente consultadas, listadas na seção8. Seções `§` correspondem aos cabeçalhos numerados dessas páginas, não a linhas do código.

## 3. Matriz de cobertura

A versão [CSV](auditoria-roadmap-backend-matriz.csv) mantém todos os campos, inclusive o estado planejado em coluna própria. As linhas sobre sistemas operacionais, algoritmos, recuperação, continuidade das trilhas, critérios e limites complementam a comparação; não alegam que todos sejam nós obrigatórios do mapa público.

| ID / tópico | Etapas | Estado publicado | Evidência e profundidade | Importância | Plano e recomendação |
| --- | --- | --- | --- | --- | --- |
| M01 · Internet, resolução de nomes e domínios | 02 | Coberto | E02-N: redes — DNS, A/AAAA/CNAME, TTL, IP/host/porta; D2: explicação, diagnóstico e modelo local | Júnior: essencial | N02; operação posterior N08. **Recomendada:** Preservar; uma observação externa curta complementa o simulador, sem curso de redes adicional. |
| M02 · Hospedagem, processo servidor e infraestrutura | 02,03 → 08 | Parcialmente coberto | E02-N: tls; E03: linguagem-runtime; N08§1/3/4; D2 conceitual; operação ainda planejada | Júnior: essencial na08 | Reverse proxy/HTTPS/deploy detalhados N08. **Essencial:** Implementar na08 quando autorizada, sem exigir hospedagem paga ou Docker na03. |
| M03 · HTTP, mensagens, métodos, status e JSON | 01–03 → 04 | Coberto | E01: http; E02-H: urls/metodos/mensagens; E03: ciclo e APIs; D2 + D3 nos projetos locais | Júnior: essencial | N04 aprofunda contratos. **Recomendada:** Preservar a espiral: consumidor01, protocolo02, servidor03 e contrato04. |
| M04 · Navegador e fundamentos de frontend | 01 | Coberto | E01: HTML/CSS/DOM/async/http; exercícios de formulário/catálogo; D2, prática e integração local | Júnior: base de consumidor | React/Next/Tailwind opcionais. **Recomendada:** Manter ponte enxuta; diagnóstico por competência antes de acrescentar conteúdo frontend. |
| M05 · Uma linguagem backend, módulos, tipos e dependências | 03 | Coberto | E03-P/E03-JS: PHP/Composer ou JS/TS/Node; curriculum.ts; D2 + D3: CLI, bibliotecas e API | Júnior: essencial | N03 original PHP; ampliação autorizada em AGENTS§16. **Essencial:** Preservar escolha única; mapear resultados equivalentes nas etapas futuras. |
| M06 · Outras linguagens e frameworks alternativos | 03; eletivos | Ausente | E03 inventário restringe principais a PHP/Laravel e JS/TS/Express; Nest opcional; Ausência deliberada de outros percursos | Sem obrigação por nível | Python/Java/Go/Ruby/C#/Rust não são trilhas atuais. **Opcional:** Diferença legítima: não criar trilhas nem cobrar várias linguagens para espelhar opções públicas. |
| M07 · Controle de versão e colaboração | 02 | Coberto | E02-G: git/colaboracao; ex PR/conflitos; modelo features/web/git.ts; D2; evidência externa declarada | Júnior: essencial | N02 inclui execução Git/GitHub real. **Recomendada:** Preservar snapshots/staging e limites do remoto fictício; solicitar registro de uma prática real. |
| M08 · Hospedagem de repositórios: GitHub e alternativas | 02 | Parcialmente coberto | E02-G: PR/GitHub; verificação externa declarada; D2 em GitHub; outras marcas não ensinadas | Júnior: uma opção suficiente | GitLab não é requisito do plano. **Opcional:** Não adicionar GitLab só por constar como alternativa; ensinar conceitos transferíveis. |
| M09 · Banco relacional e PostgreSQL | 05 | Ausente | N05§1–4; roadmap.ts05 available:false; E03 usa JSON/Map; Plano detalhado; sem aula publicada | Júnior: essencial na05 | SQL manual, tipos, modelagem, consultas e persistência previstos. **Essencial:** Implementar na05; não confundir arquivo JSON com banco ou antecipar SQL na03. |
| M10 · Outros bancos SQL (MySQL/MariaDB/SQL Server/Oracle/SQLite) | 05; eletivos | Ausente | Sem percurso publicado de outros bancos SQL; N05 escolhe PostgreSQL; SQLite em artefato não comprova aula de banco; alternativas não obrigatórias | Júnior: um banco suficiente | Concentração em PostgreSQL é intencional. **Opcional:** Usar uma comparação breve quando houver requisito; não exigir outro servidor SQL. |
| M11 · Normalização, integridade e propriedades transacionais | 05 → 10 | Ausente | N05§1–4: 1FN–3FN/BCNF, constraints, transações; N10 isolamento; Plano detalhado; sem prática publicada | Júnior: base; Pleno: concorrência | Conteúdo já previsto. **Essencial:** Manter SQL/constraints antes do ORM e aprofundar concorrência na10. |
| M12 · Índices e análise de consultas | 05 → 10 | Ausente | N05 índices básicos; N10§1–4 EXPLAIN/BUFFERS/pg_stat_statements; Plano progressivo, sem medições atuais | Júnior: introdução; Pleno: análise | Já previsto em dois níveis. **Avançada:** Não exigir tuning na03/04; índices básicos05 e otimização medida10. |
| M13 · ORM, migrations e consultas N+1 | 03 noções → 05/10 | Parcialmente coberto | E03-P: laravel-testes e referências Model/migration; N05 Eloquent/N+1; D1 opcional publicado; ensino principal planejado | Júnior: essencial na05 | N05 tem SQL antes de ORM, mas rubrica acoplada a Laravel. **Essencial:** Adaptar competências à trilha JS sem escolher ORM por popularidade; não executar migrations na03. |
| M14 · Replicação, particionamento e CAP | 16 | Ausente | N16§1–4: réplicas/lag, partições, CAP/PACELC; Plano Sênior; nenhuma implementação publicada | Sênior: contextual | Já previsto. **Avançada:** Preservar na16; não usar réplica, sharding ou CAP como pré-requisito de CRUD. |
| M15 · Escolha de armazenamento não relacional | 05 orientação; 10/11 eletivo | Ausente | N10 Redis; nenhuma unidade comparativa NoSQL em N04–19; Uso planejado de chave-valor não cobre taxonomia/decisão | Pleno: contextual; Júnior: orientação opcional | Lacuna de comparação, não obrigação de novos bancos. **Opcional:** Comparar requisitos/modelos; implementar uma alternativa somente quando o problema justificar. |
| M16 · Bancos documentais (MongoDB/CouchDB) | 10/11 eletivo proposto | Ausente | Busca transversal E00–03 + leitura N04–19 sem unidade documental; Não ensinado nem planejado explicitamente | Pleno: conforme produto | Ausência curricular confirmada no escopo. **Opcional:** Oferecer eletivo comparando modelo documental e relacional, sem substituir PostgreSQL. |
| M17 · Bancos de grafos, colunares e séries temporais | 16; especialização | Ausente | N16 não desenvolve Neo4j/Neptune/DGraph, Cassandra/Scylla/ClickHouse ou Influx/Timescale; Sem unidade; marcas agrupadas como alternativas | Pleno/Sênior: especialização | Não previstos como ensino específico. **Avançada:** Explicar casos de uso se relevantes; não exigir um catálogo de produtos. |
| M18 · Bancos com sincronização em tempo real (Firebase/RethinkDB) | 11/16 eletivo | Ausente | Sem unidade específica E00–03 ou N04–19; Ausência; não equivale a WebSocket | Pleno: contextual | Não previstos. **Opcional:** Só investigar se o projeto exigir sincronização gerenciada, incluindo custos e controle de acesso. |
| M19 · APIs HTTP orientadas a recursos e representações JSON | 02–04 | Parcialmente coberto | E02-H rest e contracts.ts; E03 CRUD local; N04§1–6; D2 introdutório + D3 básico; contrato completo futuro | Júnior: essencial | N04 já prevê regras, filtros, paginação e serialização. **Essencial:** Aprofundar na04, preservando contratos e implementações de uma única trilha. |
| M20 · Descrição de API e OpenAPI | 02 introdução → 04 | Parcialmente coberto | E02-H verificador de contrato; N04 OpenAPI e exemplos; Contrato local não certifica OpenAPI; plano detalhado | Júnior: essencial na04 | Já previsto, sem aula04 publicada. **Recomendada:** Usar contrato autoral verificável; conferir compatibilidade com testes de cada stack. |
| M21 · GraphQL | 11 eletivo proposto | Ausente | Sem unidade E00–03 ou N04–19; Não ensinado/planejado explicitamente | Pleno: contextual | Diferença legítima de foco REST. **Opcional:** Não acrescentar ao núcleo Júnior; usar somente para uma necessidade de consultas demonstrada. |
| M22 · SOAP e integração legada | 11 eletivo proposto | Ausente | Sem unidade nos conteúdos consultados; Não ensinado | Pleno/Sênior: contexto de legado | Ausência não bloqueia percurso REST. **Opcional:** Preparar leitura de contrato legado apenas quando houver demanda real. |
| M23 · gRPC e contratos entre serviços | 11 | Ausente | N11§1–4 inclui gRPC/BFF opcionais; Planejado, não publicado | Pleno: conforme integração | Já previsto como opção. **Opcional:** Preservar alternativa, sem obrigar REST e gRPC na mesma entrega. |
| M24 · Cookies, sessão e ciclo de autenticação | 01/02 → 07 | Parcialmente coberto | E01 seguranca; E02-H estado; N07§1–4; D2 conceitual; sessão fictícia não é login operacional | Júnior: essencial na07 | Sessão/cookies, logout/CSRF e autorização previstos. **Essencial:** Implementar autenticação na07; não interpretar simulação02 como competência de segurança completa. |
| M25 · Credenciais, tokens, JWT e autenticação HTTP Basic | 02/03 contexto → 07 | Parcialmente coberto | E02-H headers/credenciais; E03 segurança básica; N07 JWT condicional; Noções; implementação de credenciais ainda futura | Júnior: saber distinguir; alternativa por necessidade | N07 privilegia sessão; JWT não é obrigatório. **Opcional:** Separar formato de token de protocolo; Basic/JWT não são etapas obrigatórias adicionais. |
| M26 · OAuth2, OpenID Connect e SAML | 13; especialização | Ausente | N13 OAuth2/PKCE condicional; sem unidade OIDC/SAML específica; OAuth planejado; OIDC/SAML não desenvolvidos | Pleno: integração; Sênior: governança | SSO específico é lacuna eletiva. **Opcional:** Investigar se houver SSO; não confundir OAuth com autenticação nem exigir todos os protocolos. |
| M27 · Autorização por recurso e papéis | 07 | Parcialmente coberto | E01/E03 explicam limites; N07 Policies/Gates/BOLA/IDOR; Fundamento publicado; aplicação real planejada | Júnior: essencial na07 | Plano detalhado, acoplado a Laravel. **Essencial:** Mesmos cenários de posse/permissão nas duas trilhas; não exigir arquitetura idêntica. |
| M28 · Cache HTTP, revalidação e cache compartilhado | 02 → 08 | Coberto | E02-H estado: no-cache/no-store/max-age/ETag/304; tls: CDN; D2 com modelo e limites explícitos | Júnior: base; operação08 | Cache de borda operacional ainda futuro. **Recomendada:** Preservar; distinguir de cache de aplicação e validar em ambiente real quando necessário. |
| M29 · Cache de aplicação: Redis e Memcached | 10 | Ausente | N10§3–5: TTL, invalidação, stampede; Redis condicional; Plano detalhado para Redis; Memcached não desenvolvido | Pleno: decisão medida | Cache já previsto; marca alternativa não essencial. **Avançada:** Implementar só com hipótese/medição e teste de invalidação; não exigir dois produtos. |
| M30 · Segurança web: CORS, XSS, CSRF, CSP e riscos OWASP | 01–03 → 07/13 | Parcialmente coberto | E01 seguranca/DOM; E02 cors/estado; E03 config/validação; N07/N13; D2 de fronteiras; programa de segurança futuro | Júnior: base; Pleno: revisão sistemática | Vários riscos já previstos; CSP específico não confirmado em profundidade. **Essencial:** Mapear risco→controle→teste; conferir CSP antes de chamar ausente, sem validar segurança por checklist. |
| M31 · Armazenamento de senhas e funções de hash | 07 | Ausente | N07§1–4: hash seguro; fonte OWASP; Planejado; nenhuma rotina de senhas publicada | Júnior: essencial na07 | Já previsto; não copiar lista de algoritmos como recomendações equivalentes. **Essencial:** Ensinar APIs seguras de senha; MD5/SHA rápidos não são opção equivalente a hash adaptativo de senha. |
| M32 · TLS/HTTPS, certificados e transporte | 02 → 08 | Coberto | E02-N tls/redes; N08 HTTPS; D2 no protocolo/diagnóstico; configuração prática futura | Júnior: compreender; operação08 | Já previsto. **Recomendada:** Não mover configuração operacional para03; manter identidade, cadeia e falhas claras. |
| M33 · Segurança do servidor e segredos | 03 → 08/17 | Parcialmente coberto | E03 configuracao e boundaries; N08 config/secrets; N17 ameaças/supply chain; D2/D3 local; hardening operacional futuro | Júnior: mínimo; Sênior: gestão de risco | Já previsto. **Essencial:** Manter loopback/segredos/erros desde03 e hardening proporcional na08. |
| M34 · Testes unitários e depuração | 00/03 → 06 | Coberto | E00 testes; E03-T testes/CLI e contraexemplos; N06 sistematização; D2 + referências executáveis D3 | Júnior: essencial desde03 | N06 aprofunda, não inicia testes. **Recomendada:** Não mover todos os testes para06; consolidar regressão/depuração depois da persistência05. |
| M35 · Integração, comportamento e testes funcionais | 03 → 06/13 | Parcialmente coberto | E03-T rotas HTTP/isolações; N06 PostgreSQL/fixtures/fakes; N13 E2E; D3 básico; banco/E2E ainda planejados | Júnior: base; Pleno: qualidade avançada | Já previsto progressivamente. **Essencial:** Mesmo comportamento nas duas trilhas, sem trocar evidência HTTP por mero build. |
| M36 · Integração contínua | 08 | Ausente | N08§5 CI; workflows da plataforma não são currículo executado pelo aluno; Plano, sem unidade publicada | Júnior: essencial na08 | Já previsto; introdução conceitual06 legítima. **Essencial:** Preservar na08; usar CI da API do estudante como evidência, não CI do StackTrail. |
| M37 · Entrega, implantação e rollback | 08 → 13/17 | Ausente | N08 deploy/rollback; N13 staging/CD; N17 recuperação; Plano em níveis; nada implementado como aula08 | Júnior: implantação simples; Pleno/Sênior: operação | Já previsto. **Essencial:** Não condicionar conclusão a serviço pago; diferenciar execução local e deploy observado. |
| M38 · Monólito, módulos, fronteiras e padrões proporcionais | 03 → 11 | Parcialmente coberto | E03 decisao/projeto; N11 coesão/vertical slice/monólito modular; D2/D3 de organização; arquitetura sistêmica futura | Júnior: base; Pleno: projeto | Já previsto. **Recomendada:** Preservar escolhas justificadas; não exigir Repository/Service só por convenção. |
| M39 · Microsserviços e SOA | 11 → 16 | Ausente | N11 compara monólito/microsserviços; SOA não desenvolvido como abordagem própria; Plano contextual; sem aula publicada | Pleno: comparar; Sênior: decisão | Microsserviços previstos; SOA nominal ausente. **Avançada:** Não transformar ausência do nome SOA em lacuna essencial; manter monólito como opção válida. |
| M40 · Práticas associadas a Twelve-Factor | 03 → 08/16 | Parcialmente coberto | E03 configuração/logs; N08 build/runtime/config; N16 stateless/workers; Práticas dispersas; rótulo/checklist completo não aparece | Júnior: práticas úteis; Pleno: síntese | Cobertura conceitual parcial já existe. **Recomendada:** Conectar práticas existentes em pequena síntese; não criar doze requisitos adicionais por título. |
| M41 · Arquitetura serverless | 11/16 eletivo | Ausente | Ausente como modelo explícito em N11/N16 e publicados; Sem desenvolvimento | Pleno/Sênior: conforme contexto | Hospedagem não prova serverless. **Opcional:** Comparar ciclo de vida, limites e custo só quando o produto justificar. |
| M42 · Service mesh | 16; especialização | Ausente | Sem unidade específica; retries/load balancing não equivalem a mesh; Sem desenvolvimento | Sênior: condicionado à arquitetura | Ausência legítima no núcleo. **Avançada:** Manter especialização; não exigir Kubernetes/mesh como sinal de senioridade. |
| M43 · Filas, brokers e processamento assíncrono | 12 | Ausente | N12§1–5: workers, database queue, retries, DLQ, duplicações, Outbox condicional; Plano detalhado sem depender de broker específico | Pleno: essencial conforme integração | Já previsto; Kafka/RabbitMQ alternativos. **Avançada:** Ensinar garantias/falhas antes de selecionar produto; não exigir ambos brokers. |
| M44 · Containers e alternativas de isolamento | 08 | Ausente | N08 Docker/Compose; nenhuma unidade publicada; LXC não previsto; Plano detalhado para Docker | Júnior: na08; alternativas opcionais | Fronteira08 explícita. **Essencial:** Não antecipar Docker à03/05 nem acrescentar LXC ao núcleo. |
| M45 · Orquestração com Kubernetes | 16/17 eletivo | Ausente | Mapa/Notion não exigem Kubernetes universalmente; Ausência como percurso obrigatório deliberada | Sênior: somente se operar esse ambiente | Diferença legítima. **Avançada:** Não condicionar progressão ou título profissional ao uso de um orquestrador. |
| M46 · Polling, SSE e WebSockets | 11/12 eletivo | Ausente | Nenhuma unidade explícita nos publicados ou N04–19; Lacuna eletiva confirmada | Pleno: comunicação conforme requisitos | Não confundir com banco realtime ou streaming LLM. **Opcional:** Comparar direção/latência/reconexão/custo após contratos e segurança; implementar uma escolha, não três. |
| M47 · Servidores web e reverse proxy | 02 noções → 08 | Parcialmente coberto | E02-N infraestrutura; N08§1/3/4 Nginx/PHP-FPM; D2 conceitual; operação prevista | Júnior: na08 | Nginx já previsto; Caddy/Apache/IIS alternativas. **Essencial:** Adaptar proxy HTTP para Node e integração PHP-FPM no Laravel; não confundir HTTP proxy com FastCGI. |
| M48 · Capacidade, balanceamento e escala | 02/03 noções → 16 | Parcialmente coberto | E02-N balanceador; E03 modelos de execução; N16 capacidade/Little/workers; Introdução; plano Sênior detalhado | Sênior: medições e decisão | Já previsto. **Avançada:** Não adicionar sharding ou benchmark de linguagem à formação inicial. |
| M49 · Resiliência, limitação, backpressure e degradação | 03 noções → 12/16 | Parcialmente coberto | E03 node-io streams; N12 retries/timeouts; N16 shedding/circuit/bulkhead; Noções pontuais; sistema resiliente não implementado | Pleno/Sênior: conforme riscos | Já previsto; conferir política de deslocamento de carga no projeto concreto. **Avançada:** Explicitar ponte e hipótese; não assumir equivalência entre backpressure local e controle distribuído. |
| M50 · Instrumentação, métricas, logs e tracing | 03 → 08/14/17 | Parcialmente coberto | E03 logs/request ID; N08 estruturados; N14 RED/USE/OTLP; N17 SLO; Logs locais publicados; observabilidade sistêmica planejada | Júnior: logs; Pleno/Sênior: diagnóstico/SLO | Já previsto. **Avançada:** Preservar progressão; não marcar tracing coberto só porque há request ID. |
| M51 · Fundamentos de IA e técnicas de assistência | 00–03 transversal → 14/18 | Parcialmente coberto | E00–03 prompts/dicas/reflexão; guia Notion transversal; N14/N18 riscos; Uso consultivo desenvolvido; funcionamento de LLM não é curso publicado | Júnior: uso responsável; especialização opcional | Responsabilidade e avaliação previstas. **Recomendada:** Manter critérios/evidências e tentativa própria; IA não substitui testes nem exige API paga. |
| M52 · IA para revisão, refatoração, documentação e ferramentas | 00–03 → 18 | Parcialmente coberto | components/lab/reviewPrompt.ts; ReviewDialog; N18 revisão/delegação; Prompt editável sem envio; governança futura | Todos: responsabilidade proporcional | Marcas de editores não são requisitos. **Recomendada:** Não criar módulos obrigatórios por marca de IDE/modelo; avaliar qualidade da revisão e decisão. |
| M53 · Integrações LLM: streaming, saídas estruturadas e chamadas de ferramentas | 14/18 eletivo | Ausente | N14§3/5 ferramentas/MCP/validação; streaming e mecanismos específicos não desenvolvidos; Segurança/contexto parcialmente planejados; implementação ausente | Pleno: especialização opcional | Lacuna de mecanismos, não requisito universal. **Opcional:** Criar eletivo somente para produto com IA; separar streaming HTTP, schema e ciclo de ferramenta. |
| M54 · RAG, embeddings e busca vetorial | 14/18 eletivo | Ausente | N14§3 RAG conceitual; N18§4ex08 protótipo opcional; vetores/indexação detalhados não verificados; Planejamento conceitual; profundidade de implementação não verificada | Pleno/Sênior: especialização | Não é conteúdo backend universal. **Opcional:** Investigar dados/avaliação/recuperação antes de escolher banco vetorial; não ampliar núcleo Júnior. |
| M55 · MCP, skills e agentes | 14/18 eletivo | Ausente | Processo do projeto usa skills; guia transversal e N14/N18 tratam permissões/risco; Uso no desenvolvimento não é aula completa ao estudante | Pleno/Sênior: contextual | Mecanismos e avaliação futuros. **Opcional:** Distinguir uso interno do Codex, ensino e funcionalidades do produto; preservar aprovação humana. |
| M56 · Busca especializada e motores de pesquisa | 04/05 básica → 10/11 eletivo | Parcialmente coberto | E03 laravel-rotas: q/mb_stripos; node-io: busca simples; N04 filtros e N05 LIKE/ILIKE; Busca básica publicada; ranking/indexação textual não desenvolvidos | Pleno: quando busca simples não basta | Lacuna eletiva; não ausência de toda busca. **Opcional:** Experimentar busca PostgreSQL antes de justificar motor separado; medir qualidade/limites. |
| M57 · Projetos por dificuldade e consolidação | 03 → 09/15/19 | Parcialmente coberto | E03 cinco projetos locais; N09 R01–R08, N15 P01–P09, N19 S01–S09; Artefatos03 reais; evolução futura já planejada | Todos: projetos proporcionais | Ideia de projeto evolutivo já existe no original. **Recomendada:** Transformar em releases verificáveis de um domínio autoral; não copiar catálogo de desafios externo. |
| M58 · Sistemas operacionais: processos, threads, memória e inspeção | 02/03 → 08 | Parcialmente coberto | E02-G shell; E03 runtime/env/signals/fs; N08 processos/portas/permissões; Conceitos dispersos; sem ponte coesa de inspeção | Júnior: mínimo operacional; Pleno: aprofundar | Cobertura parcial, não curso de SO ausente inteiro. **Recomendada:** Conectar conteúdos existentes antes/próximo08; não bloquear API03 com teoria de SO extensa. |
| M59 · Algoritmos, estruturas e custo (diferencial StackTrail) | 00/03 | Coberto | E00 estruturas/algoritmos-fundamentais; E03 Map/arrays associativos; D2 com FlowPractice: busca, ordenação, frequência e complexidade | Júnior: introdutório; aprofundamentos opcionais | Mapa público atual não é lista exaustiva de DSA. **Recomendada:** Preservar; pequena prática de mapa/conjunto pode ajudar. Árvores/grafos/heaps não obrigatórios por comparação. |
| M60 · Backup e restauração (competência operacional complementar) | 08 → 17/19 | Ausente | N08§4 noções; §7ex09 opcional; N17 prática obrigatória; N19 consolidação; Planejado; não publicado | Júnior: recuperação mínima ao operar dados; Sênior: continuidade | Restore básico não é obrigatório no critério08 atual. **Essencial:** Propor dump→restore isolado mínimo08 quando houver persistência; PITR/RTO/RPO/ensaios permanecem17. |
| M61 · Equivalência das trilhas nas etapas futuras | 04–19 | Ausente | AGENTS§16 e docs/etapa-03-trilhas.md; N05 rubricaLaravel; N07PHP obrigatório; N09stackLaravel; Dívida de planejamento reconhecida; não há percurso JS futuro equivalente | Júnior: essencial antes da04; Pleno/Sênior: continuidade | Lacuna real de progressão após escolhaJS03. **Essencial:** Reformular objetivos/aceitação por competência e produzir uma implementação escolhida por estudante; sem dupla entrega. |
| M62 · Critérios obrigatórios versus aprofundamentos | 04/10/12/14 | Ausente | N04 limites de ProblemDetails/timeouts; N10 cache condicional; N12 Outbox; N14 IA contraditória; Planos específicos têm obrigações editoriais ambíguas | Todos: clareza de avaliação | Inconsistência documental confirmada. **Essencial:** Harmonizar enunciado, projeto, rubrica e avanço antes de implementar; implementação opcional não vira gate oculto. |
| M63 · Conteúdo detalhado de todos os links externos e aprendizagem real | 00–19 | Não verificado | Auditoria de famílias e planos; artigos de cada nó, biblioteca Notion completa e estudantes fora do escopo; Não houve ensaio de aprendizagem nem auditoria técnica integral de cada aula | Todos: limite de evidência | Não inferir qualidade pela contagem de nós ou links. **Recomendada:** Validar unidades específicas na implementação; manter pendências e não declarar certificação ou cobertura percentual universal. |

## 4. Lacunas confirmadas e diferenças legítimas

### Lacunas a corrigir no planejamento, após aprovação

1. **Continuidade das duas trilhas — essencial (M61).** A escolha publicada na03 não continua de forma equivalente nos planos: N04 usa Form Requests; N05 atribui parte da rubrica a Laravel; N07 exige PHP/Laravel; N09 fixa essa stack. Isso pode bloquear quem escolheu JS/TS. Definir primeiro contratos, invariantes, evidências e critérios neutros; apresentar caminhos equivalentes em Laravel ou Node/Express. Não exigir duas implementações nem escolher um ORM JS sem investigação própria. A dívida já está reconhecida em `docs/etapa-03-trilhas.md`.
2. **Obrigatório versus opcional — essencial (M62).** N04 contém tensão entre limites declarados e exigências de Problem Details, timeouts e idempotência; N10 condiciona cache ao benefício, mas alguns entregáveis sugerem obrigatoriedade; N12 precisa distinguir explicar Outbox de implementá-lo; N14 pede protótipo de IA em atividade/entrega e também o declara opcional. Harmonizar aula, exercício, projeto, rubrica e avanço. Não resolver a ambiguidade tornando tudo obrigatório.
3. **Recuperação mínima de dados na08 — essencial quando houver operação com persistência (M60).** Backup não está ausente: N08 inclui noções e exercício opcional; N17 exige prática aprofundada. Falta assegurar um ensaio mínimo de exportação e restauração isolada antes de considerar concluída uma entrega com dados persistentes. Manter PITR, RTO/RPO e continuidade operacional nas etapas avançadas.
4. **Ponte operacional dispersa — recomendada (M58).** Processos, variáveis, portas, permissões e runtime já aparecem em02/03/08. Falta uma atividade curta que conecte processo, configuração e diagnóstico. Não é justificativa para inserir um curso extenso de sistemas operacionais antes da primeira API.
5. **Extensões de produto — opcionais/avançadas.** Não há unidade explícita de banco documental, GraphQL, SSE/WebSocket ou busca textual especializada. Há busca básica já publicada em01/03 e aprofundamento previsto04/05, Redis10 e integrações posteriores. As ausências são reais no recorte consultado, mas não impedem a formação Júnior proposta. Servem a eletivos com problema e critérios próprios, não a uma lista obrigatória de ferramentas.

### Conteúdo adequado que deve ser preservado

- **00:** estruturas, algoritmos, complexidade introdutória, prática visual e transferência; não acrescentar árvores, grafos e heaps como obrigação por contagem de tópicos.
- **01:** consumidor HTTP, DOM, TypeScript e estados de interface. React/Next/Tailwind continuam opcionais. Um diagnóstico pode reduzir repetição para quem já domina os objetivos; esta auditoria não altera critérios de conclusão.
- **02:** HTTP, DNS/TLS, cookies/sessões, cache/ETag, CORS, Git, shell e contratos já vão além dos títulos. Simuladores não comprovam operação externa.
- **03:** linguagem/runtime/dependências, validação, erros, testes e projetos locais; escolha entre PHP/Laravel e JS/TS/Node/Express, com Nest opcional. Arquivos JSON e Map não são apresentados como substitutos da futura formação em banco.
- **Planos05–19:** SQL antes do ORM, testes, segurança, Docker/deploy, otimização medida, filas, observabilidade, arquitetura e confiabilidade já têm progressão documentada. A ausência de aulas publicadas dessas etapas é trabalho futuro autorizado separadamente, não evidência de currículo inexistente.
- **Projetos09/15/19:** já consolidam níveis crescentes. A contribuição externa é tornar essa continuidade mais explícita e verificável, não inventar a ideia de projetos no StackTrail.

Uma linguagem, um banco principal e um framework escolhido bastam para cada percurso. GitLab, outros bancos SQL, Kubernetes, service mesh, vários brokers, SSO e provedores LLM não devem entrar por popularidade. O catálogo público reúne alternativas e especializações; não representa uma sequência obrigatória única.

## 5. O que mudar de posição — e o que manter

| Proposta | Justificativa e limite |
| --- | --- |
| Trazer somente um restore mínimo para08, quando houver dados persistentes | Recuperação verificável acompanha a primeira operação; manter continuidade, PITR, RTO/RPO e incidentes em17/19. Não antecipar Docker para03. |
| Preservar a síntese comum de decisão/projeto03 depois da trilha escolhida | Essa ordem já existe em index.ts, na sequência filtrada de LessonPage e no dashboard StageThree. Não é lacuna nem mudança pendente; os critérios dependem de uma API já construída. |
| Conectar conteúdos operacionais existentes02/03 na preparação da08 | Evitar dependência circular de Docker para entender processos ou executar a primeira API. Instalação e execução local bastam antes da08. |
| Manter HTTP02 → implementação03 → contratos/regras04 | Repetição com objetivos diferentes é progressão; não deslocar todo REST para02 nem toda validação para04. |
| Manter SQL/modelagem/ORM05; testes básicos03 e aprofundamento06 | Não remover testes dos exemplos03 nem exigir banco/ORM para completar fundamentos03. |
| Manter cache aplicado10, filas12 e observabilidade14; infraestrutura08 | Noções anteriores podem contextualizar. Não exigir Redis, broker ou tracing distribuído para concluir o núcleo Júnior. |
| Manter IA de produto como eletivo14/18 | Uso de ferramentas de IA no desenvolvimento não obriga construir produto com IA. Resolver a contradição do plano14 sem ampliar o núcleo. |

Não foi demonstrada necessidade de renumerar etapas inteiras. As principais correções são de critérios, continuidade e pequenas pontes.

## 6. Projeto original progressivo proposto

**Central de Reservas Comunitárias:** catálogo de recursos compartilhados, pedidos de reserva e disponibilidade. A narrativa, os contratos e as atividades deverão ser elaborados pelo StackTrail após aprovação. Não é reprodução de um projeto do roadmap.sh. O estudante escolhe **Laravel ou Node/Express**; Nest é alternativa opcional posterior. Outro domínio equivalente pode ser escolhido, desde que preserve as competências e critérios.

| Marco | Evolução e pré-requisito | Evidência de aprendizagem proposta |
| --- | --- | --- |
| 03 — primeiro servidor | Catálogo em memória/arquivo e fluxo de requisição; fundamentos da trilha escolhida | Criar/listar recurso e demonstrar entrada inválida; explicar runtime e limites da persistência de estudo. Não acrescentar SQL. |
| 04 — contrato e regras | Evoluir a API03 com validação, invariantes de reserva, erros e documentação | Demonstrar reserva válida, conflito e entrada malformada; explicar a diferença entre erro de contrato e de negócio. Sem depender de banco. |
| 05 — persistência | Modelar recursos/reservas no PostgreSQL; SQL e constraints antes do ORM escolhido | Recriar schema, consultar dados e demonstrar rollback/violação de integridade. Não prometer evitar concorrência apenas por uma consulta prévia. |
| 06 — confiança nos comportamentos | Testes de regras e HTTP, fixtures isoladas e casos negativos | Introduzir uma regressão e mostrar um teste significativo falhar; restaurar comportamento. Não usar cobertura como prova de correção. |
| 07 — acesso e propriedade | Identidade e autorização por recurso; mecanismo adequado à stack/contexto | Demonstrar que outro usuário não altera reserva alheia, além dos caminhos autorizados; sem exigir JWT e sessão simultaneamente. |
| 08 — operação reproduzível | Docker/CI/deploy, configuração, saúde e dados persistentes | Terceiro inicia aplicação, pipeline detecta falha e restore isolado recupera amostra; sem exigir hospedagem paga. |
| 09 — consolidação Júnior | Release utilizável com documentação e limites das etapas anteriores | Outra pessoa reproduz o fluxo, executa testes e identifica decisões/limitações; evidência externa continua declarada quando não verificada diretamente. |
| 10–15 — evolução Pleno | Medir consulta problemática, modularizar quando necessário, processar confirmação em fila e observar falhas | Comparar antes/depois com cenário reproduzível; demonstrar repetição de job sem duplicar efeito; rastrear uma falha. Redis/Outbox entram apenas com justificativa. |
| 16–19 — evolução Sênior | Capacidade, falhas, objetivos de serviço, recuperação, custos e comunicação | Relatório de hipótese/carga, ensaio de incidente/recuperação e ADR com alternativas. Laboratório não equivale a experiência profissional ou título de senioridade. |

Cada release deve registrar: versão inicial, objetivo, mudança proposta, restrições, exemplo de falha, evidência obtida e limitações. Projetos podem evoluir sobre o mesmo domínio sem obrigar preservar uma arquitetura inadequada. Requisitos futuros não podem virar pré-requisitos retroativos. Em05, selecionar o caminho de ORM JS somente após comparar documentação, manutenção e adequação pedagógica; esta auditoria não escolhe ferramenta.

## 7. Priorização e implementação incremental proposta

| ID | Prioridade | Melhoria | Natureza / aceite proposto |
| --- | --- | --- | --- |
| P01 | Essencial | Neutralizar critérios04–19 e mapear PHP/JS | Lacuna real; cada objetivo possui um caminho suficiente e nenhuma entrega dupla. Começar04–09 antes de produzir novas aulas. |
| P02 | Essencial | Resolver obrigações contraditórias04/10/12/14 | Lacuna editorial; enunciado, rubrica, projeto e avanço concordam sobre o mínimo e os eletivos. |
| P03 | Essencial, condicional | Restore mínimo08 para entregas persistentes | Lacuna de gate operacional; recuperar amostra em ambiente isolado com evidência. Aprofundamento continua17. |
| P04 | Essencial no momento da etapa | Implementar núcleo já planejado04–09 | Continuação normal, não nova lacuna descoberta; contratos04, banco05, testes06, segurança07, operação08 e síntese09. Cada etapa depende de autorização própria. |
| P05 | Recomendada | Releases progressivas originais e critérios observáveis | Melhorar continuidade09/15/19 existente; um projeto escolhido e marcos proporcionais. |
| P06 | Recomendada | Ponte operacional e evidências externas curtas | Reusar02/03/08; diagnosticar processo/configuração/porta sem aumentar excessivamente a carga inicial. |
| P07 | Recomendada | Diagnóstico da base frontend e clareza de progresso | Avaliar objetivos já dominados e separar leitura, autoavaliação e execução comprovada; definir política antes de alterar cálculo existente. |
| P08 | Opcional | Eletivos NoSQL documental, GraphQL, SSE/WebSocket e busca | Cada eletivo começa por necessidade concreta; PostgreSQL FTS pode anteceder motor de busca separado. Nenhum bloqueia Júnior. |
| P09 | Avançada | Distribuição, capacidade, arquitetura e confiabilidade | Preservar10–19; ferramentas alternativas e especializações apenas com contexto e medições. |
| P10 | Opcional | IA de produto e mecanismos de integração | Separar uso assistido no estudo de produto LLM/RAG/MCP; tratar dados, avaliação, custos e falhas antes de marcas. |

### Fases e estado real

- [x] Fase A — levantamento comparativo, matriz, distinção publicado/planejado e recomendações documentadas nesta auditoria.
- [ ] Fase B — **aguardando aprovação:** harmonizar critérios e equivalência das trilhas no planejamento, começando04–09; esclarecer também as ambiguidades10/12/14. Nenhuma alteração efetuada.
- [ ] Fase C — **mediante autorização específica:** implementar uma fatia vertical04, com contrato, regra, atividade e avaliação nas alternativas escolhidas; revisar com as três skills antes de repetir o padrão.
- [ ] Fase D — **mediante autorização por etapa:** evoluir05 →06 →07 →08 →09, com banco, testes, acesso e operação; incorporar o restore mínimo na08 quando houver persistência.
- [ ] Fase E — **futura e opcional:** avaliar eletivos e aprofundamentos10–19 por demanda, sem transformá-los em gate Júnior.

Em cada fase autorizada: consultar novamente currículo e fontes aplicáveis, registrar alterações derivadas do currículo versus complementos, produzir exemplos verificáveis, revisar pedagogia e precisão de forma independente, auditar UX/acessibilidade pertinente e executar testes apropriados. Não aprovar por build ou links. O encadeamento principal03→04→05→06→07→08→09 não proíbe testes antes da06; API local03/04 não depende de Docker08. Eletivos não têm caminho de volta que bloqueie o núcleo.

**UX curricular:** mostrar escopo da trilha escolhida, distinguir conteúdo futuro de disponível, tornar obrigações e evidências compreensíveis e preservar controle do estudante. Não adicionar indicadores de aprovação automática para evidências declaradas. A aplicação da skill UI/UX nesta tarefa foi análise de recomendações e carga/navegação curricular; não houve inspeção visual nova, teste de foco, contraste ou certificação de acessibilidade.

## 8. Fontes, rastreabilidade e limites

### Referência complementar pública

- [Backend Developer](https://roadmap.sh/backend): página e grafo público consultados. Como a extração textual omitia a árvore interativa, o payload JSON embutido no HTML foi decodificado como dados, sem executar JavaScript externo. Foram observados225 nós, incluindo elementos decorativos; `updatedAt` do grafo: `2026-02-07T16:58:57.293Z` (não é data de atualização de todo o site). SHA-256 do JSON normalizado: `84845c6b1740d1210faba2579fc90993bcef6f4dab7682065afb4bf9aa0d7e0f`. O payload não foi incorporado ao repositório.
- [Projetos backend](https://roadmap.sh/backend/projects), [Task Tracker](https://roadmap.sh/projects/task-tracker) e [Caching Server](https://roadmap.sh/projects/caching-server): consultados para analisar progressão e evidências de entrega. Dificuldades do catálogo não equivalem automaticamente a cargos Júnior/Pleno/Sênior. Não foram copiados enunciados, requisitos específicos ou soluções.
- [Licença do repositório vinculado](https://github.com/nilbuild/developer-roadmap/blob/master/license) e [termos do site](https://roadmap.sh/terms): consultados. A licença encontrada tem condições próprias e restrições de republicação; não foi presumida licença MIT ou autorização geral de reutilização. Este relatório usa links, nomes técnicos e análise original; não reutiliza diagramas, imagens, textos de aulas nem arquivos de projetos. Não constitui parecer jurídico.

### Currículo original consultado pelo MCP do Notion

Guia [Roadmap Backend Developer 2026](https://app.notion.com/p/3f53cadfab778127857ef57e2220f721) e [página pai](https://app.notion.com/p/3f53cadfab7781b68266d8e1eeceeb81), além das páginas abaixo. As20 etapas foram lidas integralmente pela revisão dividida00–03/04–19, sem truncamento ou paginação/filhos pendentes na resposta recebida. A biblioteca separada do Notion não foi exaurida. Regras posteriores autorizadas pelo usuário prevalecem sobre versões antigas do plano.

| Referência | Página |
| --- | --- |
| N00 | [Etapa 00](https://app.notion.com/p/3f53cadfab77814bbaf1de279833217b) |
| N01 | [Etapa 01](https://app.notion.com/p/3f63cadfab77812494d8d5a0312f1a7a) |
| N02 | [Etapa 02](https://app.notion.com/p/3f63cadfab7781398a71cedc5c4a3994) |
| N03 | [Etapa 03](https://app.notion.com/p/3f63cadfab7781ad9194c805b33198d8) |
| N04 | [Etapa 04](https://app.notion.com/p/3f93cadfab778124be15ccb6e9a82199) |
| N05 | [Etapa 05](https://app.notion.com/p/3f93cadfab778181b817fb8d5a8d342a) |
| N06 | [Etapa 06](https://app.notion.com/p/3f93cadfab7781bcba5eeab7521fe2b3) |
| N07 | [Etapa 07](https://app.notion.com/p/3f93cadfab77816ab84ffc13e5308700) |
| N08 | [Etapa 08](https://app.notion.com/p/3f93cadfab77810ab608e0820787d9c9) |
| N09 | [Etapa 09](https://app.notion.com/p/3f93cadfab7781a994d5f0b0189e9dc6) |
| N10 | [Etapa 10](https://app.notion.com/p/3f93cadfab77813aab42fcd875db7905) |
| N11 | [Etapa 11](https://app.notion.com/p/3f93cadfab77818cb65affcc297eb6e1) |
| N12 | [Etapa 12](https://app.notion.com/p/3f93cadfab77817ba62ce117b817b840) |
| N13 | [Etapa 13](https://app.notion.com/p/3f93cadfab7781b4872bfe53a416aef0) |
| N14 | [Etapa 14](https://app.notion.com/p/3f93cadfab7781c68d8dfb9631de7e0a) |
| N15 | [Etapa 15](https://app.notion.com/p/3f93cadfab778133a456eb416f952f41) |
| N16 | [Etapa 16](https://app.notion.com/p/3f93cadfab7781be9daae1f7b92dd799) |
| N17 | [Etapa 17](https://app.notion.com/p/3f93cadfab778142b561fd6b4539c097) |
| N18 | [Etapa 18](https://app.notion.com/p/3f93cadfab77817a8028d0e1d23053d5) |
| N19 | [Etapa 19](https://app.notion.com/p/3f93cadfab7781d2b1f3cfaeb0fef317) |

### Verificação técnica das recomendações

| Conceito | Fonte primária consultada / seção | Resultado e limite |
| --- | --- | --- |
| Senhas não devem usar hash rápido genérico como mecanismo de armazenamento | [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), Introduction / Password Hashing Algorithms | **Verificada** a distinção entre hash de senha e hash genérico. Priorizar Argon2id quando disponível; parâmetros e suporte dependem do ambiente. A árvore listar MD5/SHA não implica recomendação de usá-los para senhas. Não reproduzir uma lista indiferenciada. |
| Cache HTTP não equivale a cache de aplicação | [MDN HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching), private/shared caches e validation | **Verificada** a distinção. O ensino de ETag/no-cache/no-store já publicado não prova ensino de Redis, invalidação distribuída ou prevenção de stampede. |
| Busca especializada pode começar no PostgreSQL | [PostgreSQL18, capítulo12](https://www.postgresql.org/docs/current/textsearch.html), Full Text Search | **Verificada** a existência de mecanismos de correspondência, indexação e ranking. **Dependente de contexto ou versão** escolher isso em vez de outro motor; não foi realizado benchmark ou comparação de relevância. |
| Recuperação precisa de procedimento e ensaio adequados ao mecanismo de backup | [PostgreSQL18, capítulo25](https://www.postgresql.org/docs/current/backup.html), SQL dump / file-system backup / continuous archiving | **Verificada** a distinção de mecanismos. A proposta de restore mínimo08 é julgamento de risco/pedagogia; não afirmar que dump oferece PITR ou que um teste garante toda recuperação futura. |
| SSE e WebSocket têm usos distintos | [MDN Using server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events), Receiving events; [RFC6455](https://datatracker.ietf.org/doc/html/rfc6455), §1.2/1.3 | **Verificada** comunicação servidor→cliente via SSE e comunicação bidirecional via WebSocket. Escolha **Dependente de contexto ou versão**; não exigir ambos nem confundir sincronização de banco gerenciado com protocolo. |

As versões referem-se às páginas consultadas, não a versões instaladas no projeto. As recomendações de distribuição de assuntos por nível são avaliações curriculares, não prescrições dessas fontes.

### Evidências executadas e pendências

- Inspeção documental/local, consultas MCP e web, extração do grafo público e conferência estrutural dos artefatos desta auditoria.
- **Não executados nesta tarefa:** `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, servidores dos projetos, simuladores ou fluxos de navegador. Não houve alteração do produto; resultados históricos não foram reapresentados como nova execução.
- Não verificados: todos os artigos externos de cada nó, todos os registros da biblioteca Notion, correção integral de cada afirmação das73 aulas, resultados com estudantes, custos de fornecedores, ambiente de produção, deploy e conformidade WCAG.
- Ausência significa ausência no corpus explicitamente consultado. Uma nova página, mudança externa ou requisito de produto pode justificar reclassificação. Planos não são evidência de funcionamento; teste finito também não prova correção universal.
- Revisão independente do levantamento: uma passagem00–03 e outra04–19, incluindo fontes originais. As recomendações não utilizaram os relatórios antigos como prova de correção. O estado final dos artefatos e eventuais ajustes da revisão estão registrados abaixo.

**Estado:** proposta documental; currículo, código do site e Notion preservados. A implementação depende da aprovação do usuário e de autorização para cada etapa futura.

### Conferência final dos artefatos

Duas revisões independentes reconferiram o relatório contra o levantamento: corrigidos estados publicados de M10/M15/M53/M55 (planos e ferramentas internas não são ensino publicado), acrescentada evidência de busca publicada em M56 e preservada a ordem de síntese03 já existente. Conferidos63 IDs únicos, quatro estados permitidos,20 referências de etapas, correspondência Markdown/CSV e existência dos links locais. `git diff --check` passou; os arquivos novos foram também inspecionados diretamente, pois arquivos não rastreados não entram nesse comando. Nenhum teste do produto foi executado.
