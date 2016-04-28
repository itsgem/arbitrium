import { connect } from 'react-redux';
import { adminUserManagementList, deleteAdminAccount} from '../reducers/userManagement'
import ViewUserManagementList from '../views/userManagementList';

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
