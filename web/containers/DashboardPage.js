import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions'
import Navbar from '../components/Navbar';
import Drawer from '../components/Drawer';

class DashboardPage extends Component {
  componentDidMount() {
    if (typeof(window.componentHandler) != 'undefined')
    {
      window.componentHandler.upgradeDom();
    }
  }

  handleLogout() {
    console.log('test');
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
        <Navbar dispatch={dispatch}
         onLogoutClick={() => (this.handleLogout)}
        />
        <Drawer dispatch={dispatch}/>

        <main className="mdl-layout__content">
        test
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

