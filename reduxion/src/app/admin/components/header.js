import React from 'react';
import { Link } from 'react-router';

export default React.createClass( {
  componentWillReceiveProps(nextProps) {
    this.activeNav();
  },
  activeNav () {
    let isActive = document.querySelector('nav .is-active');
    if (isActive) {
      isActive.classList.remove('is-active');
    }
    let link = window.location.href.split("/");
    let menu = (link[4] == undefined ? '.menu-dashboard' : '.menu-' + link[4]);
    let isActiveMenu = document.querySelector(menu);
    if (isActiveMenu) {
      isActiveMenu.classList.add("is-active");
    }
  },
  componentDidMount () {
    this.activeNav();
  },
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
                  <Link className="menu-dashboard mdl-layout__tab" to="/coffee">Dashboard</Link>
                  <div className="container">
                    <button id="demo-menu-client"
                      className="menu-client mdl-button mdl-js-button mdl-layout__tab" >Clients</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo-menu-client">
                      <li className="mdl-menu__item"><Link to="/coffee/client/">Client List</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee/client/new">Add New Client</Link></li>
                    </ul>
                  </div>
                  <div className="container">
                    <button id="demo-menu-api"
                      className="menu-api mdl-button mdl-js-button mdl-layout__tab">API</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        htmlFor="demo-menu-api">
                      <li className="mdl-menu__item"><Link to="/coffee/api/">API List</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee/api/new/">Add New API</Link></li>
                    </ul>
                  </div>
                  <div className="container">
                    <button id="demo-menu-subscription"
                      className="mdl-button mdl-js-button">Subscriptions</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        htmlFor="demo-menu-subscription">
                      <li className="mdl-menu__item"><Link to="/coffee/subscription/">Subscriptions List</Link></li>
                    </ul>
                  </div>
                  <div className="container">
                    <button id="demo-menu-account"
                      className="menu-account mdl-button mdl-js-button mdl-layout__tab">Admin Accounts</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        htmlFor="demo-menu-account">
                      <li className="mdl-menu__item"><Link to="/coffee/account/">Admin List</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee/account/new/">Add New Administrator</Link></li>
                    </ul>
                  </div>
                  <Link className="menu-logs mdl-layout__tab" to="/coffee">Logs</Link>
                </nav>
                <div className="icon-profile inner-profile">
                  <button id="menu" className="mdl-button mdl-js-button mdl-button--icon">
                    <i className="material-icons">account_circle</i>
                  </button>
                  <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="menu">
                    <li className="mdl-menu__item"><Link className="logout-text" to ="/coffee"><i className="material-icons">settings</i>Settings</Link></li>
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
  },
} );
