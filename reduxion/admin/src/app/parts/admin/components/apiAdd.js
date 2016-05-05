import React from 'react';
import Checkit from 'checkit';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';

class ApiAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null
    };
  }
  componentDidMount() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  render() {
    let {errors, errorServer} = this.state ? this.state :'';
    return (
      <form className="form-container" action="#">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
                  <input className="mdl-textfield__input font-input" type="text" id="api-description" />
                  <label className="mdl-textfield__label" htmlFor="sample1">Description...</label>
                </div>
                <p>Add a description to your API key to allow you to filter by key</p>
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-1">
                  <input type="checkbox" id="checkbox-1" className="mdl-checkbox__input" />
                  <span className="mdl-checkbox__label">Only allow the Key to work from certain IP address</span>
                </label>
              </div>
              <div className="mdl-cell mdl-cell--12-col">
                <div className="mdl-textfield mdl-js-textfield full-width">
                  <textarea className="mdl-textfield__input" type="text" rows= "3" id="add-ip-address" ></textarea>
                  <label className="mdl-textfield__label" htmlFor="sample5">Add IP Address...</label>
                </div>
                <p>Add one IP Address per line separated by line breaks</p>
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect padding-bot" htmlFor="checkbox-2">
                  <input type="checkbox" id="checkbox-2" className="mdl-checkbox__input" />
                  <span className="mdl-checkbox__label">Only allow this Key to user certain API calls</span>
                </label>
              </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-3">
                    <input type="checkbox" id="checkbox-3" className="mdl-checkbox__input" />
                    <span className="mdl-checkbox__label">Users</span>
                  </label>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-4">
                    <input type="checkbox" id="checkbox-4" className="mdl-checkbox__input" />
                    <span className="mdl-checkbox__label">Messages</span>
                  </label>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-5">
                    <input type="checkbox" id="checkbox-5" className="mdl-checkbox__input" />
                    <span className="mdl-checkbox__label">Tags</span>
                  </label>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-6">
                    <input type="checkbox" id="checkbox-6" className="mdl-checkbox__input" />
                    <span className="mdl-checkbox__label">Rejects</span>
                  </label>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-7">
                    <input type="checkbox" id="checkbox-7" className="mdl-checkbox__input" />
                    <span className="mdl-checkbox__label">Info</span>
                  </label>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-8">
                    <input type="checkbox" id="checkbox-8" className="mdl-checkbox__input" />
                    <span className="mdl-checkbox__label">Send</span>
                  </label>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-9">
                    <input type="checkbox" id="checkbox-9" className="mdl-checkbox__input"/>
                    <span className="mdl-checkbox__label">List</span>
                  </label>
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-10">
                    <input type="checkbox" id="checkbox-10" className="mdl-checkbox__input"/>
                    <span className="mdl-checkbox__label">Add</span>
                  </label>
                </div>
                <div className="mdl-cell mdl-cell--1-col check-test-key">
                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-11">
                    <input type="checkbox" id="checkbox-11" className="mdl-checkbox__input"/>
                    <span className="mdl-checkbox__label">Test Key</span>
                  </label>
                </div>
                <div className="mdl-cell mdl-cell--1-col check-test-key">
                  <div id="tt4" className="icon material-icons">help</div>
                    <div className="mdl-tooltip mdl-tooltip--large" htmlFor="tt4">
                      You can use a test key to experiment
                      with Arbitrium's API. No mail is actually sent but webhooks, trigger normally and you can generate synthetic bounces and complaints without impacting your reputation
                    </div>
                </div>
            </div>
            <div className="layout-gt-md-row layout-align-end-end btn">
                  <div className="flex-order-gt-md-2 pd-10">
                    <Link
                      className="mdl-button mdl-js-button mdl-button--colored"
                      id='btn-cancel'
                      to="/coffee/client/">CANCEL</Link>
                  </div>
                  <div className="flex-order-gt-md-2" >
                    <button id="btn-save" className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent">Create API Key</button>
                  </div>
                </div>
          </form>
    );
  }
  formClassNames( field, errors ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    } );
  }
};

function mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
        return callback(key, object[key]);
    });
}

ApiAdd.mixins = [LinkedStateMixin];
ApiAdd.defaultProps = {
    errors: []
};
export default ApiAdd;