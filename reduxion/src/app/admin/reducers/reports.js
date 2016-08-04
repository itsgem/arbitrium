/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const adminApiCallsReport = createActionAsync('ADMIN_API_CALLS_REPORT', auth.getAdminApiCallsReport);
export const clientApiCallsReport = createActionAsync('ADMIN_CLIENT_API_CALLS_REPORT', auth.getClientApiCallsReport);
export const adminApiCallDetail = createActionAsync('ADMIN_API_CALL_DETAIL', auth.getAdminApiCallDetail);

const initialState = Immutable.fromJS({
  adminApiCallsList: {},
  clientApiCallsList: {},
  apiCallDetail: {},
  loading: false
});

export default createReducer({
  [adminApiCallsReport.ok]: (state, payload) => state.merge({
    adminApiCallsList: payload,
    loading: false
  }),
  [adminApiCallsReport.request]: (state) => state.merge({
    loading: true
  }),
  [clientApiCallsReport.ok]: (state, payload) => state.merge({
    clientApiCallsList: payload,
    loading: false
  }),
  [clientApiCallsReport.request]: (state) => state.merge({
    loading: true
  }),
  [adminApiCallDetail.ok]: (state, payload) => state.merge({
    apiCallDetail: payload,
    loading: false
  }),
  [adminApiCallDetail.request]: (state) => state.merge({
    loading: true
  })
}, initialState);
