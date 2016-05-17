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
      localStorage.removeItem('token');
      this.context.router.push(`/i/login`);
    }
  },

  render() {
    return (
      <div id="logout">
      </div>
    );
  }

});