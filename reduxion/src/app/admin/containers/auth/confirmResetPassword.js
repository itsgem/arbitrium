import { connect } from 'react-redux';
import { confirmPasswordReset } from 'admin/reducers/auth'
import ConfirmResetPasswordView from 'admin/views/auth/confirmResetPassword';

const mapStateToProps = (state) => ({
	isConfirmPasswordReset: state.get('AdminAuth').get('isConfirmPasswordReset'),
	error: state.get('AdminAuth').get('error')
});

export default connect(mapStateToProps, {
  confirmPasswordReset
})(ConfirmResetPasswordView)
