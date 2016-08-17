/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const clientApiCallsReport = createActionAsync('CLIENT_API_CALLS_REPORT', auth.getApiCallsReport);
export const clientApiCallsReportDownload = createActionAsync('CLIENT_API_CALLS_REPORT_DOWNLOAD', auth.getApiCallsReport);
export const clientApiCallsReportDetail = createActionAsync('CLIENT_API_CALLS_REPORT_DETAIL', auth.getClientApiCallsReportDetail);
export const clientApiCallsReportDetailDownload = createActionAsync('CLIENT_API_CALLS_REPORT_DETAIL_DOWNLOAD', auth.getClientApiCallsReportDetail);
export const clientApiCallDetail = createActionAsync('CLIENT_API_CALL_DETAIL', auth.getClientApiCallDetail);

const initialState = Immutable.fromJS({
  clientApiCallsList: {},
  clientApiCallsListDownload: {},
  clientApiCallsListDetail: {},
  clientApiCallsListDetailDownload: {},
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
  [clientApiCallsReportDownload.ok]: (state, payload) => state.merge({
    clientApiCallsListDownload: payload,
    loading: false
  }),
  [clientApiCallsReportDownload.request]: (state) => state.merge({
    loading: true
  }),
  [clientApiCallsReportDetail.ok]: (state, payload) => state.merge({
    clientApiCallsListDetail: payload,
    loading: false
  }),
  [clientApiCallsReportDetail.request]: (state) => state.merge({
    loading: true
  }),
  [clientApiCallsReportDetailDownload.ok]: (state, payload) => state.merge({
    clientApiCallsListDetailDownload: payload,
    loading: false
  }),
  [clientApiCallsReportDetailDownload.request]: (state) => state.merge({
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
