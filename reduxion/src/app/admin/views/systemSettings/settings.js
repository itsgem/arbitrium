import React from 'react';
import DocTitle from 'common/components/docTitle';
// import SubscriptionList from 'admin/components/subscription/subscriptionList';
import { Link } from 'react-router';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <main className="mdl-layout__content">
        <div id="admin_report">
          <DocTitle
            title="System Settings"
          />
          <div className="client-tab">
            <label className="mdl-layout__tab is-active">API Settings</label>
          </div>
        </div>
        <div className="page-content">
          <form method="post">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">
                <legend>General Information</legend>
                <p>The contents appear below this section are placeholder content to show the actual layout of the section. The contents will be replaced later on.</p>
              </div>
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--6-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="Kosh Consulting Group (Asia) PTE. LTD."/>
                  <label className="mdl-textfield__label">Company Name</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--6-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label">Billing Info</label>
                </div>
              </div>
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--3-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="Cebu City"/>
                  <label className="mdl-textfield__label">City</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="#03-24 Far East Shooping Center"/>
                  <label className="mdl-textfield__label">State</label>
                </div>
              </div>

              <div className="mdl-cell mdl-cell--3-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="Singapore"/>
                  <label className="mdl-textfield__label">Country</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="238882"/>
                  <label className="mdl-textfield__label">Postal Code</label>
                </div>
              </div>
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--6-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label">Admin Email</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="14400"/>
                  <label className="mdl-textfield__label">Token Expiry</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title" value="10"/>
                  <label className="mdl-textfield__label">Items Per Page</label>
                </div>
              </div>
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <p>Other settings textfield 1</p>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label">Other settings 1</label>
                </div>
              </div>
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <p>Other settings textfield 2</p>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--2-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label">Other settings 2</label>
                </div>
              </div>
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">
                <legend>Billing Information</legend>
                <p>The contents appear below this section are placeholder content to show the actual layout of the section. The contents will be replaced later on.</p>
              </div>
              <div className="mdl-cell mdl-cell--12-col">
              </div>
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label">Account Name</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label">Credit To</label>
                </div>
              </div>
            </div>

            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label">Bank Account</label>
                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <div className="mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty">
                  <input className="mdl-textfield__input" type="text" id="title"/>
                  <label className="mdl-textfield__label">Bank Account Code</label>
                </div>
              </div>
            </div>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col">
                <button className="mdl-button mdl-button--accent">Save</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
} );