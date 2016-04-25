import { connect } from 'react-redux';
import { adminUserManagementList, listRoleAdmin } from '../reducers/userManagement'
import { validateUsername } from '../reducers/validateUsername'
import ViewUserManagementList from '../views/userManagementList';

const mapStateToProps = (state) => {
  return {
    adminList: state.get('adminUserManagement').get('adminList'),
    role: state.get('adminUserManagement').get('role')
  };
}

export default connect(mapStateToProps, {
  adminUserManagementList, validateUsername, listRoleAdmin
})(ViewUserManagementList)
