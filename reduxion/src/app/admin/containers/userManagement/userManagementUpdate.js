import { connect } from 'react-redux';
import { listRoleAdmin, getAdminInfo, adminUserManagementUpdate, validateUsername} from 'admin/reducers/userManagement'
import ViewUserManagementUpdate from 'admin/views/userManagement/userManagementUpdate';

const mapStateToProps = (state) => {
  return {
  	adminUpdate: state.get('adminUserManagement').get('adminUpdate'),
    adminInfo: state.get('adminUserManagement').get('adminInfo'),
    role: state.get('adminUserManagement').get('role'),
    loading: state.get('adminUserManagement').get('loading'),
    validateCompleted: state.get('adminUserManagement').get('validateCompleted')
  };
}

export default connect(mapStateToProps, {
  getAdminInfo, validateUsername, listRoleAdmin, adminUserManagementUpdate
})(ViewUserManagementUpdate)
