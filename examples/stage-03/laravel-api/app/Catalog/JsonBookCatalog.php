<?php
declare(strict_types=1);
namespace App\Catalog;
/** Local didactic storage. Locks coordinate cooperating processes, not crash recovery. */
final class JsonBookCatalog
{
    public function __construct(private string $path) {}
    private function access(callable $operation, bool $write = false): mixed
    {
        $file = fopen($this->path, 'c+');
        if ($file === false) { throw new \RuntimeException('Catálogo inacessível'); }
        try {
            if (!flock($file, LOCK_EX)) { throw new \RuntimeException('Falha ao bloquear catálogo'); }
            $raw = stream_get_contents($file, 1_000_001);
            if ($raw === false || strlen($raw) > 1_000_000) { throw new \RuntimeException('Catálogo ilegível ou excessivo'); }
            $state = $raw === '' ? ['nextId' => 1, 'books' => []] : json_decode($raw, true, 32, JSON_THROW_ON_ERROR);
            if (!is_array($state) || !isset($state['nextId'], $state['books']) || !is_int($state['nextId']) || $state['nextId'] < 1 || !is_array($state['books']) || !array_is_list($state['books'])) { throw new \RuntimeException('Formato de catálogo inválido'); }
            $ids = [];
            foreach ($state['books'] as $book) {
                if (!is_array($book) || !isset($book['id'], $book['title'], $book['author']) || !is_int($book['id']) || $book['id'] < 1 || $book['id'] >= $state['nextId'] || isset($ids[$book['id']]) || !is_string($book['title']) || !is_string($book['author'])) { throw new \RuntimeException('Livro armazenado inválido'); }
                $ids[$book['id']] = true;
            }
            $result = $operation($state);
            if ($write) {
                $encoded = json_encode($state, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
                if (strlen($encoded) > 1_000_000) { throw new \RuntimeException('Limite local do catálogo excedido'); }
                rewind($file);
                if (fwrite($file, $encoded) !== strlen($encoded) || !ftruncate($file, strlen($encoded)) || !fflush($file)) { throw new \RuntimeException('Falha ao gravar catálogo'); }
            }
            return $result;
        } finally { flock($file, LOCK_UN); fclose($file); }
    }
    public function all(): array { return $this->access(fn (array $s) => $s['books']); }
    public function find(int $id): ?array {
        foreach ($this->all() as $book) { if ($book['id'] === $id) { return $book; } }
        return null;
    }
    public function create(array $data): array {
        return $this->access(function (array &$s) use ($data): array {
            if ($s['nextId'] === PHP_INT_MAX) { throw new \RuntimeException('IDs esgotados'); }
            $book = ['id' => $s['nextId']++, 'title' => $data['title'], 'author' => $data['author']];
            $s['books'][] = $book; return $book;
        }, true);
    }
    public function update(int $id, array $data): ?array {
        return $this->access(function (array &$s) use ($id, $data): ?array {
            foreach ($s['books'] as &$book) { if ($book['id'] === $id) { $book = [...$book, ...$data]; return $book; } }
            return null;
        }, true);
    }
    public function delete(int $id): bool {
        return $this->access(function (array &$s) use ($id): bool {
            $before = count($s['books']); $s['books'] = array_values(array_filter($s['books'], fn ($book) => $book['id'] !== $id));
            return count($s['books']) !== $before;
        }, true);
    }
}
