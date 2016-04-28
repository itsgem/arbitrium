import { connect } from 'react-redux';
import { listRoleAdmin, getAdminInfo, adminUserManagementEdit} from '../reducers/userManagement'
import { validateUsername } from '../reducers/validateUsername'
import ViewUserManagementEdit from '../views/userManagementEdit';

const mapStateToProps = (state) => {
  return {
  	adminEdit: state.get('adminUserManagement').get('adminEdit'),
    adminInfo: state.get('adminUserManagement').get('adminInfo'),
    role: state.get('adminUserManagement').get('role'),
    loading: state.get('adminUserManagement').get('loading'),
    validateCompleted: state.get('validateUsername').get('validateCompleted')
  };
}

export default connect(mapStateToProps, {
  getAdminInfo, validateUsername, listRoleAdmin, adminUserManagementEdit
})(ViewUserManagementEdit)
