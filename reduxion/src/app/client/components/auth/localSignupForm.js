import React from 'react';
import Checkit from 'checkit';
import LocalAuthenticationFormSignup from 'client/components/auth/localAuthenticationFormSignup';
import {createError} from 'utils/error';
import tr from 'i18next';

import Debug from 'debug';

let debug = new Debug("components:signup");

class LocalSignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      company_name:null
    };
  }

  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' )
    {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  renderError() {
    let error = this.state.errorServer;
    if(!error) return;
    let results = error.response;
    return (
      <div className="msg-server alert alert-danger text-center animate bounceIn" role="alert">
        {mapObject(results, function (key, value) {
          return <div key={key}>{value}</div>;
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="local-signup-form">
        <div className="alert alert-warning">
          <i className="material-icons"></i>
          <div className="content">
            {tr.t('LABEL.PLEASE_REVIEW')}
          </div>
        </div>
        <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar error-snack">
          <div className="mdl-snackbar__text"></div>
          <button type="button" className="mdl-snackbar__action"></button>
        </div>
        <LocalAuthenticationFormSignup
          showLogin = {true}
          errorServer = {this.state.errorServer}
          country = {this.props.country}
          buttonCaption = { tr.t('BUTTON.CREATE_ACCOUNT') }
          errors = { this.state.errors }
          onButtonClick = {(payload) => {this.signup(payload)}}
          />

      </div>
    );
  }

  signup( payload ) {
    this.setState( {
      errors: {},
      errorServer: null
    } );
    window.componentHandler.upgradeDom();
    return validateSignup.call( this, payload )
      .with( this )
      .then( signupLocal )
      .catch( setErrors );
  }

}

LocalSignupForm.propTypes = {
  signup: React.PropTypes.func.isRequired
};

LocalSignupForm.defaultProps = {
  onLoggedIn: () => {}
};

function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}

function validateSignup( payload ) {
  let rules = new Checkit( {
    company_name: { rule: 'required', label: tr.t('LABEL.COMPANY_NAME')},
    street_address_1: [],
    street_address_2: [],
    city: [],
    state: [],
    postal_code: [],
    country_id: [],
    rep_first_name: { rule: 'required', label: tr.t('LABEL.FIRST_NAME') },
    rep_last_name: { rule: 'required', label: tr.t('LABEL.LAST_NAME') },
    rep_gender: [],
    rep_email_address: [{ rule: 'required', label: tr.t('LABEL.EMAIL_ADDRESS') }, { rule: 'email', label: tr.t('LABEL.EMAIL_ADDRESS') }],
    rep_mobile_code: [],
    rep_mobile_number: [],
    rep_phone_code: [],
    rep_phone_number: [],
    rep_position: { rule: 'required', label: tr.t('LABEL.POSITION') },
    rep_department: { rule: 'required', label: tr.t('LABEL.DEPARTMENT') },
    password_confirmation: {rule: 'required', label: tr.t('LABEL.CONFIRM_PASSWORD')},
    password: [
      {rule: 'required', label: tr.t('LABEL.PASSWORD')},
      {rule: 'minLength:8', label: tr.t('LABEL.PASSWORD')},
      {rule: 'maxLength:64', label: tr.t('LABEL.PASSWORD')}
    ],
    email_address:  [{ rule: 'required', label: 'Email address' }, { rule: 'email', label: tr.t('LABEL.EMAIL_ADDRESS') }],
    username: [
      {rule: 'required', label: tr.t('LABEL.USERNAME')},
      {rule: 'alphaNumeric', label: tr.t('LABEL.USERNAME')},
      {rule: 'minLength:8', label: tr.t('LABEL.USERNAME')},
      {rule: 'maxLength:64', label: tr.t('LABEL.USERNAME')}
    ]
  } );
  return rules.run( payload );
}

function signupLocal( payload ) {
  debug('signupLocal: ', payload)
  return this.props.signup(payload);
}

function setErrors( e ) {
  debug("setErrors", e);
  this.setState(createError(e));
}

export default LocalSignupForm;
