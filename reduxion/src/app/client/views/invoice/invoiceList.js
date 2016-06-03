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
        <div className="filter-search">
          <form action="#">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">
                <p>Filter / Search</p>
              </div>
            </div>
            <div className="mdl-grid filter-search-bar">
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                  <input className="mdl-textfield__input font-input" id="terms-of-subscription" value="06/02/2016"/>
                  <label className="mdl-textfield__label" htmlFor="sample1">Invoice Date From...</label>
                </div>
              </div>

              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                  <input className="mdl-textfield__input font-input" id="terms-of-subscription" value="06/02/2016"/>
                  <label className="mdl-textfield__label" htmlFor="sample1">Invoice Date To...</label>
                </div>
              </div>

              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input font-input" id="username"/>
                  <label className="mdl-textfield__label" htmlFor="sample1">Invoice Number...</label>
                </div>
              </div>

              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                  <input className="mdl-textfield__input font-input" id="terms-of-subscription" value="Paid"/>
                  <label className="mdl-textfield__label" htmlFor="sample1">Invoice Status...</label>
                </div>
              </div>

              <div className="mdl-cell mdl-cell--4-col search-cta">
                <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent"><i className="material-icons">search</i>Search</button>
                <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--default"><i className="material-icons">clear</i>Clear</button>
              </div>
            </div>

          </form>

          <table className="mdl-data-table mdl-js-data-table table-list">
            <thead>
              <tr>
                <th className="mdl-data-table__cell--non-numeric">Invoice Date</th>
                <th className="mdl-data-table__cell--non-numeric">Invoice Number</th>
                <th className="mdl-data-table__cell--non-numeric">Invoice Status</th>
                <th className="mdl-data-table__cell--non-numeric">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">23 May 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000001</td>
                <td className="mdl-data-table__cell--non-numeric">Paid</td>
                <td className="mdl-data-table__cell--non-numeric narrow-col">
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">12 January 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000002</td>
                <td className="mdl-data-table__cell--non-numeric">Cancelled</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">09 February 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000003</td>
                <td className="mdl-data-table__cell--non-numeric">Pending</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">01 March 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000004</td>
                <td className="mdl-data-table__cell--non-numeric">Paid</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">29 April 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000005</td>
                <td className="mdl-data-table__cell--non-numeric">Cancelled</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">17 July 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000006</td>
                <td className="mdl-data-table__cell--non-numeric">Pending</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">31 August 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000007</td>
                <td className="mdl-data-table__cell--non-numeric">Pending</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">20 September 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000008</td>
                <td className="mdl-data-table__cell--non-numeric">Cancelled</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">07 January 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000009</td>
                <td className="mdl-data-table__cell--non-numeric">Paid</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">19 February 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000010</td>
                <td className="mdl-data-table__cell--non-numeric">Pending</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mdl-grid pagination">
            <div className="mdl-cell mdl-cell--3-col">

            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">FIRST</button>
              <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">
                <i className="material-icons">keyboard_arrow_left</i>
              </button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-active">1</button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-normal">2</button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-normal">3</button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-normal">4</button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-normal">5</button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-blue">
                <i className="material-icons">keyboard_arrow_right</i>
              </button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-blue">LAST</button>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page">10</button>
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