import { connect } from 'react-redux';
import { getApiKey, getApiPermission, updateApiKey } from 'admin/reducers/api'
import { clientProfile } from 'admin/reducers/clientProfile'
import ApiUpdate from 'admin/views/api/apiUpdate';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}


const mapStateToProps = (state) => {
  return {
    loading: state.get('AdminApi').get('loading'),
    loadingCLient: state.get('clientadmin').get('loading'),
    apiPermissions: strMapToObj(state.get('AdminApi').get('apiPermissions')),
    getApiInfo: strMapToObj(state.get('AdminApi').get('getApiInfo')),
    clientProfileSuccess: strMapToObj(state.get('clientadmin').get('clientProfileSuccess')),
    apiUpdateSuccess: strMapToObj(state.get('AdminApi').get('apiUpdateSuccess'))
  };
}

export default connect(mapStateToProps, {
  getApiKey, getApiPermission, clientProfile, updateApiKey
})(ApiUpdate)
