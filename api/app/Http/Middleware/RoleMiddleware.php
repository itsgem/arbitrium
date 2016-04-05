<?php

namespace App\Http\Middleware;

use Closure;

use App\Exceptions\UnauthorizedException;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        if (!($request->user() && $request->user()->hasRole($role)))
        {
            throw (new UnauthorizedException);
        }

        return $next($request);
    }
}
