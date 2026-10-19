# Etapa 09 — revisão UI/UX independente

Data: 19/10/2026. Revisão somente leitura da implementação; escrita restrita a este relatório. Skill aplicada: `.agents/skills/stacktrail-uiux/SKILL.md` e `references/verification.md`. Preview estático `http://127.0.0.1:4193/stacktrail/`; Chromium headless/Playwright instalado no projeto, contexto novo com registros fictícios, sem envio a IA ou acesso ao armazenamento pessoal. A implementação principal pode receber correções depois desta revisão: os resultados abaixo descrevem o build observado.

## Achados apresentados antes de correções

1. **Médio — progresso não explica as unidades da prova.** `src/practice/ProgressPage.tsx` exibe link genérico para a prova, mas o resumo da Etapa 09 não apresenta estado da tentativa mais recente, avaliação/bloqueadores ou as unidades da prova que compõem seu percentual. O estudante precisa abrir a prova para descobrir o que falta; o requisito solicita identificação clara e retomada em Meu progresso. Reportado ao implementador antes de alterações. Estado: **corrigido por inspeção do código** após o reporte; revalidação renderizada pendente no build seguinte.
2. **Baixo — redação sobre mudança de modo.** `FinalExamPage.tsx` informa “Para mudar, registre a assistência”, embora o modo da tentativa permaneça imutável. O registro informativo de assistência é válido, mas a frase pode sugerir troca efetiva entre simulação e prática assistida. Recomenda-se explicar que o modo original permanece registrado. Estado: **corrigido por inspeção do código** (modo original preservado e interpretação com assistência explicitada); revalidação renderizada pendente.
3. **Baixo — orientação de conclusão pouco específica.** O botão desabilitado de conclusão tem instrução geral, mas não identifica quais fases/campos/checks ainda faltam; os campos de fases ficam em disclosures. Um resumo de pendências permitiria localizar o requisito faltante. Não bloqueou a operação observada. Estado: **corrigido por inspeção do código**: resumo de fases/artefato/conferências/IA incluído; revalidação renderizada pendente.

Nenhum impedimento crítico foi demonstrado nos fluxos executados.

## Evidências executadas

- Rotas `/etapas/09`, `/etapas/09/prova-final` e `/progresso` nas larguras **320, 375, 768, 1024 e 1440 px**: 15 combinações; `documentElement.scrollWidth === innerWidth` em todas. Prova com disclosures e prompt expandidos a 320 px também sem overflow do documento.
- Inspeção visual das capturas da prova em desktop1440/tema escuro e mobile375/tema claro: hierarquia, cartões de trilha, ações e rodapé legíveis; navegação quebra linhas sem cortes. Capturas temporárias em `/tmp/ui09-audit/exam-1440.png` e `/tmp/ui09-audit/exam-light-375.png`.
- Iniciar prova → preencher evidência fictícia → parar → recarregar → continuar: texto e estado interrompido preservados.
- Preparar base abre **textarea editável**; não foi detectado seletor de dificuldade na prova (`getByLabel(/dificuldade/i).count() === 0`). Nenhum prompt foi enviado nem executado.
- Preencher cinco fases, declaração de assistência e sete conferências → concluir: seção de avaliação declarada aparece. Registrar avaliação vazia produz mensagem de recuperação, sem aprovação.
- Refazer mantém `09-php-1 — Concluída` e cria `09-php-2 — Em andamento`; trocar para Express apresenta início independente.
- Axe na prova inicial em **ambos os temas** e na prova concluída: **zero violações e zero incompletos** nesses estados. Isso inclui as verificações automáticas de contraste aplicáveis nesses estados, sem exclusão de regras.
- Tab após interação do cabeçalho moveu foco para o seletor de fonte; estilo computado de foco **outline sólido3px**, cor `rgb(49,91,23)` no tema claro.

Scripts temporários usados: `/tmp/ui09-audit/run.mjs`, `axe.mjs` e `flow.mjs`; executados com Node e Chromium isolado. A primeira tentativa de `flow.mjs` usava um seletor de título de fase incorreto e não concluiu o cenário; a reexecução com os títulos reais `1 —` a `5 —` produziu os resultados acima.

## Cobertura e limites

Esta revisão independente concentra a migração09; não reexecutou todas as rotas00–08, fonte150%, zoom real200/400%, todos os estados de hover/erro, leitura por tecnologia assistiva, nem uma avaliação completa com notas/bloqueadores preenchidos. Também não verificou todo o contraste não textual manualmente. Cobertura global, zoom e testes completos ficam sob a validação principal. Não é certificação WCAG2.2AA, validação dos projetos externos nem evidência de execução de código estudantil. Histórico completo usa JSON em disclosure: funcional para consulta, mas passível de apresentação mais amigável posteriormente.

### Revalidação posterior pelo implementador

As correções reportadas foram reconferidas no build final, por contextoPlaywright isolado: resumo de prova interrompida emMeu progresso, pendências e modo original explícito; fonte150% nas cinco larguras e retomada com teclado passaram. Evidência em `ux-corrections-final.log`. Esta anotação é do implementador e não amplia retroativamente o escopo independente acima.
