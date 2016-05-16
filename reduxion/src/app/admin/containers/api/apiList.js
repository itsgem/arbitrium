import { connect } from 'react-redux';
import { apiList, isActiveApiKey, adminDeleteApiKey } from 'admin/reducers/api'
import ApiList from 'admin/views/api/apiList';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    ListApiSuccess: strMapToObj(state.get('AdminApi').get('apiList')),
    loading: state.get('AdminApi').get('loading'),
    deleteApiKeySuccess: state.get('AdminApi').get('deleteApiKeySuccess')
  };
}

export default connect(mapStateToProps, {
  apiList, isActiveApiKey, adminDeleteApiKey
})(ApiList)
