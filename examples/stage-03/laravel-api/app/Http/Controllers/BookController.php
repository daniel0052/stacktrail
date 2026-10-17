<?php
namespace App\Http\Controllers;
use App\Catalog\JsonBookCatalog;
use App\Http\Requests\BookRequest;
use App\Support\BookPresenter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
final class BookController
{
    public function __construct(private JsonBookCatalog $catalog, private BookPresenter $presenter) {}
    private function id(string $book): int {
        $id = filter_var($book, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
        abort_if($id === false, 404); return $id;
    }
    public function index(Request $request): JsonResponse {
        $data = $request->validate(['q' => ['sometimes', 'string', 'max:200']]);
        $books = array_filter($this->catalog->all(), fn ($book) => !isset($data['q']) || mb_stripos($book['title'], $data['q']) !== false);
        return response()->json(array_values(array_map($this->presenter->one(...), $books)));
    }
    public function show(string $book): JsonResponse {
        $found = $this->catalog->find($this->id($book)); abort_if($found === null, 404);
        return response()->json($this->presenter->one($found));
    }
    public function store(BookRequest $request): JsonResponse {
        $book = $this->catalog->create($request->validated());
        return response()->json($this->presenter->one($book), 201)->header('Location', '/books/'.$book['id']);
    }
    public function update(BookRequest $request, string $book): JsonResponse {
        $updated = $this->catalog->update($this->id($book), $request->validated()); abort_if($updated === null, 404);
        return response()->json($this->presenter->one($updated));
    }
    public function destroy(string $book): Response {
        abort_unless($this->catalog->delete($this->id($book)), 404); return response()->noContent();
    }
}
