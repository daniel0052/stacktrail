<?php

declare(strict_types=1);
require dirname(__DIR__) . '/vendor/autoload.php';
use StackTrail\Livro;

$count = 0;
function check(bool $condition, string $message): void {
    global $count;
    if (!$condition) { throw new RuntimeException($message); }
    $count++;
}
$book = new Livro('  Redes  ', ' Ana ', null);
check($book->title === 'Redes', 'normalização do título');
check($book->author === 'Ana', 'normalização do autor');
check($book->year === null, 'ano desconhecido é null');
check(json_decode(json_encode($book, JSON_THROW_ON_ERROR), true, 32, JSON_THROW_ON_ERROR)['title'] === 'Redes', 'serialização');
foreach ([['', 'Ana', null], ['A', ' ', null], [str_repeat('á', 201), 'Ana', null], ['A', 'B', 1449], ['A', 'B', 2101]] as $args) {
    try { new Livro(...$args); throw new RuntimeException('aceitou dado inválido'); }
    catch (InvalidArgumentException) { $count++; }
}
foreach ([1450, 2100] as $year) { check((new Livro('A', 'B', $year))->year === $year, 'limite inclusivo'); }
try { new Livro(123, 'Ana'); throw new RuntimeException('strict não foi respeitado'); }
catch (TypeError) { $count++; }
echo "$count verificações passaram\n";
