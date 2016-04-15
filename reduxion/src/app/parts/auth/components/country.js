import React from 'react';
import tr from 'i18next';

class Country extends React.Component {
    render() {
        let errors = this.props.errors;
        let countries = this.props.country.toArray();
        return (
            <div className="mdl-select mdl-js-select mdl-select--floating-label">
                <select className="mdl-select__input" id="country" name="country">
                    <option value=""></option>
                    {countries.map(item =>{ return <option key={item.get('id')} value={item.get('id')}>{item.get('name')}</option>})}
                </select>
                <label className="mdl-textfield__label" htmlFor="country">{tr.t('Country')}</label>
                {errors.country && <small className="mdl-textfield__error shown">{errors.country[0]}</small>}
            </div>
        );
    }
}
export default Country;
