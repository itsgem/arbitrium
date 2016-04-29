import React from 'react';
import { Link } from 'react-router';

export default React.createClass( {
  render() {
    return (
      <header className="mdl-layout__header header-bg">
        <div className="mdl-grid header-container">
          <div className="mdl-layout__header-row main-header">
            <div className="logo">
              <img src="https://s3.amazonaws.com/assets.idearobin.com/arbitrium/logo-arbitrium.png"></img>
            </div>
            <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect nav">
              <div className="mdl-tabs__tab-bar tab">
                <nav className="mdl-navigation">
                  <Link className="mdl-layout__tab" to="/coffee">Dashboard</Link>
                  <div className="container">
                    <button id="demo-menu-client"
                      className="mdl-button mdl-js-button">Clients</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo-menu-client">
                      <li className="mdl-menu__item"><Link to="/coffee/client/">Client List</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee/client/new">Add New Clien</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee">Invoices</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee">Survey Management</Link></li>
                    </ul>
                  </div>
                  <Link className="mdl-layout__tab" to="/coffee">API</Link>
                  <Link className="mdl-layout__tab" to="/coffee">Pricing</Link>
                  <div className="container">
                    <button id="demo-menu-account"
                      className="mdl-button mdl-js-button">Admin Accounts</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        htmlFor="demo-menu-account">
                      <li className="mdl-menu__item"><Link to="/coffee/account/">Admin List</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee/account/new/">Add New Administrator</Link></li>
                    </ul>
                  </div>
                  <Link className="mdl-layout__tab" to="/coffee">Logs</Link>
                </nav>
                <div className="icon-profile">
                  <button id="menu" className="mdl-button mdl-js-button mdl-button--icon">
                    <i className="material-icons">account_circle</i>
                  </button>
                  <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="menu">
                    <li className="mdl-menu__item"><Link className="logout-text" to ="/coffee">Settings</Link></li>
                    <li className="mdl-menu__item"><Link className="logout-text" to ="/coffee/logout">Logout</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="msg">Success message</div>
      </header>
    );
  }

} );
