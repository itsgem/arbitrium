<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(CommonPasswordSeeder::class);
        $this->call(CountrySeeder::class);
        $this->call(SystemSettingSeeder::class);
        $this->call(DropdownListSeeder::class);
        $this->call(ApiKeySeeder::class);
        $this->call(ApiIpAddressSeeder::class);
        $this->call(ApiPermissionSeeder::class);
        $this->call(ApiKeyPermissionSeeder::class);

        Model::reguard();
    }
}
