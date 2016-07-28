import { connect } from 'react-redux';
import { adminAccessLogList } from 'admin/reducers/logs';
import ViewAdminAccessLogList from 'admin/views/logs/adminAccessLogList';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    adminAccessLogs: strMapToObj(state.get('adminLogs').get('adminAccessLogs')),
    loading: state.get('adminLogs').get('loading')
  };
}

export default connect(mapStateToProps, {
  adminAccessLogList
})(ViewAdminAccessLogList)