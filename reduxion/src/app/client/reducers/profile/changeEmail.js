/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const clientProfileEmail = createActionAsync('CLIENT_PROFILE_EMAIL', auth.getClientProfile);
export const updateClientEmail = createActionAsync('UPDATE_CLIENT_EMAIL', auth.updateClientEmail);
export const cancelEmailChange = createActionAsync('CANCEL_EMAIL_CHANGE', auth.cancelEmailChange);

const initialState = Immutable.fromJS({
  user: {},
  isCancelEmailChangeSuccess: false,
  success: {},
  errors: {},
  loading: false
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
  }),
  [cancelEmailChange.ok]: (state, payload) => state.merge({
    success: state.concat(payload),
    loading: false
  }),
  [cancelEmailChange.error]: (state, payload) => state.merge({
    errors: state.concat(payload),
    loading: false
  }),
  [cancelEmailChange.request]: (state) => state.merge({
    loading: true
  })
}, initialState);
