import { connect } from 'react-redux';
import { clientProfileEmail, updateClientEmail, cancelEmailChange } from '../reducers/changeEmail';
import ClientChangeEmail from '../views/changeEmail';

const mapStateToProps = (state) => {
  return {
    user: state.get('clientChangeEmail').get('user'),
    isCancelEmailChangeSuccess: state.get('clientProfile').get('isCancelEmailChangeSuccess'),
    success: state.get('clientChangeEmail').get('success'),
    errors: state.get('clientChangeEmail').get('errors')
  };
}

export default connect(mapStateToProps, {
  clientProfileEmail,
  updateClientEmail,
  cancelEmailChange
})(ClientChangeEmail)
