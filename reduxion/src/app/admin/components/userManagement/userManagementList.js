import React from 'react';
import tr from 'i18next';
import { Link } from 'react-router';
import {modal, openModal, closeModal} from 'common/components/modal'
import {createError} from 'utils/error';

class UserManagementList extends React.Component {
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
    modal();
  }
  userDisplay (id, key, data, alter) {
    return (
     <tr key={key} className={alter ? "bg-dark" : "bg-light"}>
        <td className="mdl-data-table__cell--non-numeric">{id}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.get('username')}<br /> {data.get('roles').toArray().map(key => {return key.get('display_name')})}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.get('email_address')}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.get('name')}</td>
        <td className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.FAILED_LOGIN_ATTEMPTS')} {data.get('login_attempts')}</td>
        <td className="mdl-data-table__cell--non-numeric">
          <Link
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit"
          to={"/coffee/account/" + id}><i className="material-icons">open_in_new</i></Link>
          <button
              className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete"
              onClick={(e) => this.modalConfirm(e, id, data.get('name'))}>
            <i className="material-icons">delete</i>
          </button>
        </td>
      </tr>
    )
  }

  pagination (key, currentPage) {
    let className = "mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-" + (key == currentPage ? 'active' : 'normal');
    return (
        <button key={key} ref={key == currentPage ? 'currentpage' : ''} className={className} onClick={(e) => this.page(e, key)}>{key}</button>
      );
  }
  prevPage (key, prev) {
    return (
      <div key={key} style={{display: "inline"}}>
        {prev &&
        <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-blue"
          onClick={(e) => this.page(e, 1)}>{tr.t('LABEL.FIRST')}</button>
        }
        {!prev &&
          <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">{tr.t('LABEL.FIRST')}</button>
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
          onClick={(e) => this.page(e, last)}>{tr.t('LABEL.LAST')}</button>
      }
      {!next &&
        <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">{tr.t('LABEL.LAST')}</button>
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
    let perPage = 10;
    if (this.props.adminList.size) {
      counter = true;
      adminList = this.props.adminList;
      users = adminList.get('data').toArray();
      // pagination[i] = this.prevPage(i, (adminList.get('current_page') > 1 ? (adminList.get('current_page') - 1): false));
      pagination[0] = this.prevPage(0, (adminList.get('current_page') > 1 ? (adminList.get('current_page') - 1): false));
      let i = 1;
      if (adminList.get('last_page') > adminList.get('max_pagination_links')) {
        i = Math.round(adminList.get('max_pagination_links') / 2);
        i = i < adminList.get('current_page') ? (adminList.get('current_page') - 2) : 1;
        i = (adminList.get('last_page') >  adminList.get('max_pagination_links')) && i > (adminList.get('last_page') - adminList.get('max_pagination_links')) ? ((adminList.get('last_page') - adminList.get('max_pagination_links')) + 1) : i;
      }
      let pageLimitCounter = 0;
      for (i; i <= adminList.get('last_page') ; i++) {
        if (pageLimitCounter >= adminList.get('max_pagination_links')) {
          break;
        }
        pageLimitCounter++;
        pagination[i] = this.pagination(i, adminList.get('current_page'));
      }
      pagination[i+1] = this.nextPage(i+1, ((adminList.get('current_page') == adminList.get('last_page'))|| adminList.get('last_page') == 0 ? false : (adminList.get('current_page') + 1 )), adminList.get('last_page') );
      perPage = adminList.get('per_page');
    }
    return (
      <div className="filter-search">
        <p>{tr.t('LABEL.FILTER_SEARCH')}</p>
        <div className="dialog-box"></div>
        <div className="dialog-content">
          <div className="dialog-inner">
            <div className="msg-box mdl-shadow--2dp">
              <p>
                {tr.t('NOTEFICATION_MESSAGE.DELETE.CONFIRM_02')}
                <label></label>
                {tr.t('NOTEFICATION_MESSAGE.DELETE.CONFIRM_03')}
                <br />
                {tr.t('NOTEFICATION_MESSAGE.DELETE.CANNOT_UNDONE')}
              </p>
              <div className="mdl-dialog__actions">
                <button type="button" className="mdl-button modal-yes" onClick={()=>this.deleteItem()}>{tr.t('BUTTON.YES')}</button>
                <button type="button" className="mdl-button close modal-cancel" onClick={()=>this.modalClose()}>{tr.t('BUTTON.CANCEL')}</button>
              </div>
            </div>
          </div>
        </div>
          <div className="mdl-grid filter-search-bar">
            <div className="mdl-cell mdl-cell--4-col">
              <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="email-address" ref="email_address" />
                <label className="mdl-textfield__label">{tr.t('LABEL.EMAIL_ADDRESS')}</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="name" ref="name"/>
                <label className="mdl-textfield__label">{tr.t('LABEL.NAME')}</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col search-cta">
              <button
                className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent"
                onClick={(e) => this.searchList(e)}><i className="material-icons">search</i>{tr.t('BUTTON.SEARCH')}</button>
              <button
                className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised"
                onClick={(e) => this.clearSearch(e)}><i className="material-icons">clear</i>{tr.t('BUTTON.CLEAR')}</button>
            </div>
          </div>
          <table className="mdl-data-table mdl-js-data-table table-client-list">
            <thead>
              <tr>
                <th className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.ID')}</th>
                <th className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.USERNAME')}</th>
                <th className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.EMAIL_ADDRESS')}</th>
                <th className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.NAME')}</th>
                <th className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.STATS')}</th>
                <th className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.ACTION')}</th>
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
          <div className="mdl-cell mdl-cell--3-col tooltipBox">
            <span className="tooltiptext">{tr.t('LABEL.ITEM_PER_PAGE')}</span>
            <input ref="pageNum" type="button" onClick={()=>this.selectPageNumber()} id="numDisplay" aria-expanded='false' className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page" value={perPage} />
            <button onClick={(e) => this.itemPage(e, 50)} id="bt-50" style={{opacity: 0, transform: 'scale(0)', transitionDelay: '3ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-2">50</button>
            <button onClick={(e) => this.itemPage(e, 20)} id="bt-20" style={{opacity: 0, transform: 'scale(0)', transitionDelay: '-62ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-2">20</button>
            <button onClick={(e) => this.itemPage(e, 10)} id="bt-10" style={{opacity: 0, transform: 'scale(0)', transitionDelay: '-127ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-4">10</button>
          </div>
        </div>
      </div>
    );
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
  modalConfirm (e, id, name) {
    document.querySelector('.msg-box p label').innerHTML = name;
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
    this.refs.email_address.value = "";
    this.refs.name.value = "";
    this.searchList(e, 10);

    for (let item of document.querySelectorAll('.is-dirty')) {
      item.classList.remove('is-dirty');
    }
  }
  searchList(e, pageNum = null) {
    e.preventDefault();
    let payload = {
      per_page: (pageNum ? pageNum : this.refs.pageNum.value),
      email_address: this.refs.email_address.value,
      name: this.refs.name.value
    };
    this.props.adminUserManagementList(payload).catch(createError);
  }
  page(e, pageNumber) {
    e.preventDefault();
    let payload = {
      page: pageNumber,
      per_page: this.refs.pageNum.value,
      email_address: this.refs.email_address.value,
      name: this.refs.name.value
    };
    this.props.adminUserManagementList(payload).catch(createError);
  }
  deleteItem () {
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
    this.props.deleteAdminAccount(this.state.id).catch(createError);
  }

};

export default UserManagementList;
