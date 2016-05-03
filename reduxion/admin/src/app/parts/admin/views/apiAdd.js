import React from 'react';
import DocTitle from 'components/docTitle';
import ApiAdd from '../components/apiAdd';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render() {
    //this.renderSuccess();
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title="Add New API KEY"
        />
      <div className="client-tab">
        <Link
          className="mdl-layout__tab"
          to="/coffee/api/">List of API keys</Link>
        <a className="mdl-layout__tab is-active">Add New API key<i className="material-icons add">add</i></a>
      </div>
        <ApiAdd />
      </div>
    );
  }
} );