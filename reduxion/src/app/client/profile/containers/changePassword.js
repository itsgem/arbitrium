import { connect } from 'react-redux';
import { updateClientPassword } from '../reducers/changePassword';
import { country } from '../../../parts/auth/reducers/country';
import ClientChangePassword from '../views/changePassword';

const mapStateToProps = (state) => {
    return {
        success: state.get('clientChangePassword').get('success'),
        errors: state.get('clientChangePassword').get('errors')
    };
}

export default connect(mapStateToProps, {
    updateClientPassword
})(ClientChangePassword)
