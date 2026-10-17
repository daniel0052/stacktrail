# Etapa 03 — revisão independente JS/TS (reorganização em trilhas)

Data: 17/10/2026. Revisor independente do autor da implementação; skills educator e factchecker e respectivos gates lidos. Escopo: linguagem JS/TS, Node, Express e Nest opcional; não constitui auditoria UI/UX.

## Fonte curricular e autoria

Página Notion `3f63cadf-ab77-81ad-9194-c805b33198d8` consultada diretamente via MCP, integralmente: 11 seções, sem filhos ou paginação/truncamento indicados. O original considera Node/Express opcionais e Laravel obrigatório. O pedido anexado supera essa regra para permitir duas alternativas; profundidade JS/TS e equivalência entre trilhas são ampliação explicitamente solicitada, não atribuída retroativamente ao Notion.

## Lacunas iniciais (comunicadas antes das correções)

| Local | Evidência | Gravidade/estado inicial |
| --- | --- | --- |
| node-runtime.mdx, pré-requisitos | Afirma conclusão obrigatória PHP/Laravel e Node opcional | Alta; incompatível com seleção nova |
| Inventário JS/TS | Três aulas Node pressupõem funções, objetos e promises da Etapa 01; faltam aulas aprofundadas de linguagem/classes/generics/narrowing | Alta; alternativa principal ainda incompleta |
| express-api/src/app.ts | Validação manual e aplicação/router/armazenamento em um arquivo | Média; implementar biblioteca adequada e organização por funcionalidade para ensinar competências solicitadas |
| Express, erros assíncronos | Necessário distinguir Promise retornada/await de callback/timer desvinculado | Ponto de verificação; não assumir captura universal |

## Fontes primárias efetivamente consultadas

- [Zod, Requirements](https://zod.dev/): TypeScript 5.5+ testado, strict obrigatório, suporte Node. TS 5.9.3 está no intervalo documentado; compatibilidade efetiva do pacote fixado exige compilação/teste local.
- [Zod, API: coerção e strings](https://zod.dev/api): coerção usa Number/String, portanto não substitui a gramática de ID; a documentação corrente pode diferir do pacote escolhido no detalhe Unicode, que deve ser executado.
- [Express, error handling](https://expressjs.com/en/guide/error-handling.html): handlers que retornam Promise encaminham rejeições; callbacks exigem next(error); quatro argumentos identificam middleware de erro; headersSent exige delegação.
- [Node, event loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick): I/O/event loop, limiar de timers e callbacks; async não desloca cálculo síncrono para worker.
- [TypeScript, Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html): typeof null é object; guards de verdade descartam também string vazia/zero; refinamento exige condição correta.

## Contraexemplos necessários

- ID textual `1e0`, `0x1`, `-1`, `0`, inteiro inseguro: conversão numérica isolada não implementa contrato decimal positivo seguro.
- PATCH `{}`, `{id:99}`, `null`, array e campo conhecido inválido: rejeitar antes da mutação; GET posterior deve conservar estado.
- Body JSON quebrado, mídia incorreta e limite excedido: distinguir parser, mídia e validação; não transformar tudo em 500.
- Query repetida ou desconhecida: tipos estáticos não provam string runtime.
- Type assertion não valida JSON; `typeof null === 'object'`; optional e nullable são políticas distintas.
- Promise.all não cancela operações pendentes; await não acelera cálculo síncrono; async sem await interno continua executando código síncrono.

## Ambiente observado

`node --version`: v24.21.0. `npm --version`: 11.19.0. Configuração Node existente: ES2022, NodeNext, strict, noUnusedLocals/noUnusedParameters. Nenhum resultado de execução dos novos projetos é declarado nesta baseline.

## Estado

Revisão final de novas aulas, exercícios, rubrica por aula e projetos pendente até disponibilização da implementação. Nenhuma aprovação técnica/pedagógica final nesta baseline.
