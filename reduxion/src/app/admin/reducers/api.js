/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const apiList = createActionAsync('ADMIN_API_LISTS', auth.getApiList);


const initialState = Immutable.fromJS({
  apiList:{},
  loading: false
});

export default createReducer({
  [apiList.ok]: (state, payload) => state.merge({
    apiList: state.concat(payload),
    loading: false
  }),
  [apiList.request]: (state) => state.merge({
    apiList: {},
    loading: true
  })
}, initialState);
