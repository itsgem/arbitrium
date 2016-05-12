import React from 'react';
import DocTitle from 'common/components/docTitle';
import UserManagementUpdate from 'admin/components/userManagement/userManagementUpdate';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.listRoleAdmin();
    this.props.getAdminInfo(this.props.params.id);
  },
  render() {
    if (this.props.adminInfo.get("data")) {
      return this.renderAdminInfo();
    } else {
       return (
        <div id="client" className="inner_content"></div>
      );
    }
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.adminUpdate && !nextProps.loading) {
      $('.msg').html('Client Successfully Updated').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
      this.context.router.push('/coffee/account');
    }
  },
  renderAdminInfo() {
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title="Client Add"
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/account/">Admin List</Link>
          <Link
              className='mdl-layout__tab'
              to="/coffee/account/new">Add New Admin<i className="material-icons add">add</i></Link>
          <a className="mdl-layout__tab is-active" >VIEW ADMIN<i className="material-icons add">edit</i></a>
        </div>
        <UserManagementUpdate
          validateUsername={this.props.validateUsername}
          adminInfo={this.props.adminInfo}
          adminUserManagementUpdate={this.props.adminUserManagementUpdate}
          validateCompleted={this.props.validateCompleted}
          adminUpdate={this.props.adminUpdate}
          role={this.props.role}
          />
      </div>
    );
  }
} );