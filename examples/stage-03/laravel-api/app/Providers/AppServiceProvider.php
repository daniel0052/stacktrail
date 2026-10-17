<?php
namespace App\Providers;
use App\Catalog\JsonBookCatalog;
use Illuminate\Support\ServiceProvider;
final class AppServiceProvider extends ServiceProvider
{
    public function register(): void {
        $this->app->bind(JsonBookCatalog::class, fn () => new JsonBookCatalog(config('catalog.path')));
    }
}
