import { connect } from 'react-redux';
import { clientAccessLogList } from 'admin/reducers/logs';
import ViewClientAccessLogList from 'admin/views/logs/clientAccessLogList';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    clientAccessLogs: strMapToObj(state.get('adminLogs').get('clientAccessLogs')),
    loading: state.get('adminLogs').get('loading')
  };
}

export default connect(mapStateToProps, {
  clientAccessLogList
})(ViewClientAccessLogList)