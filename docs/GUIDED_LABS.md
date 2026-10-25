# Laboratórios guiados — 18/10/2026

Atualização de 23/10/2026: catálogo técnico publicado00–13, inventário global A82/B73/C63 (Toolkit documental independente). Os recortes datados abaixo permanecem históricos; a seção Etapa12 e sua matriz registram a extensão atual.


## Achados anteriores à implementação

Auditoria do catálogo técnico publicado 00–07; áreas profissional e inglês e legado fora do recorte. IDs, requisitos de conclusão e tentativas são preservados.

| Lacuna | Efeito | Estado inicial |
| --- | --- | --- |
| Exercícios de testes06 pressupõem módulos/APIs sem fornecer ponto de partida | Estudante precisa resolver outra atividade antes de praticar testes | Em correção |
| Depuração06/segurança07 e revisão de contrato02 pressupõem defeitos ou artefatos | Não há reprodução estável | Em correção |
| Continuações01/03/04/05/07 não oferecem alternativa ao projeto próprio | Dependência artificial de projeto anterior | Em correção |
| Prompts atuais só possuem ajuda/revisão | Não distinguem preparação de resolução | Em correção |
| Enunciados06-ex-07/08 antecipam causa/técnica | Investigação perde autonomia | Em correção; ajuste pontual, sem alterar IDs/critério de evidência |

## Contrato e limites

A = construir do zero ou artefato suficiente no próprio enunciado. B = material externo necessário (inclusive fixture/mock/especificação, sem exigir aplicação quando não precisa). C = evolução de projeto próprio com alternativa gerada. Preparação não gera progresso.

Metadados por ID em `src/practice/preparation.ts`; sem código inicial, respostas ou prompts inteiros duplicados. Enunciado, requisitos e rubrica continuam no catálogo. O preparador recebe contrato de estado anterior, material mínimo e o que deve permanecer para o estudante; não recebe rascunhos nem dicas. Ajuda pede tentativa/observação/hipótese e próxima pista. Revisão pede diff/testes/evidências e distingue fatos, hipóteses e insuficiência.

IA externa deve verificar instalação, sintaxe, inicialização e reprodução quando tiver ferramentas; caso contrário declarar não validado. StackTrail não executa nem atesta os projetos produzidos. Bases variam; contratos comportamentais permanecem. Somente dados sintéticos, ambiente local, sem credenciais, exploração de terceiros, publicação ou Docker antes08. Bases vulneráveis são deliberadamente inadequadas para produção.

O inventário e as evidências executadas estão registrados abaixo; as limitações permanecem explícitas.

## Inventário completo (108 atividades)

62 A, 22 B e 24 C. Critérios, resultado esperado e requisitos permanecem na atividade identificada pelo ID, sem cópia divergente nesta tabela. Os estados iniciais e o trabalho reservado de B/C estão em preparation.ts; as versões completas entram no prompt por composição. 08–19 não possuem atividades publicadas a preparar.

| ID | Tipo | Atividade | Trilha | Material inicial / decisão |
| --- | --- | --- | --- | --- |
| 00-pf-01 | A | Planejar uma feira de troca | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| 00-pf-02 | A | Interpretar um registro de entradas | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| 00-pf-03 | A | Desenhar a retirada de um pacote | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| 00-pf-04 | A | Conferir o caixa de uma campanha | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| 00-pf-05 | A | Depurar a conferência de etiquetas | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| 00-pf-06 | A | Dividir um pedido de impressão | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| 00-pf-07 | A | Encontrar uma inscrição | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| 00-pf-08 | A | Conferir empréstimos de equipamentos | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| 00-pf-09 | A | Ordenar e consultar sem perder dados | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| 00-pf-10 | A | Representar a soma recursiva | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| 00-pf-11 | A | Comparar estratégias de consulta | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| 00-pf-12 | A | Investigar um laço sem término | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| 00-pf-13 | A | Reutilizar um modelo sem expor dados | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| ex-01 | A | Cadastro de contato com validação | Frontend comum | Enunciado suficiente / construção autoral |
| ex-02 | A | Lista de tarefas persistente | Frontend comum | Enunciado suficiente / construção autoral |
| ex-03 | A | Busca de catálogo local | Frontend comum | Enunciado suficiente / construção autoral |
| ex-04 | B | Buscador de usuários com API | Frontend comum | Mock HTTP de usuários, lista e detalhe; fixtures JSON sintéticas. |
| ex-05 | B | Agendamento frontend com mock de API | Frontend comum | Mock HTTP de agendamentos com GET/POST. |
| ex-06 | B | Dashboard de livros | Frontend comum | Mock HTTP de livros com título, categoria e identificador. |
| ex-07 | B | Painel de administração de agendamentos | Frontend comum | Mock CRUD de agendamentos. |
| ex-08 | B | Carrinho e checkout simulado | Frontend comum | Mock de catálogo de produtos. |
| ex-09 | C | Comparativo CSS puro vs Tailwind | Frontend comum | Formulário de contato em HTML/CSS puro/TypeScript. |
| extra-react | C | Revisitar uma interface com React | Frontend comum | Lista de tarefas em HTML/CSS/TypeScript. |
| extra-next | C | Investigar uma fronteira no Next.js | Frontend comum | Lista interativa React mínima. |
| 02-ex-01 | A | Anatomia de 10 requisições | Ferramentas HTTP/Git | Enunciado suficiente / construção autoral |
| 02-ex-02 | A | Terminal e cURL | Ferramentas HTTP/Git | Enunciado suficiente / construção autoral |
| 02-ex-03 | A | Git colaborativo simulado | Ferramentas HTTP/Git | Enunciado suficiente / construção autoral |
| 02-ex-04 | A | Contrato de API de biblioteca | Ferramentas HTTP/Git | Enunciado suficiente / construção autoral |
| 02-ex-05 | B | Diagnóstico de falhas | Ferramentas HTTP/Git | Cenários locais independentes de falhas de rede e HTTP. |
| 02-ex-06 | B | Cookies e sessão | Ferramentas HTTP/Git | Endpoint local emissor de cookies e página de consulta. |
| 02-ex-07 | A | Laboratório HTTP ponta a ponta | Ferramentas HTTP/Git | Enunciado suficiente / construção autoral |
| 02-ex-08 | B | Revisão de contrato HTTP | Ferramentas HTTP/Git | Especificação HTTP defeituosa de biblioteca em Markdown. |
| 02-ex-09 | A | Entrega profissional com Pull Request | Ferramentas HTTP/Git | Enunciado suficiente / construção autoral |
| 03-php-01 | A | Exercício PHP-01 — Classe Livro e Catálogo CLI | PHP | Enunciado suficiente / construção autoral |
| 03-php-02 | A | Exercício PHP-02 — Estrutura de Projeto PHP e Ciclo Web/CLI | PHP | Enunciado suficiente / construção autoral |
| 03-php-03 | A | Exercício PHP-03 — Primeiras Rotas Laravel (GET /health e GET /books) | PHP | Enunciado suficiente / construção autoral |
| 03-ts-01 | A | Exercício TS-01 — Catálogo CLI em TypeScript Strict | TS | Enunciado suficiente / construção autoral |
| 03-ts-02 | A | Exercício TS-02 — Estrutura de Projeto Node.js e TypeScript | TS | Enunciado suficiente / construção autoral |
| 03-ts-03 | A | Exercício TS-03 — Primeiro Servidor HTTP (GET /health e GET /books) | TS | Enunciado suficiente / construção autoral |
| 03-php-04 | C | Exercício PHP-04 — Validação de Entrada, Erros Consistentes e Logs | PHP | API Laravel mínima de livros em memória. |
| 03-php-05 | A | Exercício PHP-05 — Catálogo Laravel (GET, POST, PATCH, DELETE, Middleware e Testes) | PHP | Enunciado suficiente / construção autoral |
| 03-php-06 | C | Exercício PHP-06 — Organização de Responsabilidades e Testes no Laravel | PHP | API Laravel de catálogo com regras concentradas no controller. |
| 03-ts-04 | A | Exercício TS-04 — API Express em Memória (GET, POST, PATCH, DELETE) | TS | Enunciado suficiente / construção autoral |
| 03-ts-05 | C | Exercício TS-05 — Validação em Runtime, Middlewares, Erros e Logs no Express | TS | API Express CRUD de livros em memória. |
| 03-ts-06 | C | Exercício TS-06 — Testes Automatizados de Endpoints e Validação | TS | API Express de catálogo em memória. |
| 03-ex-07 | A | Exercício 07 — Construção da API Funcional na Stack Escolhida | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 03-ex-08 | C | Exercício 08 — Portabilidade de Contrato entre Stacks (Opcional) | PHP ou TS; SQL quando pertinente | API de referência de dois recursos mínimos. |
| 03-ex-09 | C | Exercício 09 — Revisão Técnica e ADR da Stack Escolhida | PHP ou TS; SQL quando pertinente | API pequena de catálogo com organização simples. |
| 03-ts-extra-nest | A | Exercício Extra (Opcional) — Catálogo Modular com NestJS | TS | Enunciado suficiente / construção autoral |
| 04-ex-01 | A | Exercício 01 — Contrato primeiro (Design de Recursos e Status HTTP) | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 04-ex-02 | A | Exercício 02 — CRUD básico REST na trilha escolhida | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 04-ex-03 | C | Exercício 03 — Validação de entrada e proteção contra mass assignment | PHP ou TS; SQL quando pertinente | CRUD de livros /api/v1 em memória. |
| 04-ex-04 | C | Exercício 04 — Serialização segura e contratos de saída (API Resources / Output DTOs) | PHP ou TS; SQL quando pertinente | CRUD de livros /api/v1 em memória. |
| 04-ex-05 | C | Exercício 05 — Listagens com paginação, busca, filtros e ordenação segura | PHP ou TS; SQL quando pertinente | API de livros com listagem simples. |
| 04-ex-06 | A | Exercício 06 — Regras de negócio e conflitos de estado em Agendamentos (422 vs 409) | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 04-ex-07 | C | Exercício 07 — Padronização de erros com RFC 9457 (Problem Details) | PHP ou TS; SQL quando pertinente | API de salas/reservas em memória. |
| 04-ex-08 | C | Exercício 08 — Idempotência (Idempotency-Key), timeouts e falhas externas (Opcional) | PHP ou TS; SQL quando pertinente | API de reservas e adaptador de notificação local. |
| 04-ex-09 | C | Exercício 09 — Especificação OpenAPI 3.1, coleção e revisão técnica de contrato | PHP ou TS; SQL quando pertinente | API REST de livros em memória com contrato observável. |
| 05-ex-01 | A | E-commerce: catálogo e estoque | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 05-ex-02 | A | RH: normalização de colaboradores | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 05-ex-03 | A | Educação: relatórios SQL de matrículas | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 05-ex-04 | A | Logística: entregas e desempenho | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 05-ex-05 | A | SaaS: integridade de assinaturas | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 05-ex-06 | A | Saúde: persistência de atendimentos | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 05-ex-07 | A | Fintech: transferência atômica | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 05-ex-08 | B | Marketplace: investigação de consultas lentas | PHP ou TS; SQL quando pertinente | Esquema e carga determinística de pedidos/produtos. |
| 05-ex-09 | A | ERP: compras, recebimento e estoque | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 06-ex-01 | B | Exercício 01 — E-commerce: Cálculo de Descontos e Cupons | PHP ou TS; SQL quando pertinente | Módulo de descontos de e-commerce sem suíte de domínio. |
| 06-ex-02 | B | Exercício 02 — RH: Validação e Cálculo de Férias com Controle de Datas | PHP ou TS; SQL quando pertinente | Validador de férias sem suíte de domínio. |
| 06-ex-03 | B | Exercício 03 — SaaS: Testes de Endpoints HTTP de Planos e Assinaturas | PHP ou TS; SQL quando pertinente | API mínima de planos/assinaturas sem suíte HTTP. |
| 06-ex-04 | B | Exercício 04 — Logística: Testes de Operações e Transições de Estado de Entregas | PHP ou TS; SQL quando pertinente | API de entregas sem suíte HTTP. |
| 06-ex-05 | B | Exercício 05 — Marketplace: Testes de Integridade e Constraints no PostgreSQL | PHP ou TS; SQL quando pertinente | Migrations e acesso local a orders/order_items. |
| 06-ex-06 | B | Exercício 06 — Notificações: Simulação de Falhas Externas com Mocks e Fakes | PHP ou TS; SQL quando pertinente | Serviço de notificações com fronteira HTTP substituível, sem rotas extras. |
| 06-ex-07 | B | Exercício 07 — Fintech: Reprodução e Teste de Regressão em Operação Financeira | PHP ou TS; SQL quando pertinente | Módulo de estornos parciais com desvio determinístico. |
| 06-ex-08 | B | Exercício 08 — ERP: Investigação de Falha Intermitente em Lote de Estoque (com Aprofundamento) | PHP ou TS; SQL quando pertinente | Operação de baixa de estoque e harness de concorrência. |
| 06-ex-09 | C | Exercício 09 — Auditoria de Qualidade e Plano de Testes de uma API de Serviços | PHP ou TS; SQL quando pertinente | API de catálogo com PostgreSQL e suíte incompleta. |
| 07-ex-01 | A | SaaS: mapa de acesso | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 07-ex-02 | A | E-commerce: login administrativo | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 07-ex-03 | C | RH: proteção de rotas | PHP ou TS; SQL quando pertinente | API de RH com identidade por sessão já existente. |
| 07-ex-04 | C | Marketplace: autorização de pedidos | PHP ou TS; SQL quando pertinente | API de pedidos com autenticação básica existente. |
| 07-ex-05 | B | Saúde: proteção de dados | PHP ou TS; SQL quando pertinente | API local de clínica com campos sintéticos. |
| 07-ex-06 | C | Reservas: testes de segurança | PHP ou TS; SQL quando pertinente | Booking API com criação pública e sessão administrativa. |
| 07-ex-07 | C | ERP: papéis e permissões | PHP ou TS; SQL quando pertinente | ERP de pedidos com sessão e ownership prévios. |
| 07-ex-08 | C | Fintech: limites e auditoria | PHP ou TS; SQL quando pertinente | API de suporte com sessão básica local. |
| 07-ex-09 | B | Auditoria de segurança de uma API local | PHP ou TS; SQL quando pertinente | API pequena de recursos multiusuário deliberadamente vulnerável. |
| 00-project-library | A | Biblioteca — versão algorítmica | Sem linguagem obrigatória | Enunciado suficiente / construção autoral |
| 01-project-books | B | Catálogo de livros responsivo | Frontend comum | Mock HTTP do acervo de biblioteca. |
| 01-project | B | Central de Reservas Comunitárias | Frontend comum | Mock HTTP de salas e reservas. |
| 02-project-investigador | A | Investigador HTTP | Ferramentas HTTP/Git | Enunciado suficiente / construção autoral |
| 02-project-contrato-biblioteca | A | Contrato de API de biblioteca | Ferramentas HTTP/Git | Enunciado suficiente / construção autoral |
| 02-project-diagnostic-lab | B | HTTP Diagnostic Lab | Ferramentas HTTP/Git | Fixtures de rede/cookies/cache e contrato inicial de biblioteca. |
| 03-project-cli | A | Backend Foundations CLI | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 03-project-catalog-api | A | Book Catalog API | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 03-project-foundations-lab | A | Backend Foundations Lab | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 04-project-catalog-basic | A | Projeto 1 (Iniciante) — API de Catálogo REST | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 04-project-catalog-advanced | A | Projeto 2 (Intermediário) — API de Catálogo Avançada (Paginação, Problem Details e OpenAPI) | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 04-project-booking-api | A | Projeto 3 (Avançado — Principal) — Booking API: REST & Business Rules | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 05-project-ecommerce | A | E-commerce Database | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 05-project-logistics | A | Logistics Analytics | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 05-project-billing | A | SaaS Billing API | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 05-project-booking | C | Booking API com PostgreSQL — continuidade | PHP ou TS; SQL quando pertinente | Booking API em memória da Etapa04. |
| 05-project-equivalent | A | Projeto autoral de persistência — proposta equivalente | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 06-project-testing-kata | A | Testing Kata: Regras de Negócio e Casos de Borda | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 06-project-api-quality-lab | A | API Quality Lab: Testes HTTP, Banco PostgreSQL e Resiliência | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 06-project-bug-hunt | C | Bug Hunt & Regression Portfolio: Investigação, Depuração e Correção com Evidências | PHP ou TS; SQL quando pertinente | API pequena com três relatos de defeitos independentes. |
| 07-project-admin | A | Secure Admin Login | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 07-project-resources | A | Multi-User Resource API | PHP ou TS; SQL quando pertinente | Enunciado suficiente / construção autoral |
| 07-project-booking | C | Secure Booking Platform | PHP ou TS; SQL quando pertinente | Booking API anterior à segurança07. |


## Decisões após revisão independente

- Revisão pedagógica classificou inicialmente63 A / 21 B / 24 C. A implementação mantém02-ex-06 como B (22 B / 62 A): o endpoint controlado de cookies permite experimentar sem depender de sessão/credenciais de site público. Nenhuma análise de atributos vem resolvida.
- 05-ex-02 permanece A: campos/regras e criação de quatro registros já fazem parte do enunciado.06Testing Kata eAPI Quality Lab permanecem A: construir módulo/API é objetivo explícito. Modelagens/fixtures autorais05 não são terceirizadas indiscriminadamente.
- 01 gera somente mock/fixtures por interface; não implementa frontend nem exige que estudante programe backend.03/04 continuações recebem somente capacidades anteriores;05Booking não recebe persistência pronta;07Booking não recebe segurança pronta.
- 06-ex-07/08 tiveram ajustes pontuais para retirar causa/técnica antecipadas, mantendo IDs e quantidade de critérios. A política financeira fixa10000centavos brutos,250retidos e9750líquidos; não fixa algoritmo de solução. Os hints continuam graduais. A soma pública de parcelas é dado de teste, não código ou patch.

## Exemplos de preparação por trilha

No laboratório 06-ex-03 a escolha PHP produz “Stack do material: PHP + Laravel” e uma API mínima GET /api/v1/plans / POST /api/v1/subscriptions com catálogo sintético e contratos200/201/404/422, **sem a suíte HTTP solicitada**. A escolha TypeScript produz “TypeScript + Node.js + Express” com o mesmo contrato inicial. Dependências e versões compatíveis devem ser escolhidas/verificadas pela IA externa; o site não atesta versões futuras.

No 06-ex-01 a base é somente módulo PHP+Composer ou TypeScript+Node, sem framework.05-ex-08 é SQL puro (PostgreSQL+clienteSQL), sem Node obrigatório.01 usa Mockoon ou ferramenta equivalente com GUI, sem introduzir Laravel/Express.02-ex-08 é apenas especificação Markdown defeituosa, sem aplicativo.

Os 46 prompts preparadores são compostos sob demanda pelo mesmo builder, cada qual com material/estado inicial/trabalho reservado específico do ID, requisitos/IO/critérios atuais e reprodução fixa quando pertinente. Não há 46 textos genéricos copiados nem código-base no bundle. A lista completaB/C acima é também o inventário de prompts disponíveis.

## Arquivos deste recorte

Novos: `src/practice/preparation.ts`, `preparation-prompt.ts`, `PreparationPanel.tsx`, `src/tests/guided-labs.test.ts`, este relatório e evidências `quality/guided-labs/`.
Alterados neste recorte: `ActivityPage.tsx`, `prompts.ts`, `stage-six.ts`, `e2e/practice.spec.ts`, `AGENTS.md`, `README.md`, `docs/README.md`, `DOCUMENTATION_AUDIT.md`, `CONTENT_VERIFICATION.md`, `QUALITY_AUDIT.md`. Alterações locais anteriores em outros arquivos e nesses arquivos compartilhados foram preservadas; não são atribuídas a laboratórios. Nenhum commit/push/deploy.

## Verificações e limites

- 479 testes automatizados/49 arquivos passaram nesta rodada, incluindo6 casos de catálogo/contratos/papéis/estado. Cobertura explícita de IDs exige nova auditoria quando catálogo muda.
- Typecheck, lint, build e isolamento do build principal passaram. Chunk principal continua acima 500 kB (aviso pré-existente; não corrigido neste recorte).
- Playwright inicial:2/2 fluxos labs passaram. Matriz ampliada incluiu axe com painel e modal, fonte 150%, temas claro/escuro e larguras 320/375/768/1024/1440. Fechamento após execução global abaixo.
- Revisões pedagógica, técnica eUI independentes foram somente leitura. Bloqueantes demonstrados foram corrigidos e reconferidos. UI independente navegou com contexto isolado, sem tocar progresso pessoal; examinou capturas claro375/escuro320/1024.
- Nenhum projeto de estudante/IA externa foi executado, nem foi contatado serviço deIA. Bases futuras devem ser verificadas localmente. Ausência de violaçõesaxe não certificaWCAG. Zoom real200/400 tem limitação conhecida de inicialização doChromium com extensão noWindows, reconferida separadamente na suíte global; viewport/fonte não substituem browserzoom.

O currículo original e suas fontes permanecem nos catálogos existentes; o Notion não foi reconsultado para esta funcionalidade de preparação. Não houve nova etapa ou ampliação de objetivos. As mudanças autorais06 restringem-se à clareza do contrato e retirada de respostas antecipadas. Referências técnicas da preparação foram consultadas pelo revisor independente e registradas em CONTENT_VERIFICATION.md.

Capturas datadas em `quality/guided-labs/`: claro375/escuro1440 e modais320 com fonte150%. Inspeção visual confirma ações alinhadas e ausência de overflow horizontal nas capturas examinadas; o modal usa rolagem local em telas estreitas. Isso não substitui as verificações funcionais eaxe nem cobre todas as combinações possíveis.

## Fechamento da rodada de 18/10/2026

| Verificação | Resultado observado |
| --- | --- |
| Catálogo e contratos | 108 IDs auditados: 62 A, 22 B, 24 C; seis regressões específicas passaram |
| Testes automatizados completos | 479 testes / 49 arquivos passaram; após inclusão final das restrições no prompt, os seis testes específicos passaram novamente |
| Typecheck, lint e build | Passaram; lint final após remoção do script temporário de inspeção também passou |
| Build principal / Pages | HashRouter e base /stacktrail/ preservados; verificador de isolamento passou, sem ZIPs/MDX/entrada legada |
| Suíte Playwright global | 34 testes: 32 aprovados, duas falhas na rodada original |
| Reconferência dos laboratórios | Os dois testes passaram no build final, incluindo A/B/C, clipboard, stack, ciclo de atividade, fonte150%, cinco larguras, ambos os temas, axe com painel/modal e teclado |
| Falha de foco na rodada original | Expectativa do teste corrigida após inspeção: dialog nativo rolável pode receber foco após browser chrome antes do textarea. A reconferência verifica ausência de foco nos controles ao fundo e retorno ao campo |
| Falha de zoom real | Pendente por ambiente: Chromium com extensão falha ao iniciar com spawn UNKNOWN. Zoom200%/400% não validado; fonte/viewport não usados como substitutos |
| Auditorias independentes | Pedagógica, técnica e UI executadas, achados corrigidos e reconferidos no recorte; sem certificação de aprendizagem/WCAG |

As varreduras de rotas publicadas, reflow e axe passaram em claro e escuro na suíte global. O resultado agregado original continua marcado como falho no relatório Playwright, pois não foi apagado nem reescrito para ocultar as duas falhas. A reconferência corrigiu a falha de expectativa de foco; resta uma limitação ambiental conhecida, sem alegação de suíte integral verde. Evidências resumidas em [summary.json](quality/guided-labs/summary.json), capturas na mesma pasta e erro de zoom preservado em [zoom-environment-error.md](quality/guided-labs/zoom-environment-error.md).

Nenhum laboratório produzido por IA externa foi gerado ou executado nesta tarefa: validamos a aplicação, a composição dos prompts e os contratos. A verificação de cada base futura é responsabilidade do ambiente externo/local, com resultados reais ou declaração de não validação. Nenhum commit foi realizado.

## Etapa08 — 19/10/2026

17contratos adicionais:9 B (08-ex-01/04/05/07/09/11/12/15/16) e8 C (08-ex-02/03/06/08/10/13/14 e08-project-delivery). São bases anteriores à competência-alvo, nunca Dockerfile/Compose/pipeline/manifesto final para a atividade que os deve criar. Os contratos declaram runtime/provider, contexto descartável, bind interno apropriado e portas de host loopback; não herdam a proibição de Docker/CI/deploy das etapas anteriores. Hardware insuficiente admite fixture de análise claramente identificada, sem execução inventada. Detalhes e auditoria em STAGE_08_IMPLEMENTATION.md. Total atual:62 A,31 B e32 C; dados datados, não garantia permanente.

## Etapa09 —19/10/2026

Auditoria explícita de17atividades: A09-01/02/03/04/15 e portfólio; B09-08/09/10/11/12; C09-05/06/07/13/14/16. Totais acumulados:68A,36B,38C. A prova possui contrato preparador próprio separado das atividades; nunca contém solução, causa/localização dos bugs ou suíte-alvo. Metadados e limites em STAGE_09_IMPLEMENTATION.md.

## Etapa10 —19/10/2026

19atividades auditadas: A10-01/02/03/04/07/15; B10-06/08/12/14/16/17/18; C10-05/09/10/11/13 eprojeto. Totais acumulados74A/43B/44C. Ambientesreact/next/fullstack separados;PGobrigatório apenas na base alternativa dointegrador. Bases fornecem sintoma,fixture e estado anterior,semcausa/localização/patch ou suíte-alvo. Inventário detalhado e limitações emSTAGE_10_IMPLEMENTATION.md.

## Etapa 11 — inventário de 20/10/2026

Currículo integral autorizado: arquitetura backend e design.19 atividades,distribuição **A2/B9/C8**. A:11-ex-08/12. B:11-ex-01/02/03/04/05/09/11/15/16. C:11-ex-06/07/10/13/14/17/18 e11-project-reservations. Inventário global: **A76/B52/C52**,180 atividades.

Bases por ID estável empreparation.ts. C sempre permite projeto próprio ou alternativa mínima,sem exigir integrador concluído.18 parte de cancelamento sem histórico;14 parte de pedido transacional sem deduplicação. Preparadora não remove essas competências prévias nem entrega melhoria,suíte-alvo,causa/localização,diagrama ouADRrespondido.01 fornece duas bases equivalentes sem comparação pronta;15 fornece harness/sintoma concorrente com duasconexões,timeouts e sem espera circular ao introduzir locks. Smoke inicial não equivale ao teste-alvo. Módulospuros/documentos bastam quandoHTTP/banco não são necessários. Uma stack,loopback,dadossintéticos,PostgreSQLdescartável quando aplicável. Papéis editáveis/copiáveis distintos e sem envio automático. Não executamos futuras bases geradas.

# Engenharia com IA — inventário independente em 19/10/2026

Metadados por ID em `aiPreparations`, em `src/practice/preparation.ts`; contratos compostos em `aiPrompt`, em `ai-engineering.ts`. O catálogo de atividades é independente das etapas técnicas e seus prompts seguem os mesmos três papéis. Uma stack basta; dados sintéticos e loopback. Nenhuma base externa futura foi validada pelo StackTrail.

| Classe | IDs | Material inicial e autoria preservada |
| --- | --- | --- |
| A — do zero | ai-j1, ai-j2, ai-j6, ai-p1, ai-p2, ai-p7, ai-s1, ai-s2, ai-s3, ai-s4, ai-s6, ai-s-final | Documento/matriz ou artefato próprio; sem botão de preparação. Propostas são obtidas externamente ou por outra pessoa, sem solução no bundle. |
| B — base necessária | ai-j3, ai-j4, ai-j5, ai-p5, ai-s5, ai-j-final | API com sintoma reproduzível, módulo defeituoso, testes incompletos, consulta inicial ou pacote sintético de sinais. Sem diagnóstico/patch, benchmark inventado, relatório resolvido ou suíte-alvo. |
| C — projeto próprio ou alternativa | ai-p3, ai-p4, ai-p6, ai-p-final | Projeto próprio ou base mínima anterior à validação/refatoração/formulário/cancelamento. Não exige ter concluído etapa/projeto anterior; base alternativa não contém a melhoria pedida. |

Auditoria explícita: cada uma das 22 atividades possui classificação por ID; A não mostra preparação, B/C oferecem prompt editável separado da ajuda/revisão. Preparação não altera progresso. Júnior final oferece resolução independente e assistida, com o mesmo contrato. Execução de bases, código e testes acontece por decisão do estudante fora da plataforma.
# Toolkit — Planejamento de Projetos com IA, 22/10/2026

`project-planning` é classe A (`none`), em `toolkitPreparations` de `src/practice/preparation.ts`. Começa por uma ideia; não exige projeto, backend, instalação ou base anterior. Entregas documentais e configurações são geradas externamente somente após entrevista e aprovação. Planning/Review Prompts são papéis separados; não há botão de projeto-base, suíte-alvo nem código de aplicação. Uma plataforma e uma stack bastam. Exemplos técnicos de configuração foram autorizados pelo anexo35947145, sem solução de projeto do roadmap.


## Etapa12 — inventário auditado em20/10/2026

A4:12-ex-01,02,03,12. B8:04,06,08,11,13,15,17,18. C7:05,07,09,10,14,16 e12-project-orders. Cada ID tem exatamente uma classificação; matriz completa em quality/stage12/inventory.json. Bases messaging declaram Redis/RabbitMQ e PostgreSQL somente quando necessários, com Compose/loopback e dados sintéticos. Bases B preservam sintomas e controles limitados/reiniciáveis; testes smoke/reprodução não substituem os testes autorais de regressão. C admite base mínima alternativa sem integrador anterior. Receptor HTTP idempotente fornecido em16 é fixture cooperante; Inbox/efeitoSQL e coordenação permanecem tarefa. Nenhuma instalação/execução de código de futuras bases geradas foi validada pelo StackTrail.

## Etapa13 — extensão de23/10/2026

A2/B13/C4 em19atividades. Sem diagnóstico,patch,baseline/audit preenchidos,índices/cache/telemetria corrigidos ou suíte-alvo. Contratos e materiais em preparation.ts,composição por stack em preparation-prompt.ts. Ambientes locais/sintéticos,reset restrito;C oferece alternativa sem projeto próprio. Validação da plataforma não é execução do futuro laboratório.

| ID | Tipo | Atividade |
| --- | --- | --- |
| `13-ex-01` | A | Tail Latency de um catálogo |
| `13-ex-02` | C | Baseline reproduzível antes de mudar |
| `13-ex-03` | B | Request Lifecycle sob investigação |
| `13-ex-04` | B | Regressão de CPU e memória em relatórios |
| `13-ex-05` | B | N+1 Query Investigation |
| `13-ex-06` | B | Execution Plan não é palpite |
| `13-ex-07` | B | Agregação rápida que mantém os ausentes |
| `13-ex-08` | B | Composite Index para entregas |
| `13-ex-09` | B | Covering Index, pool e contenção |
| `13-ex-10` | C | Cache-Aside com resultado autorizado |
| `13-ex-11` | B | Stale Cache após atualização |
| `13-ex-12` | B | Stampede, Penetration e custo de warming |
| `13-ex-13` | B | Payload, paginação e Conditional Requests |
| `13-ex-14` | B | Streaming com consumidor lento |
| `13-ex-15` | C | Load Test com modelo e orçamento explícitos |
| `13-ex-16` | A | Load Test Analysis sem conclusão inventada |
| `13-ex-17` | C | Logs, Metrics e Traces de uma consulta |
| `13-ex-18` | B | Performance Regression e Root Cause Analysis |
| `13-project-commerce` | B | Otimização de uma API de E-commerce |

## Área independente Security —23/10/2026

Inventário em `src/practice/security/security-practice.ts`:12atividades, A5/B7, sem alteração do inventário técnico00–13. B: access-control,sql-prevention,password-storage,bola-investigation,mass-assignment,rate-limiting,security-logging. A:dependency-review,prompt-recognition,skill-review,mcp-permissions,agent-audit. IDs prefixados security-lab; contratos/prompts próprios. B fornece somente estado inicial sintético/local; nenhuma correção/diagnóstico/suíte-alvo. O guia agent-security do Toolkit também é A (`none`), documental e sem base gerada. Ver SECURITY_EXPANSION.md.

## Etapa14 — inventário23/10/2026

A11/B11/C1; IDs,estadoinicial ecritérios emquality/stage14/inventory.json. A:01,02,08–16. B:03–07,17–22. C:14-project-reliable. Labs mínimos05/06/07/09/13/18/20/21;09/13 documentais. C aceita alternativa mínima sem etapa13 concluída. Bases reservam instrumentação/propagação/dashboard/alerta/agent config/avaliação/timeout/idempotência/testes finais aoestudante conforme cada contrato. Semcausa/localização,patch,suíte-alvo ouQuality Audit resolvido.

## Etapa15 —25/10/2026

15-project-assessment:classeA/none. Uma prova autoral a implementar dozero ouem projeto próprio equivalente,sem projeto-base resolvido/diagnóstico/suíte-alvo. Não cria exercícios paralelos ou laboratório que antecipe a solução. Fontes,contratos e evidências emSTAGE_15_IMPLEMENTATION.md e quality/stage15.
