<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Validator;

use App\Http\Requests\CustomValidator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Custom Validators
        Validator::resolver(function($translator, $data, $rules, $messages)
        {
            return new CustomValidator($translator, $data, $rules, $messages);
        });

        if (config('database.debug'))
        {
            \Event::listen('illuminate.query', function($sql, $bindings)
            {
                foreach ($bindings as $val)
                {
                    $sql = preg_replace('/\?/', "'{$val}'", $sql, 1);
                }
                \Log::info($sql);
            });
        }
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
