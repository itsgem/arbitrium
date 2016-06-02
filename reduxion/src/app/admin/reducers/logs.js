/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const adminLogList = createActionAsync('ADMIN_LOGS_LIST', auth.getAdminSubscriptionList);

const initialState = Immutable.fromJS({
  logList: {},
  logs: {},
  loading: false
});

export default createReducer({
  [adminLogList.ok]: (state, payload) => state.merge({
    logList: state.concat(payload),
    loading: false
  }),
  [adminLogList.request]: (state) => state.merge({
    loading: true
  })
}, initialState);
