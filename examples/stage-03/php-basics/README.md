# Biblioteca PHP de estudo

PHP 8.3–8.5 com json e mbstring, Composer 2. Projeto local autoral, não runtime do StackTrail.
Instale PHP pelo canal oficial adequado ao sistema e Composer pelo instalador oficial com checksum:
https://www.php.net/downloads.php e https://getcomposer.org/download/ . Confira PATH no terminal novo.

```bash
php --version
composer --version
composer install
composer check-platform-reqs
composer test
composer demo
```

A primeira resolução cria composer.lock; versione-o na sua aplicação e use composer install nas próximas máquinas.
O teste imprime a quantidade somente se todas as comparações passarem; falha tem exit diferente de zero.
A demo retorna dois livros normalizados; year null é desconhecido, não ano zero. Entrada acima de100000bytes é recusada.
Os nomes JSON title/author/year são o contrato deste exemplo; não são palavras especiais de PHP.

Experimente vazio, autor com espaços, ano1450/2100 e201caracteres. Não altere o teste para aceitar erro sem explicar o contrato.
Depois implemente uma nova operação de busca em arquivo separado com testes seus. Evite ler arquivos privados.
O parser JSON valida estrutura antes de chamar a classe: strict_types não valida JSON nem existência de campos.
A classe readonly preserva invariantes após construção; não fornece persistência ou autorização.

Roteiro de exercício: implemente sua própria versão antes de abrir o exemplo completo; registre versão, comando, esperado,
observado e uma falha corrigida. Estes arquivos são material de referência, não prova da correção da sua solução.

## Funções e módulos adicionais

Report::titles normaliza títulos, filtra por termo e preserva a entrada. `php tests/report.php` executa fronteiras e autoload; `composer test` também inclui esse recorte. Exercícios10/11 usam esses contratos antes de avançar para HTTP.
