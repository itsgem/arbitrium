import React from 'react';
import Debug from 'debug';
import ClientHeader from '../../../client/common/components/header';
import ClientSidebar from '../../../client/common/components/sidebar';

let debug = new Debug("component:authenticated");

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  propTypes:{
    authenticated: React.PropTypes.bool.isRequired
  },
  componentWillMount: function () {
    debug('componentWillMount pathname: ', this.props.location.pathname);
    let nextPath = this.props.location.pathname;
    if (!this.props.authenticated) {
      debug('is not authenticated');
      //this.context.router.push(`/i/login?nextPath=${nextPath}`);
    } else {
      debug('is authenticated');
    }
  },
  componentDidUpdate: function () {
    this.componentWillMount();
  },
  getInitialState: function () {
    return {};
  },
  render: function () {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <ClientHeader />
        <ClientSidebar />
        {this.props.children}
      </div>
    );
  }
});
