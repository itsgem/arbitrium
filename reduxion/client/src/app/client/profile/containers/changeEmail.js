import { connect } from 'react-redux';
import { clientProfileEmail, updateClientEmail, cancelEmailChange } from '../reducers/changeEmail';
import ClientChangeEmail from '../views/changeEmail';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    user: state.get('clientChangeEmail').get('user'),
    isCancelEmailChangeSuccess: state.get('clientProfile').get('isCancelEmailChangeSuccess'),
    success: strMapToObj(state.get('clientChangeEmail').get('success')),
    errors: state.get('clientChangeEmail').get('errors'),
    loading: state.get('clientChangeEmail').get('loading')
  };
}

export default connect(mapStateToProps, {
  clientProfileEmail,
  updateClientEmail,
  cancelEmailChange
})(ClientChangeEmail)
