<?php

namespace App\Services;

use Carbon\Carbon;
use DB;
use DateTime;
use DateTimeZone;

use App\Errors;
use App\Models\Client;
use App\Models\ClientSubscription;
use App\Models\Subscription;
use App\Nrb\NrbServices;
use App\User;

use Exception;
use PayPal\Api\Agreement;
use PayPal\Api\Amount;
use PayPal\Api\Currency;
use PayPal\Api\ChargeModel;
use PayPal\Api\Details;
use PayPal\Api\ExecutePayment;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\MerchantPreferences;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\PaymentDefinition;
use PayPal\Api\PaymentExecution;
use PayPal\Api\Plan;
use PayPal\Api\Patch;
use PayPal\Api\PatchRequest;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Common\PayPalModel;
use PayPal\Exception\PayPalConnectionException;
use PayPal\Rest\ApiContext;

class PaypalServices extends NrbServices
{
    private $_api_context;
    private $paypal_information;
    private $paypal_status_information;

    public function __construct()
    {
        // setup PayPal api context
        $paypal_conf = config('paypal');
        $this->_api_context = new ApiContext(new OAuthTokenCredential($paypal_conf['client_id'], $paypal_conf['secret']));
        $this->_api_context->setConfig($paypal_conf['settings']);
    }

    public function createPlan($request, $client)
    {
        $client_id = $client->id;

        $data = [];
        $data['term']        = ($request->get('term')) ? $request->get('term') : ClientSubscription::TERM_MONTHLY;

        $subscription        = Subscription::findOrFail($request->get('subscription_id'));
        $data['name']        = $subscription->name;
        $data['description'] = (string) $subscription->description.' ('.$data['term'].')';
        $data['currency']    = $subscription->currency;
        $data['price']       = $subscription->total[strtolower($data['term'])];
        $data['setup_fee']   = $subscription->fee_initial_setup;
        $data['callback']    = $request->get('callback_url');

        //----- Create Plan

        $plan = new Plan();

        $plan_frequency_interval = ($data['term'] == ClientSubscription::TERM_ANNUALLY) ? "12" : "1";

        $plan->setName($data['name'])
            ->setDescription($data['description'])
            ->setType('INFINITE');

        $paymentDefinition = new PaymentDefinition();

        $paymentDefinition->setName($data['term'].' Payments')
            ->setType('REGULAR')
            ->setFrequency('Month')
            ->setFrequencyInterval($plan_frequency_interval)
            ->setCycles("0")
            ->setAmount(new Currency(['value' => $data['price'], 'currency' => $data['currency']]));

        $merchantPreferences = new MerchantPreferences();

        $merchantPreferences->setReturnUrl($data['callback']."?success=true")
            ->setCancelUrl($data['callback']."?success=false")
            ->setAutoBillAmount("yes")
            ->setInitialFailAmountAction("CONTINUE")
            ->setMaxFailAttempts(3)
            ->setSetupFee(new Currency(['value' => $data['setup_fee'], 'currency' => $data['currency']]));

        $plan->setPaymentDefinitions([$paymentDefinition]);
        $plan->setMerchantPreferences($merchantPreferences);

        $request = clone $plan;

        if (env('PAYPAL_BYPASS'))
        {
            // @TODO-Arbitrium
            // return $this->bypassSetup($redirect_urls);
        }

        try {
            $createdPlan = $plan->create($this->_api_context);
        } catch (PayPalConnectionException $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'status_code' => $ex->getCode(),
                'data' => json_decode($ex->getData(), true),
                'message' => $ex->getMessage(),
            ]);
        } catch (Exception $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'data' => $ex->getMessage()
            ]);
        }

        //----- Activate Plan
        try {
            $patch = new Patch();

            $value = new PayPalModel('{
                   "state":"ACTIVE"
                 }');

            $patch->setOp('replace')
                ->setPath('/')
                ->setValue($value);
            $patchRequest = new PatchRequest();
            $patchRequest->addPatch($patch);

            $createdPlan->update($patchRequest, $this->_api_context);

            $planResponse = Plan::get($createdPlan->getId(), $this->_api_context);
        } catch (PayPalConnectionException $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'status_code' => $ex->getCode(),
                'data' => json_decode($ex->getData(), true),
                'message' => $ex->getMessage(),
            ]);
        } catch (Exception $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'data' => $ex->getMessage()
            ]);
        }

        $planId = $planResponse->getId();

        DB::transaction(function () use ($subscription, $data, $planId)
        {
            $column = ($data['term'] == ClientSubscription::TERM_ANNUALLY) ? 'paypal_plan_id_yearly' : 'paypal_plan_id_monthly';
            $saved = $subscription->update([$column => $planId]);

            if (!$saved)
            {
                return $this->respondWithError(Errors::CANNOT_EDIT);
            }
        });

        return $this->respondWithSuccess([
            'paypal_plan_id' => $planId
        ]);
    }

    public function subscribe($request, $client)
    {
        $client_id = $client->id;

        $data = [];
        $data['term'] = ($request->get('term')) ? $request->get('term') : ClientSubscription::TERM_MONTHLY;

        $subscription        = Subscription::findOrFail($request->get('subscription_id'));
        $data['name']        = $subscription->name;
        $data['description'] = $subscription->description;
        $data['plan_id']     = ($data['term'] == ClientSubscription::TERM_ANNUALLY) ? $subscription->paypal_plan_id_yearly : $subscription->paypal_plan_id_monthly;

        $start_date = '2016-05-19T16:25:04Z';
        $start_date = current_datetime_iso8601('America/Los_Angeles');
        $start_date = date('c',strtotime(date('Y-m-d')));
        $start_date = date('c',strtotime(date('Y-m-d') . "+1 days"));

        //SubscribeCustomer
        $agreement = new Agreement();

        $agreement->setName($data['name']. '('.$data['term'].')')
            ->setDescription($data['description'])
            ->setStartDate($start_date);

        $plan = new Plan();
        $plan->setId($data['plan_id']);
        $agreement->setPlan($plan);

        $payer = new Payer();
        $payer->setPaymentMethod('paypal');
        $agreement->setPayer($payer);

        try {
            $agreement = $agreement->create($this->_api_context);
            $approvalUrl = $agreement->getApprovalLink();
        } catch (PayPalConnectionException $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'status_code' => $ex->getCode(),
                'data' => json_decode($ex->getData(), true),
                'message' => $ex->getMessage(),
            ]);
        } catch (Exception $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'data' => $ex->getMessage()
            ]);
        }

        return $this->respondWithSuccess([
            'approval_url' => $approvalUrl
        ]);
    }

    public function executeAgreement($request, $client)
    {
        $client_id = $client->id;

        $token = $request->get('token');
        $success = $request->get('success');

        $agreement = new Agreement();

        if($success == true) {
            $agreement->execute($token, $this->_api_context);
            $agreement = Agreement::get($agreement->getId(), $this->_api_context);

            $agreement_id = $agreement->getId();

            DB::transaction(function () use ($agreement_id)
            {
                //ClientSubscription::findOrFail(999000042)->update(['paypal_profile_id' => $agreement_id]);
            });

            return $this->respondWithSuccess([
                'profile_id' => $agreement_id
            ]);
        }

        return $this->respondWithData([
            'status' => 'error',
            'data' => 'User cancelled'
        ]);
    }

    public function paymentRecurring($request, $client)
    {
        $client_id = 999000001;
        $subscription_name = 'Basic Subscription Package';
        $subscription_description = 'Basic Subscription Package Description';
        $subscription_type = 'fixed';
        $subscription_currency = 'SGD';
        $subscription_price = 50;
        $subscription_setup_fee = 10;
        $subscription_callback = 'http://dev.w3.arbitriumgroup.com/i/subscription/';
        $subscription_max_fail_attempts = 3;

        $plan = new Plan();

        $plan->setName($subscription_name)
            ->setDescription($subscription_description)
            ->setType($subscription_type);

        $paymentDefinition = new PaymentDefinition();

        $paymentDefinition->setName('Monthly Payments')
            ->setType('REGULAR')
            ->setFrequency('Month')
            ->setFrequencyInterval("1")
            ->setCycles("12")
            ->setAmount(new Currency(['value' => $subscription_price, 'currency' => $subscription_currency]));

        $chargeModel = new ChargeModel();
        $chargeModel->setType('SHIPPING')
            ->setAmount(new Currency(['value' => 10, 'currency' => $subscription_currency]));

        $paymentDefinition->setChargeModels([$chargeModel]);

        $merchantPreferences = new MerchantPreferences();

        $merchantPreferences->setReturnUrl($subscription_callback."?success=true")
            ->setCancelUrl($subscription_callback."?success=false")
            ->setAutoBillAmount("yes")
            ->setInitialFailAmountAction("CONTINUE")
            ->setMaxFailAttempts($subscription_max_fail_attempts)
            ->setSetupFee(new Currency(['value' => $subscription_setup_fee, 'currency' => $subscription_currency]));

        $plan->setPaymentDefinitions([$paymentDefinition]);
        $plan->setMerchantPreferences($merchantPreferences);

        $request = clone $plan;

        $this->paypal_information = [
            'client_id'   => $client_id,
            'description' => $subscription_description,
            'price'       => $subscription_price
        ];

        if (env('PAYPAL_BYPASS'))
        {
            // @TODO-Arbitrium
            // return $this->bypassSetup($redirect_urls);
        }

        try {
            $output = $plan->create($this->_api_context);
        } catch (PayPalConnectionException $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'status_code' => $ex->getCode(),
                'data' => $ex->getMessage()
            ]);
        } catch (Exception $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'data' => $ex->getMessage()
            ]);
        }

        //ResultPrinter::printResult("Created Plan", "Plan", $output->getId(), $request, $output);

        // add payment ID to session
        $this->paypal_information['paypal_plan_id'] = $output->getId();
        $this->paypal_information['request'] = $request;
        DB::transaction(function ()
        {
            // @TODO-Arbitrium
            // Payments::addPayment($this->paypal_information);
        });

        //Activate Plan
        $createdPlan = $output;

        $patch = new Patch();

        $value = new PayPalModel('{
		       "state":"ACTIVE"
		     }');

        $patch->setOp('replace')
            ->setPath('/')
            ->setValue($value);
        $patchRequest = new PatchRequest();
        $patchRequest->addPatch($patch);

        $createdPlan->update($patchRequest, $this->_api_context);

        $planResponse = Plan::get($createdPlan->getId(), $this->_api_context);

        return $this->respondWithSuccess([
            'status' => 'success',
            'paypal_information' => $this->paypal_information
        ]);
    }

    public function paymentOneTime($request, $client)
    {
        $client_id = 999000001;
        $subscription_name = 'Basic Subscription Package';
        $subscription_description = 'Basic Subscription Package Description';
        $subscription_currency = 'SGD';
        $subscription_qty = 1;
        $subscription_price = 50;
        $subscription_callback = 'http://dev.w3.arbitriumgroup.com/i/subscription/';

        $payer = new Payer();
        $payer->setPaymentMethod('paypal');

        $item_1 = new Item();
        $item_1->setName($subscription_name)
            ->setCurrency($subscription_currency)
            ->setQuantity($subscription_qty)
            ->setPrice($subscription_price);

        // add item to list
        $item_list = new ItemList();
        $item_list->setItems([$item_1]);

        $total = $subscription_price * $subscription_qty;

        $amount = new Amount();
        $amount->setCurrency($subscription_currency)
            ->setTotal($total);

        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($item_list)
            ->setDescription($subscription_description);

        $redirect_urls = new RedirectUrls();
        $redirect_urls->setReturnUrl($subscription_callback)
            ->setCancelUrl($subscription_callback);

        $this->paypal_information = [
            'client_id'   => $client_id,
            'description' => $subscription_description,
            'total_amount' => $total
        ];

        if (env('PAYPAL_BYPASS'))
        {
            // @TODO-Arbitrium
            // return $this->bypassSetup($redirect_urls);
        }

        $payment = new Payment();
        $payment->setIntent('Sale')
            ->setPayer($payer)
            ->setRedirectUrls($redirect_urls)
            ->setTransactions([$transaction]);

        try {
            $payment->create($this->_api_context);
        } catch (\PayPal\Exception\PPConnectionException $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'data' => $ex->getMessage()
            ]);
        }

        foreach($payment->getLinks() as $link) {
            if($link->getRel() == 'approval_url') {
                $redirect_url = $link->getHref();
                break;
            }
        }

        // add payment ID to session
        $this->paypal_information['paypal_payment_id'] = $payment->getId();
        DB::transaction(function ()
        {
            Payments::addPayment($this->paypal_information);
        });

        if(isset($redirect_url)) {
            return $this->respondWithSuccess([
                'status' => 'success',
                'callback_url' => $redirect_url
            ]);
        }

        return $this->respondWithData([
            'status' => 'error',
            'data' => 'Unknown error occurred'
        ]);
    }

    public function paymentOneTimeStatus($request)
    {
        // Get the payment ID before session clear
        $payment_data = Payments::getPaymentRecord($request->get('paymentId'));
        $payment_id = $payment_data->paypal_payment_id;
        $client_id = $payment_data->client_id;
        $amount_in_credit = $payment_data->amount_in_credit;
        $description = $payment_data->description;

        if (empty($request->get('PayerID')) || empty($request->get('token'))) {
            return $this->respondWithData([
                'status' => 'error',
                'data' => ['message' => 'Payment failed']
            ]);
        }

        if (env('PAYPAL_BYPASS'))
        {
            // @TODO-Arbitrium
            // return $this->bypassFakePaypalStatus();
        }

        $payment = Payment::get($payment_id, $this->_api_context);

        // PaymentExecution object includes information necessary
        // to execute a PayPal account payment.
        // The payer_id is added to the request query parameters
        // when the user is redirected from paypal back to your site
        $execution = new PaymentExecution();
        $execution->setPayerId($request->get('PayerID'));

        //Execute the payment
        try{
            $result = $payment->execute($execution, $this->_api_context);

            if ($result->getState() == 'approved') { // payment made
                //purchase credit
                return DB::transaction(function ()
                {
                    // @TODO-Arbitrium: Invoice

                    return $this->respondWithSuccess([
                        'message' => 'Payment success'
                    ]);
                });
            }

            return $this->respondWithData([
                'status' => 'error',
                'data' => ['message' => 'Payment failed']
            ]);

        }catch(\Exception $ex){
            return $this->respondWithData([
                'status' => 'error',
                'data' => $ex->getMessage()]);
        }
    }
}
