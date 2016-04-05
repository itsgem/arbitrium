<?php

namespace App\Console\Commands;

use App\Models\ClientSubscription;
use App\Models\Subscription;
use App\Services\MailServices;
use DB;
use Illuminate\Console\Command;
use Log;

class RenewSubscription extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'renew:subscription';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Renew client subscription';

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
            $yesterday  = format_date_to_string(current_date()->subDay());
            $today      = current_date_to_string();
            Log::info('SUBSCRIPTIONS VALID TO: '.$yesterday);

            $client_subscriptions = ClientSubscription::renew()
                                    ->validTo($yesterday)
                                    ->get();
            foreach($client_subscriptions as $client_subscription)
            {
                $renewed = ClientSubscription::clientId($client_subscription->client_id)->validFrom($today)->first();
                if (!$renewed)
                {
                    $client = $client_subscription->client;
                    $result = $client->purchaseSubscription($client_subscription->subscription_id, $today);
                    if ($result)
                    {
                        if ($result->price_in_credit > 0)
                        {
                            with(new MailServices())->renewedSubscription($client->user, $result->invoice->url);
                        }
                    }
                    else
                    {
                        $client_subscription->renew = 0;
                        $client_subscription->save();
                        // TODO-GEM: email that client does not have enough credits?
                        Log::info('Client does not have enough credits: '.$client->id);
                    }
                }
            }
        });

        Log::info('END '.$this->signature);
    }
}
