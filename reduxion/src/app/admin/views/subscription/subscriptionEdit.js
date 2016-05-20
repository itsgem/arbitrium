import React from 'react';
import DocTitle from 'common/components/docTitle';
import SubscriptionEdit from 'admin/components/subscription/subscriptionEdit';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.allSubscriptions();
    this.props.clientSubscriptionInfo(this.props.params.id);
  },
  render() {
    if (Object.keys(this.props.subscriptions).length && Object.keys(this.props.subscriptionInfoClient).length) {
      return this.renderSubscriptions();
    } else {
       return (
        <div id="subscription" className="inner_content"></div>
      );
    }
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
            to="/coffee/subscription/">Subscriptions List</Link>
          <a className="mdl-layout__tab is-active" >VIEW SUBSCRIPTIONS<i className="material-icons add">edit</i></a>
        </div>
        <SubscriptionEdit
          allSubscriptions={this.props.subscriptions}
          clientSubscriptionInfo={this.props.subscriptionInfoClient}
          />
      </div>
    );
  }
} );