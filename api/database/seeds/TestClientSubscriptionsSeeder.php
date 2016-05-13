<?php

use Illuminate\Database\Seeder;

class TestClientSubscriptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");

        $ids = [999000001, 999000002, 999000003];
        DB::table('client_subscriptions')->whereIn('id', $ids)->delete();

        $data = [
            [
                'id'                      => 999000001,
                'client_id'               => 999000001,
                'subscription_id'         => 2,
                'invoice_id'              => null,
                'term'                    => 'Monthly',
                'valid_from'              => current_date_sub_months(2),
                'valid_to'                => current_date_sub_months(1, 1),
                'is_auto_renew'           => 1,
                'status'                  => 'Inactive',
                'status_end'              => 'Renewed',
                'name'                    => 'Basic',
                'type'                    => 'Plan',
                'country_id'              => 202,
                'fee_monthly'             => 20,
                'fee_monthly_maintenance' => 12,
                'fee_yearly'              => 80,
                'fee_yearly_license'      => 30,
                'fee_yearly_maintenance'  => 30,
                'fee_initial_setup'       => 40,
                'max_api_calls'           => 50,
                'max_decisions'           => 50,
                'discounts'               => 5,
                'created_by'              => 1,
                'updated_by'              => 1,
                'created_at'              => current_datetime(),
                'updated_at'              => current_datetime(),
            ],
            [
                'id'                      => 999000002,
                'client_id'               => 999000001,
                'subscription_id'         => 2,
                'invoice_id'              => null,
                'term'                    => 'Monthly',
                'valid_from'              => current_date_sub_months(1),
                'valid_to'                => current_date_sub_days(1),
                'is_auto_renew'           => 1,
                'status'                  => 'Inactive',
                'status_end'              => 'Upgraded',
                'name'                    => 'Basic',
                'type'                    => 'Plan',
                'country_id'              => 202,
                'fee_monthly'             => 20,
                'fee_monthly_maintenance' => 12,
                'fee_yearly'              => 80,
                'fee_yearly_license'      => 30,
                'fee_yearly_maintenance'  => 30,
                'fee_initial_setup'       => 40,
                'max_api_calls'           => 50,
                'max_decisions'           => 50,
                'discounts'               => 5,
                'created_by'              => 1,
                'updated_by'              => 1,
                'created_at'              => current_datetime(),
                'updated_at'              => current_datetime(),
            ],
            [
                'id'                      => 999000003,
                'client_id'               => 999000001,
                'subscription_id'         => 2,
                'invoice_id'              => null,
                'term'                    => 'Monthly',
                'valid_from'              => current_date(),
                'valid_to'                => current_date_add_months(1, 1),
                'is_auto_renew'           => 1,
                'status'                  => 'Active',
                'status_end'              => null,
                'name'                    => 'Standard',
                'type'                    => 'Plan',
                'country_id'              => 202,
                'fee_monthly'             => 40,
                'fee_monthly_maintenance' => 40,
                'fee_yearly'              => 100,
                'fee_yearly_license'      => 40,
                'fee_yearly_maintenance'  => 40,
                'fee_initial_setup'       => 40,
                'max_api_calls'           => 100,
                'max_decisions'           => 100,
                'discounts'               => 6,
                'created_by'              => 1,
                'updated_by'              => 1,
                'created_at'              => current_datetime(),
                'updated_at'              => current_datetime(),
            ],
        ];
        DB::table('client_subscriptions')->insert($data);

        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
