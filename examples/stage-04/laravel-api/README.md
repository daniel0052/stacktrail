# Catálogo e agendamentos — referência da Etapa04

Projeto resolvido original para investigar, não solução do estudante nem backend do StackTrail. Escolha uma stack. Agenda e relógio são fakes fixos: agora2030-06-01T00:00:00Z; slots10/06/2030 às10/11/12hUTC. Troque relógio/agenda no domínio para estudar passado; não use esta política como data de produção.

## Instalação e execução

PHP>=8.4.1 com este lock (o framework aceita8.3, mas as versõesSymfony fixadas exigem8.4.1), Composer2 e extensões listadas emcomposer.json. Sem banco. Execute em pasta extraída:

```sh
composer install
cp environment.example .env
php artisan --version
composer test
php reset.php
php artisan serve --host=127.0.0.1 --port=8000
```

Sempre execute reset.php antes de iniciar uma nova sessão. O fake JSON é temporário e guarda estado entre requisições locais; isso não é persistência de produção e não fornece exclusão mútua/transações entre processos. Não executar múltiplos workers. Não há migrations obrigatórias.

## Fluxo de investigação

```sh
curl -i http://127.0.0.1:8000/api/v1/slots
curl -i -X POST http://127.0.0.1:8000/api/v1/bookings -H 'Content-Type: application/json' -H 'Accept: application/json' --data '{"name":"Ana","slot":"2030-06-10T10:00:00Z"}'
curl -i http://127.0.0.1:8000/api/v1/bookings/1
curl -i -X DELETE http://127.0.0.1:8000/api/v1/bookings/1
curl -i 'http://127.0.0.1:8000/api/v1/books?search=laravel&category=backend&sort=title&page=1&per_page=10'
```

Esperado: slots200; criação201/Location; consulta200; cancelamento204 sem corpo. Repetir POST antes de cancelar produz409; input inválido422; ausente404. Repetir cancelamento mantémcancelled. Testes comprovam apenas cenários executados. Nada é enviado a terceiros pelo projeto.

CRUDbooks tem GET/POST emcoleção eGET/PUT/PATCH/DELETE noitem. Entrada:title/category1–120caracteres;note opcionalstringaté200ounull. PATCHpreservaausência;PUTlimpa note ausente. Queries:page1–10000,per_page1–100,search,sort comwhitelist ecategory(books)/status(bookings). Ordenação temdesempateID. Busca básica não implementa ranking/idioma; diferenças de collationPHP/JS devem ser consideradas. Coleção vazia200.

## Documentação e limites

openapi.yaml usa sintaxeJSON válidaemYAML1.2 eOpenAPI3.1.1. O exemplo de saída precisa ser comparado a execução real; renderizar não valida. Não há autenticação, Docker, ORM, comunicação externa ou idempotência robusta. Compreender RFC9457ébase; implementá-lainteiramente érecomendado,fora do gate. Alguns erros mantêmformato nativo doframework. Exemplos resolvidos não substituem sua tentativa: implementeuma variação, executecontraexemplos e registre evidências no laboratório.
