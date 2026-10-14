# Etapa 00 — plano, inventário e validação

## Fonte integral e escopo

Em 14/10/2026, o MCP Notion retornou integralmente a página [06 — Pensamento computacional e resolução de problemas](https://www.notion.so/3f53cadfab77814bbaf1de279833217b), com `<content>` fechado, sem paginação pendente nem páginas filhas omitidas. A leitura incluiu todos os detalhes expansíveis do método. A página foi somente consultada.

Inventário curricular: quatro pilares; reformulação do enunciado; entradas/saídas/restrições/exemplos; decomposição; pseudocódigo ou fluxograma; teste de mesa/casos-limite; implementação simples e correta; tempo/memória introdutórios; refatoração após validar. Método: entender, decompor/modelar, criar hipóteses/alternativas, validar com exemplos/testes, implementar/medir/comunicar. Referências: Entendendo Algoritmos (2ª edição) e VisuAlgo.

A página também descreve a prática transversal Júnior (condicionais/laços, coleções, strings, Map/Set, recursão/árvores, busca/ordenação), Pleno (diagnóstico, estruturas, consultas, concorrência, cache/transações/filas) e Sênior (restrições/métricas, falhas/capacidade, arquitetura, causa raiz, comunicação). Esses tópicos futuros são contextualizados, não transformados em novas etapas nesta entrega. Meta: 2–3 problemas semanais com explicação; proposta de Problem Solving Lab e modelo de anotações preservados.

## Expansão pedagógica autorizada

O pedido do usuário define nove aulas em sequência e nove desafios inéditos. Não são enunciados literais da página. As aulas cobrem introdução, decomposição, padrões, abstração, algoritmos/pseudocódigo, fluxogramas, testes de mesa, estruturas/custo e método completo. Desafios: rotina, números, compra, estoque, sequência, agendamento, busca, rotas e integrador.

Decisão de conclusão: os seis desafios básicos/intermediários e as nove competências com evidência textual declarada. Leitura não basta; três avançados opcionais. O currículo não define pesos nem limiar de nota para a Etapa 00: rubrica percentual é orientação didática explicitamente identificada, sem avaliador nem nota automática. Texto de evidência não é prova validada pela plataforma. Uma competência pede implementação simples e testes externos.

## Plano e arquitetura

- Conteúdo versionado em `src/content/stage-00`, separado da interface.
- Seleção por etapa em `content/stages.ts`; componentes existentes recebem etapa, com padrão 01.
- Rotas 00: `/etapas/00`, `/etapas/00/aulas/:slug`, `/etapas/00/laboratorio/:slug`, `/etapas/00/autoavaliacao`. Rotas 01 preservadas.
- Reutilização de leitura MDX, CodeBlock, laboratório, modal de revisão, clipboard, controles de fonte/tema, autoavaliação e exportação/importação.
- SVG declarativo com título, descrição e alternativa textual para dois fluxogramas; sem biblioteca adicional.
- Caderno armazena entradas, saídas, restrições, decomposição, padrões, abstrações, casos/testes e custo; tabela manual com até 100 linhas.
- Progresso v3: IDs de aulas 00 prefixados; exercícios 00-ex-XX; competências/evidências próprias. Migra v1/v2 sem perder registros da etapa 01 e mantém a chave local existente.
- Nenhuma execução de pseudocódigo, backend, integração com IA, envio automático ou link público ao Notion.

## Complementos técnicos

Documentação consultada em 14/10/2026: MDN Array, Array.sort, Number.isSafeInteger, Map, Loops and iteration; TypeScript Everyday Types; página da editora e VisuAlgo. Exemplos e diagramas próprios. Não houve leitura integral do livro nem reprodução de capítulos. A referência ao livro não implica validação de todo seu conteúdo.

## Validação

Resultados técnicos e de navegador são registrados após a execução. Os testes da plataforma verificam persistência e interação; não avaliam soluções dos estudantes.

### Resultados efetivamente obtidos

- `npm run typecheck`: passou.
- `npm run lint`: passou.
- `npm run test`: 52 testes passaram em cinco arquivos; 16 novos testes cobrem inventário 00, migração v2, isolamento, conclusão, caderno, nove laboratórios parametrizados, 27 dicas, recuperação após remontagem, checklist, prompts, cópia e evidências.
- `npm run build`: passou; 20 aulas MDX compiladas como chunks sob demanda, sem nova dependência.
- Exemplo TypeScript autoral da aula Método compilado e executado em Node fora da aplicação: sete cenários passaram (exemplo, miniatividade, vazio, zero/decimal/negativo e capacidade inválida). Isso não executa código do estudante.
- Conteúdo da Etapa 01 conferido por hash com inventário anterior: MDX, exercícios e sequência inalterados. Apenas o contrato de tipos foi ampliado para a Etapa 00.
- Nove MDX 00 auditados por estrutura: objetivos, pré-requisitos, explicação, exemplos, erros, miniatividade, resumo/revisão e referências presentes.
- Treze URLs complementares únicas da Etapa 00 responderam HTTP 200. Links públicos ao Notion ausentes em fonte e build.
- Build em servidor estático local sem fallback de SPA: `/stacktrail/` responde 200; assets e `.nojekyll` presentes.
- Navegador: 25 rotas únicas do índice 00 e páginas principais abriram com título válido; nenhuma tinha link ao Notion. Percurso sequencial pelas nove aulas confirmou conteúdo próprio de cada aula e botão final para o laboratório com nove cards.
- Agendamento no navegador: solução, modelagem, linha de teste de mesa e dica recuperados após reload. Cópia de solução/caderno e prompt para clipboard confirmada. Prompt continha dados da tentativa e regras.
- Modal: abertura, cópia, Escape, Shift+Tab e devolução de foco ao botão verificados. Foco visível observado no campo de reflexão.
- Layout: desktop e 390×844; dashboard, laboratório, modal e fluxogramas sem transbordamento horizontal da página. Tabela e diagramas têm rolagem local. Fonte 150% no mobile manteve a largura da página dentro de 390 px. Índice mobile abre e revela aulas. Tema claro e escuro conferidos nos SVGs; viewport e fonte restaurados após o teste.
- Diagramas de decisão e repetição inspecionados visualmente; título/descrição, legendas e sequência textual presentes. Respeito a reduced-motion já existente; novos diagramas estáticos.

Capturas reais: [desktop](screenshots/etapa-00-desktop.jpg), [mobile](screenshots/etapa-00-mobile.jpg), [fluxograma](screenshots/etapa-00-fluxograma.jpg).

### Limites remanescentes

A conclusão e evidências são autodeclaradas, sem correção automática. Testes de mesa são anotações manuais. Não há interpretador, backend, autenticação, sincronização ou chamadas a modelos de IA. Implementação externa das soluções cabe ao estudante. Não foi realizada auditoria completa WCAG/leitor de tela nem publicação real no GitHub Pages. Livro não foi reproduzido. Nenhuma etapa 02–19 foi implementada.
