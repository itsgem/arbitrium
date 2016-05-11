import { connect } from 'react-redux';
import { listRoleAdmin, getAdminInfo, adminUserManagementEdit, validateUsername} from 'admin/reducers/userManagement'
import ViewUserManagementEdit from 'admin/views/userManagement/userManagementEdit';

const mapStateToProps = (state) => {
  return {
  	adminEdit: state.get('adminUserManagement').get('adminEdit'),
    adminInfo: state.get('adminUserManagement').get('adminInfo'),
    role: state.get('adminUserManagement').get('role'),
    loading: state.get('adminUserManagement').get('loading'),
    validateCompleted: state.get('adminUserManagement').get('validateCompleted')
  };
}

export default connect(mapStateToProps, {
  getAdminInfo, validateUsername, listRoleAdmin, adminUserManagementEdit
})(ViewUserManagementEdit)
