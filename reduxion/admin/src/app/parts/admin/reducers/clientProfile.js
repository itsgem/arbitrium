/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const clientProfile = createActionAsync('CLIENTPROFILE', auth.clientProfile);
export const clientApprove = createActionAsync('CLIENTAPPROVE', auth.clientApprove);
export const clientDisapprove = createActionAsync('CLIENTDISAPPROVE', auth.clientDisapprove);
export const clientActivate = createActionAsync('CLIENT_ACTIVATE', auth.clientActivate);
export const clientDeactivate = createActionAsync('CLIENT_DEACTIVATE', auth.clientDeactivate);

export const validateUsername = createActionAsync('VALIDATE_USERNAME', auth.validateUsername);
export const clientAdd = createActionAsync('CLIENT_ADD', auth.adminClientAdd);
export const clientRegister = createActionAsync('CLIENT_REGISTER', auth.adminClientRegister);
export const clientUpdateProfile = createActionAsync('CLIENT_UPDATE', auth.adminClientUpdate);
export const adminClientDelete = createActionAsync('CLIENT_DELETE', auth.clientDelete);
export const adminClientList = createActionAsync('CLIENT_LIST', auth.clientList);

const initialState = Immutable.fromJS({
  clientProfileSuccess: {},
  clientApproveSuccess: false,
  clientDisapproveSuccess: false,
  clientActivateSuccess: false,
  clientDeactivateSuccess: false,
  clientDeleteSuccess: false,
  loading: false,
  registerCompleted: false,
  updateCompleted: false,
  validateCompleted: {},
  isUsernameAvailable: null,
  clientList: {}
});

export default createReducer({
  [clientProfile.ok]: (state, payload) => state.merge({
    clientProfileSuccess: state.concat(payload),
    clientApproveSuccess: false,
    clientDisapproveSuccess: false,
    clientActivateSuccess: false,
    clientDeactivateSuccess: false,
    updateCompleted: false,
    isUsernameAvailable: null,
    loading: false
  }),
  [clientProfile.request]: (state) => state.merge({
    clientApproveSuccess: false,
    clientDisapproveSuccess: false,
    clientActivateSuccess: false,
    clientDeactivateSuccess: false,
    updateCompleted: false,
    isUsernameAvailable: null,
    loading: true}),

  [clientApprove.ok]: (state) => state.merge({clientApproveSuccess: true, loading: false}),
  [clientApprove.request]: (state) => state.merge({
    clientApproveSuccess: false,
    clientDisapproveSuccess: false,
    updateCompleted: false,
    isUsernameAvailable: null,
    loading: true}),

  [clientDisapprove.ok]: (state) => state.merge({clientDisapproveSuccess: true, loading: false}),
  [clientDisapprove.request]: (state) => state.merge({
    clientApproveSuccess: false,
    clientDisapproveSuccess: false,
    updateCompleted: false,
    isUsernameAvailable: null,
    loading: true}),

  [clientActivate.ok]: (state) => state.merge({clientActivateSuccess: true, loading: false}),
  [clientActivate.request]: (state) => state.merge({
    clientActivateSuccess: false,
    clientDeactivateSuccess: false,
    updateCompleted: false,
    isUsernameAvailable: null,
    loading: true}),

  [clientDeactivate.ok]: (state) => state.merge({clientDeactivateSuccess: true, loading: false}),
  [clientDeactivate.request]: (state) => state.merge({
    clientActivateSuccess: false,
    clientDeactivateSuccess: false,
    updateCompleted: false,
    isUsernameAvailable: null,
    loading: true}),

  [validateUsername.ok]: (state, payload) => state.merge({
    validateCompleted: state.concat(payload),
    updateCompleted: false,
    isUsernameAvailable: true,
    loading: false
  }),
  [validateUsername.error]: (state, payload) => state.merge({
    updateCompleted: false,
    isUsernameAvailable: false,
    loading: false
  }),
  [validateUsername.request]: (state, payload) => state.merge({
    updateCompleted: false,
    isUsernameAvailable: 'loading',
    loading: true
  }),

  [clientRegister.ok]: (state) => state.merge({
    registerCompleted: true,
    loading: false
  }),
  [clientRegister.error]: (state) => state.merge({
    registerCompleted: false,
    loading: false
  }),
  [clientRegister.request]: (state) => state.merge({
    registerCompleted: false,
    loading: true
  }),

  [clientUpdateProfile.ok]: (state) => state.merge({
    updateCompleted: true,
    isUsernameAvailable: null,
    loading: false
  }),
  [clientUpdateProfile.error]: (state) => state.merge({
    updateCompleted: false,
    isUsernameAvailable: null,
    loading: false
  }),
  [clientUpdateProfile.request]: (state) => state.merge({
    updateCompleted: false,
    isUsernameAvailable: null,
    loading: true
  }),

  [adminClientList.ok]: (state, payload) => state.merge({clientList: state.concat(payload),registerCompleted: false, loading: false}),
  [adminClientList.request]: (state, payload) => state.merge({
    clientDeleteSuccess: false,
    registerCompleted: false,
    loading: true
  }),

  [adminClientDelete.ok]: (state) => state.merge({clientDeleteSuccess: true, loading: false}),
  [adminClientDelete.request]: (state) => state.merge({clientDeleteSuccess: false, loading: true})
}, initialState);