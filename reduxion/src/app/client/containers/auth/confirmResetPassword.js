import { connect } from 'react-redux';
import { confirmPasswordReset } from 'client/reducers/auth'
import ConfirmResetPasswordView from 'client/views/auth/confirmResetPassword';

const mapStateToProps = (state) => ({
  isConfirmPasswordReset: state.get('ClientAuth').get('isConfirmPasswordReset'),
  error: state.get('ClientAuth').get('error')
});

export default connect(mapStateToProps, {
  confirmPasswordReset
})(ConfirmResetPasswordView)
