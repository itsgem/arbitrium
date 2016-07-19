import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import tr from 'i18next';

class LocalAuthenticationForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password: null,
      email: null,
      loading:false
    }
  }
  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  render() {
    let {errors} = this.props;
    return (
      <div className="local-signin-form">
        <form className="mdl-shadow--2dp" action={ this.signup }>
          { !this.props.hideEmail &&
            <div className={this.formClassNames('email')}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='email'
                ref="email"
                onKeyPress={(e) => this.toLogin(e)}
                autoComplete="false"
                />
              <label className="mdl-textfield__label" htmlFor="email">{tr.t('LOGIN.FORM.LABEL.EMAIL_USER')}</label>
              {errors.email && <small className="mdl-textfield__error shown">{errors.email[0]}</small>}
            </div>
          }

          <div className={this.formClassNames('password')}>
            <input
              className="mdl-textfield__input"
              id='password'
              ref="password"
              type='password'
              autoComplete="false"
              onKeyPress={(e) => this.toLogin(e)}
              />
            <label className="mdl-textfield__label" htmlFor="password">{tr.t('LOGIN.FORM.LABEL.PASSWORD')}</label>
            {errors.password && <small className="mdl-textfield__error shown">{errors.password[0]}</small>}
          </div>

          <button
            className='mdl-button mdl-js-button mdl-button--blue mdl-button--fullwidth mdl-js-ripple-effect'
            id='btn-login'
            type='button'
            onClick={(e) => this.login(e)}>{ this.props.buttonCaption }</button>

          <div className="mdl-grid mdl-grid--no-spacing" id="other-links">
            <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet text-left">
              <Link
                to="/i/forgot"
              >{tr.t('LOGIN.LINK.FORGOT_PW')}</Link>
            </div>

            <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet text-right">
              <Link
                to="/i/signup"
              >{tr.t('LOGIN.LINK.SIGNUP')}</Link>
            </div>
          </div>

        </form>
      </div>
    );
  }

  formClassNames( field ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': this.props.errors[ field ],
      'has-success': this.state[ field ] && !(this.props.errors[ field ])
    } );
  }
  toLogin(e) {
    if (e.which == 13 || e.keyCode == 13) {
      this.login(e);
    }
  }
  login( e ) {
    e.preventDefault();

    this.setState( {
      loading: true,
    } );
    let {email, password} = this.refs;

    this.props.onButtonClick( {
      password: password.value,
      email: email.value
    } );
  }

}

LocalAuthenticationForm.mixins = [LinkedStateMixin];

LocalAuthenticationForm.defaultProps = {
  errors: []
};

export default LocalAuthenticationForm;
