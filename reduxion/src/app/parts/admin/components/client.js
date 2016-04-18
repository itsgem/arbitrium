import React from 'react';
import Checkit from 'checkit';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cx from 'classnames';

class Client extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            errors: null
        }
    }
    render() {
        let {errors} = this.props;
        let clientInfo = this.props.clientInfo;
        return (
            <div id="client" className="inner_content">
                <form className="mdl-shadow--2dp" action={ this.login }>
                    <div className="layout-padding">
                        <div className="mdl-layout__content">
                            <div className="mdl-grid">
                            <legend>Company / Organization</legend>
                                <div className="mdl-cell mdl-cell--6-col">
                                    <div className={this.formClassNames('company_name')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id='company_name'
                                            ref="company_name"
                                            />
                                        <label className="mdl-textfield__label" htmlFor="company_name">Company name *</label>
                                        {errors.company_name && <small className="mdl-textfield__error shown">{errors.company_name[0]}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--6-col">
                                    <div className={this.formClassNames('rep_email_address')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id='rep_email_address'
                                            ref="rep_email_address"
                                            />
                                        <label className="mdl-textfield__label" htmlFor="rep_email_address">E-mail *</label>
                                        {errors.rep_email_address && <small className="mdl-textfield__error shown">{errors.rep_email_address[0]}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="mdl-grid">
                                <span flex="10" className="flex flex-10">Approval Status:</span>
                            </div>
                            <div className="mdl-grid">
                                <b flex="10" className="flex flex-10">Credit Balance:</b>
                            </div>
                            <div className="mdl-grid">
                            <legend>GENERAL INFORMATION</legend>
                            <div className="mdl-cell mdl-cell--6-col">
                                    <div className={this.formClassNames('company_name')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id='company_name'
                                            ref="company_name"
                                            />
                                        <label className="mdl-textfield__label" htmlFor="company_name">Company name *</label>
                                        {errors.company_name && <small className="mdl-textfield__error shown">{errors.company_name[0]}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--6-col">
                                    <div className={this.formClassNames('street_address_1')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id='street_address_1'
                                            ref="street_address_1"
                                            />
                                        <label className="mdl-textfield__label" htmlFor="street_address_1">Street Address 1</label>
                                        {errors.street_address_1 && <small className="mdl-textfield__error shown">{errors.street_address_1[0]}</small>}
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--6-col">
                                <div className={this.formClassNames('street_address_2')}>
                                    <input
                                        className="mdl-textfield__input"
                                        type="text"
                                        id='street_address_2'
                                        ref="street_address_2"
                                        />
                                    <label className="mdl-textfield__label" htmlFor="street_address_2">Street Address 2</label>
                                    {errors.street_address_2 && <small className="mdl-textfield__error shown">{errors.street_address_2[0]}</small>}
                                </div>
                            </div>
                            </div>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('city')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id='city'
                                            ref="city"
                                            />
                                        <label className="mdl-textfield__label" htmlFor="city">City</label>
                                        {errors.city && <small className="mdl-textfield__error shown">{errors.city[0]}</small>}
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('state')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id='state'
                                            ref="state"
                                            />
                                        <label className="mdl-textfield__label" htmlFor="state">State / Province</label>
                                        {errors.state && <small className="mdl-textfield__error shown">{errors.state[0]}</small>}
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                    <div className={this.formClassNames('postal_code')}>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id='postal_code'
                                            ref="postal_code"
                                            />
                                        <label className="mdl-textfield__label" htmlFor="postal_code">Postal code</label>
                                        {errors.postal_code && <small className="mdl-textfield__error shown">{errors.postal_code[0]}</small>}
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--3-col">
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    formClassNames( field ) {
        return cx( 'mdl-js-textfield mdl-textfield--floating-label mdl-block mdl-textfield', {
            'is-invalid is-dirty': this.props.errors[ field ],
            'has-success': this.state[ field ] && !(this.props.errors[ field ])
        } );
    }

}


Client.mixins = [LinkedStateMixin];

Client.defaultProps = {
    errors: []
};


export default Client;
