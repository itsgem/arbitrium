import { connect } from 'react-redux';
import { signup, country } from 'client/reducers/signup'
//import { country } from '../reducers/country'
import SignupView from 'client/views/auth/signup';

const mapStateToProps = (state) => {
  return {
    registerCompleted: state.get('ClientSignup').get('registerCompleted'),
    countryList: state.get('ClientSignup').get('countryList')
  };
}

export default connect(mapStateToProps, {
  signup, country
})(SignupView)
