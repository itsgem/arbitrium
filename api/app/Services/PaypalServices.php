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

    public function __construct()
    {
        // setup PayPal api context
        $paypal_conf = config('paypal');
        $this->_api_context = new ApiContext(new OAuthTokenCredential($paypal_conf['client_id'], $paypal_conf['secret']));
        $this->_api_context->setConfig($paypal_conf['settings']);
    }

    //----- Recurring

    public function createPlan($request)
    {
        $data = [];
        $data['term']        = ($request->get('term')) ? $request->get('term') : ClientSubscription::TERM_MONTHLY;

        $subscription        = Subscription::findOrFail($request->get('subscription_id'));
        $data['name']        = $subscription->name;
        $data['description'] = (string) $subscription->description.' ('.$data['term'].')';
        $data['currency']    = $subscription->currency;
        $data['price']       = $subscription->total[$data['term']];
        $data['setup_fee']   = $subscription->fee_initial_setup;
        $data['callback']    = $request->get('callback_url');

        //----- Create Plan

        $plan = new Plan();

        $plan_frequency_interval = ($data['term'] == ClientSubscription::TERM_ANNUALLY) ? "365" : "30";

        $plan->setName($data['name'])
            ->setDescription($data['description'])
            ->setType('INFINITE');

        $paymentDefinition = new PaymentDefinition();

        $paymentDefinition->setName($data['term'].' Payments')
            ->setType('REGULAR')
            ->setFrequency('Day')
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

    public function showPlan($id)
    {
        try {
            $plan = Plan::get($id, $this->_api_context);
        } catch (Exception $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'data' => $ex->getMessage()
            ]);
        }

        return json_decode($plan, true);
    }

    public function getPlans($request)
    {
        // PayPal pagination is 0 based
        $page = (int) $request->get('page');
        $page = ($page > 0) ? ($page - 1) : 0;

        try {
            $params = [
                'page_size' => $request->get('per_page', 20),
                'page'      => $page,
                'status'    => $request->get('status', 'ACTIVE'),
            ];
            $planList = Plan::all($params, $this->_api_context);
        } catch (Exception $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'data' => $ex->getMessage()
            ]);
        }

        return json_decode($planList, true);
    }

    public function subscribe($request)
    {
        //$client_id = $client->id;

        $data = [];
        $data['term'] = ($request->get('term')) ? $request->get('term') : ClientSubscription::TERM_MONTHLY;

        $subscription        = Subscription::findOrFail($request->get('subscription_id'));
        $data['name']        = $subscription->name;
        $data['description'] = $subscription->description;
        $data['plan_id']     = ($data['term'] == ClientSubscription::TERM_ANNUALLY) ? $subscription->paypal_plan_id_yearly : $subscription->paypal_plan_id_monthly;

        $start_date = current_datetime_iso8601(1);

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

    public function executeAgreement($request)
    {
        //$client_id = $client->id;

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

    public function showAgreement($id)
    {
        try {
            $agreement = Agreement::get($id, $this->_api_context);
        } catch (Exception $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'data' => $ex->getMessage()
            ]);
        }

        return json_decode($agreement, true);
    }

    //----- One-Time

    public function subscribeOneTime($request)
    {
        // $client_id = $client->id;
        $client_id = 999000001;

        $subscription = Subscription::findOrFail($request->get('subscription_id'));
        $subscription_fees = $subscription->getFees($request->get('term'));
        $subscription_total = $subscription->calculateTotal($request->get('term').'_With_Setup');

        $subscription_name = $subscription->name;
        $subscription_description = $subscription->description;
        $subscription_currency = config('paypal.currency');
        $subscription_callback = $request->get('callback_url');

        $payer = new Payer();
        $payer->setPaymentMethod('paypal');

        $items = [];
        $cnt = 0;
        foreach($subscription_fees as $fee)
        {
            $items[$cnt] = new Item();
            $items[$cnt]->setName($fee['name'])
                ->setCurrency($subscription_currency)
                ->setQuantity(1)
                ->setPrice($fee['amount']);

            $cnt++;
        }

        // add item to list
        $item_list = new ItemList();
        $item_list->setItems($items);

        $amount = new Amount();
        $amount->setCurrency($subscription_currency)
            ->setTotal($subscription_total);

        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($item_list)
            ->setDescription($subscription_description);

        $redirect_urls = new RedirectUrls();
        $redirect_urls->setReturnUrl($subscription_callback)
            ->setCancelUrl($subscription_callback);

        $paypal_information = [
            'client_id'    => $client_id,
            'description'  => $subscription_description,
            'total_amount' => $subscription_total
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
        } catch (PayPalConnectionException $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'status_code' => $ex->getCode(),
                'data' => json_decode($ex->getData(), true),
                'message' => $ex->getMessage(),
            ]);
        }

        foreach($payment->getLinks() as $link) {
            if($link->getRel() == 'approval_url') {
                $redirect_url = $link->getHref();
                break;
            }
        }

        // add payment ID to session
        $paypal_information['paypal_payment_id'] = $payment->getId();
        DB::transaction(function ()
        {
            //Payments::addPayment($paypal_information);
        });

        if(isset($redirect_url)) {
            return $this->respondWithSuccess([
                'status' => 'success',
                'paypal_payment_id' => $payment->getId(),
                'callback_url' => $redirect_url
            ]);
        }

        return $this->respondWithData([
            'status' => 'error',
            'data' => 'Unknown error occurred'
        ]);
    }

    public function executeAgreementOneTime($request)
    {
        // Get the payment ID before session clear
        $data = (object) [
            'payment_id' => $request->get('paymentId'),
            'payer_id'   => $request->get('PayerID'),
            'token'      => $request->get('token'),
        ];

        if (empty($data->payer_id) || empty($data->token)) {
            return $this->respondWithData([
                'status' => 'error',
                'message' => 'Payment failed'
            ]);
        }

        if (env('PAYPAL_BYPASS'))
        {
            // @TODO-Arbitrium
            // return $this->bypassFakePaypalStatus();
        }

        $payment = Payment::get($data->payment_id, $this->_api_context);

        // PaymentExecution object includes information necessary
        // to execute a PayPal account payment.
        // The payer_id is added to the request query parameters
        // when the user is redirected from paypal back to your site
        $execution = new PaymentExecution();
        $execution->setPayerId($data->payer_id);

        //Execute the payment
        try{
            $result = $payment->execute($execution, $this->_api_context);

            if ($result->getState() == 'approved') { // payment made
                //purchase credit
                return DB::transaction(function ($data)
                {
                    // @TODO-Arbitrium: Invoice

                    return $this->respondWithSuccess([
                        'message'    => 'Payment success',
                        'payment_id' => $data->payment_id,
                        'payer_id'   => $data->payer_id,
                    ]);
                });
            }

            return $this->respondWithData([
                'status' => 'error',
                'data' => ['message' => 'Payment failed']
            ]);

        } catch (PayPalConnectionException $ex) {
            return $this->respondWithData([
                'status' => 'error',
                'status_code' => $ex->getCode(),
                'data' => json_decode($ex->getData(), true),
                'message' => $ex->getMessage(),
            ]);
        }catch(Exception $ex){
            return $this->respondWithData([
                'status' => 'error',
                'data' => $ex->getMessage()]);
        }
    }
}
