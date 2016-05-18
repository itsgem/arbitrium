import React from 'react';
import DocTitle from 'common/components/docTitle';
import UserManagementUpdate from 'admin/components/userManagement/userManagementUpdate';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.listRoleAdmin();
    this.props.getAdminInfo(this.props.params.id);
  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  render() {
    if (this.props.adminInfo.get("data")) {
      closeLoading();
      return this.renderAdminInfo();
    } else {
      return this.loadingRender();
    }
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.adminUpdate && !nextProps.loading) {
      $('.msg').html('Admin User Successfully Updated').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
      this.context.router.push('/coffee/account');
    }
    if (nextProps.adminUnlockSuccess && !nextProps.loading) {
      $('.msg').html('User Successfully Unlocked').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
      this.props.getAdminInfo(this.props.params.id);
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
          adminUnlock={this.props.adminUnlock}
          />
      </div>
    );
  }
} );