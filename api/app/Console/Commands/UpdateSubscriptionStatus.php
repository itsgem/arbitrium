<?php

namespace App\Console\Commands;

use App\Models\ClientSubscription;
use App\Services\MailServices;
use DB;
use Illuminate\Console\Command;
use Log;

class UpdateSubscriptionStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'subscription:update_status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Inactivate client subscription status when validity exceeds';

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
            $yesterday  = format_date_to_string(current_date()->subDay());
            $today      = current_date_to_string();

            $this->info('SUBSCRIPTIONS VALID TO: '.$yesterday);
            Log::info('SUBSCRIPTIONS VALID TO: '.$yesterday);

            $client_subscriptions = ClientSubscription::active()
                                    ->validTo($yesterday)
                                    ->get();

            $loading = $this->output->createProgressBar($client_subscriptions->count());

            foreach($client_subscriptions as $client_subscription)
            {
                $client_subscription->expire();
                $client_subscription = ClientSubscription::find($client_subscription->id);

                $message = ' Inactivated Client Subscription #'.$client_subscription->id;

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
