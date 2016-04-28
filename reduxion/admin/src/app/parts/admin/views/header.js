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
                <Link className="mdl-tabs__tab" to="/coffee">Dashboard</Link>
                <Link className="mdl-tabs__tab" to="/coffee/client">Clients</Link>
                <Link className="mdl-tabs__tab" to="/coffee/api">API</Link>
                <Link className="mdl-tabs__tab" to="/coffee/pricing">Pricing</Link>
                <Link className="mdl-tabs__tab" to="/coffee/account">Admin Accounts</Link>
                <Link className="mdl-tabs__tab" to="/coffee/log">Logs</Link>
                <div className="icon-profile">
                  <button id="menu" className="mdl-button mdl-js-button mdl-button--icon">
                    <i className="material-icons">account_circle</i>
                  </button>
                  <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="menu">
                    <li className="mdl-menu__item"><Link className="logout-text" to ="/coffee/setting">Settings</Link></li>
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
