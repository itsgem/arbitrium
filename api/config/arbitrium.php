<?php

return [
    'max_login_attempts'    => 3,
    'min_admin_count'       => 3,
    'default_timezone'      => 'Asia/Singapore',

    'subscription_email_reminder' => 5, // in days

    'core' => [
        'api_url'       => env('ARBITRIUM_API_URL'),
        'auth'          => [
            'grant_type'    => env('ARBITRIUM_GRANT_TYPE'),
            'client_id'     => env('ARBITRIUM_CLIENT_ID'),
            'client_secret' => env('ARBITRIUM_CLIENT_SECRET'),
            'username'      => env('ARBITRIUM_USERNAME'),
            'password'      => env('ARBITRIUM_PASSWORD'),
        ],
        'endpoints'     => [
            'list_api_keys'             => ['method' => 'get',    'path' => 'apiKeys'],
            'show_api_key'              => ['method' => 'get',    'path' => 'apiKeys/:id'],
            'create_api_key'            => ['method' => 'post',   'path' => 'apiKeys'],
            'update_api_key'            => ['method' => 'put',    'path' => 'apiKeys/:id'],
            'delete_api_key'            => ['method' => 'delete', 'path' => 'apiKeys/:id'],
            'activate_api_key'          => ['method' => 'patch',  'path' => 'apiKeys/:id/activate'],

            'list_api_key_permissions'  => ['method' => 'get',    'path' => 'permission'],
        ]
    ],

    'temp_storage' => storage_path().'/temp/',

    'invoice' => [
        'path' => public_path().'/invoices/',
        'url'  => env('APP_URL').'/invoices/',
    ],
];