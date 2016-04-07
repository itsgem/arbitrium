import React, { Component, PropTypes } from 'react'
import Logout from './Logout'
import { logoutUser } from '../actions'

export default class Navbar extends Component {
  render() {
    const { dispatch } = this.props
    
    return (
      <header className="irx-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Reduxion</span>
          <div className="mdl-layout-spacer"></div>
          <div className="irx-navigation-container">
            <nav className="irx-navigation mdl-navigation">
              <a className="mdl-navigation__link" href="">Business</a>
              <Logout appendClass="mdl-navigation__link"
               parent="Navbar"
               onLogoutClick={() => dispatch(logoutUser()) } />
            </nav>
          </div>
        </div>
      </header>
    )
  }

}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired
}