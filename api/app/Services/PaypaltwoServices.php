<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Api\Address;
use PayPal\Api\Amount;
use PayPal\Api\CreditCard;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\FundingInstrument;
use PayPal\Api\Transaction;
use PayPal\Api\Currency;
use PayPal\Api\MerchantPreferences;
use PayPal\Api\PaymentDefinition;
use PayPal\Api\Plan;
use PayPal\Api\ChargeModel;
use PayPal\Api\Patch;
use PayPal\Api\PatchRequest;
use PayPal\Common\PayPalModel;
use PayPal\Api\Agreement;
use PayPal\Api\PayerInfo;
use PayPal\Api\ShippingAddress;

class PaymentController extends Controller {

    private $_api_context;

    public function __construct()
    {

        // setup PayPal api context
        $paypal_conf = \Config::get('paypal');
        $this->_api_context = new ApiContext(new OAuthTokenCredential($paypal_conf['client_id'], $paypal_conf['secret']));
        $this->_api_context->setConfig($paypal_conf['settings']);

    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function createPlan()
    {

        $name = 'Stater Plan';
        $desc = 'Monthly Subscription For Starter Plan';

        $plan = new Plan();
        $plan->setName($name)
            ->setDescription($desc)
            ->setType('INFINITE');

        /*
        * 1 = Monthly
        * 4 = Quarterly
        * 12 = Yearly
        */

        $lenght = '1';

        $paymentDefinition = new PaymentDefinition();

        $paymentDefinition->setName('Regular Payments')
            ->setType('REGULAR')
            ->setFrequency('Month')
            ->setFrequencyInterval($lenght)
            ->setCycles("0")
            ->setAmount(new Currency(array('value' => 10, 'currency' => 'USD')));

        $merchantPreferences = new MerchantPreferences();

        $merchantPreferences->setReturnUrl(url()."/payment/executeagreement?success=true")
            ->setCancelUrl(url()."/payment/executeagreement?success=false")
            ->setAutoBillAmount("yes")
            ->setInitialFailAmountAction("CONTINUE")
            ->setMaxFailAttempts("0")
            ->setSetupFee(new Currency(array('value' => 0, 'currency' => 'USD'))); // No hidden charges


        $plan->setPaymentDefinitions(array($paymentDefinition));
        $plan->setMerchantPreferences($merchantPreferences);

        $output = $plan->create($this->_api_context);

        //Active Plan
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


        // Use this plan id for customer subscription
        // Save db
        //$planId = $createdPlan->getId()

        echo $planId = $createdPlan->getId();

        //dd($planResponse);
    }

    public function subscribeCustomer()
    {
        $planId = "P-3MD23601P3465574DYRIDRGY";

        //SubscribeCustomer
        $agreement = new Agreement();

        $agreement->setName('Monthly Payment For Starter')
            ->setDescription('Monthly Payment For Starter')
            ->setStartDate(date('c',strtotime(date('Y-m-d') . "+1 days")));

        $plan = new Plan();
        $plan->setId($planId);
        $agreement->setPlan($plan);

        $payer = new Payer();
        $payer->setPaymentMethod('paypal');
        $agreement->setPayer($payer);


        try {

            $agreement = $agreement->create($this->_api_context);


            $response = array(
                "flag" => 2,
                "message" => $agreement->getApprovalLink()
            );


        } catch (Exception $ex) {

            $message = parseApiError($ex->getData());
            $response = array(
                "flag" => 0,
                "message" => "Failed to connect to our server. Please try again later."
            );
        }

        echo json_encode($response);
        exit();
    }

    public function executeagreement()
    {
        $fields = \Request::only (
            'success',
            'token'
        );

        $token = $fields['token'];
        $success = $fields['success'];

        $agreement = new Agreement();

        if($success == true) {

            $agreement->execute($token, $this->_api_context);

            $agreement = Agreement::get($agreement->getId(), $this->_api_context);

            dd($agreement);

        } else {
            echo "user cancel the processed";
        }
    }
}