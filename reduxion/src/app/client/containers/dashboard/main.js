import { connect } from 'react-redux';
import { graphReport } from 'client/reducers/apilogs'
import MainDashboard from 'client/views/dashboard/main';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    graphInfo: strMapToObj(state.get('clientApiLogs').get('graphInfo')),
    loading: strMapToObj(state.get('clientApiLogs').get('loading'))
  };
}

export default connect(mapStateToProps, {
	graphReport
})(MainDashboard)
