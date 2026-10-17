# Node/TypeScript — trilha principal JS/TS

Node 24.15+ e TypeScript 5.9.3 fixado; ESM e NodeNext. Não executa dentro do StackTrail.

```sh
npm ci
npm test
npm run cli -- exemplos.json relatorio.json API
npm start
curl -i http://127.0.0.1:3000/health
```

`src/books.ts` recebe unknown e valida valores reais. A CLI lê JSON, filtra títulos pelo terceiro argumento opcional e escreve {total,items}, com total dos filtrados. Termo ausente/vazio inclui todos. Entrada e saída devem ter caminhos distintos. `src/app.ts` fabrica um servidor independente; `src/server.ts` escolhe porta e gerencia sinais. Os testes usam porta efêmera e diretório temporário, sem substituir seus dados.

A leitura tem limite didático verificado após carregar o arquivo; não é streaming nem proteção contra arquivos arbitrariamente grandes. Para arquivos grandes, projete limites durante leitura e backpressure com streams. O relatório pode substituir um arquivo de saída distinto da entrada: use um arquivo descartável. Não aponte para dados importantes.

O servidor é HTTP local, não inclui TLS, autenticação, banco, roteador nem tratamento completo de erros de transporte. Não expor em produção. Exercício: adicionar GET /books com validação, testes e explicação do contrato. Compare o custo manual com Express; Laravel é leitura adicional opcional.

Fontes: https://nodejs.org/api/http.html ; https://nodejs.org/api/fs.html ; https://nodejs.org/api/stream.html ; https://www.typescriptlang.org/docs/handbook/modules/reference.html

## Progressão de linguagem e async

`npm run test:language` verifica titles/first e loadTitles: dados unknown, generic, origem preservada e rejeições de arquivo/JSON. `npm test` acrescenta CLI e HTTP. Para o exercício15, após build, `node --test --test-name-pattern=HTTP dist/tests.js` permite conferir apenas o servidor nativo. O filtro não conclui o projeto inteiro.
