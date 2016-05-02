import React from 'react';
import ClientHeader from '../components/header';
import ClientSidebar from '../components/sidebar';

export default React.createClass({
  render () {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <ClientHeader />
        <ClientSidebar />
        {content}
      </div>
    );
  }
});
