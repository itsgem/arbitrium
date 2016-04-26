/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const adminUserManagementList = createActionAsync('ADMIN_USER_MANAGEMENT_LIST', auth.adminUserManagementList);
export const adminUserManagementAdd = createActionAsync('ADMIN_USER_MANAGEMENT_ADD', auth.adminUserManagementAdd);
export const deleteAdminAccount = createActionAsync('ADMIN_USER_MANAGEMENT_DELETE', auth.deleteAdminAccount);
export const listRoleAdmin = createActionAsync('LIST_ROLE_ADMIN', auth.listRoleAdmin);


const initialState = Immutable.fromJS({
  adminList: {},
  adminAdd: {},
  adminDelete: {},
  role: {}
});

export default createReducer({
  [adminUserManagementList.ok]: (state, payload) => state.merge({adminList: payload}),
  [adminUserManagementAdd.ok]: (state, payload) => state.merge({adminAdd: state.concat(payload)}),
  [listRoleAdmin.ok]: (state, payload) => state.merge({role: payload}),
  [deleteAdminAccount.ok]: (state, payload) => state.merge({adminDelete: payload})
}, initialState);
