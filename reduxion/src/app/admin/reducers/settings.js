/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const adminSystemSettings = createActionAsync('ADMIN_SYSTEM_SETTINGS', auth.adminGetSystemSettings);
export const saveSystemSettings = createActionAsync('SAVE_ADMIN_SYSTEM_SETTINGS', auth.saveAdminSystemSettings);


const initialState = Immutable.fromJS({
  systemSettings: {},
  loading: false
});

export default createReducer({
  [adminSystemSettings.ok]: (state, payload) => state.merge({
    systemSettings: payload,
    loading: false
  }),
  [adminSystemSettings.request]: (state) => state.merge({
    loading: true
  }),
  [saveSystemSettings.ok]: (state, payload) => state.merge({
    systemSettings: payload,
    loading: false
  }),
  [saveSystemSettings.request]: (state) => state.merge({
    loading: true
  })
}, initialState);
