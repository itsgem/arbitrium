import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import UserManagementList from 'admin/components/userManagement/userManagementList';
import { Link } from 'react-router';
import {createError} from 'utils/error';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.adminUserManagementList({per_page: 10}).catch(createError);
  },
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && nextProps.adminDelete) {
      nextProps.adminUserManagementList({per_page: 10}).catch(createError);
    }
  },
  render() {
    return (
      <div id="client_add">
        <DocTitle
          title={tr.t('ADMIN_USER_MANAGEMENT.USER_LIST.DOC_TITLE')}
        />
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">{tr.t('ADMIN_USER_MANAGEMENT.USER_LIST.FORM.TITLE')}</label>
          <Link
              className='mdl-layout__tab'
              to="/coffee/account/new">{tr.t('ADMIN_USER_MANAGEMENT.USER_ADD.FORM.TITLE')}<i className="material-icons add">add</i></Link>
        </div>
        <UserManagementList
          deleteAdminAccount={this.props.deleteAdminAccount}
          adminList={this.props.adminList}
          adminUserManagementList={this.props.adminUserManagementList}
          />
      </div>
    );
  }
} );