import React from 'react';
import { Link } from 'react-router';
import SubscriptionDetail from 'client/components/subscription/subscriptionDetail';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';

export default React.createClass({
  componentDidMount () {
    this.props.subscriptionList().catch(createError);
    this.props.clientSubscription().catch(createError);
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
    if (Object.keys(this.props.listSubscription).length && Object.keys(this.props.currentSubscription).length) {
      closeLoading();
      return this.renderSubscriptionDetail();
    } else {
      return this.loadingRender();
    }
  },
  renderSubscriptionDetail () {
    return (
      <main className="mdl-layout__content subscription-type">
        <div className="mdl-grid mdl-grid--no-spacing table-list-container">
          <div className="mdl-cell mdl-cell--12-col header-title">
            <p>Subscription Detail</p>
          </div>
          <SubscriptionDetail
            listSubscription={this.props.listSubscription}
            currentSubscription={this.props.currentSubscription}
          />
        </div>
      </main>
    );
  }
});