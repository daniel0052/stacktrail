<?php
namespace Tests\Feature;
use Tests\TestCase;
final class CatalogFailureTest extends TestCase {
    public function test_corrupt_catalog_returns_generic_error_without_overwriting_file(): void {
        file_put_contents(config('catalog.path'), '{');
        $this->getJson('/books')->assertStatus(500)->assertJsonMissingPath('exception')->assertJsonMissingPath('trace');
        $this->assertSame('{', file_get_contents(config('catalog.path')));
    }
}
