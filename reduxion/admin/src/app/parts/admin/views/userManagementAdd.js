import React from 'react';
import DocTitle from 'components/docTitle';
import UserManagementAdd from '../components/userManagementAdd';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.listRoleAdmin();
  },
  renderSuccess () {
    if (this.props.registerCompleted) {
      $('.msg').html('Client successfully added').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
    }
  },
  render() {
    this.renderSuccess();
    if (this.props.registerCompleted) {
      this.context.router.push('/coffee/account');
    }
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title="Client Add"
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/account/">Admin List</Link>
          <a className="mdl-layout__tab is-active">Add New Admin<i className="material-icons add">add</i></a>
        </div>
        <UserManagementAdd
            validateUsername={this.props.validateUsername}
            adminUserManagementAdd={this.props.adminUserManagementAdd}
            role={this.props.role}
            />
      </div>
    );
  }
} );