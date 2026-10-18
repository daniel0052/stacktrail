<?php
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\RequestBoundary;
use App\Domain\DomainFailure;
return Application::configure(basePath:dirname(__DIR__))
 ->withRouting(api:__DIR__.'/../routes/api.php',apiPrefix:'api/v1')
 ->withMiddleware(function(Middleware $middleware):void{$middleware->remove(\Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class);$middleware->append(RequestBoundary::class);})
 ->withExceptions(function(Exceptions $exceptions):void{
  $exceptions->shouldRenderJsonWhen(fn()=>true);
  $exceptions->render(function(DomainFailure $e){return response()->json(['type'=>'about:blank','title'=>[404=>'Not Found',409=>'Conflict',422=>'Unprocessable Content'][$e->status],'status'=>$e->status,'detail'=>$e->getMessage()],$e->status,['Content-Type'=>'application/problem+json']);});
  // ValidationException keeps Laravel's native422 shape; full RFC adaptation is recommended, not required.
 })->create();
