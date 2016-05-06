import { connect } from 'react-redux';
import { login } from 'client/reducers/auth'
import LoginView from 'client/views/auth/login';

const mapStateToProps = (state) => {
  return {
    authenticated: state.get('ClientAuth').get('authenticated'),
    user: state.get('ClientAuth').get('user')
  };
}

export default connect((mapStateToProps), {
  login
})(LoginView)
