import { connect } from 'react-redux';
import { clientApiCallsReportDetail, clientApiCallsReportDetailDownload } from 'client/reducers/reports';
import ViewClientApiCallsReportDetail from 'client/views/reports/clientApiCallsReportDetail';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    clientApiCallsListDetail: strMapToObj(state.get('clientReports').get('clientApiCallsListDetail')),
    clientApiCallsListDetailDownload: strMapToObj(state.get('clientReports').get('clientApiCallsListDetailDownload')),
    loading: state.get('clientReports').get('loading')
  };
}

export default connect(mapStateToProps, {
  clientApiCallsReportDetail, clientApiCallsReportDetailDownload
})(ViewClientApiCallsReportDetail)