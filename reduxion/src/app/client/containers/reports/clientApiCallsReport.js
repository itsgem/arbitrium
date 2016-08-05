import { connect } from 'react-redux';
import { clientApiCallsReport } from 'client/reducers/reports';
import ViewClientApiCallsReport from 'client/views/reports/clientApiCallsReport';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    clientApiCallsList: strMapToObj(state.get('clientReports').get('clientApiCallsList')),
    loading: state.get('clientReports').get('loading')
  };
}

export default connect(mapStateToProps, {
  clientApiCallsReport
})(ViewClientApiCallsReport)