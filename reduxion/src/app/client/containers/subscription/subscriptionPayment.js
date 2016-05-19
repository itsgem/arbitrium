import { connect } from 'react-redux'
import { clientPurchaseSubscription, getSubscriptionItem } from 'client/reducers/subscription'
import SubscriptionPayment from 'client/views/subscription/subscriptionPayment';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => ({
  loading: state.get('AdminSubscription').get('loading'),
  purchaseSuccess: state.get('AdminSubscription').get('purchaseSuccess'),
  subscriptionItem: strMapToObj(state.get('AdminSubscription').get('subscriptionItem'))
});

export default connect((mapStateToProps), {
  clientPurchaseSubscription, getSubscriptionItem
})(SubscriptionPayment)
