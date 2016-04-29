/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';

export const adminUserManagementList = createActionAsync('ADMIN_USER_MANAGEMENT_LIST', auth.adminUserManagementList);
export const adminUserManagementAdd = createActionAsync('ADMIN_USER_MANAGEMENT_ADD', auth.adminUserManagementAdd);
export const adminUserManagementEdit = createActionAsync('ADMIN_USER_MANAGEMENT_EDIT', auth.adminUserManagementEdit);
export const deleteAdminAccount = createActionAsync('ADMIN_USER_MANAGEMENT_DELETE', auth.deleteAdminAccount);
export const getAdminInfo = createActionAsync('GET_ADMIN_INFO', auth.getAdminInfo);
export const listRoleAdmin = createActionAsync('LIST_ROLE_ADMIN', auth.listRoleAdmin);


const initialState = Immutable.fromJS({
  adminList: {},
  adminAdd: {},
  adminDelete: false,
  adminEdit: false,
  adminInfo: {},
  role: {},
  registerCompleted: false,
  deleteSuccess: false,
  loading: false
});

export default createReducer({
  [adminUserManagementList.ok]: (state, payload) => state.merge({adminList: payload, loading:false, adminDelete: false}),
  [adminUserManagementList.request]: (state, payload) => state.merge({loading: true, adminDelete: false}),
  [adminUserManagementAdd.ok]: (state, payload) => state.merge({adminAdd: state.concat(payload), registerCompleted: true}),
  [listRoleAdmin.ok]: (state, payload) => state.merge({role: payload}),
  [deleteAdminAccount.ok]: (state, payload) => state.merge({adminDelete: true, loading: false}),
  [deleteAdminAccount.request]: (state, payload) => state.merge({adminDelete: false, loading: true}),
  [getAdminInfo.ok]: (state, payload) => state.merge({adminInfo: payload, registerCompleted: false, adminEdit: false, loading: false}),
  [getAdminInfo.request]: (state, payload) => state.merge({loading: true, registerCompleted: false, adminEdit: false, loading: true}),
  [adminUserManagementEdit.ok]: (state) => state.merge({adminEdit: true, loading: false}),
  [adminUserManagementEdit.request]: (state) => state.merge({adminEdit: false, loading: true})
}, initialState);
