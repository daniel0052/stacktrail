# Etapa 11 — Arquitetura Backend e Design de Software

Recorte implementado em 20/10/2026, America/Sao_Paulo. Fonte curricular: anexo integral `cbb3b16f-4849-438a-b2d0-059ca41494b5`, fornecido pelo usuário. Instrução autossuficiente: não foi necessária nova consulta ao Notion. O anexo define objetivos; documentos técnicos primários sustentam requisitos. Não houve commit, push ou publicação externa.

## Escopo e organização

Etapas 00–11 disponíveis no build; 12–19 continuam pendentes. Júnior 00–09, Pleno 10–15 e Sênior 16–19 preservados. A antiga descrição planejada de 11 mencionava vertical slice, BFF e gRPC; o currículo integral vigente substitui esse planejamento por arquitetura pragmática, sem tornar esses conteúdos distribuídos obrigatórios ou deslocá-los silenciosamente para outra etapa.

Fontes externas ensinam. O site oferece objetivos, pré-requisitos, comparações a investigar, erros comuns, contratos de prática, referências e evidências. Não contém aulas geradas, implementação resolvida, código do estudante executável ou gabaritos. Duas APIs não são exigidas. Acesso não é bloqueado por pré-requisitos.

## Nove módulos e práticas

| Módulo | Cobertura | Exercícios e evidência |
| --- | --- | --- |
| 01 Arquitetura e qualidade | Requisitos funcionais/não funcionais, atributos, manutenção, testes, segurança, desempenho, evolução, dívida, complexidade e trade-offs | 01: comparar duas APIs equivalentes diante da mesma mudança; justificar desenho menor suficiente |
| 02 Coesão, acoplamento e SOLID | Responsabilidades, encapsulamento, composição, SRP/OCP/LSP/ISP/DIP contextualizados | 02 expedição/SRP; 03 contratos/LSP/ISP; 04 herança/composição/OCP; 05 relógio/injeção/DIP |
| 03 Camadas e monólito modular | HTTP versus regras, organização por tipo/funcionalidade, limites, dependências e comunicação | 06: reorganizar pedidos/catálogo, preservar contrato e demonstrar caso de uso independente de HTTP |
| 04 Actions e casos de uso | Intenção, orquestração, entrada/saída, erros, invariantes e controllers | 07: cancelamento com motivo, autorização, estado/histórico e rollback; idempotência não antecede módulo 07 |
| 05 Padrões aplicados | Strategy, Factory, Adapter, Observer, Decorator, DI/composição e Repository contextual | 08 frete; 09 provedores locais; 10 notificação/pós-commit/observabilidade; 11 remover abstrações redundantes |
| 06 DDD pragmático | Linguagem, domínio/subdomínio, contexto, entidade, valor, agregado, invariante, serviço/evento quando pertinentes | 12: modelagem de agenda e proteção concorrente, sem equiparar contexto a microsserviço |
| 07 Consistência | Atomicidade, commit/rollback, fronteiras, locks/constraints, isolamento, corrida, retry e idempotência | 13 pedido/estoque; 14 chave/replay; 15 reservas concorrentes e adjacentes |
| 08 Evolução e ADRs | Smells, caracterização, refatoração incremental, migração gradual, Strangler introdutório e decisões | 16 legado de entregas; 17 ADR contextual e molde vazio, sem decisão pronta |
| 09 Integrador | Regras, módulos, consistência, segurança, testes e defesa de trade-offs | 18 revisão de mudança em reservas; projeto profissional em sete marcos |

São **18 exercícios originais**: quatro iniciais (01/03/11/12), oito intermediários (02/04/05/06/07/08/09/17) e seis avançados (10/13/14/15/16/18). Setores: e-commerce, logística, serviços e agendamentos. Cada atividade tem ID estável, contexto, objetivo, pré-requisitos, requisitos/aceitação, entradas/saídas, casos adversos, três dicas graduais, entregáveis, rubrica e estratégia de verificação. Saídas são contratos esperados, não alegações de execução.

## Laravel e Express independentes

Laravel: Controllers, Form Requests, Models, Policies e container; Actions autorais, Jobs/Events apenas quando justificados. `DB::transaction` com escritas na mesma conexão; efeitos externos não são revertidos pelo banco. Action-Domain-Responder, Single-Action Controller e Architecture Decision Record são explicitamente distintos.

Express: Router/controller/middleware, validação, funções ou classes de caso de uso, domínio e persistência explícita. Knex + pg é query builder/driver, não ORM; usar o objeto transacional em toda a operação ou o mesmo client pg conforme a base. Express não oferece API transacional própria. Nenhuma estrutura Laravel é imposta literalmente e nenhum container é obrigatório.

O resolvedor de conteúdo mantém índices dos critérios e substitui apenas texto da stack. Referências da alternativa não selecionada são retiradas dos contratos/prompts resolvidos. Uma stack fornece dez tópicos base: nove módulos comuns e uma aplicação específica.

## Laboratórios Guiados e IA

Inventário 11: **A2/B9/C8**, incluindo projeto. A: 08/12. B: 01/02/03/04/05/09/11/15/16. C: 06/07/10/13/14/17/18/projeto. Inventário global passa a A76/B52/C52.

A não mostra preparação. B fornece código ou documento mínimo necessário; C aceita projeto próprio ou base alternativa e não exige integrador concluído. O exercício 18 começa antes da mudança de histórico. Preparadora gera apenas estado inicial, dependências, seed, instruções, smoke inicial e sintomas/roteiros; não produz causa/localização, patch, suíte-alvo, diagrama ou ADR justificado reservados ao estudante. Transação já existente de C14 e replay já existente de C18 são pré-requisitos legítimos da base, não melhorias a remover.

Tutora recebe tentativa e dicas efetivamente reveladas; oferece próxima pista. Revisora pede código, diferenças e evidências; distingue fatos, hipóteses e Não verificado, sem nota ou execução inventada. Todos os prompts são editáveis e copiados explicitamente, sem envio automático ou integração com modelos.

## Projeto: Sistema de Gestão de Reservas e Disponibilidade

Uma API com PostgreSQL: recursos/horários, reservas, consulta de disponibilidade, cancelamento/histórico, autenticação/autorização, conflito e repetição segura. Sete marcos: requisitos/linguagem; base/persistência; módulos/autorização; regras; transações/concorrência/idempotência; refatoração/testes; documentação/apresentação.

Contrato autoral: intervalos UTC `[início,fim)` por recurso; adjacência permitida, sobreposição ativa recusada, cancelamento libera ocupação. Falha intermediária não deixa escritas parciais. Chave por ator+operação por 24 horas: mesmo payload retorna o mesmo resultado aceito, payload divergente recusa, simultaneidade não duplica. Replay revalida autenticação/autorização atuais, inclusive perda de acesso do mesmo ator. Expiração pode permitir operação nova, comportamento declarado e testado. Sem prometer entrega externa exatamente uma vez.

Entrega: API, schema/migrations/seed, testes unitários/HTTP/PostgreSQL, README, endpoints, diagrama simples e pelo menos dois ADRs com contexto, problema, alternativas, decisão, consequências, status e data. Não exige frontend, microsserviços, NestJS ou hexagonal completa. Rubrica consultiva 30/25/20/15/10: regras/segurança, consistência, organização, testes/reprodução e documentação; site não calcula nota nem premia quantidade de padrões.

## Referências e livros

29 fontes técnicas/autorais no catálogo, com seção, idioma real, custo, versão/data e limites. Fontes de design são opiniões fundamentadas/contextuais, não regras universais. PostgreSQL `/current` identificado pelo revisor como 18; estudante registra major efetivamente usada. Laravel 13 redireciona para `/framework/docs/13.x/`. Ficha de Design Patterns é paga para obra, gratuita para catálogo/amostras; não afirmar livro gratuito.

Livros opcionais diretamente verificados: Fundamentos da Arquitetura de Software 2ª edição (2025, ISBN9788575229682), Aprenda Domain-Driven Design (1ª edição,2024,ISBN9788550819617), Refatoração (2ª edição,2020,ISBN9788575227244), Código Limpo (1ª edição,ISBN9788576082675; ano não informado no catálogo aberto). Não houve leitura integral. Todos têm alternativas gratuitas.

Também foram investigados Padrões de Projetos e O Programador Pragmático em PT: catálogos Grupo A bloquearam leitura direta com403/cache miss. Não foram promovidos a recomendações bibliográficas verificadas nesta etapa. Detalhes e URLs no [relatório factual](quality/stage11/source-independent.md).

Três capas reais de edições já incorporadas foram reaproveitadas em `public/assets/books/stage11/` e `public-roadmap/assets/books/stage11/`, atendendo à orientação anterior do usuário por imagens locais; sem hotlink, com alt/dimensões/fallback. Origem/hash/direitos em [covers-origin.json](quality/stage11/covers-origin.json). Não se presume licença livre. Aprenda DDD usa placeholder neutro porque não foi evidenciada autorização específica para incorporar a nova capa, conforme condição do anexo. Não foram inventadas imagens.

## Progresso, interface e compatibilidade

Reutilizados filtros combinados, etapa via URL/preferência/ativa/00, lotes de12 e rotas HashRouter com `/stacktrail/`. Iniciar no catálogo grava tentativa e abre atividade. Nove módulos inicialmente recolhidos em acordeão nativo exclusivo; links levam ao tópico, exercícios e integrador. Temas e tokens preservados.

Schema2 e chave `stacktrail:roadmap:1` mantidos; campos opcionais permitem dados antigos. Tentativas11 usam `@php/@javascript` e síntese `architectureEvidence` separada. Validação rejeita IDs/tipos/namespace desconhecidos; editar solução invalida checklist/revisão. Nenhuma alteração na chave legada ou estado da prova09. Regra de conclusão **autoral**, explícita: dez tópicos da única stack,18 exercícios,integrador e síntese; reversível, declarada e sem certificação. 12–19 não concluem por flags importadas.

## Arquivos

Criados: `src/practice/stage-eleven.ts`, `StageElevenModules.tsx`, `src/tests/stage-eleven.test.ts`, `e2e/stage-eleven.spec.ts`, este relatório, `quality/stage11/` e capas nas duas árvores públicas.

Modificados: curriculum/progress/achievements; App/Shared/StudyPages/ActivityPage/ProgressPage; preparation/preparation-prompt/prompts; CSS e metadados roadmap. Testes de sentinela futura agora12; inventário A/B/C e rota/zoom incluem11. Script de links e configuração Playwright incluem11. README só atualiza disponibilidade; índices, AGENTS e auditorias registram recorte/evidência. Nenhum pacote adicionado ou legado curricular reescrito.

## Auditorias, validação e limites

- [Educacional independente](quality/stage11/educator-review.md): lacunas apresentadas antes de corrigir; progressão07/18 e preparadora reconferidas; seis dimensões em3, sem bloqueante no recorte.
- [Factual independente](quality/stage11/source-independent.md): fontes efetivamente abertas e contraexemplos; autorização em replay, custos, neutralidade da base04 e siglas corrigidos/reconferidos; sem bloqueante conceitual aberto.
- UI independente e resultados finais dos comandos: anotação abaixo após término, sem antecipar sucesso.

Não foram executadas API, PostgreSQL, código do estudante ou futuras bases geradas por IA. Exercícios de concorrência são contratos para ambiente local, não ensaios de backend realizados pela plataforma. Sem deploy externo, contas pagas ou execução arbitrária. Testes automáticos/axe não certificam WCAG2.2AA nem substituem revisão completa com tecnologias assistivas. Build conserva aviso de chunk maior que500kB; sem dependência nova. Não houve commit/push automático.


Adendo de autonomia: cinco artigos autorais gratuitos em português do Refactoring Guru (Strategy, Factory Method, Adapter, Observer e Decorator) foram abertos nas seções de propósito, aplicabilidade e prós/contras. Integram módulo05/exercícios08–10, sem exigir compra da obra Design Patterns. Conteúdo web gratuito e produtos premium são distintos; fontes são didáticas autorais, não normas universais. Revisão factual independente complementar registrada no relatório de fontes.

O módulo08 também oferece um molde Markdown vazio de ADR (título,contexto,problema,alternativas,decisão,consequências,status e data),sem decisão respondida. Inspeção final da11 cobre abertura do módulo e reflow do molde em320px. Factory Method é identificado como variante específica por subclasses,não sinônimo de qualquer função fábrica.

### Resultados de execução

- `npm test -- --maxWorkers=2`: **521/521**,53 arquivos,70,28s. Resultado global após revisão de conteúdo; o acabamento final também recebe reconferência unitária do recorte11/laboratórios.
- `npm run typecheck`, `npm run lint` e `npm run build`:aprovados;nenhuma dependência nova. Build mantém aviso dechunk>500kB (JS1.473,01kB,gzip433,76kB).
- `npm run test:ui`: **67/67**,10,9min,sem falhas/instabilidade/omissões;420 rotas emdois temas,840 combinações;regressões00–10,profissional/inglês,prova09 e zoomreal200/400 incluídos. Rodada anterior apenas ao acabamento final de textos,cinco fontes e moldeADR.
- `npm run test:ui -- e2e/stage-eleven.spec.ts` no build final: **4/4**,46,3s;ambas stacks,fluxos/progresso/prompts/cópia/foco,filtros/lotes,livros e moldeADR,9rotas×5larguras×2temas,fonte150% eaxe sem excluir regras. Capturas preservadas em`quality/stage11/browser-final/`.
- `node scripts/check-practice-build.mjs`:48 arquivos,sentinelas/isolamento aprovados.
- `node scripts/check-practice-links.mjs`:33URLs da11,33HTTP200;adequação independente separada. Falhas deoutros recortes permanecem no acumulado.
- `git diff --check`:sem erros na conferência final.

Auditorias educacional/factual/UI independentes concluídas,com achados antes de correção e reconferências. P2 editorial corrigido;acabamento adicional conferido no build final. Nenhuma execução do backend do estudante nem certificaçãoWCAG/profissional foi alegada. Pendências editoriais externas:dois catálogosGrupoA inacessíveis e nova capaDDD sem autorização específica;fallback mantido. Aviso de tamanho do bundle permanece. Arquivos prontos para revisão,sem commit/push automático.

Reconferência final do acabamento:15/15 testes unitários do recorte11/laboratórios,lint e typecheck sem erros;revisão UI independente validou resíduos15/16 e modeloADR com teclado/reflow. Todos os achados apontados no recorte foram reconferidos;limitações externas permanecem explicitadas.
