import React from 'react';
import { Link } from 'react-router';
import tr from 'i18next';

class ClientSidebar extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    $('#side-client, .client .submenu').hover(function(){
      $(".client .submenu").stop().slideDown(200);
    }, function(){
      $(".client .submenu").stop().slideUp(200);
    });
  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  activeNav () {
    let isActive = document.querySelector('.sideNav .is-active');
    if (isActive) {
      isActive.classList.remove('is-active');
    }
    let link = window.location.href.split("/");
    let menu = (link[4] == undefined ? '#side-home' : '#side-' + link[4]);
    let isActiveMenu = document.querySelector(menu);
    if (isActiveMenu) {
      isActiveMenu.classList.add("is-active");
    }
  }
  render() {
    this.activeNav();
    return (
      <div className="arbitrium-drawer mdl-layout__drawer">
        <header className="arbitrium-drawer-header">
          <img src="https://s3.amazonaws.com/assets.idearobin.com/arbitrium/logo-arbitrium.png" className="demo-avatar" width="120"/>
        </header>
        <nav className="sideNav arbitrium-navigation mdl-navigation">
          <Link id="side-home" className="mdl-navigation__link" to="/i"><i className="material-icons" role="presentation">home</i>{tr.t('CLIENT_SIDEBAR.DASHBOARD')}</Link>

          <div className="menu-hover">
            <a id="side-client" className="mdl-navigation__link full-width" to="/i/client/profile"><i className="material-icons" role="presentation">person</i>{tr.t('CLIENT_SIDEBAR.PROFILE')}</a>
              <ul className="submenu">
                <li><a href="">My Profile</a></li>
                <li><a href="">Change Password</a></li>
                <li><a href="">Change Email Address</a></li>
              </ul>
          </div>
          <Link id="side-api" className="mdl-navigation__link" to="/i/api"><i className="material-icons" role="presentation">group_work</i>{tr.t('CLIENT_SIDEBAR.API_KEYS')}</Link>
          <Link id="side-subscription" className="mdl-navigation__link" to="/i/subscription"><i className="material-icons" role="presentation">redeem</i>{tr.t('CLIENT_SIDEBAR.SUBSCRIPTION')}</Link>
          <Link id="side-invoice" className="mdl-navigation__link" to="/i/invoice"><i className="material-icons" role="presentation">description</i>{tr.t('CLIENT_SIDEBAR.INVOICE')}</Link>
          <Link id="side-reports" className="mdl-navigation__link" to="/i/reports"><i className="material-icons" role="presentation">burst_mode</i>{tr.t('CLIENT_SIDEBAR.REPORTS')}</Link>
          <Link id="side-apilogs" className="mdl-navigation__link" to="/i/apilogs"><i className="material-icons" role="presentation">dvr</i>{tr.t('CLIENT_SIDEBAR.API_LOGS')}</Link>
          {/*<Link className="mdl-navigation__link" to="/i/systemsettings"><i className="material-icons" role="presentation">settings</i>System Settings</Link>*/}
          <a className="mdl-navigation__link" href="/i/logout"><i className="material-icons" role="presentation">exit_to_app</i>{tr.t('CLIENT_SIDEBAR.LOGOUT')}</a>
        </nav>
      </div>
    );
  }
}

export default ClientSidebar;
