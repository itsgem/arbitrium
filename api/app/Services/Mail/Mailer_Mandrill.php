<?php

namespace App\Services\Mail;

use App\Models\Logs\EmailLog;
use Log;
use Mandrill;
use Mandrill_Error;

class Mailer_Mandrill extends Mailer
{
    public function send($data, $async)
    {
        try
        {
            $a_send_to = [];
            $a_to_email = explode(',', $data['to_email_address']);
            foreach($a_to_email as $email)
            {
                $a_send_to[] = ['email' => $email, 'name' => $data['to_name']];
            }

            $mandrill = new Mandrill(env('MAILER_APIKEY'));
            $a_response = $mandrill->messages->send([
                'html'          => $data['content'],
                'subject'       => $data['subject'],
                'from_email'    => $data['from_email_address'],
                'to'            => $a_send_to,
                'headers'       => ['Reply-To' => $data['from_email_address']],
                'track_opens'   => true,
                'track_clicks'  => false
            ], $async);

            if ($a_response)
            {
                $response       = head($a_response);
                $this->mail_id  = get_val($response, '_id');
                $this->email_status             = get_val($response, 'status');
                $this->email_reject_reason      = get_val($response, 'reject_reason');
            }

        }
        catch(Mandrill_Error $e)
        {
            // Mandrill errors are thrown as exceptions
            Log::error('A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage());
        }
    }

    public function webhookHandler($request)
    {
        $events = json_decode($request->get('mandrill_events'), true);
        Log::info('Mandrill web hook called');
        Log::info($events);
        foreach($events as $event)
        {
            $mandrill_id = get_val($event, '_id');
            $email_log = EmailLog::mandrillId($mandrill_id)->first();
            if ($email_log)
            {
                $event = get_val($event, 'event');
                $reason = '';
                if ($event != 'send' && $event != 'open')
                {
                    $reason = $event;
                    $event  = EmailLog::REJECTED;
                }
                $email_log->update(['email_status' => $event, 'email_reject_reason' => $reason]);
            }
        }
    }

}