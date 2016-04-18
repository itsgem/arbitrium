/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';
console.log('aaa', auth);

export const clientProfile = createActionAsync('CLIENTADMIN', auth.clientProfile);
export const country = createActionAsync('COUNTRY', auth.listCountries);
export const clientApprove = createActionAsync('CLIENTAPPROVE', auth.clientApprove);

const initialState = Immutable.fromJS({
  clientProfile: {},
  countryList: {},
  clientApprove: {}
});

export default createReducer({
  [clientProfile.ok]: (state, payload) => state.merge({clientProfile: payload}),
  [country.ok]: (state, payload) => state.merge({countryList: payload}),
  [clientApprove.ok]: (state, payload) => state.merge({clientApprove: payload})
}, initialState);
