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
    protected $signature = 'subscription:renew_reminder';

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

        $this->info('START '.$this->signature);
        Log::info('START '.$this->signature);

        DB::transaction(function ()
        {
            $reminder_in_days   = config('arbitrium.subscription_email_reminder');
            $valid_to           = format_date_to_string(current_date()->addDay($reminder_in_days));
            $new_validity_date  = convert_to_string(current_date()->addDay($reminder_in_days + 1), 'F j,Y');

            $this->info('SUBSCRIPTIONS VALID TO: '.$valid_to.' NEW VALIDITY: '.$new_validity_date);
            Log::info('SUBSCRIPTIONS VALID TO: '.$valid_to.' NEW VALIDITY: '.$new_validity_date);

            $client_subscriptions = ClientSubscription::active()
                                    ->isAutoRenew()
                                    ->isEmailReminderSent(false)
                                    ->validTo($valid_to)
                                    ->get();

            $loading = $this->output->createProgressBar($client_subscriptions->count());

            foreach($client_subscriptions as $client_subscription)
            {
                with(new MailServices())->renewSubscriptionReminder($client_subscription->client->user, $new_validity_date);
                $client_subscription->is_email_reminder_sent = 1;
                $client_subscription->save();

                $message = ' Reminded almost due Client Subscription #'.$client_subscription->id.' ('.$client_subscription->client->user->email_address.')';

                $loading->advance();

                $this->info($message);
                Log::info($message);
            }

            $loading->finish();
        });

        $this->info('');
        $this->info('END '.$this->signature);
        Log::info('END '.$this->signature);
    }
}
