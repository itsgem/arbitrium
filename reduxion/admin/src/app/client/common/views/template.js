import React from 'react';
import ClientHeader from '../components/header';
import ClientSidebar from '../components/sidebar';

export default React.createClass({
    componentDidMount () {

    },

    render () {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                <ClientHeader />
                <ClientSidebar />
                {content}
                <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar">
                    <div className="mdl-snackbar__text"></div>
                    <button type="button" className="mdl-snackbar__action"></button>
                </div>
            </div>
        );
    }
});
