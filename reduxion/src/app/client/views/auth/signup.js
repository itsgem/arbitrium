import React from 'react';
import tr from 'i18next';
import DocTitle from 'common/components/docTitle';
import LocalSignupForm from 'client/components/auth/localSignupForm';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount(){
    this.props.country();
  },
  render() {
    return (
      <div id="signup" className="auth-view">
        <DocTitle
          title={tr.t('CLIENT_SIGN_UP.DOC_TITLE')}
        />
        { this.props.registerCompleted && this.renderRegisterComplete() }
        { !this.props.registerCompleted && this.renderRegisterForm() }
      </div>
    );
  },
  renderRegisterComplete(){
    return (
        <div className="container">
          <div className="local-login-form">
            <div className="bar">
              <span className="bar-title">{tr.t('CLIENT_SIGN_UP.TITLE')}</span>
            </div>
            <div id="success-box" className="local-signin-form login-frame">

              <p>{tr.t('CLIENT_SIGN_UP.NOTE.CONFIRMATION_EMAIL')}<br />{tr.t('CLIENT_SIGN_UP.NOTE.VERIFY_EMAIL')}</p>
              <Link
                  id='btn-signup'
                  to="/i/login">{tr.t('BUTTON.BACK_TO_LOGIN')}</Link>
            </div>
          </div>
        </div>
    );
  },
  renderRegisterForm(){
    let countryList = this.props.countryList;
    return (
      <div id="top" className="signup-view">
        <LocalSignupForm signup={this.props.signup} registerCompleted={this.props.registerCompleted} signupError={this.props.signupError} country={countryList}/>
        <div className="mdl-grid mdl-grid--no-spacing" id="other-links"></div>
      </div>
    );
  }
} );
