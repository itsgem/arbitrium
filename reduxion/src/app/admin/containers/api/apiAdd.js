import { connect } from 'react-redux';
import { registerApi, getApiPermission } from 'admin/reducers/api'
import { adminClientList } from 'admin/reducers/clientProfile'
import ApiAdd from 'admin/views/api/apiAdd';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}


const mapStateToProps = (state) => {
  return {
    loading: state.get('AdminApi').get('loading'),
    apiPermissions: strMapToObj(state.get('AdminApi').get('apiPermissions')),
    clientList: strMapToObj(state.get('clientadmin').get('clientList')),
  };
}

export default connect(mapStateToProps, {
  registerApi, adminClientList, getApiPermission
})(ApiAdd)
