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
      errors: {},
      password:'',
      password_confirmation:'',
      errorServer:null,
    };
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
    if(nextProps.error && nextProps.error.size > 0){
      this.setState({ step: 'SendPasswordResetEmail' })
    }
    if(nextProps.forgotPassword){
      this.setState({step: 'checkEmail', errors:{}})
    }

  },

  render() {
    return (
      <div id="forgot" className="auth-view">
        <div className="container mdl-shadow--2dp" title="Forgot password">
          { this.renderError()}
          <div className="bar">
            <span className="bar-title">Confirm</span>
            <DocTitle title="Confirm"/>
            </div>
            <fieldset>
              <div className="background">
                <div className="login-view">
                  <div className="local-login-form">
                    <form>
                      <div className={ this.formClassNames('password') }>
                        <input className="mdl-textfield__input" type="password" id='password'ref="password"/>
                        <label className="mdl-textfield__label" htmlFor="password">{tr.t('password')}</label>
                        {errors.password && <small className="mdl-textfield__error shown">{errors.password}</small>}
                      </div>
                      <div className={ this.formClassNames('password_confirmation') }>
                        <input className="mdl-textfield__input" type="password" id='passwordConfirmation'ref="passwordConfirmation"/>
                        <label className="mdl-textfield__label" htmlFor="email">{tr.t('password_confirmation')}</label>
                        {errors.password_confirmation && <small className="mdl-textfield__error shown">{errors.password_confirmation}</small>}
                      </div>
                      <div className="spacer">
                        <button type="button"
                        className='auth-button primary mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'
                        onClick={(e)=>this.confirmReset(e)}>
                         Ok
                        </button>
                      </div>
                     </form>
                  </div>
                </div>
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

  renderErrorsFor( field ) {
    if ( this.state.errors[ field ] ) {
      return (
        <span className="label label-danger animate bounceIn">{ this.state.errors[ field ]}</span>
      );
    }
  },

  confirmReset(e) {
    e.preventDefault();
    this.setState( {
        errors: {},
        errorServer: null
    } );
    let payload ={
      password: this.refs.password.value
      password_confirmation: this.refs.passwordConfirmation.value
    }

     window.componentHandler.upgradeDom();
     return this.validateConfirmPassword.call(this, payload)
       .with( this )
       .then(this.requestService)
       .catch( this.errors );
  },
  validateConfirmPassword(payload) {
    let rules = new Checkit( {
      password: [{ rule: 'required', label: 'new password'}],
      password_confirmation: [{ rule: 'required', label: 'confirm new password'},{rule:'matchesField:password', label:'confirm new password'}],
    });
    return rules.run( payload );
  },

  errors( e ) {
    this.setState(createError(e));
  },

  requestService(payload){
    return this.props.confirmPasswordReset(payload);
  },

  formClassNames( field ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield', {
      'is-invalid is-dirty': this.state.errors[ field ],
      'has-error': this.state.errors[ field ]
    });
  },
});
