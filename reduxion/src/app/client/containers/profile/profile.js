import { connect } from 'react-redux';
import {
  countryProfile,
  clientProfile,
  updateClientProfile,
  getAvailableUsername,
  retrieveEmailChangeToken,
  verifyEmailChange,
  clientSubscriptionCancel } from 'client/reducers/profile/profile';
import { clientSubscription } from 'client/reducers/subscription';
import ClientProfile from 'client/views/profile/profile';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {

  return {
    countryList: strMapToObj(state.get('clientProfile').get('countryList')),
    isRetrieveEmailChangeTokenSuccess: state.get('clientProfile').get('isRetrieveEmailChangeTokenSuccess'),
    isVerifyEmailChangeSuccess: state.get('clientProfile').get('isVerifyEmailChangeSuccess'),
    emailChangeToken: strMapToObj(state.get('clientProfile').get('emailChangeToken')),
    currentSubscription: strMapToObj(state.get('AdminSubscription').get('currentSubscription')),
    cancelSubscriptionSuccess: strMapToObj(state.get('clientProfile').get('cancelSubscriptionSuccess')),
    clientInfo: strMapToObj(state.get('clientProfile').get('clientInfo')),
    updateSuccess: strMapToObj(state.get('clientProfile').get('updateSuccess')),
    validateCompleted: strMapToObj(state.get('clientProfile').get('validateCompleted')),
    errors: strMapToObj(state.get('clientProfile').get('errors')),
    errorsVerifyEmailChange: strMapToObj(state.get('clientProfile').get('errorsVerifyEmailChange')),
    loading: state.get('clientProfile').get('loading')
  };
}

export default connect(mapStateToProps, {
  countryProfile,
  clientProfile,
  updateClientProfile,
  getAvailableUsername,
  verifyEmailChange,
  retrieveEmailChangeToken,
  clientSubscription,
  clientSubscriptionCancel
})(ClientProfile)
