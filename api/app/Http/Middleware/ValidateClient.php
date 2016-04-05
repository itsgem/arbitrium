<?php

namespace App\Http\Middleware;

use Closure;

use App\Exceptions\UnauthorizedException;
use App\Models\Client;

class ValidateClient
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = auth()->user();
        if ($user->isAdmin())
        {
            Client::findOrFail($request->get('client_id'));
            return $next($request);
        }
        throw (new UnauthorizedException);
    }
}
