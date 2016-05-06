/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const clientProfile = createActionAsync('CLIENT_PROFILE', auth.getClientProfile);
export const updateClientProfile = createActionAsync('UPDATE_CLIENT_PROFILE', auth.updateClientProfile);
export const getAvailableUsername = createActionAsync('GET_AVAILABLE_USERNAME', auth.getAvailableUsername);

export const retrieveEmailChangeToken = createActionAsync('RETRIEVE_EMAIL_CHANGE_TOKEN', auth.retrieveEmailChangeToken);
export const verifyEmailChange = createActionAsync('VERIFY_EMAIL_CHANGE_TOKEN', auth.verifyEmailChange);
export const countryProfile = createActionAsync('COUNTRY_PROFILE', auth.listCountries);

export const initialState = Immutable.fromJS({
  countryList: {},
  user: {},
  isUsernameAvailable: null,
  isRetrieveEmailChangeTokenSuccess: false,
  isVerifyEmailChangeSuccess: false,
  isProfileSuccess: false,
  emailChangeToken: {},
  success: {},
  errors: {},
  loading: false
});

export default createReducer({
  [countryProfile.ok]: (state, payload) => state.merge({countryList: payload}),
  [clientProfile.ok]: (state, payload) => state.merge({
    loading: false,
    isUsernameAvailable: null,
    success: {},
    isProfileSuccess: true,
    user: state.concat(payload)
  }),
  [clientProfile.request]: (state, payload) => state.merge({
    loading: true,
    isUsernameAvailable: null,
    success: {},
    user: {}
  }),

  [updateClientProfile.ok]: (state, payload) => state.merge({
    loading: false,
    isUsernameAvailable: null,
    success: state.concat(payload),
    isProfileSuccess: true,
  }),
  [updateClientProfile.request]: (state, payload) => state.merge({
    loading: true,
    isUsernameAvailable: null,
    success: {}
  }),
  [updateClientProfile.error]: (state, payload) => state.merge({
    loading: false,
    isUsernameAvailable: null,
    success: {},
    errors: state.concat(payload)
  }),

  [getAvailableUsername.ok]: (state, payload) => state.merge({
    loading: false,
    isUsernameAvailable: true,
    success: {}
  }),
  [getAvailableUsername.request]: (state, payload) => state.merge({
    loading: true,
    isUsernameAvailable: 'loading',
    success: {}
  }),
  [getAvailableUsername.error]: (state, payload) => state.merge({
    loading: false,
    isUsernameAvailable: false,
    success: {},
    errors: state.concat(payload)
  }),

  [retrieveEmailChangeToken.ok]: (state, payload) => state.merge({
    loading: false,
    isRetrieveEmailChangeTokenSuccess: true,
    emailChangeToken: state.concat(payload)
  }),
  [retrieveEmailChangeToken.request]: (state, payload) => state.merge({
    loading: true,
    isRetrieveEmailChangeTokenSuccess: false,
    emailChangeToken: {},
    errors: state.concat(payload)
  }),

  [verifyEmailChange.ok]: (state, payload) => state.merge({
    loading: false,
    isVerifyEmailChangeSuccess: true
  }),
  [verifyEmailChange.request]: (state, payload) => state.merge({
    loading: true,
    isVerifyEmailChangeSuccess: false
  }),
  [verifyEmailChange.error]: (state, payload) => state.merge({
    loading: false,
    errors: state.concat(payload)
  })
}, initialState);
