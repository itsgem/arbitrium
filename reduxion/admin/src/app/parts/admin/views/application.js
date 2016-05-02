import React from 'react';
//import ThemeManager from 'material-ui/lib/styles/theme-manager';
//import MyRawTheme from './rawTheme';

import Debug from 'debug';
let debug = new Debug("views:app");

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        debug('render ', this.props);

        // add vw-children_name as className
        let css = this.props.children.props.route.path
                ? `vw-${this.props.children.props.route.path}`
                : `vw-home`;
        return (
            <div id="application-view" className={css}>
                <main id='main-container'>
                    <h1>admin/views/application.js</h1>
                    {this.props.children}
                </main>
            </div>
        );
    }
};
