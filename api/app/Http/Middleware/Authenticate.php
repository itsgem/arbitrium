<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;

use App\Exceptions\UnauthorizedException;
use App\Models\AccessToken;

class Authenticate
{
    /**
     * The Guard implementation.
     *
     * @var Guard
     */
    protected $auth;

    /**
     * Create a new filter instance.
     *
     * @param  Guard  $auth
     * @return void
     */
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('X-Token');
        if ($token)
        {
            $access_token = AccessToken::token($token)->first();
            if ($access_token && $access_token->checkAndRefresh())
            {
                return $next($request);
            }
        }
        throw (new UnauthorizedException);
    }
}
