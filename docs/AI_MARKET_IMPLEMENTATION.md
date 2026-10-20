# Engenharia com IA e Competências do Mercado

Relatório do recorte autorizado pelo anexo 26fe345a em 19/10/2026. Nenhum commit, push ou publicação automática. As alterações preexistentes de Etapa10, StudyPages, prompts e preparação foram preservadas.

## Implementação

Rotas `/#/engenharia-com-ia` e `/#/competencias-do-mercado` no HashRouter existente, acessíveis no menu. Sem backend, conta, API de IA ou dependência nova. Base Vite `/stacktrail/` preservada.

| Artefato | Responsabilidade |
| --- | --- |
| `src/practice/ai-engineering.ts` | 19 módulos, 3 desafios, referências, contratos de prompts preparador/tutor/revisor |
| `src/practice/ai-progress.ts` | Persistência independente, validação e transições |
| `src/practice/AIEngineeringPage.tsx` | Percursos, prática, evidências, critérios, modal editável e cópia |
| `src/practice/market-skills.ts` | Fontes, observações tipadas, filtros e comparação |
| `src/practice/MarketSkillsPage.tsx` | Recortes combinados, lotes de 12, justificativas, fontes e lacunas |
| `src/practice/book-cover-policy.ts` | Permissão explícita de capa por asset |
| `src/practice/Shared.tsx` | BookCover aplica permissão e fallback; base Vite existente reutilizada |
| `src/practice/App.tsx` | Rotas e navegação, preservando mudanças anteriores |
| `src/practice/preparation.ts` | Inventário A/B/C separado, por ID estável |
| `scripts/audit-book-covers.mjs` | Auditoria reproduzível de caminhos, permissões, arquivos e duplicatas |
| `scripts/capture-ai-market.mjs` | Capturas de módulos/cards em dois temas e cinco larguras, contra preview local4181 |
| `src/tests/ai-market.test.tsx`, `e2e/ai-market.spec.ts` | Estado, parser, prompts, filtros, rotas, teclado e reflow |

As expectativas históricas de imagens nos testes E2E foram atualizadas para o contrato vigente de permissão e fallback. Nenhuma imagem ou metadado preexistente foi apagado.

## Percursos e práticas

Júnior: J1 fundamentos/limitações; J2 perguntas úteis; J3 debugging; J4 revisão; J5 testes; J6 autonomia. Final: reservas com repetição defeituosa e testes incompletos, resolução independente ou assistida.

Pleno: P1 especificação; P2 planejamento; P3 implementação supervisionada; P4 testes/refatoração; P5 debugging/desempenho; P6 React/TypeScript com uma API; P7 agentes/permissões. Final: cancelamento autorizado e recomposição única de estoque.

Sênior: S1 arquitetura; S2 governança; S3 migrações; S4 segurança/privacidade; S5 observabilidade; S6 liderança. Final: evolução de logística com restrições conflitantes, ADR, riscos, agentes, testes e rollback.

Cada módulo apresenta objetivo, conhecimentos recomendados, conceitos curtos, demonstração para análise, prática original, entregáveis, critérios discriminantes, verificação e fontes. A autorização de conteúdo conceitual é específica desta área; não altera o modelo das etapas técnicas. Bases, testes-alvo e soluções não são distribuídos. Inventário completo em [GUIDED_LABS.md](GUIDED_LABS.md). Geração externa não equivale a ambiente validado; uso de ferramenta paga não é obrigatório.

## Progresso

Correção de usabilidade em19/10/2026: escolher módulo/desafio, usar Anterior/Próximo ou Continuar de onde parei leva ao conteúdo renderizado, com rolagem até o título e foco acessível. Repetir a mesma seleção também leva ao conteúdo. Trocar stack preserva a posição. Regressão em celular/desktop por clique e teclado aprovada; seis testes UI da área passaram após a correção.

Chave nova `stacktrail:ai-engineering:1`, schema1; tentativas e estados de percurso separados por `@php`/`@javascript`. IDs estáveis `ai-j1`…`ai-s6` e finais. Uma stack basta. Iniciar, pausar, retomar, concluir e desfazer; percentual deriva dos módulos e final concluídos na stack. Percurso tem conclusão explícita após todos os registros, sem aprovação fictícia.

Evidência não vazia e todos os critérios conferidos permitem autoavaliação. Edição de evidência invalida critérios e conclusão; reabertura recalcula percentual. Parser aceita somente IDs conhecidos, strings de estado válidas, booleanos e tamanho correto de checklist. Não confia em flags de conclusão sem critérios. Esquema incompatível/erro de leitura mantém registro original intacto e trabalho em memória com alerta; falha de escrita preserva memória. Não escreve em chaves do roadmap, legado, inglês ou profissional. Progresso depende do navegador/origem/dispositivo; não há sincronização.

## Mercado: método e evidência

Consulta: 19/10/2026. Amostra intencional exploratória: 7 anúncios primários únicos, 4 brasileiros e 3 internacionais. Seleção por recortes de senioridade/backend; sem quadro amostral probabilístico e sem denominador de vagas. Publicação não informada: consulta não prova publicação recente. Pabu está encerrada; Ravenna Júnior menciona início em 2025; disponibilidade atual de contratação não confirmada. A vaga Ravenna mid/senior conta uma vez na amostra e aparece nos dois filtros.

Dados: Pabu Júnior PHP/Laravel; MPlan Pleno Node/TS ou Go; Funcional Pleno com alternativas PHP e Express/Nest; Leega Sênior Node/Laravel/React; Ravenna Júnior Laravel; Ravenna mid/senior Laravel; Breeze Júnior Node/TS em Nova York híbrido, com 2+ anos apesar do título. URLs e restrições individuais estão no catálogo tipado e visíveis na UI. Node não prova Express; internacional não significa remoto elegível do Brasil. Leega pedir várias stacks não altera o currículo.

| Fonte primária (consulta 19/10/2026) | Recorte e limite |
| --- | --- |
| [Pabu](https://pabu.gupy.io/job/eyJqb2JJZCI6MTIwODk4MjgsInNvdXJjZSI6ImxpbmtlZGluIn0%3D?jobBoardSource=linkedin) | BR Júnior Laravel, anúncio encerrado |
| [MPlan](https://mplan.gupy.io/jobs/12688768?jobBoardSource=gupy_public_page) | BR Pleno Node/TS ou Go, sem confirmação Express; AWS/microsserviços desejáveis |
| [Funcional Health Tech](https://funcionalhealthtech.gupy.io/jobs/12699530?jobBoardSource=gupy_public_page) | BR Pleno, frameworks alternativos PHP/Node; Docker/Kubernetes desejáveis |
| [Leega](https://leega.gupy.io/jobs/12745476?jobBoardSource=gupy_public_page) | BR Sênior full stack Node/Laravel/React; testes são diferencial nesse anúncio |
| [Ravenna Júnior](https://ravennainteractive.com/careers/junior-laravel-developer) | Internacional Laravel, inglês fluente, início previsto em2025; fuso/localização |
| [Ravenna mid/senior](https://ravennainteractive.com/careers/mid-level-laravel-developer) | Um anúncio associado a Pleno e Sênior, inglês/MySQL/APIs/Git, fuso/localização |
| [Breeze](https://job-boards.greenhouse.io/breezecash/jobs/5412768008) | Internacional Júnior Node/TS/React, Nova York híbrido; pede2+ anos, não prova Express |

Não foi confirmada a data de publicação dos sete anúncios; nenhum card representa garantia de vaga aberta hoje.

Competências cadastradas: PHP/Laravel, Node/TS, Node.js, Express como alternativa, SQL/dados relacionais, Git/revisão, APIs, testes, Docker/CI, CI, contêineres/Kubernetes, cloud, microsserviços/observabilidade, segurança/OWASP, IA, inglês, comunicação/autonomia, debugging/desempenho e ferramentas frontend. Observações por fonte preservam obrigatório versus desejável; não são vagas adicionais.

Essencial é classificação editorial para requisito/expectativa central do anúncio; Diferencial para bônus/desejável; Aprofundamento para prática especializada desejável dependente do contexto. Cada card justifica e limita a classificação. Não há percentuais de demanda nem inferência de maioria. Comparação apenas de presença documentada nos recortes, sem ranking; lacuna em um mercado torna comparação indisponível.

Lacunas: Express Júnior Brasil e Pleno/Sênior internacional sem suporte específico suficiente. Datas de publicação e contratação atual não confirmadas. Amostra pequena, intencional e com vagas full stack; nenhuma representatividade nacional/global. Pesquisas [Código Fonte 2026](https://pesquisa.codigofonte.com.br/2026/ranking), [Stack Overflow 2026](https://survey.stackoverflow.co/2026/) e [CoderPad 2026](https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/) consultadas como contexto, sem transformá-las em contagem de oportunidades. Homepage Sonar não é evidência de demanda.

Atualizar manualmente: abrir página primária e seções, registrar publicação/status/recorte, distinguir obrigatório/desejável, deduplicar anúncio, revisar nomes contra evidência, executar testes de filtros, atualizar data e limitações. Não preencher recortes vazios artificialmente.

## Fontes de Engenharia com IA

Todas abertas em 19/10/2026, conteúdo EN e leitura gratuita; produtos comerciais são opcionais. Documentação viva: versões precisam ser confrontadas com o ambiente local.

- [GitHub prompt engineering](https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering): contexto, decomposição, revisão da saída.
- [GitHub responsible use / Chat](https://docs.github.com/en/copilot/responsible-use/chat): limitações e responsabilidade humana.
- [Anthropic best practices](https://code.claude.com/docs/en/best-practices): verificação, exploração/plano e permissões. Recomendações de fornecedor, sem generalização de eficácia.
- [OWASP LLM01:2025](https://genai.owasp.org/llmrisk/llm01-prompt-injection/): injeção direta/indireta, privilégios e supervisão, sem prevenção infalível.
- [Node test runner](https://nodejs.org/api/test.html): testes/assertivas; página corrente consultada exibiu v26.12, não é requisito de versão para estudante.
- [Laravel 13 testing](https://laravel.com/framework/docs/13.x/testing): testes locais, ambientes e execução; conferir versão do projeto.
- [PostgreSQL Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html): planejamento e análise; página corrente18, ANALYZE executa a consulta.
- [OpenTelemetry signals](https://opentelemetry.io/docs/concepts/signals/): logs, métricas e traces.
- [React Effects](https://react.dev/learn/synchronizing-with-effects): sincronização e limpeza/corridas em consultas.

Consulta não é execução dos exemplos nem validação de código de estudante. Fontes técnicas complementam o processo de IA; a plataforma não executa frontend/backend externos.

## Capas e regras

AGENTS é fonte operacional principal, com recorte atual 00–10 e regras das duas áreas. A política nova exige permissão explícita; origem em catálogo e pedidos anteriores de identificação bibliográfica não bastam. BookCover não solicita imagens remotas ou sem permissão.

Imagem existente autorizada reutilizada nos diretórios canônicos: `public/assets/books/database-design-2ed.webp` e espelho `public-roadmap/assets/books/database-design-2ed.webp`. Não houve download novo. [Catálogo BCcampus](https://opentextbc.ca/dbdesign01/) informa obra de Adrienne Watt e Nelson Eng CC BY4.0 e fotografia Spiral Stairs In Milano old building downtown, Michele Ursino, CC BY-SA2.0; créditos/licenças preservados na biblioteca. Conversão WebP preexistente, composição não alterada. Identidade remota exata não reconfirmada visualmente nesta rodada; inspeção local e descrição do catálogo convergem.

Todas as outras capas sem entrada explícita de permissão usam placeholder neutro, incluindo etapas08/09/10, área profissional e inglês. Metadados e assets preexistentes foram preservados. Auditoria detalhada por ID, arquivos ausentes e duplicatas em `quality/ai-market/book-covers.json`; artefatos duplicados não removidos por compartilhamento/histórico. A lista de permissões impede depender de capas não autorizadas, mesmo quando os metadados antigos ainda registram `kind: image`.

## Auditorias e validação

Revisão independente somente leitura solicitada pelas skills educator/factchecker: confirmou fontes de IA, analisou anúncios e encontrou problemas de âncoras HashRouter, atribuição excessiva de TypeScript/Docker à Leega, estado compartilhado entre stacks, parser permissivo, inventário de preparação e fontes técnicas insuficientes. Correções aplicadas; reconferência registrada no relatório de qualidade.

Resultados finais de comandos e cobertura do navegador são registrados após execução em [QUALITY_AUDIT.md](QUALITY_AUDIT.md). Typecheck/build não constituem aprovação pedagógica. Axe não certifica WCAG; zoom real 200/400 requer ferramenta de navegador apropriada, e reflow reduzido/fonte150% não equivale a ele. Nenhuma execução das soluções dos exercícios foi alegada.

Resultados finais: typecheck e lint aprovados;53 arquivos/523 testes unitários aprovados; build aprovado com aviso de tamanho do chunk; isolamento do build aprovado (47 arquivos). Auditoria GET:303 URLs,293 HTTP200,10 falhas registradas. Auditoria de capas:45 registros,1 autorizado,44 fallbacks,0 arquivos ausentes/hotlinks,6 grupos compartilhados/duplicados preservados.

Suíte UI global:66/68 passaram na rodada de10,5min. A expectativa histórica das capas07 foi atualizada e seu caso passou na reexecução (13,7s), totalizando67 casos distintos validados. O teste de zoom real permanece com falha de ambiente `launchPersistentContext: spawn UNKNOWN`, sem validar200/400 e sem mascarar o resultado da suíte. Os cinco testes novos passaram;386 rotas preexistentes nos dois temas passaram, além das novas telas;20 capturas complementares não apresentaram overflow. Resultados estruturados em `quality/ai-market/validation.json`.

Pendências: ampliar amostra/recortes de mercado e confirmar publicação/status de contratação; obter permissões das44 capas em fallback; reconfirmar visualmente a composição remota BCcampus quando o cliente permitir; executar zoom real200/400 em ambiente que inicie o Chromium completo. Aviso de chunk principal permanece explícito; nenhuma garantia de WCAG integral, certificação ou empregabilidade.
