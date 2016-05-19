import { connect } from 'react-redux';
import { allSubscriptions, clientSubscriptionInfo, selectedSubscriptionInfo} from 'admin/reducers/subscription'
import ViewSubscriptionEdit from 'admin/views/subscription/subscriptionEdit';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
  	subscriptions: strMapToObj(state.get('adminSubscription').get('subscriptions')),
    subscriptionInfoClient: strMapToObj(state.get('adminSubscription').get('subscriptionInfoClient')),
    subscriptionInfoSelected: strMapToObj(state.get('adminSubscription').get('subscriptionInfoSelected')),
    loading: state.get('adminSubscription').get('loading'),
    validateCompleted: state.get('adminSubscription').get('validateCompleted')
  };
}

export default connect(mapStateToProps, {
  allSubscriptions, clientSubscriptionInfo, selectedSubscriptionInfo
})(ViewSubscriptionEdit)
