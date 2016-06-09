<?php
namespace App;

use Illuminate\Http\Response;
class Errors
{
    // General
    const NOT_FOUND         = 10000;
    const NO_CONTENT        = 10001;
    const INVALID_INPUT     = 10002;
    const CANNOT_DELETE     = 10003;
    const CANNOT_EDIT       = 10004;

    // Authentication
    const UNAUTHORIZED          = 20000;
    const EXPIRED_SESSION       = 20001;
    const INVALID_CREDENTIALS   = 20002;
    const INACTIVE              = 20003;
    const FORGOT_PASSWORD       = 20004;
    const ACCOUNT_LOCKED        = 20005;

    // User
    const CANNOT_DEACTIVATE = 30000;
    const USERNAME_TAKEN    = 30001;
    const EXPIRED_TOKEN     = 30002;
    const EMAIL_TAKEN       = 30003;
    const INVALID_PASSWORD  = 30004;

    // Survey
    const UNABLE_TO_PUBLISH     = 40001;
    const CANNOT_ADD_CONTENT    = 40002;
    const CANNOT_MODIFY_CONTENT = 40003;
    const SKIP_QUESTION_LOGIC   = 40004;
    const DELETE_QUESTION_LOGIC = 40005;
    const MAX_QUESTION_REACHED  = 40006;
    const MAX_SURVEY_REACHED    = 40007;
    const CANNOT_USE_SKIP_QUESTION  = 40008;
    const UNABLE_TO_ADMINISTER      = 40009;
    const INVALID_PAGE_SEQUENCE     = 40010;
    const OTHER_ANSWER_TEXT_LOGIC   = 40011;

    // Client
    const INSUFFICIENT_CREDIT   = 50001;
    const EXISTING_SUBSCRIPTION = 50002;

    // API Key
    const UNAUTHORIZED_API_KEY             = 60001;
    const INVALID_API_KEY_PERMISSION       = 60002;
    const EXISTING_API_KEY_PERMISSION      = 60003;
    const UNAUTHORIZED_API_KEY_IP_ADDRESS  = 60004;

    // Subscriptions
    const EXISTING_TRIAL_SUBSCRIPTION        = 70001;
    const CANNOT_CANCEL_PENDING_SUBSCRIPTION = 70002;

    // Paypal
    const PAYPAL_ERROR              = 80001;
    const PAYPAL_CANCELLED          = 80002;
    const UNAUTHORIZED_PAYPAL_TOKEN = 80003;
    const PAYPAL_ALREADY_CONFIRMED  = 80004;
    const PAYPAL_ALREADY_CANCELLED  = 80005;

    public static $http_codes = [
        self::NOT_FOUND             => Response::HTTP_NOT_FOUND,
        self::UNAUTHORIZED          => Response::HTTP_UNAUTHORIZED,
        self::EXPIRED_SESSION       => Response::HTTP_UNAUTHORIZED,
        self::NO_CONTENT            => Response::HTTP_NO_CONTENT,
        self::INVALID_CREDENTIALS   => Response::HTTP_FORBIDDEN,
        self::ACCOUNT_LOCKED        => Response::HTTP_LOCKED
    ];

    public static $extended_codes = [ // For Custom HTTP Status Codes
        self::EXPIRED_SESSION => 419 // 419 Authentication Timeout
    ];

    public static function httpCode($error_code)
    {
        return isset(self::$http_codes[$error_code]) ? self::$http_codes[$error_code] : Response::HTTP_BAD_REQUEST;
    }
}
