import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import UserManagementUpdate from 'admin/components/userManagement/userManagementUpdate';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'
import {createError} from 'utils/error';
import NotFound from 'common/components/noMatch';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.listRoleAdmin().catch(createError);
    this.props.getAdminInfo(this.props.params.id).catch(createError);
  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  noContent () {
    return (
      <div className="noContent">
        <NotFound />
      </div>
    );
  },
  render () {
    if (!this.props.adminInfo) {
      closeLoading();
      return this.noContent();
    }

    if (Object.keys(this.props.adminInfo).length && Object.keys(this.props.role).length) {
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
      this.context.router.push('/coffee/settings/account');
    }
    if (nextProps.adminUnlockSuccess && !nextProps.loading) {
      $('.msg').html('User Successfully Unlocked').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
      this.props.getAdminInfo(this.props.params.id).catch(createError);
    }
  },
  renderAdminInfo() {
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title={tr.t('ADMIN_USER_MANAGEMENT.USER_UPDATE.DOC_TITLE')}
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/settings/account">{tr.t('ADMIN_USER_MANAGEMENT.USER_LIST.TITLE')}</Link>
          <Link
              className='mdl-layout__tab'
              to="/coffee/settings/account/new">{tr.t('ADMIN_USER_MANAGEMENT.USER_ADD.TITLE')}<i className="material-icons add">add</i></Link>
          <a className="mdl-layout__tab is-active" >{tr.t('ADMIN_USER_MANAGEMENT.USER_UPDATE.TITLE')}<i className="material-icons add">edit</i></a>
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