export type AgentPlatformId='codex'|'claude-code'|'cursor'|'github-copilot'|'antigravity';
export type AgentMechanism='rules'|'skills'|'workflows'|'hooks'|'agents'|'commands'|'mcp';
export type PlatformCapability={mechanism:AgentMechanism;path:string;purpose:string;limitation:string;example:string;source:string};
export type AgentPlatform={id:AgentPlatformId;name:string;surface:string;capabilities:PlatformCapability[]};
export type ToolkitReference={id:string;title:string;url:string;section:string;language:string;cost:string;version:string;checked:string};
const ref=(id:string,title:string,url:string,section:string,version='Documentação viva; conferir cliente/versão local',cost='Leitura gratuita; produto pode exigir plano próprio'):ToolkitReference=>({id,title,url,section,version,cost,language:'EN',checked:'2026-10-22'});
export const toolkitReferences:ToolkitReference[]=[
 ref('codex-rules','OpenAI — AGENTS.md','https://learn.chatgpt.com/docs/agent-configuration/agents-md','Layer project instructions; descoberta e precedência'),
 ref('codex-skills','OpenAI — Skills','https://learn.chatgpt.com/docs/build-skills','Where Codex loads local skills; SKILL.md'),
 ref('codex-hooks','OpenAI — Hooks','https://learn.chatgpt.com/docs/hooks','Where Codex looks for hooks; SessionStart e permissões'),
 ref('codex-agents','OpenAI — Subagents','https://learn.chatgpt.com/docs/agent-configuration/subagents','Arquivos .codex/agents/*.toml; responsabilidades'),
 ref('codex-mcp','OpenAI — MCP','https://learn.chatgpt.com/docs/extend/mcp?surface=cli','Project-scoped .codex/config.toml; trust e mcp_servers'),
 ref('claude-rules','Claude Code — Memory','https://code.claude.com/docs/en/memory','CLAUDE.md; .claude/rules; precedência'),
 ref('claude-skills','Claude Code — Skills','https://code.claude.com/docs/en/skills','Skill directories, frontmatter e invocação /name'),
 ref('claude-hooks','Claude Code — Hooks','https://code.claude.com/docs/en/hooks','Hook locations; settings.json; SessionStart'),
 ref('claude-agents','Claude Code — Subagents','https://code.claude.com/docs/en/sub-agents','Configure subagents; .claude/agents'),
 ref('claude-mcp','Claude Code — MCP','https://code.claude.com/docs/en/mcp','Project scope; .mcp.json'),
 ref('cursor-rules','Cursor — Rules','https://cursor.com/docs/rules','Project rules; .mdc e frontmatter'),
 ref('cursor-skills','Cursor — Skills','https://cursor.com/docs/skills','Skill directories; manual invocation; migração de commands'),
 ref('cursor-hooks','Cursor — Hooks','https://cursor.com/docs/hooks','Configuration locations; version e eventos'),
 ref('cursor-agents','Cursor — Subagents','https://cursor.com/docs/subagents','Creating subagents; .cursor/agents'),
 ref('cursor-mcp','Cursor — MCP','https://cursor.com/docs/mcp','Configuration locations; .cursor/mcp.json'),
 ref('copilot-rules','VS Code — Custom instructions','https://code.visualstudio.com/docs/agent-customization/custom-instructions','Choose a format; copilot-instructions.md'),
 ref('copilot-skills','VS Code — Agent skills','https://code.visualstudio.com/docs/agent-customization/agent-skills','Create a skill; .github/skills'),
 ref('copilot-commands','VS Code — Prompt files','https://code.visualstudio.com/docs/agent-customization/prompt-files','Local harness only; .github/prompts'),
 ref('copilot-agents','VS Code — Custom agents','https://code.visualstudio.com/docs/agent-customization/custom-agents','Custom agent file locations; handoffs e subagents'),
 ref('copilot-hooks','VS Code — Hooks','https://code.visualstudio.com/docs/agent-customization/hooks','Preview; contratos por harness'),
 ref('copilot-mcp','VS Code — MCP servers','https://code.visualstudio.com/docs/agent-customization/mcp-servers','Choose configuration; .vscode/mcp.json e alternativa experimental'),
 ref('copilot-migration','VS Code — Migrate customizations','https://code.visualstudio.com/docs/agent-customization/migrate-customizations','Local versus Copilot harness; não portabilidade'),
 ref('skills','Agent Skills — Specification','https://agentskills.io/specification','SKILL.md, name, description e recursos opcionais','Especificação consultada em22/10/2026','Gratuito'),
 ref('mcp','MCP — Architecture','https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture','Hosts, clients, servers e permissões','Protocolo2026-07-28; conferir suporte do cliente','Gratuito'),
 ref('ireb','IREB — CPRE glossary','https://cpre.ireb.org/en/downloads-and-resources/glossary','Requirements, stakeholders, constraints e validação','Glossário online; não norma integral','Gratuito'),
 ref('architecture','ISO/IEC 25010:2023 — catálogo','https://www.iso.org/standard/78176.html','Escopo público do modelo de qualidade de produto','Edição2,2023; apenas catálogo/escopo consultados','Catálogo gratuito; norma integral paga, não consultada'),
 ref('adr','Architectural Decision Records','https://adr.github.io/','Contexto, decisão e consequências; recursos de ADR','Índice/comunidade especializada','Gratuito'),
 ref('c4','C4 model — Simon Brown','https://c4model.com/','Abstrações e diagramas de contexto, containers, componentes e implantação','Site do autor; modelo de visualização, não certificação de arquitetura','Gratuito'),
 ref('data','PostgreSQL — Constraints','https://www.postgresql.org/docs/current/ddl-constraints.html','Obrigatoriedade, unicidade, chaves e integridade referencial','Página corrente18 consultada; não impõe PostgreSQL a todos os projetos','Gratuito'),
 ref('api','OpenAPI Specification','https://spec.openapis.org/oas/v3.2.1.html','Descrição de operações HTTP, entradas, respostas e segurança','v3.2.1; apenas recortes de contrato consultados','Gratuito'),
 ref('security','OWASP — ASVS overview','https://asvs.owasp.org/','Escopo de requisitos e verificação de controles de segurança','ASVS5.0.0; visão geral consultada, não padrão integral','Gratuito'),
 ref('deployment','C4 — Deployment diagram','https://c4model.com/diagrams/deployment','Ambientes, infraestrutura e instâncias do sistema','Modelo do autor; não valida um ambiente real','Gratuito'),
 ref('testing','Microsoft — Reliability testing strategy','https://learn.microsoft.com/en-us/azure/well-architected/reliability/reliability-test','Escopo, riscos, metas e verificação de falhas','Orientação de fornecedor; não exige Azure. Corpo acessível com aviso de autorização para recursos da página','Gratuito'),
 ref('antigravity-rules','Google Antigravity — Rules','https://www.antigravity.google/docs/rules/','Workspace: GEMINI.md/AGENTS.md; .agents/rules/*.md com trigger'),
 ref('antigravity-skills','Google Antigravity — Agent skills','https://www.antigravity.google/docs/skills/','Workspace .agents/skills; SKILL.md; descoberta e invocação no App'),
 ref('antigravity-workflows','Google Antigravity — Workflows migration','https://antigravity.google/docs/ide/workflows/','Aviso de encerramento dos Workflows antigos em19/10/2026; migrar para Skills'),
 ref('antigravity-hooks','Google Antigravity — Hooks','https://www.antigravity.google/docs/hooks','App: .agents/hooks.json; mapa por nome e eventos com handlers próprios'),
 ref('antigravity-agents','Google Antigravity — Custom subagents','https://www.antigravity.google/docs/subagents/','Workspace .agents/agents; campos e nomes de ferramentas'),
 ref('antigravity-mcp','Google Antigravity — MCP','https://www.antigravity.google/docs/mcp','App: .agents/mcp_config.json; mcpServers e serverUrl'),
];
const rulesText='# Project Rules\n\nExplique decisões em português brasileiro. Preserve arquivos existentes.\nTrabalhe apenas no escopo aprovado. Não gere código durante o planejamento.\nRegistre CONFIRMED, ASSUMPTION e OPEN sem inventar respostas.\nPeça aprovação antes de gerar/sobrescrever arquivos, publicar ou executar comandos externos.\nNão solicite nem registre credenciais ou dados pessoais reais.\nConfronte requisitos, regras, arquitetura, dados e testes. Registre limites reais.\nRules não substituem permissões, sandbox ou controles de segurança.\n';
const skillText='---\nname: project-planning\ndescription: Entrevistar sobre projeto e revisar decisões de planejamento antes de gerar documentação aprovada.\n---\n\nFaça perguntas em blocos pequenos em português brasileiro.\nDiscovery → Requirements → Specification → Architecture → Review → Approval.\nRegistre CONFIRMED, ASSUMPTION e OPEN.\nApresente escopo, árvore real e trade-offs; aguarde aprovação antes de escrever.\nNa revisão, cite arquivo, problema, impacto, severidade, recomendação e decisão pendente.\nNão gere código de aplicação, segredos ou decisões fictícias.\n';
const cap=(mechanism:AgentMechanism,path:string,purpose:string,limitation:string,example:string,source:string):PlatformCapability=>({mechanism,path,purpose,limitation,example,source});
const mcpUrl='https://developers.openai.com/mcp';
export const agentPlatforms:AgentPlatform[]=[
 {id:'codex',name:'OpenAI Codex',surface:'CLI/IDE e configuração local compartilhada; recursos variam por versão e confiança do projeto.',capabilities:[
  cap('rules','AGENTS.md','Acordos persistentes do projeto.','Precedência por diretório; não é controle de acesso.',rulesText,'codex-rules'),
  cap('skills','.agents/skills/project-planning/SKILL.md','Procedimento de descoberta e revisão.','Recursos opcionais; não duplicar Skills equivalentes.',skillText,'codex-skills'),
  cap('workflows','.agents/skills/project-planning/SKILL.md','Sequência documentada dentro da Skill.','Equivalente por instrução; não há pasta workflows/ usada aqui.',skillText,'codex-skills'),
  cap('hooks','.codex/hooks.json','Exemplo opcional de evento SessionStart.','Exige revisão e aprovação; echo só demonstra o evento, não valida documentos.',JSON.stringify({hooks:{SessionStart:[{hooks:[{type:'command',command:'echo Review planning decisions before editing files'}]}]}},null,2),'codex-hooks'),
  cap('agents','.codex/agents/planning-reviewer.toml','Revisão especializada sem alterações.','Criar somente com justificativa; confirmar disponibilidade da versão e limites de delegação.','name = "planning-reviewer"\ndescription = "Revisão de coerência do planejamento"\ndeveloper_instructions = "Revise documentos sem editar arquivos. Cite evidências e decisões pendentes; não invente execução."\n','codex-agents'),
  cap('commands','.agents/skills/project-planning/SKILL.md','Invocação explícita da Skill, como $project-planning.','Equivalente por Skill; nenhum diretório commands/ novo é proposto.',skillText,'codex-skills'),
  cap('mcp','.codex/config.toml','Servidor opcional de documentação OpenAI.','Somente projeto confiável; não inserir tokens; revisar acesso antes de conectar.',`[mcp_servers.openaiDocs]\nurl = "${mcpUrl}"\n`,'codex-mcp'),
 ]},
 {id:'claude-code',name:'Claude Code',surface:'CLI local; não generalizar descoberta e permissões para outras superfícies.',capabilities:[
  cap('rules','CLAUDE.md','Acordos persistentes do projeto.','Também existem .claude/rules/*.md; não criar regras redundantes.',rulesText,'claude-rules'),
  cap('skills','.claude/skills/project-planning/SKILL.md','Procedimento de planejamento.','Invocação /project-planning; descoberta depende de descrição e contexto.',skillText,'claude-skills'),
  cap('workflows','.claude/skills/project-planning/SKILL.md','Sequência de checkpoints dentro da Skill.','Sem pasta workflows/ automática.',skillText,'claude-skills'),
  cap('hooks','.claude/settings.json','Hook SessionStart opcional.','Mesclar configuração existente somente após aprovação; não há pasta hooks/ mágica.',JSON.stringify({hooks:{SessionStart:[{hooks:[{type:'command',command:'echo Review planning decisions before editing files'}]}]}},null,2),'claude-hooks'),
  cap('agents','.claude/agents/planning-reviewer.md','Subagent para revisão documental.','Não delegar sem necessidade nem conceder ferramentas amplas por padrão.','---\nname: planning-reviewer\ndescription: Revisão de coerência do planejamento sem editar arquivos.\ntools: Read, Grep, Glob\n---\nRevise requisitos, decisões e configurações. Cite arquivo e evidência; não altere documentos.\n','claude-agents'),
  cap('commands','.claude/skills/project-planning/SKILL.md','Comando /project-planning por Skill.','Formato .claude/commands/*.md é anterior; novos exemplos usam Skills.',skillText,'claude-skills'),
  cap('mcp','.mcp.json','Configuração MCP no escopo do projeto.','Aprovar servidor/escopo; credenciais não pertencem ao arquivo versionado.',JSON.stringify({mcpServers:{openaiDocs:{type:'http',url:mcpUrl}}},null,2),'claude-mcp'),
 ]},
 {id:'cursor',name:'Cursor',surface:'Editor/Agent local; não presumir execução idêntica em Cloud Agents.',capabilities:[
  cap('rules','.cursor/rules/project.mdc','Project Rules com frontmatter.','Formato .mdc; confirmar globs/alwaysApply antes de ampliar escopo.','---\ndescription: Acordos de planejamento do projeto\nalwaysApply: true\n---\n'+rulesText,'cursor-rules'),
  cap('skills','.cursor/skills/project-planning/SKILL.md','Skill de planejamento invocável por /project-planning.','Caminho alternativo .agents/skills existe; escolher um, sem duplicação.',skillText,'cursor-skills'),
  cap('workflows','.cursor/skills/project-planning/SKILL.md','Sequência dentro da Skill.','Não gerar pasta workflows/ para simular suporte.',skillText,'cursor-skills'),
  cap('hooks','.cursor/hooks.json','Exemplo opcional afterFileEdit.','Hooks podem falhar em modo fail-open; echo não é uma checagem de qualidade.',JSON.stringify({version:1,hooks:{afterFileEdit:[{command:'echo Review changed planning files'}]}},null,2),'cursor-hooks'),
  cap('agents','.cursor/agents/planning-reviewer.md','Subagent de revisão documental.','Confirmar ferramentas e escopo disponíveis na versão local.','---\nname: planning-reviewer\ndescription: Revisar coerência dos documentos sem editar.\n---\nRetorne achados com arquivo, impacto e decisão pendente. Não faça alterações.\n','cursor-agents'),
  cap('commands','.cursor/skills/project-planning/SKILL.md','Comando via Skill /project-planning.','A documentação atual migra commands para Skills; não criar commands/ novo.',skillText,'cursor-skills'),
  cap('mcp','.cursor/mcp.json','Servidor MCP no projeto.','Conexão só após aprovação e análise de permissões.',JSON.stringify({mcpServers:{openaiDocs:{url:mcpUrl}}},null,2),'cursor-mcp'),
 ]},
 {id:'github-copilot',name:'GitHub Copilot — VS Code Local harness',surface:'Exclusivamente Local harness do VS Code. Copilot harness, GitHub.com e CLI têm contratos diferentes.',capabilities:[
  cap('rules','.github/copilot-instructions.md','Instruções gerais do repositório.','Regras por caminho podem usar .github/instructions/*.instructions.md; não duplicar.',rulesText,'copilot-rules'),
  cap('skills','.github/skills/project-planning/SKILL.md','Skill de planejamento e revisão.','Confirmar disponibilidade/política de Agent Skills no VS Code.',skillText,'copilot-skills'),
  cap('workflows','.github/prompts/project-planning.prompt.md','Workflow invocado manualmente no Chat.','Prompt files são Local harness; no Copilot harness usar Skill reconhecida.','---\ndescription: Entrevistar e planejar um projeto antes de criar arquivos\n---\nDiscovery → Requirements → Specification → Architecture → Review → Approval.\nFaça perguntas em blocos pequenos. Aguarde aprovação antes de escrever arquivos.\n','copilot-commands'),
  cap('hooks','.github/hooks/planning.json','Eventos do agente, recurso Preview.','Contratos Local/Copilot diferem; não fornecemos JSON executável sem confirmar schema/runtime local. Geração externa deve consultar a referência e obter aprovação.','','copilot-hooks'),
  cap('agents','.github/agents/planning-reviewer.agent.md','Custom agent de revisão.','Subagent e handoff são operações distintas; ferramentas dependem do runtime.','---\nname: planning-reviewer\ndescription: Revisão documental sem alterações\n---\nRevise somente documentos. Cite arquivo, problema, impacto e decisão pendente; não edite arquivos.\n','copilot-agents'),
  cap('commands','.github/prompts/project-planning.prompt.md','Comando /project-planning no Local harness.','Não compatível com Copilot harness; usar Skill como alternativa.','---\ndescription: Planejar por entrevista e aprovação\n---\nEntreviste antes de propor arquivos. Revise decisões e aguarde aprovação explícita.\n','copilot-commands'),
  cap('mcp','.vscode/mcp.json','Configuração por workspace do Local harness.','Formato documentado como deprecated na consulta; alternativa .mcp.json exige opção experimental. Não converter automaticamente. Verificar versão e política antes de usar.',JSON.stringify({servers:{openaiDocs:{type:'http',url:mcpUrl}}},null,2),'copilot-mcp'),
 ]},
 {id:'antigravity',name:'Google Antigravity (Gemini)',surface:'Antigravity App, com configurações de workspace e Subagents documentados. Gemini é o modelo; não usar convenções do Gemini CLI. Conferir versão e recursos da instalação antes de ativar.',capabilities:[
  cap('rules','GEMINI.md','Instruções do workspace reconhecidas pelo Antigravity.','AGENTS.md também é reconhecido; escolher um sem duplicação. Regras modulares .agents/rules/*.md exigem trigger válido.',rulesText,'antigravity-rules'),
  cap('skills','.agents/skills/project-planning/SKILL.md','Skill de planejamento no workspace.','Antigravity usa .agents/skills atualmente; .agent/skills é legado. Não transportar diretórios .gemini/skills do Gemini CLI.',skillText,'antigravity-skills'),
  cap('workflows','.agents/skills/project-planning/SKILL.md','Workflow expresso por Skill com checkpoints no Antigravity.','Workflows antigos do IDE foram encerrados em19/10/2026 segundo a documentação consultada. Usar Skill como equivalente; não gerar .agent/workflows para simular suporte.',skillText,'antigravity-workflows'),
  cap('hooks','.agents/hooks.json','Exemplo desabilitado de SessionStart.','Mapa por nome, diferente de Codex/Claude/Gemini CLI. Confirmar comando e SO e obter aprovação antes de habilitar; echo é só demonstração de evento.',JSON.stringify({'planning-reminder':{enabled:false,SessionStart:[{type:'command',command:'echo Review planning decisions before editing files'}]}},null,2),'antigravity-hooks'),
  cap('agents','.agents/agents/planning-reviewer.md','Custom Subagent do Antigravity para revisão documental independente.','Criar somente quando a revisão justificar delegação. Conferir suporte e ferramentas da instalação; nomes incorretos podem travar o Subagent. Exemplo sem ferramentas de escrita ou execução.','---\nname: planning-reviewer\ndescription: Revisar coerência do planejamento sem alterações\ntools: [view_file, grep_search]\nsubagent: true\nmainAgent: false\ncommandExecutionPolicy: "off"\n---\nRevise documentos. Não altere arquivos. Cite arquivo, problema, impacto, evidência, severidade e decisão pendente. Não declare testes executados sem prova.\n','antigravity-agents'),
  cap('commands','.agents/skills/project-planning/SKILL.md','Procedimento invocável como Skill, equivalente ao comando de planejamento.','Invocação explícita /project-planning por Skill no Antigravity App. Conferir disponibilidade no cliente instalado; não criar commands TOML do Gemini CLI ou Workflows antigos.',skillText,'antigravity-skills'),
  cap('mcp','.agents/mcp_config.json','MCP do workspace Antigravity com servidor remoto.','Usa serverUrl, não httpUrl/url do Gemini CLI ou de outros agentes. Global em ~/.gemini/config/mcp_config.json; revisar permissões antes de conectar.',JSON.stringify({mcpServers:{openaiDocs:{serverUrl:mcpUrl}}},null,2),'antigravity-mcp'),
 ]},
];
export const mechanismNames:Record<AgentMechanism,string>={rules:'Rules',skills:'Skills',workflows:'Workflows',hooks:'Hooks',agents:'Agents / Subagents',commands:'Commands',mcp:'MCP'};
export function platformById(id:string|null|undefined){return agentPlatforms.find(p=>p.id===id)??agentPlatforms[0];}
export function selectedCapabilities(platform:AgentPlatform,mechanisms:AgentMechanism[]){return platform.capabilities.filter(c=>mechanisms.includes(c.mechanism)&&!!c.example);}
export function configurationExamples(platform:AgentPlatform,mechanisms:AgentMechanism[]){
 const selected=selectedCapabilities(platform,mechanisms);
 return [...new Set(selected.map(c=>c.path))].map(path=>{
  const entries=selected.filter(c=>c.path===path);const first=entries[0];
  const example=path.endsWith('.json')&&entries.some(c=>c.example)?JSON.stringify(Object.assign({},...entries.filter(c=>c.example).map(c=>JSON.parse(c.example) as Record<string,unknown>)),null,2):first.example;
  return {...first,example,purpose:[...new Set(entries.map(c=>c.purpose))].join(' '),limitation:[...new Set(entries.map(c=>c.limitation))].join(' ')};
 });
}
export function platformTree(platform:AgentPlatform,mechanisms:AgentMechanism[]){
 const paths=[...new Set(selectedCapabilities(platform,mechanisms).map(c=>c.path))];
 return ['my-project/','├── README.md','├── docs/  (documentos conforme escopo aprovado)','│   ├── PRD.md','│   ├── BUSINESS_RULES.md','│   ├── FUNCTIONAL_REQUIREMENTS.md','│   ├── NON_FUNCTIONAL_REQUIREMENTS.md','│   ├── USER_STORIES.md','│   ├── ARCHITECTURE.md','│   ├── DATA_MODEL.md  (se aplicável)','│   ├── API_CONTRACTS.md  (se aplicável)','│   ├── TEST_STRATEGY.md','│   ├── OPEN_DECISIONS.md','│   └── adr/0001-initial-architecture.md  (decisão real)',...paths.map((p,i)=>`${i===paths.length-1?'└──':'├──'} ${p}  (opcional, selecionado)`)].join('\n');
}
