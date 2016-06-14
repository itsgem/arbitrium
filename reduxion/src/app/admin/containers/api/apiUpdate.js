import { connect } from 'react-redux';
import { getApiKey, getApiPermission, updateApiKey, clientProfile } from 'admin/reducers/api';
import ApiUpdate from 'admin/views/api/apiUpdate';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    loading: state.get('AdminApi').get('loading'),
    apiPermissions: strMapToObj(state.get('AdminApi').get('apiPermissions')),
    getApiInfo: strMapToObj(state.get('AdminApi').get('getApiInfo')),
    clientProfileSuccess: strMapToObj(state.get('AdminApi').get('clientProfileSuccess')),
    apiUpdateSuccess: strMapToObj(state.get('AdminApi').get('apiUpdateSuccess'))
  };
}

export default connect(mapStateToProps, {
  getApiKey, getApiPermission, clientProfile, updateApiKey
})(ApiUpdate)
