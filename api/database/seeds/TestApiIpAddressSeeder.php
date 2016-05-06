<?php

use Illuminate\Database\Seeder;

class TestApiIpAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");

        $ids = [999000001, 999000002, 999000003, 999000004, 999000005];
        DB::table('api_ip_addresses')->whereIn('id', $ids)->delete();

        $data = [
            [
                'id'         => 999000001,
                'api_key_id' => 999000001,
                'ip_address' => '192.168.1.1',
                'name'       => 'Dell PC',
            ],
            [
                'id'         => 999000002,
                'api_key_id' => 999000001,
                'ip_address' => '192.168.1.2',
                'name'       => 'Netbook PC',
            ],
            [
                'id'         => 999000003,
                'api_key_id' => 999000001,
                'ip_address' => '192.168.1.3',
                'name'       => 'Office PC',
            ],
            [
                'id'         => 999000004,
                'api_key_id' => 999000002,
                'ip_address' => '192.168.1.4',
                'name'       => '',
            ],
            [
                'id'         => 999000005,
                'api_key_id' => 999000003,
                'ip_address' => '192.168.1.5',
                'name'       => 'Testing',
            ]
        ];
        DB::table('api_ip_addresses')->insert($data);
        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
