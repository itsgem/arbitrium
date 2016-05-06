import { connect } from 'react-redux'
import { logout } from 'admin/reducers/auth'
import LogoutView from 'admin/views/auth/adminLogout';

const mapStateToProps = (state) => ({
	logout: state.get('AdminAuth').get('forgotPassword'),
	error: state.get('AdminAuth').get('error')
});

export default connect((mapStateToProps), {
    logout
})(LogoutView)
