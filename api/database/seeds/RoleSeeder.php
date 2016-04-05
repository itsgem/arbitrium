<?php

use Illuminate\Database\Seeder;

use App\Models\Role;
class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");
        DB::table('roles')->truncate();
        DB::table('roles')->insert([[
            'name' => Role::SUPER_ADMIN,
            'display_name' => 'Super Admin',
            'type' => Role::ADMIN,
        ],[
            'name' => Role::ADMIN,
            'display_name' => 'Admin',
            'type' => Role::ADMIN,
        ]]);
        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
