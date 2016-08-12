import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import tr from 'i18next';
import { Link } from 'react-router';
import json2csv from 'json2csv';
import moment from 'moment';

class ClientApiCallsReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer: null
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
        <td className="mdl-data-table__cell--non-numeric">{data.client.company_name}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.status_code}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.description}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.method}</td>
        <td className="mdl-data-table__cell--non-numeric">
          <Link
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit"
          to={"/coffee/reports/" + moment(data.created_at).format('YYYY-MM-DD') + "/client/" + data.id}><i className="material-icons">open_in_new</i></Link>
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
    if (this.props.clientApiCallsList.data.length <= 0) {
      e.preventDefault();
    }
  }
  render() {
    let counter = false;
    let alter = false;
    let pagination = [];
    let perPage = 10;
    let clientApiCallsList = {last_page: 1};
    let log = {};
    let fields = ['created_at', 'client.company_name', 'status_code', 'description', 'method'];
    let fieldNames = ['Date Created', 'Company Name', 'Status Code', 'Status Description', 'Method'];
    let estateNameCsv = '';
    let datacsv = '';

    if (Object.keys(this.props.clientApiCallsList.data).length) {
      let reportData = this.props.clientApiCallsList.data;
      for (let index in reportData) {
        switch (reportData[index].status_code) {
          case 200 :
            reportData[index].description = tr.t('LABEL.STATUS_200');
            break;
          case 204 :
            reportData[index].description = tr.t('LABEL.STATUS_204');
            break;
          case 400 :
            reportData[index].description = tr.t('LABEL.STATUS_400');
            break;
          case 401 :
            reportData[index].description = tr.t('LABEL.STATUS_401');
            break;
          case 403 :
            reportData[index].description = tr.t('LABEL.STATUS_403');
            break;
          case 404 :
            reportData[index].description = tr.t('LABEL.STATUS_404');
            break;
          default :
            reportData[index].description = tr.t('LABEL.STATUS_500');
        }
      }
      json2csv({ data: reportData, fields: fields, fieldNames: fieldNames }, function(err, csv) {
        estateNameCsv= "detailed_report_"+ moment(new Date()).format("DD-MM-YYYY");
        datacsv = "data:application/csv;charset=utf-8,"+ encodeURIComponent(csv);
      });

      counter = true;
      clientApiCallsList = this.props.clientApiCallsList;
      log = clientApiCallsList.data;
      pagination[0] = this.prevPage(0, (clientApiCallsList.current_page > 1 ? (clientApiCallsList.current_page - 1): false));
      let i = 1;
      if (clientApiCallsList.last_page > clientApiCallsList.max_pagination_links) {
        i = Math.round(clientApiCallsList.max_pagination_links / 2);
        i = i < clientApiCallsList.current_page ? (clientApiCallsList.current_page - 2) : 1;
        i = (clientApiCallsList.last_page >  clientApiCallsList.max_pagination_links) && i > (clientApiCallsList.last_page - clientApiCallsList.max_pagination_links) ? ((clientApiCallsList.last_page - clientApiCallsList.max_pagination_links) + 1) : i;
      }
      let pageLimitCounter = 0;
      for (i; i <= clientApiCallsList.last_page ; i++) {
        if (pageLimitCounter >= clientApiCallsList.max_pagination_links) {
          break;
        }
        pageLimitCounter++;
        pagination[i] = this.pagination(i, clientApiCallsList.current_page);
      }
      pagination[i+1] = this.nextPage(i+1, ((clientApiCallsList.current_page == clientApiCallsList.last_page)|| clientApiCallsList.last_page == 0 ? false : (clientApiCallsList.current_page + 1 )), clientApiCallsList.last_page );
      perPage = clientApiCallsList.per_page;
    }

    return (
      <div className="filter-search">
        <p>Filter / Search</p>
        <div className="mdl-grid filter-search-bar">
          <div className="mdl-cell mdl-cell--3-col">
            <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="companyName" ref="companyName" />
              <label className="mdl-textfield__label">{tr.t('LABEL.COMPANY_NAME')}</label>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="statusCode" ref="statusCode"/>
              <label className="mdl-textfield__label">{tr.t('LABEL.STATUS_CODE')}</label>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="method" ref="method"/>
              <label className="mdl-textfield__label">{tr.t('LABEL.METHOD')}</label>
            </div>
          </div>
          <div id="searchLogList" className="mdl-cell mdl-cell--5-col search-cta">
            <button
              className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent"
              onClick={(e) => this.searchList(e)}><i className="material-icons">search</i>{tr.t('BUTTON.SEARCH')}</button>
            <button
              className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised"
              onClick={(e) => this.clearSearch(e)}><i className="material-icons">clear</i>{tr.t('BUTTON.CLEAR')}</button>
            <a
              className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--blue"
              disabled={this.props.clientApiCallsList.data.length <= 0}
              href={datacsv}
              onClick={(e)=> this.download(e)}
              target="_blank"
              download={estateNameCsv + ".csv"}>{tr.t('LABEL.DOWNLOAD_REPORTS')}
            </a>
          </div>
        </div>
        <table className="mdl-data-table mdl-js-data-table table-client-list">
          <thead>
            <tr>
              <th width="200" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.DATE_CREATED')}</th>
              <th width="350" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.COMPANY_NAME')}</th>
              <th width="200" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.STATUS_CODE')}</th>
              <th width="200" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.STATUS_DESC')}</th>
              <th width="100" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.METHOD')}</th>
              <th width="150" className="mdl-data-table__cell--non-numeric">{tr.t('LABEL.ACTION')}</th>
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
    e.preventDefault();
    this.refs.companyName.value = "";
    this.refs.statusCode.value = "";
    this.refs.method.value = "";

    for (let item of document.querySelectorAll('.is-dirty')) {
      item.classList.remove('is-dirty');
    }

    this.searchList(e, 10);
  }
  searchList(e, pageNum = null) {
    e.preventDefault();
    let payload = {
      date: this.props.params.created,
      per_page: pageNum ? pageNum : this.refs.pageNum.value,
      company_name: this.refs.companyName.value,
      status_code: this.refs.statusCode.value,
      method: this.refs.method.value
    };

    this.props.clientApiCallsReport(payload);
  }
  page(e, pageNumber) {
    e.preventDefault();

    let payload = {
      date: this.props.params.created,
      page: pageNumber,
      per_page: this.refs.pageNum.value,
      company_name: this.refs.companyName.value,
      status_code: this.refs.statusCode.value,
      method: this.refs.method.value
    };
    this.props.clientApiCallsReport(payload);
  }
};

export default ClientApiCallsReport;