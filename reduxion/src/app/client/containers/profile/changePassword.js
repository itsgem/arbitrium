import { connect } from 'react-redux';
import { clientProfilePassword, updateClientPassword } from 'client/reducers/profile/changePassword';
import ClientChangePassword from 'client/views/profile/changePassword';

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
