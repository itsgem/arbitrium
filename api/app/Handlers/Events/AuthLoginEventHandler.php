<?php

namespace App\Handlers\Events;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\Models\AccessToken;
use App\User;

class AuthLoginEventHandler
{
    /**
     * Create the event handler.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  User  $user
     * @param  string  $remember
     * @return void
     */
    public function handle(User $user, $remember)
    {
        $user->unlock();
        $access_token = AccessToken::userId($user->id)->first();
        if ($access_token)
        {
            // We are not allowing multiple logins; Only 1 token should exist per user
            $access_token->delete();
        }
        $access_token = AccessToken::create(['user_id' => $user->id]);
        $access_token->updateExpiry();
    }
}
