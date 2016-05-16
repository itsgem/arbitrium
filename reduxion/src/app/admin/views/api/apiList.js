import React from 'react';
import DocTitle from 'common/components/docTitle';
import ApiList from 'admin/components/api/apiList';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.apiList({per_page: 10});
  },
  componentWillReceiveProps(nextProps) {
    if ((nextProps.deleteApiKeySuccess || nextProps.activeApiKey) && !nextProps.loading) {
      this.props.apiList({per_page: 10});
    }
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
          ListApiSuccess={this.props.ListApiSuccess}
          apiList={this.props.apiList}
          isActiveApiKey={this.props.isActiveApiKey}
          adminDeleteApiKey={this.props.adminDeleteApiKey}
          />
      </div>
    );
  }
} );