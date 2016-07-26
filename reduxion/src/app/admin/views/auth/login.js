import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import { Link } from 'react-router';
import LocalLoginForm from 'admin/components/auth/localLoginForm';
import moment from 'moment';
import config from 'config';
import CryptoJS from 'crypto-js';
import i18next from 'i18next';

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
  changeLanguage(lang) {
    i18next
        .init({
          fallbackLng: [lang.target.value],
          lng: lang.target.value
        });
    setTimeout(() => {
      location.reload();
    },1000);
  }
  render() {
    let selectLang = localStorage.getItem('i18nextLng') ? localStorage.getItem('i18nextLng') : 'en';
    return (
      <div id='login' className="auth-view">
        <DocTitle
          title={tr.t('ADMIN_LOGIN.DOC_TITLE')}
        />
        <div className="selectCountry">
          <label>{tr.t('LABEL.SELECT_COUNTRY_SITE')}</label>
            <div className="country-opt mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield">
              <div className="mdl-selectfield">
                <select
                  className="mdl-textfield__input" onChange={(e) => this.changeLanguage(e) } value={selectLang}>
                  <option value="en">English</option>
                  <option value="fr">France</option>
                  <option value="it">Italia</option>
                </select>
              </div>
          </div>
        </div>
        <div className="login-view">
          <LocalLoginForm login={this.props.login}/>
          <div className="mdl-grid mdl-grid--no-spacing" id="other-links">
            <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet">
                <Link
                  to="/coffee/forgot">{tr.t('BUTTON.FORGOT_PASSWORD')}</Link>
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
