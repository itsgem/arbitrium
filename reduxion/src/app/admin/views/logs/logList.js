import React from 'react';
import DocTitle from 'common/components/docTitle';
import LogList from 'admin/components/logs/logList';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.adminLogList({per_page: 10});
  },
  render() {
    return (
      <div id="log_add_or_change">
        <DocTitle
          title="Logs"
        />
        <div className="client-tab">
          <label className="mdl-layout__tab is-active">Logs List</label>
        </div>
        <LogList
          logList={this.props.logList}
          adminLogList={this.props.adminLogList}
          />
      </div>
    );
  }
} );