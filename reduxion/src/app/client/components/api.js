import React from 'react';
import { Link } from 'react-router';
import ClientHeader from 'client/components/header';
import ClientSidebar from 'client/components/sidebar';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  componentWillMount() {
    if (!localStorage.getItem('token')){
      this.context.router.push(`/i/login`);
    }
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <ClientHeader />
        <ClientSidebar />
        <main className="mdl-layout__content">
          <section className="section-api-keys">
              <form>
                <div className="mdl-cell mdl-cell--12-col">
                  <h1>API Keys</h1>
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
              </form>
          </section>
        </main>
      </div>
    );
  }
}

Dashboard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Dashboard;