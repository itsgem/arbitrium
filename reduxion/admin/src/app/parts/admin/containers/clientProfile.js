import { connect } from 'react-redux';

import {
  clientProfile,
  clientApprove,
  clientDisapprove,
  clientUpdateProfile,
  validateUsername,
  clientActivate,
  clientDeactivate
} from '../reducers/clientProfile'

import { country } from '../../auth/reducers/country'
import AdminClientProfile from '../views/clientProfile';

const mapStateToProps = (state) => {
  return {
    countryList: state.get('country').get('countryList'),
    clientProfileSuccess: state.get('clientadmin').get('clientProfileSuccess'),
    clientApproveSuccess: state.get('clientadmin').get('clientApproveSuccess'),
    clientDisapproveSuccess: state.get('clientadmin').get('clientDisapproveSuccess'),

    clientActivateSuccess: state.get('clientadmin').get('clientActivateSuccess'),
    clientDeactivateSuccess: state.get('clientadmin').get('clientDeactivateSuccess'),

    updateCompleted: state.get('clientadmin').get('updateCompleted'),
    validateCompleted: state.get('clientadmin').get('validateCompleted'),
    registerCompleted: state.get('clientadmin').get('registerCompleted'),
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
  clientDeactivate

})(AdminClientProfile)