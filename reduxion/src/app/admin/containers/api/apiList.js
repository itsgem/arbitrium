import { connect } from 'react-redux';
//import {apiManagement} from '../reducers/apiManagement'
import ApiList from 'admin/views/api/apiList';

const mapStateToProps = (state) => {
  return {
  	test: 'test'
    //clientList: state.get('clientadmin').get('clientList'),
  };
}

export default connect(mapStateToProps, {
})(ApiList)
