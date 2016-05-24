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

export const clientSubscriptionCancel = createActionAsync('CLIENT_CANCEL_SUBSCRIPTION', auth.clientSubscriptionCancel);

export const initialState = Immutable.fromJS({
  countryList: {},
  clientInfo: {},
  updateSuccess: false,
  validateCompleted: false,
  cancelSubscriptionSuccess: false,
  isRetrieveEmailChangeTokenSuccess: false,
  isVerifyEmailChangeSuccess: false,
  emailChangeToken: {},
  errors: {},
  loading: false,
});

export default createReducer({
  [countryProfile.ok]: (state, payload) => state.merge({countryList: payload, cancelSubscriptionSuccess: false}),
  [countryProfile.request]: (state) => state.merge({updateSuccess: false, cancelSubscriptionSuccess: false}),
  [clientProfile.ok]: (state, payload) => state.merge({
    loading: false,
    clientInfo: payload,
    updateSuccess: false,
    cancelSubscriptionSuccess: false
  }),
  [clientProfile.request]: (state) => state.merge({
    loading: true,
    updateSuccess: false,
    cancelSubscriptionSuccess: false
  }),
  [updateClientProfile.ok]: (state) => state.merge({
    updateSuccess: true
  }),
  [updateClientProfile.request]: (state) => state.merge({
    updateSuccess: false
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
  }),
  [getAvailableUsername.ok]: (state) => state.merge({ validateCompleted: true, loading: false }),
  [getAvailableUsername.request]: (state) => state.merge({ validateCompleted: false, loading: true }),
  [getAvailableUsername.error]: (state) => state.merge({ validateCompleted: 'error', loading: false }),
  [clientSubscriptionCancel.ok]: (state) => state.merge({ loading: false, cancelSubscriptionSuccess: true }),
  [clientSubscriptionCancel.request]: (state) => state.merge({ loading: true, cancelSubscriptionSuccess: false })
}, initialState);
