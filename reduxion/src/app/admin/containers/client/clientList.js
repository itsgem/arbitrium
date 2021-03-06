import { connect } from 'react-redux';
import {adminClientList, adminClientDelete} from 'admin/reducers/clientProfile'
import ClientList from 'admin/views/client/clientList';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    clientList: strMapToObj(state.get('clientadmin').get('clientList')),
    clientDeleteSuccess: state.get('clientadmin').get('clientDeleteSuccess'),
    loading: state.get('clientadmin').get('loading')
  };
}

export default connect(mapStateToProps, {
  adminClientList, adminClientDelete
})(ClientList)
