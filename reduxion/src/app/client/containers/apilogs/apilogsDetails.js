import { connect } from 'react-redux'
import { clientApiLogInfo } from 'client/reducers/apilogs'
import apiLogsDetails from 'client/views/apilogs/apilogsDetails';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => ({
  loading: state.get('clientApiLogs').get('loading'),
  successApiLogInfo: strMapToObj(state.get('clientApiLogs').get('successApiLogInfo'))
});

export default connect((mapStateToProps), {
  clientApiLogInfo
})(apiLogsDetails)
