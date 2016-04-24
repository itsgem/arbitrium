import React from 'react';
import ClientProfile from '../components/clientProfile';

export default React.createClass({
    componentDidMount () {
        this.props.clientProfile();
        this.props.country();
    },

    render () {
        let user = this.props.user.get('data');
        let countryList = this.props.countryList;

        let isUsernameAvailable = this.props.isUsernameAvailable;
        let success = this.props.success;
        let errors = this.props.errors.get('data');

        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <div className="mdl-layout-spacer"></div>
                        <div className="wrapper">
                            <button id="demo_menu-lower-right" className="mdl-button mdl-js-button mdl-button--icon" data-upgraded=",MaterialButton">
                                <i className="material-icons">person</i>
                            </button>
                            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo_menu-lower-right">
                                <li className="mdl-menu__item"><i className="material-icons mdl-list__item-icon">settings</i> Settings</li>
                                <li className="mdl-menu__item"><i className="material-icons mdl-list__item-icon">person</i> Profile</li>
                                <li className="mdl-menu__item"><i className="material-icons mdl-list__item-icon">logout</i> Logout</li>
                            </ul>
                        </div>
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">Arbitrium</span>
                    <nav className="mdl-navigation ">
                        <a className="mdl-navigation__link" href=""><i className="material-icons mdl-list__item-icon">person</i> Dashboards</a>
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <ClientProfile
                            user={user}
                            country={countryList}
                            updateClientProfile={this.props.updateClientProfile}
                            getAvailableUsername={this.props.getAvailableUsername}
                            responseSuccess={success}
                            responseError={errors}
                            isUsernameAvailable={isUsernameAvailable}
                            />
                    </div>
                </main>
                <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar">
                    <div className="mdl-snackbar__text"></div>
                    <button type="button" className="mdl-snackbar__action"></button>
                </div>
            </div>
        );
    }
});
