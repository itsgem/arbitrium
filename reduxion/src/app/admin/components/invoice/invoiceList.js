import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { Link } from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class AdminInvoiceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer: null,
      invoiced_date_from: null,
      invoiced_date_to: null
    };
  }
  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  invoiceListDisplay (data, alter) {
    return (
      <tr key={data.id} className={alter ? "bg-dark" : "bg-light"}>
        <td className="mdl-data-table__cell--non-numeric">{data.invoiced_at}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.invoice_no}</td>
        <td className="mdl-data-table__cell--non-numeric">{data.status}</td>
        <td className="mdl-data-table__cell--non-numeric">
          <Link
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit"
          to={"/coffee/invoice/client/" + data.client_id + "/invoice-detail/" + data.id }><i className="material-icons">open_in_new</i></Link>
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
    let invoiceList = {last_page: 1};
    let log = {};
    if (Object.keys(this.props.invoiceList).length) {
      let i=0;
      counter = true;
      invoiceList = this.props.invoiceList;
      log = invoiceList.data;
      pagination[i] = this.prevPage(i, (invoiceList.current_page > 1 ? (invoiceList.current_page - 1): false));
      for (i = 1; i <= invoiceList.last_page; i++) {
        pagination[i] = this.pagination(i, invoiceList.current_page);
      }
      pagination[i+1] = this.nextPage(i+1, ((invoiceList.current_page == invoiceList.last_page)|| invoiceList.last_page == 0 ? false : (invoiceList.current_page + 1 )), invoiceList.last_page );
      perPage = invoiceList.per_page;
    }
    return (
      <div className="filter-search">
        <p>Filter / Search</p>
        <div className="mdl-grid filter-search-bar">
          <div className="mdl-cell mdl-cell--2-col">
            <div id="invoiced_date_from" className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
              <DatePicker
                selected={this.state.invoiced_date_from}
                dateFormat="YYYY-MM-DD"
                onChange={(e) => this.selectedDate(e, 'invoiced_date_from')}
                className="mdl-textfield__input font-input" id="date_from" readOnly/>
              <label className="mdl-textfield__label">Invoice Date From</label>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div id="invoiced_date_to" className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
              <DatePicker
                selected={this.state.invoiced_date_to == null || (this.state.invoiced_date_from < this.state.invoiced_date_to) ? this.state.invoiced_date_to : this.state.invoiced_date_from}
                dateFormat="YYYY-MM-DD"
                minDate={this.state.invoiced_date_from ? this.state.invoiced_date_from : moment()}
                onChange={(e) => this.selectedDate(e, 'invoiced_date_to')}
                className="mdl-textfield__input font-input" id="date_to" readOnly/>
              <label className="mdl-textfield__label" htmlFor="date_to">Invoice Date To</label>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div className="mdl-textfield mdl-block mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="invoice_no" ref="invoice_no" />
              <label className="mdl-textfield__label">Invoice Number</label>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <div id="status-opt" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
              <div className="mdl-selectfield">
                <select
                  className="mdl-textfield__input"
                  id="status"
                  ref="status">
                  <option value=""></option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Paid">Paid</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <label className="mdl-textfield__label" htmlFor="status">Invoice Status</label>
              </div>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--4-col search-cta">
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
              <th width="400" className="mdl-data-table__cell--non-numeric">Invoice Date</th>
              <th width="400" className="mdl-data-table__cell--non-numeric">Invoice Number</th>
              <th width="300" className="mdl-data-table__cell--non-numeric">Invoice Status</th>
              <th width="200" className="mdl-data-table__cell--non-numeric">Action</th>
            </tr>
          </thead>
          <tbody>
            {counter && log.map(item => {
              alter = alter ? false : true;
              return this.invoiceListDisplay(item, alter); })}
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
    );
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

    let currentPage = this.refs.currentpage.value;
    this.page(e, currentPage);
  }
  modalClose () {
    let dialog = document.querySelector('dialog');
    dialog.close();
  }
  clearSearch(e) {
    e.preventDefault();
    this.refs.invoice_no.value = "";
    this.refs.status.value = "";

    document.getElementById('date_from').value = '';
    document.getElementById('date_to').value = '';
    this.setState({
      invoiced_date_from: null,
      invoiced_date_to: null
    });

    for (let item of document.querySelectorAll('.is-dirty')) {
      item.classList.remove('is-dirty');
    }

    this.searchList(e);
  }
  searchList(e) {
    e.preventDefault();
    let payload = {
      date_from: document.getElementById('date_from').value,
      date_to: document.getElementById('date_to').value,
      invoice_no: this.refs.invoice_no.value,
      status: this.refs.status.value,
      id: this.props.params.client_id
    };
    this.props.adminInvoiceList(payload);
  }
  page(e, pageNumber) {
    e.preventDefault();
    let payload = {
      page: pageNumber,
      per_page: this.refs.pageNum.value,
      date_from: document.getElementById('date_from').value,
      date_to: document.getElementById('date_to').value,
      invoice_no: this.refs.invoice_no.value,
      status: this.refs.status.value,
      id: this.props.params.client_id
    };
    this.props.adminInvoiceList(payload);
  }
};

export default AdminInvoiceList;