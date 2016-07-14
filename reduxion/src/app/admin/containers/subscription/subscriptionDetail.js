import { connect } from 'react-redux'
import { clientSubscriptionInfo, selectedSubscriptionInfo, adminChangeSubscription, subscriptionValidity } from 'admin/reducers/subscription'
import SubscriptionDetail from 'admin/views/subscription/subscriptionDetail';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => {
  return {
  	subscriptionInfoClient: strMapToObj(state.get('adminSubscription').get('subscriptionInfoClient')),
    subscriptionInfoSelected: strMapToObj(state.get('adminSubscription').get('subscriptionInfoSelected')),
    subscriptionValidityPeriod: strMapToObj(state.get('adminSubscription').get('subscriptionValidityPeriod')),
    purchaseSuccess: strMapToObj(state.get('adminSubscription').get('purchaseSuccess')),
    loading: state.get('adminSubscription').get('loading')
  };
}

export default connect((mapStateToProps), {
  clientSubscriptionInfo, selectedSubscriptionInfo, adminChangeSubscription, subscriptionValidity
})(SubscriptionDetail)
