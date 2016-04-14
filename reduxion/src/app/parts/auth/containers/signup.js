import { connect } from 'react-redux';
import { signup } from '../reducers/signup'
import { country } from '../reducers/country'
import SignupView from '../views/signup';

const mapStateToProps = (state) => {
  return {
    registerCompleted: state.get('signup').get('registerCompleted')
  };
}

export default connect(mapStateToProps, {
  signup, country
})(SignupView)
