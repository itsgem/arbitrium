import React from 'react';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    // this.props.subscriptionList().catch(createError);
    // this.props.clientSubscription().catch(createError);
    // this.props.clientProfile().catch(createError);
    // this.props.clientSubscriptionPending().catch(createError);
  },
  componentWillMount () {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
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
      <section>
          <div className="mdl-grid content">
            <div className="mdl-cell mdl-cell--6-col">
              <h6>USERNAME</h6>
              <p>juandelacruz1</p>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <h6>USER ID</h6>
              <p>001</p>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <h6>IP ADDRESS</h6>
              <p>192.168.1.1</p>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <h6>STATUS CODE</h6>
              <p>200</p>
            </div>
            <div className="mdl-cell mdl-cell--6-col bottom-margin">
              <h6>URL</h6>
              <p>http://www.testinggrounds.com/api</p>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <h6>DATE CREATED</h6>
              <p>October 31, 2016 7:45 AM</p>
            </div>
            <div className="mdl-cell mdl-cell--12-col">
              <h6>PARAMETER</h6>
              <pre className="script script-box-container">
                [API key]
              </pre>
            </div>
            <div className="mdl-cell mdl-cell--12-col">
              <h6>RESPONSE</h6>
              <pre className="script script-box-container">
                [API key]
              </pre>
            </div>
          </div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
              <Link to="/i/apilogs/222" className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent">
                Download Logs
              </Link>
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