import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import DocTitle from 'components/docTitle';
import tr from 'i18next';
import { Link } from 'react-router';
import Checkit from 'checkit';

import {createError} from 'utils/error';

export default React.createClass( {

  mixins: [
    LinkedStateMixin,
  ],
  defaultProps: {
    errors:[]
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
    let error ={};
    this.setState({errors:error ,step: 'SendPasswordResetEmail'});
    let email = e.target.value;
    this.setState({ email:email });
  },
  renderError() {
      let error =this.props.error.get('status') ? true : false;
      if(!error) return;

      /*return (
         <div className="alert alert-danger text-center animate bounceIn" role="alert">
            {this.props.error.get('data').message}
        </div>
      );*/
  },

  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' )
    {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  },

  componentWillReceiveProps(nextProps) {
    console.log("rrr",nextProps)
    if(nextProps.error && nextProps.error.size > 0){
      this.setState({ step: 'SendPasswordResetEmail' })
    }
    if(nextProps.forgotPassword){
      console.log('xxxx',nextProps)
      this.setState({step: 'checkEmail', errors:{}})
    }

  },

  render() {
    return (
      <div id="forgot" className="auth-view">
        <div className="container mdl-shadow--2dp" title="Forgot password">
          { this.renderError()}
          <div className="bar">
            <span className="bar-title">Forgot Password</span>
            <DocTitle title="Forgot password"/>
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
            <Link to="/coffee/login"> Back to Login </Link>
          </div>
        </div>
      </div>
    );
  },

  renderSendPasswordResetEmail() {
    if ( this.state.step != 'SendPasswordResetEmail' ) {
      return;
    }

    let errors = this.state.errors;
    return (
      <div className="login-view">
         <legend className="forgot-legend">Password Reset</legend>
        <div className="local-login-form">
          <form>
            <span className="forgot-text"><strong>Enter the email address used when you registered with username and password. </strong></span>
            <span className="forgot-text">You'll be sent a reset code to change your password.</span>
            <div className={ this.formClassNames('email') }>
              <input className="mdl-textfield__input" type="email" id='email'ref="email"/>
              <label className="mdl-textfield__label" htmlFor="email">{tr.t('email')}</label>
              {errors.email && <small className="mdl-textfield__error shown">{errors.email}</small>}
            </div>
            <div className="spacer">
              <button type="button"
              className='auth-button primary mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'
              onClick={(e)=>this.requestReset(e)}>
                Send Reset Email
              </button>
            </div>
           </form>
        </div>
      </div>
    );
  },
  renderCheckEmail() {
    if ( this.state.step != 'checkEmail' ) {
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

  requestReset(e) {
    e.preventDefault();
    this.setState( {
        errors: {},
        errorServer: null
    } );
    let payload ={
      email: this.refs.email.value
    }

     window.componentHandler.upgradeDom();
     return this.validateEmail.call(this, payload)
       .with( this )
       .then(this.requestService)
       .catch( this.errors );
  },
  validateEmail(payload) {
    let rules = new Checkit( {
        email: { rule: 'required'},
    } );
    return rules.run( payload );
  },

  errors( e ) {
    this.setState(createError(e));
  },

  requestService(email){
    return this.props.passwordReset(email);
  },

  formClassNames( field ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield', {
      'is-invalid is-dirty': this.state.errors[ field ],
      'has-error': this.state.errors[ field ]
    });
  },
});
