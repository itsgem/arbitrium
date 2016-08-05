/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const clientApiCallsReport = createActionAsync('CLIENT_API_CALLS_REPORT', auth.getApiCallsReport);
export const clientApiCallsReportDetail = createActionAsync('CLIENT_API_CALLS_REPORT_DETAIL', auth.getClientApiCallsReportDetail);
export const clientApiCallDetail = createActionAsync('CLIENT_API_CALL_DETAIL', auth.getClientApiCallDetail);

const initialState = Immutable.fromJS({
  clientApiCallsList: {},
  clientApiCallsListDetail: {},
  clientApiCallInfo: {},
  loading: false
});

export default createReducer({
  [clientApiCallsReport.ok]: (state, payload) => state.merge({
    clientApiCallsList: payload,
    loading: false
  }),
  [clientApiCallsReport.request]: (state) => state.merge({
    loading: true
  }),
  [clientApiCallsReportDetail.ok]: (state, payload) => state.merge({
    clientApiCallsListDetail: payload,
    loading: false
  }),
  [clientApiCallsReportDetail.request]: (state) => state.merge({
    loading: true
  }),
  [clientApiCallDetail.ok]: (state, payload) => state.merge({
    clientApiCallInfo: payload,
    loading: false
  }),
  [clientApiCallDetail.request]: (state) => state.merge({
    loading: true
  })
}, initialState);
