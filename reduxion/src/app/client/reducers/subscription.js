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
export const clientSubscriptionPending = createActionAsync('CLIENT_SUBSCRIPTION_PENDING', auth.clientSubscriptionPending);
export const clientSubscriptionCancelPending = createActionAsync('CLIENT_SUBSCRIPTION_PENDING_CANCEL', auth.clientSubscriptionCancelPending);

const initialState = Immutable.fromJS({
  listSubscription: {},
  subscriptionItem: {},
  currentSubscription: {},
  purchaseSuccess: {},
  purchaseSuccessConfirm: false,
  purchaseProcessingConfirm: false,
  loading: false,
  paypalPending: {},
  paypalPendingCancel: false,
  error: {}
});

export default createReducer({
  [subscriptionList.ok]: (state, payload) => state.merge({
    listSubscription: payload,
    loading: false,
    purchaseSuccessConfirm: false,
    purchaseSuccess: {},
    paypalPendingCancel: false,
    error: {}
  }),
  [subscriptionList.request]: (state) => state.merge({
    loading: true,
    purchaseSuccessConfirm: false,
    purchaseSuccess: {},
    paypalPendingCancel: false,
    error: {}
  }),
  [clientSubscription.ok]: (state, payload) => state.merge({
    currentSubscription: payload,
    paypalPendingCancel: false,
    loading: false
  }),
  [clientSubscription.request]: (state) => state.merge({
    loading: true,
    paypalPendingCancel: false,
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
    subscriptionItem: {},
    loading: false,
    purchaseSuccessConfirm: false
  }),
  [clientPurchaseSubscriptionConfirm.ok]: (state) => state.merge({
    loading: false,
    purchaseSuccessConfirm: true,
    purchaseProcessingConfirm: false
  }),
  [clientPurchaseSubscriptionConfirm.request]: (state) => state.merge({
    loading: true,
    purchaseSuccessConfirm: false,
    purchaseProcessingConfirm: true
  }),
  [clientPurchaseSubscriptionConfirm.error]: (state, payload) => state.merge({
    error: payload,
    loading: false,
    purchaseProcessingConfirm: false
  }),
  [clientSubscriptionPending.ok]: (state, payload) => state.merge({
    paypalPending: payload,
    paypalPendingCancel: false,
  }),
  [clientSubscriptionCancelPending.ok]: (state, payload) => state.merge({
    paypalPendingCancel: true
  }),
  [clientSubscriptionCancelPending.request]: (state) => state.merge({
    paypalPendingCancel: false
  })
}, initialState);
