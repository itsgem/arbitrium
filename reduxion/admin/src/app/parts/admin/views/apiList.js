import React from 'react';
import DocTitle from 'components/docTitle';
import ApiList from '../components/apiList';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <div id="client_add">
        <DocTitle
          title="API List"
        />
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">List of API keys</label>
          <Link
              className='mdl-layout__tab'
              to="/coffee/api/new">Add New API key<i className="material-icons add">add</i></Link>
        </div>
        <ApiList
        />
      </div>
    );
  }
} );