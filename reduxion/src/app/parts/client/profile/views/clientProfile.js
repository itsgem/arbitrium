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
                                <li className="mdl-menu__item"><Link className="mdl-navigation__link " to ="/i/client/profile"><i className="material-icons mdl-list__item-icon">person</i> Profile</Link></li>
                                <li className="mdl-menu__item"><Link className="mdl-navigation__link " to ="/i/logout"><i className="material-icons mdl-list__item-icon">exit_to_app</i> Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                </header>
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
                <main className="mdl-layout__content mdl-layout__content_my_profile">
                    <div className="page-content">
                        <div id="profile-bgcover" className="mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col">
                            <div className="profile__content">
                                <div className="mdl-grid box">
                                    <div className="mdl-cell--1-col box-photo">
                                        <img src="http://placehold.it/100x100/"/>
                                    </div>
                                    <div className="mdl-cell--4-col box-details">
                                        <h5 className="mdl-typography--headline">{(user) ? user.rep_first_name : null} {(user) ? user.rep_last_name : null}</h5>
                                        <p>Edit your profile</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <header className="mdl-layout__header mdl-layout--fixed-tabs">
                            <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
                                <a href="#scroll-tab-1" className="mdl-layout__tab is-active">Profile</a>
                                <a href="#scroll-tab-2" className="mdl-layout__tab">Password</a>
                                <a href="#scroll-tab-3" className="mdl-layout__tab"></a>
                                <a href="#scroll-tab-4" className="mdl-layout__tab"></a>
                            </div>
                        </header>
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
