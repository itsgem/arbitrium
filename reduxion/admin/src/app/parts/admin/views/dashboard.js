import React from 'react';
import { Link } from 'react-router';
import AdminHeader from './header';

class Dashboard extends React.Component{
  constructor(props, context) {
      super(props);
      this.props = props;
      this.context = context;
  }

  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  componentWillMount() {
    if (!localStorage.getItem('token')){
      this.context.router.push(`/coffee/login`);
    }
  }

  render() {

    return (
       <div className="admin-container">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header body-bg">
          <AdminHeader />
          <div className="mdl-layout__content">
            <div className="mdl-grid client-list">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Dashboard;

