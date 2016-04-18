import { connect } from 'react-redux';
import { clientProfile, clientApprove } from '../reducers/client'
import ClientView from '../views/client';

const mapStateToProps = (state) => {
  return {
    clientProfileSuccess: state.get('clientadmin').get('clientProfileSuccess'),
    clientApproveSuccess: state.get('clientadmin').get('clientApproveSuccess')
  };
}

export default connect(mapStateToProps, {
  clientProfile, clientApprove
})(ClientView)
