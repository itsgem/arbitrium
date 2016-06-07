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
            Route::get('status',                ['uses' => 'InvoicesController@getStatusList']);
        });
        Route::get('role/admin',                ['uses' => 'RolesController@getAdminRoles']);
    });

    Route::post('mail-webhook',                 ['uses' => 'MailWebHooksController@status']);

    Route::get('subscription',                  ['uses' => 'SubscriptionsController@index']);
    Route::get('subscription/{subscription}',   ['uses' => 'SubscriptionsController@show']);


    // @TODO-Arbitrium: For immediate paypal testing

    Route::group(['prefix' => 'paypal', 'namespace' => 'Client'], function()
    {
        Route::group(['prefix' => 'subscription'], function()
        {
            Route::get('subscribe',          ['uses' => 'ClientsController@subscribePaypal']);
            Route::get('confirm',            ['uses' => 'ClientsController@executeAgreement']);

            Route::post('subscribe-onetime', ['uses' => 'ClientsController@subscribeOneTime']);
            Route::get('confirm-onetime',    ['uses' => 'ClientsController@executeAgreementOneTime']);

            Route::group(['prefix' => 'plan'], function()
            {
                Route::get('',              ['uses' => 'ClientsController@getPlans']);
                Route::post('',             ['uses' => 'ClientsController@createPlan']);
                Route::get('{plan}',       ['uses' => 'ClientsController@showPlan']);
            });

            Route::group(['prefix' => '{subscription}'], function()
            {
                Route::get('',             ['uses' => 'ClientsController@showAgreement']);
                Route::get('transactions', ['uses' => 'ClientsController@getTransactions']);
                Route::patch('suspend',    ['uses' => 'ClientsController@suspendAgreement']);
                Route::patch('reactivate', ['uses' => 'ClientsController@reactivateAgreement']);
            });
        });
    });
});