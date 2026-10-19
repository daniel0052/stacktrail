# Etapa 09 — revisão educacional independente

Revisão em 19/10/2026, somente leitura dos artefatos curriculares e de estado. Arquivos examinados: `AGENTS.md`, skill educator e quality gate, `market-independent.md`, `stage-nine.ts`, `exam-nine.ts`, `exam-state.ts`; consulta pontual às competências e restrições de etapas anteriores. O currículo integral veio na resposta do usuário, substituindo a limitação do anexo inicialmente truncado. Não houve execução de código do estudante, provas, Docker, banco ou validação futura de material gerado por IA.

## Lacunas encontradas antes da correção

1. **Contrato incompleto do sintoma C — bloqueante de reprodutibilidade.** O exame exige configuração ausente que impede início, mas não define um estímulo público invariável, condição operacional ou erro sanitizado esperado. Diferentes preparadoras podem produzir falhas incompatíveis, tornando a investigação desigual. Fixar um roteiro observável e resultado de partida, preservando segredo da localização/causa e sem distribuir correção. Não precisa fixar o mesmo arquivo interno entre Laravel e Express.
2. **Contradição possível da rubrica — bloqueante de avaliação.** `parseEvaluation` aceita `not-met` com pontuação máxima; `examResult` soma tal pontuação e pode satisfazer o mínimo mesmo com critérios explicitamente não atendidos. Estabelecer consistência entre estado e pontos (por exemplo, não atendido vale zero), e âncoras observáveis para parcial/atendido. Evidência e limites declarados não substituem essa consistência.
3. **Âncoras de pontuação pouco discriminantes — melhoria relevante.** Os sete títulos e pesos somam 100 corretamente, mas títulos isolados deixam margem grande para pontuação arbitrária. Associar a cada dimensão exemplos de evidência e condições de faixa, sem oferecer implementação/gabarito. A nota mínima de 70 deve permanecer explicitamente autoral, nunca exigência observada no mercado.

Esses achados foram enviados ao agente principal antes de alteração. A conclusão abaixo descreve o recorte lido, não aprovação de integração em andamento.

## Cobertura e adequação

- Nove áreas identificáveis: seleção; lógica; backend; legado/review; SQL; qualidade; entrevistas; portfólio; prova única. As orientações são curtas e apontam a práticas e fontes, sem aulas técnicas.
- As 16 simulações são originais e variadas. Lógica cobre coleções, strings, ordenação, busca/frequência, validação, custo e casos extremos. Valores esperados são contratos públicos, não algoritmos ou soluções.
- SQL 10 fornece esquema lógico e fixture pequena com resultado verificável, zero para cliente sem pedido, cuidado com multiplicação por itens e paginação determinística. SQL 11 investiga a mesma fixture sem SQL corrigido. A preparação ainda deverá produzir o artefato inicial exato; esse módulo não foi auditado nesta rodada.
- Backend possui invariantes concretas de totais, estoque, concorrência, repetição, autorização e rollback. Não se reduz a CRUD. Concorrência fica em PostgreSQL local, sem sistema distribuído, microsserviços ou operação profissional avançada.
- O projeto de pedidos/estoque tem nove marcos, requisitos funcionais e não funcionais, aceitação, casos adversos, documentação e defesa. Não exige frontend nem duas stacks. Kubernetes é opcional, coerente com consolidação da 08.
- A prova de reservas usa domínio diferente do portfólio. Não contém campo de nível nem versões de dificuldade. As cinco fases são de trabalho e formam uma só avaliação. Há fixture versionada, intervalos adjacentes, status HTTP, identidades, paginação, cancelamento e ensaio concorrente público. Exige autonomia pela integração, sem introduzir arquitetura de Pleno/Sênior.
- Planejamento de 12–20 horas é apresentado como hipótese autoral revisável após diagnóstico, não tempo medido ou limite de aprovação. Viabilidade real com estudantes permanece não verificada; é necessário declarar esse limite na entrega.
- A defesa solicita entendimento, hipóteses, testes, segurança, execução e melhorias. As simulações exigem uma pergunta por vez e tentativa antes de feedback, permitindo pessoa ou IA externa.
- Dois modos são modelados separadamente e assistência tem campo próprio, sem equiparar uso de IA a fraude. O mecanismo de prompts ainda não foi revisado; é necessário reconferir que simulação estrita não emite solução por tutoria.
- Estado de prova é independente, por stack, com pausa/retomada, nova tentativa e preservação de anteriores. Conclusão não equivale a aprovação: resultado depende de avaliação registrada, evidências, mínimo e ausência de bloqueadores. Ressalva sobre inconsistência de pontuação acima.
- Pesquisa distingue vaga isolada, formato observado e recomendação pedagógica, com datas e limites; não faz promessa de contratação. Livros são opcionais e alternativas gratuitas estão associadas.

## Rubrica local da skill

| Dimensão | Avaliação nesta rodada |
|---|---|
| Fidelidade e recorte | 3 — currículo completo rastreável; nove áreas e prova única. |
| Pré-requisitos/progressão | 3 — consolida 00–08 e uma stack; pré-requisitos poderiam apontar competências específicas por tarefa com mais precisão. |
| Qualidade do desafio | 3 — contratos/casos originais; sintoma C precisa da correção apontada. |
| Avaliação | 2 — pesos/bloqueadores adequados, mas inconsistência estado/pontos e âncoras ainda abertas. |
| Fontes/autonomia | 3 — pesquisa separa evidência/recomendação; verificação factual cabe à revisão específica. |
| Honestidade/reprodução | 2 — limites honestos; sintoma C ainda não reproduzível por contrato completo. |

## Situação

**Não pronto no recorte examinado até resolver os dois bloqueantes e reconferir.** Integração UI, progressão global, prompts de preparação/ajuda/avaliação, teclado, persistência e testes não foram julgados como falhas transitórias nem aprovados sem leitura/execução. Esta revisão não certifica aprendizagem e não autoriza commit, push ou publicação.

## Reconferência independente das correções — 19/10/2026

Artefatos adicionais lidos: `exam-prompts.ts`, `FinalExamPage.tsx`, `StageNineAreas.tsx`, entradas09 de `preparation.ts`, ramo09 de `prompts.ts` e integração de entrevista em `ActivityPage.tsx`.

- **Bloqueante1 encerrado no contrato:** sintoma C agora estabelece banco disponível/fixture restaurada, perfis de inicialização da aplicação real, saída78 e mensagem sanitizada `CONFIG_REQUIRED`, seguido de processo ativo/health200 após correção. Proíbe falha simulada por saída fixa e oculta localização da causa. Isso valida especificidade do contrato; não prova execução de bases futuras geradas.
- **Bloqueante2 encerrado por inspeção:** estado integral exige máximo, não atendido exige zero, parcial fica entre zero/máximo e não avaliado não recebe pontos. Registro e resultado consultam essa consistência; importação registrada contraditória é rejeitada. Rascunho incompleto continua persistível, sem fingir avaliação concluída.
- Âncora geral de pontuação foi adicionada à UI: máximo depende de todos os comportamentos, parcial registra atendidos/pendentes e zero é não atendido. Recomendação residual: repetir essa mesma regra no prompt da revisora para reduzir respostas externas incompatíveis com o formulário; não é bloqueante de conteúdo.
- Preparadora recebe fixture, requisitos públicos e sintomas, mas proíbe solução, causa/localização, patch, funcionalidades pendentes e suíte-alvo. Help de prova estrita só esclarece contrato; prática assistida recebe uma pista após tentativa. Revisora exige artefatos/evidência e separa declarações/hipóteses. Entrevistadora espera resposta antes da pergunta seguinte e não entrega respostas prontas.
- Área e prova apresentam critérios de conclusão declarada, tentativas por trilha e histórico. Conclusão exige cinco fases, conferência e declaração de assistência; uso de IA exige relato. Não ocorre pontuação por copiar prompt. A interface não apresenta dificuldade para a prova.
- **Pequena inconsistência nova reportada antes da correção:** preparação de `09-ex-14` descreve paginação inicial por ID; enunciado descreve ordenação inicial por nome. Alinhar o contrato de partida, preservando ordenação alvo por valor/ID. Não compromete a estrutura global, mas deve ser corrigido antes da entrega.

Situação após reconferência: **sem os dois bloqueantes educacionais originais**, pendente apenas do alinhamento pontual acima e das verificações técnicas/UI executadas pelo responsável. Rubrica local: avaliação3 e honestidade/reprodução3 após correções; demais dimensões mantêm3. Não executei suíte de testes, browser ou código de estudante nesta revisão e não atribuo tais resultados à minha inspeção.

## Adendo de escopo por atividade — 19/10/2026

Reconferência somente leitura de `stage-nine.ts`, `preparation.ts` e `exam-prompts.ts`:

- Restrições comuns agora condicionam framework à presença de API e PostgreSQL à presença de banco. Planejamento/discussão podem usar texto; lógica declara ausência de API, banco e bibliotecas específicas. Exercícios SQL restringem preparação ao PostgreSQL/cliente, sem sistema inteiro. O escopo por atividade está coerente e evita pré-requisitos de infraestrutura desnecessários.
- Faixa de inteiros e acumulados está limitada às áreas lógica/backend e não é adicionada indistintamente a entrevistas. A compatibilidade PHP64bits/inteiros seguros TypeScript está explícita nesse recorte.
- `09-ex-14` foi alinhado: preparação agora parte de nome asc/ID asc, coerente com a mudança pedida pelo enunciado.
- Prompt avaliador agora inclui evidência própria de cada dimensão e regras integral=max, não atendido=0, parcial entre0/max, não avaliado sem pontos. Recomendação residual anterior encerrada.
- Pequena recomendação de clareza enviada ao responsável: a apresentação geral `stageTech`09 em `prompts.ts` ainda enumera banco/infra para toda atividade “conforme contrato”. As restrições específicas agora delimitam isso, mas explicitar ali a ausência de API/banco para lógica/planejamento reduziria ambiguidades para IA externa. Não constitui bloqueante adicional.

**Sem bloqueantes educacionais abertos nos artefatos reconferidos.** Permanecem limites já declarados: não executei aplicação, suíte, banco ou bases futuras de estudante nesta revisão; aceitação técnica/UI deve usar suas evidências próprias. O resultado não certifica aprendizagem.
