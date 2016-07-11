import { connect } from 'react-redux';
import { adminLogList } from 'admin/reducers/logs';
import ViewLogList from 'admin/views/logs/logList';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    logList: strMapToObj(state.get('adminLogs').get('logList')),
    loading: state.get('adminLogs').get('loading')
  };
}

export default connect(mapStateToProps, {
  adminLogList
})(ViewLogList)