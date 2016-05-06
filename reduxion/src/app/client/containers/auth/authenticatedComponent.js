import { connect } from 'react-redux';
import AuthenticatedComponent from '../components/authenticatedComponent';

const mapStateToProps = (state) => ({
  authenticated: state.get('ClientAuth').get('authenticated')
});

export default connect(mapStateToProps)(AuthenticatedComponent)
