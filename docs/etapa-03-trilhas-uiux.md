# Etapa 03 — revisão independente de interface e progresso das duas trilhas

Revisão iniciada em 17/10/2026. Escopo: seleção de trilha, navegação, evidências, migração e conclusão. Aplicada a skill `.agents/skills/stacktrail-uiux/SKILL.md` e sua matriz de verificação. Esta revisão não altera o produto. Os critérios curriculares vêm do anexo de reorganização fornecido pelo usuário; precisão pedagógica e técnica pertence às respectivas auditorias independentes.

## Levantamento anterior às correções

| Local | Gravidade | Evidência de código | Fluxo prejudicado | Estado |
| --- | --- | --- | --- | --- |
| `src/app/StageThree.tsx` | Alta | Dashboard apresenta PHP/Laravel como base e Node/Express/Nest como opcionais; autoavaliação usa somente assessment03/evidence03 | Estudante JS não tem percurso principal completo nem evidências independentes | Pendente na baseline |
| `src/features/progress/model.ts` | Alta | ready depende somente dos cinco exercícios PHP e seis evidências; não inclui fundamentos comuns lidos | Conclusão JS impossível; conclusão sem fundamentos comuns possível | Pendente na baseline |
| `src/features/progress/model.ts` | Alta | Condições `data.version===6` para IDs de aulas03 e arrays assessment03/evidence03 | Mudança ingênua para versão7 pode rejeitar dados ou perder evidências PHP ao reimportar | Risco de migração identificado |
| `src/app/App.tsx`, `LessonIndex.tsx`, `LessonPage.tsx`, `components/lab/Lab.tsx` | Média | Navegação e badges dependem do único optional global | Renomear apenas dashboard deixa JS apresentado como extra nos destinos | Pendente na baseline |
| `src/features/progress/roadmap.ts` | Média | started observa somente assessment03/evidence03 | Evidência JS isolada pode continuar exibindo etapa não iniciada | Pendente na baseline |

Os itens são baseline e riscos concretos, não alegação de defeito na implementação futura. Nenhum resultado histórico de navegador é usado como aprovação desta reorganização.

## Contraprovas exigidas para progresso

| Caso | Resultado esperado |
| --- | --- |
| Importar v6 com texto PHP, checks, solução e reflexão | Conteúdo idêntico, chave legada mantida; novos campos JS vazios |
| Exportar/importar v7 com ambas as trilhas | Ambas preservadas; preferência válida persistida |
| Trocar preferência após concluir uma trilha | Conclusão da etapa preservada; progresso individual permanece independente |
| Completar apenas fundamentos comuns | Etapa ainda em andamento |
| Completar principal JS com fundamentos, sem PHP/Nest | Etapa concluída por declaração |
| Completar principal PHP com fundamentos, sem JS/Nest | Etapa concluída por declaração |
| Completar trilha sem fundamentos | Etapa ainda em andamento |
| Importar flags de conclusão sem solução/checks/reflexão | Recalcular, sem aceitar aprovação falsa |
| Informar preferência desconhecida/arrays inválidos | Importação rejeitada sem apagar original |
| Iniciar só evidência JS | Etapa em andamento |

## Matriz de interface a executar após implementação

Verificar dashboard, índice, aula PHP, aula JS, aula comum, Nest, laboratório, exercício de cada trilha, autoavaliação e roadmap, com ambos os temas. Seleção deve ter nome e estado acessíveis, foco visível e funcionamento com teclado; destaque não pode depender só de cor. Troca mantém acessíveis os conteúdos da outra trilha. Nest tem rótulo opcional consistente. Mensagens distinguem evidência declarada e código executado localmente.

Larguras: 320, 375, 768, 1024 e 1440 px; fonte 100/150%; zoom real 200/400% quando disponível, explicitando mecanismo. Conferir reflow dos rótulos longos JS/TS/Node/Express, controles de seleção e campos de evidência. Confirmar contraste computado de seleção/foco/textos nos dois temas e prefers-reduced-motion. Não esconder overflow global como correção.

Regressão compartilhada: navegação e progresso das etapas00–02, backups legados e rotas originais03. Não executar código arbitrário do estudante. Usar contexto novo com dados fictícios, sem apagar armazenamento pessoal.

## Fontes e limites

- Skill local UI/UX e `references/verification.md`, efetivamente lidas nesta revisão.
- Anexo do pedido, efetivamente lido nesta revisão.
- Código listado acima, inspecionado antes da implementação.
- Referências normativas indicadas pela skill: WCAG2.2, critérios1.4.3,1.4.4,1.4.10,1.4.11,2.4.7 e2.4.11. Não houve consulta web normativa nesta passagem; não há dúvida normativa resolvida por inferência nem alegação de certificação.

Validação de implementação e navegador: pendentes nesta passagem. Não foram executadas suites, servidores ou alterações de produto pelo revisor, conforme divisão de trabalho solicitada.


## Execução posterior pelo autor — 17/10/2026

A baseline acima foi produzida antes da implementação pelo revisor. O autor
executou13/13cenários: seleção,21rascunhos, conclusãoJSsemPHP/Nest, migração v6,
retorno aPHPsemperderJS e5larguras×2temas com fonte150%. Oito cenários adicionais
passaram: seleção por teclado, quatro capturas dashboard/assessment em375/1440,
contraste computado de controles/código com fonte90% e zoom real Chromium
200/400% por chrome.tabs.setZoom/getZoom, com confirmação de DPR/innerWidth.

Inspeção visual do autor: capturas desktopescuro e mobileclaro mostraram seleção
legível e campos contidos; o índice longo segue o menu recolhível existente.
O sidebar foi filtrado por trilha e a integração final foi separada dos primeiros
fundamentos no dashboard após essa inspeção; reconferência global em andamento.

121/121casos do build estático passaram antes desses últimos ajustes pequenos;
rotas, locks/ZIPs, falha de carregamento e recuperação foram exercitados. A
revisão independente final de código/progresso está em verification/stage-03-tracks-final.md.
Não se atribuem esses ensaios ao revisor da baseline, nem se declaraWCAGcompleta.

Fechamento do autor:318/318cenários globais e27/27reconfirmações no build
passaram após filtragem/organização final. Nenhuma violação foi detectada no
escopo automatizado; incompletosaxe não são convertidos em aprovação universal.
Cobertura e limites consolidados em etapa-03-trilhas.md e QUALITY_AUDIT.md.
