<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xml:lang="en" xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <link href='http://fonts.googleapis.com/css?family=Orienta' rel='stylesheet' type='text/css'>
        <title>Invoice</title>
        <style type="text/css">
            @page {
               margin: 2cm;
            }

            * {
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              box-sizing: border-box;
            }

            body, p {
                font-family: Arial, sans-serif;
                margin: 0.5cm 0;
                text-align: justify;
                font-size: 14px;
            }

            h1 {
                font-size: 26px;
                line-height: 34px;
            }

            h2 {
                font-size: 22px;
            }

            h3 {
                font-family: Candara, Segoe, 'Segoe UI', Optima, sans-serif;
                font-size: 18px;
            }

            table {
                width: 100%;
                padding-bottom: 25px;
                border-collapse: collapse;
            }

            table td {
                border-bottom: 0.1pt solid #aaa;
                font-size: 14px;
                text-align: left;
                padding: 7px;
            }

            table td.td-label {
                width: 35%;
            }

            td b{
                display: block;
                font-size: 14px;
            }

            .th {
                font-weight: bold;
            }

            .header-block table td {
                border: none;
            }

            .thick-top-border {
                border-top: 0.4pt solid #aaa;
            }

            .thick-bot-border {
                border-bottom: 0.4pt solid #aaa;
            }

            .text-center {
                text-align:center;
                text-decoration:none;
            }

            .text-left {
                text-align:left;
                text-decoration:none;
            }

            .text-right {
                text-align:right;
                text-decoration:none;
            }

            #invoice-ids-block table {
                width: 300px;
            }

            #footer h2 {
                color: 0.4pt #aaa;
            }

        </style>
    </head>
    <body>
        <div class="main-container">
            <div class="logo-container">
                <h4 class="text-center">{{ $kcg_company_name }}</h4>
            </div>
            <div id="header">
                <h2 class="text-right">BILLING INVOICE</h2>
            </div>
            <div id="invoice-ids-block" class="header-block">
                <table cellspacing="0" cellpadding="0" align="right">
                    <tr>
                        <td class="td-label">Invoice No.</td>
                        <td>{{ $invoice_no }}</td>
                    </tr>
                    <tr>
                        <td class="td-label">Ref PO No.</td>
                        <td>{{ $po_no }}</td>
                    </tr>
                    <tr>
                        <td class="td-label">Invoice Date</td>
                        <td>{{ $invoiced_at }}</td>
                    </tr>
                </table>
            </div>
            <br />
            <br />
            <div id="address-block" class="header-block">
                <table>
                    <tr>
                        <td>TO:</td>
                    </tr>
                    <tr>
                        <td>{{ $rep_first_name }} {{ $rep_last_name }}</td>
                    </tr>
                    <tr>
                        <td>{{ $company_name }}</td>
                    </tr>
                    <tr>
                        <td>{{ $street_address_1 }}, {{ $city }} , {{ $state }}</td>
                    </tr>
                </table>
            </div>
            <div id="content">
                <h3>PRODUCTS AND SERVICES PURCHASED</h3>
                <table>
                    <tr>
                        <td class="th thick-bot-border">Name</td>
                        <td class="th thick-bot-border">Type</td>
                        <td class="th thick-bot-border">Price ({{ config('paypal.currency') }})</td>
                        <td class="th thick-bot-border">Discount ({{ config('paypal.currency') }})</td>
                        <td class="th thick-bot-border">Subtotal ({{ config('paypal.currency') }})</td>
                    </tr>
                    @foreach ($invoice_details as $detail)
                         <tr>
                            <td>{{ $detail["name"] }}</td>
                            <td>Subscription</td>
                            <td class="text-right">{{ $detail["amount"] }}</td>
                            <td class="text-right">0.00</td>
                            <td class="text-right">{{ $detail["amount"] }}</td>
                        </tr>
                    @endforeach

                    <tr>
                        <td class="thick-top-border text-right" colspan="4"><b>OVERALL TOTAL</b></td>
                        <td class="thick-top-border text-right">{{ config('paypal.currency') }} {{ $total_amount }}</td>
                    </tr>
                </table>

                <br /><br />

                <table>
                    <tr>
                        <td class="td-label">Remarks</td>
                        <td>{{ $description }}</td>
                    </tr>
                </table>

                <br /><br />
                <span>THIS IS AN ELECTRONIC INVOICE. NO SIGNATURE IS REQUIRED.</span><br /><br />
                <b>BANK DETAILS</b><br />
                <b>Account Name:</b>   {{ $kcg_account_name }}<br />
                <b>Bank:</b>   {{ $kcg_bank_account }}<br />
                <b>Account Number:</b>   {{ $kcg_credit_to }}<br />
                <b>Bank Code:</b> {{ $kcg_bank_code }}; <b>Branch Code:</b> {{ $kcg_branch_code }}<br />
            </div>
            <div id="footer">
                <h2>Thank You.</h2>
                <h5>{{ $kcg_company_name }}</h5>
                {{ $kcg_street_address }}<br />
                {{ $kcg_city }}<br />
                {{ $kcg_state }}, {{ $kcg_postal_code }}<br />
                {{ $kcg_country }}
            </div>
        </div>
    </body>
</html>

