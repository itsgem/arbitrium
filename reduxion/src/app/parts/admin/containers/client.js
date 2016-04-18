import { connect } from 'react-redux';
import { client, country } from '../reducers/client'
import ClientView from '../views/client';

const mapStateToProps = (state) => {
  return {
    clientProfile: state.get('clientadmin').get('clientProfile'),
    countryList: state.get('clientadmin').get('countryList'),
    clientApprove: state.get('clientadmin').get('clientApprove')
  };
}

export default connect(mapStateToProps, {
  client, country
})(ClientView)
