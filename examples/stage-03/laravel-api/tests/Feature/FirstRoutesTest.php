<?php
namespace Tests\Feature;
use Tests\TestCase;
final class FirstRoutesTest extends TestCase
{
    public function test_health_and_empty_listing_and_missing_route(): void
    {
        $this->getJson('/health')->assertOk()->assertJson(['status'=>'ok']);
        $this->getJson('/books')->assertOk()->assertExactJson([]);
        $this->getJson('/not-a-route')->assertNotFound();
    }
}
