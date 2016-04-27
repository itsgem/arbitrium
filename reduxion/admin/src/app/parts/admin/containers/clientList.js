import { connect } from 'react-redux';
import {adminClientList} from '../reducers/clientProfile'
import ClientList from '../views/clientList';

const mapStateToProps = (state) => {
  return {
    clientList: state.get('clientadmin').get('clientList')
  };
}

export default connect(mapStateToProps, {
  adminClientList
})(ClientList)
