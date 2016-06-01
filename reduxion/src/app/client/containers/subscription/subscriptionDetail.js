import { connect } from 'react-redux'
import { clientProfile } from 'client/reducers/profile/profile';
import { subscriptionList, clientSubscription, clientPurchaseSubscriptionConfirm, clientSubscriptionPending, clientSubscriptionCancelPending } from 'client/reducers/subscription'
import SubscriptionDetail from 'client/views/subscription/subscriptionDetail';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => ({
  loading: state.get('AdminSubscription').get('loading'),
  listSubscription: strMapToObj(state.get('AdminSubscription').get('listSubscription')),
  currentSubscription: strMapToObj(state.get('AdminSubscription').get('currentSubscription')),
  user: strMapToObj(state.get('clientProfile').get('clientInfo')),
  purchaseSuccessConfirm: strMapToObj(state.get('AdminSubscription').get('purchaseSuccessConfirm')),
  purchaseProcessingConfirm: strMapToObj(state.get('AdminSubscription').get('purchaseProcessingConfirm')),
  paypalPending: strMapToObj(state.get('AdminSubscription').get('paypalPending')),
  paypalPendingCancel: strMapToObj(state.get('AdminSubscription').get('paypalPendingCancel')),
  error: strMapToObj(state.get('AdminSubscription').get('error'))
});

export default connect((mapStateToProps), {
 subscriptionList, clientSubscription, clientProfile, clientPurchaseSubscriptionConfirm, clientSubscriptionPending, clientSubscriptionCancelPending
})(SubscriptionDetail)
