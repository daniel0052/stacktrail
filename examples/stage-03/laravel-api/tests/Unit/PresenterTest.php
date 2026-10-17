<?php
namespace Tests\Unit;
use App\Support\BookPresenter;
use PHPUnit\Framework\TestCase;
final class PresenterTest extends TestCase {
    public function test_public_representation_exposes_only_contract_fields(): void {
        $book = ['id' => 9, 'title' => 'A', 'author' => 'B', 'internal_note' => 'not-public'];
        $this->assertSame(['id' => 9, 'title' => 'A', 'author' => 'B'], (new BookPresenter())->one($book));
    }
}
