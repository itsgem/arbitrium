/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const validateUsername = createActionAsync('CHECK_USERNAME', auth.validateUsername);

const initialState = Immutable.fromJS({
  validateCompleted: false
});

export default createReducer({
  [validateUsername.ok]: (state) => state.merge({validateCompleted: true}),
  [validateUsername.request]: (state) => state.merge({validateCompleted: false}),
  [validateUsername.error]: (state) => state.merge({validateCompleted: false}),
}, initialState);
