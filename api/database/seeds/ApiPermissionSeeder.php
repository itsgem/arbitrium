<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ApiPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");
        DB::table('api_permissions')->truncate();
        $data = [
            [
                'slug'      => 'loan',
                'name'      => 'Loan',
                'parent_id' => '',
            ],
            [
                'slug'      => 'credit_card',
                'name'      => 'Credit Card',
                'parent_id' => '',
            ],
            [
                'slug'      => 'life_insurance',
                'name'      => 'Life Insurance',
                'parent_id' => '',
            ]
        ];
        DB::table('api_permissions')->insert($data);
        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
