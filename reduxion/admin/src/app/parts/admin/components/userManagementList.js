import React from 'react';
import { Link } from 'react-router';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';

class UserManagementList extends React.Component {
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
  userDisplay (id, key, data, alter) {
    return (
       <tr key={key} className={alter ? "bg-dark" : "bg-light"}>
          <td className="mdl-data-table__cell--non-numeric">{id}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.get('username')}<br /> {data.get('roles').toArray().map(key => {return key.get('display_name')})}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.get('email_address')}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.get('name')}</td>
          <td className="mdl-data-table__cell--non-numeric">Failed login attempts: {data.get('login_attempts')}</td>
          <td className="mdl-data-table__cell--non-numeric">
            <Link
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit"
            to={"/coffee/account/" + id}><i className="material-icons">open_in_new</i></Link>
            <button
                className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete"
                onClick={(e) => this.deleteItem(e, id)}>
              <i className="material-icons">delete</i>
            </button>
          </td>
        </tr>
    )
  }

  pagination (key, currentPage) {
    let className = "mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-" + (key == currentPage ? 'active' : 'normal');
    return (
        <button key={key} className={className} onClick={(e) => this.page(e, key)}>{key}</button>
      );
  }
  prevPage (key, prev) {
    return (
      <div key={key} style={{display: "inline"}}>
        {prev &&
        <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-blue"
          onClick={(e) => this.page(e, 1)}>FIRST</button>
        }
        {!prev &&
          <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">FIRST</button>
        }
        {prev &&
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-blue"
            onClick={(e) => this.page(e, prev)}>
            <i className="material-icons">keyboard_arrow_left</i>
          </button>
        }
        {!prev &&
          <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">
            <i className="material-icons">keyboard_arrow_left</i>
          </button>
        }
      </div>
    );
  }
  nextPage (key, next, last) {
    return (
      <div key={key} style={{display: "inline"}}>
      {next &&
        <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-blue"
          onClick={(e) => this.page(e, next)}>
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
      }
      {!next &&
        <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
      }
      {next &&
        <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-blue"
          onClick={(e) => this.page(e, last)}>LAST</button>
      }
      {!next &&
        <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">LAST</button>
      }
      </div>
    );
  }
  render() {
    let counter = false;
    let alter = false;
    let pagination = [];
    let users = {};
    let adminList = {last_page: 1};
    if (this.props.adminList.size) {
      let i=0;
      counter = true;
      adminList = this.props.adminList;
      users = adminList.get('data').toArray();
      pagination[i] = this.prevPage(i, (adminList.get('current_page') > 1 ? (adminList.get('current_page') - 1): false));
      for (i = 1; i <= adminList.get('last_page'); i++) {
        pagination[i] = this.pagination(i, adminList.get('current_page'));
      }
      pagination[i+1] = this.nextPage(i+1, ((adminList.get('current_page') == adminList.get('last_page'))|| adminList.get('last_page') == 0 ? false : (adminList.get('current_page') + 1 )), adminList.get('last_page') );
    }
    return (
      <div className="filter-search">
        <p>Filter / Search</p>
          <div className="mdl-grid filter-search-bar">
            <div className="mdl-cell mdl-cell--4-col">
              <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="email-address" ref="email_address" />
                <label className="mdl-textfield__label">Email Address</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="name" ref="name"/>
                <label className="mdl-textfield__label">Name</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col search-cta">
              <button
                className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent"
                onClick={(e) => this.searchList(e)}><i className="material-icons">search</i>Search</button>
              <button
                className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised"
                onClick={(e) => this.clearSearch(e)}><i className="material-icons">clear</i>Clear</button>
            </div>
          </div>
          <table className="mdl-data-table mdl-js-data-table table-client-list">
            <thead>
              <tr>
                <th className="mdl-data-table__cell--non-numeric">ID</th>
                <th className="mdl-data-table__cell--non-numeric">Username</th>
                <th className="mdl-data-table__cell--non-numeric">Email Address</th>
                <th className="mdl-data-table__cell--non-numeric">Name</th>
                <th className="mdl-data-table__cell--non-numeric">Stats</th>
                <th className="mdl-data-table__cell--non-numeric">View / Edit</th>
              </tr>
            </thead>
            <tbody>
              {counter && users.map(item =>
                {
                  alter = alter ? false : true;
                  {return this.userDisplay(item.get('id'), item.get('user').get('id'), item.get('user'), alter)}
                }
              )}
            </tbody>
          </table>
          {/* <!-- Pagination -->*/}
        <div className="mdl-grid pagination">
          <div className="mdl-cell mdl-cell--3-col"></div>
          <div className="mdl-cell mdl-cell--6-col">
            {counter && pagination}
          </div>
          <div className="mdl-cell mdl-cell--3-col">
            <button
              className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page"
              onClick={(e) => this.page(e, adminList.get('last_page'))}>{counter && adminList.get('last_page')}</button>
          </div>
        </div>
      </div>
    );
  }
  clearSearch(e) {
    e.preventDefault();
    this.refs.email_address.value = "";
    this.refs.name.value = "";
    this.searchList(e);
  }
  searchList(e) {
    e.preventDefault();
    let payload = {
      email_address: this.refs.email_address.value,
      name: this.refs.name.value
    };
    this.props.adminUserManagementList(payload);
  }
  page(e, id) {
    e.preventDefault();
    let payload = {
      page: id,
      email_address: this.refs.email_address.value,
      name: this.refs.name.value
    };
    this.props.adminUserManagementList(payload);
  }
  deleteItem (e, id) {
    e.preventDefault();
    this.setState( {
      loading: true,
      errors: {},
      errorServer: null
    } );
    let payload = {
      id: id
    };
    window.componentHandler.upgradeDom();
    return validateDelete.call( this, payload )
      .with( this )
      .then( deletefunc )
      .catch( setErrors );
  }

};

function mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
        return callback(key, object[key]);
    });
}

function validateDelete (payload) {
  let rules = new Checkit( {
    id: []
    } );
    return rules.run( payload );
}

function deletefunc (payload) {
  return this.props.deleteAdminAccount(payload);
}

function setErrors( e ) {
  this.setState(createError(e));
}

UserManagementList.mixins = [LinkedStateMixin];
UserManagementList.defaultProps = {
    errors: []
};
export default UserManagementList;