import React from 'react';
import { Link } from 'react-router';
import SubscriptionDetail from 'client/components/subscription/subscriptionDetail';
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
    if (nextProps.purchaseSuccessConfirm) {
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
    if (Object.keys(this.props.error).length){
      let notification = document.querySelector('.mdl-snackbar');
      notification.MaterialSnackbar.showSnackbar( {
          message: this.props.error.data.errors.token,
          timeout: 3000
      });
    }
    if (!this.props.loading && Object.keys(this.props.listSubscription).length && Object.keys(this.props.currentSubscription).length && Object.keys(this.props.user).length) {
      closeLoading();
      return this.renderSubscriptionDetail();
    } else {
      return this.loadingRender();
    }
  },
  renderSubscriptionDetail () {
    //let subscription = this.props.paypalPending.data.length ? true : false;
    let subscription = false;
    if (Object.keys(this.props.paypalPending).length) {
      subscription = Object.keys(this.props.paypalPending.data).length ? true : false;
    }

    return (
      <main className="mdl-layout__content subscription-type">
        { subscription && <div className="bs-callout bs-callout-info">
          <p>You have a pending subscription change to { subscription.name } { (subscription.term) ? ' (' + subscription.term + ')' : '' }.<br />To confirm, please click on the confirmation button.</p>
          <a href={ subscription.paypal_approval_url }>Confirm</a>
        </div>}
        <div className="mdl-grid mdl-grid--no-spacing table-list-container">
          <div className="mdl-cell mdl-cell--12-col header-title">
            <p>Subscription Detail</p>
          </div>
          <SubscriptionDetail
            listSubscription={this.props.listSubscription}
            currentSubscription={this.props.currentSubscription}
            clientInfo={this.props.user}
          />
        </div>
      </main>
    );
  }
});