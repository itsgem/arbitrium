/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const clientProfile = createActionAsync('CLIENT_PROFILE', auth.getClientProfile);
export const updateClientProfile = createActionAsync('UPDATE_CLIENT_PROFILE', auth.updateClientProfile);
export const getAvailableUsername = createActionAsync('GET_AVAILABLE_USERNAME', auth.getAvailableUsername);

const initialState = Immutable.fromJS({
  user: {},
  isUsernameAvailable: null,
  success: {},
  errors: {}
});

export default createReducer({
  [clientProfile.ok]: (state, payload) => state.merge({
    user: state.concat(payload)
  }),
  [updateClientProfile.ok]: (state, payload) => state.merge({
    success: state.concat(payload)
  }),
  [updateClientProfile.error]: (state, payload) => state.merge({
    errors: state.concat(payload)
  }),
  [getAvailableUsername.ok]: (state, payload) => state.merge({
    isUsernameAvailable: true
  }),
  [getAvailableUsername.error]: (state, payload) => state.merge({
    isUsernameAvailable: false,
    errors: state.concat(payload)
  })
}, initialState);
