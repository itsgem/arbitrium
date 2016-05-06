import React from 'react';
import cx from 'classnames';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {createError} from 'utils/error';

class ClientProfile extends React.Component {

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
  }

  render() {
    if (!this.props.user || !this.state.client) {
      return (<div className="mdl-grid"></div>);
    }

    let client = this.state.client;

    let {errors, errorServer} = this.state ? this.state :'';
    if (errorServer) {
      errors = Object.assign({}, errorServer.response);
    }

    return (
      <div>
        { this.renderSuccess() }
        { this.renderError() }
        <form onSubmit={ this.onSubmitProfile.bind(this) }>
          <legend>Change Email Address</legend>
          <div className="">
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--6-col">
                <div className={this.formClassNames('email_address', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="email_address"
                    ref="email_address"
                    value={client.user.email_address}
                    readOnly={true}
                    />
                  <label className="mdl-textfield__label" htmlFor="email_address">Email Address</label>
                  {errors && errors.email_address && <small className="mdl-textfield__error shown">{errors.email_address[0]}</small>}
                </div>
              </div>
            </div>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--6-col">
                <div className={this.formClassNames('new_email_address', errors)}>
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="new_email_address"
                    ref="new_email_address"
                    value={client.new_email_address}
                    />
                  <label className="mdl-textfield__label" htmlFor="new_email_address">New Email Address *</label>
                  {errors && errors.new_email_address && <small className="mdl-textfield__error shown">{errors.new_email_address[0]}</small>}
                </div>
              </div>
            </div>
          </div>
          <div className="mdl-button-group">
            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary"
              type="submit"
              >
              Request Reset Email
            </button>

            <button
              className="mdl-button mdl-js-button mdl-button--raised"
              type="button"
              onClick={this.onClickResetEmail.bind(this)}
              >
              Cancel Request
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
      new_email_address: [{ rule: 'required', label: 'new email address'}, { rule: 'email', label: 'new email address'}],
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

ClientProfile.mixins = [LinkedStateMixin];

ClientProfile.defaultProps = {
  errors: []
};

export default ClientProfile;

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