import { connect } from 'react-redux';
import { listRoleAdmin, getAdminInfo, adminUserManagementUpdate, validateUsername, adminUnlock} from 'admin/reducers/userManagement'
import ViewUserManagementUpdate from 'admin/views/userManagement/userManagementUpdate';

const mapStateToProps = (state) => {
  return {
  	adminUpdate: state.get('adminUserManagement').get('adminUpdate'),
    adminInfo: state.get('adminUserManagement').get('adminInfo'),
    role: state.get('adminUserManagement').get('role'),
    loading: state.get('adminUserManagement').get('loading'),
    validateCompleted: state.get('adminUserManagement').get('validateCompleted'),
    adminUnlockSuccess: state.get('adminUserManagement').get('adminUnlockSuccess')
  };
}

export default connect(mapStateToProps, {
  getAdminInfo, validateUsername, listRoleAdmin, adminUserManagementUpdate, adminUnlock
})(ViewUserManagementUpdate)
