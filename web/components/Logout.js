import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Logout extends Component {
  
  render() {
    const { appendClass, icon } = this.props
    
    return (
      <button type="button" className={appendClass}
       onClick={ (event) => this.handleClick(event) }>
        {icon && <i className={icon}></i>} Logout
      </button>
    )
  }

  handleClick(event) {
    console.log(this.onLogoutClick);
    //onLogoutClick()
  }
  
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  appendClass: PropTypes.string,
  icon: PropTypes.string
}

function mapStateToProps(state) {
  const { authFormValidity } = state.default
  const { isValid } = authFormValidity

  return {
    isValid
  }
}
export default connect(mapStateToProps)(Logout)