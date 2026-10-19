# Etapa 08 — revisão educacional independente

Data: 19/10/2026. Revisão somente leitura do código, pelo subagente educator08, solicitada pela skill stacktrail-educator. Fonte curricular: anexo integral fornecido pelo usuário `3d36a71c-4a41-40a4-97b7-59e9187652ea/Pasted text.txt`, incluindo seus 27 objetivos. Não foi necessária inferência de currículo pelo Notion. Esta revisão não executou Docker, Kubernetes nem códigos futuros do estudante; não certifica aprendizagem. Estado inicial inspecionado: `stage-eight.ts` com 8 módulos, 10 tópicos totais/9 por stack, 16 exercícios e um projeto.

## Lacunas encontradas antes de correções

1. **Bloqueante — prompt de ajuda/avaliação fora do recorte:** `prompts.ts` não tinha ramo08; caía no contexto padrão04, que impede SQL e autenticação e descreve outro currículo. A revisão da atividade08 precisa conter produção/Docker/Compose/CI/deploy/KinD e somente a stack escolhida.
2. **Bloqueante — dupla stack nos critérios:** ex02 e projeto incluem requisitos PHP e TypeScript simultaneamente. `topicIdsForTrack` também não incluía08. Filtrar requisitos e critérios para a stack na UI e nos três prompts; não basta dizer que uma stack basta enquanto o checklist exige as duas.
3. **Bloqueante — material inicial ausente:** não existiam contratos08 em `preparation.ts`; `preparation-prompt.ts` proibia CI/deploy de forma incondicional. As atividades de diagnóstico precisam falha inicial reproduzível; as de construção precisam API funcional sem infraestrutura já resolvida. Ex12 pode usar documento; não fabricar backend desnecessário. Ex16 precisa fixtures identificadas como sintéticas para alternativa de recursos.
4. **Ajuste necessário — alternativa de recursos e rubrica:** o contrato geral dos exercícios diz que 'somente descrição é Não verificado', enquanto a alternativaKinD aceita análise. Distinguir análise efetivamente sustentada por manifesto/fixture/comparação de mera alegação de execução. Não atribuir execução observada à alternativa; explicitar essa distinção na avaliação e conclusão.
5. **Pendente — fontes/autonomia:** `books08` estava vazio. Catálogo de livros não é prova de leitura; livros devem permanecer opcionais. Revisão factual e origem/licença das capas pertencem à auditoria técnica independente.

## Cobertura dos 27 objetivos

| Objetivo curricular | Prática observável |
| --- | --- |
| 1. Ambientes | ex01; módulo01; entrega1 |
| 2. Variáveis | ex01/02; entrega1 |
| 3. Segredos fora do repositório | ex01/03/09; entregas1/2/4 |
| 4. Imagens e contêineres | ex03; módulo02 |
| 5. Dockerfile | ex03/05; entrega2 |
| 6. dockerignore | ex03; entrega2 |
| 7. Build/execução Docker | ex03/04/05; entrega2 |
| 8. Redes/volumes | ex06/07; entrega3 |
| 9. Compose | ex06/07; módulo03 |
| 10. API/PostgreSQL separados | ex06; entrega3 |
| 11. Persistência | ex07; entrega3 |
| 12. Pipeline Actions | ex08/09; entrega4 |
| 13. Lint/testes/build | ex08; entrega4 |
| 14. CI versus CD | ex08; módulo04 |
| 15. Preparação/publicação | ex10; entrega5; destino controlado permitido pelo currículo |
| 16. Falhas de deploy | ex11; entrega5 |
| 17. Logs/health | ex02/05/06/10/11/16 |
| 18. Problema da orquestração | ex12; módulo06 |
| 19. Compose versus Kubernetes | ex12 |
| 20. Pod/Deployment/Service | ex12/14 |
| 21. kubectl básico | ex14/16 |
| 22. Cluster KinD | ex14; entrega6; análise alternativa declarada |
| 23. API no Kubernetes | ex14; entrega6 |
| 24. Réplicas | ex15 |
| 25. Atualizações | ex15; entrega6 |
| 26. Diagnóstico de Pods | ex16; entrega6 |
| 27. Documentação | todos exercícios; seis marcos do projeto |

## Progressão, escopo e qualidade

A sequência fundamentos de produção → Docker → Compose → CI → deploy → recursos Kubernetes → KinD → integração respeita pré-requisitos. Ex12 voltar ao nível inicial é coerente com o início de uma nova competência; não representa regressão curricular. Dezesseis exercícios consolidam as listas do anexo sem perda nominal dos 27 objetivos. E-commerce, logística e agendamentos são distintos, com dados sintéticos.

Os critérios pedem configurações, falhas e resultados discriminantes: persistência depois de recriar containers, conexão por DNS interno, pipeline vermelho, correlação de versão/log/saúde, rollout e diagnóstico. A orientação é curta, encaminha a fontes externas e não contém Dockerfile, workflow, YAML ou algoritmo resolvidos. As três dicas atuais são genéricas, mas graduais e não revelam causa/patch. Melhorar especificidade futura não exige distribuir solução.

O projeto possui contexto, requisitos, restrições, entregáveis, seis marcos, critérios, rubrica e portfólio. Escopo evita microsserviços, nuvem gerenciada, ingress, Helm e service mesh obrigatórios. Não exige cartão; deploy controlado é alternativa prevista pelo usuário. Não há mínimo universal de RAM inventado: pede recursos observados e requisitos reais do provider. AlternativaKinD deve conservar avaliação de análise sem simular competência operacional executada.

## Rubrica inicial (0–4; sem média que esconda bloqueantes)

| Dimensão | Estado inicial |
| --- | --- |
| Fidelidade/recorte | 3 — cobertura27objetivos,8módulos |
| Pré-requisitos/progressão | 2 — dupla stack presente em artefatos de avaliação |
| Qualidade do desafio | 3 — implementação e diagnóstico, sem respostas |
| Avaliação | 2 — alternativa de análise precisa contrato de julgamento explícito |
| Fontes/autonomia | 2 — verificação factual/livros e preparação ainda em curso |
| Honestidade/reprodução | 2 — contratos de bases08 ausentes no momento da leitura |

Prontidão ainda não demonstrada nesta fotografia inicial. Requer reconferir bloqueantes após integração e testes de UI/estado por outra auditoria; build sozinho não resolve os itens.

## Reconferência após correções — 19/10/2026

Leitura renovada de `stage-eight.ts`, `curriculum.ts`, `ActivityPage.tsx`, `prompts.ts`, `preparation.ts` e `preparation-prompt.ts`. Nenhum código foi modificado pelo revisor.

| Achado inicial | Status observado |
| --- | --- |
| 1. Contexto04 indevido | Corrigido: ramo08 explícito para tecnologia e representação; revisão pede logs/eventos/manifests e distingue análise de execução. |
| 2. Dupla stack | Corrigido: ex02 e projeto usam um requisito de runtime resolvido por `activityForTrack`; UI, ajuda/revisão e preparação recebem atividade resolvida. O mapeamento substitui texto mantendo índices/quantidades dos critérios. `topicIdsForTrack` inclui08. |
| 3. Preparação ausente/incompatível | Corrigido: inventário explícito dos17contratos; construção recebe base sem resultado-alvo; diagnóstico recebe sintoma e falha determinística sem causa/patch. Ex09/12 usam documento, sem API artificial. Preparadora permite infraestrutura08 exclusivamente no estado inicial e limita portas do host, distinguindo a interface interna do container. |
| 4. Alternativa de recursos | Corrigido: rubrica aceita manifestos anotados/rastros de fixture como evidência analítica e afirma que não provam execução. Prompts reiteram a distinção; contratoKinD mantém comandos não executados explícitos. |
| 5. Livros/fontes | Dois livros opcionais adicionados, com alternativas gratuitas e limitações de edição/idade. Capas neutras não alegam autorização inexistente; validação técnica independente continua necessária para metadados e fontes. |

Não restam bloqueantes educacionais dentre os achados desta revisão estática. Rubrica após correções: fidelidade3, progressão3, desafio3, avaliação3, fontes/autonomia3 condicionado à verificação factual independente, honestidade/reprodução3 para o contrato do material (não para execução futura). Não é aprovação geral de UI, persistência, links, build ou infraestrutura: tais evidências pertencem às verificações próprias.

Observação não bloqueante: a seção de referências da atividade na UI ainda pode oferecer fontes das duas stacks, embora os requisitos/tópicos e referências nos prompts estejam contextualizados. Fontes extras não obrigam segunda implementação; uma seleção mais estrita pode reduzir distração. As dicas permanecem gerais, sem solução; há oportunidade editorial de torná-las mais específicas por desafio no futuro.

As bases são geradas externamente sob contrato, portanto não há alegação de que Docker/KinD ou a API do estudante foram executados pelo StackTrail. A alternativa de análise conserva acesso à etapa e registra limites, sem transformar análise de fixtures em demonstração operacional real.
