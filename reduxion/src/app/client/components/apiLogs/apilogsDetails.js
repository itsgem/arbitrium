import React from 'react';
import Checkit from 'checkit';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

class ApiLogsDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  render() {
    let iplogInfo = this.props.successApiLogInfo.data;
    return (
      <section>
        <div className="mdl-grid content">
          <div className="mdl-cell mdl-cell--6-col">
            <h6>IP ADDRESS</h6>
            <p>{iplogInfo.ipaddress}</p>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <h6>STATUS CODE</h6>
            <p>{iplogInfo.status_code}</p>
          </div>
          <div className="mdl-cell mdl-cell--6-col bottom-margin">
            <h6>URL</h6>
            <p>{iplogInfo.url}</p>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <h6>DATE CREATED</h6>
            <p>{iplogInfo.created}</p>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <h6>PARAMETER</h6>
            <pre className="script script-box-container">
                {
                  JSON.stringify(JSON.parse(iplogInfo.parameter),null,2)
                }
            </pre>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <h6>RESPONSE</h6>
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

function setErrors( e ) {
  this.setState(createError(e));
}

ApiLogsDetails.mixins = [LinkedStateMixin];
ApiLogsDetails.defaultProps = {
    errors: []
};
export default ApiLogsDetails;