<?php
namespace App\Support;
final class BookPresenter {
    public function one(array $book): array {
        return ['id' => $book['id'], 'title' => $book['title'], 'author' => $book['author']];
    }
}
