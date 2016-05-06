/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const country = createActionAsync('ClIENT_COUNTRY', auth.listCountries);

const initialState = Immutable.fromJS({
  countryList: {}
});

export default createReducer({
  [country.ok]: (state, payload) => state.merge({countryList: payload})
}, initialState);
