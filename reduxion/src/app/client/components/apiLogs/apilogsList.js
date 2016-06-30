import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { Link } from 'react-router';
import {modal, openModal, closeModal} from 'common/components/modal'
import {createError} from 'utils/error';
import Datetime from 'react-datetime';
import moment from 'moment';
import json2csv from 'json2csv';

class apilogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      id: null,
      page: 1,
      perPage: 10,
      statusCode: null,
      dateFrom: null,
      status: null,
      created: null
    };  }
  componentWillReceiveProps(nextProps) {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
    modal();
  }
  componentDidMount() {
    if (document.querySelector("select")) {
      let allSelectOpt = document.querySelectorAll("select");
      for (let i = 0; i < allSelectOpt.length; ++i) {
          allSelectOpt[i].addEventListener("change", function(e) {
          e.preventDefault();
          let target = e.target.id + "-opt";
          if (e.target.value) {
            document.getElementById(target).classList.add('is-dirty');
          } else {
            document.getElementById(target).classList.remove('is-dirty');
          }
        }, false);
      }
    }

    if ( document.querySelector('.rdt input')) {
      document.querySelector('.rdt input').classList.add('mdl-textfield__input');
      document.querySelector('.rdt input').readOnly = true;
    }
  }
  apilogDisplay (data, alter) {
    return (
      <tr key={data.id} className={alter ? "bg-dark" : "bg-light"}>
        <td className="mdl-data-table__cell--non-numeric">{data.ipaddress}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.method}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.status_code}</td>
        <td className="mdl-data-table__cell--non-numeric"><p className="hidden-text">{data.url}</p></td>
        <td className="mdl-data-table__cell--non-numeric"><p className="hidden-text">{data.parameter}</p></td>
        <td className="mdl-data-table__cell--non-numeric">{data.created}</td>
        <td className="mdl-data-table__cell--non-numeric">
          <Link
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit"
          to={"/i/apilogs/" + data.id}><i className="material-icons">open_in_new</i></Link>
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
  selectedDate(e, selectedDate) {
    this.setState({
      dateFrom: e
    });
    document.getElementById(selectedDate).classList.add('is-dirty');
  }

  render() {
    let counter = false;
    let alter = false;
    let pagination = [];
    let perPage = 10;
    let listApiLogs = {last_page: 1};
    let apiLogsData = {};
    let fields = ['ipaddress', 'statusCode', 'url', 'parameter', 'created'];
    let estateNameCsv ='';
    let datacsv ='';
    let csvString ='';
    if (Object.keys(this.props.successApiLogsList).length) {

      json2csv({ data: this.props.successApiLogsList.data, fields: fields }, function(err, csv) {
        // estateNameCsv= "log_"+ moment(new Date()).format("DD-MM-YYYY");
        // datacsv = "data:application/csv;charset=utf-8,"+ encodeURIComponent(csv);;
        csvString = csv;
      });

      let i=0;
      counter = true;
      listApiLogs = this.props.successApiLogsList;
      // listApiLogs = mongoDB;
      apiLogsData = listApiLogs.data;
      pagination[i] = this.prevPage(i, (listApiLogs.current_page > 1 ? (listApiLogs.current_page - 1): false));
      for (i = 1; i <= listApiLogs.last_page; i++) {
        pagination[i] = this.pagination(i, listApiLogs.current_page);
      }
      pagination[i+1] = this.nextPage(i+1, ((listApiLogs.current_page == listApiLogs.last_page)|| listApiLogs.last_page == 0 ? false : (listApiLogs.current_page + 1 )), listApiLogs.last_page );
      perPage = listApiLogs.per_page;
    }

    return (
      <div className="filter-search">
        <div className="mdl-grid mdl-grid--no-spacing table-list-container">
          <div className="mdl-cell mdl-cell--12-col header-title"><p>Invoice List</p></div>
          <div className="mdl-grid filter-search-bar">
              <div className="mdl-cell mdl-cell--3-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input font-input" id="statusCode" ref="statusCode"/>
                  <label className="mdl-textfield__label" htmlFor="statusCode">Status Code</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div id="createdDate" className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
                  <Datetime
                    id="created_at"
                    value={this.state.dateFrom}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                    onChange={(e)=> this.selectedDate(e, 'createdDate')}
                    closeOnSelect={true}
                  />
                  <label className="mdl-textfield__label">Date Created</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--6-col margin-top-20 text-right">
                <button
                  className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent margin-right-10"
                  onClick={(e) => this.searchList(e)}><i className="material-icons">search</i>Search</button>
                <button
                  className="margin-right-10 mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised"
                  onClick={(e) => this.clearSearch(e)}><i className="material-icons">clear</i>Clear</button>
                <a className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--blue" href={datacsv} target="_blank" download={estateNameCsv+".csv"}>Download Logs</a>
              </div>
            </div>
          <table width="100%" className="mdl-data-table mdl-js-data-table table-client-list">
            <thead>
              <tr>
                <th className="mdl-data-table__cell--non-numeric">IP Address</th>
                <th className="mdl-data-table__cell--non-numeric">Method</th>
                <th className="mdl-data-table__cell--non-numeric">Status Code</th>
                <th className="mdl-data-table__cell--non-numeric">URL</th>
                <th className="mdl-data-table__cell--non-numeric">Parameter</th>
                <th className="mdl-data-table__cell--non-numeric">Date Created</th>
                <th className="mdl-data-table__cell--non-numeric">Action</th>
              </tr>
            </thead>
            <tbody>
              {counter && apiLogsData.map(item => {
                alter = alter ? false : true;
                return this.apilogDisplay(item, alter); })}
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
    this.refs.statusCode.value = "";
    for (let item of document.querySelectorAll('.is-dirty')) {
      item.classList.remove('is-dirty');
    }
    this.searchList(e, true);
  }

  searchList(e, clearDate = false) {
    e.preventDefault();
    let dateFrom = this.state.dateFrom;
    let statusCode = '';
    let pageNum = '';
    if (!clearDate) {
      statusCode = this.refs.statusCode.value;
      dateFrom = (dateFrom ? dateFrom.format('YYYY-MM-DD') : '');
      pageNum = (pageNum ? pageNum : this.refs.pageNum.value);
      this.setState( {
        page: 1,
        perPage: 10,
        created: dateFrom,
        statusCode: null
      } );
    } else {
      statusCode = ''
      dateFrom = ''
      pageNum = 10;
      this.setState( {
        page: 1,
        perPage: 10,
        dateFrom: null,
        created: null,
        statusCode: null
      } );
    }

    let payload = {
      page: 1,
      per_page: pageNum,
      statusCode: statusCode,
      created: dateFrom,
    };
    this.props.clientApiLogsList(payload).catch(createError);
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
  page(e, pageNumber) {
    e.preventDefault();
    let payload = {
      page: pageNumber,
      per_page: this.refs.pageNum.value,
      statusCode: this.state.statusCode,
      created: this.state.created
    };

    this.props.clientApiLogsList(payload).catch(createError);
  }
};

export default apilogList;