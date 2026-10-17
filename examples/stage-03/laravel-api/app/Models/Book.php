<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

final class Book extends Model
{
    protected $fillable = ['title', 'author'];
}
