import { connect } from 'react-redux'
import { clietApiKeys, isActiveApiKey } from 'client/reducers/api'
import ApiList from 'client/views/api/apiList';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => ({
  loading: state.get('ClientApi').get('loading'),
  listApiKeys: strMapToObj(state.get('ClientApi').get('listApiKeys'))
});

export default connect((mapStateToProps), {
  clietApiKeys, isActiveApiKey
})(ApiList)
