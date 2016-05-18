import { connect } from 'react-redux'
import { subscriptionList } from 'client/reducers/subscription'
import SubscriptionDetail from 'client/views/subscription/subscriptionDetail';

const strMapToObj=(strMap) => {
  let obj = JSON.parse(JSON.stringify(strMap));
  return obj;
}

const mapStateToProps = (state) => ({
  loading: state.get('AdminSubscription').get('loading'),
  listSubscription: strMapToObj(state.get('AdminSubscription').get('listSubscription'))
});

export default connect((mapStateToProps), {
 subscriptionList
})(SubscriptionDetail)
