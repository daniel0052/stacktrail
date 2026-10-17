> Registro da implementação inicial da Etapa 03. A reorganização em duas trilhas,
> sem banco obrigatório e com progresso v7, está em [etapa-03-trilhas.md](../etapa-03-trilhas.md).
> Resultados históricos abaixo não aprovam automaticamente as alterações posteriores.

# Etapa 03 — revisão independente Node/TypeScript/Express/Nest

Consulta: 16/10/2026. Revisor independente da elaboração. Escopo: opcionais Node/TS/Express/Nest; este registro não aprova aulas ou projetos ainda não recebidos. A seleção posterior ao levantamento é Nest12.1.3, confirmado estável no registry npm; o confronto com Nest11 é histórico, não a versão recomendada para o novo projeto. Skills educator e factchecker lidas, incluindo evidence-gate. O currículo é responsabilidade da matriz principal; esta revisão confronta conceitos técnicos diretamente com mantenedores.

## Fontes efetivamente consultadas

| ID | Fonte e seção lida | Versão/condição |
| --- | --- | --- |
| N1 | [Node ESM — Mandatory file extensions, Enabling, Differences](https://nodejs.org/download/release/v24.14.0/docs/api/esm.html#mandatory-file-extensions) | Snapshot oficial v24.14.0; URL latest-v24.x inacessível na primeira tentativa |
| N2 | [Node Event Loop — What is, Phases, timers, setImmediate vs setTimeout](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick) | Guia atual; explicita mudança libuv1.45/Node20 |
| N3 | [Node TypeScript — Type stripping, module system, features](https://nodejs.org/download/release/v24.21.0/docs/api/typescript.html#type-stripping) | v24.21.0, igual ao runtime local |
| T1 | [TypeScript Modules Reference — node16/node18/node20/nodenext e resolução](https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-node18-node20-nodenext) | Documento atual; nodenext acompanha comportamento recente, não versão congelada |
| E1 | [Express Error Handling — async, promises, callbacks](https://expressjs.com/en/guide/error-handling/) | Express5 |
| E2 | [Express5 migration — Rejected promises handled](https://expressjs.com/en/guide/migrating-5/#rejected-promises) | Express5 |
| S1 | [Nest11 Validation — Auto-validation, Stripping properties, Transform payload](https://docs.nestjs.com/v11/techniques/validation) | Portal versionado v11 |
| S2 | [ValidationPipe fonte oficial tag11.1.0](https://raw.githubusercontent.com/nestjs/nest/v11.1.0/packages/common/pipes/validation.pipe.ts) | Código primário fixado, não fonte de autor didático |
| S3 | [Nest migration atual — Node requirements, ESM, defaults](https://docs.nestjs.com/migration-guide) | Atualmente descreve Nest12; não aplicar seus defaults a Nest11 |

As tentativas em v11.docs.nestjs.com foram inacessíveis; a alternativa efetivamente lida é docs.nestjs.com/v11. Nenhuma URL inacessível conta como evidência.

## Afirmações e cautelas antes da implementação

| ID/conceito | Confronto e classificação | Impacto/pendência |
| --- | --- | --- |
| N-ESM | **Dependente de contexto ou versão**: em Node ESM imports relativos/absolutos exigem extensão; package type module ou .mjs explicita formato. N1/T1. nodenext permite ESM e CommonJS conforme formato detectado. | Não copiar configuração bundler/Vite para servidor Node sem verificar emissão e execução. Teste essencial pendente de projeto. |
| N-LOOP | **Verificada**: JavaScript síncrono longo bloqueia a thread do loop; I/O assíncrono pode ser delegado ao SO. N2, What is/Phases. | Evitar dizer que todo Node tem apenas uma thread ou que await paraleliza CPU. |
| N-TIMER | **Dependente de contexto ou versão**: timeout define limiar mínimo, não horário exato; ordem timeout(0)/immediate fora de I/O não é universal. N2, timers/comparison. | Não publicar resultado de ordem como garantia geral. |
| N-TYPES | **Verificada** nas condições Node24.21: type stripping não faz typecheck, ignora tsconfig e não transforma decorators; enums/parameter properties não são apagáveis sem transformação. N3. | Nest com decorators exige compilação/configuração compatível; node arquivo.ts sozinho não substitui build/typecheck. |
| E-ASYNC | **Dependente de contexto ou versão**: Express5 encaminha rejeição da Promise retornada por handler; Promise desligada, callback fs e timer precisam encaminhamento explícito. E1/E2. | Exemplos Express4 exigem tratamento diferente; capturar erro com middleware de quatro parâmetros após rotas. Teste de erro real pendente. |
| S-DTO | **Verificada** para ValidationPipe/class-validator: DTO classe concreta, import runtime, decorators e pipe configurado são necessários para validação descrita; interface TS não valida JSON. S1/S2. | DTO só tipado sem pipe/decorators seria erro essencial. Testar body inválido/extra/ausente. |
| S-WHITE | **Verificada**: whitelist remove propriedades sem decorators; whitelist+forbidNonWhitelisted rejeita extras; transform converte conforme metadados, não substitui regras de validação. S1/S2. | Não dizer que whitelist valida conteúdo ou torna API segura por completo. |
| S-VERSION | **Dependente de contexto ou versão**: docs genéricas atuais são Nest12 (novos pacotes ESM/defaults), diferentes da trilha fixada Nest11. S3. | Fixar major e registrar lock real. Não usar latest silenciosamente. Seleção atual: Nest12.1.3, cuja documentação genérica consultada corresponde ao major. |

## Execução realizada até este ponto

`node --version` → `v24.21.0`; `npm --version` → `11.19.0`.
Ainda não foram recebidos os projetos a auditar. Não houve instalação, build ou execução de Express/Nest neste registro inicial. Nenhuma aula opcional está tecnicamente aprovada por estes links ou por esta preparação.

## Consulta de registry e seleção de versões

Consulta real: `npm view @nestjs/core version engines --json`, equivalente para platform-express/cli/express/typescript. Primeira tentativa sem rede não retornou; consulta com rede permitida terminou com status0.

| Pacote | Resultado observado | Condição |
| --- | --- | --- |
| @nestjs/core | 12.1.3; engines node>=20 | Docs de migração restringem consumo CommonJS/require(esm); Node24.21 satisfaz |
| @nestjs/platform-express | 12.1.3 | Fixar mesmo major/patch do core |
| @nestjs/cli | 12.0.8; engines node>=20.11 | Schematics dependentes têm piso documentado mais alto:22.22.3/24.15/26 |
| express | 5.3.0; engines node>=18 | Erros async conforme E1/E2 |
| typescript | 7.0.2 | Resultado latest consultado, não garantia de compatibilidade até build efetivo |

A opção ESM+NodeNext com Nest12 elimina a necessidade de require(esm) no código próprio, mas mantém necessidade de compilar decorators/metadados. Para DTO: import de valor, classe concreta, decorators class-validator, pipe global explícito. A documentação Nest12 S3 foi lida diretamente: seção Node.js requirements, ESM packages, New project defaults. Não atribuir defaults ESM/Vitest/oxlint a Nest11.

## Revisão independente das três aulas Node

Arquivos lidos integralmente: `node-runtime.mdx`, `node-io.mdx`, `node-http.mdx`, README e sete arquivos/configurações do projeto `examples/stage-03/node-http`.

Achado médio apresentado ao autor antes da correção: primeiro exemplo de runtime rotula `src/books.ts` mas só mostra Book/label. Substituir o arquivo real elimina booksFrom e quebra a CLI. Solicitação: explicar adição preservando exportações ou usar módulo próprio; criar demo.ts explicitamente e executar `npm run build`, sem depender de tsc global. Reconferência pendente.

Fontes adicionais abertas diretamente: [Node24.21 fs/promises readFile](https://nodejs.org/download/release/v24.21.0/docs/api/fs.html#fspromisesreadfilepath-options), [stream pipeline](https://nodejs.org/download/release/v24.21.0/docs/api/stream.html#streampipelinesource-transforms-destination-options), [HTTP createServer](https://nodejs.org/download/release/v24.21.0/docs/api/http.html#httpcreateserveroptions-requestlistener), [debugger](https://nodejs.org/download/release/v24.21.0/docs/api/debugger.html), [TypeScript sourceMap](https://www.typescriptlang.org/tsconfig/sourceMap.html).

Afirmações confrontadas: UTF8/texto vs Buffer e leitura integral (**Verificada**, fs); limite após leitura não protege consumo durante leitura (**Verificada**, código local+fs); pipeline coordena backpressure/erros e wx recusa sobrescrita (**Verificada**, stream/fs); createServer não abre porta, request é IncomingMessage/stream e não tem body parseado automaticamente (**Verificada**, HTTP); comparação URL literal e HEAD405 são convenções locais explicitadas (**Verificada**, código); Node TS não checa tipos nem compila decorators (**Verificada**, N3); inspector/sourceMap são mecanismos distintos de depuração/mapeamento (**Verificada**, debugger/TS). Não foi conectada interface de debugger nesta revisão; esse fluxo permanece não executado.

Rubrica preliminar por aula (alinhamento curricular deve ser reconciliado à matriz do autor, não foi reconstruído do roadmap por este revisor): progressão3, precisão3, exemplos3, prática3, autonomia3 nas três aulas. Reprodutibilidade runtime2 até esclarecer alteração de books.ts e efetivamente testar compilação; I/O e HTTP reprodutibilidade pendente de instalação/build real. A atividade year opcional exige decisão de null/casos-limite; resumo por autor exige transferência; HTTP exige contrato q/ausência/métodos, não cópia literal.

### Tentativas de execução, sem aprovação fictícia

Cópia temporária `/tmp/stacktrail-node-review-local.*`: `npm install --offline --ignore-scripts --no-audit --no-fund --fetch-retries=0` falhou com ENOTCACHED para @types/node. `npm run build` subsequente falhou por tipos Node ausentes e any derivados. Não constitui ensaio instalado do projeto nem prova de erro do código. Solicitação de instalação com rede/loopback foi disparada separadamente e permaneceu sem resultado no momento deste registro; lock ainda não retornado. Não marcar execução plena ou npm ci como concluídos com base nesta tentativa.

### Atualização: ensaio instalado Node concluído

A primeira solicitação de permissão expirou antes de executar shell; retry com comando simples foi permitido. Em cópia temporária, `npm install --ignore-scripts --no-audit --no-fund --fetch-retries=0 --fetch-timeout=20000` instalou três pacotes. `npm test` executou TypeScript5.9.3 com o tsconfig estrito e Node24.21.0: **3 testes passaram**, zero falhas, em250ms de runner. Cobertura: guard/normalização; CLI relatório e preservação da saída diante de input inválido; HTTP loopback saúde200, ausência404 e método405/Allow. O autor instalou separadamente no projeto e gerou o package-lock real; este revisor não o sobrescreveu.

A correção `src/labels.ts` e instrução para criar demo/preservar booksFrom foi reconferida no MDX; achado médio anterior resolvido. Rubrica runtime reprodutibilidade passa a3, demais dimensões técnicas/pedagógicas indicadas3. Não foi medida aprendizagem real, debugger conectado nem rede externa.

## Revisão independente Express

Arquivos `express-middleware.mdx`, `express-crud.mdx` e projeto completo lidos. Fontes adicionais efetivamente consultadas: [middleware Express5](https://expressjs.com/en/guide/using-middleware/), [routing](https://expressjs.com/en/guide/routing/), [API5](https://expressjs.com/en/5x/api/). As seções de ordem/next e terminação sustentam middleware (**Verificada**); E1/E2 sustentam retorno de Promise e callbacks separados (**Dependente de contexto ou versão**, major5). Parser/sintaxe não valida domínio (**Verificada**, código+middleware). Política CRUD/status/campos e CORS exata são escolhas locais (**Verificada** no código, não obrigação universal nem autorização).

`npm test` no projeto instalado: tsc5.9.3 e **1 teste HTTP abrangente passou** (258ms runner). Abrange CRUD, query, validação, parsing400, grande413, mídia415, domínio422, CORS header/ausência, correlação e logs sem body.

Lacuna média de evidência apresentada ao autor: teste do projeto verificava422 após PATCH vazio mas não GET posterior; a aula orienta corretamente essa comprovação. Contraensaio independente `/tmp/stacktrail-express-countercheck.mjs`, Node24.21/Express5.3.0, executado via loopback: quatro PATCH inválidos (`{}`, title:null, author:200, só id) devolveram422 e estado permaneceu id1/API/Ana; PATCH com title+id extra devolveu200 preservando id1/autor; query q repetida422; duas exclusões204/404. Resultado real passou, sem mudar implementação. Recomendada incorporação da asserção persistente ao teste publicado.

Rubrica das duas aulas: progressão3, precisão3, exemplos3, prática3, autonomia3, reprodutibilidade3. Alinhamento exige matriz curricular principal; não há bloqueante técnico conceitual demonstrado. Limites: CORS conferido por headers HTTP/Fetch Node, que não aplica política do navegador; não é teste de bloqueio real do browser. Sem segurança de produção, banco ou deploy certificados.

## Nest12 — execução e contraexemplos independentes (17/10/2026)

Projeto completo lido: package/tsconfig, AppModule/BooksModule, controller, DTO, service, fábrica/startup e testes. Nest12.1.3/TS5.9.3/Node24.21.0. `npm test` executado independentemente no projeto instalado: compilação estrita e **2 testes passaram** (provider/HTTP,669msrunner), zero falhas. Fonte não foi alterada pelo revisor.

Fontes consultadas diretamente adicionais: [providers — DI/scopes/registration](https://docs.nestjs.com/providers), [exceptions](https://docs.nestjs.com/exception-filters), [guards](https://docs.nestjs.com/guards), [interceptors](https://docs.nestjs.com/interceptors), [class-validator — IsOptional](https://github.com/typestack/class-validator#validation-decorators). DTO classe importada como valor, decorators/metadados e ValidationPipe global sustentam a validação descrita (**Verificada**, docs/código/HTTP). IsOptional ignora null/undefined; rejeição explícita do serviço impede apagar campo com null (**Verificada**, class-validator/código/HTTP). Singleton de provider é por contêiner/aplicação no escopo padrão, não persistência entre reinícios (**Verificada**, providers).

Contraensaio `/tmp/stacktrail-nest-countercheck.mjs`: cinco POST inválidos (array,null,objeto vazio,author:null,título201)400 sem criar; três PATCH inválidos (title válido+author:null,extra:true,title numérico)400 sem mutação; GET confirmou objeto anterior. Execução real passou nessas asserções.

**Achado médio apresentado antes da correção:** hipótese de que ParseIntPipe local rejeita toda notação não decimal falhou: GET /books/1e0 retornou200. Ensaio posterior confirmou também1.0 e0x1 aceitos200. O ValidationPipe global transform:true converte o parâmetro tipado number antes do pipe local; este já recebe1. [Fonte primária ParseIntPipe tag12.1.3](https://raw.githubusercontent.com/nestjs/nest/v12.1.3/packages/common/pipes/parse-int.pipe.ts) foi aberta: regex exige dígitos sobre valor recebido, não necessariamente texto bruto original. Classificação **Dependente de contexto ou versão**. Autor avisado para não prometer rejeição lexical estrita; política pode ser delimitada ou implementação/teste ajustados. Uma primeira asserção independente esperava400 e falhou200; não ocultar esse contraexemplo. Aulas ainda eram placeholders na primeira leitura; rubrica e aprovação pedagógica permanecem pendentes até conteúdo completo.

### Correção Nest reconferida

Após achado, controller passou parâmetros como unknown para evitar conversão primitiva global antes de ParseIntPipe; checkedId valida number/inteiro seguro/positivo. MDX explica ordem e contraexemplo1e0. `npm test` reexecutado: **2/2 passaram**,654msrunner, com novos casos no,1e0,1.0,0,-1 e overflow400. Estado do achado: **validado**, sob versão12.1.3 e contrato explícito. As duas aulas completas foram lidas integralmente após elaboração; placeholders anteriores não contaram como aprovação.

Currículo original relido diretamente por este revisor via MCP Notion em17/10/2026: página3f63cadf-ab77-81ad-9194-c805b33198d8, seções1–11 completas sem filhos/truncamento/paginação pendentes. Node/Express comparativos opcionais e Nest exploração opcional, sem bloquear trilha principal. Rubrica curricular do aluno30/20/25/15/10 não deve ser confundida com rubrica de qualidade abaixo.

**Nova lacuna média apresentada:** Express usa Number(req.params.id) sem validar formato/inteiro seguro/positivo; a seção5 curricular inclui validar params. Aula não torna a política de ID explícita. Embora seja aceitável uma política deliberada de normalização, esse comportamento não deve parecer validação lexical estrita. Recomendado checkedId com teste de ID inválido ou explicação contextual. Precisão/avaliação desse ponto permanecem pendentes até correção ou delimitação reconferida.

## Rubrica individual independente das sete aulas opcionais

Escala da educator; sete notas na ordem alinhamento, progressão, precisão, exemplos, prática, autonomia, reprodutibilidade. 3 significa adequado ao recorte introdutório, não certificação geral.

| Aula | Notas | Evidência específica e condição |
| --- | --- | --- |
| node-runtime | 3/3/3/3/3/3/3 | Fluxo fonte/emissão/processo, ESM/type erasure/unknown, labels separado preservando CLI; transferência year/null/limites e teste instalado estrito. Debugger GUI não conectado, sem alegar execução. |
| node-io | 3/3/3/3/3/3/3 | Leitura/parser/guard separados; CLI saída preservada ensaiada; readFile vs streams e limite após leitura explícitos; resumo por autor exige normalização/transferência. Pipeline é esperado didático, não alegado executado. |
| node-http | 3/3/3/3/3/3/3 | Factory/listen/portaefêmera e erro transporte vs HTTP; literalURL/HEAD405 delimitados; teste real200/404/405 e prática GETbooks+query. |
| express-middleware | 3/3/3/3/3/3/3 | Ordem/parser/fallback/next e async conformeExpress5; CORS não autorização; prática mutações e headercontrato; fonte oficial e HTTP real. |
| express-crud | 3/3/2/3/2/3/3 | CRUD400/413/415/422/404/204, PATCHpreservaautor e estado demonstrado; pendência de política/validação params pode ser resolvida com guarda/testes e explicação. |
| nest-modulos | 3/3/3/3/3/3/3 | Runtime/framework/adaptador, módulo registra provider/DI/metadados; cópia superficial/Map e lifetime delimitados; testeprovider não confundido comcontainer; ordempipe corrigida e ensaiada. |
| nest-validacao | 3/3/3/3/3/3/3 | ClasseDTO/runtimeimports, transform/whitelist/extra, nullIsOptional e PATCHestado; distingueguards/interceptors/exceptions sem segurança fictícia; transferênciayear e HTTP adverso. |

Guard didático/interceptor e geração CLI são roteiros esperados, não executados nesta auditoria. O recorte curricular exige guard/interceptor conceitual e testes básicos; não se alega implementação de autenticação, segurança de produção, todos os geradores ou aprendizagens reais. Comparação/projeto/ADR ainda não revisados porque permaneciam placeholders na última leitura.

### Express params — pendência resolvida

`router.param('id')` passou a exigir dígitos, inteiro seguro e positivo, antes dos handlers. `npm test` reexecutado: compilação e1/1teste passaram (438msrunner). Contraensaio independente reconstruído `/tmp/stacktrail-express-id-review.mjs`: no,1e0,1.0,0x1,0,-1,9007199254740992 retornaram400 e GET válido confirmou livro1/API/Ana preservado. Uma tentativa inicial de reutilizar script temporário antigo falhou por arquivo ausente após mudança de ambiente; não conta como execução do produto. Script novo executou com status0. Estado: **validado**. Rubrica express-crud atual: **3/3/3/3/3/3/3**, superando a linha histórica2.

## Comparação, projeto e exercícios — revisão17/10

Aulas decisao/projeto lidas integralmente. Fontes primárias consultadas diretamente: [PHP-FPM introdução/process pools](https://www.php.net/manual/en/install.fpm.php), [Octane13 introdução/DI e workers](https://laravel.com/docs/13.x/octane), [Laravel13 HTTP tests](https://laravel.com/docs/13.x/http-tests), [validation — JSON422](https://laravel.com/docs/13.x/validation#validation-error-response-format), [configuração — environment file security](https://laravel.com/docs/13.x/configuration#environment-file-security), [migrations — Drop All Tables](https://laravel.com/docs/13.x/migrations#drop-all-tables-migrate), [database testing — RefreshDatabase](https://laravel.com/docs/13.x/database-testing#resetting-the-database-after-each-test), [Composer install from lock](https://getcomposer.org/doc/01-basic-usage.md#installing-from-composer-lock).

Conceitos: FPM gerencia workers, logo processo novo obrigatório por request seria falso; Octane retém aplicação e exige cuidado com estado (**Verificada**, FPM/Octane). Comparação Map vsSQLite sem controlar persistência não mede efeito isolado do framework (**Verificada** como limite metodológico, sem benchmark alegado). RefreshDatabase isola testes usando mecanismo conforme estado do esquema, não faz todo cenário equivaler a banco descartável (**Dependente de contexto ou versão**, docs13; aula apenas orienta ambiente próprio). migrate:fresh apaga tabelas (**Verificada**), não backup. Lock permite versões consistentes mas não instala runtime/extensões (**Verificada**, Composer). Política POST/Location/erros da comparação descreve código local, não REST universal (**Verificada** por fontes/projetos lidos). Não reexecutei Laravel nesta subauditoria; resultados desse projeto permanecem no revisor PHP, sem atribuir sua execução a mim.

Lacunas médias apresentadas antes da correção:
1. projeto rotula rubrica organização20/código25/README10, enquanto currículo separa linguagem/organização20, HTTP/validação/erros25, documentação/segurança10. Pesos iguais não corrigem rótulos diferentes.
2. Ex08 limita portabilidade aGET/POST, mas testIdeas exigePATCHvazio; sugerido POSTvazio ou indicação explícita de extensão opcional.
3. Ex06 exige201/Location e exemplo saídaLocation, enquanto referência Nest/aula deliberadamente não enviamLocation; harmonizar ou ensinar adaptação explícita.
4. Ex02 pede{total,items},totalfiltrados e termodinâmico, enquanto referência{total,books},totallidos eapifixo; pode ser extensão válida, mas distinção precisa explícita.

Avaliação de aprendizagem dos opcionais: Ex02 requer CLI/erros/saídareal, Ex04 requerCRUD e estado apósfalha, Ex06 requercontainerDTOHTTP (unitário sozinho insuficiente), Ex08 requermesmoscasos nasduasstacks e diferençaefeitos/status/headers. Não são cópia de definições; commonErrors/testIdeas são específicos e úteis. As divergências de contrato acima impedem chamar referência de gabarito conformante sem ajuste. Ex08 requer nova tentativa além do texto, não automática aprovação por nota.

Rubrica decisao: **3/3/3/3/3/3/3** — cenário/equipe/hospedagem, condições de execução, tabela de responsabilidades, contrato divergente, ADR com consequências e mudança de contexto exigem transferência sem ranking universal. Rubrica projeto: **3/3/2/3/3/3/3** até corrigir fidelidade dos rótulos da rubrica curricular; sequênciavertical/READMEinstalação/estadoapóserro e evidência semalegar execução são adequados. Não houve benchmark, aluno real, deploy ou instalação terceira pessoa nesta revisão.

### Reconferência final dos quatro alinhamentos

Correções lidas no código/MDX/exercícios: CLI aceita terceiro termo (defaultvazio), retorna{total:items.length,items}, rejeita caminhos resolvidos iguais e distingue trecho comapi fixo; Nest usa @Res({passthrough:true}) para Location dinâmico mantendo retorno serializado; exercício8 usa POSTinválido e marcaPATCHextensão; exercício6 marcaPATCH/DELETEextensões; projeto usa rótulos curriculares exatos. A comparação foi atualizada para três referências comLocation e mantém divergências400/422/extras explicitadas.

Fonte primária adicional lida: [Nest Controllers — Routing e Library-specific approach](https://docs.nestjs.com/controllers#library-specific-approach), especialmente padrãoPOST201, serialização de objetos e passthrough para conservar processamento padrão ao ajustar headers. Classificação da nova explicação de Location: **Verificada**, docs12/código/testeHTTP.

Reexecução independente após correções: `npm test` em cada projeto, Node24.21.0/TypeScript5.9.3, todosstatus0: Node **3/3** (943msrunner), Express **1/1** (548ms), Nest **2/2** (1159ms). Node suíte agora compara filtroapi=1/all=2 e saída conformecontrato; Nest confereLocation. Compilação estrita executada nos três. Não extrapolar6testes a garantia universal.

As quatro lacunas médias de contratos/rubrica estão **validadas** por releitura e ensaios pertinentes. Notas finais de projeto sobem para **3/3/3/3/3/3/3**; decisao mantém3nas sete dimensões. Sete opcionais também3em todas dimensões após correções já registradas. Exercícios2/4/6/8 agora têm contrato/proposta/casos coerentes no recorte revisado; avaliam efeitos e justificativa, não só reprodução textual.

**Estado final deste escopo independente:** sete opcionais e duas aulas integradoras revisadas, fontes primárias consultadas diretamente e seis testes dos projetosNode/Express/Nest passaram; sem bloqueante técnico/pedagógico demonstrado nos conceitos inventariados. Pendências honestas: debuggerGUI/CLIgerador/Octane/produção não executados; guards/interceptors conceituais sem auth; CORSbrowser real não ensaiado nesta subauditoria; benchmark/desempenho/Unicodecomparativo amplo não medidos; PHP/Laravel não reexecutado por este revisor, coberto separadamente. UI/MDX global e progresso são responsabilidade das verificações integradas, não certificadas por este relatório.
