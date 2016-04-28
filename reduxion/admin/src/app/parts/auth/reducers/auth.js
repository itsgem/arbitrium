/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const login = createActionAsync('LOGIN', auth.loginLocal);
export const logout = createActionAsync('LOGOUT', auth.logout);
export const passwordReset = createActionAsync('PASSWORD_RESET', auth.requestPasswordReset);
export const confirmPasswordReset = createActionAsync('CONFIRM_PASSWORD_RESET', auth.requestConfirmPasswordReset);

const initialState = Immutable.fromJS({
  logout:false,
  authenticated: false,
  forgotPassword: false,
  isConfirmPasswordReset: false,
  error: {}
});

export default createReducer({
  [login.ok]: (state, payload) => state.merge({
    authenticated: true,
    user: payload
  }),
  [logout.ok]: (state) => state.merge({
    authenticated: false,
    user: null,
    logout: payload
  }),
  [passwordReset.ok]: (state, payload) => state.merge({
    forgotPassword: true
  }),
  [passwordReset.error]: (state, payload) => state.merge({
    error: state.concat(payload),
    forgotPassword:false
  }),
  [confirmPasswordReset.ok]: (state, payload) => state.merge({
    isConfirmPasswordReset: true,
    error: {}
  }),
  [confirmPasswordReset.error]: (state, payload) => state.merge({
    error: state.concat(payload),
    isConfirmPasswordReset: false
  })
}, initialState);
