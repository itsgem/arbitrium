<?php

use Illuminate\Database\Seeder;

class SystemSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('system_settings')->truncate();
        DB::table('system_settings')->insert([
            ['name' => 'kcg_company_name', 'value' => 'KOSH CONSULTING GROUP (ASIA) PTE. LTD.', 'segment' => 'general'],
            ['name' => 'kcg_street_address', 'value' => '545 Orchard Road', 'segment' => 'general'],
            ['name' => 'kcg_city', 'value' => '', 'segment' => 'general'],
            ['name' => 'kcg_state', 'value' => ' #03-24 Far East Shopping Centre', 'segment' => 'general'],
            ['name' => 'kcg_country', 'value' => 'Singapore', 'segment' => 'general'],
            ['name' => 'kcg_postal_code', 'value' => '238882', 'segment' => 'general'],
            ['name' => 'kcg_account_name', 'value' => 'xxxxx', 'segment' => 'billing'],
            ['name' => 'kcg_credit_to', 'value' => 'xxxx', 'segment' => 'billing'],
            ['name' => 'kcg_bank_account', 'value' => 'xxx-xx-xxx', 'segment' => 'billing'],
            ['name' => 'kcg_bank_code', 'value' => 'xxx', 'segment' => 'billing'],
            ['name' => 'kcg_branch_code', 'value' => 'xxx', 'segment' => 'billing'],
            ['name' => 'kcg_swift_code', 'value' => 'xxxxxx', 'segment' => 'billing'],
            ['name' => 'items_per_page', 'value' => '10', 'segment' => 'general'],
            ['name' => 'reset_token_expiry', 'value' => '14400', 'segment' => 'general'], // in minutes; 10 days
            ['name' => 'kcg_admin_email', 'value' => 'admin@arbitrium.com', 'segment' => 'general']
        ]);
    }
}
