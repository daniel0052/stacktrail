> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](README.md) e o [estado atual](../README.md). Resultados antigos não validam automaticamente a plataforma atual.

# Validação do MVP — 14/10/2026

Registro de trabalho efetivamente executado. Não havia testes nem aplicação no repositório inicial.

## Comandos

- `npm run typecheck`: passou, TypeScript strict.
- `npm run lint`: passou, ESLint + typescript-eslint.
- `npm run test`: 17 testes passaram em 2 arquivos (Vitest, jsdom e Testing Library).
- `npm run build`: passou após corrigir a precedência do plugin MDX (`enforce: pre`). A primeira tentativa falhou por processar MDX como JSX antes de compilar; corrigido. Uma tentativa de teste iniciada antes de terminar a instalação de remark-gfm falhou por dependência ainda ausente; instalação concluída e suíte passou.
- Vite local respondeu HTTP 200. A execução no sandbox impediu abrir porta (EPERM); a prévia foi iniciada com permissão de execução local e bind em 127.0.0.1, sem publicar serviço externo.

## Cobertura automatizada

Inventário de 9 desafios/3 níveis/opcionais/dicas; validação de contrato e IDs duplicados; prompt com enunciado/critério/evidências; roundtrip de rascunho/reflexão/dicas/checklist; rejeição de JSON/versão/estados inválidos; conclusão com critérios; retorno a andamento após desmarcar critério; limites de dicas; avanço com 3 iniciais + qualquer 1 intermediário sem opcionais; leitura/opcionais não substituem prática; caminhos locais válidos; interação com dicas sequenciais; persistência após remontagem; texto parecido com script sem execução; isolamento por exercício; armazenamento corrompido preservado; falha de escrita sem perder memória; fallback de clipboard; tema/aulas preservados.

## Navegador local

Conferidos no navegador do Codex:

- Dashboard desktop em viewport de 1440 × 1000.
- Navegação de “Continuar estudando” para HTML, conteúdo MDX, callouts e exemplos destacados.
- Todas as 11 aulas abertas, cada uma com título, exemplos e revisão/checklist; as 3 opcionais identificadas.
- Todas as 9 páginas de exercício abertas, com enunciado, critérios e área de solução.
- Contato: dica 1 revelou apenas a primeira e passou o botão para dica 2; solução, reflexão e andamento sobreviveram a reload.
- Botão de conclusão desabilitado sem critérios; habilitado depois de conferir todos, com texto “Concluído por autoavaliação”.
- Cópia de prompt gerou feedback de sucesso; nenhuma submissão a uma IA.
- Exportação baixou JSON v1 contendo rascunho e status. Importação desse backup passou pela confirmação e exibiu sucesso.
- Autoavaliação em 390 × 844, tema claro, sem overflow horizontal (scrollWidth 375 / innerWidth 390). Tema escuro restaurado e índice móvel aberto com Enter.
- Laboratório de contato em 390 × 844, sem overflow; os dois campos de texto tinham 289 px dentro do painel.
- Aula HTTP em 320 × 740 revelou overflow na tabela causado por uma regra global de nowrap da rubrica. Regra restringida à coluna de pesos da rubrica; após reload, confirmado sem overflow (scrollWidth 305 / innerWidth 320, tabela 265 px).
- Nenhum erro/warning no console durante a amostra de navegação inspecionada.

## Contraste e acessibilidade

Contraste calculado a partir das cores principais, pela luminância relativa sRGB. Tema escuro: texto/fundo 16,24:1; secundário/painel 8,10:1; discreto/fundo 6,41:1; texto do botão 10,94:1. Tema claro: 14,66:1; 6,40:1; 4,70:1; 5,67:1 respectivamente. Links/painel: 12,29:1 escuro e 5,67:1 claro.

Semântica: main, nav rotulada, headings, labels, fieldsets e legend; skip link; foco visível; restauração de foco após troca de rota; feedback textual; prefers-reduced-motion desativa transições. Verificação não constitui auditoria WCAG completa. Não houve teste com leitor de tela, dispositivos físicos ou outros motores de navegador.

## Fidelidade, segurança e limites

Inventário curricular integral mapeado em plano-e-inventario.md. TypeScript principal; CSS puro na prática; React/Next/Tailwind opcionais. Avançados não bloqueiam. Nenhuma chamada de aplicação a serviços externos/LLM; código do aluno é texto em textarea; nenhuma eval/new Function/iframe executável ou segredo foi inserido no cliente. Endpoints de aula são ilustrativos e declarados como tal.

Não executamos cada exemplo curricular em um ambiente independente nem exercitamos APIs externas reais de alunos. Não houve teste de pagamento, backend ou autenticação: não existem no MVP. Não houve deploy. As instruções e o AGENTS.md do usuário foram preservados.
