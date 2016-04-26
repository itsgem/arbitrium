import React from 'react';
import { Link } from 'react-router';

class ClientLanding extends React.Component{
  constructor(props) {
      super(props);
      this.props = props;
  }

  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  render() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <div className="mdl-layout-spacer"></div>
            <div className="wrapper">
              <button id="demo_menu-lower-right" className="mdl-button mdl-js-button mdl-button--icon" data-upgraded=",MaterialButton">
                <i className="material-icons">person</i>
              </button>
              <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo_menu-lower-right">
                <li className="mdl-menu__item"><i className="material-icons mdl-list__item-icon">settings</i> Settings</li>
                <li className="mdl-menu__item"><Link className="mdl-navigation__link " to ="/i/client/profile"><i className="material-icons mdl-list__item-icon">person</i> Profile</Link></li>
                <li className="mdl-menu__item"><Link className="mdl-navigation__link " to ="/i/logout"><i className="material-icons mdl-list__item-icon">exit_to_app</i> Logout</Link></li>
              </ul>
            </div>
          </div>
        </header>
          <div className="arbitrium-drawer mdl-layout__drawer">
          <span className="mdl-layout-title">Title</span>
          <nav className="arbitrium-navigation mdl-navigation">
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Inbox</a>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</a>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</a>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Forums</a>
            <div className="mdl-layout-spacer"></div>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span className="visuallyhidden">Help</span></a>
          </nav>
          </div>
        <main className="mdl-layout__content">
          <h1>Client Dashboard</h1>
        </main>
      </div>
    );
  }
}

export default ClientLanding;