import { connect } from 'react-redux';
import { adminSubscriptionList } from 'admin/reducers/subscription';
import ViewSubscriptionList from 'admin/views/subscription/subscriptionList';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
    subscriptionList: strMapToObj(state.get('adminSubscription').get('subscriptionList')),
    loading: state.get('adminSubscription').get('loading'),
    role: state.get('adminSubscription').get('role')
  };
}

export default connect(mapStateToProps, {
  adminSubscriptionList
})(ViewSubscriptionList)