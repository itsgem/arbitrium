<?php

use App\Models\Subscription;
use App\Models\ClientSubscription;
use App\Services\PaypalServices;
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
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");

        DB::table('subscriptions')->truncate();

        $data = [
            [
                'id'                      => 1,
                'name'                    => 'Trial',
                'description'             => 'Trial Package Plan',
                'type'                    => Subscription::TYPE_TRIAL,
                'country_id'              => 240,
                'fee_monthly'             => 0,
                'fee_monthly_maintenance' => 0,
                'fee_yearly'              => 0,
                'fee_yearly_license'      => 0,
                'fee_yearly_maintenance'  => 0,
                'fee_initial_setup'       => 0,
                'max_api_calls'           => 10,
                'max_decisions'           => 10,
                'discounts'               => 0,
                'created_by'              => 1,
                'updated_by'              => 1,
                'created_at'              => current_datetime(),
                'updated_at'              => current_datetime(),
            ],
            [
                'id'                      => 2,
                'name'                    => 'Basic',
                'description'             => 'Basic Package Plan',
                'type'                    => Subscription::TYPE_PLAN,
                'country_id'              => 240,
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
                'id'                      => 3,
                'name'                    => 'Standard',
                'description'             => 'Standard Package Plan',
                'type'                    => Subscription::TYPE_PLAN,
                'country_id'              => 240,
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
            [
                'id'                      => 4,
                'name'                    => 'Business',
                'description'             => 'Business Package Plan',
                'type'                    => Subscription::TYPE_PLAN,
                'country_id'              => 240,
                'fee_monthly'             => 60,
                'fee_monthly_maintenance' => 50,
                'fee_yearly'              => 120,
                'fee_yearly_license'      => 50,
                'fee_yearly_maintenance'  => 50,
                'fee_initial_setup'       => 40,
                'max_api_calls'           => 150,
                'max_decisions'           => 150,
                'discounts'               => 7,
                'created_by'              => 1,
                'updated_by'              => 1,
                'created_at'              => current_datetime(),
                'updated_at'              => current_datetime(),
            ],
            [
                'id'                      => 5,
                'name'                    => 'Premium',
                'description'             => 'Premium Package Plan',
                'type'                    => Subscription::TYPE_PLAN,
                'country_id'              => 240,
                'fee_monthly'             => 80,
                'fee_monthly_maintenance' => 80,
                'fee_yearly'              => 140,
                'fee_yearly_license'      => 60,
                'fee_yearly_maintenance'  => 60,
                'fee_initial_setup'       => 40,
                'max_api_calls'           => 10,
                'max_decisions'           => 10,
                'discounts'               => 8,
                'created_by'              => 1,
                'updated_by'              => 1,
                'created_at'              => current_datetime(),
                'updated_at'              => current_datetime(),
            ],
        ];

        DB::table('subscriptions')->insert($data);

        DB::statement("SET FOREIGN_KEY_CHECKS = 1");

        // Register Subscription Plans to PayPal
        $terms = [
            ClientSubscription::TERM_MONTHLY,
            ClientSubscription::TERM_ANNUALLY
        ];
        foreach ($terms as $term)
        {
            foreach ($data as $subscription)
            {
                if ($subscription['type'] != Subscription::TYPE_TRIAL)
                {
                    $pp = new PaypalServices();
                    $request = [
                        'subscription_id' => $subscription['id'],
                        'term'            => $term,
                        'callback_url'    => config('paypal.callback_urls.subscriptions'),
                    ];
                    $pp->createPlan($request);
                }
            }
        }
    }
}
