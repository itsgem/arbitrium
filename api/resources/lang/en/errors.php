<?php

use App\Errors;

return [
    Errors::NOT_FOUND       => 'API Not Found',
    Errors::UNAUTHORIZED    => 'You are not authorized to access this page.',
    Errors::EXPIRED_SESSION => 'Your session has expired. Please login again',
    Errors::EXPIRED_TOKEN   => 'Your token has expired.',
    Errors::INVALID_CREDENTIALS => 'Authentication Failed.',
    Errors::INACTIVE        => 'Have you activated your account? Please check your email for the activation link.',
    Errors::FORGOT_PASSWORD => 'Did you forget your password?',
    Errors::INVALID_INPUT   => 'Invalid input.',
    Errors::ACCOUNT_LOCKED  => 'Your account has been locked.',
    Errors::CANNOT_DELETE   => 'Cannot delete :model.',
    Errors::CANNOT_DEACTIVATE   => 'Cannot deactivate :model.',
    Errors::USERNAME_TAKEN  => 'Username is no longer available. Please choose another one.',
    Errors::EMAIL_TAKEN     => 'Email Address is no longer available. Please choose another one.',
    Errors::INVALID_PASSWORD    => 'The :attribute you entered is incorrect',
    Errors::CANNOT_EDIT     => 'Cannot edit :model.',
    Errors::UNABLE_TO_PUBLISH   => 'Cannot publish survey. It must have at least 1 question.',
    Errors::CANNOT_ADD_CONTENT  => 'Cannot add contents to survey.',
    Errors::CANNOT_MODIFY_CONTENT   => 'Cannot modify contents of survey.',
    Errors::SKIP_QUESTION_LOGIC     => 'Can only set skip question logic up to 1 question per page.',
    Errors::DELETE_QUESTION_LOGIC   => 'Survey must have at least one question.',
    Errors::MAX_QUESTION_REACHED    => 'You have reached the maximum questions allowed for a survey.',
    Errors::MAX_SURVEY_REACHED      => 'You have reached the maximum surveys allowed.',
    Errors::CANNOT_USE_SKIP_QUESTION    => 'This survey does not support skip question logic.',
    Errors::UNABLE_TO_ADMINISTER    => 'Unable to administer survey.',
    Errors::INVALID_PAGE_SEQUENCE   => 'Invalid page no sequence',
    Errors::OTHER_ANSWER_TEXT_LOGIC => 'Can only add Other as answer option once.',
    Errors::INSUFFICIENT_CREDIT     => 'Your remaining credit balance in your account is insufficient. Please purchase additional credits.',
    Errors::EXISTING_SUBSCRIPTION   => 'You have an existing subscription.',
    Errors::UNAUTHORIZED_API_KEY    => 'You do not own this API Key.',
    Errors::INVALID_API_KEY_PERMISSION      => 'Invalid API Key Permission.',
    Errors::EXISTING_API_KEY_PERMISSION     => 'You have an existing API Key Permission.',
    Errors::UNAUTHORIZED_API_KEY_IP_ADDRESS => 'You do not own this API Key IP Address.',
    Errors::EXISTING_TRIAL_SUBSCRIPTION     => 'Your trial subscription has already been availed.',
    Errors::CANNOT_CANCEL_PENDING_SUBSCRIPTION  => 'Unable to cancel pending subscription.',
    Errors::SUBSCRIPTION_CONFIRMATION_ERROR => 'Unable to confirm your subscription.',
    Errors::PAYPAL_ERROR                => 'Unable to process PayPal Request.',
    Errors::PAYPAL_CANCELLED            => 'User cancelled PayPal transaction.',
    Errors::UNAUTHORIZED_PAYPAL_TOKEN   => 'Unauthorized PayPal token.',
    Errors::PAYPAL_ALREADY_CONFIRMED    => 'User already confirmed this token with Agreement :id.',
    Errors::PAYPAL_ALREADY_CANCELLED    => 'User already cancelled this token with Agreement :id.',
    Errors::INVOICE_STILL_UNPAID    => 'Invoice is still unpaid.',
];