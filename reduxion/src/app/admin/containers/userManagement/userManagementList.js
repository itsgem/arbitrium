import { connect } from 'react-redux';
import { adminUserManagementList, deleteAdminAccount} from 'admin/reducers/userManagement'
import ViewUserManagementList from 'admin/views/userManagement/userManagementList';

const mapStateToProps = (state) => {
  return {
    adminList: state.get('adminUserManagement').get('adminList'),
    adminDelete: state.get('adminUserManagement').get('adminDelete'),
    loading: state.get('adminUserManagement').get('loading'),
    role: state.get('adminUserManagement').get('role')
  };
}

export default connect(mapStateToProps, {
  adminUserManagementList, deleteAdminAccount
})(ViewUserManagementList)
