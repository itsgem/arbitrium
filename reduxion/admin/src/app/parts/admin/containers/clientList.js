import { connect } from 'react-redux';
import {adminClientList, adminClientDelete} from '../reducers/clientProfile'
import ClientList from '../views/clientList';

const mapStateToProps = (state) => {
  return {
    clientList: state.get('clientadmin').get('clientList'),
    clientDeleteSuccess: state.get('clientadmin').get('clientDeleteSuccess'),
    loading: state.get('clientadmin').get('loading')
  };
}

export default connect(mapStateToProps, {
  adminClientList, adminClientDelete
})(ClientList)
