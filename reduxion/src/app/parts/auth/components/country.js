import React from 'react';

class Country extends React.Component {
    render() {
        let countries = this.props.country.toArray();
        return (
            <div className="mdl-select mdl-js-select mdl-select--floating-label">
                    <select className="mdl-select__input" id="country_id" name="country_id">
                        <option value=""></option>
                        {countries.map(item =>
                            {return <option key={item.get('id')} value={item.get('id')}>{item.get('name')}</option>}
                        )}

                    </select>
                    <label className="mdl-textfield__label" htmlFor="country_id">Country</label>
            </div>
        );
    }
}
export default Country;
