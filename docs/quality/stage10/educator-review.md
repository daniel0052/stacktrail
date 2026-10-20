# Etapa 10 — revisão educacional independente

Data: 19/10/2026. Revisão somente leitura dos artefatos de produto; este relatório é a única edição do revisor. Base curricular: anexo integral fornecido pelo usuário, `13b4f4d3-16a6-476e-8fe1-19223902d8b3/Pasted text.txt`, lido integralmente, além de AGENTS.md, stacktrail-educator e seu quality-gate. Não foi necessária inferência de currículo a partir de Notion.

## Achados antes das correções

1. **Contrato contraditório — corrigir antes de publicação.** Em `10-ex-10`, o exemplo anterior mantém `category=papelaria`; mudar somente `q` para `livro` não pode retornar P4, que pertence a livros. Explicitar limpeza/troca da categoria, ou estabelecer lista vazia como resultado da combinação. O desafio exige filtros combinados e não deve ensinar perda silenciosa de um filtro.
2. **Pré-requisito potencialmente bloqueante.** Os tópicos Laravel/Express e os pré-requisitos do integrador mencionam API anterior funcional sem declarar ali a base alternativa. O enunciado do projeto permite essa alternativa. Tornar as duas apresentações coerentes e assegurar preparação C anterior ao frontend, sem entregar telas, melhorias, testes-alvo ou diagnóstico.
3. **Separação de papéis ainda não revisável.** Na inspeção inicial não havia metadados 10 em preparation.ts, nem composição específica em preparation-prompt.ts/prompts.ts. A qualidade das dicas do catálogo não aprova futuros prompts preparadores. É necessária reconferência após integração.
4. **Obrigatoriedade autoral.** Os 18 exercícios estão marcados obrigatórios. O currículo pede exercícios progressivos, mas não define contagem/regra de conclusão. A regra proposta de dez tópicos da stack, 18 exercícios, projeto e síntese precisa ser identificada como decisão autoral, transparente na UI e no cálculo.

## Cobertura observada

- Nove módulos cobrem os objetivos do anexo, com orientação curta, competências observáveis, referências e práticas. Há nove tópicos comuns e dois alternativos de integração; uma stack seleciona dez tópicos, sem exigir duas APIs.
- React opcional da01 não é exigido como conhecimento prévio: o módulo02 pede HTML/CSS/TypeScript/eventos e introduz React funcional com TypeScript obrigatório.
- Os 18 exercícios possuem problema, requisitos, entradas/saídas, casos adversos, três dicas e critérios. Não foram encontrados códigos resolvidos ou algoritmos-gabarito. Resultados de fixtures são contratos esperados, não alegações de execução.
- A progressão passa de responsabilidades e composição para estado, formulários, API, sessão, Next.js e qualidade. O exercício06 antecipa uma consulta controlada, mas pode usar fixture HTTP local sem demandar API de produção.
- A profundidade é adequada a backend iniciando Pleno: validação runtime, concorrência de respostas, resultados de mutações incertos, segurança no servidor, integração real, avaliação de host e medições reproduzíveis. Não exige CSS avançado, arquitetura distribuída ou biblioteca global de estado.
- O integrador possui contexto, problema, requisitos funcionais e não funcionais, oito marcos, aceitação, rubrica, entregáveis e preparação de portfólio. Reutiliza09 e limita a uma API. Deploy local controlado é alternativa explícita a conta/cartão/serviço externo.
- Next.js aparece como pequena experiência separada; há comparação aplicada de CSR/SSR/SSG, fronteiras e host, sem migração obrigatória do painel. React não vira terceira trilha backend.
- Dicas orientam investigação e documentação sem entregar implementações. O catálogo distingue esperado de observado e rejeita aprovação/execução inventada.

## Rubrica inicial (0–4)

| Dimensão | Nota | Fundamentação |
|---|---:|---|
| Fidelidade e recorte | 3 | Nove módulos e foco backend preservados; identificar regra de conclusão como autoral. |
| Pré-requisitos/progressão | 2 | Alternativa ao projeto prévio precisa constar dos pré-requisitos e preparação. |
| Qualidade do desafio | 3 | Problemas contextuais, adversos e sem solução pronta; ex10 precisa contrato consistente. |
| Avaliação | 2 | Contradição ex10 impede prontidão enquanto não corrigida. |
| Fontes/autonomia | 3 | Referências oficiais e dicas graduais; adequação factual delegada à auditoria própria. |
| Honestidade/reprodução | 3 | Casos esperados separados de execução; preparação ainda pendente. |

Prontidão **pendente**, até correção/reconferência dos contratos e dos prompts. Esta revisão não executou frontend, backend do estudante, testes, navegador ou auditoria WCAG; esses resultados devem vir de evidências da implementação.

## Reconferência da implementação integrada

Reconferência em19/10/2026 de stage-ten.ts, preparation.ts, preparation-prompt.ts, prompts.ts, curriculum.ts, critérios de StudyPages.tsx, cálculo em achievements.ts e organização em roadmap.ts. Os achados anteriores ficam preservados acima como histórico, não como pendências ainda abertas.

- **Achado1 corrigido:** o exemplo10-ex-10 agora remove explicitamente category antes de consultar livro, produzindo P4 sem contradizer filtros combinados.
- **Achado2 corrigido:** pré-requisitos Laravel/Express e integrador aceitam base mínima alternativa. O integrador é C, com API anterior ao frontend, uma stack e banco descartável; o estudante constrói painel, integração, testes UI e entrega. Não há exigência de refazer duas APIs.
- **Achado3 reconferido:** classificação A01/02/03/04/07/15; B06/08/12/14/16/17/18; C05/09/10/11/13 e projeto. Ambientes React, Next e fullstack são distintos; PostgreSQL obrigatório apenas na base alternativa do integrador, sem impor banco a fixtures HTTP mínimas. As bases defeituosas especificam sintomas/estímulos, não causa/arquivo/patch ou testes-alvo. A preparação exige reprodução honesta ou declaração de não validação e não muda o progresso.
- **Achado4 corrigido na apresentação:** critérios publicados identificam a regra autoral de dez tópicos, 18 exercícios, integrador e síntese. A seleção de tópicos filtra a integração alternativa por stack e o cálculo inclui todos os exercícios obrigatórios, sem dupla API.
- Ajuda inclui somente dicas reveladas e pede tentativa antes da próxima pista. Revisão inclui rubrica, artefatos e estados Atendido/Parcialmente atendido/Não atendido/Não verificado, sem nota/execução inventadas. Requisitos parametrizados são resolvidos por stack na preparação, ajuda e revisão; referências específicas da outra stack são removidas.
- Há critérios explícitos para DTO runtime, invalidação de respostas privadas pendentes após logout/401 e medição em desenvolvimento/build de profiling declarado, sem atribuir recursos inexistentes ao build comum.
- Roadmap agora apresenta Júnior00–09, Pleno10–15 e Sênior16–19, conforme organização exigida pelo usuário.

**Resultado pedagógico após correções:** fidelidade3, progressão3, qualidade3, avaliação3, fontes/autonomia3, honestidade/reprodução3. Nenhum bloqueante educacional aberto nos artefatos inspecionados. A adequação factual das fontes/catálogos permanece responsabilidade da revisão factual independente; visualização, persistência e regressões dependem dos testes documentados pelo implementador. Nenhuma base futura gerada por IA foi executada ou validada por esta revisão.
