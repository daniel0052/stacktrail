> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](../README.md) e o [estado atual](../../README.md). Resultados antigos não validam automaticamente a plataforma atual.

> Registro da implementação inicial da Etapa 03. A reorganização em duas trilhas,
> sem banco obrigatório e com progresso v7, está em [etapa-03-trilhas.md](../etapa-03-trilhas.md).
> Resultados históricos abaixo não aprovam automaticamente as alterações posteriores.

# Etapa 03 — verificação independente de PHP e Laravel

Consulta em 16/10/2026. Revisor separado da autoria das aulas, aplicando
`stacktrail-factchecker`. Este registro começa pela evidência normativa; não
aprova arquivos ainda não escritos. A aderência ao Notion será reconciliada pelo
inventário curricular; Notion e texto da educator não são prova técnica.

## Fontes efetivamente abertas e seções lidas

| ID | Fonte primária e seção | Condição verificada |
| --- | --- | --- |
| P01 | [PHP Supported Versions](https://www.php.net/supported-versions.php), Currently Supported Versions | 8.2–8.5 constam como suportadas; 8.5 tem suporte ativo até 31/12/2027. Não implica que toda instalação tenha o último patch. |
| P02 | [Type declarations](https://www.php.net/manual/en/language.types.declarations.php), Changelog, Nullable type syntactic sugar, Strict typing | `?T` equivale a `T|null`; unions desde 8.0; strict escalar depende do arquivo chamador, aceita int em float e não transforma PHP em TypeScript. |
| P03 | [Comparison Operators](https://www.php.net/manual/en/language.operators.comparison.php), tabela e comparação número/string | `===` considera tipo; `==` pode converter. `0 == 'a'` é falso no PHP 8, diferente do PHP 7. |
| P04 | [Arrays](https://www.php.net/manual/en/language.types.array.php), introdução | Array é mapa ordenado; não ensinar arrays PHP como simples vetores homogêneos. |
| P05 | [foreach](https://www.php.net/manual/en/control-structures.foreach.php), formas chave/valor e referências | Chaves e valores podem ser percorridos; referência ao último item continua após laço por referência e requer cuidado/unset. |
| P06 | [Classes and Objects: Basics](https://www.php.net/manual/en/language.oop5.basic.php), class/this; [Interfaces](https://www.php.net/manual/en/language.oop5.interfaces.php), exemplos e compatibilidade | Objetos têm propriedades/métodos; interface exige contrato compatível. Evitar dizer que interfaces só podem conter métodos: PHP moderno inclui propriedades com hooks desde 8.4. |
| P07 | [Namespaces overview](https://www.php.net/manual/en/language.namespaces.rationale.php), motivação e sintaxe | Namespace organiza nomes e evita colisões; não carrega automaticamente arquivo. |
| P08 | [Composer Basic Usage](https://getcomposer.org/doc/01-basic-usage.md), Installing dependencies/lock/install/update/platform/autoload | Lock fixa versões; install respeita lock, update resolve e altera lock. Composer não instala o runtime PHP. Autoloader gerado requer inclusão. |
| P09 | [PHP-FIG PSR-4](https://www.php-fig.org/psr/psr-4/), §2 | Prefixo mapeia diretório base; subdiretórios e arquivo correspondem ao nome respeitando caixa. Convenção de autoload, não requisito sintático de todo programa PHP. |
| P10 | [Built-in web server](https://www.php.net/manual/en/features.commandline.webserver.php), uso/router e avisos | `php -S` é servidor de desenvolvimento, não indicado para produção. Document root deve ser delimitada. |
| P11 | [$_POST](https://www.php.net/manual/en/reserved.variables.post.php), Description | Form-urlencoded/multipart preenchem $_POST; JSON exige leitura e decodificação do corpo. |
| P12 | [htmlspecialchars](https://www.php.net/manual/en/function.htmlspecialchars.php), Parameters/Return Values | Escape de caracteres HTML; ENT_QUOTES/SUBSTITUTE/UTF-8 explicitam intenção. Não é solução universal para JS, SQL ou URLs. |
| P13 | [filter_var](https://www.php.net/manual/en/function.filter-var.php), Parameters/Return Values | Filtro padrão não filtra; validação inválida retorna false e zero válido exige comparação estrita. Não confundir sanitização e validação. |
| P14 | [json_decode](https://www.php.net/manual/en/function.json-decode.php), Parameters/Return Values | JSON é convertido em valores; associative=true retorna objetos JSON como arrays; JSON_THROW_ON_ERROR permite distinguir falha de null válido. |
| P15 | [PDO Prepared Statements](https://www.php.net/manual/en/pdo.prepared-statements.php), introdução e exemplos | Vincular valores separa dados da instrução; concatenar outras partes não confiáveis continua perigoso. Não prometer segurança universal por usar PDO. |
| P16 | [try/catch](https://www.php.net/manual/en/control-structures.try-catch.php), try/catch; [Throwable errors](https://www.php.net/manual/en/language.error-handling.throwable.php), hierarquia/global handler | Propagação procura catch compatível; Error e Exception pertencem à hierarquia Throwable. Handler global termina script após retornar. Não confundir exceções com todo aviso diagnóstico. |
| P17 | [Traits](https://www.php.net/manual/en/language.oop5.traits.php), introdução/precedência | Reuso horizontal, sem instanciação do trait. Métodos da classe prevalecem sobre trait e trait sobre pai. |
| P18 | [DateTimeImmutable::modify](https://www.php.net/manual/en/datetimeimmutable.modify.php), Description | Retorna novo objeto e preserva original; resultado precisa ser utilizado. |
| P19 | [PSR-12](https://www.php-fig.org/psr/psr-12/), Overview/§2 | Estilo compartilhado, não sintaxe obrigatória do runtime; substitui PSR-2, recomenda quatro espaços e omitir fechamento de arquivo só PHP. |
| L01 | [Laravel 13 Release Notes](https://laravel.com/docs/13.x/releases), Support Policy/PHP 8.3 | Major 13 lançado em 17/03/2026, PHP suportado 8.3–8.5; fixar major nos comandos e reavaliar compatibilidade futura. |
| L02 | [Laravel 13 Deployment](https://laravel.com/docs/13.x/deployment), Server Requirements/Server Configuration | PHP>=8.3; extensões ctype, cURL, DOM, fileinfo, filter, hash, mbstring, OpenSSL, PCRE, PDO, session, tokenizer e XML. Servir public/index.php, jamais raiz do projeto. |
| L03 | [Laravel Validation](https://laravel.com/docs/13.x/validation), Quickstart/Validation Error Response Format | Formulário tradicional pode redirecionar; requisição esperando JSON recebe 422 com erros. Não afirmar que toda falha sempre responde JSON. |
| L04 | [Eloquent](https://laravel.com/docs/13.x/eloquent), Mass Assignment | Atribuição em massa tem proteção e whitelist. Documentação 13 atual usa atributo Fillable; compatibilidade da forma escolhida deve ser executada na versão instalada. |

## Ambiente e ensaios preliminares

`php` e `composer` não existiam no PATH. Pacotes oficiais Ubuntu 26.04 foram
baixados via `apt-get download` e **extraídos**, sem sudo/instalação, em
`/tmp/stacktrail-php-runtime/root`. Wrapper `/tmp/stacktrail-php-runtime/php`
carrega ini e bibliotecas locais. Versão observada: **PHP 8.5.4 CLI**, NTS.
Extensões observadas incluem todos os requisitos de L02 e PDO SQLite/SQLite3.
Isto não confirma instalações Windows/macOS ou ambiente do estudante.

Composer oficial baixado de `getcomposer.org/download/latest-stable/composer.phar`:
versão observada **2.10.3**, 27/08/2026. SHA-256 observado e comparado ao arquivo
oficial `.sha256sum`: `7a2d379d5b8ffdaa028580ef26494c36d2feef4b178d3dd1473a4dbc5e17c8d6`.
Não foi instalado globalmente.

Ensaio autoral temporário `semantics.php`, executado com esse wrapper: **nove
asserções passaram**: rejeição de string numérica em parâmetro strict int;
comparação 0/string não numérica; igualdade estrita versus frouxa; ordem das
chaves; zero válido e inteiro inválido em filter_var; escape HTML; JSON malformado;
PDO SQLite com valor semelhante a SQL malicioso preservado como dado.
O primeiro rascunho do próprio ensaio tinha encadeamento inválido de operadores;
foi corrigido com parênteses antes da execução bem-sucedida. Esse ensaio verifica
conceitos do runtime, **não exemplos publicados nem soluções do estudante**.

`composer create-project laravel/laravel /tmp/stacktrail-php-runtime/laravel13
'^13.0' --no-interaction --no-scripts --prefer-dist` terminou com código 0;
109 dependências instaladas no diretório temporário. `php artisan --version`
observou **Laravel Framework 13.37.0**. Scripts de setup não foram executados:
isto comprova resolução/boot básico, ainda não uma API ou migrations da aula.

## Estado de aprovação

- **Verificada:** regras normativas P02–P19 nas condições descritas.
- **Dependente de contexto ou versão:** P01/L01/L02/L03/L04.
- **Não verificada:** aulas e projetos publicados da Etapa 03 ainda não recebidos
  para esta passagem; cobertura por aula e testes de seus arquivos pendentes.
- URL antiga `language.exceptions.php` falhou no leitor e respondeu 404 na leitura
  direta. As páginas oficiais atuais P16 foram encontradas, abertas e lidas;
  eventual referência antiga das aulas deve ser atualizada.

Nenhum desses ensaios aprova produção, banco avançado, autenticação ou deploy.

## Passagem independente — fundamentos e seis aulas PHP

Currículo integral consultado pelo MCP Notion em 16/10/2026, página
`3f63cadf-ab77-81ad-9194-c805b33198d8`: retorno completo até critérios de avanço,
sem filhos, truncamento ou paginação indicados. PHP/Composer/OO e fundamentos
comuns correspondem aos tópicos originais; biblioteca, limites, exemplos e
servidor de estudo são elaboração autoral. O pedido anexado amplia profundidade
e exige CRUD Laravel completo; Node/Express/Nest continuam opcionais.

Fontes adicionais abertas/lidas: [Laravel Lifecycle](https://laravel.com/docs/13.x/lifecycle),
First Steps/Routing/Finishing Up; [Configuration](https://laravel.com/docs/13.x/configuration),
Environment Configuration/Configuration Caching; [Errors](https://laravel.com/docs/13.x/errors),
Debug Mode/Reporting; [Logging](https://laravel.com/docs/13.x/logging), Configuration;
[PHP json_encode](https://www.php.net/manual/en/function.json-encode.php),
Sequential versus non-sequential/Notes;
[Variable scope](https://www.php.net/manual/en/language.variables.scope.php),
function/global scope; [strlen](https://www.php.net/manual/en/function.strlen.php)
e [mb_strlen](https://www.php.net/manual/en/function.mb-strlen.php), Return Values;
[PSR-3](https://www.php-fig.org/psr/psr-3/), introdução/§1;
[PSR-7](https://www.php-fig.org/psr/psr-7/), introdução/mensagens.

### Lacuna apresentada antes de correção

**PHP-CLI-01, média, pendente:** `examples/stage-03/php-basics/bin/livros.php`
promete lista JSON, mas decodifica com `associative=true` e usa `array_is_list`.
`{}` vira array vazio; objeto com chave textual `"0"` vira array com índice 0.
Ambos foram aceitos com exit 0, contrariando o contrato de lista. Fontes P14 e
json_encode/Notes sustentam a perda de distinção. Impacto: aula `php-dados`,
exercício 1 e CLI de referência; não invalida a semântica correta de strict_types.
Enviado ao autor antes de correção. Proposta: preservar objetos na decodificação,
exigir array na raiz e conferir/converter cada objeto explicitamente. Regressões
devem executar a CLI real com `{}` e `{"0":{"title":"A","author":"B"}}`.

### Execuções observadas

Cópia de `examples/stage-03/php-basics` em `/tmp/stacktrail-php-runtime/php-basics`.
`composer install --no-interaction --no-plugins --no-scripts` gerou autoload/lock;
sem dependências externas necessárias. Houve aviso de DNS inacessível do
Packagist na execução sandbox; não foi tratado como consulta bem-sucedida de
advisories. `composer check-platform-reqs` passou para PHP/json/mbstring.
`composer test`: **12 verificações passaram**, exit 0. `composer demo`: dois
livros normalizados, título Redes/PHP, anos 2024/null, exit 0.

Oito ensaios externos da CLI: lista vazia, JSON quebrado, null, objeto vazio,
objeto de chave numérica, título numérico, ano textual e arquivo de 100001 bytes.
Seis passaram; os dois objetos foram aceitos incorretamente, conforme PHP-CLI-01.

Blocos PHP extraídos diretamente das cinco MDX, escritos como arquivos temporários
e executados (sem eval):

| Aula | Observado | Conceitos/classificação |
| --- | --- | --- |
| php-inicio | `Redes` e `Limite: 200`, exit 0 | concatenação/constante/trim/CLI: **Verificada**; ciclo tradicional vs persistente: **Dependente de contexto ou versão**, corretamente delimitado |
| php-tipos | bools previstos, ramo Nenhum exemplar; seis variações de ano passaram | nullable/domínio/strict/igualdade: **Verificada** no PHP 8.5.4 e condições P02/P03 |
| php-colecoes | `["Redes","PHP"]`; filtro por termo, ausente, vazio, entrada malformada e preservação do original passaram | mapa/keys/lista/escopo: **Verificada**; mbstring é requisito explícito |
| php-dados | Redes; datas `2026-10-16T09:00:00-03:00` e `10:00:00-03:00`, exit 0 | JSON/exceções/data imutável: **Verificada**; alegação de exigir lista na CLI: **Parcialmente correta**, PHP-CLI-01 pendente |
| php-objetos | Redes/catálogo; relógio fixo produziu data prevista; readonly e vazio lançaram falhas esperadas | composição/interface/trait/invariantes: **Verificada**, recursos recentes delimitados |
| composer | autoload real carregou Livro, testes/demo acima passaram | PSR-4/plataforma/install/lock: **Verificada** no ambiente; ZIP do laboratório ainda não verificado nesta fase |

Exemplos sem abertura PHP no segundo bloco foram executados como continuação do
primeiro arquivo da própria aula, sem unir definições de aulas diferentes. Foram
acrescentadas apenas chamadas de prova para funções/classes publicadas. Não
executamos qualquer código do estudante.

### Rubrica pedagógica independente

Ordem das notas: alinhamento, progressão, precisão, explicação, prática, autonomia,
reprodutibilidade (0–4). Gate de PHP-CLI-01 mantém duas dimensões em 2 nas aulas
que dependem do contrato da CLI, até a correção reconferida.

| Aula | Notas | Evidência concreta/limite |
| --- | --- | --- |
| ciclo | 3/3/3/3/4/3/3 | Percurso POST explicado, três falhas contrastadas, transferência de limite/tamanho. Modelo distinto de Laravel explicitamente; validação de UI delegada à auditoria própria. |
| configuracao | 3/3/3/3/4/3/3 | Dois públicos do erro, cache/env, alteração antes/depois e logs mínimos; execução Laravel da atividade ainda será conferida com projeto. |
| dependencias-testes | 3/3/3/3/4/3/3 | Lock/install/update diferenciados, invalidez sem mutação e teste vermelho exigido; versões opcionais pertencem ao revisor Node. |
| php-inicio | 3/3/3/3/3/3/3 | Arquivo explicado por instrução, erro de sintaxe induzido e contraste de duração do estado. Fluxos de instalação por SO não executados. |
| php-tipos | 3/3/4/4/4/3/3 | Contraexemplos strict chamador, int→float, falso/zero e seis fronteiras exigidas. |
| php-colecoes | 3/3/3/4/4/3/3 | Forma do item validada, chaves/IDs separados, termo vazio e limite N transferem conceito. |
| php-dados | 3/3/2/3/4/3/2 | Mecanismos de fronteira bem explicados; referência CLI contradiz lista estrita até correção PHP-CLI-01. |
| php-objetos | 3/3/3/4/4/3/3 | Invariante, readonly não profundo, relógio fixo e composição justificada; implementações extras ficam como tarefa verificável. |
| composer | 3/3/3/3/4/3/3 | Namespace/caminho/caixa e scripts reais, restauração de erro e nova classe como transferência. ZIP ainda não disponível é dependência da fase 5, não execução declarada. |

Ausência de outros erros graves nesta passagem não aprova Laravel nem cobertura
integral da nova etapa. Gate do contrato CLI permanece aberto até reteste.

### Reconferência PHP-CLI-01

Autor corrigiu decodificação preservando objetos, raiz array e cada item stdClass,
convertido somente após a validação. Os oito casos adversos reais foram repetidos:
**8/8 passaram**, incluindo os dois objetos rejeitados com exit 1. A regressão
persistente `tests/cli.php` também executou processos reais e passou seus oito
casos; `tests/run.php` permaneceu com 12 verificações verdes. Estado **validado**;
afirmação de exigir lista passa de Parcialmente correta a **Verificada**.
Rubrica final de `php-dados`: **3/3/3/3/4/3/3**. Gate PHP dos conceitos inventariados
sem bloqueante; ZIP e UI permanecem escopo de suas fases próprias.

## Primeira execução do projeto Laravel autoral

Cópia revisada de `examples/stage-03/laravel-api` em
`/tmp/stacktrail-php-runtime/laravel-api`. Não foi lido arquivo privado de ambiente
nem usado banco externo. SQLite descartável criado nessa cópia.

`composer install --no-interaction --no-plugins --prefer-dist` resolveu Laravel
13.37.0/PHPUnit 12.5.40. Primeira execução de `@php artisan package:discover` falhou
porque subprocesso usa PHP_BINARY sem o `-c` do wrapper isolado. Repetição com
`PHPRC=/tmp/stacktrail-php-runtime/php.ini` e LD_LIBRARY_PATH locais herdados passou;
limitação do runtime de teste, não falha reproduzida numa instalação PHP normal.
`composer check-platform-reqs` e `php artisan migrate --force --no-interaction`
passaram no SQLite novo. `--force` só foi usado nessa cópia descartável autorizada.

**LAR-TEST-01, média, pendente:** PHPUnit rodou cinco testes, com 27 asserções e
um erro. `BooksTest::test_invalid_data_does_not_create_or_change_book` passa
stdClass para postJson/patchJson, mas Laravel 13.37 exige array nesses helpers.
O TypeError ocorre antes de testar o contrato; portanto não pode ser contado
como rejeição de domínio bem-sucedida. Proposta enviada antes de correção:
usar `call` com corpo bruto `{}` e headers para representar objeto JSON vazio.

Servidor real via `php artisan serve --host=127.0.0.1 --port=8263 --no-reload`;
15 casos com **cURL real** compararam status e dados: health200, lista vazia200,
objeto vazio422, título numérico422, JSON quebrado400, mídia415, 16385bytes413,
lista ainda vazia após falhas, criação201 sem campo desconhecido, consulta200,
PATCH só autor preservando título200, PATCH vazio422, query não textual422,
DELETE204 sem corpo e GET posterior404. Todos esses contratos passaram.

**LAR-LOG-01, baixa/média, pendente:** 400/413/415 retornam cedo no
RequestBoundary, sem X-Request-Id e sem `request.completed`; demais respostas
observadas têm identificador. Não prometer que todo erro tem correlação enquanto
isso permanecer. Autor informado; decidir corrigir finalização ou comunicar
recorte. Este ponto não implica ausência de todo log do servidor PHP.

Fontes adicionais consultadas diretamente: [Laravel Container](https://laravel.com/docs/13.x/container),
Zero Configuration Resolution/Binding; [Routing](https://laravel.com/docs/13.x/routing),
rotas/binding; [HTTP Tests](https://laravel.com/docs/13.x/http-tests), Making Requests;
[Validation](https://laravel.com/docs/13.x/validation), Form Requests/after/validated.
FormRequest valida antes da ação; `validated()` seleciona campos. Modelo Book com
`$fillable` funcionou na execução desta versão, apesar de a documentação atual
apresentar atributos Fillable. Não alegar que o formato antigo deixou de existir
só porque deixou de ser o exemplo principal da página.

Aulas Laravel ainda em redação nesta passagem: sem rubrica/validação integral
antecipada. Testes externos de produção e instalações em outros SO não executados.

### Reconferência de LAR-TEST-01 e LAR-LOG-01

Correções do autor copiadas para o projeto temporário: JSON bruto via `call` nos
casos de objeto vazio; middleware finaliza também as respostas antecipadas.
`composer test` passou: **5 testes, 38 asserções**, exit 0. O primeiro reteste ainda
usava middleware antigo na cópia e flagrou ausência de header; copiar os dois
arquivos correspondentes resolveu a divergência sem alterar esperado. Ambos os
achados estão **validados**, sem erro aberto nesses contratos.

Os 15 casos de cURL foram repetidos integralmente e passaram; agora todos têm
X-Request-Id, inclusive 400/413/415. Uma 16ª prova adicionou rota `/audit-failure`
**apenas na cópia temporária**, lançando RuntimeException com marcador fictício.
APP_DEBUG=false respondeu 500 `{ "message": "Server Error" }`, sem marcador nem
stack. A rota não integra a referência distribuída. Isso observa proteção do erro
nesse cenário, sem certificar segurança completa.

`composer test` de PHP atualizado executou **12 verificações da classe e oito
casos CLI**. `composer validate --no-check-publish` passou com aviso não bloqueante
de licença ausente. Locks da resolução efetiva foram copiados, com autorização,
para `examples/stage-03/{php-basics,laravel-api}/composer.lock`; vendor, caches,
SQLite e configuração temporária não foram copiados. Composer 2.10.3/PHP 8.5.4.

## Fase 4 — cinco aulas Laravel definitivas

Leitura integral independente das cinco MDX e dos arquivos de projeto relacionados.
Nenhum bloqueante técnico ou pedagógico novo encontrado nessa passagem. Os achados
de execução anteriores permanecem documentados acima, com correção reconferida.
Revisão de fontes não se baseou na declaração de consulta feita pelo autor.

| Aula/conceito | Confronto direto com fonte/seção | Resultado e execução pertinente |
| --- | --- | --- |
| laravel-inicio: runtime/requisitos/scaffold | L01/L02; [Routing13](https://laravel.com/docs/13.x/routing), API Routes | **Dependente de contexto ou versão**: PHP8.3–8.5/Laravel13 explícitos. Scaffold ^13.0 resolvido e boot Artisan executado. `install:api` instala Sanctum; registro direto/prefixo vazio é política do projeto, confrontada no bootstrap. |
| laravel-inicio: ponto público/estrutura | Lifecycle, First Steps; Deployment, Server Configuration | **Verificada**: public/index.php e bootstrap fazem entrada, sem regra de Livro. Nenhuma alegação de servir pasta raiz ou implantar produção. Projeto real respondeu via serve local. |
| laravel-rotas: health/JSON/path/query | [Responses13](https://laravel.com/docs/13.x/responses), JSON Responses; Routing, Route Parameters | **Verificada**: helper serializa e define application/json; query/body/path separados. Health200, filtro de query e query de tipo inválido observados em cURL. |
| laravel-rotas: model binding | Routing, Implicit Binding | **Verificada**: segmento book e parâmetro Book $book correspondem; ausência404. Restrição whereNumber precede ação; consulta existente/ausente executadas. |
| laravel-rotas: middleware de volta | [Middleware13](https://laravel.com/docs/13.x/middleware), definição de middleware; Lifecycle, Finishing Up | **Verificada** para o middleware distribuído: retorna Response e finaliza inclusive erros antecipados; headers/logs de 400/413/415 reconferidos. Modelo visual não apresentado como cadeia interna completa. |
| laravel-validacao: validated/FormRequest/after | Validation13, Form Request Validation/Performing Additional Validation/JSON Error Response | **Verificada**: valida antes da ação, dados conhecidos selecionados; PATCH sometimes+required e objeto sem campos recusados. POST/PATCH inválidos não alteraram armazenamento na suíte. |
| laravel-validacao: status/contextos | Validation13, Validation Error Response Format; código RequestBoundary/BookController | **Verificada** como contrato local:400 sintaxe,422campos,201criação,204vazio; redirecionamento web e JSON condicionados explicitamente. CRUD real e exclusão posterior404 observados. |
| laravel-container: DI/concreto/interface | [Container13](https://laravel.com/docs/13.x/container), Zero Configuration Resolution/Binding Interfaces; [Providers13](https://laravel.com/docs/13.x/providers), Register/Boot | **Verificada**: DI difere de container; classe concreta pode ter resolução automática; interface exige escolha. Recorte bind pressupõe classes/imports e provider, não é arquivo autônomo. Controller real teve BookPresenter resolvido; teste unitário observa seleção pública. |
| laravel-container: singleton/organização | Container, Binding A Singleton; código do projeto | **Dependente de contexto ou versão**: instância compartilhada no ciclo do container e cuidado com processos persistentes. Action/Service/repository são decisões contextuais identificadas como autorais, sem promessa normativa de arquitetura superior. |
| laravel-testes: migrations/model/fillable | [Migrations13](https://laravel.com/docs/13.x/migrations), Migration Structure/Running/Rolling Back/Creating Tables; Eloquent, Mass Assignment | **Verificada** no recorte: migration muda esquema, não contém catálogo; rollback pode apagar dados; fillable não autoriza nem valida. Migration SQLite real passou; mass assignment/seleção pública confrontados pelos testes. |
| laravel-testes: helper versus HTTP real | HTTP Tests, Making Requests/JSON Assertions; assinatura MakesHttpRequests.php da versão instalada | **Verificada**: postJson recebe array; call permite corpo JSON bruto. Exemplo corrigido não conta TypeError do teste como falha de domínio. Cinco testes/38asserts e cURL observam camadas distintas. |
| laravel-testes: banco em memória/isolamento | [Database Testing13](https://laravel.com/docs/13.x/database-testing), Resetting Database After Each Test | **Dependente de contexto ou versão**: RefreshDatabase usa configuração/transactions conforme estado; aqui SQLite :memory: é explícito. Livro do arquivo de desenvolvimento foi criado por HTTP, suíte repetida e GET manteve o título; isolamento observado. |

Fontes da tabela abertas e seções lidas em16/10/2026. A fonte Database Testing
explicita que RefreshDatabase pode usar transação com schema atualizado; a aula
não diz que ele sempre derruba/recria qualquer banco. As condições perigosas de
configuração externa são avisadas no README e na atividade.

### Rubrica final por aula

Ordem: alinhamento, progressão, precisão, explicação/exemplos, prática/avaliação,
autonomia/apresentação, reprodutibilidade/honestidade.

| Aula | Notas (0–4) | Evidência da avaliação |
| --- | --- | --- |
| laravel-inicio | 3/3/3/3/4/3/3 | Pré-requisito PHP/Composer identificável; duas entradas separadas no ecossistema, significado dos comandos e prefixo; atividade prevê URL só pelo bootstrap e transfere porta/segurança. Não afirma executar setup no computador do estudante. |
| laravel-rotas | 3/3/3/4/4/3/3 | Closure mínima explicada por instrução; evolução para controller/binding, parâmetros e volta de middleware; contraste lista vazia200/recurso404 e atividade de header/medição. Trechos incompletos indicam arquivo/imports/contexto. |
| laravel-validacao | 3/3/4/4/4/3/3 | Contrato de entrada/saída, domínio versus parsing, autorização distinta, campos extras e PATCH; prática exige prever limites200/201 e provar não alteração. Sem aprovação automática no browser. |
| laravel-container | 3/3/3/4/4/3/3 | Motivação concreta do presenter, distinção DI/container e binding; singleton contextualizado; atividade exige teste de saída e justificar aceitar/rejeitar Action em caso novo. Arquitetura não tratada como receita universal. |
| laravel-testes | 3/3/4/4/4/3/3 | Migration/arquivo/Model/whitelist discriminados; assert de efeito além de status; objeto JSON vazio versus array e helper corrigidos; experimento de isolamento e defeito deliberado de DELETE avaliam transferência. |

Não há dimensão abaixo de3 nos conceitos auditados. A etapa de revisão textual,
fontes e execução PHP/Laravel da **fase 4 está verificada localmente**, sem ampliar
essa decisão para UI, ZIP ainda não inspecionado ou trilhas opcionais. Instalação
em outros SO, deploy, carga/concorrência, segurança completa e aprendizagem com
estudantes reais não foram verificados. A prova de persistência através de reinício
é atividade proposta; este revisor observou arquivo e isolamento de testes, sem
alegar que executou todos os experimentos deliberados sugeridos ao estudante.

## Exercícios obrigatórios e instruções da bancada

Revisão independente de `exercises.ts` (03-ex01/03/05/07/09),
`components/backend/CodeLab.tsx`, `features/backend/projects.ts` e integração
Lab. Escopo desta passagem: contratos, progressão, evidência e honestidade das
instruções; acessibilidade/layout e persistência são verificados em auditoria
própria, não inferidos da leitura do TSX.

**LAR-EX03-01, média, pendente — progressão/teste apropriado:** enunciado03-ex03
pede health/listagem e testes de vazio/rota inexistente. Seu starter deixa todas
as ações de BookController pendentes, inclusive CRUD. CodeLab apresenta o comando
`composer test` do projeto Laravel inteiro. Esse comando executa testes CRUD do
ex05; portanto uma solução correta do ex03 não consegue deixar a suíte inteira
verde sem implementar competências posteriores. Comunicado ao autor antes de
correção. Proposta: teste/filtro específico health/lista/rota inexistente e comando
contextual; manter suíte completa para ex05/07. Não enfraquecer os testes CRUD.

| Exercício | Objetivo → atividade → evidência | Rubrica (sete dimensões na mesma ordem) |
| --- | --- | --- |
| 03-ex01 | Invariantes/Composer/CLI; implementar Livro e recusar objeto como lista; testes de fronteiras/tipos/serialização e exit/README. Referência real tem20 verificações, sem aprovar tentativa pelo download. | 3/3/3/3/4/3/3 |
| 03-ex03 | Primeiras rotas/prefixo; produzir health/lista/ausência; route:list e testes do recorte. Requisito correto, comando inicial ainda exige suíte de competências posteriores (LAR-EX03-01). | 3/2/3/3/2/3/2 |
| 03-ex05 | CRUD com FormRequest/persistência simples; comparar efeito após422 e DELETE; banco de teste isolado, IDs reais e README. Coerente comAPI executada5/38+HTTP real. | 3/3/3/3/4/3/3 |
| 03-ex07 | Integrar uma API Laravel de domínio escolhido; instalação limpa/revisão/README/configuração e efeitos; exige evidências próprias, nenhum opcional obrigatório. Aula projeto ainda pendente nesta passagem, não avaliada antecipadamente. | 3/3/3/3/4/3/3 |
| 03-ex09 | Reproduzir achado antes de corrigir; distinguir hipótese/melhoria/bug e ADR contextual; reteste ou ausência de bug restrita ao escopo. Rubrica30/20/25/15/10 corresponde ao Notion lido. | 3/3/3/3/4/3/3 |

Dicas orientam decisões sem entregar arquivos completos. Exemplos distinguem
saída esperada de observada; critérios exigem teste/efeito e explicação, não
identidade textual com gabarito. Casos de ex07/09 são cenários de processo,
adequados à avaliação de integração/decisão; não substituem testes de API.

CodeLab informa explicitamente “Nenhum código é executado aqui”, diferencia
“Verificar registro” de testes, mantém proposta inicial pendente e exemplo
resolvido em seção separada. Exportar ZIP não conclui exercício. O formulário
rotula evidências/reflexão e estado “Concluído por autoavaliação”; prompt requer
cópia manual, sem envio automático. Isto atende honestidade de execução externa
no texto observado. Não prova que estudante executou comandos ou que o ZIP está
correto; a inspeção do artefato e jornadas funcionais permanecem necessárias.

Fundamentos+PHP+Laravel: 14 aulas revisadas individualmente (3+6+5), notas finais
≥3 após PHP-CLI-01; cinco exercícios obrigatórios inventariados, com gate de
progressão03-ex03 pendente. Projeto/decisão ainda aguardam aulas definitivas.

## Reconferência independente final — 17/10/2026

O diretório temporário histórico deixou de existir na retomada. Seus resultados
acima permanecem históricos; esta passagem refez o ambiente em
`/tmp/st03-php-final`, com pacotes oficiais Ubuntu26.04 extraídos, sem instalação
global, sudo ou leitura de `.env`. PHP observado: **8.5.4**; Composer **2.10.3**,
SHA256 oficial reconferido:
`7a2d379d5b8ffdaa028580ef26494c36d2feef4b178d3dd1473a4dbc5e17c8d6`.
Laravel **13.37.0**, PHPUnit **12.5.40**, conforme lock distribuído.
Foram executados somente projetos autorais publicados e mutação de prova do
revisor, nunca código/rascunho de estudante.

### LAR-EX03-01 — corrigido e validado

Fontes consultadas diretamente nesta passagem:
[Composer Scripts](https://getcomposer.org/doc/articles/scripts.md), seções
Running scripts manually/Writing custom commands, que documentam argumentos após
`--`; [PHPUnit12.5 TextUI](https://docs.phpunit.de/en/12.5/textui.html), opção
`--filter`, que seleciona nomes de testes. Conceito: encaminhar o filtro para o
script PHPunit. Classificação **Verificada**, nas versões acima.

O CodeLab agora apresenta `composer test -- --filter=FirstRoutesTest` somente no
03-ex03. `FirstRoutesTest` usa banco em memória via configuração de testes e
verifica health200/statusok, lista200/JSON[] e rota ausente404. Comando efetivamente
executado na cópia limpa: **1 teste/5 asserções, exit0**. A suíte inteira continua
intacta: **6 testes/43 asserções, exit0**.

Contraexemplo de progressão: substituí **apenas na cópia temporária** o controller
por `index` retornando `[]` e ações CRUD lançando exceção deliberada. O filtro
continuou passando1/5; `composer test` completo falhou com **3 falhas em6testes**.
Assim, uma solução do recorte inicial não é obrigada a resolver CRUD para passar
seu teste, e os testes posteriores não foram enfraquecidos. O controller original
foi restaurado em seguida. Gate anterior encerrado: **validado**. Rubrica final
03-ex03: **3/3/3/3/4/3/3**, sustentada pelo recorte executado e pela distinção
explícita entre referência resolvida e evidência da tentativa.

### Biblioteca e artefatos distribuídos

- Cópia limpa de php-basics: `composer install`, seguido de `composer test`,
  passou **12 verificações de classe e8casosCLI**. PHP_STUDY_BINARY apontou para
  o wrapper isolado, para herdar extensões nos subprocessos.
- ZIP PHP e Laravel gerados em `public/study/stage-03` foram abertos por biblioteca
  ZIP independente (Python): CRCs íntegros, **8 e32 arquivos**, nomes/conteúdo
  idênticos aos manifests correspondentes, ambos com composer.lock/README e sem
  vendor/node_modules/.env. Laravel contém FirstRoutesTest e diretórios runtime
  com placeholders. Isso verifica o artefato presente nesta passagem, não futuros
  arquivos regenerados ou todos os extratores ZIP.
- Ambos os ZIPs foram extraídos em diretórios novos; instalação e testes refeitos:
  PHP **12+8** verdes; Laravel **6testes/43asserções** verdes; Laravel
  `composer check-platform-reqs` passou. Dependências vieram do lock, sem update.
  O ZIP Laravel inicial com rede desabilitada não instalou por cache indisponível;
  repetição autorizada com Composer normal instalou corretamente. Uma tentativa
  de usar `install --offline` foi rejeitada pelo CLI (opção inexistente), corrigida
  antes do ensaio válido; não é comando recomendado ao estudante.
- O sandbox emitiu `Failed to create stream fd: Operation not permitted` nos
  subprocessos de Composer; comandos finais acima tiveram exit0 e as contagens
  relatadas. Não foi atribuído esse diagnóstico à aplicação de estudo.

Esta passagem não repetiu os16ensaios cURL históricos, nem alegou nova medição de
produção, carga, instalação Windows/macOS, aprendizagem ou execução do código do
estudante. A execução atual confirma o filtro, suíte, biblioteca e ZIP publicados;
as condições e limitações das fontes históricas continuam explícitas. A revisão
final das aulas `decisao`/`projeto`, ainda em elaboração no momento deste registro,
permanece responsabilidade da auditoria integrada, sem aprovação antecipada.

## Revisão das aulas finais e exercícios obrigatórios — 17/10/2026

Leitura independente integral de `decisao.mdx`, `projeto.mdx` e dos cinco
exercícios obrigatórios atualizados (01/03/05/07/09). Conferidos requisitos,
commonErrors, testIdeas, dicas, critérios e comandos. Não houve correção de
produto por este revisor.

| Aula/conceito | Fonte primária consultada diretamente/seção | Classificação e confronto |
| --- | --- | --- |
| decisao: PHP-FPM e duração dos processos | [PHP-FPM](https://www.php.net/manual/en/install.fpm.php), introdução/process management/pools; [Octane13](https://laravel.com/docs/13.x/octane), Introduction/Dependency Injection and Octane | **Dependente de contexto ou versão**: FPM gerencia workers; Octane mantém a aplicação entre requisições. A aula evita a afirmação falsa de processo novo obrigatório e separa CLI/servidor tradicional/persistente. Octane/FPM não instalados neste ensaio. |
| decisao: Node/I/O/event loop | [Node Event Loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick), What is the Event Loop?/fases | **Verificada** no nível conceitual: espera de I/O permite outros trabalhos; JavaScript síncrono pesado pode bloquear o processo. Não há benchmark apresentado como resultado. Map por instância é comportamento local conferido nos arquivos dos projetos, não propriedade de toda implantação dessas stacks. |
| decisao: SQLite/contexto de escolha | [SQLite Appropriate Uses](https://www.sqlite.org/whentouse.html), usos/sites/situações para client-server | **Dependente de contexto ou versão**: armazenamento local e escrita concorrente têm condições; a aula pede reavaliar requisitos, sem limite universal inventado. Comparar Map e arquivo não isola o efeito do framework. |
| decisao: ADR | [Michael Nygard, Documenting Architecture Decisions](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions), Decision/Context/Consequences | **Verificada** como prática de documentação: contexto, escolha e consequências incluem custos. Template simplificado autoral não é especificação obrigatória; alternativa não executada é identificada. |
| decisao: diferenças de contrato | Controllers/FormRequest/DTO/pipe dos três projetos distribuídos | **Verificada** por leitura para o recorte: Laravel422, Nest400 e extras rejeitados; Laravel/Express usamLocation, Nest atual não. A aula expõe essa diferença, não promete equivalência automática. Resultados de runtime das trilhas opcionais pertencem ao relatório Node. |
| projeto: execução, lock e configuração | [Composer Basic Usage](https://getcomposer.org/doc/01-basic-usage.md), Installing Dependencies/lock; [Configuration13](https://laravel.com/docs/13.x/configuration), Environment/Debug Mode | **Verificada** com condições: install respeita lock, não instala PHP; ambiente fictício e debug false delimitados. Instalação/testes do ZIP foram executados nesta revisão. |
| projeto: validação/isolamento | [Validation13](https://laravel.com/docs/13.x/validation), FormRequest/JSON errors/validated; [Database Testing13](https://laravel.com/docs/13.x/database-testing), Resetting Database | **Verificada** no projeto: banco :memory: explícito e RefreshDatabase, retorno422 e seleção de campos; não é promessa universal de isolamento com qualquer configuração externa. Suíte6/43 observa efeitos/não mutação. |
| projeto: erro inesperado/correlação | Configuration13 Debug Mode; RequestBoundary e pipeline reais Laravel13.37 | **Verificada** em nova prova temporária: rota autoral de auditoria lança RuntimeException; teste1/3asserts passou para500/JSONgenérico/XRequestId. Log stderr mostrou diagnóstico interno e request.completed com mesmo identificador/status500. A prova não foi adicionada ao produto; não certifica ausência de vazamentos em todos os erros. |

Fontes desta tabela abertas e seções lidas em17/10/2026; informações anteriores
da autoria não foram aceitas como prova. A afirmação de abstrações “pagarem seu
custo” é recomendação pedagógica contextual, não lei normativa nem superioridade
medida de arquitetura.

### Reprodutibilidade dos READMEs

Além da instalação/testes dos ZIPs acima, segui a alternativa documentada de
preparação Laravel: copiar **environment.example fictício** para configuração
local da cópia temporária, criar arquivo SQLite vazio e executar migrate. A
migration passou. Antes disso, `migrate --no-interaction` sem preparação recusou
modo production e, com APP_ENVlocal mas arquivo ausente, indicou arquivo ausente;
esses passos não interativos acrescentados pelo revisor não correspondem ao
fluxo interativo que pede confirmação. A alternativa manual descrita no README
resolveu ambos sem --force nem operações sobre dados reais. README PHP contém
requisitos, instalação, testes, demo, interpretação e limites coerentes com12+8
verificações executadas. Nenhum segredo existente foi acessado.

### Rubrica pedagógica final

Dimensões na ordem definida pela skill; todas as notas referem-se ao escopo local
observado, sem substituir teste de aprendizagem com estudantes.

| Unidade | Notas | Evidência |
| --- | --- | --- |
| decisao | 3/3/4/4/4/3/3 | Caso de equipe/hospedagem concreto, modelos com condições, comparação de contratos e contraexemplo Map/SQLite; novo contexto exige transferir a decisão e reconhecer evidência ausente. Trilha opcional não vira pré-requisito. |
| projeto | 3/3/3/4/4/3/3 | Fatia inicial testável antes de CRUD, tabela exige efeito além de status, cURL explica flags/ID real, instalação limpa/README/ADR e nova regra exigem evidência própria. Esperado e observado separados. |
| 03-ex01 | 3/3/3/3/4/3/3 | Fronteiras200/201 e1450/2100, lista/objeto e invariantes, erros comuns específicos; biblioteca real12+8. |
| 03-ex03 | 3/3/3/3/4/3/3 | Filtro explícito em testIdeas/commonErrors eCodeLab/README; prova independente1/5 e mutação semCRUD encerram LAR-EX03-01. |
| 03-ex05 | 3/3/3/3/4/3/3 | PATCHparcial, falha sem mutação, exclusão seguida404 e isolamento; diferenciafillable de validação/autorização. Suíte6/43 e ensaios históricos dão evidência restrita ao contrato. |
| 03-ex07 | 3/3/3/3/4/3/3 | Domínio escolhido, reprodução limpa, revisão e responsabilidades justificadas; impede copiar resultados e não cobra opcionais. |
| 03-ex09 | 3/3/3/4/4/3/3 | Distingue bug/hipótese/preferência; exige reprodução/reteste ou ausência de achado limitada; ADR e rubrica curricular30/20/25/15/10 sem nota automática. |

Sem bloqueante técnico/pedagógico identificado neste recorte final obrigatório.
A renderizaçãoMDX/UI e os testes globais pertencem à auditoria integrada; leitura
textual e testes de projeto não comprovam layout. Observação periférica entregue
ao autor: exercício opcional06 pedeLocation, mas referência Nest não o fornece;
tratar como extensão explícita a implementar ou alinhar referência/contrato.
A comparação atual comunica honestamente essa divergência.

### Reconciliação após ajuste integrado final

Autor alinhou Nest: `BooksController.create` agora usa Res passthrough e
response.location com identidade criada; `src/tests.ts` exigeLocation/books/1.
Reconferi esses arquivos e a alteração da aula decisao, que passou a descrever
Location nas três referências. A divergência registrada na tabela anterior é
**histórica, corrigida por leitura**; execução atual Nest não foi feita por este
revisor e deve ser rastreada no relatório do revisor Node. Não atribuo a mim seu
resultado. A aula mantém diferenças400/422 e campos extras, suficientes para o
contraste de portabilidade, sem alterar as notas da rubrica.

Projeto também passou a nomear integralmente os eixos curriculares:
funcionamento30%, linguagem/organização20%, HTTP/validação/erros25%, testes15%,
documentação/segurança10%. Conferida a redação nova; o relatório anterior sobre
pesos não aprovava omissão dos nomes. Notas finais das duas aulas e cinco
exercícios obrigatórios permanecem≥3, sem bloqueante no escopo auditado.
