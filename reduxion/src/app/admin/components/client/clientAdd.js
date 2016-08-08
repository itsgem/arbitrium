import React from 'react';
import { Link } from 'react-router';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';
import Country from 'admin/components/country';
import tr from 'i18next';

class ClientAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null
    };
  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  scrolltop (errors) {
    if (!document.querySelector('.alert')) {
      return false;
    }

    if (Object.keys(errors).length) {
      document.querySelector('.alert').style.display = 'block';
      let target = document.getElementById('top');
      let scrollContainer = target;
      do { //find scroll container
          scrollContainer = scrollContainer.parentNode;
          if (!scrollContainer) return;
          scrollContainer.scrollTop += 1;
      } while (scrollContainer.scrollTop == 0);

      let targetY = 0;
      do { //find the top of target relatively to the container
          if (target == scrollContainer) break;
          targetY += target.offsetTop;
      } while (target = target.offsetParent);

      let scroll = function(c, a, b, i) {
          i++; if (i > 30) return;
          c.scrollTop = a + (b - a) / 30 * i;
          setTimeout(function(){ scroll(c, a, b, i); }, 20);
      }
      // start scrolling
      scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
    } else {
      document.querySelector('.alert').style.display = 'none';
    }
  }
  componentDidMount() {
    if (document.querySelector("select")) {
      let allSelectOpt = document.querySelectorAll("select");
      for (let i = 0; i < allSelectOpt.length; ++i) {
          allSelectOpt[i].addEventListener("change", function(e) {
          e.preventDefault();
          let target = e.target.id + "-opt";
          if (e.target.value) {
            document.getElementById(target).classList.add('is-dirty');
          } else {
            document.getElementById(target).classList.remove('is-dirty');
          }
        }, false);
      }
    }
  }
  numberOnly(e) {
    let key = e.keyCode || e.which;
    key = String.fromCharCode( key );
    let regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      e.preventDefault();
    }
  }
  render() {
    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }

    this.scrolltop(errors);
    return (
      <form action={ this.clientAdd }>
        <div className="required">{tr.t('LABEL.REQUIRED_FIELDS')}</div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
            <legend>{tr.t('LABEL.USER_ACCOUNT_DETAILS')}</legend>
              <div className={this.formClassNames('username', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='username'
                  ref="username"
                  />
                <label className="mdl-textfield__label" htmlFor="usernmae">{tr.t('LABEL.USERNAME_REQ')}</label>
                {errors.username && <small className="mdl-textfield__error shown">{errors.username[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <button
                className={!this.props.validateCompleted || errors.username ?
                    "margin-left-0 margin-right-0 margin-top-10 margin-bottom-10 mdl-button ng-scope" :
                    "margin-left-0 margin-right-0 margin-top-10 margin-bottom-10 mdl-button ng-scope bg-green" }
                id='check_availability'
                type='button'
                onClick={(e) => this.checkUsername(e)}>{tr.t('BUTTON.CHECK_AVAILABILITY')}{!this.props.validateCompleted || errors.username ? '' :  <i className="material-icons">check</i>}</button>
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
                  <label className="mdl-textfield__label" htmlFor="email_address">{tr.t('LABEL.EMAIL_ADDRESS_REQ')}</label>
                  {errors.email_address && <small className="mdl-textfield__error shown">{errors.email_address[0]}</small>}
                </div>
              </div>
            </div>
          </div>
          <div className="mdl-grid">
            <div className="mdl-layout__content">
              <div className="mdl-cell mdl-cell--6-col">
                <legend>{tr.t('LABEL.GENERAL_INFORMATION')}</legend>
                <div className={this.formClassNames('company_name', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id='company_name'
                    ref="company_name"
                    />
                  <label className="mdl-textfield__label" htmlFor="company_name">{tr.t('LABEL.COMPANY_NAME_REQ')}</label>
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
                <label className="mdl-textfield__label" htmlFor="street_address_1">{tr.t('LABEL.STREET_ADDRESS_1_REQ')}</label>
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
                  <label className="mdl-textfield__label" htmlFor="street_address_2">{tr.t('LABEL.STREET_ADDRESS_2')}</label>
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
                <label className="mdl-textfield__label" htmlFor="city">{tr.t('LABEL.CITY_REQ')}</label>
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
                <label className="mdl-textfield__label" htmlFor="state">{tr.t('LABEL.STATE_PROVINCE_REQ')}</label>
                {errors.state && <small className="mdl-textfield__error shown">{errors.state[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div id="country_id-opt" className={this.formClassNames('country_id', errors)}>
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
                <label className="mdl-textfield__label" htmlFor="postal_code">{tr.t('LABEL.POSTAL_CODE_REQ')}</label>
                {errors.postal_code && <small className="mdl-textfield__error shown">{errors.postal_code[0]}</small>}
              </div>
            </div>
          </div>
          <div className="mdl-grid">
            <legend>{tr.t('LABEL.COMPANY_REPRESENTATIVE')}</legend>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('rep_first_name', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='rep_first_name'
                  ref="rep_first_name"
                  />
                <label className="mdl-textfield__label" htmlFor="rep_first_name">{tr.t('LABEL.FIRST_NAME_REQ')}</label>
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
                <label className="mdl-textfield__label" htmlFor="rep_last_name">{tr.t('LABEL.LAST_NAME_REQ')}</label>
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
                <label className="mdl-textfield__label" htmlFor="rep_email_address">{tr.t('LABEL.EMAIL_ADDRESS_REQ')}</label>
                {errors.rep_email_address && <small className="mdl-textfield__error shown">{errors.rep_email_address[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div id="rep_gender-opt" className={this.formClassNames('rep_gender', errors)}>
                <div className="mdl-selectfield">
                  <select
                    className="mdl-textfield__input"
                    id='rep_gender'
                    ref="rep_gender" >
                    <option value=""></option>
                    <option value="Male">{tr.t('LABEL.MALE')}</option>
                    <option value="Female">{tr.t('LABEL.FEMALE')}</option>
                  </select>
                  <label className="mdl-textfield__label" htmlFor="rep_gender">{tr.t('LABEL.GENDER_REQ')}</label>
                  {errors.rep_gender && <small className="mdl-textfield__error shown">{errors.rep_gender[0]}</small>}
                </div>
              </div>
            </div>
          </div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <legend>{tr.t('LABEL.MOBILE_NUMBER')}</legend>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <legend>{tr.t('LABEL.PHONE_NUMBER')}</legend>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className={this.formClassNames('rep_mobile_code', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='rep_mobile_code'
                  ref="rep_mobile_code"
                  onKeyPress={(e) => this.numberOnly(e)}
                  maxLength="3"
                  />
                <label className="mdl-textfield__label" htmlFor="rep_mobile_code">{tr.t('LABEL.COUNTRY_CODE_REQ')}</label>
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
                  onKeyPress={(e) => this.numberOnly(e)}
                  maxLength="12"
                  />
                <label className="mdl-textfield__label" htmlFor="rep_mobile_number">{tr.t('LABEL.MOBILE_NO_REQ')}</label>
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
                  onKeyPress={(e) => this.numberOnly(e)}
                  maxLength="3"
                  />
                <label className="mdl-textfield__label" htmlFor="rep_phone_code">{tr.t('LABEL.COUNTRY_CODE_REQ')}</label>
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
                  onKeyPress={(e) => this.numberOnly(e)}
                  maxLength="12"
                  />
                <label className="mdl-textfield__label" htmlFor="rep_phone_number">{tr.t('LABEL.PHONE_NUMBER_REQ')}</label>
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
                <label className="mdl-textfield__label" htmlFor="rep_position">{tr.t('LABEL.POSITION_REQ')}</label>
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
                <label className="mdl-textfield__label" htmlFor="rep_department">{tr.t('LABEL.DEPARTMENT_REQ')}</label>
                {errors.rep_department && <small className="mdl-textfield__error shown">{errors.rep_department[0]}</small>}
              </div>
            </div>
          </div>
          <div className="mdl-grid">
            <legend>{tr.t('LABEL.ALTERNATIVE_REPRESENTATIVE')}</legend>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('alt_first_name', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='alt_first_name'
                  ref="alt_first_name"
                    />
                <label className="mdl-textfield__label" htmlFor="alt_first_name">{tr.t('LABEL.FIRST_NAME')}</label>
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
                <label className="mdl-textfield__label" htmlFor="alt_last_name">{tr.t('LABEL.LAST_NAME')}</label>
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
                <label className="mdl-textfield__label" htmlFor="alt_email_address">{tr.t('LABEL.EMAIL_ADDRESS')}</label>
                {errors.alt_email_address && <small className="mdl-textfield__error shown">{errors.alt_email_address[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div id="alt_gender-opt" className={this.formClassNames('alt_gender', errors)}>
                <div className="mdl-selectfield">
                  <select
                    className="mdl-textfield__input"
                    id='alt_gender'
                    ref="alt_gender" >
                    <option value=""></option>
                    <option value="Male">{tr.t('LABEL.MALE')}</option>
                    <option value="Female">{tr.t('LABEL.FEMALE')}</option>
                  </select>
                  <label className="mdl-textfield__label" htmlFor="alt_gender">{tr.t('LABEL.GENDER')}</label>
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <legend>{tr.t('LABEL.MOBILE_NUMBER')}</legend>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <legend>{tr.t('LABEL.PHONE_NUMBER')}</legend>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className={this.formClassNames('alt_mobile_code', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='alt_mobile_code'
                  ref="alt_mobile_code"
                  />
                <label className="mdl-textfield__label" htmlFor="alt_mobile_code">{tr.t('LABEL.COUNTRY_CODE')}</label>
                {errors.alt_mobile_code && <small className="mdl-textfield__error shown">{errors.alt_mobile_code[0]}</small>}
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
                <label className="mdl-textfield__label" htmlFor="alt_mobile_number">{tr.t('LABEL.MOBILE_NO')}</label>
                {errors.alt_mobile_number && <small className="mdl-textfield__error shown">{errors.alt_mobile_number[0]}</small>}
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
                <label className="mdl-textfield__label" htmlFor="alt_phone_code">{tr.t('LABEL.COUNTRY_CODE')}</label>
                {errors.alt_phone_code && <small className="mdl-textfield__error shown">{errors.alt_phone_code[0]}</small>}
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
                <label className="mdl-textfield__label" htmlFor="alt_phone_number">{tr.t('LABEL.PHONE_NUMBER')}</label>
                {errors.alt_phone_number && <small className="mdl-textfield__error shown">{errors.alt_phone_number[0]}</small>}
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
                <label className="mdl-textfield__label" htmlFor="alt_position">{tr.t('LABEL.POSITION')}</label>
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
                <label className="mdl-textfield__label" htmlFor="alt_department">{tr.t('LABEL.DEPARTMENT')}</label>
              </div>
            </div>
          </div>
          <div className="layout-gt-md-row layout-align-end-end btn">
            <div className="flex-order-gt-md-2 pd-10">
              <Link
                className="mdl-button mdl-js-button mdl-button--colored"
                id='btn-cancel'
                to="/coffee/client/"
                >{tr.t('BUTTON.CANCEL')}</Link>
            </div>
            <div className="flex-order-gt-md-2">
              <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                id='btn-save'
                type='button'
                onClick={(e) => this.register(e)}>{tr.t('BUTTON.SAVE')}</button>
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

function validateRegister ( payload) {
  let rules = new Checkit( {
    company_name: { rule: 'required', label: tr.t('LABEL.COMPANY_NAME') },
    street_address_1: { rule: 'required', label: tr.t('LABEL.STREET_ADDRESS_1') },
    street_address_2: [],
    city: { rule: 'required', label: tr.t('LABEL.CITY') },
    state: { rule: 'required', label: tr.t('LABEL.STATE_PROVINCE') },
    postal_code: { rule: 'required', label: tr.t('LABEL.POSTAL_CODE') },
    country_id: { rule: 'required', label: tr.t('LABEL.COUNTRY') },
    rep_first_name: { rule: 'required', label: tr.t('LABEL.FIRST_NAME') },
    rep_last_name: { rule: 'required', label: tr.t('LABEL.LAST_NAME') },
    rep_gender: { rule: 'required', label: tr.t('LABEL.GENDER') },
    rep_email_address: [
      {rule: 'required', label: tr.t('LABEL.EMAIL_ADDRESS')},
      {rule: 'email', label: tr.t('LABEL.EMAIL_ADDRESS')},
      {rule: 'minLength:6', label: tr.t('LABEL.EMAIL_ADDRESS')},
      {rule: 'maxLength:64', label: tr.t('LABEL.EMAIL_ADDRESS')} ],
    rep_mobile_code: { rule: 'required', label: tr.t('LABEL.COUNTRY_CODE') },
    rep_mobile_number: { rule: 'required', label: tr.t('LABEL.MOBILE_NO') },
    rep_phone_code: { rule: 'required', label: tr.t('LABEL.COUNTRY_CODE') },
    rep_phone_number: { rule: 'required', label: tr.t('LABEL.PHONE_NUMBER') },
    rep_position: { rule: 'required', label: tr.t('LABEL.POSITION') },
    rep_department: { rule: 'required', label: tr.t('LABEL.DEPARTMENT') },
    email_address: [
      {rule: 'required', label: tr.t('LABEL.EMAIL_ADDRESS')},
      {rule: 'email', label: tr.t('LABEL.EMAIL_ADDRESS')},
      {rule: 'minLength:6', label: tr.t('LABEL.EMAIL_ADDRESS')},
      {rule: 'maxLength:64', label: tr.t('LABEL.EMAIL_ADDRESS')} ],
    username: [
      {rule: 'required', label: tr.t('LABEL.USERNAME') },
      {rule: 'alphaNumeric', label: tr.t('LABEL.USERNAME')},
      {rule: 'minLength:8', label: tr.t('LABEL.USERNAME')},
      {rule: 'maxLength:64', label: tr.t('LABEL.USERNAME')} ],
    alt_first_name: [],
    alt_last_name: [],
    alt_gender: [],
    alt_email_address: {rule: 'email', label: tr.t('LABEL.EMAIL_ADDRESS')},
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
      username: [
        {rule: 'required', label: tr.t('LABEL.USERNAME')},
        {rule: 'alphaNumeric', label: tr.t('LABEL.USERNAME')},
        {rule: 'minLength:8', label: tr.t('LABEL.USERNAME')},
        {rule: 'maxLength:64', label: tr.t('LABEL.USERNAME')} ]
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