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
          callback_url: window.location.origin + "/verifyEmail/"
          }
      });
  },
  loginLocal(payload) {

      return post('auth/login', {
          params: {
              login: payload.email,
              password: payload.password,
              user_type:"1"
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
              callback_url: window.location.origin
          }
      });
  },
  requestPasswordReset(payload) {
      return get('password/forgot', {
          params: {
              login: payload.email,
              user_type: 2,
              callback_url: 'http://localhost:9991/login'
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
              callback_url: 'http://localhost:9991/'
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
    return post('admin/client/', {
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
        callback_url: window.location.origin + "/fotgot/"
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
  updateClientPassword(payload) {
    return put('user/password/change', {
      params: payload
    });
  }
};
