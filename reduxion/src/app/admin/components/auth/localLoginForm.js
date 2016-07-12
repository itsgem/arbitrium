import React from 'react';
import LocalAuthenticationForm from 'admin/components/auth/localAuthenticationForm';
import ValidateLoginFields from 'utils/validations/validateLoginFields';
import {createError} from 'utils/error';
import tr from 'i18next';

class LocalLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    }
  }

  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' )
    {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  render() {
    return (
      <div className="local-login-form">
        <div className="headerContainer">
          <div className="bar">
            <div className="bar-title">
              <img className="logo" src="https://s3.amazonaws.com/assets.idearobin.com/arbitrium/logo-arbitrium.png"></img>
            </div>
          </div>
          <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar error-snack">
              <div className="mdl-snackbar__text"></div>
              <button type="button" className="mdl-snackbar__action"></button>
          </div>
        </div>
        <LocalAuthenticationForm
          buttonCaption={tr.t('button.login') }
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
    let message = null;
    switch(e.status) {
      case 401 :
       message = 'No matching credentials. Please check your e-mail and password.';
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
        message: message
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