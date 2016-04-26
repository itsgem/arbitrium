import React from 'react';
import cx from 'classnames';
import Checkit from 'checkit';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {createError} from 'utils/error';

class ClientProfile extends React.Component {

    constructor(props) {
        console.log('=== constructor(props) ===');
        console.log(props);

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
        console.log('=== componentWillReceiveProps(nextProps) ===');
        console.log(nextProps);

        if (nextProps.user) {
            console.log('=== nextProps.user ===');
            console.log(nextProps.user);
            this.setState({
                client: nextProps.user
            });
        }

        if (nextProps.responseSuccess) {
            console.log('=== nextProps.responseSuccess ===');
            console.log(nextProps.responseSuccess);
            this.setState({
                success: nextProps.responseSuccess
            });
        }

        if (nextProps.errors) {
            console.log('=== nextProps.errors ===');
            console.log(nextProps.errors);
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        console.log('=== render() ===');

        console.log('=== components clientProfile props ===');
        console.log(this.props);

        console.log('=== state ===');
        console.log(this.state);

        // ============================================================

        if (!this.props.user || !this.state.client) {
            return (<div className="mdl-grid"></div>);
        }

        let client = this.state.client;

        let {errors, errorServer} = this.state ? this.state :'';
        if (errorServer) {
            errors = Object.assign({}, errorServer.response);
        }

        return (
            <section className="mdl-layout__tab-panel is-active" id="fixed-tab-1">
                <div className="mdl-grid mdl-grid--no-spacing">
                    <div className="mdl-cell mdl-cell--12-col">
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
                                            <label className="mdl-textfield__label" htmlFor="email_address">Company name *</label>
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
                                                onChange={this.onChangeFields.bind(this)}
                                                />
                                            <label className="mdl-textfield__label" htmlFor="new_email_address">Company name *</label>
                                            {errors && errors.new_email_address && <small className="mdl-textfield__error shown">{errors.new_email_address[0]}</small>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary"
                                type="submit"
                                >
                                Save
                            </button>

                            <button
                                className="mdl-button mdl-js-button mdl-button--raised"
                                type="button"
                                >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </section>
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
        return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield is-dirty', {
            'is-invalid is-dirty': errors[ field ],
            'has-success': errors && !(errors[ field ])
        } );
    }

    // --- Actions

    updateClientEmail(payload) {
        console.log('=== updateClientEmail(payload) ===');
        console.log(payload);
        return this.props.updateClientEmail(payload);
    }

    // --- Events

    onChangeFields(e) {
        let client = this.state.client;

        if (e.target.getAttribute('data-client')) {
            client[e.target.getAttribute('data-client')][e.target.id] = e.target.value;
        } else {
            client[e.target.id] = e.target.value;
        }

        this.setState({client: client});

        this.isAvailableUsernameButtonDisabled();
    }

    onSubmitProfile(e) {
        e.preventDefault();

        this.setState({
            success: null,
            errors: {},
            errorServer: null
        });

        console.log('=== onSubmitProfile ===');
        console.log('=== this.state.client ===');
        console.log(this.state.client);

        let {new_email_address} = this.refs;

        let payload = {
            new_email_address: new_email_address.value,
            callback_url: 'http://localhost:9991/i/client/profile'
        };

        window.componentHandler.upgradeDom();
        return this.validateUpdateClientEmail.call(this, payload)
            .with(this)
            .then(this.updateClientEmail)
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

    setErrors(e) {
        console.log('=== createError(e) ===');
        console.log(e);
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