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
        return post('auth/register', {
            params: {
                password: payload.password,
                email: payload.email
            }
        });
    },
    loginLocal(payload) {
        return post('auth/login', {
            params: {
                email: payload.email,
                password: payload.password
            }
        });
    },
    logout() {
        return post('logout');
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
