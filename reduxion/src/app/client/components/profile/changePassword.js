import React from 'react';
import tr from 'i18next';
import cx from 'classnames';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {createError} from 'utils/error';

class ClientChangePassword extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.context = context;

    this.state = {
    success: {},
    errors: {},
    errorServer: null
    };
  }

  componentDidMount () {
    if ( typeof(window.componentHandler) != 'undefined' )
    {
    setTimeout(() => {window.componentHandler.upgradeDom()},10);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
    this.setState({
      client: nextProps.user
    });
    }

    if (nextProps.responseSuccess) {
    this.setState({
      success: nextProps.responseSuccess
    });
    }

    if (nextProps.errors) {
    this.setState({
      errors: nextProps.errors
    });
    }

    // Log out user when successfully changed password
    if (nextProps.responseSuccess && nextProps.responseSuccess.get('success')) {
    //this.context.router.push('/i/logout');
    location.href ='/i/logout';
    }
  }

  render() {
    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }

    return (
      <div className="mdl-cell mdl-cell--12-col" id="change_password">
        <form>
          <div className="alert alert-warning">
            <i className="material-icons"></i>
            <div className="content">
              {tr.t('NOTEFICATION_MESSAGE.PASSWORD_SMALL_CAPITAL_LETTER')}
            </div>
          </div>
          <div className="">
            <div className="mdl-grid mdl-grid--no-spacing">
              <div className="mdl-cell mdl-cell--12-col">

                <div className={this.formClassNames('current_password', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="password"
                    id="current_password"
                    ref="current_password"
                    />
                  <label className="mdl-textfield__label" htmlFor="current_password">{tr.t('LABEL.CURRENT_PASSWORD_REQ')}</label>
                  {errors && errors.current_password && <small className="mdl-textfield__error shown">{errors.current_password[0]}</small>}
                </div>
              </div>
            </div>
            <div className="mdl-grid mdl-grid--no-spacing">
              <div className="mdl-cell mdl-cell--12-col">
                <div className={this.formClassNames('password', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="password"
                    id="password"
                    ref="password"
                    />
                  <label className="mdl-textfield__label" htmlFor="password">{tr.t('LABEL.NEW_PASSWORD_REQ')}</label>
                  {errors && errors.password && <small className="mdl-textfield__error shown">{errors.password[0]}</small>}
                </div>
              </div>
            </div>
            <div className="mdl-grid mdl-grid--no-spacing">
              <div className="mdl-cell mdl-cell--12-col">
                <div className={this.formClassNames('password_confirmation', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="password"
                    id="password_confirmation"
                    ref="password_confirmation"
                    />
                  <label className="mdl-textfield__label" htmlFor="password_confirmation">{tr.t('LABEL.RE_TYPE_NEW_PASSWORD_REQ')}</label>
                  {errors && errors.password_confirmation && <small className="mdl-textfield__error shown">{errors.password_confirmation[0]}</small>}
                </div>
              </div>
            </div>
          </div>
          <div className="mdl-button-group padding-15">
            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--blue"
              type="submit"
              onClick={(e) => this.onSubmitChangePassword(e) }
              >
              {tr.t('BUTTON.SAVE')}
            </button>
            <button
              className="mdl-button mdl-js-button mdl-button--raised "
              onClick={(e) =>this.clearRender(e)}
              >
              {tr.t('BUTTON.CANCEL')}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- Render
  clearRender (e) {
    this.setState({
    success: {},
    errors: {},
    errorServer: null
    });
    e.preventDefault();
    this.refs.current_password.value = '';
    this.refs.password.value = '';
    this.refs.password_confirmation.value = '';
    for (let item of document.querySelectorAll('.is-dirty')) {
        item.classList.remove('is-dirty');
    }
  }
  renderError() {
    let error = this.state.errorServer;
    if(!error) return;

    let results = error.response;

    return (
    <div className="bs-callout bs-callout-danger text-center animate bounceIn" role="alert">
      {mapObject(results, function (key, value) {
      return <div key={key}>{value}</div>;
      })}
    </div>
    );
  }

  renderSuccess() {
    let success = this.state.success;
    if(!success || (!success.get('success') && (success.get('success') == 'undefined' || success.get('success') == null))) return;

    let response = {
    success: (success.get('success')) ? success.get('success') : false,
    statusClassName: (success.get('success')) ? 'success' : 'danger',
    message: (success.get('message')) ? success.get('message') : {},
    data: (success.get('data')) ? success.get('data') : {}
    };

    let notificationClass = 'bs-callout bs-callout-' + response.statusClassName + ' text-center animate bounceIn';

    return (
    <div className={notificationClass} role="alert">
      {response.message}
    </div>
    );
  }

  // --- Render (Partials)

  formClassNames( field, errors ) {
    return cx('mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
    'is-invalid is-dirty': errors[ field ],
    'has-success': errors && !(errors[ field ])
    });
  }

  // --- Actions

  updateClientPassword(payload) {
    return this.props.updateClientPassword(payload);
  }

  // --- Events

  onSubmitChangePassword(e) {
    e.preventDefault();

    this.setState({
    success: {},
    errors: {},
    errorServer: null
    });

    let {current_password, password, password_confirmation} = this.refs;

    let payload = {
    current_password: current_password.value,
    password: password.value,
    password_confirmation: password_confirmation.value
    };

    window.componentHandler.upgradeDom();
    return this.validateUpdateClientPassword.call(this, payload)
    .with(this)
    .then(this.updateClientPassword)
    .catch(this.setErrors);
  }

  // --- Validations

  validateUpdateClientPassword(payload) {
    let rules = new Checkit({
    current_password:    [{ rule: 'required', label: tr.t('LABEL.CURRENT_PASSWORD')}],
    password:        [{ rule: 'required', label: tr.t('LABEL.NEW_PASSWORD')}],
    password_confirmation: [
      { rule: 'required', label: tr.t('LABEL.PASSWORD_CONFIRMATION')},
      { rule: 'matchesField:password', label: tr.t('LABEL.PASSWORD_CONFIRMATION')}
    ]
    });

    return rules.run(payload);
  }

  setErrors(e) {
    this.setState(createError(e));
  }
}

ClientChangePassword.mixins = [LinkedStateMixin];

ClientChangePassword.defaultProps = {
  errors: []
};

ClientChangePassword.contextTypes = {
  router: React.PropTypes.object,
  history: React.PropTypes.object,
  location: React.PropTypes.object
};

export default ClientChangePassword;

/**
 * mapObject
 *
 * @param object
 * @param callback
 * @returns {Array}
 */
function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
  return callback(key, object[key]);
  });
}