import React from 'react';
import tr from 'i18next';
import cx from 'classnames';
import { Link } from 'react-router';
import Checkit from 'checkit';
import moment from 'moment';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { createError } from 'utils/error';
import { modal, openModal, closeModal, openLoading } from 'common/components/modal'

class ClientProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      success: {},
      errors: {},
      errorServer: null
    };
  }
  scrolltop (errors) {
    if (!document.querySelector('.alert')) {
      return false;
    }

    if (Object.keys(errors).length && !Object.keys(this.props.errors).length) {
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
  numberOnly(e) {
    let key = e.keyCode || e.which;
    key = String.fromCharCode( key );
    let regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      e.preventDefault();
    }
  }
  componentDidMount () {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
    // (Optional) Retrieve token in changing email
    if (!this.props.loading && !this.props.isRetrieveEmailChangeTokenSuccess && this.props.locationQuery.token) {
      let payload = {
        token: this.props.locationQuery.token,
        callback_url: window.location.origin + '/client/profile',
        user_type: 2
      };

      window.componentHandler.upgradeDom();
      return this.validateEmailChangeToken.call(this, payload)
        .with(this)
        .then(this.callEmailChangeToken)
        .catch(this.setErrors)
    }

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
    modal();
  }
  componentWillReceiveProps(nextProps) {
    // (Optional) Finalize changing of email
    if (!nextProps.loading && nextProps.isRetrieveEmailChangeTokenSuccess && !nextProps.isVerifyEmailChangeSuccess) {
      let payload = {
        token: nextProps.emailChangeToken.data.token
      };

      window.componentHandler.upgradeDom();
      return this.validateVerifyEmailChange.call(this, payload)
        .with(this)
        .then(this.callVerifyEmailChange)
        .catch(this.setErrors)
    }

    // (Optional) Logout user after finalizing of changing of email
    if (!nextProps.loading && nextProps.isVerifyEmailChangeSuccess) {
      window.location = window.location.origin + "/i/logout";
    }
  }

  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  }

  render() {
    let clientInfo = this.props.clientInfo.data;
    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }
    this.scrolltop(errors);

    let currentSubscription = this.props.currentSubscription.data.length == 0  ? false : this.props.currentSubscription.data;

    return (
      <div className="mdl-cell mdl-cell--12-col">
      <div className="mdl-tabs__panel is-active" id="profile">
        <form>
          <legend>{tr.t('LABEL.LOGIN_INFORMATION')}</legend>
          <div className="">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--6-col">
                <div className={this.formClassNames('username', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="username"
                    ref="username"
                    data-client="user"
                    defaultValue={clientInfo.user.username}
                    />
                  <label className="mdl-textfield__label" htmlFor="username">{tr.t('LABEL.USERNAME_REQ')}</label>
                  {errors && errors.username && <small className="mdl-textfield__error shown">{errors.username[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col form-group-flag-icon">
                <button
                  id="check_availability"
                  type="button"
                  className="mdl-button mdl-js-button mdl-button--raised mdl-button--blue"
                  onClick={this.onClickGetAvailableUsername.bind(this)}
                  >
                  {tr.t('BUTTON.CHECK_AVAILABILITY')}
                </button>
                { this.isUsernameAvailable(errors.username) }
              </div>
            </div>
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--6-col">
                  <div className={this.formClassNames('email_address', errors)}>
                    <input
                      className="mdl-textfield__input"
                      type="text"
                      id="email_address"
                      ref="email_address"
                      data-client="user"
                      defaultValue={clientInfo.user.email_address}
                      readOnly={true}
                      />
                    <label className="mdl-textfield__label" htmlFor="email_address">{tr.t('LABEL.EMAIL_ADDRESS')}</label>
                    {errors && errors.email_address && <small className="mdl-textfield__error shown">{errors.email_address[0]}</small>}
                  </div>
                </div>
              </div>
          </div>

          <legend>{tr.t('LABEL.GENERAL_INFORMATION')}</legend>
          <div className="">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--6-col">
                <div className={this.formClassNames('company_name', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="company_name"
                    ref="company_name"
                    defaultValue={clientInfo.company_name}
                    />
                  <label className="mdl-textfield__label" htmlFor="company_name">{tr.t('LABEL.COMPANY_NAME_REQ')}</label>
                  {errors && errors.company_name && <small className="mdl-textfield__error shown">{errors.company_name[0]}</small>}
                </div>
              </div>
            </div>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('street_address_1', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="street_address_1"
                    ref="street_address_1"
                    defaultValue={clientInfo.street_address_1}
                    />
                  <label className="mdl-textfield__label" htmlFor="street_address_1">{tr.t('LABEL.STREET_ADDRESS_1_REQ')}</label>
                  {errors && errors.street_address_1 && <small className="mdl-textfield__error shown">{errors.street_address_1[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('street_address_2', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="street_address_2"
                    ref="street_address_2"
                    defaultValue={clientInfo.street_address_2}
                    />
                  <label className="mdl-textfield__label" htmlFor="street_address_2">{tr.t('LABEL.STREET_ADDRESS_2')}</label>
                  {errors && errors.street_address_2 && <small className="mdl-textfield__error shown">{errors.street_address_2[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('city', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="city"
                    ref="city"
                    defaultValue={clientInfo.city}
                    />
                  <label className="mdl-textfield__label" htmlFor="city">{tr.t('LABEL.CITY_REQ')}</label>
                  {errors && errors.city && <small className="mdl-textfield__error shown">{errors.city[0]}</small>}
                </div>
              </div>
            </div>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('state', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="state"
                    ref="state"
                    defaultValue={clientInfo.state}
                    />
                  <label className="mdl-textfield__label" htmlFor="state">{tr.t('LABEL.STATE_PROVINCE')}</label>
                  {errors && errors.state && <small className="mdl-textfield__error shown">{errors.state[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('postal_code', errors)}>
                    <input
                      className="mdl-textfield__input"
                      type="text"
                      id="postal_code"
                      ref="postal_code"
                      defaultValue={clientInfo.postal_code}
                      />
                    <label className="mdl-textfield__label" htmlFor="postal_code">{tr.t('LABEL.POSTAL_CODE_REQ')}</label>
                    {errors && errors.postal_code && <small className="mdl-textfield__error shown">{errors.postal_code[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div id="country_id-opt" className={this.formClassNames('country_id', errors)}>
                  <div className="mdl-selectfield">
                    { this.renderCountry(clientInfo.country_id) }
                    {errors && errors.country_id && <small className="mdl-textfield__error shown">{errors.country_id[0]}</small>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <legend>{tr.t('LABEL.COMPANY_REPRESENTATIVE')}</legend>
          <div className="">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('rep_first_name', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="rep_first_name"
                    ref="rep_first_name"
                    defaultValue={clientInfo.rep_first_name}

                    />
                  <label className="mdl-textfield__label" htmlFor="rep_first_name">{tr.t('LABEL.FIRSTNAME_REQ')}</label>
                  {errors && errors.rep_first_name && <small className="mdl-textfield__error shown">{errors.rep_first_name[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('rep_last_name', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="rep_last_name"
                    ref="rep_last_name"
                    defaultValue={clientInfo.rep_last_name}
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_last_name">{tr.t('LABEL.LASTNAME_REQ')}</label>
                  {errors && errors.rep_last_name && <small className="mdl-textfield__error shown">{errors.rep_last_name[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('rep_email_address', errors)}>
                    <input
                      className="mdl-textfield__input"
                      type="text"
                      id="rep_email_address"
                      ref="rep_email_address"
                      defaultValue={clientInfo.rep_email_address}

                      />
                    <label className="mdl-textfield__label" htmlFor="rep_email_address">{tr.t('LABEL.EMAIL_ADDRESS_REQ')}</label>
                    {errors && errors.rep_email_address && <small className="mdl-textfield__error shown">{errors.rep_email_address[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div id="rep_gender-opt" className={this.formClassNames('rep_gender', errors)}>
                  <div className="mdl-selectfield">
                    <select
                      className="mdl-textfield__input"
                      id="rep_gender"
                      ref="rep_gender"
                      defaultValue={clientInfo.rep_gender}
                      >
                      <option value=""></option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <label className="mdl-textfield__label" htmlFor="rep_gender">{tr.t('LABEL.GENDER_REQ')}</label>
                    {errors && errors.rep_gender && <small className="mdl-textfield__error shown">{errors.rep_gender[0]}</small>}
                  </div>
                </div>
              </div>
            </div>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--1-col">
                <div className={this.formClassNames('rep_mobile_code', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="rep_mobile_code"
                    ref="rep_mobile_code"
                    defaultValue={clientInfo.rep_mobile_code}
                    onKeyPress={(e) => this.numberOnly(e)}
                    maxLength="3"
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_mobile_code">{tr.t('LABEL.CODE')}</label>
                  {errors && errors.rep_mobile_code && <small className="mdl-textfield__error shown">{errors.rep_mobile_code[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--2-col">
                <div className={this.formClassNames('rep_mobile_number', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="rep_mobile_number"
                    ref="rep_mobile_number"
                    defaultValue={clientInfo.rep_mobile_number}
                    onKeyPress={(e) => this.numberOnly(e)}
                    maxLength="12"
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_mobile_number">{tr.t('LABEL.MOBILE_NUMBER')}</label>
                  {errors && errors.rep_mobile_number && <small className="mdl-textfield__error shown">{errors.rep_mobile_number[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--1-col">
                <div className={this.formClassNames('rep_phone_code', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="rep_phone_code"
                    ref="rep_phone_code"
                    defaultValue={clientInfo.rep_phone_code}
                    onKeyPress={(e) => this.numberOnly(e)}
                    maxLength="3"
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_phone_code">{tr.t('LABEL.CODE')}</label>
                  {errors && errors.rep_phone_code && <small className="mdl-textfield__error shown">{errors.rep_phone_code[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--2-col">
                <div className={this.formClassNames('rep_phone_number', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="rep_phone_number"
                    ref="rep_phone_number"
                    defaultValue={clientInfo.rep_phone_number}
                    onKeyPress={(e) => this.numberOnly(e)}
                    maxLength="12"
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_phone_number">{tr.t('LABEL.PHONE_NUMBER')}</label>
                  {errors && errors.rep_phone_number && <small className="mdl-textfield__error shown">{errors.rep_phone_number[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('rep_position', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="rep_position"
                    ref="rep_position"
                    defaultValue={clientInfo.rep_position}
                    />
                  <label className="mdl-textfield__label" htmlFor="rep_position">{tr.t('LABEL.POSITION_REQ')}</label>
                  {errors && errors.rep_position && <small className="mdl-textfield__error shown">{errors.rep_position[0]}</small>}
                </div>
              </div>

              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('rep_department', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="rep_department"
                    ref="rep_department"
                    defaultValue={clientInfo.rep_department}

                    />
                  <label className="mdl-textfield__label" htmlFor="rep_department">{tr.t('LABEL.DEPARTMENT_REQ')}</label>
                  {errors && errors.rep_department && <small className="mdl-textfield__error shown">{errors.rep_department[0]}</small>}
                </div>
              </div>
            </div>
          </div>

          <legend>{tr.t('LABEL.COMPANY_ALTERNATIVE')}</legend>
          <div className="">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('alt_first_name', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="alt_first_name"
                    ref="alt_first_name"
                    defaultValue={clientInfo.alt_first_name}
                    />
                  <label className="mdl-textfield__label" htmlFor="alt_first_name">{tr.t('LABEL.FIRST_NAME')}</label>
                  {errors && errors.alt_first_name && <small className="mdl-textfield__error shown">{errors.alt_first_name[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('alt_last_name', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="alt_last_name"
                    ref="alt_last_name"
                    defaultValue={clientInfo.alt_last_name}
                    />
                  <label className="mdl-textfield__label" htmlFor="alt_last_name">{tr.t('LABEL.LAST_NAME')}</label>
                    {errors && errors.alt_last_name && <small className="mdl-textfield__error shown">{errors.alt_last_name[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('alt_email_address', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="alt_email_address"
                    ref="alt_email_address"
                    defaultValue={clientInfo.alt_email_address}
                    />
                  <label className="mdl-textfield__label" htmlFor="alt_email_address">{tr.t('LABEL.EMAIL_ADDRESS')}</label>
                  {errors && errors.alt_email_address && <small className="mdl-textfield__error shown">{errors.alt_email_address[0]}</small>}
                </div>
              </div>

              <div className="mdl-cell mdl-cell--3-col">
                <div id="alt_gender-opt" className={this.formClassNames('alt_gender', errors)}>
                  <div className="mdl-selectfield">
                    <select
                      className="mdl-textfield__input"
                      id="alt_gender"
                      ref="alt_gender"
                      defaultValue={clientInfo.alt_gender} >
                      <option value=""></option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <label className="mdl-textfield__label" htmlFor="alt_gender">{tr.t('LABEL.GENDER')}</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--1-col">
                <div className={this.formClassNames('alt_mobile_code', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="alt_mobile_code"
                    ref="alt_mobile_code"
                    defaultValue={clientInfo.alt_mobile_code}
                    onKeyPress={(e) => this.numberOnly(e)}
                    maxLength="3"
                    />
                  <label className="mdl-textfield__label" htmlFor="alt_mobile_code">{tr.t('LABEL.CODE')}</label>
                  {errors && errors.alt_mobile_code && <small className="mdl-textfield__error shown">{errors.alt_mobile_code[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--2-col">
                <div className={this.formClassNames('alt_mobile_number', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="alt_mobile_number"
                    ref="alt_mobile_number"
                    defaultValue={clientInfo.alt_mobile_number}
                    onKeyPress={(e) => this.numberOnly(e)}
                    maxLength="12"
                    />
                  <label className="mdl-textfield__label" htmlFor="alt_mobile_number">{tr.t('LABEL.MOBILE_NUMBER')}</label>
                  {errors && errors.alt_mobile_number && <small className="mdl-textfield__error shown">{errors.alt_mobile_number[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--1-col">
                <div className={this.formClassNames('alt_phone_code', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="alt_phone_code"
                    ref="alt_phone_code"
                    defaultValue={clientInfo.alt_phone_code}
                    onKeyPress={(e) => this.numberOnly(e)}
                    maxLength="3"
                    />
                  <label className="mdl-textfield__label" htmlFor="alt_phone_code">{tr.t('LABEL.CODE')}</label>
                  {errors && errors.alt_phone_code && <small className="mdl-textfield__error shown">{errors.alt_phone_code[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--2-col">
                <div className={this.formClassNames('alt_phone_number', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="alt_phone_number"
                    ref="alt_phone_number"
                    defaultValue={clientInfo.alt_phone_number}
                    onKeyPress={(e) => this.numberOnly(e)}
                    maxLength="12"
                    />
                  <label className="mdl-textfield__label" htmlFor="alt_phone_number">{tr.t('LABEL.PHONE_NUMBER')}</label>
                  {errors && errors.alt_phone_number && <small className="mdl-textfield__error shown">{errors.alt_phone_number[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('alt_position', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="alt_position"
                    ref="alt_position"
                    defaultValue={clientInfo.alt_position}
                    />
                  <label className="mdl-textfield__label" htmlFor="alt_position">{tr.t('LABEL.POSITION')}</label>
                  {errors && errors.alt_position && <small className="mdl-textfield__error shown">{errors.alt_position[0]}</small>}
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className={this.formClassNames('alt_department', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="alt_department"
                    ref="alt_department"
                    defaultValue={clientInfo.alt_department}
                    />
                  <label className="mdl-textfield__label" htmlFor="alt_department">{tr.t('LABEL.DEPARTMENT')}</label>
                  {errors && errors.alt_department && <small className="mdl-textfield__error shown">{errors.alt_department[0]}</small>}
                </div>
              </div>
            </div>
          </div>
          <div className="mdl-button-group">
            <Link
              className="mdl-button mdl-js-button mdl-button--raised"
              to="/i" >{tr.t('BUTTON.CANCEL')}
            </Link>
            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--blue"
              type="submit"
              onClick = { this.onSubmitProfile.bind(this) } >{tr.t('BUTTON.SAVE')}
            </button>
          </div>
        </form>
      </div>
      {currentSubscription && this.subscriptionPlan(currentSubscription)}
      </div>
    );
  }

  subscriptionPlan(currentSubscription){
    return (
      <div className="table-list-container margin-top-20">
          { this.modalDisplay() }
          <div className="header-title">
            <p>{tr.t('LABEL.SUBSCRIPTION_PLAN')}</p>
          </div>
          <div className="mdl-layout__panel" id="#">
            <div className="mdl-grid content">
              <div className="mdl-cell mdl-cell--6-col">
                <h6>{tr.t('LABEL.SUBSCRIPTION')}</h6>
                <p>{currentSubscription.name}</p>
              </div>
              <div className="mdl-cell mdl-cell--6-col">
                <h6>{tr.t('LABEL.START_DATE')}</h6>
                <p>{moment(currentSubscription.valid_from).format('YYYY-MM-DD')}</p>
              </div>
              <div className="mdl-cell mdl-cell--6-col">
                <h6>{currentSubscription.type == 'Trial' ? tr.t('LABEL.TERMS_OF_SUBSCRIPTION_FREE') : tr.t('LABEL.TERM_SUBSCRIPTION') }</h6>
                <p>{currentSubscription.type == 'Trial' ? tr.t('LABEL.30_DAYS') : currentSubscription.term}</p>
              </div>
              <div className="mdl-cell mdl-cell--6-col">
                <h6>{tr.t('LABEL.END_DATE')}</h6>
                <p>{moment(currentSubscription.valid_to).format('YYYY-MM-DD')}</p>
              </div>
              <div className="mdl-cell mdl-cell--6-col bottom-margin">
                <h6>{tr.t('LABEL.AUTO_RENEW')}</h6>
                <p>{currentSubscription.is_auto_renew == 1 ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>
             <div className="mdl-button-group">
                <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--blue right" onClick={(e) => this.modalConfirm(e) }>{tr.t('BUTTON.CANCEL_SUBSCRIPTION')}</button>
              </div>
          </div>
        </div>
    );
  }

  modalConfirm (e, id) {
    e.preventDefault();
    openModal();
    this.setState( {
      id: id
    } );
  }
  modalClose () {
    closeModal();
  }

  modalDisplay() {
    modal();
    return (
      <div className="modal-display">
        <div className="dialog-box"></div>
        <div className="dialog-content">
          <div className="dialog-inner">
            <div className="msg-box mdl-shadow--2dp">
               <p>Are you sure you want to cancel this subscription?<br />This cannot be undone.</p>
              <div className="mdl-dialog__actions">
                <button type="button" className="mdl-button modal-yes" onClick={(e) => this.cancelSubscription(e)}>YES</button>
                <button type="button" className="mdl-button close modal-cancel" onClick={(e) => this.modalClose()}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCountry(countryId) {
    let countries = this.props.countryList;
    return (
     <div>
        <select className="mdl-textfield__input" id="country_id" name="country_id" ref="country_id" defaultValue={countryId}>
          <option value=""></option>
          {countries.map(item =>
            {return <option key={item.id} value={item.id}>{item.name}</option>}
          )}
        </select>
        <label className="mdl-textfield__label" htmlFor="country_id">{tr.t('label.country')}</label>
      </div>
    );
  }

  renderError() {
    let error = this.state.errorServer;
    if(!error || this.props.validateCompleted == false) return;

    let results = error.response;

    return (
      <div className="bs-callout bs-callout-danger text-center animate bounceIn" role="alert">
        {mapObject(results, function (key, value) {
          return <div key={key}>{value}</div>;
        })}
      </div>
    );
  }

  formClassNames( field, errors ) {
    return cx('mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    });
  }

  cancelSubscription(e) {
    e.preventDefault();
    this.props.clientSubscriptionCancel();
    this.modalClose();
  }

  isUsernameAvailable(error) {
    let icon = '';
    let className = 'mdl-icon material-icons';
    if (!this.props.loading && this.props.validateCompleted == true) {
      icon = 'done';
      className += ' mdl-icon-success';
    } else if ((!this.props.loading && this.props.validateCompleted == 'error') || error) {
      icon = 'clear';
      className += ' mdl-icon-danger';
    } else if (this.props.loading && !this.props.validateCompleted == true) {
      icon = 'hourglass_empty';
    }
    return (
      <i className={className}>{icon}</i>
    );
  }

  getAvailableUsername(payload) {
    return this.props.getAvailableUsername(payload);
  }

  updateClientProfile(payload) {
    return this.props.updateClientProfile(payload);
  }

  onChangeFields(e) {
    let client = this.state.client;

    if (e.target.getAttribute('data-client')) {
      client[e.target.getAttribute('data-client')][e.target.id] = e.target.value;
    } else {
      client[e.target.id] = e.target.value;
    }

    this.setState({client: client});
  }

  onClickGetAvailableUsername(e) {
    e.preventDefault();

    this.setState({
      success: null,
      errors: {},
      errorServer: null
    });

    let {username} = this.refs;
    let payload = {
      username: username.value,
      except_user_id: this.props.clientInfo.data.user.id
    }

    window.componentHandler.upgradeDom();
    return this.validateAvailableUsername.call(this, payload)
      .with(this)
      .then(this.getAvailableUsername)
      .catch(this.setErrors);
  }

  onSubmitProfile(e) {
    e.preventDefault();

    this.setState({
      success: {},
      errors: {},
      errorServer: null,
    });


    let {email_address, username, company_name, street_address_1, street_address_2, city, state, postal_code, country_id,
      rep_first_name, rep_last_name, rep_gender, rep_email_address, rep_mobile_code,
      rep_mobile_number, rep_phone_code, rep_phone_number, rep_position, rep_department,
      alt_first_name, alt_last_name, alt_email_address, alt_gender, alt_mobile_code,
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
      alt_first_name: alt_first_name.value,
      alt_last_name: alt_last_name.value,
      alt_email_address: alt_email_address.value,
      alt_gender: alt_gender.value,
      alt_mobile_code: alt_mobile_code.value,
      alt_mobile_number: alt_mobile_number.value,
      alt_phone_code: alt_phone_code.value,
      alt_phone_number: alt_phone_number.value,
      alt_position: alt_position.value,
      alt_department: alt_department.value,
      email_address: email_address.value,
      username: username.value
    };

    window.componentHandler.upgradeDom();
    return this.validateUpdateClientProfile.call(this, payload)
      .with(this)
      .then(this.updateClientProfile)
      .catch(this.setErrors);
  }

  // --- Validations

  validateUpdateClientProfile(payload) {
    let rules = new Checkit({
      company_name:      [{ rule: 'required', label: tr.t('LABEL.COMPANY_NAME')}],
      street_address_1:  [{ rule: 'required', label: tr.t('LABEL.STREET_ADDRESS_1')}],
      street_address_2:  [],
      city:              [{ rule: 'required', label: tr.t('LABEL.CITY')}],
      state:             [],
      country_id:        [{ rule: 'required', label: tr.t('LABEL.COUNTRY')}],
      postal_code:       [{ rule: 'required', label: tr.t('LABEL.POSTAL_CODE')}],
      rep_first_name:    [{ rule: 'required', label: tr.t('LABEL.FIRST_NAME')}],
      rep_last_name:     [{ rule: 'required', label: tr.t('LABEL.LAST_NAME')}],
      rep_email_address: [
        { rule: 'required', label: tr.t('LABEL.EMAIL_ADDRESS') },
        { rule: 'email', label: tr.t('LABEL.EMAIL_ADDRESS') }
      ],
      rep_gender:        [{ rule: 'required', label: tr.t('LABEL.GENDER')}],
      rep_mobile_code:   [{ rule: 'numeric', label: tr.t('LABEL.COUNTRY_CODE')}],
      rep_mobile_number: [{ rule: 'numeric', label: tr.t('LABEL.MOBILE_NUMBER')}],
      rep_phone_code:    [{ rule: 'numeric', label: tr.t('LABEL.COUNTRY_CODE')}],
      rep_phone_number:  [{ rule: 'numeric', label: tr.t('LABEL.PHONE_NUMBER')}],
      rep_position:      [
        { rule: 'required', label: tr.t('LABEL.POSITION') },
        { rule: 'max:100', label: tr.t('LABEL.POSITION') }
      ],
      rep_department:    [
        { rule: 'required', label: tr.t('LABEL.DEPARTMENT') },
        { rule: 'max:100', label: tr.t('LABEL.DEPARTMENT') }
      ],
      alt_first_name:    [],
      alt_last_name:     [],
      alt_email_address: [{ rule: 'email', label: tr.t('LABEL.PHONE_NUMBER') }],
      alt_gender:        [],
      alt_mobile_code:   [{ rule: 'numeric', label: tr.t('LABEL.COUNTRY_CODE') }],
      alt_mobile_number: [{ rule: 'numeric', label: tr.t('LABEL.MOBILE_NUMBER') }],
      alt_phone_code:    [{ rule: 'numeric', label: tr.t('LABEL.COUNTRY_CODE') }],
      alt_phone_number:  [{ rule: 'numeric', label: tr.t('LABEL.PHONE_NUMBER') }],
      alt_position:      [{ rule: 'max:100', label: tr.t('LABEL.POSITION') } ],
      alt_department:    [{ rule: 'max:100', label: tr.t('LABEL.DEPARTMENT')} ],
      username:          [
        { rule: 'required', label: tr.t('LABEL.USERNAME') },
        { rule: 'min:8', label: tr.t('LABEL.USERNAME') },
        { rule: 'max:32', label: tr.t('LABEL.USERNAME') }
      ],
      items_per_page:    [{ rule: 'integer', label: 'items per page'}],
      timezone:          []
    });

    return rules.run(payload);
  }

  callEmailChangeToken(payload) {
    return this.props.retrieveEmailChangeToken(payload);
  }

  callVerifyEmailChange(payload) {
    return this.props.verifyEmailChange(payload);
  }

  validateAvailableUsername(payload) {
    let rules = new Checkit({
      username:          [
        { rule: 'required', label: tr.t('LABEL.USERNAME') },
        { rule: 'min:8', label: tr.t('LABEL.USERNAME') },
        { rule: 'max:32', label: tr.t('LABEL.USERNAME') }
      ],
      except_user_id: [ 'required' ]
    });

    return rules.run(payload);
  }

  validateEmailChangeToken(payload) {
    let rules = new Checkit({
      token:        [{ rule: 'required', label: tr.t('LABEL.TOTKEN') }],
      callback_url: [{ rule: 'required', label: 'callback url' }],
      user_type:    [{ rule: 'required', label: tr.t('LABEL.USER_TYPE') }]
    });

    return rules.run(payload);
  }

  validateVerifyEmailChange(payload) {
    let rules = new Checkit({
      token:        [{ rule: 'required', label: tr.t('LABEL.TOKEN') }]
    });

    return rules.run(payload);
  }

  setErrors(e) {
    this.setState(createError(e));
  }
}

ClientProfile.mixins = [LinkedStateMixin];

ClientProfile.defaultProps = {
  errors: []
};

ClientProfile.contextTypes = {
  router: React.PropTypes.object,
  history: React.PropTypes.object,
  location: React.PropTypes.object
};

export default ClientProfile;

/**
 * mapObject
 *
 * @param object
 * @param callback
 * @returns {Array}
 */
function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}
