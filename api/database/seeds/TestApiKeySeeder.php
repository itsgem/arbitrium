<?php

use Illuminate\Database\Seeder;

class TestApiKeySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");

        $ids = [999000001, 999000002, 999000003];
        DB::table('api_keys')->whereIn('id', $ids)->delete();

        $data = [
            [
                'id'                     => 999000001,
                'client_id'              => 999000001,
                'token'                  => Hash::make('1'.current_datetime()),
                'name'                   => 'ABC Company Loans',
                'description'            => 'Main',
                'is_api_call_restricted' => false,
                'is_whitelist'           => false,
                'is_active'              => true,
                'is_test_key'            => false,
                'created_at'             => current_datetime(),
                'updated_at'             => current_datetime(),
            ],
            [
                'id'                     => 999000002,
                'client_id'              => 999000001,
                'token'                  => Hash::make('1'.current_datetime()),
                'name'                   => 'XYZ Company Loans',
                'description'            => 'Secondary',
                'is_api_call_restricted' => false,
                'is_whitelist'           => false,
                'is_active'              => true,
                'is_test_key'            => false,
                'created_at'             => current_datetime(),
                'updated_at'             => current_datetime(),
            ],
            [
                'id'                     => 999000003,
                'client_id'              => 999000002,
                'token'                  => Hash::make('2'.current_datetime()),
                'name'                   => 'Lim Family Loans',
                'description'            => '',
                'is_api_call_restricted' => false,
                'is_whitelist'           => false,
                'is_active'              => true,
                'is_test_key'            => false,
                'created_at'             => current_datetime(),
                'updated_at'             => current_datetime(),
            ]
        ];
        DB::table('api_keys')->insert($data);
        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
