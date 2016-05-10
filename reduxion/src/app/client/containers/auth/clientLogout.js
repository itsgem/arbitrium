import { connect } from 'react-redux'
import { logout } from 'client/reducers/auth'
import LogoutView from 'client/views/auth/clientLogout';

const mapStateToProps = (state) => ({
  logout: state.get('ClientAuth').get('forgotPassword'),
  authenticated: state.get('ClientAuth').get('authenticated'),
  error: state.get('ClientAuth').get('error')
});

export default connect((mapStateToProps), {
  logout
})(LogoutView)
