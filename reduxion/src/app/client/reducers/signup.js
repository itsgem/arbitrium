/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const signup = createActionAsync('SIGNUP', auth.signupLocal);
export const verifyEmailCodeToken = createActionAsync('VERIFY_EMAIL_CODE_TOKEN', auth.verifyEmailCodeToken);
export const verifyEmailCode = createActionAsync('VERIFY_EMAIL_CODE', auth.verifyEmailCode);
export const country = createActionAsync('COUNTRY_SIGNUP', auth.listCountries);

const initialState = Immutable.fromJS({
  registerCompleted: false,
  emailCodeVerified: false,
  countryList: {},
  clientInfo: {}
});

export default createReducer({
  [signup.ok]: (state/*, payload*/) => state.merge({registerCompleted: true}),
  [verifyEmailCode.ok]: (state/*, payload*/) => state.merge({clientInfo: {}, emailCodeVerified: true}),
  [verifyEmailCode.request]: (state/*, payload*/) => state.merge({clientInfo: {}, emailCodeVerified: false}),
  [verifyEmailCode.error]: (state, payload) => state.merge({error: payload}),
  [country.ok]: (state, payload) => state.merge({countryList: payload, registerCompleted: false}),
  [country.request]: (state) => state.merge({registerCompleted: false}),
  [verifyEmailCodeToken.ok]: (state, payload) => state.merge({clientInfo: payload}),
  [verifyEmailCodeToken.error]: (state, payload) => state.merge({error: payload})
}, initialState);
