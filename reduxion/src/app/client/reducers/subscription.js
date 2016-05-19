/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const subscriptionList = createActionAsync('CLIENT_SUBSCRIPTION_LIST', auth.subscriptionList);
export const clientSubscription = createActionAsync('CLIENT_SUBSCRIPTION', auth.clientSubscription);
export const clientPurchaseSubscription = createActionAsync('CLIENT_PURCHASE_SUBSCRIPTION', auth.clientPurchaseSubscription);
export const getSubscriptionItem = createActionAsync('CLIENT_SINGLE_SUBSCRIPTION', auth.getSubscriptionItem);

const initialState = Immutable.fromJS({
  listSubscription: {},
  subscriptionItem: {},
  currentSubscription: {},
  purchaseSuccess: false,
  loading: false
});

export default createReducer({
  [subscriptionList.ok]: (state, payload) => state.merge({
    listSubscription: payload,
    loading: false
  }),
  [subscriptionList.request]: (state) => state.merge({
    loading: true
  }),
  [clientSubscription.ok]: (state, payload) => state.merge({
    currentSubscription: payload,
    loading: false
  }),
  [clientSubscription.request]: (state) => state.merge({
    loading: true
  }),
  [clientPurchaseSubscription.ok]: (state) => state.merge({
    loading: false,
    purchaseSuccess: true
  }),
  [clientPurchaseSubscription.request]: (state) => state.merge({
    loading: true,
    purchaseSuccess: false
  }),
  [getSubscriptionItem.ok]: (state, payload) => state.merge({
    loading: false,
    subscriptionItem: payload
  }),
  [getSubscriptionItem.request]: (state) => state.merge({
    loading: false
  })
}, initialState);
