
import React, { Component, PropTypes } from 'react'
import Logout from './Logout'
import { logoutUser } from '../actions'

export default class Drawer extends Component {
  render() {
    const { dispatch } = this.props
    
    return (
        <div className="mdl-layout__drawer">
          <header className="drawer-header">
            <div className="avatar-dropdown">
              <span>hello@example.com</span>
              <div className="mdl-layout-spacer"></div>
              <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                <i className="ion ion-ios-arrow-down" role="presentation"></i>
                <span className="visuallyhidden">Accounts</span>
              </button>
              <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="accbtn">
                <li className="mdl-menu__item">hello@example.com</li>
                <li className="mdl-menu__item">info@example.com</li>
                <li className="mdl-menu__item"><i className="ion ion-plus-round"></i>Add another account...</li>
              </ul>
            </div>
          </header>
          <nav className="irx-navigation mdl-navigation">
            <a className="mdl-navigation__link" href=""><i className="ion ion-ios-home" role="presentation"></i> Home</a>
            <a className="mdl-navigation__link" href=""><i className="ion ion-ios-email" role="presentation"></i> Inbox</a>
            <a className="mdl-navigation__link" href=""><i className="ion ion-ios-trash" role="presentation"></i> Trash</a>
            <a className="mdl-navigation__link" href=""><i className="ion ion-alert-circled" role="presentation"></i> Spam</a>
            <a className="mdl-navigation__link" href=""><i className="ion ion-card" role="presentation"></i> Purchases</a>
            <a className="mdl-navigation__link" href=""><i className="ion ion-ios-people" role="presentation"></i> Social</a>
            <Logout appendClass="mdl-navigation__link" icon="ion ion-log-out" onLogoutClick={() => dispatch(logoutUser())} />
            <div className="mdl-layout-spacer"></div>
            <a className="mdl-navigation__link" href=""><span>Help</span></a>
          </nav>
        </div>
    )
  }

}

Drawer.propTypes = {
  dispatch: PropTypes.func.isRequired
}
    