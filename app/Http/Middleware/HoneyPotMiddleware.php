<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HoneypotMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the honeypot field is filled (it should be empty)
        if ($request->filled('website')) {
            // Return a response indicating an invalid submission
            return response()->json(['message' => 'Invalid submission'], 422);
        }

        // Allow the request to proceed
        return $next($request);
    }
}
