/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const adminLogList = createActionAsync('ADMIN_LOGS_LIST', auth.getAdminSubscriptionList);
export const allLogs = createActionAsync('ADMIN_LOGS_EDIT', auth.subscriptionList);
export const clientSubscriptionInfo = createActionAsync('ADMIN_CLIENT_LOGS_INFO', auth.getClientSubscriptionInfo);
export const selectedSubscriptionInfo = createActionAsync('ADMIN_SELECTED_LOGS_INFO', auth.getSubscriptionItem);
export const adminChangeSubscription = createActionAsync('ADMIN_CHANGE_LOGS', auth.changePurchaseSubscription);
export const clientProfile = createActionAsync('ADMIN_CLIENT_PROFILE_LOGS', auth.clientProfile);

const initialState = Immutable.fromJS({
  clientInfo: {},
  logList: {},
  logs: {},
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
  [adminLogList.ok]: (state, payload) => state.merge({
    logList: state.concat(payload),
    loading: false
  }),
  [adminLogList.request]: (state) => state.merge({
    loading: true
  }),
  [allLogs.ok]: (state, payload) => state.merge({
    logs: payload,
    purchaseSuccess: false,
    loading: false
  }),
  [allLogs.request]: (state, payload) => state.merge({
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
    purchaseSuccess: false,
    loading: true
  })
}, initialState);
