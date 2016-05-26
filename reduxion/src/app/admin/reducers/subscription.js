/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const adminSubscriptionList = createActionAsync('ADMIN_SUBSCRIPTION_LIST', auth.getAdminSubscriptionList);
export const allSubscriptions = createActionAsync('ADMIN_SUBSCRIPTION_EDIT', auth.subscriptionList);
export const clientSubscriptionInfo = createActionAsync('ADMIN_CLIENT_SUBSCRIPTION_INFO', auth.getClientSubscriptionInfo);
export const selectedSubscriptionInfo = createActionAsync('ADMIN_SELECTED_SUBSCRIPTION_INFO', auth.getSubscriptionItem);

const initialState = Immutable.fromJS({
  subscriptionList: {},
  subscriptions: {},
  subscriptionInfoClient: {},
  subscriptionInfoSelected: {},
  loading: false
});

export default createReducer({
  [adminSubscriptionList.ok]: (state, payload) => state.merge({
    subscriptionList: state.concat(payload),
    loading: false}),
  [adminSubscriptionList.request]: (state) => state.merge({
    loading: true}),
  [allSubscriptions.ok]: (state, payload) => state.merge({
    subscriptions: payload,
    loading: false}),
  [allSubscriptions.request]: (state, payload) => state.merge({
    loading: true}),
  [clientSubscriptionInfo.ok]: (state, payload) => state.merge({
    subscriptionInfoClient: payload,
    loading: false}),
  [clientSubscriptionInfo.request]: (state, payload) => state.merge({
    loading: true}),
  [selectedSubscriptionInfo.ok]: (state, payload) => state.merge({
    subscriptionInfoSelected: state.concat(payload),
    loading: false}),
  [selectedSubscriptionInfo.request]: (state, payload) => state.merge({
    loading: true})
}, initialState);
