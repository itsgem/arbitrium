/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const clientApiLogsList = createActionAsync('CLIENT_API_LOGS_LIST', auth.clientApiLogsList);
export const clientApiLogsListDownload = createActionAsync('CLIENT_API_LOGS_LIST_DOWNLOAD', auth.clientApiLogsList);
export const clientApiLogInfo = createActionAsync('CLIENT_API_LOG_INFO', auth.clientApiLogInfo);
export const graphReport = createActionAsync('CLIENT_GRAPH_REPORT', auth.clientGraphReport);

const initialState = Immutable.fromJS({
  graphInfo: {},
  loading: false,
  successApiLogsList: {},
  successApiLogsListDownload: {},
  successApiLogInfo: {}
});

export default createReducer({
  [graphReport.ok]: (state, payload) => state.merge({
    graphInfo: payload,
    loading: false
  }),
  [graphReport.request]: (state) => state.merge({
    graphInfo: {},
    loading: true
  }),
  [clientApiLogsList.ok]: (state, payload) => state.merge({
    successApiLogInfo: {},
    successApiLogsList: payload,
    loading: false
  }),
  [clientApiLogsList.request]: (state) => state.merge({
    successApiLogInfo: {},
    loading: true
  }),
  [clientApiLogsListDownload.ok]: (state, payload) => state.merge({
    successApiLogsListDownload: payload,
    loading: false
  }),
  [clientApiLogsListDownload.request]: (state) => state.merge({
    loading: true
  }),
  [clientApiLogInfo.ok]: (state, payload) => state.merge({
    successApiLogInfo: payload,
    loading: false,
  }),
  [clientApiLogInfo.request]: (state) => state.merge({
    successApiLogInfo: {},
    loading: true
  })
}, initialState);
