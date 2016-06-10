<?php

return [
    'max_login_attempts'    => 3,
    'min_admin_count'       => 3,
    'default_timezone'      => 'Asia/Singapore',

    'subscription_email_reminder' => 5, // in days

    'core' => [
	    'grant_type' => env('ARBITRIUM_GRANT_TYPE'),
	    'client_id'    => env('ARBITRIUM_CLIENT_ID'),
	    'client_secret'    => env('ARBITRIUM_CLIENT_SECRET'),
	    'username'    => env('ARBITRIUM_USERNAME'),
	    'password'    => env('ARBITRIUM_PASSWORD'),
    ],
    'temp_storage'  => storage_path().'/temp/',

    'invoice' => [
        'path' => public_path().'/invoices/',
        'url'  => env('APP_URL').'/invoices/',
    ],
];