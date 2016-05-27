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
        $plan_cycles = "0";

        if (!$data['is_auto_renew'])
        {
            $plan_type = 'FIXED';
            $plan_cycles = "1";
        }

        $plan_frequency_interval = ($data['term'] == ClientSubscription::TERM_ANNUALLY) ? config('paypal.period_days.annually') : config('paypal.period_days.monthly');

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

        if (env('PAYPAL_BYPASS'))
        {
            // @TODO-Arbitrium
            // return $this->bypassSetup($redirect_urls);
        }

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

    public function showPlan($id)
    {
        try {
            $plan = Plan::get($id, $this->_api_context);
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

        $subscription        = Subscription::findOrFail($data['subscription_id']);
        $data['name']        = $subscription->name;
        $data['description'] = $subscription->description;

        $data['paypal_plan_id'] = null;

        // Create plan
        if (!$subscription->isTrial())
        {
            $result = $this->createPlan($request, $client)->getData();

            $data['paypal_plan_id'] = $result->data->paypal_plan_id;

            $start_date_offset = ($data['term'] == ClientSubscription::TERM_ANNUALLY) ? config('paypal.period_days.annually') : config('paypal.period_days.monthly');

            $start_date = current_datetime_iso8601($start_date_offset);

            // SubscribeCustomer
            $agreement = new Agreement();

            $agreement->setName($data['name']. '('.$data['term'].')')
                ->setDescription($data['description'])
                ->setStartDate($start_date);

            $plan = new Plan();
            $plan->setId($data['paypal_plan_id']);
            $agreement->setPlan($plan);

            $payer = new Payer();
            $payer->setPaymentMethod('paypal');
            $agreement->setPayer($payer);

            $approvalUrl = null;

            try {
                $agreement = $agreement->create($this->_api_context);
                $approvalUrl = $agreement->getApprovalLink();
            } catch (PayPalConnectionException $ex) {
                return $this->respondWithError(Errors::PAYPAL_ERROR, json_decode($ex->getData(), true));
            } catch (Exception $ex) {
                return $this->respondWithError(Errors::PAYPAL_ERROR, [$ex->getMessage()]);
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

            if (is_admin_user_logged_in())
            {
                $client->sendApprovalLink($result);
            }

            return $this->respondWithSuccess([
                'approval_url' => $approvalUrl,
            ]);
        });
    }

    public function executeAgreement($request)
    {
        $token   = $request->get('token');
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

                return $this->respondWithSuccess([
                    'agreement_id' => $agreement_id
                ]);
            } catch (PayPalConnectionException $ex) {
                return $this->respondWithError(Errors::PAYPAL_ERROR, json_decode($ex->getData(), true));
            } catch (Exception $ex) {
                return $this->respondWithError(Errors::PAYPAL_ERROR, [$ex->getMessage()]);
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
}
