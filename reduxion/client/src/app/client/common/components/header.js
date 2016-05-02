import React from 'react';
import { Link } from 'react-router';

class ClientHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    if ( typeof(window.componentHandler) != 'undefined' )
    {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  componentWillReceiveProps(nextProps) {
  }

  // --- Render

  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <div className="mdl-layout-spacer"></div>
          <div className="wrapper">
          <nav className="mdl-navigation">
            <div className="container">
              <button id="demo-menu-account"
                className="mdl-button mdl-js-button">Account</button>
              <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo-menu-account">
                <li className="mdl-menu__item"><Link to="/i/client/profile">Profile</Link></li>
                <li className="mdl-menu__item"><Link to="/i/client/profile/change_password">Password</Link></li>
                <li className="mdl-menu__item"><Link to="/i/client/profile/change_email">Email Address</Link></li>
              </ul>
            </div>
            <button id="demo_menu-lower-right" className="mdl-button mdl-js-button mdl-button--icon" data-upgraded=",MaterialButton">
              <i className="material-icons">person</i>
            </button>
            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo_menu-lower-right">
              <li className="mdl-menu__item"><a className="mdl-navigation__link " href ="/i"><i className="material-icons mdl-list__item-icon">settings</i> Settings</a></li>
              <li className="mdl-menu__item"><a className="mdl-navigation__link " href ="/i/logout"><i className="material-icons mdl-list__item-icon">exit_to_app</i> Logout</a></li>
            </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default ClientHeader;