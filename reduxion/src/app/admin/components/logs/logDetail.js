import React from 'react';
import tr from 'i18next';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';
import {createError} from 'utils/error';

class LogDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      errorServer:null,
      permissions: {}
    };
  }
  componentWillReceiveProps() {
    if ( typeof(window.componentHandler) != 'undefined' ) {
      setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }
  loadingRender () {
    return (
      <div className="loading"></div>
    );
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
  render () {
    let adminLogDetail = this.props.adminLogDetail.data;
    let clientDetail = this.props.adminLogDetail.data.client;
    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }
    this.scrolltop(errors);

    return (
      <div className="mdl-layout__panel is-active" id="#">
        <div className="content-container">
          <div className="mdl-grid content">
            <div className="mdl-cell mdl-cell--6-col">
              <h6>{tr.t('LABEL.COMPANY_NAME')}</h6>
              <p>{clientDetail.company_name}</p>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <h6>{tr.t('LABEL.USER_ID')}</h6>
              <p>{adminLogDetail.user_id}</p>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <h6>{tr.t('LABEL.IP_ADDRESS')}</h6>
              <p>{adminLogDetail.ipaddress}</p>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <h6>{tr.t('LABEL.STATUS_CODE')}</h6>
              <p>{adminLogDetail.status_code}</p>
            </div>
            <div className="mdl-cell mdl-cell--6-col bottom-margin">
              <h6>{tr.t('LABEL.URL')}</h6>
              <p>{adminLogDetail.url}</p>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <h6>{tr.t('LABEL.DATE_CREATED')}</h6>
              <p>{adminLogDetail.created}</p>
            </div>
            <div className="mdl-cell mdl-cell--12-col">
              <h6>{tr.t('LABEL.PARAMETER')}</h6>
              <p className="script script-box-container">
                {adminLogDetail.parameter}
              </p>
            </div>
            <div className="mdl-cell mdl-cell--12-col">
              <h6>{tr.t('LABEL.RESPONSE')}</h6>
              <p className="script script-box-container">
                {adminLogDetail.response}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  formClassNames( field, errors ) {
    return cx('mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
      'is-invalid is-dirty': errors[ field ],
      'has-success': errors && !(errors[ field ])
    });
  }

  setErrors(e) {
    this.setState(createError(e));
  }
};

LogDetail.mixins = [LinkedStateMixin];
LogDetail.defaultProps = {
    errors: []
};
export default LogDetail;