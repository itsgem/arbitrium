import React from 'react';
import tr from 'i18next';
import Checkit from 'checkit';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';
import Country from 'admin/components/country'
import {modal, openModal, closeModal} from 'common/components/modal'
import moment from 'moment';

class ClientProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      client: null,
      updateCompleted: false,
      addClass: null,
      subscriptionCancel: false
    };
  }
  componentDidMount() {
    modal();
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.client.clientInfo) {
      this.setState({
        client: nextProps.client.clientInfo
      });
    }

    if (nextProps.client.updateCompleted) {
      this.setState({
        updateCompleted: nextProps.client.updateCompleted
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
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
    if (this.props.client.clientInfo) {
      return (
        <div id="client" className="auth-view">
          { this.renderClient() }
        </div>
      );
    } else {
      return (
        <div id="client" className="auth-view">
          { this.renderError() }
        </div>
      );
    }
  }
  renderError() {
    let error = this.state.errorServer;
    if(!error) return;
    return (
      <div className="alert alert-danger text-center animate bounceIn" role="alert">
        <div>An error occured: {error.name}</div>
        <div>{error.message}</div>
        <div>Status Code: {error.status}</div>
      </div>
    );
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

  renderClient() {

    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }

    this.scrolltop(errors);

    if (!this.props.client.clientInfo) {
      return (<div className="mdl-grid"></div>);
    }

    let client = this.props.client.clientInfo;
    let currentClientSubscription = this.props.client.currentClientSubscription.data.length == 0 ? false: this.props.client.currentClientSubscription.data ;
    let status = client.approval_status == 'Pending' ? true : false;
    return (
      <form onSubmit={(e) => this.onSubmitClientProfile(e)}>
        <div className="dialog-box"></div>
        <div className="dialog-content">
          <div className="dialog-inner">
            <div className="msg-box mdl-shadow--2dp">
              <p></p>
              <div className="mdl-dialog__actions">
                <button type="button" className="mdl-button modal-yes" onClick={(e) => this.activeStatus(e, client.user.activated_at)}>{tr.t('BUTTON.YES')}</button>
                <button type="button" className="mdl-button close modal-cancel" onClick={(e) => this.modalClose()}>{tr.t('BUTTON.CANCEL')}</button>
              </div>
            </div>
          </div>
        </div>
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
                onChange={(e) => this.notUsername(e, client.user.username)}
                defaultValue={(client.user) ? client.user.username : ''}
                />
              <label className="mdl-textfield__label" htmlFor="usernmae">{tr.t('LABEL.USERNAME_REQ')}</label>
              {errors.username && <small className="mdl-textfield__error shown">{errors.username[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <button
              className={!this.props.validateCompleted || errors.username ?
                    "margin-left-0 margin-right-0 margin-top-10 margin-bottom-10 mdl-button disabled" :
                    "margin-left-0 margin-right-0 margin-top-10 margin-bottom-10 mdl-button bg-green" }
              id='check_availability'
              type='button'
              value="disabled"
              ref="checkUser"
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
                  defaultValue={(client.user) ? client.user.email_address : ''}
                  />
                <label className="mdl-textfield__label" htmlFor="email_address">{tr.t('LABEL.EMAIL_ADDRESS_REQ')}</label>
                {errors.email_address && <small className="mdl-textfield__error shown">{errors.email_address[0]}</small>}
              </div>
            </div>
          </div>
        </div>
        <div className="mdl-grid">
          {/*Approval layout*/}
          <div className="mdl-layout__content status-content">
            <div className="mdl-cell mdl-cell--7-col">
             <div className="mdl-cell mdl-cell--6-col status-col">
                <div className="mdl-cell mdl-cell--3-col float-lft mg-lf">{tr.t('ADMIN_CLIENT.LABEL.APPROVAL_STATUS')}</div>
                <div className="mdl-cell mdl-cell--2-col float-lft">{client.approval_status}</div>
                <div className="mdl-cell mdl-cell--7-col float-lft">
                  { status &&
                    <button
                      id='btnClientApproval'
                      type='button'
                      className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored status-btn'
                      onClick={(e) => this.changeApprovalStatus(e)}>
                        <span>{tr.t('LABEL.APPROVED')}</span>
                        <span className="ion-checkmark-circled icon-con"></span>
                    </button>
                  }
                  { status &&
                    <button
                      id='btnClientDisapproval'
                      type='button'
                      className='mdl-button mdl-js-button mdl-button--raised mdl-button--accent status-btn'
                      onClick={(e) => this.clientDisapproveStatus(e)}>
                        <span>{tr.t('LABEL.DISAPPROVED')}</span>
                        <span className="ion-android-cancel icon-con"></span>
                    </button>
                  }
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <h5>{tr.t('LABEL.CREDIT_BALANCE')}</h5>
              <h4>{client.credit_balance}</h4>
            </div>
          </div>
        {/*Status layout*/}
          <div className="mdl-layout__content status-content">
            <div className="mdl-cell mdl-cell--6-col">
             <div className="mdl-cell mdl-cell--6-col status-col">
                <div className="mdl-cell mdl-cell--2-col float-lft mg-lf">{tr.t('LABEL.STATUS')}:</div>
                <div className="mdl-cell mdl-cell--2-col float-lft">
                  {client.user.activated_at? tr.t('LABEL.ACTIVE') : tr.t('LABEL.INACTIVE')}
                </div>
                <div className="mdl-cell mdl-cell--6-col float-lft">
                  { (client.approval_status === 'Approved')?
                  client.user.activated_at ?
                    <div>
                      <button
                        id='btnClientDisapproval'
                        type='button'
                        className='mdl-button mdl-js-button mdl-button--raised mdl-button--accent status-btn'
                        onClick={(e) => this.modalConfirm(e, client)}>
                          <span>{tr.t('BUTTON.DEACTIVATE')}</span>
                          <span className="ion-flash-off icon-con"></span>
                      </button>
                    </div>
                    :
                    <div>
                      <button
                        id='btnClientApproval'
                        type='button'
                        className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored status-btn'
                        onClick={(e) => this.modalConfirm(e, client)}>
                          <span>{tr.t('BUTTON.ACTIVATE')} </span>
                          <span className="ion-power icon-con"></span>
                      </button>
                    </div>
                    :null
                  }
                </div>
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
                  defaultValue={(client.company_name) ? client.company_name : ''}
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
                defaultValue={(client.street_address_1) ? client.street_address_1 : ''}
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
                defaultValue={(client.street_address_2) ? client.street_address_2 : ''}
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
                defaultValue={(client.city) ? client.city : ''}
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
                defaultValue={(client.state) ? client.state : ''}
                />
              <label className="mdl-textfield__label" htmlFor="state">{tr.t('LABEL.STATE_PROVINCE_REQ')}</label>
              {errors.state && <small className="mdl-textfield__error shown">{errors.state[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div id="country_id-opt" className={this.formClassNames('country_id', errors)}>
              { this.renderCountry(client.country_id, true) }
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
                defaultValue={(client.postal_code) ? client.postal_code : ''}
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
                defaultValue={(client.rep_first_name) ? client.rep_first_name : ''}
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
                defaultValue={(client.rep_last_name) ? client.rep_last_name : ''}
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
                defaultValue={(client.rep_email_address) ? client.rep_email_address : ''}
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
                  ref="rep_gender"
                  defaultValue={(client.rep_gender) ? client.rep_gender : ''} >
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
          <div className="mdl-cell mdl-cell--2-col">
            <div className={this.formClassNames('rep_mobile_code', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='rep_mobile_code'
                ref="rep_mobile_code"
                defaultValue={(client.rep_mobile_code) ? client.rep_mobile_code : ''}
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
                defaultValue={(client.rep_mobile_number) ? client.rep_mobile_number : ''}
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
                defaultValue={(client.rep_phone_code) ? client.rep_phone_code : ''}
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
                defaultValue={(client.rep_phone_number) ? client.rep_phone_number : ''}
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
                defaultValue={(client.rep_position) ? client.rep_position : ''}
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
                defaultValue={(client.rep_department) ? client.rep_department : ''}
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
                defaultValue={(client.alt_first_name) ? client.alt_first_name : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_first_name">{tr.t('LABEL.FIRST_NAME')}</label>
              {errors.alt_first_name && <small className="mdl-textfield__error shown">{errors.alt_first_name[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('alt_last_name', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='alt_last_name'
                ref="alt_last_name"
                defaultValue={(client.alt_last_name) ? client.alt_last_name : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_last_name">{tr.t('LABEL.LAST_NAME')}</label>
              {errors.alt_last_name && <small className="mdl-textfield__error shown">{errors.alt_last_name[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('alt_email_address', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='alt_email_address'
                ref="alt_email_address"
                defaultValue={(client.alt_email_address) ? client.alt_email_address : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_email_address">{tr.t('LABEL.EMAIL_ADDRESS')}</label>
              {errors.alt_email_address && <small className="mdl-textfield__error shown">{errors.alt_email_address[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--3-col">
            <div id="alt_gender-opt" className={this.formClassNames('alt_gender', errors)}>
              <div className="mdl-selectfield">
                <select
                  className="mdl-textfield__input"
                  id='alt_gender'
                  ref="alt_gender"
                  defaultValue={(client.alt_gender) ? client.alt_gender : ''} >
                  <option value=""></option>
                  <option value="Male">{tr.t('LABEL.MALE')}</option>
                  <option value="Female">{tr.t('LABEL.FEMALE')}</option>
                </select>
                <label className="mdl-textfield__label" htmlFor="alt_gender">{tr.t('LABEL.GENDER')}</label>
                {errors.alt_gender && <small className="mdl-textfield__error shown">{errors.alt_gender[0]}</small>}
              </div>
            </div>
          </div>
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--2-col">
            <div className={this.formClassNames('alt_mobile_code', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='alt_mobile_code'
                ref="alt_mobile_code"
                defaultValue={(client.alt_mobile_code) ? client.alt_mobile_code : ''}
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
                defaultValue={(client.alt_mobile_number) ? client.alt_mobile_number : ''}
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
                defaultValue={(client.alt_phone_code) ? client.alt_phone_code : ''}
                onKeyPress={(e) => this.numberOnly(e)}
                maxLength="3"
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
                defaultValue={(client.alt_phone_number) ? client.alt_phone_number : ''}
                onKeyPress={(e) => this.numberOnly(e)}
                maxLength="12"
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
                defaultValue={(client.alt_position) ? client.alt_position : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_position">{tr.t('LABEL.POSITION')}</label>
              {errors.alt_position && <small className="mdl-textfield__error shown">{errors.alt_position[0]}</small>}
            </div>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <div className={this.formClassNames('alt_department', errors)}>
              <input
                className="mdl-textfield__input"
                type="text"
                id='alt_department'
                ref="alt_department"
                defaultValue={(client.alt_department) ? client.alt_department : ''}
                />
              <label className="mdl-textfield__label" htmlFor="alt_department">{tr.t('LABEL.DEPARTMENT')}</label>
              {errors.alt_department && <small className="mdl-textfield__error shown">{errors.alt_department[0]}</small>}
            </div>
          </div>
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--6-col">
            {
              client.user.locked_at?
                <button
                  id='btnClientApproval'
                  type='button'
                  className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored status-btn'
                  onClick={(e) => this.clientUnlock(e)}>
                    <span>{tr.t('BUTTON.UNLOCK')}</span>
                    <span className="ion-unlocked icon-con"></span>
                </button>
              : null
            }
          </div>
          <div className="mdl-cell mdl-cell--6-col">
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
                  className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary"
                  id='btn-save'
                  type='submit'
                  >{tr.t('BUTTON.SAVE')}</button>
              </div>
            </div>
          </div>
        </div>
        { currentClientSubscription && this.subscriptionPlan(currentClientSubscription) }
      </form>
    );
  }

  subscriptionPlan(currentSubscription){
    return (
      <div className="margin-top-20">
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
                <h6>{currentSubscription.type == 'Trial' ? tr.t('LABEL.TERMS_OF_SUBSCRIPTION_FREE') : tr.t('LABEL.TERM_SUBSCRIPTION')}</h6>
                <p>{currentSubscription.type == 'Trial' ? '30 days' : currentSubscription.term}</p>
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
             <div className="layout-gt-md-row layout-align-end-end btn">
                <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent right" onClick={(e) => this.modalSubscription(e) }>{tr.t('BUTTON.CANCEL_SUBSCRIPTION')}</button>
              </div>
          </div>
        </div>
    );
  }

  notUsername (e, id) {
    if (id == e.target.value) {
      this.setState({addClass: 'disabled'});
      $('#check_availability').addClass('disabled');
      this.refs.checkUser.value = "disabled";
      $("#check_availability").removeClass('bg-green');
      $('form').find('.material-icons').hide();

    } else {
      this.setState({addClass: null});
      $('#check_availability').removeClass('disabled');
      this.refs.checkUser.value = "not-disabled";
    }
  }
  renderCountry(selected, required) {
    if (!this.props.countryList) return;
    let country = (selected) ? selected : '';
    let isRequired = (required) ? true : false;

    return (
      <Country country={this.props.countryList} selected={country} required={isRequired} />
    );
  }

  formClassNames( field, errors ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    } );
  }

  // --- Actions
  activeStatus(e, status) {
    if (this.state.subscriptionCancel) {
      this.cancelSubscription(e);
    } else {
      if (status) {
        this.clientDeactivateStatus(e);
      } else {
        this.clienActivateStatus(e);
      }
    }
    closeModal();
  }

  cancelSubscription (e) {
    e.preventDefault();
    this.props.client.adminClientSubscriptionCancel(this.props.client.clientInfo.id).catch(createError);
  }
  changeApprovalStatus (e) {
    e.preventDefault();
    this.props.client.clientApprove(this.props.client.clientInfo.id).catch(createError);
  }
  clientDisapproveStatus (e) {
    e.preventDefault();
    this.props.client.clientDisapprove(this.props.client.clientInfo.id).catch(createError);
  }

  clienActivateStatus (e) {
    e.preventDefault();
    this.props.client.clientActivate(this.props.client.clientInfo.user.id).catch(createError);
  }
  clientDeactivateStatus (e) {
    e.preventDefault();
    this.props.client.clientDeactivate(this.props.client.clientInfo.user.id).catch(createError);
  }
  clientUnlock (e) {
    e.preventDefault();
    this.props.client.clientUnlock(this.props.client.clientInfo.user.id).catch(createError);
  }


  onSubmitClientProfile ( e ) {
    e.preventDefault();
    this.setState( {
      loading: true,
      errors: {},
      errorServer: null
    } );

    let {email_address, username, company_name, street_address_1, street_address_2, city, state, postal_code,
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
    return validateClientProfile.call(this, payload)
      .with(this)
      .then(updateClientProfile)
      .catch(setErrors);
  }
  modalConfirm (e, client) {
    document.querySelector('.msg-box p').innerHTML = tr.t('NOTEFICATION_MESSAGE.ARE_YOU_SURE') + (client.user.activated_at ? tr.t('LABEL.DEACTIVATE') : tr.t('LABEL.ACTIVATE')) + tr.t('NOTEFICATION_MESSAGE.CONFIRM_03')  + "<br />" + tr.t('NOTEFICATION_MESSAGE.CANNOT_UNDONE');
    openModal();
  }

  modalSubscription (e) {
    document.querySelector('.msg-box p').innerHTML = tr.t('NOTEFICATION_MESSAGE.CANCEL_SUBSCRIPTION') + "<br />" + tr.t('NOTEFICATION_MESSAGE.CANNOT_UNDONE');
    e.preventDefault();
    this.setState( {
      subscriptionCancel: true
    } );
    openModal();
  }
  modalClose () {
    closeModal();
  }

  // --- Validations

  checkUsername( e ) {
    e.preventDefault();
    if (e.target.value == "disabled") {
      return false;
    }
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

function validateClientProfile ( payload) {
  let rules = new Checkit( {
    company_name:      [{ rule: 'required', label: tr.t('LABEL.COMPANY_NAME') }],
    street_address_1:  [{ rule: 'required', label: tr.t('LABEL.STREET_ADDRESS_1') }],
    street_address_2:  [],
    city:              [{ rule: 'required', label: tr.t('LABEL.CITY') }],
    state:             [{ rule: 'required', label: tr.t('LABEL.STATE_PROVINCE') }],
    country_id:        [{ rule: 'required', label: tr.t('LABEL.COUNTRY') }],
    postal_code:       [{ rule: 'required', label: tr.t('LABEL.POSTAL_CODE') }],
    rep_first_name:    [{ rule: 'required', label: tr.t('LABEL.FIRST_NAME') }],
    rep_last_name:     [{ rule: 'required', label: tr.t('LABEL.LAST_NAME') }],
    rep_email_address: [
      { rule: 'required', label: tr.t('LABEL.EMAIL_ADDRESS') },
      { rule: 'email', label: tr.t('LABEL.EMAIL_ADDRESS') }
    ],
    rep_gender:        [{ rule: 'required', label: tr.t('LABEL.GENDER')}],
    rep_mobile_code:   [
      { rule: 'required', label: tr.t('LABEL.COUNTRY_CODE') },
      { rule: 'numeric', label: tr.t('LABEL.COUNTRY_CODE') },
      { rule: 'min:1', label: tr.t('LABEL.COUNTRY_CODE') },
      { rule: 'max:3', label: tr.t('LABEL.COUNTRY_CODE') }
    ],
    rep_mobile_number: [
      { rule: 'required', label: tr.t('LABEL.MOBILE_NO')},
      { rule: 'numeric', label: tr.t('LABEL.MOBILE_NO')},
      { rule: 'min:1', label: tr.t('LABEL.MOBILE_NO') },
      { rule: 'max:12', label: tr.t('LABEL.MOBILE_NO') }
    ],
    rep_phone_code:    [
      { rule: 'required', label: tr.t('LABEL.COUNTRY_CODE') },
      { rule: 'numeric', label: tr.t('LABEL.COUNTRY_CODE') },
      { rule: 'min:1', label: tr.t('LABEL.COUNTRY_CODE') },
      { rule: 'max:3', label: tr.t('LABEL.COUNTRY_CODE') }
    ],
    rep_phone_number:  [
      { rule: 'required', label: tr.t('LABEL.PHONE_NUMBER') },
      { rule: 'numeric', label: tr.t('LABEL.PHONE_NUMBER') },
      { rule: 'min:1', label: tr.t('LABEL.PHONE_NUMBER')  },
      { rule: 'max:12', label: tr.t('LABEL.PHONE_NUMBER')  }
    ],
    rep_position:      [
      { rule: 'required', label: tr.t('LABEL.POSITION') },
      { rule: 'max:100', label: tr.t('LABEL.POSITION') }
    ],
    rep_department:    [
      { rule: 'required', label: tr.t('LABEL.DEPARTMENT') },
      { rule: 'max:100', label: tr.t('LABEL.DEPARTMENT')}
    ],
    alt_first_name:    [],
    alt_last_name:     [],
    alt_email_address: [{ rule: 'email', label: tr.t('LABEL.EMAIL_ADDRESS')}],
    alt_gender:        [],
    alt_mobile_code:   [
      { rule: 'numeric', label: tr.t('LABEL.COUNTRY_CODE') },
      { rule: 'min:1', label: tr.t('LABEL.COUNTRY_CODE') },
      { rule: 'max:3', label: tr.t('LABEL.COUNTRY_CODE') }
    ],
    alt_mobile_number: [
      { rule: 'numeric', label: tr.t('LABEL.MOBILE_NO') },
      { rule: 'min:1', label: tr.t('LABEL.MOBILE_NO') },
      { rule: 'max:12', label: tr.t('LABEL.MOBILE_NO') }
    ],
    alt_phone_code:    [
      { rule: 'numeric', label: tr.t('LABEL.COUNTRY_CODE')},
      { rule: 'min:1', label: tr.t('LABEL.COUNTRY_CODE') },
      { rule: 'max:3', label: tr.t('LABEL.COUNTRY_CODE') }
    ],
    alt_phone_number:  [
      { rule: 'numeric', label: tr.t('LABEL.PHONE_NUMBER')},
      { rule: 'min:1', label: tr.t('LABEL.PHONE_NUMBER') },
      { rule: 'max:12', label: tr.t('LABEL.PHONE_NUMBER') }
    ],
    alt_position:      [{ rule: 'max:100', label: tr.t('LABEL.POSITION') }],
    alt_department:    [{ rule: 'max:100', label: tr.t('LABEL.DEPARTMENT') }],
    username:          [
      { rule: 'required', label: tr.t('LABEL.USERNAME') },
      { rule: 'min:8', label: tr.t('LABEL.USERNAME') },
      { rule: 'max:32', label: tr.t('LABEL.USERNAME') }
    ],
    email_address: [
      { rule: 'required', label: tr.t('LABEL.EMAIL_ADDRESS') },
      { rule: 'email', label: tr.t('LABEL.EMAIL_ADDRESS') }
    ],
    items_per_page:    [{ rule: 'integer', label: 'items per page'}],
    timezone:          []
  } );
  return rules.run( payload );
}
function updateClientProfile (payload) {
  payload.id = this.props.client.clientInfo.id;
  return this.props.client.clientUpdateProfile(payload);
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
  return this.props.client.validateUsername(payload);
}

function setErrors( e ) {
  this.setState(createError(e));
}

ClientProfile.mixins = [LinkedStateMixin];
ClientProfile.defaultProps = {
  errors: []
};

export default ClientProfile;
