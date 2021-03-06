import React from 'react';
import ClientHeader from 'client/components/header';
import ClientSidebar from 'client/components/sidebar';

class MainTop extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
  }
  componentWillReceiveProps() {
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
      <div id="application-view" >
        <div className="theme-arbitrium mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          <ClientHeader />
          <ClientSidebar />
        </div>
      </div>
    );
  }
}

export default MainTop;