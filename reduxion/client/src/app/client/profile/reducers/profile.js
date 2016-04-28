/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const clientProfile = createActionAsync('CLIENT_PROFILE', auth.getClientProfile);
export const updateClientProfile = createActionAsync('UPDATE_CLIENT_PROFILE', auth.updateClientProfile);
export const getAvailableUsername = createActionAsync('GET_AVAILABLE_USERNAME', auth.getAvailableUsername);

export const retrieveEmailChangeToken = createActionAsync('RETRIEVE_EMAIL_CHANGE_TOKEN', auth.retrieveEmailChangeToken);
export const verifyEmailChange = createActionAsync('VERIFY_EMAIL_CHANGE_TOKEN', auth.verifyEmailChange);

const initialState = Immutable.fromJS({
  user: {},
  isUsernameAvailable: null,
  isRetrieveEmailChangeTokenSuccess: false,
  isVerifyEmailChangeSuccess: false,
  emailChangeToken: {},
  success: {},
  errors: {},
  loading: false
});

export default createReducer({
  [clientProfile.ok]: (state, payload) => state.merge({
    loading: false,
    user: state.concat(payload)
  }),

  [updateClientProfile.ok]: (state, payload) => state.merge({
    loading: false,
    success: state.concat(payload)
  }),
  [updateClientProfile.request]: (state, payload) => state.merge({
    loading: true,
    success: {}
  }),
  [updateClientProfile.error]: (state, payload) => state.merge({
    loading: false,
    errors: state.concat(payload)
  }),

  [getAvailableUsername.ok]: (state, payload) => state.merge({
    loading: false,
    isUsernameAvailable: true
  }),
  [getAvailableUsername.request]: (state, payload) => state.merge({
    loading: true,
    isUsernameAvailable: false
  }),
  [getAvailableUsername.error]: (state, payload) => state.merge({
    loading: false,
    isUsernameAvailable: false,
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
