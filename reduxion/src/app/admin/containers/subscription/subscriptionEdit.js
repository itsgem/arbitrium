import { connect } from 'react-redux';
import { listRoleAdmin, getSubscriptionInfo, adminSubscriptionEdit, validateUsername} from 'admin/reducers/subscription'
import ViewSubscriptionEdit from 'admin/views/subscription/subscriptionEdit';

const mapStateToProps = (state) => {
  return {
  	subscriptionEdit: state.get('adminSubscription').get('subscriptionEdit'),
    subscriptionInfo: state.get('adminSubscription').get('subscriptionInfo'),
    role: state.get('adminSubscription').get('role'),
    loading: state.get('adminSubscription').get('loading'),
    validateCompleted: state.get('adminSubscription').get('validateCompleted')
  };
}

export default connect(mapStateToProps, {
  getSubscriptionInfo, validateUsername, listRoleAdmin, adminSubscriptionEdit
})(ViewSubscriptionEdit)
