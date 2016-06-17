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
        $this->info('START '.$this->signature);
        Log::info('START '.$this->signature);

        $users = User::all();

        $loading = $this->output->createProgressBar($users->count());

        foreach ($users as $user)
        {
            $loading->advance();

            if ($user->hasApi())
            {
                $this->warn(' SKIPPPED - '.$user->username);
                Log::warning(' SKIPPPED - '.$user->username);
                continue;
            }

            try
            {
                $response = (new ExternalRequestServices())->addUser([
                    'username'  => $user->username,
                    'password'  => $user->password,
                    'userType' => $user->user_type,
                ]);

                $data = [
                    'user_id'       => $user->id,
                    'api_client_id' => $response['body']->data->clientId,
                    'api_secret'    => $response['body']->data->clientSecret,
                ];

                DB::transaction(function() use ($data)
                {
                    UserApi::create($data);
                });

                $this->info(' OK - '.$user->username);
                Log::info(' OK - '.$user->username);
            }
            catch (ExternalRequestException $e)
            {
                $response = json_decode($e->getResponse()->getBody()->getContents(), true);
                $this->info(' ERROR - '.$user->username.' - '.$response['error']);
                Log::info(' ERROR - '.$user->username.' - '.$response['error']);
            }
        }

        $loading->finish();

        $this->info('');
        $this->info('');
        $this->info('END '.$this->signature);
        Log::info('END '.$this->signature);
    }
}
