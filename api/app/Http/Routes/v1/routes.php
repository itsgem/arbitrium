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
    Route::get('client/subscription/plan/{plan}',       ['uses' => 'Client\ClientsController@showPlan']);

    Route::get('client/subscription/subscribe',         ['uses' => 'Client\ClientsController@subscribe']);
    Route::get('client/subscription/confirm',           ['uses' => 'Client\ClientsController@executeAgreement']);

    Route::get('client/subscription/subscribe-onetime', ['uses' => 'Client\ClientsController@subscribeOneTime']);
    Route::get('client/subscription/confirm-onetime',   ['uses' => 'Client\ClientsController@executeAgreementOneTime']);

    Route::get('client/subscription/{subscription}',    ['uses' => 'Client\ClientsController@showAgreement']);
});