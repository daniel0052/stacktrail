# Revisões independentes —23/10/2026

Síntese editorial das revisões somente leitura solicitadas pelas três skills locais, com reconferência dos artefatos. Não equivale à execução de aplicações futuras do estudante.

| Achado | Correção | Evidência/estado |
|---|---|---|
| P1 basesB poderiam não reproduzir defeito | Sintomas benignos explícitos em SQL,senhas,mass assignment,rate limit e BOLA | Contratos corrigidos; revisão pedagógica reconferiu quatro; BOLA recebeu a manifestação solicitada; futura base externa não validada |
| P2 revisão de checklist sem contrato/decisões | Prompt inclui procedimentos,evidências,fontes e assessments por stack | Revisão pedagógica e teste comportamental específico passaram |
| P2 perda de memória ao trocar rota com storage falhando | Provider acima das rotas | Teste de desmontagem/remontagem passou; fluxo real incluído no e2e |
| P3 vazio avaliado globalmente | Contagem por stack atual | Regressão unitária passou com registro sóPHP e stackJS |
| Mapeamentos20/22/28/34 | Removidas associações amplas/indevidas;22A01/API3 | Reconferência independente sem novo bloqueante |
| ExemplosAPI10 desconectados do cenário | Validação de resposta/schema/timeout/redirect em ambas stacks | Artefato corrigido; exemplos não executados |
| AtribuiçãoACS repetida em outras fontes | Condições separadas por fonte | Revisão de metadados; sem licença geral nova no repo |
| Tópico47 só tinha code review como fonte | WSTG4.2 e documentação oficial HTTP/DBLaravel e runnerNode | Seções efetivamente consultadas; limitações de requests simuladas/runner genérico registradas |

Fontes: revisão factual reconferiu Web2025,API2023,ASVS5.0.0,WSTG4.2,Agentic2026,AST1.0-2026,LLM2026,AISVS1.01,ACS0.1.4/wire0.1.0 e MCP2026-07-28. URLsJWT/incidente corrigidas. CódigoCWE existe no XML4.20; relações editoriais são parciais. HTTP200 não comprova adequação.

UI: catálogo e fontes incrementais; tema claro/escuro; navegação por teclado e modal com edição/cópia/Esc/retorno; cinco larguras e fonte150%; zoom real via extensão tabs.setZoom/getZoom em200/400. Capturas fullPage em zoom sofrem recorte do Chromium e não são prova visual integral: usar registros numéricos de viewport/DPR/scroll, foco/visibilidade e capturas normais como evidências complementares. Axe não certifica WCAG.

Limites: nenhuma aplicação Laravel/Express,base vulnerável,consulta SQL,carga ou código do estudante executado. Nenhum serviço,credencial real ou alvo de terceiro usado. Tests reais cobrem a plataforma estática e seus estados, não a segurança de uma aplicação futura.
