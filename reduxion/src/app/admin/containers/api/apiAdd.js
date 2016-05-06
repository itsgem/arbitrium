import { connect } from 'react-redux';
//import {apiManagement} from '../reducers/apiManagement'
import ApiAdd from 'admin/views/api/apiAdd';

const mapStateToProps = (state) => {
  return {
  	test: 'test'
    //clientList: state.get('clientadmin').get('clientList'),
  };
}

export default connect(mapStateToProps, {
})(ApiAdd)
