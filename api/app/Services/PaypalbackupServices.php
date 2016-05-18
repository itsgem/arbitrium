<?php

namespace App\Services;

use DB;

use App\Errors;
use App\Models\Client;
use App\Models\ClientSubscription;
use App\Models\Payment as Payments;
use App\Models\Subscription;
use App\Nrb\NrbServices;
use App\User;

use Exception;
use PayPal\Api\Amount;
use PayPal\Api\Currency;
use PayPal\Api\Details;
use PayPal\Api\ExecutePayment;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Exception\PayPalConnectionException;
use PayPal\Rest\ApiContext;

use PayPal\Api\Agreement;
use PayPal\Api\MerchantPreferences;
use PayPal\Api\PaymentDefinition;
use PayPal\Api\Plan;
use PayPal\Api\Patch;
use PayPal\Api\PatchRequest;
use PayPal\Common\PayPalModel;

class PaypalbackupServices extends NrbServices
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

    public function paymentRecurring($request, $client)
    {
        $client_id = $client->id;

        $data = [];
        $data['term'] = $request->get('term');

        $subscription        = Subscription::findOrFail($request->subscription_id);
        $data['name']        = $subscription->name;
        $data['description'] = (string) $subscription->description;
        $data['currency']    = $subscription->currency;
        $data['price']       = $subscription->total[strtolower($data['term'])];
        $data['setup_fee']   = $subscription->fee_initial_setup;
        $data['callback']    = $request->get('callback_url');

        dd($data);

        // Create Plan

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
                'data' => $ex->getMessage()
            ]);
        } catch (Exception $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'data' => $ex->getMessage()
            ]);
        }

        $planId = $createdPlan->getId();
        dd($planId);

        // Activate Plan

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

        $planResponse = Plan::get($planId, $this->_api_context);

        DB::transaction(function ()
        {
            // @TODO-Arbitrium
            // ClientSubscriptions::findOrFail(1)->update(['paypal_plan_id' => $planId]);
        });

        return $this->respondWithSuccess([
            'status' => 'success',
            'request' => $request,
            'paypal_plan_id' => $planId,
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
