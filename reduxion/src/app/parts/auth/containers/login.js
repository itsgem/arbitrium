import { connect } from 'react-redux';
import { login } from '../reducers/auth'
import LoginView from '../views/login';

const mapStateToProps = (state) => {
  return {
    authenticated: state.get('auth').get('authenticated'),
    user: state.get('auth').get('user')
  };
}

export default connect((mapStateToProps), {
  login
})(LoginView)
