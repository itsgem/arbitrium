import React from 'react';
import tr from 'i18next';
import { Link } from 'react-router';
import json2csv from 'json2csv';
import moment from 'moment';

class AdminApiCallsReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer: null,
      date_from: null,
      date_to: null
    };
  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  adminApiCallsDisplay (data, alter) {
    return (
      <tr key={data.created} className={alter ? "bg-dark" : "bg-light"}>
        <td className="mdl-data-table__cell--non-numeric">{data.created}</td>
        <td className="mdl-data-table__cell--non-numeric text-center">{data.total}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.count_success}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.count_error}</td>
        <td className="mdl-data-table__cell--non-numeric">
          <Link
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit"
          to={"/coffee/reports/" + data.created}><i className="material-icons">open_in_new</i></Link>
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
  componentDidMount() {
    let isState = this;
    $( document ).ready(function() {
      $('#date_from .datepicker').datepicker({
          format: 'yyyy-mm-dd',
          endDate: moment(new Date()).format('YYYY-MM-DD'),
          autoclose: true,
          todayHighlight: true
      });
      $('#date_to .datepicker').datepicker({
          format: 'yyyy-mm-dd',
          endDate: moment(new Date()).format('YYYY-MM-DD'),
          autoclose: true,
          todayHighlight: true
      });
    });
    this.updateDatepicker(isState);
  }
  updateDatepicker(isState) {
    $('#date_from .datepicker').change(function(){
      isState.setState({date_from: $(this).val()});
      document.getElementById('date_from').classList.add('is-dirty');

      if (isState.state.date_from > isState.state.date_to) {
        $('#date_to .datepicker').datepicker('update', moment(isState.state.date_from).toDate());
      }

      $('#date_to .datepicker').datepicker('setStartDate', moment(isState.state.date_from).toDate());
      $('#date_to .datepicker').datepicker('setEndDate', moment(new Date()).format('YYYY-MM-DD'));
      if (!isState.state.date_to) {
        document.getElementById('date_to').classList.remove('is-dirty');
      }
    });
    $('#date_to .datepicker').change(function(){
      isState.setState({date_to: $(this).val()});
      document.getElementById('date_to').classList.add('is-dirty');
    });
  }
  download(e) {
    let thisEvent = this;
    let downloadButton = document.getElementById('csvDownload');

    if (this.props.adminApiCallsList.data.length <= 0) {
      e.preventDefault();
    } else {
      let payload = {
        per_page: this.props.adminApiCallsList.total,
        dateFrom: this.refs.date_from.value,
        dateTo: this.refs.date_to.value
      };
      this.props.adminApiCallsReportDownload(payload).then(function() {
        let fields = ['created', 'total', 'count_success', 'count_error'];
        var fieldNames = ['Date Created', 'Total', 'No. of Success', 'No. of Failure'];
        let estateNameCsv = '';
        let datacsv = '';

        json2csv({ data: thisEvent.props.adminApiCallsDownload.data, fields: fields, fieldNames: fieldNames }, function(err, csv) {
          estateNameCsv= "reports_"+ moment(new Date()).format("DD-MM-YYYY");
          datacsv = "data:application/csv;charset=utf-8,"+ encodeURIComponent(csv);

          downloadButton.setAttribute("href", datacsv);
          downloadButton.setAttribute("download", estateNameCsv+".csv");
          downloadButton.setAttribute("target", "_blank");
          downloadButton.click();
        });
      });
    }
  }
  render() {
    let counter = false;
    let alter = false;
    let pagination = [];
    let perPage = 10;
    let adminApiCallsList = {last_page: 1};
    let log = {};

    if (Object.keys(this.props.adminApiCallsList).length) {
      counter = true;
      adminApiCallsList = this.props.adminApiCallsList;
      log = adminApiCallsList.data;
      pagination[0] = this.prevPage(0, (adminApiCallsList.current_page > 1 ? (adminApiCallsList.current_page - 1): false));
      let i = 1;
      if (adminApiCallsList.last_page > adminApiCallsList.max_pagination_links) {
        i = Math.round(adminApiCallsList.max_pagination_links / 2);
        i = i < adminApiCallsList.current_page ? (adminApiCallsList.current_page - 2) : 1;
        i = (adminApiCallsList.last_page >  adminApiCallsList.max_pagination_links) && i > (adminApiCallsList.last_page - adminApiCallsList.max_pagination_links) ? ((adminApiCallsList.last_page - adminApiCallsList.max_pagination_links) + 1) : i;
      }
      let pageLimitCounter = 0;
      for (i; i <= adminApiCallsList.last_page ; i++) {
        if (pageLimitCounter >= adminApiCallsList.max_pagination_links) {
          break;
        }
        pageLimitCounter++;
        pagination[i] = this.pagination(i, adminApiCallsList.current_page);
      }
      pagination[i+1] = this.nextPage(i+1, ((adminApiCallsList.current_page == adminApiCallsList.last_page)|| adminApiCallsList.last_page == 0 ? false : (adminApiCallsList.current_page + 1 )), adminApiCallsList.last_page );
      perPage = adminApiCallsList.per_page;
    }
    return (
      <div className="filter-search">
        <p>{tr.t('LABEL.FILTER_SEARCH')}</p>
        <div className="mdl-grid filter-search-bar">
          <div className="mdl-cell mdl-cell--2-col">
            <div id="date_from" className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
              <input
                type="text"
                className="datepicker mdl-textfield__input"
                id="date_from" ref="date_from"
                readOnly
              />
              <label className="mdl-textfield__label">{tr.t('LABEL.DATE_FROM')}</label>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div id="date_to" className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
              <input
                type="text"
                className="datepicker mdl-textfield__input"
                id="date_to" ref="date_to"
                readOnly
              />
              <label className="mdl-textfield__label">{tr.t('LABEL.DATE_TO')}</label>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--8-col search-cta">
            <button
              className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent"
              onClick={(e) => this.searchList(e)}><i className="material-icons">search</i>{tr.t('BUTTON.SEARCH')}</button>
            <button
              className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised"
              onClick={(e) => this.clearSearch(e)}><i className="material-icons">clear</i>{tr.t('BUTTON.CLEAR')}</button>
            <span
              className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--blue"
              disabled={this.props.adminApiCallsList.data.length <= 0}
              onClick={(e)=> this.download(e)}>{tr.t('LABEL.DOWNLOAD_REPORTS')}
            </span>
            <a id="csvDownload"></a>
          </div>
        </div>
        <table className="mdl-data-table mdl-js-data-table table-client-list">
          <thead>
            <tr>
              <th width="300" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.DATE')}</th>
              <th width="270" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.TOTAL_API_CALLS')}</th>
              <th width="240" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.NUM_SUCCESS')}</th>
              <th width="240" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.NUM_FAILURE')}</th>
              <th width="150" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.ACTION')}</th>
            </tr>
          </thead>
          <tbody>
            {counter && log.map(item => {
              alter = alter ? false : true;
              return this.adminApiCallsDisplay(item, alter); })}
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
    this.refs.date_from.value = "";
    this.refs.date_to.value = "";
    this.setState({
      date_from: null,
      date_to: null
    });

    let downloadButton = document.getElementById('csvDownload');

    downloadButton.removeAttribute("href");
    downloadButton.removeAttribute("download");
    downloadButton.removeAttribute("target");

    $('#date_from .datepicker').datepicker('setDate', null);
    $('#date_from .datepicker').datepicker('setEndDate', today);

    $('#date_to .datepicker').datepicker('setDate', null);
    $('#date_to .datepicker').datepicker('setStartDate', null);
    $('#date_to .datepicker').datepicker('setEndDate', today);

    for (let item of document.querySelectorAll('.is-dirty')) {
      item.classList.remove('is-dirty');
    }

    this.searchList(e, 10, true);
  }
  searchList(e, pageNum = null, clearDate = false) {
    var dateFrom = this.state.date_from;
    var dateTo = this.state.date_to;
    e.preventDefault();

    if (!clearDate) {
      dateFrom = (dateFrom ? dateFrom : '');
      dateTo = (dateTo ? dateTo : '');
      pageNum = (pageNum ? pageNum : this.refs.pageNum.value);
      this.setState( {
        date_from: dateFrom,
        date_to: dateTo
      } );
    } else {
      dateFrom = '';
      dateTo = '';
      pageNum = 10;
      this.setState( {
        date_from: null,
        date_to: null
      } );
    }

    let payload = {
      page: 1,
      per_page: pageNum,
      dateFrom: dateFrom,
      dateTo: dateTo
    };

    this.props.adminApiCallsReport(payload);
  }
  page(e, pageNumber) {
    var dateFrom = this.state.date_from;
    var dateTo = this.state.date_to;
    e.preventDefault();

    let payload = {
      page: pageNumber,
      per_page: this.refs.pageNum.value,
      dateFrom: (dateFrom ? dateFrom : ''),
      dateTo: (dateTo ? dateTo : '')
    };
    this.props.adminApiCallsReport(payload);
  }
};

export default AdminApiCallsReport;