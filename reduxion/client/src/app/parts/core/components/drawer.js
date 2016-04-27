import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Debug from 'debug';
let debug = new Debug("component:drawer");

function navLinks(authenticated) {
    if (authenticated) {
        return [
            {
                route: '/admin',
                text: 'ADMIN'
            }, {
                route: '/app',
                text: 'DASHBOARD'
            }, {
                route: '/app/my/profile',
                text: 'PROFILE'
            }, {
                route: '/logout',
                text: 'LOGOUT'
            }
        ];
    } else {
        return [
            {
                route: '/login',
                text: 'LOGIN'
            }, {
                route: '/signup',
                text: 'REGISTER'
            }
        ];
    }
};

class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            open: false
        }
    }

    handleNavChange (event, menuItem) {
        debug('handleNavChange ', menuItem.route);
        event.preventDefault();
        this.context.router.push(menuItem.route);
        this.setState({open: false});
    }

    renderMenuItem () {
        return _.map(navLinks(this.props.authenticated), (menu, key) => {
            return (
                <a key={key} className="mdl-navigation__link" href="javascript:void(0);"
                   onClick={(event) => {this.handleNavChange(event, menu)}}>
                    <i className="ion ion-ios-home" role="presentation"></i> {menu.text}
                </a>
            );
        });
    }

    render () {
        return (
            <div className="mdl-layout__drawer">
              <header className="drawer-header">
                <div className="avatar-dropdown">
                  <span>hello@example.com</span>
                  <div className="mdl-layout-spacer"></div>
                  <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="accbtn">
                    <li className="mdl-menu__item">hello@example.com</li>
                    <li className="mdl-menu__item">info@example.com</li>
                    <li className="mdl-menu__item"><i className="ion ion-plus-round"></i>Add another account...</li>
                  </ul>
                </div>
              </header>
              <nav className="irx-navigation mdl-navigation">
                {this.renderMenuItem()}
              </nav>
            </div>
        );
    }
}

Drawer.propTypes = {
    authenticated: React.PropTypes.bool.isRequired
}

Drawer.contextTypes = {
    router: React.PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
  authenticated: state.get('auth').get('authenticated')
});

export default connect(mapStateToProps)(Drawer);