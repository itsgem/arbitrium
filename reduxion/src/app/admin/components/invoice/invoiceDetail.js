import React from 'react';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'
import {modal, openModal, closeModal} from 'common/components/modal'

class InvoiceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      id: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
    modal();
  }
  loadingRender () {
    if (!this.props.loading && this.props.successMailSent) {
      let notification = document.querySelector('.mdl-snackbar');
      notification.MaterialSnackbar.showSnackbar( {
        message: "Successfully sent invoice to your email ",
        timeout: 3000
      });
      closeLoading();
    }
    return (
      <div className="loading"></div>
    );
  }
  render () {
    let adminInvoiceDetail = this.props.adminInvoiceDetail.data;
    let invoiceDetail = adminInvoiceDetail.invoice_details;
    let settings = adminInvoiceDetail.system_settings;
    let overallTotal = '0.00';
    let subtotal = '0.00';

    return (
      <div className="mdl-layout__content mdl-js-layout">
        <div className="mdl-grid table-list-container">
          <div className="mdl-layout__panel is-active" id="#">
            <div className="content-container">
              <div className="mdl-grid content">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6 className="right-align">BILLING INVOICE</h6>
                  <br/>
                  <p className="right-align">{settings.kcg_company_name}</p>
                  <p className="right-align">{settings.kcg_street_address}, {settings.kcg_state}, {settings.kcg_country}</p>
                  <br/>
                  <h6>Other Information:</h6>
                  <br/>
                  <p>{adminInvoiceDetail.rep_first_name} {adminInvoiceDetail.rep_last_name}</p>
                  <p>{adminInvoiceDetail.company_name}</p>
                  <p>{adminInvoiceDetail.street_address_1}, {adminInvoiceDetail.city}, {adminInvoiceDetail.state}</p>
                  <br/>
                </div>
                <div className="mdl-cell mdl-cell--4-col">
                  <p>Invoice No.: <span className="invoice-value">{adminInvoiceDetail.invoice_no}</span></p>
                </div>
                <div className="mdl-cell mdl-cell--4-col">
                  <p>Invoice Date: <span className="invoice-value">{adminInvoiceDetail.invoiced_at}</span></p>
                  <br/>
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
                          invoiceDetail && invoiceDetail.map(item => {
                            overallTotal = parseFloat( parseFloat(overallTotal) + parseFloat(item.amount)).toFixed(2);
                            subtotal = parseFloat( parseFloat(overallTotal) - parseFloat(adminInvoiceDetail.discounts)).toFixed(2);
                            return <tr key={item.id}><td className="text-left">{item.name}</td>
                            <td className="text-left">Subsription</td>
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
                <div className="mdl-cell mdl-cell--12-col">
                  <p><i className="note">This is an Electronic invoice. No signature is required.</i></p>
                </div>
                <div className="mdl-cell mdl-cell--12-col top-margin20">
                  <h6>Banking Details:</h6>
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                  <p>Account Name: <span className="invoice-value">{settings.kcg_credit_to}</span></p>
                  <p>Bank: <span className="invoice-value">{settings.kcg_account_name}</span></p>
                  <p>Account No.: <span className="invoice-value">{settings.kcg_bank_account}</span></p>
                </div>
                <div className="mdl-cell mdl-cell--4-col">
                  <p>Bank Code: <span className="invoice-value">{settings.kcg_bank_code}</span></p>
                </div>
                <div className="mdl-cell mdl-cell--4-col">
                  <p>Branch Code: <span className="invoice-value">{settings.kcg_branch_code}</span></p>
                </div>
                <div className="mdl-cell mdl-cell--12-col cta-bottom">
                  <a href={adminInvoiceDetail.url} target="_blank" className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent btn-margin-right"><i className="material-icons">description</i>GENERATE PDF</a>
                  <button onClick={(e)=>this.invoiceSendMail(e, adminInvoiceDetail.id)} className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--default"><i className="material-icons">mail</i>SEND TO EMAIL</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  formClassNames( field, errors ) {
    return cx('mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    });
  }

  invoiceSendMail(e, id) {
    e.preventDefault();
    openLoading();
    this.props.adminInvoiceDetailSendEmail(id);
  }

  setErrors(e) {
    this.setState(createError(e));
  }
};

InvoiceDetail.mixins = [LinkedStateMixin];
InvoiceDetail.defaultProps = {
    errors: []
};
export default InvoiceDetail;