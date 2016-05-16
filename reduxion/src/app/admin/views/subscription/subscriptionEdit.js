import React from 'react';
import DocTitle from 'common/components/docTitle';
import SubscriptionEdit from 'admin/components/subscription/subscriptionEdit';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.listRoleAdmin();
    this.props.getSubscriptionInfo(this.props.params.id);
  },
  render() {
    if (this.props.subscriptionInfo.get("data")) {
      return this.renderSubscriptionInfo();
    } else {
       return (
        <div id="subscription" className="inner_content"></div>
      );
    }
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.subscriptionEdit && !nextProps.loading) {
      $('.msg').html('Subscription Successfully Updated').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
      this.context.router.push('/coffee/subscription');
    }
  },
  renderSubscriptionInfo() {
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title="Subscription Add"
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/subscription/">Subscription List</Link> 
          <Link
              className='mdl-layout__tab'
              to="/coffee/subscription/new">Add New Subscription<i className="material-icons add">add</i></Link>
          <a className="mdl-layout__tab is-active" >VIEW SUBSCRIPTION<i className="material-icons add">edit</i></a>
        </div>
        <SubscriptionEdit
          validateUsername={this.props.validateUsername}
          subscriptionInfo={this.props.subscriptionInfo}
          adminSubscriptionEdit={this.props.adminSubscriptionEdit}
          validateCompleted={this.props.validateCompleted}
          subscriptionEdit={this.props.subscriptionEdit}
          role={this.props.role}
          />
      </div>
    );
  }
} );