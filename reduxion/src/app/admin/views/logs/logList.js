import React from 'react';
import DocTitle from 'common/components/docTitle';
import LogList from 'admin/components/logs/logList';
import { Link } from 'react-router';
import {openLoading, closeLoading} from 'common/components/modal';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.adminLogList({per_page: 10, client_id: this.props.params.client_id});
  },
  render() {
    if (Object.keys(this.props.logList).length) {
      closeLoading();
      return this.renderLogList();
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
  renderLogList() {
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
          params={this.props.params}
          logList={this.props.logList}
          adminLogList={this.props.adminLogList}
          />
      </div>
    );
  }
} );