/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const clientProfile = createActionAsync('CLIENTPROFILE', auth.clientProfile);
export const clientApprove = createActionAsync('CLIENTAPPROVE', auth.clientApprove);
export const clientDisapprove = createActionAsync('CLIENTDISAPPROVE', auth.clientDisapprove);

const initialState = Immutable.fromJS({
  clientProfileSuccess: {},
  clientApproveSuccess: false,
  clientDisapproveSuccess: false
});

export default createReducer({
  [clientProfile.ok]: (state, payload) => state.merge({clientProfileSuccess: state.concat(payload)}),
  [clientApprove.ok]: (state, payload) => state.merge({clientApproveSuccess: true}),
  [clientDisapprove.ok]: (state, payload) => state.merge({clientDisapproveSuccess: true})
}, initialState);
