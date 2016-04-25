/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const updateClientPassword = createActionAsync('UPDATE_CLIENT_PASSWORD', auth.updateClientPassword);

const initialState = Immutable.fromJS({
  success: {},
  errors: {}
});

export default createReducer({
  [updateClientPassword.ok]: (state, payload) => state.merge({
    errors: {},
    success: state.concat(payload)
  }),
  [updateClientPassword.error]: (state, payload) => state.merge({
    errors: state.concat(payload),
    success: {}
  })
}, initialState);
