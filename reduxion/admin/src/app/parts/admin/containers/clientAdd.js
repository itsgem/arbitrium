import { connect } from 'react-redux';
import { clientRegister, validateUsername, country } from '../reducers/clientProfile'
//import { country } from '../../auth/reducers/country'
import ClientAddView from '../views/clientAdd';

const mapStateToProps = (state) => {
  return {
    registerCompleted: state.get('clientadmin').get('registerCompleted'),
    validateCompleted: state.get('clientadmin').get('validateCompleted'),
    countryList: state.get('clientadmin').get('countryList'),
    loading: state.get('clientadmin').get('loading')
  };
}

export default connect(mapStateToProps, {
  clientRegister, validateUsername, country
})(ClientAddView)
