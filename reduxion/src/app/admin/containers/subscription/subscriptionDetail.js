import { connect } from 'react-redux'
import { clientSubscriptionInfo, selectedSubscriptionInfo, adminChangeSubscription } from 'admin/reducers/subscription'
import SubscriptionDetail from 'admin/views/subscription/subscriptionDetail';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
  	subscriptionInfoClient: strMapToObj(state.get('adminSubscription').get('subscriptionInfoClient')),
    subscriptionInfoSelected: strMapToObj(state.get('adminSubscription').get('subscriptionInfoSelected')),
    purchaseSuccess: strMapToObj(state.get('adminSubscription').get('purchaseSuccess')),
    loading: state.get('adminSubscription').get('loading')
  };
}

export default connect((mapStateToProps), {
  clientSubscriptionInfo, selectedSubscriptionInfo, adminChangeSubscription
})(SubscriptionDetail)
