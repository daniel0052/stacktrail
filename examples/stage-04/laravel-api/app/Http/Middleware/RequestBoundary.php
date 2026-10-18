<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use JsonException;
use Symfony\Component\HttpFoundation\Response;
final class RequestBoundary  {
    public function handle(Request $request, Closure $next): Response      {
        $id = (string) Str::uuid();
        $response = $this->reject($request) ?? $next($request);
        $response->headers->set('X-Request-Id', $id);
        Log::info('request.completed', ['request_id' => $id, 'method' => $request->method(), 'status' => $response->getStatusCode()]);
        return $response;
    }
    private function reject(Request $request): ?Response      {
        if (in_array($request->method(), ['POST', 'PATCH', 'PUT'], true))  {
            if (strlen($request->getContent()) > 32_768)  {
                return response()->json(['message' => 'Corpo acima do limite didático'], 413);
            }
            if (!$request->isJson())  {
                return response()->json(['message' => 'Envie JSON'], 415);
            }
            try  {
                $data = json_decode($request->getContent(), false, 32, JSON_THROW_ON_ERROR);
            }
            catch (JsonException)  {
                return response()->json(['message' => 'JSON malformado'], 400);
            }
            if (!is_object($data))  {
                return response()->json(['message' => 'Esperado objeto JSON'], 422);
            }
        }
        return null;
    }
}
