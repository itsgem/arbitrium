import React from 'react';
import Debug from 'debug';
import AdminHeader from '../../admin/views/header';
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
            //this.context.router.push(`/coffee/login?nextPath=${nextPath}`);
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
            <div className="admin-container">
              <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header body-bg">
                <AdminHeader />
                <div className="mdl-layout__content">
                  <div className="mdl-grid client-list">
                    {this.props.children}
                  </div>
                </div>
              </div>
            </div>
        );
    }
});
