import { connect } from 'react-redux';
import {countryProfile, clientProfile, updateClientProfile, getAvailableUsername, retrieveEmailChangeToken, verifyEmailChange } from 'client/reducers/profile/profile';
import { country } from 'client/reducers/country';
import ClientProfile from 'client/views/profile/profile';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {

  return {
    countryList: strMapToObj(state.get('clientProfile').get('countryList')),
    user: state.get('clientProfile').get('user'),
    isUsernameAvailable: state.get('clientProfile').get('isUsernameAvailable'),
    isRetrieveEmailChangeTokenSuccess: state.get('clientProfile').get('isRetrieveEmailChangeTokenSuccess'),
    isVerifyEmailChangeSuccess: state.get('clientProfile').get('isVerifyEmailChangeSuccess'),
    emailChangeToken: state.get('clientProfile').get('emailChangeToken'),
    loading: state.get('clientProfile').get('loading'),
    success: strMapToObj(state.get('clientProfile').get('success')),
    isProfileSuccess: state.get('clientProfile').get('isProfileSuccess'),
    errors: state.get('clientProfile').get('errors')
  };
}

export default connect(mapStateToProps, {
  countryProfile,
  clientProfile,
  updateClientProfile,
  getAvailableUsername,
  verifyEmailChange,
  retrieveEmailChangeToken
})(ClientProfile)
