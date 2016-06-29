/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const adminClientList = createActionAsync('ADMIN_CLIENT_LIST', auth.clientList);
export const adminLogList = createActionAsync('ADMIN_LOGS_LIST', auth.getAdminLogList);
export const adminLogDetail = createActionAsync('ADMIN_LOG_DETAIL', auth.getAdminLogDetail);

const initialState = Immutable.fromJS({
  clientList: {},
  logList: {},
  logDetail: {},
  loading: false
});

export default createReducer({
  [adminClientList.ok]: (state, payload) => state.merge({
    clientList: state.concat(payload),
    loading: false
  }),
  [adminClientList.request]: (state) => state.merge({
    loading: true
  }),
  [adminLogList.ok]: (state, payload) => state.merge({
    logList: state.concat(payload),
    loading: false
  }),
  [adminLogList.request]: (state) => state.merge({
    loading: true
  }),
  [adminLogDetail.ok]: (state, payload) => state.merge({
    logDetail: state.concat(payload),
    loading: false
  }),
  [adminLogDetail.request]: (state) => state.merge({
    loading: true
  })
}, initialState);
