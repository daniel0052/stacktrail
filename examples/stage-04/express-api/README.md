# Catálogo e agendamentos — referência da Etapa04

Projeto resolvido original para investigar, não solução do estudante nem backend do StackTrail. Escolha uma stack. Agenda e relógio são fakes fixos: agora2030-06-01T00:00:00Z; slots10/06/2030 às10/11/12hUTC. Troque relógio/agenda no domínio para estudar passado; não use esta política como data de produção.

## Instalação e execução

Node>=24.15 e npm. VersõesExpress5/Zod4/TypeScript5.9 fixadas por lock. Execute:

```sh
npm ci
npm test
npm start
```

Servidor em127.0.0.1:8001. Estado em memória reinicia ao encerrar processo. Não há durabilidade, coordenação entre processos ou banco. Use8001 nos exemplos cURL abaixo.

## Fluxo de investigação

```sh
curl -i http://127.0.0.1:8001/api/v1/slots
curl -i -X POST http://127.0.0.1:8001/api/v1/bookings -H 'Content-Type: application/json' -H 'Accept: application/json' --data '{"name":"Ana","slot":"2030-06-10T10:00:00Z"}'
curl -i http://127.0.0.1:8001/api/v1/bookings/1
curl -i -X DELETE http://127.0.0.1:8001/api/v1/bookings/1
curl -i 'http://127.0.0.1:8001/api/v1/books?search=laravel&category=backend&sort=title&page=1&per_page=10'
```

Esperado: slots200; criação201/Location; consulta200; cancelamento204 sem corpo. Repetir POST antes de cancelar produz409; input inválido422; ausente404. Repetir cancelamento mantémcancelled. Testes comprovam apenas cenários executados. Nada é enviado a terceiros pelo projeto.

CRUDbooks tem GET/POST emcoleção eGET/PUT/PATCH/DELETE noitem. Entrada:title/category1–120caracteres;note opcionalstringaté200ounull. PATCHpreservaausência;PUTlimpa note ausente. Queries:page1–10000,per_page1–100,search,sort comwhitelist ecategory(books)/status(bookings). Ordenação temdesempateID. Busca básica não implementa ranking/idioma; diferenças de collationPHP/JS devem ser consideradas. Coleção vazia200.

## Documentação e limites

openapi.yaml usa sintaxeJSON válidaemYAML1.2 eOpenAPI3.1.1. O exemplo de saída precisa ser comparado a execução real; renderizar não valida. Não há autenticação, Docker, ORM, comunicação externa ou idempotência robusta. Compreender RFC9457ébase; implementá-lainteiramente érecomendado,fora do gate. Alguns erros mantêmformato nativo doframework. Exemplos resolvidos não substituem sua tentativa: implementeuma variação, executecontraexemplos e registre evidências no laboratório.
