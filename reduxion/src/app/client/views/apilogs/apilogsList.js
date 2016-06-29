import React from 'react';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal'
import ApiLogsList from 'client/components/apiLogs/apilogsList';
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount () {
    // this.props.subscriptionList().catch(createError);
    // this.props.clientSubscription().catch(createError);
    // this.props.clientProfile().catch(createError);
    // this.props.clientSubscriptionPending().catch(createError);
  },
  componentWillMount () {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
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
          <ApiLogsList />
        </div>
        {/*<section>
          <div className="mdl-grid table-list-container">
            <div className="mdl-layout__panel is-active" id="#">
              <div className="filter-search">
                <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--12-col">
                    <p>Filter / Search</p>
                  </div>
                </div>
                <form action="#">
                  <div className="mdl-grid filter-search-bar">
                    <div className="mdl-cell mdl-cell--3-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input font-input" type="text" id="username"/>
                        <label className="mdl-textfield__label">Username...</label>
                      </div>
                    </div>

                    <div className="mdl-cell mdl-cell--3-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" id="status-code"/>
                        <label className="mdl-textfield__label">Status Code...</label>
                      </div>
                    </div>

                    <div className="mdl-cell mdl-cell--2-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" id="date-created"/>
                        <label className="mdl-textfield__label">Date created...</label>
                      </div>
                    </div>

                    <div className="mdl-cell mdl-cell--4-col search-cta">
                      <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent"><i className="material-icons">search</i>Search</button>
                      <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--default"><i className="material-icons">clear</i>Clear</button>
                      <Link to="/i/apilogs/222" className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--blue">
                        Download Logs
                      </Link>
                    </div>
                  </div>

                </form>

                <table className="mdl-data-table mdl-js-data-table table-list">
                  <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">Username</th>
                      <th className="mdl-data-table__cell--non-numeric">User ID</th>
                      <th className="mdl-data-table__cell--non-numeric">IP Address</th>
                      <th className="mdl-data-table__cell--non-numeric">Status Code</th>
                      <th className="mdl-data-table__cell--non-numeric">URL</th>
                      <th className="mdl-data-table__cell--non-numeric">Parameter</th>
                      <th className="mdl-data-table__cell--non-numeric">Date Created</th>
                      <th className="mdl-data-table__cell--non-numeric">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">juandelacruz1</td>
                      <td className="mdl-data-table__cell--non-numeric">001</td>
                      <td className="mdl-data-table__cell--non-numeric">192.168.1.1</td>
                      <td className="mdl-data-table__cell--non-numeric">200</td>
                      <td className="mdl-data-table__cell--non-numeric">http://www.testinggrounds.com/api</td>
                      <td className="mdl-data-table__cell--non-numeric">test</td>
                      <td className="mdl-data-table__cell--non-numeric">October 31, 2016 7:45 AM</td>
                      <td className="mdl-data-table__cell--non-numeric api-col-action">
                       <Link to="/i/apilogs/001" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">johndoe2</td>
                      <td className="mdl-data-table__cell--non-numeric">002</td>
                      <td className="mdl-data-table__cell--non-numeric">192.168.1.2</td>
                      <td className="mdl-data-table__cell--non-numeric">500</td>
                      <td className="mdl-data-table__cell--non-numeric">http://www.loremipsumgroup.com/test</td>
                      <td className="mdl-data-table__cell--non-numeric">test</td>
                      <td className="mdl-data-table__cell--non-numeric">October 31, 2016 7:45 AM</td>
                      <td className="mdl-data-table__cell--non-numeric">
                       <Link to="/i/apilogs/002" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">maryjane3</td>
                      <td className="mdl-data-table__cell--non-numeric">003</td>
                      <td className="mdl-data-table__cell--non-numeric">192.168.1.3</td>
                      <td className="mdl-data-table__cell--non-numeric">401</td>
                      <td className="mdl-data-table__cell--non-numeric">http://www.thisisatest.com/logs</td>
                      <td className="mdl-data-table__cell--non-numeric">test</td>
                      <td className="mdl-data-table__cell--non-numeric">October 31, 2016 7:45 AM</td>
                      <td className="mdl-data-table__cell--non-numeric">
                       <Link to="/i/apilogs/003" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">sergei4</td>
                      <td className="mdl-data-table__cell--non-numeric">004</td>
                      <td className="mdl-data-table__cell--non-numeric">192.168.1.4</td>
                      <td className="mdl-data-table__cell--non-numeric">401</td>
                      <td className="mdl-data-table__cell--non-numeric">http://www.lorem.com/api</td>
                      <td className="mdl-data-table__cell--non-numeric">test</td>
                      <td className="mdl-data-table__cell--non-numeric">October 31, 2016 7:45 AM</td>
                      <td className="mdl-data-table__cell--non-numeric">
                       <Link to="/i/apilogs/003" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">andymckee5</td>
                      <td className="mdl-data-table__cell--non-numeric">005</td>
                      <td className="mdl-data-table__cell--non-numeric">192.168.1.5</td>
                      <td className="mdl-data-table__cell--non-numeric">500</td>
                      <td className="mdl-data-table__cell--non-numeric">http://www.apitest.com/logs</td>
                      <td className="mdl-data-table__cell--non-numeric">test</td>
                      <td className="mdl-data-table__cell--non-numeric">October 31, 2016 7:45 AM</td>
                      <td className="mdl-data-table__cell--non-numeric">
                       <Link to="/i/apilogs/004" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">kingstonlee6</td>
                      <td className="mdl-data-table__cell--non-numeric">006</td>
                      <td className="mdl-data-table__cell--non-numeric">192.168.1.6</td>
                      <td className="mdl-data-table__cell--non-numeric">200</td>
                      <td className="mdl-data-table__cell--non-numeric">http://www.testingapi.com/test</td>
                      <td className="mdl-data-table__cell--non-numeric"></td>
                      <td className="mdl-data-table__cell--non-numeric">October 31, 2016 7:45 AM</td>
                      <td className="mdl-data-table__cell--non-numeric">
                       <Link to="/i/apilogs/005" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">orion7</td>
                      <td className="mdl-data-table__cell--non-numeric">007</td>
                      <td className="mdl-data-table__cell--non-numeric">192.168.1.7</td>
                      <td className="mdl-data-table__cell--non-numeric">400</td>
                      <td className="mdl-data-table__cell--non-numeric">http://www.loremlogs.com/api</td>
                      <td className="mdl-data-table__cell--non-numeric">test</td>
                      <td className="mdl-data-table__cell--non-numeric">October 31, 2016 7:45 AM</td>
                      <td className="mdl-data-table__cell--non-numeric">
                       <Link to="/i/apilogs/006" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">paulamarie8</td>
                      <td className="mdl-data-table__cell--non-numeric">008</td>
                      <td className="mdl-data-table__cell--non-numeric">192.168.1.8</td>
                      <td className="mdl-data-table__cell--non-numeric">400</td>
                      <td className="mdl-data-table__cell--non-numeric">http://www.loremipsumapitests.com/logs</td>
                      <td className="mdl-data-table__cell--non-numeric">test</td>
                      <td className="mdl-data-table__cell--non-numeric">October 31, 2016 7:45 AM</td>
                      <td className="mdl-data-table__cell--non-numeric">
                       <Link to="/i/apilogs/007" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">williamson9</td>
                      <td className="mdl-data-table__cell--non-numeric">009</td>
                      <td className="mdl-data-table__cell--non-numeric">192.168.1.9</td>
                      <td className="mdl-data-table__cell--non-numeric">200</td>
                      <td className="mdl-data-table__cell--non-numeric">http://www.apitestlogs.com/test</td>
                      <td className="mdl-data-table__cell--non-numeric">test</td>
                      <td className="mdl-data-table__cell--non-numeric">October 31, 2016 7:45 AM</td>
                      <td className="mdl-data-table__cell--non-numeric">
                       <Link to="/i/apilogs/008" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="mdl-data-table__cell--non-numeric">vandread10</td>
                      <td className="mdl-data-table__cell--non-numeric">002</td>
                      <td className="mdl-data-table__cell--non-numeric">192.168.1.10</td>
                      <td className="mdl-data-table__cell--non-numeric">500</td>
                      <td className="mdl-data-table__cell--non-numeric">http://www.testing.com/test</td>
                      <td className="mdl-data-table__cell--non-numeric">test</td>
                      <td className="mdl-data-table__cell--non-numeric">October 31, 2016 7:45 AM</td>
                      <td className="mdl-data-table__cell--non-numeric">
                       <Link to="/i/apilogs/009" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
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

            </div>
          </div>
        </section>*/}
      </main>
    );
  }
});