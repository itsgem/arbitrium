<?php
namespace App\Http\Controllers\v1;

use App\Errors;
use App\Http\Requests\v1\LoginRequest;
use App\Http\Requests\v1\LoginSocialRequest;
use App\Models\ResetToken;
use App\Nrb\Http\v1\Controllers\ApiController;
use App\Nrb\NrbAuth;
use App\User;

class AuthController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return ['login']; // Manually log API Access
    }

    protected function getMethods()
    {
        return [
            'login'     => 'Login',
            'loginViaSocial'     => 'Login via Social',
            'logout'    => 'Logout'
        ];
    }

    /**
     * Login
     *
     * @SWG\Post(
     *     path="/auth/login",
     *     tags={"* Authentication"},
     *     summary="Login",
     *     description="Authenticates guest user by logging in, either as client or admin.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="object", description="Token authentication", required={"token", "lifetime", "username"},
     *                 @SWG\Property(property="token", type="string", description="Token authentication", default="f2c3e7769b74f865bd9059f190df8cccb1d055d589e5bf8b76217322da630f24"),
     *                 @SWG\Property(property="lifetime", type="integer", format="int64", description="Token lifetime", default="20"),
     *                 @SWG\Property(property="timezone", type="string", description="User's Timezone", default="Asia/Singapore"),
     *                 @SWG\Property(property="username", type="string", description="Username of authenticated user", default="user_client_1"),
     *             ),
     *         )
     *     ),
     *     @SWG\Response(response="403", description="Authentication Failed",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "messages"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="false"),
     *             @SWG\Property(property="message", type="string", description="Error message", default="Authentication Failed"),
     *             @SWG\Property(property="messages", type="array", description="Other messages or instructions for user", items=""),
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="body",
     *         in="body",
     *         description="Login details",
     *         required=true,
     *         type="object",
     *         @SWG\Schema(title="data", type="object", required={"login", "password", "user_type"},
     *             @SWG\Property(property="login", type="string", description="Email address or username", default="client0001"),
     *             @SWG\Property(property="password", type="string", description="Password", default="Passw0rd"),
     *             @SWG\Property(property="user_type", type="integer", format="int64", description="[1 => admin, 2 => client]", default="2"),
     *         )
     *     )
     * )
     *
     * @param LoginRequest $request
     *
     * @return mixed
     */
    public function login(LoginRequest $request)
    {
        $user = User::usernameOrEmail($request->get('login'))->userType($request->get('user_type'))->active()->first();
        if ($user)
        {
            if ($user->isLocked())
            {
                return $this->respondWithError(Errors::ACCOUNT_LOCKED);
            }

            $can_login = true;
            if ($user->isClient())
            {
                $can_login = $user->client->isApproved();
            }

            if ($can_login)
            {
                if (NrbAuth::attempt(['username' => $user->username, 'password' => $request->get('password'), 'id' => $user->id]))
                {
                    log_api_access($this, __FUNCTION__);
                    $data = [
                        'token'     => $user->access_token->token,
                        'lifetime'  => get_sesssion_lifetime(),
                        'timezone'  => $user->timezone,
                        'username'  => $user->username,
                        'role_id'  => $user->getRoleIds()
                    ];
                    return $this->respondWithSuccess($data);
                }

                // Increment Invalid Login Attempts
                $user->increment('login_attempts');
                if ($user->isMaxLogAttempts())
                {
                    log_api_error($this, __FUNCTION__, $user);
                    return $this->respondWithError(Errors::ACCOUNT_LOCKED);
                }
            }
        }
        log_api_error($this, __FUNCTION__, get_user_from_request($request));
        $this->addResponseMessage(Errors::INACTIVE);
        $this->addResponseMessage(Errors::FORGOT_PASSWORD);
        return $this->respondWithError(Errors::INVALID_CREDENTIALS);
    }

    public function loginViaSocial(LoginSocialRequest $request)
    {
        $user = User::providerId($request->get('provider_id'))->first();
        if (!$user)
        {
            $user = new User([
                'name'          => $request->get('name'),
                'username'      => $request->get('username'),
                'email_address' => $request->get('email_address')
            ]);
            $user->provider     = $request->get('provider');
            $user->provider_id  = $request->get('provider_id');
            $user->activated_at = current_datetime();
        }

        auth()->login($user);
        log_api_access($this, __FUNCTION__);

        $user = $user->fresh();
        return $this->respondWithSuccess([
                    'token'     => $user->access_token->token,
                    'lifetime'  => get_sesssion_lifetime(),
                    'timezone'  => $user->timezone,
                    'username'  => $user->username,
                    'role_id'  => $user->getRoleIds()
                ]);
    }

    public function logout(LoginRequest $request)
    {
        NrbAuth::logout();
        return $this->respondWithSuccess();
    }
}