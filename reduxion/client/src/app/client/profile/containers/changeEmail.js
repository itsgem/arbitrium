import { connect } from 'react-redux';
import { clientProfileEmail, updateClientEmail } from '../reducers/changeEmail';
import ClientChangeEmail from '../views/changeEmail';

const mapStateToProps = (state) => {
    return {
        user: state.get('clientChangeEmail').get('user'),
        success: state.get('clientChangeEmail').get('success'),
        errors: state.get('clientChangeEmail').get('errors')
    };
}

export default connect(mapStateToProps, {
    clientProfileEmail,
    updateClientEmail
})(ClientChangeEmail)
