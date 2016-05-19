import React from 'react';
import { Link } from 'react-router';
import SubscriptionPayment from 'client/components/subscription/subscriptionPayment';
import {openLoading, closeLoading} from 'common/components/modal'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    let id = this.props.params.id;
    this.props.getSubscriptionItem(id);
    // this.props.clientSubscription();
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.purchaseSuccess) {
      let notification = document.querySelector('.mdl-snackbar');
      notification.MaterialSnackbar.showSnackbar( {
          message: 'Subscription success',
          timeout: 3000
      });
      this.context.router.push('/i/subscription');
    }
  },
  render() {
    if (Object.keys(this.props.subscriptionItem).length && !this.props.loading) {
      closeLoading();
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
          />
        </div>
      </main>
    );
  }
});