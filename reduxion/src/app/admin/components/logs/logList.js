import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import tr from 'i18next';
import { Link } from 'react-router';
import json2csv from 'json2csv';
import moment from 'moment';

class LogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer: null,
      created_date_from: null,
      created_date_to: null
    };
  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  logsDisplay (data, alter) {
    return (
      <tr key={data.id} className={alter ? "bg-dark" : "bg-light"}>
        <td className="mdl-data-table__cell--non-numeric">{moment(data.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.ipaddress}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.method}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.status_code}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.url}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.parameter}</td>
        <td className="mdl-data-table__cell--non-numeric">
          <Link
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit"
          to={"/coffee/settings/logs/client/" + data.client.id + "/log-detail/" + data.id}><i className="material-icons">open_in_new</i></Link>
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
  download(e) {
    let thisEvent = this;
    let downloadButton = document.getElementById('csvDownload');

    if (this.props.logList.data.length <= 0) {
      e.preventDefault();
    } else {
      let payload = {
        client_id: this.props.params.client_id,
        per_page: this.props.logList.total,
        dateFrom: this.refs.date_from.value,
        dateTo: this.refs.date_to.value,
        ipaddress: this.refs.ipAddress.value,
        status_code: this.refs.statusCode.value
      };
      this.props.adminLogListDownload(payload).then(function() {
        let fields = ['created_at', 'ipaddress', 'method', 'status_code', 'url', 'parameter'];
        let fieldNames = ['Date Created', 'IP Address', 'Method', 'Status Code', 'URL', 'Parameter'];
        let estateNameCsv = '';
        let datacsv = '';

        json2csv({ data: thisEvent.props.logListDownload.data, fields: fields, fieldNames: fieldNames }, function(err, csv) {
          estateNameCsv= "log_"+ moment(new Date()).format("DD-MM-YYYY");
          datacsv = "data:application/csv;charset=utf-8,"+ encodeURIComponent(csv);

          downloadButton.setAttribute("href", datacsv);
          downloadButton.setAttribute("download", estateNameCsv+".csv");
          downloadButton.setAttribute("target", "_blank");
          downloadButton.click();
        });
      });
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
    let logList = {last_page: 1};
    let log = {};

    if (Object.keys(this.props.logList.data).length) {
      counter = true;
      logList = this.props.logList;
      log = logList.data;
      pagination[0] = this.prevPage(0, (logList.current_page > 1 ? (logList.current_page - 1): false));
      let i = 1;
      if (logList.last_page > logList.max_pagination_links) {
        i = Math.round(logList.max_pagination_links / 2);
        i = i < logList.current_page ? (logList.current_page - 2) : 1;
        i = (logList.last_page >  logList.max_pagination_links) && i > (logList.last_page - logList.max_pagination_links) ? ((logList.last_page - logList.max_pagination_links) + 1) : i;
      }
      let pageLimitCounter = 0;
      for (i; i <= logList.last_page ; i++) {
        if (pageLimitCounter >= logList.max_pagination_links) {
          break;
        }
        pageLimitCounter++;
        pagination[i] = this.pagination(i, logList.current_page);
      }
      pagination[i+1] = this.nextPage(i+1, ((logList.current_page == logList.last_page)|| logList.last_page == 0 ? false : (logList.current_page + 1 )), logList.last_page );
      perPage = logList.per_page;
    }

    return (
      <div className="filter-search">
        <p>Filter / Search</p>
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
              <input className="mdl-textfield__input" type="text" id="ipAddress" ref="ipAddress" />
              <label className="mdl-textfield__label">{tr.t('LABEL.IP_ADDRESS')}</label>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="statusCode" ref="statusCode"/>
              <label className="mdl-textfield__label">{tr.t('LABEL.STATUS_CODE')}</label>
            </div>
          </div>
          <div id="searchLogList" className="mdl-cell mdl-cell--4-col search-cta">
            <button
              className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent"
              onClick={(e) => this.searchList(e)}><i className="material-icons">search</i>{tr.t('BUTTON.SEARCH')}</button>
            <button
              className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised"
              onClick={(e) => this.clearSearch(e)}><i className="material-icons">clear</i>{tr.t('BUTTON.CLEAR')}</button>
            <span
              className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--blue"
              disabled={this.props.logList.data.length <= 0}
              onClick={(e)=> this.download(e)}>{tr.t('LABEL.DOWNLOAD_LOGS')}
            </span>
            <a id="csvDownload"></a>
          </div>
        </div>
        <table className="mdl-data-table mdl-js-data-table table-client-list">
          <thead>
            <tr>
              <th width="200" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.DATE_CREATED')}</th>
              <th width="150" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.IP_ADDRESS')}</th>
              <th width="100" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.METHOD')}</th>
              <th width="110" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.STATUS_CODE')}</th>
              <th width="270" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.URL')}</th>
              <th width="270" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.PARAMETER')}</th>
              <th width="100" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.ACTION')}</th>
            </tr>
          </thead>
          <tbody>
            {counter && log.map(item => {
              alter = alter ? false : true;
              return this.logsDisplay(item, alter); })}
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
  modalClose () {
    let dialog = document.querySelector('dialog');
    dialog.close();
  }
  clearSearch(e) {
    var today = moment(new Date()).format('YYYY-MM-DD');
    e.preventDefault();
    this.refs.ipAddress.value = "";
    this.refs.statusCode.value = "";
    this.refs.date_from.value = "";
    this.refs.date_to.value = "";
    this.setState({
      created_date_from: null,
      created_date_to: null
    });

    let downloadButton = document.getElementById('csvDownload');

    downloadButton.removeAttribute("href");
    downloadButton.removeAttribute("download");
    downloadButton.removeAttribute("target");

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
    let statusCode = '';
    let ipAddress = '';

    if (!clearDate) {
      statusCode = this.refs.statusCode.value;
      dateFrom = (dateFrom ? dateFrom : '');
      dateTo = (dateTo ? dateTo : '');
      ipAddress = this.refs.ipAddress.value;
      pageNum = (pageNum ? pageNum : this.refs.pageNum.value);
      this.setState( {
        created_date_from: dateFrom,
        created_date_to: dateTo,
        statusCode: null
      } );
    } else {
      dateFrom = '';
      dateTo = '';
      pageNum = 10;
      this.setState( {
        created_date_from: null,
        created_date_to: null,
        statusCode: null
      } );
    }

    let payload = {
      client_id: this.props.params.client_id,
      page: 1,
      per_page: pageNum,
      ipaddress: ipAddress,
      status_code: statusCode,
      dateFrom: dateFrom,
      dateTo: dateTo
    };

    this.props.adminLogList(payload);
  }
  page(e, pageNumber) {
    var dateFrom = this.state.created_date_from;
    var dateTo = this.state.created_date_to;
    e.preventDefault();

    let payload = {
      client_id: this.props.params.client_id,
      page: pageNumber,
      per_page: this.refs.pageNum.value,
      ipaddress: this.refs.ipAddress.value,
      status_code: this.refs.statusCode.value,
      dateFrom: (dateFrom ? dateFrom : ''),
      dateTo: (dateTo ? dateTo : '')
    };
    this.props.adminLogList(payload);
  }
};

export default LogList;