/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';
console.log('aaa', auth);

export const clientProfile = createActionAsync('CLIENTPROFILE', auth.clientProfile);
export const clientApprove = createActionAsync('CLIENTAPPROVE', auth.clientApprove);

const initialState = Immutable.fromJS({
  clientProfileSuccess: {},
  clientApproveSuccess: {}
});

export default createReducer({
  [clientProfile.ok]: (state, payload) => state.merge({clientProfileSuccess: state.concat(payload)}),
  [clientApprove.ok]: (state, payload) => state.merge({clientApproveSuccess: payload})
}, initialState);
