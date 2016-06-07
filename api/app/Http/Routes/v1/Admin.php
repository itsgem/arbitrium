<?php
use App\Models\Role;

Route::group(['namespace' => 'admin', 'middleware' => 'auth.admin'], function()
{
    Route::group(['prefix' => 'admin'], function()
    {
        Route::get('my-profile',    ['uses' => 'AdminsController@showMyProfile']);
        Route::put('my-profile',    ['uses' => 'AdminsController@updateMyProfile']);

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

        //-- CLIENT
        Route::group(['prefix' => 'client'], function()
        {
            Route::group(['prefix' => '{client}'], function()
            {
                Route::patch('approve',    ['uses' => 'ClientsController@approve']);
                Route::patch('disapprove', ['uses' => 'ClientsController@disapprove']);

                Route::group(['prefix' => 'subscription'], function()
                {
                    Route::get('pending',       ['uses' => 'ClientsController@getPendingSubscriptionSingle']);
                    Route::get('current',       ['uses' => 'ClientsController@getSubscriptionSingle']);
                    Route::post('change',       ['uses' => 'ClientsController@changeSubscription']);
                    Route::get('resend-approval-link', ['uses' => 'ClientsController@resendSubscriptionChangeApprovalLink']);
                    Route::patch('cancel',      ['uses' => 'ClientsController@cancelSubscription']);
                });
            });

            Route::group(['prefix' => 'subscription'], function()
            {
                Route::get('',         ['uses' => 'ClientsController@getSubscriptionHistory']);
                Route::get('current',  ['uses' => 'ClientsController@getSubscription']);
            });

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

        //-- SUBSCRIPTIONS
        Route::resource('subscription', 'SubscriptionsController', ['only' => ['destroy', 'index', 'show', 'store', 'update']]);

         //-- SYSTEM SETTINGS
        Route::group(['prefix' => 'system-setting'], function()
        {
            Route::get('segment/{segment}',     ['uses' => 'SystemSettingsController@getSegment']);
        });
        Route::resource('system-setting', 'SystemSettingsController', ['only' => ['index', 'show', 'store', 'update']]);
    });

    //-- SUPER ADMIN ONLY
    Route::group(['middleware' => 'role:'.Role::SUPER_ADMIN], function(){

        // this should be the last route in this file; so it will not override the other routes with 'admin' prefix
        Route::resource('admin', 'AdminsController');
    });
});