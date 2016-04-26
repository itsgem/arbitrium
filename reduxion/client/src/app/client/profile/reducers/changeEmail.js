/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const clientProfileEmail = createActionAsync('CLIENT_PROFILE_EMAIL', auth.getClientProfile);
export const updateClientEmail = createActionAsync('UPDATE_CLIENT_EMAIL', auth.updateClientEmail);

const initialState = Immutable.fromJS({
  user: {},
  success: {},
  errors: {}
});

export default createReducer({
  [clientProfileEmail.ok]: (state, payload) => state.merge({
    user: state.concat(payload)
  }),
  [updateClientEmail.ok]: (state, payload) => state.merge({
    success: state.concat(payload)
  }),
  [updateClientEmail.error]: (state, payload) => state.merge({
    errors: state.concat(payload)
  })
}, initialState);
