import { connect } from 'react-redux';
import { clientProfile, updateClientProfile, getAvailableUsername } from '../reducers/clientProfile'
import { country } from '../../auth/reducers/country'
import ClientProfile from '../views/clientProfile';

const mapStateToProps = (state) => {
    return {
        countryList: state.get('country').get('countryList'),
        user: state.get('clientProfile').get('user'),
        isUsernameAvailable: state.get('clientProfile').get('isUsernameAvailable'),
        success: state.get('clientProfile').get('success'),
        errors: state.get('clientProfile').get('errors'),
    };
}

export default connect(mapStateToProps, {
    country,
    clientProfile,
    updateClientProfile,
    getAvailableUsername
})(ClientProfile)
