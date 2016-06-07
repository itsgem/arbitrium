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
  render() {
    return (
      <div className="arbitrium-drawer mdl-layout__drawer">
        <header className="arbitrium-drawer-header">
          <img src="https://s3.amazonaws.com/assets.idearobin.com/arbitrium/logo-arbitrium.png" className="demo-avatar" width="120"/>
        </header>
        <nav className="arbitrium-navigation mdl-navigation">
          <Link className="mdl-navigation__link" to="/i"><i className="material-icons" role="presentation">home</i>Dashboard</Link>
          <Link className="mdl-navigation__link" to="/i/client/profile"><i className="material-icons" role="presentation">person</i>My Profile</Link>
          <Link className="mdl-navigation__link" to="/i/api"><i className="material-icons" role="presentation">group_work</i>Api Keys</Link>
          <Link className="mdl-navigation__link" to="/i/subscription"><i className="material-icons" role="presentation">redeem</i>My Subscription</Link>
          <Link className="mdl-navigation__link" to="/i/invoice"><i className="material-icons" role="presentation">description</i>Invoice</Link>
          <Link className="mdl-navigation__link" to="/i/apilogs"><i className="material-icons" role="presentation">dvr</i>API Logs</Link>
          <div className="mdl-layout-spacer"></div>
          <Link className="mdl-navigation__link" to="/i/logout"><i className="material-icons" role="presentation">exit_to_app</i>Logout</Link>
        </nav>
      </div>
    );
  }
}

export default ClientSidebar;
