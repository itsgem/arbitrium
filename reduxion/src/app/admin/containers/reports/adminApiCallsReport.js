import { connect } from 'react-redux';
import { adminApiCallsReport } from 'admin/reducers/reports';
import ViewAdminApiCallsReport from 'admin/views/reports/adminApiCallsReport';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    adminApiCallsList: strMapToObj(state.get('adminReports').get('adminApiCallsList')),
    loading: state.get('adminReports').get('loading')
  };
}

export default connect(mapStateToProps, {
  adminApiCallsReport
})(ViewAdminApiCallsReport)