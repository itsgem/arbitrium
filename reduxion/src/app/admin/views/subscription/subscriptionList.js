import React from 'react';
import tr from 'i18next';
import DocTitle from 'common/components/docTitle';
import SubscriptionList from 'admin/components/subscription/subscriptionList';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.adminSubscriptionList({per_page: 10});
  },
  render() {
    return (
      <div id="subscription_add_or_change">
        <DocTitle
          title={tr.t('ADMIN_SUBSCRIPTION.SUBSCRIPTION_LIST.DOC_TITLE')}
        />
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">{tr.t('ADMIN_SUBSCRIPTION.SUBSCRIPTION_LIST.FORM.TITLE')}</label>
        </div>
        <SubscriptionList
          subscriptionList={this.props.subscriptionList}
          adminSubscriptionList={this.props.adminSubscriptionList}
          />
      </div>
    );
  }
} );