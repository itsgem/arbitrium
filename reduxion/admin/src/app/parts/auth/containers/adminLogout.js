import { connect } from 'react-redux'
import { logout } from '../reducers/auth'
import LogoutView from '../views/adminLogout';

const mapStateToProps = (state) => ({
	logout: state.get('auth').get('forgotPassword'),
	error: state.get('auth').get('error')
});

export default connect((mapStateToProps), {
    logout
})(LogoutView)
