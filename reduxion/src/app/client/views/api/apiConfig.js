import React from 'react';
import { Link } from 'react-router';

class ApiConfig extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  render() {
    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <div className="page-content">
          <div className="mdl-tabs__panel is-active" id="change_email">
            <section className="section-api-key-list">
              <div className="mdl-grid">
                <div className="mdl-cell">
                  <button className="mdl-button mdl-button--raised mdl-button--accent">New API Key</button>
                </div>
              </div>
              <table className="mdl-data-table mdl-js-data-table table-client-list">
                <thead>
                  <tr>
                    <th className="mdl-data-table__cell--non-numeric thead-title--key">Keys</th>
                    <th className="mdl-data-table__cell--non-numeric thead-title--desc">Description</th>
                    <th className="mdl-data-table__cell--non-numeric thead-title--created">Created</th>
                    <th className="mdl-data-table__cell--non-numeric thead-title--action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-dark">
                    <th className="mdl-data-table__cell--non-numeric">sad99a0dfgagagggnrww</th>
                    <th className="mdl-data-table__cell--non-numeric">Login key</th>
                    <th className="mdl-data-table__cell--non-numeric">May 10, 2016</th>
                    <th className="mdl-data-table__cell--non-numeric">
                      <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="switch-1">
                        <input type="checkbox" id="switch-1" className="mdl-switch__input"/>
                        <span className="mdl-switch__label"></span>
                      </label>
                    </th>
                  </tr>
                  <tr>
                    <th className="mdl-data-table__cell--non-numeric">doiqw488351-935=15jiowjegq</th>
                    <th className="mdl-data-table__cell--non-numeric">Auth key</th>
                    <th className="mdl-data-table__cell--non-numeric">May 10, 2016</th>
                    <th className="mdl-data-table__cell--non-numeric">
                      <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="switch-2">
                        <input type="checkbox" id="switch-2" className="mdl-switch__input"/>
                        <span className="mdl-switch__label"></span>
                      </label>
                    </th>
                  </tr>
                  <tr className="bg-dark">
                    <th className="mdl-data-table__cell--non-numeric">sad99a0dfgagagggnrww</th>
                    <th className="mdl-data-table__cell--non-numeric">Login key</th>
                    <th className="mdl-data-table__cell--non-numeric">May 10, 2016</th>
                    <th className="mdl-data-table__cell--non-numeric">
                      <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="switch-3">
                        <input type="checkbox" id="switch-3" className="mdl-switch__input"/>
                        <span className="mdl-switch__label"></span>
                      </label>
                    </th>
                  </tr>
                  <tr>
                    <th className="mdl-data-table__cell--non-numeric">doiqw488351-935=15jiowjegq</th>
                    <th className="mdl-data-table__cell--non-numeric">Auth key</th>
                    <th className="mdl-data-table__cell--non-numeric">May 10, 2016</th>
                    <th className="mdl-data-table__cell--non-numeric">
                      <span>
                        <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="switch-4">
                          <input type="checkbox" id="switch-4" className="mdl-switch__input"/>
                          <span className="mdl-switch__label"></span>
                        </label>
                      </span>
                    </th>
                  </tr>
                  <tr className="bg-dark">
                    <th className="mdl-data-table__cell--non-numeric">sad99a0dfgagagggnrww</th>
                    <th className="mdl-data-table__cell--non-numeric">Login key</th>
                    <th className="mdl-data-table__cell--non-numeric">May 10, 2016</th>
                    <th className="mdl-data-table__cell--non-numeric btn-action">
                        <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="switch-5">
                          <input type="checkbox" id="switch-5" className="mdl-switch__input"/>
                          <span className="mdl-switch__label"></span>
                        </label>
                        <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
                          <i className="material-icons">add</i>
                        </button>
                        <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
                          <i className="material-icons">add</i>
                        </button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </section>
            <section className="section-api-keys">
                <form>
                  <div className="mdl-cell mdl-cell--12-col">
                    <h4>API Keys</h4>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--12-col keys-group">
                      <input className="mdl-textfield__input"></input>
                      <label className="mdl-textfield__label">Description</label>
                      <small className="textfield-caption">Adding a description to your API key allow you to filter activity by the key.</small>
                    </div>
                    <p className="item">
                      <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                      <label>Only Allow The Key To Work From Certain IP Address</label>
                    </p>
                  </div>
                  <div className="mdl-cell mdl-cell--12-col">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--12-col keys-group">
                      <textarea className="mdl-textfield__input" type="text"></textarea>
                      <label className="mdl-textfield__label" htmlFor="sample5">Add IP Address</label>
                      <small className="textfield-caption">Add one IP Address per line, separated by line breaks.</small>
                    </div>
                    <p className="item">
                      <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                      <label>Only Allow This Key To Use Certain API Calls</label>
                    </p>
                  </div>
                  <div className="mdl-grid">
                    {/* 1st box */}
                    <div className="mdl-cell mdl-cell--3-col form-group">
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Users</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Info</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Ping</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Ping2</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Senders</label>
                      </p>
                    </div>
                    {/* 2nd box */}
                    <div className="mdl-cell mdl-cell--3-col form-group">
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Messages</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Send</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Send Template</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Search</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Search-Time-Series</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Info</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Content</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Parse</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Send-Raw</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>List-Scheduled</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Canceled-Scheduled</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Reschedule</label>
                      </p>
                    </div>
                    {/* 3rd box */}
                    <div className="mdl-cell mdl-cell--3-col form-group">
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Users</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Info</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Ping</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Ping2</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Senders</label>
                      </p>
                    </div>
                    {/* 4th box */}
                    <div className="mdl-cell mdl-cell--3-col form-group">
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Users</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Info</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Ping</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Ping2</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Senders</label>
                      </p>
                    </div>
                  </div>
                  <div className="mdl-grid">
                    {/* 1st box */}
                    <div className="mdl-cell mdl-cell--3-col form-group">
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Whitelists</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Add</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>List</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Delete</label>
                      </p>
                    </div>
                    {/* 2nd box */}
                    <div className="mdl-cell mdl-cell--3-col form-group">
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Users</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Senders</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Domain</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Add Domains</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Check Domains</label>
                      </p>
                    </div>
                    {/* 3rd box */}
                    <div className="mdl-cell mdl-cell--3-col form-group">
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>URLs</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>List</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Search</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Time-Series</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Tracking Domains</label>
                      </p>
                    </div>
                    {/* 4th box */}
                    <div className="mdl-cell mdl-cell--3-col form-group">
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Templates</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Add</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Info</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Update</label>
                      </p>
                      <p className="item">
                        <span><input type="checkbox" className="mdl-checkbox__input"/></span>
                        <label>Publish</label>
                      </p>
                    </div>
                  </div>
                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col footer-action">
                      <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Save </button>
                    </div>
                  </div>
                </form>
            </section>
            </div>
        </div>
      </main>
    );
  }
}

ApiConfig.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ApiConfig;