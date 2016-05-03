<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ApiIpAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");
        DB::table('api_ip_addresses')->truncate();
        $data = [
            [
                'api_key_id' => 1,
                'ip_address' => '192.168.1.1',
                'name'       => 'Dell PC',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'api_key_id' => 1,
                'ip_address' => '192.168.1.2',
                'name'       => 'Netbook PC',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'api_key_id' => 1,
                'ip_address' => '192.168.1.3',
                'name'       => 'Office PC',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'api_key_id' => 2,
                'ip_address' => '192.168.1.4',
                'name'       => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'api_key_id' => 3,
                'ip_address' => '192.168.1.5',
                'name'       => 'Testing',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ];
        DB::table('api_ip_addresses')->insert($data);
        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
