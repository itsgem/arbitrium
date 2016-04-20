/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const login = createActionAsync('LOGIN', auth.loginLocal);
export const logout = createActionAsync('LOGOUT', auth.logout);
export const passwordReset = createActionAsync('PASSWORD_RESET', auth.requestPasswordReset);

const initialState = Immutable.fromJS({
  authenticated: false,
  forgotPassword: false,
  error: {}
});

export default createReducer({
  [login.ok]: (state, payload) => state.merge({
    authenticated: true,
    user: payload
  }),
  [logout.ok]: (state) => state.merge({
    authenticated: false,
    user: null
  }),
  [passwordReset.ok]: (state, payload) => state.merge({
    forgotPassword: true
  }),
  [passwordReset.error]: (state, payload) => state.merge({
    error: state.concat(payload)
  })
}, initialState);
