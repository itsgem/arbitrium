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


  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  render() {
    return (
      <main className="mdl-layout__content">
        <div className="page-content">
          <form method="post">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col">
                <legend>System Settings</legend>
              </div>
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="Kosh Consulting Group (Asia) PTE. LTD."/>
                  <label className="mdl-textfield__label" htmlFor="title">Company Name</label> 
                </div>
              </div> 
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label" htmlFor="title">Billing Info</label> 
                </div>
              </div> 
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="Cebu City"/>
                  <label className="mdl-textfield__label" htmlFor="title">City</label> 
                </div>
              </div> 
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="#03-24 Far East Shooping Center"/>
                  <label className="mdl-textfield__label" htmlFor="title">State</label> 
                </div>
              </div>

              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="Singapore"/>
                  <label className="mdl-textfield__label" htmlFor="title">Country</label> 
                </div>
              </div> 
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="238882"/>
                  <label className="mdl-textfield__label" htmlFor="title">Postal Code</label> 
                </div>
              </div>                 
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label" htmlFor="title">Admin Email</label> 
                </div>
              </div> 
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="14400"/>
                  <label className="mdl-textfield__label" htmlFor="title">Token Expiry</label> 
                </div>
              </div> 
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="10"/>
                  <label className="mdl-textfield__label" htmlFor="title">Items Per Page</label> 
                </div>
              </div> 
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <p>Other settings textfield 1</p>
                </div>
              </div> 
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label" htmlFor="title">Other settings 1</label> 
                </div>
              </div> 
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <p>Other settings textfield 2</p>
                </div>
              </div> 
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label" htmlFor="title">Other settings 2</label> 
                </div>
              </div> 
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">
                <legend>Billing Information</legend>              
              </div>
              <div className="mdl-cell mdl-cell--12-col">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor ergo, id est summum malum, metuetur semper, etiamsi non aderit</p>
              </div>
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label" htmlFor="title">Account Name</label> 
                </div>
              </div> 
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label" htmlFor="title">Credit To</label> 
                </div>
              </div> 
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label" htmlFor="title">Bank Account</label> 
                </div>
              </div> 
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label" htmlFor="title">Bank Account Code</label> 
                </div>
              </div> 
            </div>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col">  
                <button className="mdl-button mdl-button--accent">Save</button>
              </div> 
            </div>
          </form>
        </div>
      </main>
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