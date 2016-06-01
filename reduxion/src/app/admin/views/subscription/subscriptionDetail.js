import React from 'react';
import { Link } from 'react-router';
import SubscriptionDetail from 'admin/components/subscription/subscriptionDetail';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    let id = this.props.params.subscription_id;
    this.props.clientSubscriptionInfo(this.props.params.client_id).catch(createError);
    this.props.selectedSubscriptionInfo(id).catch(createError);
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
      $('.msg').html('Successfully sent approval URL to client to complete the subscription change.').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(5000);
      });
      this.context.router.push('/coffee/subscription');
    }
  },
  render() {
    if (Object.keys(this.props.subscriptionInfoSelected).length && Object.keys(this.props.subscriptionInfoClient).length) {
      if (!this.props.loading) {
        closeLoading();
      } else {
        openLoading();
      }
      return this.renderSubscriptionDetail();
    } else {
      return this.loadingRender();
    }
  },
  renderSubscriptionDetail () {
    return (
      <div id="client_add" className="auth-view">
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/subscription/">Subscriptions List</Link>
          <Link
            className='mdl-layout__tab'
            to={"/coffee/subscription/client/" + this.props.params.client_id}>Subscription Detail</Link>
          <a className="mdl-layout__tab is-active" >SUBSCRIPTION PAYMENT DETAIL<i className="material-icons add">edit</i></a>
        </div>
        <SubscriptionDetail
          params = {this.props.params}
          clientSubscriptionInfo = {this.props.subscriptionInfoClient}
          selectedSubscriptionInfo = {this.props.subscriptionInfoSelected}
          adminChangeSubscription = {this.props.adminChangeSubscription}
        />
      </div>
    );
  }
});