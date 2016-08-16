import { connect } from 'react-redux';
import { adminApiCallsReport, adminApiCallsReportDownload } from 'admin/reducers/reports';
import ViewAdminApiCallsReport from 'admin/views/reports/adminApiCallsReport';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    adminApiCallsList: strMapToObj(state.get('adminReports').get('adminApiCallsList')),
    adminApiCallsDownload: strMapToObj(state.get('adminReports').get('adminApiCallsDownload')),
    loading: state.get('adminReports').get('loading')
  };
}

export default connect(mapStateToProps, {
  adminApiCallsReport, adminApiCallsReportDownload
})(ViewAdminApiCallsReport)