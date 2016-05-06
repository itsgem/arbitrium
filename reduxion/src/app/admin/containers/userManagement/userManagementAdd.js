import { connect } from 'react-redux';
import { adminUserManagementAdd, listRoleAdmin, validateUsername } from 'admin/reducers/userManagement'
import ViewUserManagementAdd from 'admin/views/usermanagement/userManagementAdd';

const mapStateToProps = (state) => {
  return {
    adminAdd: state.get('adminUserManagement').get('adminAdd'),
    role: state.get('adminUserManagement').get('role'),
    registerCompleted: state.get('adminUserManagement').get('registerCompleted'),
    validateCompleted: state.get('adminUserManagement').get('validateCompleted')
  };
}

export default connect(mapStateToProps, {
  adminUserManagementAdd, validateUsername, listRoleAdmin
})(ViewUserManagementAdd)
