/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const clientProfile = createActionAsync('CLIENTPROFILE', auth.clientProfile);
export const clientApprove = createActionAsync('CLIENTAPPROVE', auth.clientApprove);
export const clientDisapprove = createActionAsync('CLIENTDISAPPROVE', auth.clientDisapprove);

export const validateUsername = createActionAsync('VALIDATE_USERNAME', auth.validateUsername);
export const clientUpdateProfile = createActionAsync('CLIENT_UPDATE', auth.adminClientUpdate);

const initialState = Immutable.fromJS({
  clientProfileSuccess: {},
  clientApproveSuccess: false,
  clientDisapproveSuccess: false,
  loading: false,
  registerCompleted: false,
  validateCompleted: {}
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
  [clientUpdateProfile.ok]: (state) => state.merge({registerCompleted: true})
}, initialState);