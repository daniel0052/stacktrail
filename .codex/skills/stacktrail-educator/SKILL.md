---
name: stacktrail-educator
description: Criar, aprofundar e auditar aulas, exemplos, atividades e avaliações educacionais do StackTrail, com rastreabilidade curricular, fontes técnicas e revisão pedagógica independente. Usar em revisões de conteúdo; manutenção puramente visual ou de infraestrutura não exige esta skill.
---

# StackTrail Educator

Produza aprendizagem demonstrável em português brasileiro. Leia o AGENTS.md vigente e preserve escopo, IDs, progresso e interações. A presença de títulos, palavras-chave ou um simulador não comprova profundidade didática.

Aplique também a skill local stacktrail-factchecker para a verificação técnica
independente. Esta skill elabora e avalia a qualidade pedagógica; sua rubrica e
seus textos não são evidência da própria correção. Use o registro técnico em
docs/CONTENT_VERIFICATION.md para reconciliar fontes, contraexemplos e bloqueantes.
A revisão pedagógica continua necessária e não é substituída pelo factchecker.

## Antes de escrever ou revisar

1. Descubra o MCP do Notion e leia integralmente a etapa original relevante, inclusive paginação e filhos. Confira truncamento/blocos desconhecidos. Registre página, data e limites de acesso. Se o currículo estiver indisponível, não o reconstrua de memória: peça acesso ou exportação e continue apenas a análise independente de fonte que for possível. Não altere o Notion.
2. Relacione objetivo curricular → pré-requisito observável → aula/exemplo → atividade → evidência. Classifique cada tópico como coberto, superficial, ausente ou tecnicamente problemático, com trecho/local que sustenta o diagnóstico. Não amplie etapas não solicitadas.
3. Pesquise documentação oficial para as afirmações técnicas que serão escritas: especificações, manuais e documentação dos mantenedores. Use referências técnicas confiáveis adicionais quando preencherem uma lacuna concreta; confronte divergências e versões. Não use resultado de busca como se tivesse lido a página. Registre fonte, seção/URL, consulta e afirmação apoiada. Não copie longos trechos nem invente citações.
4. Em auditorias, apresente ao usuário as lacunas e prioridades **antes das correções**. Isso não exige aguardar aprovação para mudanças já autorizadas.

## Desenvolver uma unidade de aprendizagem

- Identifique o perfil de entrada: o que um estudante que acabou de cumprir os pré-requisitos consegue fazer sozinho. Para ferramentas externas cobradas, ensine um fluxo completo de entrada/configuração/execução/interpretação e alternativa operacional antes de exigir a entrega.
- Defina o que o estudante fará para demonstrar domínio. Verifique se os pré-requisitos já foram ensinados e indique a aula ou uma ponte explicativa; evite “conheça o assunto” sem critério observável.
- Construa do caso concreto ao modelo: problema → hipótese → mecanismo explicado → exemplo trabalhado → variação → decisão/limite. Explique por que cada comando, header, estado ou transformação está ali e como interpretar o resultado. Inclua pelo menos um contraste que exponha uma confusão plausível.
- Identifique autoria: **objetivos conforme o currículo**, **explicação/exemplo didático elaborado**, **ampliação técnica baseada em fonte**. Não atribua exemplos, exigências extras ou políticas locais ao Notion. Preserve essa distinção na aula e no registro de auditoria.
- Para simuladores de ferramentas, registre uma matriz comando/conceito real → comportamento do modelo → diferença comunicada → teste de transferência. Uma simplificação que inverte a semântica ensinada deve ser corrigida ou claramente apresentada como outra operação; um aviso genérico de “simulado” não basta.
- Escolha prática apropriada ao conceito. Reutilize ferramentas existentes quando o comportamento modelado sustentar a atividade. Diga o que o simulador simplifica e o que requer observação externa; não reimplemente a interface só para aprofundar texto.
- Faça o estudante prever, executar/observar, explicar e transferir para uma situação nova. Defina evidência e critérios de sucesso, dicas graduais sem solução antecipada e feedback diagnóstico após a tentativa. Evite perguntas respondidas por copiar uma definição ou repetir literalmente o exemplo.
- Exemplos devem conter entrada/configuração, procedimento, resultado **esperado** e justificativa. Só rotule como **observado/validado** depois de executar. Atividades externas devem ter passos reproduzíveis, ambiente autorizado, dados fictícios e alternativa quando o serviço estiver indisponível; registrar indisponibilidade não equivale a concluir a prática.
- Preserve decisões de autonomia, acessibilidade e segurança do AGENTS. Não envie respostas a serviços externos, execute código arbitrário ou publique por implicação desta skill.

## Revisão independente e decisão de prontidão

Leia [references/quality-gate.md](references/quality-gate.md) para aplicar a rubrica e o checklist. Use-a também na auditoria inicial, sem transformar notas em garantia de correção.

Para criação ou aprofundamento substancial, realize uma revisão por **subagente independente**, se disponível, após preparar o conteúdo e as fontes. Esta skill solicita explicitamente essa delegação limitada. Forneça currículo original, arquivos, fontes e rubrica; não forneça o veredito desejado nem suas notas. Peça achados com evidência, gravidade e critérios não atendidos; o revisor não deve editar arquivos nem publicar. Incorpore correções e peça conferência dos bloqueantes. Se não houver revisor disponível, registre “revisão independente pendente”; uma releitura pelo autor não deve ser apresentada como independente.

Uma aula só está pronta com todos os objetivos atendidos, todos os critérios da rubrica ≥3/4, checklist aplicável completo e nenhum bloqueante técnico/pedagógico ou ponto crítico não verificado. Falha crítica não se compensa por média. A decisão é local e documentada; não certifica correção universal nem aprendizagem de estudantes reais.

## Verificar e entregar

Execute exemplos locais pelo mecanismo permitido e regressões adequadas ao escopo. Para MDX, renderize as aulas alteradas: compilação não detecta toda expressão interpolada acidentalmente. Testes que conferem apenas títulos ou contagem de palavras não auditam ensino. Faça testes e navegador conforme o AGENTS; diferencie revisão textual, renderização, teste de comportamento e integração externa.

Registre em docs/ um relatório com matriz curricular, lacunas iniciais, alterações, fontes por assunto, rubrica fundamentada, revisão independente, comandos/resultados realmente executados, limitações e pendências. Não declare os antigos registros históricos como prova de validação atual. Informe claramente o que está pronto e o que ainda requer evidência.
