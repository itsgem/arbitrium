import React from 'react';
import _ from 'lodash';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import DocTitle from 'components/docTitle';
import tr from 'i18next';
import { Link } from 'react-router';

import ValidateEmail from 'services/validateEmail';
import ValidateRequiredField from 'services/validateRequiredField';
import Checkit from 'checkit';

import {createError} from 'utils/error';

export default React.createClass( {

  mixins: [
    LinkedStateMixin,
  ],
  propTypes:{
      passwordReset: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      step: 'SendPasswordResetEmail',
      errors: {},
      email:'',
      errorServer:null,
    };
  },

  onChangeEmail(e) {
    let email = e.target.value;
    this.setState({ email:email });
  },
  renderError() {
      let error = this.props.error.get('status') ? true : false;
      if(!error) return;
      //let arr = Object.keys(error.response).map(function (key) {return error.response[key]});
      //let results = error.response;
      return (
         <div className="alert alert-danger text-center animate bounceIn" role="alert">
              {this.props.error.get('data').message}
        </div>
      );
  },

  render() {

    console.log('sss', this)

    return (
      <div id="forgot" className="auth-view">
        <div className="container mdl-shadow--2dp" title="Forgot password">
          <div className="bar">
            <span className="bar-title">Forgot Password</span>
            <DocTitle title="Forgot password"/>
            { this.renderError()}
            </div>
            <fieldset>
              <div className="background">
                { this.renderSendPasswordResetEmail()}
                { this.renderCheckEmail() }
              </div>
            </fieldset>
        </div>
        <div className="mdl-grid mdl-grid--no-spacing forgot-footer" id="other-links">
          <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">
            <Link to="/login"> Back to Login </Link>
          </div>
        </div>
      </div>
    );
  },

  renderSendPasswordResetEmail() {
    if ( this.state.step != 'SendPasswordResetEmail' ) {
      return;
    }

    return (
      <div className="login-view">
         <legend className="forgot-legend">Password Reset</legend>
        <div className="local-login-form">
          <form>
            <span className="forgot-text"><strong>Enter the email address used when you registered with username and password. </strong></span>
            <span className="forgot-text">You'll be sent a reset code to change your password.</span>
            <div className={ this.formClassNames('email') }>
              <input className="mdl-textfield__input" type="email" id='email'ref="email"
               value={this.state.email} onChange={this.onChangeEmail}
              />
              <label className="mdl-textfield__label" htmlFor="email">{tr.t('email')}</label>
            </div>
            <div className="spacer">
              <button type="button"
              className='auth-button primary mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'
              onClick={this.requestReset}>
                Send Reset Email
              </button>
            </div>
           </form>
        </div>
      </div>
    );
  },
  renderCheckEmail() {
    if ( this.state.step !=  ) {
      return;
    }
    return (
      <div className="login-view">
        <legend className="forgot-legend">Step 2 - Check Email</legend>
        <div className="local-login-form">
          <div className="step-two-content">
            <span className="forgot-step-two"><strong>An email has been sent containing your reset link. Click on this link to proceed.</strong></span>

            <span className="forgot-step-two">Please also check your spam folder just in case the reset email ended up there.</span>

            <span className="forgot-step-two">This page can be safely closed.</span>
          </div>
        </div>
      </div>
    );
  },

  renderErrorsFor( field ) {
    if ( this.state.errors[ field ] ) {
      return (
        <span className="label label-danger animate bounceIn">{ this.state.errors[ field ]}</span>
      );
    }
  },

  requestReset() {
    let payload ={}
    this.resetErrors();
    this.setState( {
        errors: {},
        errorServer: null
    } );
    this.props.passwordReset( this.email());
    // return this.validateEmail.call( this, payload )
    //   .with( this )
    //   .then( this.requestReset )
    //   .catch( this.errors );
  },
  validateEmail(payload) {
    let rules = new Checkit( {
        email: { rule: 'required'},
    } );
    return rules.run( payload );
  },

  requestReset() {
    return this.props.passwordReset( this.email() );
  },

  errors( e ) {
    this.setState(createError(e));
  },
  email() {
    return this.state.email;
  },

  code() {
    return _.trim( this.state.code );
  },

  password() {
    return _.trim( this.state.password );
  },

  resetErrors() {
    this.setState({
        errors: {}
    });
  },

  formClassNames( field ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield', {
      'has-error': this.state.errors[ field ]
    });
  }
});
