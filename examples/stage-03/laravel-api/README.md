# API Laravel de biblioteca — estudo local

Projeto didático Laravel13, com scaffold oficial adaptado e código de biblioteca autoral; PHP8.3–8.5/Composer2, extensões Laravel (sem banco relacional).
Instale pelas fontes oficiais: https://www.php.net/downloads.php e https://getcomposer.org/download/ .
Confira php --version, php -m e composer --version; extensões necessárias incluem ctype/cURL/DOM/fileinfo/filter/hash/
mbstring/OpenSSL/PCRE/PDO/session/tokenizer/XML.
Não há frontend, autenticação ou banco avançado. Não publique esta API de escrita aberta.

## Instalar, testar e iniciar

Extraia o projeto para uma pasta nova. Não sobreponha um projeto com dados existentes.

```bash
composer install
composer check-platform-reqs
php artisan config:clear
composer test
php artisan serve --host=127.0.0.1 --port=8000
```

O catálogo local usa storage/app/books.json, criado no primeiro acesso. O diretório precisa ser gravável.
Não execute migrate: nenhum banco ou ORM é requisito. environment.example contém somente configuração fictícia.
Os arquivos Model/migration preservados são referências opcionais para a Etapa 05, não usados pelas rotas.
PHP CLI e Composer bastam. Windows também pode usar Herd (https://herd.laravel.com/docs/windows/getting-started/installation)
ou Laragon (https://laragon.org/docs/quick-start); confirme requisitos e licença. Instale extensões exigidas por Composer.
Não declare essas instalações testadas no seu sistema antes de executá-las.
Não é necessário key:generate para as rotas stateless deste recorte, que não usam cookies criptografados;
uma aplicação que adicione recursos de criptografia deve configurar APP_KEY conforme documentação oficial.
O pacote inclui composer.lock gerado na validação real; preserve-o para repetir as versões. composer update resolve outras versões e exige nova verificação.

Os testes criam um arquivo temporário próprio por caso e o removem ao terminar; não acessam o catálogo de desenvolvimento.
O arquivo JSON persiste ao reiniciar, diferentemente de memória. Leituras e escrita usam flock no ciclo inteiro de
leitura/modificação/gravação. Isso coordena processos que respeitam o lock; não garante recuperação de queda,
escrita atômica ou segurança para produção. Corrupção gera erro, nunca reinicialização silenciosa.
Limite local: 1 MB de JSON armazenado. Não substitui banco, transações ou backups.

## Contrato e exemplos de requisição

```bash
curl -i http://127.0.0.1:8000/health
curl -i http://127.0.0.1:8000/books
curl -i http://127.0.0.1:8000/books --json '{"title":"Redes","author":"Ana"}'
curl -i http://127.0.0.1:8000/books/1
curl -i -X PATCH http://127.0.0.1:8000/books/1 --json '{"title":"PHP"}'
curl -i -X DELETE http://127.0.0.1:8000/books/1
```

Health200 {status:ok}; listagem200array (inclusive vazio); consulta200ou404; criação201 com Location;
PATCH200 preserva campos não enviados; DELETE204 sem corpo e consulta posterior404.
Substitua1 pelo ID retornado na sua criação: não suponha que a sequência foi reiniciada.
POST exige title/author textuais não vazios até200caracteres; PATCH aceita um ou ambos e recusa objeto vazio.
O JSON inválido resulta400, mídia não JSON415 e corpo acima de16384bytes413 neste middleware didático.
FormRequest devolve422 com erros de campo. Campos desconhecidos são descartados pelo validated(), não persistidos.
Query q textual opcional filtra título por mb_stripos, busca textual sem diferenciar maiúsculas/minúsculas.
API não tem paginação avançada; nesta etapa o catálogo é pequeno.

## Organização e decisões

bootstrap/app.php registra routes/api.php com apiPrefix vazio, portanto /books, sem /api neste projeto.
O middleware RequestBoundary delimita entrada e loga método/status/id, sem corpo. O limite em PHP não substitui
limites no servidor/proxy: o corpo já foi recebido. O public/index.php é a raiz servível, jamais a pasta inteira.
Controller usa FormRequest e busca explícita por ID no JsonBookCatalog. BookPresenter define a representação pública e é resolvido
pelo container: evita vazar futuros campos internos. Não existe Repository/Service de repasse.
JsonBookCatalog é resolvido pelo container e usa um arquivo local. Eloquent/migration não participam das rotas. SQL, transações e concorrência ficam para etapas posteriores.
As rotas de API não usam sessão/CSRF de web.php; isso não autoriza desativar proteção de um app web de produção.
CORS não foi aberto a qualquer origem. cURL é suficiente para os ensaios; configurar browser cross-origin é decisão separada.
Erros inesperados com APP_DEBUG=false não devem expor stack; não exponha dados privados em logs.

## Sua tentativa

Leia o contrato, tente implementar primeiro e use estes arquivos como referência comentada, não gabarito de aprovação.
Evidência: versões, comando, esperado/observado, falha corrigida e teste de que entrada inválida não mudou o catálogo.
Acrescente teste para PATCH de apenas author, tipo inesperado e resource ausente. Não invente teste verde.

## Atribuição

Scaffold baseado em https://github.com/laravel/laravel (licença MIT); framework Laravel distribuído via Composer sob MIT. As classes, rotas e testes da biblioteca são adaptações didáticas do StackTrail. Os avisos de licença das dependências permanecem em seus pacotes após composer install.

## Progressão dos exercícios

No exercício3 (primeiras rotas), rode `composer test -- --filter=FirstRoutesTest`: health, lista vazia e rota inexistente. Não exige CRUD. Nos exercícios5/7, rode `composer test` inteiro e acrescente casos próprios; o filtro inicial não basta para concluir o projeto.

Limite adicional do armazenamento didático: arquivo vazio é tratado como catálogo inicial. Um truncamento externo a zero não é distinguido de inicialização. JSON não vazio malformado ou com envelope inválido gera erro sem ser substituído. Não há garantia de recuperação de perda de dados.
