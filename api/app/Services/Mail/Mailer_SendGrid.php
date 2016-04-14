<?php

namespace App\Services\Mail;

use App\Models\Logs\EmailLog;
use Log;
use SendGrid;
use SendGrid\Email;
use SendGrid\Exception;

class Mailer_SendGrid extends Mailer
{
    public function send($data, $async)
    {
        try
        {
            $a_send_to = [];
            $a_send_to_name = [];
            $a_to_email = explode(',', $data['to_email_address']);
            foreach($a_to_email as $email)
            {
                $a_send_to[] = $email;
                $a_send_to_name[] = $data['to_name'];
            }

            $this->mail_id = generate_token();
            $sendgrid = new SendGrid(env('MAILER_APIKEY'));
            $email    = new Email();
            $email->addTo($a_send_to, $a_send_to_name)
                    ->setFrom($data['from_email_address'])
                    ->setSubject($data['subject'])
                    ->setReplyTo($data['from_email_address'])
                    ->addUniqueArg("ArbitriumMailID", $this->mail_id)
                    ->setHtml($data['content']);
            $a_response = $sendgrid->send($email);
            $this->email_status = 'Processed';

        }
        catch(Exception $e)
        {
            $this->mail_id = NULL;
            // Mail errors are thrown as exceptions
            Log::error('A sendgrid error occurred: ' . get_class($e) . ' - ' . $e->getCode());
            foreach($e->getErrors() as $er)
            {
                Log::error($er);
            }
        }
    }

    public function webhookHandler($request)
    {
        $events = json_decode($request, true);
        Log::info('SendGrid web hook called');
        Log::info($events);
        foreach($events as $event)
        {
            $mail_id = get_val($event, 'ArbitriumMailID');
            // $send_grid_msg_id = get_val($event, 'sg_message_id');
            $email_log = EmailLog::mailId($mail_id)->first();
            if ($email_log)
            {
                $event = get_val($event, 'event');
                $reason = '';
                if (!in_array($event, ['Processed', 'Delivered', 'Open', 'Click']))
                {
                    $reason = $event;
                    $event  = EmailLog::REJECTED;
                }
                $email_log->update(['email_status' => $event, 'email_reject_reason' => $reason]);
            }
        }
    }
}