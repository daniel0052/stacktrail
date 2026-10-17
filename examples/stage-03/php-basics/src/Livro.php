<?php

declare(strict_types=1);

namespace StackTrail;

use InvalidArgumentException;
use JsonSerializable;

final readonly class Livro implements JsonSerializable
{
    public string $title;
    public string $author;

    public function __construct(string $title, string $author, public ?int $year = null)
    {
        $this->title = self::texto($title, 'title');
        $this->author = self::texto($author, 'author');
        if ($year !== null && ($year < 1450 || $year > 2100)) {
            throw new InvalidArgumentException('year: use null ou inteiro entre 1450 e 2100');
        }
    }

    private static function texto(string $value, string $field): string
    {
        $text = trim($value);
        if ($text === '' || mb_strlen($text, 'UTF-8') > 200) {
            throw new InvalidArgumentException("$field: texto não vazio até 200 caracteres");
        }
        return $text;
    }

    public function jsonSerialize(): array
    {
        return ['title' => $this->title, 'author' => $this->author, 'year' => $this->year];
    }
}
