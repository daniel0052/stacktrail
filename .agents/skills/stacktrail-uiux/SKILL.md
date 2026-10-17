---
name: stacktrail-uiux
description: Criar, modificar e auditar componentes, páginas, layouts, simuladores e atividades interativas do StackTrail, incluindo cores, tipografia, espaçamento, responsividade e acessibilidade. Usar também para correções e revisões de UI/UX; não exige reformulação estética.
---

# StackTrail UI/UX

Aplique esta skill em toda criação, alteração ou revisão de interfaces do projeto. Preserve identidade, controle do estudante, funcionalidades e persistência definidos no AGENTS.md. Beleza não substitui leitura, navegação e atividade executável. Se houver conteúdo educacional, aplique também a stacktrail-educator existente; não crie uma cópia. Se alterar conceitos, exemplos ou semântica dos simuladores, aplique também stacktrail-factchecker para verificação técnica independente; a auditoria de usabilidade não certifica precisão técnica.

## Inspecionar e priorizar

Leia o AGENTS vigente, alterações locais e os componentes reais. Inventarie rotas, componentes compartilhados, variações de estado, temas e contextos (aula, exemplo, prática, laboratório, ampliação). Liste problemas com local, evidência, gravidade e fluxo prejudicado antes de redesenhar. Resolva primeiro impedimentos de leitura/operação, depois consistência. Não troque um editor visual por formulário longo nem um controle funcional por decoração.

Leia [references/verification.md](references/verification.md) para montar a matriz de verificação e o checklist. Consulte as fontes oficiais ali vinculadas para dúvidas normativas. WCAG 2.2 AA é referência mínima, não um selo automático.

## Contraste, hierarquia e estados

Use tokens semânticos de fundo, superfície, texto, texto secundário, borda de controle, foco, destaque, sucesso e erro, com pares para ambos os temas. Não confunda borda decorativa com informação necessária para identificar um controle. Texto comum precisa de 4,5:1, grande de 3:1; componentes e indicadores essenciais exigem contraste não textual adequado (em geral 3:1 contra cores adjacentes). Texto grande: 24 CSS px ou cerca de 18,67 px em negrito; não classifique só pelo nome h1.

Verifique cores efetivamente renderizadas e composição de alpha sobre os ancestrais; para gradientes/imagens examine as regiões relevantes ou registre verificação manual pendente. Não use apenas nomes de tokens/cores hex nominais como prova. Inclua normal, hover, foco, selecionado, erro, placeholder e desabilitado. Controles inativos têm exceções normativas, mas a diretriz de produto mantém seus rótulos legíveis; não apague texto por opacity global. Seleção, erro e execução devem ter sinal além de cor.

Mantenha foco visível e não encoberto, nomes acessíveis e ordem lógica. Tipografia usa rem e respeita ajuste de fonte: parágrafos e labels legíveis, entrelinha confortável, linhas de leitura manejáveis, títulos graduados, mensagens/legendas sem miniaturização excessiva. Separe código que precisa preservar estrutura do texto que deve quebrar linha. Não confunda densidade com clareza.

## Reflow e interação

Valide 320, 375, 768, 1024 e 1440 px, textos longos, fonte mínima/padrão/máxima e zoom de navegador 200%/400%. Registre o mecanismo real de zoom usado; viewport reduzido, CSS zoom, pinch zoom e deviceScaleFactor não são provas de browser zoom. Se a ferramenta não permitir zoom real, reporte a lacuna e use reflow equivalente apenas como teste complementar.

Corrija a causa do overflow: min-width de flex/grid, unidades fixas, nowrap, conteúdo intrínseco, portais e posicionamento. Não esconda overflow global para disfarçar quebra. Tabelas/código/diagramas que precisam de duas dimensões podem ter rolagem **local**, nome acessível, foco e contexto; documente a exceção de reflow sem estendê-la a botões, enunciado ou toolbar. Modais cabem na viewport, com conteúdo rolável e ações acessíveis; fechar por botão/Esc, foco inicial/retorno e ausência de escape indevido ao fundo.

Teste o fluxo inteiro: localizar ação → operar → compreender feedback → corrigir → repetir. Botões precisam de efeito real, erro precisa orientar recuperação, resultados não podem sugerir aprovação sem avaliação atual. Teclado e alternativa de ponteiro sem arraste devem permitir as ações de paleta/conexão/exclusão; teclado sozinho não substitui a alternativa de ponteiro exigida para arraste. No canvas preserve paleta, entradas, propriedades e execução também ampliado; não bloqueie celular em pé.

## Evidências e gate

Combine automação (Playwright/axe ou equivalentes existentes/justificados), inspeção visual e teclado. Varra todas as rotas publicadas, não só a etapa recém-alterada. Crie regressão de comportamento para defeitos funcionais e matriz de estados para defeitos visuais. Capturas ajudam a revisão, mas não comprovam sozinhas contraste, foco ou funcionamento. Não exclua regras/elementos de axe só para ficar verde; investigue falsos positivos e documente exceções específicas.

Registre cada achado em docs/QUALITY_AUDIT.md: problema, localização, gravidade, evidência, correção, comando/fluxo e estado **pendente**, **em correção**, **corrigido** ou **validado**. Corrigido não significa validado; somente execução/inspeção pertinente permite mudar o estado. Mantenha inventário da cobertura, incompletos, versões e artefatos. Não afirme conformidade WCAG completa por ausência de violações automáticas.

Para auditoria global ou mudanças importantes no editor, peça uma revisão independente por subagente quando disponível. Esta skill solicita explicitamente delegação limitada para identificar falhas/gaps de cobertura, sem publicar nem editar estado pessoal. Dê arquivos, requisitos e evidências brutas; não imponha um veredito. Trate achados demonstrados antes do gate.

Não considere uma interface/etapa pronta com erro crítico de acessibilidade, atividade essencial quebrada, conteúdo técnico grave ou validação crítica pendente. Nova etapa passa por análise curricular, conteúdo, implementação visual, auditoria pedagógica/técnica, auditoria UI/UX, correções, testes e documentação. A skill não autoriza commit, push, deploy, serviços pagos ou envio de dados de estudantes.
