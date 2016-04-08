import React from 'react';
import { connect } from 'react-redux';
import config from 'config';
import Debug from 'debug';
let debug = new Debug("component:navbar");

class Navbar extends React.Component {
    constructor(props, context){
        super(props);
        this.state = {
            open: false
        };
        context.router
    }

    componentDidMount() {
        if ( typeof(window.componentHandler) != 'undefined' )
        {
            setTimeout(() => {window.componentHandler.upgradeDom()},10);
        }
    }

    toggleNav () {
        debug('toggleNav');
        this.setState({
            open: !this.state.open
        });
    }

    render () {
        return (
            <header className="irx-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
                <div className="mdl-layout__header-row">
                <span className="mdl-layout-title">{config.title}</span>
                <div className="mdl-layout-spacer"></div>
                    <div className="irx-navigation-container">
                        <nav className="irx-navigation mdl-navigation">
                            <a className="mdl-navigation__link" href="">Business</a>
                            <a className="mdl-navigation__link" href="">Logout</a>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
  authenticated: state.get('auth').get('authenticated')
});

export default connect(mapStateToProps)(Navbar);