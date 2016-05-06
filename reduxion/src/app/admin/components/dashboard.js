import React from 'react';
import AdminHeader from './header';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    errors: {},
    errorServer:null
    };
  }
  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  render() {
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
};

export default Dashboard;