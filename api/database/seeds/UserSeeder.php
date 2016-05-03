<?php

use Illuminate\Database\Seeder;

use App\User;
use App\Models\Admin;
use App\Models\Client;
use App\Models\Role;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");
        DB::table('role_user')->truncate();
        DB::table('clients')->truncate();
        DB::table('admins')->truncate();
        DB::table('users')->truncate();

        //---------- admins
        $admin = new Admin([
            'first_name'    => 'Super Admin',
            'last_name'     => 'User'
        ]);
        $admin_user = User::create([
            'username'      => 'root',
            'email_address' => 'info@arbitrium.com',
            'password'      => 'Passw0rd',
            'name'          => $admin->first_name.' '.$admin->last_name,
            'user_type'     => User::ADMIN
        ]);

        $admin_user->attachRole(Role::name(Role::SUPER_ADMIN)->first());
        $admin_user->admin()->save($admin);

        //---------- clients
        $clients = [
            [
                'user_id'           => 2,
                'company_name'      => 'ABC Company',
                'rep_first_name'    => 'John',
                'rep_last_name'     => 'Doe',
                'rep_email_address' => 'client0001-arbitrium@mailinator.com',
                'rep_position'      => 'CEO',
                'rep_position'      => 'Male',
                'country_id'        => 100,
                'approval_status'   => 'Approved',
                'approved_at'       => Carbon::now(),
                'created_by'        => $admin_user->id,
                'updated_by'        => $admin_user->id,
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ],
            [
                'user_id'           => 3,
                'company_name'      => 'XYZ Corp',
                'rep_first_name'    => 'Jane',
                'rep_last_name'     => 'Doe',
                'rep_email_address' => 'client0002-arbitrium@mailinator.com',
                'rep_position'      => 'CEO',
                'rep_position'      => 'Female',
                'country_id'        => 100,
                'approval_status'   => 'Approved',
                'approved_at'       => Carbon::now(),
                'created_by'        => $admin_user->id,
                'updated_by'        => $admin_user->id,
                'created_at'        => Carbon::now(),
                'updated_at'        => Carbon::now(),
            ]
        ];
        $client_users = [
            [
                'username'      => 'client0001',
                'email_address' => $clients[0]['rep_email_address'],
                'password'      => Hash::make('Passw0rd'),
                'name'          => $clients[0]['rep_first_name'].' '.$clients[0]['rep_last_name'],
                'user_type'     => User::CLIENT,
                'activated_at'  => Carbon::now(),
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ],
            [
                'username'      => 'client0002',
                'email_address' => $clients[1]['rep_email_address'],
                'password'      => Hash::make('Passw0rd'),
                'name'          => $clients[1]['rep_first_name'].' '.$clients[1]['rep_last_name'],
                'user_type'     => User::CLIENT,
                'activated_at'  => Carbon::now(),
                'created_at'    => Carbon::now(),
                'updated_at'    => Carbon::now(),
            ]
        ];

        DB::table('users')->insert($client_users);
        DB::table('clients')->insert($clients);

        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
