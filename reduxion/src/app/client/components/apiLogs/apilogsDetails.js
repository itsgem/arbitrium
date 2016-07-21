import React from 'react';
import tr from 'i18next';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

class ApiLogsDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  render() {
    let iplogInfo = this.props.successApiLogInfo.data;
    return (
      <section>
        <div className="mdl-cell--12-col header-title"><p>{tr.t('CLIENT_API_LOGS.API_LOG_DETAIL.TITLE')}</p></div>
        <div className="mdl-grid content">
          <div className="mdl-cell mdl-cell--6-col">
            <h6>{tr.t('LABEL.IP_ADDRESS')}</h6>
            <p>{iplogInfo.ipaddress}</p>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <h6>{tr.t('LABEL.STATUS_CODE')}</h6>
            <p>{iplogInfo.status_code}</p>
          </div>
          <div className="mdl-cell mdl-cell--6-col bottom-margin">
            <h6>{tr.t('LABEL.URL')}</h6>
            <p>{iplogInfo.url}</p>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <h6>{tr.t('LABEL.DATE_CREATED')}</h6>
            <p>{iplogInfo.created}</p>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <h6>{tr.t('LABEL.PARAMETER')}</h6>
            <pre className="script script-box-container">
                {
                  JSON.stringify(JSON.parse(iplogInfo.parameter),null,2)
                }
            </pre>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <h6>{tr.t('LABEL.RESPONSE')}</h6>
            <pre className="script script-box-container">
              <code>
                {
                  JSON.stringify(JSON.parse(iplogInfo.response),null,2)
                }
              </code>
            </pre>
          </div>
        </div>
      </section>
    );
  }
};

ApiLogsDetails.mixins = [LinkedStateMixin];
ApiLogsDetails.defaultProps = {
    errors: []
};
export default ApiLogsDetails;