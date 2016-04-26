import React from 'react';
import { Link } from 'react-router';

class ClientSidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount () {
        if ( typeof(window.componentHandler) != 'undefined' )
        {
            setTimeout(() => {window.componentHandler.upgradeDom()},10);
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    // --- Render

    render() {
        return (
            <div className="arbitrium-drawer mdl-layout__drawer">
                <span className="mdl-layout-title">Arbitrium</span>
                <nav className="arbitrium-navigation mdl-navigation">
                    <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a>
                    <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Inbox</a>
                    <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</a>
                    <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</a>
                    <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Forums</a>
                    <div className="mdl-layout-spacer"></div>
                    <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span className="visuallyhidden">Help</span></a>
                </nav>
            </div>
        );
    }
}

export default ClientSidebar;