/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const apiList = createActionAsync('ADMIN_API_LISTS', auth.getApiList);
export const registerApi = createActionAsync('ADMIN_REGISTER_API', auth.registerApi);
export const getApiPermission = createActionAsync('ADMIN_API_PERMISSION', auth.getApiPermission);
export const getApiKey = createActionAsync('ADMIN_GET_API_KEY', auth.getApiKey);
export const editApiKey = createActionAsync('ADMIN_API_EDIT', auth.editApiKey);


const initialState = Immutable.fromJS({
  apiList:{},
  loading: false,
  apiPermissions: {},
  registerApiSuccess: false,
  apiPermissionsError: {},
  getApiInfo: {},
  apiEditSuccess: false
});

export default createReducer({
  [apiList.ok]: (state, payload) => state.merge({
    apiList: state.concat(payload),
    loading: false,
    apiEditSuccess: false
  }),
  [apiList.request]: (state) => state.merge({
    loading: true,
    apiEditSuccess: false
  }),
  [registerApi.ok]: (state) => state.merge({
    loading: false,
    registerApiSuccess: true
  }),
  [registerApi.request]: (state) => state.merge({
    loading: true,
    registerApiSuccess: false
  }),
  [registerApi.error]: (state) => state.merge({
    loading: false
  }),
  [getApiPermission.ok]: (state, payload) => state.merge({
    apiPermissions: state.concat(payload),
    loading: false,
    registerApiSuccess: false
  }),
  [getApiPermission.request]: (state) => state.merge({
    loading: true,
    registerApiSuccess: false
  }),
  [getApiKey.ok]: (state, payload) => state.merge({
    loading: false,
    getApiInfo: state.concat(payload),
  }),
  [getApiKey.request]: (state) => state.merge({
    loading: false,
    getApiInfo: {},
  }),
  [editApiKey.ok]: (state) => state.merge({
    loading: false,
    apiEditSuccess: true
  }),
  [editApiKey.request]: (state) => state.merge({
    loading: true,
    apiEditSuccess: false
  })
}, initialState);
