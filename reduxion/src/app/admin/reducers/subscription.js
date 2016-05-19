/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const adminSubscriptionList = createActionAsync('ADMIN_SUBSCRIPTION_LIST', auth.getAdminSubscriptionList);
export const allSubscriptions = createActionAsync('ADMIN_SUBSCRIPTION_EDIT', auth.getAllSubscriptions);
export const clientSubscriptionInfo = createActionAsync('ADMIN_CLIENT_SUBSCRIPTION_INFO', auth.getClientSubscriptionInfo);
export const selectedSubscriptionInfo = createActionAsync('ADMIN_SELECTED_SUBSCRIPTION_INFO', auth.getSelectedSubscriptionInfo);

const initialState = Immutable.fromJS({
  subscriptionList: {},
  subscriptions: {},
  subscriptionInfoClient: {},
  subscriptionInfoSelected: {},
  loading: false,
  validateCompleted: false
});

export default createReducer({
  [adminSubscriptionList.ok]: (state, payload) => state.merge({
    subscriptionList: state.concat(payload),
    subscriptionInfoClient: {},
    loading: false,
    validateCompleted: false }),
  [adminSubscriptionList.request]: (state) => state.merge({
    subscriptions: {},
    subscriptionInfoClient: {},
    loading: true,
    validateCompleted: false }),
  [allSubscriptions.ok]: (state, payload) => state.merge({
    subscriptions: state.concat(payload),
    subscriptionInfoClient: payload,
    loading: false}),
  [allSubscriptions.request]: (state, payload) => state.merge({
    subscriptions: {},
    subscriptionInfoClient: {},
    subscriptionInfoSelected: {},
    loading: true}),
  [clientSubscriptionInfo.ok]: (state, payload) => state.merge({
    subscriptions: state.concat(payload),
    subscriptionInfoClient: payload,
    loading: false}),
  [clientSubscriptionInfo.request]: (state, payload) => state.merge({
    subscriptions: {},
    subscriptionInfoClient: {},
    subscriptionInfoSelected: {},
    loading: true}),
  [selectedSubscriptionInfo.ok]: (state, payload) => state.merge({
    subscriptionInfoClient: {},
    subscriptionInfoSelected: {},
    loading: false}),
  [selectedSubscriptionInfo.request]: (state, payload) => state.merge({
    subscriptionInfoClient: {},
    subscriptionInfoSelected: {},
    loading: true})
}, initialState);
