import React from 'react';
import { Link } from 'react-router';

class ClientSidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    if ( typeof(window.componentHandler) != 'undefined' )
    {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  // --- Render

  render() {
    return (
      <div className="arbitrium-drawer mdl-layout__drawer">
        <header className="arbitrium-drawer-header">
          <img src="https://s3.amazonaws.com/assets.idearobin.com/arbitrium/logo-arbitrium.png" className="demo-avatar" width="120"/>
        </header>
        <nav className="arbitrium-navigation mdl-navigation">
          <a className="mdl-navigation__link" href="/i"><i className="material-icons" role="presentation">home</i>Dashboard</a>
          <a className="mdl-navigation__link" href="/i/client/profile"><i className="material-icons" role="presentation">person</i>My Profile</a>
          <a className="mdl-navigation__link" href="/i"><i className="material-icons" role="presentation">group_work</i>Api Keys</a>
          <div className="mdl-layout-spacer"></div>
          <a className="mdl-navigation__link" href="/i/logout"><i className="material-icons" role="presentation">exit_to_app</i>Logout</a>
        </nav>
      </div>
    );
  }
}

export default ClientSidebar;
