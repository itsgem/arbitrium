import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
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
          <DocTitle
            title={tr.t('ADMIN_DASHBOARD.DOC_TITLE')}
          />
          <div className="mdl-layout__content">
              <div className="mdl-grid dashboard-container">
                <div className="mdl-cell mdl-cell--3-col">
                  <h6>{tr.t('ADMIN_DASHBOARD.TITLE.QUICK_LINKS')}</h6>
                  <div className="mdl-grid quick-links-container">
                    <ul className="mdl-cell mdl-cell--3-col quick-links">
                      <li><Link to="/coffee/settings/account"><i className="material-icons">supervisor_account</i>{tr.t('ADMIN_DASHBOARD.QUICK_LINKS_MENU.VIEW_ADMIN_ACCOUNT_LIST')}</Link></li>
                      <li><Link to="/coffee/client"><i className="material-icons">domain</i>{tr.t('ADMIN_DASHBOARD.QUICK_LINKS_MENU.VIEW_CLIENT_LIST')}</Link></li>
                      <li><Link to="/coffee/api"><i className="material-icons">vpn_key</i>{tr.t('ADMIN_DASHBOARD.QUICK_LINKS_MENU.VIEW_API_KEY_LIST')}</Link></li>
                      <li><Link to="/coffee/invoice"><i className="material-icons">monetization_on</i>{tr.t('ADMIN_DASHBOARD.QUICK_LINKS_MENU.VIEW_INVOICES')}</Link></li>
                      <li><Link to="/coffee/settings/logs"><i className="material-icons">description</i>{tr.t('ADMIN_DASHBOARD.QUICK_LINKS_MENU.VIEW_API_LOG_LIST')}</Link></li>
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
