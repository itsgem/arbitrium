import React from 'react';
import Checkit from 'checkit';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';

class UserProfile extends React.Component {
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
      errors = Object.assign({}, errorServer.response, {password_confirmation: []});
      errors.password = [];
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
    let userInfo = {};

    userInfo = this.props.adminProfileInfo.data;
    let userRole = userInfo.user.roles;
    userRole = userRole.map(item => { return item.id; });
    return (
      <form>
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
                  onChange={(e) => this.notUsername(e, userInfo.user.username)}
                  defaultValue={userInfo.user.username}
                  />
                <label className="mdl-textfield__label" htmlFor="usernmae">Username*</label>
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
                onClick={(e) => this.checkUsername(e)}>Check Availability{!this.props.validateCompleted || errors.username ? '' :  <i className="material-icons">check</i>}</button>
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
                <label className="mdl-textfield__label" htmlFor="email_address">E-mail Address*</label>
                {errors.email_address && <small className="mdl-textfield__error shown">{errors.email_address[0]}</small>}
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className={this.formClassNames('role_id', errors)}>
                <div>
                  <select className="mdl-textfield__input"
                    id="role_id"
                    name="role_id"
                    ref="role_id"
                    disabled
                    defaultValue={userRole.toString()}>
                    <option value=""></option>
                    {this.props.role.map(item =>
                      {
                        return <option key={item.id} value={item.id}>{item.display_name}</option>
                      }
                    )}
                  </select>
                  <label className="mdl-textfield__label" htmlFor="role_id">Role*</label>
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
                <label className="mdl-textfield__label" htmlFor="password">Password</label>
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
                <label className="mdl-textfield__label" htmlFor="password_confirmation">Confirm password</label>
                {errors.password_confirmation && <small className="mdl-textfield__error shown">{errors.password_confirmation[0]}</small>}
              </div>
            </div>
          </div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
            <legend>PERSONAL INFORMATION</legend>
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
                <label className="mdl-textfield__label" htmlFor="first_name">First name *</label>
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
                <label className="mdl-textfield__label" htmlFor="last_name">Last name *</label>
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
                    onClick={(e) => this.adminUnlock(e)}>
                      <span>Unlock </span>
                      <span className="ion-unlocked icon-con"></span>
                  </button>
                : null
              }
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <div className="layout-gt-md-row layout-align-end-end btn">
                <div className="flex-order-gt-md-2 pd-10">
                  <button
                    className="mdl-button mdl-js-button mdl-button--colored"
                    id='btn-cancel'
                    onClick={(e) => this.cancel(e)}
                    >CANCEL</button>
                </div>
                <div className="flex-order-gt-md-2">
                  <button
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                    id='btn-save'
                    type='button'
                    onClick={(e) => this.update(e)}>UPDATE</button>
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
  cancel( e ) {
    e.preventDefault();
    this.refs.password.value = "";
    this.refs.password_confirmation.value = "";
    this.props.adminProfile();
  }
  update ( e ) {
    e.preventDefault();
    this.setState( {
      loading: true,
      errors: {},
      errorServer: null
    } );
    let {username, email_address, password, rep_last_name, password_confirmation, first_name, last_name, role_id} = this.refs;

    let payload = {
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

function mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
        return callback(key, object[key]);
    });
}

function validateUpdate ( payload) {
  let rules = new Checkit( {
    id: [],
    username: [ 'required', 'alphaNumeric', 'minLength:8', 'maxLength:64' ],
    email_address: [ 'required', 'email', 'minLength:6', 'maxLength:64' ],
    password: [],
    password_confirmation: [],
    first_name: { rule: 'required', label: 'first name' },
    last_name: { rule: 'required', label: 'last name' },
    role_id: { rule: 'required', label: 'role' }
    } );
    return rules.run( payload );
}
function updateAdmin (payload) {
  return this.props.adminProfileUpdate(payload);
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

UserProfile.mixins = [LinkedStateMixin];
UserProfile.defaultProps = {
    errors: []
};
export default UserProfile;