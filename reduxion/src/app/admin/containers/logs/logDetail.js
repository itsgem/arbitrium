import { connect } from 'react-redux'
import { adminLogDetail } from 'admin/reducers/logs'
import LogDetail from 'admin/views/logs/logDetail';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
  	logDetail: strMapToObj(state.get('adminLogs').get('logDetail')),
    loading: state.get('adminLogs').get('loading')
  };
}

export default connect((mapStateToProps), {
  adminLogDetail
})(LogDetail)
