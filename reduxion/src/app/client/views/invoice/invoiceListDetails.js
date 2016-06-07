import React from 'react';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    this.props.subscriptionList().catch(createError);
    this.props.clientSubscription().catch(createError);
    this.props.clientProfile().catch(createError);
    this.props.clientSubscriptionPending().catch(createError);
  },
  componentWillMount () {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }

    let query = this.props.location.query;
    if (query.success && query.token) {
      let payload = {
        success: query.success == 'true' ? true : false,
        token: query.token
      };
      this.props.clientPurchaseSubscriptionConfirm(payload).catch(createError);
      this.context.router.push('/i/subscription');
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.purchaseSuccessConfirm || nextProps.paypalPendingCancel) {
      this.props.subscriptionList().catch(createError);
      this.props.clientSubscription().catch(createError);
      this.props.clientProfile().catch(createError);
      this.props.clientSubscriptionPending().catch(createError);
    }
  },

  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  render() {
    // if (Object.keys(this.props.error).length){
    //   let notification = document.querySelector('.mdl-snackbar');
    //   notification.MaterialSnackbar.showSnackbar( {
    //       message: this.props.error.data.errors.token,
    //       timeout: 3000
    //   });
    // }
    // if (!this.props.loading && !this.props.purchaseProcessingConfirm && !this.props.purchaseSuccessConfirm && Object.keys(this.props.listSubscription).length && Object.keys(this.props.currentSubscription).length && Object.keys(this.props.user).length) {
    //   closeLoading();
    //   return this.renderSubscriptionDetail();
    // } else {
    //   return this.loadingRender();
    // }
    return (
      <section>
        <div className="mdl-grid table-list-container table-invoice">
          <div className="content-container">
            <div className="mdl-grid content">
              <div className="mdl-cell mdl-cell--12-col">
                <h6>INVOICE DETAIL</h6>
              </div>
              <div className="mdl-cell mdl-cell--12-col">
                <h6 className="text-right">BILLING INVOICE</h6>
                <p className="text-right">Arbitrium Group <br />
                1234 Lorem Street, Ipsum City, NM 123456</p>
                <br/>
                <br/>
                <h6>Other Information:</h6>
                <p>Johnny Doe<br/>
                Client Company<br/>
                4321 Client Ave., Client City, NM 123456</p>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <p>Invoice No.: <span className="invoice-value">000000000001</span></p>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <p>Invoice Date: <span className="invoice-value">07/02/2016</span></p>
                <br/>
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
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Discount</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="left-align">Subsription-Standard</td>
                      <td className="left-align">Subsription</td>
                      <td>1</td>
                      <td>$100.00</td>
                      <td>$5.00</td>
                      <td>$95.00</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td><h6 className="no-margin">OVERALL TOTAL</h6></td>
                      <td><h6 className="no-margin">USD $95.00</h6></td>
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
                <p>Account Name: <span className="invoice-value">Johnny Doe</span> <br />
                Bank: <span className="invoice-value">Bank of Lorem</span><br />
                Account No.: <span className="invoice-value">000123456789</span></p>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <p>Bank Code: <span className="invoice-value">7171</span></p>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <p>Branch Code: <span className="invoice-value">081</span></p>
              </div>
              <div className="mdl-cell mdl-cell--12-col cta-bottom text-right">
                <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent btn-margin-right"><i className="material-icons">description</i>GENERATE PDF</button>
                <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--default"><i className="material-icons">mail</i>SEND TO EMAIL</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
  renderSubscriptionDetail () {
    //let subscription = this.props.paypalPending.data.length ? true : false;
    let subscription = {};
    let isSubscription = false;
    let paypalPendingCancel = {};
    if (Object.keys(this.props.paypalPending).length) {
      isSubscription = Object.keys(this.props.paypalPending.data).length ? true : false;
      subscription = this.props.paypalPending.data;
      paypalPendingCancel = this.props.paypalPendingCancel.data;

    }
    return (
      <main className="mdl-layout__content subscription-type">
        { isSubscription && <div className="bs-callout bs-callout-info">
          <p>You have a pending subscription change to { subscription.name } { (subscription.term) ? ' (' + subscription.term + ')' : '' }.<br />To confirm, please click on the confirmation button.</p>
          <a className="margin-right-10" href={ subscription.paypal_approval_url }>Confirm</a>
          <a href="#" onClick={(e) => {this.cancelPendingSubscription(e)}}>Cancel</a>
        </div>}
        <div className="mdl-grid mdl-grid--no-spacing table-list-container">
          <div className="mdl-cell mdl-cell--12-col header-title">
            <p>Subscription Detail</p>
          </div>
        </div>
      </main>
    );
  },
  cancelPendingSubscription(e) {
    e.preventDefault();
    this.props.clientSubscriptionCancelPending().catch(createError);
  }
});