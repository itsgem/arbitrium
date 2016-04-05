<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;

use App\Exceptions\UnauthorizedException;
use App\Models\SurveyRespondent;

class ValidateInviteToken
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
            $survey_respondent = SurveyRespondent::inviteToken($token)->first();
            if ($survey_respondent)
            {
                session(['survey_respondent_id' => $survey_respondent->id, 'invite_token' => $survey_respondent->invite_token]);
                return $next($request);
            }
        }
        throw (new UnauthorizedException);
    }
}
