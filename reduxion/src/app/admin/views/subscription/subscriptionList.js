import React from 'react';
import DocTitle from 'common/components/docTitle';
import SubscriptionList from 'admin/components/subscription/subscriptionList';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.adminSubscriptionList({per_page: 10});
  },
  // componentWillReceiveProps(nextProps) {
  //   if (!nextProps.loading) {
  //     nextProps.adminSubscriptionList({per_page: 10});
  //   }
  // },
  render() {
    return (
      <div id="subscription_add_or_change">
        <DocTitle
          title="Subscriptions"
        />
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">View Subscriptions</label>
        </div>
        <SubscriptionList
          adminSubscriptionList={this.props.adminSubscriptionList}
          />
      </div>
    );
  }
} );