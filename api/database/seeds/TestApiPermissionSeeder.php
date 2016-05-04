<?php

use Illuminate\Database\Seeder;

class TestApiPermissionSeeder extends Seeder
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
        DB::table('api_permissions')->whereIn('id', $ids)->delete();

        $data = [
            [
                'id'        => 999000001,
                'slug'      => 'loan',
                'name'      => 'Loan',
                'parent_id' => '',
            ],
            [
                'id'        => 999000002,
                'slug'      => 'credit_card',
                'name'      => 'Credit Card',
                'parent_id' => '',
            ],
            [
                'id'        => 999000003,
                'slug'      => 'life_insurance',
                'name'      => 'Life Insurance',
                'parent_id' => '',
            ]
        ];
        DB::table('api_permissions')->insert($data);
        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
