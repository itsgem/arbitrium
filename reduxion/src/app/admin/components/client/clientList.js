import React from 'react';
import { Link } from 'react-router';
import {modal, openModal, closeModal} from 'common/components/modal'
import {createError} from 'utils/error';

class UserManagementList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      id: null
    };  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
    modal();
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
    let perPage = 10;

    if (Object.keys(this.props.clientList).length) {
      let i=0;
      counter = true;
      clientList = this.props.clientList;
      users = clientList.data;
      pagination[i] = this.prevPage(i, (clientList.current_page > 1 ? (clientList.current_page - 1): false));
      for (i = 1; i <= clientList.last_page; i++) {
        pagination[i] = this.pagination(i, clientList.current_page);
      }
      pagination[i+1] = this.nextPage(i+1, ((clientList.current_page == clientList.last_page)|| clientList.last_page == 0 ? false : (clientList.current_page + 1 )), clientList.last_page );
      perPage = clientList.per_page;
    }

    return (
      <div className="filter-search">
        <div className="dialog-box"></div>
        <div className="dialog-content">
          <div className="dialog-inner">
            <div className="msg-box mdl-shadow--2dp">
              <p>Are you sure you want to delete <label></label>’s account?<br />This cannot be undone.</p>
              <div className="mdl-dialog__actions">
                <button type="button" className="mdl-button modal-yes" onClick={()=>this.deleteItem()}>YES</button>
                <button type="button" className="mdl-button close modal-cancel" onClick={()=>this.modalClose()}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
        <p>Filter / Search</p>
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
              <div id="status-opt" className="mdl-selectfield mdl-textfield mdl-block mdl-js-selectfield mdl-textfield--floating-label">
                <select onKeyPress={()=>this.isPress()} className="selectBox mdl-textfield__input" id="status" ref="status">
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
                <th className="mdl-data-table__cell--non-numeric" width="112">ID</th>
                <th className="mdl-data-table__cell--non-numeric" width="114">Company Name</th>
                <th className="mdl-data-table__cell--non-numeric" width="200">Representative Name</th>
                <th className="mdl-data-table__cell--non-numeric" width="195">Email Address</th>
                <th className="mdl-data-table__cell--non-numeric" width="170">Phone Number</th>
                <th className="mdl-data-table__cell--non-numeric" width="139">Mobile No.</th>
                <th className="mdl-data-table__cell--non-numeric" width="110">Status</th>
                <th className="mdl-data-table__cell--non-numeric" width="130">Action</th>
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
          <div className="mdl-cell mdl-cell--3-col tooltipBox">
            <span className="tooltiptext">Items to show per page</span>
            <input ref="pageNum" type="button" onClick={()=>this.selectPageNumber()} id="numDisplay" aria-expanded='false' className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page" value={perPage} />
            <button onClick={(e) => this.itemPage(e, 50)} id="bt-50" style={{opacity: 0, transform: 'scale(0)', transitionDelay: '3ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-2">50</button>
            <button onClick={(e) => this.itemPage(e, 20)} id="bt-20" style={{opacity: 0, transform: 'scale(0)', transitionDelay: '-62ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-2">20</button>
            <button onClick={(e) => this.itemPage(e, 10)} id="bt-10" style={{opacity: 0, transform: 'scale(0)', transitionDelay: '-127ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-4">10</button>
          </div>
        </div>
      </div>
    );
  }
  isPress() {
    document.getElementById("status-opt").classList.add('is-dirty');
  }

  selectPageNumber () {
    let thisEvent = document.getElementById("numDisplay");
    let btOne = document.querySelector("#bt-10");
    let btTwo = document.querySelector("#bt-20");
    let btThree = document.querySelector("#bt-50");
    if (thisEvent.getAttribute("aria-expanded") == 'true') {
      thisEvent.setAttribute("aria-expanded", "false");
      btOne.style.opacity = "0";
      btOne.style.transform = "scale(0)";
      btOne.style.transitionDelay = "-127ms";

      btTwo.style.opacity = "0";
      btTwo.style.transform = "scale(0)";
      btTwo.style.transitionDelay = "-62ms";

      btThree.style.opacity = "0";
      btThree.style.transform = "scale(0)";
      btThree.style.transitionDelay = "3ms";
    } else {
      thisEvent.setAttribute("aria-expanded", "true");
      btOne.style.opacity = "1";
      btOne.style.transform = "scale(1)";
      btOne.style.transitionDelay = "130ms";

      btTwo.style.opacity = "1";
      btTwo.style.transform = "scale(1)";
      btTwo.style.transitionDelay = "65ms";

      btThree.style.opacity = "1";
      btThree.style.transform = "scale(1)";
      btThree.style.transitionDelay = "0ms";
    }
  }
  itemPage (e, pageNum = 10) {
    this.selectPageNumber();
    let thisEvent = document.getElementById("numDisplay");
    thisEvent.value = pageNum;
    this.page(e, 1);
  }
  modalConfirm (e, id, company) {
    document.querySelector('.msg-box p label').innerHTML = company;
    openModal();
    this.setState( {
      id: id
    } );
  }
  modalClose () {
    closeModal();
  }
  clearSearch(e) {
    e.preventDefault();
    this.refs.company.value = "";
    this.refs.email_address.value = "";
    this.refs.status.value = "";
    for (let item of document.querySelectorAll('.is-dirty')) {
      item.classList.remove('is-dirty');
    }
    this.searchList(e, 10);
  }
  searchList(e, pageNum = null) {
    e.preventDefault();
    let payload = {
      per_page: (pageNum ? pageNum : this.refs.pageNum.value),
      company_name: this.refs.company.value,
      email_address: this.refs.email_address.value,
      approval_status: this.refs.status.value
    };
    this.props.adminClientList(payload).catch(createError);
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
    this.props.adminClientList(payload).catch(createError);
  }
  deleteItem () {
    this.modalClose();
    this.setState( {
      loading: true,
      errors: {},
      errorServer: null
    } );
    $('.msg').html('Successfully deleted').addClass('bg-green');
    $('.msg').fadeIn(1000, function() {
      $(this).fadeOut(2000);
    });
    this.props.adminclientDelete(this.state.id).catch(createError);
  }

};

export default UserManagementList;