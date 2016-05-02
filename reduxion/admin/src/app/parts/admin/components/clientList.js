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
        <input type="button" ref={key == currentPage ? 'currentpage' : ''} key={key} className={className} onClick={(e) => this.page(e, key)} value={key} />
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
          <p>Are you sure you want to delete <label></label>’s account?<br />This cannot be undone.</p>
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
                <th className="mdl-data-table__cell--non-numeric">Status</th>
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
            <input ref="pageNum" type="button" onClick={(e) => this.itemPage(e)} id="numDisplay" aria-expanded='false' className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page" value="10" />
            <button onClick={(e) => this.itemPage(e, 50)} id="bt-50" style={{opacity: 0, transform: 'scale(0)', 'transitionDelay': '3ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-2">50</button>
            <button onClick={(e) => this.itemPage(e, 20)} id="bt-20" style={{opacity: 0, transform: 'scale(0)', 'transitionDelay': '-62ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-2">20</button>
            <button onClick={(e) => this.itemPage(e, 10)} id="bt-10" style={{opacity: 0, transform: 'scale(0)', 'transitionDelay': '-127ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-4">10</button>
          </div>
        </div>
      </div>
    );
  }
  itemPage (e, pageNum = 10) {
    let thisEvent = document.getElementById("numDisplay");
    let bt_one = document.querySelector("#bt-10");
    let bt_two = document.querySelector("#bt-20");
    let bt_three = document.querySelector("#bt-50");
    thisEvent.value = pageNum;
    if (thisEvent.getAttribute("aria-expanded") == 'true') {
      thisEvent.setAttribute("aria-expanded", "false");
      bt_one.style.opacity = "0";
      bt_one.style.transform = "scale(0)";
      bt_one.style.transitionDelay = "-127ms";

      bt_two.style.opacity = "0";
      bt_two.style.transform = "scale(0)";
      bt_two.style.transitionDelay = "-62ms";

      bt_three.style.opacity = "0";
      bt_three.style.transform = "scale(1)";
      bt_three.style.transitionDelay = "3ms";
    } else {
      thisEvent.setAttribute("aria-expanded", "true");
      bt_one.style.opacity = "1";
      bt_one.style.transform = "scale(1)";
      bt_one.style.transitionDelay = "130ms";

      bt_two.style.opacity = "1";
      bt_two.style.transform = "scale(1)";
      bt_two.style.transitionDelay = "65ms";

      bt_three.style.opacity = "1";
      bt_three.style.transform = "scale(1)";
      bt_three.style.transitionDelay = "0ms";
    }
    let currentPage = this.refs.currentpage.value;
    //this.page(e, currentPage);
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
  page(e, pageNumber) {
    e.preventDefault();
    let payload = {
      page: pageNumber,
      per_page: this.refs.pageNum.value,
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