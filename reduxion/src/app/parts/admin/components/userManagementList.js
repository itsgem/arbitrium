import React from 'react';
import { Link } from 'react-router';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';
import Alert from 'components/alert';
import tr from 'i18next';

class UserManagementAdd extends React.Component {
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
  userDisplay (key, data) {
    return (
       <tr key={key} className="bg-dark">
          <td className="mdl-data-table__cell--non-numeric">{data.get('id')}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.get('username')}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.get('email_address')}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.get('name')}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.get('login_attempts')}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.get('locked_at')}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.get('roles').toArray().map(key => {return key.get('display_name')})}</td>
          <td className="mdl-data-table__cell--non-numeric">
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
              <i className="material-icons">open_in_new</i>
            </button>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete">
              <i className="material-icons">delete</i>
            </button>
          </td>
        </tr>
    )
  }
  render() {
    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }
    let counter = false;
    let users = {};
    if (this.props.adminList.size) {
      counter = true;
      let adminList =  this.props.adminList;
      users = adminList.get('data').toArray();
    }
    return (
      <div className="filter-search">
        <p>Filter / Search</p>
          <div className="mdl-grid filter-search-bar">
            <div className="mdl-cell mdl-cell--3-col">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input font-input" type="text" id="company"/>
                <label className="mdl-textfield__label" htmlFor="sample1">Company...</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="email-address"/>
                <label className="mdl-textfield__label" htmlFor="sample2">Email Address...</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="status"/>
                <label className="mdl-textfield__label" htmlFor="sample3">Status...</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col search-cta">
              <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent"><i className="material-icons">search</i>Search</button>
              <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised"><i className="material-icons">clear</i>Clear</button>
            </div>
          </div>
          <table className="mdl-data-table mdl-js-data-table table-client-list">
            <thead>
              <tr>
                <th className="mdl-data-table__cell--non-numeric">ID</th>
                <th className="mdl-data-table__cell--non-numeric">Username</th>
                <th className="mdl-data-table__cell--non-numeric">Email Address</th>
                <th className="mdl-data-table__cell--non-numeric">Name</th>
                <th className="mdl-data-table__cell--non-numeric">Login attempts</th>
                <th className="mdl-data-table__cell--non-numeric">Locked At</th>
                <th className="mdl-data-table__cell--non-numeric">Role</th>
                <th className="mdl-data-table__cell--non-numeric">Action</th>
              </tr>
            </thead>
            <tbody>
              {counter && users.map(item =>
                {
                  {return this.userDisplay(item.get('user').get('id'), item.get('user'))}
                }
              )}
            </tbody>
          </table>
          {/* <!-- Pagination -->*/}
        <div className="mdl-grid pagination">
          <div className="mdl-cell mdl-cell--3-col">

          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">FIRST</button>
            <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">
              <i className="material-icons">keyboard_arrow_left</i>
            </button>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-active">1</button>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-normal">2</button>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-normal">3</button>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-normal">4</button>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-normal">5</button>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-blue">
              <i className="material-icons">keyboard_arrow_right</i>
            </button>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-blue">LAST</button>
          </div>
          <div className="mdl-cell mdl-cell--3-col">
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page">10</button>
          </div>
        </div>
      </div>
    );
  }
  formClassNames( field, errors = null ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield', {
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
    return validateRegister.call( this, payload )
      .with( this )
      .then( registerAdmin )
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
    username: [ 'required', 'alphaNumeric', 'minLength:8', 'maxLength:64' ],
    email_address: [ 'required', 'email', 'minLength:6', 'maxLength:64' ],
    password: [ 'required', 'alphaDash', 'minLength:8', 'maxLength:64' ],
    password_confirmation: {rule: 'required', label: 'confirm password'},
    first_name: { rule: 'required', label: 'first name' },
    last_name: { rule: 'required', label: 'fast name' },
    role_id: { rule: 'required', label: 'role' }
    } );
    return rules.run( payload );
}
function registerAdmin (payload) {
  return this.props.adminUserManagementAdd(payload);
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

UserManagementAdd.mixins = [LinkedStateMixin];
UserManagementAdd.defaultProps = {
    errors: []
};
export default UserManagementAdd;