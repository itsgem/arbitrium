import React from 'react';
import { Link } from 'react-router';
import InvoiceList from 'client/components/invoice/invoiceList';
import {openLoading, closeLoading} from 'common/components/modal';
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount () {
    this.props.clientInvoiceList().catch(createError);
  },
  componentWillReceiveProps(nextProps) {

  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  render() {
    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <div className="page-content">
          <InvoiceList
            listInvoice={this.props.listInvoice}
            clientInvoiceList={this.props.clientInvoiceList}
          />
        </div>
      </main>
    );

    {/*return (
      <section>
        <div className="filter-search">
          <form action="#">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">
                <p>Filter / Search</p>
              </div>
            </div>
            <div className="mdl-grid filter-search-bar">
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                  <input className="mdl-textfield__input font-input" id="terms-of-subscription" value="06/02/2016"/>
                  <label className="mdl-textfield__label" htmlFor="sample1">Invoice Date From...</label>
                </div>
              </div>

              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                  <input className="mdl-textfield__input font-input" id="terms-of-subscription" value="06/02/2016"/>
                  <label className="mdl-textfield__label" htmlFor="sample1">Invoice Date To...</label>
                </div>
              </div>

              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input font-input" id="username"/>
                  <label className="mdl-textfield__label" htmlFor="sample1">Invoice Number...</label>
                </div>
              </div>

              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                  <input className="mdl-textfield__input font-input" id="terms-of-subscription" value="Paid"/>
                  <label className="mdl-textfield__label" htmlFor="sample1">Invoice Status...</label>
                </div>
              </div>

              <div className="mdl-cell mdl-cell--4-col search-cta">
                <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent"><i className="material-icons">search</i>Search</button>
                <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--default"><i className="material-icons">clear</i>Clear</button>
              </div>
            </div>

          </form>

          <table className="mdl-data-table mdl-js-data-table table-list">
            <thead>
              <tr>
                <th className="mdl-data-table__cell--non-numeric">Invoice Date</th>
                <th className="mdl-data-table__cell--non-numeric">Invoice Number</th>
                <th className="mdl-data-table__cell--non-numeric">Invoice Status</th>
                <th className="mdl-data-table__cell--non-numeric">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">23 May 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000001</td>
                <td className="mdl-data-table__cell--non-numeric">Paid</td>
                <td className="mdl-data-table__cell--non-numeric narrow-col">
                 <Link to="/i/invoice/121" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                 </Link>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">12 January 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000002</td>
                <td className="mdl-data-table__cell--non-numeric">Cancelled</td>
                <td className="mdl-data-table__cell--non-numeric">
                 <Link to="/i/invoice/121" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                 </Link>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">09 February 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000003</td>
                <td className="mdl-data-table__cell--non-numeric">Pending</td>
                <td className="mdl-data-table__cell--non-numeric">
                 <Link to="/i/invoice/121" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                 </Link>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">01 March 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000004</td>
                <td className="mdl-data-table__cell--non-numeric">Paid</td>
                <td className="mdl-data-table__cell--non-numeric">
                 <Link to="/i/invoice/121" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                 </Link>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">29 April 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000005</td>
                <td className="mdl-data-table__cell--non-numeric">Cancelled</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <Link to="/i/invoice/121" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">17 July 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000006</td>
                <td className="mdl-data-table__cell--non-numeric">Pending</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <Link to="/i/invoice/121" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">31 August 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000007</td>
                <td className="mdl-data-table__cell--non-numeric">Pending</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <Link to="/i/invoice/121" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">20 September 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000008</td>
                <td className="mdl-data-table__cell--non-numeric">Cancelled</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <Link to="/i/invoice/121" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">07 January 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000009</td>
                <td className="mdl-data-table__cell--non-numeric">Paid</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <Link to="/i/invoice/121" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">19 February 2016</td>
                <td className="mdl-data-table__cell--non-numeric">000000000010</td>
                <td className="mdl-data-table__cell--non-numeric">Pending</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <Link to="/i/invoice/121" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                    <i className="material-icons">open_in_new</i>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mdl-grid pagination">
            <div className="mdl-cell mdl-cell--3-col">

            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">FIRST</button>
              <button disabled className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-disabled">
                <i className="material-icons">keyboard_arrow_left</i>
              </button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-active">1</button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-normal">2</button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-normal">3</button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-normal">4</button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-normal">5</button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-blue">
                <i className="material-icons">keyboard_arrow_right</i>
              </button>
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-blue">LAST</button>
            </div>
            <div className="mdl-cell mdl-cell--3-col">
              <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-paginate-items-per-page">10</button>
            </div>
          </div>
        </div>
      </section>
    );*/}
  }

});