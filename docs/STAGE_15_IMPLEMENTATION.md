# Etapa15 — Prova Final de Validação Pleno

Implementação do anexo89181ecd, autossuficiente, consultado integralmente em25/10/2026. Uma única avaliação **Mid-Level Backend Final Assessment**, com cenário autoral **Reliable Payment and Order Processing API / Desafio Técnico Pleno — API de Pedidos e Pagamentos**.00–15 disponíveis,16–19 pendentes. Não foram criadas provas por senioridade, aulas novas ou soluções dos desafios.

## Experiência e arquivos

- `src/practice/stage-fifteen.ts`: contrato autoral, cinco fases de evidência, regras, casos públicos, entregáveis, rubrica, bloqueadores e seis referências de contratação.
- `midlevel-assessment-state.ts`: histórico por stack, pausa/retomada, entrega, reabertura, registro de avaliação e validação de dados. Baseado no contrato do mecanismo09, em módulo próprio para não alterar sua avaliação.
- `midlevel-assessment-prompts.ts`: avaliação externa editável e relatório de entrega copiado explicitamente.
- `MidlevelAssessmentPage.tsx`: leitura progressiva, seleção de stack, cinco fases, checklist, URL/referência do código não verificada, AI Usage Report, rubrica, defesa, fontes e histórico.
- Integrações:curriculum,progress,achievements,StudyPages,ActivityPage,App,Shared,ProgressPage,preparation e roadmap. Catálogos15 apontam à mesma prova,sem exercícios/dificuldades separados. As rotas de projeto/tópicos também abrem o mesmo estado.
- `EditablePromptDialog.tsx`: contenção de Tab/Shift+Tab, Escape/retorno e cópia explícita. Regressão do Toolkit executada.
- `src/tests/stage-fifteen.test.ts` e `e2e/stage-fifteen.spec.ts`: contratos, estados, importação conservadora, pontuação, bloqueadores, persistência, UI e navegação publicada.

Sem dependências novas,backend,upload,autenticação ou API deIA para plataforma. React/TS/Vite/HashRouter/base`/stacktrail/` preservados. Nenhuma imagem/capa nova; ativos anteriores preservados. Nenhum commit,push oudeploy automático.

## Estrutura da prova

O estudante implementa catálogo, pedidos, estoque e pagamentos simulados, com Users,Products,Inventory,Orders,Order Items,Payments,Payment Events eOutbox Events como conceitos de domínio. Tabelas podem ser adaptadas justificadamente. Cinco fases organizam evidências,sem virar aulas:escopo/decisões;implementação/consistência;testes/operação;entrega;defesa.

Obrigatórios:API/estados/valores autoritativos,PostgreSQL e transações/constraints/concorrência,idempotência,Redis/worker e recuperação,Outbox ou alternativa demonstrável,autenticação/autorização simples,testes discriminantes,sinais/carga/relatório,Compose/configuração de exemplo/README/API docs/CI/Health Check. Deploy público,dashboard oumutation adicional são diferenciais,sem compensar falha crítica. Sem dinheiro/gateway real,SaaS pago,Kubernetes,CQRS,Event Sourcing,microsserviços ouRepository artificial obrigatório.

Prazo educacional sugerido de7dias,sem expiração,cronômetro ou bloqueio. Estimativa editorial de24–40horas em sessões,não medida em estudantes;calendário pode ser ampliado. Uma stack suficiente:

- PHP/Laravel,PostgreSQL,Redis,Laravel Queues,PHPUnit/Pest compatíveis eCompose.
- TypeScript/Node/Express,PostgreSQL,Redis,BullMQ oubiblioteca adequada,Vitest/Jest eCompose.

Redis precisa ter uso significativo na fila;cache não é obrigatório sem caso justificado. SQL/worker/testes pertencem aoambiente local do estudante. Fakes não substituem integração real;duas conexões e interleavings controlados demonstram concorrência. Publicação de repositório é decisão do estudante,sem envio automático a empresas.

## Regras de consistência

Contrato integral/casos em`quality/stage15/assessment-contract.json`. Valores em centavosBRL,quantidade inteira positiva,itens duplicados consolidados e snapshot de preço. Disponível=físico−reservado;invariante físico>=reservado>=0,inclusive ajustes de operador. Criação reserva todos os itens atomicamente;aprovação diminui físico e reservado pela mesma quantidade;rejeição/cancelamento diminuem apenas reservado,uma vez.

SimuladorHTTP local retorna uma proposta de aprovação/rejeição,sem efeito financeiro próprio. O efeito de pagamento simulado fica no commitSQL da aplicação. Se cancelamentoPENDINGvence,aprovação tardia é ignorada/auditada;seaprovação vence,cancelar retorna409. Estados terminais não são reabertos;cancelamento repetido não libera reserva novamente. Estorno/pagamento real fora do recorte.

Idempotency-Key tem escopo usuário/operação,com revalidação de autorização e contrato para mesmo payload versus payload divergente. Identidade estável deevento não pode ser reutilizada comconteúdo diferente. Reentrega/crash apóscommit antesack não duplicam efeito. Falhas temporárias têm limites/timeout real deIO;falha terminal permanece rastreável e requer cancelamento/replay autorizado,não desaparecimento de evento/reserva.

## Rubrica e bloqueadores

| Critério | Pontos |
| --- | --- |
| Functional Correctness |25|
| Architecture and Code Quality |15|
| Database and Consistency |15|
| Testing and Security |15|
| Redis,Queues and Outbox |10|
| Performance and Observability |10|
| Documentation,CI and Technical Defense |10|

Total100,mínimo educacional sugerido75,todos os critérios avaliados comevidência e nenhum bloqueador confirmado ou pendente deverificação. Bloqueadores objetivos:autorização crítica violada;estoque negativo/dupla alocação;pagamento/baixa duplicados;entrega não reproduzível;ausência comprovada de testes deautorização/estoque concorrente/idempotência. Falta de acesso para avaliação é não verificado,não falha confirmada.

Estados decritério:`VERIFIED`,`PARTIALLY_VERIFIED`,`NOT_VERIFIED`,`FAILED`. Sem evidência suficiente os pontos são nulos;máximo exige comportamentos demonstrados;parcial fica estritamente entrezero e máximo;falha confirmada valezero. A plataforma calcula soma/consistência dos registros declarados,sem avaliar código. Entrega,nota consultiva e atendimento dos critérios são registros distintos. Não há certificado ougarantia de contratação.

## Defesa e política deIA

Doze perguntas cobrem arquitetura,races,idempotência,worker,Redis,Outbox,testes,gargalos,endpoints,produção,trade-offs eIA. Respostas por texto ou conversa externa sintetizada,sem vídeo obrigatório. IA permitida,sem penalidade automática. AI Usage Report registra ferramentas/tarefas,sugestões rejeitadas,decisões/diffs revisados,testes realmente executados e limitações;conversas privadas completas não são exigidas.

Prompt avaliador inclui todo o contrato,rubrica/bloqueadores,stack,relato atual e defesa uma pergunta por vez. Solicita acesso/permissão antes de executar,inspeção de scripts,ambiente local isolado e distinção entre observado/hipótese/não verificado. Não inventa testes,benchmarks ouacesso porURL,nem aprova só por compilação. Nada é enviado automaticamente.

## Fontes pesquisadas e adaptação autoral

Seis enunciados oficiais foram abertos e revisados independentemente em25/10/2026. Metadados,organizações,URLs,tecnologias,requisitos,critérios,senioridade e condições em`quality/stage15/sources.json` e na seção pública da prova.

| Organização | Recorte publicado | Limite de atribuição |
| --- | --- | --- |
| PicPay |Transferências,saldo,transações,autorizador/notificação;testes/docs e aptidões avançadas|Pleno não explícito;autenticação não avaliada no original|
| Ezoom |PHP/Laravel ouCodeIgniter/MySQL;duas áreasCRUD,README/commits|Pleno explícito;5dias/versões antigas/hospedagem não transferidos|
| ClubPetro |Node/Express,lugares,unicidade/edição/ordenação|Pleno não explícito;TS/testes/Docker/deploy são bônus originais|
| Juntos Somos Mais |Python ouC#,dadosHTTP emmemória,filtros/paginação,AIJourney|Não atribuir Node/PostgreSQL/Redis aooriginal;sem nível autodeclarado|
| System76 |Elixir/Phoenix/Ecto/PostgreSQL,importação/produtos/categorias|Pleno não explícito;stack não imposta aoStackTrail|
| Goomer |Node/TS,Express/Fastify,SQLpuro,produtos/promoções/cardápio|BackendI,não equivalência explícita comPleno|

Classificação:`VERIFIED_HIRING_CHALLENGE` para enunciados públicos consultados,sem comprovar usoatual. `PUBLIC_CANDIDATE_REPORT` é categoria distinta,não utilizada porque não foi necessária evidência de relato pessoal. Nossa prova é`STACKTRAIL_ADAPTATION`;pedidos/estoque,Redis/Outbox,autenticação,prazo,rubrica e regras críticas são autorais.

Licença explícita não localizada nosREADMEs/listagens de raiz consultados:apenas sínteses próprias/links,sem cópia integral,logos oupresunção depermissão. Nenhum vínculo com as empresas ouuso atual dos desafios foi afirmado. ASVS5.0.0 eAPI Security2023 verificados porfonte primária;referências técnicas13/14 mantêm datas/limites originais. GET separado14/14HTTP200 não é evidência deadequação sozinho.

## Persistência e conclusão

`midlevelExam` opcional mantém chave`stacktrail:roadmap:1`/schema2. IDs15por stack,tentativas sequenciais e avaliações anteriores preservadas;campos/IDs/tipos/limites validados. Dados antigos semcampo15 permanecem válidos. Flags genéricas deatividade15 são rejeitadas;uma conclusão não é duplicada poraliases. A tentativa mais recente determina o progresso.

Reabrir/editar material invalida avaliação/checklist e conserva histórico;trocar de stack não transfere nota/entrega. Pausa/retomada preservam rascunhos. Cópia/visita não iniciam/concluem prova. Incompatibilidade dearmazenamento e falha de escrita seguem proteção existente:preservar disco,trabalho emmemória e alerta. PreparaçãoA(`none`):começa dozero ouusa projeto próprio equivalente,sem base resolvida ou suíte-alvo distribuída.

## Auditorias e validação

Skills educator,factchecker euiux aplicadas. Revisão independente somente leitura identificou ambiguidade em“consumir reserva”;corrigida explicitando efeitos físico/reservado,sem prescrever algoritmo. Reconferência sem lacuna material identificada. Revisão não equivale aexecução da solução do estudante.

Resultados e cobertura em`quality/stage15/validation.json`. Primeira rodada deUI detectou seletores de teste demasiado restritos para selects e grupos;corrigidos usando papéis acessíveis/fieldset,sem reduzir cobertura. Os fluxos deambas stacks,nota/limites,reabertura,histórico,clipboard,diálogo,fontes,aliases,reflow/axe e varredura denavegação são registrados separadamente. A varredura global mede navegação/render/reflow/pageerrors;axe foi aplicado ànova experiência e aoToolkit,não repetido emtodas asrotas históricas nesta tarefa.

Validação final: typecheck e lint aprovados; 60 arquivos/581 testes unitários aprovados, zero falhas. Sete cenários da Etapa15 aprovados, incluindo dois de navegação por 541 rotas em cada tema; quatro cenários de regressão do Toolkit aprovados. Reflow em 320/375/768/1024/1440 e fonte150% nos recortes registrados. Build e isolamento aprovados, com 100 módulos e 82 arquivos de saída. GETs14/14HTTP200;98 arquivos de capas idênticos aoHEAD. Evidências de revisão independente em `quality/stage15/independent-review.md`.

Limites:nenhum repositório submetido foi consultado/validado,nenhum backend/worker/SDK deestudante foi executado,nenhum benchmark foi inventado. Zoom real200/400 permanece limitado pelo lançamento deChromium com extensão nesta instalação;reflow/fonte150% não são apresentados como zoomreal. Build mantém aviso existente dechunk>500kB. Ausência deviolações doaxe não certificaWCAG. Semcommit,push oudeploy.
