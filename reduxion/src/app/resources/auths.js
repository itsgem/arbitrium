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
            street_1: payload.street_1,
            street_2: payload.street_2,
            city: payload.city,
            state: payload.state,
            zip: payload.zip,
            rep_first_name: payload.rep_first_name,
            rep_last_name: payload.rep_last_name,
            gender: payload.gender,
            rep_email_address: payload.rep_email_address,
            rep_mobile_code: payload.rep_mobile_code,
            rep_mobile_number: payload.rep_mobile_number,
            rep_phone_code: payload.rep_phone_code,
            rep_position: payload.rep_position,
            rep_department: payload.rep_department,
            username: payload.username,
            password: payload.password,
            password_confirmation: payload.password_confirmation,
            email_address: payload.email_address,
            username: payload.username,
            callback_url: "http://test.com/"
            }
        });
    },
    loginLocal(payload) {
        return post('api/v1/auth/login', {

            params: {
                login: payload.email,
                password: payload.password,
                user_type:"2"
            }
        });
    },
    logout() {
        return post('logout');
    },
    listCountries() {
        return get('list/countries');
    },
    verifyEmailCode(code) {
        return patch('user/register/verify', {
            params: {
                token: code,
                callback_url: 'http://arbitrium.local/login'
            }
        });
    },
    requestPasswordReset(email) {
        return post('auth/reset_password', {
            params: {
                email
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
    }
};
