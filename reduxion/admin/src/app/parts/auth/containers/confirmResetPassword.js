import { connect } from 'react-redux';
import { confirmPasswordReset } from '../reducers/auth'
import ConfirmResetPasswordView from '../views/confirmResetPassword';

const mapStateToProps = (state) => ({
	isConfirmPasswordReset: state.get('auth').get('isConfirmPasswordReset'),
	error: state.get('auth').get('error')
});

export default connect(mapStateToProps, {
  confirmPasswordReset
})(ConfirmResetPasswordView)
