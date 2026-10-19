# Etapa09 — consolidação profissional e avaliação Júnior

Data:19/10/2026. Currículo integral fornecido pelo usuário na conversa e continuação expressa autorizada. Esse pedido amplia especificamente o recorte anterior00–08; não publica10–19. Nenhum commit/push autorizado nesta entrega.

## Conteúdo

Nove áreas progressivas: preparação para seleção; lógica; backend; legado/debugging/revisão; SQL; testes/segurança; entrevistas; portfólio; avaliação final. O catálogo contém16 simulações originais (4 iniciais,7 intermediárias,5 avançadas), um projeto de pedidos/estoque com nove marcos e duas referências bibliográficas opcionais. Dificuldades pertencem aos exercícios/projeto; a prova é um contrato separado, sem campo, versões ou seletor de dificuldade.

`stage-nine.ts` mantém orientação/enunciados, não aulas nem soluções. SQL fornece esquema/fixture e resultados esperados verificáveis sem exigir API. Cinco formatos de entrevista usam código próprio, revisão, mudança de requisito, live coding e defesa. Estimativas são escolhas pedagógicas, não medições nem limites de aprovação.

## Pesquisa e matriz

A [pesquisa independente](quality/stage09/market-independent.md) registra seções efetivamente consultadas, datas quando disponíveis, idiomas, custo, termos e limites. A matriz competência→evidência→formato→critério orientou o catálogo; vagas não provam testes aplicados nem representam estatisticamente o mercado brasileiro.

| Competência | Evidência observada | Aplicação original | Critério |
| --- | --- | --- | --- |
| Lógica/modelagem | Pabu: lógica/modelagem |09-02/03/04/15 | I/O, extremos, precisão, custo e justificativa |
| API/SQL | LINA/Imara: APIs/SQL; PicPay: integridade |09-05/06/07/10/11 | Contrato, autorização e integridade com casos reproduzíveis |
| Debugging/revisão | LINA/Imara: bugs/review |09-08/09/12 | Hipóteses, impacto, regressão e evidência |
| Testes/segurança | LINA/Imara; documentação técnica oficial |09-12, portfólio, prova | Negativos, dois usuários, erros e limites declarados |
| Comunicação/projeto | PicPay: entrega e discussão |09-01/13/14/16 | Explicar decisões e responder mudança de requisito |
| Entrega/CI | Recomendação de consolidação08; documentação Docker/Actions | Portfólio e prova | Execução reproduzível e evidência real, sem serviço pago |

As fontes não determinam mínimo70/100, duração ou competências universais de contratação. Estes são critérios educacionais autorais. Não copiamos domínios, avaliações privadas, questões ou soluções dos provedores.

## Projeto e prova

Portfólio: API de pedidos/estoque, PostgreSQL, transações, concorrência básica, valores inteiros, cancelamento seguro, autenticação/autorização, testes, Docker/Compose, CI, saúde e README. Marcos: requisitos/modelagem, estrutura, persistência, negócio, segurança, testes, containers, entrega/CI e apresentação. Frontend, microsserviços e Kubernetes não são obrigatórios.

Prova: **Desafio Final Júnior — Primeira Entrega Profissional**, domínio de reservas distinto do portfólio. Cinco fases de uma avaliação: diagnóstico, implementação, qualidade, entrega, defesa. Fixture versionada, sintomas públicos e comportamentos esperados determinísticos em `exam-nine.ts`. Preparadora externa gera somente base mínima e problemas iniciais; nunca diagnóstico, patch, funcionalidades pendentes ou suíte-alvo. Não existe base executável versionada validada pelo StackTrail: reprodução de futura geração precisa ser demonstrada pela IA externa/estudante ou declarada não validada.

Rubrica100: requisitos25, banco15, organização15, testes/erros15, autorização10, execução/CI10, documentação/defesa10. Pontuação máxima/integral, parcial estritamente entre extremos e zero/não atendido devem corresponder; não avaliado permanece sem pontos. Cada avaliação exige origem/limitações, e cada item avaliado exige evidência. Bloqueadores: autorização indevida, violação de integridade e fluxo essencial irrecuperável. Critérios desconhecidos impedem resultado favorável. Mínimo70 é escolha autoral, sem certificação ou promessa de contratação.

## Modos, armazenamento e retomada

Simulação tenta sem soluções de IA; prática assistida recebe pistas. O modo inicial fica registrado. Assistência posterior é informada e muda a interpretação da simulação, sem julgamento de fraude educacional. Regras de empresas reais podem divergir.

`exam-state.ts` separa tentativas/avaliações dos exercícios. Estados: não iniciada, em andamento, interrompida e concluída. Pausa/continuação não apagam texto; refazer cria outra tentativa. Histórico e avaliações anteriores permanecem por stack. Limite local explícito100 tentativas/100 revisões por tentativa recusa novas mutações sem descartar histórico. Conteúdo concluído permanece imutável; revisão de conteúdo ocorre em nova tentativa.

Esquema2 e chave `stacktrail:roadmap:1` preservados, campos novos opcionais; progressos anteriores não viram prova concluída. Tentativas de exercícios09 usam `@php`/`@javascript`, síntese09 usa `finalEvidence`. Resultado mais recente determina os dois registros da prova no percentual da etapa: conclusão e avaliação declarada atendida. Refazer pode reduzir percentual/conquista, sem apagar resultado anterior. A conclusão09 também exige nove tópicos,16exercícios,portfólio e síntese. Formação Júnior requer00–09; visita/cópia de prompt não conta.

## Preparação e equivalência

A(do zero):01/02/03/04/15 e portfólio. B(laboratório):08/09/10/11/12. C(projeto próprio/base alternativa):05/06/07/13/14/16. SQL/documento/módulo são suficientes quando adequados. Prova tem preparação própria fora do catálogo de atividades. Laravel e Express recebem mesmo contrato funcional/fixture; só runtime/ferramentas variam. Uma stack basta. Não são exigidas duas implementações.

## Livros e capas

Entendendo Algoritmos2ed (AdityaY.Bhargava,2026,ISBN9788575229293) e Refatoração2ed (MartinFowler,2020,ISBN9788575227244) foram verificados nos catálogos Novatec; não foram lidos integralmente. Capas reais já existentes foram copiadas para `public/assets/books/stage09/` e `public-roadmap/assets/books/stage09/` (diretório servido pelo build). Sem hotlink, preço ou link de compra; origem/direitos editoriais preservados e fallback existente. Consulta de catálogo não demonstra licença livre. Alternativas técnicas gratuitas acompanham cada livro.

## Auditorias e validação

- [Educacional independente](quality/stage09/educator-review.md): achados antes das correções, reconferência posterior.
- [Factual/técnica independente](quality/stage09/technical-independent.md): fontes primárias e limites de execução.
- [UI independente](quality/stage09/ui-independent.md): cobertura e lacunas datadas quando disponível.
- Resultados executados e pendências: [QUALITY_AUDIT](QUALITY_AUDIT.md), seção09. Não transferir sucesso de build para qualidade pedagógica, execução do backend ou conformidade WCAG completa.

## Arquivos do recorte09

Novos: `src/practice/stage-nine.ts`, `exam-nine.ts`, `exam-state.ts`, `exam-prompts.ts`, `FinalExamPage.tsx`, `StageNineAreas.tsx`; `src/tests/stage-nine.test.ts`, `e2e/stage-nine.spec.ts`; capas nas duas árvores estáticas; este relatório e `docs/quality/stage09/`.

Integração: `curriculum.ts`, `progress.tsx`, `achievements.ts`, `App.tsx`, `Shared.tsx`, `StudyPages.tsx`, `ActivityPage.tsx`, `ProgressPage.tsx`, `practice.css`, `preparation.ts`, `preparation-prompt.ts`, `prompts.ts`, `src/content/roadmap.ts`. Testes de07/08 atualizam a sentinela de etapa futura para10; inventárioA/B/C inclui09. `e2e/practice.spec.ts` inclui rotas09 e prova na varredura/zoom; configuração Playwright inclui suíte09. Script de links inclui catálogo09. README só atualiza disponibilidade; documentação acumulada registra fontes/auditorias/inventário e exceção de escopo emAGENTS.

As demais alterações locais já existentes (especialmente footer/README profissional e08) foram preservadas; o diff total do repositório não é atribuível somente à09.

A varredura global foi movida para `e2e/published-routes.spec.ts` em lotes60por tema, preservando inventário, regrasaxe e reflow; evita timeout acumulado de uma única avaliação de todas as rotas. Não altera o produto nem enfraquece a auditoria. Zoom real200/400 foi executado com extensãoChromium, incluindo09/prova, nos dois temas; fonte150%/teclado e limites completos na auditoria acumulada.

O contexto comum das atividades/prompts respeita a representação mínima: lógica sem framework/API/banco e SQL semAPI; planejamento/discussão podem usar texto. Banco/infraestrutura só entram quando pertinentes ao contrato. Último adendo educacional reconferiu essa delimitação.

## Resultado final executado

500/500testes unitários em51arquivos;12/12focados09 reconferidos após ajuste editorial; lint,typecheck,build e isolamento do build passaram. UIglobal57/57,semflaky/skip,528,697s:352rotas×2temas,mais fluxos funcionais,zoomreal200/400 e reflow nas larguras declaradas. UI09focada3/3reconferida no build final. Evidências e limites estão emQUALITY_AUDIT; estatísticas recuperadas do relatório HTML persistente e preservadas em `quality/stage09/ui-global-report.json`. Não houve commit/push.
