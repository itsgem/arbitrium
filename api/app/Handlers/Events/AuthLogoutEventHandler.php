<?php

namespace App\Handlers\Events;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\Http\Requests\v1\LoginRequest;
use App\Models\AccessToken;
use App\User;

class AuthLogoutEventHandler
{
    public $request;
    /**
     * Create the event handler.
     *
     * @return void
     */
    public function __construct(LoginRequest $request)
    {
        $this->request = $request;
    }

    /**
     * Handle the event.
     *
     * @param  Events  $event
     * @return void
     */
    public function handle(User $user = null)
    {
        if ($user)
        {
            $user->access_token->delete();
        }
        else
        {
            AccessToken::token($this->request->header('X-Token'))->delete();
        }
    }
}
