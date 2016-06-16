<?php
namespace App;

use Illuminate\Http\Response;
class Errors
{
    // General
    const NOT_FOUND                 = 10000;
    const NO_CONTENT                = 10001;
    const INVALID_INPUT             = 10002;
    const CANNOT_DELETE             = 10003;
    const CANNOT_EDIT               = 10004;

    // Authentication
    const UNAUTHORIZED              = 20000;
    const EXPIRED_SESSION           = 20001;
    const INVALID_CREDENTIALS       = 20002;
    const INACTIVE                  = 20003;
    const FORGOT_PASSWORD           = 20004;
    const ACCOUNT_LOCKED            = 20005;

    // User
    const CANNOT_DEACTIVATE         = 30000;
    const USERNAME_TAKEN            = 30001;
    const EXPIRED_TOKEN             = 30002;
    const EMAIL_TAKEN               = 30003;
    const INVALID_PASSWORD          = 30004;

    // API Key
    const UNAUTHORIZED_API_KEY                  = 40000;
    const INVALID_API_KEY_PERMISSION            = 40001;
    const EXISTING_API_KEY_PERMISSION           = 40002;
    const UNAUTHORIZED_API_KEY_IP_ADDRESS       = 40003;

    // Subscriptions
    const EXISTING_SUBSCRIPTION                 = 50000;
    const EXISTING_TRIAL_SUBSCRIPTION           = 50001;
    const CANNOT_CANCEL_PENDING_SUBSCRIPTION    = 50002;
    const SUBSCRIPTION_CONFIRMATION_ERROR       = 50003;
    const SUBSCRIPTION_RENEWAL_ERROR            = 50004;
    const SUBSCRIPTION_INVALID                  = 50005;

    // Paypal
    const PAYPAL_ERROR              = 60000;
    const PAYPAL_CANCELLED          = 60001;
    const UNAUTHORIZED_PAYPAL_TOKEN = 60002;
    const PAYPAL_ALREADY_CONFIRMED  = 60003;
    const PAYPAL_ALREADY_CANCELLED  = 60004;

    // Invoices
    const INVOICE_STILL_UNPAID      = 70000;

    // External Requests
    const EXTERNAL_PREFIX           = 10000;
    const EXTERNAL_BAD_REQUEST      = 10000400;
    const EXTERNAL_UNAUTHORIZED     = 10000401;
    const EXTERNAL_FORBIDDEN        = 10000403;
    const EXTERNAL_NOT_FOUND        = 10000404;

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
