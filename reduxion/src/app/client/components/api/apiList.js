import React from 'react';
import { Link } from 'react-router';
import {modal, openModal, closeModal} from 'common/components/modal'
import {createError} from 'utils/error';
import DatePicker from 'react-datepicker';

class ApiList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      id: null,
      createdDate: null
    };  }
  componentWillReceiveProps(nextProps) {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
    modal();
  }
  userDisplay (data, alter) {
    return (
      <tr key={data._id} className={alter ? "bg-dark" : "bg-light"}>
        <td className="mdl-data-table__cell--non-numeric">{data.description}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.token}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.created}</td>
        <td className="mdl-data-table__cell--non-numeric">
          <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect switch" htmlFor={"switch-" + data._id}>
            <input type="checkbox" id={"switch-" + data._id} className="mdl-switch__input" defaultChecked={(data.isActive == true) ? false : true} onChange={(e) => this.changeActive(e, data._id)} />
            <span className="mdl-switch__label">On / Off</span>
            </label>
          <Link
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit"
          to={"/i/api/" + data._id}><i className="material-icons">open_in_new</i></Link>
          <button
              className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete"
              onClick={(e) => this.modalConfirm(e, data._id, data.description)}>
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
  selectedDate(date, selectedDate) {
    let isDate = {};
    isDate[selectedDate] = date;
    this.setState( isDate );
    document.getElementById(selectedDate).classList.add('is-dirty');
  }
  render() {
    let counter = false;
    let alter = false;
    let pagination = [];
    let perPage = 10;
    let apiList = {lastPage: 1};
    let users = {};
    if (Object.keys(this.props.listApiKeys).length) {
      let i=0;
      counter = true;
      apiList = this.props.listApiKeys;
      users = apiList.data;
      pagination[i] = this.prevPage(i, (apiList.currentPage > 1 ? (apiList.currentPage - 1): false));
      for (i = 1; i <= apiList.lastPage; i++) {
        pagination[i] = this.pagination(i, apiList.currentPage);
      }
      pagination[i+1] = this.nextPage(i+1, ((apiList.currentPage == apiList.lastPage)|| apiList.lastPage == 0 ? false : (apiList.currentPage + 1 )), apiList.lastPage );
      perPage = apiList.perPage;
    }
    return (
      <div className="filter-search">
        <div className="mdl-grid">
          <div className="mdl-cell">
            <Link to="/i/api/new" className="mdl-button mdl-button--raised mdl-button--blue">New API Key</Link>
          </div>
        </div>
        <div className="mdl-grid mdl-grid--no-spacing table-list-container">
          <div className="dialog-box"></div>
          <div className="dialog-content">
            <div className="dialog-inner">
              <div className="msg-box mdl-shadow--2dp">
                 <p>Are you sure you want to delete this API Key?<br />This cannot be undone.</p>
                <div className="mdl-dialog__actions">
                  <button type="button" className="mdl-button modal-yes" onClick={(e) => this.deleteItem()}>YES</button>
                  <button type="button" className="mdl-button close modal-cancel" onClick={(e) => this.modalClose()}>CANCEL</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--12-col header-title"><p>Api key list</p></div>
          <div className="mdl-grid filter-search-bar">
              <div className="mdl-cell mdl-cell--3-col">
                <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="text" id="description" ref="description"/>
                  <label className="mdl-textfield__label">Description</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="text" id="api_key" ref="api_key" />
                  <label className="mdl-textfield__label">API Key</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--2-col">
                <div id="createdDate" className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                  <DatePicker
                    selected={this.state.createdDate}
                    dateFormat="YYYY-MM-DD"
                    onChange={(e) => this.selectedDate(e, 'createdDate')}
                    className="mdl-textfield__input font-input" id="created_at" readOnly/>
                  <label className="mdl-textfield__label">Date created</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col margin-top-20 text-right">
                <button
                  className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent margin-right-10"
                  onClick={(e) => this.searchList(e)}><i className="material-icons">search</i>Search</button>
                <button
                  className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised"
                  onClick={(e) => this.clearSearch(e)}><i className="material-icons">clear</i>Clear</button>
              </div>
            </div>
          <table className="table-api mdl-data-table mdl-js-data-table table-client-list">
            <thead>
              <tr>
                <th width="300" className="mdl-data-table__cell--non-numeric">Description</th>
                <th width="500" className="mdl-data-table__cell--non-numeric">Key</th>
                <th width="200" className="mdl-data-table__cell--non-numeric">Date Created</th>
                <th width="300" className="mdl-data-table__cell--non-numeric">Action</th>
              </tr>
            </thead>
            <tbody>
              {counter && users.map(item => {
                alter = alter ? false : true;
                return this.userDisplay(item, alter); })}
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
              <input ref="pageNum" type="button" onClick={(e) => this.selectPageNumber(e)} id="numDisplay" aria-expanded='false' className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page" value={perPage} />
              <button onClick={(e) => this.itemPage(e, 50)} id="bt-50" style={{opacity: 0, transform: 'scale(0)', 'transitionDelay': '3ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-2">50</button>
              <button onClick={(e) => this.itemPage(e, 20)} id="bt-20" style={{opacity: 0, transform: 'scale(0)', 'transitionDelay': '-62ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-2">20</button>
              <button onClick={(e) => this.itemPage(e, 10)} id="bt-10" style={{opacity: 0, transform: 'scale(0)', 'transitionDelay': '-127ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-4">10</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  clearSearch(e) {
    e.preventDefault();
    this.refs.description.value = "";
    this.refs.api_key.value = "";
    document.getElementById('created_at').value = '';
    this.setState( {
      createdDate: null
    } );
    for (let item of document.querySelectorAll('.is-dirty')) {
      item.classList.remove('is-dirty');
    }
    this.searchList(e, 10);
  }

  searchList(e, pageNum = null) {
    e.preventDefault();
    let payload = {
      perPage: (pageNum ? pageNum : this.refs.pageNum.value),
      description: this.refs.description.value,
      token: this.refs.api_key.value,
      created: document.getElementById('created_at').value
    };
    this.props.clientApiKeys(payload).catch(createError);
  }

  deleteItem () {
    this.props.clientDeleteApiKey(this.state.id).catch(createError);
    this.modalClose();
  }
  changeActive (e, id, status) {
    let payload = {
      id: id,
      isActive: ((e.target.checked == true) ? 0 : 1)
    };
    this.props.isActiveApiKey(payload).catch(createError);
  }
  selectPageNumber (pageNum) {
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
    this.selectPageNumber(pageNum);
    let thisEvent = document.getElementById("numDisplay");
    thisEvent.value = pageNum;

    this.page(e, 1);
  }
  modalConfirm (e, id, company) {
    openModal();
    this.setState( {
      id: id
    } );
  }
  modalClose () {
    closeModal();
  }
  page(e, pageNumber) {
    e.preventDefault();
    let payload = {
      page: pageNumber,
      perPage: this.refs.pageNum.value,
      description: this.refs.description.value,
      token: this.refs.api_key.value,
      created: document.getElementById('created_at').value
    };
    this.props.clientApiKeys(payload).catch(createError);
  }
};

export default ApiList;