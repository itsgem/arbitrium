import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import DocTitle from 'components/docTitle';
import tr from 'i18next';
import { Link } from 'react-router';
import Checkit from 'checkit';

import {createError} from 'utils/error';

export default React.createClass( {

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  mixins: [
    LinkedStateMixin,
  ],
  defaultProps: {
    errors:[]
  },

  getInitialState() {
    return {
      token: null,
      password: null,
      password_confirmation: null,
      errorServer: null,
      errors: {}
    };
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
    if(nextProps.isConfirmPasswordReset){
     this.context.router.push('/coffee/login');
    }
  },

  componentWillMount(){
    let token = this.props.location.query.token;
    this.setState({token:token});
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
            <span className="bar-title">Confirm Reset Password</span>
            <DocTitle title="Confirm"/>
            </div>
            <fieldset>
              <div className="background">
                <div className="login-view">
                  <div className="local-login-form">
                    <form>
                      <div className={ this.formClassNames('password',errors) }>
                        <input className="mdl-textfield__input" type="password" id='password'ref="password"/>
                        <label className="mdl-textfield__label" htmlFor="password">{tr.t('password')}</label>
                        {errors.password && <small className="mdl-textfield__error shown">{errors.password[0]}</small>}
                      </div>
                      <div className={ this.formClassNames('password_confirmation',errors) }>
                        <input className="mdl-textfield__input" type="password" id='passwordConfirmation'ref="passwordConfirmation"/>
                        <label className="mdl-textfield__label" htmlFor="email">{tr.t('password_confirmation')}</label>
                        {errors.password_confirmation && <small className="mdl-textfield__error shown">{errors.password_confirmation[0]}</small>}
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
      token: this.state.token,
      password: this.refs.password.value,
      password_confirmation: this.refs.passwordConfirmation.value,
    }

     window.componentHandler.upgradeDom();
     return this.validateConfirmPassword.call(this, payload)
     .with( this )
     .then(this.requestService)
     .catch( this.errors );
  },
  validateConfirmPassword(payload) {
    let rules = new Checkit( {
      token:[],
      password: [
        { rule: 'required', label: 'new password'},
        { rule: 'alphaDash', label: 'new password'},
        { rule: 'minLength:8', label: 'new password'},
        { rule: 'maxLength:64', label: 'new password'}
      ],
      password_confirmation: [{ rule: 'required', label: 'confirm new password'},{rule:'matchesField:password', label:'confirm new password'}]
    });
    return rules.run( payload );
  },

  errors( e ) {
    this.setState(createError(e));
  },

  requestService(payload){
    console.log("dddddddddd",this.props);
    return this.props.confirmPasswordReset(payload);
  },

  formClassNames( field, errors ) {
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
