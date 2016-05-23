import React from 'react';

export default React.createClass( {

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount () {
    this.props.logout();
  },
  componentWillReceiveProps(nextProps) {
    if(!nextProps.authenticated){
      localStorage.removeItem('coffee');
      window.location = window.location.origin + "/coffee/login";
    }
  },
  render() {
    return (
      <div id="logout"></div>
    );
  }

});
