<?php
namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use App\Domain\FakeStore;
final class AppServiceProvider extends ServiceProvider {
    public function register():void {
        $this->app->bind(FakeStore::class,fn()=>new FakeStore(config('catalog.path')));
    }
}
