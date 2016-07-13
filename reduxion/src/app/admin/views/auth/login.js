import React from 'react';
import { Link } from 'react-router';
import tr from 'i18next';
import LocalLoginForm from 'admin/components/auth/localLoginForm';
import DocTitle from 'common/components/docTitle';
import moment from 'moment';
import config from 'config';
import CryptoJS from 'crypto-js';

class Login extends React.Component {
  componentWillReceiveProps(nextProps){
    let path = nextProps.location.query.nextPath || '/coffee';
    if (nextProps.authenticated) {

      let token = nextProps.user.get('data').get('token');
      let lifetime = nextProps.user.get('data').get('lifetime');
      let expired = moment().add(parseInt(lifetime),'minutes').valueOf();
      let role = 0;
      nextProps.user.get('data').get('role_id').map(item => { role = item; } );
      let encryptToken = {
        token: token,
        expired: expired,
        lifetime: lifetime,
        role: role
      };
      localStorage.setItem('coffee', CryptoJS.AES.encrypt(JSON.stringify(encryptToken), config.key));
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
          <div className="mdl-grid mdl-grid--no-spacing" id="other-links">
            <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">
                <Link
                  to="/coffee/forgot">{tr.t('LOGIN.LINK.FORGOT_PW')}</Link>
            </div>
          </div>
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
