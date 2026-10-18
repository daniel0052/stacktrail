> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](README.md) e o [estado atual](../README.md). Resultados antigos não validam automaticamente a plataforma atual.

# Etapa 04 — APIs REST e regras de negócio

## Escopo e autoria — 17/10/2026

Pedido em anexo autoriza corrigir classificação03 e implementar04;05–19 preservadas. Notion03/04 lidos integralmente via MCP (páginas3f63cadfab7781ad9194c805b33198d8 e3f93cadfab778124be15ccb6e9a82199), respostas com fechamento completo, sem filhos/paginação pendentes. Objetivos REST/regras seguem original; paridade PHP/JS e12tipos de exercício são ampliação explícita do usuário. API/projeto/laboratórios são elaboração didática original.

## Lacunas antes da correção

- Filtro03 incluía `extra` para PHP e JS: aulasNest e exercícioNest vazavam paraPHP. Causa emcurriculum/App/Lab/StageThree, nãoCSS.
-04 só tinha metadados indisponíveis; nenhuma aula, exercício, modelo, critério ou projeto.
- Original04 centraLaravel; pedido atual exige equivalênciaExpress. Conclusão não pode exigir segunda stack, Nest ou aprofundamentos opcionais.
- Fake em memória dePHP não conserva estado entre requisições tradicionais. Material deve explicar armazenamento temporário compartilhado e seus limites.

## Plano e estado real

- [x] Inspeção, três skills/referências, currículo, auditoria anterior e plano apresentados.
- [x] Filtro03 corrigido; sete testes direcionados e fluxo visual de troca/reload passaram.
- [x] Estrutura04, navegação e migração compatível.
- [x] 15 aulas: nove comuns/integração e três por trilha, com inventário e renderização conferidos.
- [x] 24 atividades: duas comuns, dez por trilha e um projeto por trilha; dois aprofundamentos por percurso fora do gate.
- [x] LaboratóriosAcontratos/Bvalidação/Creservas/DOpenAPI, com limites explícitos.
- [x] Projetos locaisLaravel/Express reproduzíveis, locks, testes eOpenAPI.
- [x] Revisão pedagógica independente, verificação técnica independente eUI/UX.
- [x] Testes, documentação echecklists finais coerentes com evidência.

## Decisões

Preferência backendTrack03 é compartilhada com04 para evitar divergência. Registros03 mantêm IDs/chave; versão 8 acrescenta evidências/notas04 por trilha, preservando migrações1–7. Aulas comuns04 lidas uma vez; atividades específicas, projeto ecompetências independentes. Percentual global considera maior percurso; concluir um basta. Notas/rubrica são declaradas, não avaliação automática.

yaml é dependência de desenvolvimento necessária ao parser real no laboratório; SwaggerParser valida estruturalmente o contrato de referência nos testes, fora do bundle do laboratório. Análise do navegador é deliberadamente parcial, sem resolver refsremotos. Não chamar visualização de certificação.

## Pendências futuras fora do escopo

05–19 ainda requerem neutralização de objetivos/rubricasLaravel para percursoJS, especialmenteORM05,testes06,segurança07/operação08 eprojeto09. Critérios10/12/14 precisam harmonizar opcionais conforme auditoria. Nenhuma dessas etapas foi implementada/modificada nesta tarefa.

## Mapa curricular por módulo

| Módulo | Aulas / prática | Evidência esperada |
| --- | --- | --- |
|1design |recursos,metodos,contratos;atividades01/02 |Cincoendpoints, métodos/status, headers/JSON/datas econtraprovas |
|2implementação |laravel-api ouexpress-api;03/05 |CRUD,representação eLocation; saída interna não exposta |
|3regras |invariantes e*-regras;04/07 |Validação antes de mutar;passado/conflito/cancelamento;relógio controlado |
|4coleções |colecoes e*-consultas;06/08 |Filtros→ordem→página,total e testesHTTP discriminantes |
|5erros |problemas;09recomendado |Compreensão9457obrigatória; adaptação completa não bloqueante |
|6integrações |integracoes;11 opcional |Timeout≠ausência de efeito; riscos de repetição sem redeexterna |
|7documentação/integração |openapi,projeto;10/12/projeto |OpenAPI/README/código/testes/ADR em uma stack |

Cada percurso tem12 aulas,13 atividades disponíveis (11 obrigatórias,1 recomendada,1 opcional), incluindo integrador. Fundamentos/atividades comuns não são duplicados entre stacks. Não exigir duas versões daAPI.

## Auditorias e correções

Educator: revisão independente leu15MDX,24 atividades eNotion04; primeira passagem reprovou exemplos desconectados/critérios genéricos. Foram acrescentados fluxos verticais, exemploslegíveis com interpretação, pré-requisitos específicos, traço de coleção econtrato OpenAPI completo. Última passagem atribuiu3/4nas dimensões pedagógicas portodas15 aulas, sembloqueante no recorte. Precisão/reprodutibilidade foram verificadas separadamente porfactchecker eexecução, não por essa nota.

Factchecker: fontes normativas/frameworks consultadas diretamente; corrigidos filtros cruzados,/slots/1,Unicode,refs não verificadas,schemasdesaída,mídiasdeerro e notevaziaPHP. Revisor executouExpress/PHP/modelo/SwaggerParser independentemente e reconferiu correções, sem novo bloqueante no recorte. Não houve auditoria de segurança/carga/concorrência exaustiva.

UI/UX: revisão independente encontrou classificações enganosas, consulta alternativa fora da sequência, integrador antecipado, orientação incompleta eperda de rascunhos. Corrigidos emdados/componentes; testesdenavegador e inspeção visual complementam revisão estática. Evidências emQUALITY_AUDIT.

## Ambientes e limites operacionais

Chromium via Playwright1.64.1; Node 24.21.0,TypeScript 5.9.3,Express 5.3.0,Zod 4.6.7;PHP 8.5.4,Laravel 13.37.0,Composer 2.10.3,PHPUnit 12.5.40. PHP não estava noPATH; usado runtime temporário já disponível em/tmp, sem instalação global. OlockPHP exige8.4.1 por dependências Symfony, embora o framework aceite 8.3; README explicita. Tentativasnpm/Composer semrede falharam porDNS; downloads autorizados passaram e não foram descritos como sucessosoffline.

Bancada browser usaJavaScript; PHPtestado pelokernelLaravel/PHPUnit e tambémHTTPloopback; Express usaHTTPloopback real. Nenhum código colado pelo estudante é executado. Oinspetor OpenAPI não resolve referências/parâmetros complexos: sinaliza não verificado. SwaggerParser valida estrutura do documento de referência; isso não demonstra correspondência de todas as respostas da tentativa.

Rascunhos locais doslaboratórios têm namespacepor contexto fora daexportaçãoglobal; rascunhos/exercícios/notas/leituras04 fazem parte do esquema v8. Estadofictício das reservas reinicia ao sair/reiniciar bancada; somente requisição/contrato são preservados. Não há sincronizaçãoentre dispositivos nemenvioautomático aIA.

## Validação final efetivamente executada

| Verificação | Resultado e cobertura |
| --- | --- |
| `npm run typecheck` | Passou; `npm run build` também executou TypeScript estrito na versão final. |
| `npm run lint` | Passou, incluindo os testes novos. |
| `npm test -- --maxWorkers=2` |400 testes em39arquivos passaram numa rodada completa. Houve rodada anterior com4workers+browser/build concorrentes:399/400 e timeout5s emteste antigo doeditor; repetição com2workers passou sem alterar/ignorar esse teste. |
| MDX/modelo após sincronizar último exemploExpress |22 testes direcionados passaram:15renderizações+inventário e6regressõesREST/progresso/OpenAPI. |
| Regressão03 |7testes passaram; contraprovas adicionais conferem ausência de exercíciosNest/Express no percursoPHP. |
| `npm run build` |Passou com base `/stacktrail/`. Aviso de pacote principal≈825KBminificado; não é erro dobuild. |
| Express04 `npm test` |TypeScript estrito e2testes passaram, incluindoHTTP real emloopback comCRUD/queries/parser/validação/reservas/cancelamento eestado após rejeição. |
| Laravel04 `composer test` |5testes/32asserções passaram pelo kernelLaravel, incluindo notevazia≠null. Mesmo resultado após formatação do código. |
| Laravel04 via servidor local |10requestsHTTP reais comPythonurllib passaram:slots200;criar201/Location;duplicar409;input422;consultar200;cancelar204/repetir204;queryinválida422;buscavazia200;JSONquebrado400. Isso não é captura de produção nem alegação de cURL executado. |
| ZIPs extraídos em pastasnovas |Node:npmci offlinecomcache +2testes passaram. PHP:composerinstallcomcache/rede desabilitada +5testes/32asserções passaram. Conteúdo atual dosZIPs comparado byteabyte aos arquivos extraídos/testados, semvendor/node_modules/.env/dados de sessão. |
| Navegador, rodada ampliada |16/17cenários passaram:seleção/reload03→04,laboratórios,10combinações de largura/tema,15aulas,teclado/fonte evarredura global00–04nosdoistemas. Um cenárioaxe768pxescuro foi interrompido por destruição decontexto; não declarar17/17nessa rodada. |
| Reconferência isolada |Layout768pxescuro efluxo doslaboratórios passaram2/2. Testes degatePHP/JS tinhamfixture sobrescrita pela sessão aberta; carregarfixture antes de navegar resolveu:2/2passaram. Conclusão deuma trilha preservada ao trocar/recarregar; opcionais ausentes. |
| Zoom real |2cenários passaram,nosdoistemas, com200/400% em aula, laboratório eautoavaliação; medidos fatorChrome,viewport eDPR. |
| Axe/reflow de todas as rotas04 |86registros(43rotas×2temas),0violações detectadas.2casos de teste completaram. Há incompletoscolor-contrast:ícones/símbolos eelementos fora daárea visível do scroll da sidebar; não foram convertidos emaprovação automática. |
| Contraste/foco complementares |2cenários passaram comcorescomputadas ecomposiçãoalpha, nosdoistemas:botão normal/hover/teclado,controles,seleção eitemdasidebar trazido paraáreavisível. Primeiroensaio de focus programático foi corrigido paraShiftTab/Tab, que ativa modalidade de teclado/:focus-visible. |
| Exportação/diálogo |Download real deopenapi.yaml,abertura do promptcomrubrica04,Escape eretorno de foco passaram. |
| Build estático |43rotas04,2downloadsZIP comassinaturaPK efavicon `/stacktrail/favicon.svg` passaram empreviewlocal. Não édeploy noGitHubPages. |

As contagens são registros desta execução, não garantias permanentes. Algumas rodadas foram interrompidas por reload/contexto efixture; foram explicitamente investigadas e reconferidas, sem excluir regrasaxe ou afrouxar critérios de produto. Ferramentas geram artefatos descartáveis emtest-results/playwright-report; logs de trabalho foram mantidos em/tmp durante a implementação.

## Checklist final e limitações

- [x] Objetivos originais mapeados, ampliações identificadas e limites05–19 preservados.
- [x] Pré-requisitos observáveis, exemplos trabalhados, transferência, critérios específicos e dicas graduais.
- [x] Revisões independentes pedagógica/técnica/UI registradas e achados demonstrados corrigidos/reconferidos.
- [x] Rubrica pedagógica≥3/4por dimensão pedagógica; precisão/reprodutibilidade sustentadas separadamente pelas fontes e execuções do recorte. Nenhum bloqueante demonstrado permanece nesse recorte.
- [x] Leituras comuns únicas; qualquer trilha suficiente; progresso importável/exportável epreferência preservados.
- [x] Renderização, tipagem, lint, testes, build efluxos/contraste/reflow/zoom pertinentes executados.
- [x] README, AGENTS, CONTENT_VERIFICATION eQUALITY_AUDIT atualizados com estado real.

Não verificados:WCAG completa,tecnologiasassistivas/dispositivos físicos,aprendizagem de estudantes,segurança/carga exaustiva,produção,concorrência multiprocesso,integrações externas reais ecorreção do código do estudante. A simulação não executa PHP/Node; OpenAPIlocal éanáliseparcial; evidências/notascontinuam declarações. Agenda/relógio sãofakes explícitos. Não houvepush,deploy,commitoumodificação doNotion.
