<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ApiKeySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");
        DB::table('api_keys')->truncate();
        $data = [
            [
                'client_id' => 1,
                'token' => Hash::make('1'.Carbon::now()),
                'name' => 'ABC Company Loans',
                'description' => 'Main',
                'api_permissions' => '',
                'is_api_call_restricted' => 0,
                'is_whitelist' => 0,
                'is_active' => 1,
                'is_test_key' => 0,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'client_id' => 1,
                'token' => Hash::make('1'.Carbon::now()),
                'name' => 'XYZ Company Loans',
                'description' => 'Secondary',
                'api_permissions' => '',
                'is_api_call_restricted' => 0,
                'is_whitelist' => 0,
                'is_active' => 1,
                'is_test_key' => 0,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'client_id' => 2,
                'token' => Hash::make('2'.Carbon::now()),
                'name' => 'Lim Family Loans',
                'description' => '',
                'api_permissions' => '',
                'is_api_call_restricted' => 0,
                'is_whitelist' => 0,
                'is_active' => 1,
                'is_test_key' => 0,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ];
        DB::table('api_keys')->insert($data);
        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
