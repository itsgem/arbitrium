<?php

use Illuminate\Database\Seeder;

class SubscriptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('subscriptions')->truncate();

        $data = [
            [
                'name'                    => 'Trial',
                'type'                    => 'trial',
                'country_id'              => 202,
                'fee_monthly'             => 0,
                'fee_monthly_maintenance' => 0,
                'fee_yearly'              => 0,
                'fee_yearly_license'      => 0,
                'fee_yearly_maintenance'  => 0,
                'fee_initial_setup'       => 0,
                'max_api_calls'           => 10,
                'max_decisions'           => 10,
                'discounts'               => 0,
                'created_at'              => current_datetime(),
                'updated_at'              => current_datetime(),
            ],
            [
                'name'                    => 'Basic',
                'type'                    => 'plan',
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
                'created_at'              => current_datetime(),
                'updated_at'              => current_datetime(),
            ],
            [
                'name'                    => 'Standard',
                'type'                    => 'plan',
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
                'created_at'              => current_datetime(),
                'updated_at'              => current_datetime(),
            ],
            [
                'name'                    => 'Business',
                'type'                    => 'plan',
                'country_id'              => 202,
                'fee_monthly'             => 60,
                'fee_monthly_maintenance' => 50,
                'fee_yearly'              => 120,
                'fee_yearly_license'      => 50,
                'fee_yearly_maintenance'  => 50,
                'fee_initial_setup'       => 40,
                'max_api_calls'           => 150,
                'max_decisions'           => 150,
                'discounts'               => 7,
                'created_at'              => current_datetime(),
                'updated_at'              => current_datetime(),
            ],
            [
                'name'                    => 'Premium',
                'type'                    => 'plan',
                'country_id'              => 202,
                'fee_monthly'             => 80,
                'fee_monthly_maintenance' => 80,
                'fee_yearly'              => 140,
                'fee_yearly_license'      => 60,
                'fee_yearly_maintenance'  => 60,
                'fee_initial_setup'       => 40,
                'max_api_calls'           => 10,
                'max_decisions'           => 10,
                'discounts'               => 8,
                'created_at'              => current_datetime(),
                'updated_at'              => current_datetime(),
            ],
        ];

        DB::table('subscriptions')->insert($data);
    }
}
