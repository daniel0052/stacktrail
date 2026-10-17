# NestJS — módulo de livros opcional

Node24.15+, Nest12.1.3 ESM e TS5.9.3; compilar decorators/metadados com tsc, não usar apenas remoção nativa de tipos.

```sh
npm ci
npm test
npm start
curl -i -H 'Content-Type: application/json' -d '{"title":"API","author":"Ana"}' http://127.0.0.1:3002/books
curl -i http://127.0.0.1:3002/books/1
```

GET/POST /books; GET/PATCH/DELETE /books/:id. POST201; PATCH200; DELETE204 vazio. Validação/DTO inválido400 (difere do contrato Laravel422); ausência404. POST inclui Location; para portabilidade exata com Laravel, alinhe também erros e política de campos extras. DTOs são classes com decorators reais, importados como valores no controller. ValidationPipe global transforma para instância, valida e rejeita propriedades não decoradas. Não ative implicit conversion para esconder entrada numérica em string. title/author aparados e não vazios até200; PATCH exige campo reconhecido e rejeita null explicitamente porque IsOptional o ignora.

BooksModule registra controller/provider, AppModule importa funcionalidade. BooksService guarda Map por aplicação, devolve cópias e perde catálogo ao reiniciar. Injeção por classe, sem Repository artificial. Provider unitário e integração HTTP em porta efêmera têm isolamento e fechamento em finally.

Configuração mínima PORT validada, loopback e shutdown hooks. Nest usa adaptador Express aqui; não é outro runtime. Sem TLS, auth, persistência ou produção. Guards/interceptors são explicados na aula, não apresentados como autenticação pronta no projeto. A validação testa formato/domínio básico, não autorização.

Fontes: https://docs.nestjs.com/migration-guide ; https://docs.nestjs.com/controllers ; https://docs.nestjs.com/providers ; https://docs.nestjs.com/validation ; https://docs.nestjs.com/testing
