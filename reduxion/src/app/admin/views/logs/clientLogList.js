import React from 'react';
import DocTitle from 'common/components/docTitle';
import ClientLogList from 'admin/components/logs/clientLogList';
import {openLoading, closeLoading} from 'common/components/modal';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.adminClientList({per_page: 10});
  },
  render() {
    if (Object.keys(this.props.clientList).length) {
      closeLoading();
      return this.renderClientLogList();
    } else {
      return this.loadingRender();
    }
  },
  loadingRender () {
    openLoading();
    return (
      <div className="loading"></div>
    );
  },
  renderClientLogList() {
    return (
      <div id="log_add_or_change">
        <DocTitle
          title="Logs"
        />
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">Client API Logs List</label>
        </div>
        <ClientLogList
          clientList={this.props.clientList}
          adminClientList={this.props.adminClientList}
          />
      </div>
    );
  }
} );