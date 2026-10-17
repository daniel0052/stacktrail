<?php
namespace Tests\Unit;
use App\Catalog\JsonBookCatalog;
use PHPUnit\Framework\TestCase;
final class CatalogTest extends TestCase {
    public function test_instances_persist_changes_and_keep_separate_files_isolated(): void {
        $one = tempnam(sys_get_temp_dir(), 'st03-one-'); $two = tempnam(sys_get_temp_dir(), 'st03-two-');
        try {
            $a = new JsonBookCatalog($one); $book = $a->create(['title'=>'A','author'=>'B']);
            $this->assertSame($book, (new JsonBookCatalog($one))->find($book['id']));
            $this->assertSame([], (new JsonBookCatalog($two))->all());
            $this->assertSame('C', $a->update($book['id'], ['title'=>'C'])['title']);
            $this->assertTrue($a->delete($book['id'])); $this->assertNull($a->find($book['id']));
        } finally { unlink($one); unlink($two); }
    }
    public function test_corruption_is_not_silently_replaced(): void {
        $file = tempnam(sys_get_temp_dir(), 'st03-corrupt-'); file_put_contents($file, '{');
        try {
            try { (new JsonBookCatalog($file))->create(['title'=>'A','author'=>'B']); $this->fail('Expected JSON error'); }
            catch (\JsonException) { $this->assertSame('{', file_get_contents($file)); }
        } finally { unlink($file); }
    }
    public function test_invalid_envelope_is_preserved(): void {
        $file = tempnam(sys_get_temp_dir(), 'st03-shape-'); $raw = '{"nextId":1,"books":[{"id":1,"title":"A","author":"B"}]}'; file_put_contents($file, $raw);
        try {
            try { (new JsonBookCatalog($file))->all(); $this->fail('Expected envelope error'); }
            catch (\RuntimeException $error) { $this->assertSame('Livro armazenado inválido', $error->getMessage()); $this->assertSame($raw, file_get_contents($file)); }
        } finally { unlink($file); }
    }
}
