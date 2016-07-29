import React from 'react';
import tr from 'i18next';
import cx from 'classnames';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {createError} from 'utils/error';

class ClientChangeEmail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      success: {},
      errors: {},
      errorServer: null,
      loading: false
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

    if(nextProps.success === true && Object.keys(nextProps.responseSuccess).length>0) {
      setTimeout(() =>{
        window.location.href ="/i/client/profile";
      },3000);
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    if(this.props.success){
      let message = null;
      let success = this.props.responseSuccess;
      let notification = document.querySelector('.mdl-snackbar');
      message = success.message;
      if(message){
        notification.MaterialSnackbar.showSnackbar( {
          message: message,
          timeout: 3000
        });
      }
    }

    if (!this.props.user || !this.state.client) {
      return (<div className="mdl-grid"></div>);
    }

    let client = this.state.client;

    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }

    return (
      <div className="mdl-cell mdl-cell--12-col" id="change_email">
        { this.renderError() }
        <form onSubmit={ this.onSubmitProfile.bind(this) }>
          <div className="alert alert-warning">
            <i className="material-icons"></i>
            <div className="content">
              Oops!, Please fill in the required field.
            </div>
          </div>
          <div className="">
            <div className="mdl-grid mdl-grid--no-spacing">
              <div className="mdl-cell mdl-cell--12-col">
                <div className={this.formClassNames('email_address', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="email_address"
                    ref="email_address"
                    value={client.user.email_address}
                    readOnly={true}
                    />
                  <label className="mdl-textfield__label" htmlFor="email_address">{tr.t('LABEL.EMAIL_ADDRESS')}</label>
                  {errors && errors.email_address && <small className="mdl-textfield__error shown">{errors.email_address[0]}</small>}
                </div>
              </div>
            </div>
            <div className="mdl-grid mdl-grid--no-spacing">
              <div className="mdl-cell mdl-cell--12-col">
                <div className={this.formClassNames('new_email_address', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="new_email_address"
                    ref="new_email_address"
                    value={client.new_email_address}
                    />
                  <label className="mdl-textfield__label" htmlFor="new_email_address">{tr.t('LABEL.NEW_EMAIL_ADDRESS')}</label>
                  {errors && errors.new_email_address && <small className="mdl-textfield__error shown">{errors.new_email_address[0]}</small>}
                </div>
              </div>
            </div>
          </div>
          <div className="mdl-button-group">
            <button
              className="mdl-button mdl-js-button mdl-button--raised"
              type="button"
              onClick={this.onClickResetEmail.bind(this)}
              >
              {tr.t('BUTTON.CANCEL_REQUEST')}
            </button>
            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--blue"
              type="submit"
              >
              {tr.t('BUTTON.REQUEST_RESET_EMAIL')}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- Render

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
    if(Object.keys(success).length === 0 && JSON.stringify(success) === JSON.stringify({})) return;

    return (
      <div className="bs-callout bs-callout-success text-center animate bounceIn" role="alert">
        {success.message}
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

  updateClientEmail(payload) {
    return this.props.updateClientEmail(payload);
  }

  cancelResetEmail(payload) {
    return this.props.cancelEmailChange(payload);
  }

  // --- Events

  onSubmitProfile(e) {
    e.preventDefault();

    this.setState({
      success: {},
      errors: {},
      errorServer: null
    });

    let {new_email_address} = this.refs;

    let payload = {
      new_email_address: new_email_address.value,
      callback_url: window.location.origin + '/i/client/profile'
    };

    window.componentHandler.upgradeDom();
    return this.validateUpdateClientEmail.call(this, payload)
      .with(this)
      .then(this.updateClientEmail)
      .catch(this.setErrors);
  }

  onClickResetEmail(e) {
    e.preventDefault();

    this.setState({
      success: {},
      errors: {},
      errorServer: null
    });

    let payload = {
    };

    window.componentHandler.upgradeDom();
    return this.validateResetEmail.call(this, payload)
      .with(this)
      .then(this.cancelResetEmail)
      .catch(this.setErrors);
  }

  // --- Validations

  validateUpdateClientEmail(payload) {
    let rules = new Checkit({
      new_email_address: [{ rule: 'required', label: tr.t('LABEL.NEW_EMAIL_ADDRESS')}, { rule: 'email', label: tr.t('LABEL.NEW_EMAIL_ADDRESS')}],
      callback_url:      [{ rule: 'required', label: 'callback URL'}]
    });

    return rules.run(payload);
  }

  validateResetEmail(payload) {
    let rules = new Checkit({
    });

    return rules.run(payload);
  }

  setErrors(e) {
    this.setState(createError(e));
  }
}

ClientChangeEmail.mixins = [LinkedStateMixin];

ClientChangeEmail.defaultProps = {
  errors: []
};

export default ClientChangeEmail;

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