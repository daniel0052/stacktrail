# Etapa 03 — duas trilhas (17/10/2026)

## Plano e fonte de verdade

Pedido: reorganização em fundamentos comuns, PHP/Laravel e JS/TS/Node/Express;
NestJS adicional opcional. Notion `3f63cadf-ab77-81ad-9194-c805b33198d8`
relido integralmente via MCP: 11 seções, sem paginação, filhos ou truncamento pendentes.
O original prioriza PHP/Laravel; a equivalência entre trilhas e o aprofundamento
JS/TS são ampliações autorizadas pelo pedido, não atribuídas ao currículo original.

Lacunas anteriores às correções: JS/TS sem sequência própria de linguagem;
conclusão somente PHP; Laravel exigindo SQLite/Eloquent; ausência de seleção
persistente; instruções e prompts chamando Node/Express de opcionais.
Relatórios independentes: verification/stage-03-tracks-{php,js}.md e
etapa-03-trilhas-uiux.md. Baseline não significa aprovação.

## Implementação incremental

- [x] Inspeção, currículo integral e plano.
- [x] Fundamentos comuns e estrutura PHP.
- [x] Estrutura e aulas aprofundadas JS/TS.
- [x] Projetos e exercícios equivalentes, testes reais.
- [x] Seletor e navegação.
- [x] Progresso v7 e migração sem perda.
- [x] Auditorias independentes, correções e testes finais.
- [x] Documentação e AGENTS reconciliados.

## Contrato de conclusão e compatibilidade

Implementado e testado: leituras comuns e da trilha, exercícios comuns e da trilha, seis
competências com evidências próprias. Uma trilha suficiente. A preferência
não desfaz uma conclusão obtida na outra. Tudo continua sendo declaração do
estudante, sem execução de código arbitrário no navegador.

v6 e anteriores migram com preferência PHP; suas seis evidências PHP não viram
evidências JS. IDs e arquivos existentes permanecem. Novos requisitos podem
reduzir o percentual sem apagar conclusões históricas de exercícios.

## Limites futuros

04: contratos REST e regras de negócio devem ter exemplos nas duas stacks.
05: Laravel/Eloquent e SQL deverão ter alternativa de acesso a dados JS/TS,
com modelagem e transações equivalentes; não antecipados aqui.
08: containerização e automação deverão suportar os dois runtimes; sem Docker
como requisito desta etapa. Nenhum conteúdo 04–19 é implementado nesta tarefa.

## Equivalência por competência

| Competência | PHP/Laravel | JS/TS/Node/Express | Evidência |
| --- | --- | --- | --- |
| Valores, funções, objetos e contratos | seis aulas PHP e exercícios01/10 | cinco aulas JS/TS e exercício13 | fronteiras, normalização, tipos e preservação da origem |
| Dependências e módulos | Composer/PSR-4 e11 | ESM/NodeNext/npm e14 | instalação com lock e import/autoload real |
| Runtime e I/O | CLI PHP e biblioteca01 | CLI/promises02/14 e HTTP nativo15 | stderr/exit, rejeição e arquivo preservado |
| Rotas e middleware | Laravel03 | Express16 | health/lista/ausência e ordem explicada |
| Validação e CRUD | Form Requests05 | Zod04/17 | efeito após criação, PATCH inválido não altera dados |
| Testes | PHPUnit12 | node:test18 | isolamento, falha discriminante e recuperação |
| Projeto e decisão |07/09 |19/20 | API, README, ADR e rubrica30/20/25/15/10 |

Não se força equivalência entre modelos de execução, DI ou armazenamento.
Catálogo Laravel usa JSON local e Express memória; essa diferença é explicitada.
Nenhum projeto exige SQL/Docker. Noções Eloquent/migrations foram preservadas,
sem transformá-las em requisito de instalação ou conclusão.

## Evidências já executadas nesta reorganização

- Plataforma: typecheck e377testes/37arquivos passaram; lint passou após excluir
  dependências vendor da análise do código autoral. Build passou com aviso do chunk
  principal (~644kB minificado), sem afirmar desempenho de produção.
- PHP8.5.4 extraído de pacotes oficiais Ubuntu em /tmp, sem instalação global;
  Composer2.10.3 oficial com SHA256 conferido. Biblioteca:12verificações,8CLI,7funções/autoload.
- Laravel13.37.0/PHPUnit12.5.40:10testes/57asserções; nenhum driver SQLite carregado
  ou exigido. Composer check-platform-reqs passou. Corrupção JSON, envelope e
  isolamento de arquivos exercitados.
- Node24.21.0/TS5.9.3:5testes de linguagem, async, CLI e HTTP real passaram.
- Express5.3.0/Zod4.6.7: suíte CRUD HTTP e suíte inicial de rotas passaram.
- Seis ensaios extraídos diretamente das MDX: valores, módulos, contratosTS,
  narrowing, async e schema compilados/executados em /tmp. Fragmentos de testes
  identificados como fragmentos não foram declarados executáveis isoladamente.
- Chromium:13/13 seleção/persistência/migração e matriz5larguras×2temas
  (6rotas por cenário), fonte150%;8/8 teclado/inspeção/contraste90% e zoom real
  200/400% nos dois temas. Capturas desktopescuro/mobileclaro inspecionadas.

Resultados finais da varredura global/build e reconferência independente serão
registrados abaixo quando concluídos; não presumir aprovação pelo plano.

Reconferência independente final: exercício05 e aprofundamento08 corrigidos; sem
bloqueante demonstrado no recorte de conteúdo/metadata/progresso. Fontes e rubrica
em verification/stage-03-tracks-final.md. Instalação dos ZIPs Laravel e Express
em pastas independentes passou; suas suítes passaram novamente nessas cópias.

Ensaio HTTP real adicional: o ZIP Laravel instalado em /tmp foi servido em
loopback por Artisan;15verificações passaram (health/lista, POST201/Location,
normalização, PATCH422 sem mutação, PATCHválido, JSON400, DELETE204/GET404 e
catálogo corrompido500semtrace, conteúdo preservado). Processo temporário encerrado.
Não dependeu de SQLite nem de Docker.

Limites mantidos: arquivo JSON vazio é catálogo inicial, portanto truncamento
externo total não é detectado. Não há crash recovery/atomicidade de gravação
garantidos nem ensaio de carga. A documentação agora explicita esse recorte.

Cobertura unitária: a inspeção da execução verbose revelou que o glob em cache
continha23MDX antigas. O teste agora confronta os arquivos importados com o
inventário publicado; após invalidar o transform pela alteração do teste,31MDX
renderizaram e a asserção de cobertura passou (32casos no arquivo). A execução
anterior de368testes é histórica; o total final será registrado após a nova suíte.

Suíte final após corrigir a cobertura do glob: `npm test -- --maxWorkers=4`
passou377testes/37arquivos. A contraprova adicional confirma que campos JS
indevidos em arquivo v6 são ignorados e não aprovam a trilha nova.

## Fechamento da implementação

- [x] Varredura global:318/318cenários (159rotas×2temas), sem violações detectadas
  pelas regras axe executadas nem overflow identificado nessa matriz.
- [x] Build estático:121/121na rodada completa;27/27na reconferência dos últimos
  fundamentos, novas aulas, dashboard, evidências e pacotes. Não se somam essas
  rodadas como se fossem rotas distintas.
- [x] Suíte global377/377; recorte pós-correções comuns38/38 (inclui31MDX e
  cobertura de inventário), typecheck, lint e build passaram.
- [x] Revisão independente das três aulas comuns adicionais: dependência de
  PHP/SQLite removida; exemplos env/npm/Composer explicitamente alternativos.
  A distinção cliente de testes Laravel versus HTTPloopback Express foi
  esclarecida após a revisão. FontesNode24process.env/download lidas diretamente.
- [x] README/AGENTS/CONTENT_VERIFICATION/QUALITY_AUDIT reconciliados; versões
  iniciais marcadas como históricas, sem usar os resultados antigos como prova nova.

Não foram demonstrados bloqueantes técnicos/pedagógicos ou de interface no recorte
verificado. Isso não constitui certificaçãoWCAG, auditoria de segurança exaustiva,
produção/deploy, benchmark ou comprovação de aprendizagem com estudantes.
Incompletosaxe permanecem nos anexosJSON e exigem julgamento manual específico.
O móduloNest não teve nova execução de servidor nesta reorganização: suas aulas
e rotas renderizaram; os ensaiosruntime anteriores continuam históricos.
Windows/macOS/Herd/Laragon, carga e recuperação de queda não foram executados.

Os arquivos permanecem locais, sem commit, push, ediçãoNotion ou publicação.
Etapas04–19 não foram implementadas; somente dependências futuras registradas.
