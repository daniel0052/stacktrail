<?php
use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json(['status' => 'ok']));
Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{book}', [BookController::class, 'show'])->whereNumber('book');
Route::post('/books', [BookController::class, 'store']);
Route::patch('/books/{book}', [BookController::class, 'update'])->whereNumber('book');
Route::delete('/books/{book}', [BookController::class, 'destroy'])->whereNumber('book');
