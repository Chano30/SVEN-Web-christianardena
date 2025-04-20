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
        if ($request->filled('website') || $request->filled('email_confirm')) {
            // This is likely a bot
            abort(422, 'Invalid submission');
          {
            // This is likely a bot
            abort(422, 'Invalid submission');
        }

        return $next($request);
    }
}
}
