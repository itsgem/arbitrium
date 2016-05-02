import { connect } from 'react-redux';
import { signup, country } from '../reducers/signup'
//import { country } from '../reducers/country'
import SignupView from '../views/signup';

const mapStateToProps = (state) => {
  return {
    registerCompleted: state.get('signup').get('registerCompleted'),
    countryList: state.get('signup').get('countryList')
  };
}

export default connect(mapStateToProps, {
  signup, country
})(SignupView)
