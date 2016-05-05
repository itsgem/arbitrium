<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

         $this->call(TestApiKeySeeder::class);
         $this->call(TestApiIpAddressSeeder::class);
         $this->call(TestApiPermissionSeeder::class);
         $this->call(TestApiKeyPermissionSeeder::class);
         $this->call(TestUserSeeder::class);

        Model::reguard();
    }
}
