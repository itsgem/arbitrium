import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Logout from '../components/Logout';
import Navbar from '../components/Navbar';
import Drawer from '../components/Drawer';
import { logoutUser } from '../actions';

class DashboardPage extends Component {
  componentDidMount() {
    if (typeof(window.componentHandler) != 'undefined')
    {
      window.componentHandler.upgradeDom();
    }
  }

  handleLogout() {

  }

  render() {
    const { dispatch, isAuthenticated, errorMessage, isValid } = this.props
    let view = this.props.location.pathname.substr(1).split('/').join(' comp-');
    let css = 'mdl-layout mdl-js-layout mdl-layout--fixed-header';
    if ( view )
    {
      css = `${css} vw-${view}`;
    }
    return (
      <div id="App" className={css}>
        <Navbar dispatch={dispatch}/>
        <Drawer dispatch={dispatch}/>

        <main className="mdl-layout__content">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col"><h1>Arbitrium</h1></div>
            <div className="mdl-cell mdl-cell--2-col">CS 2</div>
            <div className="mdl-cell mdl-cell--4-col">CS 4</div>
          </div>
        </main>
      </div>
    )
  }
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

function mapStateToProps(state) {
  const { auth, authFormValidity } = state.default
  const { isAuthenticated, errorMessage } = auth
  const { isValid } = authFormValidity
  
  return {
    isAuthenticated,
    errorMessage,
    isValid
  }
}

export default connect(mapStateToProps)(DashboardPage)

