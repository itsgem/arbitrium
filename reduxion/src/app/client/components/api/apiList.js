import React from 'react';
import tr from 'i18next';
import { Link } from 'react-router';
import {modal, openModal, closeModal} from 'common/components/modal'
import {createError} from 'utils/error';

class ApiList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      id: null,
      description: null,
      token: null,
      created: null
    };  }
  componentWillReceiveProps(nextProps) {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }

    if (nextProps.activeApiKey || nextProps.deleteApiKeySuccess) {
      let apiList = nextProps.listApiKeys;
      let description = this.state.description;
      let token = this.state.token;
      let created = this.state.created;
      let payload = {
        page: apiList.currentPage,
        perPage: apiList.perPage,
        description: description,
        token: token,
        created: created
      };

      nextProps.clientApiKeys(payload).catch(createError);
    }
    modal();
  }
  componentDidMount() {
    $( document ).ready(function() {
      $('.datepicker').datepicker({
          format: 'yyyy-mm-dd',
          endDate: '+0d',
          autoclose: true,
          todayHighlight: true
      });
    });
  }
  userDisplay (data, alter) {
    return (
      <tr key={data.id} className={alter ? "bg-dark" : "bg-light"}>
        <td className="mdl-data-table__cell--non-numeric">{data.description}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.token}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.created}</td>
        <td className="mdl-data-table__cell--non-numeric">
          <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect switch" htmlFor={"switch-" + data.id}>
            <input type="checkbox" id={"switch-" + data.id} className="mdl-switch__input" defaultChecked={(data.is_active == true) ? false : true} onChange={(e) => this.changeActive(e, data.id)} />
            <span className="mdl-switch__label">{tr.t('LABEL.ON_OFF')}</span>
            </label>
          <Link
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit"
          to={"/i/api/" + data.id}><i className="material-icons">open_in_new</i></Link>
          <button
              className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete"
              onClick={(e) => this.modalConfirm(e, data.id)}>
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
        <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">LAST</button>
      }
      </div>
    );
  }
  render() {
    let counter = false;
    let alter = false;
    let pagination = [];
    let perPage = 10;
    let apiList = {last_page: 1};
    let users = {};
    if (Object.keys(this.props.listApiKeys).length) {
      counter = true;
      apiList = this.props.listApiKeys;
      users = apiList.data;
      pagination[0] = this.prevPage(0, (apiList.current_page > 1 ? (apiList.current_page - 1): false));
      let i = 1;
      if (apiList.last_page > apiList.max_pagination_links) {
        i = Math.round(apiList.max_pagination_links / 2);
        i = i < apiList.current_page ? (apiList.current_page - 2) : 1;
        i = (apiList.last_page >  apiList.max_pagination_links) && i > (apiList.last_page - apiList.max_pagination_links) ? ((apiList.last_page - apiList.max_pagination_links) + 1) : i;
      }
      let pageLimitCounter = 0;
      for (i; i <= apiList.last_page ; i++) {
        if (pageLimitCounter >= apiList.max_pagination_links) {
          break;
        }
        pageLimitCounter++;
        pagination[i] = this.pagination(i, apiList.current_page);
      }
      pagination[i+1] = this.nextPage(i+1, ((apiList.current_page == apiList.last_page)|| apiList.last_page == 0 ? false : (apiList.current_page + 1 )), apiList.last_page );
      perPage = apiList.per_page;
    }

    let isState = this ;
    $('.datepicker').change(function(){
      isState.setState({created: $(this).val()});
      document.getElementById('createdDate').classList.add('is-dirty');
    });

    return (
      <div className="filter-search">
        <div className="mdl-grid">
          <div className="mdl-cell">
            <Link to="/i/api/new" className="mdl-button mdl-button--raised mdl-button--blue">{tr.t('BUTTON.NEW_API_KEY')}</Link>
          </div>
        </div>
        <div className="mdl-grid mdl-grid--no-spacing table-list-container">
          <div className="dialog-box"></div>
          <div className="dialog-content">
            <div className="dialog-inner">
              <div className="msg-box mdl-shadow--2dp">
                <p>
                  {tr.t('NOTEFICATION_MESSAGE.DELETE.CONFIRM_01')}<br />
                  {tr.t('NOTEFICATION_MESSAGE.DELETE.CANNOT_UNDONE')}
                </p>
                <div className="mdl-dialog__actions">
                  <button type="button" className="mdl-button modal-yes" onClick={()=>this.deleteItem()}>{tr.t('BUTTON.YES')}</button>
                  <button type="button" className="mdl-button close modal-cancel" onClick={()=>this.modalClose()}>{tr.t('BUTTON.CANCEL')}</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--12-col header-title"><p>{tr.t('CLIENT_API_KEY.API_LIST.TITLE')}</p></div>
          <div className="mdl-grid filter-search-bar">
              <div className="mdl-cell mdl-cell--3-col">
                <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="text" id="description" ref="description"/>
                  <label className="mdl-textfield__label">{tr.t('LABEL.DESCRIPTION')}</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="text" id="api_key" ref="api_key" />
                  <label className="mdl-textfield__label">{tr.t('LABEL.API_KEY')}</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--2-col">
                <div id="createdDate" className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                  <input
                    type="text"
                    className="datepicker mdl-textfield__input"
                    id="created_at" ref="created_at"
                    readOnly
                  />
                  <label className="mdl-textfield__label">{tr.t('LABEL.DATE_CREATED')}</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col margin-top-20 text-right">
                <button
                  className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent margin-right-10"
                  onClick={(e) => this.searchList(e)}><i className="material-icons">search</i>{tr.t('BUTTON.SEARCH')}</button>
                <button
                  className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised"
                  onClick={(e) => this.clearSearch(e)}><i className="material-icons">clear</i>{tr.t('BUTTON.CLEAR')}</button>
              </div>
            </div>
          <table className="table-api mdl-data-table mdl-js-data-table table-client-list">
            <thead>
              <tr>
                <th width="300" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.DESCRIPTION')}</th>
                <th width="500" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.API_KEY')}</th>
                <th width="200" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.DATE_CREATED')}</th>
                <th width="300" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.ACTION')}</th>
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
            <div className="mdl-cell mdl-cell--12-col">
              {counter && pagination}
            </div>
            <div className="mdl-cell mdl-cell--3-col tooltipBox">
              <span className="tooltiptext">{tr.t('LABEL.ITEM_PER_PAGE')}</span>
              <input ref="pageNum" type="button" onClick={()=>this.selectPageNumber()} id="numDisplay" aria-expanded='false' className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page" defaultValue={perPage} />
              <button onClick={(e) => this.itemPage(e, 50)} id="bt-50" style={{opacity: 0, transform: 'scale(0)', transitionDelay: '3ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-2">50</button>
              <button onClick={(e) => this.itemPage(e, 20)} id="bt-20" style={{opacity: 0, transform: 'scale(0)', transitionDelay: '-62ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-2">20</button>
              <button onClick={(e) => this.itemPage(e, 10)} id="bt-10" style={{opacity: 0, transform: 'scale(0)', transitionDelay: '-127ms'}} className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page lighten-4">10</button>
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
    this.refs.created_at.value = "";
    this.setState( {
      created: null,
      description: null,
      token: null
    } );

    $('.datepicker').datepicker('setDate', null);

    for (let item of document.querySelectorAll('.is-dirty')) {
      item.classList.remove('is-dirty');
    }
    this.searchList(e, 10, true);
  }

  searchList(e, pageNum = null, clearDate = false) {
    e.preventDefault();
    let createDate = this.state.created;
    let descr = '';
    let token = '';

    if (!clearDate) {
      createDate = (createDate ? createDate : '');
      pageNum = (pageNum ? pageNum : this.refs.pageNum.value);
      descr = this.refs.description.value;
      token = this.refs.api_key.value;

      this.setState( {
        description: descr,
        token: token,
        created: createDate
      } );
    } else {
      createDate = ''
      pageNum = 10;
      this.setState( {
        created: null,
        description: null,
        token: null
      } );
    }

    let payload = {
      per_page: pageNum,
      created: createDate,
      description: descr,
      token: token
    };
    this.props.clientApiKeys(payload).catch(createError);
  }

  deleteItem () {
    this.props.clientDeleteApiKey(this.state.id).catch(createError);
    this.modalClose();
  }
  changeActive (e, id) {
    let payload = {
      id: id,
      is_active: ((e.target.checked == true) ? false : true)
    };
    this.props.isActiveApiKey(payload).catch(createError);
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
  modalConfirm (e, id) {
    openModal();
    this.setState( {
      id: id
    } );
  }
  modalClose () {
    closeModal();
  }
  page(e, pageNumber) {
    var createDate = this.state.created;
    e.preventDefault();
    this.setState({
      description: this.refs.description.value,
      token: this.refs.api_key.value,
      created: (createDate ? createDate : '')
    });

    let payload = {
      page: pageNumber,
      per_page: this.refs.pageNum.value,
      description: this.refs.description.value,
      token: this.refs.api_key.value,
      created: (createDate ? createDate : '')
    };
    this.props.clientApiKeys(payload).catch(createError);
  }
};

export default ApiList;
