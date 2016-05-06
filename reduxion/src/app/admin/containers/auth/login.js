import { connect } from 'react-redux';
import { login } from 'admin/reducers/auth'
import LoginView from 'admin/views/auth/login';

const mapStateToProps = (state) => {
  return {
    authenticated: state.get('AdminAuth').get('authenticated'),
    user: state.get('AdminAuth').get('user')
  };
}

export default connect((mapStateToProps), {
  login
})(LoginView)
