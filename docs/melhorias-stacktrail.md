> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](README.md) e o [estado atual](../README.md). Resultados antigos não validam automaticamente a plataforma atual.

# StackTrail — evolução de interface, acessibilidade e navegação

Pedido do usuário lido integralmente em `Pasted text.txt`; AGENTS.md relido e preservado. Trabalho incremental sobre o MVP existente, sem gerar aulas de etapas futuras, sem APIs de IA e sem deploy.

## Fontes consultadas antes das alterações

MCP Notion disponível e descoberto por metadados de ferramentas; acesso a fetch confirmado. Nova consulta em 14/10/2026:

- [Roadmap guiado completo](https://app.notion.com/p/3f53cadfab778127857ef57e2220f721): todas as fases e descrições 01–19, incluindo detalhes expandidos.
- [Roadmap pai](https://app.notion.com/p/3f53cadfab7781b68266d8e1eeceeb81).
- [Pensamento computacional / preparação 00](https://app.notion.com/p/3f53cadfab77814bbaf1de279833217b): pilares, pseudocódigo, testes de mesa e resolução de problemas.
- [ETAPA 01 completa](https://app.notion.com/p/3f63cadfab77812494d8d5a0312f1a7a): objetivos, exercícios e rubrica preservados.

Retornos completos até o fechamento da página, sem indicadores de truncamento ou blocos desconhecidos. A consulta do roadmap completo significa leitura do guia de todas as fases; não afirmamos ter lido integralmente as páginas filhas 02–19. Títulos e descrições em `src/content/roadmap.ts` derivam desse guia; a preparação resume sua página própria; a descrição de 01 respeita sua página específica.

Documentação oficial atual consultada: [Vite/GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages), [HashRouter](https://reactrouter.com/api/declarative-routers/HashRouter), [dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog), [Clipboard.writeText](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText).

## Implementação e arquivos

1. `src/content/roadmap.ts`, `src/app/RoadmapPage.tsx`: 20 etapas, quatro grupos, estrada curva com SVG decorativo por segmento, marcador atual/concluído, estado separado de disponibilidade, referências e listagem de etapas.
2. `src/app/App.tsx`, `LessonIndex.tsx`, `Dashboard.tsx` reutilizado: navegação Visão Geral/Etapas/Aulas/Laboratório/Autoavaliação, mapa como entrada, conteúdo antigo em `/etapas/01`. Marca StackTrail no shell e HTML. Índice 01 somente no contexto de estudo.
3. `src/features/progress/model.ts`, `ProgressProvider.tsx`, `roadmap.ts`: esquema v2, migração v1, fonte 90–150%, chave antiga preservada. Etapa 01 deriva seu estado de atividades/evidências, nunca da abertura de páginas. Conclusão exige os critérios existentes; futuros permanecem não iniciados/em preparação. Progresso geral conta etapas declaradas concluídas (hoje somente 01 pode ser concluída).
4. `src/components/learning/FontControls.tsx`, `CodeBlock.tsx`, `useClipboard.ts`, `LessonPage.tsx`: texto em unidades relativas e percentual da raiz, controls acessíveis, pre MDX reutilizável, cópia somente dos nós de código, feedback de 2,5 s e tratamento de falha. Nenhuma transformação scale, limitação de zoom ou biblioteca nova.
5. `src/components/lab/ReviewDialog.tsx`, `reviewPrompt.ts`, `Lab.tsx`: modal nativo, prompt editável com número/etapa/nível/rubrica e dados específicos, cópia manual, Tab nas extremidades, Escape e foco restaurado. Falhas de clipboard não removem o texto.
6. `vite.config.ts`, `main.tsx`, `index.html`, `public/.nojekyll`: base `/stacktrail/` confirmada pelo remoto `https://github.com/daniel0052/stacktrail.git`, HashRouter e build estático.
7. `src/styles/index.css`: tipografia em rem, header adaptável, mapa móvel, modal e toolbar do código. Cores e identidade existentes preservadas.
8. Testes existentes adaptados e novos `roadmap.test.ts`, `reading-tools.test.tsx`, `dialogStub.ts`. README atualizado; package/lock renomeados para StackTrail. Conteúdo dos nove exercícios e 11 aulas não foi reescrito.

## Verificações realizadas

- Typecheck e lint passaram.
- 36 testes passaram em 4 arquivos: incluem os 17 anteriores, migração v1, validação de fonte, avanço e estados da jornada, conteúdo específico dos nove prompts, preservação de whitespace ao copiar, sucesso/falha de clipboard, feedback temporário, limites/restauração/persistência de fonte e modal editável.
- Build passou com base `/stacktrail/`, bundles e MDX sob demanda. Caminhos de script/CSS em `dist/index.html` conferidos com arquivos existentes.
- Build servido sob `/stacktrail/` por Python http.server, **sem fallback de SPA**. Navegação de aulas e exercícios e reload direto de `/stacktrail/#/aulas/html` funcionaram. Fonte de 150% sobreviveu ao reload e navegação. Não foi testado domínio real publicado.
- Desktop 1440 × 1000: mapa com 20 cards, marcadores e curvas, sem overflow; fonte 100% e 150%; listagem de aulas acessível.
- As 11 aulas foram abertas; os 25 pre tinham 25 botões de copiar. Um exemplo HTML copiado continha exatamente os 454 caracteres do código renderizado, preservando quebras/indentação. Teste automatizado também cobre spans de realce, sem controles/markup.
- Prompts 1, 5 e 9 conferidos no navegador; o de 5 foi copiado e continha contexto correto, pesos e exigência de evidências. Os nove prompts foram conferidos automaticamente.
- Modal: nativo `:modal`, Tab do último controle retorna ao primeiro; Escape fecha e devolve foco a “Avaliar com IA”. Corrigimos o retorno de foco observado na primeira revisão.
- Modal em 390 × 844 com texto 150%: sem overflow; largura 324 px.
- Estrada em 320 × 740 com texto 150%: corrigimos deslocamento residual dos cards alternados e mínimo intrínseco do título. Após reload: scrollWidth 305 / innerWidth 320, 20 cards, sem overflow.
- Diminuição a 90% (raiz 14,4 px) e restauração a 100% conferidas; aumento a 150% (raiz 24 px). Preferência de teste restaurada ao padrão.
- Console da amostra final sem erros/warnings. Viewport temporário restaurado.

## Limitações e decisões

O jsdom não implementa showModal/close: os primeiros novos testes falharam por essa ausência; um stub **apenas de teste** permite verificar interação/estado, enquanto a modalidade e teclado foram verificados no browser real. Não afirmamos auditoria completa WCAG ou leitor de tela.

Clipboard pode ser recusado pelo navegador; a interface avisa e mantém o texto selecionável. Não há correção automática de soluções. Alterações do prompt no modal não reescrevem o enunciado ou os dados do exercício e são descartadas ao fechar.

Nenhuma etapa futura ganhou aula ou estado de conclusão artificial. O mapa representa o currículo, não certifica senioridade. Dados antigos são preservados pela chave legada e migração; trocar de origem/porta ainda exige exportação/importação, pois localStorage não sincroniza.

Não houve publicação, mudança de permissões GitHub, push ou alteração no Notion. O domínio futuro do project site será definido pelo fluxo de GitHub Pages; para domínio personalizado, ajustar base antes do build.
