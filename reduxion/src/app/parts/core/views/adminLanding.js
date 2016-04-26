import React from 'react';
import { Link } from 'react-router';

class AdminLanding extends React.Component{
  constructor(props, context) {
      super(props);
      this.props = props;
      this.context = context;
  }

  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  componentWillMount() {
    if (!localStorage.getItem('token')){
      this.context.router.push(`/coffee/login`);
    }
  }

  render() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header body-bg">

        <header className="mdl-layout__header header-bg">
          <div className="mdl-grid header-container">

            <div className="mdl-layout__header-row main-header">
              {/*<!-- LOGO -->*/}
              <div className="logo">
                <img src="../assets/img/logo-arbitrium.png"></img>
              </div>
            {/*  <!-- NAVIGATION -->*/}
              <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect nav">
                <div className="mdl-tabs__tab-bar tab">
                    <a href="#dashboard" className="mdl-tabs__tab is-active">DASHBOARD</a>
                    <a href="#clients" className="mdl-tabs__tab">CLIENTS</a>
                    <a href="#api" className="mdl-tabs__tab">API</a>
                    <a href="#pricing" className="mdl-tabs__tab">PRICING</a>
                    <a href="#admin-accounts" className="mdl-tabs__tab">ADMIN ACCOUNTS</a>
                    <a href="#logs" className="mdl-tabs__tab">LOGS</a>

                    <div className="icon-profile">
                     {/* <!-- Right aligned menu below button -->*/}
                      <button id="menu" className="mdl-button mdl-js-button mdl-button--icon">
                        <i className="material-icons">account_circle</i>
                      </button>

                      <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="menu">
                        <li className="mdl-menu__item">Settings</li>
                        <li className="mdl-menu__item"><Link className="logout-text" to ="/coffee/logout">Logout</Link></li>
                      </ul>

                    </div>

                </div>
              </div>

            </div>

          </div>
        </header>

        <main className="mdl-layout__content mdl-js-layout">
          <div className="mdl-grid client-list">

            <div className="mdl-layout__tab-bar mdl-js-ripple-effect client-tab">
              <a href="#" className="mdl-layout__tab is-active">Client List</a>
              <a href="#" className="mdl-layout__tab">Add New Client<i className="material-icons add">add</i></a>
            </div>

            <div className="mdl-layout__panel is-active" id="#">
              <div className="filter-search">
                <p>Filter / Search</p>
               {/* <!-- Textfield with Floating Label -->*/}
                <form action="#">

                  <div className="mdl-grid filter-search-bar">
                    <div className="mdl-cell mdl-cell--3-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input font-input" type="text" id="company"/>
                        <label className="mdl-textfield__label" htmlFor="sample1">Company...</label>
                      </div>
                    </div>

                    <div className="mdl-cell mdl-cell--3-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" id="email-address"/>
                        <label className="mdl-textfield__label" htmlFor="sample2">Email Address...</label>
                      </div>
                    </div>

                    <div className="mdl-cell mdl-cell--2-col">
                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" id="status"/>
                        <label className="mdl-textfield__label" htmlFor="sample3">Status...</label>
                      </div>
                    </div>

                    <div className="mdl-cell mdl-cell--4-col search-cta">
                      <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent"><i className="material-icons">search</i>Search</button>
                      <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised"><i className="material-icons">clear</i>Clear</button>
                    </div>
                  </div>

                </form>
               {/* <!-- Client List Table -->*/}
                <table className="mdl-data-table mdl-js-data-table table-client-list">
                  <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">ID</th>
                      <th className="mdl-data-table__cell--non-numeric">Company Name</th>
                      <th className="mdl-data-table__cell--non-numeric">Representative Name</th>
                      <th className="mdl-data-table__cell--non-numeric">Email Address</th>
                      <th className="mdl-data-table__cell--non-numeric">Telephone No.</th>
                      <th className="mdl-data-table__cell--non-numeric">Mobile No.</th>
                      <th className="mdl-data-table__cell--non-numeric">Status</th>
                      <th className="mdl-data-table__cell--non-numeric">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-dark">
                      <td className="mdl-data-table__cell--non-numeric">1</td>
                      <td className="mdl-data-table__cell--non-numeric">Nerubia Inc</td>
                      <td className="mdl-data-table__cell--non-numeric">Rep Last Name, Rep First Name</td>
                      <td className="mdl-data-table__cell--non-numeric">client@isurvey.com</td>
                      <td className="mdl-data-table__cell--non-numeric">456 78901</td>
                      <td className="mdl-data-table__cell--non-numeric">80 45678</td>
                      <td className="mdl-data-table__cell--non-numeric">Approved</td>
                      <td className="mdl-data-table__cell--non-numeric">
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </button>
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-light">
                      <td className="mdl-data-table__cell--non-numeric">3</td>
                      <td className="mdl-data-table__cell--non-numeric">Nerubia Inc</td>
                      <td className="mdl-data-table__cell--non-numeric">Echiverri, Gerard Rey</td>
                      <td className="mdl-data-table__cell--non-numeric">info@idearobin.com</td>
                      <td className="mdl-data-table__cell--non-numeric">63 3223127</td>
                      <td className="mdl-data-table__cell--non-numeric">63 9989678</td>
                      <td className="mdl-data-table__cell--non-numeric">Approved</td>
                      <td className="mdl-data-table__cell--non-numeric">
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </button>
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-dark">
                      <td className="mdl-data-table__cell--non-numeric">5</td>
                      <td className="mdl-data-table__cell--non-numeric">Kosh Consulting Group</td>
                      <td className="mdl-data-table__cell--non-numeric">Leow, Hsueh Huah</td>
                      <td className="mdl-data-table__cell--non-numeric">gerard.echiverri@gmail.com</td>
                      <td className="mdl-data-table__cell--non-numeric">65 67362480</td>
                      <td className="mdl-data-table__cell--non-numeric">65 91268850</td>
                      <td className="mdl-data-table__cell--non-numeric">Approved</td>
                      <td className="mdl-data-table__cell--non-numeric">
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </button>
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-light">
                      <td className="mdl-data-table__cell--non-numeric">7</td>
                      <td className="mdl-data-table__cell--non-numeric">Gem Company</td>
                      <td className="mdl-data-table__cell--non-numeric">Rep Last Name, Rep First Name</td>
                      <td className="mdl-data-table__cell--non-numeric">gem-client@nerubia.com.ph</td>
                      <td className="mdl-data-table__cell--non-numeric">63 123456789</td>
                      <td className="mdl-data-table__cell--non-numeric">63 1234567890</td>
                      <td className="mdl-data-table__cell--non-numeric">Approved</td>
                      <td className="mdl-data-table__cell--non-numeric">
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </button>
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-dark">
                      <td className="mdl-data-table__cell--non-numeric">9</td>
                      <td className="mdl-data-table__cell--non-numeric">Gem Manpower Consulting, Inc.</td>
                      <td className="mdl-data-table__cell--non-numeric">Rebojo, Gemmalyn Anne</td>
                      <td className="mdl-data-table__cell--non-numeric">g6-test001@nerubia.com</td>
                      <td className="mdl-data-table__cell--non-numeric">998 9678700</td>
                      <td className="mdl-data-table__cell--non-numeric">998 9678700</td>
                      <td className="mdl-data-table__cell--non-numeric">Approved</td>
                      <td className="mdl-data-table__cell--non-numeric">
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </button>
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-light">
                      <td className="mdl-data-table__cell--non-numeric">11</td>
                      <td className="mdl-data-table__cell--non-numeric">Starbucks</td>
                      <td className="mdl-data-table__cell--non-numeric">Echiverri, Joshua Gabriel</td>
                      <td className="mdl-data-table__cell--non-numeric">g6-test003@nerubia.com</td>
                      <td className="mdl-data-table__cell--non-numeric">63 324155097</td>
                      <td className="mdl-data-table__cell--non-numeric">63 9989678731</td>
                      <td className="mdl-data-table__cell--non-numeric">Approved</td>
                      <td className="mdl-data-table__cell--non-numeric">
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </button>
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-dark">
                      <td className="mdl-data-table__cell--non-numeric">13</td>
                      <td className="mdl-data-table__cell--non-numeric">Gem Company</td>
                      <td className="mdl-data-table__cell--non-numeric">Rep Last Name, Rep First Name</td>
                      <td className="mdl-data-table__cell--non-numeric">gem1@nerubia.com</td>
                      <td className="mdl-data-table__cell--non-numeric">999 9999999</td>
                      <td className="mdl-data-table__cell--non-numeric">999 9999999</td>
                      <td className="mdl-data-table__cell--non-numeric">Approved</td>
                      <td className="mdl-data-table__cell--non-numeric">
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </button>
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-light">
                      <td className="mdl-data-table__cell--non-numeric">15</td>
                      <td className="mdl-data-table__cell--non-numeric">Sheila</td>
                      <td className="mdl-data-table__cell--non-numeric">Ramas, Sheila</td>
                      <td className="mdl-data-table__cell--non-numeric">sheila@nerubia.com</td>
                      <td className="mdl-data-table__cell--non-numeric">000 0000</td>
                      <td className="mdl-data-table__cell--non-numeric">043 0000</td>
                      <td className="mdl-data-table__cell--non-numeric">Approved</td>
                      <td className="mdl-data-table__cell--non-numeric">
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </button>
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-dark">
                      <td className="mdl-data-table__cell--non-numeric">17</td>
                      <td className="mdl-data-table__cell--non-numeric">Registered Client Company</td>
                      <td className="mdl-data-table__cell--non-numeric">Rep Last Name, Rep First Name</td>
                      <td className="mdl-data-table__cell--non-numeric">gem@nerubia.com</td>
                      <td className="mdl-data-table__cell--non-numeric">63 3223127</td>
                      <td className="mdl-data-table__cell--non-numeric">63 9989678</td>
                      <td className="mdl-data-table__cell--non-numeric">Approved</td>
                      <td className="mdl-data-table__cell--non-numeric">
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </button>
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-light">
                      <td className="mdl-data-table__cell--non-numeric">19</td>
                      <td className="mdl-data-table__cell--non-numeric">Nerubia Inc</td>
                      <td className="mdl-data-table__cell--non-numeric">Echiverri, Gerard Rey</td>
                      <td className="mdl-data-table__cell--non-numeric">info@idearobin.com</td>
                      <td className="mdl-data-table__cell--non-numeric">63 3223127</td>
                      <td className="mdl-data-table__cell--non-numeric">63 9989678</td>
                      <td className="mdl-data-table__cell--non-numeric">Approved</td>
                      <td className="mdl-data-table__cell--non-numeric">
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-view-edit">
                          <i className="material-icons">open_in_new</i>
                        </button>
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-button--colored btn-delete">
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
               {/* <!-- Pagination -->*/}
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
        </main>
      </div>
    );
  }
}

AdminLanding.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default AdminLanding;
