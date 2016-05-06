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
      this.context.router.push(`/coffee/login`);

    }
  },
  render() {
    return (
      <div id="logout"></div>
    );
  }

});
