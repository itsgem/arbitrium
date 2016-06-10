import React from 'react';
import { Link } from 'react-router';
import {modal, openModal, closeModal} from 'common/components/modal'
import {createError} from 'utils/error';

class invoiceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      id: null
    };  }
  componentWillReceiveProps(nextProps) {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
    modal();
  }
  render() {
    let invoiceInfo = this.props.invoiceInfo.data;
    let invoiceDetails = invoiceInfo.invoice_details;
    let settings = invoiceInfo.system_settings;
    let overallTotal = '0.00';
    let subtotal = '0.00';
    return (
      <div className="mdl-grid mdl-grid--no-spacing table-list-container">
        <div className="mdl-cell mdl-cell--12-col header-title"><p>INVOICE DETAIL</p></div>
        <div className="mdl-grid content">
          <div className="mdl-cell mdl-cell--12-col">
            <center><h6>KOSH CONSULTING GROUP (ASIA) PTE. LTD.</h6></center>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <legend className="to-right">
              <h4>BILLING INVOICE</h4>
            </legend>
          </div>
          <div className="mdl-cell mdl-cell--7-col left-info">
            Other Information:<br/>
            {invoiceInfo.rep_first_name} {invoiceInfo.rep_last_name}<br/>
            {invoiceInfo.company_name}<br/>
            {invoiceInfo.street_address_1}, {invoiceInfo.city}, {invoiceInfo.state}
          </div>
          <div className="mdl-cell mdl-cell--5-col right-info text-right">
            {settings.kcg_company_name}<br/>
            {settings.kcg_street_address}, {settings.kcg_state}, {settings.kcg_country}<br/>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <h6>PRODUCTS AND SERVICES PURCHASED</h6>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <table className="mdl-data-table mdl-js-data-table table-list">
              <thead>
                <tr>
                  <th className="left-align">Name</th>
                  <th className="left-align">Type</th>
                  <th>Price (USD)</th>
                  <th>Discount (USD)</th>
                  <th>Subtotal (USD)</th>
                </tr>
              </thead>
              <tbody>
                  {
                    invoiceDetails && invoiceDetails.map(item => {
                      overallTotal = parseFloat( parseFloat(overallTotal) + parseFloat(item.amount)).toFixed(2);
                      subtotal = parseFloat( parseFloat(overallTotal) - parseFloat(invoiceInfo.discounts)).toFixed(2);
                      return <tr key={item.id}><td className="text-left">{item.name}</td>
                      <td>Subsription</td>
                      <td>{item.amount}</td>
                      <td>0.00</td>
                      <td>{subtotal}</td></tr>;
                    })
                  }
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><h6>OVERALL TOTAL</h6></td>
                  <td><h6>USD {overallTotal}</h6></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mdl-cell mdl-cell--4-col margin-bottom-40">
            <h6>Remarks</h6>
          </div>
          <div className="mdl-cell mdl-cell--6-col margin-bottom-40">
            <h6>Premium Package Plan</h6>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <p><i className="note">This is an Electronic invoice. No signature is required.</i></p>
          </div>
          <div className="mdl-cell mdl-cell--12-col top-margin20">
            <h6>Banking Details:</h6>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <p>Account Name: <span className="invoice-value">{settings.kcg_credit_to}</span> <br />
            Bank: <span className="invoice-value">{settings.kcg_account_name}</span><br />
            Account No.: <span className="invoice-value">{settings.kcg_bank_account}</span></p>
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <p>Bank Code: <span className="invoice-value">{settings.kcg_bank_code}</span></p>
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <p>Branch Code: <span className="invoice-value">{settings.kcg_branch_code}</span></p>
          </div>
          <div className="mdl-cell mdl-cell--12-col cta-bottom text-right">
            <a href={invoiceInfo.url} target="_blank" className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent btn-margin-right"><i className="material-icons">description</i>GENERATE PDF</a>
            <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--default"><i className="material-icons">mail</i>SEND TO EMAIL</button>
          </div>
        </div>
      </div>
    );
  }
};

export default invoiceDetails;