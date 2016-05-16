import React from 'react';
import { Link } from 'react-router';

class ClientHeader extends React.Component {

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
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <div className="mdl-layout-spacer"></div>
          <div className="wrapper">
          <nav className="mdl-navigation">
            <div className="container">
              <a id="demo-menu-account"
                className="mdl-button mdl-js-button">Account</a>
              <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo-menu-account">
                <li className="mdl-menu__item"><Link to="/i/client/profile">My Profile</Link></li>
                <li className="mdl-menu__item"><Link to="/i/client/profile/change_password">Change Password</Link></li>
                <li className="mdl-menu__item"><Link to="/i/client/profile/change_email">Change Email Address</Link></li>
              </ul>
            </div>
            <div className="container">
              <button id="demo_menu-lower-right" className="mdl-button mdl-js-button mdl-button--icon" data-upgraded=",MaterialButton">
                <i className="material-icons">person</i>
              </button>
              <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo_menu-lower-right">
                <li className="mdl-menu__item"><Link className="mdl-navigation__link " to ="/i"><i className="material-icons mdl-list__item-icon">settings</i> Settings</Link></li>
                <li className="mdl-menu__item"><a className="mdl-navigation__link " href ="/i/logout"><i className="material-icons mdl-list__item-icon">exit_to_app</i> Logout</a></li>
              </ul>
            </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default ClientHeader;