import { connect } from 'react-redux';
import { signup, country } from 'client/reducers/signup'
import SignupView from 'client/views/auth/signup';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    registerCompleted: state.get('ClientSignup').get('registerCompleted'),
    countryList: strMapToObj(state.get('ClientSignup').get('countryList'))
  };
}

export default connect(mapStateToProps, {
  signup, country
})(SignupView)
