<?php
namespace Tests;
use App\Domain\ {
    FakeStore,DomainFailure
}
;
final class ApiTest extends TestCase {
    public function test_catalog_and_invalid_patch():void {
        $this->postJson('/api/v1/books',['title'=>'HTTP','category'=>'backend'])->assertCreated()->assertHeader('Location','/api/v1/books/4');
        $this->patchJson('/api/v1/books/4',['title'=>42])->assertStatus(422);
        $this->getJson('/api/v1/books/4')->assertJsonPath('data.title','HTTP');
        $this->postJson('/api/v1/books',['title'=>'X','category'=>'Y','id'=>99])->assertStatus(422);
        $this->deleteJson('/api/v1/books/4')->assertNoContent();
        $this->deleteJson('/api/v1/books/4')->assertNotFound();
    }
    public function test_empty_note_is_not_null():void {
        $this->patchJson('/api/v1/books/1',['note'=>''])->assertOk()->assertJsonPath('data.note','');
        $this->patchJson('/api/v1/books/1',['note'=>null])->assertOk()->assertJsonPath('data.note',null);
    }
    public function test_queries():void {
        foreach(['page=0','per_page=101','page=1&page=2','sort=secret'] as $q)$this->getJson('/api/v1/books?'.$q)->assertStatus(422);
        $this->getJson('/api/v1/books?search=inexistente')->assertOk()->assertJsonPath('data',[])->assertJsonPath('meta.total',0);
    }
    public function test_booking_sequence():void {
        $v=['name'=>'Ana','slot'=>FakeStore::SLOTS[0]];
        $this->postJson('/api/v1/bookings',$v)->assertCreated();
        $this->postJson('/api/v1/bookings',$v)->assertStatus(409);
        $this->postJson('/api/v1/bookings',[...$v,'status'=>'cancelled'])->assertStatus(422);
        $this->postJson('/api/v1/bookings',[...$v,'slot'=>'2020-01-01T00:00:00Z'])->assertStatus(422);
        $this->getJson('/api/v1/slots')->assertJsonCount(2,'data');
        $this->deleteJson('/api/v1/bookings/1')->assertNoContent();
        $this->deleteJson('/api/v1/bookings/1')->assertNoContent();
        $this->postJson('/api/v1/bookings',$v)->assertCreated();
        $this->getJson('/api/v1/bookings/1')->assertJsonPath('data.status','cancelled');
    }
    public function test_clock_boundary():void {
        $this->expectException(DomainFailure::class);
        app(FakeStore::class)->reserve(['name'=>'Ana','slot'=>FakeStore::SLOTS[0]],'2031-01-01T00:00:00Z');
    }
}
