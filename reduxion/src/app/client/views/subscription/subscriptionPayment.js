import React from 'react';
import SubscriptionPayment from 'client/components/subscription/subscriptionPayment';
import NotFound from 'common/components/noMatch';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  componentWillMount() {
    let id = this.props.params.id;
    this.props.getSubscriptionItem(id)
      .catch((err) => this.setState(createError(err)));
  },
  componentWillReceiveProps(nextProps) {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }

    if (nextProps.purchaseSuccess.data) {
        let id = this.props.params.id;
        let notification = document.querySelector('.mdl-snackbar');
        notification.MaterialSnackbar.showSnackbar( {
            message: (id == 1 ? 'Successfully subscribe the Free Trial' : 'Redirecting to PayPal'),
            timeout: 3000
        });
      if (nextProps.purchaseSuccess.data.approval_url) {
        window.location = nextProps.purchaseSuccess.data.approval_url;
      } else {
        this.context.router.push('/i/subscription');
      }
    }
    if (nextProps.purchaseSuccess.errors) {
      let notification = document.querySelector('.mdl-snackbar');
      notification.MaterialSnackbar.showSnackbar( {
          message: nextProps.purchaseSuccess.errors,
          timeout: 3000
      });
    }
  },
  noContent () {
    return (
      <div className="noContent">
        <NotFound />
      </div>
    );
  },
  render () {
    if (!this.props.subscriptionItem) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.subscriptionItem).length) {
      if (!this.props.loading) {
        closeLoading();
      } else {
        openLoading();
      }
      return this.renderSubscriptionPayment();
    } else {
      return this.loadingRender();
    }
  },
  renderSubscriptionPayment () {
    return (
      <main className="mdl-layout__content subscription-type">
        <div className="mdl-grid mdl-grid--no-spacing table-list-container">
          <div className="mdl-cell mdl-cell--12-col header-title">
            <p>Subscription Payment Detail</p>
          </div>
          <SubscriptionPayment
            params = {this.props.params}
            clientPurchaseSubscription = {this.props.clientPurchaseSubscription}
            subscriptionItem = {this.props.subscriptionItem}
            subscriptionValidityPeriod = {this.props.subscriptionValidityPeriod}
            subscriptionValidity = {this.props.subscriptionValidity}
          />
        </div>
      </main>
    );
  }
});