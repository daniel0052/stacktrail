> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](../README.md) e o [estado atual](../../README.md). Resultados antigos não validam automaticamente a plataforma atual.

# Verificação técnica independente — Etapa 02

Consulta e execução: **16/10/2026**. Revisor: subagente `factcheck_02`, separado do autor das correções. Aplicadas `stacktrail-factchecker` e `stacktrail-educator`. Esta revisão não alterou apresentação; não substitui a auditoria UI/UX.

## Escopo e método

Lidos os 12 MDX em `src/content/stage-02/lessons/`, inventário, nove enunciados com dicas/roteiros, modelos `http`, `contracts`, `network`, `terminal`, `git`, componentes HTTP/contratos e testes pertinentes. O currículo foi recuperado diretamente pelo MCP Notion: [Etapa 02](https://app.notion.com/p/3f63cadfab7781398a71cedc5c4a3994), oito seções completas, fechamento da página presente, sem filhos/paginação/truncamento indicados. Última edição informada: 11/10/2026. A flag Notion `unverified` não é prova técnica.

**Currículo:** competências, sequência e nove entregas. **Elaboração StackTrail:** biblioteca, comandos de estudo, roteiros, dicas e modelos locais. **Ampliação verificada:** particularidades normativas e de versões indicadas abaixo. Notion e relatórios anteriores não foram usados como prova técnica. As fontes foram abertas diretamente; consultas que falharam estão registradas.

- [x] Inventário integral das aulas, nove exercícios e cinco simuladores.
- [x] Fontes primárias consultadas e afirmações importantes confrontadas.
- [x] Lacunas enviadas ao agente principal antes das correções.
- [x] Contraexemplos reproduzidos; correções do agente principal reconferidas.
- [x] Testes locais e execuções reais de Git, Bash e cURL realizados.
- [x] Conclusões anteriores reconciliadas sem transformar testes antigos em evidência atual.
- [ ] Integrações externas, UI do Bruno/Postman, Docker, DNS/TLS reais e PR GitHub executados. **Não realizados; não são marcados como aprovados.**

## Fontes efetivamente consultadas

Todas consultadas em 16/10/2026. As âncoras identificam a seção pertinente; as conclusões não decorrem apenas da existência de uma URL.

| ID | Fonte/versão e seções lidas | Uso |
| --- | --- | --- |
| U | [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986.html#section-3), janeiro/2005, §§3–3.5 | Componentes URI; fragmento separado antes de dereference. |
| H | [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), junho/2022, §§4.2, 8.3.1, 9.2–9.3, 10.2.2, 13.2.1, 15.3–15.6 | Semântica HTTP e contrapontos dos modelos. |
| P | [RFC 5789](https://www.rfc-editor.org/rfc/rfc5789.html#section-2), março/2010, §2 | PATCH e operação especificamente idempotente. |
| C | [RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html#section-5.2.2), junho/2022, §§4.3, 5.2.2 | Cache, no-cache/no-store e revalidação. |
| J | [RFC 8259, texto](https://www.rfc-editor.org/rfc/rfc8259.txt), dezembro/2017, §§2–7, 8.1 | Gramática JSON e UTF-8 entre sistemas abertos. |
| F | [WHATWG Fetch](https://fetch.spec.whatwg.org/#http-cors-protocol), Living Standard recuperado nesta consulta, §§3.3–3.3.6 | CORS, credenciais, exposição e preflight. |
| K | [MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#attributes), documentação viva, Attributes | HttpOnly, Secure, Domain/Path, SameSite, expiração e exceções do browser. |
| D | [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035.html), novembro/1987, §§2.1–2.2, 3.3.1 e 3.4.1; [RFC 3596](https://www.rfc-editor.org/rfc/rfc3596.html#section-2.1), outubro/2003, §§2.1–2.3 | Resolução distribuída, cache, A/CNAME e AAAA. |
| T | [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293.html#section-2.2), agosto/2022, §2.2; [RFC 768](https://www.rfc-editor.org/rfc/rfc768.html), agosto/1980, Introduction | TCP e UDP. |
| S | [RFC 8446](https://www.rfc-editor.org/rfc/rfc8446.html#section-1), agosto/2018, §1; [RFC 9525](https://www.rfc-editor.org/rfc/rfc9525.html#section-6), novembro/2023, §§6.1–6.3 | TLS 1.3 e identidade de serviço. |
| Q | [RFC 9114, texto](https://www.rfc-editor.org/rfc/rfc9114.txt), junho/2022, §§1.2, 2; [RFC 9000](https://www.rfc-editor.org/rfc/rfc9000.html#section-21.1.1), maio/2021, §§1, 21.1.1 | HTTP/3, QUIC, streams e segurança integrada. |
| E | [MDN Evolution of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP), HTTP/2 e HTTP/3 | Contexto de uso pelos navegadores; não medida de latência. |
| R | [Fielding, tese, capítulo 5](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm), 2000, §§5.1.2–5.1.6 | Restrições REST e statelessness. |
| O | [OpenAPI 3.1.1](https://spec.openapis.org/oas/v3.1.1.html), Paths/Operation/Parameter/Responses/Schema Objects, especialmente §4.8.12.2 | Fragmento versionado e parâmetro path obrigatório. |
| M | [RFC 6839](https://www.rfc-editor.org/rfc/rfc6839.html#section-3.1), janeiro/2013, §3.1 | Sufixo estruturado +json; não confundir prefixos parecidos. |
| X | [curl manual](https://curl.se/docs/manpage.html), página declara 8.23.0; seções --json, --head, --request, --fail-with-body, --output, --write-out, --verbose | Opções confrontadas com cURL instalado 8.18.0. Não se supôs igualdade de todas as versões. |
| B | [Bruno Create a Test](https://docs.usebruno.com/get-started/bruno-basics/create-a-test), Testing with JavaScript; [Environment Variables](https://docs.usebruno.com/variables/environment-variables), Creating/Using/Persistence and export | API test/res/expect e interpolação do environment. UI não executada. |
| G1 | [Git restore](https://git-scm.com/docs/git-restore), documentação identificada como atualizada em 2.55.0, DESCRIPTION/OPTIONS | Origem index versus HEAD e destinos. |
| G2 | [Git rebase](https://git-scm.com/docs/git-rebase), DESCRIPTION e sequência de replay | Reaplicar commits e cuidado com histórico compartilhado. |
| G3 | [Git fetch](https://git-scm.com/docs/git-fetch), documentação identificada 2.56.0, DESCRIPTION; [Git pull](https://git-scm.com/docs/git-pull), DESCRIPTION | Referências remotas e integração conforme opção/configuração. |
| G4 | [Git gitignore](https://git-scm.com/docs/gitignore), DESCRIPTION; [GitHub Pull requests](https://docs.github.com/en/pull-requests/reference/pull-requests), documentação viva | Arquivos rastreados não são removidos por ignore; proposta/revisão de PR não equivale a deploy. |
| L | Ajuda primária instalada: `bash -c 'help export; help type; help echo'`, Bash 5.3.9 | Exportação, resolução e saída; confrontada com execução real. |

Falhas de acesso: GNU Bash manual integral e páginas Quoting/Redirections retornaram erro/timeout; Open Group POSIX shell também não foi recuperado. Usada ajuda instalada e comportamento do Bash real para o recorte, sem afirmar consulta às seções inacessíveis. RFC 9114 HTML falhou, mas o texto oficial foi recuperado; RFC 8259 HTML falhou em uma leitura posterior, com texto oficial recuperado. A indisponibilidade não foi convertida em aprovação.

## Matriz por aula e conceito

As localizações abaixo são arquivos em `src/content/stage-02/lessons/`. “Verificada” se aplica à afirmação nas condições da linha, não à correção universal de qualquer ferramenta. Gravidade de pendência aparece nos achados e limitações. T1–T5 remetem às execuções ao final.

| ID/local | Afirmação importante e natureza | Fonte/seção; confronto | Classificação atual / evidência |
| --- | --- | --- | --- |
| 02-U1 `urls.mdx`, Entender | Esquema/host/porta/path/query/fragmento são partes distintas; fragmento não compõe alvo HTTP. Norma. | U §§3–3.5; H §4.2 | **Verificada**; teste publicado separa filtro, página vazia e detalhe ausente (T1). |
| 02-U2 `urls.mdx`, exemplo HTTP/1.1 | Linhas textuais não são o enquadramento de HTTP/2/3. Recorte explícito. | E HTTP/2/3; Q §2 | **Verificada**; modelo legível não é captura de rede. |
| 02-U3 `urls.mdx`, caso biblioteca | Filtro redes/página2 resulta200 vazio; `/books/999` resulta404. Política local. | Contrato/implementação `http.ts`, T1 | **Verificada** no mock; não é regra universal de toda API. |
| 02-M1 `metodos.mdx`, tabela | Segurança refere-se à intenção, não ausência de logs; idempotência não exige status repetido. Norma. | H §§9.2–9.3; T2 | **Verificada** no recorte. |
| 02-M2 `metodos.mdx`, PATCH/PUT | PATCH específico pode ser idempotente; neste mock PUT exige ambos os campos. Norma + contrato. | P §2; `http.ts`; T1 | **Verificada**, mantendo a distinção entre norma e escolha local. |
| 02-M3 `metodos.mdx`, timeout | Repetir criação sem deduplicação pode duplicar efeito. Risco. | H §9.2.2; ausência de garantia no contrato | **Dependente de contexto ou versão**: contrato pode oferecer deduplicação; mock não oferece nem reproduz efeito antes de timeout. |
| 02-H1 `mensagens.mdx`, tabela/status | 401 desafia autenticação, 405 informa Allow; 404 não identifica sozinho causa interna. Norma. | H §§15.5.2/15.5.5/15.5.6 | **Verificada**; não se infere linha do programa pelo status. |
| 02-H2 `mensagens.mdx`, JSON | JSON é dado serializado; string, objeto e ausência diferem; UTF-8 na troca aberta. Norma. | J §§2–8.1 | **Verificada**; parser do mock diferencia sintaxe400 e conteúdo422 (T1). |
| 02-H3 `mensagens.mdx`, headers | Accept não corrige Content-Type incorreto. Norma + contrato. | H §8.3.1; T2 | **Verificada** após F02-01/F02-03; parâmetros/case e sua participação em preflight confrontados. |
| 02-H4 `mensagens.mdx`, 204/HEAD | Não inventar JSON em resposta sem conteúdo. Norma. | H §§9.3.2/15.3.5; T2 | **Verificada**. |
| 02-E1 `estado.mdx`, cookie | HttpOnly restringe acesso JS; não impede envio. Expiração de cookie não prova invalidação da sessão. Norma + modelo. | K Attributes; T1 | **Verificada** no conceito e ciclo fictício; navegador real não exercitado aqui. |
| 02-E2 `estado.mdx`, SameSite | None/Secure, Lax, site/origem e políticas de terceiros dependem do navegador. | K SameSite/Secure | **Dependente de contexto ou versão**; aula explicita condições e que o modelo não impõe atributos. |
| 02-E3 `estado.mdx`, cache | no-cache permite armazenamento com validação; no-store é distinto. | C §5.2.2 | **Verificada**; sem garantia absoluta de privacidade. |
| 02-E4 `estado.mdx`, ETag | Revalidação válida retorna304 sem body; alteração muda revisão. Modelo. | C §4.3; `http.ts`; T1/T2 | **Verificada** após F02-05. Revisão global é delimitação explícita; não certifica todas as precondições RFC. |
| 02-C1 `cors.mdx`, definição | CORS controla compartilhamento, não autenticação; cURL não aplica a política JS. | F §3.3 | **Verificada** documentalmente. |
| 02-C2 `cors.mdx`, duas trocas | JSON/PATCH podem exigir preflight; resposta principal também precisa permitir leitura. | F §§3.3.2–3.3.6 | **Verificada**; trace local não é OPTIONS real. |
| 02-C3 `cors.mdx`, credenciais | Origem explícita e permissão de credenciais; Set-Cookie não é header comum acessível. | F §3.3.5; K | **Verificada** nas condições explicitadas. |
| 02-C4 `cors.mdx`, falhas | Bloqueio de leitura/timeout não prova ausência de efeito;500 é HTTP. | F §3.3.6; H §9.2.2; T1 | **Verificada**; mock não reproduz todas as situações reais. |
| 02-D1 `redes.mdx`, DNS | A/AAAA endereços, CNAME nome canônico; caches/TTL. | D §§2.1,3.3.1,3.4.1; RFC3596§2 | **Verificada** documentalmente; sem consulta DNS real. |
| 02-D2 `redes.mdx`, transporte | TCP fluxo ordenado/confiável; UDP sozinho não garante entrega/ordem. | T RFC9293§2.2/RFC768 Introduction | **Verificada**; nenhum teste de perda real. |
| 02-D3 `redes.mdx`, percurso | DNS resolvido não comprova porta/aplicação; cenários param na camada modelada. | Responsabilidades de D/T; `network.ts`; T1 | **Verificada** como modelo conceitual, sem medição de rede. |
| 02-S1 `tls.mdx`, identidade | Nome/cadeia/validade precisam conferir; HTTPS não comprova autorização do usuário. | S §§1/6 | **Verificada** documentalmente; certificado real não ensaiado. |
| 02-S2 `tls.mdx`, protocolos | HTTP/3 usa QUIC/UDP e segurança TLS1.3; streams não garantem menor latência em todo ambiente. | Q §§1.2/2/21.1.1; E | **Verificada**; animação não mede pacotes ou desempenho. |
| 02-S3 `tls.mdx`, intermediários | CDN pode responder sem aplicação; terminação TLS não comprova proteção de todo salto. | R §5.1.6; H intermediários; S canal entre pares | **Dependente de contexto ou versão**: composição/configuração efetiva da infraestrutura. |
| 02-R1 `rest.mdx`, restrições | REST não é pluralização; sessão conversacional no servidor viola stateless de Fielding. | R §§5.1.3–5.1.6 | **Verificada**; recursos persistidos não são sessão conversacional. |
| 02-R2 `rest.mdx`, biblioteca | Cinco operações, envelopes/IDs alternativos são contrato didático. | T1/T2; `contracts.ts` | **Verificada** no recorte após F02-01/F02-02; sem certificação REST completa. |
| 02-R3 `rest.mdx`, YAML | Path `{id}` declarado como parâmetro obrigatório;3.1.1 é recorte fixado. | O Parameter/Responses/Schema Objects | **Verificada** por inspeção normativa; validador completo OpenAPI **não executado**, pendência baixa para este fragmento introdutório. |
| 02-L1 `shell.mdx`, arquivos | `>` substitui, `>>` acrescenta; pipe transmite stdout a stdin no recorte. | Bash real/T3; exemplo publicado/T1 | **Verificada**; não se promete recuperação de arquivo real. |
| 02-L2 `shell.mdx`, processos | Variável local não é automaticamente ambiente filho; PATH é busca. | L export/type; T3 | **Verificada** em Bash5.3.9; modelo explicita mapa único e ausência de processos. |
| 02-L3 `shell.mdx`, permissões | 640 = dono rw/grupo r/outros nenhum; modelo só registra modo. | chmod640/stat em arquivo temporário; limites declarados | **Verificada** no número e distinção; ACLs/multiusuário não simulados. |
| 02-L4 terminal ligado à aula | Operadores citados devem permanecer texto. Comportamento de aspas. | Bash5.3.9/T3 e T2 | **Incorreta → Verificada** após F02-04. |
| 02-X1 `curl.mdx`, opções | --json configura envio/headers, não valida JSON; -I difere de -X HEAD. | X --json/--request/--head; T4 | **Verificada** em cURL8.18.0 no loopback. |
| 02-X2 `curl.mdx`, falha | --fail-with-body preserva body e devolve22 em404 recebido. | X --fail-with-body; T4 | **Verificada** no ensaio, sem extrapolar a falha sem resposta. |
| 02-X3 `curl.mdx`, Bruno | Collection/environment/test usam {{baseUrl}} e test/res/expect. | B páginas de testes e variables | **Dependente de contexto ou versão**: API documental conferida; UI/versão instalada não executadas. |
| 02-X4 `curl.mdx`, Docker/httpbin | Comando inicia serviço e mapeia127.0.0.1:8080; disponibilidade/imagem não testadas. | Roteiro documental externo | **Não verificada** operacionalmente; baixa, explicitamente não executado na aula e nesta revisão. |
| 02-G1 `git.mdx`, snapshots | add capturaA; editarB não altera staging; commit gravaA. Modelo e Git. | G1; T2/T3 | **Verificada**, com Git2.55.0 real. |
| 02-G2 `git.mdx`, restore | restore padrão index→working; --staged usaHEAD. | G1 DESCRIPTION; T3 | **Verificada**; descarte não é backup. |
| 02-G3 `git.mdx`, ignore | .gitignore não retira rastreados/histórico; segredo comprometido demanda resposta além de apagar texto. | G4 DESCRIPTION | **Verificada** no escopo de Git; nenhum segredo acessado/testado. |
| 02-CO1 `colaboracao.mdx`, integração | Merge divergente pode ter2pais; rebase reaplica com novas identidades. | G2 DESCRIPTION; T1/T3 | **Verificada** nos cenários locais; modelo unitário não implementa merge por linhas. |
| 02-CO2 `colaboracao.mdx`, remoto | fetch não integra; pull integra conforme opções/configuração; push não é deploy. | G3 DESCRIPTION; G4 PR | **Verificada** documentalmente e no modelo, sem remoto externo real. |
| 02-CO3 `colaboracao.mdx`, PR | Rascunho no modelo não significa PR publicado/revisado. | G4 GitHub; componentes/modelo | **Verificada** como limite do produto. GitHub/feedback externo **não verificados** nesta passagem. |

## Lacunas encontradas, correções e reconferência

As quatro primeiras reproduções foram comunicadas antes de editar. O agente principal implementou as correções; este revisor criou contraexemplos e conferiu os resultados, sem usar o texto produzido como prova. A quinta falha foi encontrada pelo agente principal e confrontada independentemente aqui.

| ID/gravidade | Antes: esperado × observado | Evidência e correção | Impacto / estado atual |
| --- | --- | --- | --- |
| F02-01 média | Validador devia recusar `application/jsonp`; retornava `passed:true`. | H§8.3.1 e M§3.1. Agora compara tipo/subtipo JSON completo, incluindo sufixo válido, sem prefixos falsos. | REST/contratos; exercícios biblioteca/revisão. **Incorreta → Verificada**, validado T2, incluindo JSON com parâmetro e vendor+json. |
| F02-02 média | Criação identificável com Location `/books/` passava apesar de não identificar livro pelo contrato local. | Aula REST exige um livro identificável; matcher agora exige segmento não vazio. Não se impôs origem igual: HTTP aceita URI relativa/absoluta. | REST/contratos; biblioteca/revisão. **Parcialmente correta → Verificada**, validado T2; Location externa `/books/b-7` continua aceita. |
| F02-03 média | POST `Content-Type: Application/JSON` devolvia415 apesar de ser o mesmo tipo. | H§8.3.1. Normalização trim/lowercase do tipo, preservando seleção local application/json. | Métodos/mensagens/HTTP e clientes; terminal-curl/biblioteca. **Incorreta → Verificada**, validado T2 com maiúsculas/parâmetro. |
| F02-04 média | `echo '|'` produzia “Falta um comando no pipe”; aspas perdiam natureza literal. | Bash real confirmou `|`/`>` literais. Lexer guarda natureza de operador; API pública tokenize continua string[]. | Terminal/shell/cURL; exercícios terminal/ponta a ponta. **Incorreta → Verificada**, validado T2 com texto citado, expansão, redirecionamento e pipe reais do modelo. |
| F02-05 média | GET `/books?page=-1` com ETag atual retornava304, escondendo entrada inválida400. | H§13.2.1: falhas detectáveis precedem precondições. Condicional movida após validação de page/limit/sort. | Estado/cache/HTTP; biblioteca/diagnóstico. **Incorreta → Verificada**, T2 confirma três inválidos400 e consulta válida304. |

Nenhum erro conceitual grave foi encontrado nas explicações nucleares lidas. Isso não implica inexistência de outros defeitos. A observação inicial de que ETags iguais em recursos distintos seriam necessariamente inválidos foi **descartada**, pois H§8.8.1 permite coincidência entre recursos; não foi transformada em falso achado. A revisão global de livros permanece simplificação expressamente indicada.

## Nove exercícios e fidelidade dos modelos

Os nove objetivos curriculares estão presentes, com três dicas graduais e distinção entre evidência local e externa. Não foi avaliada solução de estudante nem executada publicação para cumprir entregas em seu nome.

| Exercício | Conceitos/modelos confrontados | Resultado e limite |
| --- | --- | --- |
| anatomia | URL/mensagem/status/HEAD; HTTP | **Verificada** a coerência do enunciado; dez capturas reais do estudante permanecem evidência externa. |
| terminal-curl | Shell/cURL/coleção; terminal | T1/T2/T4 verificam recorte; equivalência no Bruno/Postman depende de execução externa. |
| git-equipe | Snapshot/branches/conflito; Git | T1/T3 verificam conflito local; PR real não é substituído por simulação. |
| biblioteca | Métodos/status/Location/paginação; HTTP/contratos | F02-01/02/03/05 corrigidos; T1/T2. IDs/envelopes alternativos preservados. |
| diagnostico | HTTP/rede/CORS/retry; HTTP/rede | T1 cobre sinais; cenários injetados não provam causa interna. |
| sessao | Cookie/sessão/atributos; HTTP | T1 verifica invalidação fictícia; browser externo é necessário para atributos reais. |
| ponta-a-ponta | Reprodutibilidade/coleção/diagnóstico; cinco ferramentas | **Dependente de contexto ou versão**; local não certifica API, DNS/TLS, Docker ou cliente externo. |
| revisao | GET destrutivo,204 com body,criação,paginação; contratos | T1/T2 verificam semântica local. Roteiro corretamente avisa que POST200 não é proibição universal do protocolo. |
| pr-profissional | Repositório/PR/evidências; Git | **Não verificada** a entrega externa; modelo somente guarda descrição. Enunciado exige evidência real. |

| Simulador | Fidelidade observada | Diferença comunicada / teste de transferência |
| --- | --- | --- |
| HTTP | CRUD,400/415/422,HEAD/204/304, sessão, cenários distintos (T1/T2). | Headers/Origin editáveis só no modelo; sem rede/browsercookies. Verificar no Network é competência separada. |
| Rede | DNS/conexão/TLS interrompem camada;500 chega como resposta (T1). | Caminho HTTPS/TCP/cache miss, sem pacotes/tempos; propor próxima evidência real. |
| Contratos | Operação local e representações alternativas; recusas corrigidas (T1/T2). | Uma operação por verificação; não certifica REST/OpenAPI/implementação. |
| Terminal | Arquivos/pipes/aspas/cURL selecionados (T1/T2). | Sem Bash/processos/multiusuário/rede; --verbose no painel não reproduz stderr. T3/T4 contrastam ferramentas reais. |
| Git | Snapshot,restore,merge,rebase,fetch/pull/push fictício (T1/T2). | Um arquivo como unidade, IDs didáticos, index nulo como abreviação; switch mais restrito. T3 confronta Git real sem remoto. |

## Execuções e resultados reais

Ambiente observado: Node **v24.21.0**, Vitest **5.0.4**, Git **2.55.0**, Bash **5.3.9**, cURL **8.18.0**, Python **3.14**. Não foram instaladas dependências por este revisor.

- **T1 — regressões existentes:** `npm test -- --run src/tests/web-http.test.ts src/tests/web-network.test.ts src/tests/web-contracts.test.ts src/tests/web-terminal.test.ts src/tests/web-git.test.ts src/tests/web-lesson-examples.test.ts --maxWorkers=2`. Incluídas na execução final T2: **21 testes em seis arquivos**. Exercitam biblioteca, sessão/cache, comandos publicados, contratos, Git e percurso. Uma primeira chamada usou um nome inexistente `web-published-examples.test.ts`; rodou somente cinco arquivos/17 testes, não foi contada como cobertura de exemplos.
- **T2 — contraexemplos:** `npm test -- --run src/tests/factcheck-stage-two.test.ts src/tests/web-http.test.ts src/tests/web-network.test.ts src/tests/web-contracts.test.ts src/tests/web-terminal.test.ts src/tests/web-git.test.ts src/tests/web-lesson-examples.test.ts --maxWorkers=2`. Baseline dos seis novos testes: **4 falharam,2 passaram**. Após correções/expansão, **32/32 passaram em sete arquivos**, dos quais **11 novos**. Um teste adicional inicialmente atribuiu `>` sem aspas em export: erro no próprio teste, corrigido para `export SINAL='>'`, sem atribuir o erro ao produto.
- **T3 — Git e Bash reais:** `python3 /tmp/stacktrail-stage02-proof.py`, script próprio controlado. Criou repositório temporário, identidade local fictícia, init/main, commit, A→add→B→restore, branches divergentes, merge conflituoso, resolução/add/commit. Esperado/observado: workingA/indexA, merge pendente exit1, marcadores presentes, resolução com **dois pais**. Nenhum remoto, push ou commit no StackTrail. Bash `unset TEMA; TEMA=HTTP; bash -c 'printenv TEMA'` devolveu1 sem valor; após export, filho imprimiuHTTP; `echo '|'` e `echo '>'` imprimiram literais. `type -a bash` mostrou `/usr/bin/bash` e `/bin/bash`. `chmod 640` num arquivo fictício seguido de stat confirmou modo0o640. Uma primeira tentativa usou `python` indisponível; repetição com `python3` executou o ensaio.
- **T4 — cURL real contra HTTP controlado:** `python3 /tmp/stacktrail-curl-proof.py`. Servidor Python temporário restrito a127.0.0.1/porta efêmera, sem serviços públicos, usuário ou credenciais. cURL com `-q --noproxy '*'`: POST `--json` enviou body e Content-Type/Accept JSON; `--json '{'` enviou texto malformado sem validá-lo; HEAD retornou headers sem body;404 com `--fail-with-body -o ... -w '%{http_code}'` resultou saída404, exit22 e corpo preservado em arquivo temporário. O primeiro bind foi negado pelo sandbox; execução com permissão escalada passou. Servidor encerrado. Isso verifica cURL contra um servidor controlado, **não** disponibilidade/envelope de httpbin.
- **T5 — inspeção normativa/exemplos não executados:** fragmento OpenAPI e script Bruno confrontados com documentação primária. **Não** houve validador completo OpenAPI, Bruno/Postman UI/CLI, Docker, HTTP/3, consulta DNS, certificado real, GitHub, push/PR/revisão externa ou observação de cookies reais nesta passagem. Browser/build/typecheck/lint globais são responsabilidade da integração do agente principal; não são alegados como executados por este subagente.

## Reconciliação das auditorias anteriores e gate

`docs/etapa-02-auditoria-pedagogica.md` registrava 12 aulas com notas3 e “nenhum bloqueante novo”, além de21 testes dos modelos. A presente consulta confirma que os testes antigos são úteis nos casos exercitados, mas **não cobriam os cinco contraexemplos acima**. Portanto, a frase antiga não serve como aprovação técnica integral atual. As notas didáticas não foram usadas como evidência de protocolo. Restore, método explícito cURL, aspas simples para `$TEMA` e tail, corrigidos anteriormente, continuam coerentes nos testes atuais; a nova falha de aspas era outro caso, operador inteiro citado.

**Gate atual:** cinco lacunas médias corrigidas e reconferidas no comportamento local; nenhum bloqueante conceitual grave identificado nesta revisão. Conceitos nucleares das 12 aulas possuem evidência documental e, quando viável, execução no recorte. Isso autoriza registrar a verificação local desses conceitos, **não** afirmar validação operacional integral das aulas externas. Conteúdos/configurações não executados permanecem classificados como tal. O gate de qualquer afirmação crítica nova sem evidência continua fechado; estas conclusões não autorizam publicação ou novas etapas.

Pendências não críticas: execução Bruno/Postman e disponibilidade/envelope dos serviços de eco; Docker/imagem atual; validador completo OpenAPI; diagnóstico real DNS/TLS/CDN e políticas de cookies; remoto GitHub/PR/revisão. Gravidade baixa para a precisão dos conceitos aqui delimitados, porém **bloqueiam alegar essas competências externas como realizadas ou garantidas**. Resolver com ambiente/versionamento autorizado e evidências próprias, sem substituir por simulador, build ou consenso entre agentes. Não há evidência empírica de aprendizagem com estudantes reais.
