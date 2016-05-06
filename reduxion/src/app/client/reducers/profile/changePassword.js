/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const clientProfilePassword = createActionAsync('CLIENT_PROFILE_PASSWORD', auth.getClientProfile);
export const updateClientPassword = createActionAsync('UPDATE_CLIENT_PASSWORD', auth.updateClientPassword);

const initialState = Immutable.fromJS({
  user: {},
  success: {},
  errors: {}
});

export default createReducer({
  [clientProfilePassword.ok]: (state, payload) => state.merge({
    user: state.concat(payload)
  }),
  [updateClientPassword.ok]: (state, payload) => state.merge({
    errors: {},
    success: state.concat(payload)
  }),
  [updateClientPassword.error]: (state, payload) => state.merge({
    errors: state.concat(payload),
    success: {}
  })
}, initialState);
