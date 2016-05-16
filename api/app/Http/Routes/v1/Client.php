<?php

Route::group(['prefix' => 'client', 'middleware' => 'auth.client'], function()
{
    Route::group(['namespace' => 'client'], function()
    {
        //-- API
        Route::group(['namespace' => 'api'], function()
        {
            Route::group(['prefix' => 'api-key'], function()
            {
                Route::get('generate',            ['uses' => 'ApiKeyController@generate']);

                Route::group(['prefix' => '{api_key}'], function()
                {
                    Route::patch('activate',      ['uses' => 'ApiKeyController@activate']);
                    Route::post('permission',     ['uses' => 'ApiKeyController@addPermission']);
                    Route::patch('permission',    ['uses' => 'ApiKeyController@updatePermission']);
                    Route::delete('permission',   ['uses' => 'ApiKeyController@removePermission']);
                });

                Route::group(['prefix' => 'ip-address'], function()
                {
                    Route::patch('{ip_address}/assign', ['uses' => 'ApiIpAddressController@assign']);
                });
                Route::resource('ip-address', 'ApiIpAddressController', ['only' => ['destroy', 'index', 'show', 'store', 'update']]);
            });
            Route::resource('api-key', 'ApiKeyController', ['only' => ['destroy', 'index', 'show', 'store', 'update']]);
        });

        //-- PROFILE
        Route::get('profile',               ['uses' => 'ClientsController@show']);
        Route::put('profile',               ['uses' => 'ClientsController@update']);

        //-- SUBSCRIPTION
        Route::group(['prefix' => 'subscription'], function()
        {
            Route::get('',                  ['uses' => 'ClientsController@getSubscriptionHistory']);
            Route::get('current',           ['uses' => 'ClientsController@getSubscription']);
            Route::post('',                 ['uses' => 'ClientsController@purchaseSubscription']);
            Route::patch('cancel',          ['uses' => 'ClientsController@cancelSubscription']);
        });
    });
});