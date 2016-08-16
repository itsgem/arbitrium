import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';
import MainDashboard from 'client/components/dashboard/main';
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
      <main className="mdl-layout__content clientContent">
        <DocTitle
          title={tr.t('CLIENT_API_LOGS.API_LOGS_LIST.DOC_TITLE')}
        />
        <div className="page-content">
          <div className="header-title">
            <p>{tr.t('ADMIN_DASHBOARD.TITLE.DASHBOARD')}</p>
          </div>
          <MainDashboard
              loading={this.props.loading}
              graphInfo={this.props.graphInfo}
              graphReport={this.props.graphReport}
            />
        </div>
      </main>
    );
  }
} );
