import React from 'react';
import { Link } from 'react-router';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {createError} from 'utils/error';

class UserManagementList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      id: null
    };  }
  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  userDisplay (data, alter) {
    return (
       <tr key={data.id} className={alter ? "bg-dark" : "bg-light"}>
          <td className="mdl-data-table__cell--non-numeric">{data.id}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.company_name}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.rep_last_name}, {data.rep_first_name} </td>
          <td className="mdl-data-table__cell--non-numeric">{data.user.email_address}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.rep_phone_code} {data.rep_phone_number}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.rep_mobile_code} {data.rep_mobile_number}</td>
          <td className="mdl-data-table__cell--non-numeric">{data.approval_status}</td>
          <td className="mdl-data-table__cell--non-numeric">
            <Link
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit"
            to={"/coffee/client/" + data.id}><i className="material-icons">open_in_new</i></Link>
            <button
                className="btn-delete mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete"
                onClick={(e) => this.modalConfirm(e, data.id, data.company_name)}>
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
    let clientList = {last_page: 1};
    if (this.props.clientList.size) {
      let i=0;
      counter = true;
      clientList = this.props.clientList;
      users = clientList.get('data');
      pagination[i] = this.prevPage(i, (clientList.get('current_page') > 1 ? (clientList.get('current_page') - 1): false));
      for (i = 1; i <= clientList.get('last_page'); i++) {
        pagination[i] = this.pagination(i, clientList.get('current_page'));
      }
      pagination[i+1] = this.nextPage(i+1, ((clientList.get('current_page') == clientList.get('last_page'))|| clientList.get('last_page') == 0 ? false : (clientList.get('current_page') + 1 )), clientList.get('last_page') );
    }
    return (
      <div className="filter-search">
        <p>Filter / Search</p>
        <dialog className="mdl-dialog">
          <p>
              Are you sure you want to delete <label></label>’s account?<br />This cannot be undone.
          </p>
          <div className="mdl-dialog__actions">
            <button type="button" className="mdl-button modal-yes" onClick={(e) => this.deleteItem()}>YES</button>
            <button type="button" className="mdl-button close modal-cancel" onClick={(e) => this.modalClose()}>CANCEL</button>
          </div>
        </dialog>
          <div className="mdl-grid filter-search-bar">
            <div className="mdl-cell mdl-cell--3-col">
              <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="company" ref="company"/>
                <label className="mdl-textfield__label">Company</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="email-address" ref="email_address" />
                <label className="mdl-textfield__label">Email Address</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                <select className="selectBox mdl-textfield__input" id="status" ref="status">
                  <option value=""></option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Disapproved">Disapproved</option>
                </select>
                <label className="mdl-textfield__label">Status</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col search-cta">
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
                <th className="mdl-data-table__cell--non-numeric">Company Name</th>
                <th className="mdl-data-table__cell--non-numeric">Representative Name</th>
                <th className="mdl-data-table__cell--non-numeric">Email Address</th>
                <th className="mdl-data-table__cell--non-numeric">Telephone No.</th>
                <th className="mdl-data-table__cell--non-numeric">Mobile No.</th>
                <th className="mdl-data-table__cell--non-numeric">Stats</th>
                <th className="mdl-data-table__cell--non-numeric">Action</th>
              </tr>
            </thead>
            <tbody>
              {counter && users.map(item => {
                alter = alter ? false : true;
                return this.userDisplay(item, alter); }) }
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
              onClick={(e) => this.page(e, clientList.get('last_page'))}>{counter && clientList.get('last_page')}</button>
          </div>
        </div>
      </div>
    );
  }
  modalConfirm (e, id, company) {
    let dialog = document.querySelector('dialog');
    $('dialog label').text(company);
    dialog.showModal();
    this.setState( {
      id: id
    } );
  }
  modalClose () {
    let dialog = document.querySelector('dialog');
    dialog.close();
  }
  clearSearch(e) {
    e.preventDefault();
    this.refs.company.value = "";
    this.refs.email_address.value = "";
    this.refs.status.value = "";
    this.searchList(e);
  }
  searchList(e) {
    e.preventDefault();
    let payload = {
      company_name: this.refs.company.value,
      email_address: this.refs.email_address.value,
      approval_status: this.refs.status.value
    };
    this.props.adminClientList(payload);
  }
  page(e, id) {
    e.preventDefault();
    let payload = {
      page: id,
      company_name: this.refs.company.value,
      email_address: this.refs.email_address.value,
      approval_status: this.refs.status.value
    };
    this.props.adminClientList(payload);
  }
  deleteItem () {
    let dialog = document.querySelector('dialog');
    this.setState( {
      loading: true,
      errors: {},
      errorServer: null
    } );
    $('.msg').html('Successfully deleted').addClass('bg-green');
    $('.msg').fadeIn(1000, function() {
      $(this).fadeOut(2000);
    });
    this.modalClose();
    this.props.adminclientDelete(this.state.id);
  }

};

export default UserManagementList;