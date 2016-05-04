<?php

use Illuminate\Database\Seeder;

use App\User;

class TestUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");

        $ids = [999000001, 999000002];
        DB::table('users')->whereIn('id', $ids)->delete();
        DB::table('clients')->whereIn('id', $ids)->delete();

        //---------- clients
        $clients = [
            [
                'id'                => 999000001,
                'user_id'           => 999000001,
                'company_name'      => 'ABC Company',
                'rep_first_name'    => 'John',
                'rep_last_name'     => 'Doe',
                'rep_email_address' => 'client0001-arbitrium@mailinator.com',
                'rep_position'      => 'CEO',
                'rep_position'      => 'Male',
                'country_id'        => 100,
                'approval_status'   => 'Approved',
                'approved_at'       => current_datetime(),
                'created_by'        => 1,
                'updated_by'        => 1,
                'created_at'        => current_datetime(),
                'updated_at'        => current_datetime(),
            ],
            [
                'id'                => 999000002,
                'user_id'           => 999000002,
                'company_name'      => 'XYZ Corp',
                'rep_first_name'    => 'Jane',
                'rep_last_name'     => 'Doe',
                'rep_email_address' => 'client0002-arbitrium@mailinator.com',
                'rep_position'      => 'CEO',
                'rep_position'      => 'Female',
                'country_id'        => 100,
                'approval_status'   => 'Approved',
                'approved_at'       => current_datetime(),
                'created_by'        => 1,
                'updated_by'        => 1,
                'created_at'        => current_datetime(),
                'updated_at'        => current_datetime(),
            ]
        ];
        $client_users = [
            [
                'id'            => 999000001,
                'username'      => 'client0001',
                'email_address' => $clients[0]['rep_email_address'],
                'password'      => Hash::make('Passw0rd'),
                'name'          => $clients[0]['rep_first_name'].' '.$clients[0]['rep_last_name'],
                'user_type'     => User::CLIENT,
                'activated_at'  => current_datetime(),
                'created_at'    => current_datetime(),
                'updated_at'    => current_datetime(),
            ],
            [
                'id'            => 999000002,
                'username'      => 'client0002',
                'email_address' => $clients[1]['rep_email_address'],
                'password'      => Hash::make('Passw0rd'),
                'name'          => $clients[1]['rep_first_name'].' '.$clients[1]['rep_last_name'],
                'user_type'     => User::CLIENT,
                'activated_at'  => current_datetime(),
                'created_at'    => current_datetime(),
                'updated_at'    => current_datetime(),
            ]
        ];

        DB::table('users')->insert($client_users);
        DB::table('clients')->insert($clients);

        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
