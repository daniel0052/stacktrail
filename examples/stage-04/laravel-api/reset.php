<?php
require __DIR__.'/vendor/autoload.php';
@mkdir(__DIR__.'/storage/app',0777,true);
file_put_contents(__DIR__.'/storage/app/session.json',json_encode(App\Domain\FakeStore::seed(),JSON_THROW_ON_ERROR));
echo "Sessão fictícia reiniciada.\n";
