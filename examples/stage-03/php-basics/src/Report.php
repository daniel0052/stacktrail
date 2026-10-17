<?php
declare(strict_types=1);
namespace StackTrail;
final class Report {
    public static function titles(array $titles, string $term = ''): array {
        $result = [];
        foreach ($titles as $title) {
            if (!is_string($title) || trim($title) === '') { throw new \InvalidArgumentException('Título textual não vazio obrigatório'); }
            $normalized = trim($title);
            if ($term === '' || mb_stripos($normalized, $term) !== false) { $result[] = $normalized; }
        }
        return $result;
    }
}
