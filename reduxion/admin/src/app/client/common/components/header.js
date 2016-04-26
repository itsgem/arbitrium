import React from 'react';
import { Link } from 'react-router';

class ClientHeader extends React.Component {

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
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <div className="mdl-layout-spacer"></div>
                    <div className="wrapper">
                        <button id="demo_menu-lower-right" className="mdl-button mdl-js-button mdl-button--icon" data-upgraded=",MaterialButton">
                            <i className="material-icons">person</i>
                        </button>
                        <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo_menu-lower-right">
                            <li className="mdl-menu__item"><i className="material-icons mdl-list__item-icon">settings</i> Settings</li>
                            <li className="mdl-menu__item"><Link className="mdl-navigation__link " to ="/i/client/profile"><i className="material-icons mdl-list__item-icon">person</i> Profile</Link></li>
                            <li className="mdl-menu__item"><Link className="mdl-navigation__link " to ="/i/logout"><i className="material-icons mdl-list__item-icon">exit_to_app</i> Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default ClientHeader;