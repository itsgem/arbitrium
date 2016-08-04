import { connect } from 'react-redux'
import { adminApiCallDetail } from 'admin/reducers/reports'
import ViewAdminApiCallDetail from 'admin/views/reports/adminApiCallDetail';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
  	apiCallDetail: strMapToObj(state.get('adminReports').get('apiCallDetail')),
    loading: state.get('adminReports').get('loading')
  };
}

export default connect((mapStateToProps), {
  adminApiCallDetail
})(ViewAdminApiCallDetail)
