import React from 'react';
import Checkit from 'checkit';
import LocalAuthenticationFormSignup from '../components/localAuthenticationFormSignup';
import {createError} from 'utils/error';

import Debug from 'debug';

let debug = new Debug("components:signup");

class LocalSignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      company_name:null
    };
  }

  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' )
    {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  renderError() {
    let error = this.state.errorServer;
    if(!error) return;
    //let arr = Object.keys(error.response).map(function (key) {return error.response[key]});
    let results = error.response;
    return (
      <div className="alert alert-danger text-center animate bounceIn" role="alert">
        {mapObject(results, function (key, value) {
          return <div key={key}>{value}</div>;
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="local-signup-form">
        { this.renderError()}
        <LocalAuthenticationFormSignup
          showLogin={true}
          country= {this.props.country}
          buttonCaption={this.props.buttonCaption || 'Create an account' }
          errors={ this.state.errors }
          onButtonClick={(payload) => {this.signup(payload)}}
          />

      </div>
    );
  }

  signup( payload ) {
    this.setState( {
      errors: {},
      errorServer: null
    } );
    window.componentHandler.upgradeDom();
    return validateSignup.call( this, payload )
      .with( this )
      .then( signupLocal )
      .catch( setErrors );
  }

}

//////////////////////

LocalSignupForm.propTypes = {
  signup: React.PropTypes.func.isRequired
};

LocalSignupForm.defaultProps = {
  onLoggedIn: () => {}
};

//////////////////////
function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}

function validateSignup( payload ) {
  let rules = new Checkit( {
    company_name: { rule: 'required'},
    street_address_1: [],
    street_address_2: [],
    city: [],
    state: [],
    postal_code: [],
    country_id: [],
    rep_first_name: { rule: 'required', label: 'first name' },
    rep_last_name: { rule: 'required', label: 'last name' },
    rep_gender: [],
    rep_email_address: [ 'required', 'email', 'minLength:6', 'maxLength:64' ],
    rep_mobile_code: [],
    rep_mobile_number: [],
    rep_phone_code: [],
    rep_phone_number: [],
    rep_position: { rule: 'required', label: 'position' },
    rep_department: { rule: 'required', label: 'department' },
    password_confirmation: {rule: 'required', label: 'confirm password'},
    password: [ 'required', 'alphaDash', 'minLength:8', 'maxLength:64' ],
    email_address:  ['required', 'email', 'minLength:6', 'maxLength:64' ],
    username: [ 'required', 'alphaNumeric', 'minLength:8', 'maxLength:64' ],
    password: [ 'required', 'alphaDash', 'minLength:6', 'maxLength:64' ]
  } );
  return rules.run( payload );
}

function signupLocal( payload ) {
  debug('signupLocal: ', payload)
  return this.props.signup(payload);
}

function setErrors( e ) {
  debug("setErrors", e);
  this.setState(createError(e));
}

export default LocalSignupForm;
