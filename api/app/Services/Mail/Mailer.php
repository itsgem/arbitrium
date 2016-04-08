<?php

namespace App\Services\Mail;

abstract class Mailer
{
    public $mail_id;
    public $email_status;
    public $email_reject_reason;

    public static function newInstance()
    {
        $driver = strtolower(env('MAIL_DRIVER', 'sendgrid'));
        switch ($driver)
        {
            case 'mandrill': $mailer = new Mailer_Mandrill(); break;
            case 'sendgrid': $mailer = new Mailer_SendGrid(); break;
            default: $mailer = new Mailer_SendGrid();
        }
        return $mailer;
    }

    protected abstract function send($data, $async);
    protected abstract function webhookHandler($request);
}