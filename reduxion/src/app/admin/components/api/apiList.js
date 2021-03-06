import React from 'react';
import tr from 'i18next';
import { Link } from 'react-router';
import {createError} from 'utils/error';
import {modal, openModal, closeModal} from 'common/components/modal';
import moment from 'moment';

class ApiList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      id: null,
      description: null,
      apiKey: null,
      created_date_from: null,
      created_date_to: null
    };  }
  componentWillReceiveProps(nextProps) {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }

    modal();
    if (nextProps.activeApiKey || nextProps.deleteApiKeySuccess) {
      let apiList = nextProps.ListApiSuccess;
      let payload = {
        page: apiList.current_page,
        per_page: apiList.per_page,
        description: this.state.description,
        token: this.state.apiKey,
        date_from: this.state.created_date_from ? this.state.created_date_from.format("YYYY-MM-DD") : '',
        date_to: this.state.created_date_to ? this.state.created_date_to.format("YYYY-MM-DD") : ''
      };
      nextProps.apiList(payload).catch(createError);
    }
  }
  componentDidMount() {
    let isState = this;
    $( document ).ready(function() {
      $('#created_date_from .datepicker').datepicker({
          format: 'yyyy-mm-dd',
          endDate: moment(new Date()).format('YYYY-MM-DD'),
          autoclose: true,
          todayHighlight: true
      });
      $('#created_date_to .datepicker').datepicker({
          format: 'yyyy-mm-dd',
          endDate: moment(new Date()).format('YYYY-MM-DD'),
          autoclose: true,
          todayHighlight: true
      });
    });
    this.updateDatepicker(isState);
  }
  userDisplay (data, alter) {
    return (
      <tr key={data.id} className={alter ? "bg-dark" : "bg-light"}>
        <td width="200" className="mdl-data-table__cell--non-numeric">{moment(data.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
        <td width="300" className="mdl-data-table__cell--non-numeric">{data.description}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.token}</td>
        <td width="250" className="mdl-data-table__cell--non-numeric">
          <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect switch" htmlFor={"switch-" + data.id}>
            <input type="checkbox" id={"switch-" + data.id} className="mdl-switch__input" defaultChecked={(data.is_active == 1) ? false : true} onChange={(e) => this.changeActive(e, data.id)} />
            <span className="mdl-switch__label">{tr.t('LABEL.ON_OFF')}</span>
            </label>
          <Link
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit"
          to={"/coffee/api/" + data.id}><i className="material-icons">open_in_new</i></Link>
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
        <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">{tr.t('LABEL.LAST')}</button>
      }
      </div>
    );
  }
  updateDatepicker(isState) {
    $('#created_date_from .datepicker').change(function(){
      isState.setState({created_date_from: $(this).val()});
      document.getElementById('created_date_from').classList.add('is-dirty');

      if (isState.state.created_date_from > isState.state.created_date_to) {
        $('#created_date_to .datepicker').datepicker('update', moment(isState.state.created_date_from).toDate());
      }

      $('#created_date_to .datepicker').datepicker('setStartDate', moment(isState.state.created_date_from).toDate());
      $('#created_date_to .datepicker').datepicker('setEndDate', moment(new Date()).format('YYYY-MM-DD'));
      if (!isState.state.created_date_to) {
        document.getElementById('created_date_to').classList.remove('is-dirty');
      }
    });
    $('#created_date_to .datepicker').change(function(){
      isState.setState({created_date_to: $(this).val()});
      document.getElementById('created_date_to').classList.add('is-dirty');
    });
  }
  render() {
    let counter = false;
    let alter = false;
    let pagination = [];
    let perPage = 10;
    let apiList = {last_page: 1};
    let users = {};
    if (Object.keys(this.props.ListApiSuccess).length) {
      counter = true;
      apiList = this.props.ListApiSuccess;
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

    return (
      <div className="filter-search">
        <p>{tr.t('LABEL.FILTER_SEARCH')}</p>
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
          <div className="mdl-grid filter-search-bar">
            <div className="mdl-cell mdl-cell--2-col">
              <div id="created_date_from" className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                <input
                  type="text"
                  className="datepicker mdl-textfield__input"
                  id="date_from" ref="date_from"
                  readOnly
                />
                <label className="mdl-textfield__label">{tr.t('LABEL.DATE_CREATED_FROM')}</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              <div id="created_date_to" className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                <input
                  type="text"
                  className="datepicker mdl-textfield__input"
                  id="date_to" ref="date_to"
                  readOnly
                />
                <label className="mdl-textfield__label">{tr.t('LABEL.DATE_CREATED_TO')}</label>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
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
            <div className="mdl-cell mdl-cell--3-col search-cta">
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
                <th className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.DATE_CREATED')}</th>
                <th className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.DESCRIPTION')}</th>
                <th className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.API_KEY')}</th>
                <th className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.ACTION')}</th>
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
  deleteItem () {
    this.props.adminDeleteApiKey(this.state.id).catch(createError);
    this.modalClose();
    $('.msg').html('Successfully deleted').addClass('bg-green');
    $('.msg').fadeIn(1000, function() {
      $(this).fadeOut(2000);
    });
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
  clearSearch(e) {
    var today = moment(new Date()).format('YYYY-MM-DD');
    e.preventDefault();
    this.refs.description.value = "";
    this.refs.api_key.value = "";
    this.refs.date_from.value = "";
    this.refs.date_to.value = "";

    this.setState( {
      description: null,
      apiKey: null,
      created_date_from: null,
      created_date_to: null
    } );

    $('#created_date_from .datepicker').datepicker('setDate', null);
    $('#created_date_from .datepicker').datepicker('setEndDate', today);

    $('#created_date_to .datepicker').datepicker('setDate', null);
    $('#created_date_to .datepicker').datepicker('setStartDate', null);
    $('#created_date_to .datepicker').datepicker('setEndDate', today);

    for (let item of document.querySelectorAll('.is-dirty')) {
      item.classList.remove('is-dirty');
    }
    this.searchList(e, 10, true);
  }
  searchList(e, pageNum = null, clearDate = false) {
    var dateFrom = this.state.created_date_from;
    var dateTo = this.state.created_date_to;
    e.preventDefault();

    let descr = '';
    let token = '';

    if (!clearDate) {
      dateFrom = (dateFrom ? dateFrom : '');
      dateTo = (dateTo ? dateTo : '');
      pageNum = (pageNum ? pageNum : this.refs.pageNum.value);
      descr = this.refs.description.value;
      token = this.refs.api_key.value;

      this.setState( {
        description: descr,
        apiKey: token,
        created_date_from: dateFrom,
        created_date_to: dateTo
      } );
    } else {
      dateFrom = '';
      dateTo = '';
      pageNum = 10;
      this.setState( {
        created_date_from: null,
        created_date_to: null,
        description: null,
        apiKey: null
      } );
    }

    let payload = {
      per_page: pageNum,
      dateFrom: dateFrom,
      dateTo: dateTo,
      description: descr,
      token: token
    };
    this.props.apiList(payload).catch(createError);
  }
  page(e, pageNumber) {
    var dateFrom = this.state.created_date_from;
    var dateTo = this.state.created_date_to;
    e.preventDefault();
    this.setState({
      description: this.refs.description.value,
      apiKey: this.refs.api_key.value,
      created_date_from: (dateFrom ? dateFrom : ''),
      created_date_to: (dateTo ? dateTo : '')
    });

    let payload = {
      page: pageNumber,
      per_page: this.refs.pageNum.value,
      description: this.refs.description.value,
      token: this.refs.api_key.value,
      dateFrom: (dateFrom ? dateFrom : ''),
      dateTo: (dateTo ? dateTo : '')
    };
    this.props.apiList(payload).catch(createError);
  }
};

export default ApiList;