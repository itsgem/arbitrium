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


    Route::get('client/subscription/plan',              ['uses' => 'Client\ClientsController@getPlans']);
    Route::post('client/subscription/plan',             ['uses' => 'Client\ClientsController@createPlan']);
    //Route::get('admin/client/{client}/subscription/{subscription}/plan', ['uses' => 'Client\ClientsController@showPlan']);

    Route::group(['prefix' => 'client/subscription'], function()
    {
        Route::get('plan/{plan}',        ['uses' => 'Client\ClientsController@showPlan']);

        Route::get('subscribe',          ['uses' => 'Client\ClientsController@subscribe']);
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