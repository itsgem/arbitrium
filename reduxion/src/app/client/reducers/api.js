/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const clietApiKeys = createActionAsync('CLIENT_API_KEYS', auth.clietApiKeys);
export const isActiveApiKey = createActionAsync('CLIENT_ACTIVATE_API_KEY', auth.clientIsActiveApiKey);
export const getApiPermission = createActionAsync('CLIENT_API_PERMISSION', auth.getApiPermission);
export const clientRegisterApi = createActionAsync('CLIENT_REGISTER_API', auth.clientRegisterApi);
export const clientGetApiKey = createActionAsync('CLIENT_GET_API_KEY', auth.clientGetApiKey);
export const clientUpdateApiKey = createActionAsync('CLIENT_GET_UPDATE_API_KEY', auth.clientUpdateApiKey);
export const clientDeleteApiKey = createActionAsync('CLIENT_DELETE_API_KEY', auth.clientDeleteApiKey);

const initialState = Immutable.fromJS({
  loading: false,
  listApiKeys: {},
  registerApiSuccess: false,
  apiPermissions: {},
  apiKeyInfo: {},
  apiUpdateSuccess: false,
  deleteApiKeySuccess: false
});

export default createReducer({
  [clietApiKeys.ok]: (state, payload) => state.merge({
    loading: false,
    listApiKeys: state.concat(payload),
    apiUpdateSuccess: false,
    deleteApiKeySuccess: false
  }),
  [clietApiKeys.request]: (state) => state.merge({
    loading: true,
    apiUpdateSuccess: false,
    deleteApiKeySuccess: false
  }),
  [isActiveApiKey.ok]: (state) => state.merge({
    loading: false
  }),
  [isActiveApiKey.request]: (state) => state.merge({
    loading: true
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
  [clientRegisterApi.ok]: (state) => state.merge({
    loading: false,
    registerApiSuccess: true
  }),
  [clientRegisterApi.request]: (state) => state.merge({
    loading: true,
    registerApiSuccess: false
  }),
  [clientGetApiKey.ok]: (state, payload) => state.merge({
    apiKeyInfo: state.concat(payload),
    loading: false
  }),
  [clientGetApiKey.request]: (state) => state.merge({
    apiKeyInfo: {},
    loading: true
  }),
  [clientUpdateApiKey.ok]: (state) => state.merge({
    loading: false,
    apiUpdateSuccess: true
  }),
  [clientUpdateApiKey.request]: (state) => state.merge({
    loading: true,
    apiUpdateSuccess: false
  }),
  [clientDeleteApiKey.ok]: (state) => state.merge({
    loading: false,
    deleteApiKeySuccess: true
  }),
  [clientDeleteApiKey.request]: (state) => state.merge({
    loading: true,
    deleteApiKeySuccess: false
  }),
}, initialState);
