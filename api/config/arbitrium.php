<?php

return [
    'max_login_attempts'    => 3,
    'min_admin_count'       => 3,
    'default_timezone'      => 'Asia/Singapore',

    'subscription_email_reminder' => 5, // in days

    'temp_storage'  => storage_path().'/temp/',

    'invoice_path'  => public_path().'/invoices/',
    'invoice_url'   => url('invoices'),
];