import { connect } from 'react-redux'
import { subscriptionList, clientSubscription } from 'client/reducers/subscription'
import SubscriptionDetail from 'client/views/subscription/subscriptionDetail';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => ({
  loading: state.get('AdminSubscription').get('loading'),
  listSubscription: strMapToObj(state.get('AdminSubscription').get('listSubscription')),
  currentSubscription: strMapToObj(state.get('AdminSubscription').get('currentSubscription'))
});

export default connect((mapStateToProps), {
 subscriptionList, clientSubscription
})(SubscriptionDetail)
