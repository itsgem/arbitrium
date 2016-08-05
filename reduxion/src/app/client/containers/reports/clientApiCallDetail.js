import { connect } from 'react-redux'
import { clientApiCallDetail } from 'client/reducers/reports'
import ViewClientApiCallDetail from 'client/views/reports/clientApiCallDetail';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
  	clientApiCallInfo: strMapToObj(state.get('clientReports').get('clientApiCallInfo')),
    loading: state.get('clientReports').get('loading')
  };
}

export default connect((mapStateToProps), {
  clientApiCallDetail
})(ViewClientApiCallDetail)
