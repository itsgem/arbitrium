import { connect } from 'react-redux';
import { listRoleAdmin, validateUsername, adminProfile, adminProfileUpdate } from 'admin/reducers/userManagement'
import UserProfile from 'admin/views/userProfile/userProfile';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    loading: strMapToObj(state.get('adminUserManagement').get('loading')),
    role: strMapToObj(state.get('adminUserManagement').get('role')),
    adminProfileInfo: strMapToObj(state.get('adminUserManagement').get('adminProfileInfo')),
    validateCompleted: state.get('adminUserManagement').get('validateCompleted'),
    adminUpdate: state.get('adminUserManagement').get('adminUpdate')
  };
}

export default connect(mapStateToProps, {
validateUsername, listRoleAdmin, adminProfile, adminProfileUpdate
})(UserProfile)
