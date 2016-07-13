import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { Link } from 'react-router';
import json2csv from 'json2csv';
import moment from 'moment';

class LogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer: null,
      created: null
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
        <td className="mdl-data-table__cell--non-numeric">{data.ipaddress}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.status_code}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.url}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.parameter}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.created}</td>
        <td className="mdl-data-table__cell--non-numeric">
          <Link
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit"
          to={"/coffee/logs/client/" + data.client.id + "/log-detail/" + data.id}><i className="material-icons">open_in_new</i></Link>
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
  download(e) {
    if (this.props.logList.data.length <= 0) {
      e.preventDefault();
    }
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

    let isState = this ;
    $('.datepicker').change(function(){
      isState.setState({created: $(this).val()});
      document.getElementById('createdDate').classList.add('is-dirty');
    });
  }
  render() {
    let counter = false;
    let alter = false;
    let pagination = [];
    let perPage = 10;
    let logList = {last_page: 1};
    let log = {};
    let fields = ['ipaddress', 'status_code', 'url', 'parameter', 'created'];
    let estateNameCsv = '';
    let datacsv = '';

    if (Object.keys(this.props.logList.data).length) {
      json2csv({ data: this.props.logList.data, fields: fields }, function(err, csv) {
        estateNameCsv= "log_"+ moment(new Date()).format("DD-MM-YYYY");
        datacsv = "data:application/csv;charset=utf-8,"+ encodeURIComponent(csv);
      });

      let i=0;
      counter = true;
      logList = this.props.logList;
      log = logList.data;
      pagination[i] = this.prevPage(i, (logList.current_page > 1 ? (logList.current_page - 1): false));
      for (i = 1; i <= logList.last_page; i++) {
        pagination[i] = this.pagination(i, logList.current_page);
      }
      pagination[i+1] = this.nextPage(i+1, ((logList.current_page == logList.last_page)|| logList.last_page == 0 ? false : (logList.current_page + 1 )), logList.last_page );
      perPage = logList.per_page;
    }

    return (
      <div className="filter-search">
        <p>Filter / Search</p>
        <div className="mdl-grid filter-search-bar">
          <div className="mdl-cell mdl-cell--3-col">
            <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="ipAddress" ref="ipAddress" />
              <label className="mdl-textfield__label">IP Address</label>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="statusCode" ref="statusCode"/>
              <label className="mdl-textfield__label">Status Code</label>
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
              <label className="mdl-textfield__label">Date Created</label>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--5-col search-cta">
            <button
              className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent"
              onClick={(e) => this.searchList(e)}><i className="material-icons">search</i>Search</button>
            <button
              className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised"
              onClick={(e) => this.clearSearch(e)}><i className="material-icons">clear</i>Clear</button>
            <a className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--blue" disabled={this.props.logList.data.length <= 0} href={datacsv} onClick={(e)=> this.download(e)} target="_blank" download={estateNameCsv + ".csv"}>Download Logs</a>
          </div>
        </div>
        <table className="mdl-data-table mdl-js-data-table table-client-list">
          <thead>
            <tr>
              <th width="200" className="mdl-data-table__cell--non-numeric">IP Address</th>
              <th width="100" className="mdl-data-table__cell--non-numeric">Status Code</th>
              <th width="300" className="mdl-data-table__cell--non-numeric">URL</th>
              <th width="300" className="mdl-data-table__cell--non-numeric">Parameter</th>
              <th width="200" className="mdl-data-table__cell--non-numeric">Date Created</th>
              <th width="100" className="mdl-data-table__cell--non-numeric">Action</th>
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

    let currentPage = this.refs.currentpage.value;
    this.page(e, currentPage);
  }
  modalClose () {
    let dialog = document.querySelector('dialog');
    dialog.close();
  }
  clearSearch(e) {
    e.preventDefault();
    this.refs.ipAddress.value = "";
    this.refs.statusCode.value = "";
    this.refs.created_at.value = "";
    this.setState({
      created: null
    });

    $('.datepicker').datepicker('setDate', null);

    for (let item of document.querySelectorAll('.is-dirty')) {
      item.classList.remove('is-dirty');
    }

    this.searchList(e, 10, true);
  }
  searchList(e, pageNum = null, clearDate = false) {
    e.preventDefault();
    let createDate = this.state.created;
    let statusCode = '';
    let ipAddress = '';
    if (!clearDate) {
      statusCode = this.refs.statusCode.value;
      createDate = (createDate ? createDate : '');
      ipAddress = this.refs.ipAddress.value;
      pageNum = (pageNum ? pageNum : this.refs.pageNum.value);
      this.setState( {
        created: createDate,
        statusCode: null
      } );
    } else {
      createDate = '';
      pageNum = 10;
      this.setState( {
        created: null,
        statusCode: null
      } );
    }

    let payload = {
      client_id: this.props.params.client_id,
      page: 1,
      per_page: pageNum,
      ipAddress: ipAddress,
      status_code: statusCode,
      created: createDate,
    };

    this.props.adminLogList(payload);
  }
  page(e, pageNumber) {
    var createDate = this.state.created;
    e.preventDefault();

    let payload = {
      client_id: this.props.params.client_id,
      page: pageNumber,
      per_page: this.refs.pageNum.value,
      ipaddress: this.refs.ipAddress.value,
      status_code: this.refs.statusCode.value,
      created: (createDate ? createDate : '')
    };
    this.props.adminLogList(payload);
  }
};

export default LogList;