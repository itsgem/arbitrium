import React from 'react';
import { Link } from 'react-router';
import ApiList from 'client/components/api/apiList';

export default React.createClass({
  componentWillMount () {
    this.props.clietApiKeys();
  },
  render () {
    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <div className="page-content">
          <ApiList
            isActiveApiKey={this.props.isActiveApiKey}
            clietApiKeys={this.props.clietApiKeys}
            listApiKeys={this.props.listApiKeys}/>
        </div>
      </main>
    );
  }
});
