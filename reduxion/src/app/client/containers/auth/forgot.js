import { connect } from 'react-redux';
import { passwordReset } from 'client/reducers/auth'
import ForgotView from 'client/views/auth/forgot';

const mapStateToProps = (state) => ({
  forgotPassword: state.get('ClientAuth').get('forgotPassword'),
  error: state.get('ClientAuth').get('error')
});

export default connect(mapStateToProps, {
  passwordReset
})(ForgotView)
