# Etapa 11 — verificação factual independente

Consulta em 20/10/2026 (America/Sao_Paulo). Revisor separado da implementação; código somente leitura. Aplicados stacktrail-factchecker e evidence-gate. O currículo integral do anexo cbb3b16f foi lido como objetivo, não como prova técnica. Nenhum serviço ou código do estudante executado; catálogo não equivale à leitura integral de livro.

## Lacunas identificadas antes da implementação/correção

| Gravidade | Classificação | Achado e contraexemplo | Recomendação/estado |
|---|---|---|---|
| Alta | Dependente de contexto ou versão | Verificar disponibilidade antes de inserir não protege contra duas transações que leem ausência simultaneamente. SELECT FOR UPDATE em consulta sem linhas não bloqueia uma reserva futura inexistente. | Exigir evidência concorrente, invariante no banco/serialização ou lock adequado do recurso; sem prescrever solução única. A conferir no código. |
| Alta | Dependente de contexto ou versão | Transação no banco não desfaz e-mail externo já enviado; listener pode executar antes do commit. | Provedor local simulado; separar commit e efeitos observáveis e não prometer entrega exatamente uma vez. A conferir. |
| Alta | Dependente de contexto ou versão | Idempotência HTTP não exige resposta/status idênticos nem transforma POST automaticamente em operação segura contra duplicações. Chave sem escopo/identidade/payload pode reutilizar resultado de outro usuário. | Contrato autoral explícito para escopo, payload divergente, autorização em replay e corrida. RFC não padroniza a política específica desse exercício. |
| Média | Não verificada | Catálogos Grupo A Padrões e Programador tiveram busca indexada oficial com metadados, porém abertura web e GET retornaram 403/cache miss. | Não promover a busca a consulta efetiva nem inferir nova edição por capa antiga; registrar como investigação pendente. |
| Média | Não verificada | Catálogo/capa não demonstra licença livre de reprodução das imagens. | Sem autorização aplicável, fallback discreto. Nenhuma licença livre alegada. |
| Média | Dependente de contexto ou versão | ADR é sigla de Action-Domain-Responder e de Architecture Decision Record, conceitos distintos; Single-Action Controller do Laravel também não implica o padrão completo de Jones. | Distinguir os três, com referências próprias. |
| Média | Dependente de contexto ou versão | Laravel 13 passou a redirecionar /docs/13.x para /framework/docs/13.x. PostgreSQL /current retornou versão 18 nesta consulta. | Registrar original/final e versão observada, sem presumir versão de um futuro projeto do estudante. |

## Curadoria técnica diretamente aberta

Todos os itens abaixo foram abertos com web.open em 20/10/2026; quando indicado, seções foram localizadas/abertas novamente. Conteúdo efetivo em inglês, leitura gratuita, sem cadastro para as seções. Data de adequação e acesso: 20/10/2026. As fontes autorais de design exprimem posições contextualizadas; não são normas universais.

| ID sugerido | Fonte original (link) | Seção conferida e uso | Versão/data e limite |
|---|---|---|---|
| 11-fowler-architecture | [Software Architecture Guide](https://martinfowler.com/architecture/) | What is architecture?/Why architecture matters; evolução e qualidade interna | Fowler, 2019; índice curado, posição autoral |
| 11-fowler-monolith | [Monolith First](https://martinfowler.com/bliki/MonolithFirst.html) | custo de distribuição, fronteiras e contrapontos | 2015; o autor declara evidência anedótica/tentativa, não consenso universal |
| 11-solid | [Solid Relevance](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html) | trechos SRP/OCP/LSP/ISP/DIP | Robert C. Martin, 2020; LSP trata substitutibilidade, não só herança |
| 11-srp | [The Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html) | razões de mudança/atores; coesão/acoplamento | 2014; não significa classe com apenas um método |
| 11-ocp | [The Open Closed Principle](https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html) | abertura/extensão, limites | 2014; não proíbe modificar código para corrigir defeitos |
| 11-injection | [Inversion of Control Containers and Dependency Injection](https://martinfowler.com/articles/injection.html) | injeção e comparação com Service Locator | Fowler, 2004; DI não requer container/framework |
| 11-adr-pattern | [Action Domain Responder](https://pmjones.github.io/adr/) | Purpose, Components, Collaborations | Paul M. Jones, copyright 2014–2020; Action coordena HTTP/Domain/Responder |
| 11-laravel-controllers | [Controllers](https://laravel.com/docs/13.x/controllers#single-action-controllers) | Single Action Controllers e __invoke | Laravel13; final https://laravel.com/framework/docs/13.x/controllers ; uma classe de caso de uso nomeada Action é convenção local |
| 11-ddd-reference | [DDD Reference](https://www.domainlanguage.com/ddd/reference/) e [PDF do autor](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf) | glossário, Ubiquitous Language/Bounded Context/aggregates/invariants | Evans, PDF2015; recortes lidos, não livro integral; contexto não exige microsserviço |
| 11-refactoring | [Refactoring](https://refactoring.com/) | definição e catálogo | Fowler; preservar comportamento observável, sem exigir reescrita |
| 11-strangler | [Strangler Fig](https://martinfowler.com/bliki/StranglerFigApplication.html) | deslocamento incremental do legado | conceito introdutório, não obrigação de extrair serviços |
| 11-adr-record | [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) | contexto, decisão, status e consequências | Nygard2011; página declara waiver de copyright desse artigo, não dos livros/capas |
| 11-adr-index | [Architectural Decision Records](https://adr.github.io/) | Motivation and Definitions | registro de escolha e razões; não arquitetura executável |
| 11-laravel-db | [Database](https://laravel.com/docs/13.x/database#database-transactions) | Database Transactions/Handling Deadlocks | Laravel13; final https://laravel.com/framework/docs/13.x/database ; callback com exceção desfaz operações DB, retry pode repetir efeitos externos |
| 11-laravel-container | [Service Container](https://laravel.com/docs/13.x/container) | Zero Configuration Resolution/When to Utilize | Laravel13; final https://laravel.com/framework/docs/13.x/container ; classes concretas podem resolver sem interfaces artificiais |
| 11-laravel-events | [Events](https://laravel.com/docs/13.x/events#dispatching-events-after-database-transactions) | queued listeners/transações; dispatch após commit | Laravel13; final https://laravel.com/framework/docs/13.x/events ; after-commit não equivale a garantia distribuída de entrega |
| 11-express-errors | [Error Handling](https://expressjs.com/en/guide/error-handling.html) | errors async/middleware | final https://expressjs.com/en/guide/error-handling/ ; guia atual; fixar versão5 no projeto, não inventar transação Express |
| 11-knex-transactions | [Transactions](https://knexjs.org/guide/transactions.html) | mesma conexão, handler/rollback e promise | documentação corrente, sem número de versão inferido; usar trx na operação inteira |
| 11-pg-transactions | [node-postgres Transactions](https://node-postgres.com/features/transactions) | mesma instância client, BEGIN/COMMIT/ROLLBACK | corrente; pool.query não pode ser usado como transação multicomando |
| 11-pg-isolation | [Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html) | Read Committed, Serializable/retry | PostgreSQL18 observado; sequência serial pode avançar mesmo após rollback; não exigir IDs sem lacunas |
| 11-pg-locks | [Explicit Locking](https://www.postgresql.org/docs/current/explicit-locking.html) | Row-Level Locks/FOR UPDATE/deadlocks | PostgreSQL18; bloqueia linhas retornadas, não ausência genérica |
| 11-pg-ranges | [Range Types](https://www.postgresql.org/docs/current/rangetypes.html) | Constraints on Ranges, overlap, recurso+intervalo | PostgreSQL18; UNIQUE de início/fim não impede interseções parciais; exemplo oficial usa extensão btree_gist para escalar+range |
| 11-http-idempotency | [RFC9110§9.2.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2) | método/effect/retry | norma2022; idempotência não implica segurança do método ou representação igual; chave de aplicação é contrato adicional |

## Livros: seis investigações, quatro catálogos diretamente verificados

Obras opcionais e pagas. Alternativas gratuitas: fontes autorais/DDD Reference/refactoring.com/ADR e documentação técnica acima. Português dos quatro catálogos abertos confirmado pelo conteúdo e indicação editorial. Não foi lida integralmente nenhuma obra. Ano omitido quando a página não confirma. Não incluir links de compra nos cards.

| Obra | Evidência bibliográfica | Recorte e limites |
|---|---|---|
| [Fundamentos da Arquitetura de Software — 2ª edição](https://novatec.com.br/livros/fundamentos-arquitetura-software-2ed) | Mark Richards e Neal Ford; Novatec; PT; 2025; impresso9788575229682, ebook9788575229699; catálogo aberto e ficha inicial conferida | atributos, componentes/coesão/acoplamento/monólitos. Sumário é evidência de cobertura, não certificação de qualidade universal |
| [Aprenda Domain-Driven Design](https://altabooks.com.br/produto/aprenda-domain-driven-design/) | Vlad Khononov; Alta Books; PT; 1ªed2024; ISBN9788550819617; seção informação adicional conferida | contexto/negócio/modelagem incremental; não exigir todo o livro ou arquitetura completa |
| [Refatoração — 2ª edição](https://novatec.com.br/livros/refatoracao/) | Martin Fowler; Novatec; PT; 2020; impresso9788575227244, ebook9788575227251 | refatoração incremental; exemplos JavaScript não tornam essa a única linguagem possível |
| [Código Limpo](https://altabooks.com.br/produto/codigo-limpo/) | Robert C. Martin; Alta Books; PT; 1ª edição; ISBN9788576082675; ano não informado no catálogo aberto | heurísticas/contexto histórico; não transformar preferências em regra normativa nem importar Java como requisito |
| [Padrões de Projetos](https://loja.grupoa.com.br/padroes-de-projeto-ebook-p988434) | Busca do catálogo oficial indexa Gamma/Helm/Johnson/Vlissides, Bookman,2000,ISBN9788573076103; porém web.open403 e urllib GET403 | **Não verificado diretamente nesta rodada**. Investigação atende identificação, não deve aparecer como leitura confirmada. Sumário indexado não foi promovido a consulta direta |
| [O Programador Pragmático 2ed.](https://m.loja.grupoa.com.br/grupoa-hlg-hc/eb-o-programador-pragmatico-2ed-9788582606889-p1053431) | Busca oficial indexa Andrew Hunt/David Thomas, edição2,2026,ISBN9788582606889; web.open cache miss; endpoint canônico GET403 | **Não verificado diretamente nesta rodada**. Busca marca produto indisponível; não afirmar estoque/edição exclusiva. Não usar capa da edição anterior como se fosse a2ª |

## Capas e direitos

Imagens realmente vinculadas nas páginas primárias (web.click dos links de imagem, sem incorporação ao site pelo revisor):

- Fundamentos2ed: https://s3.novatec.com.br/capas-ampliadas/capa-ampliada-9788575229682.jpg
- Refatoração2ed: https://s3.novatec.com.br/capas-ampliadas/capa-ampliada-9788575227244.jpg
- AprendaDDD: https://altabooks.com.br/wp-content/uploads/2024/03/Modelo-39-364x600.webp

Disponibilidade de imagem não prova licença de incorporação. Não se encontrou autorização livre específica das capas. Não inferir permissão do download de amostra; copyright de cada editora preservado. User attachment exige fallback quando não autorizado. O revisor não baixou imagens para o bundle nem alterou componentes.

## Limitações e próxima revisão

Esta primeira rodada fornece curadoria e contraexemplos; implementação11 ainda não foi auditada. Falhas web de páginas GrupoA registradas separadamente da falha DNS inicial do shell e do GET403 posterior com rede autorizada. PDFs LSP/arquivo histórico ObjectMentor testados não acessíveis; substituídos pelo texto direto do autor Solid Relevance, efetivamente aberto. Não foram executados Laravel, Express, PostgreSQL ou código gerado por IA. Auditoria de contratos/prompts/código será adicionada após solicitação do agente principal.

## Segunda rodada — conteúdo inicial e fontes adicionais

Inspecionado `src/practice/stage-eleven.ts` com os nove módulos, 18 exercícios e integrador. Não editado. Principais riscos da primeira rodada estão contemplados nos contratos: UTC e intervalos semiabertos, casos adjacentes/recursos distintos, duas conexões/barreiras com timeout, ausência de garantia baseada só em SELECT, diferença entre rollback SQL e notificação, e distinção das três acepções de ADR/Action. Isso verifica a coerência do enunciado; não demonstra execução de futura API.

Lacunas enviadas ao implementador antes de ajustar:

1. **Alta — segurança contextual de replay:** ex14 e projeto precisam explicitar autenticação/autorização atual antes de devolver resultado deduplicado, inclusive para o mesmo ator com acesso revogado. Isolamento por ator impede vazamento entre usuários, mas não cobre revogação no próprio escopo.
2. **Média — custo da referência `11-patterns`:** helper a classificava Gratuito embora a obra seja paga e ficha/amostras gratuitas. Ajustar para Misto e explicitar esse limite. A referência primária foi aberta, não apenas buscada.
3. **Média — referência SOLID inacessível:** conteúdo inicial ainda continha arquivo histórico ObjectMentor via Archive com acesso não confirmado. Principal informou substituição por Solid Relevance, diretamente aberto nesta revisão; aguarda reconferência.

Adicionais abertos por web.open em20/10/2026, todos em inglês. Gratuitos salvo observação:

| Fonte | Conteúdo efetivamente conferido | Limite |
|---|---|---|
| [Presentation Domain Data Layering](https://martinfowler.com/bliki/PresentationDomainDataLayering.html) | separação lógica,camadas versus tiers,módulos de domínio internamente organizados | Fowler2015; não impõe estrutura física/distribuição |
| [Repository](https://martinfowler.com/eaaCatalog/repository.html) | intenção,modelo de domínio/consultas e contexto | catálogo resumido2003,autoria do item Edward Hieatt/Rob Mee no catálogo Fowler; não livro integral |
| [Design Patterns — InformIT](https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-9780201633610) | ficha,descrição,sumário e prefácio | obraENpaga; edição1,publicada1994/copyright1995,ISBN9780201633610; não é confirmação da tradução Bookman |
| [Abstract Factory — amostra oficial](https://www.informit.com/articles/article.aspx?p=1398599) | amostra específica vinculada no catálogo | trecho gratuito,sem inferir obra integral gratuita |
| [Adapter — amostra oficial](https://www.informit.com/articles/article.aspx?p=1398600) | amostra específica vinculada no catálogo | trecho gratuito,exemplos clássicos não obrigam outra linguagem |
| [Laravel Directory Structure](https://laravel.com/docs/13.x/structure) | introdução permite organização livre com autoload; diretórios e recursos nativos | Laravel13; final https://laravel.com/framework/docs/13.x/structure ; Actions autorais não são padrão nativo obrigatório |
| [Express Routing](https://expressjs.com/en/guide/routing.html) | app.route/express.Router e montagem modular | final https://expressjs.com/en/guide/routing/ ; Router organiza transporte,não decide domínio |
| [PostgreSQL Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html) | CHECK/UNIQUE/FK/exclusion e alerta sobre outras linhas | versão18; CHECK sobre outras linhas não fornece garantia contínua concorrente |
| [pmjones/adr](https://github.com/pmjones/adr) | README do autor e links conceituais | URL usada no código também aberta,com intenção coerente com site canônico |

Nenhum gabarito ou implementação resolvida foi encontrado no novo arquivo de conteúdo. Exemplos de entradas/saídas e regras são contratos públicos de atividade. Ainda pendente auditar os prompts preparadores que serão adicionados; uma base gerada não pode receber a correção,causa-raiz ou suíte alvo pronta.

## Reconferência dos ajustes e preparação

Conferidos novamente stage-eleven.ts,preparation.ts,preparation-prompt.ts,curriculum.ts,prompts.ts após aviso do implementador:

- SOLID utiliza texto direto Solid Relevance acessível; arquivo histórico bloqueado deixou de ser referência essencial.
- `11-patterns` marca obra paga e limita gratuidade à ficha/amostra; quatro livros têm metadados coincidentes com as fichas consultadas; Código Limpo omite ano não confirmado.
- Ex14/projeto e prompts exigem autorização atual em replay,inclusive revogação para o mesmo ator. Apoio adicional diretamente aberto: [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), seção Validate the Permissions on Every Request,EN,gratuito,consulta20/10/2026; a aplicação específica em replay é inferência de engenharia a partir dessa orientação, não regra de RFC9110.
- Resolvers preservam equivalência escolhendo recursos nativosLaravel ou Express/Knex+pg/mesmoclientpg; não exigem ambas as stacks e não inventam API transacionalExpress.
- Bases B/C mantêm estado inicial e trabalho reservado separados. Ex07 não antecipa idempotência do14; C14 pode conter operação transacional preexistente pois objetivo é deduplicação; C18 oferece base alternativa sem exigir integrador concluído. Documentos/modelagem não demandam infraestrutura artificial.
- Preparação proíbe diagnóstico/localização/patch/suíte-alvo/ADRs justificados e exige declaração honesta quando não executada; ajuda/revisão não premiam quantidade de classes nem fingem execução.

**Lacuna residual encaminhada antes de correção:** initial da11-ex04 dizia que o substituto usa unidade incompatível. Embora unidade apareça como risco no enunciado, é preferível fornecer somente divergência de resultado/roteiro, sem afirmar causa da instância gerada. Recomendada substituição por sintoma neutro; reconferir antes do gate final.

### Adendo sobre capas reutilizadas

O principal informou autorização persistente do usuário para capas reais locais previamente incorporadas. Foram verificadas por leitura de bytes e SHA256 as três cópias em `public/assets/books/stage11/`, as três em `public-roadmap/assets/books/stage11/` e seus assets de origem já existentes: todas idênticas e hashes coincidem com covers-origin.json. Isso demonstra proveniência/reutilização, não licença editorial livre. DDD permanece fallback pois uma nova licença específica não foi demonstrada. Nenhum direito de editora foi inferido a partir do fato de ser possível baixar a imagem.

Conclusão desta rodada: contratos conceituais,recursos de stack e bibliografia diretamente verificada estão adequados ao recorte,com as limitações explícitas acima. Não foi executada futura API nem banco de estudante; testes de plataforma e inspeção visual pertencem aos relatórios próprios. GrupoA permanece investigação não verificada por acesso direto. Gate final aguarda apenas reconferência do texto inicial04 e evidências de teste da integração feitas pelo principal.

## Gate factual final — 20/10/2026

Reconferência direta concluiu que initial04 informa apenas divergência em caso de fronteira,sem causa/localização; restrição global de preparação preserva explicitamente mecanismos preexistentes e proíbe somente soluções que sejam objetivos da atividade. Ex07 não antecipa chave de idempotência nem mantém entrada/saída contraditória: segunda solicitação recusa409 e preserva histórico1. Ajustes das rodadas anteriores foram mantidos.

**Resultado: sem bloqueante conceitual/factual aberto no escopo auditado.** Fontes essenciais efetivamente abertas,versões/idioma/custo/limites registrados; bibliografia não acessível por403 permanece investigação documentada e não é promovida a recomendação verificada. Direitos das capas permanecem reservados; proveniência local é verificável,licença livre não é alegada. Nenhum gabarito encontrado no conteúdo/prompts revisados. Auditoria confirma coerência dos contratos e rastreabilidade,não certifica execução de projetos gerados,competência do estudante ou conformidade visual. Testes de integração/progresso/build/UI devem ser avaliados pelas evidências do principal.

## Adendo — alternativas gratuitas para padrões

Revisão independente solicitada após a curadoria inicial depender de ficha de obra paga para vários padrões. Em20/10/2026 foram abertos diretamente com web.open os cinco artigos abaixo,localizadas suas seções Propósito,Aplicabilidade e Prós e contras,e confrontada a atribuição em `stage-eleven.ts` (agora29referências). Texto efetivo em português brasileiro; navegação contém itens EN,sem tornar EN o idioma principal dos artigos. Acesso sem login/pagamento às seções citadas. Ofertas de livro/curso premium aparecem separadamente; não foi inferida gratuidade integral do site,licença livre de conteúdo ou leitura de produto pago. Material autoral Refactoring.Guru sobre os padrões; não confundir com o texto original do GoF,norma universal ou garantia de adequação a qualquer código.

| Referência | Recorte conferido | Julgamento e limite |
|---|---|---|
| [Strategy](https://refactoring.guru/pt-br/design-patterns/strategy) | variação de algoritmo,intercâmbio e comparação do custo | Verificada para08; a própria página admite função/composição funcional e alerta contra classes excessivas quando há pouca variação |
| [Factory Method](https://refactoring.guru/pt-br/design-patterns/factory-method) | construção de produtos e variantes por subclasses,aplicabilidade/custo | Dependente de contexto: é variante específica por herança,não nome obrigatório de qualquer função fábrica ou seleção por configuração. Comparação livre do09 é apropriada; recomendado explicitar distinção na nota |
| [Adapter](https://refactoring.guru/pt-br/design-patterns/adapter) | compatibilidade entre interfaces/conversão,complexidade adicional | Verificada para09; não exige API de terceiro real,nem fornece política monetária do exercício. Fixtures locais continuam suficientes |
| [Observer](https://refactoring.guru/pt-br/design-patterns/observer) | assinaturas/notificações dinâmicas e trade-offs | Verificada para comparação do10; afirmação do artigo sobre ordem aleatória não é garantia universal. Ordem,sincronia,commit,retry e entrega dependem da implementação e contrato; exercício corretamente exige explicitar política |
| [Decorator](https://refactoring.guru/pt-br/design-patterns/decorator) | composição de responsabilidades,preservação de interface,ordem/custo | Verificada para10; observabilidade sanitizada que preserve retorno/erro é requisito autoral do exercício,não execução garantida por citar o padrão |

Resultado: lacuna de acesso gratuito suprida por referências específicas utilizáveis; contratos existentes continuam coerentes e não passaram a exigir compra,classes ou interfaces artificiais. Não foram copiados exemplos dos artigos para bundle nem soluções das atividades. Nota sobre Factory Method enviada ao principal antes de eventual ajuste; é precisão contextual,sem bloqueante porque09 permite explicitamente construção direta e avaliação justificada.
