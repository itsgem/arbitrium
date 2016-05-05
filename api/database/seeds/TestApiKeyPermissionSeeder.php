<?php

use Illuminate\Database\Seeder;

class TestApiKeyPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");

        $ids = [999000001, 999000002, 999000003, 999000004, 999000005, 999000006, 999000007, 999000008, 999000009];
        DB::table('api_key_permissions')->whereIn('id', $ids)->delete();

        $data = [
            [
                'id'                => 999000001,
                'api_key_id'        => 999000001,
                'api_permission_id' => 999000001,
                'value'             => true,
            ],
            [
                'id'                => 999000002,
                'api_key_id'        => 999000001,
                'api_permission_id' => 999000002,
                'value'             => true,
            ],
            [
                'id'                => 999000003,
                'api_key_id'        => 999000001,
                'api_permission_id' => 999000003,
                'value'             => true,
            ],
            [
                'id'                => 999000004,
                'api_key_id'        => 999000002,
                'api_permission_id' => 999000001,
                'value'             => true,
            ],
            [
                'id'                => 999000005,
                'api_key_id'        => 999000002,
                'api_permission_id' => 999000002,
                'value'             => false,
            ],
            [
                'id'                => 999000006,
                'api_key_id'        => 999000002,
                'api_permission_id' => 999000003,
                'value'             => false,
            ],
            [
                'id'                => 999000007,
                'api_key_id'        => 999000003,
                'api_permission_id' => 999000001,
                'value'             => true,
            ],
            [
                'id'                => 999000008,
                'api_key_id'        => 999000003,
                'api_permission_id' => 999000002,
                'value'             => true,
            ],
            [
                'id'                => 999000009,
                'api_key_id'        => 999000003,
                'api_permission_id' => 999000003,
                'value'             => false,
            ],
        ];
        DB::table('api_key_permissions')->insert($data);
        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
