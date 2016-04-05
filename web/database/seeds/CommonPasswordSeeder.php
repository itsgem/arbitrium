<?php

use Illuminate\Database\Seeder;

class CommonPasswordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('common_passwords')->truncate();
        DB::table('common_passwords')->insert([[
            'password' => '123456'
        ],[
            'password' => 'password',
        ],[
            'password' => 'Passw0rt',
        ],[
            'password' => 'qwerty',
        ],[
            'password' => 'trustno1',
        ],[
            'password' => '123456',
        ],[
            'password' => '12345678',
        ],[
            'password' => 'letmein',
        ],[
            'password' => 'abc123',
        ],[
            'password' => '123123',
        ]]);
    }
}
