import { connect } from 'react-redux'
import { clientPurchaseSubscription, getSubscriptionItem, subscriptionValidity } from 'client/reducers/subscription'
import SubscriptionPayment from 'client/views/subscription/subscriptionPayment';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => ({
  loading: state.get('AdminSubscription').get('loading'),
  subscriptionItem: strMapToObj(state.get('AdminSubscription').get('subscriptionItem')),
  subscriptionValidityPeriod: strMapToObj(state.get('AdminSubscription').get('subscriptionValidityPeriod')),
  purchaseSuccess: strMapToObj(state.get('AdminSubscription').get('purchaseSuccess'))
});

export default connect((mapStateToProps), {
  clientPurchaseSubscription, getSubscriptionItem, subscriptionValidity
})(SubscriptionPayment)
