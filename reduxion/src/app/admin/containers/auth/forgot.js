import { connect } from 'react-redux';
import { passwordReset } from 'admin/reducers/auth'
import ForgotView from 'admin/views/auth/forgot';

const mapStateToProps = (state) => {
  return {
    forgotPassword: state.get('AdminAuth').get('forgotPassword'),
    error: state.get('AdminAuth').get('error')
  };
}

export default connect(mapStateToProps, {
  passwordReset
})(ForgotView)
