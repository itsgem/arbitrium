import React from 'react';
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
  componentWillReceiveProps() {
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
            <label className="mdl-textfield__label" htmlFor="email">{tr.t('label.emailUsername')}</label>
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
            <label className="mdl-textfield__label" htmlFor="password">{tr.t('label.password')}</label>
            {errors.password && <small className="mdl-textfield__error shown">{errors.password[0]}</small>}
          </div>
          <button
            className='auth-button primary mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'
            id='btn-login'
            type='button'
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
    if (e.which == 13 || e.keyCode == 13) {
      this.login(e);
    }
  }
  login( e ) {
    this.setState( {
      loading: true,
    } );

    let {email, password} = this.refs;
    e.preventDefault();
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
