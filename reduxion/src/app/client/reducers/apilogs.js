/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const clientApiLogsList = createActionAsync('CLIENT_API_LOGS_LIST', auth.clientApiLogsList);
export const clientApiLogInfo = createActionAsync('CLIENT_API_LOG_INFO', auth.clientApiLogInfo);

const initialState = Immutable.fromJS({
  loading: false,
  successApiLogsList: {},
  successApiLogInfo: {}
});

export default createReducer({
  [clientApiLogsList.ok]: (state, payload) => state.merge({
    successApiLogInfo: {},
    successApiLogsList: payload,
    loading: false
  }),
  [clientApiLogsList.request]: (state) => state.merge({
    successApiLogInfo: {},
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
