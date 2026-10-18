> **Escopo histórico.** Este arquivo registra uma versão ou auditoria anterior. Consulte o [índice e classificação](../README.md) e o [estado atual](../../README.md). Resultados antigos não validam automaticamente a plataforma atual.

# Revisão independente — reorganização PHP/Laravel da Etapa 03

Revisor independente do autor; consulta em 17/10/2026. Escopo: PHP/Laravel, instalação e substituição da persistência relacional da API introdutória. Sem edição do produto, publicação ou acesso a `.env`.

## Fonte curricular e autoria

Página Notion `3f63cadf-ab77-81ad-9194-c805b33198d8` lida integralmente via MCP: 11 seções, sem indicação de truncamento, blocos desconhecidos ou filhos pendentes. Ela originalmente privilegia PHP/Laravel; o anexo atual autoriza duas alternativas completas e supera essa obrigatoriedade. Noções Eloquent/migrations permanecem leitura de reconhecimento, sem implementação relacional necessária. Catálogo JSON é escolha didática autoral, não exigência do Notion.

## Lacunas iniciais comunicadas antes da correção

- Média: aulas Laravel e manifesto anteriores exigiam PDO SQLite, migrations, modelo e consultas SQL; contradizem a separação atual da Etapa 05. Autor informado antes da alteração.
- Média: arquivo JSON não pode ser chamado de memória. O estado precisa sobreviver às requisições PHP, com fronteira de armazenamento explicitada.
- Média: lock deve abranger leitura/modificação/escrita e leitores devem cooperar; corrupção/erro de I/O não deve virar catálogo vazio silenciosamente. Escrita em arquivo não garante transação ou tolerância a crash.
- Média: testes precisam isolar arquivos entre tentativas e não depender de banco.

## Fontes primárias efetivamente abertas

Todas consultadas em 17/10/2026; condições Laravel 13 e PHP 8.3+ do projeto.

| Fonte | Seção e afirmação apoiada |
| --- | --- |
| [PHP flock](https://www.php.net/manual/en/function.flock.php) | Locks cooperativos, compartilhado/exclusivo, condições de plataforma; não equivalem a transação. |
| [PHP servidor CLI](https://www.php.net/manual/en/features.commandline.webserver.php) | Servidor de desenvolvimento, loopback, sem uso público/produção. |
| [Laravel 13 container](https://laravel.com/docs/13.x/container) | Classes concretas resolvidas, interface requer binding; DI difere de container. |
| [Laravel 13 testing](https://laravel.com/docs/13.x/testing) | Unit/Feature, ambiente testing e configuração por phpunit.xml. |
| [Laravel 13 validation](https://laravel.com/docs/13.x/validation) | Resposta 422 quando se espera JSON; FormRequest/sometimes/required. |
| [Laravel 13 installation](https://laravel.com/docs/13.x/installation) | PHP/Composer e alternativas; frontend do scaffold não é requisito intrínseco da API fornecida. |
| [Herd Windows](https://herd.laravel.com/docs/windows/getting-started/installation) | Windows 10+, privilégios administrativos no instalador. Instalação não executada. |
| [Laragon quick start](https://laragon.org/docs/quick-start) | Alternativa local e terminal; instalação Windows não executada. Sem promessa de licença gratuita. |

## Execuções independentes

Cópia temporária `/tmp/stacktrail-php-independent-zuurt09n/php-basics`, excluindo `.env*`. PHP 8.5.4 e Composer PHAR disponíveis em `/tmp/st03-php-final`. `composer install --no-interaction --prefer-dist` terminou 0 com dependências já presentes; houve aviso de cache indisponível e falha DNS ao consultar Packagist, portanto não constitui instalação limpa com rede. `composer test`: **12 verificações e oito casos CLI passaram**. Casos incluem objeto numérico versus lista JSON, null, sintaxe inválida e tipos inválidos.

API Laravel alterada, rubrica das aulas e contraexemplos: revisão em andamento; nenhum gate final de prontidão atribuído nesta versão do relatório.

## PHP preservado — rubrica independente

Ordem das notas: alinhamento, progressão, precisão/fontes, explicação/exemplos, prática/avaliação, autonomia, reprodutibilidade (0–4). Notas são juízo local do material, não certificação de aprendizagem; não cobrem interface/layout.

| Aula | Notas | Evidência lida |
| --- | --- | --- |
| php-inicio | 3/3/3/3/3/3/3 | Runtime/CLI, execução por requisição, comandos e resultado esperado; contraste com processo Node. |
| php-tipos | 3/3/3/3/3/3/3 | Assinaturas/strict/nullable/union e fronteira externa; variações inválidas exigem explicar origem do erro. |
| php-colecoes | 3/3/3/4/4/3/3 | Lista versus mapa, filtro preservando entrada, termo vazio e limite N; função não valida forma interna do array. |
| php-dados | 3/3/3/4/4/3/3 | JSON null versus falha, limite de bytes versus profundidade, datas imutáveis e fuso; três falhas observáveis. |
| php-objetos | 3/3/3/4/4/3/3 | Invariantes, composição/interface/trait e relógio fixo; readonly não é congelamento profundo. |
| composer | 3/3/3/4/4/3/3 | PSR-4/caixa/caminho, lock/install, quebra deliberada de namespace e recuperação. |
| exercício php-livro | 3/3/3/3/4/3/3 | Biblioteca/CLI, validação, exceções, normalização, limites e autoload; testes publicados executados em cópia. |

Fontes adicionais abertas nesta revisão: [Composer Basic Usage](https://getcomposer.org/doc/01-basic-usage.md), install/lock/autoload/plataforma; [PSR-4](https://www.php-fig.org/psr/psr-4/), nomes e caminhos; [PHP type declarations](https://www.php.net/manual/en/language.types.declarations.php), strict/nullable/union; [interfaces](https://www.php.net/manual/en/language.oop5.interfaces.php), contratos condicionados à versão; [traits](https://www.php.net/manual/en/language.oop5.traits.php), reuso horizontal; [json_decode](https://www.php.net/manual/en/function.json-decode.php), flags/profundidade/retornos.

| Afirmação importante | Classificação | Confronto/limite |
| --- | --- | --- |
| Composer gera autoload e usa lock no install; PSR-4 não carrega sozinho | Verificada | Documentação Composer/PSR-4 e execução biblioteca. |
| Tipagem PHP não valida forma de array nem entrada JSON | Verificada | Manual/type declarations e CLI com itens inválidos rejeitados. |
| Interfaces e traits são mecanismos distintos | Verificada | Manuais próprios; exemplo não equipara trait a objeto/interface. |
| Strict exige atenção ao arquivo chamador | Dependente de contexto ou versão | Não é validação universal de dados externos; declaração precisa ser aplicada no chamador. |
| Exemplos de relógio/traits/datas | Não verificada | Revisão textual/fontes; não se afirma execução individual de cada snippet nesta revisão. Não são a implementação essencial da biblioteca testada. |
