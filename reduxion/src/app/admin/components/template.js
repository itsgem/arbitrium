import React from 'react';
import tr from 'i18next';
import AdminHeader from './header';

class Template extends React.Component {
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
  componentWillReceiveProps() {
    document.querySelector('.alert').style.display = 'none';
  }
  render() {
    return (
       <div className="admin-container">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header body-bg">
          <AdminHeader />
          <div className="mdl-layout__content">
            <div id="top" className="mdl-grid client-list">
            <div className="alert alert-warning">
              <i className="material-icons"></i>
              <div className="content">
                {tr.t('NOTEFICATION_MESSAGE.PLEASE_FILL_REQUIRED_FIELDS')}
              </div>
            </div>
            {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Template;