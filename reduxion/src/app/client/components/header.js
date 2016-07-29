import React from 'react';
import { Link } from 'react-router';
import tr from 'i18next';

class ClientHeader extends React.Component {

  constructor(props) {
    super(props);
  }
  componentWillReceiveProps() {
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
            {/*<div className="container">
              <a id="demo-menu-account"
                className="mdl-button mdl-js-button">{tr.t('CLIENT_HEADER.LABEL.ACCOUNT')}</a>
              <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo-menu-account">
                <li className="mdl-menu__item"><Link to ="/i/client/profile">{tr.t('CLIENT_HEADER.MY_PROFILE')}</Link></li>
                <li className="mdl-menu__item"><Link to="/i/client/profile/change_password">{tr.t('CLIENT_HEADER.CHANGE_PW')}</Link></li>
                <li className="mdl-menu__item"><Link to="/i/client/profile/change_email">{tr.t('CLIENT_HEADER.CHANGE_EMAIL_ADD')}</Link></li>
              </ul>
            </div>*/}
            <div className="container">
              <button id="demo_menu-lower-right" className="mdl-button mdl-js-button" data-upgraded=",MaterialButton">
                <Link to="/i/client/profile"><i className="material-icons" role="presentation">person</i>{tr.t('CLIENT_SIDEBAR.MY_PROFILE')}</Link>
              </button>
            </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default ClientHeader;
