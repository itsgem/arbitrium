<?php
return [
    // set your paypal credential
    'client_id' => env('PAYPAL_CLIENT_ID', 'AdKmK1vaUKr4gEV6-IAYc4I1d6u5bMGaxKuaBVs9vl-AcU7jG5hS_xRmM-gNLQue49lq1Og4mIAIhSYU'),
    'secret'    => env('PAYPAL_SECRET', 'EFnC-noUR6uD90U16a5wKZzOGuuJfWijueknjRFUSvYpImh_G_Sir-ipWLDIT7F8q9rR7Tmb9nyM3oXN'),
    'currency'  => env('PAYPAL_CURRENCY', 'USD'),

    'period_days' => [
        'annually' => '365',
        'monthly'  => '30'
    ],

    'callback_urls' => [
        'subscriptions' => env('PAYPAL_CALLBACK_SUBSCRIPTIONS', 'http://dev.w3.arbitriumgroup.com/i/subscription'),
    ],

    /*
    |--------------------------------------------------------------------------
    | SDK configuration
    |--------------------------------------------------------------------------
    */
    'settings' => [
        // Available option 'sandbox' or 'live'
        'mode' => env('PAYPAL_MODE', 'sandbox'),

        // Specify the max request time in seconds
        'http.ConnectionTimeOut' => 30,

        // Whether want to log to a file
        'log.LogEnabled' => true,

        // Specify the file that want to write on
        'log.FileName' => storage_path() . '/logs/paypal.log',

        /*
        |--------------------------------------------------------------------------
        | Log Level
        |--------------------------------------------------------------------------
        | Available option 'FINE', 'INFO', 'WARN' or 'ERROR'
        |
        | Logging is most verbose in the 'FINE' level and decreases as you
        | proceed towards ERROR
        |
        */
        'log.LogLevel' => 'FINE'
    ],
];