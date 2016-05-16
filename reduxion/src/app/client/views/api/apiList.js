import React from 'react';
import { Link } from 'react-router';
import ApiList from 'client/components/api/apiList';

export default React.createClass({
  componentWillMount () {
    this.props.clietApiKeys();
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteApiKeySuccess && !nextProps.loading) {
      this.props.clietApiKeys({per_page: 10});
    }
  },
  render () {
    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <div className="page-content">
          <ApiList
            isActiveApiKey={this.props.isActiveApiKey}
            clietApiKeys={this.props.clietApiKeys}
            listApiKeys={this.props.listApiKeys}
            clientDeleteApiKey={this.props.clientDeleteApiKey}/>
        </div>
      </main>
    );
  }
});
