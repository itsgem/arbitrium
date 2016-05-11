import React from 'react';
import { Link } from 'react-router';
import ClientHeader from 'client/components/header';
import ClientSidebar from 'client/components/sidebar';

class MainTop extends React.Component{
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
      <div className="theme-arbitrium mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <ClientHeader />
        <ClientSidebar />
      </div>
    );
  }
}

MainTop.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default MainTop;