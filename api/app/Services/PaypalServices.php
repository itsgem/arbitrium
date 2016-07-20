<?php

namespace App\Services;

use App\Errors;
use App\Models\Client;
use App\Models\ClientSubscription;
use App\Models\Subscription;
use App\Nrb\NrbServices;
use App\User;
use DB;
use Illuminate\Support\Facades\Log;
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

    // ClientsController
    public function createPlan($request)
    {
        $data = [];

        $data['term']            = $request->get('term');
        $data['is_auto_renew']   = $request->get('is_auto_renew');
        $data['callback']        = config('paypal.callback_urls.subscriptions');

        $subscription            = Subscription::findOrFail($request->get('subscription_id'));
        $data['name']            = $subscription->name;
        $data['description']     = (string) $subscription->description.' ('.$data['term'].')';
        $data['currency']        = $subscription->currency;
        $data['price']           = $subscription->total[$data['term']];
        $data['initial_payment'] = $subscription->total[$data['term'].'_With_Setup'];

        //----- Create Plan

        $plan = new Plan();

        $plan_type = 'INFINITE';
        $plan_cycles = '0';

        $plan_frequency_interval = ($data['term'] == ClientSubscription::TERM_ANNUALLY) ? config('paypal.period_days.annually') : config('paypal.period_days.monthly');

        if (env('APP_DEBUG') && ($data['term'] == ClientSubscription::TERM_DAILY))
        {
            $plan_frequency_interval =  1;
        }

        $plan->setName($data['name'])
            ->setDescription($data['description'])
            ->setType($plan_type);

        $paymentDefinition = new PaymentDefinition();

        $paymentDefinition->setName($data['term'].' Payments')
            ->setType('REGULAR')
            ->setFrequency('Day')
            ->setFrequencyInterval($plan_frequency_interval)
            ->setCycles($plan_cycles)
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

        try {
            $createdPlan = $plan->create($this->_api_context);
        } catch (PayPalConnectionException $ex) {
            return $this->respondWithError(Errors::PAYPAL_ERROR, json_decode($ex->getData(), true));
        } catch (Exception $ex) {
            return $this->respondWithError(Errors::PAYPAL_ERROR, [$ex->getMessage()]);
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
            return $this->respondWithError(Errors::PAYPAL_ERROR, json_decode($ex->getData(), true));
        } catch (Exception $ex) {
            return $this->respondWithError(Errors::PAYPAL_ERROR, [$ex->getMessage()]);
        }

        $plan_id = $planResponse->getId();

        return $this->respondWithSuccess([
            'paypal_plan_id' => $plan_id
        ]);
    }

    public function showPlan($id, $is_auto_renew = true)
    {
        try {
            if (!$is_auto_renew)
            {
                $plan = Payment::get($id, $this->_api_context);
            }
            else
            {
                $plan = Plan::get($id, $this->_api_context);
            }
        } catch (PayPalConnectionException $ex) {
            return $this->respondWithError(Errors::PAYPAL_ERROR, json_decode($ex->getData(), true));
        } catch (Exception $ex) {
            return $this->respondWithError(Errors::PAYPAL_ERROR, [$ex->getMessage()]);
        }

        return $this->respondWithSuccess(json_decode($plan, true));
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
            return $this->respondWithError(Errors::PAYPAL_ERROR, [$ex->getMessage()]);
        }

        return json_decode($planList, true);
    }

    public function subscribe($request, $client)
    {
        $data = [];

        $data['subscription_id'] = $request->get('subscription_id');
        $data['term']            = $request->get('term');
        $data['is_auto_renew']   = $request->get('is_auto_renew');

        $subscription            = Subscription::findOrFail($data['subscription_id']);
        $data['name']            = $subscription->name;
        $data['description']     = $subscription->description;
        $data['fees']            = $subscription->getFees($data['term']);
        $data['total']           = $subscription->calculateTotal($data['term'].'_With_Setup');
        $data['currency']        = config('paypal.currency');
        $data['callback']        = config('paypal.callback_urls.subscriptions');

        $data['paypal_agreement_id'] = null;
        $data['paypal_plan_id']  = null;
        $approvalUrl             = null;

        // Create plan
        if (!$subscription->isTrial())
        {
            $payer = new Payer();
            $payer->setPaymentMethod('paypal');

            // Is one-time or recurring payment
            if (!$data['is_auto_renew'])
            {
                $items = [];
                $cnt = 0;
                foreach($data['fees'] as $fee)
                {
                    $items[$cnt] = new Item();
                    $items[$cnt]->setName($fee['name'])
                        ->setCurrency($data['currency'])
                        ->setQuantity(1)
                        ->setPrice($fee['amount']);
                    $cnt++;
                }

                // add item to list
                $item_list = new ItemList();
                $item_list->setItems($items);

                $amount = new Amount();
                $amount->setCurrency($data['currency'])
                    ->setTotal($data['total']);

                $transaction = new Transaction();
                $transaction->setAmount($amount)
                    ->setItemList($item_list)
                    ->setDescription($data['description']);

                $redirect_urls = new RedirectUrls();
                $redirect_urls->setReturnUrl($data['callback']."?success=true")
                    ->setCancelUrl($data['callback']."?success=false");

                $payment = new Payment();
                $payment->setIntent('Sale')
                    ->setPayer($payer)
                    ->setRedirectUrls($redirect_urls)
                    ->setTransactions([$transaction]);

                try {
                    $payment->create($this->_api_context);
                } catch (PayPalConnectionException $ex) {
                    return $this->respondWithError(Errors::PAYPAL_ERROR, json_decode($ex->getData(), true));
                }

                foreach($payment->getLinks() as $link) {
                    if($link->getRel() == 'approval_url') {
                        $approvalUrl = $link->getHref();
                        break;
                    }
                }
            }
            else
            {
                $result = $this->createPlan($request, $client);
                $result_data = $result->getData();

                if (!$result_data->success)
                {
                    return $result;
                }

                $data['paypal_plan_id'] = $result_data->data->paypal_plan_id;

                $start_date_offset = ($data['term'] == ClientSubscription::TERM_ANNUALLY) ? config('paypal.period_days.annually') : config('paypal.period_days.monthly');

                if (env('APP_DEBUG') && ($data['term'] == ClientSubscription::TERM_DAILY))
                {
                    $start_date_offset = 1;
                }

                $start_date = current_datetime_iso8601($start_date_offset);

                // Subscribe Customer
                $agreement = new Agreement();

                $agreement->setName($data['name']. '('.$data['term'].')')
                    ->setDescription($data['description'])
                    ->setStartDate($start_date);

                $plan = new Plan();
                $plan->setId($data['paypal_plan_id']);
                $agreement->setPlan($plan);

                $agreement->setPayer($payer);

                try {
                    $agreement = $agreement->create($this->_api_context);
                    $approvalUrl = $agreement->getApprovalLink();
                } catch (PayPalConnectionException $ex) {
                    return $this->respondWithError(Errors::PAYPAL_ERROR, json_decode($ex->getData(), true));
                } catch (Exception $ex) {
                    return $this->respondWithError(Errors::PAYPAL_ERROR, [$ex->getMessage()]);
                }
            }
        }

        return DB::transaction(function () use ($client, $subscription, $data, $approvalUrl)
        {
            $data['approval_url'] = ($approvalUrl) ? $approvalUrl : null;
            $data['token'] = ($approvalUrl) ? get_str_url_query_params($approvalUrl, 'token') : null;
            $result = $client->tempSubscription($subscription, current_date_to_string(), $data);

            if (!$result)
            {
                return $this->respondWithError(Errors::EXISTING_TRIAL_SUBSCRIPTION);
            }

            // Send email notification
            if (!$subscription->isTrial())
            {
                $client->sendApprovalLink($result);
            }
            else
            {
                // [Core-API] Subscribe package plan
                $client->coreApiSubscribe([
                    'max_api_calls' => $subscription->max_api_calls,
                    'max_decisions' => $subscription->max_decisions,
                ]);

                $client->sendSubscriptionChangeSuccess($result);
            }

            return $this->respondWithSuccess([
                'approval_url' => $approvalUrl,
            ]);
        });
    }

    public function executeAgreement($request)
    {
        $token      = $request->get('token');
        $success    = $request->get('success');

        $payment_id = $request->get('payment_id');
        $payer_id   = $request->get('payer_id');

        if($success == true)
        {
            // Is one-time or recurring payment
            if ($payment_id && $payer_id)
            {
                //Execute the payment
                try{
                    $payment = Payment::get($payment_id, $this->_api_context);

                    // PaymentExecution object includes information necessary
                    // to execute a PayPal account payment.
                    // The payer_id is added to the request query parameters
                    // when the user is redirected from paypal back to your site
                    $execution = new PaymentExecution();
                    $execution->setPayerId($payer_id);

                    $result = $payment->execute($execution, $this->_api_context);

                    // payment made
                    if ($result->getState() == 'approved')
                    {
                        return $this->respondWithSuccess([
                            'agreement_id' => $payment_id,
                            'payer_id'     => $payer_id,
                        ]);
                    }

                    return $this->respondWithError(Errors::PAYPAL_ERROR);
                } catch (PayPalConnectionException $ex) {
                    return $this->respondWithError(Errors::PAYPAL_ERROR, json_decode($ex->getData(), true));
                } catch(Exception $ex){
                    return $this->respondWithError(Errors::PAYPAL_ERROR, [$ex->getMessage()]);
                }
            }
            else
            {
                try {
                    $agreement = new Agreement();

                    $agreement->execute($token, $this->_api_context);
                    $agreement = Agreement::get($agreement->getId(), $this->_api_context);

                    $agreement_id = $agreement->getId();

                    return $this->respondWithSuccess([
                        'agreement_id' => $agreement_id
                    ]);
                } catch (PayPalConnectionException $ex) {
                    return $this->respondWithError(Errors::PAYPAL_ERROR, json_decode($ex->getData(), true));
                } catch (Exception $ex) {
                    return $this->respondWithError(Errors::PAYPAL_ERROR, [$ex->getMessage()]);
                }
            }
        }

        return $this->respondWithError(Errors::PAYPAL_CANCELLED);
    }

    public function getTransactions($request, $id)
    {
        $params = [
            'start_date' => $request->get('start_date', current_date_sub_days(60)),
            'end_date'   => $request->get('end_date', current_date_add_days(5))
        ];

        try {
            $result = Agreement::searchTransactions($id, $params, $this->_api_context);
        } catch (PayPalConnectionException $ex) {
            return $this->respondWithError(Errors::PAYPAL_ERROR, json_decode($ex->getData(), true));
        } catch (Exception $ex) {
            return $this->respondWithError(Errors::PAYPAL_ERROR, [$ex->getMessage()]);
        }

        return $this->respondWithSuccess(json_decode($result, true));
    }

    public function showAgreement($id, $return_object = false)
    {
        try {
            $agreement = Agreement::get($id, $this->_api_context);
        } catch (PayPalConnectionException $ex) {
            return $this->respondWithError(Errors::PAYPAL_ERROR, json_decode($ex->getData(), true));
        } catch (Exception $ex) {
            return $this->respondWithError(Errors::PAYPAL_ERROR, [$ex->getMessage()]);
        }

        if ($return_object)
        {
            return $agreement;
        }

        return json_decode($agreement, true);
    }

    public function suspendAgreement($id)
    {
        // If no agreement id, such as trial
        if (!$id)
        {
            return $this->respondWithSuccess();
        }

        $client_subscription = ClientSubscription::paypalAgreementId($id)->first();

        if (!$client_subscription)
        {
            return $this->respondWithError(Errors::NO_CONTENT);
        }

        $client = $client_subscription->client;

        $createdAgreement = $this->showAgreement($id, true);

        //Create an Agreement State Descriptor, explaining the reason to suspend.
        $agreementStateDescriptor = new AgreementStateDescriptor();
        $agreementStateDescriptor->setNote("Suspending the agreement");

        try {
            $createdAgreement->suspend($agreementStateDescriptor, $this->_api_context);
            $agreement = Agreement::get($createdAgreement->getId(), $this->_api_context);
        } catch (PayPalConnectionException $ex) {
            return $this->respondWithError(Errors::PAYPAL_ERROR, json_decode($ex->getData(), true));
        } catch (Exception $ex) {
            return $this->respondWithError(Errors::PAYPAL_ERROR, [$ex->getMessage()]);
        }

        // Send email notification
        $client->sendSubscriptionCancellation($client_subscription);

        return $this->respondWithSuccess(json_decode($agreement, true));
    }

    public function reactivateAgreement($id)
    {
        $suspendedAgreement = $this->showAgreement($id, true);

        //Create an Agreement State Descriptor, explaining the reason to suspend.
        $agreementStateDescriptor = new AgreementStateDescriptor();
        $agreementStateDescriptor->setNote("Reactivating the agreement");

        try {
            $suspendedAgreement->reActivate($agreementStateDescriptor, $this->_api_context);
            $agreement = Agreement::get($suspendedAgreement->getId(), $this->_api_context);
        } catch (PayPalConnectionException $ex) {
            return $this->respondWithError(Errors::PAYPAL_ERROR, json_decode($ex->getData(), true));
        } catch (Exception $ex) {
            return $this->respondWithError(Errors::PAYPAL_ERROR, [$ex->getMessage()]);
        }

        return json_decode($agreement, true);
    }

    //----- IPN Listener

    public function statusUpdate($request)
    {
        Log::info("[IPN] ~~~~~ VALID ~~~~~");
        Log::info("[IPN] TRANSACTION: ". $request->get('txn_type'));

        $paypal_ipn_response = json_encode($request->all());
        $paypal_log = json_encode([
            'header' => $request->header(),
            'body'   => $request->all()
        ]);
        Log::info("[IPN] PAYLOAD: ". $paypal_log);

        //----- HOOK: Subscription Payment
        if ($request->get('txn_type') == ClientSubscription::PAYPAL_TRANSACTION_TYPE_SUBSCRIPTION_PAYMENT
            && $request->get('payment_status') == ClientSubscription::PAYPAL_STATE_COMPLETED)
        {
            Log::info("[IPN] HOOK: Subscription Payment");

            // Get latest subscription
            $client_subscription = ClientSubscription::paypalAgreementId($request->get('recurring_payment_id'))->latest()->first();

            // Renew: Change latest subscription status to "Renewed"
            DB::transaction(function() use($client_subscription)
            {
                $client_subscription->renew();
                Log::info("[IPN] Set latest subscription status to renewed. ClientSubscription#".$client_subscription->id);
            });

            // Renew: Create new subscription after being renewed
            $renewed_subscription = DB::transaction(function() use($client_subscription, $request, $paypal_ipn_response)
            {
                return $client_subscription->client->renewSubscription($client_subscription, current_date_to_string(), [
                        'paypal_transaction_id' => $request->get('txn_id'),
                        'paypal_ipn_response'   => $paypal_ipn_response,
                    ]);
            });

            if ($renewed_subscription)
            {
                // Send client subscription renewal success email
                $client_subscription->client->sendSubscriptionRenewalSuccess($renewed_subscription);
                Log::info("[IPN] Sent client email on their renewed subscription. ClientSubscription#".$renewed_subscription->id);

                return DB::transaction(function () use ($renewed_subscription)
                {
                    // Mark subscription as paid
                    $renewed_subscription->invoice->paid();

                    // Send client invoice details
                    $renewed_subscription->invoice->sendInvoice();

                    Log::info("[IPN] Sent client email on their renewed subscription invoice. Invoice#".$renewed_subscription->invoice->id);

                    return $this->respondWithSuccess($renewed_subscription);
                });
            }

            Log::error("[IPN] ".Errors::SUBSCRIPTION_RENEWAL_ERROR);
            Log::info("[IPN] End");

            return $this->respondWithError(Errors::SUBSCRIPTION_RENEWAL_ERROR);
        }

        Log::info("[IPN] ====== End ======");
    }
}
