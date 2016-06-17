<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        \App\Console\Commands\RenewSubscription::class,
        \App\Console\Commands\RenewSubscriptionReminder::class,
        \App\Console\Commands\UpdateSubscriptionStatus::class,
        \App\Console\Commands\CreateArbitriumCoreAccountsFromUsers::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('subscription:update_status')->daily();

        // TODO-GEM: current implementation is using basic package, enable these when subscription will be enabled
        // $schedule->command('renew:subscription')->daily();
        // $schedule->command('renew:subscription-reminder')->daily();
    }
}
