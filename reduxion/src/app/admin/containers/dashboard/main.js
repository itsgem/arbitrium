import { connect } from 'react-redux';
import { graphReport } from 'admin/reducers/reports'
import MainDashboard from 'admin/views/dashboard/main';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    graphInfo: strMapToObj(state.get('adminReports').get('graphInfo')),
    loading: strMapToObj(state.get('adminReports').get('loading'))
  };
}

export default connect(mapStateToProps, {
	graphReport
})(MainDashboard)
