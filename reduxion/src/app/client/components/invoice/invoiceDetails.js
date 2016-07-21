import React from 'react';
import tr from 'i18next';
import { modal } from 'common/components/modal';
import { openLoading, closeLoading } from 'common/components/modal';
import {createError} from 'utils/error';

class invoiceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      id: null
    };  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
    modal();
  }
  loadingRender () {
    if (!this.props.loading && this.props.successMailSent || this.state.errorServer) {
      let notification = document.querySelector('.mdl-snackbar');
      notification.MaterialSnackbar.showSnackbar( {
        message: this.state.errorServer ? this.state.errorServer.response[0] : "Successfully sent invoice to your email ",
        timeout: 3000
      });
      closeLoading();
    }
    return (
      <div className="loading"></div>
    );
  }
  render() {
    let invoiceInfo = this.props.invoiceInfo.data;
    let invoiceDetails = invoiceInfo.invoice_details;
    let settings = invoiceInfo.system_settings;
    let overallTotal = '0.00';
    let subtotal = '0.00';
    return (
      <div className="mdl-grid mdl-grid--no-spacing table-list-container">
        {this.loadingRender()}
        <div className="mdl-cell mdl-cell--12-col header-title"><p>{tr.t('CLIENT_INVOICE.INVOICE_DETAIL.TITLE')}</p></div>
        <div className="mdl-grid content">
          <div className="mdl-cell mdl-cell--12-col">
            <center><h6>{settings.kcg_company_name}</h6></center>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <legend className="to-right">
              <h4>{tr.t('CLIENT_INVOICE.LABEL.BILLING_INVOICE')}</h4>
            </legend>
          </div>
          <div className="mdl-cell mdl-cell--7-col left-info">
            {tr.t('CLIENT_INVOICE.LABEL.OTHER_INFORMATION')}<br/>
            {invoiceInfo.rep_first_name} {invoiceInfo.rep_last_name}<br/>
            {invoiceInfo.company_name}<br/>
            {invoiceInfo.street_address_1}, {invoiceInfo.city}, {invoiceInfo.state}
          </div>
          <div className="mdl-cell mdl-cell--5-col right-info text-right">
            {settings.kcg_company_name}<br/>
            {settings.kcg_street_address}, {settings.kcg_city}, {settings.kcg_state}<br/>
            {settings.kcg_country}, {settings.kcg_postal_code}<br/>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <h6>{tr.t('CLIENT_INVOICE.LABEL.PRODUCT_SERVICES_PURCHASED')}</h6>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <table className="mdl-data-table mdl-js-data-table table-list">
              <thead>
                <tr>
                  <th className="left-align">{tr.t('CLIENT_INVOICE.LABEL.TABLE.NAME')}</th>
                  <th className="left-align">{tr.t('CLIENT_INVOICE.LABEL.TABLE.TYPE')}</th>
                  <th>{tr.t('CLIENT_INVOICE.LABEL.TABLE.PRICE')}</th>
                  <th>{tr.t('CLIENT_INVOICE.LABEL.TABLE.DISCOUNT')}</th>
                  <th>{tr.t('CLIENT_INVOICE.LABEL.TABLE.SUBTOTAL')}</th>
                </tr>
              </thead>
              <tbody>
                  {
                    invoiceDetails && invoiceDetails.map(item => {
                      overallTotal = parseFloat( parseFloat(overallTotal) + parseFloat(item.amount)).toFixed(2);
                      subtotal = parseFloat( parseFloat(item.amount) - parseFloat(invoiceInfo.discounts)).toFixed(2);
                      return <tr key={item.id}><td className="text-left">{item.name}</td>
                      <td className="text-left">{tr.t('LABEL.SUBSCRIPTION')}</td>
                      <td>{item.amount}</td>
                      <td>0.00</td>
                      <td>{subtotal}</td></tr>;
                    })
                  }
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><h6>{tr.t('CLIENT_INVOICE.LABEL.TABLE.OVERALL_TOTAL')}</h6></td>
                  <td><h6>{tr.t('LABEL.USD')} {overallTotal}</h6></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mdl-cell mdl-cell--4-col margin-bottom-40">
            <h6>{tr.t('LABEL.REMARKS')}</h6>
          </div>
          <div className="mdl-cell mdl-cell--6-col margin-bottom-40">
            <h6>{invoiceInfo.description}</h6>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <p><i className="note">{tr.t('CLIENT_INVOICE.LABEL.NOTE_ELETRONIC_INVOICE')}</i></p>
          </div>
          <div className="mdl-cell mdl-cell--12-col top-margin20">
            <h6>{tr.t('CLIENT_INVOICE.LABEL.BANKING_DETAILS')}</h6>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <p>{tr.t('CLIENT_INVOICE.LABEL.ACCOUNT_NAME')}<span className="invoice-value">{settings.kcg_credit_to}</span> <br />
            {tr.t('CLIENT_INVOICE.LABEL.BANK')} <span className="invoice-value">{settings.kcg_account_name}</span><br />
            {tr.t('CLIENT_INVOICE.LABEL.ACCOUNT_NO')} <span className="invoice-value">{settings.kcg_bank_account}</span></p>
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <p>{tr.t('CLIENT_INVOICE.LABEL.BANK_CODE')} <span className="invoice-value">{settings.kcg_bank_code}</span></p>
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <p>{tr.t('CLIENT_INVOICE.LABEL.BRANCH_CODE')} <span className="invoice-value">{settings.kcg_branch_code}</span></p>
          </div>
          <div className="mdl-cell mdl-cell--12-col cta-bottom text-right">
            <a href={invoiceInfo.url} target="_blank" className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent btn-margin-right"><i className="material-icons">description</i>{tr.t('BUTTON.GENERATE_PDF')}</a>
            <button onClick={(e)=>this.invoiceSendMail(e, invoiceInfo.id)} className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--default"><i className="material-icons">mail</i>{tr.t('BUTTON.SEND_TO_MAIL')}</button>
          </div>
        </div>
      </div>
    );
  }
  invoiceSendMail(e, id) {
    e.preventDefault();
    openLoading();
    this.props.clientInvoiceSendMail(id).catch( (e) => this.setErrors(e) );
  }
  setErrors( e ) {
    this.setState(createError(e));
  }
};

export default invoiceDetails;