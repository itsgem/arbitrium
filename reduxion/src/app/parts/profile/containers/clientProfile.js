import { connect } from 'react-redux';
import { clientProfile } from '../reducers/clientProfile'
import { country } from '../../auth/reducers/country'
import ClientViewEdit from '../views/clientProfile';

const mapStateToProps = (state) => {
    return {
        user: state.get('clientProfile').get('user'),
        countryList: state.get('country').get('countryList')
    };
}

export default connect(mapStateToProps, {
    clientProfile, country
})(ClientViewEdit)
