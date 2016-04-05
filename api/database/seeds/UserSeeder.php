<?php

use Illuminate\Database\Seeder;

use App\User;
use App\Models\Admin;
use App\Models\Role;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new Admin([
            'first_name'    => 'Super Admin',
            'last_name'     => 'User'
        ]);
        $user = User::create([
            'username'      => 'root',
            'email_address' => 'info@arbitrium.com',
            'password'      => 'password',
            'name'          => $admin->first_name.' '.$admin->last_name,
            'user_type'     => User::ADMIN
        ]);

        $user->attachRole(Role::name(Role::SUPER_ADMIN)->first());
        $user->admin()->save($admin);
    }
}
