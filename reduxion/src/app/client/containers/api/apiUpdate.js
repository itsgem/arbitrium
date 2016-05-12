import { connect } from 'react-redux'
import { clientGetApiKey, getApiPermission, clientUpdateApiKey } from 'client/reducers/api'
import ApiUpdate from 'client/views/api/apiUpdate';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => ({
  loading: state.get('ClientApi').get('loading'),
  apiPermissions: strMapToObj(state.get('ClientApi').get('apiPermissions')),
  apiKeyInfo: strMapToObj(state.get('ClientApi').get('apiKeyInfo')),
  apiUpdateSuccess: strMapToObj(state.get('ClientApi').get('apiUpdateSuccess'))
});

export default connect((mapStateToProps), {
  clientGetApiKey, getApiPermission, clientUpdateApiKey
})(ApiUpdate)
