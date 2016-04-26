import { connect } from 'react-redux';
import { clientProfile, clientApprove, clientDisapprove, clientUpdateProfile, validateUsername  } from '../reducers/clientProfile'
import { country } from '../../auth/reducers/country'
import AdminClientProfile from '../views/clientProfile';

const mapStateToProps = (state) => {
  return {
    countryList: state.get('country').get('countryList'),
    clientProfileSuccess: state.get('clientadmin').get('clientProfileSuccess'),
    clientApproveSuccess: state.get('clientadmin').get('clientApproveSuccess'),
    clientDisapproveSuccess: state.get('clientadmin').get('clientDisapproveSuccess'),
    validateCompleted: state.get('clientadmin').get('validateCompleted'),
    loading: state.get('clientadmin').get('loading')
  };
}

export default connect(mapStateToProps, {
  country, clientProfile, clientApprove, clientDisapprove, clientUpdateProfile, validateUsername
})(AdminClientProfile)