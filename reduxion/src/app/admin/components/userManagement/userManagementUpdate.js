import React from 'react';
import tr from 'i18next';
import Checkit from 'checkit';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';

class UserManagementUpdate extends React.Component {
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
  render() {
    let role = this.props.role.toArray();
    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response, {password_confirmation: []});
      errors.password = [];
      if (errorServer.response.password) {
        if (errorServer.response.password.length == 1) {
          errors.password_confirmation[0] = errorServer.response.password[0];
        }else if (errorServer.response.password.length == 3) {
          errors.password[0] = errorServer.response.password[0];
          errors.password_confirmation[0] = errorServer.response.password[2];
        } else {
          errors.password[0] = errorServer.response.password[0];
          errors.password_confirmation[0] = errorServer.response.password[1];
        }
      }
    }
    this.scrolltop(errors);
    let userInfo = {};
    userInfo = this.props.adminInfo.data;
    let userRole = userInfo.user.roles;
    userRole = userRole.map(item => { return item.id; });
    return (
      <form>
        <div className="required">Required fields</div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
            <legend>{tr.t('ADMIN_USER_MANAGEMENT.LABEL.USER_ACCOUNT_DETAILS')}</legend>
              <div className={this.formClassNames('username', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='username'
                  ref="username"
                  onChange={(e) => this.notUsername(e, userInfo.user.username)}
                  defaultValue={userInfo.user.username}
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
          </div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('email_address', errors) + "is-focused"}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='email_address'
                  ref="email_address"
                  defaultValue={userInfo.user.email_address}
                  />
                <label className="mdl-textfield__label" htmlFor="email_address">{tr.t('LABEL.EMAIL_ADDRESS_REQ')}</label>
                {errors.email_address && <small className="mdl-textfield__error shown">{errors.email_address[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div id="role_id-opt" className={this.formClassNames('role_id', errors)}>
                <div className="mdl-selectfield">
                  <select className="mdl-textfield__input"
                    id="role_id"
                    name="role_id"
                    ref="role_id"
                    defaultValue={userRole.toString()}>
                    <option value=""></option>
                    {role.map(item =>
                      {
                        return (<option key={item.get('id')} value={item.get('id')}>{item.get('display_name')}</option>);
                      }
                    )}
                  </select>
                  <label className="mdl-textfield__label" htmlFor="role_id">{tr.t('LABEL.ROLE_REQ')}</label>
                  {errors.role_id && <small className="mdl-textfield__error shown">{errors.role_id[0]}</small>}
                </div>
              </div>
            </div>
          </div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('password', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="password"
                  id='password'
                  ref="password"
                  />
                <label className="mdl-textfield__label" htmlFor="password">{tr.t('LABEL.PASSWORD')}</label>
                {errors.password && <small className="mdl-textfield__error shown">{errors.password[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('password_confirmation', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="password"
                  id='password_confirmation'
                  ref="password_confirmation"
                  />
                <label className="mdl-textfield__label" htmlFor="password_confirmation">{tr.t('LABEL.CONFIRM_PASSWORD')}</label>
                {errors.password_confirmation && <small className="mdl-textfield__error shown">{errors.password_confirmation[0]}</small>}
              </div>
            </div>
          </div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
            <legend>{tr.t('ADMIN_USER_MANAGEMENT.LABEL.PERSONAL_INFORMATION')}</legend>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('first_name', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='first_name'
                  ref="first_name"
                  defaultValue={userInfo.first_name}
                  />
                <label className="mdl-textfield__label" htmlFor="first_name">{tr.t('LABEL.FIRST_NAME_REQ')}</label>
                {errors.first_name && <small className="mdl-textfield__error shown">{errors.first_name[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className={this.formClassNames('last_name', errors)}>
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id='last_name'
                  ref="last_name"
                  defaultValue={userInfo.last_name}
                  />
                <label className="mdl-textfield__label" htmlFor="last_name">{tr.t('LABEL.LAST_NAME_REQ')}</label>
                {errors.last_name && <small className="mdl-textfield__error shown">{errors.last_name[0]}</small>}
              </div>
            </div>

          </div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              {
                userInfo.user.locked_at?
                  <button
                    id='btnClientApproval'
                    type='button'
                    className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored status-btn'
                    onClick={(e) => this.adminUnlock(e, userInfo.user.id)}>
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
                    to="/coffee/account/"
                    >{tr.t('BUTTON.CANCEL')}</Link>
                </div>
                <div className="flex-order-gt-md-2">
                  <button
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                    id='btn-save'
                    type='button'
                    onClick={(e) => this.update(e, userInfo.id)}>{tr.t('BUTTON.UPDATE')}</button>
                </div>
              </div>
            </div>
          </div>
      </form>
    );
  }
  formClassNames( field, errors = null ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    } );
  }
  notUsername (e, id) {
    if (id == e.target.value) {
      $('#check_availability').addClass('disabled');
      this.refs.checkUser.value = "disabled";
      $("#check_availability").removeClass('bg-green');
      $('form').find('.material-icons').hide();
    } else {
      $('#check_availability').removeClass('disabled');
      this.refs.checkUser.value = "not-disabled";
    }
  }
  update ( e, id ) {
    e.preventDefault();
    this.setState( {
      loading: true,
      errors: {},
      errorServer: null
    } );
    let {username, email_address, password, password_confirmation, first_name, last_name, role_id} = this.refs;

    let payload = {
      id: id,
      username: username.value,
      email_address: email_address.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      first_name: first_name.value,
      last_name: last_name.value,
      role_id: role_id.value
    };
    window.componentHandler.upgradeDom();
    return validateUpdate.call( this, payload )
      .with( this )
      .then( updateAdmin )
      .catch( setErrors );
  }
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
  adminUnlock (e, id) {
    e.preventDefault();
    this.props.adminUnlock(id);
  }


};

function validateUpdate ( payload) {
  let rules = new Checkit( {
    id: [],
    username: [
        {rule: 'required', label: tr.t('LABEL.USERNAME')},
        {rule: 'alphaNumeric', label: tr.t('LABEL.USERNAME')},
        {rule: 'minLength:8', label: tr.t('LABEL.USERNAME')},
        {rule: 'maxLength:64', label: tr.t('LABEL.USERNAME')} ],
    email_address: [
      {rule: 'required', label: tr.t('LABEL.EMAIL_ADDRESS') },
      {rule: 'email', label: tr.t('LABEL.EMAIL_ADDRESS')},
      {rule: 'minLength:6', label: tr.t('LABEL.EMAIL_ADDRESS')},
      {rule: 'maxLength:64', label: tr.t('LABEL.EMAIL_ADDRESS')} ],
    password: [],
    password_confirmation: [],
    first_name: { rule: 'required', label: tr.t('LABEL.FIRST_NAME') },
    last_name: { rule: 'required', label: tr.t('LABEL.LAST_NAME') },
    role_id: { rule: 'required', label: tr.t('LABEL.ROLE') }
    } );
    return rules.run( payload );
}
function updateAdmin (payload) {
  return this.props.adminUserManagementUpdate(payload);
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

UserManagementUpdate.mixins = [LinkedStateMixin];
UserManagementUpdate.defaultProps = {
    errors: []
};
export default UserManagementUpdate;