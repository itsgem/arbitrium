import React from 'react';
import Checkit from 'checkit';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';

class ApiUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      client_id: null,
      permissions: {}
    };
  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  scrolltop (errors) {
    if (!document.querySelector('.alert')) {
      return false;
    }

    if (Object.keys(errors).length) {
      document.querySelector('.alert').style.display = 'block';
      let target = document.getElementById('top');
      let scrollContainer = target;
      do { //find scroll container
          scrollContainer = scrollContainer.parentNode;
          if (!scrollContainer) return;
          scrollContainer.scrollTop += 1;
      } while (scrollContainer.scrollTop == 0);

      let targetY = 0;
      do { //find the top of target relatively to the container
          if (target == scrollContainer) break;
          targetY += target.offsetTop;
      } while (target = target.offsetParent);

      let scroll = function(c, a, b, i) {
          i++; if (i > 30) return;
          c.scrollTop = a + (b - a) / 30 * i;
          setTimeout(function(){ scroll(c, a, b, i); }, 20);
      }
      // start scrolling
      scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
    } else {
      document.querySelector('.alert').style.display = 'none';
    }
  }
  render() {
    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, {ip_addresses: errorServer.response.ip_addresses[0].ip_address ? errorServer.response.ip_addresses[0].ip_address : errorServer.response.ip_addresses});
    }

    this.scrolltop(errors);
    let getApiInfo = this.props.getApiInfo.data;
    let clientInfo = this.props.clientProfileSuccess.data;
    let permissions = this.props.apiPermissions.data;
    let ipAddresses = '';
    ipAddresses += getApiInfo.ip_addresses.map(item => { return item.ip_address; });
    ipAddresses = ipAddresses.split(',').join("\n");

    return (
      <form className="form-container" action="#" autoComplete="off">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
              <input className="dropList mdl-textfield__input font-input"
                type="text"
                id="client_id"
                defaultValue={clientInfo.company_name}
                disabled
                autoComplete="off"/>
              <input type="hidden" ref="client_id" value={clientInfo.id}/>
              <label className="mdl-textfield__label" htmlFor="client_id">Client Company</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
              <div className={this.formClassNames('description', errors)}>
                <input className="mdl-textfield__input font-input" ref="description" type="text" id="api-description" defaultValue={getApiInfo.description} />
                <label className="mdl-textfield__label" htmlFor="description">Description *</label>
                {errors.description && <small className="mdl-textfield__error shown">{errors.description[0]}</small>}
              </div>
            </div>
            <p>Add a description to your API key to allow you to filter by key</p>
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-1">
              <input type="checkbox" id="checkbox-1" ref="is_whitelist" className="mdl-checkbox__input" defaultChecked={getApiInfo.is_whitelist == 1 ? true : false} />
              <span className="mdl-checkbox__label">Only allow the Key to work from certain IP address</span>
            </label>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <div className="mdl-textfield mdl-js-textfield full-width">
              <div className={this.formClassNames('ip_addresses', errors)}>
                <textarea className="mdl-textfield__input" type="text" ref="ip_addresses" rows= "3" id="add-ip-address" defaultValue={ipAddresses}></textarea>
                <label className="mdl-textfield__label" htmlFor="ip_addresses">Add IP Address</label>
                {errors.ip_addresses && <small className="mdl-textfield__error shown">{errors.ip_addresses[0]}</small>}
              </div>
            </div>
            <p>Add one IP Address per line separated by line breaks</p>
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect padding-bot" htmlFor="checkbox-2">
              <input type="checkbox" id="checkbox-2" ref="is_api_call_restricted" className="mdl-checkbox__input" defaultChecked={getApiInfo.is_api_call_restricted == 1 ? true : false}/>
              <span className="mdl-checkbox__label">Only allow this Key to user certain API calls</span>
            </label>
          </div>
          {
            permissions  && permissions.map(item => {
              let getCk = false;
              if (getApiInfo.permissions) {
                for (let i = 0; i < getApiInfo.permissions.length; i++) {
                  if (getApiInfo.permissions[i].api_permission_id == item.id) {
                    getCk = true;
                    break;
                  }
                }
              }

              return (<div key={item.id} className="mdl-cell mdl-cell--3-col">
                        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={"checkbox-" + item.id}>
                          <input
                            type="checkbox"
                            className="mdl-checkbox__input"
                            id={"checkbox-" + item.id}
                            name="chkRights[]"
                            defaultChecked={getCk}
                            defaultValue={ item.id }
                            onClick={(e) => this.ckPermissions(e)}/>
                          <span className="mdl-checkbox__label">{item.name}</span>
                        </label>
                      </div>);
              })
            }
        </div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--2-col check-test-key">
              <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-11">
                <input type="checkbox" id="checkbox-11" ref="is_test_key" className="mdl-checkbox__input" defaultChecked={getApiInfo.is_test_key == 1 ? true : false}/>
                <span className="mdl-checkbox__label">Test Key</span>
              </label>
            </div>
            <div className="mdl-cell mdl-cell--3-col check-test-key">
              <div id="tt4" className="icon material-icons">help</div>
                <div className="mdl-tooltip mdl-tooltip--right" htmlFor="tt4">
                  You can use a test key to experiment
                  with Arbitrium's API. No mail is actually sent but webhooks, trigger normally and you can generate synthetic bounces and complaints without impacting your reputation.
                </div>
            </div>
        </div>
        <div className="layout-gt-md-row layout-align-end-end btn">
              <div className="flex-order-gt-md-2 pd-10">
                <Link
                  className="mdl-button mdl-js-button mdl-button--colored"
                  id='btn-cancel'
                  to="/coffee/api/">CANCEL</Link>
              </div>
              <div className="flex-order-gt-md-2" >
                <button id="btn-save"
                  className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--accent"
                  onClick={(e) => this.update(e, getApiInfo.id)}>Update API Key</button>
              </div>
            </div>
      </form>
    );
  }
  ckPermissions ( e ) {
    if (e.target.checked) {
      e.target.setAttribute("checked", "checked");
    } else {
      e.target.removeAttribute("checked");
    }
  }
  update ( e, id ) {
    e.preventDefault();
    let chkArr =  document.getElementsByName("chkRights[]");
    let permissions = [];
    for(let k=0;k < chkArr.length;k++) {
      if (chkArr[k].checked) {
        permissions[k] = {api_permission_id: chkArr[k].value};
      }
    }

    this.setState( {
      loading: true,
      errors: {},
      errorServer: null
    } );

    let ipAddresses = this.refs.ip_addresses.value;
    if (ipAddresses) {
      ipAddresses = ipAddresses.split('\n');
      ipAddresses = ipAddresses.map(function(obj){
         let rObj = {};
         rObj = {ip_address: obj.trim()};
         return rObj;
      });
    } else {
      ipAddresses = [];
    }
    let payload = {
      id: id,
      client_id: this.refs.client_id.value,
      description: this.refs.description.value,
      ip_addresses: ipAddresses,
      permissions: permissions,
      is_whitelist: (this.refs.is_whitelist.checked ? 1 : 0),
      is_api_call_restricted: (this.refs.is_api_call_restricted.checked ? 1 : 0),
      is_test_key: (this.refs.is_test_key.checked ? 1 : 0)
    };
    window.componentHandler.upgradeDom();
    return validateUpdate.call( this, payload )
      .with( this )
      .then( updateApi )
      .catch( setErrors );
  }

  formClassNames( field, errors ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    } );
  }
};

function validateUpdate ( payload) {
  let rules = new Checkit( {
    id: [],
    client_id: [],
    description: { rule: 'required', label: 'description'},
    ip_addresses: [],
    is_whitelist: [],
    permissions: [],
    is_api_call_restricted: [],
    is_test_key: []
    } );
    return rules.run( payload );
}

function updateApi (payload) {
  return this.props.updateApiKey(payload);
}

function setErrors( e ) {
  this.setState(createError(e));
}

ApiUpdate.mixins = [LinkedStateMixin];
ApiUpdate.defaultProps = {
    errors: []
};
export default ApiUpdate;