<?php

declare(strict_types=1);
require dirname(__DIR__) . '/vendor/autoload.php';

use StackTrail\Livro;

try {
    if ($argc !== 2 || !is_file($argv[1]) || !is_readable($argv[1])) {
        throw new InvalidArgumentException('Uso: php bin/livros.php ARQUIVO.json');
    }
    if (filesize($argv[1]) > 100_000) {
        throw new InvalidArgumentException('Limite didático: 100000 bytes');
    }
    $raw = file_get_contents($argv[1]);
    if ($raw === false) {
        throw new RuntimeException('Falha na leitura');
    }
    $rows = json_decode($raw, false, 32, JSON_THROW_ON_ERROR);
    if (!is_array($rows)) {
        throw new InvalidArgumentException('Esperada lista JSON de livros');
    }
    $books = [];
    foreach ($rows as $item) {
        if (!$item instanceof stdClass) { throw new InvalidArgumentException('Esperado objeto de livro'); }
        $row = get_object_vars($item);
        if (!is_array($row) || !isset($row['title'], $row['author'])
            || !is_string($row['title']) || !is_string($row['author'])
            || (array_key_exists('year', $row) && $row['year'] !== null && !is_int($row['year']))) {
            throw new InvalidArgumentException('Estrutura do livro inválida');
        }
        $books[] = new Livro($row['title'], $row['author'], $row['year'] ?? null);
    }
    echo json_encode($books, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . PHP_EOL;
} catch (Throwable $error) {
    fwrite(STDERR, 'Erro de estudo: ' . $error->getMessage() . PHP_EOL);
    exit(1);
}
