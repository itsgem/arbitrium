/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const adminSubscriptionList = createActionAsync('ADMIN_SUBSCRIPTION_LIST', auth.adminSubscriptionList);
export const adminSubscriptionEdit = createActionAsync('ADMIN_SUBSCRIPTION_EDIT', auth.adminSubscriptionEdit);
export const getSubscriptionInfo = createActionAsync('GET_SUBSCRIPTION_INFO', auth.getSubscriptionInfo);

const initialState = Immutable.fromJS({
  subscriptionList: {},
  subscriptionAdd: {},
  subscriptionEdit: false,
  subscriptionInfo: {},
  role: {},
  registerCompleted: false,
  deleteSuccess: false,
  loading: false,
  validateCompleted: false
});

export default createReducer({
  [adminSubscriptionList.ok]: (state, payload) => state.merge({
    subscriptionList: payload,
    subscriptionAdd: {},
    subscriptionEdit: false,
    subscriptionInfo: {},
    role: {},
    registerCompleted: false,
    deleteSuccess: false,
    loading: false,
    validateCompleted: false }),
  [adminSubscriptionList.request]: (state) => state.merge({
    subscriptionAdd: {},
    subscriptionEdit: false,
    subscriptionInfo: {},
    role: {},
    registerCompleted: false,
    deleteSuccess: false,
    loading: true,
    validateCompleted: false }),
  [getSubscriptionInfo.ok]: (state, payload) => state.merge({
    subscriptionInfo: payload,
    registerCompleted: false,
    subscriptionEdit: false,
    loading: false}),
  [getSubscriptionInfo.request]: (state, payload) => state.merge({
    loading: true,
    registerCompleted: false,
    subscriptionEdit: false,
    loading: true}),
  [adminSubscriptionList.ok]: (state) => state.merge({
    subscriptionEdit: true,
    loading: false}),
  [adminSubscriptionList.request]: (state) => state.merge({
    subscriptionEdit: false,
    loading: true}),
}, initialState);
