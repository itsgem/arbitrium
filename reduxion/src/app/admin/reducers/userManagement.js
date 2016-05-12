/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'services/auths';

export const adminUserManagementList = createActionAsync('ADMIN_USER_MANAGEMENT_LIST', auth.adminUserManagementList);
export const adminUserManagementAdd = createActionAsync('ADMIN_USER_MANAGEMENT_ADD', auth.adminUserManagementAdd);
export const adminUserManagementUpdate = createActionAsync('ADMIN_USER_MANAGEMENT_UPDATE', auth.adminUserManagementUpdate);
export const deleteAdminAccount = createActionAsync('ADMIN_USER_MANAGEMENT_DELETE', auth.deleteAdminAccount);
export const getAdminInfo = createActionAsync('GET_ADMIN_INFO', auth.getAdminInfo);
export const listRoleAdmin = createActionAsync('LIST_ROLE_ADMIN', auth.listRoleAdmin);

export const validateUsername = createActionAsync('CHECK_USERNAME', auth.validateUsername);

const initialState = Immutable.fromJS({
  adminList: {},
  adminAdd: {},
  adminDelete: false,
  adminUpdate: false,
  adminInfo: {},
  role: {},
  registerCompleted: false,
  deleteSuccess: false,
  loading: false,
  validateCompleted: false
});

export default createReducer({
  [adminUserManagementList.ok]: (state, payload) => state.merge({
    adminList: payload,
    adminAdd: {},
    adminDelete: false,
    adminUpdate: false,
    adminInfo: {},
    role: {},
    registerCompleted: false,
    deleteSuccess: false,
    loading: false,
    validateCompleted: false }),
  [adminUserManagementList.request]: (state) => state.merge({
    adminAdd: {},
    adminDelete: false,
    adminUpdate: false,
    adminInfo: {},
    role: {},
    registerCompleted: false,
    deleteSuccess: false,
    loading: true,
    validateCompleted: false }),
  [adminUserManagementAdd.ok]: (state, payload) => state.merge({
    adminAdd: state.concat(payload),
    registerCompleted: true,
    loading: false }),
  [adminUserManagementAdd.request]: (state) => state.merge({
    registerCompleted: false,
    loading: true}),
  [listRoleAdmin.ok]: (state, payload) => state.merge({
    role: payload,
    validateCompleted: false}),
  [deleteAdminAccount.ok]: (state, payload) => state.merge({
    adminDelete: true,
    loading: false}),
  [deleteAdminAccount.request]: (state, payload) => state.merge({
    adminDelete: false,
    loading: true}),
  [getAdminInfo.ok]: (state, payload) => state.merge({
    adminInfo: payload,
    registerCompleted: false,
    adminUpdate: false,
    loading: false}),
  [getAdminInfo.request]: (state, payload) => state.merge({
    loading: true,
    registerCompleted: false,
    adminUpdate: false,
    loading: true}),
  [adminUserManagementUpdate.ok]: (state) => state.merge({
    adminUpdate: true,
    loading: false}),
  [adminUserManagementUpdate.request]: (state) => state.merge({
    adminUpdate: false,
    loading: true}),
  [validateUsername.ok]: (state) => state.merge({validateCompleted: true}),
  [validateUsername.request]: (state) => state.merge({validateCompleted: false}),
  [validateUsername.error]: (state) => state.merge({validateCompleted: false}),
}, initialState);
