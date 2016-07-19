import React from 'react';
import tr from 'i18next';
import DocTitle from 'common/components/docTitle';
import SubscriptionEdit from 'admin/components/subscription/subscriptionEdit';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'
import NotFound from 'common/components/noMatch';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.allSubscriptions();
    this.props.clientSubscriptionInfo(this.props.params.client_id);
    this.props.clientProfile(this.props.params.client_id);
  },
  noContent () {
    return (
      <div className="noContent">
        <NotFound />
      </div>
    );
  },
  render () {
    if (!this.props.subscriptionInfoClient) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.subscriptions).length && Object.keys(this.props.subscriptionInfoClient).length && Object.keys(this.props.clientInfo).length) {
      closeLoading();
      return this.renderSubscriptions();
    } else {
      return this.loadingRender();
    }
  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  renderSubscriptions() {
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title="Subscription Detail"
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/subscription/">{tr.t('ADMIN_SUBSCRIPTION.SUBSCRIPTION_LIST.TITLE')}</Link>
          <a className="mdl-layout__tab is-active" >{tr.t('ADMIN_SUBSCRIPTION.SUBSCRIPTION_DETAIL.TITLE')}<i className="material-icons add">edit</i></a>
        </div>
        <SubscriptionEdit
          allSubscriptions={this.props.subscriptions}
          clientSubscriptionInfo={this.props.subscriptionInfoClient}
          clientProfile={this.props.clientInfo}
          />
      </div>
    );
  }
});