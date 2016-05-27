/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const subscriptionList = createActionAsync('CLIENT_SUBSCRIPTION_LIST', auth.subscriptionList);
export const clientSubscription = createActionAsync('CLIENT_SUBSCRIPTION', auth.clientSubscription);
export const clientPurchaseSubscription = createActionAsync('CLIENT_PURCHASE_SUBSCRIPTION', auth.clientPurchaseSubscription);
export const getSubscriptionItem = createActionAsync('CLIENT_SINGLE_SUBSCRIPTION', auth.getSubscriptionItem);
export const clientPurchaseSubscriptionConfirm = createActionAsync('CLIENT_PURCHASE_SUBSCRIPTION_CONFIRM', auth.clientPurchaseSubscriptionConfirm);

const initialState = Immutable.fromJS({
  listSubscription: {},
  subscriptionItem: {},
  currentSubscription: {},
  purchaseSuccess: {},
  purchaseSuccessConfirm: false,
  loading: false,
  error: {}
});

export default createReducer({
  [subscriptionList.ok]: (state, payload) => state.merge({
    listSubscription: payload,
    loading: false,
    purchaseSuccessConfirm: false,
    error: {}
  }),
  [subscriptionList.request]: (state) => state.merge({
    loading: true,
    purchaseSuccessConfirm: false,
    error: {}
  }),
  [clientSubscription.ok]: (state, payload) => state.merge({
    currentSubscription: payload,
    loading: false
  }),
  [clientSubscription.request]: (state) => state.merge({
    loading: true
  }),
  [clientPurchaseSubscription.ok]: (state, payload) => state.merge({
    purchaseSuccess: payload,
    loading: false
  }),
  [clientPurchaseSubscription.request]: (state) => state.merge({
    purchaseSuccess: {},
    loading: true
  }),
  [getSubscriptionItem.ok]: (state, payload) => state.merge({
    loading: false,
    subscriptionItem: payload,
    purchaseSuccessConfirm: false
  }),
  [getSubscriptionItem.request]: (state) => state.merge({
    loading: false,
    purchaseSuccessConfirm: false
  }),
  [clientPurchaseSubscriptionConfirm.ok]: (state) => state.merge({
    loading: false,
    purchaseSuccessConfirm: true
  }),
  [clientPurchaseSubscriptionConfirm.request]: (state) => state.merge({
    loading: true,
    purchaseSuccessConfirm: false
  }),
  [clientPurchaseSubscriptionConfirm.error]: (state, payload) => state.merge({
    error: payload,
    loading: false
  })
}, initialState);
