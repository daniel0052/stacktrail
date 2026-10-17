<?php
declare(strict_types=1);
require __DIR__.'/../vendor/autoload.php';
use StackTrail\Report;
$checks = 0;
function same(mixed $expected, mixed $actual): void { global $checks; if ($actual !== $expected) { throw new RuntimeException('Resultado diferente'); } $checks++; }
$source = [' Redes ', 'PHP'];
same(['Redes'], Report::titles($source, 're')); same([' Redes ', 'PHP'], $source);
same([], Report::titles([])); same(['Redes', 'PHP'], Report::titles($source));
foreach ([[1], [' '], ['A', null]] as $invalid) {
    try { Report::titles($invalid); throw new RuntimeException('Esperada rejeição'); }
    catch (InvalidArgumentException) { $checks++; }
}
echo "$checks verificações de funções/autoload passaram\n";
