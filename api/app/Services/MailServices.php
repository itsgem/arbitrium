<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;

use App\Builders\MailDetailsBuilder;
use App\Models\Logs\EmailLog;
use App\Models\ResetToken;
use App\Models\SystemSetting;
use App\Nrb\NrbServices;
use App\Services\Mail\Mailer;
use Log;
use View;

class MailServices extends NrbServices
{
    public function approveClient($user, $callback_url, $approve = true)
    {
        $this->sendMail(($approve ? 'email.approve_client' : 'email.disapprove_client'), [
            'name'  => $user->first_name,
            'link'  => $callback_url,
            'email_category' => EmailLog::CLIENT_APPROVAL
        ], $user);
    }

    public function changeEmail($user, $callback_url)
    {
        $this->sendMail('email.change_email', [
            'name'  => $user->first_name,
            'link'  => $callback_url.'?token='.$user->getTokenField(ResetToken::NEW_EMAIL_ADDRESS),
            'code'  => $user->getCodeField(ResetToken::NEW_EMAIL_ADDRESS),
            'to_email_address'  => $user->new_email_address,
            'email_category'    => EmailLog::USER_CHANGE_EMAIL
        ], $user);
    }

    public function changePassword($user)
    {
        $this->sendMail('email.change_password', [
            'name'  => $user->first_name,
            'email_category' => EmailLog::USER_CHANGE_PASSWORD
        ], $user);
    }

    public function clientRegistration($user, $callback_url)
    {
        $this->sendMail('email.register_client', [
            'name'  => $user->first_name,
            'link'  => $callback_url.'?token='.$user->getTokenField(ResetToken::VERIFICATION),
            'code'  => $user->getCodeField(ResetToken::VERIFICATION),
            'email_category' => EmailLog::CLIENT_REGISTRATION
        ], $user);
    }

    public function clientVerifiedForApproval($user, $callback_url)
    {
        $this->sendMail('email.client_for_approval', [
            'link'  => $callback_url.'/',
            'to_email_address'  => SystemSetting::getAdminEmail(),
            'email_category'    => EmailLog::CLIENT_VERIFIED
        ]);
    }

    public function forgotPassword($user, $callback_url)
    {
        $this->sendMail('email.forgot_password', [
            'name'  => $user->first_name,
            'link'  => $callback_url.'?token='.$user->getTokenField(ResetToken::PASSWORD_RESET),
            'code'  => $user->isAdmin() ? NULL : $user->getCodeField(ResetToken::PASSWORD_RESET),
            'email_category' => EmailLog::USER_RESET_PASSWORD
        ], $user);
    }

    public function newClientAccount($user, $callback_url)
    {
        $this->sendMail('email.new_client_account', [
            'name'  => $user->first_name,
            'username'  => $user->username,
            'link'  => $callback_url.'?token='.$user->getTokenField(ResetToken::PASSWORD_RESET),
            'code'  => $user->getCodeField(ResetToken::PASSWORD_RESET),
            'email' => $user->email_address,
            'email_category' => EmailLog::CLIENT_NEW
        ], $user);
    }

    public function subscriptionChangeConfirmation($user, $subscription)
    {
        $this->sendMail('email.subscription_change_confirmation', [
            'name'  => $user->first_name,
            'link'  => config('paypal.callback_urls.subscriptions'),
            'subscription_name' => $subscription->getSubscriptionName(),
            'email_category' => EmailLog::CHANGE_SUBSCRIPTION
        ], $user);
    }

    public function subscriptionChangeSuccess($user, $subscription)
    {
        $this->sendMail('email.subscription_change_success', [
            'name'  => $user->first_name,
            'subscription_name' => $subscription->getSubscriptionName(),
            'subscription_validity' => $subscription->getSubscriptionValidity(),
            'email_category' => EmailLog::CHANGE_SUBSCRIPTION_SUCCESS
        ], $user);
    }

    public function subscriptionCancellation($user, $subscription)
    {
        $this->sendMail('email.subscription_cancellation', [
            'name'  => $user->first_name,
            'subscription_name' => $subscription->getSubscriptionName(),
            'email_category' => EmailLog::CANCEL_SUBSCRIPTION
        ], $user);
    }

    public function sendInvoice($user, $url)
    {
        $this->sendMail('email.invoice', [
            'name'  => $user->name,
            'url'   => $url,
            'email_category' => EmailLog::INVOICE
        ], $user);
    }

    public function renewSubscriptionReminder($user, $date)
    {
        $this->sendMail('email.subscription_reminder', [
            'name'  => $user->first_name,
            'date'   => $date,
            'email_category' => EmailLog::RENEW_SUBSCRIPTION
        ], $user, true);
    }

    public function renewSubscriptionCreditReminder($user)
    {
        $this->sendMail('email.subscription_credit_reminder', [
            'name'  => $user->first_name,
            'email_category' => EmailLog::RENEW_SUBSCRIPTION
        ], $user, true);
    }

    public function renewedSubscription($user, $link)
    {
        $this->sendMail('email.subscription_renewed', [
            'name'  => $user->first_name,
            'link'   => $link,
            'email_category' => EmailLog::RENEW_SUBSCRIPTION
        ], $user, true);
    }

    public function resend($id)
    {
        $log = EmailLog::find($id);
        if ($log)
        {
            $this->send((new MailDetailsBuilder())->buildFromEmailLog($log));
        }
        return $this->respondWithSuccess();
    }

    // Mail WebHook Listener
    public function statusUpdate($request)
    {
        $mailer = Mailer::newInstance();
        $mailer->webhookHandler($request);
        return $this->respondWithSuccess($request->all());
    }

    private function send($data, $async = false)
    {
        $mailer = Mailer::newInstance();
        $mailer->send($data, $async);
        if (isset($mailer->mail_id))
        {
            EmailLog::create([
                'sent_at'               => current_datetime(),
                'sender_type'           => $data['sender_type'],
                'to_user_id'            => $data['to_user_id'],
                'to_email_address'      => $data['to_email_address'],
                'to_name'               => $data['to_name'],
                'subject'               => $data['subject'],
                'email_category'        => $data['email_category'],
                'from_email_address'    => $data['from_email_address'],
                'notes'                 => $data['notes'],
                'attachment'            => $data['attachment'],
                'content'               => $data['content'],
                'mail_id'               => $mailer->mail_id,
                'email_status'          => $mailer->email_status,
                'email_reject_reason'   => $mailer->email_reject_reason,
            ]);
        }
    }

    private function sendMail($template, $data, $user = null, $async = false)
    {
        $mail_details = new MailDetailsBuilder();
        if ($template)
        {
            $mail_details->setContent((string) View::make($template, $data));
        }
        else
        {
            $mail_details->setContent($data['content']);
        }

        $mail_details->setFromEmailAddress(get_val($data, 'from_email_address', config('mail.from.address')));
        $mail_details->setSubject(get_val($data, 'subject', trans($template)));
        $mail_details->setToEmailAddress(get_val($data, 'to_email_address', $user ? $user->email_address : NULL));
        $mail_details->setToName(get_val($data, 'to_name', $user ? $user->name : NULL));
        $mail_details->setToUserId(get_val($data, 'to_user_id', $user ? $user->id : NULL));

        $this->send($mail_details->build($data), $async);
    }
}
