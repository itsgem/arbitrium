<?php

namespace App\Console\Commands;

use App\User;
use App\Models\UserApi;
use App\Services\ExternalRequestServices;
use DB;
use GuzzleHttp\Exception\RequestException as ExternalRequestException;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class GenerateArbitriumCoreAccountsFromUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'arbitrium:generate_core_credentials';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Core-API credentials from user list';

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('['.$this->signature.'] ===== START =====');
        Log::info('['.$this->signature.'] ===== START =====');

        $users = User::active()->get();

        $loading = $this->output->createProgressBar($users->count());

        foreach ($users as $user)
        {
            $loading->advance();

            if ($user->hasApi())
            {
                $this->warn(' SKIPPPED - '.$user->username);
                Log::warning('['.$this->signature.'] SKIPPPED - '.$user->username);
                continue;
            }

            try
            {
                $user->registerApiCredentials();

                $this->info(' OK - '.$user->username);
                Log::info('['.$this->signature.'] OK - '.$user->username);
            }
            catch (ExternalRequestException $e)
            {
                $response = json_decode($e->getResponse()->getBody()->getContents(), true);
                $this->info(' ERROR - '.$user->username.' - '.json_encode($response['errors']));
                Log::info('['.$this->signature.'] ERROR - '.$user->username.' - '.json_encode($response['errors']).' | SERVER ERROR: '.$e->getMessage());
            }
        }

        $loading->finish();

        $this->info('');
        $this->info('');
        $this->info('['.$this->signature.'] ====== END ======');
        Log::info('['.$this->signature.'] ====== END ======');
    }
}
