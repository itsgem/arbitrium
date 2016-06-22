import { connect } from 'react-redux'
import { adminSystemSettings, saveSystemSettings } from 'admin/reducers/settings'
import SystemSettings from 'admin/views/systemSettings/settings';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
  	systemSettings: strMapToObj(state.get('adminSystemSettings').get('systemSettings')),
    loading: state.get('adminSystemSettings').get('loading'),
    saveSuccess: state.get('adminSystemSettings').get('saveSuccess')
  };
}

export default connect((mapStateToProps), {
  adminSystemSettings, saveSystemSettings
})(SystemSettings)