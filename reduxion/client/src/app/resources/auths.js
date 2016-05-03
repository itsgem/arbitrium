import {
  post,
  get,
  put,
  del,
  patch
} from 'utils/http';

export default {
  getCurrentUser() {
      return get('me');
  },
  signupOrLoginThirdParty(provider) {
      return get('auth/' + provider);
  },
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
  loginLocal(payload) {

      return post('auth/login', {
          params: {
              login: payload.email,
              password: payload.password,
              user_type:"2"
          }
      });
  },
  logout() {
      return delete('auth/logout');
  },
  listCountries() {
      return get('list/countries');
  },
  verifyEmailCode(code) {
      return patch('user/register/verify', {
          params: {
              token: code,
              callback_url: window.location.origin + "/i/login"
          }
      });
  },
  requestPasswordReset(payload) {
    return get('password/forgot', {
      params: {
        login: payload.email,
        user_type: 2,
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
  clientProfile(id) {
        return get('admin/client/' + id);
  },
  clientApprove(id) {
      return patch('admin/client/' + id + '/approve', {
          params: {
              callback_url: window.location.origin
          }
      });
  },
  clientDisapprove(id) {
      return patch('admin/client/' + id + '/disapprove', {
          params: {
              callback_url: window.location.origin
          }
      });
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
        callback_url: window.location.origin + "/forgot"
      }
    });
  },
  // User - Client
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
  adminUserManagementEdit(payload) {
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
  deleteAdminAccount(payload){
    return del('admin/' + payload.id);
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
  }
};
