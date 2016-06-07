/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const apiList = createActionAsync('ADMIN_API_LISTS', auth.getApiList);
export const registerApi = createActionAsync('ADMIN_REGISTER_API', auth.registerApi);
export const getApiPermission = createActionAsync('ADMIN_API_PERMISSION', auth.getApiPermission);
export const getApiKey = createActionAsync('ADMIN_GET_API_KEY', auth.getApiKey);
export const updateApiKey = createActionAsync('ADMIN_API_UPDATE', auth.adminUpdateApiKey);
export const isActiveApiKey = createActionAsync('ADMIN_ACTIVATE_API_KEY', auth.isActiveApiKey);
export const adminDeleteApiKey = createActionAsync('ADMIN_DELETE_API_KEY', auth.adminDeleteApiKey);

const initialState = Immutable.fromJS({
  apiList:{},
  loading: false,
  apiPermissions: {},
  registerApiSuccess: false,
  apiPermissionsError: {},
  getApiInfo: {},
  apiUpdateSuccess: false,
  deleteApiKeySuccess: false,
  activeApiKey: false
});

export default createReducer({
  [apiList.ok]: (state, payload) => state.merge({
    apiList: state.concat(payload),
    loading: false,
    apiUpdateSuccess: false,
    deleteApiKeySuccess: false,
    activeApiKey: false
  }),
  [apiList.request]: (state) => state.merge({
    loading: true,
    apiUpdateSuccess: false,
    deleteApiKeySuccess: false,
    activeApiKey: false
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
    getApiInfo: payload,
  }),
  [getApiKey.request]: (state) => state.merge({
    loading: false,
    getApiInfo: {},
  }),
  [updateApiKey.ok]: (state) => state.merge({
    loading: false,
    apiUpdateSuccess: true
  }),
  [updateApiKey.request]: (state) => state.merge({
    loading: true,
    apiUpdateSuccess: false
  }),
  [isActiveApiKey.ok]: (state) => state.merge({
    loading: false,
    activeApiKey: true
  }),
  [isActiveApiKey.request]: (state) => state.merge({
    loading: true,
    activeApiKey: false
  }),
  [adminDeleteApiKey.ok]: (state) => state.merge({
    loading: false,
    deleteApiKeySuccess: true
  }),
  [adminDeleteApiKey.request]: (state) => state.merge({
    loading: true,
    deleteApiKeySuccess: false
  })

}, initialState);
