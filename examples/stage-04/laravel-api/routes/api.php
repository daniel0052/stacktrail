<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
Route::get('/slots',[ApiController::class,'slots']);
Route::get('/books',[ApiController::class,'books']);
Route::post('/books',[ApiController::class,'createBook']);
Route::get('/books/{id}',[ApiController::class,'showBook']);
Route::match(['put','patch'],'/books/{id}',[ApiController::class,'updateBook']);
Route::delete('/books/{id}',[ApiController::class,'deleteBook']);
Route::get('/bookings',[ApiController::class,'bookings']);
Route::post('/bookings',[ApiController::class,'reserve']);
Route::get('/bookings/{id}',[ApiController::class,'showBooking']);
Route::delete('/bookings/{id}',[ApiController::class,'cancel']);
