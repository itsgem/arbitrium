<?php

namespace App\Services;

use App\Errors;
use App\Models\Client;
use App\Models\ClientSubscription;
use App\Models\Subscription;
use App\Nrb\NrbServices;
use App\User;
use DB;
use Exception;
use PayPal\Api\Agreement;
use PayPal\Api\AgreementStateDescriptor;
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

    // ClientsController
    // SubscriptionSeeder
    public function createPlan($request)
    {
        // if accessed by PaypalServices instance
        if (is_array($request))
        {
            $term            = $request['term'];
            $subscription_id = $request['subscription_id'];
            $callback_url    = $request['callback_url'];
        }
        else
        {
            $term            = $request->get('term');
            $subscription_id = $request->get('subscription_id');
            $callback_url    = $request->get('callback_url');
        }

        $data = [];
        $data['term']        = ($term) ? $term : ClientSubscription::TERM_MONTHLY;

        $subscription        = Subscription::findOrFail($subscription_id);
        $data['name']        = $subscription->name;
        $data['description'] = (string) $subscription->description.' ('.$data['term'].')';
        $data['currency']    = $subscription->currency;
        $data['price']       = $subscription->total[$data['term']];
        $data['initial_payment'] = $subscription->total[$data['term'].'_With_Setup'];
        $data['callback']    = $callback_url;

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
            ->setSetupFee(new Currency(['value' => $data['initial_payment'], 'currency' => $data['currency']]));

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
                'success' => false,
                'message' => $ex->getMessage()
            ]);
        }

        return $this->respondWithData([
            'success' => true,
            'message' => 'Success',
            'data'    => json_decode($plan, true)
        ]);
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

    public function subscribe($request, $client)
    {
        $data = [];

        $data['subscription_id'] = $request->get('subscription_id');
        $data['term']            = $request->get('term');
        $data['is_auto_renew']   = $request->get('is_auto_renew');

        $subscription        = Subscription::findOrFail($data['subscription_id']);
        $data['name']        = $subscription->name;
        $data['description'] = $subscription->description;

        if ($data['term'] == ClientSubscription::TERM_ANNUALLY)
        {
            $data['plan_id'] = $subscription->paypal_plan_id_yearly;
            $start_date_offset = "365";
        }
        else
        {
            $data['plan_id'] = $subscription->paypal_plan_id_monthly;
            $start_date_offset = "30";
        }

        $start_date = current_datetime_iso8601($start_date_offset);
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

        $approvalUrl = null;

        if (!$subscription->isTrial())
        {
            try {
                $agreement = $agreement->create($this->_api_context);
                $approvalUrl = $agreement->getApprovalLink();
            } catch (PayPalConnectionException $ex) {
                return $this->respondWithData([
                    'status'      => 'error',
                    'status_code' => $ex->getCode(),
                    'data'        => json_decode($ex->getData(), true),
                    'message'     => $ex->getMessage(),
                ]);
            } catch (Exception $ex) {
                return $this->respondWithData([
                    'status' => 'error',
                    'data'   => $ex->getMessage()
                ]);
            }
        }

        return DB::transaction(function () use ($client, $data, $approvalUrl)
        {
            $data['token'] = ($approvalUrl) ? get_str_url_query_params($approvalUrl, 'token') : null;
            $result = $client->tempSubscription($data['subscription_id'], current_date_to_string(), $data);

            if (!$result)
            {
                return $this->respondWithError(Errors::EXISTING_TRIAL_SUBSCRIPTION);
            }

            return $this->respondWithData([
                'status'       => 'success',
                'approval_url' => $approvalUrl
            ]);
        });
    }

    public function executeAgreement($request)
    {
        //$client_id = $client->id;

        $token = $request->get('token');
        $success = $request->get('success');

        $agreement = new Agreement();

        if($success == true) {
            try {
                $agreement->execute($token, $this->_api_context);
                $agreement = Agreement::get($agreement->getId(), $this->_api_context);

                $agreement_id = $agreement->getId();

                DB::transaction(function () use ($agreement_id, $token)
                {
                    ClientSubscription::paypalTokenId($token)->update([
                        'paypal_agreement_id' => $agreement_id
                    ]);
                });

                return $this->respondWithData([
                    'success' => 'success',
                    'data'    => ['agreement_id' => $agreement_id]
                ]);
            } catch (PayPalConnectionException $ex) {
                return $this->respondWithData([
                    'success'      => false,
                    'status_code' => $ex->getCode(),
                    'message'     => $ex->getMessage(),
                    'data'        => json_decode($ex->getData(), true),
                ]);
            } catch (Exception $ex) {
                return $this->respondWithData([
                    'success' => false,
                    'message' => $ex->getMessage()
                ]);
            }
        }

        return $this->respondWithData([
            'success' => false,
            'message' => 'User cancelled'
        ]);
    }

    public function getTransactions($id)
    {
        // @TODO-Arbitrium: Get Agreement/Profile ID by ClientSubscription ID

        $params = [
            'start_date' => date('Y-m-d', strtotime('-15 years')),
            'end_date'   => date('Y-m-d', strtotime('+5 days'))
        ];

        try {
            $result = Agreement::searchTransactions($id, $params, $this->_api_context);
        } catch (PayPalConnectionException $ex) {
            return $this->respondWithData([
                'success' => false,
                'status_code' => $ex->getCode(),
                'message' => $ex->getMessage(),
                'data' => json_decode($ex->getData(), true),
            ]);
        } catch (Exception $ex) {
            return $this->respondWithData([
                'success' => false,
                'message' => $ex->getMessage()
            ]);
        }

        return $this->respondWithData([
            'success' => true,
            'message' => 'Success',
            'data'    => json_decode($result, true)
        ]);
    }

    public function showAgreement($id, $return_object = false)
    {
        // @TODO-Arbitrium: Get Agreement/Profile ID by ClientSubscription ID

        try {
            $agreement = Agreement::get($id, $this->_api_context);
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

        if ($return_object)
        {
            return $agreement;
        }

        return json_decode($agreement, true);
    }

    public function suspendAgreement($id)
    {
        // @TODO-Arbitrium: Get Agreement/Profile ID by ClientSubscription ID

        // If no agreement id, such as trial
        if (!$id)
        {
            return true;
        }

        $createdAgreement = $this->showAgreement($id, true);

        //Create an Agreement State Descriptor, explaining the reason to suspend.
        $agreementStateDescriptor = new AgreementStateDescriptor();
        $agreementStateDescriptor->setNote("Suspending the agreement");

        try {
            $createdAgreement->suspend($agreementStateDescriptor, $this->_api_context);
            $agreement = Agreement::get($createdAgreement->getId(), $this->_api_context);
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

        return $this->respondWithData([
            'status' => 'success',
            'data' => json_decode($agreement, true)
        ]);
    }

    public function reactivateAgreement($id)
    {
        // @TODO-Arbitrium: Get Agreement/Profile ID by ClientSubscription ID

        $suspendedAgreement = $this->showAgreement($id, true);

        //Create an Agreement State Descriptor, explaining the reason to suspend.
        $agreementStateDescriptor = new AgreementStateDescriptor();
        $agreementStateDescriptor->setNote("Reactivating the agreement");

        try {
            $suspendedAgreement->reActivate($agreementStateDescriptor, $this->_api_context);
            $agreement = Agreement::get($suspendedAgreement->getId(), $this->_api_context);
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
