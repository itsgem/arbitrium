import React from 'react';
import { Link } from 'react-router';
import ClientHeader from '../../common/components/header';
import ClientSidebar from '../../common/components/sidebar';

class Dashboard extends React.Component{
  constructor(props) {
      super(props);
      this.props = props;
  }

  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  componentWillMount() {
    if (!localStorage.getItem('token')){
      this.context.router.push(`/i/login`);
    }
  }

  render() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <ClientHeader />
        <ClientSidebar />
        <main className="mdl-layout__content">
          <p>client/core/views/dashboard.js</p>
          <h1>Client Dashboard</h1>
        </main>
      </div>
    );
  }
}

Dashboard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Dashboard;