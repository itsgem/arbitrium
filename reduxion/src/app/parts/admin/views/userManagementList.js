import React from 'react';
import DocTitle from 'components/docTitle';
import UserManagementList from '../components/userManagementList';
export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.adminUserManagementList();
  },
  render() {
    return (
      <div id="client_add">
        <DocTitle
          title="Client Add"
        />
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">Admin List</label>
          <a href="/coffee/admin/account/new" className="mdl-layout__tab">Add New Admin<i className="material-icons add">add</i></a>
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