/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const clientProfile = createActionAsync('CLIENT_PROFILE', auth.getClientProfile);

const initialState = Immutable.fromJS({
  user: {}
});

export default createReducer({
  [clientProfile.ok]: (state, payload) => state.merge({user: state.concat(payload)})
}, initialState);
