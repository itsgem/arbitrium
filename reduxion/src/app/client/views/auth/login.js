import React from 'react';
import LocalLoginForm from 'client/components/auth/localLoginForm';
import DocTitle from 'common/components/docTitle';
import moment from 'moment';
import config from 'config';
import CryptoJS from 'crypto-js';
import tr from 'i18next';

class Login extends React.Component {
  componentWillReceiveProps(nextProps){
    let path = nextProps.location.query.nextPath || '/i';
    if (nextProps.authenticated) {
      let token = nextProps.user.get('data').get('token');
      let lifetime = nextProps.user.get('data').get('lifetime');
      let expired = moment().add(lifetime,'minutes').valueOf();

      let encryptToken = {
        token: token,
        expired: expired,
        lifetime: lifetime
      };

      localStorage.setItem('token', CryptoJS.AES.encrypt(JSON.stringify(encryptToken), config.key));
      this.context.router.push(path);
    }
  }

  render() {
    return (
      <div id='login' className="auth-view">
        <DocTitle
          title={tr.t('LOGIN.DOC_TITLE')}
        />
        <div className="login-view">
          <LocalLoginForm login={this.props.login}/>

        </div>

      </div>
    );
  }
};

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

Login.propTypes = {
  authenticated: React.PropTypes.bool.isRequired,
  login: React.PropTypes.func.isRequired,
  user: React.PropTypes.object
}

export default Login;
