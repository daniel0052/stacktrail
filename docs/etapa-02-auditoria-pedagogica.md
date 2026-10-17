# Etapa 02 — auditoria pedagógica com stacktrail-educator

Data: 15/10/2026. Escopo: 12 aulas e nove exercícios da Etapa 02. Etapas 00/01, rotas, IDs, política de progresso e layout dos componentes preservados. Alterações de modelo limitadas a discrepâncias semânticas que comprometiam o ensino; não houve criação de backend ou integração externa.

## Método e fonte curricular

Skill local: [.codex/skills/stacktrail-educator/SKILL.md](../.codex/skills/stacktrail-educator/SKILL.md), criada com skill-creator e validada pelo quick_validate. Inclui rubrica de material (sete dimensões 0–4), gate sem compensação por média, checklist de publicação e revisão por agente independente. A rubrica curricular do estudante continua 35/20/25/20.

Currículo original: página Notion [Etapa 02](https://app.notion.com/p/3f63cadfab7781398a71cedc5c4a3994), consultada integralmente via MCP nesta auditoria pelo autor e revisor. Payload com oito seções e fechamento de conteúdo/página; sem truncamento, blocos desconhecidos ou páginas filhas/paginação indicados. A página informa última edição em 11/10/2026 e verificação Notion `unverified`; essa flag não é validação técnica do material.

**Derivado do currículo:** cinco grupos de competências, sequência, sete métodos, tópicos HTTP/rede/REST/ferramentas/Git, nove exercícios, avançados opcionais, rubrica e critérios de conclusão. **Elaboração didática própria:** casos da biblioteca, mensagens fictícias, roteiros de investigação, critérios das microatividades, dicas/feedback, recortes dos simuladores. **Ampliações técnicas:** comparações HEAD/index, origem/site, UTF-8/compressão, YAML introdutório, diferenças de protocolos e métodos, apoiadas nas fontes indicadas por assunto. Não foram atribuídas ao Notion as políticas locais de contagem ou aprovação.

## Lacunas apresentadas antes de editar

A comunicação ao usuário antecedeu as correções. A leitura inicial e o agente independente identificaram:

1. Exemplos conceituais sem configuração, previsão, resultado esperado e interpretação completos; atividade de uma frase não avaliava transferência.
2. Bruno/Postman e ambientes externos exigidos sem ponte de entrada: criar coleção/environment, testar, interpretar falha e recuperar configuração.
3. Variável local/exportada, PATH, codificação/compressão e OpenAPI citados com profundidade insuficiente.
4. DNS/TLS/Git sem percurso de diagnóstico ou colaboração suficientemente reproduzível; número de latência citado sem existir no visualizador.
5. Pré-requisitos e referências genéricos em todos os exercícios, sem ambiente específico ou alternativa de indisponibilidade.
6. `git restore` do modelo apagava staging e voltava a HEAD; cURL simulado podia sobrescrever `-X GET` dependendo da ordem. A execução da nova sequência ainda revelou `tail` com linha final incorreta. O revisor apontou também expansão indevida de variável entre aspas simples.

Rubrica inicial independente, ordem A=alinhamento, P=pré-requisitos, T=precisão/fontes, E=explicação/exemplos, V=prática/avaliação, U=autonomia, R=reprodutibilidade:

| Aula | A/P/T/E/V/U/R antes | Principal evidência de insuficiência |
| --- | --- | --- |
| urls | 3/3/2/3/2/3/3 | Sem transferência com critério. |
| metodos | 3/3/2/2/2/3/3 | Contrastes bons, ensaio incompleto. |
| mensagens | 2/3/2/2/2/3/3 | Codificação e compressão nominais. |
| estado | 3/3/2/2/2/3/3 | Sessão e ETag sem percurso completo. |
| cors | 3/3/2/2/2/3/3 | Prática sem headers/esperado definidos. |
| redes | 3/3/2/2/2/3/3 | Faltava diagnóstico de situação nova. |
| tls | 3/3/2/2/2/3/3 | Sinais insuficientes para discriminar hipóteses. |
| rest | 3/3/2/2/2/3/3 | OpenAPI sem documento comparável. |
| shell | 2/2/2/2/2/3/3 | PATH/exportação sem experiência. |
| curl | 1/2/2/2/1/2/2 | Ferramentas externas cobradas sem ensino. |
| git | 3/3/1/2/2/3/3 | Restore contradizia staging/index. |
| colaboracao | 3/3/2/2/2/3/3 | Sem fluxo real de PR demonstrado. |

T=2 inicialmente também registra que o revisor não havia validado documentalmente todo o conjunto; não é acusação de erro em todas as aulas. Nenhuma aula estava pronta pelo gate inicial.

## Matriz curricular e alterações

| Currículo/objetivo | Pré-requisito observável | Aula e exemplo aprofundado | Evidência/prática de aprendizagem |
| --- | --- | --- | --- |
| URL e mensagem | Abrir navegador/barra de endereço | urls: query, página vazia, detalhe inexistente, fragmento e Network | Prever dois caminhos; propor busca nova e justificar partes enviadas. |
| Métodos, segurança/idempotência | Separar mensagem/endereço | metodos: PATCH parcial, PUT completo, DELETE repetido | Comparar estado e resposta; transferir para incremento versus definição. |
| Status, headers, JSON/MIME, codificação/compressão | Justificar leitura/criação | mensagens: 400→422→201, 415; UTF-8 e codificação de conteúdo | Corrigir só um campo; comparar HEAD/DELETE e propor diagnóstico de gateway. |
| Cookies/sessão/cache | Ler direção de headers e status | estado: sem sessão→login→acesso→logout; ETag velho/novo | Diferenciar invalidação e cookie; justificar política de cache privado. |
| CORS, preflight, rede/timeout/retry | Distinguir origem e estado | cors: mensagens OPTIONS/principal, cenário autorizado, falhas | Prever preflight; separar sinal/hipótese; investigar cURL versus browser. |
| DNS, IP, portas, TCP/UDP | Extrair host/porta; reconhecer HTTP | redes: A/AAAA/CNAME, cache, porta; percurso por camada | Diagnosticar três falhas e transferir para clientes com IPs diferentes. |
| TLS, HTTP/2/3, proxy/balanceador/CDN | Separar resolução e conexão | tls: nome incorreto, terminação TLS, cache hit/miss | Distinguir identidade/autorização; formular hipótese de 200 com app fora. |
| Recursos, contratos, REST/RPC, OpenAPI | Métodos/status/cache | rest: cinco operações, contrato textual equivalente, YAML versionado | Erro e paginação próprios, RPC e resposta de erro no OpenAPI. |
| Shell, arquivos, pipes, ambiente/permissões | Arquivo/pasta, digitar uma linha | shell: sequência virtual completa, Bash export/processo, PATH/640 | Preservar/substituir arquivo; interpretar stdin; diagnosticar herança. |
| cURL, coleções/environments/testes | Shell e mensagens/CORS | curl: opções comentadas, Bruno, teste falhando, alternativas | Comparar mensagens equivalentes, recuperar coleção, explicar divergência. |
| Git/index/commits/branches/segredos | Arquivo de prática e terminal | git: A preparado/B editado, restore, repositório local | Evidenciar três snapshots, pai e troca de contexto. |
| Merge/rebase/conflitos/remotos/PR | Git local da aula anterior | colaboracao: divergência, resolução, remoto vazio, push e PR consciente | Comparar pais/IDs; registrar revisão real ou pendente. |

Os nove exercícios mantêm IDs e critérios de conclusão. Seus pré-requisitos e referências agora são específicos. Cada orientação distingue ambiente local/externo, prevê evidência de hipótese versus observação e inclui teste de transferência. Ex. 08 explicita que POST 200 não é universalmente inválido. Ex. 06 oferece cookie fictício de eco e esclarece que isso não implementa sessão autenticada nem demonstra atributos ausentes. O estudante não ganha conclusão por abrir a aula.

## Matriz de fidelidade dos simuladores

| Operação/conceito real | Comportamento do modelo | Diferença comunicada/ação | Teste de transferência |
| --- | --- | --- | --- |
| restore padrão: index→working tree | Usa staging ou HEAD quando nada preparado | Corrigido para preservar staging; index real é snapshot completo, “vazio” é simplificação | A→add→B→restore→commit registra A. |
| diff padrão e --staged | Mostra três textos no mesmo painel | Aula distingue patch real de comparação didática | Escolher qual comparação responde a “o que vou registrar?”. |
| cURL -X e dados | Método explícito vence seleção automática | Corrigida dependência da ordem | -X GET antes/depois de -d/--json conserva intenção. |
| Aspas simples/duplas e $VAR | Expande somente fora das simples | Corrigido; não é parser Bash completo | JSON com $ literal versus echo com aspas duplas. |
| head/tail | Lê linhas virtuais | Corrigida quebra final contada como linha vazia | Sequência publicada termina com tail mostrando GET. |
| PATH, exportação e processos | Lista permitida e mapa único env | Não procura executáveis nem cria filhos; contraste externo em Bash | Prever herança antes/depois de export e distinguir PATH/permissão. |
| Cookies/sessão | Cookie manual e sessão booleana | Não aplica SameSite/expiração/domínio no browser; não autentica Bearer | Identificar o que falta observar fora do modelo. |
| ETag/cache | Revisão global do mock | Sem validadores reais por representação/CDN/compressão | Justificar body guardado em 304 e cache privado. |
| DNS/TLS/QUIC/latência | Percurso HTTPS/TCP conceitual | Sem pacotes, medições ou DNS real; tempos numéricos não existem | Propor evidência externa por camada. |
| Contrato/OpenAPI | Checagem de uma operação e JSON local | Não executa uma API proposta nem certifica OpenAPI/REST | Separar proposta, teste local e implementação externa. |
| Merge/rebase/remoto/PR | Um arquivo, histórico linear de rebase e remoto fictício | Limites e ponte explícita para GitHub real | Comparar pais/IDs e manter publicação externa pendente. |

## Registro de fontes

Consultadas em 15/10/2026. URLs por aula também aparecem ao final dos MDX. Foram usadas as seções pertinentes, sem alegar leitura integral de todos os manuais. Fontes suportam o modelo técnico; os cenários e textos são elaboração original.

| Fonte consultada | Seções/afirmações apoiadas |
| --- | --- |
| [MDN URI reference](https://developer.mozilla.org/en-US/docs/Web/URI/Reference) | Componentes e interpretação de URI; urls. |
| [RFC 9110 texto](https://www.rfc-editor.org/rfc/rfc9110.txt) | 9.2/9.3 métodos, 13 condicionais e 15 status; segurança/idempotência não exigem respostas idênticas. |
| [MDN Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) e [Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) | Semântica dos sete métodos e distinções de status; ausência de body e próximos testes. |
| [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259.txt) e [MDN Compression](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Compression) | JSON como dados, UTF-8 e codificação de conteúdo versus tipo lógico. |
| [MDN Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies) e [Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching) | Direção/atributos/escopo, no-cache/no-store, ETag/If-None-Match e 304. |
| [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) | Preflight, credenciais, origem explícita e bloqueio de leitura; não autenticação. |
| [Cloudflare DNS](https://www.cloudflare.com/learning/dns/what-is-dns/), [MDN TCP](https://developer.mozilla.org/en-US/docs/Glossary/TCP) e [UDP](https://developer.mozilla.org/en-US/docs/Glossary/UDP) | Resolução/cache e distinções de transporte. |
| [MDN TLS](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Transport_Layer_Security) e [Evolution of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP) | Identidade e proteção em trânsito, HTTP/2/3; não autorização de usuário. |
| [Fielding 5.1](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) e [OpenAPI 3.1.1](https://spec.openapis.org/oas/v3.1.1.html) | Restrições REST, diferença de sessão e recursos; paths/parameters/responses/schema do exemplo versionado. Não foi alegado que 3.1.1 seja a versão mais recente. |
| [Obtenção cURL](https://curl.se/download.html) e [instalação Bruno](https://docs.usebruno.com/get-started/bruno-basics/download) | Preparação externa por fontes oficiais; nenhuma instalação realizada. |
| [curl manual](https://curl.se/docs/manpage.html) | -i/-I/-X/-H/-d/--json/-v/--fail-with-body/-o/-w; método explícito e ausência de validação JSON por --json. |
| [Bruno Collection](https://docs.usebruno.com/get-started/bruno-basics/create-a-collection), [Request](https://docs.usebruno.com/get-started/bruno-basics/create-a-request), [Environment](https://docs.usebruno.com/variables/environment-variables) e [Test](https://docs.usebruno.com/get-started/bruno-basics/create-a-test) | Fluxo documentado e API test/res; não foi executada UI do Bruno. URLs .md e um caminho antigo falharam; páginas HTML atuais foram recuperadas. |
| [Linux Command](https://linuxcommand.org/lc3_learning_the_shell.php) e [Permissions](https://linuxcommand.org/lc3_lts0090.php) | Referência técnica adicional para shell e notação de permissões. A introdução é índice, não foi tratada como manual completo de comandos. |
| Ajuda instalada Bash: `help export`, `help type` | Semântica de exportação e resolução. GNU web não recuperado por timeout; substituição explicitada no MDX e contrastada por execução Bash local. |
| [Pro Git branches](https://git-scm.com/book/pt-br/v2/Ramifica%C3%A7%C3%A3o-Branching-no-Git-Branches-em-Poucas-Palavras) e [merge](https://git-scm.com/book/pt-br/v2/Ramifica%C3%A7%C3%A3o-Branching-no-Git-Ramifica%C3%A7%C3%A3o-Branching-e-Mesclagem-Merging-B%C3%A1sicas) | Snapshots, referências e conflito; diferenças do modelo de arquivo único. |
| Manuais Git [restore](https://git-scm.com/docs/git-restore), [rebase](https://git-scm.com/docs/git-rebase/pt_BR), [fetch](https://git-scm.com/docs/git-fetch), [pull](https://git-scm.com/docs/git-pull), [merge](https://git-scm.com/docs/git-merge) e [ignore](https://git-scm.com/docs/gitignore) | Origem/destino de restauração, integração, remoto e arquivos já rastreados. |
| [GitHub Creating a PR](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request) | Base/origem/diff, draft e revisão; publicação real não executada. |
| [Chrome Network](https://developer.chrome.com/docs/devtools/network/) | Abrir antes de recarregar e inspecionar headers/conteúdo por chamada. |
| [httpbin](https://httpbin.org/) e [httpbingo](https://httpbingo.org/) | Serviço de eco, endpoints alternativos e opção documental de httpbin local; não foram executados os POST/cookies de prática ou Docker. |

## Revisão independente final

Revisor: subagente `pedagogical_audit`, em leitura separada do autor, sem editar arquivos. Recebeu skill, currículo e artefatos; a primeira passagem não recebeu um veredito esperado. A segunda passagem releu as 12 aulas, nove exercícios e modelos, verificou seções das fontes e executou regressões de exemplos/Git/terminal: três arquivos e 13 testes passaram. Não executou navegador, suíte completa ou integrações externas.

Veredito: as 12 aulas atingem **3/4 em cada uma das sete dimensões** no escopo introdutório; nenhum bloqueante técnico/pedagógico remanescente identificado. Não foi atribuído 4: transferência ainda é predominantemente documental e não houve aplicação com estudantes reais. Essas notas avaliam o material e não garantem aprendizagem ou correção universal.

| Aula | A/P/T/E/V/U/R depois | Evidência que sustenta o patamar adequado |
| --- | --- | --- |
| urls | 3/3/3/3/3/3/3 | Busca acompanhada, vazio × ausente, Network e URL nova. |
| metodos | 3/3/3/3/3/3/3 | PATCH/PUT, consulta do estado e incremento × atribuição. |
| mensagens | 3/3/3/3/3/3/3 | 400→422→201, representação/compressão e diagnóstico 502. |
| estado | 3/3/3/3/3/3/3 | Sessão/reuso, ETag antigo e cache privado. |
| cors | 3/3/3/3/3/3/3 | Preflight e resposta principal, comparação cURL/browser. |
| redes | 3/3/3/3/3/3/3 | Registros/porta, três falhas e clientes com IPs distintos. |
| tls | 3/3/3/3/3/3/3 | Identidade/terminação, cache hit e hipótese de CDN. |
| rest | 3/3/3/3/3/3/3 | Cinco operações, OpenAPI comentado e transferência RPC. |
| shell | 3/3/3/3/3/3/3 | Arquivos/stdin, export/processo/PATH e limites reais. |
| curl | 3/3/3/3/3/3/3 | Coleção/teste com falha, environment e indisponibilidade. |
| git | 3/3/3/3/3/3/3 | Três snapshots, restore e roteiro local de branch. |
| colaboracao | 3/3/3/3/3/3/3 | Conflito, merge/rebase, remoto e PR com evidência. |

As duas sugestões menores finais foram incorporadas: links de obtenção oficial de cURL/Bruno e vínculo explícito do critério das cinco operações ao exercício biblioteca. O revisor recomendou documentar a matriz de fidelidade, incluída acima. O terminal continua deliberadamente limitado; não foi certificado como implementação de Bash.

## Verificações finais

- `python3 .../skill-creator/scripts/quick_validate.py .codex/skills/stacktrail-educator`: válido, inclusive após os ajustes sugeridos pelo revisor. Valida formato/metadados/scaffold, não qualidade pedagógica por si só. O uso real na auditoria e as duas passagens independentes complementam essa validação.
- `npm run typecheck`: passou. `npm run lint`: passou. `npm run build`: passou. Aviso de pacote principal 557,32 kB minificado (173,68 kB gzip); não foi feita otimização de carregamento neste escopo.
- `npm test -- --maxWorkers=4`: **257 testes passaram em 26 arquivos**. Inclui etapas anteriores, migrações/progresso, renderização de 12 MDX e novos casos semânticos. Após o ajuste estritamente apresentacional da tabela REST, build e os 12 testes de renderização foram repetidos e passaram.
- Novas regressões: restore preserva staging; método explícito do cURL prevalece independentemente da ordem; aspas simples preservam variável; os exemplos HTTP distinguem página vazia/ausente, sintaxe/validação/criação, sessão/cache; execução da sequência de shell publicada; contrato textual equivalente e 204 sem body. A sequência da aula falhou inicialmente no tail com quebra final, revelando o defeito corrigido. Uma tentativa de importar MDX como texto no teste foi substituída por leitura do arquivo via módulo real, pois o plugin MDX transformava a importação raw.
- Bash real: a sequência `TEMA=HTTP`, filho `bash -c 'printenv TEMA'`, `export TEMA`, novo filho confirmou herança somente após export. Foi usada ajuda instalada, sem inspeção/publicação de variáveis pessoais.
- Git real: o roteiro publicado de init/config local/snapshots/branches foi executado em diretório temporário; a aula seguinte gerou conflito e a resolução produziu commit com dois pais. Ensaio A→add→B→restore confirmou working tree A e index A. Nenhum remoto configurado, push ou commit no repositório StackTrail foi realizado. O diretório temporário foi descartado ao concluir.
- Navegador: build estático servido em localhost sob `/stacktrail/`; 12 aulas carregaram com referências e ferramentas, sem erros JavaScript capturados. Tabela REST conferida em largura ampla e 390 px; em fonte 150% foi detectado overflow e corrigido com região nomeada e rolável localmente por teclado, sem mudar o CSS global. Após correção, largura do documento 375 px para viewport 390 px; ArrowRight deslocou a região local (scrollLeft 8). Fonte e viewport foram restaurados.
- Navegador: terminal da aula confirmou `export TEMA=HTTP` e `echo '$TEMA'` retornando `$TEMA` literal; feedback em details abriu. Evidência visual em `screenshots/etapa-02-auditoria-curl.jpg`. Assets de HTML e base sem duplicação foram conferidos. Servidor local de prévia encerrado após a conferência.
- `git diff --check`: sem problemas de whitespace. Nenhuma dependência adicionada. Componentes de interface, rotas e IDs não foram substituídos; a mudança visual limita-se a permitir rolagem da nova tabela de conteúdo.

## Checklist de prontidão local

- [x] Currículo integral e matriz de objetivos/pré-requisitos/evidências.
- [x] Autoria e ampliações distinguidas; fontes lidas registradas por assunto e falhas de acesso explícitas.
- [x] Exemplos explicados e verificáveis, contraste e transferência com critérios; resultados esperados não confundidos com observados.
- [x] Ambientes externos com preparação, alternativa e pendência honesta quando não disponíveis.
- [x] Dicas graduais dos nove exercícios preservadas; feedback das microatividades após tentativa por details; não há envio automático a IA.
- [x] Revisão independente, notas ≥3 por dimensão/aula e bloqueantes identificados corrigidos e conferidos.
- [x] Renderização, testes, verificações estáticas e build executados; layout novo amplo/estreito e teclado conferidos.
- [x] Limites e pontos não verificados publicados abaixo. Checklist indica prontidão do material no recorte; não autoriza deploy nem comprova execução externa do aluno.

## Limitações e pontos não verificados

Não foram executados Bruno/Postman, POST/cookies reais em httpbin/httpbingo, Docker, DNS/TLS de laboratório externo, envio ao GitHub ou abertura/revisão de PR. Esses procedimentos foram verificados documentalmente; sua disponibilidade e comportamento no dispositivo do estudante permanecem dependentes do ambiente. A prática externa continua exigindo evidência própria. O YAML OpenAPI foi revisado/renderizado, mas não passou por validador completo de especificação. Não há avaliação automatizada dos textos de transferência nem teste empírico de aprendizagem com estudantes. A revisão independente é uma revisão por agente, não certificação humana de especialista. Não foi feita auditoria completa de acessibilidade/leitor de tela/contraste. O terminal e demais modelos não implementam todas as combinações reais aceitas pelos programas externos. Nenhum compromisso de correção universal foi atribuído a testes finitos ou à rubrica.

As únicas pendências são validações externas e empíricas explicitadas, fora do recorte da auditoria local; não são apresentadas como verificadas. A Etapa 02 atende ao patamar local de prontidão definido pela skill para conteúdo introdutório. O uso das ferramentas reais e a conclusão de competências do estudante continuam separados dessa decisão.

## Reconciliação atual —16/10/2026

Na fase7 da auditoria global, o currículo foi novamente lido integralmente via MCP, e o revisor independente releu os12MDX, nove exercícios e modelos pertinentes. As notas atuais permanecem3/4 em cada dimensão por aula, com as evidências da matriz acima reconferidas nos arquivos. Nenhum bloqueante pedagógico novo identificado; isso não reutiliza os antigos resultados de navegador como prova atual.

O revisor executou novamente seis arquivos de regressão (HTTP,contratos,rede,terminal,Git,exemplos publicados):21testes passaram. Conferiu restore preservando staging, método explícito cURL, aspas simples, tail, distinção HTTP/rede/CORS e ausência de body emHEAD/204/304. Não executou UI ou serviços externos nesta passagem.

A cobertura nova de navegador é registrada em QUALITY_AUDIT.md:50/50combinações de25rotas×2temas,375px/fonte150 passaram. Estados operacionais dos cinco simuladores e restante da matriz global são registrados separadamente. Bruno/Postman,GitHub,DNS/TLS reais e aprendizagem com estudantes continuam não verificados; não foram convertidos em conclusão automática.

## Reconferência técnica independente posterior

As notas e conclusões acima registram a revisão pedagógica daquela passagem;
não equivalem à aprovação técnica independente de cada afirmação. A auditoria
posterior com stacktrail-factchecker está em
[CONTENT_VERIFICATION.md](CONTENT_VERIFICATION.md), com fontes diretamente
consultadas, contraexemplos, correções e pendências por conceito. Em caso de
divergência, use a evidência técnica mais recente no escopo e versão registrados,
sem apagar o histórico nem presumir que o build valide o conteúdo.
