# Etapa 11 — revisão educacional independente

Data: 20/10/2026. Escopo somente leitura da implementação; relatório próprio. Fontes de escopo: currículo integral do anexo cbb3b16f, AGENTS.md, stacktrail-educator e quality-gate. Não houve nova consulta ao Notion: o currículo autossuficiente foi fornecido integralmente pelo usuário.

## Achados iniciais, antes de correções

1. **Progressão, médio:** `11-ex-07` exige replay de chave de idempotência “conforme contrato14”, embora pertença ao módulo04 e tenha apenas separação de validação/autorização/invariante como pré-requisito. Deduplicação concorrente ainda será praticada no módulo07. Recomenda-se retirar o replay obrigatório de07 ou identificá-lo como aprofundamento posterior não bloqueante; manter rejeição de novo cancelamento e histórico único.
2. **Ponto de partida, médio:** `11-ex-18` revisa sistema de reservas próprio, enquanto integra o módulo09 junto ao projeto. Evitar dependência circular implícita: classificá-lo como continuidade C, com projeto anterior OU base alternativa mínima; deixar explícito que concluir o integrador11 não é pré-requisito.
3. **Em implementação:** livros ainda vazios e preparação/prompts11 ainda ausentes na leitura inicial. Não são aprovados por inferência. Revisão factual de referências/edições é papel independente do factchecker.

## Cobertura observada

Os nove módulos mantêm a ordem solicitada: qualidade; coesão/SOLID; camadas/monólito; casos de uso; padrões; DDD; consistência/idempotência; refatoração/ADRs; integrador. Há18 exercícios originais distribuídos entre E-commerce, Logística e Serviços/Agendamentos, com identificação, mudança localizada, refatoração, modelagem, falha/concorrência e defesa de trade-offs. Cada atividade contém contexto, requisitos, entradas/saídas, casos adversos, três dicas graduais, entregáveis e rubrica.

A progressão é compatível com Pleno: pede contratos e limites transacionais verificáveis, sem impor microsserviços, NestJS, todos os padrões ou interfaces artificiais. O anti-exercício11 aceita arquitetura menor. A distinção Action-Domain-Responder / Single-Action Laravel / Architecture Decision Record está explícita, assim como DDD contextual, idempotência HTTP versus deduplicação e limites de transação perante efeitos externos. Não encontrei código resolvido, tutorial ou solução escondida no conteúdo lido.

O integrador cobre recursos/horários/reservas/disponibilidade/cancelamento/histórico/autorização, conflito/repetição/rollback e testes reais com PostgreSQL. Exige sete marcos, dois ADRs, diagrama, endpoints e reprodução local; rubrica valoriza regras, consistência e justificativa, não quantidade de padrões. Laravel e Express são alternativas equivalentes; placeholders de integração ainda precisam ser reconferidos resolvidos na plataforma.

## Gate inicial

| Dimensão | Nota | Evidência/limite |
| --- | ---: | --- |
| Fidelidade e recorte | 3 | Nove módulos e integrador rastreáveis ao currículo. |
| Pré-requisitos/progressão | 2 | Achados07/18 acima precisam de ajuste/reconferência. |
| Qualidade do desafio | 3 | Contratos profissionais, setores distintos e alternativas menores. |
| Avaliação | 3 | Resultados discriminantes, casos negativos e estado persistido. |
| Fontes/autonomia | 2 | Referências indicadas, verificação factual/preparação ainda pendentes. |
| Honestidade/reprodução | 3 | Esperado separado de observado; sem nota ou execução inventada. |

Este gate inicial não declara prontidão da implementação. Persistência, navegação, interface e comandos não foram executados por esta revisão de conteúdo.

## Reconferência final dos contratos e papéis

Reconferidos `stage-eleven.ts`, `curriculum.ts`, `preparation.ts`, `preparation-prompt.ts` e `prompts.ts` após os achados. Correções confirmadas:

- Ex07 mantém recusa de nova solicitação de cancelamento e histórico único; requisito e entrada/saída não exigem chave antes do exercício14.
- Módulo09 e base C18 dizem explicitamente que o integrador11 concluído não é pré-requisito. Identidade, conflito/replay anteriores podem existir na base, sem entregar o novo histórico ou sua revisão.
- Proibição global da preparadora foi delimitada ao trabalho autoral da atividade: mecanismos explicitamente requeridos no estado inicial são preservados. Isso elimina contradição com C14/C18.
- Initial04 foi neutralizado para divergência observável em fronteira, sem atribuir causa à instância gerada.

Inventário educacional11: A2 (08 e12); B9 (01–05,09,11,15,16); C8 (06,07,10,13,14,17,18 e integrador). Módulo isolado basta quando pertinente, PostgreSQL só nas bases que o exigem, e a alternativa C não bloqueia por ausência de projeto próprio. Preparadora distingue smoke/reprodução/regressão, não entrega testes-alvo, diagnóstico, patch, diagrama ou ADR justificado. Tutora solicita tentativa e próxima pista; revisora solicita artefatos/evidências e classifica Atendido / Parcialmente atendido / Não atendido / Não verificado, sem inventar nota/execução. Resolvers11 especificam Laravel nativo ou funções/classes Express e transação real na biblioteca adotada, filtrando referências da stack alternativa. Uma única stack basta.

Quatro livros opcionais possuem alternativas gratuitas e limites de catálogo/heurísticas. Verificação de existência/edição/licenciamento e riscos conceituais está documentada pela revisão factual independente em `source-independent.md`; esta revisão pedagógica não repete nem amplia essa evidência. Três capas previamente incorporadas são reutilizadas com origem/direitos; DDD permanece fallback.

### Gate de conteúdo após correções

| Dimensão | Nota | Evidência |
| --- | ---: | --- |
| Fidelidade e recorte | 3 | Nove módulos,18exercícios e integrador correspondem ao currículo fornecido. |
| Pré-requisitos/progressão | 3 | Dependência07→14 removida,continuidade18 explícita e bases alternativas. |
| Qualidade do desafio | 3 | Setores reais,contratos adversos,solução menor válida e nenhum gabarito encontrado. |
| Avaliação | 3 | Critérios de estado/segurança/consistência,ADRs e trade-offs; consultiva. |
| Fontes/autonomia | 3 | Fontes primárias verificadas separadamente,livros opcionais,pistas e papéis distintos. |
| Honestidade/reprodução | 3 | Contrato esperado não equivale a execução;base externa exige relato real ou não validação. |

Nenhum bloqueante educacional aberto no conteúdo e contratos revisados. Isto não certifica aprendizagem, implementação futura de estudante ou WCAG. Testes automatizados, persistência e navegação não foram executados por este revisor; devem ser reportados pelo responsável com suas evidências. Nenhuma implementação foi alterada pelo revisor; apenas este relatório.

## Adendo — reconferência do acabamento editorial

Reconferidos `StageElevenModules.tsx` e o catálogo11 após os últimos ajustes. O modelo Markdown vazio de ADR, disponível no módulo08, contém título, status, data, contexto, problema, alternativas, decisão e consequências com campos a preencher. É um molde documental, não uma decisão pronta, aula ou gabarito; atende ao pedido de modelo sem resolver o exercício17 ou os ADRs do integrador.

As cinco referências gratuitas em português de Strategy, Factory Method, Adapter, Observer e Decorator estão ligadas ao módulo05 e respectivos exercícios08/09/10. As notas preservam a escolha por composição simples e distinguem Factory Method por subclasses de função fábrica genérica. A obra clássica paga permanece complementar; esses exercícios não dependem de sua compra. A verificação factual efetiva dessas páginas consta do relatório independente próprio, não é inferida por esta revisão.

Os contratos do exercício18 e integrador mantêm uma única stack, autorização, consistência, histórico, replay e defesa de trade-offs; o integrador segue com dois ADRs e arquitetura suficiente, sem nota por quantidade de padrões. A revisão de espaçamento não alterou o escopo pedagógico observado. Mantido gate3 nas seis dimensões e nenhum bloqueante educacional aberto. Este adendo não acrescenta execução de navegador, testes ou aplicação do estudante.
