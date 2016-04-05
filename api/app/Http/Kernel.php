<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * @var array
     */
    protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
        'Barryvdh\Cors\HandleCors'
    ];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth'              => \App\Http\Middleware\Authenticate::class,
        'auth.admin'        => \App\Http\Middleware\AuthenticateAdmin::class,
        'auth.client'       => \App\Http\Middleware\AuthenticateClient::class,
        'role'              => \App\Http\Middleware\RoleMiddleware::class,
        'valid.client_id'   => \App\Http\Middleware\ValidateClient::class,
        'valid.invite'      => \App\Http\Middleware\ValidateInviteToken::class
    ];
}
