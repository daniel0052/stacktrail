# Revisão independente UI/UX — Etapa 08

Data: 19/10/2026. Revisão somente leitura do código por agente independente; navegador Chromium Playwright com contexto novo, sem perfil pessoal. Nenhuma alteração de produto realizada nesta revisão.

## Achados antes das correções

1. **Acessibilidade, gravidade séria (axe):** `label-content-name-mismatch` em `.pf-brand` (App.tsx) e link `Etapa anterior: 07` (Shared.tsx). Rótulo acessível não contém integralmente texto visível. Reproduzido na página de módulos08, temas claro/escuro, 320/1440 px. Preexistente nos componentes compartilhados; comunicado ao responsável. Estado: pendente de correção e nova validação.
2. **Consistência, gravidade baixa:** texto “Abra um módulo por vez” mas details sem grupo exclusivo no primeiro build observado. Responsável informou inclusão de `name` compartilhado depois do build. Estado: corrigido no fonte segundo responsável; comportamento novo ainda não validado nesta revisão.

## Execução e evidências

- 30 combinações: visão geral08, módulos, catálogo exercícios08, exercício16, integrador, referências08 ×320/375/768/1024/1440. Zero pageerror; nenhum documento com scrollWidth maior que clientWidth.
- Summary focado via teclado abre com Enter; foco observado `solid 3px` em cor computada rgb(210,244,170). Capturas de módulos mobile e desktop no mesmo diretório; mobile inspecionada visualmente, hierarquia e conteúdo legíveis, sem corte lateral. Captura contém skip-link visível por foco programático; isso não é estado padrão de navegação.
- Axe na página de módulos, claro/escuro ×320/1440: somente violações de rótulo descritas acima; zero regras incompletas nessas amostras. Não certifica WCAG nem todos os estados de contraste.
- Estado real do exercício16: começar em PHP mostra Em andamento; trocar para TypeScript mostra Não iniciada; voltar PHP e recarregar restaura Em andamento. Sem transferência de estado entre stacks.
- Filtros combinados Setor Agendamentos + Avançado retornam somente exercício16; Limpar filtros mantém etapa08 e retorna lote inicial12.
- Rotas renderizaram títulos corretos, incluindo Kubernetes/KinD e seis entregas no integrador.

Execução inicial em preview4186 e complementar4188, ambos servindo dist do primeiro build08. Scripts de trabalho `/tmp/ui08-review.mjs`, `/tmp/ui08-states.mjs`, `/tmp/ui08-filters.mjs`; resultados `/tmp/ui08-result.json`, `/tmp/ui08-states.json`.

## Limites

Não houve auditoria visual global de todas as rotas anteriores, nem medição manual de todos os pares de contraste, zoom real200/400, fonte150%, conclusão completa/reversão do integrador ou execução Docker/KinD nesta revisão. Esses itens exigem evidência do responsável e não são substituídos pelo build. Screenshots não comprovam funcionamento. Estado geral: achados enviados; não emitir aprovação global a partir desta amostra.

## Revalidação após correções

Novo build servido em4188,19/10/2026. Axe repetido na página de módulos com claro/escuro ×320/1440: **zero violações e zero incompletos** nas quatro amostras. Achado1: **validado**, após remoção do aria-label redundante da marca e inclusão do texto visível no nome acessível do link anterior.

Acordeão testado com foco +Enter no primeiro e segundo módulos: somente segundo permanece aberto; todos oito têm name=stage08-modules. Achado2: **validado**. Capturas mobile/desktop atualizadas no build corrigido. Estado separadoPHP/TypeScript e persistência após recarga repetidos com sucesso. Resultado bruto preservado em `ui-independent-recheck.json`. Sem novo achado demonstrado nesta rodada. Limites de cobertura anteriores continuam válidos; zero violaçõesaxe na amostra não certifica acessibilidade global.
