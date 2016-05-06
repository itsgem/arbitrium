import _ from 'lodash';
import React from 'react';
import config from 'config';

export default React.createClass({
  getDefaultProps() {
    return {
      socialAuth: _.extend({}, config.socialAuth),
      onAuthenticated: () => {}
    };
  },

  render() {
    let {socialAuth} = this.props;

    return (
      <div className="media-signin-buttons">
        {socialAuth.facebook && this.renderFacebook()}
      </div>
    );
  },

  renderFacebook(){
    return (<a href="/api/v1/auth/facebook">
          <span>Sign in with Facebook</span>
        </a>);
  }
} );
