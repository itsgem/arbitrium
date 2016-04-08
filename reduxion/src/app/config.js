import _ from 'lodash';

/* global process */
let env = process.env;

let config = {

    general: {
        title: 'Reduxion',
        description: 'Reduxion is a redux boilerplate written in es6/es7',
        apiUrl: env.API_URL,
        analytics: {
            google: ""
        },
        socialAuth: {
            facebook: true
        }
    },

    development: {
        env: "development"
    },

    production: {
        env: "production"

    }
};

export default _.extend( {}, config.general, config[ env.NODE_ENV ] );
