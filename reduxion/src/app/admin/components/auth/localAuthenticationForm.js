import React from 'react';
import tr from 'i18next';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';

class LocalAuthenticationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      email: null,
      loading:false
    }
  }
  componentWillReceiveProps(nextProps) {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  render() {
    let {errors} = this.props;
    return (
      <div className="local-signin-form">
        <form className="mdl-shadow--2dp" action={ this.signup }>
          <div className={this.formClassNames('email')}>
            <input
              className="mdl-textfield__input"
              type="text"
              id='email'
              ref="email"
              onKeyPress={(e) => this.toLogin(e)}
              />
            <label className="mdl-textfield__label" htmlFor="email">{tr.t('LABEL.EMAIL_USERNAME')}</label>
            {errors.email && <small className="mdl-textfield__error shown">{errors.email[0]}</small>}
          </div>

          <div className={this.formClassNames('password')}>
            <input
              className="mdl-textfield__input"
              type="password"
              id='password'
              ref="password"
              onKeyPress={(e) => this.toLogin(e)}
              />
            <label className="mdl-textfield__label" htmlFor="password">{tr.t('LABEL.PASSWORD')}</label>
            {errors.password && <small className="mdl-textfield__error shown">{errors.password[0]}</small>}
          </div>
          <button
            className='auth-button primary mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'
            id='btn-login'
            type='button'
            disabled={ this.state.loading ? true : false }
            onClick={(e) => this.login(e)}>{ this.props.buttonCaption }</button>
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
    if (!this.state.loading) {
      if (e.which == 13 || e.keyCode == 13) {
        this.login(e);
      }
    }
  }
  login( e ) {
    if (!this.state.loading) {
      this.setState( {
        loading: true,
      } );
      let thisRender = this;
      setTimeout(function() {
        if (!thisRender.props.authenticated) {
          thisRender.setState( {
            loading: false,
          } );
        }
      }, 3000);

      let {email, password} = this.refs;
      e.preventDefault();
      this.props.onButtonClick( {
        password: password.value,
        email: email.value
      } );
    }
  }
}

LocalAuthenticationForm.mixins = [LinkedStateMixin];

LocalAuthenticationForm.defaultProps = {
  errors: []
};

export default LocalAuthenticationForm;
