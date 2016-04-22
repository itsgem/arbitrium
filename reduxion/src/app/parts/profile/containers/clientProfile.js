import { connect } from 'react-redux';
import { clientProfile, updateClientProfile, getAvailableUsername } from '../reducers/clientProfile'
import { country } from '../../auth/reducers/country'
import ClientProfile from '../views/clientProfile';

const mapStateToProps = (state) => {
    return {
        user: state.get('clientProfile').get('user'),
        countryList: state.get('country').get('countryList'),
        message: state.get('clientProfile').get('message'),
        errors: state.get('clientProfile').get('errors'),
    };
}

export default connect(mapStateToProps, {
    country,
    clientProfile,
    updateClientProfile,
    getAvailableUsername
})(ClientProfile)
