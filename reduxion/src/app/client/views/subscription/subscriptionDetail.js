import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import SubscriptionDetail from 'client/components/subscription/subscriptionDetail';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {
      error: false
    };
  },
  componentWillMount () {
    this.props.subscriptionList()
      .then(()=> this.props.clientSubscription())
      .then(()=> this.props.clientProfile())
      .then(()=> this.props.clientSubscriptionPending())
      .catch((err) => this.setState(createError(err)));
  },
  componentWillReceiveProps(nextProps) {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }

    let query = this.props.location.query;
    if (query.success && query.token) {
      if (nextProps.purchaseProcessingConfirm) {
        this.context.router.push('/i/subscription');
      } else {
        let payload = {
          success: query.success == 'true' ? true : false,
          token: query.token
        };

        if (query.paymentId && query.PayerID) {
          payload.payment_id = query.paymentId;
          payload.payer_id = query.PayerID;
        }

        this.props.clientPurchaseSubscriptionConfirm(payload).catch(createError);
      }
    }

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
    if (Object.keys(this.props.error).length && this.state.error == false){
      let notification = document.querySelector('.mdl-snackbar');
      notification.MaterialSnackbar.showSnackbar( {
          message: tr.t('NOTEFICATION_MESSAGE.UNABLE_CONFIRM_SUBSCRIPTION'),
          timeout: 3000
      });
      this.setState({error: true});
    }
    if (!this.props.loading && !this.props.purchaseProcessingConfirm && !this.props.purchaseSuccessConfirm && Object.keys(this.props.listSubscription).length && Object.keys(this.props.currentSubscription).length && Object.keys(this.props.user).length) {
      closeLoading();
      return this.renderSubscriptionDetail();
    } else {
      return this.loadingRender();
    }
  },
  renderSubscriptionDetail () {
    //let subscription = this.props.paypalPending.data.length ? true : false;
    let subscription = {};
    let isSubscription = false;
    let subscriptionTerm = "";
    if (Object.keys(this.props.paypalPending).length) {
      isSubscription = Object.keys(this.props.paypalPending.data).length ? true : false;
      subscription = this.props.paypalPending.data;

      if (subscription.is_auto_renew != 1) {
        subscriptionTerm = subscription.term == "Annually" ? tr.t('LABEL.1_YEAR') : tr.t('LABEL.1_MONTH');
      } else {
        subscriptionTerm = subscription.term;
      }
    }
    return (
      <main className="mdl-layout__content subscription-type">
        <DocTitle
          title={tr.t('CLIENT_SUBCRIPTION.SUBSCRIPTION_DETAIL.DOC_TITLE')}
        />
        { isSubscription && <div className="bs-callout bs-callout-info">
          <p>{tr.t('NOTEFICATION_MESSAGE.PENDING_SUBSCRIPTION')} { subscription.name } {' (' + subscriptionTerm + ') '}.<br />{tr.t('NOTEFICATION_MESSAGE.TO_CONFIRM_SUBSCRIPTION')}</p>
          <a className="margin-right-10" href={ subscription.paypal_approval_url }>Confirm</a>
          <a href="#" onClick={(e) => {this.cancelPendingSubscription(e)}}>{tr.t('BUTTON.CANCEL')}</a>
        </div>}
        <div className="mdl-grid mdl-grid--no-spacing table-list-container">
          <div className="mdl-cell mdl-cell--12-col header-title">
            <p>{tr.t('CLIENT_SUBCRIPTION.SUBSCRIPTION_DETAIL.TITLE')}</p>
          </div>
          <SubscriptionDetail
            listSubscription={this.props.listSubscription}
            currentSubscription={this.props.currentSubscription}
            clientInfo={this.props.user}
          />
        </div>
      </main>
    );
  },
  cancelPendingSubscription(e) {
    e.preventDefault();
    this.props.clientSubscriptionCancelPending().catch(createError);
  }
});