# Verificação prática de UI/UX

## Matriz mínima

No piloto2.0, derive rotas reais do roadmap, tópicos/referências/livros, exercícios, projeto e progresso. Cubra filtros, dicas, ambos os prompts, cópia/exportação/importação e migração; prove ausência de aulas/respostas no novo build. A lista histórica abaixo se aplica somente ao modo legado.

Inventarie homepage/roadmap/shell/progresso; 19 aulas e laboratórios da Etapa 00; 11 aulas e nove exercícios da 01; 12 aulas e nove exercícios da 02. Confirme as contagens no código antes de reproduzi-las. Para futuras etapas, derive o inventário das rotas reais. Inclua exemplos resolvidos e práticas separadamente, estados vazios/erro/sucesso, sidebar aberta/recolhida, editor normal/ampliado, ajuda e revisão por IA.

| Eixo | Verificação |
| --- | --- |
| Temas/estados | Claro/escuro × normal/hover/foco/selecionado/erro/desabilitado; texto e controles. |
| Largura | 320/375/768/1024/1440 px; documento sem overflow indevido, ações sem corte/sobreposição. |
| Ampliação | Fonte do app até 150%; browser zoom real 200% e 400%; registrar viewport CSS resultante e exceção específica para canvas/tabela/código. |
| Teclado | Tab/Shift+Tab, Enter/Espaço, setas quando aplicável, Escape; foco visível, ordem, operação e retorno após modal. |
| Ponteiro | Sem arraste: adicionar, selecionar, conectar, mover quando necessário e remover; zoom/pan alternativos. |
| Feedback | Erro de entrada, execução/passo/pausa/reinício, resultado invalidado ao editar, persistência/reabertura, ação de cópia/importação. |
| Leitura | Parágrafos, listas, tabelas, longos labels/nomes/URLs, placeholders, código e valores no SVG em ambos os temas. |
| Movimento | prefers-reduced-motion; destaque compreensível sem depender de animação. |

## Automação e limites

- Playwright pode percorrer inventário e combinar axe com screenshots, erros de página, dimensões DOM, foco e ações. Axe não verifica toda usabilidade, todas as combinações de estado nem todos os contrastes sobre gradientes/SVG. Analise `incomplete` em vez de ignorá-lo.
- Meça overflow no documento e no componente; conteúdo fora da tela dentro de um scroll local intencional não é, por si só, falha de reflow. Não exclua globalmente SVG, tabelas ou toda a aula da auditoria.
- Para contraste, calcule luminância relativa sRGB e razão sem arredondar o limiar. Use cor computada e fundo composto, incluindo opacity herdada; gradiente/imagem requer inspeção adicional. Placeholder/pseudo-elementos precisam de amostra própria. Nomeie cada exceção.
- Use contexto de navegador novo e dados fictícios. Não apague localStorage de perfil pessoal. Testes não acessam credenciais, não executam código livre do estudante e não chamam serviços externos sem autorização.
- Mantenha relatório por URL/tema/viewport/estado e captura quando útil. Flake/timeout não se resolve reduzindo cobertura ou marcando teste como ignorado sem causa documentada.

## Checklist do gate

- [ ] Inventário real e criticidade documentados; nenhuma rota essencial foi omitida silenciosamente.
- [ ] Texto/indicadores/controles com contraste e hierarquia verificáveis nos dois temas; estados de interação cobertos.
- [ ] Larguras obrigatórias, fonte ampliada e zoom 200/400 com mecanismo descrito; exceções locais justificadas.
- [ ] Navegação e atividade essencial executáveis por teclado e ponteiro; foco visível e erros recuperáveis.
- [ ] Modais/painéis fecham, contêm foco quando modal e devolvem ao acionador.
- [ ] Editor normal/ampliado funciona com valores diferentes, passos, exclusão/recuperação; recursos existentes preservados.
- [ ] Automação e inspeção manual registradas; violações reais corrigidas, incompletos analisados, limites explícitos.
- [ ] Skills educacional/UI aplicadas às novas etapas; conteúdo grave também impede conclusão.
- [ ] AGENTS/checklist e QUALITY_AUDIT atualizados; nenhum crítico pendente ou apenas “corrigido” sem validar.

Checklist não é autorização de publicação nem certificado WCAG. Registre “não se aplica” com motivo e mantenha como pendente aquilo que não foi testado.

## Fontes oficiais

Consulte a versão atual ao precisar resolver ambiguidade. Referências usadas na criação da skill em 15/10/2026:

- [WCAG 2.2 — contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- [Contraste não textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- [Reflow e exceções](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).
- [Redimensionamento do texto](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html).
- [Foco visível](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).
- [Alternativa ao arraste](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html).
- [Playwright — teste de acessibilidade com axe](https://playwright.dev/docs/accessibility-testing).
