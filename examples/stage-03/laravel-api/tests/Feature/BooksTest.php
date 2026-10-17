<?php
namespace Tests\Feature;
use Tests\TestCase;

final class BooksTest extends TestCase
{
    public function test_health_and_empty_collection(): void {
        $this->getJson('/health')->assertOk()->assertExactJson(['status' => 'ok']);
        $this->getJson('/books')->assertOk()->assertExactJson([]);
    }
    public function test_crud_preserves_contract_and_delete_effect(): void {
        $created = $this->postJson('/books', ['title' => 'Redes', 'author' => 'Ana'])->assertCreated();
        $id = $created->json('id');
        $created->assertHeader('Location', '/books/'.$id)->assertJsonPath('title', 'Redes');
        $this->getJson('/books/'.$id)->assertOk()->assertExactJson(['id' => $id, 'title' => 'Redes', 'author' => 'Ana']);
        $this->patchJson('/books/'.$id, ['title' => 'PHP'])->assertOk()->assertJsonPath('author', 'Ana');
        $this->getJson('/books?q=PHP')->assertOk()->assertJsonCount(1);
        $this->getJson('/books?q=Ausente')->assertOk()->assertExactJson([]);
        $this->deleteJson('/books/'.$id)->assertNoContent();
        $this->getJson('/books/'.$id)->assertNotFound();
        $this->getJson('/books')->assertExactJson([]);
    }
    public function test_invalid_data_does_not_create_or_change_book(): void {
        foreach ([[], ['title' => '', 'author' => 'A'], ['title' => 1, 'author' => 'A'], ['title' => str_repeat('a', 201), 'author' => 'A']] as $data) {
            $this->call('POST', '/books', [], [], [], ['CONTENT_TYPE' => 'application/json', 'HTTP_ACCEPT' => 'application/json'], json_encode((object) $data, JSON_THROW_ON_ERROR))->assertUnprocessable();
        }
        $this->getJson('/books')->assertExactJson([]);
        $id = $this->postJson('/books', ['title' => 'Original', 'author' => 'Ana'])->assertCreated()->json('id');
        $this->call('PATCH', '/books/'.$id, [], [], [], ['CONTENT_TYPE' => 'application/json', 'HTTP_ACCEPT' => 'application/json'], '{}')->assertUnprocessable();
        $this->patchJson('/books/'.$id, ['author' => ' '])->assertUnprocessable();
        $this->getJson('/books/'.$id)->assertJsonPath('author', 'Ana')->assertJsonPath('title', 'Original');
    }
    public function test_absence_unknown_fields_and_malformed_input(): void {
        $this->getJson('/books/999')->assertNotFound();
        $this->postJson('/books', ['title' => 'A', 'author' => 'B', 'admin' => true])->assertCreated()->assertJsonMissingPath('admin');
        $this->call('POST', '/books', [], [], [], ['CONTENT_TYPE' => 'application/json', 'HTTP_ACCEPT' => 'application/json'], '{')->assertStatus(400)->assertHeader('X-Request-Id');
        $this->call('POST', '/books', [], [], [], ['CONTENT_TYPE' => 'text/plain'], 'hello')->assertStatus(415)->assertHeader('X-Request-Id');
        $this->call('POST', '/books', [], [], [], ['CONTENT_TYPE' => 'application/json'], str_repeat('x', 16_385))->assertStatus(413)->assertHeader('X-Request-Id');
    }
}
