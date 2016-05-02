import React from 'react';
import { Link } from 'react-router';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';
import Alert from 'components/alert';
import tr from 'i18next';
import Country from '../../auth/components/country';

class ClientAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null
    };
  }
  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  render() {
    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }
    return (
      <form action={ this.clientAdd }>
        <div className="required">Required fields</div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
            <legend>USER ACCOUNT DETAILS</legend>
              <div className={this.formClassNames('username', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='username'
                  ref="username"
                  />
                <label className="mdl-textfield__label" htmlFor="usernmae">Username*</label>
                {errors.username && <small className="mdl-textfield__error shown">{errors.username[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <button
                className={!this.props.validateCompleted || errors.username ?
                    "md-raised md-primary md-hue-1 margin-left-0 margin-right-0 margin-top-10 margin-bottom-10 md-button ng-scope" :
                    "md-raised md-primary md-hue-1 margin-left-0 margin-right-0 margin-top-10 margin-bottom-10 md-button ng-scope bg-green" }
                id='check_availability'
                type='button'
                onClick={(e) => this.checkUsername(e)}>Check Availability{!this.props.validateCompleted || errors.username ? '' :  <i className="material-icons">check</i>}</button>
            </div>
            <div className="mdl-layout__content">
              <div className="mdl-cell mdl-cell--6-col">
                <div className={this.formClassNames('email_address', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='email_address'
                    ref="email_address"
                    />
                  <label className="mdl-textfield__label" htmlFor="email_address">E-mail Address*</label>
                  {errors.email_address && <small className="mdl-textfield__error shown">{errors.email_address[0]}</small>}
                </div>
              </div>
            </div>
          </div>
          <div className="mdl-grid">
            <div className="mdl-layout__content">
              <div className="mdl-cell mdl-cell--6-col">
                <legend>GENERAL INFORMATION</legend>
                <div className={this.formClassNames('company_name', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='company_name'
                    ref="company_name"
                    />
                  <label className="mdl-textfield__label" htmlFor="company_name">Company name *</label>
                  {errors.company_name && <small className="mdl-textfield__error shown">{errors.company_name[0]}</small>}
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('street_address_1', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='street_address_1'
                  ref="street_address_1"
                  />
                <label className="mdl-textfield__label" htmlFor="street_address_1">Street Address 1*</label>
                {errors.street_address_1 && <small className="mdl-textfield__error shown">{errors.street_address_1[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('street_address_2', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='street_address_2'
                  ref="street_address_2"
                  />
                  <label className="mdl-textfield__label" htmlFor="street_address_2">Street Address 2</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('city', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='city'
                  ref="city"
                  />
                <label className="mdl-textfield__label" htmlFor="city">City*</label>
                {errors.city && <small className="mdl-textfield__error shown">{errors.city[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className={this.formClassNames('state', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='state'
                  ref="state"
                  />
                <label className="mdl-textfield__label" htmlFor="state">State / Province*</label>
                {errors.state && <small className="mdl-textfield__error shown">{errors.state[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className={this.formClassNames('country_id', errors)}>
                <Country
                  country = { this.props.countryList }
                />
                {errors.country_id && <small className="mdl-textfield__error shown">{errors.country_id[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className={this.formClassNames('postal_code', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='postal_code'
                  ref="postal_code"
                  />
                <label className="mdl-textfield__label" htmlFor="postal_code">Postal code</label>
                {errors.postal_code && <small className="mdl-textfield__error shown">{errors.postal_code[0]}</small>}
              </div>
            </div>
          </div>
          <div className="mdl-grid">
            <legend>COMPANY REPRESENTATIVE</legend>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('rep_first_name', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='rep_first_name'
                  ref="rep_first_name"
                  />
                <label className="mdl-textfield__label" htmlFor="rep_first_name">First name *</label>
                {errors.rep_first_name && <small className="mdl-textfield__error shown">{errors.rep_first_name[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('rep_last_name', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='rep_last_name'
                  ref="rep_last_name"
                  />
                <label className="mdl-textfield__label" htmlFor="rep_last_name">Last name *</label>
                {errors.rep_last_name && <small className="mdl-textfield__error shown">{errors.rep_last_name[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('rep_email_address', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='rep_email_address'
                  ref="rep_email_address"
                  />
                <label className="mdl-textfield__label" htmlFor="rep_email_address">E-mail *</label>
                {errors.rep_email_address && <small className="mdl-textfield__error shown">{errors.rep_email_address[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('rep_gender', errors)}>
                <select
                  className="mdl-textfield__input"
                  id='rep_gender'
                  ref="rep_gender" >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <label className="mdl-textfield__label" htmlFor="rep_gender">Gender</label>
                {errors.rep_gender && <small className="mdl-textfield__error shown">{errors.rep_gender[0]}</small>}
              </div>
            </div>
          </div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <legend>Mobile Number</legend>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <legend>Telephone Number</legend>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className={this.formClassNames('rep_mobile_code', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='rep_mobile_code'
                  ref="rep_mobile_code"
                  />
                <label className="mdl-textfield__label" htmlFor="rep_mobile_code">Country Code*</label>
                {errors.rep_mobile_code && <small className="mdl-textfield__error shown">{errors.rep_mobile_code[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className={this.formClassNames('rep_mobile_number', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='rep_mobile_number'
                  ref="rep_mobile_number"
                  />
                <label className="mdl-textfield__label" htmlFor="rep_mobile_number">Mobile no.*</label>
                {errors.rep_mobile_number && <small className="mdl-textfield__error shown">{errors.rep_mobile_number[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className={this.formClassNames('rep_phone_code', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='rep_phone_code'
                  ref="rep_phone_code"
                  />
                <label className="mdl-textfield__label" htmlFor="rep_phone_code">Country Code*</label>
                {errors.rep_phone_code && <small className="mdl-textfield__error shown">{errors.rep_phone_code[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className={this.formClassNames('rep_phone_number', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='rep_phone_number'
                  ref="rep_phone_number"
                  />
                <label className="mdl-textfield__label" htmlFor="rep_phone_number">Telephone no.*</label>
                {errors.rep_phone_number && <small className="mdl-textfield__error shown">{errors.rep_phone_number[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('rep_position', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='rep_position'
                  ref="rep_position"
                  />
                <label className="mdl-textfield__label" htmlFor="rep_position">Position *</label>
                {errors.rep_position && <small className="mdl-textfield__error shown">{errors.rep_position[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('rep_department', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='rep_department'
                  ref="rep_department"
                    />
                <label className="mdl-textfield__label" htmlFor="rep_department">Department *</label>
                {errors.rep_department && <small className="mdl-textfield__error shown">{errors.rep_department[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--9-col">
              <legend>ALTERNATIVE REPRESENTATIVE</legend>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('alt_first_name', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='alt_first_name'
                  ref="alt_first_name"
                    />
                <label className="mdl-textfield__label" htmlFor="alt_first_name">First name</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('alt_last_name', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='alt_last_name'
                  ref="alt_last_name"
                    />
                <label className="mdl-textfield__label" htmlFor="alt_last_name">Last name</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('alt_email_address', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='alt_email_address'
                  ref="alt_email_address"
                    />
                <label className="mdl-textfield__label" htmlFor="alt_email_address">E-mail address</label>
                {errors.alt_email_address && <small className="mdl-textfield__error shown">{errors.alt_email_address[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('alt_gender', errors)}>
                <select
                  className="mdl-textfield__input"
                  id='alt_gender'
                  ref="alt_gender" >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <label className="mdl-textfield__label" htmlFor="alt_gender">Gender</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <legend>Mobile Number</legend>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <legend>Telephone Number</legend>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className={this.formClassNames('alt_mobile_code', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='alt_mobile_code'
                  ref="alt_mobile_code"
                  />
                <label className="mdl-textfield__label" htmlFor="alt_mobile_code">Country Code</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className={this.formClassNames('alt_mobile_number', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='alt_mobile_number'
                  ref="alt_mobile_number"
                  />
                <label className="mdl-textfield__label" htmlFor="alt_mobile_number">Mobile no.</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className={this.formClassNames('alt_phone_code', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='alt_phone_code'
                  ref="alt_phone_code"
                  />
                <label className="mdl-textfield__label" htmlFor="alt_phone_code">Country Code</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className={this.formClassNames('alt_phone_number', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='alt_phone_number'
                  ref="alt_phone_number"
                  />
                <label className="mdl-textfield__label" htmlFor="alt_phone_number">Telephone no.</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('alt_position', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='alt_position'
                  ref="alt_position"
                  />
                <label className="mdl-textfield__label" htmlFor="alt_position">Position</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('alt_department', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='alt_department'
                  ref="alt_department"
                    />
                <label className="mdl-textfield__label" htmlFor="alt_department">Department</label>
              </div>
            </div>
          </div>
          <div className="layout-gt-md-row layout-align-end-end btn">
            <div className="flex-order-gt-md-2 pd-10">
              <Link
                className="mdl-button mdl-js-button mdl-button--colored"
                id='btn-cancel'
                to="/coffee/client/"
                >CANCEL</Link>
            </div>
            <div className="flex-order-gt-md-2">
              <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                id='btn-save'
                type='button'
                onClick={(e) => this.register(e)}>SAVE</button>
            </div>
          </div>
      </form>
    );
  }
  formClassNames( field, errors ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    } );
  }
  register ( e ) {
    e.preventDefault();
    this.setState( {
      loading: true,
      errors: {},
      errorServer: null
    } );
    let {email_address, username, company_name, street_address_1, street_address_2, city, state, postal_code,
        rep_first_name, rep_last_name, rep_gender, rep_email_address, rep_mobile_code,
        rep_mobile_number, rep_phone_code, rep_phone_number, rep_position, rep_department,
        alt_first_name, alt_last_name, alt_gender, alt_email_address, alt_mobile_code,
        alt_mobile_number, alt_phone_code, alt_phone_number, alt_position, alt_department} = this.refs;

    let payload = {
      company_name: company_name.value,
      street_address_1: street_address_1.value,
      street_address_2: street_address_2.value,
      city: city.value,
      state: state.value,
      postal_code: postal_code.value,
      country_id: country_id.value,
      rep_first_name: rep_first_name.value,
      rep_last_name: rep_last_name.value,
      rep_gender: rep_gender.value,
      rep_email_address: rep_email_address.value,
      rep_mobile_code: rep_mobile_code.value,
      rep_mobile_number: rep_mobile_number.value,
      rep_phone_code: rep_phone_code.value,
      rep_phone_number: rep_phone_number.value,
      rep_position: rep_position.value,
      rep_department: rep_department.value,
      email_address: email_address.value,
      username: username.value,
      alt_first_name: alt_first_name.value,
      alt_last_name: alt_last_name.value,
      alt_gender: alt_gender.value,
      alt_email_address: alt_email_address.value,
      alt_mobile_code: alt_mobile_code.value,
      alt_mobile_number: alt_mobile_number.value,
      alt_phone_code: alt_phone_code.value,
      alt_phone_number: alt_phone_number.value,
      alt_position: alt_position.value,
      alt_department: alt_department.value,
    };
    window.componentHandler.upgradeDom();
    return validateRegister.call( this, payload )
      .with( this )
      .then( registerClient )
      .catch( setErrors );
  }
  checkUsername( e ) {
    e.preventDefault();
    this.setState( {
      loading: true,
      errors: {},
      errorServer: null
    } );
    let payload = {
      username: this.refs.username.value
    }
    window.componentHandler.upgradeDom();
    return validateUsername.call( this, payload )
      .with( this )
      .then( getUsername )
      .catch( setErrors );
  }

};

function mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
        return callback(key, object[key]);
    });
}

function validateRegister ( payload) {
  let rules = new Checkit( {
    company_name: { rule: 'required', label: 'comapany name'},
    street_address_1: { rule: 'required', label: 'Street address' },
    street_address_2: [],
    city: { rule: 'required', label: 'City' },
    state: { rule: 'required', label: 'State / Province' },
    postal_code: { rule: 'required', label: 'Postal Code' },
    country_id: { rule: 'required', label: 'Country' },
    rep_first_name: { rule: 'required', label: 'first name' },
    rep_last_name: { rule: 'required', label: 'last name' },
    rep_gender: { rule: 'required', label: 'Gender' },
    rep_email_address: [
      {rule: 'required', label: 'E-mail address'},
      {rule: 'email', label: 'E-mail address'},
      {rule: 'minLength:6', label: 'E-mail address'},
      {rule: 'maxLength:64', label: 'E-mail address'} ],
    rep_mobile_code: { rule: 'required', label: 'Country Code' },
    rep_mobile_number: { rule: 'required', label: 'Mobile no.' },
    rep_phone_code: { rule: 'required', label: 'Country Code' },
    rep_phone_number: { rule: 'required', label: 'Phone no.' },
    rep_position: { rule: 'required', label: 'position' },
    rep_department: { rule: 'required', label: 'department' },
    email_address: [
      {rule: 'required', label: 'E-mail address'},
      {rule: 'email', label: 'E-mail address'},
      {rule: 'minLength:6', label: 'E-mail address'},
      {rule: 'maxLength:64', label: 'E-mail address'} ],
    username: [ 'required', 'alphaNumeric', 'minLength:8', 'maxLength:64' ],
    alt_first_name: [],
    alt_last_name: [],
    alt_gender: [],
    alt_email_address: {rule: 'email', label: 'E-mail address'},
    alt_mobile_code: [],
    alt_mobile_number: [],
    alt_phone_code: [],
    alt_phone_number: [],
    alt_position: [],
    alt_department: [],
    } );
    return rules.run( payload );
}
function registerClient (payload) {
  return this.props.clientRegister(payload);
}

function validateUsername( payload ) {
  let rules = new Checkit( {
      username: [ 'required', 'alphaNumeric', 'minLength:8', 'maxLength:64' ]
  } );
  return rules.run( payload );
}
function getUsername (payload) {
  return this.props.validateUsername(payload);
}

function setErrors( e ) {
  this.setState(createError(e));
}

ClientAdd.mixins = [LinkedStateMixin];
ClientAdd.defaultProps = {
    errors: []
};
export default ClientAdd;