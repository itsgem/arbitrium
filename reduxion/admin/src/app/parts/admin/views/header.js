import React from 'react';
import { Link } from 'react-router';

export default React.createClass( {
  render() {
    return (
      <header className="mdl-layout__header header-bg">
        <div className="mdl-grid header-container">
          <div className="mdl-layout__header-row main-header">
            <div className="logo">
              <Link to="/coffee">
                <img src="https://s3.amazonaws.com/assets.idearobin.com/arbitrium/logo-arbitrium.png"></img>
              </Link>
            </div>
            <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect nav">
              <div className="mdl-tabs__tab-bar tab">
                <nav className="mdl-navigation">
                  <Link className="mdl-layout__tab" to="/coffee">Dashboard</Link>
                  <div className="container">
                    <button id="demo-menu-client"
                      className="mdl-button mdl-js-button">Clients</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo-menu-client">
                      <li className="mdl-menu__item"><a href="/coffee/client/">Client List</a></li>
                      <li className="mdl-menu__item"><a href="/coffee/client/new">Add New Client</a></li>
                    </ul>
                  </div>
                  <div className="container">
                    <button id="demo-menu-api"
                      className="mdl-button mdl-js-button">API</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        htmlFor="demo-menu-api">
                      <li className="mdl-menu__item"><a href="/coffee/api/">API List</a></li>
                      <li className="mdl-menu__item"><a href="/coffee/api/new/">Add New API</a></li>
                    </ul>
                  </div>
                  <Link className="mdl-layout__tab" to="/coffee">Pricing</Link>
                  <div className="container">
                    <button id="demo-menu-account"
                      className="mdl-button mdl-js-button">Admin Accounts</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        htmlFor="demo-menu-account">
                      <li className="mdl-menu__item"><a href="/coffee/account/">Admin List</a></li>
                      <li className="mdl-menu__item"><a href="/coffee/account/new/">Add New Administrator</a></li>
                    </ul>
                  </div>
                  <a className="mdl-layout__tab" href="/coffee">Logs</a>
                </nav>
                <div className="icon-profile inner-profile">
                  <button id="menu" className="mdl-button mdl-js-button mdl-button--icon">
                    <i className="material-icons">account_circle</i>
                  </button>
                  <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="menu">
                    <li className="mdl-menu__item"><a className="logout-text" href ="/coffee"><i className="material-icons">settings</i>Settings</a></li>
                    <li className="mdl-menu__item"><a className="logout-text" href ="/coffee/logout"><i className="material-icons">exit_to_app</i>Logout</a></li>
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
