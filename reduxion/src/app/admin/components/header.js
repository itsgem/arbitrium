import React from 'react';
import tr from 'i18next';
import { Link } from 'react-router';
import config from 'config';
import CryptoJS from 'crypto-js';

export default React.createClass( {
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
    if (document.querySelector("select")) {
      let allSelectOpt = document.querySelectorAll("select");
      for (let i = 0; i < allSelectOpt.length; ++i) {
          allSelectOpt[i].addEventListener("change", function(e) {
          e.preventDefault();
          let target = e.target.id + "-opt";
          if (e.target.value) {
            document.getElementById(target).classList.add('is-dirty');
          } else {
            document.getElementById(target).classList.remove('is-dirty');
          }
        }, false);
      }
    }
  },
  componentWillReceiveProps () {
    this.activeNav();
  },
  render() {
    let bytes = '';
    if (localStorage.getItem('coffee') ){
      bytes  = CryptoJS.AES.decrypt(localStorage.getItem('coffee'), config.key);
    }

    let decryptedData ="";
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    let role = decryptedData.role == 1 ? true : false;

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
                <nav className="arb-navigation mdl-navigation">
                  <Link className="menu-dashboard mdl-layout__tab" to="/coffee">{tr.t('ADMIN_HEADER.DASHBOARD')}</Link>
                  <div className="container">
                    <button id="demo-menu-client"
                      className="menu-client mdl-button mdl-js-button mdl-layout__tab" >{tr.t('ADMIN_HEADER.CLIENTS')}</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo-menu-client">
                      <li className="mdl-menu__item"><Link to="/coffee/client/">{tr.t('ADMIN_HEADER.CLIENTS_SUB.LIST')}</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee/client/new">{tr.t('ADMIN_HEADER.CLIENTS_SUB.ADD')}</Link></li>
                    </ul>
                  </div>
                  <div className="container">
                    <button id="demo-menu-api"
                      className="menu-api mdl-button mdl-js-button mdl-layout__tab">{tr.t('ADMIN_HEADER.API_KEYS')}</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        htmlFor="demo-menu-api">
                      <li className="mdl-menu__item"><Link to="/coffee/api/">{tr.t('ADMIN_HEADER.API_KEYS_SUB.LIST')}</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee/api/new/">{tr.t('ADMIN_HEADER.API_KEYS_SUB.ADD')}</Link></li>
                    </ul>
                  </div>
                  <div className="container">
                    <button id="demo-menu-subscription"
                      className="menu-subscription mdl-button mdl-js-button mdl-layout__tab">{tr.t('ADMIN_HEADER.SUBSCRIPTIONS')}</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        htmlFor="demo-menu-subscription">
                      <li className="mdl-menu__item"><Link to="/coffee/subscription/">{tr.t('ADMIN_HEADER.SUBSCRIPTIONS_SUB.LIST')}</Link></li>
                    </ul>
                  </div>
                  <div className="container">
                    <button id="demo-menu-invoice"
                      className="menu-invoice mdl-button mdl-js-button mdl-layout__tab">{tr.t('ADMIN_HEADER.INVOICE')}</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        htmlFor="demo-menu-invoice">
                      <li className="mdl-menu__item"><Link to="/coffee/invoice/">{tr.t('ADMIN_HEADER.INVOICE_SUB.LIST_CLIENT')}</Link></li>
                    </ul>
                  </div>
                  {/*{role && <div className="container">
                    <button id="demo-menu-account"
                      className="menu-account mdl-button mdl-js-button mdl-layout__tab">{tr.t('ADMIN_HEADER.ADMIN_ACCOUNTS')}</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        htmlFor="demo-menu-account">
                      <li className="mdl-menu__item"><Link to="/coffee/account/">{tr.t('ADMIN_HEADER.ADMIN_ACCOUNTS_SUB.LIST')}</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee/account/new/">{tr.t('ADMIN_HEADER.ADMIN_ACCOUNTS_SUB.ADD')}</Link></li>
                    </ul>
                  </div>}*/}
                  <Link className="mdl-layout__tab" to="/coffee">{tr.t('ADMIN_HEADER.REPORTS')}</Link>
                  {/*<div className="container">
                    <button id="demo-menu-logs"
                      className="menu-logs mdl-button mdl-js-button mdl-layout__tab">{tr.t('ADMIN_HEADER.LOGS')}</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        htmlFor="demo-menu-logs">
                      <li className="mdl-menu__item"><Link to="/coffee/logs/">{tr.t('ADMIN_HEADER.LOGS_SUB.LIST_CLIENT_API')}</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee/logs/admin/access-logs">{tr.t('ADMIN_HEADER.LOGS_SUB.ADMIN_ACCESS_LOGS')}</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee/logs/client/access-logs">{tr.t('ADMIN_HEADER.LOGS_SUB.CLIENT_ACCESS_LOGS')}</Link></li>
                    </ul>
                  </div>*/}
                  {/* NEW MENU - SETTINGS */}
                  <div className="container">
                    <button id="demo-menu-settings"
                      className="menu-settings mdl-button mdl-js-button mdl-layout__tab">{tr.t('ADMIN_HEADER.USER_OPTIONS.SETTINGS')}</button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        htmlFor="demo-menu-settings">
                      {role && <li className="mdl-menu__item"><Link to="/coffee/account/">{tr.t('ADMIN_HEADER.ADMIN_ACCOUNTS_SUB.LIST')}</Link></li>}
                      {role && <li className="mdl-menu__item"><Link to="/coffee/account/new/">{tr.t('ADMIN_HEADER.ADMIN_ACCOUNTS_SUB.ADD')}</Link></li>}
                      <li className="mdl-menu__item"><Link to="/coffee/logs/">{tr.t('ADMIN_HEADER.LOGS_SUB.LIST_CLIENT_API')}</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee/logs/admin/access-logs">{tr.t('ADMIN_HEADER.LOGS_SUB.ADMIN_ACCESS_LOGS')}</Link></li>
                      <li className="mdl-menu__item"><Link to="/coffee/logs/client/access-logs">{tr.t('ADMIN_HEADER.LOGS_SUB.CLIENT_ACCESS_LOGS')}</Link></li>
                      <li className="mdl-menu__item"><Link className="logout-text" to ="/coffee/systemsettings">{tr.t('ADMIN_SYSTEM_SETTINGS.TITLE')}</Link></li>
                    </ul>
                  </div>
                </nav>
                <div className="icon-profile inner-profile">
                  <button id="menu" className="mdl-button mdl-js-button mdl-button--icon">
                    <i className="material-icons">account_circle</i>
                  </button>
                  <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="menu">
                    <li className="mdl-menu__item"><Link className="logout-text" to ="/coffee/profile"><i className="material-icons">person</i>{tr.t('ADMIN_HEADER.USER_OPTIONS.PROFILE')}</Link></li>
                    {/*<li className="mdl-menu__item"><Link className="logout-text" to ="/coffee/systemsettings"><i className="material-icons">settings</i>{tr.t('ADMIN_HEADER.USER_OPTIONS.SETTINGS')}</Link></li>*/}
                    <li className="mdl-menu__item"><a className="logout-text" href ="/coffee/logout"><i className="material-icons">exit_to_app</i>{tr.t('ADMIN_HEADER.USER_OPTIONS.LOGOUT')}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="msg">{tr.t('COMMON.MESSAGE.SUCCESS01')}</div>
      </header>
    );
  },
} );
