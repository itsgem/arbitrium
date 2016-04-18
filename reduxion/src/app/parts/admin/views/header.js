import React from 'react';
import { Link } from 'react-router';
import {createError} from 'utils/error';

class Header extends React.Component {
    render() {
        return (
            <div className=" mdl-layout__header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">arbitrium</span>
                        <div className="mdl-layout-spacer"></div>
                        <nav className="mdl-navigation">
                            <Link to="/admin" className="mdl-navigation__link" >Dashboard</Link>
                            <Link to="/admin" className="mdl-navigation__link" >Clients</Link>
                            <Link to="/admin" className="mdl-navigation__link" >Respondents</Link>
                            <Link to="/admin" className="mdl-navigation__link" >Survey Admin</Link>
                            <Link to="/admin" className="mdl-navigation__link" >Pricing</Link>
                            <Link to="/admin" className="mdl-navigation__link" >Admin Accounts</Link>
                            <Link to="/admin" className="mdl-navigation__link" >Logs</Link>
                            <Link to="/admin" className="mdl-navigation__link" >Home</Link>
                        </nav>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;
