import { connect } from 'react-redux'
import { logout } from 'client/reducers/auth'
import LogoutView from 'client/views/auth/adminLogout';

const mapStateToProps = (state) => ({
	logout: state.get('ClientAuth').get('forgotPassword'),
	error: state.get('ClientAuth').get('error')
});

export default connect((mapStateToProps), {
    logout
})(LogoutView)
