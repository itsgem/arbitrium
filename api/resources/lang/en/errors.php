<?php

use App\Errors;

return [
    Errors::NOT_FOUND           => 'API Not Found',
    Errors::INVALID_INPUT       => 'Invalid input.',
    Errors::CANNOT_DELETE       => 'Cannot delete :model.',
    Errors::CANNOT_EDIT         => 'Cannot edit :model.',

    Errors::UNAUTHORIZED        => 'You are not authorized to access this page.',
    Errors::EXPIRED_SESSION     => 'Your session has expired. Please login again',
    Errors::INVALID_CREDENTIALS => 'Authentication Failed.',
    Errors::INACTIVE            => 'Have you activated your account? Please check your email for the activation link.',
    Errors::FORGOT_PASSWORD     => 'Did you forget your password?',
    Errors::ACCOUNT_LOCKED      => 'Your account has been locked.',

    Errors::CANNOT_DEACTIVATE   => 'Cannot deactivate :model.',
    Errors::EXPIRED_TOKEN       => 'Your token has expired.',
    Errors::USERNAME_TAKEN      => 'Username is no longer available. Please choose another one.',
    Errors::EMAIL_TAKEN         => 'Email Address is no longer available. Please choose another one.',
    Errors::INVALID_PASSWORD    => 'The :attribute you entered is incorrect',

    Errors::UNAUTHORIZED_API_KEY                => 'You do not own this API Key.',
    Errors::INVALID_API_KEY_PERMISSION          => 'Invalid API Key Permission.',
    Errors::EXISTING_API_KEY_PERMISSION         => 'You have an existing API Key Permission.',
    Errors::UNAUTHORIZED_API_KEY_IP_ADDRESS     => 'You do not own this API Key IP Address.',

    Errors::EXISTING_SUBSCRIPTION               => 'You have an existing subscription.',
    Errors::EXISTING_TRIAL_SUBSCRIPTION         => 'Your trial subscription has already been availed.',
    Errors::CANNOT_CANCEL_PENDING_SUBSCRIPTION  => 'Unable to cancel pending subscription.',
    Errors::SUBSCRIPTION_CONFIRMATION_ERROR     => 'Unable to confirm your subscription.',
    Errors::SUBSCRIPTION_RENEWAL_ERROR          => 'Unable to save renewal of subscription.',
    Errors::SUBSCRIPTION_INVALID                => 'Invalid subscription.',

    Errors::PAYPAL_ERROR                => 'Unable to process PayPal Request.',
    Errors::PAYPAL_CANCELLED            => 'User cancelled PayPal transaction.',
    Errors::UNAUTHORIZED_PAYPAL_TOKEN   => 'Unauthorized PayPal token.',
    Errors::PAYPAL_ALREADY_CONFIRMED    => 'User already confirmed this token with Agreement :id.',
    Errors::PAYPAL_ALREADY_CANCELLED    => 'User already cancelled this token with Agreement :id.',

    Errors::INVOICE_STILL_UNPAID        => 'Invoice is still unpaid.',

    Errors::EXTERNAL_SERVER_ERROR       => 'Unable to connect to API server.',
    Errors::EXTERNAL_BAD_REQUEST        => 'Invalid input.',
    Errors::EXTERNAL_UNAUTHORIZED       => 'Unable to authenticate your API credentials. Please contact our system admimnistrator.',
    Errors::EXTERNAL_FORBIDDEN          => 'Forbidden access to API server.',
    Errors::EXTERNAL_NOT_FOUND          => 'Unable to connect to API server. Please try again later.',
];