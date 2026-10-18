<?php
namespace Tests;
abstract class TestCase extends \Illuminate\Foundation\Testing\TestCase {
    private string $path;
    protected function setUp():void {
        parent::setUp();
        $this->path=tempnam(sys_get_temp_dir(),'rest04-');
        config(['catalog.path'=>$this->path]);
    }
    protected function tearDown():void {
        if(isset($this->path)&&is_file($this->path))unlink($this->path);
        parent::tearDown();
    }
}
