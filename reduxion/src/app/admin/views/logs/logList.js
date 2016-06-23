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
      <div id="log_add_or_change" className="auth-view">
        <DocTitle
          title="Logs"
        />
        <div className="client-tab">
          <Link
            className='mdl-layout__tab'
            to="/coffee/logs/">Client API Logs List</Link>
          <a className="mdl-layout__tab is-active" >API Logs List<i className="material-icons add">edit</i></a>
        </div>
        <LogList
          logList={this.props.logList}
          adminLogList={this.props.adminLogList}
          />
      </div>
    );
  }
} );