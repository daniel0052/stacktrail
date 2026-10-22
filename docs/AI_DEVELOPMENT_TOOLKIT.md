# AI Development Toolkit — Planejamento de Projetos com IA

Relatório atual de22/10/2026. Escopo do anexo35947145 e correções do usuário: Gemini é utilizado pelo **Google Antigravity**, com Subagents, e não pelo Gemini CLI. Nenhuma Etapa00–19 alterada. Sem backend, API de IA, conta, execução de código/configuração do estudante ou commit automático.

## Localização e estrutura

Menu global **Ferramentas com IA**, rota `/ai-development-toolkit`; ferramenta disponível em `/ai-development-toolkit/project-planning`. Área independente de senioridade e da trilha educacional Engenharia com IA. Nenhum pré-requisito ou ferramenta futura vazia. O catálogo `toolkitTools` permite adicionar ferramentas completas posteriormente.

Arquivos criados:

- `src/practice/AIDevelopmentToolkitPage.tsx`: catálogo e apresentação da área.
- `src/practice/ProjectPlanningPage.tsx`: sete seções com navegação por foco/rolagem: Como usar, Conceitos, Documentos, Plataforma/Directory Tree, Prompts, Exercício/progresso e Referências.
- `src/practice/project-planning-content.ts`:32 conceitos,12 documentos candidatos, entrevista e critérios.
- `src/practice/agent-platforms.ts`: cinco plataformas, capacidades, caminhos, exemplos e referências primárias datadas.
- `src/practice/project-planning-prompts.ts`: Planning Prompt e Documentation Review parametrizados pela plataforma e mecanismos selecionados.
- `src/practice/toolkit-progress.ts`: estado/validação/persistência independente.
- `src/practice/EditablePromptDialog.tsx`: modal nativo editável, cópia explícita, feedback e retorno de foco.
- `src/practice/toolkit.css`: detalhes, tipografia e árvore com rolagem horizontal local acessível.
- `src/tests/project-planning.test.tsx` e `e2e/project-planning.spec.ts`: contratos, estado, segurança, fontes, cópia, navegação e layout.

Arquivos modificados: `App.tsx` (menu/rotas), `preparation.ts` (inventário A documental), `playwright.practice.config.ts` (nova suíte), `scripts/check-practice-links.mjs` (novas fontes), `README.md`, `AGENTS.md`, índices/auditorias e resultado datado `REFERENCE_LINK_CHECK.json`. Conteúdo técnico das etapas, progresso do roadmap, área profissional, inglês, Engenharia com IA e biblioteca preservados. Sem novas dependências ou imagens bibliográficas.

## Conteúdo e atividade

Cada conceito apresenta nome técnico inglês, definição/explicação PT-BR, exemplo autoral, quando utilizar, limites, erro comum e referência no recorte indicado. Não é tradução/reprodução integral de fonte ou norma. Grupos:

- Project Planning: Discovery, Requirements Engineering, Stakeholders, Product Goals, MVP, Scope, Constraints, Assumptions.
- Requirements: Functional/Non-Functional Requirements, Business Rules, User Roles, Permissions, User Stories, Acceptance Criteria.
- Technical Planning: Tech Stack, Software Architecture, Database Design, Data Modeling, API Contracts, Security Requirements, Testing Strategy, Deployment Strategy e ADR.
- AI Agent Configuration: Rules, Skills, Workflows, Hooks, Agents, Subagents, Commands e MCP.

Documentação candidata: README, PRD, BUSINESS_RULES, FUNCTIONAL_REQUIREMENTS, NON_FUNCTIONAL_REQUIREMENTS, USER_STORIES, ARCHITECTURE, DATA_MODEL, API_CONTRACTS, TEST_STRATEGY, OPEN_DECISIONS e ADR significativo. Função/conteúdo/condição de cada arquivo são explicados. Não gerar arquivos vazios, granularidade artificial ou decisões fictícias. DATA_MODEL/API_CONTRACTS podem não se aplicar; exigir justificativa, não conteúdo inventado. Documento obrigatório para acesso: nenhum. Ao criar Skill, SKILL.md e os campos exigidos pelo formato são parte do contrato.

Exercício **Planeje um projeto completo com um AI Coding Agent**: ideia própria ou cenário sintético de agenda/pedidos/logística/administração, entrevista externa, decisões, aprovação, documentos/configurações, árvore real, revisão/correção e explicação autoral. Entregas proporcionais, sem aplicação obrigatória. Classe A (`none`), IDestável `project-planning`, inventário em `toolkitPreparations`/`preparation.ts` e `GUIDED_LABS.md`.

Oito critérios com IDs estáveis cobrem MVP/escopo, requisitos verificáveis, regras/perfis/permissões, stack justificada, dados/APIs proporcionais, configuração compatível, decisões abertas e revisão/explicação. Rubrica qualitativa, sem nota automática. Uma stack e uma plataforma bastam.

## Plataformas e árvores reais

As árvores são propostas para o projeto externo, não arquivos instalados pelo StackTrail. Caminhos compostos são abreviados numa linha, com barras indicando diretórios. Árvores/prompt incluem somente mecanismos escolhidos e com exemplo verificado; nenhuma pasta universal de agentes é criada. Rules é base recomendada do exemplo; demais mecanismos opcionais e desmarcados inicialmente. Skills/Workflows/Commands que reutilizam um arquivo não o duplicam.

| Plataforma/superfície | Rules | Skills | Workflows/Commands | Hooks | Agents/Subagents | MCP |
| --- | --- | --- | --- | --- | --- | --- |
| OpenAI Codex local | AGENTS.md | .agents/skills/project-planning/SKILL.md | Procedimento/invocação por Skill | .codex/hooks.json | .codex/agents/planning-reviewer.toml | .codex/config.toml, mcp_servers e url |
| Claude Code CLI | CLAUDE.md | .claude/skills/project-planning/SKILL.md | Skill /project-planning; não criar commands antigo | .claude/settings.json | .claude/agents/planning-reviewer.md | .mcp.json, mcpServers/type:http/url |
| Cursor local | .cursor/rules/project.mdc | .cursor/skills/project-planning/SKILL.md | Skill /project-planning | .cursor/hooks.json, version1 | .cursor/agents/planning-reviewer.md | .cursor/mcp.json, mcpServers/url |
| GitHub Copilot VS Code **Local harness** | .github/copilot-instructions.md | .github/skills/project-planning/SKILL.md | .github/prompts/project-planning.prompt.md | .github/hooks/*.json: Preview, geração executável bloqueada sem schema/runtime confirmado | .github/agents/planning-reviewer.agent.md | .vscode/mcp.json, servers/type:http/url; documentado deprecated, alternativa de raiz experimental |
| **Google Antigravity (Gemini), App** | GEMINI.md (AGENTS.md também reconhecido) | .agents/skills/project-planning/SKILL.md | Workflow por Skill; invocação /project-planning no App | .agents/hooks.json: mapa por nome, enabled:false no exemplo | **.agents/agents/planning-reviewer.md**, tools view_file/grep_search, sem escrita/execução | .agents/mcp_config.json, mcpServers/**serverUrl** |

Antigravity não é Gemini CLI: não oferecer `.gemini/settings.json`, comandos TOML ou `httpUrl` como configuração do Antigravity. Workflows antigos do Antigravity IDE foram encerrados em19/10/2026 segundo o aviso oficial; usar Skills como equivalente atual. A matriz final usa a superfície App documentada com Subagents; versões/instalações precisam confirmar disponibilidade. O planejamento não depende de habilitar múltiplos agentes.

Exemplos Hooks não são testes de conteúdo: Codex/Claude demonstram SessionStart, Cursor demonstra afterFileEdit, Antigravity demonstra SessionStart em schema próprio e permanece desabilitado até aprovação/revisão local. Nenhum comando exemplificado foi executado pela plataforma. Rules não substituem sandbox/permissões; Subagents recebem responsabilidades e limites explícitos; não criar vários por conveniência.

Árvore conceitual reúne documentos e `[agent-platform-configuration]` com categorias. A UI/prompt explica que essa pasta é representação e **nunca** deve ser criada literalmente. Árvore real remove esse placeholder e contém caminhos específicos selecionados, explicados individualmente. Exemplos JSON são parseados em teste; isso não valida sua execução ou compatibilidade de uma instalação futura.

## Prompts e aprovação

Planning Prompt começa com uma pergunta sobre ideia/problema e aguarda resposta; no máximo três perguntas por bloco, adaptadas à conversa, em PT-BR. Investiga público/stakeholders/objetivos/MVP, perfis/autenticação/permissões, regras/estados/cancelamentos/limites, segurança/desempenho/disponibilidade/dados/backup, experiência/orçamento/hospedagem/integrações, arquitetura/dados/unicidade/transações/APIs e critérios/testes/entrega.

Decisões são CONFIRMED, ASSUMPTION ou OPEN; não converter premissas em fatos. Antes de gerar arquivos, o agente apresenta síntese, riscos, pendências, lista de documentos/configurações, função e árvore real e pede aprovação explícita. Aprovação de documentos não autoriza código, publicação ou instalação. Conferir existentes e solicitar aprovação antes de sobrescrever/mesclar. Configurações somente necessárias e suportadas; não inventar suporte ou credenciais.

Documentation Review é independente e somente leitura: requisitos, regras, histórias/critérios, stack/arquitetura/dados/APIs/testes, mecanismos de agente e decisões abertas. Achados incluem arquivo/trecho, problema, impacto, severidade justificada, recomendação, decisão pendente e evidência. Fatos versus hipóteses e Atendido/Parcialmente atendido/Não atendido/Não verificado; nenhuma execução/nota/aprovação inventada. Não altera regras de negócio silenciosamente.

Ambos são editáveis e copiados explicitamente para ferramenta externa; o aplicativo não envia tentativa/arquivos, pede senha ou executa comandos.

## Progresso

Chave `stacktrail:ai-development-toolkit:1`, schema1, tentativas por plataforma, sem alteração das chaves anteriores. Estados not-started/in-progress/paused/completed; iniciar, pausar, retomar, concluir e desfazer. Percentual deriva dos oito critérios; concluir requer evidência e todos os critérios conferidos, como autoavaliação declarada.

Editar evidência ou mecanismos invalida checklist/conclusão da plataforma; escolher outra plataforma não transfere conclusão. Validação rejeita esquema incompatível, status em array/tipos inválidos/IDs desconhecidos e conclusão sem evidência/critérios. Dados incompatíveis são preservados e trabalho fica em memória com alerta; falha de escrita preserva o texto em memória. Limite12000 caracteres, sem armazenar projeto inteiro; navegador/origem/dispositivo, sem sincronização.

## Fontes e auditorias

Referências completas com URL, seção, idioma real, custo, versão/superfície e consulta22/10/2026 estão em `agent-platforms.ts`, disponíveis na seção Referências da UI. Documentação primária em EN, gratuita para leitura salvo norma ISOintegral paga/não consultada; produtos podem exigir plano próprio. Exemplos e progressão são autorais, autorizados pelo anexo; fontes ensinam/aprofundam, não certificam o material.

Fontes OpenAI: AGENTS.md, Build Skills, Hooks, Subagents, MCP em learn.chatgpt.com; Claude: Memory/Skills/Hooks/Subagents/MCP em code.claude.com; Cursor: Rules/Skills/Hooks/Subagents/MCP em cursor.com; VS Code: Custom instructions/Agent skills/Prompt files/Custom agents/Hooks/MCP/Migrate customizations; Google: Rules/Skills/Workflows/Hooks/Subagents/MCP em antigravity.google. Conferência por cliente web e revisão independente, sem executar exemplos.

Conceitos: IREBglossário, ISO25010:2023escopo público de qualidade (não norma integral), C4/Deployment do autor, PostgreSQL18 Constraints, OpenAPI3.2.1recortes de contratos, OWASP ASVS5overview, Microsoft Learn estratégia de testes de confiabilidade e ADR GitHub organização especializada. Orientações de fornecedores são identificadas; não exigem conta cloud ou implementação completa dessas normas.

Revisão independente somente leitura encontrou atribuição genérica indevida de conceitos ao catálogo ISO e à especificação Skills; corrigida por mapeamento específico de fonte/conceito. Confirmou formatos Codex, Claude, Cursor, VS Code e Antigravity. As correções sucessivas do usuário definiram Antigravity com Subagents, não Gemini CLI nem restrição indevida ao IDE; arquivos e teste foram ajustados. Reconferência final sem bloqueantes estáticos. UI renderizada e estado são verificados separadamente, sem atribuir ao revisor execução que não realizou.

## Validação e limites

Resultados finais de comandos, capturas, casos e limitações constam em `docs/QUALITY_AUDIT.md` e `docs/quality/toolkit/validation.json`. Build/typecheck não equivalem a aprovação pedagógica, execução das configurações ou conformidade WCAG. Fonte150%/reflow não substituem browser zoom real200/400; registrar limitação se navegador apropriado indisponível.

Executado: typecheck, lint,534 testes unitários em54 arquivos, build e isolamento aprovados. Regressão UI focada Toolkit+IA/mercado:10 testes aprovados; após o delta final Antigravity com Subagents, os4 testes do Toolkit passaram novamente. Temas claro/escuro, sete seções, cinco larguras, fonte150%, modal/cópia/foco, árvores e estados persistidos testados; axe sem violações nos estados verificados. Capturas mobile inspecionadas. A suíte UI global inteira não foi repetida; zoom real200/400 continua não validado. GET342URLs/329HTTP200/13falhas, separado da leitura de adequação.

Pendências esperadas: testar configurações na instalação/versionamento escolhidos pelo estudante antes de ativá-las; confirmar contratos de Hooks do Copilot Local runtime; versões/planos/políticas podem restringir capacidades. Arquivo deprecated MCP do VS Code e migração de Workflows Antigravity estão explicitados, sem falso suporte universal. Normas integrais e projetos dos estudantes não foram executados/lidos. Nenhum commit, push ou publicação nesta tarefa.
