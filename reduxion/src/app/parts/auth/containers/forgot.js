import { connect } from 'react-redux';
import { passwordReset } from '../reducers/auth'
import ForgotView from '../views/forgot';

const mapStateToProps = (state) => ({
	forgotPassword: state.get('auth').get('forgotPassword'),
	error: state.get('auth').get('error')
});

export default connect(mapStateToProps, {
  passwordReset
})(ForgotView)
