import _ from 'lodash';

/* global process */
let env = process.env;

let config = {

  general: {
    title: 'Reduxion',
    description: 'Reduxion is a redux boilerplate written in es6/es7',
    apiUrl: env.API_URL,
    socialAuth: {
      facebook: true
    }
  },

  development: {
    env: "development",
    apiUrl: env.API_URL
  },

  production: {
    env: "production",
    apiUrl: env.API_URL
  },

  secret: {
    key: 'IdeaRobinArbitrium'
  }
};

export default _.extend( {}, config.general, config[ env.NODE_ENV ], config.secret );
