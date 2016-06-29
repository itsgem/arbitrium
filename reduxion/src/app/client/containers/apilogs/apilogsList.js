import { connect } from 'react-redux'
import { clientApiLogsList } from 'client/reducers/apilogs'
import apiLogsList from 'client/views/apilogs/apilogsList';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => ({
  loading: state.get('clientApiLogs').get('loading'),
  successApiLogsList: strMapToObj(state.get('clientApiLogs').get('successApiLogsList'))
});

export default connect((mapStateToProps), {
  clientApiLogsList
})(apiLogsList)
