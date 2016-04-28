/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const clientProfile = createActionAsync('CLIENTPROFILE', auth.clientProfile);
export const clientApprove = createActionAsync('CLIENTAPPROVE', auth.clientApprove);
export const clientDisapprove = createActionAsync('CLIENTDISAPPROVE', auth.clientDisapprove);

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
  clientDeleteSuccess: false,
  loading: false,
  registerCompleted: false,
  updateCompleted: false,
  validateCompleted: {},
  clientList: {}
});

export default createReducer({
  [clientProfile.ok]: (state, payload) => state.merge({
    clientProfileSuccess: state.concat(payload),
    clientApproveSuccess: false,
    clientDisapproveSuccess: false,
    loading: false
  }),
  [clientProfile.request]: (state) => state.merge({
    clientApproveSuccess: false,
    clientDisapproveSuccess: false,
    loading: true}),
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
  [validateUsername.ok]: (state, payload) => state.merge({validateCompleted: state.concat(payload)}),
  [clientRegister.ok]: (state) => state.merge({registerCompleted: true, loading: false}),
  [clientRegister.request]: (state) => state.merge({registerCompleted: false, loading: true}),
  [clientRegister.error]: (state) => state.merge({registerCompleted: false, loading: false}),
  [clientUpdateProfile.ok]: (state) => state.merge({updateCompleted: true}),
  [adminClientList.ok]: (state, payload) => state.merge({clientList: state.concat(payload), loading: false}),
  [adminClientList.request]: (state, payload) => state.merge({
    clientDeleteSuccess: false,
    loading: true
  }),
  [adminClientDelete.ok]: (state) => state.merge({clientDeleteSuccess: true, loading: false}),
  [adminClientDelete.request]: (state) => state.merge({clientDeleteSuccess: false, loading: true})
}, initialState);