import {
    post,
    get,
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
        return post('auth/verify_email_code/', {
            params: {
                code: code
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
    },
    clientProfile(id) {
        return get('admin/client/' + id);
    },
    clientApprove(id) {
        return patch('admin/client/' + id + '/approve', {
            params: {
                'callback_url': 'http://localhost:9991/'
            }
        });
    },
    clientDisapprove(id) {
        return patch('admin/client/' + id + '/disapprove', {
            params: {
                'callback_url': 'http://localhost:9991/'
            }
        });
    }
};
