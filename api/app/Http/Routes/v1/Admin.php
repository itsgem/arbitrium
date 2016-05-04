<?php
use App\Models\Role;

Route::group(['namespace' => 'admin', 'middleware' => 'auth.admin'], function()
{
    Route::group(['prefix' => 'admin'], function()
    {
        //-- API
        Route::group(['prefix' => 'api-key'], function()
        {
            Route::get('generate',                  ['uses' => 'api\ApiKeyController@generate']);
            Route::post('{api_key}/permission',     ['uses' => 'api\ApiKeyController@addPermission']);
            Route::patch('{api_key}/permission',    ['uses' => 'api\ApiKeyController@updatePermission']);
            Route::delete('{api_key}/permission',   ['uses' => 'api\ApiKeyController@removePermission']);

            Route::group(['prefix' => 'ip-address'], function()
            {
                Route::patch('{ip_address}/assign', ['uses' => 'api\ApiIpAddressController@assign']);
            });
            Route::resource('ip-address', 'api\ApiIpAddressController', ['only' => ['destroy', 'index', 'show', 'store', 'update']]);
        });
        Route::resource('api-key', 'api\ApiKeyController', ['only' => ['destroy', 'index', 'show', 'store', 'update']]);

        //-- CLIENT
        Route::group(['prefix' => 'client'], function()
        {
            Route::patch('{client}/approve',    ['uses' => 'ClientsController@approve']);
            Route::patch('{client}/disapprove', ['uses' => 'ClientsController@disapprove']);

            Route::group(['middleware' => 'valid.client_id'], function()
            {
                Route::post('adjust-credit',        ['uses' => 'ClientsController@adjustCredit']);
                Route::post('purchase-credit',      ['uses' => 'ClientsController@purchaseCredit']);
            });
        });
        Route::resource('client', 'ClientsController', ['only' => ['destroy', 'index', 'show', 'store', 'update']]);

        //-- INVOICES
        Route::group(['prefix' => 'invoice/{invoice}'], function()
        {
            Route::patch('cancel',  ['uses' => 'InvoicesController@cancel']);
            Route::get('details',   ['uses' => 'InvoicesController@showDetails']);
            Route::get('send',      ['uses' => 'InvoicesController@sendInvoice']);
            Route::patch('paid',    ['uses' => 'InvoicesController@paid']);
        });

        Route::resource('invoice', 'InvoicesController', ['only' => ['index', 'show']]);

        //-- LOGS
        Route::group(['prefix' => 'logs'], function()
        {
            Route::get('admin',     ['uses' => 'LogsController@showAdminLogs']);
            Route::get('client',    ['uses' => 'LogsController@showClientLogs']);
        });

        //-- PRICING BY SUBSCRIPTIONS
        Route::resource('subscription', 'SubscriptionsController',      ['except' => ['create']]);

         //-- SYSTEM SETTINGS
        Route::get('system-setting/{segment}',  ['uses' => 'SystemSettingsController@get']);
    });

    //-- SUPER ADMIN ONLY
    Route::group(['middleware' => 'role:'.Role::SUPER_ADMIN], function(){

        // this should be the last route in this file; so it will not override the other routes with 'admin' prefix
        Route::resource('admin', 'AdminsController');
    });
});