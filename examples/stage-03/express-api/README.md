# API Express em memória — trilha principal JS/TS

Node24.15+, Express5.3.0, TypeScript5.9.3, ESM/NodeNext. Execute em pasta de estudo:

```sh
npm ci
npm test
npm start
curl -i -H 'Content-Type: application/json' -d '{"title":"API","author":"Ana"}' http://127.0.0.1:3001/books
curl -i http://127.0.0.1:3001/books/1
curl -i -X PATCH -H 'Content-Type: application/json' -d '{"author":"Bia"}' http://127.0.0.1:3001/books/1
curl -i -X DELETE http://127.0.0.1:3001/books/1
```

IDs exigem dígitos decimais e inteiro positivo seguro (inválido400; zeros à esquerda aceitos). GET /books aceita q textual; POST requer title/author não vazios até200 codepoints, ignora outros campos. PATCH altera campos fornecidos, rejeita corpo vazio e mantém demais. DELETE retorna204 vazio; ausência404; validação422; JSON malformado400; mídia415; corpo16kB413. Validação usa schemas Zod executados na fronteira; TypeScript não os substitui.

makeApp cria Map novo por aplicação e router montado /books; reiniciar perde dados. server escolhe porta, logs só id/método/status e escuta loopback. STUDY_ORIGIN opcional libera leitura CORS para uma origem exata, sem credenciais. Sem configuração, nenhum Access-Control-Allow-Origin é enviado. CORS não autentica nem impede cURL: teste inclui resposta200 para origem sem permissão. Política simplificada de preflight não equivale a implementação completa de todos os cenários CORS.

Testes usam porta efêmera e fetch real, conferem efeito/erros/status/headers e fecham conexões. Não há banco/auth/TLS/produção. Métodos não registrados usam404 no fallback; não prometa405 automático. Express5 encaminha rejeição de Promise retornada por handler, não falhas desconectadas de timers.

Fontes: https://expressjs.com/en/guide/routing.html ; https://expressjs.com/en/guide/using-middleware.html ; https://expressjs.com/en/guide/error-handling.html ; https://expressjs.com/en/api.html

## Organização e validação

A alternativa principal JS/TS usa Zod fixado no lock. books/schemas.ts valida unknown e normaliza texto; o limite de200 codepoints é explícito em refine. books/router.ts contém handlers HTTP; books/catalog.ts mantém Map por instância. app.ts monta middleware e erros; server.ts escuta. Objetos Zod removem extras, PATCH vazio é recusado. Não é banco nem arquitetura pronta para produção.

## Progressão de rotas

Exercício16: `npm run test:routes` confere health, listagem vazia e ausência antes de exigir CRUD. Exercícios04/17/18/19 usam `npm test` completo e acrescentam contraprovas próprias. Sucesso do projeto de referência não é evidência da tentativa do estudante.
