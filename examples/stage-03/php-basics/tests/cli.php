<?php

declare(strict_types=1);
$php = getenv('PHP_STUDY_BINARY') ?: PHP_BINARY;
$cases = [
    ['[]', 0],
    ['[{"title":"A","author":"B"}]', 0],
    ['{}', 1],
    ['{"0":{"title":"A","author":"B"}}', 1],
    ['null', 1],
    ['[1]', 1],
    ['[{"title":1,"author":"B"}]', 1],
    ['{', 1],
];
foreach ($cases as [$input, $expected]) {
    $path = tempnam(sys_get_temp_dir(), 'stacktrail-cli-');
    if ($path === false) { throw new RuntimeException('Falha ao preparar teste'); }
    try {
        file_put_contents($path, $input);
        $process = proc_open([$php, dirname(__DIR__).'/bin/livros.php', $path], [1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes);
        if (!is_resource($process)) { throw new RuntimeException('Processo de teste indisponível'); }
        $out = stream_get_contents($pipes[1]); $err = stream_get_contents($pipes[2]);
        fclose($pipes[1]); fclose($pipes[2]);
        $status = proc_close($process);
        if ($status !== $expected) { throw new RuntimeException("CLI: esperado $expected; recebido $status. $out $err"); }
        if ($expected === 0 && !is_array(json_decode($out, true, 32, JSON_THROW_ON_ERROR))) { throw new RuntimeException('Saída não é lista'); }
    } finally { unlink($path); }
}
echo count($cases)." casos CLI passaram\n";
