/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const country = createActionAsync('COUNTRY', auth.listCountries);

const initialState = Immutable.fromJS({
  countryList: {}
});

export default createReducer({
  [country.ok]: (state, payload) => state.merge({countryList: payload})
}, initialState);
