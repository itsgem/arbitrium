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

        $this->info('['.$this->signature.'] ===== START =====');
        Log::info('['.$this->signature.'] ===== START =====');

        DB::transaction(function ()
        {
            $yesterday  = format_date_to_string(current_date()->subDay());
            $today      = current_date_to_string();

            $this->info('['.$this->signature.'] SUBSCRIPTIONS VALID TO: '.$yesterday);
            Log::info('['.$this->signature.'] SUBSCRIPTIONS VALID TO: '.$yesterday);

            $client_subscriptions = ClientSubscription::active()
                                    ->dateTo('valid_to', $yesterday)
                                    ->get();

            $loading = $this->output->createProgressBar($client_subscriptions->count());

            foreach($client_subscriptions as $client_subscription)
            {
                $client_subscription->expire();
                $client_subscription->client->sendSubscriptionExpired($client_subscription);

                $message = 'Inactivated Client Subscription #'.$client_subscription->id;

                $loading->advance();

                $this->info(' '.$message);
                Log::info('['.$this->signature.'] '.$message);
            }

            $loading->finish();
        });

        $this->info('');
        $this->info('');
        $this->info('['.$this->signature.'] ===== END =====');
        Log::info('['.$this->signature.'] ===== END =====');
    }
}
