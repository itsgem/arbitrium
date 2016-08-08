import React from 'react';
import { Link } from 'react-router';
import MainDashboard from 'admin/components/dashboard/main';
import {createError} from 'utils/error';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount() {
    this.props.graphReport().catch(createError);
  },
  render() {
    return (
        <div id="client_add">
          <div className="mdl-layout__content">
              <div className="mdl-grid dashboard-container">
                <div className="mdl-cell mdl-cell--3-col">
                  <h6>QUICK LINKS</h6>
                  <div className="mdl-grid quick-links-container">
                    <ul className="mdl-cell mdl-cell--3-col quick-links">
                      <li><Link to="/coffee/settings/account"><i className="material-icons">supervisor_account</i>View Admin Account List</Link></li>
                      <li><Link to="/coffee/client"><i className="material-icons">domain</i>View Cliet List</Link></li>
                      <li><Link to="/coffee/api"><i className="material-icons">vpn_key</i>View API Key List</Link></li>
                      <li><Link to="/coffee/invoice"><i className="material-icons">monetization_on</i>View Invoices</Link></li>
                      <li><Link to="/coffee/settings/logs"><i className="material-icons">description</i>View API Log list</Link></li>
                    </ul>
                  </div>
                </div>
                <MainDashboard
                  graphInfo={this.props.graphInfo}
                  graphReport={this.props.graphReport}
                />
              </div>
            </div>
        </div>
      );
    }
} );