import {
  post,
  get,
  put,
  del,
  patch
} from 'utils/http';

let link = window.location.href.split("/");
export default {
  signupOrLoginThirdParty(provider) {
    return get('auth/' + provider);
  },
  loginLocal(payload) {
    return post('auth/login', {
      params: {
        login: payload.email,
        password: payload.password,
        user_type: (link[3] == 'coffee' ? 1 : 2)
      }
    });
  },
  logout() {
    return delete('auth/logout');
  },
  // ------- ADMIN -------
  getCurrentUser() {
    return get('me');
  },
  listCountries() {
    return get('list/countries');
  },
  verifyEmailCode(code) {
    return patch('user/register/verify', {
      params: {
        token: code,
        callback_url: window.location.origin
      }
    });
  },
  requestPasswordReset(payload) {
    return get('password/forgot', {
      params: {
        login: payload.email,
        user_type: payload.user_type,
        callback_url: payload.callbackUrl
      }
    });
  },
  requestConfirmPasswordReset(payload) {
    return patch('password/reset', {
      params: {
        token: payload.token,
        password: payload.password,
        password_confirmation: payload.password_confirmation
      }
    });
  },
  verifyResetPasswordToken(token, password) {
    return post('auth/verify_reset_password_token', {
      params: {
        token,
        password
      }
    });
  },
  clientList(payload = {page: 1, per_page: 10}) {
    return get('admin/client',{
      params: payload
    });
  },
  clientProfile(id) {
    return get('admin/client/' + id, {
      params: {
        'with-user': 1
      }
    });
  },
  clientDelete(id) {
    return del('admin/client/' + id);
  },
  clientApprove(id) {
    return patch('admin/client/' + id + '/approve', {
      params: {
        callback_url: window.location.origin + "/i/login"
      }
    });
  },
  clientDisapprove(id) {
    return patch('admin/client/' + id + '/disapprove');
  },
  clientActivate(id) {
    return patch('user/' + id + '/activate');
  },
  clientDeactivate(id) {
    return patch('user/' + id + '/deactivate');
  },
  validateUsername(payload) {
    return get('user/available', {
      params: payload
    });
  },
  adminClientRegister(payload) {
    return post('admin/client', {
      params: {
        company_name: payload.company_name,
        street_address_1: payload.street_address_1,
        street_address_2: payload.street_address_2,
        city: payload.city,
        state: payload.state,
        postal_code: payload.postal_code,
        country_id: payload.country_id,
        rep_first_name: payload.rep_first_name,
        rep_last_name: payload.rep_last_name,
        rep_gender: payload.rep_gender,
        rep_email_address: payload.rep_email_address,
        rep_mobile_code: payload.rep_mobile_code,
        rep_mobile_number: payload.rep_mobile_number,
        rep_phone_code: payload.rep_phone_code,
        rep_phone_number: payload.rep_phone_number,
        rep_position: payload.rep_position,
        rep_department: payload.rep_department,
        username: payload.username,
        password: payload.password,
        password_confirmation: payload.password_confirmation,
        email_address: payload.email_address,
        username: payload.username,
        alt_first_name: payload.alt_first_name,
        alt_last_name: payload.alt_last_name,
        alt_gender: payload.alt_gender,
        alt_email_address: payload.alt_email_address,
        alt_mobile_code: payload.alt_mobile_code,
        alt_mobile_number: payload.alt_mobile_number,
        alt_phone_code: payload.alt_phone_code,
        alt_phone_number: payload.alt_phone_number,
        alt_position: payload.alt_position,
        alt_department: payload.alt_department,
        callback_url: window.location.origin + "/forgot"
      }
    });
  },
  adminClientUpdate(payload) {
    return put('admin/client/' + payload.id, {
      params: payload
    });
  },
  // Admin - User Management
  adminUserManagementList(payload = {page: 1}) {
    return get('admin', {params: payload});
  },
  adminUserManagementAdd(payload) {
    return post('admin', {
      params: {
        username: payload.username,
        email_address: payload.email_address,
        first_name: payload.first_name,
        last_name: payload.last_name,
        role_id: payload.role_id,
        password: payload.password,
        password_confirmation: payload.password_confirmation
      }
    });
  },
  adminUserManagementUpdate(payload) {
    return put('admin/' + payload.id, {
      params: {
        username: payload.username,
        email_address: payload.email_address,
        first_name: payload.first_name,
        last_name: payload.last_name,
        role_id: payload.role_id,
        password: payload.password,
        password_confirmation: payload.password_confirmation
      }
    });
  },
  getAdminInfo(id) {
    return get('admin/' + id, {
      params: {
        'with-user': 1
      }
    });
  },

  listRoleAdmin(){
    return get('list/role/admin');
  },
  deleteAdminAccount(id){
    return del('admin/' + id);
  },
  getApiList(payload = {page: 1, per_page: 10}) {
    return get('admin/api-key', {
      params: payload
    });
  },
  isActiveApiKey(payload) {
    return patch('admin/api-key/' + payload.id + "/activate", {
      params: {
        is_active: payload.is_active
      }
    });
  },
  registerApi(payload) {
    return post('admin/api-key',{
      params: {
        client_id: payload.client_id,
        name: payload.description,
        description: payload.description,
        ip_addresses: payload.ip_addresses,
        is_whitelist: payload.is_whitelist,
        permissions: payload.permissions,
        is_api_call_restricted: payload.is_api_call_restricted,
        is_test_key: payload.is_test_key,
        token: 'sample'
      }
    });
  },
  adminUpdateApiKey(payload) {
    return put('admin/api-key/' + payload.id,{
      params: {
        client_id: payload.client_id,
        name: payload.description,
        description: payload.description,
        ip_addresses: payload.ip_addresses,
        is_whitelist: payload.is_whitelist,
        permissions: payload.permissions,
        is_api_call_restricted: payload.is_api_call_restricted,
        is_test_key: payload.is_test_key,
        token: 'sample'
      }
    });
  },
  getApiKey(id) {
    return get('admin/api-key/' + id);
  },
  getApiPermission() {
    return get('api-permission');
  },
  adminDeleteApiKey(id) {
    return del('admin/api-key/' + id);
  },

  // ------- CLIENT -------
  signupLocal(payload) {
      return post('user/client/register', {
          params: {
          company_name: payload.company_name,
          street_address_1: payload.street_address_1,
          street_address_2: payload.street_address_2,
          city: payload.city,
          state: payload.state,
          postal_code: payload.postal_code,
          country_id: payload.country_id,
          rep_first_name: payload.rep_first_name,
          rep_last_name: payload.rep_last_name,
          rep_gender: payload.rep_gender,
          rep_email_address: payload.rep_email_address,
          rep_mobile_code: payload.rep_mobile_code,
          rep_mobile_number: payload.rep_mobile_number,
          rep_phone_code: payload.rep_phone_code,
          rep_phone_number: payload.rep_phone_number,
          rep_position: payload.rep_position,
          rep_department: payload.rep_department,
          username: payload.username,
          password: payload.password,
          password_confirmation: payload.password_confirmation,
          email_address: payload.email_address,
          username: payload.username,
          callback_url: window.location.origin + "/i/verifyEmail"
          }
      });
  },
  getAvailableUsername(payload) {
    return get('user/available', {
      params: payload
    });
  },
  getClientProfile() {
    return get('client/profile', {
      params: {
        'with-user': 1
      }
    });
  },
  updateClientProfile(payload) {
    return put('client/profile', {
      params: payload
    });
  },
  updateClientPassword(payload) {
    return put('user/password/change', {
      params: payload
    });
  },
   // Send Change Email Address Email
  updateClientEmail(payload) {
    return get('user/email/change', {
      params: payload
    });
  },
  // Retrieve Change Email Token
  retrieveEmailChangeToken(payload) {
    return get('user/email/token', {
      params: payload
    });
  },
  // Change Email
  verifyEmailChange(payload) {
    return patch('user/email/verify', {
      params: payload
    });
  },
  // Cancel Change Email
  cancelEmailChange(payload) {
    return get('user/email/cancel-change', {
      params: payload
    });
  },
  clietApiKeys(payload = {page: 1, per_page: 10}) {
    return get('client/api-key', {
      params : payload
    });
  },
  clientIsActiveApiKey(payload) {
    return patch('client/api-key/' + payload.id + "/activate", {
      params: {
        is_active: payload.is_active
      }
    });
  },
  clientRegisterApi(payload) {
    return post('client/api-key',{
      params: {
        name: payload.description,
        description: payload.description,
        ip_addresses: payload.ip_addresses,
        is_whitelist: payload.is_whitelist,
        permissions: payload.permissions,
        is_api_call_restricted: payload.is_api_call_restricted,
        is_test_key: payload.is_test_key,
      }
    });
  },
  clientGetApiKey(id) {
    return get('client/api-key/' + id);
  },
  clientUpdateApiKey(payload) {
    return put('client/api-key/' + payload.id,{
      params: {
        name: payload.description,
        description: payload.description,
        ip_addresses: payload.ip_addresses,
        is_whitelist: payload.is_whitelist,
        permissions: payload.permissions,
        is_api_call_restricted: payload.is_api_call_restricted,
        is_test_key: payload.is_test_key,
        token: 'sample'
      }
    });
  },
  clientDeleteApiKey(id) {
    return del('client/api-key/' + id);
  }
};
