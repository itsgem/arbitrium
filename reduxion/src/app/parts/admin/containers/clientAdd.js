import { connect } from 'react-redux';
import { clientRegister, validateUsername } from '../reducers/client'
import { country } from '../../auth/reducers/country'
import ClientAddView from '../views/clientAdd';

const mapStateToProps = (state) => {
  return {
    registerCompleted: state.get('clientadmin').get('registerCompleted'),
    validateCompleted: state.get('clientadmin').get('validateCompleted'),
    countryList: state.get('country').get('countryList')
  };
}

export default connect(mapStateToProps, {
  clientRegister, validateUsername, country
})(ClientAddView)
