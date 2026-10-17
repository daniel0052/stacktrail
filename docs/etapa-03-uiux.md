> Registro da implementação inicial da Etapa 03. A reorganização em duas trilhas,
> sem banco obrigatório e com progresso v7, está em [etapa-03-trilhas.md](etapa-03-trilhas.md).
> Resultados históricos abaixo não aprovam automaticamente as alterações posteriores.

# Etapa 03 — revisão independente de UI/UX

Data:16–17/10/2026. Estado atual: **verificação local concluída no escopo descrito na confirmação final abaixo**. As seções iniciais preservam planejamento e lacunas antes das correções.

Aplicada a skill `.agents/skills/stacktrail-uiux/SKILL.md` e sua matriz de verificação. Foram lidos o pedido integral da Etapa 03, as instruções AGENTS vigentes e os componentes reais abaixo. Este documento não aprova a implementação futura nem certifica WCAG. Não houve consulta externa normativa nesta passagem; os critérios vêm da skill carregada. A precisão do conteúdo pertence à revisão técnica independente, não a esta inspeção de interface.

## Riscos identificados antes da implementação

As localizações referem-se à arquitetura existente no início da Etapa 03. São pontos de integração a tratar, não defeitos retroativos das etapas anteriores.

| ID | Gravidade | Localização e evidência estática | Risco e ação necessária | Estado |
| --- | --- | --- | --- | --- |
| UI03-01 | Alta | `src/content/stages.ts`, `src/app/App.tsx`, `src/components/lab/LabStageSelector.tsx`: união, detecção de etapa, rotas e seletor enumeram apenas 00–02. | Publicar somente o cartão 03 produziria navegação incorreta ou ausência de rota. Incluir dashboard, índice, aula, laboratório, exercício e autoavaliação; conferir menu, breadcrumbs, retorno e acesso direto por hash. | Pendente |
| UI03-02 | Alta | `src/features/progress/model.ts`: `stageSummary` possui regras específicas 00/02 e fallback 01 com três iniciais e um intermediário. | Essa fórmula não expressa a trilha PHP/Laravel com exercícios opcionais distribuídos por níveis. Calcular conclusão 03 por exercícios obrigatórios e evidências reais declaradas, sem exigir Node/Express/Nest/portabilidade. Regressão deve concluir a base deixando todos os opcionais intocados. | Pendente |
| UI03-03 | Alta | `parseProgress`, `validPath`, `ProgressProvider` e `progress/roadmap.ts`: IDs/rotas e autoavaliações enumerados, esquema v5. | Uma expansão incompatível pode impedir carregar progresso ou perder rascunhos. Importar fixtures v1–v5 preservando IDs antigos, soluções, dicas, tema e fonte; testar exportação/reimportação com dados 03. Erro de importação deve preservar sessão e arquivo anterior. | Pendente |
| UI03-04 | Alta | `src/components/lab/Lab.tsx`: solução textual usa textarea; só 02 exige texto antes de concluir; avisos e descrição são ternários por etapa. | Reuso sem adaptação omite editor com realce, restaurar/cópia/verificação e pode concluir 03 sem evidência. Distinguir edição, inspeção estrutural e execução local externa; botão verificar deve comunicar precisamente o que foi verificado. Não marcar código executado a partir de texto salvo. | Pendente |
| UI03-05 | Média | `src/components/learning/CodeBlock.tsx`: realce MDX é apresentação de exemplos estáticos; código copiado é extraído dos filhos. | Realce estático não fornece editor. Se usar textarea e prévia, manter um único campo editável acessível e impedir anúncio duplicado da prévia; não sincronizar rolagem sacrificando seleção, teclado ou fonte 150%. | Pendente |
| UI03-06 | Alta | Pedido: projetos completos com testes reproduzíveis; lab atual preserva uma string de solução. | Arquivos múltiplos, comandos e evidências precisam contexto claro. Identificar arquivo ativo, linguagem, instrução local, esperado/observado e limitações. Trocar arquivo/exercício/etapa e restaurar não pode apagar outro rascunho. A restauração deve ser intencional, com recuperação ou aviso explícito do alcance. | Pendente |
| UI03-07 | Média | `reviewPrompt.ts`: papel específico só 00/02, restante assume desenvolvimento web; `ReviewDialog.tsx` contém descrição genérica. | Prompt 03 precisa incluir requisitos e versões, arquivos/evidências relevantes, opcionais e ausência de execução automática. Permanecer editável/copiável, sem envio externo. Preservar Esc, contenção e retorno do foco do dialog existente. | Pendente |
| UI03-08 | Alta | Visualizador de ciclo de requisição ainda não existia na inspeção. | Etapas, avanço/retorno/reinício e falhas devem ter representação textual acessível; não depender de cor/animação/SVG ou arraste. Feedback deve se referir ao modelo conceitual, não a uma requisição real inexistente. | Pendente |
| UI03-09 | Média | `LessonPage.tsx`, `App.tsx` já exibem `optional`; `LabIndex` pressupõe que todos os avançados são opcionais. | A regra real 03 é por exercício, não por nível. Revisar textos, porcentagem, CTA final e badges. Projeto principal/revisão arquitetural obrigatórios não podem aparecer como aprofundamento dispensável apenas pelo nível. | Pendente |

## Componentes reutilizáveis e condições

- Shell, menu recolhível, tema/fonte e HashRouter: preservar comportamento existente e base `/stacktrail/`.
- `LessonPage`, `LessonTable`, `CodeBlock`: boa base para conteúdo, copiar exemplos e rolagem local focável; conferir novas linguagens e nomes de arquivo longos.
- `LabStageSelector`, dicas graduais, reflexão, critérios e `ReviewDialog`: reutilizar com inventário e textos 03. Autoavaliação registra declaração, não validação técnica automática.
- `ProgressProvider`: preservar a chave `backend-academy:progress` e recuperação em falha de armazenamento; não reutilizar namespace de prática 00 para rascunhos 03.
- Tokens semânticos existentes: usar ambos os temas; medir estados novos, especialmente realce PHP/JSON/TypeScript, editor, seleção de arquivo e ações desabilitadas.

## Matriz planejada — ainda não executada

- [ ] Inventário real das rotas 03, aulas obrigatórias/opcionais e nove exercícios conciliado com o conteúdo implementado.
- [ ] Todas as novas rotas carregam por URL direta, links e troca de etapa; navegação antiga 00–02 preservada.
- [ ] Larguras 320/375/768/1024/1440 px, temas claro/escuro, fonte 90/100/150%, textos e nomes de arquivo longos.
- [ ] Zoom real de navegador 200% e 400%, com mecanismo e viewport CSS registrados; código rolável local não deve causar overflow do documento.
- [ ] Editor: editar, selecionar/copiar, trocar arquivo, restaurar, verificar escopo declarado, corrigir, repetir e recarregar com rascunho preservado.
- [ ] Projetos: obter arquivos completos, compreender requisitos/versões/comandos, registrar resultado observado e evidências; nenhum aviso de aprovação automática indevido.
- [ ] Ciclo de requisição: caminho de sucesso e erro, passos anterior/próximo, reinício e estado textual compreensível; teclado e movimento reduzido.
- [ ] Trilha principal concluída sem realizar nenhum exercício opcional; opcional alterado não muda o denominador obrigatório nem bloqueia avanço futuro.
- [ ] Importação/exportação legada e atual, persistência isolada por exercício/arquivo, falta de localStorage e importação inválida sem perda.
- [ ] Dicas graduais, checklist, reflexão, prompt editável/cópia e dialog: Esc, foco inicial/contido/retornado e erro de clipboard recuperável.
- [ ] Contraste computado dos estados normal/hover/foco/erro/seleção/desabilitado, nomes acessíveis e feedback perceptível além de cor.
- [ ] Playwright/axe, inspeção de incompletos, capturas e teclado registrados no relatório global; testes unitários e build não substituem esta passagem.

## Gate inicial — registro histórico

**Não aprovado: implementação e verificações pertinentes ainda pendentes.** Não foram executados testes de navegador ou comandos de build nesta revisão de planejamento. Após a implementação, atualizar cada risco com evidência concreta, estado corrigido/validado e limitações; transferir achados reais para `docs/QUALITY_AUDIT.md`, sem interpretar itens planejados como testes passados.

## Segunda passagem — implementação intermediária

Inspeção estática de `CodeLab.tsx`, `RequestCycle.tsx`, `StageThree.tsx`, modelo de progresso e prompt de revisão. Navegação 03 e esquema v6 já aparecem no código; o importador mantém aceitação v1–v5 e a conclusão 03 usa a seleção obrigatória. Isso demonstra integração escrita, não valida sua execução. Trilhas opcionais ainda estavam em produção nesta passagem e não foram aprovadas.

Lacunas comunicadas antes de correção:

- **UI03-10 — média, pendente:** cancelar/confirmar restauração remove o botão focado da confirmação inline sem devolver foco ao acionador. Local: `CodeLab.tsx`, ramo `restore`. Necessário testar e recuperar foco no botão Restaurar.
- **UI03-11 — média, pendente:** o inventário compartilhado em `e2e/helpers.ts` enumera 00–02. Uma varredura global baseada nele não inclui 03. Incluir o inventário real para evitar falsa conclusão de cobertura.
- **UI03-12 — baixa, pendente:** falha de carregamento dos arquivos fornece recarga e ZIP, mas não ação de tentar novamente no componente. Recuperação é possível por recarga; registrar e testar indisponibilidade sem simular sucesso.

Um teste independente temporário foi preparado para dez combinações de largura/tema (320, 375, 768, 1024 e 1440; claro/escuro), quatro rotas por combinação e fonte 150%. Inclui axe/reflow, ciclo anterior/próximo/reinício, Tab saindo do editor e fechamento/retorno do foco do dialog de IA. A primeira tentativa falhou antes de iniciar por erro do webServer; não representa resultado do produto. Repetição com permissão de execução local solicitada; resultados ainda pendentes. Não converter preparação do teste em validação.

## Revisão independente final — 17/10/2026

Inspeção direta de `CodeLab`, `RequestCycle`, `Lab`, modelo de progresso, CSS e inventário E2E. A matriz `e2e/stage-three-ui.spec.ts`, executada pelo agente principal, passou em dez combinações de tema/largura, cada uma percorrendo quatro rotas (40 verificações de rota), fonte 150%. Ela verifica axe/reflow, passos/reinício, Tab saindo do editor, cancelamento da restauração e retorno do foco, dialog por Esc e retorno ao acionador. Trata-se de resultado comunicado pelo executor, distinto da inspeção de navegador própria abaixo.

### Lacunas demonstradas antes da correção

- **UI03-13 — média:** no ciclo, input de caminho com largura intrínseca excedia a largura a 320 px. O executor identificou e corrigiu `min-width`/largura dos controles; matriz posterior 10/10 passou.
- **UI03-14 — média:** na varredura do build, os exercícios Laravel com nome de arquivo extenso excediam 375 px com fonte 150%. Diagnóstico independente confirmou `label` de `Código de app/Http/Controllers/BookController.php` com `clientWidth=281`, `scrollWidth=404` e overflow visível; propagava largura de documento de 451 px. O teste anterior que examinava apenas retângulos não detectava o texto inline excedente (`overflow=[]`), mas a asserção de largura do documento capturou o defeito. Injeção temporária de `.backend-code-lab label { overflow-wrap: anywhere; }` reduziu o documento para exatamente 375 px. Correção de produto e reconfirmação do build devem ser registradas pelo executor; a injeção diagnóstica não equivale a correção persistida.

### Inspeção visual própria

Chromium isolado contra o preview local `http://127.0.0.1:4178/stacktrail/`, sem acesso a perfil pessoal e sem iniciar/encerrar servidores compartilhados. Primeira tentativa não abriu navegador por restrição de sandbox; segunda abriu Chromium, mas preview estava parado. Após o executor reabrir o preview, a terceira executou com sucesso.

- Dashboard escuro a 1440×1000, fonte 150%: hierarquia, texto, navegação e hero legíveis, ações separadas, sem sobreposição visível na captura `/tmp/stage03-review-wide.png`.
- Projeto principal Laravel escuro a 375×1000, fonte 150%: diagnóstico e captura do editor; após a regra temporária, nome completo quebra linha e textarea preserva rolagem local de código. Capturas `/tmp/stage03-review-narrow.png` (antes) e `/tmp/stage03-review-narrow-fixed.png` (diagnóstico corrigido). Prévia de código e textarea são campos de leitura/edição distintos, identificados explicitamente; Tab não é interceptado.
- As capturas não comprovam contraste integral ou fluxo completo. A largura 320 e tema claro pertencem à matriz automatizada citada acima, não a esta inspeção visual própria.

### Reconciliação dos riscos anteriores

| IDs | Estado/evidência atual |
| --- | --- |
| UI03-01 / UI03-09 | Implementação integrada: inventário inclui 23 aulas e nove exercícios; base/opcional é por item; projeto e revisão avançados permanecem base. A varredura completa do build continua a cargo do executor. |
| UI03-02 / UI03-03 | Código deriva conclusão dos cinco exercícios base, seis evidências e preserva migrações v1–v5 para v6. Opcionais não entram no denominador. Testes de progresso são evidência funcional do executor; esta revisão não simula aprendizagem real. |
| UI03-04 / UI03-06 | Editor distingue registro bem formado de execução local; ZIP preserva arquivos/configuração/testes. Restauração exige confirmação; alterações invalidam conclusão anterior. Falhas de carregamento têm retry explícito e link de referência. |
| UI03-05 | Um textarea editável, prévia de leitura rotulada e alternável; código tem rolagem local. Nome de arquivo longo revelou UI03-14, que exige reconfirmação persistida. |
| UI03-07 / UI03-10 | Foco da restauração devolvido ao acionador; modal mantém Esc/retorno. Matriz executada passou nesses comportamentos. Prompt permanece editável/copiável, sem envio automático. |
| UI03-08 | Ciclo tem status textual, indicação de passo, navegação direta/anterior/próximo/reinício e inputs que reiniciam índice. Explica que é conceitual, sem HTTP real. |
| UI03-11 | Inventário compartilhado inclui 00–03, derivando aulas/exercícios de `stageContent`. |
| UI03-12 | Retry de fetch implementado; validação de falha/recuperação em navegador ainda precisa resultado específico do executor. |

`commonErrors` é condicional por exercício, sem introduzir seção vazia nos legados. A conclusão 03 exige arquivos não vazios, reflexão e checklist, tanto na interface como no modelo/importação. Permanece autoavaliação declarada: esse gate não transforma texto salvo em execução ou correção técnica certificada.

### Gate e limites restantes nesta passagem

Nenhum impedimento crítico adicional foi demonstrado na inspeção final. **O gate final ainda depende da reconfirmação de UI03-14 no build, resultados finais do laboratório/recuperação, zoom real 200%/400% e conciliação dos incompletos axe pelo executor.** Não marcar todos os checkboxes planejados automaticamente: fonte 90%, todos os estados hover/foco/seleção, leitor de tela, dispositivos reais, clipboard indisponível e certificação WCAG completa não foram comprovados por esta passagem. Os relatórios finais devem preservar essas distinções e registrar pendências sem inventar execução.

## Confirmação final integrada —17/10/2026

O executor aplicou a correção persistida do label e concluiu as verificações:

- [x] Inventário completo de139 rotas publicadas das quatro etapas percorrido em
  1440px/nos dois temas:277/278 passaram; uma falha de contexto do axe em
  `/etapas/00/aulas/estruturas` foi reconferida isoladamente e passou nos dois
  temas. A origem da falha de contexto não foi estabelecida; não se declara uma
  rodada única278/278 nem se omite o incidente. Não houve erro funcional demonstrado.
- [x] Build estático81/81: todas as36 rotas03, nos dois temas/375px/fonte 150%,
  três rotas legadas, pacotes/locks/base/favicon, ciclo e recuperação503→retry.
  UI03-14 ficou **validado**: documento contido após quebra do nome de arquivo.
- [x] Matriz de dez combinações/40 verificações:320/375/768/1024/1440px,
  dois temas/fonte 150%, dashboard/competências/ciclo/labPHP. UI03-13 validado.
- [x] Cinco jornadas: rascunhos dos nove exercícios isolados, conclusão dos cinco
  base sem opcionais, invalidação ao editar, recarga, ZIP/restauração/cancelamento,
  retorno de foco e prompt editável/Esc/troca de etapa. UI03-10 validado.
- [x] Zoom real200/400% via extensão chrome.tabs.setZoom, com viewportCSS/DPR
  conferidos, nos dois temas/ciclo/labLaravel/autoavaliação. Código tem rolagem
  local nomeada; campos/enunciado/controles não usam overflow global oculto.
- [x] Contraste/fonte 90%: dois testes passaram;40 amostras computadas de controles,
  normal/hover/foco/seleção/realce e tokensMDX. Menor razão textual observada
  4,882:1 e menor razão de foco7,956:1. Estado desabilitado também conferido.
  Isso descreve as amostras, não todos os estados de cada componente existente.
- [x] Retry de pacote: falha503 acessível e repetição recupera o editor, sem declarar
  código executado. UI03-12 validado. Exportar/restaurar não certifica a solução.
- [x] Inspeção independente ampla/estreita e automação/teclado registradas. Os
  nove arquivos/soluções são texto; nenhuma execução arbitrária foi introduzida.
- [x] Typecheck/lint/build e366 testes em37 arquivos passaram. Nova documentação,
  checkboxes e relatórios refletem os resultados, incluindo reexecuções.

Axe da suíte estática gerou78 auditorias sem violações detectadas e78 registros
incompletos de color-contrast. Categorias inspecionadas: símbolos não textuais,
tokens de código cortados pelo scroll local, elementos encobertos/fora da área
visível e pseudo-conteúdo decorativo. Os tokens foram medidos separadamente; os
símbolos mantêm nomes acessíveis nos controles. Incompletos não foram suprimidos
nem transformados em certificação. A varredura global mantém seus próprios
incompletos nos artefatos reproduzíveis do comando, sem alegar inspeção manual de
cada combinação de todos os componentes legados.

**Gate local da Etapa 03 atendido:** nenhum bloqueante crítico conhecido permanece
apenas corrigido sem reconfirmação; as lacunas reais demonstradas foram tratadas.
A ampliação do editor visual00 não se aplica a estes componentes novos e não foi
reimplementada. Permanecem não executados: leitor de tela/dispositivos reais,
inspeção manual exaustiva de todos os estados legados, clipboard indisponível,
domínio publicado e certificação WCAG. Limites de instalação/produção/aprendizagem
estão nos pareceres técnicos; não constituem evidência de execução do estudante.
