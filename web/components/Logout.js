import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

class Logout extends Component {
  componentDidMount() {
    setTimeout(() => {
      componentHandler.upgradeDom();
    }, 10);
    
  }
  render() {
    const { appendClass, icon, parent } = this.props

    return (
      <a href="javascript:void(0);" key={parent} className={appendClass}
       onClick={(event) => {this.handleClick(event)}}>
        {icon && <i className={icon}></i>} Logout
      </a>
    )
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onLogoutClick();
  }
  
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  appendClass: PropTypes.string,
  parent: PropTypes.string.isRequired,
  icon: PropTypes.string
}

function redirectToAuthPage() {
  location.href = '/client/login';
}

function mapStateToProps(state) {
  const { auth, authFormValidity } = state.default
  const { isValid } = authFormValidity
  const { isFetching, isAuthenticated } = auth

  if ( !isFetching && !isAuthenticated )
  {
    redirectToAuthPage();
  }

  return {
    isValid
  }
}

export default connect(mapStateToProps)(Logout)