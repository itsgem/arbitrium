import React from 'react';
import DocTitle from 'components/docTitle';

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
                <a href="#dashboard" className="mdl-tabs__tab is-active">DASHBOARD</a>
                <a href="#clients" className="mdl-tabs__tab">CLIENTS</a>
                <a href="#api" className="mdl-tabs__tab">API</a>
                <a href="#pricing" className="mdl-tabs__tab">PRICING</a>
                <a href="#admin-accounts" className="mdl-tabs__tab">ADMIN ACCOUNTS</a>
                <a href="#logs" className="mdl-tabs__tab">LOGS</a>
                <div className="icon-profile">
                  <button id="menu" className="mdl-button mdl-js-button mdl-button--icon">
                    <i className="material-icons">account_circle</i>
                  </button>
                  <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="menu">
                    <li className="mdl-menu__item">Settings</li>
                    <li className="mdl-menu__item">Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

} );
