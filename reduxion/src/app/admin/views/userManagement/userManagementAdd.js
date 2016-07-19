import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import UserManagementAdd from 'admin/components/userManagement/userManagementAdd';
import { Link } from 'react-router';
import {createError} from 'utils/error';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.listRoleAdmin().catch(createError);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.registerCompleted && !nextProps.loading) {
      $('.msg').html('Admin User Successfully Added').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
      this.context.router.push('/coffee/account');
    }
  },
  render() {
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title={tr.t('ADMIN_USER_MANAGEMENT.USER_ADD.DOC_TITLE')}
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/account/">{tr.t('ADMIN_USER_MANAGEMENT.USER_LIST.FORM.TITLE')}</Link>
          <a className="mdl-layout__tab is-active">{tr.t('ADMIN_USER_MANAGEMENT.USER_ADD.FORM.TITLE')}<i className="material-icons add">add</i></a>
        </div>
        <UserManagementAdd
            validateUsername={this.props.validateUsername}
            adminUserManagementAdd={this.props.adminUserManagementAdd}
            validateCompleted={this.props.validateCompleted}
            role={this.props.role}
            />
      </div>
    );
  }
} );