import React from 'react';
import tr from 'i18next';
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
      errorServer:null,
      permissions: {},
      checked: false
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
      errors = Object.assign({}, errorServer.response);
      if (errors.ip_addresses) {
        errors.ip_addresses = errorServer.response.ip_addresses[0].ip_address ? errorServer.response.ip_addresses[0].ip_address : errorServer.response.ip_addresses
      }
    }
    this.scrolltop(errors);
    let permissions = this.props.apiPermissions.data;
    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-width">
              <div className={this.formClassNames('description', errors)}>
                <input className="mdl-textfield__input font-input" ref="description" type="text" id="api-description" />
                <label className="mdl-textfield__label" htmlFor="description">{tr.t('LABEL.DESCRIPTION_REQ')}</label>
                {errors.description && <small className="mdl-textfield__error shown">{errors.description[0]}</small>}
              </div>
            </div>
            <p>{tr.t('CLIENT_API_KEY.NOTE.ALLOW_FILTER')}</p>
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-1">
              <input type="checkbox" id="checkbox-1" ref="is_whitelist" className="mdl-checkbox__input" />
              <span className="mdl-checkbox__label">{tr.t('CLIENT_API_KEY.NOTE.ALLOW_IP_ADDRESS')}</span>
            </label>
          </div>
          <div className="mdl-cell mdl-cell--12-col">
            <div className="mdl-textfield mdl-js-textfield full-width">
              <div className={this.formClassNames('ip_addresses', errors)}>
                <textarea className="mdl-textfield__input" type="text" ref="ip_addresses" rows= "3" id="add-ip-address" ></textarea>
                <label className="mdl-textfield__label" htmlFor="sample5">{tr.t('LABEL.ADD_IP_ADDRESS')}</label>
                {errors.ip_addresses && <small className="mdl-textfield__error shown">{errors.ip_addresses[0]}</small>}
              </div>
            </div>
            <p>{tr.t('CLIENT_API_KEY.NOTE.IP_ADDRESS_PER_LINE')}</p>
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect padding-bot" htmlFor="checkbox-2">
              <input onChange={(e)=>this.allowKey(e, permissions)} type="checkbox" id="checkbox-2" ref="is_api_call_restricted" className="mdl-checkbox__input" checked={this.state.checked ? 'checked' : null} />
              <span className="mdl-checkbox__label">{tr.t('CLIENT_API_KEY.NOTE.CERTAIN_API_CALLS')}</span>
            </label>
          </div>
          {
            permissions  && permissions.map(item => {
              return <div key={item.id} className="mdl-cell mdl-cell--3-col">
                      <label id={item.id} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={"checkbox-" + item.id}>
                        <input
                          type="checkbox"
                          className="mdl-checkbox__input permission_item"
                          id={"checkbox-" + item.id}
                          name="chkRights[]"
                          value={ item.id }
                          onClick={(e) => this.ckPermissions(e)}
                          disabled={!this.state.checked ? 'true' : ''}
                          />
                        <span className="mdl-checkbox__label">{item.name}</span>
                      </label>
                    </div>; })
          }
          <div className={this.formClassNames('permissions', errors)}>
            {errors.permissions && <small className="mdl-textfield__error shown">{errors.permissions}</small>}
          </div>
        </div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--1-col check-test-key">
              <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-11">
                <input type="checkbox" id="checkbox-11" ref="is_test_key" className="mdl-checkbox__input"/>
                <span className="mdl-checkbox__label">{tr.t('LABEL.TEST_KEY')}</span>
              </label>
            </div>
            <div className="mdl-cell mdl-cell--1-col check-test-key">
              <div id="tt4" className="icon material-icons">help</div>
                <div className="mdl-tooltip mdl-tooltip--right" htmlFor="tt4">
                  {tr.t('CLIENT_API_KEY.NOTE.TEST_KEY')}
                </div>
            </div>
        </div>
        <div className="layout-gt-md-row layout-align-end-end btn">
          <div className="flex-order-gt-md-2 pd-10">
            <Link
              className="mdl-button mdl-js-button mdl-button--colored"
              id='btn-cancel'
              to="/i/api/">{tr.t('BUTTON.CANCEL')}</Link>
          </div>
          <div className="flex-order-gt-md-2" >
            <button id="btn-save"
              className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--blue"
              onClick={(e) => this.register(e)}>{tr.t('BUTTON.CREATE_API_KEY')}</button>
          </div>
        </div>
      </main>
    );
  }
  allowKey(e, permissions) {
    if (e.target.checked) {
      this.setState({
        checked: true
      });
      permissions.map(function(item) {
        document.getElementById(item.id).classList.remove('is-disabled');
      })
    } else {
      this.setState({
        checked: false,
        errors: {},
        errorServer: null
      });
      permissions.map(function(item) {
        let id = 'checkbox-' + item.id;
        document.getElementById(item.id).classList.remove('is-checked');
        document.getElementById(item.id).classList.add('is-disabled');
        document.getElementById(id).removeAttribute('checked');
        document.getElementById(id).checked = false;
      })
    }
  }
  ckPermissions ( e ) {
    if (e.target.checked) {
      e.target.setAttribute("checked", "checked");
    } else {
      e.target.removeAttribute("checked");
    }
  }
  register ( e ) {
    let chkArr =  document.getElementsByName("chkRights[]");
    let permissions = [];
    let count = 0;
    let hasDuplicate = false;
    for(let k=0;k < chkArr.length;k++) {
      if (chkArr[k].checked) {
        permissions[count] = {api_permission_id: chkArr[k].value};
        count++;
      }
    }

    e.preventDefault();
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

    ipAddresses.map(function(obj) {
      return obj.ip_address;
    }).forEach(function (element, index, arr) {
      if (arr.indexOf(element) !== index) {
        hasDuplicate = true;
      }
    });

    if (hasDuplicate) {
      this.setState({
        errors: {
          ip_addresses: [tr.t('NOTEFICATION_MESSAGE.DUPLICATE_IP')]
        }
      });
      this.props.registerApiSuccess = false;
    }

    let payload = {
      description: this.refs.description.value,
      ip_addresses: ipAddresses,
      permissions: permissions,
      is_whitelist: (this.refs.is_whitelist.checked ? 1 : 0),
      is_api_call_restricted: (this.refs.is_api_call_restricted.checked ? 1 : 0),
      is_test_key: (this.refs.is_test_key.checked ? 1 : 0)
    };
    window.componentHandler.upgradeDom();
    return validateRegister.call( this, payload )
      .with( this )
      .then( registerApi )
      .catch( setErrors );
  }

  formClassNames( field, errors ) {
    return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ]),
      'permission-padding': field == 'permissions' && errors[ field ]
    } );
  }
};

function validateRegister ( payload) {
  let rules = new Checkit( {
    description: { rule: 'required', label: tr.t('LABEL.DESCRIPTION')},
    ip_addresses: [],
    is_whitelist: [],
    permissions: [],
    is_api_call_restricted: [],
    is_test_key: []
    } );
    return rules.run( payload );
}
function registerApi (payload) {
  return this.props.clientRegisterApi(payload);
}

function setErrors( e ) {
  this.setState(createError(e));
}




ApiAdd.mixins = [LinkedStateMixin];
ApiAdd.defaultProps = {
    errors: []
};
export default ApiAdd;