<?php

Route::group(['prefix' => 'client', 'middleware' => 'auth.client'], function()
{
    Route::group(['namespace' => 'client'], function()
    {
        //-- API
        Route::group(['prefix' => 'api-key'], function()
        {
            Route::group(['prefix' => '{api_key}'], function()
            {
                Route::patch('activate',      ['uses' => 'ApiKeyController@activate']);
            });
        });
        Route::resource('api-key', 'ApiKeyController', ['only' => ['destroy', 'index', 'show', 'store', 'update']]);

        Route::group(['prefix' => 'api-log'], function()
        {
            Route::get('',           ['uses' => 'ApiLogController@index']);

            Route::group(['prefix' => 'reports'], function()
            {
                Route::get('',          ['uses' => 'ApiLogController@showReports']);
                Route::get('client',    ['uses' => 'ApiLogController@showReportClient']);
            });

            Route::get('{api_log}',  ['uses' => 'ApiLogController@show']);
        });

        //-- PROFILE
        Route::get('profile',               ['uses' => 'ClientsController@show']);
        Route::put('profile',               ['uses' => 'ClientsController@update']);

        //-- SUBSCRIPTION
        Route::group(['prefix' => 'subscription'], function()
        {
            Route::get('pending',           ['uses' => 'ClientsController@getPendingSubscription']);
            Route::get('current',           ['uses' => 'ClientsController@getSubscription']);
            Route::get('',                  ['uses' => 'ClientsController@getSubscriptionHistory']);
            Route::post('',                 ['uses' => 'ClientsController@subscribe']);
            Route::post('confirm',          ['uses' => 'ClientsController@subscribeConfirm']);
            Route::patch('cancel-confirm',  ['uses' => 'ClientsController@subscribeCancelConfirm']);
            Route::patch('cancel',          ['uses' => 'ClientsController@cancelSubscription']);
        });

        //-- INVOICE
        Route::group(['prefix' => 'invoice'], function()
        {
            Route::get('',                  ['uses' => 'ClientsController@listInvoice']);
            Route::group(['prefix' => '{invoice}'], function()
            {
                Route::get('',              ['uses' => 'ClientsController@showInvoice']);
                Route::get('send',          ['uses' => 'ClientsController@sendInvoice']);
            });
        });
    });
});