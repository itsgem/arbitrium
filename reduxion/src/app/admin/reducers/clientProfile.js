/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';
import user from 'services/user';

export const clientProfile = createActionAsync('CLIENTPROFILE', auth.clientProfile);
export const clientApprove = createActionAsync('CLIENTAPPROVE', auth.clientApprove);
export const clientDisapprove = createActionAsync('CLIENTDISAPPROVE', auth.clientDisapprove);
export const clientActivate = createActionAsync('CLIENT_ACTIVATE', auth.clientActivate);
export const clientDeactivate = createActionAsync('CLIENT_DEACTIVATE', auth.clientDeactivate);
export const clientUnlock = createActionAsync('CLIENT_UNLOCK', user.clientUnlock);

export const validateUsername = createActionAsync('VALIDATE_USERNAME', auth.validateUsername);
export const clientAdd = createActionAsync('CLIENT_ADD', auth.adminClientAdd);
export const clientRegister = createActionAsync('CLIENT_REGISTER', auth.adminClientRegister);
export const clientUpdateProfile = createActionAsync('CLIENT_UPDATE', auth.adminClientUpdate);
export const adminClientDelete = createActionAsync('CLIENT_DELETE', auth.clientDelete);
export const adminClientList = createActionAsync('CLIENT_LIST', auth.clientList);

export const adminClientSubscription = createActionAsync('ADMIN_CURRENT_CLIENT_SUBSCRIPTION', auth.adminClientSubscription);
export const adminClientSubscriptionCancel = createActionAsync('ADMIN_CLIENT_CANCEL_SUBSCRIPTION', auth.adminClientSubscriptionCancel);

export const country = createActionAsync('COUNTRY', auth.listCountries);

const initialState = Immutable.fromJS({
  clientProfileSuccess: {},
  clientApproveSuccess: false,
  clientDisapproveSuccess: false,
  clientActivateSuccess: false,
  clientDeactivateSuccess: false,
  clientDeleteSuccess: false,
  clientUnlockSuccess: false,
  loading: false,
  registerCompleted: false,
  updateCompleted: false,
  validateCompleted: false,
  clientList: {},
  countryList: {},
  currentClientSubscription: {},
  cancelSubscription: false
});

export default createReducer({
  [clientProfile.ok]: (state, payload) => state.merge({
    clientProfileSuccess: payload,
    clientApproveSuccess: false,
    clientDisapproveSuccess: false,
    clientActivateSuccess: false,
    clientDeactivateSuccess: false,
    updateCompleted: false,
    loading: false,
    validateCompleted: false,
    clientUnlockSuccess: false
  }),
  [clientProfile.request]: (state) => state.merge({
    clientProfileSuccess: {},
    clientApproveSuccess: false,
    clientDisapproveSuccess: false,
    clientActivateSuccess: false,
    clientDeactivateSuccess: false,
    updateCompleted: false,
    loading: true,
    validateCompleted: false,
    clientUnlockSuccess: false
  }),
  [clientApprove.ok]: (state) => state.merge({clientApproveSuccess: true, loading: false}),
  [clientApprove.request]: (state) => state.merge({
    clientApproveSuccess: false,
    clientDisapproveSuccess: false,
    loading: true}),
  [clientDisapprove.ok]: (state) => state.merge({clientDisapproveSuccess: true, loading: false}),
  [clientDisapprove.request]: (state) => state.merge({
    clientApproveSuccess: false,
    clientDisapproveSuccess: false,
    loading: true}),

  [clientActivate.ok]: (state) => state.merge({clientActivateSuccess: true, loading: false}),
  [clientActivate.request]: (state) => state.merge({
    clientActivateSuccess: false,
    clientDeactivateSuccess: false,
    loading: true}),
  [clientDeactivate.ok]: (state) => state.merge({clientDeactivateSuccess: true, loading: false}),
  [clientDeactivate.request]: (state) => state.merge({
    clientActivateSuccess: false,
    clientDeactivateSuccess: false,
    loading: true}),

  [validateUsername.ok]: (state) => state.merge({validateCompleted: true}),
  [validateUsername.request]: (state) => state.merge({validateCompleted: false}),
  [validateUsername.error]: (state) => state.merge({validateCompleted: false}),
  [clientRegister.ok]: (state) => state.merge({registerCompleted: true, loading: false, validateCompleted: false}),
  [clientRegister.request]: (state) => state.merge({registerCompleted: false, loading: true, validateCompleted: false}),
  [clientRegister.error]: (state) => state.merge({registerCompleted: false, loading: false, validateCompleted: false}),
  [clientUpdateProfile.ok]: (state) => state.merge({updateCompleted: true}),
  [adminClientList.ok]: (state, payload) => state.merge({
    clientList: state.concat(payload),
    registerCompleted: false,
    loading: false,
    updateCompleted: false,
    validateCompleted: false,
    currentClientSubscription: {},
    cancelSubscription: false
  }),
  [adminClientList.request]: (state) => state.merge({
    clientDeleteSuccess: false,
    registerCompleted: false,
    loading: true,
    updateCompleted: false,
    validateCompleted: false,
    currentClientSubscription: {},
    cancelSubscription: false
  }),
  [adminClientDelete.ok]: (state) => state.merge({clientDeleteSuccess: true, loading: false}),
  [adminClientDelete.request]: (state) => state.merge({clientDeleteSuccess: false, loading: true}),
  [country.ok]: (state, payload) => state.merge({countryList: payload, validateCompleted: false}),
  [country.request]: (state) => state.merge({validateCompleted: false}),
  [clientUnlock.ok]: (state) => state.merge({clientUnlockSuccess: true, loading: false}),
  [clientUnlock.request]: (state) => state.merge({clientUnlockSuccess: false, loading: true}),
  [adminClientSubscription.ok]: (state, payload) => state.merge({currentClientSubscription: payload, loading: false}),
  [adminClientSubscription.request]: (state) => state.merge({currentClientSubscription: {}, loading: true}),
  [adminClientSubscriptionCancel.ok]: (state, payload) => state.merge({cancelSubscription: true, loading: false}),
  [adminClientSubscriptionCancel.request]: (state) => state.merge({cancelSubscription: false, loading: true})

}, initialState);
