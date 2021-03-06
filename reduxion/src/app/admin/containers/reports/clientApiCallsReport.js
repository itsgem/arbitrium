import { connect } from 'react-redux';
import { clientApiCallsReport, clientApiCallsReportDownload } from 'admin/reducers/reports';
import ViewClientApiCallsReport from 'admin/views/reports/clientApiCallsReport';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    clientApiCallsList: strMapToObj(state.get('adminReports').get('clientApiCallsList')),
    clientApiCallsDownload: strMapToObj(state.get('adminReports').get('clientApiCallsDownload')),
    loading: state.get('adminReports').get('loading')
  };
}

export default connect(mapStateToProps, {
  clientApiCallsReport, clientApiCallsReportDownload
})(ViewClientApiCallsReport)