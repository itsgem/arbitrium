import { connect } from 'react-redux';
import { clientProfilePassword, updateClientPassword } from '../reducers/changePassword';
import ClientChangePassword from '../views/changePassword';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    user: state.get('clientChangePassword').get('user'),
    success: state.get('clientChangePassword').get('success'),
    errors: state.get('clientChangePassword').get('errors')
  };
}

export default connect(mapStateToProps, {
  clientProfilePassword,
  updateClientPassword
})(ClientChangePassword)
