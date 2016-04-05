<?php

namespace App\Console\Commands;

use App\Models\ClientSubscription;
use App\Services\MailServices;
use DB;
use Illuminate\Console\Command;
use Log;

class RenewSubscriptionReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'renew:subscription-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sends an email reminder for upcoming renewal of subscription';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        log_command($this->signature);
        Log::info('START '.$this->signature);

        DB::transaction(function ()
        {
            $reminder_in_days   = config('arbitrium.subscription_email_reminder');
            $valid_to           = format_date_to_string(current_date()->addDay($reminder_in_days));
            $new_validity_date  = convert_to_string(current_date()->addDay($reminder_in_days + 1), 'F j,Y');

            Log::info('SUBSCRIPTIONS VALID TO: '.$valid_to.' NEW VALIDITY: '.$new_validity_date);

            $client_subscriptions = ClientSubscription::renew()
                                    ->emailReminderSent(false)
                                    ->validTo($valid_to)
                                    ->get();
            foreach($client_subscriptions as $client_subscription)
            {
                if ($client_subscription->client->canPurchaseSubscription($client_subscription->subscription))
                {
                    if ($client_subscription->subscription->price_in_credit > 0)
                    {
                        with(new MailServices())->renewSubscriptionReminder($client_subscription->client->user, $new_validity_date);
                    }
                }
                else
                {
                    with(new MailServices())->renewSubscriptionCreditReminder($client_subscription->client->user);
                }
                $client_subscription->email_reminder_sent = 1;
                $client_subscription->save();
            }
        });

        Log::info('END '.$this->signature);
    }
}
