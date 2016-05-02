import { connect } from 'react-redux';
import { adminUserManagementAdd, listRoleAdmin, validateUsername } from '../reducers/userManagement'
//import { validateUsername } from '../reducers/validateUsername'
import ViewUserManagementAdd from '../views/userManagementAdd';

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
