import { connect } from 'react-redux';

import {
  clientProfile,
  clientApprove,
  clientDisapprove,
  clientUpdateProfile,
  validateUsername,
  clientActivate,
  clientDeactivate,
  country,
  clientUnlock,
  adminClientSubscription,
  adminClientSubscriptionCancel
} from 'admin/reducers/clientProfile'

import AdminClientProfile from 'admin/views/client/clientProfile';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}


const mapStateToProps = (state) => {
  return {
    countryList: state.get('clientadmin').get('countryList'),
    clientProfileSuccess: strMapToObj(state.get('clientadmin').get('clientProfileSuccess')),
    clientApproveSuccess: state.get('clientadmin').get('clientApproveSuccess'),
    clientDisapproveSuccess: state.get('clientadmin').get('clientDisapproveSuccess'),
    clientUnlockSuccess: state.get('clientadmin').get('clientUnlockSuccess'),

    clientActivateSuccess: state.get('clientadmin').get('clientActivateSuccess'),
    clientDeactivateSuccess: state.get('clientadmin').get('clientDeactivateSuccess'),

    updateCompleted: state.get('clientadmin').get('updateCompleted'),
    validateCompleted: state.get('clientadmin').get('validateCompleted'),
    registerCompleted: state.get('clientadmin').get('registerCompleted'),

    currentClientSubscription: strMapToObj(state.get('clientadmin').get('currentClientSubscription')),
    cancelSubscription: strMapToObj(state.get('clientadmin').get('cancelSubscription')),

    loading: state.get('clientadmin').get('loading')
  };
}

export default connect(mapStateToProps, {

  country,
  clientProfile,
  clientApprove,
  clientDisapprove,
  clientUpdateProfile,
  validateUsername,
  clientActivate,
  clientDeactivate,
  clientUnlock,
  adminClientSubscription,
  adminClientSubscriptionCancel
})(AdminClientProfile)
