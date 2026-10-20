# Etapa 11 — auditoria independente UI/UX

Data: 20/10/2026 (America/Sao_Paulo). Revisão independente somente leitura do código e navegação local. Skills lidas: `stacktrail-uiux` e `references/verification.md`; requisitos do anexo integral e AGENTS vigentes considerados. Não houve alteração da implementação, publicação ou commit.

## Achados antes de correções

| Gravidade | Local | Achado e evidência | Estado |
| --- | --- | --- | --- |
| Moderada (P2 editorial) | Etapa 11, exercício 13, tópicos e projeto | Prosa e contratos com palavras/dados aglutinados reduzem a leitura: “ProdutoPestoque5;pedidoqty2total2000”, “qtyinválida”, “rollbackSQL”, “emlogs”, “integrações da05 ... da06”. Listas técnicas com pontuação sem espaço também dificultam leitura. Evidência: capturas `javascript-prep.png`, `light-desktop.png`; conteúdo em `stage-eleven.ts`. Recomenda-se inserir espaços na prosa e formatar entradas/saídas claramente, preservando identificadores reais. | Comunicado ao principal; correção e revalidação pendentes nesta fotografia. |

Não foi identificado impedimento funcional ou overflow nos fluxos executados.

## Execução e cobertura

Preview estático local: `http://127.0.0.1:4196/stacktrail/`. Playwright/Chromium headless, contexto novo com dados fictícios e localStorage próprio, sem perfil pessoal. Script de auditoria separado, sem editar testes nem código da plataforma. Evidência bruta em `browser-independent/results.json`.

- 50 combinações: visão geral, exercício 13, projeto, referências e Meu progresso × temas claro/escuro × larguras 320/375/768/1024/1440. Nenhum documento com scrollWidth maior que viewport+1; nenhum `pageerror`.
- Nove módulos inicialmente recolhidos. Enter abre módulo; abertura do seguinte mantém apenas um aberto.
- Alternância Laravel e Express funcional. Exercício 13 registra início, anotações distintas por stack, parada, recarga e retomada, preservando o texto próprio.
- Preparadora, tutora e revisora abrem três modais por stack com prompt correspondente e nome da stack correta. Tab permaneceu no modal no passo amostrado; Escape fechou e devolveu foco ao acionador nas seis operações.
- Quatro livros no filtro Livros, três capas com caminhos locais `/stacktrail/assets/books/stage11/`, `naturalWidth > 0`, um fallback honesto. Dimensões observadas registradas no JSON.
- Capturas reais desktop/mobile e modal abertas com `view_image`: `light-desktop.png`, `dark-mobile.png`, `javascript-prep.png`. Hierarquia, separação de cards, responsividade, ações e modal legíveis quanto ao layout; a ressalva editorial acima permanece.

## Limites

Esta revisão independente não executou axe, zoom real 200/400%, cálculo matemático de todos os contrastes, inventário global de rotas ou conclusão/reversão total da etapa. O principal executará essas verificações na suíte pertinente. Tab foi amostrado uma vez por modal; isso não prova sozinho um ciclo completo de contenção de foco. Captura de tela e ausência de overflow não certificam WCAG. Não foi executado código/backend/PostgreSQL do estudante nem aplicado prompt a serviço externo. Cópia efetiva por clipboard não foi testada nesta auditoria; os prompts editáveis foram lidos na interface.

## Revalidação após correção editorial

Nova execução completa do script independente em 20/10/2026: novamente 50 combinações sem overflow ou `pageerror`, nove módulos progressivos e fluxos das duas stacks preservados. As capturas em `browser-independent/` e `results.json` representam esta execução posterior. O achado original acima foi preservado como histórico textual.

Os exemplos críticos do exercício 13 foram corrigidos e conferidos no DOM/captura real: “Produto P com estoque 5; pedido de quantidade 2 e total 2000”, “quantidade inválida”, “rollback SQL”, “sem segredo em logs”. Entradas/saídas passaram a separar produto, preço, quantidade e resultado; contratos de preparadora/tutora/revisora refletem o texto corrigido. Capturas desktop/mobile e modal foram novamente abertas para inspeção.

**P2 original: corrigido e validado quanto às aglutinações importantes do exercício 13.** Restaram ocorrências menores comunicadas ao principal para acabamento editorial: exercício 16 “D1pendente, ownerA ... D2entregue ... AconsultaD3ownerB”; exercício 15 “UNIQUE(resource, start, end)não”. Não bloqueiam operação, mas a clareza dos dados se beneficia de separação. A visão geral ainda exibe algumas listas compactas de pré-requisitos e metadados; nenhum corte ou sobreposição observado. Não há novos bloqueios funcionais.

## Acabamento final — revalidação curta

Build final do preview 4196 conferido em 20/10/2026, sem repetir a matriz completa: exercícios 15/16 e visão geral em 375/1440 px, seis combinações sem overflow. Texto renderizado confirma `UNIQUE(resource, start, end) não...` e `D1 pendente, owner A → cancelado; D2 entregue → 409; A consulta D3 de B → 404.` Pré-requisitos, descrições e metadados ISBN/notas da visão geral agora separam a prosa adequadamente. **Resíduos editoriais identificados nesta auditoria: corrigidos e validados.**

O módulo 08 abre pelo teclado Enter, mantém foco visível no summary e exibe o modelo vazio de ADR com título/status/data/contexto/problema/alternativas/decisão/consequências. Campos permanecem em branco como orientações ao estudante, sem solução predeterminada. O bloco preformatado quebra linhas localmente no mobile; não cria overflow no documento. Capturas finais desktop/mobile foram abertas e inspecionadas. Evidências: `browser-independent/final-editorial.json`, `final-11-375.png`, `final-11-1440.png` e capturas dos exercícios 15/16. Sem novo impedimento funcional ou editorial importante observado nesta revisão focal.
