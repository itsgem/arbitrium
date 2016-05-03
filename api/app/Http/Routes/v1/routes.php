<?php

Route::group(['namespace' => 'v1', 'prefix' => 'api/v1'], function()
{
    include('User.php');
    Route::group(['middleware' => 'auth'], function()
    {
        include('Admin.php');
        include('Client.php');

        // API Keys
        Route::group(['prefix' => 'api-key'], function()
        {
            Route::get('generate',              ['uses' => 'api\ApiKeyController@generate']);
            Route::resource('ip-address', 'api\ApiKeyController', ['only' => ['destroy', 'index', 'show', 'store', 'update']]);
        });
        Route::resource('api-key', 'api\ApiKeyController', ['only' => ['destroy', 'index', 'show', 'store', 'update']]);
        Route::group(['prefix' => 'client'], function()
        {
            Route::get('api-key',               ['uses' => 'api\ApiKeyController@index']);
            Route::get('api-key/ip-address',    ['uses' => 'api\ApiKeyController@index']);
        });
        Route::group(['prefix' => 'admin'], function()
        {
            Route::group(['prefix' => 'client'], function()
            {
                Route::get('{client}/api-key',  ['uses' => 'api\ApiKeyController@index']);
                Route::get('{client}/api-key/ip-address',   ['uses' => 'api\ApiKeyController@index']);
            });
        });
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

});