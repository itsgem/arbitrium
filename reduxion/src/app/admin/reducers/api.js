/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const apiList = createActionAsync('ADMIN_API_LISTS', auth.getApiList);
export const registerApi = createActionAsync('ADMIN_REGISTER_API', auth.registerApi);
export const getApiPermission = createActionAsync('ADMIN_API_PERMISSION', auth.getApiPermission);


const initialState = Immutable.fromJS({
  apiList:{},
  loading: false,
  apiPermissions: {}
});

export default createReducer({
  [apiList.ok]: (state, payload) => state.merge({
    apiList: state.concat(payload),
    loading: false
  }),
  [apiList.request]: (state) => state.merge({
    apiList: {},
    loading: true
  }),
  [registerApi.ok]: (state) => state.merge({
    loading: false
  }),
  [registerApi.request]: (state) => state.merge({
    loading: true
  }),
  [getApiPermission.ok]: (state, payload) => state.merge({
    apiPermissions: state.concat(payload),
    loading: false
  }),
  [getApiPermission.request]: (state, payload) => state.merge({
    loading: true
  })
}, initialState);
