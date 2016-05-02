import { connect } from 'react-redux';
import { clientProfile, updateClientProfile, getAvailableUsername, retrieveEmailChangeToken, verifyEmailChange } from '../reducers/profile';
import { country } from '../../auth/reducers/country';
import ClientProfile from '../views/profile';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    countryList: state.get('country').get('countryList'),
    user: state.get('clientProfile').get('user'),
    isUsernameAvailable: state.get('clientProfile').get('isUsernameAvailable'),
    isRetrieveEmailChangeTokenSuccess: state.get('clientProfile').get('isRetrieveEmailChangeTokenSuccess'),
    isVerifyEmailChangeSuccess: state.get('clientProfile').get('isVerifyEmailChangeSuccess'),
    emailChangeToken: state.get('clientProfile').get('emailChangeToken'),
    loading: state.get('clientProfile').get('loading'),
    success: strMapToObj(state.get('clientProfile').get('success')),
    errors: state.get('clientProfile').get('errors')
  };
}

export default connect(mapStateToProps, {
  country,
  clientProfile,
  updateClientProfile,
  getAvailableUsername,
  verifyEmailChange,
  retrieveEmailChangeToken
})(ClientProfile)
