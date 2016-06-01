/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const adminSubscriptionList = createActionAsync('ADMIN_SUBSCRIPTION_LIST', auth.getAdminSubscriptionList);
export const allSubscriptions = createActionAsync('ADMIN_SUBSCRIPTION_EDIT', auth.subscriptionList);
export const clientSubscriptionInfo = createActionAsync('ADMIN_CLIENT_SUBSCRIPTION_INFO', auth.getClientSubscriptionInfo);
export const selectedSubscriptionInfo = createActionAsync('ADMIN_SELECTED_SUBSCRIPTION_INFO', auth.getSubscriptionItem);
export const adminChangeSubscription = createActionAsync('ADMIN_CHANGE_SUBSCRIPTION', auth.changePurchaseSubscription);
export const clientProfile = createActionAsync('ADMIN_CLIENT_PROFILE', auth.clientProfile);

const initialState = Immutable.fromJS({
  clientInfo: {},
  subscriptionList: {},
  subscriptions: {},
  subscriptionInfoClient: {},
  subscriptionInfoSelected: {},
  purchaseSuccess: false,
  loading: false
});

export default createReducer({
  [clientProfile.ok]: (state, payload) => state.merge({
    clientInfo: payload,
    loading: false
  }),
  [clientProfile.request]: (state) => state.merge({
    loading: true
  }),
  [adminSubscriptionList.ok]: (state, payload) => state.merge({
    subscriptionList: state.concat(payload),
    loading: false
  }),
  [adminSubscriptionList.request]: (state) => state.merge({
    loading: true
  }),
  [allSubscriptions.ok]: (state, payload) => state.merge({
    subscriptions: payload,
    purchaseSuccess: false,
    loading: false
  }),
  [allSubscriptions.request]: (state, payload) => state.merge({
    purchaseSuccess: false,
    loading: true
  }),
  [clientSubscriptionInfo.ok]: (state, payload) => state.merge({
    subscriptionInfoClient: payload,
    loading: false
  }),
  [clientSubscriptionInfo.request]: (state, payload) => state.merge({
    loading: true
  }),
  [adminChangeSubscription.ok]: (state) => state.merge({
    purchaseSuccess: true,
    loading: false
  }),
  [adminChangeSubscription.request]: (state) => state.merge({
    purchaseSuccess: false,
    loading: true
  }),
  [selectedSubscriptionInfo.ok]: (state, payload) => state.merge({
    subscriptionInfoSelected: payload,
    purchaseSuccess: false,
    loading: false
  }),
  [selectedSubscriptionInfo.request]: (state, payload) => state.merge({
    subscriptionInfoSelected: {},
    purchaseSuccess: false,
    loading: true
  })
}, initialState);
