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

            table td {
                border-bottom: 0.1pt solid #aaa;
                font-size: 14px;
                text-align: left;
                padding: 5px;
            }

            table {
                width: 100%;
                padding-bottom: 25px;
            }

            td b{
                display: block;
                font-size: 14px;
            }

            #header h2{
                border-bottom: 0.1pt solid #aaa;
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

            #footer h2 {
                color: 0.4pt #aaa;
            }

        </style>
    </head>
    <body>
        <div class="main-container">
            <div class="logo-container">
                <h4 class="text-center">{{ $kcg_company_name }}</h3>
            </div>
            <div id="header"><h2 class="text-center">Receipt</h2></div>
            <div id="content">
                <p>We received payment for your purchased products. Thanks for your business! Questions? Contact us anytime</p>
                <h3>BILLING</h3>
                <table>
                    <tr>
                        <td style="width:20%">Invoice Date</td>
                        <td>{{ $invoiced_at }}</td>
                    </tr>
                    <tr>
                        <td>Invoice No.</td>
                        <td>{{ $invoice_no }}</td>
                    </tr>
                    <tr>
                        <td>Bill To</td>
                        <td>{{ $company_name }}</td>
                    </tr>
                    <tr>
                        <td>Attention</td>
                        <td>{{ $rep_first_name }} {{ $rep_last_name }}</td>
                    </tr>
                    <tr>
                        <td>Ref PO No.</td>
                        <td>{{ $po_no }}</td>
                    </tr>
                    <tr>
                        <td>Amount</td>
                        <td>{{ $total_amount }}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{{ $street_address_1 }}, {{ $city }} , {{ $state }}</td>
                    </tr>
                    <tr>
                        <td>Remarks</td>
                        <td>{{ $description }}</td>
                    </tr>
                </table>
                <h3>PRODUCTS AND SERVICES PURCHASED</h3>
                <table>
                    <tr>
                        <td class="thick-bot-border">Name</td>
                        <td class="thick-bot-border">No. of Credits</td>
                        <td class="thick-bot-border">Price Per Credit (SGD)</td>
                        <td class="thick-bot-border">Total (SGD)</td>
                    </tr>
                    @foreach ($invoice_details as $detail)
                         <tr>
                            <td>{{ $detail["product_name"] }}</td>
                            <td>{{ $detail["amount_in_credit"] }}</td>
                            <td>{{ $detail["price_per_credit"] }}</td>
                            <td>{{ $detail["amount"] }}</td>
                        </tr>
                    @endforeach

                    <tr>
                        <td class="thick-top-border"><b>OVERALL TOTAL</b></td>
                        <td class="thick-top-border">{{ $total_amount_in_credit }}</td>
                        <td class="thick-top-border">&nbsp;</td>
                        <td class="thick-top-border">{{ $total_amount }}</td>
                    </tr>
                </table>

                <span style="font-size: 10px;font-style: italic;">THIS IS AN ELECTRONIC INVOICE. NO SIGNATURE IS REQUIRED.</span><br />
                <b>PAYMENT METHOD</b><br />
                <b>Direct Credit to:</b>   {{ $kcg_credit_to }}<br />
                <b>Bank Account:</b> {{ $kcg_bank_account }}<br />
                <b>Bank Code:</b> {{ $kcg_bank_code }}<br />
                <b>Branch Code:</b> {{ $kcg_branch_code }}<br />
                <b>Swift Code: </b>{{ $kcg_swift_code }}
            </div>
            <div id="footer">
                <h2>Thank You.</h2>
                <h5>{{ $kcg_company_name }}</h5>
                {{ $kcg_street_address }}<br />
                {{ $kcg_state }}, {{ $kcg_postal_code }}<br />
                {{ $kcg_country }}
            </div>
        </div>
    </body>
</html>

