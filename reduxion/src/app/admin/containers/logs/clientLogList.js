import { connect } from 'react-redux';
import { adminClientList } from 'admin/reducers/logs';
import ViewClientLogList from 'admin/views/logs/clientLogList';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    clientList: strMapToObj(state.get('adminLogs').get('clientList')),
    loading: state.get('adminLogs').get('loading')
  };
}

export default connect(mapStateToProps, {
  adminClientList
})(ViewClientLogList)