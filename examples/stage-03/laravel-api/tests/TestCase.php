<?php
namespace Tests;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
abstract class TestCase extends BaseTestCase
{
    private string $catalogFile;
    protected function setUp(): void {
        parent::setUp();
        $this->catalogFile = tempnam(sys_get_temp_dir(), 'stacktrail-books-');
        config(['catalog.path' => $this->catalogFile]);
    }
    protected function tearDown(): void {
        if (isset($this->catalogFile) && is_file($this->catalogFile)) { unlink($this->catalogFile); }
        parent::tearDown();
    }
}
