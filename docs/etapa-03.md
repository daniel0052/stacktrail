> Registro da implementação inicial da Etapa 03. A reorganização em duas trilhas,
> sem banco obrigatório e com progresso v7, está em [etapa-03-trilhas.md](etapa-03-trilhas.md).
> Resultados históricos abaixo não aprovam automaticamente as alterações posteriores.

# Etapa 03 — implementação incremental

Fonte curricular integral: MCP Notion `3f63cadf-ab77-81ad-9194-c805b33198d8`,
consultado em16/10/2026, última edição14/10/2026, seções1–11, sem filhos/paginação
ou truncamento indicados. A fonte define competências/exercícios/rubrica. As23 aulas,
exemplos, projetos, contratos e roteiros detalhados são elaboração didática autoral.

Arquitetura: MDX e índices por etapa; rotas HashRouter; StageHero, CodeBlock,
LessonTable, laboratório, dicas, ReviewDialog e progresso global reutilizados.
Novos componentes somente para ciclo conceitual e laboratório de arquivos. Sem
runtimePHP no navegador, backend da plataforma ou envio automático à IA.

Plano: 7módulos/23 aulas (16base,7opcionais),9exercícios; base1/3/5/7/9.
Conclusão deriva de !optional, não do nível; exige evidências declaradas. Migração
v6 mantém chave e versões1–5; mudanças na solução03 invalidam autoavaliação anterior.

Fases e resultados serão registrados após executar os testes pertinentes. Conteúdo
provisório da fase1 não é aprovação técnica nem pedagógica.

## Entregas verificadas — fases 1–5

- Inventário/rotas e migração v6 preservam rascunhos anteriores. A regressão conclui
  somente os cinco exercícios base com evidências, deixando opcionais intocados.
- Ciclo é modelo conceitual: mostra entrada, middleware, rota, parsing/validação,
  controller, exceção e resposta. Não executa código nem transmite HTTP.
- Biblioteca PHP: 12 verificações de classe e oito cenários CLI reais. API Laravel:
  cinco testes/38 asserções e 16 ensaios HTTP reais, incluindo erro500 sem stack.
  Ver versões, ambiente isolado e correções em `verification/stage-03-php.md`.
- Editor salva arquivos como JSON versionado no progresso existente. Realce é uma
  prévia textual; Tab mantém navegação. Verificar registro não é executar testes.
  Restaurar exige confirmação. A referência resolvida fica sob abertura explícita.
- ZIP inclui lockfiles e testes; rascunho editável exclui locks grandes. Pacotes
  estáticos são gerados por predev/prebuild a partir de `examples/stage-03`, sem
  dependências instaladas, arquivos de ambiente privados, SQLite ou logs.
- Dois fluxos Chromium passaram em375px/fonte 150%, temas claro/escuro: editar,
  verificar registro, baixar ZIP, recarregar e recuperar, cancelar e confirmar
  restauração; axe/reflow sem violações detectadas nesse recorte. Um seletor do
  teste foi corrigido após a primeira execução falhar ao procurar “Cancelar”.
  Isso não constitui auditoria WCAG completa nem validação do código do estudante.

## Verificação intermediária antes das trilhas opcionais

`npm test -- --maxWorkers=4`: 366 testes em37 arquivos passaram (inclui legado).
`npm run lint` e `npm run typecheck` passaram nessa revisão intermediária.
Não é resultado final: Express/Nest e as duas aulas de integração ainda não foram
implementados neste ponto, e a renderização de placeholders não aprova conteúdo.

## Fases 6–9 — conteúdo e projetos completos

23 aulas autorais em sete módulos cobrem o currículo consultado:3 fundamentos,
6 PHP/Composer,5 Laravel,3 Node,2 Express,2 Nest e2 integração/decisão. As16 aulas
de base e sete opcionais são identificadas no inventário; há nove exercícios,
cinco base e quatro opcionais. Os enunciados incluem contrato, exemplos, critérios,
dicas graduais, erros comuns e verificações específicas por assunto.

Node24.21/TS5.9.3: CLI aceita termo opcional, escreve total filtrado/items, rejeita
entrada=saída; HTTP nativo saúde/404/405. Três testes reais passaram. Express5.3:
CRUD em memória, valida body/query/ID, política CORS explícita e logs mínimos;
um teste HTTP abrangente passou. Nest12.1.3: módulo/controller/provider, DTO/pipe,
CRUD e Location; dois testes reais passaram. Todos compilados com tsc estrito e
reexecutados por revisor independente. Locks incluídos, sem dependências novas no
runtime da plataforma. Detalhes: `verification/stage-03-node.md`.

Revisão encontrou ambiguidades e contraexemplos antes das correções: arquivo de
exemplo Node sobrescrevendo books.ts, CLI com contrato diferente do enunciado,
Location ausente no Nest, ID1e0 convertido antes do pipe, Number aceitando notações
no Express, PATCH fora do escopo mínimo de portabilidade e rótulos imprecisos da
rubrica. Corrigidos e reconferidos com fonte/teste pertinente; os relatórios
preservam o histórico e não representam a primeira versão como aprovada.

PHP/Laravel reconferidos em 17/10: PHP 12 verificações +8 CLI; Laravel 6 testes/43
asserções. Filtro FirstRoutesTest1/5 passou inclusive com CRUD deliberadamente
pendente em cópia temporária; suíte inteira continuou detectando essa pendência.
ZIPs extraídos instalaram dependências e passaram os mesmos testes. Prova adicional
controlada de erro500 confirmou resposta genérica, identificador e log correlato.
Nenhum teste executou código enviado por estudante.

As três skills foram aplicadas com responsabilidades distintas. Rubrica por aula
e exercício está nos pareceres PHP e Node; dimensões finais≥3 no escopo introdutório,
sem uso da própria redação como prova técnica. O usuário conserva acesso livre e
pode concluir sem Node/Express/Nest; futura Etapa04 permanece sem conteúdo.

## Fase10 — conclusão local e limites

As23 aulas e nove exercícios passaram por revisão pedagógica/técnica independente;
relatórios têm rubrica individual, fontes primárias lidas e contraexemplos. Não
foram encontrados bloqueantes remanescentes no escopo introdutório após correção.

Comandos finais: typecheck/lint/build passaram; `npm test -- --maxWorkers=4`
passou366 testes/37 arquivos na execução separada. Navegador:81/81 no build sob
/stacktrail/;10/10 combinações responsivas;5/5 jornadas/progresso/zoom real;
2/2 contraste/fonte 90%. Varredura ampla139 rotas×dois temas:277/278; falha de contexto
axe em00estruturas reconferida nos dois temas2/2. Não se declara rodada única278/278.
Histórico de falhas/reexecuções em QUALITY_AUDIT e UI/UX03.

Os cinco pacotes têm fonte/locks/testes e download verificáveis. A plataforma
continua estática; o código do estudante permanece texto, com evidências externas
declaradas e autoavaliação, sem nota automática. As etapas04–19 continuam futuras.

Limites: sem deploy/domínio real, instalação em outros SOs, leitor de tela/dispositivo
real, benchmark/segurança deprodução ou aprendizagem comprovada com estudantes.
Vite alerta chunk principal≈612kB minificado; otimização não foi medida. Incompletos
axe e cobertura manual estão explicitados; não há certificação WCAG. Os artefatos
reproduzíveis são gerados por testes, e o resultado de referência não aprova uma
solução do estudante.
