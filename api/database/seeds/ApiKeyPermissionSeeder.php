<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ApiKeyPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");
        DB::table('api_key_permissions')->truncate();
        $data = [
            [
                'api_key_id'        => 1,
                'api_permission_id' => 1,
                'value'             => 1,
            ],
            [
                'api_key_id'        => 1,
                'api_permission_id' => 2,
                'value'             => 1,
            ],
            [
                'api_key_id'        => 1,
                'api_permission_id' => 3,
                'value'             => 1,
            ],
            [
                'api_key_id'        => 2,
                'api_permission_id' => 1,
                'value'             => 1,
            ],
            [
                'api_key_id'        => 2,
                'api_permission_id' => 2,
                'value'             => 0,
            ],
            [
                'api_key_id'        => 2,
                'api_permission_id' => 3,
                'value'             => 0,
            ],
            [
                'api_key_id'        => 3,
                'api_permission_id' => 1,
                'value'             => 1,
            ],
            [
                'api_key_id'        => 3,
                'api_permission_id' => 2,
                'value'             => 1,
            ],
            [
                'api_key_id'        => 3,
                'api_permission_id' => 3,
                'value'             => 0,
            ],
        ];
        DB::table('api_key_permissions')->insert($data);
        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
