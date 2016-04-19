import { connect } from 'react-redux';
import { clientProfile, clientApprove, clientDisapprove } from '../reducers/client'
import ClientView from '../views/client';

const mapStateToProps = (state) => {
  return {
    clientProfileSuccess: state.get('clientadmin').get('clientProfileSuccess'),
    clientApproveSuccess: state.get('clientadmin').get('clientApproveSuccess'),
    clientDisapproveSuccess: state.get('clientadmin').get('clientDisapproveSuccess')
  };
}

export default connect(mapStateToProps, {
  clientProfile, clientApprove, clientDisapprove
})(ClientView)
