---
name: stacktrail-factchecker
description: Verificar independentemente a precisão técnica de aulas, exemplos, exercícios e simuladores do StackTrail, confrontando afirmações com fontes primárias e execução rastreável. Usar na criação e revisão de conteúdo educacional; build e links não constituem aprovação técnica.
---

# StackTrail Factchecker

Audite afirmações, não a confiança do autor. Leia AGENTS.md e o material real,
inclusive atividades, exemplos e modelos relacionados. Preserve IDs, progresso,
interface, autorização e escopo. Não avance para etapas futuras durante auditoria
das publicadas.

## Responsabilidades separadas

- stacktrail-educator: currículo, elaboração, progressão e qualidade pedagógica.
- stacktrail-factchecker: evidências e contraexemplos técnicos independentes.
- stacktrail-uiux: acessibilidade, usabilidade e interação.

Use o Notion para conferir objetivos e autoria curricular quando revisar conteúdo;
não trate currículo nem relatórios anteriores como autoridade técnica. Consulte
fontes diretamente. Texto produzido pela educator, consenso entre agentes, links,
notas de rubrica, testes que repetem a implementação e build verde não provam
correção. Reconcilie conclusões antigas com evidência atual, preservando o histórico.

## Processo de verificação

1. Inventarie aulas e identifique afirmações importantes, resultados de exemplos,
   pré-condições, versões e limites. Separe regra normativa, convenção local,
   simplificação didática e alegação de execução. Justifique a seleção de afirmações
   importantes e registre tópicos/trechos não cobertos; amostragem não pode parecer
   auditoria exaustiva. Código do modelo é fonte primária do comportamento local,
   mas não prova sua equivalência à norma ou ferramenta que representa. Leia
   [references/evidence-gate.md](references/evidence-gate.md) antes de registrar.
2. Procure ativamente contradições, casos-limite, exceções e desatualização.
   Abra e leia as seções pertinentes de fontes primárias: RFC Editor, WHATWG,
   W3C, ECMA, MDN, documentação oficial TypeScript/Node/PHP/Git/frameworks ou
   pesquisa acadêmica original conforme o assunto. Fonte citada mas não lida
   permanece não verificada; registre inacessibilidade e eventual fonte alternativa.
3. Para cada afirmação importante, registre localização, conceito, fonte/seção,
   versão, data, raciocínio, classificação e gravidade. Use exatamente:
   **Verificada**, **Parcialmente correta**, **Incorreta**, **Não verificada** ou
   **Dependente de contexto ou versão**. Resultado contextual exige condição
   explícita; não o converta silenciosamente em aprovação geral.
4. Sempre que viável, execute exemplos próprios publicados, testes de comportamento,
   comandos em diretório temporário e simulações; compare esperado e observado.
   Teste o contrato e casos adversos, não só a saída feliz. Não execute código do
   aluno nem use eval/Function; preserve limites do interpretador. Registre comando,
   ambiente, versão e resultado real. Compilar não comprova comportamento.
5. Apresente lacunas antes das correções. Proponha explicação correta com evidência
   e rastreie impacto em exercícios, dicas, feedback e simuladores. Corrija dentro
   do pedido, preserve recursos e crie regressão relevante para erro de lógica.
6. Solicite revisão por subagente independente quando disponível para auditorias
   globais ou correções conceituais substanciais. Esta skill solicita explicitamente
   essa delegação limitada. O revisor deve consultar fontes por conta própria,
   receber os arquivos e o escopo sem um veredito esperado, e registrar evidências.
   Registre indisponibilidade; releitura pelo autor não é revisão independente.
7. Atualize docs/CONTENT_VERIFICATION.md por etapa, aula e conceito, com testes,
   problemas, correções e pendências. Atualize checkboxes ao concluir cada fase;
   diferencie levantamento completo de aprovação técnica completa.

## Gate técnico

Não aprove aula com erro conceitual grave, exemplo essencial incorreto ou afirmação
crítica não verificada. Ausência de evidência bloqueia a alegação de validação;
não autoriza inventar fontes ou observações. Pendências não críticas têm gravidade,
impacto, condição de resolução e estado explícitos. Uma correção só é validada
após reconferir fonte e teste pertinente. Testes finitos não provam correção geral;
simulação não comprova ferramenta externa; nenhuma decisão local autoriza publicação.

Aplique educator às correções didáticas e uiux a alterações de apresentação ou
interação. Execute verificações do projeto conforme o escopo, registre limitações
sem certificar aprendizagem, WCAG ou integrações não observadas. Não publique,
faça push, altere Notion ou envie dados do estudante por implicação da skill.
