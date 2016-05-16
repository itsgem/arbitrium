import { connect } from 'react-redux'
import { clietApiKeys, isActiveApiKey, clientDeleteApiKey } from 'client/reducers/api'
import ApiList from 'client/views/api/apiList';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => ({
  loading: state.get('ClientApi').get('loading'),
  listApiKeys: strMapToObj(state.get('ClientApi').get('listApiKeys')),
  deleteApiKeySuccess: strMapToObj(state.get('ClientApi').get('deleteApiKeySuccess'))
});

export default connect((mapStateToProps), {
  clietApiKeys, isActiveApiKey, clientDeleteApiKey
})(ApiList)
