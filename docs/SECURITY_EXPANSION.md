# Application Security e AI Agent Security — 23/10/2026

## Organização e escopo

Implementação do anexo `3acf0a67`, autossuficiente. A rota `/security` reúne a Security Knowledge Base, com título Segurança de Aplicações e Agentes de IA. `/ai-development-toolkit/agent-security` apresenta procedimento contextual de revisão para Codex, Claude Code, Cursor e GitHub Copilot no Local harness, com links à referência compartilhada. Não instala configurações, Hooks, MCP ou dependências.

O Backend Security Top50 é curadoria autoral StackTrail, não ranking OWASP ou estatística de ataques. São 50 tópicos nas categorias 10/10/8/8/7/7; cada um tem explicação, contexto/severidade, cenário, causa, fluxo vulnerável/controle, exemplos Laravel/Express, prevenção, testes, erro comum, referências e relações editoriais com OWASP/CWE. Fluxos são exemplos referenciais inertes, não funções prontas ou controles executados.

Conceitos e exemplos são autorizados neste recorte independente. Laboratórios permanecem autorais, sem patch ou relatório resolvido. Etapa13 não recebeu conteúdo de segurança; 14–19 continuam pendentes. Links contextuais nas etapas04–12 e Engenharia com IA levam à mesma referência. Os percursos Júnior/Pleno/Sênior apontam atividades reais existentes e práticas independentes; não concluem nem publicam etapas futuras.

## Conteúdo e versões

| Instrumento | Edição consultada | Uso/limitação |
|---|---|---|
| Web Top10 | 2025 | Códigos e nomes dessa edição; conscientização |
| API Top10 | 2023 | Dez riscos, exemplos nas duas stacks |
| ASVS | 5.0.0 | Requisitos selecionados versionados, sem declaração de conformidade |
| WSTG | 4.2 estável | Procedimentos; 5.0 em desenvolvimento; recuperação de senha histórica não substitui guidance atual |
| Cheat Sheets | Contínua | Guidance contextual, consulta datada |
| Agentic Top10 | 2026 | Dez riscos ASI01–ASI10 |
| Agentic Skills Top10 | 1.0-2026 | Projeto Incubator; páginas divergem sobre lançamento; Universal Skill Format é proposta |
| LLM Top10 | 2026 | Dez riscos com códigos reorganizados; arquivo antigo2025 não invalida publicação2026 |
| AISVS | 1.01 | Release estável no repositório de projeto Incubator;1.02-dev não publicada como estável |
| ACS | repo0.1.4 / wire0.1.0 | Pré1.0; implementação de referência fail-open, wire sem autenticação e cobertura parcial; não ativada |
| MCP | 2026-07-28 | Contratos HTTP/STDIO distintos; autorização de ferramenta e argumentos, sem token passthrough |

Há 50 registros oficiais de risco nas cinco listas. ASVS/AISVS têm cinco exemplos de requisitos selecionados verificáveis, incluindo autorização de dados, parametrização, aprovação humana e autorização de argumentos MCP. Guidance, requisitos e procedimentos são diferenciados.

MCP/Agentes: confiança em servidores, identidade, credenciais, menor privilégio, rede, dados externos, descrições/resultados não confiáveis, auditoria e aprovação informada. Seis cenários abrangem instruções de repositório, Skills, Hooks/comandos, subagentes, ferramentas/MCP e controles de runtime. Não se atribui enforcement universal às plataformas.

## Prática e progresso

12 laboratórios: Access Control, SQL Prevention, Password Storage, BOLA, Mass Assignment, Rate Limiting, Dependency Review, Logging, Prompt Recognition, Skill Review, MCP Permissions e Agent Audit. Inventário independente A5/B7. A usa fixture documental; B prepara apenas estado inicial local/sintético com sintomas observáveis. Não há execução de código de estudante no cliente. Instalação/reprodução futura deve ser demonstrada pela IA externa ou declarada não validada.

10 checklists com três controles cada: Backend, API, Identity, Database, CI/CD, Dependencies, Agents, Skills, MCP e Production. Cada controle tem procedimento, evidência e cinco estados. Não aplicável exige justificativa. Conclusão exige decisões resolvidas, evidência geral e critérios; não equivale a conformidade.

Chave independente `stacktrail:security:1`, esquema1, IDs estáveis e tentativas `@php`/`@javascript`. Evidência/decisões editadas invalidam revisão, critérios e conclusão. Visita/cópia não concede conclusão. Provider acima das rotas conserva trabalho em memória na sessão quando storage falha; dados incompatíveis são preservados. Ajuda/revisão editáveis usam contratos, fontes e evidências declaradas como dados não confiáveis; somente cópia explícita, nenhuma API/envio.

## Arquivos

Novos: `src/practice/security/` (tipos, catálogo, fontes, padrões, prática, percursos, registro, progresso e prompts), `SecurityKnowledgeBasePage.tsx`, `AgentSecurityGuidePage.tsx`, `security.css`, `src/tests/security.test.tsx`, `e2e/security.spec.ts`, `scripts/check-security-links.mjs` e evidências em `docs/quality/security/`.

Integrações: App, Toolkit, ProjectPlanning, AIEngineering, StudyPages, ProgressPage e preparation; teste de inventário do Toolkit e configuração Playwright. Documentação: AGENTS, README, índices, inventário, CONTENT_VERIFICATION e QUALITY_AUDIT. Alterações preexistentes da Etapa13 preservadas e não atribuídas a esta expansão.

## Fontes, direitos e auditorias

Catálogo de fontes em `security-sources.ts`, com seção, idioma real, custo, versão, consulta e limitações. GET separado em `quality/security/source-access.json`: 73/73 respostas2xx, sem equiparar acesso à adequação. CWE4.20 conferido no XML oficial;25 IDs e descrições em `cwe-verification.json`; existência não prova equivalência de mecanismo. Mapeamentos são parciais/editoriais, sem diagnóstico automático.

Atribuição OWASP e condições por fonte: Web CC BY3.0; materiais selecionados ASVS/WSTG/CheatSheets/AISVS CC BY-SA4.0; ACS distingue código/schema Apache2.0 e documentos CC BY-SA4.0. Paráfrases/cenários são autorais; sem endosso OWASP. Consultar licença da fonte antes de redistribuir adaptações. Não se impõe licença geral nova ao repositório.

Revisões independentes somente leitura: pedagogia, precisão e interface. Achados: quatro mapeamentos amplos/errados corrigidos; exemplos API10 alinhados a respostas externas; licenças específicas separadas; sintomas iniciais B explícitos; prompts incluem contrato/checklist; preservação em memória entre rotas e vazio por stack corrigidos. Evidência de execução e limitações abaixo.

## Validação e limites

Typecheck, lint, build e isolamento passaram. A suíte unitária passou com569testes em58arquivos. A execução completa de navegador teve95/97passando; as duas falhas foram seletores dos novos testes (rótulo exato de select e menu móvel em viewport desktop), corrigidos e reconferidos nos5/5cenários da nova área no build final. Portanto97cenários únicos foram verificados com sucesso, sem alegar que a primeira execução completa foi verde. Logs: `unit.log`, `full-ui.log`, `browser-recheck.log`, `typecheck.log`, `lint.log`, `build.log`, `isolation.log`, `links.log`. Não foram executadas aplicações Laravel/Express, SQL de estudante, carga, payloads ou controles externos. Exemplos e futuros projetos-base não são runtime validado. Axe não certifica WCAG. Nenhum commit, push ou deploy automático.

Complemento de fontes para Security Testing: WSTG4.2, Laravel13 HTTP Tests (`assertForbidden` cobre só403, requests simuladas) e Database Testing (invariantes explícitas, limites de RefreshDatabase); Node Test Runner26.12.1 (runner genérico, não cliente HTTP Express ou isolamento de banco). Seções efetivamente consultadas e limites registrados. Síntese das revisões em `quality/security/review-findings.md`.

Inspeção visual das capturas normais375/1440 em ambos os temas complementa a automação. Capturas fullPage em zoom real apresentam recorte do Chromium; números de zoom/viewport/DPR/scroll e operação do modal passaram, mas a captura ampliada não demonstra toda a página. O build mantém aviso de chunk principal acima de500kB; nenhuma dependência foi adicionada, e isso não é tratado como avaliação de capacidade/performance do estudante.


Cobertura observada:489entradas existentes de rota nos dois temas com axe/reflow;132novas páginas de conteúdo nos dois temas;12templates/visões em320/375/768/1024/1440 e fonte150%; zoom real200/400 e modal; busca/filtros combinados e contexto de etapa; guia nas quatro plataformas; persistência,pausa/retomada,conclusão/reversão,invalidação,checklistNAjustificado,isolamento de stacks,quota/dados incompatíveis e navegação real com estado em memória. Capturas normais finais e de zoom em `quality/security/browser/`.

Pendências funcionais conhecidas neste recorte: nenhuma após reconferência. Limitações permanecem: exemplos/backend e futuras basesB não executados; ACS/AST com maturidade preliminar; associações OWASP/CWE parciais; captura fullPage de zoom recortada; aviso de tamanho do chunk principal. Sem certificação de conformidade ou execução inventada. Nenhum commit,push ou publicação foi realizado.
