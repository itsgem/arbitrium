import { connect } from 'react-redux';
import { verifyEmailCode } from 'client/reducers/signup'
import RegistrationCompleteView from 'client/views/auth/registrationComplete';

const mapStateToProps = (state) => {
  return state.get('ClientSignup').toJSON();
}
export default connect(mapStateToProps, {
  verifyEmailCode
})(RegistrationCompleteView)
