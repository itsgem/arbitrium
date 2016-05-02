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
      callbackUrl: null,
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
    let error = this.state.errorServer;
    if(!error) return;

    let results = error.response;

    return (
      <div className="alert alert-danger text-center animate bounceIn" role="alert">
        {mapObject(results, function (key, value) {
          return <div key={key}>{value}</div>;
        })}
      </div>
    );
  },

  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' )
    {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.error && nextProps.error.size > 0){
      this.setState({ step: 'SendPasswordResetEmail' })
    }
    if(nextProps.forgotPassword){
      this.setState({step: 'checkEmail', errors:{}})
    }

  },

  componentWillMount() {
    let url = window.location.origin +'/'+ this.props.routes[1].path+'/resetPassword';
    this.setState({callbackUrl: url});
  },

  render() {

    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }
    return (
      <div id="forgot" className="auth-view">
        <div className="container" title="Forgot password">
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
            <Link to="/i/login"> Back to Login </Link>
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
            <div className={ this.formClassNames('email',errors) }>
              <input className="mdl-textfield__input" type="email" id='email'ref="email"/>
              <label className="mdl-textfield__label" htmlFor="email">{tr.t('email')}</label>
              {errors.email && <small className="mdl-textfield__error shown">{errors.email[0]}</small>}
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

  requestReset(e) {
    e.preventDefault();
    this.setState( {
      errors: {},
      errorServer: null
    } );
    let payload ={
      email: this.refs.email.value,
      callbackUrl: this.state.callbackUrl
    }

     window.componentHandler.upgradeDom();
     return this.validateEmail.call(this, payload)
       .with( this )
       .then(this.requestService)
       .catch( this.errors );
  },
  validateEmail(payload) {
    let rules = new Checkit( {
      email: ['required', 'email'],
      callbackUrl: []
    });
    return rules.run( payload );
  },

  errors( e ) {
    this.setState(createError(e));
  },

  requestService(email){
    return this.props.passwordReset(email);
  },

  formClassNames( field ,errors) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-error': errors[ field ]
    });
  },
});

//function for mapping error
function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
  });
}
