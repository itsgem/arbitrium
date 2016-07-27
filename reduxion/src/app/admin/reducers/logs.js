/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const adminClientList = createActionAsync('ADMIN_CLIENT_LIST', auth.clientList);
export const adminLogList = createActionAsync('ADMIN_LOGS_LIST', auth.getAdminLogList);
export const adminLogDetail = createActionAsync('ADMIN_LOG_DETAIL', auth.getAdminLogDetail);
export const adminAccessLogList = createActionAsync('ADMIN_ACCESS_LOG_LIST', auth.getAdminAccessLogList);
export const clientAccessLogList = createActionAsync('ADMIN_CLIENT_ACCESS_LOG_LIST', auth.getClientAccessLogList);

const initialState = Immutable.fromJS({
  clientList: {},
  logList: {},
  logDetail: {},
  adminAccessLogs: {},
  clientAccessLogs: {},
  loading: false
});

export default createReducer({
  [adminClientList.ok]: (state, payload) => state.merge({
    clientList: payload,
    loading: false
  }),
  [adminClientList.request]: (state) => state.merge({
    loading: true
  }),
  [adminLogList.ok]: (state, payload) => state.merge({
    logList: payload,
    loading: false
  }),
  [adminLogList.request]: (state) => state.merge({
    loading: true
  }),
  [adminLogDetail.ok]: (state, payload) => state.merge({
    logDetail: payload,
    loading: false
  }),
  [adminLogDetail.request]: (state) => state.merge({
    loading: true
  }),
  [adminAccessLogList.ok]: (state, payload) => state.merge({
    adminAccessLogs: payload,
    loading: false
  }),
  [adminAccessLogList.request]: (state) => state.merge({
    loading: true
  }),
  [clientAccessLogList.ok]: (state, payload) => state.merge({
    clientAccessLogs: payload,
    loading: false
  }),
  [clientAccessLogList.request]: (state) => state.merge({
    loading: true
  })
}, initialState);
