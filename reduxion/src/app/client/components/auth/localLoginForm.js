import React from 'react';
import tr from 'i18next';
import LocalAuthenticationForm from 'client/components/auth/localAuthenticationForm';
import ValidateLoginFields from 'utils/validations/validateLoginFields';
import {createError} from 'utils/error';

class LocalLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    }
  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  render() {
    return (
      <div className="local-login-form">
        <div className="login-header">
          <img src="//s3.amazonaws.com/assets.idearobin.com/arbitrium/logo-arbitrium.png"/>
        </div>
        <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar error-snack">
          <div className="mdl-snackbar__text"></div>
          <button type="button" className="mdl-snackbar__action"></button>
        </div>
        <LocalAuthenticationForm
          buttonCaption={tr.t('BUTTON.LOGIN') }
          errors={ this.state.errors }
          onButtonClick={ (payload) => { this.login(payload) } }
          login={ this.props.login }
          />
      </div>
    );
  }

  login( payload ) {
    this.setState( {
      badPassword: false,
      errors: {}
    } );

    return validateLogin.call( this, payload )
      .with( this )
      .then( loginLocal )
      .then( this.props.onLoggedIn )
      .catch( this.setErrors );
  }

  setErrors( e ) {
    //debug("setErrors:", e);
    let message = null;
    switch(e.status) {
      case 401 :
       message = tr.t('NOTEFICATION_MESSAGE.NO_MATCHING_CREDENTIALS');
      break;

      case 403 :
      if (e.data.messages.length >1){
        message = e.data.messages[0] +" "+ e.data.messages[1];
      }else {
        message = e.data.message;
      }
      break;

      case 423 :
        message = e.data.message;
      break;

      default:
        message = null;
        this.setState(createError(e));
    }

    let notification = document.querySelector('.mdl-snackbar');
    if(message){
      notification.MaterialSnackbar.showSnackbar( {
        message: message,
        timeout: 5000
      });

      this.setState( {
        badPassword: true
      })
    }

  }

};


//////////////////////

LocalLoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
};

LocalLoginForm.defaultProps = {
  onLoggedIn: () => {}
};
//////////////////////

function validateLogin( payload ) {
  return new ValidateLoginFields( {
    email: payload.email,
    password: payload.password
  } )
  .execute();
}

function loginLocal( payload ) {
  return this.props.login( payload );
}

export default LocalLoginForm;
