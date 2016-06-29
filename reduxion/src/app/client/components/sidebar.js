import React from 'react';
import { Link } from 'react-router';

class ClientSidebar extends React.Component {

  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
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
          <Link id="side-home" className="mdl-navigation__link" to="/i"><i className="material-icons" role="presentation">home</i>Dashboard</Link>
          <Link id="side-client" className="mdl-navigation__link" to="/i/client/profile"><i className="material-icons" role="presentation">person</i>My Profile</Link>
          <Link id="side-api" className="mdl-navigation__link" to="/i/api"><i className="material-icons" role="presentation">group_work</i>Api Keys</Link>
          <Link id="side-subscription" className="mdl-navigation__link" to="/i/subscription"><i className="material-icons" role="presentation">redeem</i>My Subscription</Link>
          <Link id="side-invoice" className="mdl-navigation__link" to="/i/invoice"><i className="material-icons" role="presentation">description</i>Invoice</Link>
          <Link id="side-apilogs" className="mdl-navigation__link" to="/i/apilogs"><i className="material-icons" role="presentation">dvr</i>API Logs</Link>
          {/*<Link className="mdl-navigation__link" to="/i/systemsettings"><i className="material-icons" role="presentation">settings</i>System Settings</Link>*/}
          <div className="mdl-layout-spacer"></div>
          <a className="mdl-navigation__link" href="/i/logout"><i className="material-icons" role="presentation">exit_to_app</i>Logout</a>
        </nav>
      </div>
    );
  }
}

export default ClientSidebar;
