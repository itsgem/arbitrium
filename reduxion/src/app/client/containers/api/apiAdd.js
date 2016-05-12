import { connect } from 'react-redux'
import { clientRegisterApi, getApiPermission } from 'client/reducers/api'
import ApiList from 'client/views/api/apiAdd';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => ({
  loading: state.get('ClientApi').get('loading'),
  apiPermissions: strMapToObj(state.get('ClientApi').get('apiPermissions')),
  registerApiSuccess: strMapToObj(state.get('ClientApi').get('registerApiSuccess'))
});

export default connect((mapStateToProps), {
  clientRegisterApi, getApiPermission
})(ApiList)
