import React from 'react';
import DocTitle from 'common/components/docTitle';
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
          title="Client Add"
        />
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">Admin List</label>
          <Link
              className='mdl-layout__tab'
              to="/coffee/account/new">Add New Admin<i className="material-icons add">add</i></Link>
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