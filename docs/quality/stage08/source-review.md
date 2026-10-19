# Etapa 08 — revisão independente de fontes

Consulta em 19/10/2026. Revisão somente leitura do conteúdo da aplicação; este relatório é o único arquivo escrito pelo revisor. AGENTS.md, skill factchecker, evidence-gate e currículo integral anexado foram consultados. Catálogos não equivalem à leitura dos livros. Nenhum Docker, Kubernetes, workflow ou código de estudante executado.

## Lacunas e riscos antes da implementação

- Não há garantia de prontidão em `depends_on` simples; `service_healthy` depende da qualidade do healthcheck e não substitui resiliência/reconexão da aplicação.
- `pg_isready` aceita parâmetros incorretos e ainda pode informar servidor disponível: não comprova autenticação, migrations nem consulta da API.
- Cluster KinD é laboratório local, não configuração validada de produção. Não exigir Ingress, banco dentro do cluster, HA ou nuvem.
- Não inventar mínimo universal de RAM para KinD. A sugestão de 4 vCPU/4 GB/40 GB é da apostila DevOps1; o quickstart oficial especifica 6 GB/8 GB para construir node-images em VM Docker Desktop, com ressalva de variação por carga.
- Readiness malsucedida retira tráfego; liveness pode reiniciar contêiner. Não tornar queda do PostgreSQL causa obrigatória de reinício da API.
- Secret não implica criptografia: base64 não oferece sigilo; ConfigMap só para dados não confidenciais.
- `kubectl rollout undo` reverte template de Pod conforme histórico, não banco/migrations/dados. Nova imagem local exige novo carregamento no cluster e política compatível.
- Kubernetes Basics PT-BR ainda menciona terminal Katacoda: não prometer funcionamento do terminal online. Leitura conceitual continua útil; prática planejada deve usar KinD.
- Nenhuma plataforma gratuita de hospedagem foi recomendada/verificada nesta revisão. Ambiente controlado local evita dependência de cartão/serviço pago.

## Fontes primárias abertas e recortes conferidos

Todas gratuitas para consulta; documentação corrente sem versão universal implícita, exceto onde indicada. Método: ferramenta web com leitura de seções; DevOps1 por navegador Chromium/Playwright devido falha do leitor web.

| Fonte / URL final | Idioma | Seções e adequação verificada | Limite |
| --- | --- | --- | --- |
| [Dockerfile reference](https://docs.docker.com/reference/dockerfile/) | EN | Overview; FROM, COPY, USER, EXPOSE, CMD/ENTRYPOINT, HEALTHCHECK | EXPOSE documenta porta; não publica porta do host. Referência acompanha frontend Dockerfile corrente. |
| [Building best practices](https://docs.docker.com/build/building/best-practices/) | EN | multi-stage; imagens base; excluir arquivos; cache; USER | Menor imagem não prova segurança; tags mutáveis exigem estratégia de atualização. |
| [Control startup and shutdown order in Compose](https://docs.docker.com/compose/how-tos/startup-order/) | EN | Control startup; exemplo PostgreSQL e service_healthy | Ordem não equivale disponibilidade; restart de dependência em operação Compose explícita não é supervisor universal. |
| [Linux post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) | EN | Manage Docker as a non-root user | Grupo docker concede privilégios equivalentes a root. Não apresentar inclusão no grupo como isolamento de segurança. |
| [Noções básicas GitHub Actions](https://docs.github.com/pt/actions/get-started/understand-github-actions) | PT-BR | workflows, eventos, jobs, steps, runners | CI verifica alterações; CD é entrega/implantação, não sinônimo automático de CI. |
| [Referência de uso seguro](https://docs.github.com/pt/actions/reference/security/secure-use) | PT-BR | privilégios mínimos; entradas não confiáveis; checkout; ações terceiras | permissions de leitura por padrão, elevar por job se necessário; não executar PR não confiável com segredos via pull_request_target. Tags podem mudar; SHA completo ou lockfile compatível reduz risco. URL antiga redireciona. |
| [Kubernetes Basics](https://kubernetes.io/pt-br/docs/tutorials/kubernetes-basics/) | PT-BR, links EN | criar, implantar, explorar, expor, escalar, atualizar | Conteúdo traduzido parcial; menciona Katacoda não validado. Não usar como promessa de terminal gratuito online. |
| [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) | EN | Updating, Scaling, Rolling Back; rollout history/undo | Deployment reconcilia réplicas; rollback não desfaz persistência externa. Exemplos antigos de tags não são baseline atual. |
| [Service](https://kubernetes.io/pt-br/docs/concepts/services-networking/service/) | PT-BR | seletores, portas, ClusterIP, tipos de Service | ClusterIP interno; LoadBalancer depende de componente/provedor adicional. |
| [ConfigMaps](https://kubernetes.io/pt-br/docs/concepts/configuration/configmap/) | PT-BR | motivação, consumo por env/volume, cuidado confidencialidade | ConfigMap não cifra e não serve para segredos. |
| [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) | EN | caution, uses, security | etcd por padrão sem criptografia; acesso por API/namespace exige cuidado e privilégio mínimo. |
| [Liveness, Readiness, Startup Probes](https://kubernetes.io/docs/concepts/workloads/pods/probes/) | EN | Types of probe; When to use each probe | Falha readiness não reinicia; liveness mal definida pode gerar falhas em cascata. URL antiga redireciona. |
| [KinD Quick Start](https://kind.sigs.k8s.io/docs/user/quick-start/) | EN | Installation, Creating a Cluster, Loading an Image, Settings for Docker Desktop | Runtime compatível; imagem local via kind load docker-image, cluster nomeado precisa --name; evitar latest ou definir IfNotPresent/Never. Requisitos variam. |
| [Laravel 13 Deployment](https://laravel.com/framework/docs/13.x/deployment) | EN | Server Requirements; Nginx; FrankenPHP; Caching Configuration; Debug Mode; Health Route | PHP>=8.3 nesta versão. Servir public, APP_DEBUG=false, permissões de escrita específicas. config:cache altera carregamento .env; não usar artisan serve como produção. URL /docs/13.x redireciona. |
| [Node.js: Running TypeScript using transpilation](https://nodejs.org/learn/typescript/transpile) | EN | Compiling TypeScript to JavaScript; tsc e execução JS | Build deve gerar artefato conhecido e processo Node executá-lo. Estratégia compilada é válida mesmo com opções recentes de execução nativa TS. |
| [PostgreSQL pg_isready](https://www.postgresql.org/docs/current/app-pg-isready.html) | EN | Description, Exit Status, Notes (documentação18 corrente) | Verifica estado de conexão, não credenciais/migrations; combinar com teste funcional da aplicação. |

## DevOps1 — fonte complementar efetivamente lida

[DevOps1 — Desenvolvimento e Operações na Web](https://devops-book.gitbook.io/devops1-desenvolvimento-e-operacoes-na-web): página identifica **Professor Hermano Pereira**, **UTFPR — Câmpus Guarapuava**, curso Sistemas para Internet; atualização declarada agosto2026. Português brasileiro; consulta gratuita. Estrutura:12 módulos que aproximam práticas Docker e Kubernetes/KinD; CRUD PHP/PDO com MariaDB nos módulos10–12.

Home e módulos1,3,7,8,11,12 lidos por Chromium/Playwright, HTTP200. Web reader falhou duas vezes; urllib403. Isso é falha de cliente separada da leitura bem-sucedida. A home sugere Ubuntu26.04 em VM4vCPU/4GB/40GB, sem tornar essa combinação obrigatória para o StackTrail.

Recortes úteis: [construção de imagens](https://devops-book.gitbook.io/devops1-desenvolvimento-e-operacoes-na-web/modulo-3-construcao-de-imagens-customizadas), [saúde/recursos](https://devops-book.gitbook.io/devops1-desenvolvimento-e-operacoes-na-web/modulo-7-saude-da-aplicacao-e-limite-de-recursos), [Compose](https://devops-book.gitbook.io/devops1-desenvolvimento-e-operacoes-na-web/modulo-11-projeto-crud-parte-2-subindo-a-stack-no-docker), [migração KinD](https://devops-book.gitbook.io/devops1-desenvolvimento-e-operacoes-na-web/modulo-12-projeto-crud-parte-3-migrando-para-kubernetes-kind).

Classificação **Dependente de contexto / Parcialmente correta**: material7 agrupa requests/limits como teto;12 chama KinD de ambiente pronto para produção. São simplificações inadequadas para reprodução no catálogo. Requests orientam agendamento e limits limitam consumo; KinD é local. Prompts e soluções externas não devem ser copiados; MariaDB não é substituto curricular imposto ao PostgreSQL. Sem ensaio de comandos ou leitura integral de todos12 módulos.

## Livros — catálogos oficiais lidos

Todos opcionais e pagos, substituíveis pelas documentações gratuitas acima. Não foi identificada licença explícita para redistribuir capas nos catálogos consultados: **usar placeholder neutro**, sem hotlink, até autorização/licença específica. Nenhuma imagem baixada pelo revisor; nenhuma obra integral presumida lida.

| Livro confirmado | Catálogo primário / dados | Recorte e limite |
| --- | --- | --- |
| Kubernetes: Tudo sobre orquestração de contêineres — Lucas Santos | [Casa do Código](https://www.casadocodigo.com.br/products/livro-kubernetes), PT-BR,08/2019,333p, ISBN978-85-7254-024-7; edição não explicitada no catálogo | Iniciante com base de contêineres; capítulos2,6,7,11–13,16 e apêndice kubectl. Nuvens/HPA/Ingress opcionais; terminologia antiga master/slave e versão2019 requerem documentação atual. |
| DevOps nativo de nuvem com Kubernetes: Como construir, implantar e escalar aplicações modernas na nuvem — John Arundel e Justin Domingus | [Novatec](https://novatec.com.br/livros/devops-com-kubernetes/), PT-BR,2019,384p, ISBN impresso978-85-7522-778-7 / ebook978-85-7522-779-4; edição não explicitada; catálogo marca esgotado | Capítulos2,4,5,7,8,10 pertinentes a introdução/objetos/saúde/configuração. Nuvem, Helm, operadores não são requisitos;2019 exige confronto com API atual. |
| Primeiros Passos com Docker: Uso de contêineres em produção — Karl Matthias e Sean P. Kane | [Novatec](https://novatec.com.br/livros/primeiros-passos-docker/), PT-BR,2015,240p, ISBN978-85-7522-473-1; edição não explicitada; esgotado | Apenas leitura histórica opcional; não recomendar como guia de comandos atuais. Preferir docs atuais. |

Outra obra conferida, não indicada como base Júnior: [Padrões para Kubernetes](https://novatec.com.br/livros/padroes-para-kubernetes/), Bilgin Ibryam e Roland Huß,2019,272p, ISBN978-85-7522-814-2, PT-BR, pago/ebook. Catálogo exige familiaridade prévia e inclui operadores/autoscaling: aprofundamento além do núcleo08.

## Estado

Fontes e riscos registrados; revisão do conteúdo implementado pendente até existir src/practice/stage-eight.ts. A consulta documental não demonstra execução de laboratórios nem valida futuros códigos gerados por IA externa.

## Reconferência do primeiro catálogo implementado

`src/practice/stage-eight.ts` lido integralmente em19/10/2026: oito módulos + runtimes,16 exercícios e integrador. Sem YAML/Dockerfile resolvido distribuído. Requisitos preservam readiness versus liveness, rollback versus migrations, loopback, volume compatível com imagem PostgreSQL, uma stack e alternativa de hardware explicitamente não executada.

**Achado concreto enviado antes da correção:** referência08-node usa página *Running TypeScript with a runner* (`/en/learn/typescript/run`), mas requisito é compilação prévia `tsc` e Node sobre JS. A página foi aberta: aborda ts-node/tsx; é parcialmente adequada, mas a fonte específica correta é [Running TypeScript code using transpilation](https://nodejs.org/en/learn/typescript/transpile), seção *Compiling TypeScript to JavaScript*. Ajustar título/URL/seção. Reconferência da correção pendente.

Referências novas efetivamente abertas e conferidas:

| URL | Idioma / recorte | Resultado |
| --- | --- | --- |
| https://docs.docker.com/get-started/ | EN, entrada de introdução | Acesso confirmado; índice, complementar às páginas específicas, não prova isolada de todos conceitos. |
| https://docs.docker.com/compose/ | EN, introdução Compose | Acesso confirmado; links Getting started/How-tos/Reference, complementar à startup-order. |
| https://docs.docker.com/build/concepts/context/ | EN, .dockerignore files; Filename/location | Adequado: exclusão antes de enviar contexto; arquivo por Dockerfile pode prevalecer. |
| https://docs.docker.com/build/building/multi-stage/ | EN, use multi-stage builds | Adequado: separar estágios e copiar artefatos necessários ao runtime. |
| https://docs.docker.com/engine/storage/volumes/ | EN, lifecycle/persistência e remoção | Adequado a persistência fora do writable layer; não garante backup. |
| https://docs.github.com/pt/actions/about-github-actions/understanding-github-actions | PT-BR | Redireciona para `/pt/actions/get-started/understand-github-actions`; conteúdo pertinente. Preferir URL final. |
| https://docs.github.com/pt/actions/writing-workflows/workflow-syntax-for-github-actions | PT-BR, permissions, jobs, events | Redireciona para `/pt/actions/reference/workflows-and-actions/workflow-syntax`; `permissions` suporta escopo global/job e permissões omitidas viram none quando conjunto explicitado. |
| https://expressjs.com/en/advanced/best-practice-performance.html | EN, environment, NODE_ENV, restart | Redireciona para `/en/advanced/best-practice-performance/`; adequado a processo/ambiente de produção, não prova de término gracioso por si só. |
| https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/ | EN, configure readiness/liveness/startup | Adequado; soma prática à fonte conceitual de probes. |
| https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/ | EN, describe/get/logs, waiting/image | Adequado ao diagnóstico; waiting/pull são hipóteses observáveis, não causa universal. |
| https://kubernetes.io/pt-br/docs/home/ | PT-BR, índice conceitos/tarefas | Entrada válida; tradução parcial e referências EN específicas cobrem lacunas. |

Não executados: containers, cluster, workflow remoto ou conteúdo futuro gerado externamente. Prompts/laboratórios08 ainda não presentes nos arquivos `preparation.ts`, `preparation-prompt.ts` e `prompts.ts` no momento desta leitura; dependem da integração subsequente.

Fonte de encerramento gracioso conferida separadamente: [Express Health Checks and Graceful Shutdown](https://expressjs.com/en/advanced/healthcheck-graceful-shutdown/), EN, seção Graceful shutdown: SIGTERM, parar de aceitar novas requisições, concluir pendentes, liberar recursos e encerrar. Adequada ao requisito de runtime08; não copiar exemplo resolvido para o bundle. Secure-use EN e Service EN também abertos e pertinentes. ConfigMap EN falhou neste leitor; PT-BR lido com sucesso, distinção de cliente preservada.

## Reconferência após correções e integração

Leitura de `stage-eight.ts`, `curriculum.ts`, `ActivityPage.tsx`, `preparation.ts`, `preparation-prompt.ts` e `prompts.ts` em19/10/2026:

- **Resolvido:**08-node agora aponta à transpilation, com título e seção pertinentes; Actions utiliza URLs finais; fonte Express de shutdown adicionada; DevOps1 tem autoria e ressalvas corretas.
- **Resolvido:** `promptFor`08 possui contexto próprio de Docker/Compose/CI/deploy/Kubernetes/KinD, sem herdar restrições04. Revisora solicita artefatos/evidências e separa análise de execução.
- **Resolvido:** `activityForTrack` substitui runtime somente na redação, preservando quantidade/índices de critérios; UI, tutora/revisora e preparadora usam a função. Uma stack continua suficiente.
- **Resolvido:** preparadora08 não proíbe CI/deploy; infraestrutura só pode vir quando estiver no estado inicial do contrato.17 contratos separados reservam solução/diagnóstico/infraestrutura-alvo ao estudante; base de projeto anterior continua alternativa.
- **Bind / loopback:** restrição descreve explicitamente portas publicadas no host e port-forward em127.0.0.1, mantendo interface interna apropriada em containers/Pods. Não há proibição equivocada de tráfego interno por exigir loopback dentro do container.
- **Hardware:** alternativa KinD permanece identificada como análise com manifestos/rastros-fixture, sem alegação de comandos ou cluster executados. Revisora admite evidência analítica e não a confunde com execução comprovada; contrato não inventa RAM mínima universal.
- **Livros:** dois catálogos correspondem a títulos/autores/ano/ISBN conferidos. Placeholder local/componente neutro documentado em razão de ausência de licença, sem fingir capas reais armazenadas.

**Único achado residual enviado antes de correção:**08-config usa URL PT-BR mas herda `language='Inglês'` de `ref()` e seção emEN. Corrigir metadados de idioma/seção; conteúdo técnico é adequado. Nenhum novo bloqueante conceitual encontrado na leitura desses contratos. Isso não certifica a execução futura das bases geradas externamente, a UI nem o progresso; testes/auditorias respectivos permanecem responsabilidade das verificações efetivamente executadas.

### Encerramento da revisão independente

Reconferido no código:08-config agora declara `Português brasileiro` e seção `Motivação, ConfigMaps e Pods, limitações`, coerentes com a fonte efetivamente lida. Achado residual **corrigido e reconferido**. Todos os achados factuais desta revisão tiveram correção confirmada; nenhum bloqueante conceitual identificado no recorte revisado. Nenhuma infraestrutura foi executada, nenhuma base futura gerada externamente foi certificada, e este encerramento não substitui os testes funcionais/visuais do integrador.

## Atualização posterior — capas reais solicitadas explicitamente

Após o encerramento acima, o usuário reiterou o pedido de buscar e salvar capas reais na pasta pública. A decisão anterior de placeholder está preservada como histórico e **não descreve o estado final atual**. Revisor inspecionou visualmente os dois WebP e releu os catálogos oficiais em19/10/2026:

- `kubernetes-lucas-santos.webp`: capa exibe *Kubernetes — Tudo sobre orquestração de contêineres*, Lucas Santos e Casa do Código/Alura.341×480,15418 bytes. Correspondência bibliográfica com catálogo Casa do Código, ISBN9788572540247,2019. Fonte registrada: `https://www.casadocodigo.com.br/cdn/shop/products/Kubernetes_ebook_large.jpg?v=1631656334`.
- `devops-nativo-kubernetes.webp`: capa exibe *DevOps nativo de nuvem com Kubernetes*, subtítulo, John Arundel e Justin Domingus, Novatec/O'Reilly.292×407,24774 bytes. Correspondência com catálogo Novatec, ISBN9788575227787,2019. Fonte registrada: `https://s3.novatec.com.br/capas-ampliadas/capa-ampliada-9788575227787.jpg`.

Manifesto lido: `docs/quality/stage08/book-covers.json`. Comparação binária confirmou cópias idênticas em `public/assets/books/stage08/` e `public-roadmap/assets/books/stage08/`; bytes e SHA256 coincidem com os dois registros. O catálogo08 usa caminhos relativos `assets/books/stage08/*.webp`, dimensões e textos alternativos correspondentes. Essa revisão confirma identidade visual, metadados e integridade local; verificação HTTP/renderização no GitHub Pages pertence aos testes do integrador.

**Condições:** direitos reservados aos titulares; nenhuma licença livre ou autorização editorial geral foi encontrada/atribuída. O pedido explícito do usuário explica a mudança de implementação, mas não constitui prova de licença concedida pelas editoras. Não inferir licença da disponibilidade pública da imagem. Uso registrado como identificação bibliográfica a pedido, sem hotlink; não se presume leitura integral das obras. Fallback de falha permanece adequado, mas as capas configuradas atualmente são imagens reais locais.
