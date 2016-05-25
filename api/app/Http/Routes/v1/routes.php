<?php

Route::group(['namespace' => 'v1', 'prefix' => 'api/v1'], function()
{
    include('User.php');
    Route::group(['middleware' => 'auth'], function()
    {
        include('Admin.php');
        include('Client.php');

        Route::resource('api-permission', 'ApiPermissionsController', ['only' => ['destroy', 'index', 'show', 'store', 'update']]);
    });

    Route::get('form/lists',    ['uses' => 'DropdownListsController@getListByType']);

    Route::group(['prefix' => 'list'], function()
    {
        Route::get('countries',                 ['uses' => 'CountriesController@getList']);
        Route::group(['prefix' => 'invoice'], function()
        {
            Route::get('categories',            ['uses' => 'InvoicesController@getCategoryList']);
            Route::get('status',                ['uses' => 'InvoicesController@getStatusList']);
        });
        Route::get('role/admin',                ['uses' => 'RolesController@getAdminRoles']);
    });

    Route::post('mail-webhook',                 ['uses' => 'MailWebHooksController@status']);

    Route::get('subscription',                  ['uses' => 'SubscriptionsController@index']);
    Route::get('subscription/{subscription}',   ['uses' => 'SubscriptionsController@show']);


    // For immediate paypal testing
    Route::get('paypal/subscription/plan',              ['uses' => 'Client\ClientsController@getPlans']);
    Route::post('paypal/subscription/plan',             ['uses' => 'Client\ClientsController@createPlan']);
    Route::get('paypal/subscription/plan/{plan}',       ['uses' => 'Client\ClientsController@showPlan']);

    Route::group(['prefix' => 'paypal/subscription'], function()
    {
        Route::get('subscribe',          ['uses' => 'Client\ClientsController@subscribePaypal']);
        Route::get('confirm',            ['uses' => 'Client\ClientsController@executeAgreement']);

        Route::post('subscribe-onetime', ['uses' => 'Client\ClientsController@subscribeOneTime']);
        Route::get('confirm-onetime',    ['uses' => 'Client\ClientsController@executeAgreementOneTime']);

        Route::group(['prefix' => '{subscription}'], function()
        {
            Route::get('',             ['uses' => 'Client\ClientsController@showAgreement']);
            Route::get('transactions', ['uses' => 'Client\ClientsController@getTransactions']);
            Route::patch('suspend',    ['uses' => 'Client\ClientsController@suspendAgreement']);
            Route::patch('reactivate', ['uses' => 'Client\ClientsController@reactivateAgreement']);
        });
    });
});